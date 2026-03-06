import { useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

interface NextStepsState {
  name?: string;
  email?: string;
  total?: number;
}

export default function NextSteps() {
  const location = useLocation();
  const state = (location.state ?? {}) as NextStepsState;
  const { name, email, total } = state;

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{ background: '#0a0a0a' }}
    >
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-20 border-b border-white/5 backdrop-blur-sm"
        style={{ background: 'rgba(10,10,10,0.9)' }}
      >
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="https://gravitas.uno" aria-label="Gravitas home">
            <img
              src="/gravitasbanner.png"
              alt="Gravitas"
              className="h-8 w-auto object-contain"
              onError={(e) => {
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
          <nav className="hidden sm:flex items-center gap-5 text-sm text-white/50">
            <a href="https://gravitas.uno" className="hover:text-white transition-colors">Home</a>
            <a href="https://gravitas.uno/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="https://gravitas.uno/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="https://gravitas.uno/contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* ── Confirmation content ── */}
      <main
        id="main-content"
        className="flex-1 flex items-center justify-center px-4 py-16"
      >
        <div className="max-w-lg w-full text-center space-y-6">
          {/* Success icon */}
          <div className="flex justify-center">
            <div
              className="h-20 w-20 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}
            >
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Thank you for choosing{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #a855f7, #6366f1, #3b82f6)' }}
            >
              Gravitas
            </span>
            {name ? `, ${name.split(' ')[0]}` : ''}!
          </h1>

          {/* Body copy */}
          <p className="text-white/50 text-base leading-relaxed">
            Your Managed Services application has been received. An account manager will contact you
            via email shortly with a{' '}
            <strong className="text-white/70">payment link</strong> and a{' '}
            <strong className="text-white/70">Service Level Agreement</strong> to be signed and sent
            back before we commence with your services.
          </p>

          {email && (
            <p className="text-white/40 text-sm">
              We'll be in touch at <span className="text-purple-400">{email}</span>.
            </p>
          )}

          {total !== undefined && total > 0 && (
            <div
              className="rounded-xl border border-white/10 p-4 text-center"
              style={{ background: 'rgba(168,85,247,0.08)' }}
            >
              <p className="text-white/50 text-xs mb-1">Agreed monthly fee</p>
              <p
                className="text-2xl font-extrabold bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #a855f7, #3b82f6)' }}
              >
                ${total.toFixed(2)} / mo
              </p>
            </div>
          )}

          {/* What happens next */}
          <div
            className="rounded-xl border border-white/8 p-5 text-left space-y-3"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <p className="text-xs text-white/40 uppercase tracking-widest">What happens next?</p>
            {[
              'Your account manager reviews your selected services.',
              'You receive an email with a payment link and Service Level Agreement.',
              'Sign and return the SLA to confirm your subscription.',
              'We get started on delivering your managed services!',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="mt-0.5 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
                  style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}
                >
                  {i + 1}
                </span>
                <p className="text-sm text-white/60">{item}</p>
              </div>
            ))}
          </div>

          {/* CTA back to home */}
          <a
            href="https://gravitas.uno"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #3b82f6 100%)',
              boxShadow: '0 0 20px rgba(139,92,246,0.4)',
            }}
          >
            Back to Gravitas
          </a>
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
