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
    file: 'temple-river-procession.jpeg',
    title: 'Riverside Procession',
    category: 'Temple & Cultural',
    orientation: 'landscape',
    featured: true,
    alt: 'Devotees carrying a garlanded deity in procession beside a forest river at dawn',
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
    file: 'temple-festival-silver-deity.jpeg',
    title: 'Jasmine & Silver',
    category: 'Temple & Cultural',
    orientation: 'portrait',
    alt: 'A man bearing a jasmine-decorated silver deity on his head at a night temple festival',
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
    file: 'kids-traditional-2.jpeg',
    title: 'Wonder',
    category: 'Kids & Portraits',
    orientation: 'portrait',
    featured: true,
    alt: 'A little girl in traditional dress looking up in wonder on a rural path',
  },
  {
    file: 'kids-traditional-1.jpeg',
    title: 'Little Traditions',
    category: 'Kids & Portraits',
    orientation: 'portrait',
    alt: 'A smiling little girl in traditional cream and navy attire on a village path',
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
