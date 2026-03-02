import Header from '@/components/Header';
import Footer from '@/components/Footer';
import techPost from '@/assets/tech-post.jpg';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GravitasFebruary2026Updates = () => {
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
            <Badge variant="secondary" className="mb-4">UPDATES</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              What's New at Gravitas in February 2026
            </h1>
            <time className="text-muted-foreground">February 28, 2026</time>
          </header>

          <div className="aspect-video rounded-lg overflow-hidden mb-8">
            <img
              src={techPost}
              alt="Gravitas February 2026 Updates"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground mb-6">
              We're excited to share the latest updates and improvements to the Gravitas platform. February 2026 has been a transformative month with new product launches and significant enhancements to existing features.
            </p>

            <h2>New Product Launches</h2>
            <p>
              This month marks a significant milestone for Gravitas with the launch of several groundbreaking products designed to empower businesses and creators worldwide.
            </p>

            <h3>Gravitas Auctions</h3>
            <p>
              We're thrilled to introduce Gravitas Auctions, a revolutionary platform that brings transparency and efficiency to online auctions. Whether you're looking to acquire rare collectibles, liquidate inventory, or find unique business opportunities, Gravitas Auctions provides a secure and user-friendly marketplace.
            </p>
            <p>
              Key features include:
            </p>
            <ul>
              <li>Real-time bidding with instant notifications</li>
              <li>Secure escrow services for buyer and seller protection</li>
              <li>Advanced search and filtering capabilities</li>
              <li>Verified seller ratings and transaction history</li>
              <li>Mobile-optimized bidding experience</li>
            </ul>

            <h3>White Label Partner Program</h3>
            <p>
              Our new White Label Partner Program enables agencies and businesses to offer Gravitas products and services under their own brand. This comprehensive program includes:
            </p>
            <ul>
              <li>Full brand customization options</li>
              <li>Dedicated partner support and training</li>
              <li>Competitive revenue sharing models</li>
              <li>Access to our complete technology stack</li>
              <li>Marketing resources and co-branding opportunities</li>
            </ul>
            <p>
              Partners can now leverage our proven platform to expand their service offerings while maintaining their unique brand identity.
            </p>

            <h3>Gravitas Commerce</h3>
            <p>
              Gravitas Commerce is our answer to the evolving needs of modern e-commerce businesses. This high-tech solution brings enterprise-level capabilities to businesses of all sizes, starting at just $500.
            </p>
            <p>
              What makes Gravitas Commerce special:
            </p>
            <ul>
              <li>Headless commerce architecture for maximum flexibility</li>
              <li>AI-powered product recommendations</li>
              <li>Integrated payment processing across multiple gateways</li>
              <li>Advanced analytics and reporting dashboard</li>
              <li>Multi-channel selling (web, mobile, social media)</li>
              <li>Automated inventory management</li>
              <li>SEO-optimized product pages</li>
            </ul>

            <h2>Coming Soon: Exciting Features on the Horizon</h2>
            <p>
              While we celebrate this month's launches, we're already hard at work on the next wave of innovations.
            </p>

            <h3>Brand Kits</h3>
            <p>
              Brand Kits will revolutionize how businesses manage their brand identity. This comprehensive tool will allow you to:
            </p>
            <ul>
              <li>Create and maintain consistent brand guidelines</li>
              <li>Generate branded assets automatically</li>
              <li>Share brand resources with team members and partners</li>
              <li>Ensure brand consistency across all touchpoints</li>
              <li>Track brand asset usage and performance</li>
            </ul>
            <p>
              Expected launch: Q2 2026
            </p>

            <h3>Gravitas Domains</h3>
            <p>
              Gravitas Domains will simplify domain management and help businesses establish their online presence more effectively. Features will include:
            </p>
            <ul>
              <li>Smart domain suggestions based on your business</li>
              <li>Integrated DNS management</li>
              <li>One-click domain setup with Gravitas products</li>
              <li>Domain marketplace for buying and selling</li>
              <li>Advanced domain analytics</li>
              <li>Automated renewal management</li>
            </ul>
            <p>
              Expected launch: Q2 2026
            </p>

            <h2>Platform Improvements</h2>
            <p>
              Beyond new products, we've made significant improvements to the core Gravitas platform:
            </p>
            <ul>
              <li>Enhanced search functionality across all platform features</li>
              <li>Improved mobile responsiveness and performance</li>
              <li>Streamlined user onboarding process</li>
              <li>Enhanced security measures and compliance features</li>
              <li>New analytics dashboards for better insights</li>
            </ul>

            <h2>Looking Forward</h2>
            <p>
              February 2026 represents a pivotal moment in Gravitas's journey. We're committed to continuing this momentum by listening to our community, innovating relentlessly, and delivering products that truly make a difference in how businesses operate online.
            </p>
            <p>
              We're grateful for the support of our users, partners, and team members who make all of this possible. Stay tuned for more exciting updates in the coming months!
            </p>

            <h2>Get Started Today</h2>
            <p>
              Ready to explore these new features? Visit our platform to learn more about Gravitas Auctions, the White Label Partner Program, and Gravitas Commerce. Our team is standing by to help you get started.
            </p>
            <p>
              For questions or support, reach out to us at <a href="mailto:hello@gravitas.uno">hello@gravitas.uno</a>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default GravitasFebruary2026Updates;
