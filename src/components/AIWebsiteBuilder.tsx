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
              Get Early Access
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              AI Website Builder
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              The next generation, conversational and agentic AI-powered website building service
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
                    Create & Publish Websites in Minutes
                  </CardTitle>
                  <CardDescription className="text-base">
                    A feature-packed, highly intuitive website building tool designed to help anyone create and publish a professional website with simple instructions.
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
                    <p className="text-sm font-medium text-muted-foreground mb-1">Example instruction:</p>
                    <p className="italic">
                      "Build a simple one page website for clients to request quotes for my gardening & home maintenance service business"
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Bot className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Conversational & Agentic</h4>
                    <p className="text-sm text-muted-foreground">
                      Natural language interface powered by advanced AI agents
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Lightning Fast</h4>
                    <p className="text-sm text-muted-foreground">
                      Go from idea to published website in minutes, not days
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">No Coding Required</h4>
                    <p className="text-sm text-muted-foreground">
                      Perfect for businesses, freelancers, and personal projects
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Feature-Packed</h4>
                    <p className="text-sm text-muted-foreground">
                      Professional designs, responsive layouts, and modern features
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
          <div className="text-center">
            <Button 
              size="lg" 
              className="text-lg px-8 gap-2"
              onClick={handleGetEarlyAccess}
            >
              <Sparkles className="h-5 w-5" />
              Get Early Access
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Join the waitlist and be among the first to experience the future of website building
            </p>
          </div>
        </div>
      </section>

      <AIWebsiteBuilderModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
});

AIWebsiteBuilder.displayName = 'AIWebsiteBuilder';
