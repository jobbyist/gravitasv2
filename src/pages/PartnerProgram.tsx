import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, Download, Mail, Building2, Rocket, TrendingUp, Users, Globe, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const PartnerProgram = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. Our team will contact you within 24 hours.",
    });
    
    setFormData({ name: '', email: '', company: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const benefits = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Complete Business-in-a-Box",
      description: "Full-featured website, brand identity design, and branded marketing materials tailored to your niche"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Fast Launch",
      description: "Go from idea to operational agency in 2-4 weeks with our streamlined onboarding process"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "50/50 Revenue Share",
      description: "Straightforward revenue sharing makes it easy to predict margins and grow stable monthly income"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Dedicated Support",
      description: "World-class support with dedicated account manager plus 24/7 assistance via phone, chat, and email"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Enterprise-Grade Services",
      description: "AI services, web development, e-commerce, content creation, domain registration, and digital marketing"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "High-Retention Services",
      description: "Stack high-demand services into recurring packages for predictable growth"
    }
  ];

  const services = [
    "AI Services & Automations",
    "Web Design & Development",
    "E-commerce Builds & Integrations",
    "Content Creation",
    "Domain Name Registration",
    "Full-Spectrum Digital Marketing",
    "Custom Management Dashboards",
    "Admin CMS Systems"
  ];

  const faqs = [
    {
      question: "What's included in the $250 monthly subscription?",
      answer: "Your monthly subscription includes a full-featured website tailored to your niche, professional brand identity design, branded marketing materials, paid advertising campaign support, custom management dashboards/admin CMS systems, a dedicated account manager, and 24/7 support via phone, chat, and email."
    },
    {
      question: "Can the $1,000 setup fee be waived?",
      answer: "Yes! The setup fee can be waived if you have an existing sales pipeline of at least 5 clients who are actively paying for services or ready to sign upon joining. You'll need to provide proof of intent such as signed service agreements and relevant contact information for verification."
    },
    {
      question: "How long does it take to launch?",
      answer: "Turnaround time is 2-4 weeks from onboarding to launch. This means you can go from 'idea' to 'operational agency' in under a month with minimal friction."
    },
    {
      question: "How does the 50/50 revenue share work?",
      answer: "Revenue is shared on a straightforward 50/50 basis. This makes it easy to predict margins, scale delivery, and grow stable monthly income as your client base expands."
    },
    {
      question: "What countries is the program available in?",
      answer: "The Gravitas White-Label Partner Program is currently available in South Africa, the United States, Australia, New Zealand, India, Malaysia, Singapore, Ireland, Nigeria, Kenya, the United Kingdom, and Canada."
    },
    {
      question: "What level of technical expertise do I need?",
      answer: "You don't need a technical background! You bring the brand and client relationships; Gravitas delivers the infrastructure, fulfillment, and enterprise-grade support. Our team handles all the technical aspects."
    },
    {
      question: "What's your customer satisfaction rating?",
      answer: "We maintain a 98% customer satisfaction rating, backed by our proven track record of delivering enterprise-grade work."
    },
    {
      question: "Can I customize the services for my clients?",
      answer: "Absolutely! Our services are designed to stack neatly into recurring packages that you can customize based on your clients' needs and your business model."
    }
  ];

  const availableCountries = [
    "South Africa", "United States", "Australia", "New Zealand", "India", "Malaysia",
    "Singapore", "Ireland", "Nigeria", "Kenya", "United Kingdom", "Canada"
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="White Label Partner Program | Gravitas Industries"
        description="Join the Gravitas White-Label Partner Program. Launch your digital agency in 2-4 weeks with $250/month. AI services, web development, Shopify, marketing & more. 50/50 revenue share. Available in 12+ countries."
        keywords="white label partner program, digital agency partnership, reseller program, white label web design, white label digital marketing, agency partnership, Shopify partner program, white label AI services"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Gravitas White-Label Partner Program",
          "description": "Turnkey partnership for launching a digital agency with AI services, web development, and marketing",
          "provider": {
            "@type": "Organization",
            "name": "Gravitas Industries"
          },
          "offers": {
            "@type": "Offer",
            "price": "250",
            "priceCurrency": "USD",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "billingIncrement": 1,
              "unitText": "monthly"
            }
          },
          "areaServed": ["ZA", "US", "AU", "NZ", "IN", "MY", "SG", "IE", "NG", "KE", "GB", "CA"]
        }}
      />
      <Header />
      
      <main id="main-content" className="container-blog py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Gravitas White-Label Partner Program
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            The fastest path to running a premium, scalable digital agency under your own name
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A turnkey, subscription-based partnership built for ambitious individuals and agencies who want to launch (or scale) a modern digital services business fast—without hiring a full in-house team.
          </p>
        </div>

        {/* Pricing Card */}
        <Card className="max-w-3xl mx-auto mb-16 border-primary">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl flex items-center justify-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              Simple, Transparent Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Monthly Subscription</p>
                <p className="text-4xl font-bold text-foreground">$250</p>
                <p className="text-sm text-muted-foreground mt-2">per month</p>
              </div>
              <div className="text-center p-6 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">One-Time Setup Fee</p>
                <p className="text-4xl font-bold text-foreground">$1,000</p>
                <p className="text-sm text-primary mt-2 font-medium">Can be waived*</p>
              </div>
            </div>
            <div className="text-center p-6 bg-primary/10 rounded-lg border border-primary">
              <p className="text-lg font-semibold text-foreground mb-2">50/50 Revenue Share</p>
              <p className="text-sm text-muted-foreground">
                Straightforward revenue sharing for predictable margins and stable growth
              </p>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              * Setup fee waived with 5+ active/ready clients upon joining
            </p>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What You Get
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="text-primary mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Services Included
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Clock className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold">2-4 Weeks to Launch</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  From onboarding to operational agency—designed to minimize friction and maximize speed. 
                  Start selling with confidence and deliver enterprise-grade work under your own brand.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Availability Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Available Worldwide
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableCountries.map((country, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-sm">{country}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sign Up Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Apply to Join</CardTitle>
              <CardDescription>
                Fill out the form below to get started. Our team will contact you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Brand Name</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Your company or brand name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Tell Us About Your Business</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Share details about your existing business, client pipeline, or goals..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Application
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  For additional queries, contact us at{' '}
                  <a href="mailto:partners@gravitas.uno" className="text-primary hover:underline">
                    partners@gravitas.uno
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Download Brochure */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="pt-6">
              <Download className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Download Service Brochure</h3>
              <p className="text-muted-foreground mb-6">
                Get detailed information about our partner program and services
              </p>
              <Button asChild size="lg">
                <a href="/src/assets/gravitas-partner-program.pdf" download>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Brochure
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Launch Your Agency?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Join the Gravitas White-Label Partner Program today and start building your digital empire.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <a href="#main-content">Apply Now</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <a href="mailto:partners@gravitas.uno">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartnerProgram;
