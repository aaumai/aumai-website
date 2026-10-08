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

module.exports = { DENTISTS_ONLY, TRAINED_FOR_DENTISTRY, MODULES_LINE, AI_TRAINED_FOR_DENTISTRY, WHY_DENTAL_ONLY, LD_SUFFIX };
