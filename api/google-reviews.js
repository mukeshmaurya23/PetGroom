/* ============================================================
   Cached Google reviews proxy  —  GET /api/google-reviews
   ------------------------------------------------------------
   Deploy target: Vercel (works as-is) or Netlify/Cloudflare with
   the tiny adapter noted at the bottom of this file.

   Why a proxy instead of calling Google from the browser:
     • the API key never reaches the client
     • one cached response serves every visitor, so a busy day
       costs you a handful of Places calls instead of thousands
     • Google's terms expect cached, not per-view, requests

   Required environment variables (set in your host's dashboard):
     GOOGLE_MAPS_API_KEY   server-side key with Places API (New)
     GOOGLE_PLACE_ID       the place id for the Asha Pets listing
   ============================================================ */

const FIELD_MASK = 'rating,userRatingCount,reviews,googleMapsUri';

/** Edge/CDN cache window, in seconds. */
const CACHE_SECONDS = 60 * 60 * 6; // 6 hours
const STALE_SECONDS = 60 * 60 * 24; // serve stale for a day while revalidating

export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`
  );

  if (!apiKey || !placeId) {
    return res.status(501).json({
      error: 'Not configured',
      hint: 'Set GOOGLE_MAPS_API_KEY and GOOGLE_PLACE_ID in your environment.',
    });
  }

  try {
    const upstream = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': FIELD_MASK,
        },
      }
    );

    if (!upstream.ok) {
      const detail = await upstream.text();
      return res
        .status(502)
        .json({ error: 'Places API error', status: upstream.status, detail });
    }

    const data = await upstream.json();

    // Pass through only what the site renders — keeps the payload small
    // and avoids leaking fields we did not intend to publish.
    return res.status(200).json({
      rating: data.rating ?? null,
      userRatingCount: data.userRatingCount ?? null,
      googleMapsUri: data.googleMapsUri ?? null,
      reviews: (data.reviews || []).map((r) => ({
        name: r.name,
        rating: r.rating,
        relativePublishTimeDescription: r.relativePublishTimeDescription,
        publishTime: r.publishTime,
        text: r.text ? { text: r.text.text } : null,
        authorAttribution: r.authorAttribution
          ? {
              displayName: r.authorAttribution.displayName,
              photoUri: r.authorAttribution.photoUri,
              uri: r.authorAttribution.uri,
            }
          : null,
      })),
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ error: 'Fetch failed', detail: String(err) });
  }
}

/* ------------------------------------------------------------
   Netlify Functions / Cloudflare Pages adapter
   Save as netlify/functions/google-reviews.js:

     export default async (request) => {
       let body, status = 200;
       await handler(request, {
         setHeader() {},
         status(s) { status = s; return this; },
         json(b) { body = b; return this; },
       });
       return Response.json(body, { status });
     };

   Then point VITE_REVIEWS_ENDPOINT at the deployed function URL.
   ------------------------------------------------------------ */
