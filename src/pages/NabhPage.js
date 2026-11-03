import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import NABH from '../data/nabh';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

// /nabh-dental-clinic-software — words in src/data/nabh.js (shared with scripts/prerender.js).
const NabhPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: NABH.TITLE,
      description: NABH.DESCRIPTION,
      canonical: `https://aumai.co.in${NABH.PATH}`,
    });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 24 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">NABH documentation for dental clinics</span>
          <h1 className="ch-hero-title">{NABH.H1}</h1>
          <p className="ch-hero-sub">{NABH.SUB}</p>
          <div style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="ch-btn ch-btn-primary">Book a demo</Link>
            <Link to={NABH.MODULE_PATH} className="ch-btn ch-btn-ghost">See Aumy Clinic</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '8px 0 36px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>{NABH.HEADING}</h2>
          <p style={{ textAlign: 'center', color: '#5b6784' }}>{NABH.LEAD}</p>
          <ul style={{ listStyle: 'none', margin: '18px 0 0', padding: 0 }}>
            {NABH.BULLETS.map((b) => (
              <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '12px 0' }}>
                <Check /><span>{b}</span>
              </li>
            ))}
          </ul>
          <p style={{ color: '#5b6784', marginTop: 18 }}>{NABH.FOOTNOTE}</p>
        </div>
      </section>

      <section style={{ padding: '8px 0 36px' }}>
        <div className="ch-container ch-narrow">
          {NABH.SECTIONS.map((s) => (
            <div key={s.h2} style={{ margin: '22px 0' }}>
              <h2 className="ch-h2" style={{ fontSize: '1.3rem' }}>{s.h2}</h2>
              <p style={{ color: '#5b6784' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '8px 0 64px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>NABH and dental clinic software: questions answered</h2>
          {NABH.FAQS.map((f) => (
            <div key={f.q} className="ch-why-card" style={{ display: 'block', padding: '18px 22px', margin: '12px 0' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem' }}>{f.q}</h3>
              <p style={{ margin: 0, color: '#5b6784' }}>{f.a}</p>
            </div>
          ))}
          <div className="ch-center" style={{ textAlign: 'center', marginTop: 26 }}>
            <Link to="/contact" className="ch-btn ch-btn-primary">Book a demo</Link>{' '}
            <Link to="/demos" className="ch-btn ch-btn-ghost">Watch the demos</Link>{' '}
            <Link to="/compliance" className="ch-btn ch-btn-ghost">Security &amp; compliance</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NabhPage;
