import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WebsitesLandingPage } from '@/components/websites/WebsitesLandingPage';
import SEO from '@/components/SEO';

const Websites = () => {
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
    </div>
  );
};

export default Websites;
