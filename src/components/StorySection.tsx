const StorySection = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container max-w-2xl">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-8">
          About Me
        </h2>
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground/90">
          <p>
            I'm 24, and like you, I could not just sit around and watch another
            reel about a homeless 8 year old, or hungry 80 year old.
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
            People born into slums and who have been serially turned from.
          </p>

          <p>
            Living in flooded homes, burning plastic for heat, abandoned
            children living on the sidewalk.
          </p>

          <p>
            The Government isn't doing anything, the corporations don't care,
            but I've been fortunate enough to be born into a position where I
            can do something.
          </p>

          {/* Callout */}
          <div className="bg-primary/10 border-l-4 border-primary rounded-r-xl px-6 py-5 my-4">
            <p className="font-serif text-xl md:text-2xl font-bold text-foreground leading-snug">
              So I want to tell their story to people who don't see this world.
              <br />
              And give them enough funds to help lift them from systemic poverty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
