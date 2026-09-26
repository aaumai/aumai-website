import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { TITLE, DESCRIPTION, HERO, MATHS, CAPABILITIES, STAGE, FAQS } from '../data/aiReceptionist';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const AIReceptionistPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: TITLE,
      description: DESCRIPTION,
      canonical: 'https://aumai.co.in/ai-receptionist',
    });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 24 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">AI Receptionist</span>
          <h1 className="ch-hero-title">{HERO.title}</h1>
          <p className="ch-hero-sub">{HERO.sub}</p>
          <div style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/demos" className="ch-btn ch-btn-primary">Watch it handle a real clinic&rsquo;s WhatsApp</Link>
            <Link to="/growth-audit" className="ch-btn ch-btn-ghost">Get a free Growth Audit</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 0 8px' }}>
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>{MATHS.title}</h2>
          <p style={{ color: '#5b6784', maxWidth: 640, margin: '8px auto 0' }}>{MATHS.body}</p>
        </div>
      </section>

      <section style={{ padding: '28px 0 40px' }}>
        <div className="ch-container" style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))' }}>
          {CAPABILITIES.map(([title, body]) => (
            <div key={title} className="ch-why-card" style={{ display: 'block', padding: '20px 22px' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Check />
                <div>
                  <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem' }}>{title}</h3>
                  <p style={{ margin: 0, color: '#5b6784' }}>{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '8px 0 40px' }}>
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>{STAGE.title}</h2>
          <p style={{ color: '#5b6784', maxWidth: 640, margin: '8px auto 0' }}>{STAGE.body}</p>
          <div style={{ marginTop: 16 }}>
            <Link to="/whatsapp-automation-for-clinics" className="ch-btn ch-btn-ghost">See the WhatsApp automation behind it</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '8px 0 64px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>AI receptionist questions, answered</h2>
          {FAQS.map((f) => (
            <div key={f.q} className="ch-why-card" style={{ display: 'block', padding: '18px 22px', margin: '12px 0' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem' }}>{f.q}</h3>
              <p style={{ margin: 0, color: '#5b6784' }}>{f.a}</p>
            </div>
          ))}
          <div className="ch-center" style={{ textAlign: 'center', marginTop: 26 }}>
            <Link to="/pricing" className="ch-btn ch-btn-primary">See pricing — everything included</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIReceptionistPage;
