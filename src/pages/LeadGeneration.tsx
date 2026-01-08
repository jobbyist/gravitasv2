import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, Target } from 'lucide-react';

const LeadGeneration = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Work With Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Book a free 15-minute discovery call to explore how we can collaborate 
              and bring your innovative ideas to life.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Flexible Scheduling</CardTitle>
                <CardDescription>
                  Choose a time that works best for you from our available slots
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Quick & Efficient</CardTitle>
                <CardDescription>
                  Just 15 minutes to understand your needs and explore opportunities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>For Everyone</CardTitle>
                <CardDescription>
                  Clients, agencies, investors, and partners - all are welcome
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Tailored Solutions</CardTitle>
                <CardDescription>
                  We'll discuss custom solutions designed specifically for your goals
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-base">
                Book your free 15-minute discovery call now and let's explore how we can work together
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-8">
              <Button 
                size="lg" 
                className="uppercase tracking-wider text-lg px-8"
                asChild
              >
                <a 
                  href="https://calendly.com/gravitas-discovery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Schedule Your Discovery Call
                  <span className="ml-2" aria-hidden="true">→</span>
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Who Is This For Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-foreground">
              Who Is This For?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Potential Clients</h3>
                <p className="text-muted-foreground">
                  Looking to develop innovative products or services with expert guidance
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Agencies</h3>
                <p className="text-muted-foreground">
                  Seeking technical partnership or collaboration on client projects
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Investors</h3>
                <p className="text-muted-foreground">
                  Interested in our vision and exploring investment opportunities
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Strategic Partners</h3>
                <p className="text-muted-foreground">
                  Looking to create synergies and collaborative ventures
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeadGeneration;
