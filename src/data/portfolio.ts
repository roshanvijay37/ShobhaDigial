// Gallery + film data. Photos resolve to files in src/assets/portfolio via
// their `file` name (see src/lib/images.ts). Add more by dropping a photo in
// that folder and adding an entry here.

export interface PortfolioItem {
  file: string;
  title: string;
  category: string;
  alt: string;
  orientation: 'portrait' | 'landscape';
  featured?: boolean;
}

export const portfolio: PortfolioItem[] = [
  {
    file: 'rathotsava-night-aerial.jpeg',
    title: 'Rathotsava by Night',
    category: 'Aerial & Drone',
    orientation: 'landscape',
    featured: true,
    alt: 'Aerial night view of an illuminated temple chariot surrounded by a huge crowd of devotees during a rathotsava festival',
  },
  {
    file: 'temple-river-procession.jpeg',
    title: 'Riverside Procession',
    category: 'Temple & Cultural',
    orientation: 'landscape',
    featured: true,
    alt: 'Devotees carrying a garlanded deity in procession beside a forest river at dawn',
  },
  {
    file: 'yakshagana-fire-stage.jpeg',
    title: 'Ritual Flame',
    category: 'Temple & Cultural',
    orientation: 'landscape',
    featured: true,
    alt: 'A Yakshagana performer in ornate costume and headdress stands on a temple stage as a burst of torch fire blazes through the darkness beside him',
  },
  {
    file: 'temple-festival-deity-crown.jpeg',
    title: 'The Deity Bearer',
    category: 'Temple & Cultural',
    orientation: 'portrait',
    featured: true,
    alt: 'A devotee carrying an ornate silver and floral deity crown on his head at a temple festival',
  },
  {
    file: 'yakshagana-demon-vesha.jpeg',
    title: 'Painted Fury',
    category: 'Temple & Cultural',
    orientation: 'portrait',
    featured: true,
    alt: 'Yakshagana performer in fierce red, white and black demon face paint and a jeweled crimson crown, lit against glowing blue festival lights at night',
  },
  {
    file: 'temple-chariot-night-aerial.jpeg',
    title: 'Wheel of Light',
    category: 'Aerial & Drone',
    orientation: 'landscape',
    alt: 'Aerial night view of a temple festival where an illuminated chariot glows at the center of a vast crowd of devotees',
  },
  {
    file: 'temple-festival-silver-deity.jpeg',
    title: 'Jasmine & Silver',
    category: 'Temple & Cultural',
    orientation: 'portrait',
    alt: 'A man bearing a jasmine-decorated silver deity on his head at a night temple festival',
  },
  {
    file: 'traditional-couple-portrait.jpeg',
    title: 'Silk & Gold',
    category: 'Weddings',
    orientation: 'portrait',
    alt: 'A smiling couple in traditional attire, he in a cream-gold silk kurta and she in a magenta Kanjivaram saree with gold jewellery, on a village path beneath coconut palms',
  },
  {
    file: 'ritual-deity-idols.jpeg',
    title: 'Divine Union',
    category: 'Temple & Cultural',
    orientation: 'portrait',
    alt: 'Garlanded brass idols of a divine couple beside an oil lamp during a ritual',
  },
  {
    file: 'kids-purple-field.jpeg',
    title: 'Golden Hour',
    category: 'Kids & Portraits',
    orientation: 'portrait',
    featured: true,
    alt: 'A toddler in a purple dress playing in a golden grassy field at sunset',
  },
  {
    file: 'bridal-maroon-silk.jpeg',
    title: 'Bridal Reverie',
    category: 'Weddings',
    orientation: 'portrait',
    featured: true,
    alt: 'A bride in a maroon and gold silk saree with traditional temple jewellery stands with eyes closed, softly lit beside an orange curtain',
  },
  {
    file: 'kids-traditional-2.jpeg',
    title: 'Wonder',
    category: 'Kids & Portraits',
    orientation: 'portrait',
    featured: true,
    alt: 'A little girl in traditional dress looking up in wonder on a rural path',
  },
  {
    file: 'durga-festival-tableau.jpeg',
    title: 'Simha Vahini',
    category: 'Temple & Cultural',
    orientation: 'portrait',
    alt: 'Costumed performer as many-armed Goddess Durga, garlanded and seated on a lion figure during a temple festival tableau',
  },
  {
    file: 'kids-traditional-1.jpeg',
    title: 'Little Traditions',
    category: 'Kids & Portraits',
    orientation: 'portrait',
    alt: 'A smiling little girl in traditional cream and navy attire on a village path',
  },
  {
    file: 'golden-mandapa-stage.jpeg',
    title: 'The Golden Mandapa',
    category: 'Weddings',
    orientation: 'landscape',
    alt: 'Elaborately carved golden temple-style wedding stage with maroon drapes, deity figures and flower garlands inside a function hall',
  },
  {
    file: 'night-reception-pour.jpeg',
    title: 'The Golden Pour',
    category: 'Events',
    orientation: 'landscape',
    alt: 'A bartender pours a drink in a high arc into a glass at an outdoor night reception strung with warm fairy lights',
  },
];

// Derived, de-duplicated category list for gallery filters (keeps "All" first).
export const categories: string[] = [
  'All',
  ...Array.from(new Set(portfolio.map((p) => p.category))),
];

// ── Films ────────────────────────────────────────────────────────────────
// Upload each film to YouTube (unlisted or public) and paste the 11-char video
// id into `youtubeId`. Entries without an id render a tasteful "coming soon"
// card. `posterFile` (optional) is a still used as the thumbnail.
export interface Film {
  title: string;
  category: string;
  youtubeId: string;
  posterFile?: string;
  posterUrl?: string; // remote thumbnail (e.g. a YouTube still)
  description: string;
}

// Curated from the studio's YouTube channel for variety + reach. Thumbnails are
// pulled live from YouTube. Add/swap any by editing this list.
const yt = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const films: Film[] = [
  {
    title: 'Yaksha Sambhrama · Live',
    category: 'Yakshagana Film',
    youtubeId: 'kQen6hNw0oQ',
    posterUrl: yt('kQen6hNw0oQ'),
    description: 'A live Yakshagana evening by Shri Yakshadeva Mitra Kala Mandali, Belvai.',
  },
  {
    title: 'Shashank & Ananya · Wedding',
    category: 'Wedding Film',
    youtubeId: 'DB77wlWYcxU',
    posterUrl: yt('DB77wlWYcxU'),
    description: 'A coastal Karnataka wedding, filmed as a cinematic celebration.',
  },
  {
    title: 'Sthanika Brahmana Samavesha 2026',
    category: 'Cultural Event',
    youtubeId: 'BRRCEUF6IS0',
    posterUrl: yt('BRRCEUF6IS0'),
    description: 'Multi-camera coverage of a grand community convention in Mangalore.',
  },
  {
    title: 'Navarasa Ramayana 2024',
    category: 'Yakshagana Film',
    youtubeId: '6WjkJwmIMxA',
    posterUrl: yt('6WjkJwmIMxA'),
    description: 'Yakshagana — the nine rasas of the Ramayana, live on stage.',
  },
  {
    title: 'Classical Concert · Dr. Vidyabhushan',
    category: 'Concert Film',
    youtubeId: '2QjQI-fYWcA',
    posterUrl: yt('2QjQI-fYWcA'),
    description: 'An evening of classical music with Dr. Vidyabhushan and ensemble.',
  },
  {
    title: 'Adishankara Parishat · Moodbidri',
    category: 'Community Event',
    youtubeId: 'mqnWpJte-FY',
    posterUrl: yt('mqnWpJte-FY'),
    description: 'The 33rd annual gathering of the Adishankara Parishat, Moodbidri.',
  },
];
