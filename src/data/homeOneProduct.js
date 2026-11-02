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
 *   - the one number is Sterling's "almost half" (281 of 603, 2–16 Oct 2026, measured on prod), never "2 in 3";
 *   - "100% digital and paperless" is the owner's own phrase (kept as he wrote it).
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */

// The one next step: the free clinic audit form. First-person, outcome-led label (reviewer, 2026-11-02).
const AUDIT = { label: 'Show me where my clinic loses patients', to: '/growth-audit' };

const HERO = {
  eyebrow: 'For owners of established dental practices',
  title: 'Every patient answered, followed up and booked.',
  // What Aumy is, as a list a busy owner can skim (reviewer, 2026-11-02).
  subLead: 'Aumy is one product for your dental clinic:',
  parts: ['AI receptionist on WhatsApp', 'AI receptionist on calls', 'Software that makes your clinic 100% digital and paperless'],
  subClose: 'And every follow-up, done for you.',
  // Answers the owner's unspoken worry ("does this replace my desk?") up front.
  loss: 'Your front desk stays. Aumy picks up what they can’t get to.',
  cta: AUDIT,
  ctaNote: 'Free clinic audit, no obligation. On your WhatsApp within 24 hours.',
};

const THREE = {
  title: 'Aumy is one product.',
  titleB: 'It does three things.',
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
  statN: 'Almost half',
  statT: 'of Sterling’s appointments are now confirmed by the patient on WhatsApp.',
  statS: '281 of 603 appointments, 2–16 October 2026.',
  reviewsLink: 'Read our Google reviews',
};

const FIT = {
  title: 'Built for practices with 3+ chairs and a front-desk team.',
  body: 'Your front desk looks after the patients in the clinic. Aumy looks after everyone else: the enquiries, the calls, the reminders and the follow-ups that slip between busy people.',
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

module.exports = { AUDIT, HERO, THREE, FOLLOW_UPS, PROOF, FIT, FINAL, SEO, ORG_DESCRIPTION, PRODUCT_DESCRIPTION };
