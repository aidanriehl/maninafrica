const DonationSection = () => {
  const members = 420;
  const totalDonated = 38500;

  return (
    <section id="donate" className="py-8 md:py-12">
      <div className="container max-w-lg">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-2">
          Become a Supporter
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          100% goes to giving
        </p>

        {/* Community stats with 3D effect */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-foreground rounded-2xl translate-y-1.5 translate-x-0.5" />
            <div className="relative bg-secondary rounded-2xl p-5 text-center border-2 border-foreground">
              <p className="text-3xl md:text-4xl font-bold text-primary">{members.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Community Members</p>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-foreground rounded-2xl translate-y-1.5 translate-x-0.5" />
            <div className="relative bg-secondary rounded-2xl p-5 text-center border-2 border-foreground">
              <p className="text-3xl md:text-4xl font-bold text-primary">${totalDonated.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">Donated So Far</p>
            </div>
          </div>
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
