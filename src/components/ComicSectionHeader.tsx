import { useId } from "react";

interface ComicSectionHeaderProps {
  title: string;
  subtitle: string;
}

const ComicSectionHeader = ({ title, subtitle }: ComicSectionHeaderProps) => {
  const uniqueId = useId();
  const dotsId = `comicDots-${uniqueId}`;
  const clipId = `shapeClip-${uniqueId}`;
  const shapePath = "M30,10 L60,4 L120,12 L200,5 L280,14 L360,6 L430,12 L490,7 L510,24 L515,70 L512,120 L508,150 L500,168 L440,172 L360,164 L280,173 L200,166 L120,174 L60,168 L20,163 L8,140 L5,90 L10,38 Z";

  return (
    <div className="relative flex justify-center mb-6 py-4">
      <div className="relative">
        {/* Shadow layer */}
        <svg
          viewBox="0 0 520 180"
          className="absolute top-[5px] left-[5px] w-[90vw] max-w-[520px] h-auto"
          preserveAspectRatio="none"
        >
          <path d={shapePath} fill="hsl(var(--foreground))" />
        </svg>

        {/* Main green shape */}
        <svg
          viewBox="0 0 520 180"
          className="relative w-[90vw] max-w-[520px] h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id={dotsId} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="rgba(0,0,0,0.08)" />
            </pattern>
            <clipPath id={clipId}>
              <path d={shapePath} />
            </clipPath>
          </defs>
          <path
            d={shapePath}
            fill="#d3ffd9"
            stroke="hsl(var(--foreground))"
            strokeWidth="2.5"
          />
          <rect
            x="0" y="0" width="520" height="140"
            fill={`url(#${dotsId})`}
            clipPath={`url(#${clipId})`}
          />
        </svg>

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
          <h2 className="font-serif text-xl md:text-3xl font-bold mb-1 leading-tight">
            {title}
          </h2>
          <p className="text-foreground/70 text-xs md:text-base leading-tight">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComicSectionHeader;
