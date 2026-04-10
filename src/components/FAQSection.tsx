import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do you make money if 100% of our proceeds are donated?",
    answer: (
      <>
        <p>Currently, I'm using my savings to support myself. In the future, I hope to be sponsored by brands who want to partner on philanthropy.</p>
        <br />
        <p>I don't often advertise this publicly, but you can also support me individually here (I will add a link in the future)</p>
      </>
    ),
  },
  {
    question: "Are you legit?",
    answer: (
      <>
        <p>Every donation is processed through GiveButter, a third-party platform that creates a paper trail we can't alter or delete. If we misused funds, it would be legally actionable.</p>
        <br />
        <p>We're also in the process of becoming a registered 501c3, which adds formal government oversight and adds trust for donors like you.</p>
      </>
    ),
  },
  {
    question: "How can I get involved or volunteer?",
    answer:
      "It means so much that you want to get involved. We're a small team and could use all the help. If you contact us at hello@1manwithcam.com we will always respond :)",
  },
];

const FAQSection = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container max-w-2xl">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-8">
          Got Questions?
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-secondary/40 border border-border rounded-xl px-5 overflow-hidden"
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
