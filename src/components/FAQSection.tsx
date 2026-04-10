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
    question: "How can I get involved?",
    answer:
      "It means so much that you want to get involved. We're a small team and could use all the help. If you contact us at hello@1manwithcam.com we will always respond :)",
  },
  {
    question: "Is my donation tax deductible?",
    answer:
      "Not yet because we are not a registered 501c(3), but we're actively working towards getting our status and will update our donors when we do!",
  },
  {
    question: "Can I suggest a person or cause that needs help?",
    answer:
      "Please! Contact us at hello@1manwithcam.com. We respond to every email.",
  },
  {
    question: "Who's on your team? What's your story?",
    answer: (
      <>
        <p>Currently it is only 2 people.</p>
        <br />
        <p>My name is Baker and I'm a journalist from Uganda. I'm the one you see in the videos. 5 years ago I started an orphanage for refugee street children, but I struggled to raise donations. That's when I met Aidan.</p>
        <br />
        <p>Aidan's a 24 y/o from Hawaii and fundraising wiz. He reached out because he saw one of my videos and wanted to help grow my nonprofit.</p>
        <br />
        <p>You can reach out to us anytime at hello@1manwithcam.com</p>
      </>
    ),
  },
];

const FAQSection = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container max-w-2xl">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-8">
          Have Questions?
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
