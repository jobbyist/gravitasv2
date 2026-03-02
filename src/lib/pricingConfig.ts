/**
 * Pricing configuration for the websites landing page
 * All prices in USD (US Dollars)
 */

export interface UpsellOption {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  price: number;
  type: 'checkbox' | 'select';
  options?: { label: string; value: string; price: number }[];
}

export interface PricingConfig {
  baseWebsiteBuild: number;
  originalPrice: number;
  maintenanceMonthly: number;
  upsells: UpsellOption[];
}

export const pricingConfig: PricingConfig = {
  // Base website build price  
  baseWebsiteBuild: 199,
  // Original price (for savings calculation)
  originalPrice: 500,
  
  // Monthly maintenance (optional)
  maintenanceMonthly: 99,
  
  // All available upsells
  upsells: [
    // Required upsells from spec
    {
      id: 'pwa',
      name: 'Add PWA Functionality',
      description: 'Progressive Web App features',
      tooltip: 'Installable app-like experience, offline support; push notifications optional.',
      price: 299,
      type: 'checkbox',
    },
    {
      id: 'google-play',
      name: 'Google Play Store Support',
      description: 'Publish to Google Play Store',
      tooltip: 'Get your PWA listed on Google Play Store for wider distribution.',
      price: 199,
      type: 'checkbox',
    },
    {
      id: 'payment-gateway',
      name: 'Shipping + Payment Gateway Setup',
      description: 'Online payment gateways',
      tooltip: 'Set up online payment gateways (Mastercard, VISA, PayPal, Crypto etc)',
      price: 75,
      type: 'checkbox',
    },
    {
      id: 'shipping-tracking',
      name: 'Shipping + Order Tracking',
      description: 'Domestic/international shipping + order tracking',
      tooltip: 'Set up domestic and/or international shipping + order tracking',
      price: 125,
      type: 'checkbox',
    },
    
    // Additional upsells (8+ more)
    {
      id: 'extra-pages',
      name: 'Extra Pages Pack',
      description: 'Additional pages beyond base package',
      tooltip: 'Add more pages to your website. Each pack includes 5 additional pages.',
      price: 0,
      type: 'select',
      options: [
        { label: 'None', value: '0', price: 0 },
        { label: '5 Pages', value: '5', price: 299 },
        { label: '10 Pages', value: '10', price: 549 },
        { label: '15 Pages', value: '15', price: 749 },
      ],
    },
    {
      id: 'copywriting',
      name: 'Professional Copywriting',
      description: 'SEO-optimized content writing',
      tooltip: 'Professional copywriting services for your website content, optimized for search engines.',
      price: 0,
      type: 'select',
      options: [
        { label: 'None', value: '0', price: 0 },
        { label: 'Per Page (up to 500 words)', value: '1', price: 79 },
        { label: '3 Pages Package', value: '3', price: 199 },
        { label: '5 Pages Package', value: '5', price: 299 },
      ],
    },
    {
      id: 'seo-starter',
      name: 'SEO Starter Setup',
      description: 'Advanced SEO configuration',
      tooltip: 'Comprehensive SEO setup including keyword research, meta tags optimization, XML sitemap, robots.txt, and Google Search Console integration.',
      price: 199,
      type: 'checkbox',
    },
    {
      id: 'analytics',
      name: 'Analytics + Conversion Tracking',
      description: 'GA4, Meta Pixel, Google Ads tag',
      tooltip: 'Complete analytics setup including Google Analytics 4, Meta Pixel, Google Ads conversion tracking, and custom event tracking.',
      price: 99,
      type: 'checkbox',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Chat Integration',
      description: 'Live WhatsApp business chat widget',
      tooltip: 'Add a WhatsApp chat button to your website for instant customer communication.',
      price: 49,
      type: 'checkbox',
    },
    {
      id: 'booking',
      name: 'Booking System Integration',
      description: 'Online appointment scheduling',
      tooltip: 'Integrate a booking system for appointments, reservations, or service scheduling with calendar sync.',
      price: 399,
      type: 'checkbox',
    },
    {
      id: 'email-setup',
      name: 'Professional Email Setup',
      description: 'SPF/DKIM/DMARC configuration',
      tooltip: 'Professional email setup with SPF, DKIM, and DMARC records for better email deliverability and security.',
      price: 79,
      type: 'checkbox',
    },
    {
      id: 'speed-optimization',
      name: 'Speed Optimization',
      description: 'Performance tuning and optimization',
      tooltip: 'Comprehensive speed optimization including image compression, lazy loading, code minification, and CDN setup.',
      price: 149,
      type: 'checkbox',
    },
    {
      id: 'accessibility',
      name: 'Accessibility Pass (WCAG 2.1)',
      description: 'Web accessibility audit and fixes',
      tooltip: 'Ensure your website meets WCAG 2.1 Level AA accessibility standards for better user experience and legal compliance.',
      price: 249,
      type: 'checkbox',
    },
    {
      id: 'blog-setup',
      name: 'Blog Setup',
      description: 'Full blog/news section with CMS',
      tooltip: 'Complete blog setup with content management system, categories, tags, and RSS feed.',
      price: 299,
      type: 'checkbox',
    },
    {
      id: 'security',
      name: 'Security Hardening + Backups',
      description: 'Enhanced security and automated backups',
      tooltip: 'SSL certificate, security headers, firewall configuration, malware scanning, and automated daily backups.',
      price: 149,
      type: 'checkbox',
    },
    {
      id: 'multilingual',
      name: 'Multi-Language Support',
      description: 'Add additional languages to your site',
      tooltip: 'Support for multiple languages with language switcher and translated content management.',
      price: 0,
      type: 'select',
      options: [
        { label: 'None', value: '0', price: 0 },
        { label: '1 Additional Language', value: '1', price: 349 },
        { label: '2 Additional Languages', value: '2', price: 599 },
        { label: '3 Additional Languages', value: '3', price: 799 },
      ],
    },
  ],
};

// Base package details
export const basePackageIncludes = [
  'Basic 5-page website ideal for personal websites and small businesses',
  'Fully mobile responsive design',
  'Basic SEO setup (metadata + sitemap)',
  'Contact form with email notifications',
  '1 revision round',
  'Cross-browser compatibility',
  '30-day post-launch support',
  'Standard hosting for $9.99 per month',
  'Professional email for 5 users at $2.49/month when billed annually',
  'Free domain name registration for the first year',
];

// What's NOT included (clarifications)
export const basePackageExclusions = [
  'Premium stock photos (we use free stock or client provides)',
  'Ongoing content updates (maintenance plan available)',
  'Additional pages beyond 5 pages',
  'Custom integrations or complex functionality',
];
