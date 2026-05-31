import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AumyProduct.css';
import './AumyRevenueGenerator.css';
import './Page.css';

const AestheticsGrowth = () => {
  useEffect(() => {
    document.title = 'Aesthetic Clinic Growth System | Patient Acquisition & Retention — AUMY';
    const setMeta = (name, content) => {
      let m = document.querySelector(`meta[name="${name}"]`);
      if (!m) { m = document.createElement('meta'); m.setAttribute('name', name); document.head.appendChild(m); }
      m.setAttribute('content', content);
    };
    setMeta('description', 'AUMY is the AI-native growth platform for aesthetic and skin clinics: lower acquisition costs with Conversion API, instant WhatsApp follow-up, automated treatment recalls and reactivation, and a live ROI dashboard.');
    setMeta('keywords', 'aesthetic clinic marketing, medspa patient acquisition, Botox filler lead generation, aesthetic clinic retention, skin clinic growth');
  }, []);

  const leaks = [
    { title: 'High-value enquiries go cold', text: 'Botox, filler, laser and HydraFacial enquiries that arrive after hours — and book elsewhere because no one replied in minutes.', color: '#ec4899' },
    { title: 'Clients never invited back', text: 'A client who came once for a treatment and was never reminded for the next cycle simply drifts away.', color: '#a855f7' },
    { title: 'Premium no-shows lost', text: 'No-shows on premium appointment slots, never rebooked — high-margin time that earned nothing.', color: '#f43f5e' },
    { title: 'Ad spend you can’t prove', text: 'Expensive Meta and Instagram spend with no proof of which campaign actually produced paying clients.', color: '#8b5cf6' },
  ];

  const growth = [
    {
      title: 'Cut your ad costs on Instagram & Meta',
      description: 'AUMY fires Conversion API events on real bookings, so Meta learns who your actual paying clients are and finds more like them — designed to lower CPL, with better-qualified leads and clean attribution on every campaign.',
      color: '#ec4899',
      icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    },
    {
      title: 'Respond in seconds, not hours',
      description: 'An AI receptionist engages every enquiry instantly on WhatsApp, answers questions, and books the consultation — capturing the high-intent moment before a competitor does.',
      color: '#a855f7',
      icon: 'M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
    },
    {
      title: 'Bring clients back on cycle',
      description: 'Automated treatment recalls (filler top-ups, laser sessions, skincare follow-ups), no-show rebooking, and dormant-client reactivation — every message and cadence configurable to your treatments.',
      color: '#0ea5e9',
      icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
    },
    {
      title: 'Look after every client',
      description: 'A full clinic record, appointments, billing, virtual consults, and an ambient AI scribe for treatment notes — so the experience stays premium end to end.',
      color: '#8b5cf6',
      icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
    },
    {
      title: 'Prove the ROI',
      description: 'A live dashboard ties recovered revenue to each campaign and channel — so you know exactly what’s working and what to scale.',
      color: '#06b6d4',
      icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605',
    },
  ];

  const builtFor = ['Instant, personalised WhatsApp', 'Multi-channel (WhatsApp · voice · SMS)', 'Operator-controlled', 'Fully configurable per clinic'];

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
              AUM AI · Growth System for Aesthetic & Skin Clinics
            </div>

            <h1 className="aumy-hero-title">
              Turn enquiries into bookings.{' '}
              <span className="aumy-gradient">Turn one-time clients into regulars.</span>
            </h1>

            <p className="aumy-hero-subtitle">
              Aesthetic and skin clinics live on high-intent enquiries and repeat treatments — and lose more
              of both than they realise. A lead who doesn’t hear back in minutes books elsewhere; a filler or
              laser client who isn’t reminded simply drifts away. AUMY is the AI-native growth platform for
              aesthetic clinics: lower acquisition costs, instant follow-up, and automated re-engagement that
              keeps your calendar — and your revenue — full.
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
            <h2 className="section-title">Where aesthetic clinics leak revenue</h2>
            <p className="section-subtitle">
              In a high-margin business, every lost enquiry and every lapsed client is real money — and every one of these is recoverable.
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

      {/* How AUMY grows an aesthetic clinic */}
      <section className="section aumy-caps-section" id="how">
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Growth System</span>
            <h2 className="section-title">How AUMY grows an aesthetic clinic</h2>
            <p className="section-subtitle">
              One connected loop — attract, convert, retain, and measure — running on autopilot, configured to your treatments.
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

      {/* Built for premium patient experience */}
      <section className="section aumy-demo-section" id="built-for">
        <div className="container">
          <div className="aumy-demo-callout">
            <div className="aumy-demo-callout-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="aumy-demo-callout-body">
              <strong>Built for a premium patient experience.</strong>
              <p>
                Instant, personalised WhatsApp engagement across WhatsApp, voice and SMS — operator-controlled,
                so the human touch your brand depends on stays intact. Fully configurable per clinic.
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
            <h2>See the revenue your clinic is leaving on the table</h2>
            <p>
              Bring your client list and your goals. We’ll show you, on real numbers, how AUMY captures the
              high-intent enquiries you’re losing, rebooks premium no-shows, and brings lapsed clients back on
              cycle — automatically.
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

export default AestheticsGrowth;
