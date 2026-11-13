/**
 * "How it works" (/revenue-generator, first item in the top menu). ONE copy of the words: the React page
 * (src/pages/AumyRevenueGenerator.js) and the crawler HTML in scripts/prerender.js both read this file.
 *
 * 2026-11-03 (owner: rewrite "How it works" to the one-product story, after the one-product home of
 * 2026-11-02): Aumy is ONE product with three parts plus every follow-up. The page shows each part at work
 * (the existing explainer films, labelled by part, never by module name), an example day, the five setup
 * steps, how the clinic stays in control, proof, and the one call to action (the free clinic audit).
 * No module names, no prices, no plan names. The part names and lines come from src/data/homeOneProduct.js
 * so the two pages never drift. Sterling's figure is the approved "almost half (47%)" from src/data/proof.js
 * (owner 2026-11-13; the earlier "2 in 3" is not on the approved proof list).
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */
const HOME = require('./homeOneProduct');
const EXPL = require('./explainers');
const { STERLING_CONFIRMED } = require('./proof');

const video = (moduleId) => EXPL.VIDEOS.find((v) => v.moduleId === moduleId);
const part = (key) => HOME.THREE.items.find((it) => it.key === key);

const HOW_SEO = {
  title: 'How Aumy Works in Your Dental Clinic | AI Receptionist, Follow-Ups & Paperless Clinic',
  description:
    'How Aumy works in a dental clinic in India: an AI receptionist on WhatsApp and calls, every patient follow-up done for you, and a paperless clinic, set up with your team after a free clinic audit.',
};

const HOW_HERO = {
  eyebrow: 'How it works',
  title: 'How Aumy works in your dental clinic.',
  sub: 'One product, three parts, set up for you with your team. Here is what each part does, and what a day at your clinic looks like with Aumy.',
  cta: HOME.AUDIT,
  ctaNote: HOME.HERO.ctaNote,
};

// Each part with the film that shows it (the films keep their own file names; the page labels them by part).
// Object.assign, not object spread: Babel turns a spread into an ESM helper import, which makes webpack treat this
// CommonJS file as an ES module and drop its module.exports ("HOW_SEO is not exported").
const HOW_PARTS = {
  title: 'The three parts,',
  titleB: 'at work.',
  items: [
    Object.assign({}, part('whatsapp'), { film: video('whatsapp-ai-receptionist-for-dentists') }),
    Object.assign({}, part('voice'), { film: video('ai-voice-receptionist-for-dentists') }),
    Object.assign({}, part('paperless'), { film: null }),
    {
      key: 'follow-ups',
      name: 'And every follow-up, done for you',
      line: 'New enquiries, confirmations, missed appointments, advised and unfinished treatment, check-ups and Google reviews, each followed up on WhatsApp in your clinic’s name.',
      bullets: [
        'Every patient gets the message that fits them, at the right time',
        'Replies come back to your team, in one place',
        'You decide which messages your team approves before they go',
      ],
      film: video('dental-patient-follow-up'),
    },
  ],
  filmNote: 'About 90 seconds each. Sound on.',
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
// confirmations (approved wording from src/data/proof.js; "2 in 3" replaced on 2026-11-13).
const HOW_PROOF = {
  quote: 'Thank you, Jayesh ji, and your team. You were with us at every step.',
  who: 'Dr Priyanka Giroti, The Sterling Dental Clinic, New Delhi',
  number: STERLING_CONFIRMED.short,
  numberText: 'of appointments at The Sterling Dental Clinic, Delhi, were confirmed by the patient on WhatsApp: 281 of 603 (47%), measured 2–16 Oct 2026.',
};

const HOW_FINAL = HOME.FINAL;

module.exports = { HOW_SEO, HOW_HERO, HOW_PARTS, HOW_DAY, HOW_STEPS, HOW_CONTROL, HOW_PROOF, HOW_FINAL };
