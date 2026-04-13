import { useId } from "react";

interface ComicSectionHeaderProps {
  title: string;
  subtitle: string;
}

const ComicSectionHeader = ({ title, subtitle }: ComicSectionHeaderProps) => {
  const uniqueId = useId();
  const dotsId = `comicDots-${uniqueId}`;
  const clipId = `shapeClip-${uniqueId}`;
  const shapePath = "M30,8 L60,3 L120,10 L200,4 L280,12 L360,5 L430,10 L490,6 L510,20 L515,55 L512,95 L508,118 L500,132 L440,135 L360,128 L280,136 L200,130 L120,137 L60,132 L20,128 L8,110 L5,70 L10,30 Z";

  return (
    <div className="relative flex justify-center mb-6 py-4">
      <div className="relative">
        {/* Shadow layer */}
        <svg
          viewBox="0 0 520 140"
          className="absolute top-[5px] left-[5px] w-[90vw] max-w-[520px] h-auto"
          preserveAspectRatio="none"
        >
          <path d={shapePath} fill="hsl(var(--foreground))" />
        </svg>

        {/* Main green shape */}
        <svg
          viewBox="0 0 520 140"
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
