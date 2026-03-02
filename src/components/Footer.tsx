import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProductModal from './ProductModal';

const Footer = () => {
  const [auctionsModalOpen, setAuctionsModalOpen] = useState(false);
  const [commerceModalOpen, setCommerceModalOpen] = useState(false);
  const [domainsModalOpen, setDomainsModalOpen] = useState(false);

  return (
    <footer className="bg-muted border-t border-border" role="contentinfo">
      <div className="container-blog py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">GRAVITAS</h2>
            <p className="text-sm text-muted-foreground">
              A multidisciplinary venture leveraging AI and technical expertise to develop innovative, sustainable products and services for diverse markets.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/lead-generation" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Bookings</Link></li>
              <li><Link to="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Portfolio</Link></li>
              <li><Link to="/posts" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Articles</Link></li>
              <li><Link to="/podcast" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Podcast</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => setAuctionsModalOpen(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Auctions
                </button>
              </li>
              <li><Link to="/brand-kits" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Brand Kits</Link></li>
              <li>
                <button 
                  onClick={() => setCommerceModalOpen(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Commerce
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setDomainsModalOpen(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Domains
                </button>
              </li>
            </ul>
          </div>
          
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">About</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Contact</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Privacy</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">Terms</Link></li>
              </ul>
            </div>
          

        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Gravitas Industries. All rights reserved.
          </p>
        </div>
      </div>
      
      <ProductModal
        open={auctionsModalOpen}
        onOpenChange={setAuctionsModalOpen}
        title="Gravitas Auctions"
        description="Explore our high value digital asset portfolio and submit bids for equity ownership in our ongoing development projects"
        ctaText="Learn More"
        ctaUrl="https://auctions.gravitas.uno"
      />
      
      <ProductModal
        open={commerceModalOpen}
        onOpenChange={setCommerceModalOpen}
        title="Gravitas Commerce"
        description="Gravitas Commerce is a high-impact Shopify development service delivering professional, custom-built Online Store 2.0 storefronts for a one-time investment of $500. You get unlimited pages, unlimited app integrations, and unlimited revisions within the agreed build window"
        ctaText="Learn More"
        ctaUrl="https://commerce.gravitas.uno"
      />
      
      <ProductModal
        open={domainsModalOpen}
        onOpenChange={setDomainsModalOpen}
        title="Gravitas Domains"
        description="Register your domain name with ease with Gravitas Domains and get started with your next big project. In partnership with name.com"
        ctaText="Learn More"
        ctaUrl="https://domains.gravitas.uno"
      />
    </footer>
  );
};

export default Footer;