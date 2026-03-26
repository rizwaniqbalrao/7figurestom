import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  schema?: object;
}

const SUPPORTED_LANGUAGES = ['en', 'de', 'fr', 'es', 'it', 'nl', 'pt', 'ar'];

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  schema,
}: SEOProps) => {
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://7figurestom.org';

  const pathWithoutLang = location.pathname.replace(`/${lang}`, '') || '/';
  const currentLang = lang || 'en';

  const fullUrl = canonical || `${siteUrl}/${currentLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;

  useEffect(() => {
    document.documentElement.lang = currentLang;

    if (currentLang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }

    document.title = title;

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

    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    updateMetaTag('last-modified', new Date().toISOString().split('T')[0]);

    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:locale', currentLang === 'en' ? 'en_US' : currentLang, true);
    updateMetaTag('og:image', 'https://static.readdy.ai/image/9141bf56d24241eb66b91d91461534d9/17c33c4f464aed40ea94a7ee1d44bcb5.jpeg', true);

    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', 'https://static.readdy.ai/image/9141bf56d24241eb66b91d91461534d9/17c33c4f464aed40ea94a7ee1d44bcb5.jpeg');

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());

    SUPPORTED_LANGUAGES.forEach(language => {
      const hreflangLink = document.createElement('link');
      hreflangLink.setAttribute('rel', 'alternate');
      hreflangLink.setAttribute('hreflang', language);
      hreflangLink.setAttribute('href', `${siteUrl}/${language}${pathWithoutLang === '/' ? '' : pathWithoutLang}`);
      document.head.appendChild(hreflangLink);
    });

    const xDefaultLink = document.createElement('link');
    xDefaultLink.setAttribute('rel', 'alternate');
    xDefaultLink.setAttribute('hreflang', 'x-default');
    xDefaultLink.setAttribute('href', `${siteUrl}/en${pathWithoutLang === '/' ? '' : pathWithoutLang}`);
    document.head.appendChild(xDefaultLink);

    if (schema) {
      let schemaScript = document.querySelector('script[data-schema="page"]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('data-schema', 'page');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }

    return () => {
      const schemaScript = document.querySelector('script[data-schema="page"]');
      if (schemaScript) schemaScript.remove();
    };
  }, [title, description, keywords, fullUrl, ogType, schema, currentLang, pathWithoutLang]);
};

// ─── Schema.org Generators ───────────────────────────────────────────────────

export const generateOrganizationSchema = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://7figurestom.org';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '7Figurestom',
    description: 'Premium Shopify e-commerce growth agency specializing in custom store development, conversion rate optimization, and strategic scaling for ambitious online brands.',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: 'https://static.readdy.ai/image/9141bf56d24241eb66b91d91461534d9/17c33c4f464aed40ea94a7ee1d44bcb5.jpeg',
    sameAs: ['https://instagram.com/7figurestom'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'agency@7figurestom.org',
      contactType: 'Customer Service',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'German', 'French', 'Spanish', 'Italian', 'Dutch', 'Portuguese', 'Arabic'],
    },
    areaServed: 'Worldwide',
    knowsAbout: [
      'Shopify Development',
      'E-commerce Growth',
      'Conversion Rate Optimization',
      'Shopify Plus Migration',
      'E-commerce Strategy',
    ],
  };
};

export const generateWebSiteSchema = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://7figurestom.org';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '7Figurestom',
    url: siteUrl,
    description: 'Shopify e-commerce growth agency helping brands scale to 7 figures.',
    inLanguage: ['en', 'de', 'fr', 'es', 'it', 'nl', 'pt', 'ar'],
    publisher: generateOrganizationSchema(),
  };
};

export const generateWebPageSchema = (name: string, description: string, url: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    publisher: generateOrganizationSchema(),
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: '7Figurestom',
      url: import.meta.env.VITE_SITE_URL || 'https://7figurestom.org',
    },
  };
};

export const generateServiceSchema = (name: string, description: string) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://7figurestom.org';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: generateOrganizationSchema(),
    areaServed: 'Worldwide',
    serviceType: 'E-commerce Development',
    url: `${siteUrl}/services`,
    category: 'E-commerce Services',
  };
};

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export const generateArticleSchema = (
  title: string,
  description: string,
  author: string,
  datePublished: string,
  image: string
) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://7figurestom.org';
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: generateOrganizationSchema(),
    datePublished,
    dateModified: new Date().toISOString(),
    image,
    url: `${siteUrl}/resources`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/resources`,
    },
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://7figurestom.org';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
};

export const generateShopifyServiceSchema = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://7figurestom.org';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Shopify E-commerce Development & Growth Services',
    description: 'Premium Shopify store design, development, CRO optimization, and e-commerce growth services to scale your online business to 7 figures.',
    provider: generateOrganizationSchema(),
    serviceType: 'E-commerce Development',
    areaServed: 'Worldwide',
    url: `${siteUrl}/services`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      offerCount: 6,
      offers: [
        { '@type': 'Offer', name: 'Custom Shopify Store Design', description: 'Bespoke Shopify store design and development' },
        { '@type': 'Offer', name: 'CRO & Funnel Optimization', description: 'Conversion rate optimization for Shopify stores' },
        { '@type': 'Offer', name: 'Shopify Plus Migration', description: 'Seamless migration to Shopify Plus' },
        { '@type': 'Offer', name: 'Custom App Development', description: 'Bespoke Shopify apps and integrations' },
        { '@type': 'Offer', name: 'Conversion Engineering', description: 'Strategic funnel design and AOV optimization' },
        { '@type': 'Offer', name: 'Growth Retainers', description: 'Ongoing e-commerce growth partnership' },
      ],
    },
  };
};

export const generateCaseStudiesSchema = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://7figurestom.org';
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Shopify E-commerce Case Studies',
    description: 'Real results from Shopify brands scaled by 7Figurestom',
    url: `${siteUrl}/case-studies`,
    numberOfItems: 6,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'LUXE APPAREL — 212% Conversion Rate Increase', url: `${siteUrl}/case-studies` },
      { '@type': 'ListItem', position: 2, name: 'VITALITY SUPPLEMENTS — 340% Revenue Growth', url: `${siteUrl}/case-studies` },
      { '@type': 'ListItem', position: 3, name: 'TECH GADGETS PRO — Zero Downtime Migration', url: `${siteUrl}/case-studies` },
      { '@type': 'ListItem', position: 4, name: 'ARTISAN HOME DECOR — 189% Sales Increase', url: `${siteUrl}/case-studies` },
      { '@type': 'ListItem', position: 5, name: 'FITNESS GEAR PLUS — Custom Inventory App', url: `${siteUrl}/case-studies` },
      { '@type': 'ListItem', position: 6, name: 'GOURMET COFFEE CO — 287% LTV Increase', url: `${siteUrl}/case-studies` },
    ],
  };
};

export const generateContactPageSchema = (url: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact 7Figurestom — Schedule a Free Shopify Growth Consultation',
    description: 'Book a free 30-minute strategy session with 7Figurestom Shopify growth experts.',
    url,
    publisher: generateOrganizationSchema(),
    isPartOf: {
      '@type': 'WebSite',
      name: '7Figurestom',
      url: import.meta.env.VITE_SITE_URL || 'https://7figurestom.org',
    },
  };
};

export const generateShareProjectSchema = (url: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Share Your Project — Start Your Shopify Growth Journey with 7Figurestom',
    description: 'Submit your e-commerce project details to 7Figurestom. Tell us about your brand, goals, and budget so we can craft a custom Shopify growth strategy for you.',
    url,
    publisher: generateOrganizationSchema(),
    isPartOf: {
      '@type': 'WebSite',
      name: '7Figurestom',
      url: import.meta.env.VITE_SITE_URL || 'https://7figurestom.org',
    },
    potentialAction: {
      '@type': 'CommunicateAction',
      target: url,
      name: 'Submit Project',
    },
  };
};

export const generateResourcesCollectionSchema = (url: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Shopify Growth Resources & Insights — 7Figurestom Knowledge Center',
    description: 'Strategic insights, technical guides, and proven frameworks for scaling Shopify brands to 7 figures.',
    url,
    publisher: generateOrganizationSchema(),
    isPartOf: {
      '@type': 'WebSite',
      name: '7Figurestom',
      url: import.meta.env.VITE_SITE_URL || 'https://7figurestom.org',
    },
  };
};
