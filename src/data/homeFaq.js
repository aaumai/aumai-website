/**
 * Home page FAQ — ONE copy of the words (SEO review 2026-10-06).
 *
 * src/pages/Home.js renders this list; scripts/prerender.js writes the same
 * list into the crawler HTML and the FAQPage JSON-LD of the home route, so
 * visible text == JSON-LD == crawler HTML and Google never sees FAQ markup
 * for text that is not on the page. Prices come from ./pricing — never typed
 * here. The two legacy questions ("Is this a product or a service?", "Who
 * actually runs all this?") were dropped; the dedicated-expert fact stays in
 * its own section on the home page.
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */
const { MONTHLY_TEXT, GST } = require('./pricing');

const FAQS = [
  { q: 'How much does Aumy cost?', a: `Each module is priced on its own, so you pay only for what you use — from ${MONTHLY_TEXT} for Aumy Clinic. Start free in the Aumy app with 1,000 Aumy credits for each product; see the pricing page for every module. ${GST}` },
  { q: 'Do you have your own dental software (PMS)?', a: 'Yes — Aumy includes a complete Dental PMS: patient records, appointments, FDI odontogram with 6-point perio charting, digital prescriptions, treatment plans, and full billing, invoicing & accounts. It even charts as you speak. Clinics that want one platform run everything on Aumy.' },
  { q: 'Do I have to replace my current software?', a: 'No. Whatever software you use, Aumy keeps your data in sync with it and adds the Aumy modules you pick on top. If you want one connected platform, we migrate your data from your current software into Aumy for a one-time migration fee — with no downtime.' },
  { q: 'Is my patient data safe?', a: 'Yes — encrypted in transit and at rest, role-based access, and private by design.' },
  { q: 'How long does it take to get started?', a: 'Download the Aumy app, pick a module and set it up from your phone in minutes. Prefer help? Call 80071 89868 and our team sets it up with you.' },
  { q: 'Isn’t this just reminder software?', a: 'No. Anyone can send a reminder. Aumy reads every reply and acts on it — confirms the visit, moves it to a real free slot, follows up an advised treatment — and books the patient.' },
  { q: 'Will my staff have to learn something complicated?', a: 'No. Aumy runs in the background and takes work off the front desk — your team does less, not more.' },
];

module.exports = { FAQS };
