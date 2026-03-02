import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2 } from 'lucide-react';
import { trackEvent } from '@/lib/tracking';

interface ProductDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDemoModal({ open, onOpenChange }: ProductDemoModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    productInterest: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Log form data for now (in production, this would send to backend)
    console.log('Product Demo Request:', formData);
    
    trackEvent('product_demo_requested', { 
      product: formData.productInterest,
      source: 'partner_program_highlight'
    });

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        productInterest: '',
        message: ''
      });
      onOpenChange(false);
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request A Free Product Demo</DialogTitle>
          <DialogDescription>
            Fill out the form below and our team will reach out to schedule your personalized demo of our White-Label Partner Program.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Demo Request Submitted!</h3>
              <p className="text-sm text-muted-foreground">
                We'll contact you within 24 hours to schedule your demo.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demo-name">Full Name *</Label>
              <Input
                id="demo-name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-email">Email Address *</Label>
              <Input
                id="demo-email"
                type="email"
                placeholder="john@company.com"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-company">Company Name</Label>
              <Input
                id="demo-company"
                placeholder="Your Company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-phone">Phone Number</Label>
              <Input
                id="demo-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-product">Product Interest *</Label>
              <Select 
                required
                value={formData.productInterest}
                onValueChange={(value) => handleChange('productInterest', value)}
              >
                <SelectTrigger id="demo-product">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="websites">Website Development</SelectItem>
                  <SelectItem value="ecommerce">E-Commerce Solutions</SelectItem>
                  <SelectItem value="ai">AI Website Builder (Origin)</SelectItem>
                  <SelectItem value="auctions">Auctions Platform</SelectItem>
                  <SelectItem value="brand-kits">Brand Kits</SelectItem>
                  <SelectItem value="full-suite">Full Partner Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-message">Additional Details</Label>
              <Textarea
                id="demo-message"
                placeholder="Tell us about your needs and what you'd like to see in the demo..."
                rows={3}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Request Demo'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
