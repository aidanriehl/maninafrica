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
      <div className="container max-w-lg">
        <h2 className="font-serif text-xl md:text-2xl font-bold text-center mb-1">
          Campaign In The Spotlight 👇
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-6">
          all current donations are going towards supporting this individual/issue
        </p>

        <div className="relative">
          <div className="bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] overflow-hidden">
            <div className="p-4 pb-3">
              <h3 className="font-serif text-lg font-bold">{spotlight.title}</h3>
              {spotlight.description && (
                <p className="text-muted-foreground text-sm mt-1">{spotlight.description}</p>
              )}
            </div>

            {embedUrl && (
              <div className="aspect-[9/16] max-h-[480px] bg-foreground/5">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                  title={spotlight.title}
                />
              </div>
            )}

            {spotlight.more_link && (
              <div className="p-4 pt-3">
                <a
                  href={spotlight.more_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-primary hover:underline"
                >
                  More →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
