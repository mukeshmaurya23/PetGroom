/* ============================================================
   Bundled snapshot of the live Google Business Profile.
   Used for first paint and as the offline fallback when the
   live Places feed is unavailable. Captured from:
   https://www.google.com/maps?cid=10684945068070267773
   ============================================================ */

/** Snapshot of the aggregate rating shown on Google. */
export const REVIEWS_SNAPSHOT = {
  rating: 4.9,
  total: 59,
  capturedOn: '2026-09-28',
};

/**
 * Real reviews pulled from the public Google listing.
 * `text` is trimmed to the portion Google renders inline.
 */
export const REVIEWS = [
  {
    id: 'sayali-khot',
    name: 'Sayali Khot',
    initial: 'S',
    rating: 5,
    pet: 'Shih Tzu',
    relative: 'a year ago',
    text:
      "I'm extremely happy with Suraj Kumar's service for my 12-year-old Shih Tzu! He handled my senior pup with so much care and patience, making the grooming experience stress-free and comfortable. The attention to detail was amazing.",
    color: '#8a5a3b',
  },
  {
    id: 'harsha-adarkar',
    name: 'Harsha Adarkar',
    initial: 'H',
    rating: 5,
    pet: 'Persian Cat',
    relative: '4 years ago',
    text:
      'We are happy with Asha Pet and Suraj Kumar’s hair & spa service for our Persian male cat! He has done the work professionally, with care and playfulness with the pet!',
    color: '#4b8a5f',
  },
  {
    id: 'vishnu-m',
    name: 'Vishnu M',
    initial: 'V',
    rating: 5,
    pet: 'Cat',
    relative: '4 years ago',
    text:
      'Wonderful experience. So professional. Got my aggressive cat haircut done easily. Would recommend. He does service all over Mumbai.',
    color: '#b08733',
  },
  {
    id: 'google-summary-1',
    name: 'Verified Google Review',
    initial: 'G',
    rating: 5,
    pet: 'Dogs & Cats',
    relative: 'Google review summary',
    text:
      'Best grooming service. Expertise in hair cut and washing of dogs / cats.',
    color: '#a97e5d',
  },
  {
    id: 'google-summary-2',
    name: 'Verified Google Review',
    initial: 'G',
    rating: 5,
    pet: 'Dog',
    relative: 'Google review summary',
    text: 'Great service, always on time, very gentle with the pet.',
    color: '#63402a',
  },
];
