import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Spotlight {
  id: string;
  title: string;
  video_url: string | null;
  more_link: string | null;
  description: string | null;
}

const SpotlightSection = () => {
  const [spotlight, setSpotlight] = useState<Spotlight | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("spotlight")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);
      if (data && data.length > 0) setSpotlight(data[0]);
    };
    fetchData();
  }, []);

  if (!spotlight) return null;

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

        {/* Spotlight card */}
        <div className="bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] overflow-hidden">
          {/* Video area */}
          {spotlight.video_url && (
            <div className="aspect-[9/14] bg-black">
              <video
                src={spotlight.video_url}
                className="w-full h-full object-cover"
                controls
                playsInline
              />
            </div>
          )}

          {/* Content area */}
          <div className="p-5">
            <h3 className="font-serif text-xl font-bold mb-2">{spotlight.title}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {spotlight.description && (
                <span className="inline-block px-3 py-1 border border-foreground rounded-full text-sm">
                  {spotlight.description}
                </span>
              )}
              <span className="inline-block px-3 py-1 border border-foreground rounded-full text-sm">
                420 campaign donors
              </span>
            </div>
            <a
              href="#donate"
              className="block w-full mt-4 py-3 bg-green-100 text-foreground rounded-xl font-bold text-center text-lg hover:bg-green-200 transition-colors border-2 border-foreground"
            >
              DONATE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
