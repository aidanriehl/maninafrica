import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
    <section className="py-6 md:py-8">
      {/* Title section - full width */}
      <div className="bg-[#d3ffd9] py-6 mb-6 text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
          Campaign In The Spotlight 👇
        </h2>
        <p className="text-foreground/70 text-base md:text-lg">
          all current donations are going towards supporting this individual/issue
        </p>
      </div>

      {/* Spotlight cards */}
      <div className="container max-w-md">
        <div className={`flex gap-4 pb-4 ${isSingle ? 'justify-center' : 'overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4'}`}>
          {spotlights.map((spotlight) => (
            <SpotlightCard key={spotlight.id} spotlight={spotlight} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
