/**
 * Home page: Aumy as ONE product (owner 2026-11-02: "keep it clean simple and easy to understand for clinic
 * owners … one clinic owner said I was confused what exactly you guys do … just have Aumy as one product with
 * AI Receptionist, voice receptionist, 100% Digital and paperless with all follow ups … currently in prod for
 * our live clients"; "Home page should be very very clear"). Mirrors the ads live since 2 Nov (persona: the
 * established practice owner, 3+ chairs and a front-desk team).
 *
 * ONE copy of the words: src/pages/Home.js renders them and scripts/prerender.js writes the same words into
 * the crawler HTML (slug ''). Edit here, never there.
 *
 * Rules for these words:
 *   - no module names, no prices, no plans (owner 2026-11-02: "no pricing on website at all");
 *   - claims only what is switched on for at least one live clinic on prod (checked read-only 2026-11-02:
 *     Sterling, RB, Vinaykia, Dental Planet Elite). Off everywhere, so never claimed here: lab work ready,
 *     festival greetings, health tips, treatment suggestions;
 *   - the paperless list names real screens of the clinic software only;
 *   - the one number is Sterling's "2 out of 3" (owner 2026-11-03: "recently the trend is climbing to 2/3 so keep
 *     it 2 out of 3"; measured on prod 3 Nov: about half of reminded appointments, steady, so no date or count line);
 *   - "100% digital and paperless" is the owner's own phrase (kept as he wrote it).
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */

// The ads line of HANDLED follows the one ads switch (src/data/visibility.js).
const { HIDE_ADS, adsText } = require('./visibility');

// The one next step: the free clinic audit form. First-person, outcome-led label (reviewer, 2026-11-02).
const AUDIT = { label: 'Show me where my clinic loses patients', to: '/growth-audit' };

// "Your clinic, handled." (owner 2026-11-09: his checklist, on the home page "so clinic sees it and they know
// we do end to end"). Strategy lock the same day ("Aumy first, services second"): the list is two steps, in
// the order we work with a clinic. Step 1 is Aumy, the way every clinic starts. Step 2 is what our team runs
// (/services), only for clinics on Aumy. Rules: say what we run, never what we guarantee (no patient numbers,
// no ranking promise); the closing line is the owner's own, word for word; the ads line is left out while ads
// are hidden.
const HANDLED = {
  eyebrow: 'First the leaks, then the growth',
  title: 'Your clinic, handled.',
  steps: [
    {
      label: 'First, Aumy plugs the leaks',
      items: [
        'Every call and WhatsApp answered, even after hours, and booked into your calendar',
        'Appointments confirmed, moved or cancelled when patients ask',
        'Missed visits rebooked',
        'Advised treatment followed up until it’s started',
        'Recalls and follow-up visits booked',
      ],
    },
    {
      label: adsText('Then our team runs your implant ads and Google', 'Then our team looks after Google'),
      note: 'For clinics on Aumy, so every new enquiry is answered and followed up.',
      items: [
        { ads: true, t: 'Implant patients from ads, from across India and abroad, with campaigns run and measured for you' },
        { t: 'Found on Google and in AI search, with your profile, website and reviews looked after' },
      ].filter((it) => !(HIDE_ADS && it.ads)).map((it) => it.t),
    },
  ],
  closing: 'You take care of your patients. We help you grow your clinic.',
  more: {
    text: adsText('How our team runs ads, websites and Google:', 'How our team runs websites and Google:'),
    label: 'See our services',
    to: '/services',
  },
};

const HERO = {
  eyebrow: 'For owners of established dental practices',
  title: 'One system that plugs every leak in your dental clinic.',
  // Owner 2026-11-11: a small badge under the headline. OUR OWN pill style, never NABH's logo or artwork. The line
  // names what is built in today (Omlesh's NABH paperwork, live 3 Nov: UHID, visit numbers, the detailed bill).
  badge: { label: 'NABH Compliant', line: 'UHID, visit numbers and NABH-format bills, built in.' },
  // What Aumy is, as a list a busy owner can skim: bold name, then the line (owner 2026-11-04).
  subLead: 'Aumy is four things working as one:',
  parts: [
    { name: 'AI receptionist on WhatsApp', line: 'answers in seconds, day or night, and books, moves and cancels appointments.' },
    { name: 'AI receptionist on calls', line: 'picks up the calls your desk can’t get to, even after hours, and books them.' },
    { name: 'Clinic software', line: 'records, charts, consent forms and bills, so your clinic runs 100% digital.' },
    { name: 'Every follow-up, done for you', line: 'reminders, missed visits, advised treatment and recalls.' },
  ],
  lossQuestion: 'Have you ever counted how many calls your clinic misses in a day, or how many WhatsApps get answered late, after the patient has already booked somewhere else?',
  // Answers the owner's unspoken worry ("does this replace my desk?") up front.
  loss: 'Your front desk stays. Aumy picks up what they can’t get to.',
  cta: AUDIT,
  ctaNote: 'Free clinic audit, no obligation. On your WhatsApp within 24 hours.',
};

const THREE = {
  title: 'Aumy is one product.',
  titleB: 'It does four things.',
  items: [
    {
      key: 'whatsapp',
      name: 'AI receptionist on WhatsApp',
      line: 'Answers every WhatsApp in seconds, day or night, and books the patient.',
      bullets: [
        'Answers questions on treatments, timings and directions, in your clinic’s own words',
        'Books, moves and cancels appointments into real free slots',
        'Hands the chat to your team the moment a person is needed',
      ],
    },
    {
      key: 'voice',
      name: 'AI receptionist on calls',
      line: 'Picks up the calls your desk can’t: when they’re busy, or the clinic is closed.',
      bullets: [
        'Books, moves and checks appointments on the call',
        'Puts the call through to your staff when they are needed',
        'Every call written down, so your team knows what was said',
      ],
    },
    {
      key: 'paperless',
      name: '100% digital, paperless clinic',
      line: 'Everything your clinic writes on paper today, on one screen.',
      bullets: [
        'Appointments and every doctor’s calendar',
        'Patient records with tooth charting, X-rays and photos',
        'Treatment plans, visit notes and prescriptions',
        'Consent forms signed on screen, and forms filled on the patient’s phone before the visit',
        'Invoices, payments, accounts and reports',
        'A login for each staff member, with only the access they need',
      ],
    },
  ],
};

// Each row is switched on for at least one live clinic (prod, 2026-11-02). The first rows mirror the ad.
const FOLLOW_UPS = {
  title: 'And every follow-up,',
  titleB: 'done for you.',
  lead: 'Most patients aren’t lost to another clinic’s ad. They’re lost after they found you, between one busy person and the next. Aumy follows up every one on WhatsApp, in your clinic’s name.',
  rows: [
    ['New enquiry?', 'Followed up & booked.'],
    ['Enquiry went quiet?', 'Followed up & booked.'],
    ['Appointment tomorrow?', 'Confirmed on WhatsApp.'],
    ['Missed appointment?', 'Followed up & booked.'],
    ['Implant or aligners advised, never booked?', 'Followed up & booked.'],
    ['RCT done, crown never placed?', 'Followed up & booked.'],
    ['Check-up due?', 'Invited back & booked.'],
    ['Not seen in over a year?', 'Invited back & booked.'],
    ['Day after a treatment?', 'Checked on by the clinic.'],
    ['Asked to be reminded later?', 'Reminded when they asked.'],
    ['Payment still due?', 'Reminded, politely.'],
    ['Happy with the visit?', 'Asked for a Google review.'],
    ['Birthday?', 'Wished, in your doctor’s name.'],
  ],
  closer: ['Clinic closed for the night?', 'Aumy still books.'],
  note: 'You decide which messages your team approves before they go. A patient who says stop never hears from you again.',
};

const PROOF = {
  eyebrow: 'From a clinic that runs on Aumy',
  // Word for word from her Google review (src/data/googleReviews.js, the hero review).
  quote: 'My only regret? That we didn’t have this years ago.',
  who: 'Dr Priyanka Giroti',
  where: 'The Sterling Dental Clinic, New Delhi · 26 years in practice',
  statN: '2 out of 3',
  statT: 'of Sterling’s appointments are now confirmed by the patient on WhatsApp.',
  statS: '',
  reviewsLink: 'Read our Google reviews',
};

const FIT = {
  title: 'Built for practices with 3+ chairs and a front-desk team.',
  body: 'Your front desk looks after the patients in the clinic. Aumy looks after everyone else: the enquiries, the calls, the reminders and the follow-ups that slip between busy people.',
};

// Switching to Aumy (owner 2026-11-11: "we get our clients live within a week; clients can keep their existing PMS or
// migrate completely to Aumy within a week; easy-to-use screens for doctors and staff"). A supporting section, not a
// new headline (strategy lock, 9 Nov). Point 2 is the owner's exact wording (11 Nov): ANY practice software, because
// we migrate from any system through its exports; no system named.
const START = {
  eyebrow: 'Switching to Aumy',
  title: 'Easy to start.',
  items: [
    {
      title: 'Live in a week.',
      body: 'From signing to your first patient messages in about 7 days.',
    },
    {
      title: 'Keep your practice software, or move fully to Aumy.',
      body: 'Whatever system you use today, we move your patients, visits, treatments, bills, X-rays and images into Aumy within the week.',
    },
    {
      title: 'Screens your doctors and front desk can use from day one.',
      body: 'Simple and clear, at the desk and on the phone too.',
    },
  ],
};
const FINAL = {
  title: 'See where your clinic is losing patients.',
  sub: 'Tell us your clinic and city. Within 24 hours a free audit reaches you on WhatsApp, prepared and checked by a person. No obligation.',
  cta: AUDIT,
};

// SEO (same strings in scripts/prerender.js slug '' and public/index.html).
const SEO = {
  title: 'Aumy | AI Receptionist, Patient Follow-Ups & Paperless Clinic for Dental Practices in India',
  description:
    'Aumy is one product for dental clinics in India: an AI receptionist on WhatsApp and calls, every patient follow-up done for you, and a 100% digital, paperless clinic. No patient slips through.',
  shareImage: '/og/aumy-stop-losing-patients-1200x630.png',
};

// Hidden search data (JSON-LD, llms.txt). public/index.html carries a typed copy of ORG_DESCRIPTION.
const ORG_DESCRIPTION =
  'AUM AI makes Aumy, one product for dental clinics in India that answers every patient on WhatsApp and calls, follows up every one until they book, and runs the clinic without paper.';
const PRODUCT_DESCRIPTION =
  'Aumy is one product for dental clinics in India: an AI receptionist on WhatsApp, an AI receptionist on calls, every patient follow-up done for the clinic (new enquiries, confirmations, missed appointments, advised and unfinished treatment, check-ups, patients not seen in a year, after-treatment check-ins, payment reminders, Google reviews), and a 100% digital, paperless clinic: appointments, patient records with tooth charting, X-rays, treatment plans, prescriptions, consent forms, invoices and reports.';

module.exports = { AUDIT, HERO, HANDLED, THREE, FOLLOW_UPS, PROOF, FIT, START, FINAL, SEO, ORG_DESCRIPTION, PRODUCT_DESCRIPTION };
