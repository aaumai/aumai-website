import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { TITLE, DESCRIPTION, HERO, JOURNEY, STAGES, DIFFERENCE, FAQS } from '../data/whatsappAutomation';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const WhatsAppAutomationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: TITLE,
      description: DESCRIPTION,
      canonical: 'https://aumai.co.in/whatsapp-automation-for-clinics',
    });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 24 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">WhatsApp Automation</span>
          <h1 className="ch-hero-title">{HERO.title}</h1>
          <p className="ch-hero-sub">{HERO.sub}</p>
          <div style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/demos" className="ch-btn ch-btn-primary">See it live on a real clinic&rsquo;s WhatsApp</Link>
            <Link to="/pricing" className="ch-btn ch-btn-ghost">View pricing</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 0 8px' }}>
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>{JOURNEY.title}</h2>
          <p style={{ color: '#5b6784', maxWidth: 640, margin: '8px auto 0' }}>{JOURNEY.body}</p>
        </div>
      </section>

      <section style={{ padding: '24px 0 32px' }}>
        <div className="ch-container" style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))' }}>
          {STAGES.map(([stage, body], i) => (
            <div key={stage} className="ch-why-card" style={{ display: 'block', padding: '20px 22px', borderTop: '3px solid #2563EB' }}>
              <span className="ch-eyebrow">Stage {i + 1}</span>
              <h3 style={{ margin: '4px 0 6px', fontSize: '1.05rem' }}>{stage}</h3>
              <p style={{ margin: 0, color: '#5b6784' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '8px 0 36px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>Not another broadcast tool</h2>
          <ul style={{ listStyle: 'none', margin: '18px 0 0', padding: 0 }}>
            {DIFFERENCE.map(([title, body]) => (
              <li key={title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '14px 0' }}>
                <Check />
                <span><strong>{title}.</strong> <span style={{ color: '#5b6784' }}>{body}</span></span>
              </li>
            ))}
          </ul>
          <div className="ch-center" style={{ textAlign: 'center', marginTop: 22 }}>
            <Link to="/ai-receptionist" className="ch-btn ch-btn-ghost">Meet the AI receptionist that powers the replies</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '8px 0 64px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>WhatsApp automation questions, answered</h2>
          {FAQS.map((f) => (
            <div key={f.q} className="ch-why-card" style={{ display: 'block', padding: '18px 22px', margin: '12px 0' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem' }}>{f.q}</h3>
              <p style={{ margin: 0, color: '#5b6784' }}>{f.a}</p>
            </div>
          ))}
          <div className="ch-center" style={{ textAlign: 'center', marginTop: 26 }}>
            <Link to="/growth-audit" className="ch-btn ch-btn-primary">Start with a free Growth Audit</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatsAppAutomationPage;
