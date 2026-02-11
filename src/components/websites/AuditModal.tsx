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

interface AuditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  budgetRange: string;
  websiteType: string[];
  currentPlatform: string;
  websiteUrl: string;
  primaryGoal: string;
  biggestIssue: string;
}

const websiteTypes = [
  'Blogging/Publishing',
  'Affiliate Marketing',
  'E-Commerce',
  'Portfolio',
  'Custom Web App',
  'Subscription Based',
];

const platforms = [
  'Shopify',
  'WooCommerce',
  'WordPress',
  'Webflow',
  'Other',
];

const budgetRanges = [
  'R5,000 - R10,000',
  'R10,000 - R20,000',
  'R20,000 - R50,000',
  'R50,000+',
];

const primaryGoals = [
  'Generate More Leads',
  'Increase Sales',
  'Get More Bookings',
  'Build Brand Awareness',
  'Other',
];

export function AuditModal({ open, onOpenChange }: AuditModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    budgetRange: '',
    websiteType: [],
    currentPlatform: '',
    websiteUrl: '',
    primaryGoal: '',
    biggestIssue: '',
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

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.email && formData.phone);
      case 2:
        return !!(formData.budgetRange && formData.currentPlatform && formData.websiteUrl);
      case 3:
        return !!(formData.primaryGoal);
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      trackEvent('form_step_complete', { modal: 'audit', step: currentStep });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // TODO: Send to actual backend endpoint
      console.log('Audit form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      trackEvent('form_submit_success', { modal: 'audit', data: formData });
      setIsSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
      trackEvent('form_submit_error', { modal: 'audit', error: String(error) });
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
        businessName: '',
        budgetRange: '',
        websiteType: [],
        currentPlatform: '',
        websiteUrl: '',
        primaryGoal: '',
        biggestIssue: '',
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
            We've received your website audit request. Our team will review your site and respond within 24 hours with a detailed analysis and recommendations.
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
              <div>
                <Label htmlFor="businessName">Business Name (optional)</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                  placeholder="Your Business"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Website Details</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="websiteUrl">Website URL *</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => updateField('websiteUrl', e.target.value)}
                  placeholder="https://yourwebsite.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="currentPlatform">Current Platform *</Label>
                <Select value={formData.currentPlatform} onValueChange={(value) => updateField('currentPlatform', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Website Type (optional)</Label>
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
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Goals</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="primaryGoal">Primary Goal *</Label>
                <Select value={formData.primaryGoal} onValueChange={(value) => updateField('primaryGoal', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="What's your main objective?" />
                  </SelectTrigger>
                  <SelectContent>
                    {primaryGoals.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="biggestIssue">Biggest Issue (optional)</Label>
                <Textarea
                  id="biggestIssue"
                  value={formData.biggestIssue}
                  onChange={(e) => updateField('biggestIssue', e.target.value)}
                  placeholder="What's the main problem you're facing with your current website?"
                  rows={4}
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
                
                {formData.businessName && (
                  <>
                    <span className="text-muted-foreground">Business:</span>
                    <span className="font-medium">{formData.businessName}</span>
                  </>
                )}
                
                <span className="text-muted-foreground">Website:</span>
                <span className="font-medium break-all">{formData.websiteUrl}</span>
                
                <span className="text-muted-foreground">Platform:</span>
                <span className="font-medium">{formData.currentPlatform}</span>
                
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium">{formData.budgetRange}</span>
                
                <span className="text-muted-foreground">Goal:</span>
                <span className="font-medium">{formData.primaryGoal}</span>
              </div>
              
              {formData.websiteType.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Website Types:</span>
                  <div className="mt-1">{formData.websiteType.join(', ')}</div>
                </div>
              )}
              
              {formData.biggestIssue && (
                <div>
                  <span className="text-muted-foreground">Biggest Issue:</span>
                  <div className="mt-1">{formData.biggestIssue}</div>
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
          <DialogTitle>Request A Free Website Audit</DialogTitle>
          <DialogDescription>
            Get a comprehensive analysis of your current website with actionable recommendations
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
