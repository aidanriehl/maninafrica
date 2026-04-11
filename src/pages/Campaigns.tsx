import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Campaign {
  id: string;
  title: string;
  thumbnail_url: string;
  video_url: string | null;
  description?: string | null;
}

interface Spotlight {
  id: string;
  title: string;
  video_url: string | null;
  description: string | null;
}

const fallbackVideos: Campaign[] = [
  { id: "1", title: "Feeding 100 Families", thumbnail_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&h=500&fit=crop", video_url: "#" },
  { id: "2", title: "Clean Water for a Village", thumbnail_url: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=300&h=500&fit=crop", video_url: "#" },
  { id: "3", title: "School Supplies Drive", thumbnail_url: "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=300&h=500&fit=crop", video_url: "#" },
];

const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
  <div className="bg-white rounded-xl border-2 border-foreground shadow-[3px_4px_0px_0px_hsl(var(--foreground))] overflow-hidden">
    {/* Thumbnail area */}
    <div className="aspect-square bg-black relative">
      <img
        src={campaign.thumbnail_url}
        alt={campaign.title}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Content area */}
    <div className="p-2">
      <h3 className="font-serif text-xs sm:text-sm font-bold leading-tight mb-2">{campaign.title}</h3>
      <a
        href="#donate"
        className="block w-full py-1.5 bg-[#efc738] text-foreground rounded-lg font-bold text-center text-[10px] sm:text-xs hover:bg-[#ddb52e] transition-colors border border-foreground"
      >
        DONATE
      </a>
    </div>
  </div>
);

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(fallbackVideos);
  const [currentCampaign, setCurrentCampaign] = useState<Spotlight | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all campaigns
      const { data: campaignsData } = await supabase.from("campaigns").select("*").order("created_at", { ascending: false });
      if (campaignsData && campaignsData.length > 0) setCampaigns(campaignsData);

      // Fetch current spotlight campaign
      const { data: spotlightData } = await supabase.from("spotlight").select("*").order("created_at", { ascending: false }).limit(1);
      if (spotlightData && spotlightData.length > 0) setCurrentCampaign(spotlightData[0]);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-2 text-lg font-bold text-primary hover:underline mb-6">
            <ArrowLeft size={16} /> Back
          </Link>

          {/* Current Campaign Section */}
          {currentCampaign && (
            <section className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Spotlight Campaign</h2>
              <div className="bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] overflow-hidden max-w-sm">
                {currentCampaign.video_url && (
                  <div className="aspect-[9/12] bg-black">
                    <video
                      src={currentCampaign.video_url}
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-serif text-lg font-bold mb-2">{currentCampaign.title}</h3>
                  {currentCampaign.description && (
                    <span className="inline-block px-3 py-1 bg-[#d3ffd9] border border-foreground rounded-full text-xs mb-3">
                      {currentCampaign.description}
                    </span>
                  )}
                  <a
                    href="#donate"
                    className="block w-full mt-3 py-2.5 bg-[#efc738] text-foreground rounded-xl font-bold text-center text-sm hover:bg-[#ddb52e] transition-colors border-2 border-foreground"
                  >
                    DONATE
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* All Campaigns Section */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">All Campaigns</h2>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {campaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Campaigns;
