import { useState, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sparkles, 
  Wand2, 
  Zap, 
  Globe, 
  MessageSquare,
  Bot,
  CreditCard,
  Check
} from 'lucide-react';
import { AIWebsiteBuilderModal } from '@/components/websites/AIWebsiteBuilderModal';
import { trackEvent } from '@/lib/tracking';

export const AIWebsiteBuilder = memo(() => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleGetEarlyAccess = () => {
    setModalOpen(true);
    trackEvent('cta_click', { type: 'ai_website_builder_early_access' });
  };

  return (
    <>
      <section className="container-blog py-16 md:py-24 border-y bg-gradient-to-b from-accent/50 to-background">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="text-sm px-4 py-2 gap-2">
              <Sparkles className="h-4 w-4" />
              Now available in private beta
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Origin by Gravitas
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              The Agentic AI coding tool that turns natural language into fully-functional, mobile-friendly websites in minutes.
            </p>
          </div>

          {/* Main Feature Card */}
          <Card className="border-2 border-primary/20 shadow-lg mb-8">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Wand2 className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">
                    From Concept to Live Website in Minutes
                  </CardTitle>
                  <CardDescription className="text-base">
                    Simply describe your business, goals, and preferences. Our AI handles design, 
                    development, content, and publishing - delivering a professional website ready to attract customers.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Example Use Case */}
              <div className="rounded-lg bg-muted/50 p-4 border">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Real example:</p>
                    <p className="italic">
                      "Create a modern website for my boutique coffee shop with online ordering, 
                      location finder, and customer reviews"
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      ✓ Result: Professional website live in under 10 minutes
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Bot className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Intelligent & Conversational</h4>
                    <p className="text-sm text-muted-foreground">
                      Chat naturally with AI - refine designs, add features, make changes instantly
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Launch in Minutes</h4>
                    <p className="text-sm text-muted-foreground">
                      From first message to live website in under 10 minutes - guaranteed
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Zero Technical Skills Needed</h4>
                    <p className="text-sm text-muted-foreground">
                      Perfect for entrepreneurs, small businesses, and anyone with an idea
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Enterprise-Grade Quality</h4>
                    <p className="text-sm text-muted-foreground">
                      Professional designs, mobile-responsive, SEO-optimized, and blazing fast
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Integrations */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Flexible Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Subscription Plan</p>
                      <p className="text-sm text-muted-foreground">
                        Starting from <span className="font-bold text-foreground">$19.99/month</span> for 1000 credits every 30 days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Pay-As-You-Use</p>
                      <p className="text-sm text-muted-foreground">
                        Prepaid topups from just <span className="font-bold text-foreground">$4.99</span> for 250 credits
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Integrations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Powered by Advanced AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">OpenAI Codex GPT</p>
                    <p className="text-xs text-muted-foreground">Latest GPT models</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Google Gemini</p>
                    <p className="text-xs text-muted-foreground">Advanced language understanding</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Claude (Anthropic)</p>
                    <p className="text-xs text-muted-foreground">Intelligent code generation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 gap-2 shadow-lg hover:shadow-xl transition-all"
              onClick={handleGetEarlyAccess}
            >
              <Sparkles className="h-5 w-5" />
              Claim Your Early Access Spot
            </Button>
            <div>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 gap-2 shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <a href="https://origin.gravitas.uno" target="_blank" rel="noopener noreferrer">
                  <Sparkles className="h-5 w-5" />
                  Preview Origin
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Join 500+ businesses already using Origin by Gravitas
            </p>
          </div>
        </div>
      </section>

      <AIWebsiteBuilderModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
});

AIWebsiteBuilder.displayName = 'AIWebsiteBuilder';
