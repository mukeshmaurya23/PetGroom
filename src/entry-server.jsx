/* ============================================================
   Server entry used only by scripts/prerender.mjs at build time.
   Renders each route to static HTML so crawlers (and social
   unfurlers) get real content instead of an empty <div id="root">.
   ============================================================ */

import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Writable } from 'node:stream';
import App from './App';

/**
 * Render one route to an HTML string.
 * renderToPipeableStream (not renderToString) because the app
 * code-splits its pages with React.lazy — onAllReady waits for
 * those Suspense boundaries to resolve before we read the output.
 */
export function render(url) {
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString('utf8');
        cb();
      },
    });
    sink.on('finish', () => resolve(html));

    const { pipe, abort } = renderToPipeableStream(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
      {
        onAllReady() {
          pipe(sink);
        },
        onError(err) {
          reject(err);
        },
      }
    );

    // Never let one bad route hang the whole build.
    setTimeout(() => {
      abort();
      reject(new Error(`Prerender timed out for ${url}`));
    }, 20000);
  });
}

// Re-exported so scripts/prerender.mjs only has to load one SSR bundle.
export { allRoutes } from './seo/pageMeta';
export { REVIEWS_SNAPSHOT } from './data/reviews';
