const DonationSection = () => {
  const raised = 4200;
  const goal = 10000;
  const percent = Math.round((raised / goal) * 100);

  return (
    <section id="donate" className="py-12 md:py-20">
      <div className="container max-w-lg">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-2">
          Join the Circle
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          $10/month — 100% goes directly to people in need.
        </p>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold">${raised.toLocaleString()} raised</span>
            <span className="text-muted-foreground">${goal.toLocaleString()} goal</span>
          </div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-center">
            {percent}% of monthly goal
          </p>
        </div>

        {/* GiveButter widget placeholder */}
        <div className="bg-secondary/60 border-2 border-dashed border-border rounded-xl p-8 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            GiveButter donation widget will go here
          </p>
          <a
            href="#"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold text-base hover:opacity-90 transition-opacity"
          >
            Donate $10/month
          </a>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
