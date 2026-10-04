Drop the real Asha Pets photos here (e.g. dog-1.jpg, cat-1.jpg, gallery-1.jpg ...).

Then reference them in src/constants/index.js, for example:

  heroMain: '/images/hero.jpg',
  ...
  GALLERY: [
    { src: '/images/gallery-1.jpg', alt: 'Freshly groomed dog', tall: true },
    ...
  ]

Files in the /public folder are served from the site root, so "/images/hero.jpg"
maps to public/images/hero.jpg.
