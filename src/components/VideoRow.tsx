import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const fallbackVideos = [
  { id: "1", title: "Feeding 100 Families", thumbnail_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&h=500&fit=crop", video_url: "#" },
  { id: "2", title: "Clean Water for a Village", thumbnail_url: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=300&h=500&fit=crop", video_url: "#" },
  { id: "3", title: "School Supplies Drive", thumbnail_url: "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=300&h=500&fit=crop", video_url: "#" },
  { id: "4", title: "Rent Paid for Single Mom", thumbnail_url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300&h=500&fit=crop", video_url: "#" },
  { id: "5", title: "Winter Clothes Giveaway", thumbnail_url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=300&h=500&fit=crop", video_url: "#" },
  { id: "6", title: "Medical Bills Covered", thumbnail_url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=500&fit=crop", video_url: "#" },
];

const VideoRow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [campaigns, setCampaigns] = useState(fallbackVideos);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { data } = await supabase.from("campaigns").select("*").order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setCampaigns(data);
      }
    };
    fetchCampaigns();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    setIsPaused(true);
    scrollRef.current.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
  };

  const doubled = [...campaigns, ...campaigns];

  return (
    <section className="py-8 md:py-12 overflow-hidden">
      <div className="container mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center">
          Past Campaigns 👇
        </h2>
        <p className="text-center text-muted-foreground mt-2">
          Every video is tied to a campaign.
          <br />
          Tap to watch.
        </p>
      </div>

      <div className="relative">
        <button onClick={() => scroll("left")} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-background/80 backdrop-blur rounded-full flex items-center justify-center shadow-md border border-border hover:bg-background transition-colors" aria-label="Scroll left">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => scroll("right")} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-background/80 backdrop-blur rounded-full flex items-center justify-center shadow-md border border-border hover:bg-background transition-colors" aria-label="Scroll right">
          <ChevronRight size={18} />
        </button>

        <div
          ref={scrollRef}
          className={`flex gap-4 ${isPaused ? 'overflow-x-auto' : 'animate-scroll-left'} hover:[animation-play-state:paused]`}
          style={{ width: isPaused ? undefined : "max-content" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
        >
          {doubled.map((video, i) => (
            <a key={i} href={video.video_url || "#"} className="flex-shrink-0 w-40 md:w-48 group" target="_blank" rel="noopener noreferrer">
              <div className="relative rounded-xl overflow-hidden aspect-[9/16] shadow-md group-hover:shadow-lg transition-shadow">
                <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width={300} height={500} />
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

        <div className="text-center mt-6">
          <Link to="/campaigns" className="text-sm font-bold text-primary hover:underline">See All →</Link>
        </div>
      </div>
    </section>
  );
};

export default VideoRow;
