/**
 * /ai-receptionist — ONE copy of the words (AEO/SEO pass, 2026-09-26). The
 * React page (src/pages/AIReceptionistPage.js) and the crawler HTML + FAQ
 * JSON-LD (scripts/prerender.js) both read this file. Before, the crawler saw
 * ~110 words and an FAQ that had drifted from the page; AI answer engines that
 * do not run JavaScript read only that.
 */
const TITLE = 'AI Receptionist for Dental Clinics — 24/7 Calls & WhatsApp | Aumy';
const DESCRIPTION =
  'Aumy’s AI receptionist answers every call and WhatsApp enquiry for your dental clinic 24/7, in the patient’s own language, and turns enquiries into booked appointments.';

const HERO = {
  title: 'An AI receptionist that never misses a patient',
  sub: 'Every call and WhatsApp message answered in seconds — nights, Sundays, lunch rush — in your patient’s own language, and converted into a booked appointment. That’s the Convert stage of the Aumy patient journey, running 24/7.',
};

const MATHS = {
  title: 'The maths your front desk already knows',
  body: 'A busy clinic misses 20–30% of its calls, and most enquiries after 8 pm are never answered at all. Every missed enquiry is a patient who books with the next clinic on Google. An implant enquiry lost this way isn’t a missed call — it’s lakhs of treatment revenue walking to a competitor.',
};

const CAPABILITIES = [
  ['Answers every WhatsApp enquiry in seconds', 'Treatment questions, timings, pricing, directions — answered instantly in the patient’s own language, any hour of the day.'],
  ['Books appointments end-to-end', 'Checks real availability, offers slots, confirms the booking and sends the reminder — no human in the loop unless you want one.'],
  ['Recovers missed calls', 'A call your front desk couldn’t pick up gets an instant WhatsApp follow-up, so the patient books with you instead of the next clinic on Google.'],
  ['Knows your clinic, not a script', 'Trained on your treatments, your doctors, your pricing and your policies — configured in your own words during onboarding.'],
  ['Follows up until patients decide', 'Enquiries that go quiet get polite, well-timed nudges. Treatment plans get chased. Nothing falls through the cracks.'],
  ['Hands over to humans instantly', 'Your staff can take over any conversation with one tap; the AI steps back the moment a human joins and stays back while they chat.'],
];

const STAGE = {
  title: 'Converting is only stage one',
  body: 'The receptionist is the front door of the Aumy patient journey — after it Converts an enquiry, Aumy Cares for the patient after treatment, Retains them by following up care gaps, and Reactivates them if they drift away. One connected platform coordinating the whole journey, alongside the practice software you already use.',
};

const FAQS = [
  { q: 'Will an AI receptionist replace my front-desk staff?', a: 'No — it covers what staff physically cannot: nights, Sundays, lunch rushes and the second call that comes in while they’re on the first. Your team keeps full control and can join any conversation at any time.' },
  { q: 'Will patients realise they’re talking to AI — and mind?', a: 'Patients care about getting a helpful answer at 11 pm, not about who typed it. Aumy replies naturally in the patient’s own language and hands anything sensitive to your team immediately.' },
  { q: 'Which languages does it speak?', a: 'It replies in the language the patient writes in — English, Hindi, Marathi and more — switching automatically mid-conversation if the patient does.' },
  { q: 'What happens when the AI doesn’t know an answer?', a: 'It never guesses about clinical matters. Unknown or sensitive questions are handed to your staff with full context, and the patient is told a team member will respond shortly.' },
  { q: 'How long does setup take?', a: 'Onboarding is done for you — WhatsApp connection, your treatments and FAQs configured in your doctors’ own words. Most clinics are live within a week.' },
];

module.exports = { TITLE, DESCRIPTION, HERO, MATHS, CAPABILITIES, STAGE, FAQS };
module.exports.default = module.exports;
