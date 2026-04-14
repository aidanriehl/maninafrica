import { useId } from "react";

interface ComicSectionHeaderProps {
  title: string;
  subtitle: string;
  compact?: boolean;
}

const ComicSectionHeader = ({ title, subtitle, compact = false }: ComicSectionHeaderProps) => {
  const uniqueId = useId();
  const dotsId = `comicDots-${uniqueId}`;
  const clipId = `shapeClip-${uniqueId}`;

  // Different paths for compact vs regular
  const shapePath = compact
    ? "M30,8 L60,3 L140,10 L240,4 L340,12 L440,5 L520,11 L570,6 L590,20 L595,55 L592,100 L588,130 L580,148 L500,152 L400,145 L300,153 L200,146 L100,154 L40,149 L15,143 L6,120 L4,70 L8,30 Z"
    : "M30,10 L60,4 L140,12 L240,5 L340,14 L440,6 L520,12 L570,7 L590,24 L595,70 L592,130 L588,165 L580,185 L500,189 L400,181 L300,190 L200,183 L100,191 L40,185 L15,180 L6,155 L4,90 L8,38 Z";

  const viewBoxHeight = compact ? 160 : 198;
  const viewBoxWidth = 600;

  return (
    <div className="relative flex justify-center mb-6 py-4">
      <div className="relative">
        {/* Shadow layer */}
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="absolute top-[5px] left-[5px] w-[92vw] max-w-[500px] h-auto"
          preserveAspectRatio="none"
        >
          <path d={shapePath} fill="hsl(var(--foreground))" />
        </svg>

        {/* Main green shape */}
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="relative w-[92vw] max-w-[500px] h-auto"
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
            x="0" y="0" width={viewBoxWidth} height={viewBoxHeight}
            fill={`url(#${dotsId})`}
            clipPath={`url(#${clipId})`}
          />
        </svg>

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
          <h2 className="font-serif text-xl md:text-3xl font-bold mb-2 leading-tight whitespace-nowrap">
            {title}
          </h2>
          <p className="text-foreground/70 text-sm md:text-lg leading-tight">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComicSectionHeader;
