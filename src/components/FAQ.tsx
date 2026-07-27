import { memo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = memo(() => {
  const faqs = [
    {
      question: 'How quickly can you deliver my project?',
      answer:
        'Timeline varies by project scope. Our AI Website Builder can launch simple sites in minutes. Custom web development projects typically take 2-4 weeks. During your free discovery call, we\'ll provide a detailed timeline tailored to your specific needs and deadlines.',
    },
    {
      question: 'What makes Gravitas different from other agencies?',
      answer:
        'We combine cutting-edge AI technology with human expertise to deliver superior results faster and more cost-effectively. Our team has deep experience across multiple industries, and we focus on measurable business outcomes - not just beautiful designs. Plus, our AI Website Builder gives you unprecedented speed and flexibility.',
    },
    {
      question: 'How much does a typical project cost?',
      answer:
        'Our AI Website Builder starts at just $19.99/month. Custom web development projects start from $2,500. E-commerce solutions begin at $5,000. We offer flexible pricing including subscriptions and pay-as-you-go options. Book a free consultation to get a detailed quote for your specific requirements.',
    },
    {
      question: 'Do you offer ongoing support after launch?',
      answer:
        'Absolutely! We offer comprehensive maintenance packages, technical support, and continuous optimization services with 24/7 access to submit tickets, track projects, and manage your services. We\'re committed to your long-term success.',
    },
    {
      question: 'Can I see examples of your work?',
      answer:
        'Yes! Visit our Portfolio page to see case studies and examples of websites, e-commerce platforms, and digital solutions we\'ve built for clients across various industries. Each project includes details about the challenge, our solution, and the measurable results achieved.',
    },
    {
      question: 'What if I need changes after my website launches?',
      answer:
        'With our AI Website Builder, you can make unlimited changes yourself through simple chat commands. For custom projects, we include a revision period and offer ongoing development services. Our goal is ensuring your digital presence evolves with your business needs.',
    },
  ];

  return (
    <section className="container-blog py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Your Questions Answered
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about working with Gravitas
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
});

FAQ.displayName = 'FAQ';

export default FAQ;
