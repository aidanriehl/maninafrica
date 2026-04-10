const DonationSection = () => {
  // Hardcoded stats - update these values directly
  const donors = 420;
  const totalDonated = 38500;

  return (
    <section id="donate" className="py-8 md:py-12">
      <div className="container max-w-lg">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-2">
          Become a Supporter
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          100% goes to giving.
        </p>

        {/* Community stats with 3D effect */}
        <div className="flex gap-4 mb-8">
          {[
            { value: donors.toLocaleString(), label: "Donors" },
            { value: `$${totalDonated.toLocaleString()}`, label: "Recurring Donations" },
          ].map((stat, i) => (
            <div key={i} className="flex-1">
              <div className="relative bg-secondary rounded-2xl p-5 text-center border-2 border-foreground shadow-[4px_6px_0px_0px_hsl(var(--foreground))]">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1 whitespace-nowrap">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
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
