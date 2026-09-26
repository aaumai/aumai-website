/**
 * /compliance — ONE copy of the words (AEO/SEO pass, 2026-09-26), moved here
 * VERBATIM from src/pages/Compliance.js so the crawler HTML (scripts/
 * prerender.js) carries the full page. Before, crawlers and AI assistants saw
 * 34 words — and "is it secure / where is data stored / DPDP?" is exactly what
 * they get asked.
 *
 * Accuracy guardrails (unchanged): copy is checked against the EHR project's
 * PROJECT_INFO.md; only built capabilities are claimed; frameworks are
 * "aligned / aware / ready", never "certified". The DISCLAIMER is mandatory.
 */
const TITLE = 'Security & Compliance | Aumy Healthcare Platform';
const DESCRIPTION =
  'Aumy is built on healthcare-grade infrastructure: patient data isolation, encryption, ABDM/FHIR R4 readiness, DPDP Act 2023 alignment, and granular access control.';
const HEADLINE = 'Healthcare-grade security, built in.';
const SUBTITLE = 'Aumy is designed for the regulatory requirements of Indian and UAE healthcare providers.';
const INTRO =
  'Aumy is built for clinics that handle sensitive patient data. Security and data protection are part of the platform’s architecture — not features bolted on afterwards. This page summarises how we protect data and which regulatory frameworks the platform is designed to support.';

// Each item: [bold lead, rest] — the lead may be '' for a plain bullet.
const SECTIONS = [
  {
    title: '1. Data Security',
    items: [
      ['Patient data isolation:', 'every clinic runs as a fully isolated tenant with Row-Level Security enforced at the database layer — a logged-in user of one clinic cannot read or modify another clinic’s data, even through direct API calls.'],
      ['Encryption at rest:', 'the database and object storage are encrypted with AES-256 (AWS KMS). Sensitive secrets (provider API keys, WhatsApp/Meta tokens, telehealth vendor secrets) are additionally encrypted with AES-256-GCM using a separate application-level key before storage.'],
      ['Encryption in transit:', 'all traffic is protected with TLS 1.3. Patient records never travel unprotected.'],
      ['Authentication:', 'JWT-based authentication with refresh tokens, bcrypt-hashed passwords, and optional TOTP multi-factor authentication for staff accounts.'],
      ['Audit logging:', 'every record access, edit, and deletion is written to an append-only audit trail. Deletes inside the clinical platform are soft deletes (deleted_at) that preserve audit history — nothing is silently changed or erased.'],
    ],
  },
  {
    title: '2. Data Residency & Sub-processors',
    lead: 'Our primary database and application servers run in AWS Mumbai (ap-south-1) for Indian data residency. For white-label and multi-region deployments, data can be kept in the clinic’s own jurisdiction — for example, UAE clinics subject to Dubai Health Authority rules can pin telehealth recordings and data to the UAE region.',
    items: [
      ['', 'Cross-border transfers occur only where a sub-processor (an LLM, messaging, or payment provider) is hosted in another region, under that provider’s published data-protection terms.'],
      ['', 'We operate under Business Associate Agreements (BAA) / Data Processing Agreements (DPA) with our infrastructure and AI sub-processors — including AWS and Anthropic — where a HIPAA-covered or DPA-required engagement applies.'],
      ['', 'Patient identifiers are de-identified before any prompt that leaves our infrastructure, where the use case permits.'],
      ['', 'We do not sell personal data, and we do not use patient data to train external AI models.'],
    ],
  },
  {
    title: '3. Regulatory Alignment',
    items: [
      ['India — ABDM & ABHA:', 'FHIR R4-native data model with ABHA linking and a consent manager built in. Ready for the Ayushman Bharat Digital Mission.'],
      ['India — DPDP Act 2023:', 'patient consent capture, data-access logs, and right-to-erasure workflows are part of the platform, aligned with the Digital Personal Data Protection Act 2023.'],
      ['UAE — DHA / NABIDH:', 'FHIR R4 interoperability and data-localisation options, designed with awareness of the Dubai Health Authority and NABIDH health information exchange framework.'],
      ['US — HIPAA-aware architecture:', 'encryption, access controls, audit logging, and sub-processor BAAs follow HIPAA-aligned practices. Aumy is not formally HIPAA-certified; we provide a HIPAA-aware architecture and execute a BAA for HIPAA-covered engagements.'],
      ['EU / global — GDPR-aligned:', 'data-subject rights to access, correction, erasure, restriction, and portability are supported.'],
      ['Coding standards:', 'FHIR R4 throughout, with ICD-10, SNOMED CT, LOINC, and RxNorm coding built in.'],
    ],
  },
  {
    title: '4. Access & Governance',
    items: [
      ['Granular role-based access control', 'down to individual actions (40+ permission types) — receptionists, doctors, and admins each see only what they should.'],
      ['Role-scoped facility access:', 'multi-location clinics can scope a user to specific facilities.'],
      ['Reviewable AI:', 'Aumy’s clinical drafts and recommendations are always reviewable — the clinician remains the decision-maker.'],
      ['Full user-action audit trail', 'across clinical and configuration changes.'],
    ],
  },
];

const DISCLAIMER =
  'Aumy is designed to support compliance with the frameworks described above. Healthcare providers are responsible for their own regulatory obligations and should consult qualified legal and compliance counsel for their jurisdiction.';
const CONTACT_EMAIL = 'jayesh.chaudhari@aumai.co.in';

module.exports = { TITLE, DESCRIPTION, HEADLINE, SUBTITLE, INTRO, SECTIONS, DISCLAIMER, CONTACT_EMAIL };
module.exports.default = module.exports;
