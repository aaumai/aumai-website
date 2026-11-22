/**
 * /apply — calls with Jayesh are by application (owner 2026-11-22, BANT: Budget as means, Authority, Need, Timeline).
 * ONE copy of the words: the React page (src/pages/ApplyPage.js) and the crawler HTML (scripts/prerender.js).
 * The form posts to aumai-site-backend POST /api/aumai/apply, which stores it, emails the owner and forwards it to
 * BM (source 'website', the answers in the note and in `bant`). The calendar link is never shown on the site:
 * the team reviews each application and replies on WhatsApp within 48 hours. No deposit and no price.
 *
 * `module.exports` on purpose: prerender.js is plain Node.
 */

const PATH = '/apply';

const SEO = {
  title: 'Apply for a Clinic Growth Call with Jayesh | AUM AI',
  description: 'For established dental practices with 3 or more chairs and a front-desk team. Answer 4 short questions; we review every application personally and reply on WhatsApp within 48 hours.',
};

const HERO = {
  eyebrow: 'By application',
  title: 'Apply for a clinic growth call with Jayesh.',
  sub: 'We work with a small number of established dental practices each month, so every call is by application.',
};

const FOR_YOU = {
  title: 'These calls are for you if:',
  items: [
    'you own or run a dental practice with 3 or more chairs and a front-desk team;',
    'patients are slipping through (missed calls, unanswered enquiries, no-shows, unfinished treatment);',
    'you want this fixed in the next few months, not ‘someday’.',
  ],
};

const HOW = {
  title: 'How it works:',
  steps: [
    'Answer 4 short questions about your clinic (2 minutes).',
    'We review every application personally and reply within 48 hours.',
    'If it’s a fit, you pick a time for your call with Jayesh.',
  ],
};

const NOTE = 'Please apply only if you’ll attend the call you book. If your clinic isn’t the right fit yet, we’ll tell you honestly and send you our free masterclass instead.';

// The four questions. Values are what the backend stores (aumai-site-backend routes/apply.js uses the same keys).
const ROLES = [
  { value: 'owner', label: 'Owner' },
  { value: 'partner', label: 'Partner' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'front_desk', label: 'Front desk' },
];
const TIMELINES = [
  { value: 'this_month', label: 'This month' },
  { value: '1_3_months', label: 'In 1–3 months' },
  { value: 'exploring', label: 'Just exploring' },
];
const QUESTIONS = {
  role: '1. Your role',
  chairs: '2. Number of chairs',
  newPatients: 'Roughly how many new patients a month?',
  enquiry: '3. What happens today when a patient enquires but doesn’t book?',
  timeline: '4. When do you want this running?',
};

const SUBMIT = 'Send my application';
const SUCCESS = 'Thank you. We review every application personally and will reply on WhatsApp within 48 hours.';
const ERROR = 'Something went wrong. WhatsApp us on 80071 89868 and we will take your application there.';
const PRIVACY = 'Your answers stay with us and are used only to review your application.';

// Where every "call with Jayesh" button now goes.
const CTA_LABEL = 'Apply for a call with Jayesh';

module.exports = { PATH, SEO, HERO, FOR_YOU, HOW, NOTE, ROLES, TIMELINES, QUESTIONS, SUBMIT, SUCCESS, ERROR, PRIVACY, CTA_LABEL };
module.exports.default = module.exports;
