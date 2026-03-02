import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const location = useLocation();

  // Hide on /websites page
  if (location.pathname === '/websites') {
    return null;
  }

  useEffect(() => {
    // Show the button after a short delay when user scrolls down
    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 300) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative group">
        {/* Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-muted border border-border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-accent"
          aria-label="Dismiss"
        >
          <X className="h-3 w-3" />
        </button>

        {/* Main CTA Button */}
        <Button
          asChild
          size="lg"
          className="shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 gap-2 text-base px-6 py-6"
        >
          <Link to="/login" aria-label="Access Client Area">
            <UserPlus className="h-5 w-5" />
            <span className="font-semibold">Client Area</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FloatingCTA;
