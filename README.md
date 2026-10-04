# Asha Pets — Pet Grooming Website

Marketing site for **Asha Pets**, a pet grooming studio in Gavanpada, Mulund East,
Mumbai, with doorstep grooming across 9 cities.

React 18 + Vite 5 + React Router 6 + Framer Motion. No UI framework — the design
system lives in `src/styles/`.

Business facts on the site are verified against the live Google Business Profile:
<https://www.google.com/maps?cid=10684945068070267773> (4.9★, 59 reviews).

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # client build + SSR build + prerender + sitemap/robots
npm run preview    # serve dist/ locally
npm run lint
```

| Script | What it does |
| --- | --- |
| `build` | The full production pipeline (below). Use this for deploys. |
| `build:client` | Browser bundle only. |
| `build:ssr` | SSR bundle used by the prerenderer. |
| `prerender` | Writes static HTML for all 15 routes. |
| `seo:files` | Writes `dist/sitemap.xml` and `dist/robots.txt`. |
| `build:spa` | Escape hatch: plain SPA build + SEO files, no prerender. |

---

## How the SEO works

### 1. Static HTML for every route (the big one)

A Vite SPA ships an empty `<div id="root">`. Google can execute JavaScript, but it
queues JS rendering separately, and Bing, WhatsApp link previews and most social
unfurlers don't run it at all.

`npm run build` therefore renders each route to real HTML:

```
dist/index.html                       ← /
dist/services/index.html
dist/service-areas/index.html
dist/pet-grooming-in-mumbai/index.html
… 15 routes total
```

Each file contains the full markup, a unique `<title>`, meta description,
canonical URL, Open Graph/Twitter tags and JSON-LD. `scripts/prerender.mjs` also
strips Framer Motion's `opacity:0` reveal styles from the static copy, so crawlers
never see the page as hidden text.

### 2. Per-page metadata

`src/seo/pageMeta.js` is the single source of truth for every route's title and
description — read by both the React pages and the build-time prerenderer, so the
two can't drift. `src/components/common/Seo.jsx` applies them on client-side
navigation.

### 3. Structured data

`src/seo/schema.js` builds a schema.org `@graph` per page:

- `PetGroomer` / `LocalBusiness` — address, geo, hours, `aggregateRating`,
  `areaServed` (all 216 localities), `hasOfferCatalog`
- `Service` nodes, scoped to the city on location pages
- `FAQPage`, `BreadcrumbList`, `WebSite`, `WebPage`, `Review`

The rating in the structured data follows the **live** Google feed, so it never
goes stale.

### 4. Location landing pages

`src/data/areas.js` drives everything. Each city gets `/pet-grooming-in-<slug>`
with its own title, description, locality list and `Service` schema — this is what
competes for "pet grooming in <city>" and "pet grooming near me".

**Adding a city:** append an entry to `SERVICE_AREAS`. The route, nav, footer
links, sitemap entry and prerendered page are all generated from it.

> Routes are registered explicitly in `App.jsx` rather than as
> `/pet-grooming-in-:slug`, because React Router only matches a dynamic param that
> spans a whole path segment — a partial-segment param silently never matches.

### 5. Set your domain

Canonicals, the sitemap and `robots.txt` all read one value:

```bash
VITE_SITE_URL=https://ashapets.in
```

Change it in `.env` (or your host's dashboard) and everything follows. The default
is `https://ashapets.in`.

---

## Live Google reviews

The rating, review count and review cards are driven by the real Google listing.
Resolution order, each falling back silently to the next:

1. **`VITE_REVIEWS_ENDPOINT`** — your own cached serverless proxy (recommended)
2. **Places API (New)** called directly from the browser
3. **`src/data/reviews.js`** — a bundled snapshot that always works offline

Successful fetches are cached in `localStorage` for 12 hours.

### Recommended setup (proxy)

`api/google-reviews.js` is ready to deploy on Vercel as-is (a Netlify/Cloudflare
adapter is in the file's footer). It keeps the API key server-side and lets the CDN
cache one response for all visitors.

1. In [Google Cloud Console](https://console.cloud.google.com/), enable
   **Places API (New)** and create an API key.
2. Find the **Place ID** for Asha Pets with the
   [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   (search "Asha pet, Mulund East"). The listing's other identifiers are already in
   `src/config/site.js`.
3. Set these in your host's dashboard:

   ```bash
   GOOGLE_MAPS_API_KEY=…      # server-side, never exposed
   GOOGLE_PLACE_ID=…
   VITE_REVIEWS_ENDPOINT=/api/google-reviews
   ```

Until that's configured the site shows the bundled snapshot (4.9★, 59 reviews) —
it never renders a broken or empty rating.

> Google's Places API returns at most **5** reviews per place. That's an API limit,
> not a bug. The "Read all 59 reviews" button links to the full Google listing.

### Keeping the numbers fresh

Two independent layers, and only one of them is ever scheduled:

| | Updates when | Needs a cron? |
| --- | --- | --- |
| **What visitors see** (hero badge, stats, review cards, footer) | On page load, cached 12h per browser | No — it is always live |
| **What crawlers see** (JSON-LD `aggregateRating`, meta descriptions, first paint) | On every deploy, via `sync:reviews` | Only if you go weeks without deploying |

`sync:reviews` is the first step of `npm run build`, so any deploy refreshes the
static snapshot — you never run it manually. With no credentials set it logs a
message, keeps the existing snapshot and exits 0, so it cannot break a build.

`.github/workflows/refresh-reviews.yml` covers the gap: a weekly cron that POSTs
to a deploy hook. Add a `DEPLOY_HOOK_URL` repository secret (Vercel: *Settings →
Git → Deploy Hooks*; Netlify: *Build & deploy → Build hooks*) and it rebuilds
every Monday. Delete the file if you'd rather not bother — a stale static count
only affects the number in search results, never the number on the page.

### Without a proxy

Set `VITE_GOOGLE_MAPS_API_KEY` and `VITE_GOOGLE_PLACE_ID` instead. The key ships in
the bundle, so restrict it by HTTP referrer **and** to the Places API in Google
Cloud Console.

---

## Bookings

Every booking path ends in a pre-filled WhatsApp message to `+91 81693 12887`.

The send button is an `<a href>` that rebuilds on each keystroke, rather than a
`window.open()` in a submit handler — a plain link navigation is never blocked by a
mobile popup blocker, so the hand-off to the WhatsApp app is reliable.

The form has **no validation gate**: a blocked submit is a lost booking, and the
details get sorted out in the chat. Picking "Other / not sure" as the service
reveals a free-text field.

---

## Deploying to Vercel

Vercel's Git integration handles deployment: **every push to `main` deploys to
production, every pull request gets its own preview URL.** No deploy workflow is
needed, and adding one would only duplicate the build.

1. Push the repo to GitHub.
2. Vercel → **Add New → Project** → import the repo. Leave the build settings
   alone; `vercel.json` already sets `npm run build` and `dist`.
3. Add the environment variables below (tick Production, Preview **and**
   Development), then redeploy — `VITE_*` values are inlined at build time, so
   they don't reach an already-built deployment.

| Variable | Value | Scope |
| --- | --- | --- |
| `VITE_SITE_URL` | `https://ashapets.in` | build |
| `VITE_REVIEWS_ENDPOINT` | `/api/google-reviews` | build |
| `GOOGLE_MAPS_API_KEY` | your Places API (New) key | server |
| `GOOGLE_PLACE_ID` | the Asha Pets place id | server |

`api/google-reviews.js` is picked up automatically as a serverless function at
`/api/google-reviews`. `dist/404.html` is served with a real 404 status for
unmatched URLs.

### Deploying before the domain is mapped

Set `VITE_SITE_URL` to the Vercel URL Vercel assigns you, e.g.
`https://asha-pets.vercel.app`. Everything stays self-consistent, and the build
detects the `*.vercel.app` host and emits a `Disallow: /` robots.txt so Google
cannot index the site under a temporary domain — which would otherwise create a
duplicate you'd have to migrate away from later.

Nothing to undo: point `VITE_SITE_URL` at the real domain and redeploy, and
robots.txt, canonicals, the sitemap and the structured data all switch over
together.

### Custom domain

Vercel → Settings → **Domains** → add the domain. Vercel then shows the exact DNS
records to create at your registrar — **use the values it displays**, they are
authoritative and have changed over time. Typically:

- apex (`ashapets.in`) → an `A` record
- `www` → a `CNAME` to `cname.vercel-dns.com`

Alternatively point your registrar's nameservers at Vercel and it manages DNS for
you. HTTPS is provisioned automatically once DNS resolves.

**After the domain is live, update `VITE_SITE_URL` to the real origin and
redeploy.** Canonical tags, `sitemap.xml`, `robots.txt` and the structured data
all derive from it — leaving it on the `*.vercel.app` URL tells Google the
canonical home of every page is that preview domain.

### Once it's live

1. [Google Search Console](https://search.google.com/search-console) → add the
   domain → submit `https://<domain>/sitemap.xml`.
2. [Rich Results Test](https://search.google.com/test/rich-results) → check the
   home page and one city page render `LocalBusiness` and `FAQPage`.
3. **Add the website URL to the Google Business Profile.** The listing currently
   has none ("Add website"), and linking it is one of the strongest local ranking
   signals available for a business like this.

---

## Project layout

```
api/                     Serverless reviews proxy (Vercel-ready)
scripts/
  prerender.mjs          Static HTML for every route
  generate-seo-files.mjs sitemap.xml + robots.txt
src/
  config/site.js         Domain, Google identifiers, credit
  constants/index.js     Business info, services, FAQs, nav
  data/
    areas.js             9 cities, 216 localities  ← add cities here
    reviews.js           Google snapshot + fallback reviews
  seo/
    pageMeta.js          Per-route title/description (shared with prerender)
    schema.js            schema.org builders
  services/googleReviews.js   Live feed with cache + fallbacks
  context/               Booking modal + live reviews providers
  components/            layout / sections / ui / common
  styles/                index, layout, hero, cards, sections, modal, pages, areas
  entry-server.jsx       SSR entry (build-time only)
```

---

## Notes

- **Images** are Unsplash placeholders via the `img()` helper in
  `src/constants/index.js`. Swapping in real Asha Pets photos is the single biggest
  remaining win — both for conversion and for image search.
- **Instagram and Facebook** links are hidden. Add real profile URLs to
  `BUSINESS.social` in `src/constants/index.js` and the icons reappear in the
  footer and contact section (and get added to `sameAs` in the structured data).
- **No prices** appear anywhere on the site by design; quotes are given on WhatsApp.
- Hosting must serve `dist/` with directory-index resolution so
  `/pet-grooming-in-mumbai` resolves to that folder's `index.html`. Vercel, Netlify
  and Cloudflare Pages all do this by default. Keep an SPA fallback to
  `/index.html` for any unmatched path.

---

Designed & developed by **Mukesh Maurya** — <mukeshmauryanpm@gmail.com>
