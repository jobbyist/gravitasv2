import Header from '@/components/Header';
import Footer from '@/components/Footer';
import fashionLifestyle from '@/assets/fashion-lifestyle.jpg';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeadlessCommerce = () => {
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
              Headless Commerce Architecture
            </h1>
            <time className="text-muted-foreground">November 22, 2025</time>
          </header>

          <div className="aspect-video rounded-lg overflow-hidden mb-8">
            <img
              src={fashionLifestyle}
              alt="Headless Commerce Architecture"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground mb-6">
              Understanding the benefits of decoupled commerce platforms and how they enable unprecedented flexibility and performance.
            </p>

            <h2>What is Headless Commerce?</h2>
            <p>
              Headless commerce separates the frontend presentation layer from the backend commerce functionality. This decoupling provides freedom to create unique customer experiences without backend constraints.
            </p>

            <h2>Key Benefits</h2>
            <p>
              Flexibility, performance, and omnichannel capabilities are the primary advantages of headless architecture. Teams can work independently on frontend and backend, accelerating development cycles.
            </p>

            <h3>Frontend Freedom</h3>
            <p>
              With headless commerce, you can build your storefront using any technology—React, Vue, or even native mobile apps—while maintaining a single source of truth for product and order data.
            </p>

            <h3>Performance Optimization</h3>
            <p>
              Static site generation and edge caching become possible with headless architecture, delivering lightning-fast page loads that improve conversion rates and SEO.
            </p>

            <h2>Implementation Considerations</h2>
            <p>
              Headless commerce requires more development expertise but offers unparalleled flexibility. Consider platforms like Shopify Storefront API, commercetools, or Saleor for your headless commerce needs.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default HeadlessCommerce;
