// ─────────────────────────────────────────────────────────────────────────
// Central business details. Edit values here and they update across the site.
// Items marked TODO should be confirmed with Devanand before going live.
// ─────────────────────────────────────────────────────────────────────────
export const site = {
  name: 'Shobha Digital Studio',
  shortName: 'Shobha Digital',
  owner: 'Devanand Bhat',
  place: 'Belvai',
  region: 'Moodbidri, Dakshina Kannada',

  tagline: 'Photography & cinematography rooted in tradition',
  taglineKannada: 'ನೆನಪುಗಳ ಶಾಶ್ವತ ಚಿತ್ರಣ', // "a timeless picture of memories" — TODO: confirm wording with client
  intro:
    'From temple festivals and Yakshagana to weddings, little ones and family portraits — we frame the moments that matter to coastal Karnataka, with the care of a studio that belongs to its community.',

  // Contact — number taken from the studio's own photo watermark.
  phoneDisplay: '+91 98456 44556',
  phone: '919845644556', // used for tel: and wa.me links (country code + number)
  whatsappMessage:
    "Hello Shobha Digital Studio, I'd like to enquire about your photography services.",
  email: '', // TODO: add the studio's email (also used for the contact form inbox)

  address: {
    line1: 'Belvai',
    line2: 'Moodbidri Taluk, Dakshina Kannada',
    region: 'Karnataka',
    postalCode: '574227', // TODO: confirm Belvai PIN code
    country: 'India',
  },
  // Approximate Belvai coordinates. Until verified, geoConfirmed stays false and
  // the coordinates are NOT published in structured data (so Google isn't given a
  // misplaced pin). Set the exact studio location and flip geoConfirmed to true.
  geo: { lat: 13.0776, lng: 74.9931 },
  geoConfirmed: false,
  priceRange: '$$',
  hours: 'Mon – Sun · 9:00 AM – 8:00 PM',
  mapQuery: 'Belvai, Moodbidri, Karnataka',

  social: {
    instagram: 'https://www.instagram.com/shobha__digital__studio/',
    facebook: 'https://www.facebook.com/p/Shobha-Digital-Studio-100053529836130/',
  },

  // Free contact-form backend. Create a key (uses your email) at https://web3forms.com
  // and paste it here. Until then the form shows a friendly "not configured" note.
  web3formsKey: '',
};

export function whatsappUrl(message: string = site.whatsappMessage): string {
  return `https://wa.me/${site.phone}?text=${encodeURIComponent(message)}`;
}

export function telUrl(): string {
  return `tel:+${site.phone}`;
}

export function mapsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;
}
