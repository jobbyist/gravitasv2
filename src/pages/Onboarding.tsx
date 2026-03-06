import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Rocket, Building2, Layers, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingData {
  businessName: string;
  industry: string;
  website: string;
  phone: string;
  services: string[];
}

const SERVICES_OPTIONS = [
  { id: 'website', label: 'Website Design & Development' },
  { id: 'hosting', label: 'Web Hosting' },
  { id: 'email', label: 'Professional Email' },
  { id: 'seo', label: 'SEO & Digital Marketing' },
  { id: 'social', label: 'Social Media Management' },
  { id: 'branding', label: 'Branding & Logo Design' },
  { id: 'ecommerce', label: 'E-Commerce / Online Store' },
  { id: 'support', label: 'Ongoing Maintenance & Support' },
];

const STEPS = [
  { id: 1, label: 'Welcome', icon: Sparkles },
  { id: 2, label: 'Business Info', icon: Building2 },
  { id: 3, label: 'Services', icon: Layers },
  { id: 4, label: 'All Done', icon: CheckCircle2 },
];

export default function Onboarding() {
  const { user, isAuthenticated, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    businessName: '',
    industry: '',
    website: '',
    phone: '',
    services: [],
  });

  // Redirect unauthenticated users to signup
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  const toggleService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  };

  const handleFinish = () => {
    // Save onboarding data to localStorage (in production, call the backend API)
    if (user) {
      localStorage.setItem(`gravitas_profile_${user.id}`, JSON.stringify(data));
    }
    completeOnboarding();
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-purple-500/5 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <a href="/" className="mb-8 flex items-center gap-2">
        <span className="text-2xl font-extrabold tracking-tight">
          Gravitas<span className="text-primary">.</span>
        </span>
      </a>

      {/* Step Indicator */}
      <div className="w-full max-w-lg mb-6">
        <div className="flex justify-between mb-2">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className={cn(
                  'flex flex-col items-center gap-1 text-xs font-medium transition-colors',
                  step >= s.id ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <div
                  className={cn(
                    'h-8 w-8 rounded-full flex items-center justify-center transition-colors',
                    step > s.id
                      ? 'bg-primary text-primary-foreground'
                      : step === s.id
                      ? 'bg-primary/10 border-2 border-primary text-primary'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <span className="hidden sm:block">{s.label}</span>
              </div>
            );
          })}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="w-full max-w-lg">
        {/* Step 1 – Welcome */}
        {step === 1 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Rocket className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">Welcome to Gravitas, {user.name.split(' ')[0]}! 🎉</CardTitle>
              <CardDescription className="text-base">
                Let's take a few minutes to personalise your dashboard so we can serve you better.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🌐', label: 'Manage your services' },
                  { icon: '💳', label: 'Track invoices & payments' },
                  { icon: '🎫', label: 'Create support tickets' },
                  { icon: '🎁', label: 'Earn referral rewards' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3 text-sm"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full" size="lg" onClick={() => setStep(2)}>
                Let's Get Started
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                This takes about 2 minutes.{' '}
                <button
                  type="button"
                  className="underline hover:no-underline"
                  onClick={handleFinish}
                >
                  Skip for now
                </button>
              </p>
            </CardContent>
          </Card>
        )}

        {/* Step 2 – Business Info */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" /> Tell us about your business
              </CardTitle>
              <CardDescription>This helps us tailor your experience. All fields are optional.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => { e.preventDefault(); setStep(3); }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business / Brand Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Acme Inc."
                    value={data.businessName}
                    onChange={(e) => setData((d) => ({ ...d, businessName: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={data.industry}
                    onValueChange={(v) => setData((d) => ({ ...d, industry: v }))}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        'Retail & E-Commerce',
                        'Food & Hospitality',
                        'Health & Wellness',
                        'Beauty & Personal Care',
                        'Professional Services',
                        'Real Estate',
                        'Education & Training',
                        'Technology',
                        'Creative & Media',
                        'Non-Profit',
                        'Other',
                      ].map((ind) => (
                        <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Current Website (if any)</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    value={data.website}
                    onChange={(e) => setData((d) => ({ ...d, website: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+27 XX XXX XXXX"
                    value={data.phone}
                    onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Continue
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3 – Services Interest */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" /> What services interest you?
              </CardTitle>
              <CardDescription>Select all that apply. We'll highlight relevant options in your dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {SERVICES_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors',
                      data.services.includes(option.id) ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                    )}
                    onClick={() => toggleService(option.id)}
                  >
                    <Checkbox
                      id={option.id}
                      checked={data.services.includes(option.id)}
                      onCheckedChange={() => toggleService(option.id)}
                    />
                    <label htmlFor={option.id} className="text-sm cursor-pointer flex-1">
                      {option.label}
                    </label>
                    {data.services.includes(option.id) && (
                      <Badge variant="secondary" className="text-xs">Selected</Badge>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button className="flex-1" onClick={() => setStep(4)}>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4 – Complete */}
        {step === 4 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-green-600" />
              </div>
              <CardTitle className="text-2xl">You're all set!</CardTitle>
              <CardDescription className="text-base">
                Your dashboard is ready. Start managing your services, paying invoices, and earning referral rewards.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.services.length > 0 && (
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium mb-2">Services you're interested in:</p>
                  <div className="flex flex-wrap gap-2">
                    {data.services.map((id) => (
                      <Badge key={id} variant="secondary">
                        {SERVICES_OPTIONS.find((o) => o.id === id)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <Button className="w-full" size="lg" onClick={handleFinish}>
                <Rocket className="h-4 w-4 mr-2" />
                Go to My Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
