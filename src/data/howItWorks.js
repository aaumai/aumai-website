/**
 * "How Aumy works" (/revenue-generator). ONE copy of the words: the React page
 * (src/pages/AumyRevenueGenerator.js) and the crawler HTML in scripts/prerender.js both read this file.
 *
 * 2026-10-22 (outcomes as a service, owner-approved): the page leads with the five "How we work" steps
 * (src/data/homeOutcomes.js, HOW), the same ones the home page shows. The old app-first "Three steps" and the
 * module list are gone; the module explainer videos stay lower down, with one quiet link to /modules.
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */

const HOW_SEO = {
  title: 'How We Work With Your Dental Clinic | Aumy by AUM AI',
  description:
    'How AUM AI works with a dental clinic in India: a free clinic audit, your clinic’s plan in your doctor’s name, set up with your staff, run and tuned every week, and KPIs every Monday.',
};

const HOW_HERO = {
  eyebrow: 'How we work',
  title: 'How we work with your dental clinic.',
  sub: 'We don’t hand you software and leave. A team that works with your staff, the 4C Framework, and the system that runs it every day, measured every Monday.',
  stepsEyebrow: 'The five steps',
};

const HOW_CONTROL = [
  { title: 'Approve before it sends', body: 'At the start your team checks each message before a patient gets it. Switch it off for what you trust.' },
  { title: 'Works with your software', body: 'Keep the practice software you use today, or run the whole clinic on Aumy. Your choice.' },
  { title: 'Your data stays private', body: 'Encrypted, access-controlled and private by design. Patient health details never go to ad platforms.' },
];

// Proof, real words only: Dr Priyanka's Google review (src/data/googleReviews.js) and Sterling's first two weeks.
const HOW_PROOF = {
  quote: 'Thank you, Jayesh ji, and your team. You were with us at every step.',
  who: 'Dr Priyanka Giroti, The Sterling Dental Clinic, New Delhi',
  number: '281 of 603',
  numberText: 'appointments at Sterling were confirmed by the patients themselves on WhatsApp in the first two weeks.',
};

module.exports = { HOW_SEO, HOW_HERO, HOW_CONTROL, HOW_PROOF };
module.exports.default = module.exports;
