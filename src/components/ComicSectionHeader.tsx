interface ComicSectionHeaderProps {
  title: string;
  subtitle: string;
}

const ComicSectionHeader = ({ title, subtitle }: ComicSectionHeaderProps) => {
  return (
    <div className="relative flex justify-center mb-6 py-4">
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1.2px, transparent 1.2px)',
          backgroundSize: '14px 14px',
        }}
      />

      {/* Comic book irregular shape */}
      <div className="relative">
        {/* Shadow layer */}
        <svg
          viewBox="0 0 520 120"
          className="absolute top-[5px] left-[5px] w-[90vw] max-w-[520px] h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M30,8 L60,3 L120,10 L200,4 L280,12 L360,5 L430,10 L490,6 L510,20 L515,50 L512,80 L508,100 L500,112 L440,115 L360,108 L280,116 L200,110 L120,117 L60,112 L20,108 L8,95 L5,60 L10,30 Z"
            fill="hsl(var(--foreground))"
          />
        </svg>

        {/* Main green shape */}
        <svg
          viewBox="0 0 520 120"
          className="relative w-[90vw] max-w-[520px] h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="rgba(0,0,0,0.08)" />
            </pattern>
          </defs>
          <path
            d="M30,8 L60,3 L120,10 L200,4 L280,12 L360,5 L430,10 L490,6 L510,20 L515,50 L512,80 L508,100 L500,112 L440,115 L360,108 L280,116 L200,110 L120,117 L60,112 L20,108 L8,95 L5,60 L10,30 Z"
            fill="#d3ffd9"
            stroke="hsl(var(--foreground))"
            strokeWidth="2.5"
          />
          <path
            d="M30,8 L60,3 L120,10 L200,4 L280,12 L360,5 L430,10 L490,6 L510,20 L515,50 L512,80 L508,100 L500,112 L440,115 L360,108 L280,116 L200,110 L120,117 L60,112 L20,108 L8,95 L5,60 L10,30 Z"
            fill="url(#dots)"
          />
        </svg>

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-1">
            {title}
          </h2>
          <p className="text-foreground/70 text-sm md:text-base">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComicSectionHeader;
