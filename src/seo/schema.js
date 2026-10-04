/* ============================================================
   Structured data (schema.org JSON-LD)
   Every builder returns a plain object; <Seo> serialises the
   ones a page needs into a single @graph script tag.
   ============================================================ */

import { SITE_URL, absUrl, GOOGLE } from '../config/site';
import { BUSINESS, SERVICES, FAQS, IMAGES } from '../constants';
import { SERVICE_AREAS, areaPath } from '../data/areas';

export const ORG_ID = `${SITE_URL}/#business`;
export const SITE_ID = `${SITE_URL}/#website`;

/** Every city + locality we serve, as schema.org places. */
const areaServed = () =>
  SERVICE_AREAS.flatMap((c) => [
    { '@type': 'City', name: c.city },
    ...c.areas.map((a) => ({ '@type': 'Place', name: `${a}, ${c.city}` })),
  ]);

/**
 * The core LocalBusiness node. `PetGroomer` is a recognised
 * schema.org type and matches the Google Business category.
 */
export function localBusiness({ rating, reviewCount } = {}) {
  return {
    '@type': ['PetGroomer', 'LocalBusiness'],
    '@id': ORG_ID,
    name: BUSINESS.name,
    alternateName: [BUSINESS.legalName, BUSINESS.altName],
    description: BUSINESS.shortDesc,
    url: SITE_URL,
    image: IMAGES.ogImage,
    logo: absUrl('/favicon.svg'),
    telephone: `+${BUSINESS.phoneRaw}`,
    email: BUSINESS.email,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Card',
    foundingDate: BUSINESS.founded,
    slogan: BUSINESS.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GOOGLE.lat,
      longitude: GOOGLE.lng,
    },
    hasMap: GOOGLE.mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday',
          'Friday', 'Saturday', 'Sunday',
        ],
        opens: '10:00',
        closes: '23:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(rating ?? BUSINESS.rating),
      reviewCount: String(reviewCount ?? BUSINESS.reviewsCount),
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: areaServed(),
    sameAs: [GOOGLE.mapsUrl, BUSINESS.social.instagram, BUSINESS.social.facebook].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pet Grooming Services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.desc,
          serviceType: s.title,
          provider: { '@id': ORG_ID },
        },
      })),
    },
  };
}

/** Site-level node that enables the sitelinks search box. */
export function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    inLanguage: 'en-IN',
    publisher: { '@id': ORG_ID },
  };
}

export function webPage({ path, title, description }) {
  return {
    '@type': 'WebPage',
    '@id': `${absUrl(path)}#webpage`,
    url: absUrl(path),
    name: title,
    description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };
}

/** trail: [{ name, path }] — the current page included. */
export function breadcrumbs(trail = []) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  };
}

export function faqPage(items = FAQS) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** One Service node, optionally scoped to a city landing page. */
export function service(s, city) {
  return {
    '@type': 'Service',
    name: city ? `${s.title} in ${city}` : s.title,
    description: s.desc,
    serviceType: s.title,
    provider: { '@id': ORG_ID },
    areaServed: city ? { '@type': 'City', name: city } : areaServed(),
    audience: { '@type': 'Audience', audienceType: 'Pet owners' },
  };
}

export function serviceList() {
  return {
    '@type': 'ItemList',
    name: 'Pet Grooming Services',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: service(s),
    })),
  };
}

/** Individual reviews — shown under the business node. */
export function reviewNodes(reviews = []) {
  return reviews.slice(0, 6).map((r) => ({
    '@type': 'Review',
    itemReviewed: { '@id': ORG_ID },
    author: { '@type': 'Person', name: r.name },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(r.rating),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: r.text,
  }));
}

/** Landing-page node for one served city. */
export function cityPage(area) {
  return {
    '@type': 'Service',
    name: `Pet Grooming in ${area.city}`,
    description: area.blurb,
    serviceType: 'Pet Grooming',
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'City', name: area.city },
      ...area.areas.map((a) => ({ '@type': 'Place', name: `${a}, ${area.city}` })),
    ],
    url: absUrl(areaPath(area.slug)),
  };
}

/** All served cities as a linked list — helps Google find the pages. */
export function areasItemList() {
  return {
    '@type': 'ItemList',
    name: 'Pet Grooming Service Areas',
    itemListElement: SERVICE_AREAS.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Pet Grooming in ${a.city}`,
      url: absUrl(areaPath(a.slug)),
    })),
  };
}

/** Wrap any set of nodes into one @graph document. */
export const graph = (nodes) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.filter(Boolean),
});
