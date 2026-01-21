import Header from '@/components/Header';
import Footer from '@/components/Footer';
import businessPost from '@/assets/business-post.jpg';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const WebPerformance = () => {
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
            <Badge variant="secondary" className="mb-4">WEB DEV</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Web Performance Optimization
            </h1>
            <time className="text-muted-foreground">January 5, 2026</time>
          </header>

          <div className="aspect-video rounded-lg overflow-hidden mb-8">
            <img
              src={businessPost}
              alt="Web Performance Optimization"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground mb-6">
              Proven techniques to improve your website's speed and user experience for better engagement and conversions.
            </p>

            <h2>Why Performance Matters</h2>
            <p>
              Every millisecond counts in web performance. Studies show that a 1-second delay in page load can result in a 7% reduction in conversions. Fast websites rank higher and retain users better.
            </p>

            <h2>Core Web Vitals</h2>
            <p>
              Google's Core Web Vitals—LCP, FID, and CLS—are now ranking factors. Understanding and optimizing for these metrics is essential for modern web development.
            </p>

            <h3>Largest Contentful Paint (LCP)</h3>
            <p>
              Optimize your largest content element to load within 2.5 seconds. Techniques include image optimization, efficient caching, and minimizing render-blocking resources.
            </p>

            <h3>Cumulative Layout Shift (CLS)</h3>
            <p>
              Prevent layout shifts by always including width and height attributes on images and videos. Reserve space for ads and dynamically loaded content.
            </p>

            <h2>Optimization Techniques</h2>
            <p>
              Code splitting, lazy loading, compression, and CDN usage are foundational optimizations. Modern tools like Lighthouse and WebPageTest help identify opportunities for improvement.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default WebPerformance;
