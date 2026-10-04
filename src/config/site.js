/* ============================================================
   Asha Pets — Site-wide technical configuration
   Change SITE_URL here and it updates canonicals, sitemap,
   robots.txt, Open Graph tags and all structured data.
   ============================================================ */

/** Canonical origin — no trailing slash. */
export const SITE_URL = (
  import.meta.env?.VITE_SITE_URL || 'https://ashapets.in'
).replace(/\/$/, '');

/** Build an absolute URL from a route path. */
export const absUrl = (path = '/') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

/* ---- Google Business Profile identifiers (from the live listing) ---- */
export const GOOGLE = {
  /** Knowledge-graph MID seen in Google share links. */
  kgmid: '/g/11sfjwjj5w',
  /** Maps feature id — "<ftid>" pair used in review deep links. */
  ftid: '0x3be7b9c9136a779b:0x94488ced9ae3eb7d',
  /** Numeric customer id (decimal form of the second ftid half). */
  cid: '10684945068070267773',
  /** Places API place id. Set VITE_GOOGLE_PLACE_ID once you have it. */
  placeId: import.meta.env?.VITE_GOOGLE_PLACE_ID || '',
  lat: 19.1888519,
  lng: 72.9634068,
  plusCode: '5XQ7+G9 Mumbai, Maharashtra',
  /** Public listing + review links. */
  listingUrl: 'https://maps.app.goo.gl/nX8uVMGDSHdj2KWgI',
  mapsUrl: 'https://www.google.com/maps?cid=10684945068070267773',
  /** Opens the Google reviews panel for this listing. */
  reviewsUrl:
    'https://www.google.com/search?q=Asha+pet+Mulund+East+Mumbai#lrd=0x3be7b9c9136a779b:0x94488ced9ae3eb7d,1,,,,',
  /** Opens the "rate & review" dialog directly. */
  writeReviewUrl:
    'https://www.google.com/search?q=Asha+pet+Mulund+East+Mumbai#lrd=0x3be7b9c9136a779b:0x94488ced9ae3eb7d,3,,,,',
};

/* ---- Live reviews feed ----
   Priority order at runtime:
   1. VITE_REVIEWS_ENDPOINT  — your own cached serverless proxy (recommended)
   2. Google Places API (New) — direct, needs a referrer-restricted browser key
   3. Bundled snapshot in src/data/reviews.js (always works offline)
---------------------------------------------------------------- */
export const REVIEWS_ENDPOINT = import.meta.env?.VITE_REVIEWS_ENDPOINT || '';
export const GOOGLE_API_KEY = import.meta.env?.VITE_GOOGLE_MAPS_API_KEY || '';

/** How long a successful fetch stays cached in the browser (ms). */
export const REVIEWS_CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours
export const REVIEWS_CACHE_KEY = 'ashapets:google-reviews:v1';

/** Developer credit shown in the footer bar. */
export const CREDIT = {
  label: 'Mukesh Maurya',
  email: 'mukeshmauryanpm@gmail.com',
};
