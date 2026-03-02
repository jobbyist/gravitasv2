import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoHero from '@/components/VideoHero';
import { AIWebsiteBuilder } from '@/components/AIWebsiteBuilder';
import PartnerLogos from '@/components/PartnerLogos';
import FAQ from '@/components/FAQ';
import EditorsPick from '@/components/EditorsPick';
import TrendingBlock from '@/components/TrendingBlock';
import MasonryBlock from '@/components/MasonryBlock';
import BlogGrid from '@/components/BlogGrid';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="AI-Powered Digital Agency | Website Design, Shopify Development & Marketing | GRAVITAS"
        description="Leading digital agency specializing in AI services, web design, Shopify development, digital marketing, delivering enterprise-grade solutions worldwide."
        keywords="website design agency, digital marketing agency, AI agency, Shopify development, Shopify partners, domain registration, web development, e-commerce development"
      />
      <Header />
      <main id="main-content">
        <VideoHero />
        <AIWebsiteBuilder />
        <PartnerLogos />
        <FAQ />
        <section aria-labelledby="editors-pick-heading">
          <EditorsPick />
        </section>
        <section aria-labelledby="trending-heading">
          <TrendingBlock />
        </section>
        <section aria-labelledby="masonry-heading">
          <MasonryBlock />
        </section>
        <section aria-labelledby="all-posts-heading">
          <BlogGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
