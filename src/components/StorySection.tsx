const StorySection = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container max-w-2xl">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-8">
          About This Campaign
        </h2>
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground/90">
          <p>
            I'm 24, and like you, I could not just sit around and watch another
            reel about <em>a homeless 8 year old, or hungry 80 year old.</em>
          </p>

          <p>
            Especially when I've seen only{" "}
            <span className="font-bold">$7 bring these people to tears.</span>
          </p>

          <p>
            People who barely make{" "}
            <span className="font-bold">$2.00 A DAY</span> & struggle to afford
            their monthly rent of{" "}
            <span className="font-bold uppercase">five dollars.</span>
          </p>

          <p>
            People born into slums who have been serially turned from.
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Living in flooded homes</li>
            <li>Burning plastic for heat</li>
            <li>Abandoned children living on the sidewalk</li>
          </ul>

          <p>
            The Government isn't doing anything, the corporations don't care,
            but I've been fortunate enough to be in a position where I
            can do something.
          </p>

          {/* Callout */}
          <div className="bg-primary/10 border-l-4 border-primary rounded-r-xl px-6 py-5 my-4">
            <p className="font-serif text-xl md:text-2xl font-bold text-foreground leading-snug">
              So I want to tell their story to people who don't see this world.
              <br />
              And lift them from systemic poverty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
