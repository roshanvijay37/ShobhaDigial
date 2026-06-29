// Per-area landing pages for local SEO. Each becomes
// /wedding-photographer/<slug>. Copy is locally accurate; tweak freely.
export interface Area {
  place: string;
  slug: string;
  intro: string;
  local: string;
}

export const areas: Area[] = [
  {
    place: 'Moodbidri',
    slug: 'moodbidri',
    intro:
      'Belvai sits within Moodbidri taluk, so this is home ground for us. From the Thousand Pillar temple town to the surrounding villages, we have photographed countless weddings, temple festivals and family occasions here.',
    local: 'weddings, Brahmakalashas and Jain temple events around Moodbidri',
  },
  {
    place: 'Karkala',
    slug: 'karkala',
    intro:
      'A short drive from Belvai, Karkala and its heritage — the Gomateshwara monolith, ancient temples and bastis — make a stunning backdrop. We regularly cover weddings, rituals and pre-wedding shoots across the Karkala region.',
    local: 'temple weddings and heritage pre-wedding shoots around Karkala',
  },
  {
    place: 'Mangalore',
    slug: 'mangalore',
    intro:
      'For couples and families in Mangalore, we bring the same calm, candid coverage to city venues, beaches and banquet halls. Photography and cinematography for weddings, events and portraits across Mangalore.',
    local: 'beach pre-weddings, hall weddings and events across Mangalore',
  },
  {
    place: 'Bantwal',
    slug: 'bantwal',
    intro:
      'We cover weddings, naming ceremonies and temple events throughout Bantwal and B.C. Road, with the same respect for tradition and eye for the quiet moments that runs through all our work.',
    local: 'weddings, upanayanas and temple rituals around Bantwal',
  },
  {
    place: 'Udupi',
    slug: 'udupi',
    intro:
      'From the Krishna Matha to the coast, Udupi is rich with tradition and colour. We photograph weddings, temple festivals, kids and family occasions across the Udupi district.',
    local: 'temple festivals, weddings and family shoots across Udupi',
  },
];
