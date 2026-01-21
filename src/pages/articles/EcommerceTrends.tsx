import Header from '@/components/Header';
import Footer from '@/components/Footer';
import fashionPost from '@/assets/fashion-post.jpg';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const EcommerceTrends = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="container-blog py-12">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">ECOMMERCE</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              E-commerce Trends to Watch
            </h1>
            <time className="text-muted-foreground">December 8, 2025</time>
          </header>

          <div className="aspect-video rounded-lg overflow-hidden mb-8">
            <img
              src={fashionPost}
              alt="E-commerce Trends"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground mb-6">
              Discover the latest trends shaping the future of online retail and digital commerce in the evolving marketplace.
            </p>

            <h2>The Evolving Marketplace</h2>
            <p>
              E-commerce continues to grow at an unprecedented rate. Consumer expectations are higher than ever, demanding seamless experiences across all touchpoints.
            </p>

            <h2>Key Trends</h2>
            <p>
              Social commerce, live shopping, and personalized experiences are reshaping how brands connect with customers. Mobile-first strategies are no longer optional—they're essential.
            </p>

            <h3>Social Commerce</h3>
            <p>
              Platforms like Instagram, TikTok, and Pinterest have evolved into powerful shopping destinations. Brands that master social selling are seeing significant revenue growth.
            </p>

            <h3>AI-Powered Personalization</h3>
            <p>
              Machine learning algorithms analyze customer behavior to deliver highly personalized product recommendations, increasing conversion rates and customer lifetime value.
            </p>

            <h2>The Future of Retail</h2>
            <p>
              Augmented reality, voice commerce, and sustainable shopping are emerging trends that will define the next era of e-commerce. Brands must adapt or risk being left behind.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default EcommerceTrends;
