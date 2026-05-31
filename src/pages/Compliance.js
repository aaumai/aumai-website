import React, { useEffect } from 'react';
import { setPageSeo } from '../utils/seo';
import './Page.css';

// Dedicated trust document. Linked from /revenue-generator, /platform-partner,
// and the footer. Copy is accuracy-checked against
// C:\Users\jchau\AUM AI EHR Project\PROJECT_INFO.md — only built capabilities are
// claimed. Regulatory frameworks are framed as "aligned / aware / ready", never
// "certified", per the handover accuracy guardrails. The footer disclaimer is
// mandatory and must not be removed.
const Compliance = () => {
  useEffect(() => {
    setPageSeo({
      title: 'Security & Compliance | AUMY Healthcare Platform',
      description:
        'AUMY is built on healthcare-grade infrastructure: patient data isolation, encryption, ABDM/FHIR R4 readiness, DPDP Act 2023 alignment, and granular access control.',
      canonical: 'https://aumai.co.in/compliance',
      image: 'https://aumai.co.in/screenshots/roi-preview.png',
    });
  }, []);

  const h2 = { color: '#0f172a', marginBottom: '15px', fontSize: '1.6rem' };
  const sec = { marginBottom: '34px' };
  const lead = { marginBottom: '16px' };
  const ul = { marginLeft: '24px', marginBottom: '8px', lineHeight: '1.9' };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Healthcare-grade security, built in.</h1>
          <p className="page-subtitle">
            AUMY is designed for the regulatory requirements of Indian and UAE healthcare providers.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          lineHeight: '1.8',
          color: '#334155',
        }}>
          <p style={{ marginBottom: '24px', fontSize: '1.1rem' }}>
            AUMY is built for clinics that handle sensitive patient data. Security and data
            protection are part of the platform&rsquo;s architecture — not features bolted on
            afterwards. This page summarises how we protect data and which regulatory frameworks
            the platform is designed to support.
          </p>

          {/* 1 — Data Security */}
          <section style={sec}>
            <h2 style={h2}>1. Data Security</h2>
            <ul style={ul}>
              <li><strong>Patient data isolation:</strong> every clinic runs as a fully isolated
                tenant with Row-Level Security enforced at the database layer — a logged-in user of
                one clinic cannot read or modify another clinic&rsquo;s data, even through direct API calls.</li>
              <li><strong>Encryption at rest:</strong> the database and object storage are encrypted
                with AES-256 (AWS KMS). Sensitive secrets (provider API keys, WhatsApp/Meta tokens,
                telehealth vendor secrets) are additionally encrypted with AES-256-GCM using a
                separate application-level key before storage.</li>
              <li><strong>Encryption in transit:</strong> all traffic is protected with TLS 1.3.
                Patient records never travel unprotected.</li>
              <li><strong>Authentication:</strong> JWT-based authentication with refresh tokens,
                bcrypt-hashed passwords, and optional TOTP multi-factor authentication for staff accounts.</li>
              <li><strong>Audit logging:</strong> every record access, edit, and deletion is written
                to an append-only audit trail. Deletes inside the clinical platform are soft deletes
                (<code>deleted_at</code>) that preserve audit history — nothing is silently changed
                or erased.</li>
            </ul>
          </section>

          {/* 2 — Data Residency & Sub-processors */}
          <section style={sec}>
            <h2 style={h2}>2. Data Residency &amp; Sub-processors</h2>
            <p style={lead}>
              Our primary database and application servers run in <strong>AWS Mumbai
              (ap-south-1)</strong> for Indian data residency. For white-label and multi-region
              deployments, data can be kept in the clinic&rsquo;s own jurisdiction — for example,
              UAE clinics subject to Dubai Health Authority rules can pin telehealth recordings and
              data to the UAE region.
            </p>
            <ul style={ul}>
              <li>Cross-border transfers occur only where a sub-processor (an LLM, messaging, or
                payment provider) is hosted in another region, under that provider&rsquo;s published
                data-protection terms.</li>
              <li>We operate under <strong>Business Associate Agreements (BAA) / Data Processing
                Agreements (DPA)</strong> with our infrastructure and AI sub-processors — including
                <strong> AWS</strong> and <strong>Anthropic</strong> — where a HIPAA-covered or
                DPA-required engagement applies.</li>
              <li>Patient identifiers are de-identified before any prompt that leaves our
                infrastructure, where the use case permits.</li>
              <li>We do not sell personal data, and we do not use patient data to train external AI
                models.</li>
            </ul>
          </section>

          {/* 3 — Regulatory Alignment */}
          <section style={sec}>
            <h2 style={h2}>3. Regulatory Alignment</h2>
            <ul style={ul}>
              <li><strong>India — ABDM &amp; ABHA:</strong> FHIR R4-native data model with ABHA
                linking and a consent manager built in. Ready for the Ayushman Bharat Digital Mission.</li>
              <li><strong>India — DPDP Act 2023:</strong> patient consent capture, data-access logs,
                and right-to-erasure workflows are part of the platform, aligned with the Digital
                Personal Data Protection Act 2023.</li>
              <li><strong>UAE — DHA / NABIDH:</strong> FHIR R4 interoperability and data-localisation
                options, designed with awareness of the Dubai Health Authority and NABIDH health
                information exchange framework.</li>
              <li><strong>US — HIPAA-aware architecture:</strong> encryption, access controls, audit
                logging, and sub-processor BAAs follow HIPAA-aligned practices. AUMY is not formally
                HIPAA-certified; we provide a HIPAA-aware architecture and execute a BAA for
                HIPAA-covered engagements.</li>
              <li><strong>EU / global — GDPR-aligned:</strong> data-subject rights to access,
                correction, erasure, restriction, and portability are supported.</li>
              <li><strong>Coding standards:</strong> FHIR R4 throughout, with ICD-10, SNOMED CT,
                LOINC, and RxNorm coding built in.</li>
            </ul>
          </section>

          {/* 4 — Access & Governance */}
          <section style={sec}>
            <h2 style={h2}>4. Access &amp; Governance</h2>
            <ul style={ul}>
              <li><strong>Granular role-based access control</strong> down to individual actions
                (40+ permission types) — receptionists, doctors, and admins each see only what they should.</li>
              <li><strong>Role-scoped facility access:</strong> multi-location clinics can scope a
                user to specific facilities.</li>
              <li><strong>Reviewable AI:</strong> AUMY&rsquo;s clinical drafts and recommendations are
                always reviewable — the clinician remains the decision-maker.</li>
              <li><strong>Full user-action audit trail</strong> across clinical and configuration changes.</li>
            </ul>
          </section>

          <p style={{
            marginTop: '36px',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0',
            fontSize: '0.85rem',
            color: '#64748b',
            lineHeight: '1.7',
          }}>
            AUMY is designed to support compliance with the frameworks described above. Healthcare
            providers are responsible for their own regulatory obligations and should consult
            qualified legal and compliance counsel for their jurisdiction.
          </p>

          <p style={{ marginTop: '20px', fontSize: '0.95rem' }}>
            Questions from your IT or compliance team? Email{' '}
            <a href="mailto:jayesh.chaudhari@aumai.co.in">jayesh.chaudhari@aumai.co.in</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
