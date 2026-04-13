import { Link } from "react-router-dom";

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
              $10/month supports our work across slavery, child poverty, water, etc. However, if you only want to donate to a specific cause, <Link to="/campaigns" className="text-primary font-bold hover:underline">you can do that too</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
