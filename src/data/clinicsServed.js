/**
 * Dental clinics Aumy serves — the trust section on the homepage.
 *
 * 🚨 `consent` IS A LEGAL GATE, NOT A FEATURE FLAG. A clinic renders here ONLY
 * once permission to be named publicly has actually been given (MSA §10A India
 * / §9A US, added 2026-09-19). All four signed BEFORE that clause existed, so
 * none is covered by their agreement — permission is tracked per clinic here.
 *
 * 2026-09-20: Jayesh cleared RB, Dental Planet and Vinaykia to publish, and
 * Sterling confirmed the same day — all four are now named. Back each verbal
 * clearance with an email on file —
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

// 🚨 OWNER RULE (2026-11-04): once this list has MORE THAN 10 unique clinics, the homepage strip switches from these
// static rows (today: the two Delhi clinics on row 1, the rest on row 2) to a scrolling logo marquee. Build that switch
// when you add the 11th clinic.
//
// 🚨 OWNER RULE (2026-11-11, replaces "city only"): every clinic shows LOCALITY + CITY ("Vasant Vihar, Delhi"), large and
// clear: visitors recognise the place before the brand ("my neighbour's clinic runs on it"). The locality is the
// neighbourhood people know, never a street, and it comes ONLY from the clinic's own record (its facility address in
// Aumy, else its own website / Google listing). Never guess one: if it can't be confirmed, leave `locality` out and the
// strip shows the city alone.
//
// LOGOS (owner 2026-11-11, "not of the same size and not equally spaced"): every logo sits in the SAME fixed 2:1 box
// on the strip, contained and centred. Before adding a logo, trim the FILE to its artwork (no transparent or white
// margin, SVG viewBox tight to the drawing) — built-in whitespace makes a logo look smaller than its neighbours. If a
// trimmed logo still reads heavier or lighter than the rest, set `scale` (e.g. 0.9 or 1.1; default 1 fills the box).
// That one field is the only per-logo size knob; do not add one-off CSS.
const clinicsServed = [
  {
    name: 'The Sterling Dental Clinic',
    // Aumy facility address: "16-A, Palam Marg, Block B, Vasant Vihar", New Delhi (checked 2026-11-11).
    locality: 'Vasant Vihar',
    city: 'Delhi',
    // Their official logo from the Sterling shoot (2026-10-20), the DARK
    // variant (dark-green + gold ink, transparent) because this strip sits on a
    // white band; the light variant is for dark backgrounds. Owner 2026-10-22.
    logo: '/logos/clinics/sterling.svg',
    consent: true, // confirmed by Sterling 2026-09-20
  },
  {
    // Second on purpose: the two Delhi clinics sit side by side in the first row so a Delhi visitor sees them at once
    // (owner 2026-11-04).
    name: "Omlesh's Dentcity",
    // Aumy facility address: "33, Pocket C-8, Sector-8, Rohini", Delhi (checked 2026-11-11).
    locality: 'Rohini',
    city: 'Delhi',
    // Their own logo (white background, which suits this white band).
    logo: '/logos/clinics/omlesh-dentcity.png',
    consent: true, // cleared by Jayesh 2026-11-04 — back it with a permission email (template in onboarding-docket)
  },
  {
    // Their PATIENT-FACING brand, which is what their own logo leads with and
    // what their Google listing says ("Dental Solutions Indiranagar"). The
    // tenant in Aumy is filed under the legal entity, RB Enhanced Dental Laser
    // Center LLP — that name belongs on a contract, not on a strip whose job is
    // for a visitor to recognise the clinic.
    name: 'Dental Solutions',
    // Aumy facility address: "1st Floor, 498, 15th Cross Road, 2nd Stage, Indiranagar", Bengaluru (checked 2026-11-11).
    locality: 'Indiranagar',
    city: 'Bengaluru',
    logo: '/logos/clinics/rb-enhanced.png',
    consent: true, // cleared by Jayesh 2026-09-20
  },
  {
    name: 'Dental Planet',
    city: 'Hyderabad',
    logo: '/logos/clinics/dental-planet.png',
    // Their logo is a MONOGRAM — it never spells the name out, unlike the other
    // three whose artwork is a wordmark. Without this the row shows a visitor a
    // "dp" mark and no clinic. Set the name in type beside the mark instead.
    showName: true,
    // What the group is, in their own words. Reads on the city line.
    descriptor: 'Chain of clinics',
    consent: true, // cleared by Jayesh 2026-09-20
    /**
     * Dental Planet's Hitech City footprint, listed at the owner's direction
     * (2026-09-20) as the GROUP's branches.
     *
     * 🚨 Read this before editing: only TWO of these five run on Aumy today —
     * `dental-planet-elite` (which is the Gachibowli site; 21.8k patients) and
     * `dental-planet-tellapur` (687). Kokapet, Manikonda and Narsingi have no
     * tenant, no facility and no appointments in prod. Jayesh's call, made with
     * that stated; recorded here so nobody later reads this list as a map of
     * what we actually run, and so it can be trimmed fast if DP ever object.
     */
    locations: ['Gachibowli', 'Tellapur', 'Kokapet', 'Manikonda', 'Narsingi'],
    // Principal. Name only — his IDA office is deliberately NOT published here:
    // it is a publicly checkable claim about him, on our marketing site, that we
    // have not verified. Add a title only if he confirms the exact wording.
    lead: 'Dr Rajesh KK Reddy',
  },
  {
    name: 'Vinaykia Dental Care',
    // Aumy facility address: "Somwar peth opposite Sujata Mastani", Pune (checked 2026-11-11).
    locality: 'Somwar Peth',
    city: 'Pune',
    logo: '/logos/clinics/vinaykia.png',
    // Its tooth outline fills the whole box edge to edge, so at full size it reads as the biggest mark on the strip.
    scale: 0.9,
    consent: true, // cleared by Jayesh 2026-09-20
  },
  {
    // New client 2026-11-10. Their full name; the wordmark itself reads "SmilesIndia / Family Dentistry".
    name: 'Smiles India Family Dentistry',
    // No address in Aumy yet; their own site (smilesindia.com/contact): "No.2, Third Avenue, Indira Nagar, Adyar,
    // Chennai – 600 020" (checked 2026-11-11). Adyar is the neighbourhood people know.
    locality: 'Adyar',
    city: 'Chennai',
    // Their site only carries a 175x48 PNG, too small for this strip, so this is a faithful vector redraw of it: same
    // wordmark (Segoe UI Semibold + Light, outlined), same colours (#6CB33F green, #005DAA blue, grey line), transparent.
    logo: '/logos/clinics/smiles-india.svg',
    consent: true, // cleared by Jayesh 2026-11-10 (asked for them on the strip) — back it with the permission email / MSA clause
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
