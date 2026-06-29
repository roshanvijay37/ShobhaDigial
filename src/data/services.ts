// Studio services. `icon` maps to a name in src/components/Icon.astro.
export interface Service {
  title: string;
  icon: string;
  blurb: string;
  points: string[];
}

export const services: Service[] = [
  {
    title: 'Wedding Photography',
    icon: 'heart',
    blurb:
      'Candid and traditional coverage of every ritual and celebration, from the muhurta to the send-off.',
    points: ['Candid + traditional', 'Two-camera coverage', 'Designed album'],
  },
  {
    title: 'Wedding & Pre-Wedding Films',
    icon: 'film',
    blurb:
      'Cinematic films that play back the day the way it felt — set to music, cut with care.',
    points: ['Highlight film', 'Full-length film', 'Drone available'],
  },
  {
    title: 'Kids & Newborn',
    icon: 'baby',
    blurb:
      'Gentle, patient sessions that catch the real expressions of the littlest ones.',
    points: ['Newborn & toddler', 'Outdoor themes', 'Birthday shoots'],
  },
  {
    title: 'Temple & Ritual Coverage',
    icon: 'landmark',
    blurb:
      'Brahmakalasha, Nagamandala, jatras and pujas, documented with respect for every tradition.',
    points: ['Temple festivals', 'Naming & upanayana', 'Live photo prints'],
  },
  {
    title: 'Yakshagana & Stage',
    icon: 'sparkles',
    blurb:
      'Coverage of Yakshagana, dance and cultural programmes by people who know the art form.',
    points: ['Stage photography', 'Multi-cam video', 'Event highlights'],
  },
  {
    title: 'Portraits & Family',
    icon: 'users',
    blurb:
      'Studio and on-location portraits for individuals, couples and the whole family.',
    points: ['Studio & outdoor', 'Family groups', 'Passport & prints'],
  },
  {
    title: 'Events & Functions',
    icon: 'calendar',
    blurb:
      'Birthdays, anniversaries, inaugurations and community functions, covered end to end.',
    points: ['Photo + video', 'Same-day prints', 'Custom packages'],
  },
  {
    title: 'Albums, Prints & Digital Lab',
    icon: 'image',
    blurb:
      'In-house album design, quality printing, framing and photo restoration.',
    points: ['Album design', 'Framing & enlarge', 'Photo restoration'],
  },
];
