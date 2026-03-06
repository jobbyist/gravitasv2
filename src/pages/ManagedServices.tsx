import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

// ─── Service definitions ────────────────────────────────────────────────────

interface ServiceOption {
  id: string;
  label: string;
  description: string;
  price: number; // monthly price in USD
  note?: string;
  /** If the service has tier variants, they are listed here */
  tiers?: { id: string; label: string; price: number }[];
}

const MANAGED_SERVICES: ServiceOption[] = [
  {
    id: 'website',
    label: 'Website Development & Design + Ongoing Maintenance & Upgrades',
    description: 'Professional web development with monthly maintenance hours.',
    price: 49,
    tiers: [
      { id: 'website_basic', label: '$49 / mo – 10 billable hours per month', price: 49 },
      { id: 'website_pro', label: '$99 / mo – 20 billable hours per month', price: 99 },
    ],
  },
  {
    id: 'ads',
    label: 'Paid Ad Campaign Management & Performance Reports',
    description: 'Google Ads, Meta Ads, and other paid campaigns with monthly reporting.',
    price: 19.99,
    note: '+$19.99 / mo',
  },
  {
    id: 'analytics',
    label: 'Google Analytics Integration & Monthly Insights Reports',
    description: 'GA4 setup, goal tracking, and monthly insights delivered to your inbox.',
    price: 9.99,
    note: '+$9.99 / mo',
  },
  {
    id: 'email_marketing',
    label: 'Email Marketing Campaigns & Performance Reports',
    description: 'Designed email campaigns with open-rate and click-rate reporting.',
    price: 7.49,
    note: '+$7.49 / mo',
  },
  {
    id: 'admin',
    label: 'Virtual Administrative Assistance',
    description: 'Up to 10 hours of virtual admin support per month.',
    price: 25,
    note: '+$25 / mo – up to 10 hours',
  },
  {
    id: 'digital_marketing',
    label: 'Digital Marketing (SEO, Content Creation, Social Media Management etc)',
    description: 'Comprehensive digital marketing across all major channels.',
    price: 14.99,
    note: '+$14.99 / mo',
  },
  {
    id: 'customer_service',
    label: 'Outsourced Customer Service / Support via Phone, WhatsApp & Email',
    description: 'Dedicated support agents handling your customer enquiries.',
    price: 9.99,
    note: '+$9.99 / mo',
  },
];

// ─── Form state types ────────────────────────────────────────────────────────

interface PersonalDetails {
  fullName: string;
  phone: string;
  email: string;
  businessName: string;
  address: string;
}

interface FormState {
  personal: PersonalDetails;
  existingServices: string;
  selectedServices: string[]; // service ids or tier ids
  selectedTiers: Record<string, string>; // serviceId → tierId
}

// ─── Helper: resolve the price for a single selected service ────────────────

function resolveServicePrice(
  svc: ServiceOption,
  selectedTiers: Record<string, string>
): number {
  if (svc.tiers) {
    const tierId = selectedTiers[svc.id];
    const tier = svc.tiers.find((t) => t.id === tierId);
    return tier ? tier.price : svc.tiers[0].price;
  }
  return svc.price;
}

// ─── Helper: calculate monthly total ────────────────────────────────────────

function calculateMonthly(selectedServices: string[], selectedTiers: Record<string, string>): number {
  let total = 0;
  for (const svc of MANAGED_SERVICES) {
    if (!selectedServices.includes(svc.id)) continue;
    total += resolveServicePrice(svc, selectedTiers);
  }
  return total;
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function GradientProgress({ value }: { value: number }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${value}%`,
          background: 'linear-gradient(90deg, #a855f7, #6366f1, #3b82f6)',
        }}
      />
    </div>
  );
}

// ─── Gradient Button ──────────────────────────────────────────────────────────

function GradientButton({
  onClick,
  type = 'button',
  disabled = false,
  children,
  className = '',
}: {
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'hover:opacity-90 active:scale-[0.98]',
        className
      )}
      style={{
        background: disabled
          ? 'rgba(255,255,255,0.1)'
          : 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #3b82f6 100%)',
        boxShadow: disabled ? 'none' : '0 0 20px rgba(139,92,246,0.4)',
      }}
    >
      {children}
    </button>
  );
}

// ─── Back Button ──────────────────────────────────────────────────────────────

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white/90 transition-colors border border-white/10 hover:border-white/20"
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </button>
  );
}

// ─── Field components ─────────────────────────────────────────────────────────

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-white/80 text-sm font-medium">
        {label}
        {required && <span className="text-purple-400 ml-1">*</span>}
      </Label>
      {children}
    </div>
  );
}

const inputClass =
  'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-500 focus-visible:border-purple-500 rounded-xl';

// ─── Main Page ────────────────────────────────────────────────────────────────

/*
 * FORM SUBMISSION CONFIGURATION
 * ─────────────────────────────
 * To deliver form submissions to hello@gravitas.uno, configure one of the
 * following options:
 *
 * Option A – Formspree (recommended for static sites):
 *   1. Create a free account at https://formspree.io
 *   2. Create a new form and set the notification email to hello@gravitas.uno
 *   3. Replace FORM_ENDPOINT below with the Formspree endpoint
 *      e.g. "https://formspree.io/f/YOUR_FORM_ID"
 *
 * Option B – EmailJS:
 *   1. Create a free account at https://www.emailjs.com
 *   2. Set up a service and template with destination hello@gravitas.uno
 *   3. Call emailjs.send(...) inside handleSubmit with your template vars
 *
 * Option C – Custom API route:
 *   1. Create a backend endpoint (e.g. POST /api/managed-services/submit)
 *   2. The endpoint should forward the payload to hello@gravitas.uno via
 *      an SMTP service (Nodemailer, SendGrid, Resend, etc.)
 *   3. Replace FORM_ENDPOINT below with your API URL
 *
 * The handleSubmit function below already collects all form data and is
 * ready to POST it as JSON to whichever endpoint you configure.
 */
const FORM_ENDPOINT = ''; // ← set your endpoint here

const TOTAL_STEPS = 4;

export default function ManagedServices() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<FormState>({
    personal: {
      fullName: '',
      phone: '',
      email: '',
      businessName: '',
      address: '',
    },
    existingServices: '',
    selectedServices: [],
    selectedTiers: {},
  });

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;
  const monthlyTotal = calculateMonthly(form.selectedServices, form.selectedTiers);

  // ── navigation helpers ───────────────────────────────────────────────────

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  // ── service toggle ───────────────────────────────────────────────────────

  const toggleService = (id: string) => {
    setForm((prev) => {
      const included = prev.selectedServices.includes(id);
      const updated = included
        ? prev.selectedServices.filter((s) => s !== id)
        : [...prev.selectedServices, id];
      // If removing a service that has tiers, clear its tier selection
      const updatedTiers = { ...prev.selectedTiers };
      if (included) delete updatedTiers[id];
      return { ...prev, selectedServices: updated, selectedTiers: updatedTiers };
    });
  };

  const setTier = (serviceId: string, tierId: string) => {
    setForm((prev) => ({
      ...prev,
      selectedTiers: { ...prev.selectedTiers, [serviceId]: tierId },
    }));
  };

  // ── submission ───────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    setSubmitting(true);

    const payload = {
      ...form.personal,
      existingServices: form.existingServices,
      selectedServices: form.selectedServices.map((id) => {
        const svc = MANAGED_SERVICES.find((s) => s.id === id);
        const tierLabel =
          svc?.tiers?.find((t) => t.id === form.selectedTiers[id])?.label ?? '';
        return { id, label: svc?.label ?? id, tier: tierLabel };
      }),
      monthlyTotal: `$${monthlyTotal.toFixed(2)}`,
      submittedAt: new Date().toISOString(),
    };

    try {
      if (FORM_ENDPOINT) {
        await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // FORM_ENDPOINT is not set – configure it to send submissions to hello@gravitas.uno
        // (see the comment block above for setup instructions).
        console.warn('ManagedServices: FORM_ENDPOINT is not configured. Submission was not sent.');
      }
      // Navigate to confirmation page regardless (see FORM_ENDPOINT comment above)
      navigate('/next-steps', {
        state: { name: form.personal.fullName, email: form.personal.email, total: monthlyTotal },
      });
    } catch {
      // Gracefully degrade – still send the user to the confirmation page
      navigate('/next-steps', {
        state: { name: form.personal.fullName, email: form.personal.email, total: monthlyTotal },
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ── step validation ──────────────────────────────────────────────────────

  const step1Valid =
    form.personal.fullName.trim() !== '' &&
    form.personal.phone.trim() !== '' &&
    form.personal.email.trim() !== '' &&
    form.personal.address.trim() !== '';

  const step3Valid = form.selectedServices.length > 0;

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{ background: '#0a0a0a' }}
    >
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 border-b border-white/5 backdrop-blur-sm" style={{ background: 'rgba(10,10,10,0.9)' }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="https://gravitas.uno" aria-label="Gravitas home">
            <img
              src="/gravitasbanner.png"
              alt="Gravitas"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                // Fallback text logo if image fails to load
                const el = e.currentTarget;
                el.style.display = 'none';
                const fallback = el.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            <span className="text-xl font-extrabold tracking-tight hidden">
              Gravitas<span style={{ color: '#a855f7' }}>.</span>
            </span>
          </a>

          {/* Nav links */}
          <nav className="hidden sm:flex items-center gap-5 text-sm text-white/50">
            <a href="https://gravitas.uno" className="hover:text-white transition-colors">Home</a>
            <a href="https://gravitas.uno/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="https://gravitas.uno/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="https://gravitas.uno/contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* ── Hero / Description ── */}
      <section className="max-w-3xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Managed{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, #a855f7, #6366f1, #3b82f6)' }}
          >
            Services
          </span>{' '}
          Onboarding
        </h1>
        <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Managed Services by Gravitas is a subscription-based service that allows you to outsource
          certain tasks and activities related to managing your business' digital assets or other
          aspects of your operations.
        </p>
      </section>

      {/* ── Progress ── */}
      <div className="max-w-3xl mx-auto px-4 w-full pb-6">
        <div className="flex items-center justify-between text-xs text-white/40 mb-2">
          <span>Step {step} of {TOTAL_STEPS}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <GradientProgress value={progress} />

        {/* Step labels */}
        <div className="flex justify-between mt-3">
          {[
            'Your Details',
            'Current Services',
            'Select Plan',
            'Review Offer',
          ].map((label, i) => {
            const idx = i + 1;
            return (
              <div key={label} className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    'h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                    step > idx
                      ? 'text-white'
                      : step === idx
                      ? 'text-white border-2'
                      : 'text-white/30 border border-white/10'
                  )}
                  style={
                    step > idx
                      ? { background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }
                      : step === idx
                      ? { borderColor: '#a855f7', color: '#a855f7' }
                      : {}
                  }
                >
                  {step > idx ? <CheckCircle2 className="h-3 w-3" /> : idx}
                </div>
                <span
                  className={cn(
                    'hidden sm:block text-[10px] font-medium transition-colors',
                    step === idx ? 'text-purple-400' : 'text-white/30'
                  )}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Form Card ── */}
      <main id="main-content" className="max-w-3xl mx-auto px-4 w-full pb-16 flex-1">
        <div
          className="rounded-2xl border border-white/8 p-6 sm:p-8 space-y-6"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          {/* ────────────────────────────────────────────────────
              Step 1 – Personal Details
          ──────────────────────────────────────────────────── */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold mb-1">Your Details</h2>
                <p className="text-white/40 text-sm">
                  Please provide your personal and business information so we can tailor your plan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" required>
                  <Input
                    className={inputClass}
                    placeholder="Jane Smith"
                    value={form.personal.fullName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, personal: { ...f.personal, fullName: e.target.value } }))
                    }
                  />
                </Field>

                <Field label="Phone Number" required>
                  <Input
                    className={inputClass}
                    type="tel"
                    placeholder="+1 555 000 0000"
                    value={form.personal.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, personal: { ...f.personal, phone: e.target.value } }))
                    }
                  />
                </Field>
              </div>

              <Field label="Email Address" required>
                <Input
                  className={inputClass}
                  type="email"
                  placeholder="jane@example.com"
                  value={form.personal.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, personal: { ...f.personal, email: e.target.value } }))
                  }
                />
              </Field>

              <Field label="Business Name (if applicable)">
                <Input
                  className={inputClass}
                  placeholder="Acme Inc."
                  value={form.personal.businessName}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      personal: { ...f.personal, businessName: e.target.value },
                    }))
                  }
                />
              </Field>

              <Field label="Address (for invoicing purposes)" required>
                <Textarea
                  className={cn(inputClass, 'resize-none')}
                  rows={3}
                  placeholder="123 Main St, City, Country"
                  value={form.personal.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, personal: { ...f.personal, address: e.target.value } }))
                  }
                />
              </Field>

              <div className="flex justify-end pt-2">
                <GradientButton onClick={next} disabled={!step1Valid}>
                  Continue <ChevronRight className="h-4 w-4" />
                </GradientButton>
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────
              Step 2 – Current / Existing Services
          ──────────────────────────────────────────────────── */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold mb-1">Current Services</h2>
                <p className="text-white/40 text-sm">
                  Tell us about any services you've already received from Gravitas, if any.
                </p>
              </div>

              <Field label="Which services have you already received from us? (if any)">
                <Textarea
                  className={cn(inputClass, 'resize-none')}
                  rows={5}
                  placeholder="e.g. We had our website built last year and have been using web hosting since then…"
                  value={form.existingServices}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, existingServices: e.target.value }))
                  }
                />
              </Field>

              <div className="flex justify-between pt-2">
                <BackButton onClick={back} />
                <GradientButton onClick={next}>
                  Continue <ChevronRight className="h-4 w-4" />
                </GradientButton>
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────
              Step 3 – Select Managed Services
          ──────────────────────────────────────────────────── */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold mb-1">Select Your Services</h2>
                <p className="text-white/40 text-sm">
                  Choose the managed services you require. Your monthly fee will be calculated
                  automatically based on your selections.
                </p>
              </div>

              <div className="space-y-3">
                {MANAGED_SERVICES.map((svc) => {
                  const selected = form.selectedServices.includes(svc.id);
                  return (
                    <div
                      key={svc.id}
                      className={cn(
                        'rounded-xl border p-4 cursor-pointer transition-all duration-200',
                        selected
                          ? 'border-purple-500/50 bg-purple-500/10'
                          : 'border-white/8 hover:border-white/20 bg-white/[0.02]'
                      )}
                      onClick={() => toggleService(svc.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selected}
                          onCheckedChange={() => toggleService(svc.id)}
                          className="mt-0.5 border-white/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-white leading-snug">
                              {svc.label}
                            </p>
                            <span
                              className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{
                                background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                              }}
                            >
                              {svc.note ?? `$${svc.price} / mo`}
                            </span>
                          </div>
                          <p className="text-xs text-white/40 mt-1">{svc.description}</p>

                          {/* Tier selector */}
                          {selected && svc.tiers && (
                            <div
                              className="mt-3 flex flex-col sm:flex-row gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {svc.tiers.map((tier) => {
                                const tierSelected = form.selectedTiers[svc.id] === tier.id;
                                return (
                                  <button
                                    key={tier.id}
                                    type="button"
                                    onClick={() => setTier(svc.id, tier.id)}
                                    className={cn(
                                      'flex-1 text-xs rounded-lg px-3 py-2 border transition-all duration-200 font-medium text-left',
                                      tierSelected
                                        ? 'border-purple-400 text-purple-300 bg-purple-500/20'
                                        : 'border-white/10 text-white/50 hover:border-white/30'
                                    )}
                                  >
                                    {tier.label}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Running total */}
              {form.selectedServices.length > 0 && (
                <div
                  className="rounded-xl border border-white/10 p-4 flex items-center justify-between"
                  style={{ background: 'rgba(168,85,247,0.08)' }}
                >
                  <span className="text-sm text-white/60">Estimated monthly fee</span>
                  <span
                    className="text-lg font-extrabold bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(90deg, #a855f7, #3b82f6)' }}
                  >
                    ${monthlyTotal.toFixed(2)} / mo
                  </span>
                </div>
              )}

              <p className="text-xs text-white/30 leading-relaxed">
                Based on the services you choose, our system automatically calculates your monthly
                service fee. After you accept the offer and pay the subscription fee, your dedicated
                account manager will reach out to get started.
              </p>

              <div className="flex justify-between pt-2">
                <BackButton onClick={back} />
                <GradientButton onClick={next} disabled={!step3Valid}>
                  Review Offer <ChevronRight className="h-4 w-4" />
                </GradientButton>
              </div>
            </div>
          )}

          {/* ────────────────────────────────────────────────────
              Step 4 – Review & Accept Offer
          ──────────────────────────────────────────────────── */}
          {step === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h2 className="text-xl font-bold mb-1">Review Your Offer</h2>
                <p className="text-white/40 text-sm">
                  Here's a summary of your selected services and your estimated monthly fee.
                </p>
              </div>

              {/* Personal summary */}
              <div className="rounded-xl border border-white/8 p-4 space-y-1 bg-white/[0.02]">
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Your Details</p>
                <p className="text-sm text-white font-semibold">{form.personal.fullName}</p>
                <p className="text-sm text-white/60">{form.personal.email}</p>
                <p className="text-sm text-white/60">{form.personal.phone}</p>
                {form.personal.businessName && (
                  <p className="text-sm text-white/60">{form.personal.businessName}</p>
                )}
                <p className="text-sm text-white/60 whitespace-pre-line">{form.personal.address}</p>
              </div>

              {/* Selected services summary */}
              <div className="rounded-xl border border-white/8 p-4 space-y-3 bg-white/[0.02]">
                <p className="text-xs text-white/40 uppercase tracking-widest">Selected Services</p>
                {form.selectedServices.map((id) => {
                  const svc = MANAGED_SERVICES.find((s) => s.id === id);
                  if (!svc) return null;
                  const price = resolveServicePrice(svc, form.selectedTiers);
                  return (
                    <div key={id} className="flex items-start justify-between gap-4">
                      <p className="text-sm text-white/80 leading-snug">{svc.label}</p>
                      <span className="shrink-0 text-sm font-bold text-purple-300">
                        ${price.toFixed(2)} / mo
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Monthly total */}
              <div
                className="rounded-xl p-5 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(59,130,246,0.15))' }}
              >
                <p className="text-white/50 text-sm mb-1">Your monthly subscription fee</p>
                <p
                  className="text-4xl font-extrabold bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #a855f7, #6366f1, #3b82f6)' }}
                >
                  ${monthlyTotal.toFixed(2)}
                </p>
                <p className="text-white/30 text-xs mt-1">per month · billed monthly · cancel anytime</p>
              </div>

              <p className="text-xs text-white/30 leading-relaxed text-center">
                After you accept this offer, an account manager will contact you via email with a
                payment link and a Service Level Agreement to sign before commencing services.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <BackButton onClick={back} />
                <GradientButton
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? 'Submitting…' : 'Accept Offer & Submit'}
                  {!submitting && <ChevronRight className="h-4 w-4" />}
                </GradientButton>
              </div>

              <p className="text-center text-xs text-white/20">
                By submitting, you agree to our{' '}
                <a href="https://gravitas.uno/terms" className="underline hover:text-white/50 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="https://gravitas.uno/privacy" className="underline hover:text-white/50 transition-colors">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-6">
        <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {new Date().getFullYear()} Gravitas. All rights reserved.</span>
          <nav className="flex gap-4">
            <a href="https://gravitas.uno" className="hover:text-white/60 transition-colors">Home</a>
            <a href="https://gravitas.uno/terms" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="https://gravitas.uno/privacy" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="https://gravitas.uno/contact" className="hover:text-white/60 transition-colors">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
