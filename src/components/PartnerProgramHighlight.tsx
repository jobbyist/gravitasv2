import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, Rocket, TrendingUp } from 'lucide-react';
import { ProductDemoModal } from '@/components/ProductDemoModal';

const PartnerProgramHighlight = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <section className="container-blog py-16 bg-gradient-to-b from-background to-accent/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm px-4 py-2 gap-2">
              <Sparkles className="h-4 w-4" />
              Newly Launched
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              White-Label Partner Program
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our exclusive partner network and grow your business with our proven digital solutions. 
              Offer premium services under your own brand while we handle the heavy lifting.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">Partner Network</h3>
                <p className="text-sm text-muted-foreground">
                  Access our full suite of digital products and services
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">White-Label Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  Rebrand and resell our services as your own
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">Revenue Sharing</h3>
                <p className="text-sm text-muted-foreground">
                  Generous commission structure and profit margins
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => window.location.href = '/partner-program'}
            >
              <Rocket className="h-5 w-5 mr-2" />
              Find Out More
            </Button>
            
            <div>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="text-sm text-primary hover:underline font-medium"
              >
                Request A Free Product Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <ProductDemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </>
  );
};

export default PartnerProgramHighlight;
