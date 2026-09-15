import React, { useEffect } from 'react';
import { setPageSeo } from '../utils/seo';
import LeakCheck from '../components/LeakCheck';
import DemoPlaylist from '../components/DemoPlaylist';
import './HomeClinic.css';
import './HomeUS.css';

/**
 * US-market homepage — served when the site is built with REACT_APP_MARKET=us
 * (aumyai.com). Standalone page: own top bar + footer, no India nav. Same
 * positioning as aumai.co.in (2026-09-15): Aumy is the operating system for a
 * growing dental practice — the problem is coordination, not acquisition.
 * US language: calls and texts (never WhatsApp), "practice" not "clinic".
 * No revenue promises and no hosting claims we can't stand behind today.
 * Reuses the ch-* design system.
 */

const CAL_URL = 'https://calendar.app.google/tecaeebTBEWSoJnV7';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const before = ['Growth', 'More patients', 'More calls', 'More texts', 'More follow-ups', 'More front-desk workload', 'More things falling through the cracks'];
const withAumy = ['Growth', 'Aumy coordinates the work', 'Your team focuses on patients'];

// The four stages — the architecture underneath.
const steps = [
  {
    stage: 'Convert',
    t: 'From the first call to a booking',
    d: 'Every call, text and web enquiry answered, followed up and booked into a real slot — without someone at the front desk having to remember who asked what.',
    m: 'AI voice agent · Texts & web chat · Lead follow-up · Booking',
  },
  {
    stage: 'Care',
    t: 'Everything around the treatment',
    d: 'Registration and intake forms before the visit, consent signed on a phone or tablet, and after-care your doctors define — with any worrying reply routed to a person.',
    m: 'Digital registration · Intake · Consent · After-care',
  },
  {
    stage: 'Retain',
    t: 'Keeping patients on track',
    d: 'Confirmations, rescheduling and no-shows handled in the conversation, and every care gap — the crown after a root canal, the overdue hygiene visit — followed up on time.',
    m: 'Confirmations · No-shows · Care gaps · Hygiene reappointment',
  },
  {
    stage: 'Reactivate',
    t: 'Bringing patients back',
    d: 'Patients who drifted away invited back in your doctors’ own words, at a pace your team can handle — not a blast to your whole list.',
    m: 'Inactive patients · Overdue treatment · Stalled treatment plans',
  },
];

// The five groups of work Aumy manages — the chaos, not features.
const chaosGroups = [
  {
    title: 'Patient communication',
    items: ['AI voice agent that answers calls', 'Texts and web chat answered in seconds', 'Appointment reminders', 'Follow-ups', 'Your team takes over any conversation in one tap'],
  },
  {
    title: 'Appointment orchestration',
    items: ['Confirmations', 'Rescheduling and cancellations', 'No-show management', 'Waitlists for earlier slots', 'Care gaps'],
  },
  {
    title: 'Digital practice',
    items: ['Digital registration', 'Intake with signature', 'Digital consent', 'X-rays and documents on the record', 'Invoices and payments'],
  },
  {
    title: 'Patient journey',
    items: ['Pre-treatment instructions', 'After-care', 'Care gaps', 'Doctor check-ins', 'Reactivation'],
  },
  {
    title: 'Growth',
    items: ['Google Business Profile', 'Reviews', 'Ad attribution', 'Lead capture', 'Lead conversion'],
  },
];

const knows = [
  { when: 'A patient calls', aumy: 'Aumy knows who they are.' },
  { when: 'They need an appointment', aumy: 'Aumy knows the doctor’s availability.' },
  { when: 'They don’t show', aumy: 'Aumy knows what happened.' },
  { when: 'They need a follow-up', aumy: 'Aumy creates and manages it.' },
  { when: 'They text after treatment', aumy: 'Aumy understands the treatment context.' },
  { when: 'They have an overdue care gap', aumy: 'Aumy knows it.' },
];

// Security & HIPAA — only statements that hold today.
const hipaa = [
  { t: 'We sign a BAA with your practice', d: 'We operate as your business associate, in writing, from day one.' },
  { t: 'Every access logged', d: 'Audit trails of who saw what, when — with role-based access.' },
  { t: 'Your data is yours', d: 'Never sold, never used to train shared AI models. Export or delete anytime.' },
  { t: 'Consent-first texting', d: 'Opt-in messaging with automatic STOP/HELP handling — TCPA-aware by design.' },
  { t: 'BAAs down the chain', d: 'No patient data flows to any AI or telecom subprocessor until its BAA is signed. Subprocessor list available on request.' },
];

const HomeUS = () => {
  useEffect(() => {
    setPageSeo({
      title: 'Aumy — The Operating System for a Growing Dental Practice',
      description:
        'Aumy manages the chaos that comes with growth — coordinating your patients, people and processes from the first call to ongoing care: AI voice agent, texts, appointments, follow-ups, intake, consent and care gaps on one connected platform. Grow your practice. Don’t grow the chaos.',
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
            <a href="#how-it-works">How it works</a>
            <a href="#hipaa">Security &amp; HIPAA</a>
            <a href="#what-it-manages">What it manages</a>
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
          <span className="ch-eyebrow">The operating system for a growing dental practice</span>
          <h1 className="ch-hero-title">Grow your practice. Don&rsquo;t grow the chaos.</h1>
          <p className="ch-hero-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Aumy manages the chaos that comes with growth — coordinating your patients, people and
            processes from the first call to ongoing care. Calls answered, texts replied to, appointments
            confirmed, follow-ups sent and care gaps closed, on one connected platform.
          </p>
          <p className="ch-hero-chain">CONVERT → CARE → RETAIN → REACTIVATE</p>
          <div className="ch-hero-cta ch-center-cta">
            <a className="ch-btn ch-btn-primary" href={CAL_URL} target="_blank" rel="noopener noreferrer">Book a 30-minute call</a>
            <a className="ch-btn ch-btn-ghost" href="mailto:jayesh@aumyai.com">jayesh@aumyai.com</a>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="ch-section">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">The problem</span>
          <h2 className="ch-h2">
            A successful dental practice doesn&rsquo;t necessarily have a patient-acquisition problem.
            It often has a coordination problem.
          </h2>
          <p className="ch-lead">
            When the schedule is full, growth creates chaos: calls, texts, enquiries, confirmations,
            rescheduling, cancellations, no-shows, follow-ups, paperwork, consents, X-rays, invoices and
            patient questions.
          </p>
          <div className="ch-closetable">
            <div className="ch-close-row">
              <span className="ch-close-leak"><strong>Before Aumy</strong></span>
              <span className="ch-close-arrow" aria-hidden="true">·</span>
              <span className="ch-close-aumy">{before.join(' → ')}</span>
            </div>
            <div className="ch-close-row">
              <span className="ch-close-leak"><strong>With Aumy</strong></span>
              <span className="ch-close-arrow" aria-hidden="true">·</span>
              <span className="ch-close-aumy">{withAumy.join(' → ')}</span>
            </div>
          </div>
          <p className="ch-note ch-center">
            None of it is your team&rsquo;s fault. It is just more than any front desk can hold — and
            when your practice grows, Aumy makes sure the workload doesn&rsquo;t grow with it.
          </p>
        </div>
      </section>

      {/* THE ARCHITECTURE */}
      <section className="ch-section ch-tint" id="how-it-works">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">The architecture underneath</span>
            <h2 className="ch-h2">Convert → Care → Retain → Reactivate. Aumy coordinates the work.</h2>
          </div>
          <div className="ch-pillars">
            {steps.map((s, i) => (
              <div key={i} className="ch-pillar">
                <span className="ch-eyebrow">{s.stage}</span>
                <h3 className="ch-pillar-title">{s.t}</h3>
                <p className="ch-pillar-body">{s.d}</p>
                <p className="ch-pillar-machinery">{s.m}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE FIVE GROUPS OF WORK */}
      <section className="ch-section" id="what-it-manages">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">What Aumy manages</span>
            <h2 className="ch-h2">The work around your chairs, handled.</h2>
            <p className="ch-lead ch-center-lead">
              Not a bundle of separate tools — one connected platform doing the operational work in
              between, so your team spends less time chasing patients and more time caring for them.
            </p>
          </div>
          <div className="ch-pillars" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>
            {chaosGroups.map((g, i) => (
              <div key={i} className="ch-pillar">
                <span className="ch-eyebrow">{String(i + 1)}</span>
                <h3 className="ch-pillar-title">{g.title}</h3>
                <ul className="ch-mini">
                  {g.items.map((it) => <li key={it}><Check /> {it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVERYTHING IS CONNECTED */}
      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Everything is connected</span>
          <h2 className="ch-h2">Think of Aumy as Jarvis for your dental practice.</h2>
          <p className="ch-lead">Not because it&rsquo;s a chatbot. Because everything knows what&rsquo;s happening.</p>
          <div className="ch-closetable">
            {knows.map((row, i) => (
              <div key={i} className="ch-close-row">
                <span className="ch-close-leak">{row.when}</span>
                <span className="ch-close-arrow" aria-hidden="true">→</span>
                <span className="ch-close-aumy">{row.aumy}</span>
              </div>
            ))}
          </div>
          <p className="ch-lead">
            Your calls know your appointments. Your appointments know your patients. Your patients know
            their treatment. Your follow-ups know what happened. And Aumy knows all of it.
          </p>
          <p className="ch-note ch-center"><strong>One patient. One journey. One connected system.</strong></p>
        </div>
      </section>

      <DemoPlaylist lead="Short, unedited demos of one connected system — the AI answering, booking, confirming, following up and bringing patients back. No slides." />

      {/* 60-SECOND CHECK — hands a visitor a picture of their OWN practice
          before we ask for anything. Same component and arithmetic as
          /leak-calculator, in USD. */}
      <section className="ch-section" id="leak-check">
        <div className="ch-container">
          <LeakCheck market="us" headingLevel="h2" />
        </div>
      </section>

      {/* ADS — deliberately framed as "we don't replace your marketing team". */}
      <section className="ch-section ch-tint" id="ads">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">And when you do advertise</span>
          <h2 className="ch-h2">Keep your marketing team. Your ads learn from what happens next.</h2>
          <p className="ch-lead ch-center-lead">
            We don’t run your ads and we don’t replace your agency. Because Aumy also handles the
            enquiry, the booking and the visit, it knows which leads became patients — so campaigns can
            be judged by booked patients instead of form fills. Ad platforms receive only minimal,
            compliant lead signals — never treatment or health details.
          </p>
          <ul className="ch-mini" style={{ display: 'inline-grid', textAlign: 'left' }}>
            <li><Check /> Every enquiry from an ad answered and followed up — not left in a spreadsheet</li>
            <li><Check /> Campaigns judged by patients who booked, not clicks</li>
            <li><Check /> Privacy-safe: conversions sent hashed and server-side, no patient identity exposed</li>
          </ul>
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

      {/* NO RIP-AND-REPLACE */}
      <section className="ch-section" id="platform">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">No rip-and-replace</span>
          <h2 className="ch-h2">Your practice software stays.</h2>
          <p className="ch-lead ch-center-lead">
            Aumy works alongside the software you already run — we sync patients &amp; appointments in
            via <strong>FHIR&nbsp;R4</strong> (for FHIR-enabled systems) or guided import. When you&rsquo;re
            ready for more, the same platform adds Ambient Scribe for clinical notes, billing &amp;
            invoicing, Google Business Profile posting and ask-anything reports. Every module opt-in — one
            dashboard, one login.
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
          <p className="us-price-enterprise">
            <strong>Multi-location group or DSO?</strong> Centralized multi-location reporting and full
            security-review support — available on request, priced per group.
          </p>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="ch-offer">
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-offer-title">Examine first. Prescribe after.</h2>
          <p className="ch-offer-sub">
            On a 30-minute call we walk through how your practice runs today and where work gets stuck —
            unanswered calls, stalled follow-ups, no-shows and care gaps. We work with a handful of
            practices at a time, hands-on: setup on your own data and the first weeks done alongside you.
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
          The operating system for a growing dental practice · <a href="mailto:jayesh@aumyai.com">jayesh@aumyai.com</a> · <a href="tel:+13072635098">+1 (307) 263-5098</a>
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
