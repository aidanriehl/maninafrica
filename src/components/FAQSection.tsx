import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do you make money?",
    answer:
      "I don't take a salary from the circle. 100% of your $10/month goes directly to nonprofits, individuals, and communities in need. I make my personal income through brand partnerships, sponsorships, and ad revenue on my content — completely separate from this fund.",
  },
  {
    question: "Are you legit?",
    answer:
      "Yes. Every dollar is tracked and every campaign is documented on video. You can see exactly where your money goes through our monthly impact reports and the videos posted on Instagram. We also partner with registered nonprofits and use transparent payment platforms like GiveButter so you always have a receipt.",
  },
  {
    question: "Can I give more or volunteer?",
    answer:
      "Absolutely! If you want to give more than $10/month you can set a custom amount through the donation widget above. If you'd like to volunteer your time or skills — whether that's on-the-ground help, translations, design, or outreach — reach out through the contact link and we'll get you connected.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-2xl">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-8">
          Questions? We got you.
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-xl px-5 overflow-hidden"
            >
              <AccordionTrigger className="text-left font-bold text-base hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
