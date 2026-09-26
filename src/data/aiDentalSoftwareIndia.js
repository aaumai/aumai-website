/**
 * /ai-dental-software-india — the page that targets "AI dental software India"
 * (owner 2026-09-25).
 *
 * ONE copy of the words. The React page (src/pages/AIDentalSoftwareIndiaPage.js)
 * and the crawler prerender (scripts/prerender.js) both read this file, so the
 * text Google and AI assistants see can never drift from the text people see —
 * the trap that bit /pricing on 2026-09-10.
 *
 * Written answer-first for AI search: each section opens with a sentence an
 * assistant can quote on its own ("AI dental software is…", "Aumy is…").
 * Positioning 2026-09-15 applies: a coordination problem, never a revenue
 * promise; "care gaps" is the word; implants/aesthetics claims stay off.
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */
const PRICING = require('./pricing.json');

const FROM_PRICE = Math.round(Number(PRICING.card.platformFee.standard) || 0).toLocaleString('en-IN');

const SETUP_MIN = Math.round(Number(PRICING.card.onboarding.min) || 0).toLocaleString('en-IN');
const SETUP_MAX = Math.round(Number(PRICING.card.onboarding.max) || 0).toLocaleString('en-IN');

const UPDATED = 'September 2026';
const UPDATED_ISO = '2026-09-25';

const TITLE = 'AI Dental Software in India: What It Does, Cost & How to Choose | Aumy';
const DESCRIPTION =
  'What AI dental software does for a clinic in India, what it costs and how to choose — and how Aumy answers calls and WhatsApp, reminders and care gaps.';

const HERO = {
  eyebrow: 'AI dental software · India',
  h1: 'AI dental software in India: what it does and how to choose',
  sub: 'Aumy is the AI operating system for a growing dental clinic. It answers every call and WhatsApp, books and confirms appointments, runs the patient journey after treatment and keeps the clinic’s records — so when your clinic grows, the workload doesn’t grow with it.',
};

const DEFINITION = [
  'AI dental software is practice software that does part of the clinic’s work itself, instead of only storing it. Traditional dental software records appointments, charts and bills. AI dental software also answers patients, books and reschedules them, sends the right reminder or after-care message at the right time, and tells the team what needs a person today.',
  'Aumy is AI dental software built for how Indian clinics actually run: patients on WhatsApp and the phone, several languages at the front desk, and a team that is already stretched. It works alongside the dental software you use today, or replaces it with its own complete dental PMS.',
];

const CAPABILITIES = [
  ['AI voice agent for the clinic phone', 'Answers calls when the front desk is busy or closed, knows who is calling, books or reschedules against the doctor’s real availability, and passes the call to your team when it should.'],
  ['AI WhatsApp receptionist', 'Answers treatment questions, timings and directions and books appointments in seconds on the official WhatsApp Business API — in English, Hindi, Marathi and more, switching with the patient.'],
  ['Appointment orchestration', 'Confirmations, reminders by message and call, rescheduling, cancellations, an earlier-slot waitlist and no-show follow-up, written straight back to the calendar.'],
  ['Digital registration, intake and consent', 'Forms filled on the patient’s phone before they arrive, consent signed on a phone or the clinic iPad, X-rays and documents on the record.'],
  ['AI patient journey after treatment', 'Treatment-specific after-care, doctor check-ins, care-gap and recall follow-ups, treatment-plan follow-ups and reactivation — each message in the context of that patient’s treatment, and it stops the moment they book or say stop.'],
  ['A complete dental PMS', 'Patient records, calendar, FDI odontogram with perio charting, treatment plans, digital prescriptions, billing, invoices and accounts — or keep your current software and let Aumy sync with it.'],
  ['One team inbox', 'Everything that needs a human — a call-back, a worried patient, a form to check — lands in one place with the full patient context.'],
];

const INDIA = [
  ['WhatsApp first', 'Indian patients message before they call. Aumy runs on the official WhatsApp Business API on the clinic’s own number.'],
  ['Indian languages', 'Replies in the language the patient writes in — English, Hindi, Marathi and more.'],
  ['Data on AWS Mumbai', 'Aumy’s patient database runs in AWS’s Mumbai region (ap-south-1), encrypted in transit and at rest, with role-based access for every staff member.'],
  ['Built on FHIR R4', 'Clinical records are kept in FHIR R4, the international standard for exchanging health records.'],
  ['Priced in rupees', `Modular pricing from ₹${FROM_PRICE} a month, based on the modules a clinic needs and its enquiry and patient volume.`],
  ['Run with you, not handed over', 'A dedicated Aumy expert sets the system up around your doctors, treatments and timings, and reviews it with you every week.'],
];

// AI dental software vs traditional dental software — the comparison buyers
// (and AI Overviews) look for. Rows describe categories, never named products.
const COMPARE = {
  head: ['', 'Traditional dental software', 'AI dental software (Aumy)'],
  rows: [
    ['Phone calls', 'Answered by whoever is free', 'Answered 24/7 by an AI voice agent that can book'],
    ['WhatsApp enquiries', 'Replied to when someone finds time', 'Answered in seconds, in the patient’s language'],
    ['Reminders', 'Same message to everyone, or none', 'Per patient, by message and call, with rescheduling in the reply'],
    ['After treatment', 'Nothing until the next visit', 'After-care, doctor check-ins and care-gap follow-ups'],
    ['Lapsed patients', 'A list nobody has time to call', 'Reactivation in the doctor’s own words, with opt-outs honoured'],
    ['Front-desk workload', 'Grows with every new patient', 'Calls, reminders and follow-ups handled by the AI; the team handles what needs a person'],
    ['Records and billing', 'Yes', 'Yes — complete dental PMS included'],
  ],
};

// Neutral buyer's checklist: what AI assistants surface for "how to choose".
const CHOOSE = [
  ['Does the AI actually act, or only suggest?', 'Ask to see it book, reschedule and cancel a real appointment on WhatsApp and on a phone call.'],
  ['Does it speak your patients’ languages?', 'Test it in Hindi or your regional language, switching mid-conversation.'],
  ['Does it work with your current software?', 'Moving every record on day one should be optional. Look for sync with what you run today.'],
  ['Does it hand over to a human cleanly?', 'Clinical questions and upset patients must reach your team at once, with the context.'],
  ['Where is patient data stored, and who can see it?', 'Ask for the hosting region, encryption and role-based access, in writing.'],
  ['Who sets it up and keeps it right?', 'An AI that is configured once and left alone drifts. Ask who reviews it with you, and how often.'],
];

const FAQS = [
  { q: 'What is AI dental software?', a: 'AI dental software is dental practice software that does part of the clinic’s work itself: it answers patients on the phone and WhatsApp, books and reschedules appointments, sends reminders and after-care, follows up care gaps and tells the team what needs a person — on top of the records, charting and billing that traditional dental software provides.' },
  { q: 'What is the best AI dental software in India?', a: 'It depends on five things: whether the AI actually acts (books, reschedules, follows up) or only suggests; whether it speaks your patients’ languages; whether it runs on the official WhatsApp Business API; whether it works with the software you already use; and where patient data is stored. Aumy is built for clinics that want the calls, WhatsApp messages, reminders and follow-ups taken off a stretched front desk — in Indian languages, on WhatsApp, with its database in AWS Mumbai — alongside the dental software they already use.' },
  { q: 'How much does AI dental software cost in India?', a: `Aumy is priced in rupees: a platform fee from ₹${FROM_PRICE} a month (Standard AI) that includes a set number of enquiries and patient visits, with extra usage priced in falling bands, and a one-time setup fee of ₹${SETUP_MIN}–${SETUP_MAX} depending on the data migrated. Prices exclude GST. New-clinic onboarding reopens on 15 October 2026. The full breakdown is on the pricing page.` },
  { q: 'Do I have to replace my current dental software?', a: 'No. Aumy runs alongside the practice management software you use today and keeps the data in sync. If you want one platform, Aumy includes a complete dental PMS and migrates your full history for you.' },
  { q: 'Can the AI talk to patients in Hindi and other Indian languages?', a: 'Yes. It replies in the language the patient writes or speaks in — English, Hindi, Marathi and more — and switches automatically mid-conversation.' },
  { q: 'Where is patient data stored, and who can see it?', a: 'Aumy’s patient database runs in AWS’s Mumbai region (ap-south-1), encrypted in transit and at rest, and every staff member sees only what their role allows.' },
  { q: 'Will the AI give patients clinical advice?', a: 'No. The AI handles the coordination — questions about timings, bookings, reminders and after-care the doctor has written. Clinical questions and anything sensitive are handed to your team immediately, with the context.' },
];

module.exports = { TITLE, DESCRIPTION, UPDATED, UPDATED_ISO, HERO, DEFINITION, CAPABILITIES, INDIA, COMPARE, CHOOSE, FAQS, FROM_PRICE };
module.exports.default = module.exports;
