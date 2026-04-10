import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fallbackVideos = [
  { id: "1", title: "Feeding 100 Families", thumbnail_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&h=500&fit=crop", video_url: "#" },
  { id: "2", title: "Clean Water for a Village", thumbnail_url: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=300&h=500&fit=crop", video_url: "#" },
  { id: "3", title: "School Supplies Drive", thumbnail_url: "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=300&h=500&fit=crop", video_url: "#" },
  { id: "4", title: "Rent Paid for Single Mom", thumbnail_url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300&h=500&fit=crop", video_url: "#" },
  { id: "5", title: "Winter Clothes Giveaway", thumbnail_url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=300&h=500&fit=crop", video_url: "#" },
  { id: "6", title: "Medical Bills Covered", thumbnail_url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=500&fit=crop", video_url: "#" },
];

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(fallbackVideos);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("campaigns").select("*").order("created_at", { ascending: false });
      if (data && data.length > 0) setCampaigns(data);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft size={16} /> Back
          </Link>
          <h1 className="font-serif text-2xl md:text-3xl font-bold mb-8">All Campaigns</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {campaigns.map((video) => (
              <a key={video.id} href={video.video_url || "#"} className="group" target="_blank" rel="noopener noreferrer">
                <div className="relative rounded-xl overflow-hidden aspect-[9/16] shadow-md group-hover:shadow-lg transition-shadow">
                  <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-background/80 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-foreground ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-3">
                    <p className="text-primary-foreground text-xs font-bold leading-tight">{video.title}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Campaigns;
