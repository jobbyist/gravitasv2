import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      name: "Redemption Law Group",
      url: "www.redemption.legal",
      fullUrl: "https://www.redemption.legal",
      description: "Professional legal services platform delivering comprehensive legal solutions with modern design and accessibility.",
      category: "Legal Services"
    },
    {
      name: "Luna Lux Hair",
      url: "www.lunaluxhair.com",
      fullUrl: "https://www.lunaluxhair.com",
      description: "Premium hair care and beauty e-commerce platform offering luxury products and expert styling guidance.",
      category: "E-commerce"
    },
    {
      name: "Workhorse",
      url: "www.workhorse.africa",
      fullUrl: "https://www.workhorse.africa",
      description: "Innovative workforce management and recruitment platform connecting talent with opportunities across Africa.",
      category: "HR Tech"
    },
    {
      name: "SkinLabs® South Africa",
      url: "www.skinlabs.co.za",
      fullUrl: "https://www.skinlabs.co.za",
      description: "Advanced skincare solutions combining science and nature for healthy, radiant skin.",
      category: "Healthcare & Beauty"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcasing our client success stories and innovative solutions across diverse industries.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">{project.name}</CardTitle>
                      <CardDescription className="text-base font-medium text-primary">
                        {project.category}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-muted-foreground">{project.url}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                    >
                      <a 
                        href={project.fullUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Visit Site
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6 pt-8">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with innovative, sustainable solutions.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/lead-generation">Request a Quote</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
