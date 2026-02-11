import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WebsitesLandingPage } from '@/components/websites/WebsitesLandingPage';

const Websites = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">
        <WebsitesLandingPage />
      </main>
      <Footer />
    </div>
  );
};

export default Websites;
