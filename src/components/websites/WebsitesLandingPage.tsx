import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, MessageSquare, FileText, TrendingUp } from 'lucide-react';
import { getDiscountPercentage } from '@/lib/pricingCalculator';
import { trackEvent, trackPageView } from '@/lib/tracking';
import { PricingEstimator } from './PricingEstimator';
import { AuditModal } from './AuditModal';
import { QuoteModal } from './QuoteModal';
import { StickyMobileCTA } from './StickyMobileCTA';
import { AIWebsiteBuilder } from '@/components/AIWebsiteBuilder';
import { HeroSection } from './HeroSection';
import { SocialProofSection } from './SocialProofSection';
import { FeaturesSection } from './FeaturesSection';
import { UpsellsSection } from './UpsellsSection';
import { ProcessSection } from './ProcessSection';
import { FAQSection } from './FAQSection';

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
      <HeroSection
        discountPercent={discountPercent}
        onClaimOffer={handleClaimOffer}
        onBuildPackage={handleBuildPackageClick}
      />

      {/* AI Website Builder Section */}
      <AIWebsiteBuilder />

      {/* Social Proof */}
      <SocialProofSection />

      {/* What's Included */}
      <FeaturesSection />

      {/* Premium Hosting & Professional Email */}
      <UpsellsSection onQuoteClick={handleQuoteClick} />

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
      <ProcessSection />

      {/* FAQ */}
      <FAQSection />

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
