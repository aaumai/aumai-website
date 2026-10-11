/**
 * Aumy (dental, India) pricing — ONE copy of the numbers and the words.
 *
 * Owner 2026-10-04: "Keep it simple — we just mention starts from 5000 a month
 * and get rid of all the complexity." The usage calculator, AI tiers and
 * per-module rate card are gone from the website; so is the build-time API
 * snapshot (scripts/fetch-pricing.js → pricing.json) that fed them.
 *
 * Read by src/pages/PricingPage.js, src/data/aiDentalSoftwareIndia.js,
 * scripts/prerender.js (crawler HTML + JSON-LD) and scripts/seo-files.js
 * (llms.txt), so the price a person sees and the price Google / AI assistants
 * quote can never drift apart. Change a price HERE and nowhere else.
 *
 * `module.exports` on purpose: the prerender scripts are plain Node.
 * Dental only — never mention aesthetics or children's dentistry.
 */
// Owner 2026-10-11: Aumy Clinic's price in the app's price list (self_serve_products,
// ₹3,000/month + GST). The one-time setup and data migration fee is no longer quoted.
const MONTHLY_FROM = 3000;

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

const MONTHLY_TEXT = `${inr(MONTHLY_FROM)} a month`; // "₹3,000 a month"

// What the Clinic OS is — the site's own words (Home / ai-dental-software-india).
const CLINIC_OS = [
  'Appointments and doctor calendars',
  'Patient records, X-rays and prescriptions',
  'Dental charting and treatment plans',
  'Billing, invoices and payments',
  'Digital registration, intake and consent',
  'Staff and doctor logins',
];

const HEADLINE = 'Simple pricing.';
const HEADLINE_ACCENT = 'No surprises.';
const SUB = 'One monthly fee for the software your clinic runs on. That is the whole of it.';
const ADDONS = 'AI receptionist, AI calls and patient follow-up automation are added on top — we price them with you.';
const GST = 'Prices exclude GST.';

const FAQS = [
  {
    q: `What do I get for ${MONTHLY_TEXT}?`,
    a: `The Aumy Clinic OS — the software your team runs the clinic on: appointments and doctor calendars, patient records, X-rays and prescriptions, dental charting and treatment plans, billing, invoices and payments, digital registration, intake and consent, and logins for your staff and doctors. ${MONTHLY_TEXT} is where it starts; we confirm your clinic’s exact figure with you on a call.`,
  },
  {
    q: 'What about the AI receptionist, AI calls and follow-ups?',
    a: 'They are added on top of the Clinic OS. Every clinic needs a different mix, so we work out the price with you once we know which ones your clinic wants.',
  },
  {
    q: 'Do prices include GST?',
    a: 'No. Prices on this page exclude GST.',
  },
];

const SEO_TITLE = `Dental Clinic Software Price in India — from ${inr(MONTHLY_FROM)}/month | Aumy`;
const SEO_DESCRIPTION = `Simple pricing for dental clinics: the Aumy Clinic OS starts from ${MONTHLY_TEXT}. AI receptionist, AI calls and follow-ups are priced with you.`;

module.exports = {
  MONTHLY_FROM, inr, MONTHLY_TEXT,
  CLINIC_OS, HEADLINE, HEADLINE_ACCENT, SUB, ADDONS, GST, FAQS, SEO_TITLE, SEO_DESCRIPTION,
};
