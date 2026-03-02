import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'What is Gravitas?',
      answer:
        'Gravitas is a multidisciplinary venture that combines AI and technical expertise to develop innovative, sustainable products and services for diverse markets. We focus on creating solutions that make a meaningful impact across various industries.',
    },
    {
      question: 'What services do you offer?',
      answer:
        'We offer a comprehensive range of services including AI development, product design, technical consulting, market research, and end-to-end product development. Our team works closely with clients to bring innovative ideas to life.',
    },
    {
      question: 'How can I work with Gravitas?',
      answer:
        'You can book a free 15-minute discovery call through our "Work With Us" button. During this call, we\'ll discuss your needs, explore potential collaboration opportunities, and determine how we can best support your project or business goals.',
    },
    {
      question: 'What industries do you serve?',
      answer:
        'We serve a diverse range of industries including technology, healthcare, consumer products, sustainability, and more. Our multidisciplinary approach allows us to adapt our expertise to various market needs and challenges.',
    },
    {
      question: 'Where can I find the 2026 Whitepaper?',
      answer:
        'Our 2026 Whitepaper provides insights into our vision, methodologies, and upcoming innovations. You can access it by clicking the "Read Our 2026 Whitepaper" button on our homepage.',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        'Project timelines vary depending on scope and complexity. During our discovery call, we\'ll assess your specific needs and provide a realistic timeline. We pride ourselves on delivering quality work efficiently while maintaining our high standards.',
    },
  ];

  return (
    <section className="container-blog py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about Gravitas and our services
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
