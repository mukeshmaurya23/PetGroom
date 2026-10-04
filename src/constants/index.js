/* ============================================================
   Asha Pets — Central business data & content
   Edit these values to update the whole site.
   Business facts verified against the live Google listing:
   https://www.google.com/maps?cid=10684945068070267773
   ============================================================ */

import { GOOGLE } from '../config/site';
import { REVIEWS_SNAPSHOT } from '../data/reviews';

export { SERVICE_AREAS, TOTAL_LOCALITIES, getAreaBySlug, areaPath } from '../data/areas';
export { REVIEWS } from '../data/reviews';

// ---- Business info ----
export const BUSINESS = {
  name: 'Asha Pets',
  legalName: 'Asha Pet',
  altName: 'आशा पेट',
  groomer: 'Suraj Kumar',
  tagline: 'Making Your Pets Happy, Healthy & Beautiful.',
  headline: 'Pet Grooming Near You in Mumbai & Across India',
  shortDesc: `Professional dog & cat grooming at home and in-studio — 10+ years, ${REVIEWS_SNAPSHOT.rating}★ on Google.`,
  rating: REVIEWS_SNAPSHOT.rating,
  reviewsCount: REVIEWS_SNAPSHOT.total,
  yearsExperience: 10,
  happyPets: 5000,
  phone: '+91 81693 12887',
  phoneRaw: '918169312887',
  whatsapp: '918169312887',
  timing: 'Open Daily · Closes 11 PM',
  hours: '10:00 AM – 11:00 PM',
  openingHoursSpec: 'Mo-Su 10:00-23:00',
  address: 'Savitri CHS, Gavanpada, Mulund East, Mumbai, Maharashtra 400604',
  streetAddress: 'Savitri CHS, Gavanpada, Mulund East',
  locality: 'Mumbai',
  region: 'Maharashtra',
  postalCode: '400604',
  addressShort: 'Mulund East, Mumbai',
  mapQuery: 'Asha pet, Gavanpada, Mulund East, Mumbai',
  email: 'hello@ashapets.in',
  founded: '2014',
  social: {
    // Leave blank to hide the icon entirely. Add the real profile URLs
    // here and they reappear in the footer and contact section.
    instagram: '',
    facebook: '',
    google: GOOGLE.mapsUrl,
    reviews: GOOGLE.reviewsUrl,
    writeReview: GOOGLE.writeReviewUrl,
  },
};

// ---- Navigation ----
export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Areas We Serve', to: '/service-areas' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

// ---- Unsplash image helper (swap these for real Asha Pets photos) ----
const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const IMAGES = {
  heroMain: img('1601758228041-f3b2795255f1', 1100),
  heroSecondary: img('1518717758536-85ae29035b6d', 700),
  aboutMain: img('1583337130417-3346a1be7dee', 900),
  aboutSecondary: img('1596492784531-6e6eb5ea9993', 700),
  ctaBg: img('1548199973-03cce0bbc87b', 1400),
  ogImage: img('1601758228041-f3b2795255f1', 1200),
};

// ---- Stats (animated counters) ----
export const STATS = [
  { icon: 'FaAward', value: 10, suffix: '+', label: 'Years Experience' },
  { icon: 'FaPaw', value: 5000, suffix: '+', label: 'Pets Groomed' },
  {
    icon: 'FaStar',
    value: BUSINESS.rating,
    suffix: '',
    label: 'Google Rating',
    decimals: 1,
    key: 'rating',
    href: '#reviews',
  },
  {
    icon: 'FaComments',
    value: BUSINESS.reviewsCount,
    suffix: '+',
    label: 'Google Reviews',
    key: 'reviewsCount',
    href: '#reviews',
  },
];

// ---- About highlights ----
export const ABOUT_POINTS = [
  '10+ Years of Grooming Experience',
  'Certified, Patient Pet Groomers',
  'Safe, Hygienic & Pet-Friendly Products',
  'Doorstep Grooming at Your Home',
  'Trusted by 5,000+ Pet Parents',
  'Dogs, Cats, Puppies & Kittens — All Breeds',
];

// ---- Services (no prices — quotes are shared on WhatsApp) ----
export const SERVICES = [
  {
    slug: 'full-grooming',
    icon: 'FaDog',
    title: 'Full Grooming',
    desc: 'Complete head-to-tail grooming — bath, haircut, styling, nails and finishing touches.',
  },
  {
    slug: 'bath-and-blow-dry',
    icon: 'FaBath',
    title: 'Bath & Blow Dry',
    desc: 'Gentle, deep-cleansing bath with premium shampoo and a fluffy warm blow dry.',
  },
  {
    slug: 'nail-trimming',
    icon: 'FaCut',
    title: 'Nail Trimming',
    desc: 'Safe, stress-free nail clipping and filing to keep those paws healthy.',
  },
  {
    slug: 'hair-cutting',
    icon: 'FaScissors',
    title: 'Hair Cutting',
    desc: 'Breed-specific trims and stylish cuts by experienced, patient groomers.',
  },
  {
    slug: 'tick-and-flea-treatment',
    icon: 'FaShieldDog',
    title: 'Tick & Flea Treatment',
    desc: 'Effective, pet-safe anti-tick and flea treatment for a healthy, itch-free coat.',
  },
  {
    slug: 'ear-cleaning',
    icon: 'FaEarListen',
    title: 'Ear Cleaning',
    desc: 'Gentle ear cleaning to prevent infection, wax build-up and discomfort.',
  },
  {
    slug: 'paw-cleaning',
    icon: 'FaPaw',
    title: 'Paw Cleaning',
    desc: 'Thorough paw and pad cleaning with moisturising care for soft, clean feet.',
  },
  {
    slug: 'pet-spa',
    icon: 'FaSpa',
    title: 'Spa Treatment',
    desc: 'A relaxing spa experience — aroma bath, coat mask and soothing massage.',
  },
  {
    slug: 'puppy-grooming',
    icon: 'FaBone',
    title: 'Puppy Grooming',
    desc: 'Extra-gentle first-groom experience designed for delicate young puppies.',
  },
  {
    slug: 'cat-grooming',
    icon: 'FaCat',
    title: 'Cat Grooming',
    desc: 'Calm, careful grooming tailored to cats — bath, brush, de-shed and trim.',
  },
  {
    slug: 'de-shedding',
    icon: 'FaLeaf',
    title: 'De-Shedding Treatment',
    desc: 'Undercoat removal that cuts shedding dramatically — perfect for double-coated breeds.',
  },
  {
    slug: 'doorstep-grooming',
    icon: 'FaHouseChimney',
    title: 'Doorstep Grooming',
    desc: 'The full grooming setup brought to your home, so your pet never leaves its comfort zone.',
  },
];

// ---- Why choose us ----
export const WHY_CHOOSE = [
  {
    icon: 'FaAward',
    title: 'Experienced Groomers',
    desc: 'A decade of hands-on expertise with every breed and temperament.',
  },
  {
    icon: 'FaLeaf',
    title: 'Pet-Safe Products',
    desc: 'Only pet-safe, dermatologist-friendly shampoos and grooming products.',
  },
  {
    icon: 'FaHouseChimney',
    title: 'Doorstep Service',
    desc: 'Convenient home-visit grooming so your pet stays calm and comfortable.',
  },
  {
    icon: 'FaWallet',
    title: 'Clear, Honest Quotes',
    desc: 'Tell us your pet’s breed and coat — you get a clear quote on WhatsApp before we start.',
  },
  {
    icon: 'FaCalendarCheck',
    title: 'Same Day Booking',
    desc: 'Need it today? Same-day appointments are available on request.',
  },
  {
    icon: 'FaHeart',
    title: 'Pet Friendly Environment',
    desc: 'A calm, loving space where anxious pets feel safe and cared for.',
  },
  {
    icon: 'FaGem',
    title: 'Premium Care',
    desc: 'A luxury spa experience with attention to every little detail.',
  },
  {
    icon: 'FaHeadset',
    title: 'Emergency Support',
    desc: 'Friendly support and quick help whenever your furry friend needs it.',
  },
];

// ---- Gallery (masonry) ----
export const GALLERY = [
  { src: img('1601758228041-f3b2795255f1', 800), alt: 'Freshly groomed happy dog after a full grooming session at Asha Pets Mumbai', tall: true },
  { src: img('1517849845537-4d257902454a', 700), alt: 'Cute pug after a bath and blow dry' },
  { src: img('1514888286974-6c03e2ca1dba', 700), alt: 'Elegant groomed cat after cat grooming service', tall: true },
  { src: img('1548199973-03cce0bbc87b', 800), alt: 'Dog enjoying a walk after grooming' },
  { src: img('1583337130417-3346a1be7dee', 700), alt: 'Fluffy dog portrait after de-shedding treatment' },
  { src: img('1596492784531-6e6eb5ea9993', 800), alt: 'Dog being groomed by a professional pet groomer', tall: true },
  { src: img('1518717758536-85ae29035b6d', 700), alt: 'Golden retriever smiling after a pet spa session' },
  { src: img('1533738363-b7f9aef128ce', 700), alt: 'Kitten after gentle kitten grooming' },
  { src: img('1543466835-00a7907e9de1', 800), alt: 'Happy dog outdoors after doorstep grooming', tall: true },
  { src: img('1574158622682-e40e69881006', 700), alt: 'Cat close up after ear cleaning and brushing' },
  { src: img('1552053831-71594a27632d', 700), alt: 'Corgi puppy after puppy grooming' },
  { src: img('1518791841217-8f162f1e1131', 700), alt: 'Curious cat after a calm grooming session' },
];

// ---- FAQs ----
export const FAQS = [
  {
    q: 'Is there a pet grooming service near me?',
    a: 'Very likely, yes. Asha Pets runs a grooming studio in Mulund East, Mumbai and provides doorstep grooming across Mumbai, Navi Mumbai, Thane, Pune, Bangalore, Delhi NCR, Ahmedabad, Surat and Goa. Send us your locality on WhatsApp and we will confirm the next available slot.',
  },
  {
    q: 'How much does pet grooming cost?',
    a: 'Every quote depends on your pet’s breed, size, coat condition and the services you choose, so we do not publish fixed rates. Message us on WhatsApp with your pet’s breed and a photo and you will get an exact, no-obligation quote within minutes.',
  },
  {
    q: 'Do you provide dog grooming at home?',
    a: 'Yes. Our doorstep grooming service brings the complete grooming kit to your home so your pet is pampered in familiar surroundings — no travel, no cage, no stress.',
  },
  {
    q: 'Which pets do you groom?',
    a: 'We groom dogs and cats of all breeds and sizes — from tiny puppies and kittens to large double-coated breeds. Our groomers tailor every session to your pet’s temperament.',
  },
  {
    q: 'How long does a grooming session take?',
    a: 'Most sessions take between 15 minutes for a quick nail trim and 2 hours for a full spa groom, depending on the service, breed, coat condition and your pet’s temperament.',
  },
  {
    q: 'Do I need a prior appointment?',
    a: 'Appointments are recommended to avoid waiting, but same-day slots are often available. Just call or WhatsApp us to check availability.',
  },
  {
    q: 'Which areas do you serve?',
    a: 'Our studio is in Gavanpada, Mulund East. We serve every Mumbai suburb plus Navi Mumbai and Thane, and offer doorstep grooming in Pune, Bangalore, Delhi NCR, Ahmedabad, Surat and Goa.',
  },
  {
    q: 'Are your grooming products pet-safe?',
    a: 'Absolutely. We only use gentle, dermatologist-friendly, pet-safe shampoos and products suitable for sensitive skin and coats.',
  },
  {
    q: 'Is Asha Pets good with anxious or aggressive pets?',
    a: 'Yes — it is what our Google reviews mention most. With 10+ years of experience our groomers work slowly and patiently with nervous, senior and aggressive pets.',
  },
  {
    q: 'What are your opening hours?',
    a: 'We are open every day of the week from 10:00 AM to 11:00 PM, including Sundays and most public holidays.',
  },
];

// ---- CTA quick actions used across the site ----
export const BADGES = [
  'Same Day Appointment',
  'Doorstep Grooming',
  `${BUSINESS.rating}★ Google Rated`,
];

// ---- Long-tail keyword phrases used in copy + meta ----
export const KEYWORDS = [
  'pet grooming near me',
  'dog grooming near me',
  'cat grooming near me',
  'pet grooming Mumbai',
  'dog grooming Mumbai',
  'Asha Pets',
  'Asha pet Mulund',
  'pet grooming Mulund East',
  'doorstep pet grooming',
  'pet grooming at home',
  'mobile pet grooming',
  'pet spa near me',
  'puppy grooming',
  'cat grooming Mumbai',
  'pet groomer near me',
  'dog haircut near me',
  'pet grooming Navi Mumbai',
  'pet grooming Thane',
  'pet grooming Pune',
  'pet grooming Bangalore',
  'pet grooming Delhi',
  'pet grooming Ahmedabad',
  'pet grooming Surat',
  'pet grooming Goa',
];
