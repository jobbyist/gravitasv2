import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WebsitesLandingPage } from '@/components/websites/WebsitesLandingPage';
import { PromoModal } from '@/components/websites/PromoModal';
import SEO from '@/components/SEO';

const PROMO_MODAL_STORAGE_KEY = 'womens_month_promo_shown_2026';
const PROMO_DELAY_MS = 30000; // 30 seconds

const Websites = () => {
  const [promoModalOpen, setPromoModalOpen] = useState(false);

  useEffect(() => {
    // Check if the promo has already been shown in this session
    const hasShownPromo = sessionStorage.getItem(PROMO_MODAL_STORAGE_KEY);
    
    if (!hasShownPromo) {
      // Set a timer to show the modal after 30 seconds
      const timer = setTimeout(() => {
        setPromoModalOpen(true);
        // Mark as shown for this session
        sessionStorage.setItem(PROMO_MODAL_STORAGE_KEY, 'true');
      }, PROMO_DELAY_MS);

      // Cleanup timer on unmount
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Professional Website Design & Development | Starting at $749 | GRAVITAS"
        description="Get a professional 5-page website built for your business. Perfect for small businesses and personal websites. Limited time offer - save 50% on base package."
        keywords="website design, website development, small business website, professional website, affordable website, website package"
      />
      <Header />
      <main id="main-content">
        <WebsitesLandingPage />
      </main>
      <Footer />
      
      {/* Women's Month Promotional Modal */}
      <PromoModal open={promoModalOpen} onOpenChange={setPromoModalOpen} />
    </div>
  );
};

export default Websites;
