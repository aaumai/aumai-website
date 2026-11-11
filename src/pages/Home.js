import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import ClinicsServed from '../components/ClinicsServed';
import HeroVideo from '../components/HeroVideo';
import CapacityLine from '../components/CapacityLine';
import { GOOGLE_REVIEWS_URL } from '../data/googleReviews';
import { HERO, HANDLED, THREE, FOLLOW_UPS, PROOF, FIT, START, FINAL, SEO } from '../data/homeOneProduct';
import './HomeClinic.css';
import './HomeOneProduct.css';

// Home: Aumy as ONE product (owner 2026-11-02: "very very clear"). In five seconds a clinic owner reads what
// Aumy is, who it is for, what it does for them, and the one next step. Every word: src/data/homeOneProduct.js,
// mirrored in scripts/prerender.js (slug ''). The previous home (4C framework, strategies, KPIs, FAQ,
// masterclass band, module links) is in git history before this commit; its pages stay live and in the footer.

const Check = () => (
  <svg className="op-check" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICONS = {
  whatsapp: (
    <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3zm0 2a7 7 0 11-3.6 13l-.3-.2-2.4.6.6-2.3-.2-.3A7 7 0 0112 5zm-3 3.5c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.2.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a5.6 5.6 0 01-2.8-2.4c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H9z" fill="currentColor" />
  ),
  voice: (
    <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" fill="currentColor" />
  ),
  followups: (
    <path d="M12 3a9 9 0 109 9M21 3v6h-6M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  paperless: (
    <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm8 1.5V8h4.5M8 12h8M8 16h8M8 8h3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

const Home = () => {
  useEffect(() => {
    setPageSeo({
      // Same strings in scripts/prerender.js (slug '') and public/index.html.
      title: SEO.title,
      description: SEO.description,
      canonical: 'https://aumai.co.in/',
      image: `https://aumai.co.in${SEO.shareImage}`,
    });
  }, []);

  return (
    <div className="ch-home ho op">
      {/* 1. WHAT, WHO, OUTCOME, ONE NEXT STEP — and the Sterling film */}
      <section className="ch-hero lux-hero">
        <div className="ch-container ch-hero-grid lux-hero-grid">
          <div className="ch-hero-text">
            <span className="ch-eyebrow">{HERO.eyebrow}</span>
            <h1 className="ch-hero-title">{HERO.title}</h1>
            {/* NABH badge (owner 2026-11-11): our own pill, never NABH's artwork. */}
            <p className="op-badge">
              <span className="op-badge-pill"><Check />{HERO.badge.label}</span>
              <span className="op-badge-line">{HERO.badge.line}</span>
            </p>
            <p className="ch-hero-sub op-hero-sub">{HERO.subLead}</p>
            <ul className="op-hero-parts">
              {HERO.parts.map((p) => <li key={p.name}><Check /><span><strong>{p.name}</strong> {p.line}</span></li>)}
            </ul>
            <p className="op-hero-question">{HERO.lossQuestion}</p>
            <p className="op-hero-loss">{HERO.loss}</p>
            <div className="ch-hero-cta">
              <Link to={HERO.cta.to} className="ch-btn ch-btn-primary">{HERO.cta.label}</Link>
            </div>
            <p className="ch-hero-trust">{HERO.ctaNote}</p>
            <CapacityLine />
          </div>
          <div className="lux-hero-loop">
            <HeroVideo />
          </div>
        </div>
      </section>

      {/* Dental clinics Aumy serves (consented clinics only): src/data/clinicsServed.js */}
      <ClinicsServed />

      {/* END TO END, IN TWO STEPS (owner 2026-11-09): first Aumy plugs the leaks, then our team's services,
          which are for clinics on Aumy */}
      <section className="ch-section ch-tint" id="handled" aria-labelledby="op-handled-title">
        <div className="ch-container ch-narrow">
          <p className="op-center"><span className="ch-eyebrow">{HANDLED.eyebrow}</span></p>
          <h2 id="op-handled-title" className="ch-h2 op-center">{HANDLED.title}</h2>
          {HANDLED.steps.map((s, i) => (
            <div key={s.label} className="op-handled-step">
              <h3 className="op-handled-label"><span className="op-handled-n" aria-hidden="true">{i + 1}</span>{s.label}</h3>
              <ul className="op-handled">
                {s.items.map((t) => <li key={t}><Check /><span>{t}</span></li>)}
              </ul>
              {s.note && <p className="op-handled-note">{s.note}</p>}
            </div>
          ))}
          <p className="op-handled-closing">{HANDLED.closing}</p>
          <p className="op-handled-more">
            {HANDLED.more.text} <Link to={HANDLED.more.to}>{HANDLED.more.label} →</Link>
          </p>
        </div>
      </section>

      {/* 2. ONE PRODUCT, FOUR THINGS */}
      <section className="ch-section" id="what-aumy-does" aria-labelledby="op-three-title">
        <div className="ch-container">
          <h2 id="op-three-title" className="ch-h2 op-center">
            {THREE.title} <em>{THREE.titleB}</em>
          </h2>
          <div className="op-three">
            {THREE.items.map((it, i) => (
              <article key={it.key} className="op-card">
                <div className="op-card-top">
                  <span className="op-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="24" height="24">{ICONS[it.key]}</svg>
                  </span>
                  <span className="op-num">{i + 1}</span>
                </div>
                <h3>{it.name}</h3>
                <p className="op-card-line">{it.line}</p>
                <ul className="op-list">
                  {it.bullets.map((b) => (
                    <li key={b}><Check />{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EVERY FOLLOW-UP, DONE FOR YOU (mirrors the ad) */}
      <section className="ch-section ch-tint" id="follow-ups" aria-labelledby="op-fu-title">
        <div className="ch-container ch-narrow">
          <h2 id="op-fu-title" className="ch-h2 op-center">
            {FOLLOW_UPS.title} <em>{FOLLOW_UPS.titleB}</em>
          </h2>
          <p className="ch-lead op-center">{FOLLOW_UPS.lead}</p>
          <ul className="op-fu">
            {FOLLOW_UPS.rows.map(([when, done]) => (
              <li key={when}>
                <span className="op-fu-when">{when}</span>
                <span className="op-fu-done"><Check />{done}</span>
              </li>
            ))}
            <li className="op-fu-closer">
              <span className="op-fu-when">{FOLLOW_UPS.closer[0]}</span>
              <span className="op-fu-done"><Check />{FOLLOW_UPS.closer[1]}</span>
            </li>
          </ul>
          <p className="op-fu-note">{FOLLOW_UPS.note}</p>
          <p className="op-fu-campaigns">{FOLLOW_UPS.campaigns}</p>
        </div>
      </section>

      {/* 4. PROOF: Dr Priyanka's words and Sterling's measured number. id kept: /revenue-generator links here. */}
      <section className="ch-section" id="google-reviews" aria-label={PROOF.eyebrow}>
        <div className="ch-container ch-narrow op-proof">
          <span className="ch-eyebrow">{PROOF.eyebrow}</span>
          <figure className="op-quote">
            <blockquote>“{PROOF.quote}”</blockquote>
            <figcaption><strong>{PROOF.who}</strong> · {PROOF.where}</figcaption>
          </figure>
          <div className="op-stat">
            <strong>{PROOF.statN}</strong>
            <span>{PROOF.statT}</span>
            {PROOF.statS && <small>{PROOF.statS}</small>}
          </div>
          <a className="op-reviews-link" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            {PROOF.reviewsLink} →
          </a>
        </div>
      </section>

      {/* 5. WHO IT IS FOR */}
      <section className="ch-section ch-tint op-fit" aria-labelledby="op-fit-title">
        <div className="ch-container ch-narrow op-center">
          <h2 id="op-fit-title" className="ch-h2">{FIT.title}</h2>
          <p className="ch-lead">{FIT.body}</p>
        </div>
      </section>

      {/* 5b. SWITCHING TO AUMY (owner 2026-11-11): live in a week, keep or leave your practice software, easy screens.
          Answers the last question before the call to action: "how hard is it to switch?" */}
      <section className="ch-section" id="switching" aria-labelledby="op-start-title">
        <div className="ch-container">
          <p className="op-center"><span className="ch-eyebrow">{START.eyebrow}</span></p>
          <h2 id="op-start-title" className="ch-h2 op-center">{START.title}</h2>
          <div className="op-three op-start">
            {START.items.map((it, i) => (
              <article key={it.title} className="op-card">
                <div className="op-card-top">
                  <span className="op-num">{i + 1}</span>
                </div>
                <h3>{it.title}</h3>
                <p className="op-card-line">{it.body}</p>
              </article>
            ))}
          </div>
          <p className="op-handled-closing op-start-closing">{START.closing.title}</p>
          <p className="op-handled-more op-start-more">{START.closing.line}</p>
        </div>
      </section>

      {/* 6. ONE CLOSING CALL TO ACTION */}
      <section className="ch-offer" id="free-audit">
        <div className="ch-container ch-center">
          <h2 className="ch-offer-title">{FINAL.title}</h2>
          <p className="ch-offer-sub">{FINAL.sub}</p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to={FINAL.cta.to} className="ch-btn ch-btn-primary">{FINAL.cta.label}</Link>
          </div>
          <CapacityLine />
        </div>
      </section>
    </div>
  );
};

export default Home;
