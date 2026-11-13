/**
 * Shared words from the previous home (outcomes as a service, owner 2026-10-22) that other pages still use:
 * HERO and FINAL (the calls to action on /revenue-generator), HOW (the five steps on /revenue-generator and
 * /about, src/components/HowWeWork.js), the footer, the share image and the logo.
 *
 * The HOME page itself moved to src/data/homeOneProduct.js (owner 2026-11-02: Aumy as ONE product, "very very
 * clear"); its PAIN / VS / 4C / strategies / KPIs / FIT / masterclass sections are in git history before that
 * change. ORG_DESCRIPTION and PRODUCT_DESCRIPTION are re-exported from there, so the search data matches the home.
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */

const WHATSAPP_LINK = 'https://wa.me/918007189868?text=' + encodeURIComponent("Hi, I'd like a free audit of my dental clinic.");

// Hero words are the owner's, approved exactly (2026-10-22): the H1, the six "Every…" lines, the close line.
// H1 back to "Stop losing patients." (owner 2026-10-22: "short and powerful"); "dental clinic" stays in the
// eyebrow, the title and the meta for SEO.
const HERO = {
  eyebrow: 'For dental clinic owners · India',
  title: 'Stop losing patients.',
  every: [
    'Every new enquiry, answered.',
    'Every appointment, confirmed.',
    'Every patient who missed one, rebooked.',
    'Every “I’ll let you know”, followed up.',
    'Every treatment left half-done, finished.',
    'Every patient who hasn’t come back in a year, invited back.',
  ],
  close: 'We make sure of it.',
  primary: { label: 'Get a free clinic audit', to: '/growth-audit' },
  whatsapp: { label: 'WhatsApp us · 80071 89868', href: WHATSAPP_LINK },
  // Not rendered anywhere today; kept in line with the approved proof list (13 Nov 2026).
  proofNumber: 'Almost half',
  proofText: 'of appointments at The Sterling Dental Clinic, Delhi, were confirmed by the patient on WhatsApp (47%, 2–16 Oct 2026).',
};



const HOW = {
  eyebrow: 'How we work with your dental clinic',
  titleA: 'Five steps.',
  titleB: 'Your team, our framework, every week.',
  steps: [
    {
      title: 'We look first: the free clinic audit.',
      body: 'Tell us your clinic and city. Within 24 hours you get your audit on WhatsApp, prepared and checked by a person: where enquiries go unanswered, where visits go empty, what’s waiting to be finished.',
      exTag: 'Real example',
      ex: 'At one clinic we work with, its own records showed 289 patients advised a treatment in just six weeks who still hadn’t started it. Nobody had counted them, because nobody had sent them an invoice.',
    },
    {
      title: 'We build your clinic’s plan.',
      body: 'We pick the systems your clinic needs first and write every message in your doctor’s name, in English, Hindi or Marathi, with your doctor’s own lines. We never use a scare line the doctor didn’t say.',
      exTag: 'Example',
      ex: 'Dr Shah approves one line for implant patients who are waiting: “Wait, and the bone shrinks and the teeth beside the gap start to tilt in.” It goes only to patients she says it fits.',
    },
    {
      title: 'We set it up with your staff.',
      body: 'We sit with your front desk, give every system one owner, and run the first days together. No front desk? We work with whoever answers the phone, often that’s you. Your team does less, not more.',
      pull: { q: 'My team, who aren’t tech people, picked it up quickly.', who: 'Dr Priyanka Giroti' },
      exTag: 'Example',
      ex: 'Rekha at the desk owns confirmations and rebooking. Dr Shah owns advised treatment. Each name goes on the Monday page.',
    },
    {
      title: 'We run it and tune it every week.',
      body: 'We read the replies, watch what patients answer and what they ignore, and change the wording. At the start, nothing goes to a patient until your team has seen it.',
      exTag: 'Example',
      ex: 'If patients keep asking “where do I park?”, the map link and a parking line go into the two-hour reminder that same week.',
    },
    {
      title: 'You read the numbers every Monday.',
      body: 'One page, one score per system, in green, orange or red. Every red opens to the patient names behind it. Fifteen minutes.',
      exTag: 'Example',
      ex: '“Rebook was 60%” teaches you nothing. “Anjali missed Thursday, message two never went, and nobody called her” tells you exactly what to fix, in a minute.',
    },
  ],
};








const FINAL = {
  titleA: 'Find out where your clinic is losing patients.',
  titleB: 'Free.',
  sub: 'Tell us your clinic and city. Within 24 hours your audit reaches you on WhatsApp, prepared and checked by a person. No obligation.',
  primary: { label: 'Get my free clinic audit', to: '/growth-audit' },
  whatsapp: { label: 'WhatsApp 80071 89868', href: WHATSAPP_LINK },
  modulesLead: 'Prefer to start with one piece?',
  modulesLink: { label: 'See the modules →', to: '/modules' },
};

// Footer column (site-wide): the module pages, linked in outcome words, no product names (owner 2026-10-22).
const FOOTER_OUTCOMES = [
  { to: '/modules/dental-lead-management', label: 'Every enquiry followed up' },
  { to: '/modules/whatsapp-ai-receptionist-for-dentists', label: 'Every WhatsApp answered' },
  { to: '/modules/ai-voice-receptionist-for-dentists', label: 'Every call answered' },
  { to: '/modules/dental-patient-follow-up', label: 'No-shows rebooked, treatment finished' },
  { to: '/modules/dental-clinic-management-software', label: 'Records and billing in one place' },
  { to: '/modules/automate-dental-clinic-operations', label: 'All of it, run together' },
];
// One product (owner 2026-11-02).
const FOOTER_TAGLINE = 'Aumy, one product for dental clinics: an AI receptionist on WhatsApp and calls, every follow-up done for you, and a paperless clinic.';

// The share image (used by /about, /revenue-generator and others). The HOME's title and description are in
// src/data/homeOneProduct.js (SEO) since 2026-11-02.
const SEO = {
  title: 'Aumy | AI Dental Software & AI Receptionist, Run For Your Dental Clinic in India',
  description: 'For dental clinics in India: AI dental software plus a team that runs it with your staff. Every call answered, visits confirmed, treatment finished, patients back.',
  // Social share card (1200×630, made from the hero; source in AUMY Brand Assets/02-Covers-Banners).
  shareImage: '/og/aumy-stop-losing-patients-1200x630.png',
  shareTitle: 'Stop losing patients. We make sure of it. | Aumy for dental clinics',
};

// Hidden search data (JSON-LD, llms.txt): one product, no price (owner 2026-11-02), from the home's own file.
// public/index.html carries a typed copy of ORG_DESCRIPTION (it cannot require this file).
const { ORG_DESCRIPTION, PRODUCT_DESCRIPTION } = require('./homeOneProduct');
// The square logo for search results: the transparent Aumy waves logo (navy), the only Aumy logo since 2026-10-22.
const LOGO_URL = '/aumy-logo-512.png';

module.exports = {
  WHATSAPP_LINK, HERO, HOW, FINAL, FOOTER_OUTCOMES, FOOTER_TAGLINE, SEO, ORG_DESCRIPTION, PRODUCT_DESCRIPTION, LOGO_URL,
};
