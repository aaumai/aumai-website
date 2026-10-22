/**
 * Home page: outcomes as a service (owner 2026-10-22: "go back to our old positioning, not module-wise
 * selling … the MAIN page should talk about our framework, systems and outcomes … we are NOT a software
 * vendor"). ONE copy of the words: src/pages/Home.js renders them and scripts/prerender.js writes the same
 * words into the crawler HTML. Edit here, never there.
 *
 * Rules for these words (owner-approved draft, 2026-10-22):
 *   - no module names and no module cards on the home page; the only pointer is one quiet link to /modules;
 *   - every example is labelled "Example"; names, times and fees in examples are made up for illustration
 *     (the strategies' lead line says so). The ONLY real figures: Sterling's 281 of 603 and 26 years, the
 *     clinic figures measured from the clinics' own records (the same ones the masterclass page uses), and
 *     the Google rating (src/data/googleReviews.js);
 *   - no lock-in / cancel-any-time claim, no review-reply counts (not confirmed by the owner);
 *   - message wording comes from The Full Chair Method skill (docs/masterclass/skill/full-chair-method in
 *     the EHR project), shortened; the promises in KPIS are that skill's default KPIs;
 *   - the masterclass is "about 90 minutes" (owner 2026-10-22) and the daily routine "about 30 minutes every morning".
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */

const WHATSAPP_LINK = 'https://wa.me/918007189868?text=' + encodeURIComponent("Hi, I'd like a free audit of my dental clinic.");

// Hero words are the owner's, approved exactly (2026-10-22): the H1, the six "Every…" lines, the close line.
// H1 back to "Stop losing patients." (owner 2026-10-22: "short and powerful"); "dental clinic" stays in the
// eyebrow, the title and the meta for SEO.
const HERO = {
  eyebrow: 'For dental clinic owners · India',
  title: 'Stop losing patients.',
  every: [
    'Every new enquiry, answered.',
    'Every appointment, confirmed.',
    'Every patient who missed one, rebooked.',
    'Every “I’ll let you know”, followed up.',
    'Every treatment left half-done, finished.',
    'Every patient who hasn’t come back in a year, invited back.',
  ],
  close: 'We make sure of it.',
  primary: { label: 'Get a free clinic audit', to: '/growth-audit' },
  whatsapp: { label: 'WhatsApp us · 80071 89868', href: WHATSAPP_LINK },
  proofNumber: '281 of 603',
  proofText: 'appointments at The Sterling Dental Clinic, Delhi, were confirmed by the patients themselves on WhatsApp in the first two weeks.',
};

const PAIN = {
  eyebrow: 'Where clinics lose patients',
  titleA: 'The patients you lose aren’t lost to an ad.',
  titleB: 'They’re lost after they found you.',
  quotes: [
    'The phone rang while I was with a patient. By the time we called back, he’d booked somewhere else.',
    'We answer WhatsApp at eleven at night. Or the next evening.',
    'Tomorrow’s patients were reminded. Three still didn’t come.',
    'She said she’d think about the implant. That was in March.',
    'Root canal done. The crown? He never came back for it.',
    'Thousands of patients in our records. Most haven’t been back in a year.',
  ],
  stats: [
    { n: '1 in 9 to 1 in 6', t: 'booked patients didn’t turn up, every month, at a clinic that sent no reminders.' },
    { n: 'About half', t: 'of the patients who missed or cancelled hadn’t booked again within a month.' },
    { n: '289', t: 'patients advised a treatment in just six weeks still hadn’t started it.' },
  ],
  statsLabel: 'What we see in real clinics.',
  statsSource: 'Measured from the clinics’ own records.',
  close: 'There’s no invoice for a patient who didn’t come, so nobody counts them. We do, and then we fix it, with your team.',
};

const VS = {
  eyebrow: 'Outcomes as a service',
  titleA: 'We’re not a software vendor.',
  titleB: 'We’re answerable for the outcome.',
  lead: 'Most clinic owners have tried software before. It sent some reminders, someone got trained once, and three months later the desk was back to the notebook. The software was never the problem. Nobody owned the work.',
  headVendor: 'A software vendor',
  headUs: 'AUM AI',
  rows: [
    ['Sells you a login and a training video.', 'Sits with your staff until the system runs.'],
    ['You write the messages, or use their generic ones.', 'We bring messages already proven in clinics, rewritten in your doctor’s name and your patients’ language.'],
    ['Done when you’ve paid and logged in.', 'Done when your Monday numbers are green.'],
    ['A support ticket when something breaks.', 'One named person who knows your clinic, on WhatsApp.'],
    ['Gives you features to switch on.', 'Delivers outcomes you can count: visits confirmed, no-shows rebooked, treatments started.'],
    ['“It’s in the product.”', '“It’s done”, or we tell you why not, by patient name.'],
  ],
  // Word for word from their Google reviews (src/data/googleReviews.js).
  quotes: [
    { q: 'Thank you, Jayesh ji, and your team. You were with us at every step.', who: 'Dr Priyanka Giroti', where: 'The Sterling Dental Clinic, New Delhi' },
    { q: 'Jayesh personally sets things up and fixes issues fast.', who: 'Dr Ronak Oswal', where: 'Vinaykia Dental Care, Pune' },
  ],
  closeA: 'Yes, there’s software underneath, and it’s ours. You’re not buying a login.',
  closeB: 'You’re buying the follow-ups getting done.',
};

const HOW = {
  eyebrow: 'How we work with your dental clinic',
  titleA: 'Five steps.',
  titleB: 'Your team, our framework, every week.',
  steps: [
    {
      title: 'We look first: the free clinic audit.',
      body: 'Tell us your clinic and city. Within 24 hours you get your audit on WhatsApp, prepared and checked by a person: where enquiries go unanswered, where visits go empty, what’s waiting to be finished.',
      exTag: 'Real example',
      ex: 'At one clinic we work with, its own records showed 289 patients advised a treatment in just six weeks who still hadn’t started it. Nobody had counted them, because nobody had sent them an invoice.',
    },
    {
      title: 'We build your clinic’s plan.',
      body: 'We pick the systems your clinic needs first and write every message in your doctor’s name, in English, Hindi or Marathi, with your doctor’s own lines. We never use a scare line the doctor didn’t say.',
      exTag: 'Example',
      ex: 'Dr Shah approves one line for implant patients who are waiting: “Wait, and the bone shrinks and the teeth beside the gap start to tilt in.” It goes only to patients she says it fits.',
    },
    {
      title: 'We set it up with your staff.',
      body: 'We sit with your front desk, give every system one owner, and run the first days together. No front desk? We work with whoever answers the phone, often that’s you. Your team does less, not more.',
      pull: { q: 'My team, who aren’t tech people, picked it up quickly.', who: 'Dr Priyanka Giroti' },
      exTag: 'Example',
      ex: 'Rekha at the desk owns confirmations and rebooking. Dr Shah owns advised treatment. Each name goes on the Monday page.',
    },
    {
      title: 'We run it and tune it every week.',
      body: 'We read the replies, watch what patients answer and what they ignore, and change the wording. At the start, nothing goes to a patient until your team has seen it.',
      exTag: 'Example',
      ex: 'If patients keep asking “where do I park?”, the map link and a parking line go into the two-hour reminder that same week.',
    },
    {
      title: 'You read the numbers every Monday.',
      body: 'One page, one score per system, in green, orange or red. Every red opens to the patient names behind it. Fifteen minutes.',
      exTag: 'Example',
      ex: '“Rebook was 60%” teaches you nothing. “Anjali missed Thursday, message two never went, and nobody called her” tells you exactly what to fix, in a minute.',
    },
  ],
};

// The 4C Framework (The Full Chair Method). The outcome lines carry what the old home hero said per product,
// as outcomes for the clinic (owner 2026-10-22: no product names on home).
const FOURC = {
  eyebrow: 'The Full Chair Method',
  titleA: 'The 4C Framework.',
  titleB: 'Eight systems, in the order a patient moves through your clinic.',
  lead: 'Every patient goes through four stages. Each stage has its systems, and each system has one owner and one weekly number. This is the framework we run in every clinic we work with.',
  stages: [
    {
      c: 'Convert', job: 'An enquiry becomes a booking.',
      systems: [
        ['The Decision Path', 'Every enquiry answered fast, then one useful message at a time for 2–4 weeks. Never “book now” on repeat.'],
        ['Every Call Answered', 'Every call picked up, day and night. Every missed caller gets a WhatsApp within 5 minutes.'],
      ],
      outcomeB: 'Enquiries that book.', outcome: 'Every WhatsApp answered in seconds; every ad enquiry followed up until it books or says no.',
    },
    {
      c: 'Confirm', job: 'The booking becomes a patient in the chair.',
      systems: [
        ['Intake before the visit', 'The form filled on their phone before they arrive.'],
        ['Confirm Twice, Remind Once', 'A yes asked the morning before, a 1 pm nudge only to those who didn’t reply, one reminder 2 hours before.'],
        ['Same-Week Rebook', 'Every no-show and cancellation offered two real slots within the week.'],
      ],
      outcomeB: 'Fewer empty chairs.', outcome: 'Visits confirmed the day before; no-shows rebooked.',
    },
    {
      c: 'Care', job: 'The treatment is accepted and finished.',
      systems: [
        ['Same-day visit notes', 'Done, advised and next sitting, written on the day.'],
        ['Advised to Accepted', '“I’ll think about it” becomes a decision, with the cost written out.'],
        ['Lab cases tracked', 'Chased the day before; the patient booked the day the work arrives.'],
        ['Finish Line', '“Your crown is the last step”, with two slots.'],
        ['Be In Touch', 'A check-in the day after, in the doctor’s name. Problems caught early.'],
      ],
      outcomeB: 'Advised treatment started, started treatment finished.', outcome: '',
    },
    {
      c: 'Come back', job: 'The patient returns when due.',
      systems: [
        ['Smart Comebacks', 'The likeliest patients first, in small batches, each with their own reason.'],
        ['Google reviews', 'Asked at the right moment, and every review replied to.'],
      ],
      outcomeB: 'Patients back on time,', outcome: 'and a Google profile that keeps growing.',
    },
  ],
  under: 'One system holds it together: appointments, records, billing and every message in one place, so nothing falls between tools.',
};

// Seven strategies, each with an example. `chat`: [who, text, time] where who is 'in' (patient), 'out'
// (clinic) or 'sys' (a note); `note` on an out message marks an example fee. `ba`: before/after instead.
const STRATEGIES = {
  eyebrow: 'The strategies inside',
  titleA: 'What we actually say to your patients,',
  titleB: 'and why it works.',
  lead: 'Seven of the strategies we use every day, each with an example. Names, times and fees in the examples are made up for illustration.',
  items: [
    {
      c: 'Convert', name: 'Small Yeses', alt: 'the yes-ladder',
      body: 'A patient asking about an implant isn’t buying today. Answer the question first, then ask small questions they can only say yes to, about their life rather than their tooth. Make the ask last, and only once.',
      why: 'Every yes makes the next one easier, and the patient says the reason out loud, so it becomes theirs.',
      who: 'Rohan', tag: 'Example · WhatsApp',
      chat: [
        ['in', 'implant cost?', '9:52 pm'],
        ['out', 'Hi Rohan, at our clinic it’s ₹35,000–45,000 including the crown and follow-up visits. Is it the lower back tooth that was removed last year?', '9:53 pm', 'example fee'],
        ['in', 'yes', '9:55 pm'],
        ['out', 'Are you chewing mostly on the other side now?', '9:55 pm'],
        ['in', 'ya, for months', '9:58 pm'],
        ['out', 'Would a one-minute video of how it’s placed help?', '9:58 pm'],
        ['in', 'sure send', '10:01 pm'],
        ['out', '▶ How an implant is placed · 1:02. Whenever you’re ready, Dr Shah can keep 15 minutes to check if the bone is enough. No need to decide anything that day.', '10:01 pm'],
        ['in', 'Saturday morning possible?', '10:04 pm'],
      ],
    },
    {
      c: 'Convert', name: 'The Decision Path',
      body: 'A big treatment hides three fears: pain, money and regret. The patient asks family and compares two or three clinics. Most clinics answer once and take the silence as a no. We stay useful through the decision instead: six messages over thirty days, and they stop the moment the patient replies.',
      why: 'The clinic that stays useful during those weeks is the one they choose.',
      tag: 'Example · an aligner enquiry from Instagram',
      ba: {
        before: 'One reply the next evening: “Ma’am please visit for consultation.” Then silence.',
        after: [
          ['Minute 0', 'Her question answered first. “Can people see them?” Hardly; most people at work won’t notice.'],
          ['Day 1', '“Most patients considering aligners ask us four things…”'],
          ['Day 3', '“Is there an occasion coming up you’d like to smile openly at?” Priya: “My sister’s wedding in February.”'],
          ['Day 7', 'One small yes: a preview of how her smile could look.'],
          ['Day 9', 'Priya asks for a Saturday slot. A person takes over.'],
        ],
      },
    },
    {
      c: 'Convert', name: 'Every Call Answered',
      body: 'Calls come in bunches: at 11 am when the waiting room is full, at lunch, after 8 pm. A patient with a toothache calls the next clinic on Google. So every call is answered, by your desk or by an AI receptionist when the desk is busy or closed, and every missed caller hears from you within five minutes.',
      why: 'After hours, the AI receptionist answers the call itself, and the desk gets one line in the morning: who called, what they wanted, what was promised.',
      who: 'Mr Iyer', tag: 'Example · WhatsApp',
      chat: [
        ['sys', '11:40 am · missed call. The desk is with a walk-in.'],
        ['out', 'Hi, this is the clinic. Sorry we missed your call just now. How can we help? Reply here, or tell us a good time and we’ll call you back.', '11:43 am'],
        ['in', 'Tooth pain since last night, lower left side', '11:47 am'],
        ['out', 'I’m sorry you’re in pain. Dr Shah can see you at 4:30 today. Shall I keep it for you?', '11:48 am'],
        ['in', 'Yes please', '11:48 am'],
      ],
    },
    {
      c: 'Confirm', name: 'Confirm Twice, Remind Once',
      body: 'A reminder alone doesn’t make anyone commit. Asking for a reply does. A “can’t come” the day before is a slot you can fill. A no-show is one you can’t.',
      why: 'Tuesday 11:00 is free a day early, and the desk fills it.',
      who: 'Sunita', tag: 'Example · Monday',
      chat: [
        ['out', 'Hi Sunita, your appointment with Dr Shah is tomorrow at 11:00 am. Please reply YES to confirm, or tell us if you need another time.', '9:30 am'],
        ['sys', 'No reply by 1 pm'],
        ['out', 'Just checking you’re okay for tomorrow at 11:00. A quick YES helps us keep your chair ready.', '1:00 pm'],
        ['in', 'Can’t tomorrow, office meeting. Thursday?', '1:20 pm'],
        ['out', 'No problem, Sunita. Dr Shah has Thu 10:30 am or 5:00 pm. Which suits you better?', '1:21 pm'],
        ['in', '5 pm', '1:24 pm'],
      ],
    },
    {
      c: 'Confirm', name: 'Same-Week Rebook',
      body: 'A patient who missed one visit and heard nothing often never comes back. So we send a kind message the same day, two real slots on day two, and a call on day four. We never scold, and we always check the diary first.',
      why: 'Choosing between two times is easier than “when are you free?”',
      who: 'Anjali', tag: 'Example · no-show',
      chat: [
        ['sys', 'Thursday evening'],
        ['out', 'Hi Anjali, we missed you at the clinic today. Hope everything’s okay. Whenever you’re ready, just reply and we’ll find a time that suits you.', '7:10 pm'],
        ['sys', 'Saturday'],
        ['out', 'Hi Anjali, Dr Shah has two times free this week: Mon 6 pm or Wed 11 am. Would either suit you?', '10:05 am'],
        ['in', 'Mon 6 works. Sorry about Thursday, my son was unwell.', '10:40 am'],
      ],
    },
    {
      c: 'Care', name: 'Advised to Accepted',
      body: '“I’ll think about it” isn’t a no. The patient is deciding alone, without you. So we send the doctor’s advice again in plain words, with the cost written out. We answer the real question, which is usually cost, fear or time. And we give the doctor’s honest “what if I wait” in one line.',
      why: 'No discount and no fake urgency, ever. Cosmetic choices like aligners or whitening never get a warning line.',
      who: 'Mr Deshpande', tag: 'Example · advised on Monday',
      chat: [
        ['sys', 'Thursday'],
        ['out', 'Hi Mr Deshpande, as Dr Shah explained: a root canal on your lower left back tooth, then a cap (crown) to protect it. Root canal ₹6,500, crown ₹8,000. Any question I can take to the doctor?', '11:00 am', 'example fees'],
        ['in', 'Is the crown really needed?', '12:32 pm'],
        ['out', 'Dr Shah says: after a root canal the tooth can crack when you bite something hard, and a cracked root can’t be saved. The crown protects it. She has Tue 5 pm or Sat 11 am.', '12:40 pm'],
        ['in', 'Saturday', '12:51 pm'],
      ],
    },
    {
      c: 'Come back', name: 'Smart Comebacks',
      body: 'Don’t message everyone. A “20% off, we miss you!” blast to four thousand patients gets you blocked, and you pay for every message. We start with the patients most likely to come back, about 25 a day, and give each one their own reason.',
      why: 'Who replied and who booked shapes next week’s 25.',
      tag: 'Example',
      ba: {
        before: '“Diwali offer! 20% off cleaning. Visit now!” to the whole list.',
        afterLabel: 'After · one of today’s 25',
        afterText: 'Hi Meera, it’s been about seven months since your cleaning with Dr Shah, and she likes to see you every six. Would Mon 11 am or Thu 6 pm suit you?',
      },
    },
  ],
  guardTitle: 'Never pushy.',
  guard: 'We answer the patient’s question first and offer to book once, when it fits. We use no discounts to force a decision and no “only 2 slots left”. A “not now” is respected, and anyone who says stop never hears from you again.',
};

// The Full Chair Method skill's default KPIs (reference/1-…8-*.md, google-bonuses.md).
const KPIS = {
  eyebrow: 'What we hold ourselves to',
  titleA: 'A promise for every system,',
  titleB: 'and a score you can check.',
  lead: 'Each system has a promise, a weekly number and an owner at your clinic. These are our starting promises, and your clinic can change any of them.',
  head: ['System', 'Our promise', 'The number you read on Monday'],
  rows: [
    ['Enquiries', 'First reply within 5 minutes in opening hours (overnight: by 10:30 am), then at least 2 more messages in 7 days', 'Of the last 10 enquiries, how many booked'],
    ['Missed calls', 'A WhatsApp within 5 minutes, a call back within 4 opening hours', 'Calls missed, and how many were followed up in 5 minutes'],
    ['Confirmations', 'Every message within an hour of its time: 9:30 am and 1 pm the day before, 2 hours before', 'Visits confirmed by the day before, and no-shows'],
    ['Rebooking', '3 messages in 7 days after a no-show, 2 after a cancellation', 'Missed visits rebooked within the week'],
    ['Advised treatment', '2 follow-ups in 14 days, the first within 7', 'Patients advised in the last 30 days, how many started, and the value still waiting'],
    ['Finish line', '2 follow-ups in 7 days from when the next sitting is due', 'Half-done treatments, and next sittings booked'],
    ['Day-after check-in', '1 check-in within 2 days of the procedure', 'Check-ins sent, replies, and problems caught early'],
    ['Comebacks', '2 touches from 14 days before the due date to 30 days after', 'Patients asked back, replied, booked'],
    ['Google reviews', 'Asked within 2 days of the visit, never twice', 'Reviews asked, reviews received'],
  ],
  legend: ['Green from 90%', 'Orange from 75%', 'Red below'],
  legendNote: 'Every red opens to the patients behind it.',
};

// Sterling's proof strip, under the reviews. Real numbers only.
const STERLING_PROOF = [
  { n: '281 of 603', t: 'appointments confirmed by patients on WhatsApp in the first two weeks', s: 'The Sterling Dental Clinic, live from 23 Sep 2026' },
  { n: '26 years', t: 'of running the clinic before they moved to Aumy', s: 'Their whole team is in the film' },
];

const BE_PATIENT = {
  eyebrow: 'Try it before you talk to us',
  titleA: 'Don’t take our word for it.',
  titleB: 'Be the patient.',
  body: 'WhatsApp our demo clinic, Lumière Dental, or call it and wait a couple of rings. Ask about aligners, book and then change your mind, skip the visit. Every message you get is what your patients would get.',
  whatsapp: { display: '+91 90223 12554', href: 'https://wa.me/919022312554?text=Hi%2C%20I%20wanted%20to%20ask%20about%20aligners' },
  call: { display: '+91 22 6423 0581', href: 'tel:+912264230581' },
  note: 'A demo clinic. Nothing you type reaches a real patient record.',
};

const FIT = {
  eyebrow: 'Is this for your clinic?',
  titleA: 'We work best with owners',
  titleB: 'who believe in systems.',
  yesTitle: 'We work best with clinics where',
  yes: [
    'the owner wants the follow-ups done without hiring more people;',
    'someone at the desk will own the daily list (we show them how);',
    'the doctor reads one page every Monday, for fifteen minutes.',
  ],
  noTitle: 'It’s probably not for you if',
  no: ['you only want more leads from ads;', 'you’re happy with how your clinic runs today.'],
  ownerOperator: 'Run the clinic yourself, with one or two people at the desk? You’re exactly who this was built around.',
};

// Do-it-yourself path (owner 2026-10-22). Price and access come from src/data/masterclass.js.
const DIY = {
  eyebrow: 'Not ready for us to run it?',
  titleA: 'Learn the same framework',
  titleB: 'and run it yourself.',
  lead: 'In The Full Chair Method masterclass, I teach the 4C Framework we use in every clinic, run by your own team with Claude and Google Sheets.',
  honest: 'How much it gives back depends on doing it every day. When you’d rather we ran it for you, we’re one message away.',
  byline: 'Jayesh Chaudhari, founder, AUM AI',
  length: 'About 90 minutes',
  items: [
    ['The 4C Framework', 'Eight systems and three foundations, with every message in English, Hindi and Marathi'],
    ['The Clinic Master Sheet', 'Type each patient once, and it shows who’s due for what today'],
    ['The Claude skill and the Front desk panel', 'Today’s messages written in your doctor’s name, ready to send'],
    ['About 30 minutes every morning', 'On the busiest days, a little longer'],
    ['24×7 Q&A on WhatsApp', '80071 89868'],
  ],
  button: { label: 'See the masterclass', to: '/masterclass' },
};

const FINAL = {
  titleA: 'Find out where your clinic is losing patients.',
  titleB: 'Free.',
  sub: 'Tell us your clinic and city. Within 24 hours your audit reaches you on WhatsApp, prepared and checked by a person. No obligation.',
  primary: { label: 'Get my free clinic audit', to: '/growth-audit' },
  whatsapp: { label: 'WhatsApp 80071 89868', href: WHATSAPP_LINK },
  modulesLead: 'Prefer to start with one piece?',
  modulesLink: { label: 'See the modules →', to: '/modules' },
};

// Footer column (site-wide): the module pages, linked in outcome words, no product names (owner 2026-10-22).
const FOOTER_OUTCOMES = [
  { to: '/modules/dental-lead-management', label: 'Every enquiry followed up' },
  { to: '/modules/whatsapp-ai-receptionist-for-dentists', label: 'Every WhatsApp answered' },
  { to: '/modules/ai-voice-receptionist-for-dentists', label: 'Every call answered' },
  { to: '/modules/dental-patient-follow-up', label: 'No-shows rebooked, treatment finished' },
  { to: '/modules/dental-clinic-management-software', label: 'Records and billing in one place' },
  { to: '/modules/automate-dental-clinic-operations', label: 'All of it, run together' },
];
const FOOTER_TAGLINE = 'Stop losing patients. A team, the 4C Framework, and the system that runs it, for dental clinics.';

// SEO (same strings in scripts/prerender.js slug '' and public/index.html).
const SEO = {
  title: 'Aumy | AI Dental Software & AI Receptionist, Run For Your Dental Clinic in India',
  description: 'For dental clinics in India: AI dental software plus a team that runs it with your staff. Every call answered, visits confirmed, treatment finished, patients back.',
  // Social share card (1200×630, made from the hero; source in AUMY Brand Assets/02-Covers-Banners).
  shareImage: '/og/aumy-stop-losing-patients-1200x630.png',
  shareTitle: 'Stop losing patients. We make sure of it. | Aumy for dental clinics',
};

// Hidden search data (JSON-LD, llms.txt, noscript), 2026-10-22: the new positioning, no price.
// public/index.html carries a typed copy of ORG_DESCRIPTION (it cannot require this file).
const ORG_DESCRIPTION = 'AUM AI makes sure no patient slips through a dental clinic: a team that works with the clinic’s own staff, the 4C Framework (Convert, Confirm, Care, Come back), and Aumy, the AI dental software that runs it every day, with KPIs reported every Monday.';
const PRODUCT_DESCRIPTION = 'Aumy is AI dental software for dental clinics in India, set up and run with the clinic’s own team by AUM AI: an AI receptionist on calls and WhatsApp, appointment confirmations, rebooking, treatment follow-ups, recalls and clinic records, organised by the 4C Framework (Convert, Confirm, Care, Come back) and measured every Monday.';
// The square logo for search results: the transparent Aumy waves logo (navy), the only Aumy logo since 2026-10-22.
const LOGO_URL = '/aumy-logo-512.png';

module.exports = {
  WHATSAPP_LINK, HERO, PAIN, VS, HOW, FOURC, STRATEGIES, KPIS, STERLING_PROOF, BE_PATIENT, FIT, DIY, FINAL,
  FOOTER_OUTCOMES, FOOTER_TAGLINE, SEO, ORG_DESCRIPTION, PRODUCT_DESCRIPTION, LOGO_URL,
};
