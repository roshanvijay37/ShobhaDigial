// Real, consented client testimonials only. Until Devanand provides genuine
// quotes (with permission to publish names), keep this array EMPTY — the
// homepage testimonials section hides itself when there are none, so no
// fabricated reviews ever ship. Add entries like:
//   { quote: '…', name: 'Real Name', context: 'Wedding · Place' }
export interface Testimonial {
  quote: string;
  name: string;
  context: string;
}

export const testimonials: Testimonial[] = [];
