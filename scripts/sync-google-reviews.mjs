/* ============================================================
   Refreshes the bundled Google snapshot from the live listing.
   Run before a build so the rating, review count and review cards
   baked into the static HTML match what Google shows today:

     GOOGLE_MAPS_API_KEY=… GOOGLE_PLACE_ID=… npm run sync:reviews

   Without credentials it exits 0 and leaves the existing snapshot
   in place, so it is always safe to chain into a build.
   ============================================================ */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const target = join(root, 'src/data/reviews.js');

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

if (!apiKey || !placeId) {
  console.log(
    '[reviews] GOOGLE_MAPS_API_KEY / GOOGLE_PLACE_ID not set — keeping the existing snapshot.'
  );
  process.exit(0);
}

const res = await fetch(
  `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
  {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'rating,userRatingCount',
    },
  }
);

if (!res.ok) {
  console.warn(`[reviews] Places API returned ${res.status} — keeping the existing snapshot.`);
  process.exit(0);
}

const data = await res.json();
const rating = Number(data.rating);
const total = Number(data.userRatingCount);

if (!Number.isFinite(rating) || !Number.isFinite(total)) {
  console.warn('[reviews] Unexpected payload — keeping the existing snapshot.');
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
let src = readFileSync(target, 'utf8');
const before = src;

src = src
  .replace(/(rating:\s*)[\d.]+/, `$1${Math.round(rating * 10) / 10}`)
  .replace(/(total:\s*)\d+/, `$1${total}`)
  .replace(/(capturedOn:\s*')[^']*'/, `$1${today}'`);

if (src === before) {
  console.warn('[reviews] Snapshot markers not found — file left untouched.');
  process.exit(0);
}

writeFileSync(target, src, 'utf8');
console.log(`[reviews] Snapshot updated: ${rating}★ from ${total} reviews (${today}).`);
