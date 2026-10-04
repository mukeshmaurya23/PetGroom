/* ============================================================
   Single source of truth for per-route <title> and description.
   Used by the page components at runtime AND by the build-time
   prerenderer, so the static HTML and the SPA never disagree.
   ============================================================ */

import { SERVICE_AREAS, areaPath } from '../data/areas';
import { REVIEWS_SNAPSHOT } from '../data/reviews';

const { rating, total } = REVIEWS_SNAPSHOT;

export const PAGE_META = {
  '/': {
    title: 'Pet Grooming Near Me in Mumbai | Dog & Cat Grooming at Home',
    description: `Looking for pet grooming near you? Asha Pets is Mumbai’s ${rating}★ rated pet grooming studio in Mulund East with doorstep dog & cat grooming across Mumbai, Navi Mumbai, Thane, Pune, Bangalore, Delhi, Ahmedabad, Surat & Goa. Book on WhatsApp.`,
  },
  '/about': {
    title: 'About Asha Pets | Trusted Pet Groomers in Mulund East, Mumbai',
    description: `Meet Asha Pets — 10+ years of trusted dog and cat grooming in Mulund East, Mumbai. Rated ${rating}★ on Google by ${total}+ pet parents. Certified groomers, pet-safe products, doorstep service.`,
  },
  '/services': {
    title:
      'Pet Grooming Services | Dog Haircut, Bath, Spa & Cat Grooming — Asha Pets',
    description:
      'Full pet grooming services by Asha Pets: full grooming, dog haircut, bath & blow dry, pet spa, de-shedding, tick & flea treatment, nail trim, puppy and cat grooming. In-studio in Mulund East or at your doorstep.',
  },
  '/service-areas': {
    title: 'Pet Grooming Near Me | Areas We Serve Across India — Asha Pets',
    description: `Asha Pets provides dog and cat grooming across ${SERVICE_AREAS.length} cities and ${SERVICE_AREAS.reduce(
      (n, c) => n + c.areas.length,
      0
    )}+ localities — Mumbai, Navi Mumbai, Thane, Pune, Bangalore, Delhi NCR, Ahmedabad, Surat and Goa. Find pet grooming near you.`,
  },
  '/gallery': {
    title: 'Pet Grooming Gallery | Before & After Photos — Asha Pets Mumbai',
    description:
      'Browse the Asha Pets grooming gallery — real before and after photos of dogs and cats groomed at our Mulund East, Mumbai studio and at customers’ homes.',
  },
  '/contact': {
    title: 'Contact Asha Pets | Book Pet Grooming in Mulund East, Mumbai',
    description:
      'Contact Asha Pets in Mulund East, Mumbai. Call +91 81693 12887, WhatsApp us or book a pet grooming appointment online. Open daily 10 AM – 11 PM.',
  },
};

/** Build the meta for one city landing page. */
export function areaMeta(area) {
  return {
    title: `Pet Grooming in ${area.city} | Dog & Cat Grooming at Home — Asha Pets`,
    description: `Professional pet grooming in ${area.city}. Asha Pets offers dog & cat grooming, bath, haircut, spa and de-shedding at your doorstep across ${
      area.areas.length
    }+ localities including ${area.areas
      .slice(0, 4)
      .join(', ')}. Rated ${rating}★ on Google. Book on WhatsApp.`,
  };
}

/** Every prerenderable route, with its meta. */
export function allRoutes() {
  return [
    ...Object.entries(PAGE_META).map(([path, meta]) => ({ path, ...meta })),
    ...SERVICE_AREAS.map((a) => ({ path: areaPath(a.slug), ...areaMeta(a) })),
  ];
}
