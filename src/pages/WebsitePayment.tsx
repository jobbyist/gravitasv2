import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield, CreditCard, Sparkles } from 'lucide-react';
import { basePackageIncludes } from '@/lib/pricingConfig';

const WebsitePayment = () => {
  const handlePayfastPayment = () => {
    // PayFast integration will be implemented later
    console.log('PayFast payment initiated');
  };

  const handlePayPalPayment = () => {
    // PayPal integration will be implemented later
    console.log('PayPal payment initiated');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="py-16 md:py-24">
        <div className="container-blog">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
              <Badge variant="secondary" className="text-sm px-4 py-1.5">
                <Sparkles className="h-4 w-4 mr-2" />
               International Women's Month Special
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold">
                Basic Website Starter Pack - $199 once off
              </h1>
              <p className="text-xl text-muted-foreground">
                Basic 5-page website ideal for personal websites, portfolios and small business websites
              </p>
            </div>

            {/* Offer Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* What's Included */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    What's Included
                  </CardTitle>
                  <CardDescription>
                    Everything you need to get online
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

              {/* Pricing Summary */}
              <Card className="border-2 border-primary">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    <Shield className="h-3 w-3 mr-1" />
                    Special Offer
                  </Badge>
                  <CardTitle className="text-2xl">Pricing Summary</CardTitle>
                  <CardDescription>
                    One-time setup + monthly services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Website Setup</span>
                      <span className="text-2xl font-bold text-primary">$199</span>
                    </div>
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-muted-foreground">Standard Hosting</span>
                        <span className="text-sm font-medium">$10/month</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-muted-foreground">Professional Email (5 users)</span>
                        <span className="text-sm font-medium">$1.99/month*</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-muted-foreground">Domain Registration (first year)</span>
                        <span className="text-sm font-medium text-green-600">FREE</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Monthly</span>
                        <span className="text-xl font-bold">$11.99/month</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 inline mr-1" />
                      30-day money-back guarantee. No long-term contracts.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      *Email pricing is billed annually ($23.88/year)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Options */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Choose Your Payment Method
                </CardTitle>
                <CardDescription>
                  Secure payment processing with industry-leading providers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full text-lg gap-2"
                  onClick={handlePayfastPayment}
                >
                  <CreditCard className="h-5 w-5" />
                  Pay Now with PayFast
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full text-lg gap-2"
                  onClick={handlePayPalPayment}
                >
                  <CreditCard className="h-5 w-5" />
                  Checkout with PayPal
                </Button>
                
                <p className="text-sm text-muted-foreground text-center pt-4">
                  Payment buttons will be fully integrated soon. For now, please contact us to claim this special offer.
                </p>
              </CardContent>
            </Card>

            {/* Trust Elements */}
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Money-back Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>No Hidden Fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WebsitePayment;
