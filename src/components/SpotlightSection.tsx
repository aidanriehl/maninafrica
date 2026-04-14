import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ComicSectionHeader from "./ComicSectionHeader";

interface Spotlight {
  id: string;
  title: string;
  video_url: string | null;
  more_link: string | null;
  description: string | null;
}

const SpotlightCard = ({ spotlight }: { spotlight: Spotlight }) => (
  <div className="w-full bg-white rounded-2xl border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))] overflow-hidden">
    {/* Video/thumbnail area */}
    {spotlight.video_url && (
      <div className="aspect-[9/16] bg-black relative">
        <video
          src={spotlight.video_url}
          className="w-full h-full object-cover"
          controls
          playsInline
        />
      </div>
    )}

    {/* Content area */}
    <div className="p-3">
      <h3 className="font-serif text-sm font-bold mb-1">{spotlight.title}</h3>
      {spotlight.description && (
        <span className="inline-block px-2 py-0.5 bg-[#d3ffd9] border border-foreground rounded-full text-[10px] mb-2">
          {spotlight.description}
        </span>
      )}
      <a
        href={spotlight.more_link || "#donate"}
        target={spotlight.more_link ? "_blank" : undefined}
        rel={spotlight.more_link ? "noopener noreferrer" : undefined}
        className="block w-full mt-2 py-2 bg-[#efc738] text-foreground rounded-xl font-bold text-center text-xs hover:bg-[#ddb52e] transition-colors border-2 border-foreground"
      >
        DONATE
      </a>
    </div>
  </div>
);

const SpotlightSection = () => {
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("spotlight")
        .select("*")
        .order("created_at", { ascending: false });
      if (data && data.length > 0) setSpotlights(data);
    };
    fetchData();
  }, []);

  if (spotlights.length === 0) return null;

  const isSingle = spotlights.length === 1;

  return (
    <section className="pt-2 pb-6 md:pt-4 md:pb-8">
      <ComicSectionHeader
        title="Campaign(s) In The Spotlight 👇"
        subtitle="all current donations are going here"
        compact
      />

      {/* Spotlight cards */}
      <div className="mx-auto w-full md:max-w-[66%] px-4">
        {isSingle ? (
          <div className="flex justify-center">
            <div className="w-64">
              <SpotlightCard spotlight={spotlights[0]} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {spotlights.map((spotlight) => (
              <SpotlightCard key={spotlight.id} spotlight={spotlight} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SpotlightSection;
