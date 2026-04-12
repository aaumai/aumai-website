import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AumyProduct.css';
import './Page.css';

const AumyProduct = () => {
  useEffect(() => {
    document.title = 'AUMY · AUM AI HealthSystem | Voice-First AI for Healthcare';
  }, []);

  const capabilities = [
    {
      title: 'Ambient Scribe',
      description:
        'Click Start. Talk to the patient. Click Stop. 47 seconds later, a structured SOAP note, HPI, chief complaint, and vitals — extracted from the conversation.',
      color: '#10b981',
      icon: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z',
    },
    {
      title: 'ICD-10 + CPT Coding',
      description:
        'Primary and secondary diagnoses mapped from the assessment. CPT procedure codes identified and queued for billing. Every code validated against its reference set.',
      color: '#3b82f6',
      icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
    },
    {
      title: 'Medication Reconciliation',
      description:
        'Meds reconciled against RxNorm with dose, route, frequency, and sig. Allergies cross-checked against new prescriptions before they ever reach the chart.',
      color: '#8b5cf6',
      icon: 'M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3',
    },
    {
      title: 'Voice-First Care Gaps',
      description:
        '"Hey AUMY, any open care gaps?" A multi-agent workflow pulls eCQM measures and runs denominator, exclusion, and numerator checks in parallel — no clicking.',
      color: '#f43f5e',
      icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622',
    },
    {
      title: 'Workflow Engine (Visual DAG)',
      description:
        'Compose clinical workflows as graphs of deterministic steps and sub-agent nodes. Change a workflow without shipping a release.',
      color: '#06b6d4',
      icon: 'M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5',
    },
    {
      title: 'FHIR R4 + ABDM Ready',
      description:
        'Every clinical fact stored as a FHIR R4 resource. ABHA linking, consent manager, and ABDM exchange from day one — interoperability is not an afterthought.',
      color: '#f59e0b',
      icon: 'M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25',
    },
  ];

  const agents = [
    { title: 'Scribe Agent', blurb: 'Turns a patient conversation into structured SOAP, HPI, vitals, and chief complaint.' },
    { title: 'Coder Agent', blurb: 'Picks ICD-10, CPT, and RxNorm codes from the documented assessment and validates them.' },
    { title: 'Care Gap Agent', blurb: 'Runs eCQM denominator, exclusion, and numerator checks against the patient record.' },
    { title: 'Referral Agent', blurb: 'Drafts referral letters with the right clinical context for the receiving specialty.' },
    { title: 'Prior Auth Agent', blurb: 'Builds the PA packet from the encounter and payer-specific rules.' },
    { title: 'Risk Agent', blurb: 'Scores readmission, deterioration, and no-show risk on every encounter.' },
  ];

  const demoSteps = [
    { number: '01', title: 'Click Start Ambient', text: 'AUMY begins listening. No scripted prompts, no keyboard.' },
    { number: '02', title: 'Talk to the patient', text: 'The clinician has a normal conversation. The chart is untouched.' },
    { number: '03', title: 'Click Stop', text: '47 seconds later AUMY returns a full structured encounter.' },
    { number: '04', title: 'Review and sign', text: 'Every item is reviewable and editable. One click saves to the chart.' },
  ];

  const stats = [
    { value: '47s', label: 'From conversation to signed encounter' },
    { value: '1,000+', label: 'Medical codes pre-loaded' },
    { value: '6+', label: 'Specialized sub-agents' },
    { value: 'FHIR R4', label: 'Native data model' },
  ];

  return (
    <div className="aumy-page">
      {/* Hero */}
      <section className="aumy-hero">
        <div className="aumy-hero-bg">
          <div className="aumy-orb aumy-orb-1"></div>
          <div className="aumy-orb aumy-orb-2"></div>
          <div className="aumy-orb aumy-orb-3"></div>
          <div className="aumy-grid"></div>
        </div>

        <div className="container">
          <div className="aumy-hero-content">
            <div className="aumy-hero-badge">
              <span className="aumy-badge-dot"></span>
              Flagship Product · In Production
            </div>

            <h1 className="aumy-hero-title">
              Meet <span className="aumy-gradient">AUMY</span>.
              <br />
              The voice-first AI operating system
              <br />
              for modern health systems.
            </h1>

            <p className="aumy-hero-subtitle">
              AUMY powers AUM AI HealthSystem — a production multi-tenant EHR where ambient scribing,
              ICD-10 coding, care gap evaluation, and clinical workflows all run behind a single
              voice-first interface on every screen.
            </p>

            <div className="aumy-hero-cta">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request a Live Demo
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/insights/introducing-aumy-ai-operating-system-for-healthcare" className="btn btn-secondary btn-lg">
                Read the Launch Article
              </Link>
            </div>

            <div className="aumy-hero-stats">
              {stats.map((s, i) => (
                <div key={i} className="aumy-hero-stat">
                  <span className="aumy-stat-value">{s.value}</span>
                  <span className="aumy-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 47 Second Demo */}
      <section className="section aumy-demo-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">The 47-Second Encounter</span>
            <h2 className="section-title">
              From a patient conversation to a signed encounter — before the clinician stands up.
            </h2>
            <p className="section-subtitle">
              Physicians spend two hours charting for every one hour of patient care. AUMY gives that time back.
            </p>
          </div>

          <div className="aumy-demo-steps">
            {demoSteps.map((step, i) => (
              <div key={i} className="aumy-demo-step">
                <span className="aumy-demo-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>

          <div className="aumy-demo-callout">
            <div className="aumy-demo-callout-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            </div>
            <div className="aumy-demo-callout-body">
              <strong>"Hey AUMY, any open care gaps on this patient?"</strong>
              <p>
                A multi-agent workflow spins up, pulls the relevant eCQM measures, runs denominator, exclusion,
                and numerator checks in parallel, and comes back with: "Three open care gaps. HbA1c overdue by
                four months. Annual retinal screening missed. BP uncontrolled on current therapy. Here is the
                evidence." All from a voice command.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section aumy-caps-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What AUMY Does</span>
            <h2 className="section-title">One AI surface. A team of specialized agents underneath.</h2>
            <p className="section-subtitle">
              Every capability is built on a structured FHIR R4 data model, scoped to the right tenant and
              facility, and auditable end-to-end.
            </p>
          </div>

          <div className="aumy-caps-grid">
            {capabilities.map((cap, i) => (
              <div key={i} className="aumy-cap-card" style={{ '--cap-color': cap.color }}>
                <div className="aumy-cap-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={cap.icon} />
                  </svg>
                </div>
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-Agents */}
      <section className="section aumy-agents-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Specialized Sub-Agents</span>
            <h2 className="section-title">Focused experts, composable into any workflow.</h2>
            <p className="section-subtitle">
              Clinical AI is not one big prompt. It is a conductor and a section of specialists, each judged
              on its own correctness criteria and each auditable on its own terms.
            </p>
          </div>

          <div className="aumy-agents-grid">
            {agents.map((a, i) => (
              <div key={i} className="aumy-agent-card">
                <div className="aumy-agent-dot"></div>
                <h4>{a.title}</h4>
                <p>{a.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section aumy-arch-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Under the Hood</span>
            <h2 className="section-title">Multi-tenant. Standards-native. Auditable.</h2>
          </div>

          <div className="aumy-arch-grid">
            <div className="aumy-arch-card">
              <h3>Multi-Tenant from Day One</h3>
              <p>
                Every table carries a <code>tenant_id</code>. PostgreSQL row-level security enforces isolation at
                the query layer. Facility scoping on top of tenant scoping. AI agents inherit the same access
                boundaries as the clinician invoking them.
              </p>
            </div>
            <div className="aumy-arch-card">
              <h3>FHIR R4 Data Model</h3>
              <p>
                Every clinical fact AUMY writes — SOAP notes, diagnoses, medications, vitals, procedures — lands
                as a structured FHIR R4 resource. Any chart can be serialized as a FHIR Bundle for exchange.
              </p>
            </div>
            <div className="aumy-arch-card">
              <h3>ABDM Ready</h3>
              <p>
                ABHA ID linking, consent manager, and health record exchange are first-class features. No
                separate integration project for Indian interoperability requirements.
              </p>
            </div>
            <div className="aumy-arch-card">
              <h3>Modular Selling</h3>
              <p>
                Appointments, encounters, scribe, telehealth, RPM, billing — every module is independently
                gated in the service layer. Clinics buy what they need; hospitals turn on the rest.
              </p>
            </div>
            <div className="aumy-arch-card">
              <h3>1,000+ Medical Codes Pre-Loaded</h3>
              <p>ICD-10, CPT, LOINC, RxNorm, SNOMED CT, CVX. Reference sets ship with the platform.</p>
            </div>
            <div className="aumy-arch-card">
              <h3>Visual Workflow Engine</h3>
              <p>
                A DAG editor where clinical workflows are composed as graphs of deterministic steps and sub-agent
                nodes. Change a workflow by editing the graph — not by shipping a release.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section aumy-roadmap-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What Is Next</span>
            <h2 className="section-title">From "documents the visit" to "shapes the visit."</h2>
          </div>

          <div className="aumy-roadmap-list">
            <div className="aumy-roadmap-item">
              <span className="aumy-roadmap-tag">Shipping</span>
              <div>
                <h4>Ambient Scribe · ICD-10 Coder · Care Gap Agent</h4>
                <p>In production in the current release.</p>
              </div>
            </div>
            <div className="aumy-roadmap-item">
              <span className="aumy-roadmap-tag aumy-roadmap-tag-next">Next</span>
              <div>
                <h4>Clinical Decision Support on Every Encounter</h4>
                <p>Drug interactions, dose range warnings, contraindication checks, and guideline nudges rendered inline.</p>
              </div>
            </div>
            <div className="aumy-roadmap-item">
              <span className="aumy-roadmap-tag aumy-roadmap-tag-next">Next</span>
              <div>
                <h4>Predictive Risk Scoring</h4>
                <p>Readmission, clinical deterioration, and no-show prediction — trained on de-identified tenant data with opt-in consent.</p>
              </div>
            </div>
            <div className="aumy-roadmap-item">
              <span className="aumy-roadmap-tag aumy-roadmap-tag-next">Next</span>
              <div>
                <h4>Remote Patient Monitoring with AI Triage</h4>
                <p>BP, glucose, SpO2 streams feeding a triage agent that escalates only what needs a human.</p>
              </div>
            </div>
            <div className="aumy-roadmap-item">
              <span className="aumy-roadmap-tag aumy-roadmap-tag-next">Next</span>
              <div>
                <h4>Multi-Language Ambient Scribe</h4>
                <p>Hindi, Marathi, and English-plus-Hindi code-switching — because that is how conversations actually happen.</p>
              </div>
            </div>
            <div className="aumy-roadmap-item">
              <span className="aumy-roadmap-tag aumy-roadmap-tag-next">Next</span>
              <div>
                <h4>Prior Authorization Automation</h4>
                <p>An agent that drafts the PA packet from the encounter and the payer rules.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section aumy-cta-section">
        <div className="container">
          <div className="aumy-cta-card">
            <h2>See AUMY Live</h2>
            <p>
              If you are a hospital CEO, health system leader, or investor who believes healthcare deserves
              software that works for clinicians — let us show you the real product, on a real tenant, with
              a real patient chart. Not a demo video.
            </p>
            <div className="aumy-cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request a Live Demo
              </Link>
              <Link to="/insights/introducing-aumy-ai-operating-system-for-healthcare" className="btn btn-secondary btn-lg">
                Read the Launch Article
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AumyProduct;
