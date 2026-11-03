/**
 * NABH support copy (owner 2026-11-04) — ONE copy of the words. Read by the Aumy Clinic module page
 * (src/pages/ModuleDetailPage.js), /compliance, the dedicated page /nabh-dental-clinic-software
 * (src/pages/NabhPage.js) and the crawler HTML (scripts/prerender.js).
 * Accuracy: NABH accredits clinics, not software. Never write "NABH certified / compliant / approved
 * software" as a claim. No prices on the site.
 */
const PATH = '/nabh-dental-clinic-software';
const MODULE_PATH = '/modules/dental-clinic-management-software';

const HEADING = 'Built for NABH-ready dental clinics';
const LEAD = 'Aumy keeps the records NABH accreditation looks for, as part of your team’s normal day — no extra paperwork.';
const BULLETS = [
  'A unique patient ID (UHID) and a visit number on every record, in your clinic’s own numbering',
  'Registration and treatment consent forms, filled in from the patient’s record, signed and kept with the visit',
  'Written treatment estimates before treatment, and detailed, itemised bills',
  'Examination, diagnosis, treatment plan and prescriptions recorded for every visit',
  'A full change history: who changed what, and when',
  'Patient consent and data-access records, in line with India’s DPDP Act',
  'Treatment acceptance reports by doctor',
];
const FOOTNOTE = 'NABH accredits clinics, not software. Aumy helps your team keep the documentation accreditation asks for; the accreditation itself is your clinic’s process.';

const TITLE = 'NABH-Ready Dental Clinic Software in India | Aumy'; // 50 chars
const DESCRIPTION = 'Dental clinic management software for NABH documentation: UHID, consent forms, treatment estimates, itemised bills and a full change history. See Aumy.'; // ~152
const H1 = 'NABH-ready dental clinic software for India';
const SUB = 'Dental clinic management software that keeps the NABH documentation your accreditation asks for: patient IDs, consent forms, estimates, itemised bills and visit records.';

// Short block for /compliance.
const COMPLIANCE_BLOCK = {
  title: 'NABH documentation for dental clinics',
  body: 'Aumy keeps the records NABH accreditation looks for: a UHID and visit number on every record, consent forms, written estimates, itemised bills and a full change history. NABH accredits clinics, not software.',
  linkLabel: 'See how Aumy supports NABH documentation for your dental clinic',
};

// Section blocks for the dedicated page (H2s carry the search phrases).
const SECTIONS = [
  {
    h2: 'UHID and visit numbers for your dental clinic',
    body: 'Every patient gets a unique patient ID (UHID) and every visit gets a visit number, in your dental clinic’s own numbering. Registration forms and treatment consent forms are filled in from the patient’s record, signed, and kept with the visit as digital consent forms.',
  },
  {
    h2: 'Treatment estimates and itemised dental billing',
    body: 'Give the patient a written treatment estimate before treatment starts, then a detailed, itemised bill. Dental treatment estimate software and dental billing software with itemised bills are part of the same patient record, not separate tools.',
  },
  {
    h2: 'Dental EMR: every visit recorded',
    body: 'Examination, diagnosis, treatment plan and prescriptions are recorded for every visit in your electronic dental records. A full change history shows who changed what, and when. Treatment acceptance reports show how each doctor is doing.',
  },
  {
    h2: 'DPDP-aligned patient records',
    body: 'Patient consent and data-access records are kept in line with India’s DPDP Act, so your team can answer who saw or changed a patient’s record.',
  },
];

const FAQS = [
  {
    q: 'Is Aumy NABH certified?',
    a: 'No software is NABH certified — NABH accredits clinics. Aumy helps your dental clinic keep the records accreditation asks for: UHID, consent forms, estimates, itemised bills, visit records and a full change history.',
  },
  {
    q: 'Looking for NABH compliant dental software?',
    a: 'NABH does not certify or approve software; it accredits clinics. What a dental clinic needs is software that keeps the documentation accreditation asks for. Aumy keeps a UHID and visit number on every record, consent forms, written estimates, itemised bills and a full change history.',
  },
  {
    q: 'What does a dental clinic need for NABH accreditation documentation?',
    a: 'Accreditation looks for documentation such as a unique patient ID, registration and consent forms, treatment estimates and bills, and a record of every visit. Aumy keeps these as part of your team’s normal day, with no extra paperwork. The accreditation itself is your clinic’s process.',
  },
  {
    q: 'Can I use my own UHID and visit numbering?',
    a: 'Yes. Aumy gives every patient a unique patient ID (UHID) and every visit a visit number, in your clinic’s own numbering.',
  },
  {
    q: 'Does Aumy keep digital consent forms and patient registration forms for a dental clinic?',
    a: 'Yes. Registration and treatment consent forms are filled in from the patient’s record, signed, and kept with the visit. Patient consent and data-access records are kept in line with India’s DPDP Act.',
  },
];

const KEYWORDS = 'NABH dental clinic software, NABH accreditation for dental clinic, NABH-ready dental software India, dental clinic management software India, dental practice management software, dental EMR India, UHID for dental clinic, digital consent forms for dental clinic, dental treatment estimate software, dental billing software with itemised bills, patient registration form dental clinic, NABH documentation dental clinic, DPDP compliant patient records';

module.exports = { PATH, MODULE_PATH, HEADING, LEAD, BULLETS, FOOTNOTE, TITLE, DESCRIPTION, H1, SUB, COMPLIANCE_BLOCK, SECTIONS, FAQS, KEYWORDS };
module.exports.default = module.exports;
