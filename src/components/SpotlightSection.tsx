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
        <span className="inline-block px-3 py-1 bg-[#d3ffd9] border border-foreground rounded-full text-xs mb-3">
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
        title="Campaign In The Spotlight 👇"
        subtitle="all current donations are going here"
        compact
      />

      {/* Spotlight cards */}
      <div className="mx-auto w-full md:max-w-[66%] px-4">
        <div className={`flex gap-4 pb-4 ${isSingle ? 'justify-center' : 'justify-center flex-wrap'}`}>
          {spotlights.map((spotlight) => (
            <SpotlightCard key={spotlight.id} spotlight={spotlight} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
