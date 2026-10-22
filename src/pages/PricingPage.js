import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import {
  MONTHLY_FROM, inr, CLINIC_OS, HEADLINE, HEADLINE_ACCENT, SUB, ADDONS, GST, FAQS,
  SEO_TITLE, SEO_DESCRIPTION,
} from '../data/pricing';
import GoogleReviews from '../components/GoogleReviews';
import './HomeClinic.css';
import './PricingPage.css';

/**
 * /pricing — one simple price (owner 2026-10-04: "Keep it simple — we just
 * mention starts from 5000 a month and get rid of all the complexity").
 * Every number and sentence lives in src/data/pricing.js, shared with
 * scripts/prerender.js — edit it there, never here.
 */

const WA = `https://wa.me/918007189868?text=${encodeURIComponent('Hi, I would like to talk about Aumy pricing for my clinic.')}`;

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({ title: SEO_TITLE, description: SEO_DESCRIPTION, canonical: 'https://aumai.co.in/pricing' });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero pp-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Pricing</span>
          <h1 className="ch-hero-title">{HEADLINE} <em>{HEADLINE_ACCENT}</em></h1>
          <p className="ch-hero-sub pp-sub">{SUB}</p>
        </div>
      </section>

      <section className="pp-section">
        <div className="ch-container">
          <div className="pp-card">
            <div className="pp-card-main">
              <span className="ch-eyebrow">Aumy Clinic OS</span>
              <p className="pp-from">Starts from</p>
              <p className="pp-price">
                {inr(MONTHLY_FROM)}<span className="pp-per">/ month</span>
              </p>
              <ul className="pp-list">
                {CLINIC_OS.map((item) => (
                  <li key={item}><Check /><span>{item}</span></li>
                ))}
              </ul>
            </div>

            <div className="pp-card-side">
              <p className="pp-addons">{ADDONS}</p>
              <Link to="/contact" className="ch-btn ch-btn-primary pp-cta">Talk to us about your clinic</Link>
              <a href={WA} className="pp-wa" target="_blank" rel="noopener noreferrer">Or message us on WhatsApp</a>
              <p className="pp-fine">{GST}</p>
            </div>
          </div>
          <p className="pp-notice">Want only one part of Aumy? <Link to="/modules">See the modules you can buy on their own</Link>.</p>
        </div>
      </section>

      {/* Three Google reviews, word for word (owner 2026-10-22). Words: src/data/googleReviews.js. */}
      <GoogleReviews limit={3} compact />

      <section className="pp-section pp-faq-section">
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center">Questions clinics ask</h2>
          <div className="ch-faq">
            {FAQS.map((f) => (
              <details key={f.q} className="ch-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
