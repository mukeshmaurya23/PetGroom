/* ============================================================
   Google reviews feed
   ------------------------------------------------------------
   Resolution order:
     1. VITE_REVIEWS_ENDPOINT  — your own serverless proxy.
        Recommended: the API key stays on the server and the
        response can be cached, so you stay inside Google's
        caching terms and never burn quota on every page view.
     2. Places API (New), called straight from the browser with
        a referrer-restricted key. Returns up to 5 reviews.
     3. The bundled snapshot in src/data/reviews.js.
   Every layer degrades silently to the next one, so the site
   always renders a rating even with no network and no key.
   ============================================================ */

import {
  GOOGLE,
  GOOGLE_API_KEY,
  REVIEWS_CACHE_KEY,
  REVIEWS_CACHE_TTL,
  REVIEWS_ENDPOINT,
} from '../config/site';
import { REVIEWS as FALLBACK_REVIEWS, REVIEWS_SNAPSHOT } from '../data/reviews';

const PALETTE = ['#8a5a3b', '#b08733', '#4b8a5f', '#a97e5d', '#63402a'];

/** Deterministic avatar colour so a reviewer keeps the same swatch. */
const colorFor = (seed = '') => {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
};

const clean = (s = '') => s.replace(/\s+/g, ' ').trim();

/** Shape one Places API (New) review into the card format. */
function normalizePlacesReview(r, i) {
  const name = clean(r?.authorAttribution?.displayName || 'Google User');
  const text = clean(r?.text?.text || r?.originalText?.text || '');
  return {
    id: r?.name || `google-${i}`,
    name,
    initial: name.charAt(0).toUpperCase() || 'G',
    rating: Math.round(Number(r?.rating) || 5),
    pet: '',
    relative: r?.relativePublishTimeDescription || '',
    text,
    photo: r?.authorAttribution?.photoUri || '',
    profileUrl: r?.authorAttribution?.uri || '',
    color: colorFor(name),
  };
}

/** Accepts either a proxy payload or a raw Places API payload. */
export function normalizeFeed(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const rating = Number(raw.rating);
  const total = Number(raw.userRatingCount ?? raw.total ?? raw.reviewCount);
  if (!Number.isFinite(rating) || rating <= 0) return null;

  const list = Array.isArray(raw.reviews) ? raw.reviews : [];
  const reviews = list
    .map((r, i) => (r?.authorAttribution || r?.text?.text ? normalizePlacesReview(r, i) : r))
    .filter((r) => r && clean(r.text).length > 0)
    .slice(0, 12);

  return {
    rating: Math.round(rating * 10) / 10,
    total: Number.isFinite(total) && total > 0 ? total : REVIEWS_SNAPSHOT.total,
    reviews: reviews.length ? reviews : FALLBACK_REVIEWS,
    source: 'google',
    fetchedAt: Date.now(),
  };
}

/* ---------------- browser cache ---------------- */

function readCache() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(REVIEWS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.fetchedAt) return null;
    if (Date.now() - parsed.fetchedAt > REVIEWS_CACHE_TTL) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(data) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(REVIEWS_CACHE_KEY, JSON.stringify(data));
  } catch {
    /* private mode / quota — caching is best-effort only */
  }
}

/* ---------------- fetchers ---------------- */

async function fetchFromProxy(signal) {
  if (!REVIEWS_ENDPOINT) return null;
  const res = await fetch(REVIEWS_ENDPOINT, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Reviews proxy responded ${res.status}`);
  return normalizeFeed(await res.json());
}

async function fetchFromPlaces(signal) {
  if (!GOOGLE_API_KEY || !GOOGLE.placeId) return null;
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(GOOGLE.placeId)}`;
  const res = await fetch(url, {
    signal,
    headers: {
      'X-Goog-Api-Key': GOOGLE_API_KEY,
      'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
    },
  });
  if (!res.ok) throw new Error(`Places API responded ${res.status}`);
  return normalizeFeed(await res.json());
}

/** The always-available baseline. */
export const SNAPSHOT_FEED = {
  rating: REVIEWS_SNAPSHOT.rating,
  total: REVIEWS_SNAPSHOT.total,
  reviews: FALLBACK_REVIEWS,
  source: 'snapshot',
  fetchedAt: 0,
};

/**
 * Resolve the review feed, newest source first.
 * Never rejects — callers always get a usable feed.
 */
export async function loadGoogleReviews({ signal } = {}) {
  const cached = readCache();
  if (cached) return cached;

  for (const fetcher of [fetchFromProxy, fetchFromPlaces]) {
    try {
      const feed = await fetcher(signal);
      if (feed) {
        writeCache(feed);
        return feed;
      }
    } catch (err) {
      if (err?.name === 'AbortError') throw err;
      if (import.meta.env?.DEV) console.warn('[reviews]', err.message);
    }
  }

  return SNAPSHOT_FEED;
}
