import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield } from 'lucide-react';

interface UpsellsSectionProps {
  onQuoteClick: () => void;
}

export const UpsellsSection = memo(function UpsellsSection({ onQuoteClick }: UpsellsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30 border-y">
      <div className="container-blog">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Additional Services</h2>
            <p className="text-xl text-muted-foreground">
              Enhance your website with premium hosting and professional email
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Premium Hosting */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  <Shield className="h-3 w-3 mr-1" />
                  Recommended
                </Badge>
                <CardTitle className="text-2xl">Premium Hosting</CardTitle>
                <CardDescription>
                  Fast, secure, and reliable hosting for your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-4xl font-bold">$9.99</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>99.9% uptime guarantee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Free SSL certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Daily automated backups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>DDoS protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>24/7 technical support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Global CDN included</span>
                  </li>
                </ul>
                
                <Button className="w-full" onClick={onQuoteClick}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Professional Email */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Professional Email</CardTitle>
                <CardDescription>
                  Custom email addresses for your domain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-4xl font-bold">$2.49</div>
                  <div className="text-sm text-muted-foreground">per month (billed annually)</div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Custom domain email (you@yourdomain.com)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>10GB storage per mailbox</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Webmail and mobile access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Spam and virus protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Calendar and contacts sync</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>IMAP/POP3/SMTP support</span>
                  </li>
                </ul>
                
                <Button className="w-full" variant="outline" onClick={onQuoteClick}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
});
