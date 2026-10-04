import { useEffect } from 'react';
import { absUrl, SITE_URL } from '../../config/site';
import { BUSINESS, IMAGES, KEYWORDS } from '../../constants';

/* ---------- small DOM helpers ---------- */

const head = () => document.head;

/** Create-or-update a <meta> tag, tagged so we can clean it up. */
function setMeta(attr, key, content) {
  if (!content) return;
  let el = head().querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute('data-seo', 'true');
    head().appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = head().querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute('data-seo', 'true');
    head().appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Replace the page-level JSON-LD block. */
function setJsonLd(data) {
  const existing = head().querySelector('script[data-seo-jsonld="page"]');
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo-jsonld', 'page');
  script.textContent = JSON.stringify(data);
  head().appendChild(script);
}

/**
 * Per-page SEO head.
 *
 * @param {string}  title        page title (business name is appended)
 * @param {string}  fullTitle    exact <title>, used verbatim
 * @param {string}  description  meta description, ~150-160 chars
 * @param {string}  path         route path, used for the canonical URL
 * @param {string}  image        absolute OG image URL
 * @param {object}  jsonLd       schema.org @graph document
 * @param {string[]} keywords    extra keywords for this page
 * @param {boolean} noindex      keep the page out of the index
 */
export default function Seo({
  title,
  fullTitle: exactTitle,
  description,
  path = '/',
  image = IMAGES.ogImage,
  jsonLd,
  keywords = [],
  noindex = false,
}) {
  const fullTitle =
    exactTitle ||
    (title ? `${title} | ${BUSINESS.name}` : `${BUSINESS.name} | ${BUSINESS.headline}`);
  const desc = description || BUSINESS.shortDesc;
  const canonical = absUrl(path);
  const keywordList = [...new Set([...keywords, ...KEYWORDS])].join(', ');
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    document.title = fullTitle;

    /* ---- core ---- */
    setMeta('name', 'title', fullTitle);
    setMeta('name', 'description', desc);
    setMeta('name', 'keywords', keywordList);
    setMeta(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    setLink('canonical', canonical);

    /* ---- local / geo signals ---- */
    setMeta('name', 'geo.region', 'IN-MH');
    setMeta('name', 'geo.placename', 'Mulund East, Mumbai');
    setMeta('name', 'ICBM', '19.1888519, 72.9634068');

    /* ---- Open Graph ---- */
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', BUSINESS.name);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:alt', `${BUSINESS.name} — ${BUSINESS.tagline}`);
    setMeta('property', 'og:locale', 'en_IN');

    /* ---- Twitter ---- */
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', image);

    setJsonLd(jsonLd);
  }, [fullTitle, desc, canonical, image, keywordList, noindex, jsonLdKey, jsonLd]);

  return null;
}

export { SITE_URL };
