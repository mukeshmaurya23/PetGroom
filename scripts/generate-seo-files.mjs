/* ============================================================
   Generates dist/sitemap.xml and dist/robots.txt at build time.
   Routes are derived from the same data the app renders, so a new
   city in src/data/areas.js shows up in the sitemap automatically.
   ============================================================ */

import { writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'dist');

const SITE_URL = (process.env.VITE_SITE_URL || 'https://ashapets.in').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

/*
 * A *.vercel.app origin means the real domain is not mapped yet.
 * Letting Google index that temporary URL creates a duplicate of the
 * whole site that you then have to migrate away from, so robots.txt
 * blocks crawling until VITE_SITE_URL points at the live domain.
 * Nothing to remember later — changing the env var flips this back.
 */
const isTemporaryHost = /\.vercel\.app$/i.test(new URL(SITE_URL).hostname);

/** Pull the city slugs straight out of the data file (no bundler needed). */
function readCitySlugs() {
  const src = readFileSync(join(root, 'src/data/areas.js'), 'utf8');
  return [...src.matchAll(/^\s{4}slug:\s*'([a-z0-9-]+)'/gm)].map((m) => m[1]);
}

const slugs = readCitySlugs();
if (!slugs.length) {
  console.error('[seo] No city slugs found in src/data/areas.js — aborting.');
  process.exit(1);
}

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/service-areas', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  ...slugs.map((s) => ({
    path: `/pet-grooming-in-${s}`,
    // Mumbai is the flagship location, so it outranks the other city pages.
    priority: s === 'mumbai' ? '0.95' : '0.8',
    changefreq: 'monthly',
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = isTemporaryHost
  ? `# robots.txt for Asha Pets — TEMPORARY DEPLOYMENT
#
# This build targets ${SITE_URL}, a temporary Vercel URL, so crawling is
# blocked to avoid indexing a duplicate of the site under the wrong domain.
# Set VITE_SITE_URL to the real domain and redeploy to allow indexing.

User-agent: *
Disallow: /
`
  : `# robots.txt for Asha Pets
User-agent: *
Allow: /

# Nothing here is private, but keep build assets out of the index.
Disallow: /assets/

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(join(outDir, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(outDir, 'robots.txt'), robots, 'utf8');

console.log(`[seo] sitemap.xml written with ${routes.length} URLs`);
console.log(`[seo] robots.txt written (host: ${SITE_URL})`);
if (isTemporaryHost) {
  console.warn(
    '[seo] NOTE: temporary *.vercel.app host detected — robots.txt blocks all\n' +
      '      crawling. Set VITE_SITE_URL to your real domain and redeploy to\n' +
      '      allow indexing.'
  );
}
