import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoHero from '@/components/VideoHero';
import PartnerLogos from '@/components/PartnerLogos';
import FAQ from '@/components/FAQ';
import EditorsPick from '@/components/EditorsPick';
import TrendingBlock from '@/components/TrendingBlock';
import MasonryBlock from '@/components/MasonryBlock';
import BlogGrid from '@/components/BlogGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content">
        <VideoHero />
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
