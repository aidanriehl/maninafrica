import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import ComicSectionHeader from "./ComicSectionHeader";

interface Campaign {
  id: string;
  title: string;
  thumbnail_url: string;
  video_url: string | null;
  description?: string | null;
}

const fallbackVideos: Campaign[] = [
  { id: "1", title: "Feeding 100 Families", thumbnail_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&h=500&fit=crop", video_url: "#" },
  { id: "2", title: "Clean Water for a Village", thumbnail_url: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=300&h=500&fit=crop", video_url: "#" },
  { id: "3", title: "School Supplies Drive", thumbnail_url: "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=300&h=500&fit=crop", video_url: "#" },
];

const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
  <div className="flex-shrink-0 w-44 md:w-56 bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] overflow-hidden">
    {/* Video/thumbnail area */}
    <div className="aspect-[9/12] bg-black relative">
      {campaign.video_url && campaign.video_url !== "#" ? (
        <video
          src={campaign.video_url}
          className="w-full h-full object-cover"
          controls
          playsInline
          poster={campaign.thumbnail_url}
        />
      ) : (
        <img
          src={campaign.thumbnail_url}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
      )}
    </div>

    {/* Content area */}
    <div className="p-3">
      <h3 className="font-serif text-sm font-bold mb-1">{campaign.title}</h3>
      {campaign.description && (
        <span className="inline-block px-2 py-0.5 bg-[#d3ffd9] border border-foreground rounded-full text-[10px] mb-2">
          {campaign.description}
        </span>
      )}
      <a
        href="#donate"
        className="block w-full mt-2 py-2 bg-[#efc738] text-foreground rounded-xl font-bold text-center text-xs hover:bg-[#ddb52e] transition-colors border-2 border-foreground"
      >
        DONATE
      </a>
    </div>
  </div>
);

const VideoRow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>(fallbackVideos);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { data } = await supabase.from("campaigns").select("*").order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setCampaigns(data);
      }
    };
    fetchCampaigns();
  }, []);

  // Track visibility with IntersectionObserver
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll using JS instead of CSS animation
  const autoScroll = useCallback(() => {
    if (!scrollRef.current || isPaused || !isVisible) return;

    const container = scrollRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // Scroll by 1px for smooth continuous movement
    if (container.scrollLeft >= maxScroll) {
      container.scrollLeft = 0;
    } else {
      container.scrollLeft += 1;
    }
  }, [isPaused, isVisible]);

  useEffect(() => {
    if (!isPaused && isVisible) {
      autoScrollRef.current = setInterval(autoScroll, 30);
    } else {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isPaused, isVisible, autoScroll]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const scrollAmount = 200;

    // Clear any existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    // Pause animation
    setIsPaused(true);

    if (direction === "right") {
      // If near the end, jump to start first then scroll
      if (container.scrollLeft >= maxScroll - scrollAmount) {
        container.scrollLeft = 0;
      }
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      // If at the start, jump to end first then scroll
      if (container.scrollLeft <= scrollAmount) {
        container.scrollLeft = maxScroll;
      }
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }

    // Resume auto-scroll after 3 seconds
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  const handleMouseEnter = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    // Resume after a short delay
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 500);
  };

  // Double the campaigns for seamless loop
  const doubled = [...campaigns, ...campaigns];

  return (
    <section ref={sectionRef} className="py-8 md:py-12 overflow-hidden">
      <ComicSectionHeader
        title="Past Campaigns 👇"
        subtitle="Every video is tied to a campaign."
        compact
      />

      <div className="mx-auto w-full md:max-w-[66%] relative">
        <button onClick={() => scroll("left")} className="absolute left-2 top-[40%] -translate-y-1/2 z-10 w-9 h-9 bg-background/80 backdrop-blur rounded-full flex items-center justify-center shadow-md border border-border hover:bg-background transition-colors" aria-label="Scroll left">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => scroll("right")} className="absolute right-2 top-[40%] -translate-y-1/2 z-10 w-9 h-9 bg-background/80 backdrop-blur rounded-full flex items-center justify-center shadow-md border border-border hover:bg-background transition-colors" aria-label="Scroll right">
          <ChevronRight size={18} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 pb-4 px-4 overflow-x-scroll"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
        >
          {doubled.map((campaign, i) => (
            <div key={`${campaign.id}-${i}`} className="flex-shrink-0">
              <CampaignCard campaign={campaign} />
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link to="/campaigns" className="text-base font-bold text-primary hover:underline">See All →</Link>
        </div>
      </div>
    </section>
  );
};

export default VideoRow;
