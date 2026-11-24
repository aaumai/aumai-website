/**
 * /apply: the call form for serious clinic owners (owner 2026-11-24, replaces the 22 Nov "by application, we reply
 * within 48 hours" page). Three questions, then a booking button for a 30-minute call with Jayesh, or the
 * masterclass for people who are not the decision-maker or are just exploring.
 * ONE copy of the words: the React page (src/pages/ApplyPage.js) and the crawler HTML (scripts/prerender.js).
 * The form posts to aumai-site-backend POST /api/aumai/apply, which stores it, emails the owner, forwards it to BM
 * and answers next: { kind: 'book' | 'masterclass', url }. No price anywhere.
 *
 * `module.exports` on purpose: prerender.js is plain Node.
 */

const PATH = '/apply';

const SEO = {
  title: 'Book a Call with Jayesh | AUM AI',
  description: 'Aumy is for dental clinic owners who want to run their clinic on a proper system: every enquiry answered, every patient followed up. Three short questions, then pick a time for a 30-minute call with Jayesh.',
};

const HERO = {
  eyebrow: 'For dental clinic owners',
  title: 'Book a call with Jayesh.',
  // Owner-approved wording (24 Nov 2026): keep exactly.
  intro: 'Aumy is for clinic owners who want to run their clinic on a proper system: every enquiry answered, every patient followed up. Please fill this only if you’re serious about putting this in place in your clinic.',
};

// The three questions. Values are what the backend stores (aumai-site-backend routes/apply.js uses the same keys).
const QUESTIONS = {
  decision_maker: 'Are you the clinic owner or a decision-maker?',
  chairs: 'How many dental chairs do you have?',
  timeline: 'When would you like to start?',
};
const DECISION_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];
const CHAIR_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3_5', label: '3–5' },
  { value: '6_plus', label: '6+' },
];
const TIMELINES = [
  { value: 'this_month', label: 'This month' },
  { value: 'next_3_months', label: 'Next 3 months' },
  { value: 'exploring', label: 'Just exploring' },
];

const SUBMIT = 'Continue';
const ERROR = 'Something went wrong. Please try again, or WhatsApp us on 80071 89868.';
const PRIVACY = 'Your answers stay with us and are used only to prepare for your call.';

// What the page shows after the form. Book: owner-approved wording (24 Nov 2026), keep exactly.
const THANKS_BOOK = {
  title: 'Thank you. Pick a time for a 30-minute call with Jayesh.',
  button: 'Book a call',
  small: 'Please book only a time you can keep. If you miss the call without letting us know, we won’t be able to offer another slot.',
};
// Masterclass (not the decision-maker, or just exploring): drafted 24 Nov, needs the owner's OK.
const THANKS_MASTERCLASS = {
  title: 'Thank you. The best place to start is our masterclass: how to stop losing patients, step by step.',
  button: 'Watch the masterclass',
};

// Used only when the server's answer has no `next` (the server decides first, with the same rule).
const BOOK_URL = 'https://bm.aumyai.com/call';
const MASTERCLASS_URL = 'https://aumai.co.in/masterclass';

// Where every "call with Jayesh" button goes (they all link to /apply).
const CTA_LABEL = 'Apply for a call with Jayesh';

module.exports = {
  PATH, SEO, HERO, QUESTIONS, DECISION_OPTIONS, CHAIR_OPTIONS, TIMELINES, SUBMIT, ERROR, PRIVACY,
  THANKS_BOOK, THANKS_MASTERCLASS, BOOK_URL, MASTERCLASS_URL, CTA_LABEL,
};
module.exports.default = module.exports;
