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

const SpotlightCard = ({ spotlight }: { spotlight: Spotlight }) => (
  <div className="bg-white rounded-xl border-2 border-foreground shadow-[3px_4px_0px_0px_hsl(var(--foreground))] overflow-hidden">
    {spotlight.video_url && (
      <div className="aspect-square bg-black">
        <video
          src={spotlight.video_url}
          className="w-full h-full object-cover"
          controls
          playsInline
        />
      </div>
    )}
    <div className="p-2">
      <h3 className="font-serif text-xs sm:text-sm font-bold leading-tight mb-1">{spotlight.title}</h3>
      {spotlight.description && (
        <span className="inline-block px-2 py-0.5 bg-[#d3ffd9] border border-foreground rounded-full text-[10px] mb-2">
          {spotlight.description}
        </span>
      )}
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
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all campaigns
      const { data: campaignsData } = await supabase.from("campaigns").select("*").order("created_at", { ascending: false });
      if (campaignsData && campaignsData.length > 0) setCampaigns(campaignsData);

      // Fetch all spotlight campaigns
      const { data: spotlightData } = await supabase.from("spotlight").select("*").order("created_at", { ascending: false });
      if (spotlightData) setSpotlights(spotlightData);
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

          {/* Spotlight Campaigns Section */}
          {spotlights.length > 0 && (
            <section className="mb-8">
              <h2 className="font-serif text-xl md:text-2xl font-bold mb-4">Spotlight Campaigns</h2>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {spotlights.map((spotlight) => (
                  <SpotlightCard key={spotlight.id} spotlight={spotlight} />
                ))}
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
