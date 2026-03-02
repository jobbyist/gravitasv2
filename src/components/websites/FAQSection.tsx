import { memo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatUSD } from '@/lib/pricingCalculator';
import { pricingConfig } from '@/lib/pricingConfig';

export const FAQSection = memo(function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30 border-t">
      <div className="container-blog">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our website development service
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="turnaround">
              <AccordionTrigger>What's the typical turnaround time?</AccordionTrigger>
              <AccordionContent>
                Most standard websites are completed within 2-3 weeks from the initial deposit. More complex projects with e-commerce or custom features may take 4-6 weeks. We'll provide a detailed timeline in your proposal.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="provide">
              <AccordionTrigger>What do I need to provide?</AccordionTrigger>
              <AccordionContent>
                You'll need to provide: your branding (logo, colors), content (text and images), and access to your domain/hosting if you already have them. We can also help with content creation and recommend hosting providers if needed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="revisions">
              <AccordionTrigger>How many revisions do I get?</AccordionTrigger>
              <AccordionContent>
                The base package includes 1 comprehensive revision round after the initial design is complete. Additional revisions can be purchased separately. We work closely with you during development to minimize the need for major changes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="maintenance">
              <AccordionTrigger>What does the maintenance plan include?</AccordionTrigger>
              <AccordionContent>
                Our {formatUSD(pricingConfig.maintenanceMonthly)}/month maintenance plan includes: regular software updates, daily backups, security monitoring, uptime monitoring, minor content updates (up to 2 hours/month), and priority support. It's optional but highly recommended for peace of mind.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ecommerce">
              <AccordionTrigger>Can you handle e-commerce requirements?</AccordionTrigger>
              <AccordionContent>
                Yes! We offer e-commerce setup with payment gateway integration (Paystack, Payfast, Ozow, Stitch Express, PayPal) and shipping configuration for both domestic and international orders. E-commerce features are available as add-ons to the base package.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hosting">
              <AccordionTrigger>Do you provide hosting?</AccordionTrigger>
              <AccordionContent>
                Hosting is not included in the base price, but we can recommend reliable South African hosting providers and help with setup. We can also manage hosting for you as part of our maintenance plan.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ownership">
              <AccordionTrigger>Will I own the website?</AccordionTrigger>
              <AccordionContent>
                Yes, absolutely! Once the project is completed and final payment is received, you own all rights to the website, including the design, code, and content. We'll provide all source files and documentation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment">
              <AccordionTrigger>What are the payment terms?</AccordionTrigger>
              <AccordionContent>
                We require a 50% deposit to start the project, with the remaining 50% due upon completion before launch. For larger projects over $50,000, we can arrange milestone-based payments.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
});
