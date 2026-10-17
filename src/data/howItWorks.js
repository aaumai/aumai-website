/**
 * "How Aumy works" (/revenue-generator), rebuilt lean 2026-10-12. ONE copy of the words: the React page
 * (src/pages/AumyRevenueGenerator.js) and the crawler HTML in scripts/prerender.js both read this file.
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */

const HOW_SEO = {
  title: 'How Aumy Works — Start Free in Minutes | AI Modules for Dental Clinics',
  description:
    'How Aumy works for dental clinics in India: download the app, pick the module for your biggest leak — Convert, Chat, Voice, Journey or Clinic — connect your WhatsApp or phone number and go live, with 1,000 free Aumy credits per product.',
};

// The 4C Framework is how Aumy works (owner 2026-10-17); the section words are src/data/fourC.js. This is the
// one page-specific sentence under its strap.
const HOW_FOURC_LEAD =
  'Each Aumy module covers one or more of these stages. Start with the stage where your clinic loses the most patients.';

// Getting set up is a different list from the 4C stages — labelled so the page never shows two competing step lists.
const HOW_START = { eyebrow: 'Live in minutes', title: 'Getting started: three steps.' };

const HOW_STEPS = [
  { title: 'Download the Aumy app', body: 'Get Aumy on the App Store or Google Play and sign in with your mobile number. No forms, no sales call.' },
  { title: 'Pick the module for your biggest leak', body: 'Missed calls? Aumy Voice. Slow WhatsApp replies? Aumy Chat. Ad enquiries going cold? Aumy Convert. Start free with 1,000 Aumy credits for each product.' },
  { title: 'Connect and go live', body: 'Connect your clinic’s WhatsApp number or phone line, add your doctors, hours and main treatments, and Aumy starts answering, booking and following up.' },
];

const HOW_CONTROL = [
  { title: 'Approve before it sends', body: 'Switch on approval and your team checks each message before a patient gets it. Switch it off when you trust it.' },
  { title: 'Works with your software', body: 'Keep the practice software you use today, or run the whole clinic on Aumy Clinic — your choice.' },
  { title: 'Your data stays private', body: 'Encrypted, access-controlled and private by design. Patient health details never go to ad platforms.' },
];

module.exports = { HOW_SEO, HOW_FOURC_LEAD, HOW_START, HOW_STEPS, HOW_CONTROL };
module.exports.default = module.exports;
