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
 * `module.exports` on purpose: the prerender script is plain Node.
 */
const MC_REFUND = require('./masterclassRefund');

const TITLE = 'The Full Chair Method';
// Shown until the backend's /price answers; must match MASTERCLASS_PRICE_PAISE on the site backend.
const PRICE_LABEL = '₹599';
const ACCESS_DAYS = 30; // MASTERCLASS_ACCESS_DAYS default on the site backend

const PATHS = { info: '/masterclass', register: '/masterclass/register', signIn: '/masterclass/sign-in', my: '/masterclass/my' };

// Questions go to WhatsApp (owner 2026-10-19).
const WHATSAPP = { display: '80071 89868', link: 'https://wa.me/918007189868' };

const SEO = {
  title: 'The Full Chair Method masterclass for clinic owners | AUM AI',
  description:
    'A 2-hour masterclass for dental and skin clinic owners: the 4C Framework, 8 systems and 3 foundations that bring back the patients you already have. 12 ready workbooks and a Claude skill file, ₹599.',
};

const HERO = {
  eyebrow: 'Masterclass for clinic owners · the 4C Framework',
  title: TITLE,
  promise:
    'Fill your chair from the patients you already have: the enquiry that never booked, the patient who didn’t turn up, the treatment you advised that never started, and the patient who stopped coming.',
  who: 'For dental and skin clinic owners, and the manager or front-desk lead who will run it with you.',
  facts: [
    { b: 'About 2 hours', t: 'watch any time' },
    { b: `${ACCESS_DAYS} days`, t: 'to watch, as often as you like' },
    { b: '12 workbooks', t: 'plus a Claude skill file' },
    { b: PRICE_LABEL, t: 'one payment' },
  ],
  note: 'Not a theory session. After every system you pause for two minutes and set it up for your own clinic.',
};

const PROBLEM = {
  title: 'The patients you lose never show up in any report, so nobody counts them',
  intro:
    'Every month your clinic pays to get patients: ads, Google, referrals, and years of good work. And every month some of them quietly walk away.',
  leaks: [
    'The call nobody picked up at 11:40, because the desk was busy with a patient.',
    'The WhatsApp enquiry about implants that got its reply the next evening.',
    'The patient who didn’t turn up on Thursday, and nobody called to rebook.',
    '“I’ll think about it.” The treatment you advised, never started.',
    'The root canal done, and the crown never fitted.',
    'The patient who came once for a cleaning and never came back.',
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
// clinic, doctor or patient. The workbook, worksheet and Aumy pictures are real
// screenshots of the course kit (sample rows) and of Aumy on our demo clinic.
const IMG = {
  hero: { src: '/images/masterclass/hero.webp', w: 1344, h: 768, alt: 'Illustration: a dentist at her clinic reception, calm, with a full waiting room behind her' },
  leaks: { src: '/images/masterclass/leaks.webp', w: 1184, h: 864, alt: 'Illustration: a phone full of unanswered messages on a reception desk, an empty dental chair behind it' },
  team: { src: '/images/masterclass/team.webp', w: 1344, h: 768, alt: 'Illustration: a clinic team reviewing a green, orange and red weekly scorecard on a screen' },
  workbook: { src: '/images/masterclass/workbook-advised.webp', w: 1296, h: 440, alt: 'The Advised to Accepted workbook in Excel, with sample patients, follow-ups and a KPI status column in green, orange and red' },
  kpis: { src: '/images/masterclass/workbook-kpis.webp', w: 1377, h: 536, alt: 'The KPIs and owners tab of the Owner Weekly Scorecard: one KPI and one owner for every system' },
  leak: { src: '/images/masterclass/leak-calculator.webp', w: 900, h: 1273, alt: 'Page 1 of the Clinic Leak Calculator worksheet: three starting numbers and eight boxes, one per leak' },
  aumy: { src: '/images/masterclass/aumy-tasks.webp', w: 1400, h: 172, alt: 'Aumy on a demo clinic: replies that need a person become tasks for the desk, such as Book these patients and Call back' },
};

// Before and after: each leak, and the system from the masterclass that closes it.
const BEFORE_AFTER = {
  title: 'The same week, before and after the systems',
  intro: 'Every leak has a system in the masterclass that closes it. Here is what changes.',
  rows: [
    { before: 'The 11:40 call rings out. The patient calls the next clinic.', after: 'A WhatsApp within 5 minutes, a call back within 4 opening hours.', sys: 'Every Call Answered' },
    { before: 'The implant enquiry gets one reply, then silence.', after: 'Fast answers to the three fears, and useful follow-ups for 2 to 4 weeks.', sys: 'The Decision Path' },
    { before: 'Thursday’s patient doesn’t turn up. Nobody notices until evening.', after: 'A yes the day before, a nudge at 1 pm, a reminder on the day.', sys: 'Confirm Twice, Remind Once' },
    { before: 'The no-show is never called again.', after: 'Kind messages and a way back within the week.', sys: 'Same-Week Rebook' },
    { before: '“I’ll think about it”, and the plan is forgotten.', after: 'The advice in writing, the real worry answered, two touches in 14 days.', sys: 'Advised to Accepted' },
    { before: 'The root canal is done; the crown never happens.', after: 'Every half-done treatment on a list, followed until the last step.', sys: 'Finish Line' },
    { before: 'Last year’s patients drift to another clinic.', after: 'The likeliest to return are asked back first, each with their own reason.', sys: 'Smart Comebacks' },
  ],
};

// The 4C Framework: 8 systems on 3 foundations, in the order a patient moves through the clinic.
const STAGES = [
  {
    c: 'Convert', line: 'An enquiry becomes a booking.', img: '/images/masterclass/convert.webp', alt: 'Illustration: a receptionist replying to a patient on WhatsApp',
    items: [
      { n: '1', name: 'The Decision Path', t: 'Turn implant, aligner and smile-makeover enquiries into bookings: reply fast, answer the three fears (pain, money, regret), and stay useful for the 2 to 4 weeks the patient takes to decide.' },
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
    c: 'Care', line: 'The treatment is accepted, and finished.', img: '/images/masterclass/care.webp', alt: 'Illustration: a dentist explaining a treatment plan to a patient on a tablet',
    items: [
      { n: 'F2', foundation: true, name: 'Visit documentation', t: 'Every visit written down the same day: advised, planned, done, declined, and the next step. Nobody can follow up what was never written down.' },
      { n: '5', name: 'Advised to Accepted', t: '“I’ll think about it” gets an answer: the doctor’s advice in writing, the real worry answered, and two touches in 14 days.' },
      { n: 'F3', foundation: true, name: 'Lab order management', t: 'Every lab case tracked from sent to received, and the patient booked within a day of it arriving.' },
      { n: '6', name: 'Finish Line', t: 'Half-done treatment gets finished: the crown after the root canal, the implant crown, the last aligner.' },
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
    { h: 'Your monthly leak, in rupees', t: 'You work it out on the Leak Calculator as you watch, from three numbers you already know. The biggest box is your weakest C, and that is where you start.' },
    { h: 'WhatsApp through Meta, honestly', t: 'What it really takes to connect WhatsApp to software yourself: Meta’s limits, approved templates, the cost per message and the developer work, so you can decide with open eyes.' },
  ],
};

const WAYS = {
  title: 'Every system, three ways. You choose.',
  intro: 'After each system you see three ways to run it, side by side. Pick the one your clinic will actually keep doing.',
  items: [
    { h: 'By hand', t: 'With its workbook, a phone and your receptionist. It works, and you see exactly what it takes.' },
    { h: 'With Claude', t: 'Attach the workbook in claude.ai and Claude writes the patient messages, call scripts and your weekly KPI report. Two honest limits: someone still sends every message, and Claude only knows what is in the sheet.' },
    { h: 'Running on its own', t: 'The same system inside clinic software, shown on a demo clinic with our own software, Aumy. Shown, not sold: there is no offer in the masterclass.' },
  ],
  noSoftware: 'You don’t need to buy any software. The first two ways need only Excel or Google Sheets, and a Claude account if you want Claude’s help.',
  buildTitle: 'Build it now: 2 minutes after every system',
  build: [
    'Write the name of the person who owns it.',
    'Set the KPI it is measured on, every week.',
    'Fill its first 3 rows from your own clinic.',
    'Write its first message, in your doctor’s name.',
  ],
  buildNote: 'Pause the video if you need longer. By the end, every system and foundation is started in your own clinic.',
};

const KIT = {
  title: 'What you get',
  items: [
    { h: 'The masterclass video', t: `About 2 hours. Watch it in one sitting or a stage at a time, as often as you like for ${ACCESS_DAYS} days.` },
    { h: '12 ready-made workbooks', t: 'One for every system and foundation, plus the Owner Weekly Scorecard. They open in Excel or Google Sheets, with dropdowns built in, the messages ready to copy, Claude prompts, and a “This week” tab that scores the KPI. Sample rows show you how to fill them.' },
    { h: 'The Owner Weekly Scorecard', t: 'One owner and one KPI per system, this week against last week, in green, orange or red. Your 15 minutes every Monday.' },
    { h: 'The Claude skill file', t: 'Every framework, question bank and message script from the masterclass, so Claude writes your patient messages, call scripts and weekly KPI report from your own sheets. With a short guide: five prompts to try first.' },
    { h: 'Message scripts in English, Hindi and Marathi', t: 'In the skill file: every follow-up message, the question banks for implants, aligners, root canal with crown and smile makeover, the missed-call script, and the doctor’s check-ins by procedure.' },
    { h: 'The Clinic Leak Calculator', t: 'A printable worksheet you fill in as you watch: your monthly leak in rupees on the front, the Monday scorecard on the back.' },
    { h: '24×7 Q&A on WhatsApp: 80071 89868', t: 'Ask any question about the method, the workbooks or the Claude skill, any time.', wa: true },
    { h: 'Bonus video: get found on Google', t: 'About 7 minutes: asking every patient for a Google review the right way, what to post on your Google profile and website each week, and how to reply to every review.' },
  ],
};

const EXPECT = {
  title: 'What to expect, and how to prepare',
  items: [
    { h: 'What you need', t: 'A laptop or tablet to watch, Excel or Google Sheets, and the Leak Calculator printed (or any sheet of paper). Optional: a Claude account at claude.ai, to use the skill file.' },
    { h: 'Three numbers, from memory', t: 'Your average treatment value, how many appointments you book in a week, and how many new enquiries you get in a week. A best guess is fine.' },
    { h: 'Bring the person who will run it', t: 'Watch with your manager or front-desk lead. The front desk owns most systems; the doctor owns visit notes, advised treatment, the finish line and the check-ins.' },
    { h: 'After the video', t: 'Start with your weakest C: one workbook, one owner, one week. Then add the next system, a week at a time.' },
  ],
};

const FOR_WHO = {
  title: 'Who it’s for',
  yes: [
    'You own a dental clinic, or a skin or aesthetic clinic.',
    'You run the clinic yourself and want follow-ups, WhatsApp and calls handled without hiring more people.',
    'You’re the manager or front-desk lead who will run these systems.',
    'You want simple systems your team keeps doing every week, with a number that shows whether they did.',
  ],
  no: [
    'You want more leads or ad tricks. This is about the patients you already have.',
    'You want clinical training. This is about everything around the chair.',
    'You want a software demo.',
  ],
  skinNote: 'Running a skin clinic? The examples and workbook lists come from dental clinics. The eight systems work the same way for you: enquiries, confirmations, session plans, the day-after check-in and bringing patients back.',
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
  { q: 'When can I watch it?', a: `Any time. It runs about 2 hours, so you can watch when it suits you, pause for each “Build it now”, and watch again any time in your ${ACCESS_DAYS} days.` },
  { q: 'How long do I have access?', a: `${ACCESS_DAYS} days from your start date, which you see before you pay. Download the workbooks, the skill file and the worksheet in that time; the files are yours to keep.` },
  { q: 'What language is it in?', a: 'Simple English. The message scripts in the skill file come in English, Hindi and Marathi.' },
  { q: 'I run a skin or aesthetic clinic. Is this for me?', a: 'Yes. The examples and workbook lists come from dental clinics, and the eight systems work the same way for a skin clinic: enquiries, confirmations, session plans, the day-after check-in and bringing patients back.' },
  { q: 'Do I need Aumy or any other software?', a: 'No. The workbooks open in Excel or Google Sheets, and Claude is optional. Aumy appears only as one of the three ways, on a demo clinic. There is nothing to buy in the masterclass.' },
  { q: 'Do I need a Claude account?', a: 'Only if you want Claude’s help. Everything works by hand with the workbooks. With a Claude account at claude.ai, you upload the skill file and attach your workbooks, and Claude writes the messages, call scripts and weekly KPI report.' },
  { q: 'How do I pay, and how do I sign in?', a: 'Pay by UPI, card or net banking through Razorpay. Your account is ready the moment the payment is confirmed, and we email you. Sign in with that email: we send a 6-digit code, and there is no password.' },
  { q: 'Can I get a refund?', a: `${MC_REFUND.RULES[0]} ${MC_REFUND.RULES[1]}` },
  { q: 'Is there a Q&A?', a: `Yes, 24×7 on WhatsApp: ${WHATSAPP.display}. Ask anything about the method, the workbooks or setting up Claude.`, wa: true },
];

const FINAL = {
  title: 'Start with your weakest C',
  text: 'Somewhere this week, a patient is deciding whether to come back. Make sure someone is there when they do.',
  questions: `Questions before you register? WhatsApp ${WHATSAPP.display}`,
};

// The short version above the payment form on /masterclass/register.
const REGISTER = {
  lead: 'The 4C Framework: Convert, Confirm, Care, Come back. Eight systems on three foundations that bring back the patients you already have.',
  points: [
    `A masterclass of about 2 hours, to watch for ${ACCESS_DAYS} days.`,
    'After every system, 2 minutes to set it up in your own clinic.',
    '12 ready-made workbooks, the Claude skill file, the Leak Calculator and a bonus Google video.',
    `24×7 Q&A on WhatsApp: ${WHATSAPP.display}.`,
  ],
};
const REGISTER_SEO_DESCRIPTION =
  'Register for The Full Chair Method masterclass for clinic owners: the 4C Framework, 8 systems and 3 foundations, a 2-hour video, 12 workbooks and the Claude skill file.';

// The members page (owner 2026-10-19); the welcome email on the site backend says the same.
const MEMBER_HELP = `Stuck while setting up a system? Ask us 24×7 on WhatsApp: ${WHATSAPP.display}`;

module.exports = {
  TITLE, PRICE_LABEL, ACCESS_DAYS, PATHS, WHATSAPP, SEO, IMG, HERO, PROBLEM, BEFORE_AFTER, STAGES, LEARN, WAYS, KIT, EXPECT, FOR_WHO, TRAINER, FAQS, FINAL, REGISTER, REGISTER_SEO_DESCRIPTION, MEMBER_HELP,
};
module.exports.default = module.exports;
