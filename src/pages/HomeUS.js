import React, { useEffect } from 'react';
import { setPageSeo } from '../utils/seo';
import LeakCheck from '../components/LeakCheck';
import DemoPlaylist from '../components/DemoPlaylist';
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
  { t: 'US data hosting on AWS', d: 'Your patients’ data lives in US AWS data centers (SOC 2 / ISO 27001 audited infrastructure), encrypted at rest and in transit.' },
  { t: 'Every access logged', d: 'Immutable audit trails of who saw what, when — with role-based access and MFA.' },
  { t: 'Your data is yours', d: 'Never sold, never used to train shared AI models. Export or delete anytime.' },
  { t: 'Consent-first texting', d: 'Opt-in messaging with automatic STOP/HELP handling — TCPA-aware by design.' },
  { t: 'BAAs down the chain', d: 'No patient data flows to any AI or telecom subprocessor until its BAA is signed. Subprocessor list available on request. Independent SOC 2 audit is on our security roadmap.' },
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
          <img src="/aumy-lockup-light.png" alt="Aumy" className="us-logo" />
          <nav className="us-topnav">
            <a href="#what-it-does">How it works</a>
            <a href="#hipaa">Security &amp; HIPAA</a>
            <a href="#platform">Platform</a>
            <a href="#leak-check">Leak check</a>
            <a href="#pricing">Pricing</a>
            <a href="/business-manager">For every business →</a>
            {/* Cross-market link, mirroring "For USA" on aumai.co.in. A real
                href with no nofollow so crawlers can traverse both ways. */}
            <a href="https://aumai.co.in/">For India</a>
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
          <h1 className="ch-hero-title">Your practice is leaking revenue every day. AUMY stops the leak — then grows what&nbsp;stays.</h1>
          <p className="ch-hero-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            AUMY answers <strong>every call and text in seconds — 2&nbsp;PM or 2&nbsp;AM</strong> — books
            patients straight into your calendar, follows up every lead until it books, runs hygiene
            recall, recovers no-shows, and quietly brings back patients who stopped coming. Your marketing
            team keeps running the ads; AUMY makes sure their leads become patients. For a typical $1M
            practice, that’s <strong>$120,000+ a year</strong> quietly recovered.
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

      {/* LEAK CHECK — the hook. First thing after the fold, because it is the
          only element that hands a visitor a number about their OWN practice
          before we ask them for anything. Same component and arithmetic as
          /leak-calculator, in USD. */}
      <section className="ch-section" id="leak-check">
        <div className="ch-container">
          <LeakCheck market="us" headingLevel="h2" />
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

      <DemoPlaylist lead="Short, unedited demos — the AI answering calls and texts, booking, recovering no-shows and running recall. No slides." />

      {/* ADS — deliberately framed as "we don't replace your marketing team".
          Practices that already run ads hear "new marketing vendor" and stop
          listening; the actual product is a feedback loop that makes the ads
          their existing agency runs perform better. */}
      <section className="ch-section" id="ads">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Your ads, made smarter</span>
          <h2 className="ch-h2">Keep your marketing team. Give them better data.</h2>
          <p className="ch-lead ch-center-lead">
            We don’t run your ads and we don’t replace your agency — they keep doing what they do.
            What we change is what the ad platforms <em>learn</em>. The moment an enquiry becomes a
            booked, seated, paying patient, we send that real outcome back to Meta and Google. So the
            algorithm stops optimising for whoever clicks, and starts finding more people like the
            patients who actually show up and pay.
          </p>
          <div className="ch-why">
            <div className="ch-why-card">
              <Check />
              <div>
                <h3 className="ch-why-title">Higher ROAS on the same budget</h3>
                <p className="ch-why-body">
                  Nothing about your spend changes. The targeting gets better because it is finally
                  being taught with revenue instead of form fills.
                </p>
              </div>
            </div>
            <div className="ch-why-card">
              <Check />
              <div>
                <h3 className="ch-why-title">Lower cost per acquired patient</h3>
                <p className="ch-why-body">
                  As lead quality climbs, the cost of each genuine new patient falls — you stop paying
                  for clicks that were never going to book.
                </p>
              </div>
            </div>
            <div className="ch-why-card">
              <Check />
              <div>
                <h3 className="ch-why-title">Your agency finally gets proof</h3>
                <p className="ch-why-body">
                  Every campaign, ad set and ad traced to real production — so the reporting argument
                  ends and the budget goes where it earns.
                </p>
              </div>
            </div>
          </div>
          <p className="ch-fineprint">
            Privacy-safe: conversions are sent hashed and server-side. No patient identity is ever
            exposed to an ad platform.
          </p>
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
            Ambient Scribe that writes your clinical notes while you talk · built-in telehealth · patient
            billing &amp; invoicing · managed Google Business &amp; social posting · AI Creative Studio ·
            patient education in your name · predictive retention AI · ask-anything reports. Every module
            opt-in — one dashboard, one login. And no rip-and-replace: your practice software stays — we
            sync patients &amp; appointments in via <strong>FHIR&nbsp;R4</strong> (for FHIR-enabled systems)
            or guided import.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="ch-section ch-tint" id="pricing">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Pricing</span>
          <h2 className="ch-h2">Simple, honest pricing.</h2>
          <div className="us-price-card">
            <div className="us-price-main">
              <span className="us-price-value">$450</span>
              <span className="us-price-unit">/ month per location</span>
            </div>
            <p className="us-price-setup">+ $600 one-time white-glove setup — configured on your data, with you</p>
            <ul className="us-price-points">
              <li><Check /> Everything on this page included — no feature tiers, no surprise add-ons</li>
              <li><Check /> Month-to-month. Cancel anytime. No long-term contract</li>
              <li><Check /> Founding-practice rate for our first US partners — locked in for as long as you stay</li>
            </ul>
            <a className="ch-btn ch-btn-primary" href={CAL_URL} target="_blank" rel="noopener noreferrer">Book a 30-minute call</a>
          </div>
          <p className="us-price-compare">
            For comparison: practices typically pay $400–900/month for patient communication alone, plus
            $200–500/month for a separate AI phone product — and neither chases your lab or your
            unscheduled treatment.
          </p>
          <p className="us-price-enterprise">
            <strong>Multi-location group or DSO?</strong> Dedicated single-tenant instances (your own
            database, your choice of US region), centralized multi-location reporting, and full
            security-review support — available on request, priced per group.
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
        <img src="/aumy-lockup-light.png" alt="Aumy" className="us-logo us-logo-footer" />
        <p className="us-footer-line">
          AI receptionist &amp; clinic automation · <a href="mailto:jayesh@aumyai.com">jayesh@aumyai.com</a> · <a href="tel:+13072635098">+1 (307) 263-5098</a>
        </p>
        <p className="us-footer-line">
          AUM AI Healthcare Technology LLC · 30 N Gould St, Ste N, Sheridan, WY 82801
        </p>
        <p className="us-footer-links">
          <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/business-manager">Aumy Business Manager</a> · <a href="https://aumai.co.in" target="_blank" rel="noopener noreferrer">Global site</a>
        </p>
        <p className="us-footer-fine">© {new Date().getFullYear()} AUM AI Healthcare Technology LLC. Product &amp; engineering: Pune, India.</p>
      </footer>
    </div>
  );
};

export default HomeUS;
