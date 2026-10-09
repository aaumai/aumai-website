/**
 * "Handcrafted only for dentists" — owner 2026-10-08: "mention Aumy is
 * handcrafted only for dentists and Aumy is trained for dentistry." Owner
 * chose the words "trained for dentistry" (not "speaks dentistry").
 *
 * ONE copy of the words: the React pages (Home, Modules, AI receptionist,
 * WhatsApp automation, About) and the crawler HTML + JSON-LD
 * (scripts/prerender.js) and llms.txt (scripts/seo-files.js) all read this file.
 *
 * Honesty rule: never add detail about HOW it is trained — no "our own model",
 * "fine-tuned", dataset sizes. Every specific below is checked against the
 * product (aum-ehr-api, 2026-10-08): FDI tooth-numbered charting, the dental
 * treatment master, recalls / care gaps, perio charting and lab work all exist.
 */

const DENTISTS_ONLY = 'Handcrafted only for dentists.';

// Home hero supporting line.
const TRAINED_FOR_DENTISTRY =
  'Aumy is trained for dentistry — it knows dental treatments, tooth numbers, recalls and how a dental clinic’s day runs.';

// /modules intro.
const MODULES_LINE = 'Every module is handcrafted only for dentists. Aumy is trained for dentistry.';

// /ai-receptionist and /whatsapp-automation-for-clinics.
const AI_TRAINED_FOR_DENTISTRY = 'Handcrafted only for dentists. Aumy’s AI is trained for dentistry.';

// /about — why dental-only.
const WHY_DENTAL_ONLY = {
  eyebrow: 'Why only dentists',
  title: 'Handcrafted only for dentists.',
  body:
    'A dental clinic does not run like any other clinic. Charting is tooth by tooth, treatment plans run over several visits, crowns wait on the lab, and patients are due back for recalls. ' +
    'Generic clinic software files all of that away as notes. Aumy is built around it — and Aumy is trained for dentistry: it knows dental treatments, tooth numbers, recalls and how a dental clinic’s day runs.',
};

// Appended to the product / organisation descriptions (JSON-LD, llms.txt).
const LD_SUFFIX = 'Handcrafted only for dentists and trained for dentistry: Aumy knows dental treatments, tooth numbers, recalls and how a dental clinic’s day runs.';

// Home hero (owner-approved 2026-10-08): lead line + "What changes in your clinic" outcomes.
// Read by src/pages/Home.js AND scripts/prerender.js — change here, both follow.
const HERO_MODULES = [
  { id: 'whatsapp-ai-receptionist-for-dentists', name: 'Aumy Chat', outcome: 'every WhatsApp answered in seconds, day or night, and the appointment booked into your diary — and all your clinic WhatsApp numbers in one screen that looks just like WhatsApp.' },
  { id: 'ai-voice-receptionist-for-dentists', name: 'Aumy Voice', outcome: 'every call picked up, even when the desk is busy or the clinic is closed. No patient lost to a missed call.' },
  { id: 'dental-lead-management', name: 'Aumy Convert', outcome: 'Leads Nurturing: every enquiry from your ads followed up until they book, and you see which ads bring real patients.' },
  { id: 'dental-patient-follow-up', name: 'Aumy Journey', outcome: 'fewer no-shows, missed visits rebooked, advised treatments followed up, recalls coming back on time.' },
  { id: 'dental-clinic-management-software', name: 'Aumy Clinic', outcome: 'appointments, records, charting, treatment plans and billing in one place; add Aumy Scribe: speak the note, the chart fills itself.' },
  { id: 'automate-dental-clinic-operations', name: 'Aumy One', outcome: 'one system that includes everything, customised to your clinic’s needs: one patient record, nothing falling between tools.' },
];
const HERO_OUTCOMES_HEADING = 'What changes in your clinic:';

// Home hero, loss framing (owner 2026-10-08: "Stop losing patients … lets sell loss"). Each leak links to the one module that stops it.
const HERO_LEAKS_INTRO = 'Every dental clinic loses patients somewhere:';
const HERO_LEAKS = [
  { leak: 'Leads not followed up — and lost', id: 'dental-lead-management', name: 'Aumy Convert' },
  { leak: 'Missed calls', id: 'ai-voice-receptionist-for-dentists', name: 'Aumy Voice' },
  { leak: 'Slow WhatsApp replies — patients book elsewhere', id: 'whatsapp-ai-receptionist-for-dentists', name: 'Aumy Chat' },
  { leak: 'Last-minute cancellations', id: 'dental-patient-follow-up', name: 'Aumy Journey' },
  { leak: 'No-shows', id: 'dental-patient-follow-up', name: 'Aumy Journey' },
  { leak: 'Treatments left incomplete', id: 'dental-patient-follow-up', name: 'Aumy Journey' },
  { leak: 'Treatment advised — and never followed up', id: 'dental-patient-follow-up', name: 'Aumy Journey' },
];
const HERO_LEAKS_CLOSE = 'Aumy stops every one of these leaks. Pick the one costing your clinic most and fix only that — buy only what you need.';

// Owner 2026-10-08: the whole-system path, shown after the leaks.
const HERO_ONE_LINE = 'Or automate your dental clinic operations end to end with Aumy One.';

module.exports = { HERO_LEAKS_INTRO, HERO_LEAKS, HERO_LEAKS_CLOSE, HERO_ONE_LINE, HERO_MODULES, HERO_OUTCOMES_HEADING, DENTISTS_ONLY, TRAINED_FOR_DENTISTRY, MODULES_LINE, AI_TRAINED_FOR_DENTISTRY, WHY_DENTAL_ONLY, LD_SUFFIX };
