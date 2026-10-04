/* ============================================================
   Builds the schema.org @graph for a route without React.
   Used by the prerenderer so the full structured data lands in
   the static HTML, instead of only appearing once Seo.jsx runs
   in the browser.
   ============================================================ */

import {
  graph,
  localBusiness,
  website,
  webPage,
  breadcrumbs,
  faqPage,
  serviceList,
  areasItemList,
  cityPage,
  reviewNodes,
  service as serviceNode,
} from './schema';
import { PAGE_META, areaMeta } from './pageMeta';
import { SERVICE_AREAS, areaPath, getAreaBySlug } from '../data/areas';
import { REVIEWS, REVIEWS_SNAPSHOT } from '../data/reviews';
import { SERVICES } from '../constants';

const base = () =>
  localBusiness({
    rating: REVIEWS_SNAPSHOT.rating,
    reviewCount: REVIEWS_SNAPSHOT.total,
  });

/** The @graph for one route path, or null if the path is unknown. */
export function graphForRoute(path) {
  // ---- City landing pages ----
  const cityMatch = SERVICE_AREAS.find((a) => areaPath(a.slug) === path);
  if (cityMatch) {
    const area = getAreaBySlug(cityMatch.slug);
    const { title, description } = areaMeta(area);
    return graph([
      base(),
      webPage({ path, title, description }),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Areas We Serve', path: '/service-areas' },
        { name: area.city, path },
      ]),
      cityPage(area),
      ...SERVICES.slice(0, 6).map((s) => serviceNode(s, area.city)),
      faqPage(),
    ]);
  }

  const meta = PAGE_META[path];
  if (!meta) return null;
  const { title, description } = meta;
  const page = webPage({ path, title, description });

  switch (path) {
    case '/':
      return graph([
        base(),
        website(),
        page,
        serviceList(),
        areasItemList(),
        faqPage(),
        ...reviewNodes(REVIEWS),
      ]);
    case '/about':
      return graph([
        base(),
        page,
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]),
        ...reviewNodes(REVIEWS),
      ]);
    case '/services':
      return graph([
        base(),
        page,
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]),
        serviceList(),
        faqPage(),
      ]);
    case '/service-areas':
      return graph([
        base(),
        page,
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Areas We Serve', path: '/service-areas' },
        ]),
        areasItemList(),
      ]);
    case '/gallery':
      return graph([
        base(),
        page,
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ]),
      ]);
    case '/contact':
      return graph([
        base(),
        page,
        breadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]),
        faqPage(),
      ]);
    default:
      return graph([base(), page]);
  }
}
