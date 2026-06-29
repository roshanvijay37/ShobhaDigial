// Studio services. `icon` maps to a name in src/components/Icon.astro.
// *Kn fields are DRAFT Kannada — have Devanand review before public launch.
export interface Service {
  title: string;
  icon: string;
  blurb: string;
  points: string[];
  titleKn?: string;
  blurbKn?: string;
  pointsKn?: string[];
}

export const services: Service[] = [
  {
    title: 'Wedding Photography',
    icon: 'heart',
    blurb:
      'Candid and traditional coverage of every ritual and celebration, from the muhurta to the send-off.',
    points: ['Candid + traditional', 'Two-camera coverage', 'Designed album'],
    titleKn: 'ಮದುವೆ ಛಾಯಾಗ್ರಹಣ',
    blurbKn:
      'ಮುಹೂರ್ತದಿಂದ ಬೀಳ್ಕೊಡುಗೆಯವರೆಗೆ ಪ್ರತಿ ವಿಧಿ ಮತ್ತು ಸಂಭ್ರಮದ ಕ್ಯಾಂಡಿಡ್ ಹಾಗೂ ಸಾಂಪ್ರದಾಯಿಕ ಚಿತ್ರೀಕರಣ.',
    pointsKn: ['ಕ್ಯಾಂಡಿಡ್ + ಸಾಂಪ್ರದಾಯಿಕ', 'ಎರಡು ಕ್ಯಾಮೆರಾ', 'ವಿನ್ಯಾಸಗೊಂಡ ಆಲ್ಬಮ್'],
  },
  {
    title: 'Wedding & Pre-Wedding Films',
    icon: 'film',
    blurb:
      'Cinematic films that play back the day the way it felt — set to music, cut with care.',
    points: ['Highlight film', 'Full-length film', 'Drone available'],
    titleKn: 'ಮದುವೆ & ಪ್ರೀ-ವೆಡ್ಡಿಂಗ್ ಚಲನಚಿತ್ರಗಳು',
    blurbKn:
      'ಆ ದಿನವನ್ನು ಅನುಭವಿಸಿದಂತೆಯೇ ಮರಳಿ ತೋರಿಸುವ ಸಿನಿಮ್ಯಾಟಿಕ್ ಚಲನಚಿತ್ರಗಳು — ಸಂಗೀತದೊಂದಿಗೆ, ಕಾಳಜಿಯಿಂದ ಸಂಕಲನ.',
    pointsKn: ['ಹೈಲೈಟ್ ಫಿಲ್ಮ್', 'ಪೂರ್ಣ ಚಲನಚಿತ್ರ', 'ಡ್ರೋನ್ ಲಭ್ಯ'],
  },
  {
    title: 'Kids & Newborn',
    icon: 'baby',
    blurb:
      'Gentle, patient sessions that catch the real expressions of the littlest ones.',
    points: ['Newborn & toddler', 'Outdoor themes', 'Birthday shoots'],
    titleKn: 'ಮಕ್ಕಳು & ನವಜಾತ ಶಿಶು',
    blurbKn: 'ಪುಟ್ಟ ಮಕ್ಕಳ ನೈಜ ಭಾವಗಳನ್ನು ಸೆರೆಹಿಡಿಯುವ ಮೃದು, ತಾಳ್ಮೆಯ ಸೆಷನ್‌ಗಳು.',
    pointsKn: ['ನವಜಾತ & ಪುಟ್ಟ ಮಕ್ಕಳು', 'ಹೊರಾಂಗಣ ಥೀಮ್‌ಗಳು', 'ಹುಟ್ಟುಹಬ್ಬದ ಶೂಟ್'],
  },
  {
    title: 'Temple & Ritual Coverage',
    icon: 'landmark',
    blurb:
      'Brahmakalasha, Nagamandala, jatras and pujas, documented with respect for every tradition.',
    points: ['Temple festivals', 'Naming & upanayana', 'Live photo prints'],
    titleKn: 'ದೇವಸ್ಥಾನ & ವಿಧಿ-ವಿಧಾನ ಚಿತ್ರೀಕರಣ',
    blurbKn:
      'ಬ್ರಹ್ಮಕಲಶ, ನಾಗಮಂಡಲ, ಜಾತ್ರೆ ಮತ್ತು ಪೂಜೆಗಳನ್ನು ಪ್ರತಿ ಸಂಪ್ರದಾಯಕ್ಕೆ ಗೌರವದೊಂದಿಗೆ ದಾಖಲಿಸಲಾಗುತ್ತದೆ.',
    pointsKn: ['ದೇವಸ್ಥಾನದ ಉತ್ಸವಗಳು', 'ನಾಮಕರಣ & ಉಪನಯನ', 'ಲೈವ್ ಫೋಟೋ ಪ್ರಿಂಟ್'],
  },
  {
    title: 'Yakshagana & Stage',
    icon: 'sparkles',
    blurb:
      'Coverage of Yakshagana, dance and cultural programmes by people who know the art form.',
    points: ['Stage photography', 'Multi-cam video', 'Event highlights'],
    titleKn: 'ಯಕ್ಷಗಾನ & ವೇದಿಕೆ',
    blurbKn:
      'ಕಲಾ ಪ್ರಕಾರವನ್ನು ಬಲ್ಲವರಿಂದ ಯಕ್ಷಗಾನ, ನೃತ್ಯ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳ ಚಿತ್ರೀಕರಣ.',
    pointsKn: ['ವೇದಿಕೆ ಛಾಯಾಗ್ರಹಣ', 'ಮಲ್ಟಿ-ಕ್ಯಾಮ್ ವೀಡಿಯೋ', 'ಕಾರ್ಯಕ್ರಮ ಹೈಲೈಟ್‌ಗಳು'],
  },
  {
    title: 'Portraits & Family',
    icon: 'users',
    blurb:
      'Studio and on-location portraits for individuals, couples and the whole family.',
    points: ['Studio & outdoor', 'Family groups', 'Passport & prints'],
    titleKn: 'ಭಾವಚಿತ್ರ & ಕುಟುಂಬ',
    blurbKn:
      'ವ್ಯಕ್ತಿಗಳು, ದಂಪತಿಗಳು ಮತ್ತು ಇಡೀ ಕುಟುಂಬಕ್ಕಾಗಿ ಸ್ಟುಡಿಯೋ ಹಾಗೂ ಸ್ಥಳದಲ್ಲೇ ಭಾವಚಿತ್ರಗಳು.',
    pointsKn: ['ಸ್ಟುಡಿಯೋ & ಹೊರಾಂಗಣ', 'ಕುಟುಂಬ ಗುಂಪುಗಳು', 'ಪಾಸ್‌ಪೋರ್ಟ್ & ಪ್ರಿಂಟ್'],
  },
  {
    title: 'Events & Functions',
    icon: 'calendar',
    blurb:
      'Birthdays, anniversaries, inaugurations and community functions, covered end to end.',
    points: ['Photo + video', 'Same-day prints', 'Custom packages'],
    titleKn: 'ಕಾರ್ಯಕ್ರಮ & ಸಮಾರಂಭಗಳು',
    blurbKn:
      'ಹುಟ್ಟುಹಬ್ಬ, ವಾರ್ಷಿಕೋತ್ಸವ, ಉದ್ಘಾಟನೆ ಮತ್ತು ಸಮುದಾಯ ಸಮಾರಂಭಗಳನ್ನು ಆದ್ಯಂತ ಚಿತ್ರೀಕರಣ.',
    pointsKn: ['ಫೋಟೋ + ವೀಡಿಯೋ', 'ಅದೇ ದಿನ ಪ್ರಿಂಟ್', 'ಕಸ್ಟಮ್ ಪ್ಯಾಕೇಜ್'],
  },
  {
    title: 'Albums, Prints & Digital Lab',
    icon: 'image',
    blurb:
      'In-house album design, quality printing, framing and photo restoration.',
    points: ['Album design', 'Framing & enlarge', 'Photo restoration'],
    titleKn: 'ಆಲ್ಬಮ್, ಪ್ರಿಂಟ್ & ಡಿಜಿಟಲ್ ಲ್ಯಾಬ್',
    blurbKn: 'ಆಂತರಿಕ ಆಲ್ಬಮ್ ವಿನ್ಯಾಸ, ಗುಣಮಟ್ಟದ ಮುದ್ರಣ, ಫ್ರೇಮಿಂಗ್ ಮತ್ತು ಫೋಟೋ ಪುನಃಸ್ಥಾಪನೆ.',
    pointsKn: ['ಆಲ್ಬಮ್ ವಿನ್ಯಾಸ', 'ಫ್ರೇಮಿಂಗ್ & ವಿಸ್ತರಣೆ', 'ಫೋಟೋ ಪುನಃಸ್ಥಾಪನೆ'],
  },
];
