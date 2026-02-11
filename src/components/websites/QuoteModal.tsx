import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { MultiStepForm } from './MultiStepForm';
import { trackEvent } from '@/lib/tracking';
import { CheckCircle2 } from 'lucide-react';

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  businessIndustry: string;
  websiteType: string[];
  neededFeatures: string[];
  timeline: string;
  budgetRange: string;
  competitorLinks: string;
}

const websiteTypes = [
  'Blogging/Publishing',
  'Affiliate Marketing',
  'E-Commerce',
  'Portfolio',
  'Custom Web App',
  'Subscription Based',
];

const features = [
  'Contact Form',
  'Blog/News Section',
  'E-Commerce Shop',
  'Booking System',
  'User Accounts',
  'Payment Integration',
  'Search Functionality',
  'Multi-Language',
];

const timelines = [
  'ASAP',
  '1-2 weeks',
  '1 month',
  'Flexible',
];

const budgetRanges = [
  'R5,000 - R10,000',
  'R10,000 - R20,000',
  'R20,000 - R50,000',
  'R50,000+',
];

export function QuoteModal({ open, onOpenChange }: QuoteModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    businessIndustry: '',
    websiteType: [],
    neededFeatures: [],
    timeline: '',
    budgetRange: '',
    competitorLinks: '',
  });

  const totalSteps = 4;

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleWebsiteType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      websiteType: prev.websiteType.includes(type)
        ? prev.websiteType.filter(t => t !== type)
        : [...prev.websiteType, type],
    }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      neededFeatures: prev.neededFeatures.includes(feature)
        ? prev.neededFeatures.filter(f => f !== feature)
        : [...prev.neededFeatures, feature],
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.email && formData.phone);
      case 2:
        return !!(formData.businessIndustry && formData.websiteType.length > 0);
      case 3:
        return !!(formData.timeline && formData.budgetRange);
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      trackEvent('form_step_complete', { modal: 'quote', step: currentStep });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // TODO: Send to actual backend endpoint
      console.log('Quote form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      trackEvent('form_submit_success', { modal: 'quote', data: formData });
      setIsSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
      trackEvent('form_submit_error', { modal: 'quote', error: String(error) });
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after close animation
    setTimeout(() => {
      setCurrentStep(1);
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessIndustry: '',
        websiteType: [],
        neededFeatures: [],
        timeline: '',
        budgetRange: '',
        competitorLinks: '',
      });
    }, 300);
  };

  const renderStep = () => {
    if (isSuccess) {
      return (
        <div className="text-center space-y-4 py-8">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold">Thank You!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We've received your quote request. Our team will review your requirements and send you a detailed proposal within 24 hours.
          </p>
          <p className="text-sm text-muted-foreground">
            No spam. WhatsApp-friendly.
          </p>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone / WhatsApp *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+27 12 345 6789"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Details</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="businessIndustry">Business / Industry *</Label>
                <Input
                  id="businessIndustry"
                  value={formData.businessIndustry}
                  onChange={(e) => updateField('businessIndustry', e.target.value)}
                  placeholder="e.g., Retail, Healthcare, Technology"
                  required
                />
              </div>
              <div>
                <Label>Website Type * (select at least one)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {websiteTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={formData.websiteType.includes(type)}
                        onCheckedChange={() => toggleWebsiteType(type)}
                      />
                      <Label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Requirements & Timeline</h3>
            <div className="space-y-3">
              <div>
                <Label>Needed Features (optional)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={`feature-${feature}`}
                        checked={formData.neededFeatures.includes(feature)}
                        onCheckedChange={() => toggleFeature(feature)}
                      />
                      <Label htmlFor={`feature-${feature}`} className="text-sm cursor-pointer">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="timeline">Timeline *</Label>
                <Select value={formData.timeline} onValueChange={(value) => updateField('timeline', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="When do you need this?" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelines.map((timeline) => (
                      <SelectItem key={timeline} value={timeline}>
                        {timeline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budgetRange">Budget Range *</Label>
                <Select value={formData.budgetRange} onValueChange={(value) => updateField('budgetRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="competitorLinks">Competitor / Inspiration Links (optional)</Label>
                <Textarea
                  id="competitorLinks"
                  value={formData.competitorLinks}
                  onChange={(e) => updateField('competitorLinks', e.target.value)}
                  placeholder="Share any websites you like or want to compete with"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Information</h3>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{formData.name}</span>
                
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{formData.email}</span>
                
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{formData.phone}</span>
                
                <span className="text-muted-foreground">Industry:</span>
                <span className="font-medium">{formData.businessIndustry}</span>
                
                <span className="text-muted-foreground">Timeline:</span>
                <span className="font-medium">{formData.timeline}</span>
                
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium">{formData.budgetRange}</span>
              </div>
              
              {formData.websiteType.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Website Types:</span>
                  <div className="mt-1">{formData.websiteType.join(', ')}</div>
                </div>
              )}
              
              {formData.neededFeatures.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Needed Features:</span>
                  <div className="mt-1">{formData.neededFeatures.join(', ')}</div>
                </div>
              )}
              
              {formData.competitorLinks && (
                <div>
                  <span className="text-muted-foreground">Inspiration Links:</span>
                  <div className="mt-1 break-all">{formData.competitorLinks}</div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Get A Free Quote In 10 Minutes</DialogTitle>
          <DialogDescription>
            Tell us about your project and we'll send you a detailed quote
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          renderStep()
        ) : (
          <MultiStepForm
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
            canGoNext={validateStep(currentStep)}
            isSubmitting={isSubmitting}
          >
            {renderStep()}
          </MultiStepForm>
        )}
      </DialogContent>
    </Dialog>
  );
}
