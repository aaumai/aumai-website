/**
 * Dental clinics Aumy serves — the trust section on the homepage.
 *
 * 🚨 `consent` IS A LEGAL GATE, NOT A FEATURE FLAG. A clinic renders here ONLY
 * once permission to be named publicly has actually been given (MSA §10A India
 * / §9A US, added 2026-09-19). All four signed BEFORE that clause existed, so
 * none is covered by their agreement — permission is tracked per clinic here.
 *
 * 2026-09-20: Jayesh cleared RB, Dental Planet and Vinaykia to publish. Sterling
 * stays off until Dr Priyanka Giroti confirms. Back the three verbal clearances
 * with an email on file per clinic —
 * onboarding-docket/CUSTOMER_REFERENCE_PERMISSION_EMAIL.md is the template — so
 * consent is evidenced rather than remembered.
 *
 * Holding their logo is NOT consent. Those logos were given so we could brand
 * THEIR patient messages and booking pages — a different purpose entirely.
 *
 * Why the care: naming a dental clinic as our customer implies their patients'
 * records sit on our system. That is adjacent to health data, and under DPDP the
 * clinic is the Data Fiduciary. Publishing first and apologising later would
 * damage the exact relationships the section exists to trade on.
 *
 * Flip `consent` to true only when permission is in hand, then add the logo at
 * the stated path. With none consented the page falls back to the anonymous
 * proof line, which is true and needs nobody's permission.
 *
 * `module.exports` (not `export`) on purpose: scripts/prerender.js is plain Node
 * and require()s this file so the crawler-visible HTML is built from the SAME
 * consent list the React app renders. Webpack handles CommonJS for the app. If
 * this ever became an ES module, prerender would need its own hardcoded copy —
 * and a clinic that withdrew consent could stay named in the static HTML.
 */

const clinicsServed = [
  {
    name: 'RB Enhanced Dental Laser Center',
    city: 'Bengaluru',
    // No logo file has ever reached us — not in the tenant record, not in S3,
    // not in brand assets. Renders as a typographic nameplate until one does.
    logo: null,
    consent: true, // cleared by Jayesh 2026-09-20
  },
  {
    name: 'Dental Planet',
    city: 'Hyderabad',
    logo: '/logos/clinics/dental-planet.png',
    consent: true, // cleared by Jayesh 2026-09-20 — two locations, one brand
  },
  {
    name: 'Vinaykia Dental Care',
    city: 'Pune',
    logo: '/logos/clinics/vinaykia.png',
    consent: true, // cleared by Jayesh 2026-09-20
  },
  {
    name: 'The Sterling Dental Clinic',
    city: 'New Delhi',
    logo: '/logos/clinics/sterling.png',
    consent: false, // awaiting Dr Priyanka Giroti
  },
];

/** Only these are ever rendered. */
const consentedClinics = clinicsServed.filter((c) => c.consent);

/**
 * The cities we actually serve, deduped and in a readable list. Used for the
 * anonymous proof line that runs if no clinic is consented — it names nobody,
 * so it needs no permission, and it is still real evidence to a visitor.
 */
function servedCities() {
  const cities = [...new Set(clinicsServed.map((c) => c.city))];
  if (cities.length <= 1) return cities[0] || '';
  return `${cities.slice(0, -1).join(', ')} and ${cities[cities.length - 1]}`;
}

module.exports = { clinicsServed, consentedClinics, servedCities };
module.exports.default = module.exports;
