/**
 * /pricing — Aumy's public price list for new dental clinics. ONE copy of the numbers and the words.
 *
 * Owner 2026-11-04: "yes, publish pricing with 1000 chats and 400 minutes". This REVERSES the 2026-11-02 rule
 * "no pricing on website at all" (/pricing had 301'd to the free clinic audit since then).
 *
 * Read by src/pages/PricingPage.js, scripts/prerender.js (crawler HTML + JSON-LD) and scripts/seo-files.js
 * (llms.txt), so the price a person sees and the price Google / AI assistants quote can never drift apart.
 * Change a price HERE and nowhere else. No price anywhere else on the site; other pages link to /pricing.
 *
 * Rules for these words (marketing skill): outcomes, not tech words; "dental clinic"; one next step (a call
 * with Jayesh) plus the demo; no trial, no discount, no "selective"; no contract term that is not already in
 * the site's own policies (/refund, /terms).
 *
 * `module.exports` on purpose: the prerender scripts are plain Node and require() it.
 */
const { FOLLOW_UPS } = require('./homeOneProduct');

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

// Jayesh's booking link (the one link the marketing skill allows for "how much?").
const CALL = { label: 'Book a call with Jayesh', href: 'https://calendar.app.google/tecaeebTBEWSoJnV7' };
const DEMO = { label: 'Watch the demo', to: '/demos' };

const HERO = {
  eyebrow: 'Pricing',
  title: 'Simple monthly pricing for your dental clinic.',
  sub: 'Two plans. Monthly prices include GST. One setup, done with you.',
};

const OS_INCLUDES = [
  'Clinic software with AI notes: appointments, charting, X-rays, treatment plans, prescriptions, consent forms and bills',
  'Every follow-up on WhatsApp, in your clinic’s name',
  'A login for each staff member, with only the access they need',
];

const PLANS = [
  {
    id: 'clinic-os-follow-ups',
    name: 'Clinic OS + follow-ups',
    line: 'Run your clinic without paper, and follow up every patient.',
    monthly: 11000,
    includes: OS_INCLUDES,
    usage: null,
  },
  {
    id: 'clinic-os-follow-ups-ai-receptionist',
    name: 'Clinic OS + follow-ups + AI receptionist',
    line: 'Everything in Clinic OS + follow-ups, and every WhatsApp and call answered, 24/7.',
    monthly: 22000,
    featured: true,
    includes: [
      'Everything in Clinic OS + follow-ups',
      'AI receptionist on WhatsApp, 24/7: answers, books, moves and cancels appointments',
      'AI receptionist on calls, 24/7: picks up the calls your desk can’t get to, and books them',
    ],
    usage: {
      chats: 1000,
      minutes: 400,
      perChat: 5,
      perMinute: 10,
    },
  },
];

const usageLine = (u) => `Includes ${u.chats.toLocaleString('en-IN')} AI chats and ${u.minutes} call minutes a month.`;
const overageLine = (u) => `Beyond that, ${inr(u.perChat)} per chat and ${inr(u.perMinute)} per minute + GST.`;

const PER_MONTH = '/ month';
const GST_NOTE = 'incl. GST';

const SETUP = {
  label: 'One-time setup and onboarding',
  amount: 100000,
  amountText: '₹1,00,000 + GST',
  terms: 'Half on signing, half at go-live.',
  what: 'We set Aumy up around your doctors, treatments and timings, move your patient data in, and train your team.',
};

const META_NOTE = 'WhatsApp message charges are paid by your clinic directly to Meta.';

// "What's included": the site's own words. Follow-ups are the home page's list, word for word
// (src/data/homeOneProduct.js FOLLOW_UPS.rows), so the two pages can never drift apart.
const INCLUDED = {
  title: 'What’s included',
  software: {
    name: 'Clinic software with AI notes',
    items: [
      'Appointments and every doctor’s calendar',
      'Patient records with tooth charting, X-rays and photos',
      'Treatment plans, visit notes and prescriptions',
      'Consent forms signed on screen, and forms filled on the patient’s phone before the visit',
      'Invoices, payments, accounts and reports',
    ],
  },
  followUps: {
    name: 'Every follow-up, done for you',
    lead: 'On WhatsApp, in your clinic’s name. In both plans.',
    rows: FOLLOW_UPS.rows,
    note: FOLLOW_UPS.note,
  },
  receptionist: {
    name: 'AI receptionist on WhatsApp and calls',
    lead: 'In the Clinic OS + follow-ups + AI receptionist plan.',
    items: [
      'Answers every WhatsApp in seconds, day or night, in your clinic’s own words',
      'Books, moves and cancels appointments into real free slots',
      'Picks up the calls your desk can’t: when they’re busy, or the clinic is closed',
      'Hands the chat or call to your team the moment a person is needed',
    ],
  },
};

const FAQS = [
  { q: 'What counts as an AI chat?', a: 'One patient talking to the AI receptionist on WhatsApp on one day is one chat, however many messages they send that day.' },
  { q: 'What counts as a call minute?', a: 'Each minute the AI receptionist spends on a call with a patient. The plan includes 400 minutes a month; beyond that it is ₹10 per minute + GST.' },
  { q: 'What happens if we go over 1,000 chats or 400 minutes?', a: 'Nothing stops. The AI receptionist keeps answering, and the extra is ₹5 per chat and ₹10 per minute + GST.' },
  { q: 'Is GST included?', a: 'Yes, in the monthly plan prices. The one-time setup, and any chats or minutes beyond the plan, are + GST.' },
  { q: 'What does the setup cover, and when do we pay it?', a: `${SETUP.what} It is ₹1,00,000 + GST, once: half on signing, half at go-live.` },
  { q: 'Who pays for WhatsApp messages?', a: 'Your clinic pays Meta directly for WhatsApp message charges. We add nothing to them.' },
  { q: 'Is there a contract?', a: 'Yes, a written service agreement. Its notice and cancellation terms are set out in it.', link: { label: 'Read our Cancellation & Refund policy', to: '/refund' } },
];

const FINAL = {
  title: 'Want to see what it would do for your clinic?',
  sub: 'A short call with Jayesh: your clinic, your questions, and whether Aumy is right for you.',
};

const SEO = {
  title: 'Aumy Pricing | Dental Clinic Software & AI Receptionist Plans in India',
  description:
    'Aumy pricing for dental clinics: clinic software + every follow-up at ₹11,000/month, or add the 24/7 AI receptionist on WhatsApp and calls at ₹22,000/month. GST included.',
};

// One line for llms.txt and anywhere a plain-text summary is needed.
const SUMMARY =
  `Clinic OS + follow-ups: ${inr(PLANS[0].monthly)}/month incl. GST. ` +
  `Clinic OS + follow-ups + AI receptionist (WhatsApp + calls, 24/7): ${inr(PLANS[1].monthly)}/month incl. GST, ` +
  `${usageLine(PLANS[1].usage).replace(/^Includes/, 'includes').replace(/\.$/, '')}; ` +
  `${overageLine(PLANS[1].usage).replace(/^Beyond that, /, 'beyond that ').replace(/\.$/, '')}. ` +
  `One-time setup and onboarding ${SETUP.amountText} (half on signing, half at go-live). ` +
  `WhatsApp message charges are paid by the clinic directly to Meta.`;

module.exports = {
  inr, CALL, DEMO, HERO, PLANS, usageLine, overageLine, PER_MONTH, GST_NOTE, SETUP, META_NOTE,
  INCLUDED, FAQS, FINAL, SEO, SUMMARY,
};
