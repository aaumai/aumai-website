import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AumyProduct.css';
import './AumyRevenueGenerator.css';
import './Page.css';

const DentalGrowth = () => {
  useEffect(() => {
    document.title = 'Dental Clinic Growth System | AI Patient Acquisition & Retention — AUMY';
    const setMeta = (name, content) => {
      let m = document.querySelector(`meta[name="${name}"]`);
      if (!m) { m = document.createElement('meta'); m.setAttribute('name', name); document.head.appendChild(m); }
      m.setAttribute('content', content);
    };
    setMeta('description', 'AUMY is the AI-native growth platform for dental clinics: lower ad costs with Conversion API, convert every WhatsApp enquiry, automate recalls and no-show rebooking, and prove recovered revenue on a live dashboard.');
    setMeta('keywords', 'dental clinic marketing, dental patient acquisition, appointment automation, dental clinic growth, dental SEO conversion');
  }, []);

  // Narrative revenue leaks (no invented numbers).
  const leaks = [
    { title: 'After-hours enquiries go cold', text: 'A patient searches “dental implant near me,” clicks your ad, fills your form — and books with the clinic that called first.', color: '#f59e0b' },
    { title: 'Recalls never sent', text: 'A scaling-and-polishing patient from eight months ago never came back for their check-up — because no one reminded them.', color: '#ef4444' },
    { title: 'No-shows never rebooked', text: 'Three no-shows last week, none followed up — three chairs that sat empty and earned nothing.', color: '#ec4899' },
    { title: 'Ad spend you can’t attribute', text: 'The ad budget you spent this month — with no way to tie a single implant or RCT case back to a specific campaign.', color: '#8b5cf6' },
  ];

  // How AUMY grows the practice — grounded in built features.
  const growth = [
    {
      title: 'Lower your cost-per-lead',
      description: 'AUMY sends Meta & Google Conversion API signals on real bookings — implant consults, RCT enquiries, smile-design leads — so your ads optimise toward patients who actually book, not just clickers. Designed to lower CPL and bring better-qualified leads.',
      color: '#3b82f6',
      icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    },
    {
      title: 'Never lose an enquiry',
      description: 'An AI receptionist answers WhatsApp instantly, triages the case, and books the appointment — even after hours. The patient belongs to whoever follows up first; AUMY makes that you, every time.',
      color: '#10b981',
      icon: 'M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
    },
    {
      title: 'Fill the chair',
      description: 'Automated recalls (six-month check-ups, post-treatment follow-ups), no-show rebooking, and reactivation of dormant patients on WhatsApp — every message, cadence, and condition tuned to your treatments and your schedule.',
      color: '#0ea5e9',
      icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008z',
    },
    {
      title: 'Run the whole clinic',
      description: 'A full AI-native EHR — patient records, appointments, billing, built-in teledentistry consults, and an ambient AI scribe that drafts the clinical note while you treat, so your team spends time on patients, not paperwork.',
      color: '#8b5cf6',
      icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
    },
    {
      title: 'Prove it',
      description: 'A live ROI dashboard shows which campaign produced which booking and exactly how much revenue it recovered — so you know what your marketing actually earns, instead of guessing.',
      color: '#06b6d4',
      icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605',
    },
  ];

  const builtFor = ['WhatsApp-first', 'UPI-friendly', 'Hindi + English', 'ABHA / ABDM-ready', 'Configured, not coded'];

  return (
    <div className="aumy-page rev-page">
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
              AUM AI · Growth System for Dental Clinics
            </div>

            <h1 className="aumy-hero-title">
              More patients in the chair. Less chasing.{' '}
              <span className="aumy-gradient">Proven results.</span>
            </h1>

            <p className="aumy-hero-subtitle">
              Dentistry is more competitive than ever — every clinic is on Google, running ads, asking for
              reviews. Standing out, and staying full, takes more than good dentistry. It takes a system.
              AUMY is the AI-native growth platform built for dental clinics: it lowers your ad costs,
              converts more enquiries into booked appointments, brings lapsed patients back, and proves the
              revenue it creates.
            </p>

            <div className="aumy-hero-cta">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request a Demo
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a href="#how" className="btn btn-secondary btn-lg">
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The leaks */}
      <section className="section aumy-caps-section" id="leak">
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Hidden Leak</span>
            <h2 className="section-title">The leaks costing your practice money</h2>
            <p className="section-subtitle">
              None of these are treatment problems — they’re system problems. Each one is recoverable, and AUMY recovers them.
            </p>
          </div>

          <div className="aumy-caps-grid">
            {leaks.map((leak, i) => (
              <div key={i} className="aumy-cap-card" style={{ '--cap-color': leak.color }}>
                <div className="aumy-cap-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <h3>{leak.title}</h3>
                <p>{leak.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How AUMY grows a dental practice */}
      <section className="section aumy-caps-section" id="how">
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Growth System</span>
            <h2 className="section-title">How AUMY grows a dental practice</h2>
            <p className="section-subtitle">
              One connected loop — attract, convert, retain, and measure — running on autopilot, configured to your clinic.
            </p>
          </div>

          <div className="aumy-caps-grid">
            {growth.map((cap, i) => (
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

      {/* Built for how dental clinics work */}
      <section className="section aumy-demo-section" id="built-for">
        <div className="container">
          <div className="aumy-demo-callout">
            <div className="aumy-demo-callout-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="aumy-demo-callout-body">
              <strong>Built for how dental clinics actually work.</strong>
              <p>
                WhatsApp-first, UPI-friendly, Hindi and English, and ABHA/ABDM-ready — configurable for your
                clinic without a single line of code.
              </p>
              <div className="rev-metric-chips" style={{ marginTop: '1rem' }}>
                {builtFor.map((b, i) => (
                  <div key={i} className="rev-chip"><span className="rev-chip-value" style={{ fontSize: '0.95rem' }}>{b}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section aumy-cta-section">
        <div className="container">
          <div className="aumy-cta-card">
            <h2>See the revenue your practice is leaving on the table</h2>
            <p>
              Bring your patient list and your goals. We’ll show you, on real numbers, how AUMY books the
              enquiries you’re losing, fills the no-show gaps, wins back lapsed patients, and turns one visit
              into a lifetime of recalls.
            </p>
            <div className="aumy-cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request a Demo
              </Link>
              <Link to="/revenue-generator" className="btn btn-secondary btn-lg">
                See the Revenue Engine
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DentalGrowth;
