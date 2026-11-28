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
 *   - numbers only from the approved proof list (src/data/proof.js): Sterling's "2 in 3 answered their reminder"
 *     (owner 2026-11-22, measured 23 Oct–21 Nov 2026; never "confirm") and the pooled "across dental clinics on
 *     Aumy" figures with their window;
 *   - module names stay off this page, links included (rule M04-M06): the link to the Aumy Clinic page reads
 *     "AI dental practice management software";
 *   - "100% digital and paperless" is the owner's own phrase (kept as he wrote it).
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */

// The ads line of HANDLED follows the one ads switch (src/data/visibility.js).
const { HIDE_ADS, adsText } = require('./visibility');
// Approved proof, one copy (owner 2026-11-13).
const { POOLED, STERLING_ANSWERED } = require('./proof');

// The one next step: the free clinic audit form. First-person, outcome-led label (reviewer, 2026-11-02).
const AUDIT = { label: 'Show me where my clinic loses patients', to: '/growth-audit' };

// "Your clinic, handled." (owner 2026-11-09: his checklist, on the home page "so clinic sees it and they know
// we do end to end"). Strategy lock the same day ("Aumy first, services second").
//
// Owner 2026-11-24 (picked): keep the headline, add the line "You treat patients. We handle everything else." and
// tell the whole story as a scroll animation, in THIS order ("first we start with setting up systems and that is
// aumy"): 1 set up your systems (Aumy, always first) · 2 get found · 3 fill the chairs · 4 the proof. Stages 2 and 3
// are our team's services, ONLY for clinics on Aumy (strategy lock rule 3): the copy never sells them on their own.
// Rules: say what we run, never what we guarantee (no patient numbers, no ranking, no "more patients / revenue");
// the closing line is the owner's own, word for word; the ads line is left out while ads are hidden
// (src/data/visibility.js). src/components/HandledStory.js draws it; scripts/prerender.js writes the same words.

// The clinic in the stage-4 story: ONE constant, so the name can be changed or removed in one place.
// Owner 2026-11-24 ~21:00: Dr Priyanka agreed (verbally, to the owner) to be named. Facts only: never "because of
// Aumy", never words in her mouth. Set to null to go back to the anonymous line ("One of the dental clinics we
// work with").
const STORY_CLINIC = {
  name: 'The Sterling Dental Clinic',
  city: 'Delhi',
  doctors: 'Dr Priyanka and Dr Tarun',
};

const storyProof = (c) => (c
  ? { who: `${c.name}, ${c.city}`, line: `3 months with Aumy. Now ${c.doctors} are opening their second clinic.` }
  : { who: 'One of the dental clinics we work with', line: '3 months with Aumy. Now they’re opening their second clinic.' });

const HANDLED = {
  eyebrow: 'Aumy first, then the growth',
  title: 'Your clinic, handled.',
  sub: 'You treat patients. We handle everything else.',
  stages: [
    {
      key: 'systems',
      kicker: 'Step 1 · Aumy',
      label: 'Set up your systems',
      line: 'Every clinic starts here, so every patient who reaches you is answered and followed up.',
      items: [
        'AI receptionist on WhatsApp and calls: every enquiry answered, even after hours, and booked into your calendar',
        'Reminders: appointments confirmed, moved or cancelled when patients ask',
        'Follow-ups: missed visits rebooked, advised treatment followed up until it’s started, recalls booked',
        'The clinic software: records, charts, consent forms and bills, 100% digital',
      ],
    },
    {
      key: 'found',
      kicker: 'Step 2 · Our team',
      label: 'Get found',
      line: 'Once every enquiry is answered, our team helps patients searching for a dentist find you.',
      items: [
        'Your clinic website, built and looked after',
        'Your Google Business Profile and reviews, kept up to date',
        'SEO for Google and for AI search answers, worked on every week',
      ],
    },
    {
      key: 'chairs',
      kicker: 'Step 3 · Our team',
      label: 'Fill the chairs',
      line: adsText(
        'Then we bring new enquiries in, and help your front desk turn them into booked visits.',
        'Then we help your front desk turn every enquiry into a booked visit.',
      ),
      items: [
        { ads: true, t: 'Meta ads on Facebook and Instagram, with campaigns run and measured for you' },
        { t: 'Sales training for your front desk, so enquiries become bookings' },
      ].filter((it) => !(HIDE_ADS && it.ads)).map((it) => it.t),
    },
    {
      key: 'proof',
      kicker: 'The story so far',
      label: storyProof(STORY_CLINIC).line,
      who: storyProof(STORY_CLINIC).who,
      items: [],
    },
  ],
  note: 'Our team runs steps 2 and 3 only for clinics on Aumy, so every new enquiry is answered and followed up.',
  // closing line dropped 24 Nov (owner): the line under the headline says it once.
  more: {
    text: adsText('How our team runs ads, websites and Google:', 'How our team runs websites and Google:'),
    label: 'See our services',
    to: '/services',
  },
};

// The line under every free-clinic-audit button (used by /revenue-generator; the home hero books a call instead).
const AUDIT_NOTE = 'Free clinic audit, no obligation. On your WhatsApp within 24 hours.';

// Hero: "Run your clinic without the stress." (owner 2026-11-28: copy and storyboard approved, strategy lock reopened
// for this positioning change). Three outcomes, numbered, no feature lists. Words EXACT as approved; change one only
// to fix grammar. The eyebrow is the existing "who it is for" line (strategy lock rule 1), kept from the old hero.
// The previous hero ("One system that plugs every leak in your dental clinic.", four parts, the loss question, the
// Sterling film) is in git history before this commit.
const HERO = {
  eyebrow: 'For owners of established dental practices',
  title: 'Run your clinic without the stress.',
  sub: 'You do the dentistry. We make sure every patient is looked after, found and followed up.',
  outcomes: [
    {
      key: 'runs',
      title: 'Your clinic runs itself.',
      line: 'Every enquiry answered, every appointment confirmed, every follow-up done, day and night.',
    },
    {
      key: 'found',
      title: 'Patients find you for your expertise.',
      line: 'Your Google profile and website set up to bring patients on their own, and your team taught to keep it that way, with no monthly SEO bills.',
    },
    {
      key: 'ads',
      title: 'Ads without an agency.',
      line: 'Our proven dental ads plan, taught to your staff or run by us. A small spend, not a retainer.',
    },
  ],
  // Same destination as every "call with Jayesh" button on the site (src/data/apply.js PATH).
  cta: { label: 'Book a call with Jayesh', to: '/apply' },
  ctaNote: 'We onboard only 5 clinics a month.',
  // The hero animation (src/components/HeroStory.js), ~13 s, silent. Storyboard approved by the owner 2026-11-28.
  // The words drawn inside it; `alt` is what a screen reader hears (the drawing itself is hidden from it).
  story: {
    alt: 'A short animation. A dentist treats a patient while a phone answers a new enquiry at 10:47 pm and books it for Tuesday 11:00. Step 1, Aumy set up: reminder sent, missed visit rebooked, crown follow-up done. Step 2: the clinic shows first for “dentist near me”, rated 4.9, and a patient taps Directions. Step 3: an implants enquiry from an ad comes into the clinic. Last: you do the dentistry; Aumy does everything else.',
    enquiry: { k: 'New enquiry', t: '10:47 pm', done: 'Answered', booked: 'Booked Tue 11:00' },
    steps: [
      { kicker: 'Step 1 · Aumy set up', label: 'Operations streamlined', cards: ['Reminder sent', 'Missed visit rebooked', 'Crown follow-up done'] },
      { kicker: 'Step 2', label: 'Found for your expertise', search: 'dentist near me', clinic: 'Your clinic', rating: '4.9', directions: 'Directions' },
      { kicker: 'Step 3', label: 'Ads, taught to your team', ad: 'Implants · enquiry' },
    ],
    final: {
      you: 'You: the dentistry.',
      aumy: 'Aumy: everything else.',
      call: '2:00 am', callDone: 'Answered',
      calendar: 'Bookings',
      ticks: ['Follow-up done', 'Recall booked'],
    },
    pause: 'Pause animation',
    play: 'Play animation',
  },
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
  // Owner 2026-11-11: the section's last line, big, bold, gold. His words, lightly polished: "Any campaign you want set
  // up in minutes to do your marketing activities and win patients through camps, events etc".
  campaigns: 'Any campaign you want, set up in minutes: camps, events and offers that win you patients.',
};

const PROOF = {
  eyebrow: 'From a clinic that runs on Aumy',
  // Word for word from her Google review (src/data/googleReviews.js, the hero review).
  quote: 'My only regret? That we didn’t have this years ago.',
  who: 'Dr Priyanka Giroti',
  where: 'The Sterling Dental Clinic, New Delhi · 26 years in practice',
  statN: STERLING_ANSWERED.short,
  statT: STERLING_ANSWERED.line,
  statS: STERLING_ANSWERED.window,
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
  // Owner 2026-11-11: "Experience the transformation in a month". An invitation, not a promised result.
  closing: {
    title: 'Experience the transformation in a month.',
    line: 'Live in a week, and by the end of the first month your front desk runs on Aumy.',
  },
};
// The closing band (home and /revenue-generator), owner-approved consistency pass 2026-11-28: the hero's headline,
// its scarcity line and the call with Jayesh. The free clinic audit (AUDIT) stays live at /growth-audit.
const FINAL = {
  title: HERO.title,
  sub: HERO.ctaNote,
  cta: HERO.cta,
};

// Pooled proof band (owner 2026-11-13): approved wording only, from src/data/proof.js.
const POOLED_PROOF = POOLED;

// Search questions (owner 2026-11-13: the home page targets "AI dental clinic software"; the Aumy Clinic page targets
// "AI dental practice management"). Shown on the page AND in the FAQPage JSON-LD (prerender reads the same list).
// Answers repeat only what this page already says. No price: the free audit gives the figure.
const FAQ = {
  title: 'AI dental clinic software: questions, answered',
  items: [
    {
      q: 'What is AI dental clinic software?',
      a: 'AI dental clinic software runs a dental clinic’s day (appointments, patient records with tooth charting, treatment plans and billing) and adds AI that does the work the front desk can’t get to: an AI receptionist that answers WhatsApp and calls and books appointments, and follow-ups that go out on their own. Aumy is AI dental clinic software built for dental clinics in India.',
    },
    {
      q: 'What is dental practice management software?',
      a: 'Dental practice management software, also called dental clinic management software, is the system a dental clinic runs on: the appointment diary, patient records, tooth charting, treatment plans, prescriptions, consent forms, invoices and reports. Aumy includes AI dental practice management, so the same system also answers patients and follows them up.',
    },
    {
      q: 'Does Aumy have an AI receptionist for dental clinics?',
      a: 'Yes. Aumy’s AI receptionist answers WhatsApp in seconds and picks up the calls your desk can’t get to, day or night. It books, moves and cancels appointments into real free slots, and hands the chat to your team the moment a person is needed.',
    },
    {
      q: 'Does Aumy replace my front desk?',
      a: 'No. Your front desk stays. Aumy picks up what they can’t get to: the enquiries, the calls, the reminders and the follow-ups that slip between busy people.',
    },
    {
      q: 'Can I keep my current practice software?',
      a: 'Yes. Keep your practice software, or move fully to Aumy. Whatever system you use today, we move your patients, visits, treatments, bills, X-rays and images into Aumy within the week.',
    },
    {
      q: 'How much does Aumy cost?',
      a: 'It depends on your clinic: how many chairs and doctors, and what you switch on. A short call with Jayesh gives you the exact figure, before anything starts.',
    },
  ],
  // Internal links (owner 2026-11-13): home, the Aumy Clinic page and /ai-receptionist link to each other.
  links: [
    { to: '/modules/dental-clinic-management-software', label: 'AI dental practice management software' },
    { to: '/ai-receptionist', label: 'AI receptionist for dental clinics' },
  ],
};

// "Hear it from Dr Priyanka" (owner 2026-11-28, picked "Section under the hero"): one upright film with an
// English | हिंदी switch, directly under the hero. src/components/DrPriyankaFilm.js draws it; scripts/prerender.js
// writes the same words (poster + link). The caption and the line are the owner's wording, keep exactly; no claim
// beyond them. The film loads only on tap (preload="none"), so it adds nothing to the first page load.
// Files: public/videos/testimonials/dr-priyanka-miami-{en,hi}.mp4 (720x1280) and -poster.jpg (frame at ~1.5 s).
const DR_PRIYANKA_FILM = {
  id: 'dr-priyanka',
  eyebrow: 'From a dental clinic on Aumy',
  title: 'Hear it from Dr Priyanka',
  who: 'Dr Priyanka · The Sterling Dental Clinic, Delhi',
  line: 'She and Dr Tarun flew to Miami for Thanksgiving. Their clinic didn’t stop.',
  switchLabel: 'Video language',
  playLabel: 'Watch her story',
  // Same destination as every "call with Jayesh" button on the site (src/data/apply.js PATH).
  cta: { label: 'Book a call with Jayesh', to: '/apply' },
  versions: [
    {
      key: 'en',
      label: 'English',
      lang: 'en',
      src: '/videos/testimonials/dr-priyanka-miami-en.mp4',
      poster: '/videos/testimonials/dr-priyanka-miami-en-poster.jpg',
    },
    {
      key: 'hi',
      label: 'हिंदी',
      lang: 'hi',
      src: '/videos/testimonials/dr-priyanka-miami-hi.mp4',
      poster: '/videos/testimonials/dr-priyanka-miami-hi-poster.jpg',
    },
  ],
};

// SEO (same strings in scripts/prerender.js slug '' and public/index.html). Owner 2026-11-13: the title targets
// "AI Dental Clinic Software" (kept). Description rewritten 2026-11-28 for the new hero (owner approved the
// positioning change): the three outcomes, keyword first.
const SEO = {
  title: 'AI Dental Clinic Software in India · Aumy',
  description:
    'AI dental clinic software that runs your clinic: every enquiry answered, every follow-up done, and patients finding you on Google and through dental ads.',
  shareImage: '/og/aumy-run-your-clinic-1200x630.png',
};

// Hidden search data (JSON-LD, llms.txt). public/index.html carries a typed copy of ORG_DESCRIPTION.
// Rewritten 2026-11-28 (owner-approved consistency pass): Aumy first, then the Google profile and website with the
// team taught, then ads taught to the staff or run by us. No prices.
const ORG_DESCRIPTION =
  'AUM AI makes Aumy for dental clinics in India. Aumy runs the clinic first: every enquiry answered, every appointment confirmed and every follow-up done, day and night. Then our team sets up the clinic’s Google profile and website and teaches its team to keep them that way, and gives it a dental ads plan, taught to its staff or run by us.';
const PRODUCT_DESCRIPTION =
  'Aumy is AI dental clinic software for dental clinics in India that runs the clinic: an AI receptionist on WhatsApp and calls answers every enquiry and books it, every appointment is confirmed, and every patient follow-up is done (new enquiries, missed appointments, advised and unfinished treatment, check-ups, patients not seen in a year, after-treatment check-ins, payment reminders, Google reviews), in a 100% digital, paperless clinic: appointments, patient records with tooth charting, X-rays, treatment plans, prescriptions, consent forms, invoices and reports. For dental clinics on Aumy, our team also sets up the Google Business Profile and website and teaches the clinic’s team to keep them that way, and gives the clinic a dental ads plan, taught to its staff or run by us.';

module.exports = { AUDIT, AUDIT_NOTE, STORY_CLINIC, HERO, DR_PRIYANKA_FILM, HANDLED, THREE, FOLLOW_UPS, PROOF, POOLED_PROOF, FIT, START, FAQ, FINAL, SEO, ORG_DESCRIPTION, PRODUCT_DESCRIPTION };
