/**
 * Pricing configuration for the websites landing page
 * All prices in ZAR (South African Rand)
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
  // Base website build price (50% off special)
  baseWebsiteBuild: 2995,
  originalPrice: 5990,
  
  // Monthly maintenance (optional)
  maintenanceMonthly: 249,
  
  // All available upsells
  upsells: [
    // Required upsells from spec
    {
      id: 'pwa',
      name: 'Add PWA Functionality',
      description: 'Progressive Web App features',
      tooltip: 'Installable app-like experience, offline support; push notifications optional.',
      price: 799,
      type: 'checkbox',
    },
    {
      id: 'google-play',
      name: 'Google Play Store Support',
      description: 'Publish to Google Play Store',
      tooltip: 'Get your PWA listed on Google Play Store for wider distribution.',
      price: 599,
      type: 'checkbox',
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce + Payment Gateway Setup',
      description: 'Full e-commerce functionality with payment integration',
      tooltip: 'Complete e-commerce setup including Paystack, Payfast, Ozow, Stitch Express, or PayPal integration.',
      price: 0, // Base price, depends on shipping option
      type: 'select',
      options: [
        { label: 'None', value: 'none', price: 0 },
        { label: 'Domestic Shipping (The Courier Guy, Aramex)', value: 'domestic', price: 495 },
        { label: 'International Shipping (DHL, FedEx)', value: 'international', price: 899 },
      ],
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
        { label: '5 Pages', value: '5', price: 1495 },
        { label: '10 Pages', value: '10', price: 2795 },
        { label: '15 Pages', value: '15', price: 3995 },
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
        { label: 'Per Page (up to 500 words)', value: '1', price: 395 },
        { label: '3 Pages Package', value: '3', price: 995 },
        { label: '5 Pages Package', value: '5', price: 1595 },
      ],
    },
    {
      id: 'seo-starter',
      name: 'SEO Starter Setup',
      description: 'Advanced SEO configuration',
      tooltip: 'Comprehensive SEO setup including keyword research, meta tags optimization, XML sitemap, robots.txt, and Google Search Console integration.',
      price: 795,
      type: 'checkbox',
    },
    {
      id: 'analytics',
      name: 'Analytics + Conversion Tracking',
      description: 'GA4, Meta Pixel, Google Ads tag',
      tooltip: 'Complete analytics setup including Google Analytics 4, Meta Pixel, Google Ads conversion tracking, and custom event tracking.',
      price: 495,
      type: 'checkbox',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Chat Integration',
      description: 'Live WhatsApp business chat widget',
      tooltip: 'Add a WhatsApp chat button to your website for instant customer communication.',
      price: 295,
      type: 'checkbox',
    },
    {
      id: 'booking',
      name: 'Booking System Integration',
      description: 'Online appointment scheduling',
      tooltip: 'Integrate a booking system for appointments, reservations, or service scheduling with calendar sync.',
      price: 1295,
      type: 'checkbox',
    },
    {
      id: 'email-setup',
      name: 'Professional Email Setup',
      description: 'SPF/DKIM/DMARC configuration',
      tooltip: 'Professional email setup with SPF, DKIM, and DMARC records for better email deliverability and security.',
      price: 395,
      type: 'checkbox',
    },
    {
      id: 'speed-optimization',
      name: 'Speed Optimization',
      description: 'Performance tuning and optimization',
      tooltip: 'Comprehensive speed optimization including image compression, lazy loading, code minification, and CDN setup.',
      price: 695,
      type: 'checkbox',
    },
    {
      id: 'accessibility',
      name: 'Accessibility Pass (WCAG 2.1)',
      description: 'Web accessibility audit and fixes',
      tooltip: 'Ensure your website meets WCAG 2.1 Level AA accessibility standards for better user experience and legal compliance.',
      price: 895,
      type: 'checkbox',
    },
    {
      id: 'blog-setup',
      name: 'Blog Setup',
      description: 'Full blog/news section with CMS',
      tooltip: 'Complete blog setup with content management system, categories, tags, and RSS feed.',
      price: 1095,
      type: 'checkbox',
    },
    {
      id: 'security',
      name: 'Security Hardening + Backups',
      description: 'Enhanced security and automated backups',
      tooltip: 'SSL certificate, security headers, firewall configuration, malware scanning, and automated daily backups.',
      price: 595,
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
        { label: '1 Additional Language', value: '1', price: 1295 },
        { label: '2 Additional Languages', value: '2', price: 2295 },
        { label: '3 Additional Languages', value: '3', price: 3095 },
      ],
    },
  ],
};

// Base package details
export const basePackageIncludes = [
  'Up to 5 pages',
  'Fully mobile responsive design',
  'Basic SEO setup (metadata + sitemap)',
  'Contact form with email notifications',
  '1 revision round',
  'Cross-browser compatibility',
  '30-day post-launch support',
];

// What's NOT included (clarifications)
export const basePackageExclusions = [
  'Domain registration (client provides)',
  'Hosting (client provides or we can recommend)',
  'Premium stock photos (we use free stock or client provides)',
  'Ongoing content updates (maintenance plan available)',
];
