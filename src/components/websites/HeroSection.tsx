import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, FileText, MessageSquare, Shield } from 'lucide-react';
import { formatUSD } from '@/lib/pricingCalculator';
import { pricingConfig } from '@/lib/pricingConfig';

interface HeroSectionProps {
  discountPercent: number;
  onClaimOffer: () => void;
  onBuildPackage: () => void;
}

export const HeroSection = memo(function HeroSection({
  discountPercent,
  onClaimOffer,
  onBuildPackage,
}: HeroSectionProps) {
  return (
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
            Basic Website Special:{' '}
            <span className="text-primary">{formatUSD(pricingConfig.baseWebsiteBuild)}</span>{' '}
            once-off
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Basic 5-page website ideal for personal websites and small businesses
          </p>

          {/* Price Anchor */}
          <div className="flex items-center justify-center gap-4 text-lg">
            <span className="text-muted-foreground line-through">
              Was {formatUSD(pricingConfig.originalPrice)}
            </span>
            <span className="text-2xl font-bold text-primary">
              → Now {formatUSD(pricingConfig.baseWebsiteBuild)}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 gap-2 w-full sm:w-auto"
              onClick={onClaimOffer}
            >
              <FileText className="h-5 w-5" />
              Claim This Special Offer
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 gap-2 w-full sm:w-auto"
              onClick={onBuildPackage}
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
  );
});
