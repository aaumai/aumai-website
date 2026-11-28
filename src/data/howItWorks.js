/**
 * "How it works" (/revenue-generator, first item in the top menu). ONE copy of the words: the React page
 * (src/pages/AumyRevenueGenerator.js) and the crawler HTML in scripts/prerender.js both read this file.
 *
 * 2026-11-03 (owner: rewrite "How it works" to the one-product story, after the one-product home of
 * 2026-11-02): Aumy is ONE product with three parts plus every follow-up. The page shows each part at work
 * (the existing explainer films, labelled by part, never by module name), an example day, the five setup
 * steps, how the clinic stays in control, proof, and the one call to action (the free clinic audit).
 * No module names, no prices, no plan names. The part names and lines come from src/data/homeOneProduct.js
 * so the two pages never drift. Sterling's figure is the approved "2 in 3 answered their reminder" from
 * src/data/proof.js (owner 2026-11-22, measured 23 Oct–21 Nov 2026; never "confirm").
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */
const HOME = require('./homeOneProduct');
const EXPL = require('./explainers');
const { STERLING_ANSWERED } = require('./proof');
const VIS = require('./visibility');

const video = (moduleId) => EXPL.VIDEOS.find((v) => v.moduleId === moduleId);

// Owner-approved consistency pass (2026-11-28): this page tells the home hero's three steps, in the same words
// (src/data/homeOneProduct.js HERO.outcomes), in order: Aumy first, then being found, then ads. The previous version
// ("The three parts, at work.") is in git history.
const HOW_SEO = {
  title: 'How Aumy Works in Your Dental Clinic | Run Your Clinic Without the Stress',
  description:
    'How Aumy works in a dental clinic in India, in three steps: every enquiry answered and every follow-up done, patients finding you on Google, and dental ads without an agency.',
};

const HOW_HERO = {
  eyebrow: 'How it works',
  title: 'How Aumy works in your dental clinic.',
  sub: HOME.HERO.sub,
  cta: HOME.HERO.cta,
  ctaNote: HOME.HERO.ctaNote,
};

// The three steps. Step 1 shows Aumy at work in its films (the films keep their own file names; the page labels
// them by what they show); steps 2 and 3 link to the service pages that explain them.
// Object.assign, not object spread: Babel turns a spread into an ESM helper import, which makes webpack treat this
// CommonJS file as an ES module and drop its module.exports ("HOW_SEO is not exported").
const STEP_EXTRAS = [
  {
    films: [
      { name: 'AI receptionist on WhatsApp', film: video('whatsapp-ai-receptionist-for-dentists') },
      { name: 'AI receptionist on calls', film: video('ai-voice-receptionist-for-dentists') },
      { name: 'Every follow-up, done for you', film: video('dental-patient-follow-up') },
    ],
    links: [],
  },
  { films: [], links: [{ label: 'Dental SEO', to: '/dental-seo' }, { label: 'Dental websites', to: '/clinic-websites' }] },
  { films: [], links: [{ label: 'Dental ads', to: VIS.DENTAL_ADS_PATH }].filter((l) => VIS.showLink(l.to)) },
];
const HOW_PARTS = {
  title: 'Three steps,',
  titleB: 'in this order.',
  filmNote: 'Step 1 at work: about 90 seconds each, sound on.',
  items: HOME.HERO.outcomes.map((o, i) => Object.assign({}, o, { kicker: HOME.HERO.story.steps[i].kicker }, STEP_EXTRAS[i])),
};

// An example day. Names and times are made up; every step is something Aumy does at live clinics today.
const HOW_DAY = {
  title: 'A day at your clinic',
  titleB: 'with Aumy.',
  lead: 'An example. The names and times are made up; every step is real.',
  steps: [
    ['9:52 pm, the night before', 'Rohan asks about an implant on WhatsApp. Aumy answers his questions and books him for Saturday at 11 am.'],
    ['9:30 am', 'Tomorrow’s patients are asked to confirm on WhatsApp. Sunita can’t come and picks Thursday instead, so her slot is free a day early.'],
    ['11:40 am', 'The desk is busy with a walk-in when Mr Iyer calls. Aumy picks up, checks the diary and moves his appointment.'],
    ['In the chair', 'The doctor opens the patient’s chart, X-rays and treatment plan on screen, writes the visit note and the prescription, and the invoice comes from the same record.'],
    ['6:00 pm', 'Anjali missed her visit today. She gets a kind message from the clinic, and a new time is booked when she replies.'],
    ['Next week', 'Mr Deshpande had his root canal but hasn’t booked the crown. He gets a follow-up in the doctor’s name, so the treatment isn’t left half-done.'],
  ],
};

const HOW_STEPS = {
  eyebrow: 'Getting started',
  titleA: 'From the free audit to live,',
  titleB: 'in five steps.',
};

const HOW_CONTROL = [
  { title: 'Approve before it sends', body: 'At the start your team checks each message before a patient gets it. Switch it off for what you trust.' },
  { title: 'Works with your software', body: 'Keep the practice software you use today, or run the whole clinic on Aumy. Your choice.' },
  { title: 'Your data stays private', body: 'Encrypted, access-controlled and private by design. Patient health details never go to ad platforms.' },
];

// Proof, real words only: Dr Priyanka's Google review (src/data/googleReviews.js) and Sterling's WhatsApp
// reminder answers (approved wording from src/data/proof.js, owner 2026-11-22).
const HOW_PROOF = {
  quote: 'Thank you, Jayesh ji, and your team. You were with us at every step.',
  who: 'Dr Priyanka Giroti, The Sterling Dental Clinic, New Delhi',
  number: STERLING_ANSWERED.short,
  numberText: 'of The Sterling Dental Clinic’s patients, Delhi, answered their appointment reminder on WhatsApp: 906 of 1,354 (67%), measured 23 Oct–21 Nov 2026.',
};

const HOW_FINAL = HOME.FINAL;

module.exports = { HOW_SEO, HOW_HERO, HOW_PARTS, HOW_DAY, HOW_STEPS, HOW_CONTROL, HOW_PROOF, HOW_FINAL };
