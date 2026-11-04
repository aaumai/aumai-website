import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import {
  inr, CALL, DEMO, HERO, PLANS, usageLine, overageLine, PER_MONTH, GST_NOTE, SETUP, META_NOTE,
  INCLUDED, FAQS, FINAL, SEO,
} from '../data/pricing';
import './HomeClinic.css';
import './PricingPage.css';

/**
 * /pricing — Aumy's public price list (owner 2026-11-04: "yes, publish pricing with 1000 chats and 400 minutes";
 * reverses the 2026-11-02 "no pricing on website at all"). Every number and sentence lives in src/data/pricing.js,
 * shared with scripts/prerender.js and scripts/seo-files.js — edit it there, never here.
 */

const Check = () => (
  <svg className="pr-check" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Ctas = () => (
  <div className="pr-ctas">
    <a href={CALL.href} className="ch-btn ch-btn-primary" target="_blank" rel="noopener noreferrer">{CALL.label}</a>
    <Link to={DEMO.to} className="ch-btn ch-btn-ghost pr-ghost">{DEMO.label}</Link>
  </div>
);

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({ title: SEO.title, description: SEO.description, canonical: 'https://aumai.co.in/pricing' });
  }, []);

  return (
    <div className="ch-home pr">
      <section className="pr-hero">
        <div className="ch-container ch-narrow pr-center">
          <span className="ch-eyebrow">{HERO.eyebrow}</span>
          <h1 className="pr-title">{HERO.title}</h1>
          <p className="pr-sub">{HERO.sub}</p>
        </div>
      </section>

      <section className="pr-section">
        <div className="ch-container">
          <div className="pr-plans">
            {PLANS.map((p) => (
              <article key={p.id} id={p.id} className={`pr-plan${p.featured ? ' pr-plan-featured' : ''}`} aria-labelledby={`plan-${p.id}`}>
                <h2 id={`plan-${p.id}`} className="pr-plan-name">{p.name}</h2>
                <p className="pr-plan-line">{p.line}</p>
                <p className="pr-price">
                  {inr(p.monthly)}<span className="pr-per">{PER_MONTH}</span>
                </p>
                <p className="pr-gst">{GST_NOTE}</p>
                <ul className="pr-list">
                  {p.includes.map((item) => <li key={item}><Check /><span>{item}</span></li>)}
                </ul>
                {p.usage && (
                  <div className="pr-usage">
                    <p><strong>{usageLine(p.usage)}</strong></p>
                    <p>{overageLine(p.usage)}</p>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="pr-setup">
            <div>
              <p className="pr-setup-label">{SETUP.label}</p>
              <p className="pr-setup-amount">{SETUP.amountText}</p>
            </div>
            <p className="pr-setup-text">{SETUP.terms} {SETUP.what}</p>
          </div>
          <p className="pr-meta">{META_NOTE}</p>

          <Ctas />
        </div>
      </section>

      <section className="pr-section pr-included">
        <div className="ch-container">
          <h2 className="ch-h2 pr-center">{INCLUDED.title}</h2>
          <div className="pr-inc-grid">
            <div className="pr-inc">
              <h3>{INCLUDED.software.name}</h3>
              <p className="pr-inc-lead">In both plans.</p>
              <ul className="pr-list pr-list-plain">
                {INCLUDED.software.items.map((i) => <li key={i}><Check /><span>{i}</span></li>)}
              </ul>
            </div>
            <div className="pr-inc">
              <h3>{INCLUDED.receptionist.name}</h3>
              <p className="pr-inc-lead">{INCLUDED.receptionist.lead}</p>
              <ul className="pr-list pr-list-plain">
                {INCLUDED.receptionist.items.map((i) => <li key={i}><Check /><span>{i}</span></li>)}
              </ul>
            </div>
          </div>
          <div className="pr-inc pr-inc-wide">
            <h3>{INCLUDED.followUps.name}</h3>
            <p className="pr-inc-lead">{INCLUDED.followUps.lead}</p>
            <ul className="pr-rows">
              {INCLUDED.followUps.rows.map(([q, a]) => (
                <li key={q}><span className="pr-row-q">{q}</span><span className="pr-row-a">{a}</span></li>
              ))}
            </ul>
            <p className="pr-inc-note">{INCLUDED.followUps.note}</p>
          </div>
        </div>
      </section>

      <section className="pr-section pr-faq">
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 pr-center">Questions clinics ask</h2>
          <div className="ch-faq">
            {FAQS.map((f) => (
              <details key={f.q} className="ch-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}{f.link && <> <Link to={f.link.to}>{f.link.label}</Link>.</>}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pr-section pr-final">
        <div className="ch-container ch-narrow pr-center">
          <h2 className="ch-h2">{FINAL.title}</h2>
          <p className="pr-sub">{FINAL.sub}</p>
          <Ctas />
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
