/* ============================================================
   Asha Pets — Operating areas
   Powers the "Areas We Serve" section, the /service-areas hub
   and every /pet-grooming-in-<city> landing page.
   Order matters: Mumbai first, then the wider network.
   ============================================================ */

export const SERVICE_AREAS = [
  {
    slug: 'mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    tier: 'flagship',
    label: 'Flagship Studio',
    headline: 'Pet Grooming in Mumbai',
    blurb:
      'Our home ground. Walk into the Asha Pets studio in Mulund East, or book doorstep grooming anywhere across the island city and the western & central suburbs.',
    landmark: 'Savitri CHS, Gavanpada, Mulund East',
    areas: [
      'Mulund East', 'Mulund West', 'Bhandup', 'Nahur', 'Kanjurmarg', 'Vikhroli',
      'Ghatkopar', 'Powai', 'Chembur', 'Kurla', 'Sion', 'Matunga', 'Dadar',
      'Parel', 'Lower Parel', 'Worli', 'Prabhadevi', 'Mahim', 'Bandra East',
      'Bandra West', 'Khar', 'Santacruz', 'Vile Parle', 'Andheri East',
      'Andheri West', 'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali',
      'Borivali', 'Dahisar', 'Juhu', 'Versova', 'Lokhandwala', 'Colaba',
      'Churchgate', 'Marine Lines', 'Girgaon', 'Byculla', 'Wadala', 'Sewri',
      'Govandi', 'Mankhurd', 'Antop Hill', 'Mumbai Central', 'Grant Road',
      'Tardeo', 'Mira Road', 'Bhayandar',
    ],
  },
  {
    slug: 'navi-mumbai',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    tier: 'priority',
    label: 'Doorstep Service',
    headline: 'Pet Grooming in Navi Mumbai',
    blurb:
      'Full doorstep grooming across every Navi Mumbai node — from Airoli down to Panvel and Ulwe. Same-day slots available most days.',
    landmark: 'Doorstep across all nodes',
    areas: [
      'Vashi', 'Nerul', 'CBD Belapur', 'Kharghar', 'Panvel', 'New Panvel',
      'Airoli', 'Ghansoli', 'Kopar Khairane', 'Sanpada', 'Turbhe', 'Rabale',
      'Juinagar', 'Seawoods', 'Ulwe', 'Kamothe', 'Kalamboli', 'Taloja',
      'Dronagiri', 'Palm Beach Road',
    ],
  },
  {
    slug: 'thane',
    city: 'Thane',
    state: 'Maharashtra',
    tier: 'priority',
    label: 'Doorstep Service',
    headline: 'Pet Grooming in Thane',
    blurb:
      'Thane, Ghodbunder Road and the Kalyan–Dombivli belt — our groomers travel to you with the complete mobile grooming kit.',
    landmark: 'Doorstep across Thane district',
    areas: [
      'Thane West', 'Thane East', 'Ghodbunder Road', 'Kolshet', 'Majiwada',
      'Naupada', 'Vartak Nagar', 'Hiranandani Estate', 'Kalwa', 'Mumbra',
      'Dombivli', 'Kalyan', 'Ambernath', 'Badlapur', 'Bhiwandi', 'Ulhasnagar',
    ],
  },
  {
    slug: 'pune',
    city: 'Pune',
    state: 'Maharashtra',
    tier: 'city',
    label: 'Doorstep Service',
    headline: 'Pet Grooming in Pune',
    blurb:
      'On-demand pet grooming at home across Pune and Pimpri-Chinchwad — Koregaon Park and Kharadi to Baner, Wakad and Hinjewadi.',
    landmark: 'Doorstep across Pune & PCMC',
    areas: [
      'Koregaon Park', 'Kalyani Nagar', 'Viman Nagar', 'Kharadi', 'Hadapsar',
      'Magarpatta', 'Camp', 'Deccan', 'Shivajinagar', 'Aundh', 'Baner',
      'Balewadi', 'Wakad', 'Hinjewadi', 'Pimpri', 'Chinchwad',
      'Pimple Saudagar', 'Kothrud', 'Karve Nagar', 'Warje', 'Katraj',
      'Bibwewadi', 'Undri', 'NIBM Road', 'Wagholi', 'Yerwada', 'Bavdhan',
    ],
  },
  {
    slug: 'bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    tier: 'city',
    label: 'Doorstep Service',
    headline: 'Pet Grooming in Bangalore',
    blurb:
      'Home grooming for dogs and cats across Bengaluru — Indiranagar and Koramangala through to Whitefield, Sarjapur Road and Electronic City.',
    landmark: 'Doorstep across Bengaluru',
    areas: [
      'Indiranagar', 'Koramangala', 'HSR Layout', 'BTM Layout', 'Jayanagar',
      'JP Nagar', 'Banashankari', 'Basavanagudi', 'Rajajinagar',
      'Malleshwaram', 'Vijayanagar', 'Yelahanka', 'Hebbal', 'RT Nagar',
      'Kalyan Nagar', 'Hennur', 'Thanisandra', 'Whitefield', 'Marathahalli',
      'Bellandur', 'Sarjapur Road', 'Electronic City', 'Bommanahalli',
      'Kengeri',
    ],
  },
  {
    slug: 'delhi-ncr',
    city: 'Delhi NCR',
    state: 'Delhi',
    tier: 'city',
    label: 'Doorstep Service',
    headline: 'Pet Grooming in Delhi NCR',
    blurb:
      'Doorstep dog and cat grooming across Delhi, Noida, Gurugram, Ghaziabad and Faridabad — no travel stress for your pet.',
    landmark: 'Doorstep across Delhi NCR',
    areas: [
      'Saket', 'Hauz Khas', 'Vasant Kunj', 'Vasant Vihar', 'Greater Kailash',
      'Defence Colony', 'Lajpat Nagar', 'South Extension', 'Dwarka',
      'Janakpuri', 'Rohini', 'Pitampura', 'Punjabi Bagh', 'Rajouri Garden',
      'Karol Bagh', 'Connaught Place', 'Mayur Vihar', 'Preet Vihar',
      'Noida', 'Greater Noida', 'Gurugram', 'Ghaziabad', 'Indirapuram',
      'Faridabad',
    ],
  },
  {
    slug: 'ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    tier: 'city',
    label: 'Doorstep Service',
    headline: 'Pet Grooming in Ahmedabad',
    blurb:
      'Pet spa and grooming at home across Ahmedabad and Gandhinagar — Satellite, Bodakdev, SG Highway, Prahlad Nagar and beyond.',
    landmark: 'Doorstep across Ahmedabad',
    areas: [
      'Satellite', 'Bodakdev', 'Vastrapur', 'Prahlad Nagar', 'SG Highway',
      'Thaltej', 'Bopal', 'South Bopal', 'Navrangpura', 'CG Road',
      'Maninagar', 'Naranpura', 'Chandkheda', 'Motera', 'Gota',
      'Science City', 'Paldi', 'Ellisbridge', 'Vejalpur', 'Nikol',
      'Gandhinagar',
    ],
  },
  {
    slug: 'surat',
    city: 'Surat',
    state: 'Gujarat',
    tier: 'city',
    label: 'Doorstep Service',
    headline: 'Pet Grooming in Surat',
    blurb:
      'Gentle, professional grooming at your doorstep across Surat — Adajan, Vesu, Pal, City Light, Piplod and the whole Athwa belt.',
    landmark: 'Doorstep across Surat',
    areas: [
      'Adajan', 'Vesu', 'Pal', 'Piplod', 'City Light', 'Athwa',
      'Ghod Dod Road', 'Rander', 'Katargam', 'Varachha', 'Udhna',
      'Dumas Road', 'Bhatar', 'Althan', 'Magdalla', 'Pandesara',
    ],
  },
  {
    slug: 'goa',
    city: 'Goa',
    state: 'Goa',
    tier: 'city',
    label: 'Doorstep Service',
    headline: 'Pet Grooming in Goa',
    blurb:
      'Home grooming across North and South Goa — Panaji and Porvorim to Calangute, Anjuna, Margao and Vasco.',
    landmark: 'Doorstep across North & South Goa',
    areas: [
      'Panaji', 'Porvorim', 'Mapusa', 'Margao', 'Vasco da Gama', 'Calangute',
      'Candolim', 'Baga', 'Anjuna', 'Arpora', 'Siolim', 'Assagao', 'Ponda',
      'Bicholim', 'Dona Paula', 'Miramar', 'Colva', 'Benaulim', 'Verna',
    ],
  },
];

/** Total distinct localities covered — used in copy and stats. */
export const TOTAL_LOCALITIES = SERVICE_AREAS.reduce(
  (n, c) => n + c.areas.length,
  0
);

export const getAreaBySlug = (slug) =>
  SERVICE_AREAS.find((a) => a.slug === slug) || null;

/** Route path for a city landing page. */
export const areaPath = (slug) => `/pet-grooming-in-${slug}`;
