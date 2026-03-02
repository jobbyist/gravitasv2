import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  schema?: object;
}

const SEO = ({
  title = 'AI-Powered Innovation for Sustainable Solutions | GRAVITAS',
  description = 'Gravitas Industries - Leading digital agency specializing in AI services, web design, Shopify development, digital marketing, and domain registration. Trusted Shopify partners delivering enterprise-grade solutions.',
  keywords = 'website design agency, digital marketing agency, AI agency, Shopify development, Shopify partners, domain registration, web development, e-commerce development, AI automation, content creation, brand identity, digital services',
  ogImage = 'https://storage.googleapis.com/gpt-engineer-file-uploads/iy019M6SqjMXyibDc8dgs2v9PSx1/social-images/social-1771431455792-gravitasbanner.webp',
  ogType = 'website',
  canonicalUrl,
  schema
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = 'https://nexus.lovable.app';
  const fullUrl = canonicalUrl || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Gravitas Industries');

    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', 'Gravitas Industries', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@gravitas_ind');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // Update or create schema.org structured data
    if (schema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]#dynamic-schema');
      
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('id', 'dynamic-schema');
        document.head.appendChild(schemaScript);
      }
      
      schemaScript.textContent = JSON.stringify(schema);
    }
  }, [title, description, keywords, ogImage, ogType, fullUrl, schema]);

  return null;
};

export default SEO;
