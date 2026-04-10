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

        {/* Horizontal scrollable spotlight cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {/* Spotlight card */}
          <div className="flex-shrink-0 w-64 bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] overflow-hidden snap-center">
            {/* Video/thumbnail area */}
            {spotlight.video_url && (
              <div className="aspect-[9/12] bg-black relative">
                <video
                  src={spotlight.video_url}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                />
              </div>
            )}

            {/* Content area */}
            <div className="p-4">
              <h3 className="font-serif text-lg font-bold mb-2">{spotlight.title}</h3>
              {spotlight.description && (
                <span className="inline-block px-3 py-1 bg-secondary border border-foreground rounded-full text-xs mb-3">
                  {spotlight.description}
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
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
