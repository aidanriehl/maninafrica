const HowItWorksSection = () => {
  return (
    <section className="py-6 md:py-8">
      <div className="container max-w-lg">
        <div className="relative">
          <div className="relative bg-white rounded-2xl p-6 md:p-8 border-2 border-foreground text-center shadow-[4px_6px_0px_0px_hsl(var(--foreground))]">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              How This Works
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              You donate $10/month. We go into underserved communities, document real stories, and give 100% of the funds directly to those in need. Every campaign is filmed so you can see your impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
