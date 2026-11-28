/**
 * /modules — ONE copy of the words (owner 2026-10-08: "break and sell each
 * module separately for those who want separate modules, and for those who
 * want 1 connected system, the entire system"). The React page
 * (src/pages/ModulesPage.js) and the crawler HTML + JSON-LD
 * (scripts/prerender.js) both read this file. Edit here, never there.
 *
 * Names: see the 22 Nov 2026 note below (the 8 Oct module names are retired). Each card shows the short name, the formal
 * name (which carries the search keywords) and a one-line promise.
 *
 * SEO (2026-10-08): this page owns "dental clinic software modules" — the
 * buy-one-or-all intent. It must NOT compete with the pages that own the deep
 * terms, so each card links OUT to its owner with that keyword as the anchor:
 *   AI receptionist for dental clinics  → /ai-receptionist
 *   WhatsApp automation for clinics      → /whatsapp-automation-for-clinics
 *   dental software India / cost         → /ai-dental-software-india
 *   patient journey / follow-ups         → /modules/dental-patient-follow-up (old /ai-patient-engagement 301s there)
 *
 * Every claim is checked against the product code (aum-ehr-api / aum-ehr-web,
 * 2026-10-08). Deliberately NOT claimed: missed call → WhatsApp follow-up,
 * patients paying the clinic online, inventory, languages beyond English /
 * Hindi / Marathi, and any treatment or visit data sent to Meta (clinics send
 * Meta an anonymous lead signal only — health-data rules). No prices anywhere
 * on the website (owner 2026-11-02).
 *
 * 22 Nov 2026 (owner): Aumy is ONE product. The base is "Clinic OS + Automated Patient Journey"; the add-ons are
 * "WhatsApp AI receptionist" and "Voice AI receptionist" (the names on the standard proposal). "Aumy Convert" and
 * "Aumy One" left the sales copy: their pages redirect (OLD_SLUGS) to the base page, so no old link breaks. The
 * Clinic OS and Aumy Scribe pages stay as parts of the base (AI documentation is included in the base plan).
 * Self-serve sign-up is not sold until 7 Feb 2027 (src/data/appStores.js SELF_SERVE_IDS is empty).
 *
 * `module.exports` on purpose: the prerender script is plain Node.
 */


const TITLE = 'Aumy: Clinic OS, Patient Journey, AI Receptionists'; // 51 chars
const DESCRIPTION = 'Aumy is one product for dental clinics: Clinic OS + Automated Patient Journey, plus a WhatsApp AI receptionist and a Voice AI receptionist.'; // 141 chars

const HERO = {
  eyebrow: 'One product for your dental clinic',
  title: 'Start with the base. Add the AI receptionists you need.',
  sub: 'Aumy is one product. The base is Clinic OS + Automated Patient Journey: your clinic software and every follow-up, done for you. Add the WhatsApp AI receptionist, the Voice AI receptionist, or both. It all runs on one patient record.',
};

// The names on the standard proposal (owner 2026-11-22).
const BASE_NAME = 'Clinic OS + Automated Patient Journey';
const WA_NAME = 'WhatsApp AI receptionist';
const VOICE_NAME = 'Voice AI receptionist';

// The Clinic OS part of the base. Not a card on /modules (it is not sold on its own); its page
// /modules/dental-clinic-management-software stays, because it owns "dental clinic management software".
const CLINIC_OS = {
  id: 'dental-clinic-management-software',
  icon: 'os',
  short: 'Clinic OS',
  title: 'Dental Clinic Operating System',
  forWho: 'Part of the base plan, Clinic OS + Automated Patient Journey.',
  promise: 'Appointments, patient records, charting, treatment plans and billing in one place, for one chair or many branches.',
  does: [
    'Appointments and every doctor’s calendar in one place, across all your branches.',
    'Each patient’s full record — history, X-rays, documents and prescriptions — in one click.',
    'Dental charting and treatment plans on a tooth chart; invoices, accounts and reports.',
    'Registration, medical history and consent filled in and signed on the patient’s phone.',
    'Lab work tracked, and a login for every staff member with only what their role needs.',
  ],
  scribe: {
    short: 'Aumy Scribe',
    title: 'AI Clinical Documentation',
    promise: 'The doctor types a short note or just speaks; Aumy fills the chart, and nothing is saved until the doctor accepts it.',
  },
  addons: [],
  more: { path: '/ai-dental-software-india', label: 'Dental software in India: how to choose' },
};

// `addons` are shown as chips ("+ name"). `more` links out to the page that owns the deep keyword.
// The cards on /modules: the base, then the two add-ons.
const MODULES = [
  {
    id: 'dental-patient-follow-up',
    icon: 'journey',
    short: BASE_NAME,
    title: 'The base plan: your clinic software and every follow-up',
    forWho: 'Every clinic on Aumy starts here.',
    promise: 'Appointments, records, charting and billing, plus every follow-up your desk never has time for: reminders, no-show rebooking, after-care, reviews, treatment follow-up and recalls.',
    does: [
      'Appointments, every doctor’s calendar, patient records, tooth charting, treatment plans and billing in one place.',
      'Registration, medical history and consent filled in and signed on the patient’s phone.',
      'Appointment reminders on WhatsApp; patients confirm or ask to move the visit with one tap.',
      'Patients who miss an appointment are messaged to rebook — no one is forgotten.',
      'After-care messages after treatment, and a review request once the visit is done.',
      'Follows up patients on treatments the doctor advised or planned but they haven’t booked.',
      'Recalls and check-ups followed up when due; patients who drifted away invited back.',
    ],
    // AI documentation is part of the base plan (owner 2026-10-28).
    scribe: CLINIC_OS.scribe,
    addons: [WA_NAME, VOICE_NAME, 'Approve each message first', 'Birthday & festival wishes'],
    more: { path: '/modules/dental-clinic-management-software', label: 'The Clinic OS in detail' },
  },
  {
    id: 'whatsapp-ai-receptionist-for-dentists',
    icon: 'chat',
    short: WA_NAME,
    title: 'Add-on to the base · AI WhatsApp receptionist for dental clinics',
    forWho: 'For clinics whose WhatsApp fills up faster than the desk can reply.',
    promise: 'Every WhatsApp message answered in seconds, day or night, in the patient’s language, with real appointments booked into your calendar.',
    does: [
      'Answers questions about treatments, timings and directions from your clinic’s own information.',
      'Books the appointment into a real free slot in your doctor’s calendar.',
      'Replies in English, Hindi or Marathi, and understands voice notes and photos patients send.',
      'Your team can take over any chat with one tap; the AI steps back while they talk.',
      'All your clinic WhatsApp numbers in one place: one screen that looks just like WhatsApp, so the team never switches phones.',
      'Runs on the official WhatsApp Business API, on your clinic’s own number.',
    ],
    addons: ['Facebook & Instagram messages', VOICE_NAME],
    more: { path: '/whatsapp-automation-for-clinics', label: 'WhatsApp automation for clinics' },
  },
  {
    id: 'ai-voice-receptionist-for-dentists',
    icon: 'phone',
    short: VOICE_NAME,
    title: 'Add-on to the base · AI voice receptionist for dental clinics',
    forWho: 'For clinics that miss calls when the desk is busy or closed.',
    promise: 'Every call to the clinic answered, even when the desk is busy or closed. It books, moves and checks appointments, and passes calls to staff.',
    does: [
      'Knows who is calling, and works from the doctor’s real availability.',
      'Speaks English, Hindi or Marathi.',
      'Passes the call to your team’s phone when a person is needed.',
      'Every call is recorded and written out, so you can see exactly what was said.',
      'Can also call patients for you — for example, a reminder call before a visit.',
    ],
    addons: ['Outbound calls', WA_NAME],
    more: { path: '/ai-receptionist', label: 'AI receptionist for dental clinics' },
  },
];

// The connected-system band: how the one product works end to end (no separate product name).
const CONNECTED = {
  eyebrow: 'One product, one patient record',
  short: 'Aumy',
  title: 'How it all works together',
  sub: 'The base and the AI receptionists share one calendar and one patient record, from the first enquiry to the next recall.',
  steps: [
    { title: 'Enquiry', body: 'A patient sees your ad or finds you on Google, and messages or calls.' },
    { title: 'Reply & booking', body: 'The WhatsApp AI receptionist replies in seconds or the Voice AI receptionist answers the call, and books a real slot.' },
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

// Rows × the base, the two add-ons and all three together. yes / opt (add-on) / no.
const TABLE = {
  title: 'What each part covers',
  sub: 'Every row is something Aumy does today. The base comes first; the AI receptionists are add-ons to it.',
  caption: 'The last column is the base with both AI receptionists.',
  cols: [BASE_NAME, WA_NAME, VOICE_NAME, 'All three'],
  rows: [
    ['Appointments, records, charting, billing', ['yes', 'no', 'no', 'yes']],
    ['Aumy Scribe: typed or spoken notes', ['yes', 'no', 'no', 'yes']],
    ['Digital registration, intake and consent', ['yes', 'no', 'no', 'yes']],
    ['Reminders, no-show and after-care messages', ['yes', 'no', 'no', 'yes']],
    ['Treatment follow-up, recalls and win-back', ['yes', 'no', 'no', 'yes']],
    ['WhatsApp enquiries answered and booked by AI', ['no', 'yes', 'no', 'yes']],
    ['Phone calls answered and booked by AI', ['no', 'no', 'yes', 'yes']],
  ],
};

const FAQS = [
  { q: 'Is Aumy one product or separate modules?', a: `One product. Every clinic starts with ${BASE_NAME}: the clinic software and every follow-up. Add the ${WA_NAME}, the ${VOICE_NAME}, or both. It all runs on one patient record.` },
  { q: 'Can I add the AI receptionists later?', a: 'Yes. Add either one whenever you are ready; it joins the same calendar and the same patient record. Nothing is set up twice.' },
  { q: 'Do I have to change my current dental software?', a: 'You can keep it and run Aumy alongside it, or move fully to Aumy: whatever system you use today, we move your patients, visits, treatments, bills, X-rays and images into Aumy within the week.' },
  { q: 'Does Aumy Scribe write in the patient’s file on its own?', a: 'No. It prepares the chart from the doctor’s typed note or spoken words, and nothing is saved until the doctor accepts it. The doctor stays in charge of every record.' },
  { q: 'Which languages do the AI receptionists speak?', a: 'English, Hindi and Marathi, on WhatsApp and on calls. On WhatsApp the AI replies in the language the patient writes in.' },
];

// ---------------------------------------------------------------------------
// One page per module at /modules/<id> (owner 2026-10-08: "each card takes the
// user to that separate module page where they can see what the module exactly
// does, who it is suitable for and what would be the outcome of it").
// The React template (src/pages/ModuleDetailPage.js), the home cards
// (src/components/HomeModules.js) and the crawler HTML (scripts/prerender.js)
// all read PAGES. `does` for the five sold modules is the vetted list above.
// Outcomes are plain results — never invented numbers.
// SEO: each page owns ONE keyword; /ai-receptionist and
// /whatsapp-automation-for-clinics stay the owners of their deep keywords —
// module pages link to them as the deep dives.
// ---------------------------------------------------------------------------
const byId = (id) => [...MODULES, CLINIC_OS].find((m) => m.id === id);

// Home section (src/components/HomeModules.js and the home crawler HTML).
const HOME = {
  eyebrow: 'Aumy is one product',
  title: 'Start with the base. Add the AI receptionists you need.',
  sub: 'The base is Clinic OS + Automated Patient Journey. Add the WhatsApp AI receptionist, the Voice AI receptionist, or both. Tap a part to see what it does, who it suits and what you get.',
};

const PAGES = [
  {
    id: 'dental-clinic-management-software',
    icon: 'os',
    short: 'Clinic OS',
    title: 'Dental Clinic Operating System',
    // Owner 2026-11-22: part of the base plan, Clinic OS + Automated Patient Journey; not sold on its own.
    // Owner 2026-11-13: this page targets "AI dental practice management software" and also covers "dental clinic
    // management software". The H1 stays as it is.
    seoTitle: 'AI Dental Practice Management Software · Aumy',
    h1: 'Aumy Clinic OS: dental clinic management software',
    sub: 'Your diary, patient records, charting and billing — all in one place.',
    seoDescription: 'Aumy’s Clinic OS is AI dental practice management software for India: appointments, records, charting and billing. Dental clinic management software with AI built in.',
    keyword: 'dental clinic management software',
    ldSubCategory: 'AI dental practice management software / dental clinic management software',
    ldDescription: 'Aumy’s Clinic OS is AI dental practice management software for dental clinics in India, also known as dental clinic management software: appointments and doctor calendars, patient records with tooth charting, X-rays, treatment plans, prescriptions, consent forms and billing, with AI clinical notes (Aumy Scribe) and Aumy’s AI receptionist booking into the same calendar.',
    // Pooled proof (src/data/proof.js) and the questions below: shown on the page and in the FAQPage JSON-LD.
    proof: true,
    faqTitle: 'AI dental practice management software: questions, answered',
    faqs: [
      {
        q: 'What is dental practice management software?',
        a: 'Dental practice management software, also called dental clinic management software, is the system a dental clinic runs its day on: the appointment diary and every doctor’s calendar, patient records with tooth charting, X-rays and photos, treatment plans, prescriptions, consent forms, invoices, payments and reports. It replaces registers, Excel sheets and paper files.',
      },
      {
        q: 'What makes Aumy AI dental practice management software?',
        a: 'The doctor can type or simply speak a short note, and Aumy Scribe (included in the base plan) fills the chart for the doctor to accept. Aumy’s AI receptionist answers patients on WhatsApp and calls and books straight into the same calendar, and follow-ups go out on their own from the same patient record.',
      },
      {
        q: 'Can we move our records from our current software?',
        a: 'Yes. Whatever system you use today, we move your patients, visits, treatments, bills, X-rays and images into Aumy within the week. You can also keep your current practice software and run Aumy alongside it.',
      },
      {
        q: 'Does it work for more than one doctor or branch?',
        a: 'Yes. One calendar and one patient record across doctors and branches, and a login for each staff member that shows only what their role needs.',
      },
      {
        q: 'How much does dental practice management software from Aumy cost?',
        a: 'It depends on your clinic: how many chairs, doctors and branches, and what you switch on. A short call with Jayesh gives you the exact figure, before anything starts.',
      },
    ],
    card: 'Appointments, records, charting, treatment plans and billing.',
    intro: `${byId('dental-clinic-management-software').promise} Aumy’s Clinic OS is dental clinic management software that runs the whole day, from the front desk to the doctor’s chair. It comes with the Automated Patient Journey in Aumy’s base plan.`,
    does: byId('dental-clinic-management-software').does,
    whoFor: [
      'You run the clinic on paper, Excel or old software and want one simple system.',
      'You have more than one branch or doctor and need one calendar and one patient record.',
      'Your team wastes time hunting for X-rays, reports and old treatment notes.',
      'You are moving from another dental software and want your history brought across.',
    ],
    outcomes: [
      'Every patient’s history is one click away, for every doctor and every branch.',
      'The front desk books, bills and registers patients without paper or double entry.',
      'Each staff member sees only what their role needs.',
      'You can see how the clinic is doing from the reports, not from guesswork.',
    ],
    addons: byId('dental-clinic-management-software').addons,
    pairs: ['ai-clinical-notes-for-dentists', 'dental-patient-follow-up', 'whatsapp-ai-receptionist-for-dentists'],
    deep: [
      // Owner 2026-11-13: home, this page and /ai-receptionist link to each other.
      { path: '/', label: 'Aumy: AI dental clinic software' },
      { path: '/ai-receptionist', label: 'AI receptionist for dental clinics' },
      { path: '/ai-dental-software-india', label: 'Dental software in India: how to choose' },
      { path: '/switch', label: 'Moving from your current dental software' },
    ],
  },
  {
    id: 'ai-clinical-notes-for-dentists',
    icon: 'scribe',
    short: 'Aumy Scribe',
    title: 'AI Clinical Documentation',
    seoTitle: 'AI Clinical Notes for Dentists — Aumy Scribe',
    h1: 'Aumy Scribe: AI clinical notes for dentists',
    sub: 'Speak or type a short note; the chart fills itself, and advised treatments never get forgotten.',
    seoDescription: 'AI clinical notes for dentists: type a short note or just speak, and Aumy Scribe fills the dental chart. Nothing is saved until the doctor accepts it.',
    keyword: 'AI clinical notes for dentists',
    card: 'Type or speak a short note; Aumy fills the chart for you to accept.',
    intro: `${byId('dental-clinic-management-software').scribe.promise} Aumy Scribe gives dentists AI clinical notes without changing how they work. It is included in Clinic OS + Automated Patient Journey, Aumy’s base plan.`,
    does: [
      'The doctor types a short note in their own words, or simply speaks it.',
      'Aumy reads the note and prepares the chart entries from it.',
      'Treatments the doctor advises or plans in the note — say, a root canal on 36 or a crown next visit — are picked up as advised and planned treatments on the patient’s record.',
      'The doctor checks what Aumy prepared, and accepts it, changes it or drops it.',
      'Nothing goes into the patient’s record until the doctor accepts it.',
    ],
    whoFor: [
      'Doctors who finish a long day and still have notes to write up.',
      'Clinics where notes are short or missing because there is no time between patients.',
      'Clinics that want complete records without hiring someone to type them.',
      'Clinics where patients are told they need a treatment and never come back to have it done.',
    ],
    outcomes: [
      'No advised treatment slips through: every treatment the doctor recommends is on a list, so the clinic can follow up with patients who haven’t booked it yet — automatically with the Automated Patient Journey.',
      'Notes are done in moments, while the visit is still fresh.',
      'Patient records are complete, so the next visit and the follow-ups have what they need.',
      'The doctor stays in charge of every entry in the record.',
    ],
    addons: [],
    pairs: ['dental-patient-follow-up', 'dental-clinic-management-software'],
    deep: [{ path: '/modules/dental-patient-follow-up', label: 'Clinic OS + Automated Patient Journey: the base plan' }],
  },
  {
    id: 'dental-patient-follow-up',
    icon: 'journey',
    short: BASE_NAME,
    title: 'The base plan: your clinic software and every follow-up',
    base: true,
    seoTitle: 'Dental Patient Follow-Up & Recall Software | Aumy',
    h1: 'Clinic OS + Automated Patient Journey: dental patient follow-up',
    sub: 'Fewer no-shows, more patients coming back for the treatment and the check-up you advised.',
    seoDescription: 'Dental patient reminder and recall software: WhatsApp reminders, no-show rebooking, after-care, reviews, treatment follow-up and recalls, with the Clinic OS.',
    keyword: 'dental patient reminder and recall software',
    card: 'Reminders, no-show rebooking, advised-treatment follow-up, after-care, reviews and recalls.',
    intro: `${byId('dental-patient-follow-up').promise} Aumy’s base plan is dental patient reminder and recall software built into the clinic system, so every message knows the patient’s visits and treatment.`,
    does: byId('dental-patient-follow-up').does,
    whoFor: [
      'Patients forget appointments and your desk has no time to call everyone.',
      'Missed visits are never followed up, so those patients drift away.',
      'Doctors advise treatment that patients never come back to start.',
      'Your list of patients due for a check-up keeps growing and nobody works it.',
    ],
    outcomes: [
      'Fewer empty chairs from forgotten appointments.',
      'Patients who miss a visit are asked to rebook instead of being lost.',
      'Advised treatment and check-ups are followed up without your team having to remember.',
      'Happy patients are asked for a review at the right moment.',
    ],
    addons: byId('dental-patient-follow-up').addons,
    pairs: ['ai-clinical-notes-for-dentists', 'whatsapp-ai-receptionist-for-dentists', 'ai-voice-receptionist-for-dentists'],
    deep: [{ path: '/revenue-generator', label: 'How Aumy works' }],
  },
  {
    id: 'whatsapp-ai-receptionist-for-dentists',
    icon: 'chat',
    short: WA_NAME,
    title: 'Add-on to the base · AI WhatsApp receptionist for dental clinics',
    seoTitle: 'WhatsApp AI Receptionist for Dentists | Aumy',
    h1: 'WhatsApp AI receptionist for dentists',
    sub: 'Every WhatsApp answered in seconds, day or night — and the slot booked.',
    seoDescription: 'Aumy’s WhatsApp AI receptionist for dental clinics: every message answered in seconds, day or night, with real appointments booked for you.',
    keyword: 'WhatsApp AI receptionist for dental clinics',
    card: 'Every WhatsApp answered in seconds, with real slots booked.',
    intro: `${byId('whatsapp-ai-receptionist-for-dentists').promise} Aumy’s WhatsApp AI receptionist is an add-on to the base plan and works on your own clinic number.`,
    does: byId('whatsapp-ai-receptionist-for-dentists').does,
    whoFor: [
      'Your WhatsApp fills up faster than the desk can reply.',
      'Enquiries arrive at night and on Sundays, when nobody is there to answer.',
      'Patients ask the same questions about timings, treatments and directions all day.',
    ],
    outcomes: [
      'Patients get an answer in seconds instead of hours, so fewer go elsewhere.',
      'Appointments get booked even while the clinic is closed.',
      'Your team handles only the chats that really need a person.',
    ],
    addons: byId('whatsapp-ai-receptionist-for-dentists').addons,
    pairs: ['ai-voice-receptionist-for-dentists', 'dental-patient-follow-up'],
    deep: [
      { path: '/whatsapp-automation-for-clinics', label: 'WhatsApp automation for clinics' },
      { path: '/ai-receptionist', label: 'AI receptionist for dental clinics' },
    ],
  },
  {
    id: 'ai-voice-receptionist-for-dentists',
    icon: 'phone',
    short: VOICE_NAME,
    title: 'Add-on to the base · AI voice receptionist for dental clinics',
    seoTitle: 'AI Voice Receptionist for Dentists | Aumy',
    h1: 'Voice AI receptionist for dentists',
    sub: 'Every call picked up, even when the desk is busy or the clinic is closed.',
    seoDescription: 'Aumy’s Voice AI receptionist for dental clinics: every call answered, appointments booked, moved and checked, and calls passed to your staff.',
    keyword: 'AI voice receptionist for dental clinics',
    card: 'Every call answered; books, moves and checks appointments.',
    intro: `${byId('ai-voice-receptionist-for-dentists').promise} Aumy’s Voice AI receptionist is an add-on to the base plan, working from your doctors’ real calendars.`,
    does: byId('ai-voice-receptionist-for-dentists').does,
    whoFor: [
      'Calls go unanswered when the desk is busy with the patients in front of them.',
      'The phone rings after hours and at lunch, and those callers never call back.',
      'Your receptionist spends the day on calls that only check or move an appointment.',
    ],
    outcomes: [
      'Callers reach the clinic every time, not a phone that rings out.',
      'Simple calls are handled without taking your team away from patients.',
      'You can read any call to see exactly what was said.',
    ],
    addons: byId('ai-voice-receptionist-for-dentists').addons,
    pairs: ['whatsapp-ai-receptionist-for-dentists', 'dental-patient-follow-up'],
    deep: [{ path: '/ai-receptionist', label: 'AI receptionist for dental clinics' }],
  },
];
const pageById = (id) => PAGES.find((p) => p.id === id);

// Old module URLs → keyword URLs (owner 2026-10-08). React redirects (ModuleDetailPage) and
// prerendered stubs with canonical + meta refresh (scripts/prerender.js); never in the sitemap.
// 22 Nov 2026 (owner): Aumy Convert and Aumy One are no longer sold by name; their pages redirect to the base plan.
const OLD_SLUGS = {
  'dental-lead-management': 'dental-patient-follow-up',
  'automate-dental-clinic-operations': 'dental-patient-follow-up',
  'aumy-leads': 'dental-patient-follow-up',
  'aumy-convert': 'dental-patient-follow-up',
  'aumy-clinic': 'dental-clinic-management-software',
  'aumy-scribe': 'ai-clinical-notes-for-dentists',
  'aumy-journey': 'dental-patient-follow-up',
  'aumy-chat': 'whatsapp-ai-receptionist-for-dentists',
  'aumy-voice': 'ai-voice-receptionist-for-dentists',
  'aumy-one': 'dental-patient-follow-up',
  'all-in-one-dental-software': 'dental-patient-follow-up',
};

module.exports = { TITLE, DESCRIPTION, HERO, MODULES, CONNECTED, TABLE, FAQS, HOME, PAGES, pageById, OLD_SLUGS };
module.exports.default = module.exports;
