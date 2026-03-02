import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { trackEvent } from '@/lib/tracking';
import { CheckCircle2, Sparkles, Loader2 } from 'lucide-react';

interface AIWebsiteBuilderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  usageType: 'business' | 'personal' | '';
  referralCode: string;
}

export function AIWebsiteBuilderModal({ open, onOpenChange }: AIWebsiteBuilderModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    usageType: '',
    referralCode: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.usageType) {
      newErrors.usageType = 'Please select how you wish to use the service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Track the early access request
      trackEvent('early_access_request', {
        service: 'ai_website_builder',
        usage_type: formData.usageType,
        has_referral: !!formData.referralCode,
      });

      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Log form data for now (in production, this would send to backend)
      console.log('AI Website Builder Early Access Request:', formData);

      setIsSuccess(true);
      trackEvent('early_access_success', { service: 'ai_website_builder' });
    } catch (error) {
      console.error('Error submitting form:', error);
      trackEvent('early_access_error', { service: 'ai_website_builder' });
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      // Reset form after a delay to avoid flickering
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          usageType: '',
          referralCode: '',
        });
        setErrors({});
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3">
                <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-500" />
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl">You're on the List! 🎉</DialogTitle>
              <DialogDescription className="text-base pt-2">
                Thank you for your interest in our AI Website Builder. We'll be in touch soon with early access details.
                {formData.referralCode && (
                  <span className="block mt-2 text-primary font-medium">
                    You and your referrer will each receive 100 free credits when you gain access!
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleClose} className="mt-4">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <DialogTitle>Request Early Access</DialogTitle>
              </div>
              <DialogDescription>
                Join the waitlist for our AI Website Builder and be among the first to create websites with AI.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="John Doe"
                  className={errors.name ? 'border-destructive' : ''}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="john@example.com"
                  className={errors.email ? 'border-destructive' : ''}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+27 123 456 7890"
                  className={errors.phone ? 'border-destructive' : ''}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  How will you use the service? <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={formData.usageType}
                  onValueChange={(value) => updateField('usageType', value)}
                  disabled={isSubmitting}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business" className="font-normal cursor-pointer">
                      Business use
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="personal" id="personal" />
                    <Label htmlFor="personal" className="font-normal cursor-pointer">
                      Personal use
                    </Label>
                  </div>
                </RadioGroup>
                {errors.usageType && (
                  <p className="text-sm text-destructive">{errors.usageType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralCode">
                  Invite/Referral Code <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Input
                  id="referralCode"
                  value={formData.referralCode}
                  onChange={(e) => updateField('referralCode', e.target.value)}
                  placeholder="Enter code if you were invited"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                  Both you and your referrer will receive 100 free credits!
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Request Early Access'
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
