/* ============================================================
   Build-time prerendering.
   For every route it writes dist/<route>/index.html containing
   the fully rendered markup plus that page's title, description,
   canonical URL, Open Graph tags and JSON-LD.

   Why this matters: Google does execute JavaScript, but it queues
   JS rendering separately and other crawlers (Bing, social cards,
   WhatsApp link previews) largely do not run it at all. Static
   HTML per route removes that dependency entirely.
   ============================================================ */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');

const SITE_URL = (process.env.VITE_SITE_URL || 'https://ashapets.in').replace(/\/$/, '');
const OG_IMAGE =
  'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=70';

const { render, allRoutes, REVIEWS_SNAPSHOT } = await import(
  join(root, 'dist-ssr/entry-server.js')
);

const template = readFileSync(join(distDir, 'index.html'), 'utf8');
/**
 * Framer Motion serialises each scroll-reveal element's *hidden*
 * variant into the SSR markup (`opacity:0; transform: translateY(...)`).
 * Left in place, crawlers would see the whole page as hidden text and
 * the content would be invisible if JS never runs. The client remounts
 * the tree with createRoot and replays the animations anyway, so the
 * static copy is stripped back to plain visible markup.
 */
function unhideAnimatedElements(html) {
  return html
    // style="opacity:0;transform:translateY(34px)" -> attribute removed
    .replace(/\s*style="(?:[^"]*?)opacity:0(?:[^"]*?)"/g, '')
    // Any leftover transform-only reveal offsets.
    .replace(/\s*style="transform:translate[XY]\([^)]*\)"/g, '');
}

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Swap the template's head values for this route's. */
function buildHead(html, { path, title, description }) {
  const canonical = `${SITE_URL}${path}`;
  return html
    // Keep index.html's baseline LocalBusiness rating in step with the
    // snapshot, so a refreshed review count reaches the static markup too.
    .replace(/("ratingValue":\s*")[^"]*(")/, `$1${REVIEWS_SNAPSHOT.rating}$2`)
    .replace(/("reviewCount":\s*")[^"]*(")/, `$1${REVIEWS_SNAPSHOT.total}$2`)
    .replace(
      /(rated )\d+(?:\.\d+)?( on Google)/,
      `$1${REVIEWS_SNAPSHOT.rating}$2`
    )
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(
      /(<meta\s+name="description"[\s\S]*?content=")[\s\S]*?(")/,
      `$1${esc(description)}$2`
    )
    .replace(
      /(<link rel="canonical" href=")[^"]*(")/,
      `$1${canonical}$2`
    )
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${esc(description)}$2`
    )
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:image"[\s\S]*?content=")[^"]*(")/, `$1${OG_IMAGE}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(
      /(<meta name="twitter:description" content=")[^"]*(")/,
      `$1${esc(description)}$2`
    );
}

const routes = allRoutes();
let ok = 0;
const failed = [];

for (const route of routes) {
  try {
    const appHtml = unhideAnimatedElements(await render(route.path));
    let page = buildHead(template, route);
    page = page.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    const outDir =
      route.path === '/' ? distDir : join(distDir, route.path.replace(/^\//, ''));
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), page, 'utf8');
    ok += 1;
    console.log(`[prerender] ${route.path.padEnd(28)} ${(appHtml.length / 1024).toFixed(1)} KB`);
  } catch (err) {
    failed.push({ path: route.path, message: err.message });
    console.error(`[prerender] FAILED ${route.path}: ${err.message}`);
  }
}

// Vercel (and Netlify/Cloudflare) serve dist/404.html with a real 404
// status for unmatched URLs — a branded page without the soft-404 that a
// catch-all rewrite to index.html would create.
try {
  const notFoundHtml = unhideAnimatedElements(await render('/__not-found__'));
  const page = buildHead(template, {
    path: '/404',
    title: 'Page Not Found | Asha Pets',
    description:
      'The page you were looking for could not be found. Browse Asha Pets grooming services, service areas or get in touch.',
  })
    .replace('<div id="root"></div>', `<div id="root">${notFoundHtml}</div>`)
    .replace(
      /<meta name="robots" content="[^"]*"/,
      '<meta name="robots" content="noindex, follow"'
    );
  writeFileSync(join(distDir, '404.html'), page, 'utf8');
  console.log('[prerender] 404.html');
} catch (err) {
  console.error(`[prerender] 404 page failed: ${err.message}`);
}

console.log(`\n[prerender] ${ok}/${routes.length} routes written to dist/`);
if (failed.length) {
  console.error('[prerender] Some routes did not render:');
  failed.forEach((f) => console.error(`  ${f.path}: ${f.message}`));
  process.exit(1);
}
