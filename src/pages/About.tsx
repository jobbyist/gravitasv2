import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PartnerLogoSlider from '@/components/PartnerLogoSlider';
import { Mail, MapPin, Calendar, Hammer, Globe, Package, ShoppingCart, Users, Monitor } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="container-blog py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Gravitas Industries
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A multidisciplinary innovation platform leveraging AI and cutting-edge technology to deliver 
              comprehensive digital solutions—from custom websites and e-commerce platforms to brand identity, 
              domain services, and white-label partnership opportunities
            </p>
          </div>

          {/* Partner Logos Slider */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Powered By Trusted Partners
              </h2>
              <p className="text-muted-foreground">
                Built on world-class technology and trusted integrations
              </p>
            </div>
            <PartnerLogoSlider />
          </div>

          {/* Platform Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Our Platform & Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Auctions */}
              <div className="bg-muted/30 p-6 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Hammer className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Auctions</h3>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Explore our high-value digital asset portfolio and submit bids for equity ownership 
                  in our ongoing development projects. Access exclusive opportunities in innovative ventures.
                </p>
              </div>

              {/* Domains */}
              <div className="bg-muted/30 p-6 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Domains</h3>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Register your domain name with ease through Gravitas Domains and get started with your 
                  next big project. Powered by our partnership with name.com for reliable domain services.
                </p>
              </div>

              {/* Brand Kits */}
              <div className="bg-muted/30 p-6 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Brand Kits</h3>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Professionally designed brand identity kits crafted to help your business stand out. 
                  Get comprehensive brand guidelines with modern design elements tailored to your needs.
                </p>
              </div>

              {/* Commerce */}
              <div className="bg-muted/30 p-6 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Commerce</h3>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  High-impact Shopify development delivering professional, custom-built Online Store 2.0 
                  storefronts. One-time investment of $500 with unlimited pages, integrations, and revisions.
                </p>
              </div>

              {/* White Label Partner Program */}
              <div className="bg-muted/30 p-6 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">White Label Partner Program</h3>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Complete business-in-a-box solution with full-featured websites, brand identity design, 
                  and marketing materials. Launch your own agency in 2-4 weeks with our streamlined process.
                </p>
              </div>

              {/* Websites */}
              <div className="bg-muted/30 p-6 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Monitor className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Websites & Solutions</h3>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Custom web development and digital solutions tailored to your business needs. From 
                  portfolios to enterprise platforms, we build scalable, modern websites that perform.
                </p>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Gravitas Industries is a multidisciplinary venture that serves as a catalyst for innovation. 
                  We combine cutting-edge artificial intelligence with our own technical and creative expertise 
                  to develop products and services that are both innovative and sustainable.
                </p>
                <p>
                  Our approach is rooted in understanding the diverse needs of consumers across multiple industries. 
                  We design solutions that serve markets in various socio-economic backgrounds, ensuring that 
                  innovation is accessible and impactful for all.
                </p>
                <p>
                  By leveraging AI as a powerful tool alongside human ingenuity, we create sustainable products 
                  and services that address real-world challenges while maintaining a commitment to environmental 
                  and social responsibility.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Our Approach</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">AI-powered innovation and development</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Multidisciplinary technical expertise</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Sustainable and responsible design</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Solutions for diverse socio-economic markets</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-4">Industries We Serve</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Technology & Innovation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Consumer Products & Services</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Sustainable Solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Partner With Us
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Interested in collaborating on innovative solutions? We work with partners across industries 
              to bring sustainable, AI-powered products and services to market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/partner-program">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;