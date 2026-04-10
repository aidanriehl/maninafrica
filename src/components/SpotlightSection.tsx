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
  // Already an embed URL
  if (url.includes("/embed")) return url;

  // Match Instagram post/reel URLs
  const match = url.match(/instagram\.com\/(p|reel|reels)\/([A-Za-z0-9_-]+)/);
  if (match) {
    const [, type, id] = match;
    const embedType = type === "reels" ? "reel" : type;
    return `https://www.instagram.com/${embedType}/${id}/embed/`;
  }

  return url;
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

  return (
    <section className="py-6 md:py-8">
      <div className="container max-w-4xl">
        {/* Title box */}
        <div className="bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] p-5 mb-6 text-center">
          <h2 className="font-serif text-xl md:text-2xl font-bold mb-1">
            Campaign In The Spotlight 👇
          </h2>
          <p className="text-muted-foreground text-sm">
            all current donations are going towards supporting this individual/issue
          </p>
        </div>

        {/* Video and description side by side */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Video */}
          {embedUrl && (
            <div className="bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] overflow-hidden">
              <div className="aspect-[9/16] max-h-[520px]">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                  title={spotlight.title}
                />
              </div>
            </div>
          )}

          {/* Description box */}
          <div className="bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] p-6 flex flex-col">
            <h3 className="font-serif text-xl md:text-2xl font-bold mb-3">{spotlight.title}</h3>
            {spotlight.description && (
              <p className="text-muted-foreground leading-relaxed flex-1">{spotlight.description}</p>
            )}
            {spotlight.more_link && (
              <a
                href={spotlight.more_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:opacity-90 transition-opacity w-fit"
              >
                Learn More →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
