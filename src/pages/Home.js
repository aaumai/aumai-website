import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { setPageSeo } from '../utils/seo';
import './Home.css';

const Home = () => {
  useEffect(() => {
    setPageSeo({
      title: 'AUM AI — AI Clinic Growth & Automation Platform for Dental & Aesthetic Clinics',
      description: 'AUM AI builds AI-native growth and automation for dental and aesthetic clinics — lower ad costs with Conversion API, an AI WhatsApp receptionist, automated recalls and reactivation, and a live ROI dashboard, on a built-in EHR.',
      canonical: 'https://aumai.co.in/',
      image: 'https://aumai.co.in/screenshots/roi-preview.png',
    });
  }, []);

  const advantages = [
    {
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
      title: 'AI-Accelerated Development',
      description:
        'We leverage AI across every phase of the SDLC — from architecture and code generation to testing and documentation. What takes traditional teams months, we deliver in weeks.',
      color: '#3b82f6',
    },
    {
      icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
      title: 'Fraction of the Cost',
      description:
        'A lean expert team augmented by AI delivers the output of a 20-person engineering department. You get enterprise-grade quality without the enterprise price tag.',
      color: '#10b981',
    },
    {
      icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
      title: 'Deep Healthcare Expertise',
      description:
        'AI accelerates execution, but domain expertise drives the architecture. We bring years of hands-on experience with FHIR, HL7, HIPAA, risk adjustment, and clinical workflows.',
      color: '#8b5cf6',
    },
  ];

  return (
    <div className="home-page">
      <Hero />

      {/* Flagship Product: AUMY */}
      <section className="section home-product-section">
        <div className="container">
          <div className="home-product-card">
            <div className="home-product-info">
              <span className="home-product-badge">
                <span className="home-product-badge-dot"></span>
                Flagship Product · In Production
              </span>
              <h2 className="home-product-title">
                Meet <span className="home-product-title-gradient">AUMY</span>.
              </h2>
              <p className="home-product-tagline">
                The voice-first AI operating system powering AUM AI HealthSystem.
              </p>
              <p className="home-product-description">
                A production multi-tenant EHR where ambient scribing, ICD-10 coding, medication
                reconciliation, and care-gap evaluation all run behind a single voice interface.
                Click Start. Talk to the patient. Click Stop. 47 seconds later AUMY returns a signed,
                coded, care-gap-aware encounter.
              </p>
              <ul className="home-product-features">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Ambient scribe with structured SOAP, HPI, and vitals
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  ICD-10 + CPT + RxNorm coding validated against reference sets
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Multi-agent care gap evaluation from a voice command
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  FHIR R4 + ABDM ready, multi-tenant from day one
                </li>
              </ul>
              <div className="home-product-cta">
                <Link to="/aumy" className="btn btn-primary">
                  Explore AUMY
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to="/insights/introducing-aumy-ai-operating-system-for-healthcare" className="btn btn-secondary">
                  Read the Launch
                </Link>
              </div>
            </div>

            <div className="home-product-visual">
              <div className="home-product-stat-card home-product-stat-1">
                <span className="home-product-stat-value">47s</span>
                <span className="home-product-stat-label">Conversation to signed encounter</span>
              </div>
              <div className="home-product-stat-card home-product-stat-2">
                <span className="home-product-stat-value">2 hrs</span>
                <span className="home-product-stat-label">Charting time saved per visit</span>
              </div>
              <div className="home-product-stat-card home-product-stat-3">
                <span className="home-product-stat-value">1,000+</span>
                <span className="home-product-stat-label">Medical codes pre-loaded</span>
              </div>
              <div className="home-product-stat-card home-product-stat-4">
                <span className="home-product-stat-value">FHIR R4</span>
                <span className="home-product-stat-label">Native data model</span>
              </div>
              <div className="home-product-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Accelerated Engineering Section */}
      <section className="section home-ai-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              Our Approach
            </span>
            <h2 className="section-title">AI-Accelerated Engineering</h2>
            <p className="section-subtitle">
              We combine deep healthcare domain expertise with AI-powered development to deliver
              production-grade platforms faster and at a fraction of traditional costs.
            </p>
          </div>

          <div className="home-advantages-grid">
            {advantages.map((adv, index) => (
              <div key={index} className="home-advantage-card" style={{ '--adv-color': adv.color }}>
                <div className="home-advantage-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={adv.icon} />
                  </svg>
                </div>
                <h3 className="home-advantage-title">{adv.title}</h3>
                <p className="home-advantage-desc">{adv.description}</p>
              </div>
            ))}
          </div>

          <div className="home-ai-cta">
            <Link to="/case-studies" className="btn btn-primary">
              See It in Action
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="section home-capabilities-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
              What We Build
            </span>
            <h2 className="section-title">Production-Grade Healthcare AI Platforms</h2>
            <p className="section-subtitle">
              Real systems running in production — not proofs of concept. We build the platforms that
              healthcare organizations need to turn clinical data into actionable intelligence.
            </p>
          </div>

          <div className="home-capabilities-grid">
            {[
              {
                icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3',
                title: 'Clinical NLP & AI',
                description: 'Extract structured insights from unstructured clinical notes using GPT-4 and custom NER models. Automate chart abstraction and risk coding.',
                color: '#06b6d4',
              },
              {
                icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
                title: 'Quality Measures Engine',
                description: 'Automated HEDIS, MIPS, and CMS quality measure calculation across 100+ measures with real-time gap detection.',
                color: '#10b981',
              },
              {
                icon: 'M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25',
                title: 'EHR Integration (FHIR)',
                description: 'SMART on FHIR applications that launch directly within Epic, Cerner, and other EHR systems. 20+ FHIR resource types.',
                color: '#3b82f6',
              },
              {
                icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
                title: 'Clinical Trial Matching',
                description: 'AI-powered patient-to-trial matching using FHIR data and GPT-4 eligibility parsing. 92-97% match accuracy.',
                color: '#8b5cf6',
              },
              {
                icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375',
                title: 'Master Data Management',
                description: 'AI-powered patient identity resolution across multiple EHR sources. 99.2% match accuracy with vector embeddings.',
                color: '#f59e0b',
              },
              {
                icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
                title: 'Risk Adjustment & HCC',
                description: 'AI-driven HCC coding and RAF score optimization from clinical documentation. Revenue integrity for Medicare Advantage plans.',
                color: '#f43f5e',
              },
            ].map((cap, index) => (
              <div key={index} className="home-capability-card" style={{ '--cap-color': cap.color }}>
                <div className="home-capability-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={cap.icon} />
                  </svg>
                </div>
                <h3 className="home-capability-title">{cap.title}</h3>
                <p className="home-capability-desc">{cap.description}</p>
              </div>
            ))}
          </div>

          <div className="home-ai-cta">
            <Link to="/case-studies" className="btn btn-primary">
              View Case Studies
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section home-trust-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Why AUM AI
            </span>
            <h2 className="section-title">Built by Engineers Who Understand Healthcare</h2>
            <p className="section-subtitle">
              We don't just write code — we understand clinical workflows, regulatory requirements,
              and healthcare data standards. Our team combines deep healthcare domain expertise with
              AI engineering to deliver platforms that actually work in production.
            </p>
          </div>

          <div className="home-trust-grid">
            {[
              {
                icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
                title: 'HIPAA Compliant',
                description: 'Every platform we build meets HIPAA security and privacy requirements',
                color: '#10b981',
              },
              {
                icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z',
                title: 'Production Grade',
                description: 'Battle-tested systems handling real clinical data at scale',
                color: '#3b82f6',
              },
              {
                icon: 'M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25',
                title: 'Healthcare Standards',
                description: 'FHIR R4, HL7, CCDA, SNOMED CT, ICD-10, LOINC, RxNorm',
                color: '#8b5cf6',
              },
              {
                icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
                title: 'AI-Accelerated',
                description: 'AI-powered development delivering enterprise output at startup speed',
                color: '#f59e0b',
              },
            ].map((trust, index) => (
              <div key={index} className="home-trust-card" style={{ '--trust-color': trust.color }}>
                <div className="home-trust-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={trust.icon} />
                  </svg>
                </div>
                <h3 className="home-trust-title">{trust.title}</h3>
                <p className="home-trust-desc">{trust.description}</p>
              </div>
            ))}
          </div>

          <div className="home-trust-cta">
            <Link to="/case-studies" className="btn btn-primary">
              View Our Work
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
