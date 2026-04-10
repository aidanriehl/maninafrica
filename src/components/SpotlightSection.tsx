import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Play } from "lucide-react";

interface Spotlight {
  id: string;
  title: string;
  video_url: string | null;
  more_link: string | null;
  description: string | null;
  thumbnail_url: string | null;
}

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

  const videoLink = spotlight.video_url || spotlight.more_link;

  return (
    <section className="py-6 md:py-8">
      <div className="container max-w-md">
        {/* Title box */}
        <div className="bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] p-5 mb-6 text-center">
          <h2 className="font-serif text-xl md:text-2xl font-bold mb-1">
            Campaign In The Spotlight 👇
          </h2>
          <p className="text-muted-foreground text-sm">
            all current donations are going towards supporting this individual/issue
          </p>
        </div>

        {/* Spotlight card - image 10 style */}
        <div className="bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] overflow-hidden">
          {/* Thumbnail area - takes up ~70% */}
          {spotlight.thumbnail_url && videoLink && (
            <a
              href={videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-[9/14] overflow-hidden group cursor-pointer"
            >
              <img
                src={spotlight.thumbnail_url}
                alt={spotlight.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                </div>
              </div>
            </a>
          )}

          {/* Content area */}
          <div className="p-5">
            <h3 className="font-serif text-xl font-bold mb-2">{spotlight.title}</h3>
            {spotlight.description && (
              <span className="inline-block px-3 py-1 border border-foreground rounded-full text-sm mb-3">
                {spotlight.description}
              </span>
            )}
            {videoLink && (
              <a
                href={videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-4 py-3 bg-green-100 text-foreground rounded-xl font-bold text-center text-lg hover:bg-green-200 transition-colors border-2 border-foreground"
              >
                WATCH
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
