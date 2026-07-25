import React, { useEffect } from 'react';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';
import './HomeUS.css';

/**
 * US-market homepage — served when the site is built with REACT_APP_MARKET=us
 * (aumyai.com). Standalone page: own top bar + footer, no India nav. Copy
 * mirrors the US pitch deck: calls-and-text language (never WhatsApp), $ math,
 * HIPAA as a headline trust block. Reuses the ch-* design system.
 */

const CAL_URL = 'https://calendar.app.google/tecaeebTBEWSoJnV7';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const heroStats = [
  { value: '~1/3', label: 'of calls to dental offices go unanswered' },
  { value: '$40k+', label: 'yearly cost of one front-desk hire' },
  { value: '10–15%', label: 'typical no-show rate' },
  { value: '$120k+', label: 'recoverable revenue per year*' },
];

const capabilities = [
  { t: 'Every call answered', d: 'Voice AI picks up when your team can’t — and books, right on the call.' },
  { t: 'Every text answered in seconds', d: 'SMS and web chat — the receptionist plugs into your current website — 24/7, in your practice’s voice.' },
  { t: 'Lead follow-up that never forgets', d: 'Polite, well-spaced nudges until they book — or opt out.' },
  { t: '24/7 self-booking by text', d: 'Patients book a real slot in a natural conversation — no app, no portal.' },
  { t: 'No-show recovery', d: 'Confirmation cascade, instant rescheduling, smart waitlist.' },
  { t: 'Hygiene recall & reappointment', d: 'Every patient rebooked at exactly the right time.' },
  { t: 'Dormant reactivation', d: 'Wins back patients who quietly drifted away.' },
  { t: 'Membership & product sales', d: 'Offers your in-house plan at the natural moment, right in the chat.' },
  { t: 'Google Reviews on autopilot', d: 'Asks happy patients, follows up, and replies to every review in your voice.' },
  { t: 'Lab case automation', d: 'Chases your lab by text and rebooks the patient the moment the crown is ready. No other platform does this.', badge: 'Only us' },
];

const hipaa = [
  { t: 'We sign a BAA with your practice', d: 'We operate as your business associate, in writing, from day one.' },
  { t: 'US data hosting', d: 'Your patients’ data lives in US data centers, encrypted at rest and in transit.' },
  { t: 'Every access logged', d: 'Immutable audit trails of who saw what, when — with role-based access and MFA.' },
  { t: 'Your data is yours', d: 'Never sold, never used to train shared AI models. Export or delete anytime.' },
  { t: 'Consent-first texting', d: 'Opt-in messaging with automatic STOP/HELP handling — TCPA-aware by design.' },
  { t: 'BAAs down the chain', d: 'Every AI and telecom subprocessor we use operates under a signed BAA.' },
];

const HomeUS = () => {
  useEffect(() => {
    setPageSeo({
      title: 'AI Receptionist for Dental Practices — Every Call & Text Answered | AUM AI',
      description:
        'AUM AI’s AI receptionist answers every call and text 24/7, books patients, recovers no-shows, runs hygiene recall, and chases your lab — recovering $120,000+ a year for a typical practice. HIPAA-compliant by design.',
      canonical: 'https://aumyai.com/',
    });
  }, []);

  return (
    <div className="ch-home us-home">
      {/* Top bar */}
      <header className="us-topbar">
        <div className="us-topbar-inner">
          <img src="/PNG-01-01.png" alt="AUM AI" className="us-logo" />
          <nav className="us-topnav">
            <a href="#what-it-does">How it works</a>
            <a href="#hipaa">Security &amp; HIPAA</a>
            <a href="#platform">Platform</a>
          </nav>
          <a className="ch-btn ch-btn-primary us-topbar-cta" href={CAL_URL} target="_blank" rel="noopener noreferrer">
            Book a 30-minute call
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="ch-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">AI receptionist for US dental practices</span>
          <h1 className="ch-hero-title">Your dentistry isn’t the problem. The 90 minutes around every chair is.</h1>
          <p className="ch-hero-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            An AI receptionist that answers <strong>every call and text, 24/7</strong> — books the patient,
            recovers no-shows, runs hygiene recall, follows up every treatment plan, and even chases your
            lab. For a typical $1M practice, that’s <strong>$120,000+ a year</strong> quietly recovered.
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <a className="ch-btn ch-btn-primary" href={CAL_URL} target="_blank" rel="noopener noreferrer">Book a 30-minute call</a>
            <a className="ch-btn ch-btn-ghost" href="mailto:jayesh@aumyai.com">jayesh@aumyai.com</a>
          </div>
          <div className="ch-stats">
            {heroStats.map((s, i) => (
              <div key={i} className="ch-stat">
                <span className="ch-stat-value">{s.value}</span>
                <span className="ch-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="ch-fineprint">* Conservative estimate for a ~$1M-production practice; we map it to your real numbers on the call.</p>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="ch-section ch-tint" id="what-it-does">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">What it does</span>
            <h2 className="ch-h2">One AI receptionist. The work of ten.</h2>
            <p className="ch-lead ch-center-lead">
              Not another reminder tool — an agentic receptionist that converses, books end-to-end, and
              quietly handles everything your front desk never has time for:
            </p>
          </div>
          <div className="ch-why">
            {capabilities.map((c, i) => (
              <div key={i} className="ch-why-card">
                <Check />
                <div>
                  <h3 className="ch-why-title">
                    {c.t}
                    {c.badge && <span className="us-badge">{c.badge}</span>}
                  </h3>
                  <p className="ch-why-body">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIPAA */}
      <section className="ch-section us-dark" id="hipaa">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow us-dark-eyebrow">Security &amp; HIPAA</span>
            <h2 className="ch-h2 us-dark-h2">Built in, not bolted on.</h2>
          </div>
          <div className="ch-why">
            {hipaa.map((c, i) => (
              <div key={i} className="ch-why-card us-dark-card">
                <Check />
                <div>
                  <h3 className="ch-why-title us-dark-title">{c.t}</h3>
                  <p className="ch-why-body us-dark-body">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEYOND */}
      <section className="ch-section" id="platform">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Beyond the receptionist</span>
          <h2 className="ch-h2">One platform, when you’re ready for more.</h2>
          <p className="ch-lead ch-center-lead">
            Ambient Scribe that writes your clinical notes while you talk · built-in telehealth · managed
            Google Business &amp; social posting · AI Creative Studio · patient education in your name ·
            predictive retention AI · ask-anything reports. Every module opt-in — one dashboard, one login.
          </p>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="ch-offer">
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-offer-title">We work with a handful of practices at a time.</h2>
          <p className="ch-offer-sub">
            Every practice gets our team hands-on — setup, configuration on your own data, and the first
            weeks of results, done alongside you. The real question is simple: is there room this month,
            and is your practice the right fit?
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <a className="ch-btn ch-btn-primary" href={CAL_URL} target="_blank" rel="noopener noreferrer">Book a 30-minute call</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="us-footer">
        <img src="/PNG-01-01.png" alt="AUM AI" className="us-logo us-logo-footer" />
        <p className="us-footer-line">
          AI receptionist &amp; clinic automation · <a href="mailto:jayesh@aumyai.com">jayesh@aumyai.com</a>
        </p>
        <p className="us-footer-links">
          <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="https://aumai.co.in" target="_blank" rel="noopener noreferrer">Global site</a>
        </p>
        <p className="us-footer-fine">© {new Date().getFullYear()} AUM AI. Product &amp; engineering: Pune, India. US entity in formation.</p>
      </footer>
    </div>
  );
};

export default HomeUS;
