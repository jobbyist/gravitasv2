import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const PartnerLogoSlider = () => {
  // Partner logos - same as in PartnerLogos component
  const partners = [
    { name: 'Google', logo: '/partners/google.png' },
    { name: 'OpenAI', logo: '/partners/openai.png' },
    { name: 'Snipcart', logo: '/partners/snipcart.png' },
    { name: 'Name.com', logo: '/partners/namecom.png' },
    { name: 'Twilio', logo: '/partners/twilio.png' },
    { name: 'Shopify', logo: '/partners/shopify.png' },
    { name: 'Supabase', logo: '/partners/supabase.png' },
    { name: 'GitHub', logo: '/partners/github.png' },
    { name: 'Impact.com', logo: '/partners/impactcom.svg' },
    { name: 'Anthropic', logo: '/partners/anthropic.png' },
  ];

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {partners.map((partner) => (
            <CarouselItem key={partner.name} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Card className="p-6 flex items-center justify-center h-32">
                <div className="relative w-full h-20 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default PartnerLogoSlider;
