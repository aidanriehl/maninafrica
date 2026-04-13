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
    ? "M30,8 L60,3 L140,10 L240,4 L340,12 L440,5 L520,11 L570,6 L590,20 L595,55 L592,95 L588,120 L580,135 L500,139 L400,132 L300,140 L200,133 L100,141 L40,136 L15,130 L6,110 L4,70 L8,30 Z"
    : "M30,10 L60,4 L140,12 L240,5 L340,14 L440,6 L520,12 L570,7 L590,24 L595,70 L592,120 L588,150 L580,168 L500,172 L400,164 L300,173 L200,166 L100,174 L40,168 L15,163 L6,140 L4,90 L8,38 Z";

  const viewBoxHeight = compact ? 145 : 180;
  const viewBoxWidth = 600;

  return (
    <div className="relative flex justify-center mb-6 py-4">
      <div className="relative">
        {/* Shadow layer */}
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="absolute top-[5px] left-[5px] w-[92vw] max-w-[580px] h-auto"
          preserveAspectRatio="none"
        >
          <path d={shapePath} fill="hsl(var(--foreground))" />
        </svg>

        {/* Main green shape */}
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="relative w-[92vw] max-w-[580px] h-auto"
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
          <h2 className="font-serif text-xl md:text-2xl font-bold mb-2 leading-tight whitespace-nowrap">
            {title}
          </h2>
          <p className="text-foreground/70 text-sm md:text-base leading-tight">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComicSectionHeader;
