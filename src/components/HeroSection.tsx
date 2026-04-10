import creatorImg from "@/assets/creator-portrait.jpg";

const HeroSection = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container flex flex-col items-center text-center">
        {/* Creator Image */}
        <div className="relative mb-8">
          <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <img
              src={creatorImg}
              alt="Content creator portrait"
              className="w-full h-full object-cover"
              width={800}
              height={800}
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            100% Goes to Giving
          </div>
        </div>

        {/* Title */}
        <h1 className="font-serif font-bold text-2xl md:text-4xl leading-tight max-w-md mb-4 text-foreground">
          Join Our Community Of Donors Giving $10 A Month
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-base md:text-lg max-w-sm leading-relaxed">
          For less than your Netflix subscription you can support our work
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
