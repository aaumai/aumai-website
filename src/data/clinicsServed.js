/**
 * Dental clinics Aumy serves — the trust section on the homepage.
 *
 * 🚨 `consent` IS A LEGAL GATE, NOT A FEATURE FLAG. A clinic renders here ONLY
 * when it has given written permission to be named publicly (MSA §10A India /
 * §9A US, added 2026-09-19). Our first four clinics signed BEFORE that clause
 * existed, so none of them is covered by their agreement — each needs an email
 * saying yes, filed next to their docket. See
 * onboarding-docket/CUSTOMER_REFERENCE_PERMISSION_EMAIL.md.
 *
 * Holding their logo is NOT consent. Those logos were given so we could brand
 * THEIR patient messages and booking pages — a different purpose entirely.
 *
 * Why the care: naming a dental clinic as our customer implies their patients'
 * records sit on our system. That is adjacent to health data, and under DPDP the
 * clinic is the Data Fiduciary. Publishing first and apologising later would
 * damage the exact relationships the section exists to trade on.
 *
 * Flip `consent` to true only when the reply is in hand, then add the logo at
 * the stated path. Until then the page shows the anonymous proof line instead,
 * which is true today and needs nobody's permission.
 */

export const clinicsServed = [
  {
    name: 'The Sterling Dental Clinic',
    city: 'New Delhi',
    logo: '/logos/clinics/sterling.png',
    consent: false, // awaiting Dr Priyanka Giroti
  },
  {
    name: 'RB Enhanced Dental Laser Center',
    city: 'Bengaluru',
    logo: '/logos/clinics/rb-enhanced.png',
    consent: false, // awaiting Dr Balasubramanya K.V.
  },
  {
    name: 'Dental Planet',
    city: 'Hyderabad',
    logo: '/logos/clinics/dental-planet.png',
    consent: false, // awaiting Dr Rajesh Reddy — two locations, one brand
  },
  {
    name: 'Vinaykia Dental Care',
    city: 'Pune',
    logo: '/logos/clinics/vinaykia.png',
    consent: false, // awaiting Dr Ronak Oswal
  },
];

/** Only these are ever rendered. */
export const consentedClinics = clinicsServed.filter((c) => c.consent);

/**
 * The cities we actually serve, deduped and in a readable list. Used for the
 * anonymous proof line that runs until logos are cleared — it names no clinic,
 * so it needs no permission, and it is still real evidence to a visitor.
 */
export function servedCities() {
  const cities = [...new Set(clinicsServed.map((c) => c.city))];
  if (cities.length <= 1) return cities[0] || '';
  return `${cities.slice(0, -1).join(', ')} and ${cities[cities.length - 1]}`;
}
