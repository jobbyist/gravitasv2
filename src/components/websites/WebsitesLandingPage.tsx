import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  CheckCircle2, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Clock,
  MessageSquare,
  FileText,
  Sparkles,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import { pricingConfig, basePackageIncludes, basePackageExclusions } from '@/lib/pricingConfig';
import { formatZAR, getDiscountPercentage } from '@/lib/pricingCalculator';
import { trackEvent, trackPageView } from '@/lib/tracking';
import { PricingEstimator } from './PricingEstimator';
import { AuditModal } from './AuditModal';
import { QuoteModal } from './QuoteModal';
import { StickyMobileCTA } from './StickyMobileCTA';
import { AIWebsiteBuilder } from '@/components/AIWebsiteBuilder';

export function WebsitesLandingPage() {
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('Websites Landing', '/websites');
  }, []);

  const handleClaimOffer = () => {
    navigate('/website-payment');
    trackEvent('cta_click', { type: 'claim_offer' });
  };

  const handleBuildPackageClick = () => {
    const element = document.getElementById('build-package-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    trackEvent('cta_click', { type: 'build_package' });
  };

  const handleAuditClick = () => {
    setAuditModalOpen(true);
    trackEvent('cta_click', { type: 'audit' });
    trackEvent('modal_open', { modal: 'audit' });
  };

  const handleQuoteClick = () => {
    setQuoteModalOpen(true);
    trackEvent('cta_click', { type: 'quote' });
    trackEvent('modal_open', { modal: 'quote' });
  };

  const discountPercent = getDiscountPercentage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent to-background border-b">
        <div className="container-blog py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              <Sparkles className="h-4 w-4 mr-2" />
              Limited Time Offer - {discountPercent}% Off
            </Badge>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Custom Website Special:{' '}
              <span className="text-primary">{formatZAR(pricingConfig.baseWebsiteBuild)}</span>{' '}
              once-off
            </h1>

            {/* Subtext */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Basic 5-page website ideal for personal websites and small businesses
            </p>

            {/* Price Anchor */}
            <div className="flex items-center justify-center gap-4 text-lg">
              <span className="text-muted-foreground line-through">
                Was {formatZAR(pricingConfig.originalPrice)}
              </span>
              <span className="text-2xl font-bold text-primary">
                → Now {formatZAR(pricingConfig.baseWebsiteBuild)}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="text-lg px-8 gap-2 w-full sm:w-auto"
                onClick={handleClaimOffer}
              >
                <FileText className="h-5 w-5" />
                Claim This Special Offer
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 gap-2 w-full sm:w-auto"
                onClick={handleBuildPackageClick}
              >
                <MessageSquare className="h-5 w-5" />
                Build Your Custom Website Package
              </Button>
            </div>

            {/* Trust Microcopy */}
            <p className="text-sm text-muted-foreground">
              <Shield className="h-4 w-4 inline mr-1" />
              No spam. WhatsApp-friendly. Response within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* AI Website Builder Section */}
      <AIWebsiteBuilder />

      {/* Social Proof */}
      <section className="py-12 border-b bg-muted/30">
        <div className="container-blog">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Trusted By South African Businesses</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">5.0 Rating</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Users className="h-8 w-8 text-primary" />
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Award className="h-8 w-8 text-primary" />
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Clock className="h-8 w-8 text-primary" />
                <p className="text-2xl font-bold">24hrs</p>
                <p className="text-sm text-muted-foreground">Response Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24">
        <div className="container-blog">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">What's Included in the Base Package</h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to launch a professional online presence
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Includes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Included Features
                  </CardTitle>
                  <CardDescription>
                    Standard with every website package
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {basePackageIncludes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Excludes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    Not Included
                  </CardTitle>
                  <CardDescription>
                    Available separately or client-provided
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {basePackageExclusions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-xl leading-none mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Hosting & Professional Email */}
      <section className="py-16 md:py-24 bg-muted/30 border-y">
        <div className="container-blog">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Additional Services</h2>
              <p className="text-xl text-muted-foreground">
                Enhance your website with premium hosting and professional email
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Premium Hosting */}
              <Card className="border-2 border-primary">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    <Shield className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                  <CardTitle className="text-2xl">Premium Hosting</CardTitle>
                  <CardDescription>
                    Fast, secure, and reliable hosting for your website
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold">$9.99</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>99.9% uptime guarantee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Free SSL certificate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Daily automated backups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>DDoS protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>24/7 technical support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Global CDN included</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" onClick={handleQuoteClick}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Professional Email */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Professional Email</CardTitle>
                  <CardDescription>
                    Custom email addresses for your domain
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold">$2.49</div>
                    <div className="text-sm text-muted-foreground">per month (billed annually)</div>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Custom domain email (you@yourdomain.com)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>10GB storage per mailbox</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Webmail and mobile access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Spam and virus protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Calendar and contacts sync</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>IMAP/POP3/SMTP support</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" variant="outline" onClick={handleQuoteClick}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Estimator */}
      <section id="build-package-section" className="py-16 md:py-24 bg-muted/30 border-y">
        <div className="container-blog">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="secondary" className="text-sm px-4 py-1.5">
                <Zap className="h-4 w-4 mr-2" />
                Interactive Pricing
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Build Your Perfect Package</h2>
              <p className="text-xl text-muted-foreground">
                Customize your website with additional services and see real-time pricing
              </p>
            </div>

            <PricingEstimator />

            <div className="text-center mt-12 space-y-4">
              <p className="text-muted-foreground">
                Ready to get started?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={handleClaimOffer}
                  className="gap-2"
                >
                  <FileText className="h-5 w-5" />
                  Claim This Special Offer
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={handleAuditClick}
                  className="gap-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  Request A Free Website Audit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 md:py-24">
        <div className="container-blog">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Our Simple 5-Step Process</h2>
              <p className="text-xl text-muted-foreground">
                From concept to launch in weeks, not months
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: 'Discovery Call',
                  description: 'We discuss your goals, requirements, and vision for your website.',
                  duration: '30-60 minutes',
                },
                {
                  step: 2,
                  title: 'Proposal & Agreement',
                  description: 'Receive a detailed proposal with timeline and pricing. Sign and pay deposit.',
                  duration: '1-2 days',
                },
                {
                  step: 3,
                  title: 'Design & Development',
                  description: 'We create your custom website with regular progress updates.',
                  duration: '1-3 weeks',
                },
                {
                  step: 4,
                  title: 'Review & Revisions',
                  description: 'You review the website and request any changes (1 revision round included).',
                  duration: '3-5 days',
                },
                {
                  step: 5,
                  title: 'Launch & Support',
                  description: 'We launch your site and provide 30 days of post-launch support.',
                  duration: '1 day + 30 days support',
                },
              ].map((item) => (
                <Card key={item.step} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold">
                          {item.step}
                        </div>
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription className="mt-1">{item.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="hidden sm:flex">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
                  Our {formatZAR(pricingConfig.maintenanceMonthly)}/month maintenance plan includes: regular software updates, daily backups, security monitoring, uptime monitoring, minor content updates (up to 2 hours/month), and priority support. It's optional but highly recommended for peace of mind.
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
                  We require a 50% deposit to start the project, with the remaining 50% due upon completion before launch. For larger projects over R50,000, we can arrange milestone-based payments.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-accent border-t">
        <div className="container-blog">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Looking to upgrade your existing website?
            </h2>
            <p className="text-xl text-muted-foreground">
              Request a free comprehensive website audit report and find out how we can help you improve your online presence with a professional upgrade. Or send us a brief to request a free quote for your website needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleAuditClick}
                className="text-lg px-8 gap-2"
              >
                <FileText className="h-5 w-5" />
                Request A Free Website Audit
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={handleQuoteClick}
                className="text-lg px-8 gap-2"
              >
                <MessageSquare className="h-5 w-5" />
                Get A Free Quote
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 inline mr-1" />
              Join 50+ businesses that trusted us with their online presence
            </p>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AuditModal open={auditModalOpen} onOpenChange={setAuditModalOpen} />
      <QuoteModal open={quoteModalOpen} onOpenChange={setQuoteModalOpen} />
      
      {/* Sticky Mobile CTA */}
      <StickyMobileCTA onAuditClick={handleAuditClick} onQuoteClick={handleQuoteClick} />
    </div>
  );
}
