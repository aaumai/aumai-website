/**
 * /modules — ONE copy of the words (owner 2026-10-08: "break and sell each
 * module separately for those who want separate modules, and for those who
 * want 1 connected system, the entire system"). The React page
 * (src/pages/ModulesPage.js) and the crawler HTML + JSON-LD
 * (scripts/prerender.js) both read this file. Edit here, never there.
 *
 * Module names approved by the owner 2026-10-08 (lead module renamed Aumy Convert the same day): Aumy Convert, Aumy Clinic
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
    id: 'dental-lead-management',
    icon: 'leads',
    short: 'Aumy Convert',
    title: 'Lead Nurturing & Meta Ads Optimisation',
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
    id: 'dental-clinic-management-software',
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
    id: 'dental-patient-follow-up',
    icon: 'journey',
    short: 'Aumy Journey',
    title: 'Clinic OS with the End-to-End Patient Journey',
    forWho: 'For clinics that want every patient followed up automatically.',
    promise: 'Aumy Clinic plus every follow-up your desk never has time for: reminders, no-show rebooking, after-care, reviews, treatment follow-up and recalls.',
    does: [
      'Appointment reminders on WhatsApp; patients confirm or ask to move the visit with one tap.',
      'Patients who miss an appointment are messaged to rebook — no one is forgotten.',
      'After-care messages after treatment, and a review request once the visit is done.',
      'Follows up patients on treatments the doctor advised or planned but they haven’t booked (picked up from the doctor’s notes with Aumy Scribe, or entered by the team).',
      'Recalls and check-ups followed up when due; patients who drifted away invited back.',
    ],
    addons: ['Aumy Scribe', 'Approve each message first', 'Birthday & festival wishes'],
    more: { path: '/ai-patient-engagement', label: 'The AI-powered patient journey' },
  },
  {
    id: 'whatsapp-ai-receptionist-for-dentists',
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
      'All your clinic WhatsApp numbers in one place: one screen that looks just like WhatsApp, so the team never switches phones.',
      'Runs on the official WhatsApp Business API, on your clinic’s own number.',
    ],
    addons: ['Facebook & Instagram messages', 'Aumy Convert', 'Aumy Clinic'],
    more: { path: '/whatsapp-automation-for-clinics', label: 'WhatsApp automation for clinics' },
  },
  {
    id: 'ai-voice-receptionist-for-dentists',
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
    addons: ['Outbound calls', 'Aumy Convert', 'Aumy Clinic'],
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
  cols: ['Aumy Convert', 'Aumy Clinic', 'Aumy Journey', 'Aumy Chat', 'Aumy Voice', 'Aumy One'],
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
  { q: 'Can I buy just one module of the dental clinic software?', a: 'Yes. Aumy Convert, Aumy Clinic, Aumy Journey, Aumy Chat and Aumy Voice can each be bought on their own. Many clinics start with the one problem that hurts most — usually unanswered WhatsApp, missed calls or unfollowed leads — and add the rest later.' },
  { q: 'If I start with one module, can I add the others later?', a: 'Yes. Every module is built on the same platform, so one you add later joins up with what you already have. Take them all and you have Aumy One. Nothing is set up twice.' },
  { q: 'Do I have to change my current dental software?', a: 'No. Aumy Chat, Aumy Voice, Aumy Convert and the patient follow-ups can run alongside the software you use today. If you want one connected platform, we move your data into Aumy Clinic for a one-time fee.' },
  { q: 'Does Aumy Scribe write in the patient’s file on its own?', a: 'No. It prepares the chart from the doctor’s typed note or spoken words, and nothing is saved until the doctor accepts it. The doctor stays in charge of every record.' },
  { q: 'Which languages do Aumy Chat and Aumy Voice speak?', a: 'English, Hindi and Marathi, on WhatsApp and on calls. On WhatsApp the AI replies in the language the patient writes in.' },
  { q: 'How much does each module cost?', a: 'Aumy Clinic has a starting price on our pricing page. Aumy Chat, Aumy Voice and the follow-ups are priced with you, once we know which modules and how many enquiries your clinic has.' },
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
const byId = (id) => MODULES.find((m) => m.id === id);

// Home section (src/components/HomeModules.js and the home crawler HTML).
const HOME = {
  eyebrow: 'Aumy is built from modules',
  title: 'Pick one, combine any, or run them all as Aumy One.',
  sub: 'Each module does one job in your clinic and can be bought on its own. Put two or three together, or run the whole thing as one connected system with one patient record. Tap a module to see what it does, who it suits and what you get.',
};

const PAGES = [
  {
    id: 'dental-lead-management',
    icon: 'leads',
    short: 'Aumy Convert',
    title: 'Lead Nurturing & Meta Ads Optimisation',
    seoTitle: 'Dental Lead Management Software — Aumy Convert',
    h1: 'Aumy Convert: dental lead management',
    sub: 'Every enquiry from your ads followed up until it becomes a booked patient.',
    seoDescription: 'Dental lead management software: every Facebook and Instagram ad enquiry answered, followed up and tracked to a booked patient, with cost per patient.',
    keyword: 'dental lead management software',
    card: 'Every ad enquiry followed up and tracked to a booked patient.',
    intro: `${byId('dental-lead-management').promise} Aumy Convert is dental lead management software for clinics that spend on Facebook and Instagram ads.`,
    does: byId('dental-lead-management').does,
    whoFor: [
      'You run Facebook or Instagram ads and enquiries arrive faster than your team can call back.',
      'Leads go quiet after the first reply, and nobody has time to keep following up.',
      'You cannot tell which ad actually brought patients into the chair.',
      'You want your Google profile and reviews looked after without a marketing team.',
    ],
    outcomes: [
      'No enquiry from your ads is left unanswered or forgotten.',
      'Your team spends its time on people who want to book, not on chasing a spreadsheet.',
      'You can see which campaigns bring patients and which only bring clicks, and spend accordingly.',
      'Meta learns from the enquiries that became real patients, so it can find more people like them.',
    ],
    addons: byId('dental-lead-management').addons,
    pairs: ['whatsapp-ai-receptionist-for-dentists', 'ai-voice-receptionist-for-dentists', 'dental-patient-follow-up'],
    deep: [{ path: '/facebook-instagram', label: 'Facebook & Instagram receptionist' }],
  },
  {
    id: 'dental-clinic-management-software',
    icon: 'os',
    short: 'Aumy Clinic',
    title: 'Dental Clinic Operating System',
    seoTitle: 'Dental Clinic Management Software — Aumy Clinic',
    h1: 'Aumy Clinic: dental clinic management software',
    sub: 'Your diary, patient records, charting and billing — all in one place.',
    seoDescription: 'Dental clinic management software: appointments, patient records, tooth charting, treatment plans and billing in one place, for one chair or many branches.',
    keyword: 'dental clinic management software',
    card: 'Appointments, records, charting, treatment plans and billing.',
    intro: `${byId('dental-clinic-management-software').promise} Aumy Clinic is dental clinic management software that runs the whole day, from the front desk to the doctor’s chair.`,
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
      { path: '/ai-dental-software-india', label: 'Dental software in India: how to choose' },
      { path: '/switch', label: 'Moving from your current dental software' },
    ],
  },
  {
    id: 'ai-clinical-notes-for-dentists',
    icon: 'scribe',
    short: 'Aumy Scribe',
    title: 'AI Clinical Documentation',
    addonOf: 'Aumy Clinic',
    seoTitle: 'AI Clinical Notes for Dentists — Aumy Scribe',
    h1: 'Aumy Scribe: AI clinical notes for dentists',
    sub: 'Speak or type a short note; the chart fills itself, and advised treatments never get forgotten.',
    seoDescription: 'AI clinical notes for dentists: type a short note or just speak, and Aumy Scribe fills the dental chart. Nothing is saved until the doctor accepts it.',
    keyword: 'AI clinical notes for dentists',
    card: 'Type or speak a short note; Aumy fills the chart for you to accept.',
    intro: `${byId('dental-clinic-management-software').scribe.promise} Aumy Scribe gives dentists AI clinical notes without changing how they work. It is an add-on to Aumy Clinic.`,
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
      'No advised treatment slips through: every treatment the doctor recommends is on a list, so the clinic can follow up with patients who haven’t booked it yet — automatically with Aumy Journey.',
      'Notes are done in moments, while the visit is still fresh.',
      'Patient records are complete, so the next visit and the follow-ups have what they need.',
      'The doctor stays in charge of every entry in the record.',
    ],
    addons: [],
    pairs: ['dental-patient-follow-up', 'dental-clinic-management-software'],
    deep: [{ path: '/ai-dental-clinic-operations', label: 'AI for dental clinic operations' }],
  },
  {
    id: 'dental-patient-follow-up',
    icon: 'journey',
    short: 'Aumy Journey',
    title: 'Clinic OS with the End-to-End Patient Journey',
    seoTitle: 'Dental Patient Follow-Up & Recall Software — Aumy Journey',
    h1: 'Aumy Journey: dental patient follow-up',
    sub: 'Fewer no-shows, more patients coming back for the treatment and the check-up you advised.',
    seoDescription: 'Dental patient reminder and recall software: WhatsApp reminders, no-show rebooking, after-care, reviews, treatment follow-up and recalls, on Aumy Clinic.',
    keyword: 'dental patient reminder and recall software',
    card: 'Reminders, no-show rebooking, advised-treatment follow-up, after-care, reviews and recalls.',
    intro: `${byId('dental-patient-follow-up').promise} Aumy Journey is dental patient reminder and recall software built into the clinic system, so every message knows the patient’s visits and treatment.`,
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
    deep: [{ path: '/ai-patient-engagement', label: 'The AI-powered patient journey' }],
  },
  {
    id: 'whatsapp-ai-receptionist-for-dentists',
    icon: 'chat',
    short: 'Aumy Chat',
    title: 'AI WhatsApp Receptionist',
    seoTitle: 'WhatsApp AI Receptionist for Dentists — Aumy Chat',
    h1: 'Aumy Chat: WhatsApp AI receptionist for dentists',
    sub: 'Every WhatsApp answered in seconds, day or night — and the slot booked.',
    seoDescription: 'Aumy Chat, the WhatsApp AI receptionist for dental clinics: every message answered in seconds, day or night, with real appointments booked for you.',
    keyword: 'WhatsApp AI receptionist for dental clinics',
    card: 'Every WhatsApp answered in seconds, with real slots booked.',
    intro: `${byId('whatsapp-ai-receptionist-for-dentists').promise} Aumy Chat is a WhatsApp AI receptionist for dental clinics that works on your own clinic number.`,
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
    pairs: ['ai-voice-receptionist-for-dentists', 'dental-lead-management', 'dental-patient-follow-up'],
    deep: [
      { path: '/whatsapp-automation-for-clinics', label: 'WhatsApp automation for clinics' },
      { path: '/ai-receptionist', label: 'AI receptionist for dental clinics' },
    ],
  },
  {
    id: 'ai-voice-receptionist-for-dentists',
    icon: 'phone',
    short: 'Aumy Voice',
    title: 'AI Voice Receptionist',
    seoTitle: 'AI Voice Receptionist for Dentists — Aumy Voice',
    h1: 'Aumy Voice: AI voice receptionist for dentists',
    sub: 'Every call picked up, even when the desk is busy or the clinic is closed.',
    seoDescription: 'Aumy Voice, the AI voice receptionist for dental clinics: every call answered, appointments booked, moved and checked, and calls passed to your staff.',
    keyword: 'AI voice receptionist for dental clinics',
    card: 'Every call answered; books, moves and checks appointments.',
    intro: `${byId('ai-voice-receptionist-for-dentists').promise} Aumy Voice is an AI voice receptionist for dental clinics, working from your doctors’ real calendars.`,
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
    pairs: ['whatsapp-ai-receptionist-for-dentists', 'dental-lead-management', 'dental-patient-follow-up'],
    deep: [{ path: '/ai-receptionist', label: 'AI receptionist for dental clinics' }],
  },
  {
    id: 'automate-dental-clinic-operations',
    icon: 'all',
    short: 'Aumy One',
    title: 'The Connected Dental Clinic System',
    featured: true,
    seoTitle: 'Automate Dental Clinic Operations — Aumy One',
    h1: 'Aumy One: automate your dental clinic operations',
    sub: 'Everything above as one system — from the first enquiry to the next recall.',
    seoDescription: 'Automate your dental clinic operations: leads, appointments, records, AI notes, follow-ups and AI WhatsApp and voice receptionists on one patient record.',
    keyword: 'automate dental clinic operations',
    card: 'Every module working as one, from the first enquiry to the next recall.',
    intro: `${CONNECTED.sub} Aumy One is all-in-one dental clinic software: every module joined up, so nothing is typed twice and no patient falls between tools.`,
    does: CONNECTED.steps.map((s) => `${s.title}: ${s.body}`),
    whoFor: [
      'You want one system instead of separate tools for the desk, WhatsApp, calls and follow-ups.',
      'You run several branches or doctors and want the whole picture in one place.',
      'You are growing and want the coordination handled, not added to your team’s day.',
    ],
    outcomes: CONNECTED.why.map(([t, b]) => `${t}. ${b}`),
    addons: [],
    pairs: ['dental-lead-management', 'dental-clinic-management-software', 'dental-patient-follow-up', 'whatsapp-ai-receptionist-for-dentists', 'ai-voice-receptionist-for-dentists'],
    deep: [
      { path: '/revenue-generator', label: 'How Aumy works' },
      { path: '/ai-dental-clinic-operations', label: 'AI-powered dental clinic operations' },
      { path: '/ai-patient-engagement', label: 'The AI-powered patient journey' },
    ],
  },
];
const pageById = (id) => PAGES.find((p) => p.id === id);

// Old module URLs → keyword URLs (owner 2026-10-08). React redirects (ModuleDetailPage) and
// prerendered stubs with canonical + meta refresh (scripts/prerender.js); never in the sitemap.
const OLD_SLUGS = {
  'aumy-leads': 'dental-lead-management',
  'aumy-convert': 'dental-lead-management',
  'aumy-clinic': 'dental-clinic-management-software',
  'aumy-scribe': 'ai-clinical-notes-for-dentists',
  'aumy-journey': 'dental-patient-follow-up',
  'aumy-chat': 'whatsapp-ai-receptionist-for-dentists',
  'aumy-voice': 'ai-voice-receptionist-for-dentists',
  'aumy-one': 'automate-dental-clinic-operations',
  'all-in-one-dental-software': 'automate-dental-clinic-operations',
};

module.exports = { TITLE, DESCRIPTION, HERO, MODULES, CONNECTED, TABLE, FAQS, HOME, PAGES, pageById, OLD_SLUGS };
module.exports.default = module.exports;
