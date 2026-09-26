/**
 * The founder — Jayesh Chaudhari (owner, 2026-09-26: "put my bio about the
 * founder: 18 years into healthcare, deep understanding of clinic workflows,
 * healthcare compliance and AI; built Aumy after working closely with dental
 * clinics in the USA, Dubai and India", plus his career history).
 *
 * ONE copy of the words: the About page (src/pages/AboutPage.js), the home
 * page's founder note and the crawler HTML (scripts/prerender.js, slug
 * 'about') all read this file, so they can never drift apart.
 */
const NAME = 'Jayesh Chaudhari';
const ROLE = 'Founder, Aumy';
const YEARS = '18';
const COUNTRIES = ['USA', 'Dubai', 'India'];

const SUMMARY =
  `${YEARS} years inside healthcare technology — clinic workflows, revenue cycle, compliance, interoperability and AI. ` +
  'He built Aumy after working closely with dental clinics in the USA, Dubai and India.';

const STORY = [
  'I started Aumy after seeing the same problem in clinic after clinic. It usually wasn’t a lack of patients — many clinics already had full chairs. The problem was everything happening around those chairs.',
  'Calls unanswered while the team was with patients. WhatsApp enquiries waiting for a reply. Appointments to confirm and reschedule. No-shows nobody had time to recover. Treatment plans quietly stalling, care gaps left open, patients drifting away — and much of the patient journey still running on paper, WhatsApp and memory.',
  'The team wasn’t failing. The clinic had outgrown the way it operated. This wasn’t a patient-acquisition problem; it was a coordination problem.',
  'So I’m building Aumy — the AI operating system for growing dental clinics. It doesn’t just record what happened; it actively manages the work around every patient journey, so clinics can grow without growing the chaos.',
];

const EXPERTISE = [
  { title: 'Clinic workflows', body: 'From the front desk to billing: registration, scheduling, follow-ups and the revenue cycle end to end — how work really moves through a clinic.' },
  { title: 'Healthcare compliance', body: 'Patient data kept private and secure by design — years of building systems that pass the strictest US healthcare rules (HIPAA, CMS quality programmes).' },
  { title: 'Interoperability', body: 'Making clinic software talk to each other — moving patient records between systems without losing a thing (FHIR, HL7; Allscripts, Cerner).' },
  { title: 'AI in healthcare', body: 'AI that reads, writes and follows up the way a good team member would — built on years of turning clinical notes and records into usable data.' },
];

// Most recent first. Dates as on his profile.
const CAREER = [
  { years: '2025 –', role: 'Founder', org: 'Aumy (AUM AI)', what: 'The AI operating system for growing dental clinics — convert, care, retain, reactivate. Live with paying dental clinics in India.' },
  { years: '2023 – 2025', role: 'Product Manager', org: 'Abacus Insights', what: 'Healthcare data platforms on FHIR/HL7 joining EHR, claims and third-party data; care-gap closure and risk adjustment; GenAI (Llama + RAG) for clinical insight.' },
  { years: '2021 – 2022', role: 'Product Owner', org: 'FIGmd', what: 'A MIPS quality-measurement platform built with specialty clinical registries for CMS compliance.' },
  { years: '2019 – 2022', role: 'Healthcare IT Consultant', org: 'Coaction, for Medline Industries', what: 'Led engineering of a revenue-cycle platform — claims, eligibility and remittance — with HIPAA-compliant EDI.' },
  { years: '2018 – 2019', role: 'Tech Lead, ETL', org: 'Datascribe Technologies', what: 'Large EHR migrations to and from Cerner, clinical data lakes and NLP on unstructured notes; a 9-hour pipeline cut to 45 minutes.' },
  { years: '2016 – 2019', role: 'Senior Software Engineer', org: 'Evolent', what: 'Moved population-health and health-plan operations to India and led a team of 10+; automation that cut manual monitoring by ~95%.' },
  { years: '2011 – 2019', role: 'Sr EDI Consultant & Sr Technical Consultant', org: 'Allscripts', what: 'The revenue cycle end to end, the HIPAA 5010 transition, Meaningful Use reporting and TouchWorks EHR data migration.' },
];

const QUOTE =
  'I’ve spoken to hundreds of dental clinics. Many of the clinics interested in Aumy aren’t struggling to fill their chairs. Their chairs are already full. The problem is everything happening around those chairs.';

module.exports = { NAME, ROLE, YEARS, COUNTRIES, SUMMARY, STORY, EXPERTISE, CAREER, QUOTE };
module.exports.default = module.exports;
