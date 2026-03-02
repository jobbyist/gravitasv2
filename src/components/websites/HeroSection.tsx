import { memo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Star, Shield, Headphones } from 'lucide-react';
import { trackEvent } from '@/lib/tracking';

interface HeroSectionProps {
  discountPercent: number;
  onClaimOffer: () => void;
  onBuildPackage: () => void;
}

const serviceHighlights = [
  { icon: Clock, text: 'Rapid Turnaround (48-72hrs on avg.)' },
  { icon: Users, text: '50+ Active Client Engagements' },
  { icon: Star, text: '98% Client Satisfaction Rating' },
  { icon: Shield, text: '30-Day Money Back Guarantee' },
  { icon: Headphones, text: 'World-Class Support Team' },
];

export const HeroSection = memo(function HeroSection({
  discountPercent,
  onClaimOffer,
  onBuildPackage,
}: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const navigate = useNavigate();

  const handleGetStartedWithAI = () => {
    trackEvent('cta_click', { type: 'get_started_ai' });
    window.open('https://origin.gravitas.uno', '_blank', 'noopener,noreferrer');
  };

  const handleHireADeveloper = () => {
    trackEvent('cta_click', { type: 'hire_developer' });
    // Scroll to the build package section
    const element = document.getElementById('build-package-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Use IntersectionObserver to detect when scrolling completes
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.disconnect();
            // Small delay to let user see the section before redirecting
            setTimeout(() => {
              navigate('/lead-generation');
            }, 800);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(element);
      // Fallback timeout in case IntersectionObserver doesn't trigger
      setTimeout(() => {
        observer.disconnect();
        navigate('/lead-generation');
      }, 3000);
    } else {
      // If section not found, just go directly to lead generation
      navigate('/lead-generation');
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          poster="/gravitasbanner.png"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/origin.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="container-blog relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            The easiest way to build and manage your website.
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Establish your online presence with ease using our powerful AI coding tool that turns your brief into a beautiful website in minutes, or build your own website development package and let one of our friendly web developers get you up and running in no time!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            {/* Primary CTA - Get Started with AI */}
            <button
              onClick={handleGetStartedWithAI}
              className="group relative px-8 py-4 text-lg font-bold text-white bg-black rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              {/* Animated gradient border */}
              <span className="absolute inset-0 rounded-lg p-[2px] gradient-border-multicolor animate-gradient-x">
                <span className="block h-full w-full rounded-[6px] bg-black" />
              </span>
              <span className="relative z-10">Get Started with AI</span>
            </button>

            {/* Secondary CTA - Hire A Developer */}
            <button
              onClick={handleHireADeveloper}
              className="px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-lg transition-all duration-300 hover:bg-white hover:text-black w-full sm:w-auto"
            >
              Hire A Developer
            </button>
          </div>

          {/* Service Highlights */}
          <div className="pt-8">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {serviceHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm md:text-base text-white/80 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                >
                  <highlight.icon className="h-4 w-4 text-white/90" />
                  <span>{highlight.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
