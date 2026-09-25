import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import ClinicsServed from '../components/ClinicsServed';
import {
  TITLE, DESCRIPTION, UPDATED, HERO, DEFINITION, CAPABILITIES, INDIA, COMPARE, CHOOSE, FAQS,
} from '../data/aiDentalSoftwareIndia';
import './HomeClinic.css';

// "AI dental software India" page (owner 2026-09-25). The words live in
// src/data/aiDentalSoftwareIndia.js, shared with scripts/prerender.js — edit
// them there, never here.

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const muted = { color: '#5b6784' };

const Cards = ({ items }) => (
  <div className="ch-container" style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))' }}>
    {items.map(([title, body]) => (
      <div key={title} className="ch-why-card" style={{ display: 'block', padding: '20px 22px' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Check />
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem' }}>{title}</h3>
            <p style={{ margin: 0, ...muted }}>{body}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const AIDentalSoftwareIndiaPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({ title: TITLE, description: DESCRIPTION, canonical: 'https://aumai.co.in/ai-dental-software-india' });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 24 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">{HERO.eyebrow}</span>
          <h1 className="ch-hero-title">{HERO.h1}</h1>
          <p className="ch-hero-sub">{HERO.sub}</p>
          <div style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/demos" className="ch-btn ch-btn-primary">Watch it work, live</Link>
            <Link to="/pricing" className="ch-btn ch-btn-ghost">See pricing in ₹</Link>
          </div>
          <p style={{ ...muted, fontSize: '0.92rem', marginTop: 14 }}>
            Try it yourself: WhatsApp our demo dental clinic at <strong>+91 90223 12554</strong> and book, reschedule or cancel like a patient would.
          </p>
        </div>
      </section>

      <section style={{ padding: '20px 0 8px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>What is AI dental software?</h2>
          {DEFINITION.map((p) => <p key={p.slice(0, 24)} style={{ ...muted, maxWidth: 720, margin: '10px auto 0' }}>{p}</p>)}
        </div>
      </section>

      <section style={{ padding: '28px 0 12px' }}>
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>What Aumy’s AI does in your clinic</h2>
        </div>
        <div style={{ marginTop: 14 }}><Cards items={CAPABILITIES} /></div>
      </section>

      <section style={{ padding: '32px 0 12px' }}>
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>Built for dental clinics in India</h2>
        </div>
        <div style={{ marginTop: 14 }}><Cards items={INDIA} /></div>
      </section>

      <section style={{ padding: '32px 0 12px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>AI dental software vs traditional dental software</h2>
          <div style={{ overflowX: 'auto', marginTop: 14 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560, fontSize: '0.95rem' }}>
              <thead>
                <tr>{COMPARE.head.map((h) => <th key={h || 'row'} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #e3e8f2' }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {COMPARE.rows.map(([k, a, b]) => (
                  <tr key={k}>
                    <th scope="row" style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #eef1f7' }}>{k}</th>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #eef1f7', ...muted }}>{a}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #eef1f7' }}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ padding: '32px 0 8px' }}>
        <div className="ch-container ch-narrow"><ClinicsServed /></div>
      </section>

      <section style={{ padding: '24px 0 12px' }}>
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>How to choose AI dental software in India: six questions to ask</h2>
        </div>
        <div style={{ marginTop: 14 }}><Cards items={CHOOSE} /></div>
      </section>

      <section style={{ padding: '32px 0 64px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>AI dental software questions, answered</h2>
          {FAQS.map((f) => (
            <div key={f.q} className="ch-why-card" style={{ display: 'block', padding: '18px 22px', margin: '12px 0' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem' }}>{f.q}</h3>
              <p style={{ margin: 0, ...muted }}>{f.a}</p>
            </div>
          ))}
          <p style={{ ...muted, textAlign: 'center', fontSize: '0.85rem', marginTop: 18 }}>
            Last updated {UPDATED}. See also <Link to="/ai-dental-clinic-operations">AI-powered clinic operations</Link>, <Link to="/ai-patient-engagement">the AI-powered patient journey</Link> and <Link to="/switch">switching dental software</Link>.
          </p>
          <div className="ch-center" style={{ textAlign: 'center', marginTop: 22 }}>
            <Link to="/contact" className="ch-btn ch-btn-primary">Talk to us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIDentalSoftwareIndiaPage;
