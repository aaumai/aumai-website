/**
 * /whatsapp-automation-for-clinics — ONE copy of the words (AEO/SEO pass,
 * 2026-09-26). The React page (src/pages/WhatsAppAutomationPage.js) and the
 * crawler HTML + FAQ JSON-LD (scripts/prerender.js) both read this file.
 */
const TITLE = 'WhatsApp Automation for Dental Clinics in India — Official API | Aumy';
const DESCRIPTION =
  'Aumy automates your dental clinic’s WhatsApp on the official Business API: instant replies, booking, care-gap reminders, reactivation and reviews, with human takeover built in.';
const HERO = {
  title: 'WhatsApp automation built for dental clinics',
  sub: 'India’s patients live on WhatsApp. Aumy turns your clinic’s number into a system that answers, books, confirms, follows up, closes care gaps and invites patients back — on the official WhatsApp Business API, across the whole patient journey.',
};
// The journey on this page is the 4C Framework (owner 2026-10-17: one framework everywhere). The four stages
// come from src/data/fourC.js; this is only the page's own sentence under them.
const JOURNEY = {
  lead: 'One number, all four stages. Most clinics use WhatsApp by hand — replying when the front desk gets a minute, forgetting follow-ups by Friday. Aumy runs every stage on it, automatically.',
};

const DIFFERENCE = [
  ['Official WhatsApp Business API', 'Your clinic’s own verified number and branding on Meta’s approved business channel — not an unofficial bulk tool that gets numbers banned.'],
  ['Conversations, not blasts', 'Every message can be replied to — and the AI actually answers, books and follows up. Broadcast tools stop where Aumy starts.'],
  ['Campaigns with guardrails', 'Festival offers and promotions with start/end dates, daily send caps and automatic opt-out handling built in.'],
  ['Human takeover any time', 'Your team can step into any conversation with one tap; the AI yields instantly and stays out while they chat.'],
  ['Revenue attribution', 'Every booking is traced back to the message, campaign or channel that produced it — you see what each rupee returned.'],
];

const FAQS = [
  {
    q: 'Is this the official WhatsApp? Will my number get blocked?',
    a: 'Aumy uses the official WhatsApp Business API from Meta on your clinic’s own number. It follows Meta’s messaging rules — approved templates, opt-outs, send limits — which is exactly why it doesn’t get blocked the way unofficial bulk tools do.',
  },
  {
    q: 'Isn’t automated WhatsApp just spam?',
    a: 'Blast tools are spam. Aumy sends each patient the message that’s relevant to them at the moment it’s relevant — their care-gap reminder when it’s due, their after-care on the day of treatment, their follow-up when their plan is pending. Relevance is the opposite of spam, and opt-outs are honoured instantly.',
  },
  {
    q: 'Can my staff still use the WhatsApp number normally?',
    a: 'Yes. Your team sees every conversation, can jump in whenever they want, and the AI steps back the moment they do. The number stays fully theirs.',
  },
  {
    q: 'What can I send campaigns about?',
    a: 'Festival offers, new services, health-camp announcements — composed with AI, sent to the right patient segments with daily caps and campaign start/end dates, and measured down to bookings and revenue.',
  },
  {
    q: 'Do I need new software or a new number?',
    a: 'No. Aumy connects to your existing WhatsApp number and runs alongside your existing practice software. Setup is done for you, typically within a week.',
  },
];

module.exports = { TITLE, DESCRIPTION, HERO, JOURNEY, DIFFERENCE, FAQS };
module.exports.default = module.exports;
