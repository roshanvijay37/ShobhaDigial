// FAQ content. Answers are intentionally general — confirm specifics
// (turnaround times, package contents) with Devanand before public launch.
// *Kn fields are DRAFT Kannada — have a native speaker review before launch.
export interface Faq {
  q: string;
  a: string;
  qKn?: string;
  aKn?: string;
}

export const faqs: Faq[] = [
  {
    q: 'Which areas do you cover?',
    a: 'We are based in Belvai and regularly photograph weddings, events and shoots across Moodbidri, Karkala, Mangalore, Bantwal, Udupi and all of Dakshina Kannada. Travel beyond the district can be arranged.',
    qKn: 'ನೀವು ಯಾವ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸೇವೆ ನೀಡುತ್ತೀರಿ?',
    aKn: 'ನಾವು ಬೆಳುವಾಯಿಯಲ್ಲಿ ನೆಲೆಗೊಂಡಿದ್ದು, ಮೂಡಬಿದಿರೆ, ಕಾರ್ಕಳ, ಮಂಗಳೂರು, ಬಂಟ್ವಾಳ, ಉಡುಪಿ ಹಾಗೂ ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯಾದ್ಯಂತ ಮದುವೆ, ಕಾರ್ಯಕ್ರಮ ಮತ್ತು ಶೂಟ್‌ಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಚಿತ್ರೀಕರಿಸುತ್ತೇವೆ. ಜಿಲ್ಲೆಯಾಚೆಗಿನ ಪ್ರಯಾಣವನ್ನೂ ಏರ್ಪಡಿಸಬಹುದು.',
  },
  {
    q: 'Do you cover temple rituals and Yakshagana?',
    a: 'Yes — it is one of our specialities. We document Brahmakalashas, Nagamandalas, jatras, naming and upanayana ceremonies, and Yakshagana and stage programmes, always with respect for the tradition.',
    qKn: 'ನೀವು ದೇವಸ್ಥಾನದ ವಿಧಿಗಳು ಮತ್ತು ಯಕ್ಷಗಾನವನ್ನು ಚಿತ್ರೀಕರಿಸುತ್ತೀರಾ?',
    aKn: 'ಹೌದು — ಇದು ನಮ್ಮ ವಿಶೇಷತೆಗಳಲ್ಲೊಂದು. ಬ್ರಹ್ಮಕಲಶ, ನಾಗಮಂಡಲ, ಜಾತ್ರೆ, ನಾಮಕರಣ ಮತ್ತು ಉಪನಯನ ಸಮಾರಂಭಗಳು, ಹಾಗೂ ಯಕ್ಷಗಾನ ಮತ್ತು ವೇದಿಕೆ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಯಾವಾಗಲೂ ಸಂಪ್ರದಾಯಕ್ಕೆ ಗೌರವ ಸಲ್ಲಿಸುತ್ತಾ ದಾಖಲಿಸುತ್ತೇವೆ.',
  },
  {
    q: 'How soon do we receive our photos and films?',
    a: 'Edited photos are usually shared within a few weeks of the event, and cinematic films a little after. We can prioritise a short highlight set sooner on request.',
    qKn: 'ನಮ್ಮ ಫೋಟೋ ಮತ್ತು ಫಿಲ್ಮ್‌ಗಳು ಎಷ್ಟು ಬೇಗ ಸಿಗುತ್ತವೆ?',
    aKn: 'ಎಡಿಟ್ ಮಾಡಿದ ಫೋಟೋಗಳನ್ನು ಸಾಮಾನ್ಯವಾಗಿ ಕಾರ್ಯಕ್ರಮ ಮುಗಿದ ಕೆಲವು ವಾರಗಳೊಳಗೆ ಹಂಚಿಕೊಳ್ಳುತ್ತೇವೆ; ಸಿನಿಮ್ಯಾಟಿಕ್ ಫಿಲ್ಮ್‌ಗಳು ಸ್ವಲ್ಪ ತಡವಾಗಿ ಸಿಗುತ್ತವೆ. ಕೋರಿಕೆಯ ಮೇರೆಗೆ ಚಿಕ್ಕ ಹೈಲೈಟ್ ಸೆಟ್ ಅನ್ನು ಬೇಗ ನೀಡಬಹುದು.',
  },
  {
    q: 'What does a wedding package typically include?',
    a: 'Most couples choose candid and traditional photography, a cinematic film, and a designed album. Every package is tailored to your occasion and budget — tell us what you have in mind and we will put together the right coverage.',
    qKn: 'ಮದುವೆ ಪ್ಯಾಕೇಜ್‌ನಲ್ಲಿ ಸಾಮಾನ್ಯವಾಗಿ ಏನೇನು ಒಳಗೊಂಡಿರುತ್ತದೆ?',
    aKn: 'ಹೆಚ್ಚಿನ ದಂಪತಿಗಳು ಕ್ಯಾಂಡಿಡ್ ಹಾಗೂ ಸಾಂಪ್ರದಾಯಿಕ ಛಾಯಾಗ್ರಹಣ, ಸಿನಿಮ್ಯಾಟಿಕ್ ಫಿಲ್ಮ್ ಮತ್ತು ವಿನ್ಯಾಸಗೊಳಿಸಿದ ಆಲ್ಬಮ್ ಆಯ್ಕೆಮಾಡುತ್ತಾರೆ. ಪ್ರತಿ ಪ್ಯಾಕೇಜನ್ನೂ ನಿಮ್ಮ ಸಂದರ್ಭ ಮತ್ತು ಬಜೆಟ್‌ಗೆ ತಕ್ಕಂತೆ ರೂಪಿಸುತ್ತೇವೆ — ನಿಮ್ಮ ಯೋಚನೆ ತಿಳಿಸಿ, ಸೂಕ್ತ ಚಿತ್ರೀಕರಣ ಸಿದ್ಧಪಡಿಸುತ್ತೇವೆ.',
  },
  {
    q: 'Do you do pre-wedding and outdoor shoots?',
    a: 'Yes. We plan pre-wedding and engagement shoots around the places and themes that mean something to you, and also do kids, newborn, family and portrait sessions on location or in studio.',
    qKn: 'ನೀವು ಪ್ರೀ-ವೆಡ್ಡಿಂಗ್ ಮತ್ತು ಹೊರಾಂಗಣ ಶೂಟ್ ಮಾಡುತ್ತೀರಾ?',
    aKn: 'ಹೌದು. ನಿಮಗೆ ಆಪ್ತವಾದ ಸ್ಥಳಗಳು ಮತ್ತು ಥೀಮ್‌ಗಳಿಗೆ ತಕ್ಕಂತೆ ಪ್ರೀ-ವೆಡ್ಡಿಂಗ್ ಹಾಗೂ ನಿಶ್ಚಿತಾರ್ಥ ಶೂಟ್ ಯೋಜಿಸುತ್ತೇವೆ, ಜೊತೆಗೆ ಮಕ್ಕಳ, ನವಜಾತ ಶಿಶುಗಳ, ಕುಟುಂಬ ಮತ್ತು ಭಾವಚಿತ್ರ ಸೆಷನ್‌ಗಳನ್ನು ನಿಮ್ಮ ಸ್ಥಳದಲ್ಲೇ ಅಥವಾ ಸ್ಟುಡಿಯೋದಲ್ಲಿ ಮಾಡುತ್ತೇವೆ.',
  },
  {
    q: 'Do you provide printed albums, frames and prints?',
    a: 'Yes. As a full digital studio we design and print albums in-house, and offer framing, enlargements and photo restoration.',
    qKn: 'ನೀವು ಮುದ್ರಿತ ಆಲ್ಬಮ್, ಫ್ರೇಮ್ ಮತ್ತು ಪ್ರಿಂಟ್ ಒದಗಿಸುತ್ತೀರಾ?',
    aKn: 'ಹೌದು. ಸಂಪೂರ್ಣ ಡಿಜಿಟಲ್ ಸ್ಟುಡಿಯೋ ಆಗಿ ನಾವು ಆಲ್ಬಮ್‌ಗಳನ್ನು ನಮ್ಮ ಸ್ಟುಡಿಯೋದಲ್ಲೇ ವಿನ್ಯಾಸಗೊಳಿಸಿ ಮುದ್ರಿಸುತ್ತೇವೆ; ಜೊತೆಗೆ ಫ್ರೇಮಿಂಗ್, ದೊಡ್ಡ ಗಾತ್ರದ ಪ್ರಿಂಟ್‌ಗಳು ಹಾಗೂ ಹಳೆಯ ಫೋಟೋಗಳಿಗೆ ಮರುಜೀವ ನೀಡುವ ಸೇವೆಯನ್ನೂ ಒದಗಿಸುತ್ತೇವೆ.',
  },
  {
    q: 'How do we check availability and book?',
    a: 'The quickest way is to message us on WhatsApp with your date and occasion, or send an enquiry from the contact page. We will confirm availability and share the details.',
    qKn: 'ಲಭ್ಯತೆ ಪರಿಶೀಲಿಸಿ ಬುಕ್ ಮಾಡುವುದು ಹೇಗೆ?',
    aKn: 'ಅತ್ಯಂತ ವೇಗದ ಮಾರ್ಗವೆಂದರೆ ನಿಮ್ಮ ದಿನಾಂಕ ಮತ್ತು ಸಂದರ್ಭದೊಂದಿಗೆ ವಾಟ್ಸ್‌ಆ್ಯಪ್‌ನಲ್ಲಿ ಸಂದೇಶ ಕಳುಹಿಸುವುದು, ಅಥವಾ ಸಂಪರ್ಕ ಪುಟದ ಮೂಲಕ ವಿಚಾರಣೆ ಸಲ್ಲಿಸುವುದು. ನಾವು ಲಭ್ಯತೆ ಖಚಿತಪಡಿಸಿ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತೇವೆ.',
  },
];
