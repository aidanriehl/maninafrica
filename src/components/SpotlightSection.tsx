import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Spotlight {
  id: string;
  title: string;
  video_url: string | null;
  more_link: string | null;
  description: string | null;
}

// Convert Instagram URL to embed URL
const getInstagramEmbedUrl = (url: string): string => {
  if (url.includes("/embed")) return url;
  const match = url.match(/instagram\.com\/(p|reel|reels)\/([A-Za-z0-9_-]+)/);
  if (match) {
    const [, type, id] = match;
    const embedType = type === "reels" ? "reel" : type;
    return `https://www.instagram.com/${embedType}/${id}/embed/`;
  }
  return url;
};

// Get direct Instagram link (not embed)
const getInstagramDirectUrl = (url: string): string => {
  const match = url.match(/instagram\.com\/(p|reel|reels)\/([A-Za-z0-9_-]+)/);
  if (match) {
    const [, type, id] = match;
    const directType = type === "reels" ? "reel" : type;
    return `https://www.instagram.com/${directType}/${id}/`;
  }
  return url.replace("/embed/", "/").replace("/embed", "/");
};

const SpotlightSection = () => {
  const [spotlight, setSpotlight] = useState<Spotlight | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("spotlight")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);
      if (data && data.length > 0) setSpotlight(data[0]);
    };
    fetch();
  }, []);

  if (!spotlight) return null;

  const embedUrl = spotlight.video_url ? getInstagramEmbedUrl(spotlight.video_url) : null;
  const directUrl = spotlight.video_url ? getInstagramDirectUrl(spotlight.video_url) : spotlight.more_link;

  return (
    <section className="py-6 md:py-8">
      <div className="container max-w-md">
        {/* Title box */}
        <div className="bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] p-5 mb-6 text-center">
          <h2 className="font-serif text-xl md:text-2xl font-bold mb-2">
            Campaign In The Spotlight 👇
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            all current donations are going towards supporting this individual/issue
          </p>
        </div>

        {/* Spotlight card - image 10 style */}
        <div className="bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] overflow-hidden">
          {/* Video area - interactive Instagram embed */}
          {embedUrl && (
            <div className="aspect-[9/14] overflow-hidden">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                title={spotlight.title}
                style={{ border: 'none' }}
                allowFullScreen
              />
            </div>
          )}

          {/* Content area */}
          <div className="p-5">
            <h3 className="font-serif text-xl font-bold mb-2">{spotlight.title}</h3>
            {spotlight.description && (
              <span className="inline-block px-3 py-1 border border-foreground rounded-full text-sm mb-3">
                {spotlight.description}
              </span>
            )}
            {directUrl && (
              <a
                href={directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-4 py-3 bg-green-100 text-foreground rounded-xl font-bold text-center text-lg hover:bg-green-200 transition-colors border-2 border-foreground"
              >
                VIEW ON INSTAGRAM
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
