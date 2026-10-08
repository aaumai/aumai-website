/**
 * /modules — ONE copy of the words (owner 2026-10-08: "break and sell each
 * module separately for those who want separate modules, and for those who
 * want 1 connected system, the entire system"). The React page
 * (src/pages/ModulesPage.js) and the crawler HTML + JSON-LD
 * (scripts/prerender.js) both read this file. Edit here, never there.
 *
 * Module names approved by the owner 2026-10-08: Aumy Leads, Aumy Clinic
 * (+ Aumy Scribe add-on), Aumy Journey, Aumy Chat, Aumy Voice, and Aumy One
 * for the whole connected system. Each card shows the short name, the formal
 * name (which carries the search keywords) and a one-line promise.
 *
 * SEO (2026-10-08): this page owns "dental clinic software modules" — the
 * buy-one-or-all intent. It must NOT compete with the pages that own the deep
 * terms, so each card links OUT to its owner with that keyword as the anchor:
 *   AI receptionist for dental clinics  → /ai-receptionist
 *   WhatsApp automation for clinics      → /whatsapp-automation-for-clinics
 *   dental software India / cost         → /ai-dental-software-india, /pricing
 *   patient journey / follow-ups         → /ai-patient-engagement
 *
 * Every claim is checked against the product code (aum-ehr-api / aum-ehr-web,
 * 2026-10-08). Deliberately NOT claimed: missed call → WhatsApp follow-up,
 * patients paying the clinic online, inventory, languages beyond English /
 * Hindi / Marathi, and any treatment or visit data sent to Meta (clinics send
 * Meta an anonymous lead signal only — health-data rules). No prices here:
 * /pricing owns them.
 *
 * `module.exports` on purpose: the prerender script is plain Node.
 */

const TITLE = 'Dental Clinic Software Modules — Buy One or All | Aumy'; // 54 chars
const DESCRIPTION =
  'Dental clinic software by module: leads & Meta ads, clinic OS, AI notes, patient follow-ups, AI WhatsApp & voice receptionist, or Aumy One for all.'; // 147 chars

const HERO = {
  eyebrow: 'Dental clinic software modules',
  title: 'Pick what you need — or run it all as one system.',
  sub: 'Every part of Aumy can be bought on its own. Start with the one problem that hurts most today. When you are ready, add the rest — it all joins up into one connected system with one patient record.',
};

// `addons` are shown as chips ("+ name"). `more` links out to the page that owns the deep keyword.
const MODULES = [
  {
    id: 'aumy-leads',
    icon: 'leads',
    short: 'Aumy Leads',
    title: 'Lead Management & Meta Ads Optimisation',
    forWho: 'For clinics running Facebook and Instagram ads.',
    promise: 'Every enquiry from your ads is answered, followed up and tracked to a booked patient, so you know which ads pay and which don’t.',
    does: [
      'Every enquiry from your Facebook and Instagram ads lands in one leads list — nothing sits unread.',
      'Enquiries that go quiet get polite, well-timed follow-ups until the person books or says no.',
      'See which campaign each patient came from, and what it cost you per booked patient.',
      'Meta learns from your real enquiries through an anonymous lead signal — your patients’ health data never leaves the clinic.',
      'Your Google profile kept working: posts published, and Google reviews answered with a reply drafted for you to approve.',
    ],
    addons: ['Aumy Chat', 'Aumy Voice', 'Both'],
    more: { path: '/facebook-instagram', label: 'Facebook & Instagram receptionist' },
  },
  {
    id: 'aumy-clinic',
    icon: 'os',
    short: 'Aumy Clinic',
    title: 'Dental Clinic Operating System',
    forWho: 'For clinics that want one simple software to run the day.',
    promise: 'Appointments, patient records, charting, treatment plans and billing in one place, for one chair or many branches.',
    does: [
      'Appointments and every doctor’s calendar in one place, across all your branches.',
      'Each patient’s full record — history, X-rays, documents and prescriptions — in one click.',
      'Dental charting and treatment plans on a tooth chart; invoices, accounts and reports.',
      'Registration, medical history and consent filled in and signed on the patient’s phone.',
      'Lab work tracked, and a login for every staff member with only what their role needs.',
    ],
    // The one add-on with its own name and explainer (owner 2026-10-08).
    scribe: {
      short: 'Aumy Scribe',
      title: 'AI Clinical Documentation',
      promise: 'The doctor types a short note or just speaks; Aumy fills the chart, and nothing is saved until the doctor accepts it.',
    },
    addons: ['Aumy Scribe'],
    more: { path: '/ai-dental-software-india', label: 'Dental software in India: how to choose' },
  },
  {
    id: 'aumy-journey',
    icon: 'journey',
    short: 'Aumy Journey',
    title: 'Clinic OS with the End-to-End Patient Journey',
    forWho: 'For clinics that want every patient followed up automatically.',
    promise: 'Aumy Clinic plus every follow-up your desk never has time for: reminders, no-show rebooking, after-care, reviews, treatment follow-up and recalls.',
    does: [
      'Appointment reminders on WhatsApp; patients confirm or ask to move the visit with one tap.',
      'Patients who miss an appointment are messaged to rebook — no one is forgotten.',
      'After-care messages after treatment, and a review request once the visit is done.',
      'Advised treatment the patient has not started is followed up until they decide.',
      'Recalls and check-ups followed up when due; patients who drifted away invited back.',
    ],
    addons: ['Aumy Scribe', 'Approve each message first', 'Birthday & festival wishes'],
    more: { path: '/ai-patient-engagement', label: 'The AI-powered patient journey' },
  },
  {
    id: 'aumy-chat',
    icon: 'chat',
    short: 'Aumy Chat',
    title: 'AI WhatsApp Receptionist',
    forWho: 'For clinics whose WhatsApp fills up faster than the desk can reply.',
    promise: 'Every WhatsApp message answered in seconds, day or night, in the patient’s language, with real appointments booked into your calendar.',
    does: [
      'Answers questions about treatments, timings and directions from your clinic’s own information.',
      'Books the appointment into a real free slot in your doctor’s calendar.',
      'Replies in English, Hindi or Marathi, and understands voice notes and photos patients send.',
      'Your team can take over any chat with one tap; the AI steps back while they talk.',
      'Runs on the official WhatsApp Business API, on your clinic’s own number.',
    ],
    addons: ['Facebook & Instagram messages', 'Aumy Leads', 'Aumy Clinic'],
    more: { path: '/whatsapp-automation-for-clinics', label: 'WhatsApp automation for clinics' },
  },
  {
    id: 'aumy-voice',
    icon: 'phone',
    short: 'Aumy Voice',
    title: 'AI Voice Receptionist',
    forWho: 'For clinics that miss calls when the desk is busy or closed.',
    promise: 'Every call to the clinic answered, even when the desk is busy or closed. It books, moves and checks appointments, and passes calls to staff.',
    does: [
      'Knows who is calling, and works from the doctor’s real availability.',
      'Speaks English, Hindi or Marathi.',
      'Passes the call to your team’s phone when a person is needed.',
      'Every call is recorded and written out, so you can see exactly what was said.',
      'Can also call patients for you — for example, a reminder call before a visit.',
    ],
    addons: ['Outbound calls', 'Aumy Leads', 'Aumy Clinic'],
    more: { path: '/ai-receptionist', label: 'AI receptionist for dental clinics' },
  },
];

// The featured connected-system band: Aumy One.
const CONNECTED = {
  eyebrow: 'For clinics ready to run everything',
  short: 'Aumy One',
  title: 'The Connected Dental Clinic System',
  sub: 'Everything above working as one: one patient record, from the first enquiry to the next recall.',
  steps: [
    { title: 'Enquiry', body: 'A patient sees your ad or finds you on Google, and messages or calls.' },
    { title: 'Reply & booking', body: 'Aumy Chat replies in seconds or Aumy Voice answers the call, and books a real slot.' },
    { title: 'Reminder', body: 'Forms are filled in on the phone; the patient confirms the visit with one tap.' },
    { title: 'Visit', body: 'The doctor sees the full history, charts the treatment, and the bill is made.' },
    { title: 'Notes', body: 'The doctor types a short note or just speaks; Aumy Scribe fills the chart to accept.' },
    { title: 'Follow-up', body: 'After-care goes out and advised treatment is followed up. Missed visits are rebooked.' },
    { title: 'Recall & review', body: 'A review is requested, check-ups go out when due, and drifted patients are invited back.' },
  ],
  why: [
    ['One patient record', 'The enquiry, calls, chats, visits, treatment and bill sit on the same patient. Anyone on your team sees the whole story.'],
    ['No double entry', 'A booking made by the AI is already in the calendar. A treatment the doctor charts already drives the after-care. Nobody types anything twice.'],
    ['Nothing falls between tools', 'When a patient books, the follow-ups they were in stop. When they say stop, every message stops. Separate tools cannot know this about each other.'],
  ],
};

// Rows × the five modules + Aumy One. yes / opt (add-on) / no.
const TABLE = {
  title: 'Compare the modules',
  sub: 'Every row is something Aumy does today. The last column is Aumy One, the full connected system.',
  caption: 'Add-on means you can add it to that module if you want it.',
  cols: ['Aumy Leads', 'Aumy Clinic', 'Aumy Journey', 'Aumy Chat', 'Aumy Voice', 'Aumy One'],
  rows: [
    ['Ad enquiries in one leads list, with follow-up', ['yes', 'no', 'no', 'no', 'no', 'yes']],
    ['Which ad brought which patient', ['yes', 'no', 'no', 'no', 'no', 'yes']],
    ['Google profile and review replies', ['yes', 'no', 'no', 'no', 'no', 'yes']],
    ['WhatsApp enquiries answered and booked by AI', ['opt', 'no', 'no', 'yes', 'no', 'yes']],
    ['Phone calls answered and booked by AI', ['opt', 'no', 'no', 'no', 'yes', 'yes']],
    ['Appointments, records, charting, billing', ['no', 'yes', 'yes', 'no', 'no', 'yes']],
    ['Aumy Scribe: typed or spoken notes', ['no', 'opt', 'opt', 'no', 'no', 'yes']],
    ['Digital registration, intake and consent', ['no', 'yes', 'yes', 'no', 'no', 'yes']],
    ['Reminders, no-show and after-care messages', ['no', 'no', 'yes', 'no', 'no', 'yes']],
    ['Treatment follow-up, recalls and win-back', ['no', 'no', 'yes', 'no', 'no', 'yes']],
    ['One patient record across everything', ['no', 'no', 'no', 'no', 'no', 'yes']],
  ],
};

const FAQS = [
  { q: 'Can I buy just one module of the dental clinic software?', a: 'Yes. Aumy Leads, Aumy Clinic, Aumy Journey, Aumy Chat and Aumy Voice can each be bought on their own. Many clinics start with the one problem that hurts most — usually unanswered WhatsApp, missed calls or unfollowed leads — and add the rest later.' },
  { q: 'If I start with one module, can I add the others later?', a: 'Yes. Every module is built on the same platform, so one you add later joins up with what you already have. Take them all and you have Aumy One. Nothing is set up twice.' },
  { q: 'Do I have to change my current dental software?', a: 'No. Aumy Chat, Aumy Voice, Aumy Leads and the patient follow-ups can run alongside the software you use today. If you want one connected platform, we move your data into Aumy Clinic for a one-time fee.' },
  { q: 'Does Aumy Scribe write in the patient’s file on its own?', a: 'No. It prepares the chart from the doctor’s typed note or spoken words, and nothing is saved until the doctor accepts it. The doctor stays in charge of every record.' },
  { q: 'Which languages do Aumy Chat and Aumy Voice speak?', a: 'English, Hindi and Marathi, on WhatsApp and on calls. On WhatsApp the AI replies in the language the patient writes in.' },
  { q: 'How much does each module cost?', a: 'Aumy Clinic has a starting price on our pricing page. Aumy Chat, Aumy Voice and the follow-ups are priced with you, once we know which modules and how many enquiries your clinic has.' },
];

module.exports = { TITLE, DESCRIPTION, HERO, MODULES, CONNECTED, TABLE, FAQS };
module.exports.default = module.exports;
