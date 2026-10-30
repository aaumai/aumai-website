/**
 * The Full Chair Method masterclass: the public information page at
 * aumai.co.in/masterclass (owner 2026-10-19: "users should know what this
 * masterclass is about, what's the benefit of taking this masterclass, what
 * should they expect from it").
 *
 * ONE copy of the words: src/pages/MasterclassInfo.js renders them and
 * scripts/prerender.js writes the same words into the crawler HTML and the
 * FAQPage JSON-LD, so the two can never drift apart.
 *
 * Source of truth for what the course contains: the masterclass script and kit
 * (EHR repo docs/masterclass/). Only what is actually in the course goes here.
 * There is NO live Q&A (owner 2026-10-19): never add one back.
 *
 * Owner 2026-10-30 (replaces the free-watch model of 25 Oct): watching costs ENTRY_LABEL, once,
 * and includes 24×7 Q&A on WhatsApp. The kit (Clinic Master Sheet, Claude skill file, Prompt Pack,
 * slides, guides) is PRICE_LABEL in total: UPGRADE_LABEL more after joining, or PRICE_LABEL
 * outright, watching included. Flow on /masterclass: the sign-up form (an account, signed in), then
 * the pay step, then the video plays in place. No renewal words anywhere: both are paid once.
 * The pages never say "free". The YouTube id is NEVER in this file or any public file: the video
 * URL comes only from the site backend's /me.video, for members who can watch.
 *
 * `module.exports` on purpose: the prerender script is plain Node.
 */
const MC_REFUND = require('./masterclassRefund');

const TITLE = 'The Full Chair Method';
// The ONE place amounts are typed. Shown only until the site backend answers (/me, /price), which
// is the source of truth: MASTERCLASS_ENTRY_PRICE_PAISE and MASTERCLASS_PRICE_PAISE.
const ENTRY_LABEL = '₹299';   // watch + 24×7 WhatsApp Q&A
const PRICE_LABEL = '₹999';   // the kit, in total (includes watching)
const UPGRADE_LABEL = '₹700'; // the kit for someone who paid ENTRY_LABEL
// Lifetime access for every member (owner 2026-10-20); the site backend never ends it on a date.
const ACCESS = 'Lifetime access';

// Every masterclass page (owner 2026-10-29: no "free" anywhere on them, including the shared header bar).
const isMasterclassPath = (p) => p === '/masterclass' || String(p || '').startsWith('/masterclass/');

const PATHS = { info: '/masterclass', register: '/masterclass/register', signIn: '/masterclass/sign-in', create: '/masterclass/sign-in#create', my: '/masterclass/my' };

// The two calls to action, everywhere (owner 2026-10-25): watch first; the kit second.
const CTA = {
  watch: 'Watch the masterclass',
  join: (l = ENTRY_LABEL) => `Join for ${l}`,
  kit:`Get the kit · ${PRICE_LABEL}`,
  kitOnce: `Get the kit · ${PRICE_LABEL} once`,
  unlock: `Unlock the kit · ${PRICE_LABEL} once`,
  watchLine: 'About an hour',
  kitLine: `Kit ${PRICE_LABEL}, once`,
};

// Questions go to WhatsApp (owner 2026-10-19).
const WHATSAPP = { display: '80071 89868', link: 'https://wa.me/918007189868' };

// Search words clinic owners actually type (YouTube and Google suggestions, 25 Oct 2026): "ai for dentists",
// "ai automation for clinics", "patient follow up", "reduce no shows", "how to get more dental patients",
// "claude for dentists". The title leads with them; the brand comes last.
// Owner 2026-10-29: the masterclass is for EVERY clinic owner (dental, skin, any clinic), as in the ad
// "For clinic owners · Dental · Skin · Every clinic". Dental appears only as an example, next to a skin one.
// Never "free" on these pages (owner 2026-10-26).
const SEO = {
  title: 'AI for Clinic Owners: Patient Follow-Up Masterclass | AUM AI',
  description:
    `The Full Chair Method masterclass, about an hour: run patient follow-ups with AI and Claude, reduce no-shows and get more patients from your own list. For every clinic owner: dental, skin and every other clinic. Join for ${ENTRY_LABEL}.`,
  keywords:
    'AI for clinics, AI for clinic owners, patient follow-up, reduce no-shows, clinic WhatsApp follow-up, Claude for clinics, AI for dentists, AI for dermatologists, skin clinic patient follow-up, dental clinic patient follow-up, The Full Chair Method, 4C Framework',
  // The link preview when the page is shared (WhatsApp, Facebook, LinkedIn): 1200×630, no "free", no price.
  shareImage: '/og/masterclass-full-chair-method-1200x630.png',
  shareImageAlt: 'The Full Chair Method masterclass, AI for clinic owners: dental, skin, every clinic. About an hour.',
};

// The full masterclass, right under the title (owner 2026-10-26). It plays in place for a member who
// can watch (joined for ENTRY_LABEL, or has the kit). The video URL comes ONLY from /me.video (owner
// 2026-10-30: the YouTube id never appears in the public website). Duration is the final cut's.
const VIDEO = {
  eyebrow: 'The masterclass',
  title: 'AI for clinic owners: run patient follow-ups with Claude',
  intro:
    'The full masterclass, about an hour. See how clinics of every kind, dental, skin and more, use AI and a Google Sheet to answer every enquiry, reduce no-shows, bring patients back for advised treatment and recalls, and do it all in about 30 minutes every morning.',
  name: 'AI for Clinic Owners: Run Patient Follow-Ups with Claude',
  description:
    'The Full Chair Method masterclass by Jayesh Chaudhari, AUM AI: how clinic owners (dental, skin and every other clinic) run patient follow-ups with AI and Claude on a Google Sheet, reduce no-shows and get more patients from their existing list, with the 4C Framework (Convert, Confirm, Care, Come back).',
  duration: 'PT1H5M14S',
  kitNote: 'Want to start tomorrow morning? The kit has everything you see in the video, ready to use.',
  soon: 'The video will appear here soon. Please check again later today.',
};

// Step 1 of 2, where the video is (owner 2026-10-26; 2026-10-30: then the pay step). Four fields,
// one button. An email that already has an account gets the code step instead (the site backend
// never signs an existing account in from this form).
const GATE = {
  step: 'Step 1 of 2 · Your details',
  title: 'Watch the masterclass',
  blurb: (l = ENTRY_LABEL) => `Tell us who you are. Next, join for ${l}, once, and the video plays right here.`,
  button: 'Continue',
  busy: 'One moment…',
  codeTitle: 'You already have an account',
  codeBlurb: 'We have emailed a 6-digit code to',
  codeHelp: 'It can take a minute. Check Spam or Promotions too.',
  codeButton: 'Open the masterclass',
  consent: 'We may message you on WhatsApp about the masterclass and the kit. No spam; reply STOP any time.',
  signedIn: 'You are signed in.',
};

// Step 2 of 2: the pay step for a signed-in member who cannot watch yet (owner 2026-10-30).
// Same fields and checks as the kit: city, clinic type, the non-refundable tick.
const JOIN = {
  step: 'Step 2 of 2 · Join',
  title: (l = ENTRY_LABEL) => `Join for ${l}`,
  blurb: (l = ENTRY_LABEL) => `One payment of ${l}, and the whole masterclass plays right here, as often as you like.`,
  qa: 'Includes 24×7 Q&A on WhatsApp',
  kit: (total = PRICE_LABEL, more = UPGRADE_LABEL) => `The kit is ${total} in total: ${more} more after you join.`,
  button: (l = ENTRY_LABEL) => `Pay ${l}`,
  busy: 'Opening the payment…',
  help: 'Secure payment by Razorpay: UPI, card or net banking. The video plays the moment the payment is confirmed.',
  confirmTitle: 'Payment received. We are confirming it',
  confirmHelp: 'You do not need to pay again. The video plays as soon as the payment is confirmed.',
  closed: 'Joining is not open right now',
  closedText: 'Please check again later. Questions? WhatsApp us any time.',
};

// The hero carries the "30 minutes every morning" ad (owner 2026-10-21; 10 → 30
// minutes and no "guarantee", owner 2026-10-22; script in
// docs/masterclass/ads/ad-script-10-minutes-999.md in the EHR project).
const HERO = {
  eyebrow: 'Clinic owners, get ready to be mind-blown',
  title: 'Run all your follow‑ups in 30 minutes!',
  titleLead: 'Run all your follow‑ups in ',
  titleAccent: '30 minutes',
  titleTail: '!',
  promise:
    'Every new enquiry. Every patient with an appointment. Every patient who missed one. Every “I’ll let you know”. Every treatment left half-done. Every patient who hasn’t come back in a year.',
  who: 'Feels like too much to do? You can do all of it in about 30 minutes every morning. In The Full Chair Method masterclass, I show you exactly how. For clinic owners (dental, skin or any other clinic), and the manager or front-desk lead who runs it with you.',
  // About an hour · Join ₹299 · Kit ₹999 in total · Lifetime access (owner 2026-10-30). `entry` / `price`
  // mark the facts whose label the page swaps for the backend's live one.
  facts: [
    { b: 'About an hour', t: 'watch any time, right here' },
    { b: `Join for ${ENTRY_LABEL}`, t: 'once, with 24×7 Q&A on WhatsApp', entry: true },
    { b: `Kit ${PRICE_LABEL} in total`, t: 'every download; your joining fee counts towards it', price: true },
    { b: ACCESS, t: 'to the video, and to the kit' },
  ],
  note: 'Not a theory session. You see every system running, then a whole morning’s follow-ups done on screen, against the clock.',
};

const PROBLEM = {
  title: 'The patients you lose never show up in any report, so nobody counts them',
  intro:
    'Every month your clinic pays to get patients: ads, Google, referrals, and years of good work. And every month some of them quietly walk away.',
  leaks: [
    'The call nobody picked up at 11:40, because the desk was busy with a patient.',
    'The WhatsApp enquiry about implants or a laser treatment that got its reply the next evening.',
    'The patient who didn’t turn up on Thursday, and nobody called to rebook.',
    '“I’ll think about it.” The treatment you advised, never started.',
    'The root canal done and the crown never fitted; the skin course stopped after two sessions.',
    'The patient who came once for a cleaning or a facial and never came back.',
    'Happy patients who never left a Google review, because nobody asked.',
  ],
  numbersTitle: 'What we see in real clinics',
  numbers: [
    { n: '1 in 9 to 1 in 6', t: 'booked patients didn’t turn up, at a clinic that sends no reminders.' },
    { n: 'About half', t: 'of the patients who missed or cancelled hadn’t booked again within a month (Clinic A, before a system).' },
    { n: '289 patients', t: 'were advised a treatment in six weeks and hadn’t started it (Clinic A).' },
    { n: 'About 1 in 3', t: 'root canals had no crown fitted afterwards (Clinic A).' },
  ],
  numbersNote: 'Measured from the clinics’ own records. We don’t name a clinic without its permission.',
  closeA: 'These patients aren’t lost.',
  closeB: 'They’re waiting for someone to follow up.',
  closeC: 'In the masterclass you count them, in rupees, for your own clinic, and then set up the systems that bring them back.',
};

// Pictures (public/images/masterclass/). The people pictures are illustrations made
// with Google's Gemini image model (owner 2026-10-19): never caption them as a real
// clinic, doctor or patient. The workbook and Aumy pictures are real
// screenshots of the course kit (sample rows) and of Aumy on our demo clinic.
const IMG = {
  hero: { src: '/images/masterclass/hero.webp', w: 1344, h: 768, alt: 'Illustration: a doctor at her clinic reception, calm, with a full waiting room behind her' },
  leaks: { src: '/images/masterclass/leaks.webp', w: 1184, h: 864, alt: 'Illustration: a phone full of unanswered messages on a reception desk, an empty treatment chair behind it' },
  team: { src: '/images/masterclass/team.webp', w: 1344, h: 768, alt: 'Illustration: a clinic team reviewing a green, orange and red weekly scorecard on a screen' },
  workbook: { src: '/images/masterclass/workbook-advised.webp', w: 1296, h: 440, alt: 'The Advised to Accepted workbook in Excel, with sample patients, follow-ups and a KPI status column in green, orange and red' },
  kpis: { src: '/images/masterclass/workbook-kpis.webp', w: 1377, h: 536, alt: 'The KPIs and owners tab of the Owner Weekly Scorecard: one KPI and one owner for every system' },
  aumy: { src: '/images/masterclass/aumy-tasks.webp', w: 1400, h: 172, alt: 'Aumy on a demo clinic: replies that need a person become tasks for the desk, such as Book these patients and Call back' },
};

// Before and after: each leak, and the system from the masterclass that closes it.
const BEFORE_AFTER = {
  title: 'The same week, before and after the systems',
  intro: 'Every leak has a system in the masterclass that closes it. Here is what changes.',
  rows: [
    { before: 'The 11:40 call rings out. The patient calls the next clinic.', after: 'A WhatsApp within 5 minutes, a call back within 4 opening hours.', sys: 'Every Call Answered' },
    { before: 'The implant or laser enquiry gets one reply, then silence.', after: 'Fast answers to the three fears, and useful follow-ups for 2 to 4 weeks.', sys: 'The Decision Path' },
    { before: 'Thursday’s patient doesn’t turn up. Nobody notices until evening.', after: 'A yes the day before, a nudge at 1 pm, a reminder on the day.', sys: 'Confirm Twice, Remind Once' },
    { before: 'The no-show is never called again.', after: 'Kind messages and a way back within the week.', sys: 'Same-Week Rebook' },
    { before: '“I’ll think about it”, and the plan is forgotten.', after: 'The advice in writing, the real worry answered, two touches in 14 days.', sys: 'Advised to Accepted' },
    { before: 'The root canal is done; the crown never happens. The skin course stops halfway.', after: 'Every half-done treatment on a list, followed until the last step.', sys: 'Finish Line' },
    { before: 'Last year’s patients drift to another clinic.', after: 'The likeliest to return are asked back first, each with their own reason.', sys: 'Smart Comebacks' },
  ],
};

// The 4C Framework: 8 systems on 3 foundations, in the order a patient moves through the clinic.
const STAGES = [
  {
    c: 'Convert', line: 'An enquiry becomes a booking.', img: '/images/masterclass/convert.webp', alt: 'Illustration: a receptionist replying to a patient on WhatsApp',
    items: [
      { n: '1', name: 'The Decision Path', t: 'Turn big-treatment enquiries (implants, aligners, laser and skin treatments) into bookings: reply fast, answer the three fears (pain, money, regret), and stay useful for the 2 to 4 weeks the patient takes to decide.' },
      { n: '2', name: 'Every Call Answered', t: 'Count your missed calls. Every missed caller gets a WhatsApp within 5 minutes and a call back within 4 opening hours.' },
    ],
  },
  {
    c: 'Confirm', line: 'The booking becomes a patient in the chair.', img: '/images/masterclass/confirm.webp', alt: 'Illustration: an appointment calendar with every day ticked, and WhatsApp confirmations on a phone',
    items: [
      { n: 'F1', foundation: true, name: 'Digital intake & registration', t: 'Every new patient’s details, history and consent complete before they sit in the chair.' },
      { n: '3', name: 'Confirm Twice, Remind Once', t: 'Ask for a yes at 9:30 the day before, nudge only those who didn’t reply at 1 pm, and remind once, two hours before.' },
      { n: '4', name: 'Same-Week Rebook', t: 'Every no-show and cancellation gets kind messages and a way back within the week, instead of being forgotten.' },
    ],
  },
  {
    c: 'Care', line: 'The treatment is accepted, and finished.', img: '/images/masterclass/care.webp', alt: 'Illustration: a doctor explaining a treatment plan to a patient on a tablet',
    items: [
      { n: 'F2', foundation: true, name: 'Visit documentation', t: 'Every visit written down the same day: advised, planned, done, declined, and the next step. Nobody can follow up what was never written down.' },
      { n: '5', name: 'Advised to Accepted', t: '“I’ll think about it” gets an answer: the doctor’s advice in writing, the real worry answered, and two touches in 14 days.' },
      { n: 'F3', foundation: true, name: 'Lab order management', t: 'Every lab case tracked from sent to received, and the patient booked within a day of it arriving.' },
      { n: '6', name: 'Finish Line', t: 'Half-done treatment gets finished: the crown after the root canal, the last aligner, the remaining skin sessions.' },
      { n: '7', name: 'BIT: Be In Touch', t: 'A check-in in the doctor’s name within 2 days of the visit, about the procedure they had, and what to do with every reply.' },
    ],
  },
  {
    c: 'Come back', line: 'The patient returns when they’re due.', img: '/images/masterclass/comeback.webp', alt: 'Illustration: a patient walking back into the clinic, welcomed at the desk',
    items: [
      { n: '8', name: 'Smart Comebacks', t: 'Bring lapsed patients back, starting with the ones most likely to return, in small batches, each with their own reason to come.' },
    ],
  },
];

const LEARN = {
  title: 'What you’ll learn: the 4C Framework',
  intro:
    'The method follows a patient through your clinic in four stages: Convert, Confirm, Care and Come back. Eight systems across the four, standing on three foundations.',
  extras: [
    { h: 'One owner, one KPI, one weekly score', t: 'You write a name against every system and set the KPI it is measured on. Then you read the scores in 15 minutes every Monday: green from 90%, orange from 75%, red below. For every red, you open the rows and see which patient was missed, and why.' },
    { h: 'Your monthly leak, in rupees', t: 'You work it out during the class on the Leak tab of your Clinic Master Sheet, from three numbers you already know. The sheet shows your weakest C, and that is where you start.' },
    { h: 'WhatsApp through Meta, honestly', t: 'What it really takes to connect WhatsApp to software yourself: Meta’s limits, approved templates, the cost per message and the developer work, so you can decide with open eyes.' },
  ],
};

const WAYS = {
  title: 'Every system, three ways. You choose.',
  intro: 'After each system you see three ways to run it, side by side. Pick the one your clinic will actually keep doing.',
  items: [
    { h: 'By hand', t: 'With the Clinic Master Sheet, a phone and your receptionist. The sheet shows who is due today; you send and call. It works, and you see exactly what it takes.' },
    { h: 'With Claude', t: 'Connect the Clinic Master Sheet to claude.ai through Google Drive, and Claude reads today’s Due tabs and writes the patient messages, click-to-send WhatsApp links and your weekly KPI report. Two honest limits: someone still sends every message, and Claude only knows what is in the sheet.' },
    { h: 'Running on its own', t: 'The same system inside clinic software, shown on a demo clinic with our own software, Aumy. Shown, not sold: there is no offer in the masterclass.' },
  ],
  noSoftware: 'You don’t need to buy any software. The first two ways need only Excel or Google Sheets, and a Claude account if you want Claude’s help.',
  buildTitle: 'Then: about 30 minutes every morning',
  build: [
    'Open Claude and type one line: “Today’s work”.',
    'Every patient due today, from every system, appears on one page with the message ready.',
    'Press Send on WhatsApp for each one, or call.',
    'Tell Claude what you sent: your sheet and your weekly scorecard update themselves.',
  ],
  buildNote: 'Most days it takes about half an hour. On the busiest days, a little longer.',
};

const KIT = {
  title: 'What you get',
  intro: `Join for ${ENTRY_LABEL}, once: the masterclass plays on this page, with 24×7 Q&A on WhatsApp. The kit is ${PRICE_LABEL} in total, paid once, and unlocks every download: ${UPGRADE_LABEL} more after you join, or ${PRICE_LABEL} straight away, watching included.`,
  items: [
    { h: 'The masterclass video', t: `About an hour. Watch it in one sitting or a stage at a time, as often as you like. Your access never ends.` },
    { h: 'The Clinic Master Sheet', t: 'Type each patient and visit once, and the sheet works out who is due for what today. A tab for every system and foundation, the Today list, the weekly Scorecard, and every rule and message we use, in English, Hindi and Marathi. Opens in Excel or Google Sheets.' },
    { h: 'The weekly Scorecard', t: 'A tab in the Clinic Master Sheet: one owner and one KPI per system, week by week, in green, orange or red, with the list of what was missed last week. Your 15 minutes every Monday.' },
    { h: 'The Claude skill file', t: 'Every framework, question bank and message script from the masterclass, so Claude writes your patient messages, call scripts and weekly KPI report from your own sheets. With a short guide: seven prompts to try first, and the Front desk screens.' },
    { h: 'Message scripts in English, Hindi and Marathi', t: 'In the skill file: every follow-up message, the question banks for implants, aligners, root canal with crown and smile makeover, the missed-call script, and the doctor’s check-ins by procedure.' },
    // The leak is worked out in the sheet itself (owner 2026-10-22: no PDF, no paper copy).
    { h: 'The Leak tab', t: 'A tab in the Clinic Master Sheet: your monthly leak in rupees, box by box, from three numbers you already know. You fill it in during the class, and the sheet shows your weakest C.' },
    { h: '24×7 Q&A on WhatsApp: 80071 89868', t: 'Included when you join. Ask any question about the method, the Clinic Master Sheet or the Claude skill, any time.', wa: true },
    { h: 'Bonus video: get found on Google', t: 'About 7 minutes: asking every patient for a Google review the right way, what to post on your Google profile and website each week, and how to reply to every review.' },
  ],
};

const EXPECT = {
  title: 'What to expect, and how to prepare',
  items: [
    { h: 'What you need', t: 'A laptop or tablet to watch, and Google Sheets or Excel for your Clinic Master Sheet. Optional: a Claude account at claude.ai, to use the skill file.' },
    { h: 'Three numbers, from memory', t: 'Your average treatment value, how many appointments you book in a week, and how many new enquiries you get in a week. A best guess is fine.' },
    { h: 'Bring the person who will run it', t: 'Watch with your manager or front-desk lead. The front desk owns most systems; the doctor owns visit notes, advised treatment, the finish line and the check-ins.' },
    { h: 'After the video', t: 'Start with your weakest C: one system, one owner, one week. Then add the next system, a week at a time.' },
  ],
};

const FOR_WHO = {
  title: 'Who it’s for',
  yes: [
    'You own a clinic: dental, skin, aesthetic or any other clinic that runs on appointments.',
    'You run the clinic yourself and want follow-ups, WhatsApp and calls handled without hiring more people.',
    'You’re the manager or front-desk lead who will run these systems.',
    'You want simple systems your team keeps doing every week, with a number that shows whether they did.',
  ],
  no: [
    'You want more leads or ad tricks. This is about the patients you already have.',
    'You want clinical training. This is about everything around the chair.',
    'You want a software demo.',
  ],
  skinNote: 'Not a dental clinic? Many examples come from dental clinics, where we measured them. Running a skin clinic? Set your clinic type in the Clinic Master Sheet and its treatment lists and check-ins switch to skin. For every clinic, the eight systems work the same way: enquiries, confirmations, treatment plans, the day-after check-in and bringing patients back.',
};

const TRAINER = {
  title: 'Your trainer',
  name: 'Jayesh Chaudhari',
  role: 'Founder, AUM AI (Aumy)',
  bio: [
    '18 years in healthcare technology: clinic workflows, the revenue cycle, compliance and AI. He built Aumy after working closely with dental clinics in the USA, Dubai and India.',
    'His team builds and runs these follow-up systems inside dental clinics every day. Every number in the masterclass comes from those clinics’ own records, shown as Clinic A and Clinic B.',
  ],
};

const FAQS = [
  { q: 'How do I watch it?', a: `Type your name, clinic, WhatsApp number and email at the top of this page, then join for ${ENTRY_LABEL}, once, by UPI, card or net banking. The video plays right there, as often as you like, and you can ask us questions 24×7 on WhatsApp.` },
  { q: 'What does it cost?', a: `${ENTRY_LABEL}, once, to watch the masterclass, with 24×7 Q&A on WhatsApp. The kit (the Clinic Master Sheet, the Claude skill file, the Prompt Pack, the slides and the guides) is ${PRICE_LABEL} in total, also paid once: ${UPGRADE_LABEL} more after you have joined, or ${PRICE_LABEL} straight away, which includes watching. Nothing renews.` },
  { q: 'When can I watch it?', a: `Any time after you join. It runs about an hour, so you can watch when it suits you, pause to fill in your Clinic Master Sheet, and watch again any time: you have lifetime access.` },
  { q: 'How long do I have access?', a: 'For life. Once you join, your access has no end date, and neither does the kit once you buy it. Watch the video again whenever you like; the Clinic Master Sheet and the skill file are yours to keep.' },
  { q: 'What language is it in?', a: 'Simple English. The message scripts in the skill file come in English, Hindi and Marathi.' },
  { q: 'I don’t run a dental clinic. Is this for me?', a: 'Yes. It is for every clinic owner: dental, skin, aesthetic or any other clinic. Many examples come from dental clinics, where we measured them. Running a skin or aesthetic clinic? Set your clinic type in the Clinic Master Sheet and its treatment lists and check-ins switch to skin. For every clinic, the eight systems work the same way: enquiries, confirmations, treatment plans, the day-after check-in and bringing patients back.' },
  { q: 'Do I need Aumy or any other software?', a: 'No. The Clinic Master Sheet opens in Excel or Google Sheets, and Claude is optional. Aumy appears only as one of the three ways, on a demo clinic. There is nothing to buy in the masterclass.' },
  { q: 'Do I need a Claude account?', a: 'Only if you want Claude’s help. Everything works by hand with the Clinic Master Sheet. With a Claude account at claude.ai, you upload the skill file and connect the sheet through Google Drive, and Claude writes the messages, call scripts and weekly KPI report.' },
  { q: 'How do I get the kit, and how do I sign in?', a: `Sign in with your email: we send a 6-digit code, and there is no password. The kit is ${PRICE_LABEL} in total, by UPI, card or net banking through Razorpay. Joined already? Press Unlock the kit on your masterclass page and pay ${UPGRADE_LABEL} more. Or press Get the kit on this page and pay ${PRICE_LABEL}, watching included. Every download opens the moment the payment is confirmed.` },
  { q: 'Can I get a refund?', a: `${MC_REFUND.JOIN_MONEY_BACK} ${MC_REFUND.NON_REFUNDABLE} ${MC_REFUND.DUPLICATE}` },
  { q: 'Is there a Q&A?', a: `Yes, 24×7 on WhatsApp: ${WHATSAPP.display}, included when you join. Ask anything about the method, the Clinic Master Sheet or setting up Claude.`, wa: true },
];

const FINAL = {
  title: 'Start with your weakest C',
  text: 'Somewhere this week, a patient is deciding whether to come back. Make sure someone is there when they do.',
  questions: `Questions before you start? WhatsApp ${WHATSAPP.display}`,
};

// The short version above the payment form on /masterclass/register: the "pay straight
// away" path (owner 2026-10-25). The masterclass itself plays on the masterclass page.
const REGISTER = {
  title: CTA.kitOnce,
  lead: `Everything that runs the 4C Framework in your clinic, with lifetime access, and watching the masterclass is included. One payment of ${PRICE_LABEL}, and the video and every download open.`,
  points: [
    'The masterclass video, about an hour, to watch as often as you like.',
    'The Clinic Master Sheet: type each patient once, and it shows who is due for what today. It works out your monthly leak on its Leak tab.',
    'The Claude skill file and its guide: Claude writes your patient messages, call scripts and weekly KPI report from your own sheet.',
    'The Prompt Pack, and every slide from the class as a PDF.',
    `24×7 Q&A on WhatsApp: ${WHATSAPP.display}.`,
  ],
  // A member who joined already watches and has the Q&A (owner 2026-10-30): sell only the kit, for the difference.
  leadUpgrade: (more = UPGRADE_LABEL, total = PRICE_LABEL, entry = ENTRY_LABEL) => `You already watch the masterclass. The kit is ${more} more: ${total} in total, and your ${entry} counts towards it. One payment, and every download opens, for life.`,
  pointsKitOnly: (points) => points.filter((p) => !/masterclass video|Q&A on WhatsApp/.test(p)),
  watchLink: `Just want to watch? Join for ${ENTRY_LABEL} on the masterclass page`,
};
const REGISTER_SEO_DESCRIPTION =
  `Get The Full Chair Method kit for ${PRICE_LABEL}, once: the Clinic Master Sheet, the Claude skill file, the Prompt Pack and the slides, with the masterclass (about an hour) included.`;

// The sign-in page (owner 2026-10-25): two paths on one screen. Same words in prerender.js.
const SIGNIN = {
  title: 'Watch the masterclass',
  sub: `About an hour. Join for ${ENTRY_LABEL}, once, to watch, with 24×7 Q&A on WhatsApp. The kit is ${PRICE_LABEL} in total.`,
  signInTitle: 'Sign in',
  signInBlurb: 'Already have an account? Type your email and we will send you a 6-digit code. There is no password.',
  createTitle: 'Create your account',
  createBlurb: `Tell us who you are, then join for ${ENTRY_LABEL}, once, and the whole masterclass plays, as often as you like. No password.`,
  createButton: 'Continue',
  // After a payment that did not sign this browser in (backend 2026-10-30): the code sign-in.
  paidSignIn: (email) => `Payment received. Sign in with your email to watch${email ? `: ${email}` : ''}.`,
};

// The members page for a member without the kit (owner 2026-10-25): the video first, then the kit, locked.
const MEMBER = {
  // Owner 2026-10-26: one licence line wherever the masterclass or kit is shown.
  licence: `© ${new Date().getFullYear()} AAUMAI Healthcare Solution Pvt Ltd (AUM AI). Licensed for use in your own clinic only. Not for resale, sharing or reproduction, including by AI tools.`,
  // By access level (owner 2026-10-30). Amounts are the API's labels, passed in.
  welcomeNone: (entry = ENTRY_LABEL) => `Join for ${entry}, once, and the masterclass plays right here, with 24×7 Q&A on WhatsApp.`,
  welcomeWatch: 'Watch the masterclass below, as often as you like.',
  qaLine: 'Questions? Ask us 24×7 on WhatsApp:',
  kitTitle: 'Your kit',
  // A `watch` member pays the difference: "the kit is ₹999 in total; you have paid ₹299".
  kitLeadUpgrade: (more = UPGRADE_LABEL, total = PRICE_LABEL, entry = ENTRY_LABEL) => `Every download below opens for ${more} more: the kit is ${total} in total, and you have paid ${entry}. Yours for life.`,
  kitLead: (total = PRICE_LABEL) => `Every download below opens with one payment of ${total}, watching included. Yours for life.`,
  unlockButton: (label = PRICE_LABEL, upgrade = false) => (upgrade ? `Unlock the kit · ${label} more` : `Unlock the kit · ${label} once`),
  unlocked: 'Your kit is unlocked. Every download below is yours, for life.',
  unlockHelp: 'Secure payment by Razorpay: UPI, card or net banking. Your downloads open the moment the payment is confirmed.',
};

// The Clinic Master Sheet card on the members page (owner 2026-10-21: one sheet
// replaces the 12 workbooks). The Google Sheets settings step is required: without the
// time zone the Today tab shows yesterday's date until about noon IST; without the
// United Kingdom locale dates read month-first (owner 2026-10-21: UK, not India, whose
// locale shows Hindi month names).
const MASTER_SHEET = {
  title: 'Your Clinic Master Sheet',
  short: 'One Clinic Master Sheet for the whole clinic: a tab for every system, today’s to-do list and your weekly scorecard.',
  button: 'Download the Clinic Master Sheet',
  excel: 'It opens in Excel as it is. To use it in Google Sheets, and with Claude:',
  // The real flow, in Google's own labels (v3 flow map, 2026-10-22). Double-clicking an
  // .xlsx in Drive opens only a preview, so step 3 is "Open with". The Calculation tab
  // setting is required too: without it NOW() stands still and time-based lists (the 1 pm
  // nudge) never move on by themselves. The welcome email on the site backend says "seven
  // steps": change both together.
  steps: [
    'Click Download the Clinic Master Sheet above. The file lands in your Downloads folder.',
    'Upload it to Google Drive: on drive.google.com click + New › File upload, choose the file and wait for “Upload complete”.',
    'In Drive, right-click the file › Open with › Google Sheets. (Double-clicking it only opens a preview.)',
    'Click File › Save as Google Sheets. A new copy opens in a new tab, with no .XLSX badge next to its name: work only in that copy.',
    'Click the name at the top left, type Clinic Master Sheet exactly (Claude looks for that name) and press Enter. Back in Drive, right-click the .xlsx › Move to bin, so there is only one.',
    'Click File › Settings. On the General tab: Locale United Kingdom, Time zone (GMT+05:30) Kolkata. On the Calculation tab: Recalculation On change and every minute. Then click Save settings. Dates now read day-first, like 20/10/2026. Skip the time zone and the Today tab shows yesterday’s date until about noon; skip the recalculation and time-based lists, like the 1 pm nudge, don’t update on their own.',
    'Give the sheet a minute to work out its lists. On the Start here tab, Today’s date should show today.',
  ],
  then: 'Then fill the yellow cells on the Start here tab.',
  soon: 'The Clinic Master Sheet will appear here soon. Please check again later today.',
};

// The members page (owner 2026-10-19); the welcome email on the site backend says the same.
const MEMBER_HELP = `Stuck while setting up a system? Ask us 24×7 on WhatsApp: ${WHATSAPP.display}`;

module.exports = {
  TITLE, ENTRY_LABEL, PRICE_LABEL, UPGRADE_LABEL, ACCESS, JOIN, PATHS, isMasterclassPath, CTA, WHATSAPP, SEO, VIDEO, GATE, IMG, HERO, PROBLEM, BEFORE_AFTER, STAGES, LEARN, WAYS, KIT, EXPECT, FOR_WHO, TRAINER, FAQS, FINAL, REGISTER, REGISTER_SEO_DESCRIPTION, SIGNIN, MEMBER, MASTER_SHEET, MEMBER_HELP,
};
module.exports.default = module.exports;
