import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

const PartnerLogos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Partner logos - using placeholders
  const partners = [
    { name: 'Partner 1', logo: '/placeholder.svg' },
    { name: 'Partner 2', logo: '/placeholder.svg' },
    { name: 'Partner 3', logo: '/placeholder.svg' },
    { name: 'Partner 4', logo: '/placeholder.svg' },
    { name: 'Partner 5', logo: '/placeholder.svg' },
    { name: 'Partner 6', logo: '/placeholder.svg' },
  ];

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [partners.length]);

  return (
    <section className="container-blog py-16 bg-muted/30">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Trusted By Industry Leaders
          </h2>
          <p className="text-muted-foreground">
            Partnering with innovative organizations worldwide
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <Card
              key={index}
              className={`p-6 flex items-center justify-center transition-all duration-500 ${
                index === currentIndex
                  ? 'ring-2 ring-primary shadow-lg scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <div className="relative w-full h-20 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {partner.name}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Rotation Indicator */}
        <div className="flex justify-center gap-2">
          {partners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to partner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
