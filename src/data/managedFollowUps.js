/**
 * Fully managed follow-ups (owner 2026-10-26: "put our fully managed lead nurturing patient follow ups
 * services on our marketing website", "include calling also, treatment acceptance, dental sales", "do not
 * mention the pricing"): the service page at aumai.co.in/managed-follow-ups, under "Product & services →
 * Services" in the header.
 *
 * ONE copy of the words: src/pages/ServicePage.js renders them and scripts/prerender.js writes the same
 * words into the crawler HTML, the Service JSON-LD and the FAQPage JSON-LD.
 *
 * Plans are the owner's (25 Oct): Silver = we run every follow-up by WhatsApp; Gold = Silver plus calls,
 * treatment acceptance and escalations. NO price, NO client results, NO promised hours, languages or call
 * volumes (staffing is still the owner's decision) — we quote after the free audit.
 *
 * `module.exports` on purpose: the prerender script is plain Node.
 */
const PATH = '/managed-follow-ups';
const KEY = 'managed';

const WHATSAPP = { display: '80071 89868', link: 'https://wa.me/918007189868?text=' + encodeURIComponent('Hi, I would like to know about your managed patient follow-ups.') };

const ARTICLE = { href: '/growth/dental-patient-ill-think-about-it', label: 'A dental patient said “I’ll think about it.” What should your clinic do next?' };

const SEO = {
  title: 'Managed Dental Patient Follow-Ups, Lead Nurturing & Treatment Acceptance | AUM AI',
  description:
    'We run your dental clinic’s follow-ups for you: new enquiries, appointment reminders, missed visits, advised treatment, check-ups and Google reviews, by WhatsApp and phone calls. Treatment acceptance and enquiry-to-patient sales, done for you. Free clinic audit.',
};

const HERO = {
  eyebrow: 'Fully managed follow-ups',
  title: 'We follow up. You treat patients.',
  sub: 'Your clinic’s enquiries, reminders, missed visits, advised treatment and check-ups, followed up for you every day, by WhatsApp and by phone. Your front desk stops chasing. More of the patients you already have say yes, and come back.',
  cta: 'Get a free clinic audit',
  secondary: { label: 'What we take off your desk', href: '#how' },
  trust: 'Free audit. We look at your enquiries, missed visits and advised treatment from the last few months and show you how many patients slipped through, and why.',
};

// Hero picture: who does what, day to day (not data, so no numbers on it).
const VISUAL = {
  kind: 'journey',
  title: 'A day of follow-ups, done for you',
  steps: [
    { h: 'New enquiries answered', t: 'And followed up until they book or say no' },
    { h: 'Tomorrow’s patients confirmed', t: 'Reminders sent, no-replies called' },
    { h: 'Missed visits rebooked', t: 'The same day, not next month' },
    { h: 'Advised treatment followed up', t: 'Questions answered, visits booked' },
    { h: 'Patients due back brought back', t: 'Check-ups, unfinished treatment, reviews' },
  ],
  caption: 'Every message and call logged in your clinic’s Aumy',
};

const WHAT = {
  eyebrow: 'What we take over',
  title: 'Every follow-up your front desk never has time for',
  intro: 'Clinics rarely lose patients in the chair. They lose them in the follow-ups nobody had time to make. We make all of them, in your clinic’s name.',
  items: [
    { icon: 'chat', h: 'New enquiries, followed up until they book', t: 'Every WhatsApp, call and ad enquiry answered, then followed up with a second and a third message, until the person books a visit or says no.' },
    { icon: 'phone', h: 'Calls to patients who don’t reply', t: 'When a message gets no answer, a person calls: tomorrow’s patients who haven’t confirmed, missed visits, enquiries that went quiet.' },
    { icon: 'target', h: 'Treatment acceptance', t: 'Patients who were advised a crown, implant or aligners and said “I’ll think about it” are followed up, their questions answered, and the next visit booked.' },
    { icon: 'star', h: 'Treatment sales, done with care', t: 'Plans explained in plain words, payment options passed on as your clinic sets them, and the patient helped to decide. Never pushy: a no is respected and logged.' },
    { icon: 'pin', h: 'Missed visits and patients due back', t: 'Missed visits rebooked the same day; check-ups, unfinished treatment and patients not seen in a while brought back.' },
    { icon: 'chart', h: 'A clear weekly report', t: 'Enquiries answered, visits confirmed, missed visits rebooked, treatments accepted and Google reviews earned, in plain words.' },
  ],
};

const POINTS = {
  eyebrow: 'Why follow-ups slip',
  title: '“We know we should follow up. There’s just no time.”',
  intro: 'Every clinic owner says it. The front desk is answering the phone, checking patients in and taking payments. Follow-ups are the first thing to slip.',
  items: [
    { h: 'Enquiries answered late', t: 'An enquiry answered the next morning has often booked at another clinic by then.' },
    { h: 'One message, then silence', t: 'Most people don’t decide on the first message. Without a second and a third, they drift away.' },
    { h: 'Advised treatment forgotten', t: '“I’ll think about it” turns into never, because nobody calls back with an answer to the question they didn’t ask.' },
    { h: 'Nobody owns it', t: 'When follow-ups are everybody’s job, they are nobody’s. We make them ours.' },
  ],
  link: ARTICLE,
};

const WORK = {
  eyebrow: 'Two ways to hand it over',
  title: 'Silver or Gold',
  intro: 'Pick how much you want us to take on. You can move from Silver to Gold at any time.',
  cases: [
    { name: 'Silver', tag: 'We follow up by WhatsApp', text: 'Every follow-up run for you by message: new enquiries, appointment reminders, missed visits, advised treatment, check-ups, unfinished treatment, patients not seen in a while, and Google review requests. Replies come back to us; anything that needs your clinic comes to your desk.' },
    { name: 'Gold', tag: 'WhatsApp and phone calls', text: 'Everything in Silver, plus phone calls. We call patients who don’t reply, call advised-treatment patients to help them decide, handle unhappy patients and other escalations, and book the visit while they’re on the line.' },
  ],
  note: 'Both are run in your clinic’s name, inside your clinic’s Aumy, so your team sees every message, every call and every booking.',
};

const STEPS = {
  eyebrow: 'How it works',
  title: 'From the audit to a full diary',
  items: [
    { h: 'Free clinic audit', t: 'We look at your enquiries, missed visits and advised treatment and show you where patients are slipping through.' },
    { h: 'Your rules, written down', t: 'Your treatments, doctors, timings and what we may and may not say, agreed with you before a single message goes out.' },
    { h: 'Set up in Aumy', t: 'Your patients and appointments in one place, with every follow-up list ready to work.' },
    { h: 'We start following up', t: 'Every day, every list, in your clinic’s name. You approve the first messages before anything goes to patients.' },
    { h: 'Every week', t: 'A short report and a call: what was done, what came back, and what to change.' },
  ],
};

const MONTHLY = {
  eyebrow: 'Every month',
  title: 'What your clinic gets',
  items: [
    'Every new enquiry answered and followed up until it books or says no.',
    'Tomorrow’s visits confirmed, and missed visits rebooked.',
    'Advised and unfinished treatment followed up, with Gold adding calls to help patients decide.',
    'Check-ups due, patients not seen in a while and Google review requests, all handled.',
    'A weekly report in plain words, and every message and call visible in your clinic’s Aumy.',
  ],
  asideTitle: 'Your clinic, your voice',
  aside: 'We write and speak the way your clinic does. We never promise a result, quote a price or give clinical advice you haven’t agreed; clinical questions go to your doctor.',
};

const FIT = {
  eyebrow: 'Who it’s for',
  title: 'A good fit if…',
  items: [
    'Your front desk is too busy to follow up every enquiry and every advised treatment.',
    'Patients often say “I’ll think about it” and you rarely hear back.',
    'You run ads or get enquiries on WhatsApp and want every one of them answered.',
    'You want your follow-ups done every day, by people who do nothing else.',
  ],
  notFit: 'If you want patients pressured into treatment, we are not the right fit. We help patients decide; we never push.',
};

const WITH_AUMY = {
  title: 'Run on Aumy, so nothing is hidden from you.',
  text: 'Every follow-up we make happens inside your clinic’s Aumy: the messages, the calls, the replies and the bookings. Your team can see all of it, step in at any time, and take it back whenever you want.',
  link: { to: '/revenue-generator', label: 'How Aumy works' },
};

const FAQS = [
  { q: 'What does “fully managed” mean?', a: 'We run your clinic’s follow-ups for you, every day: new enquiries, reminders, missed visits, advised treatment, check-ups and Google reviews. Your team treats patients; we make sure they come in.' },
  { q: 'Do you call our patients?', a: 'With Gold, yes. We call patients who don’t reply to messages, help advised-treatment patients decide, handle escalations and book visits on the call. With Silver, we follow up by WhatsApp only.' },
  { q: 'Will patients know it isn’t our front desk?', a: 'Every message and call is made in your clinic’s name, in the words we agree with you. Anything that needs your clinic, such as a clinical question or a complaint, comes straight to your team.' },
  { q: 'How do you help with treatment acceptance?', a: 'Patients who were advised treatment are followed up with answers to the questions that hold them back, such as time, cost or worry about pain, using the information and payment options your clinic gives us. The decision is always the patient’s.' },
  { q: 'Do we need Aumy?', a: 'Yes. Everything is run inside your clinic’s Aumy, so you can see every message and call. We set it up for you.' },
  { q: 'How much does it cost?', a: 'It depends on your clinic’s size and whether you choose Silver or Gold, so we quote after the free clinic audit. WhatsApp 80071 89868 to start.' },
];

const AUDIT = {
  service: 'Managed Follow-Ups Audit',
  title: 'Get a free clinic audit',
  intro: 'Tell us about your clinic. We look at your enquiries, missed visits and advised treatment, and send you how many patients slipped through and what we would follow up first.',
  goalLabel: 'What do you want help with most?',
  goals: ['New enquiries', 'Missed visits', 'Advised treatment (treatment acceptance)', 'Patients due back', 'All of it'],
  fine: 'Free. Reviewed by a person before it reaches you. Your details are used only for the audit.',
  done: 'Done. We will send your clinic audit to your WhatsApp.',
  error: 'Something went wrong. WhatsApp us at 80071 89868 and we will start your audit.',
};

const FINAL = {
  eyebrow: 'Managed follow-ups by AUM AI',
  title: 'Your patients, followed up every day.',
  text: 'Start with a free audit of where your patients are slipping through.',
};

// JSON-LD Service (scripts/prerender.js). No review or rating markup, no price.
const SCHEMA = {
  name: 'Fully managed patient follow-ups and lead nurturing for dental clinics',
  serviceType: 'Managed patient follow-up, lead nurturing and treatment acceptance for dental clinics',
  audience: 'Dental clinics',
};

module.exports = { PATH, KEY, WHATSAPP, ARTICLE, SEO, HERO, VISUAL, WHAT, POINTS, WORK, STEPS, MONTHLY, FIT, WITH_AUMY, FAQS, AUDIT, FINAL, SCHEMA };
module.exports.default = module.exports;
