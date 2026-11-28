import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import ClinicsServed from '../components/ClinicsServed';
import HeroVideo from '../components/HeroVideo';
import HeroStory from '../components/HeroStory';
import DrPriyankaFilm from '../components/DrPriyankaFilm';
import { GOOGLE_REVIEWS_URL } from '../data/googleReviews';
import { HERO, FOLLOW_UPS, PROOF, POOLED_PROOF, FIT, START, FAQ, FINAL, SEO } from '../data/homeOneProduct';
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
      {/* 1. HERO (owner 2026-11-28, copy + storyboard approved): "Run your clinic without the stress.", three numbered
          outcomes, one call to action (the call with Jayesh) and the animation (src/components/HeroStory.js).
          Phone order (owner 28 Nov): words, button, animation, outcomes. Wide screens: words, outcomes, button left; animation right.
          The Sterling team film with Dr Priyanka stays in the hero (owner 28 Nov: "put it back immediately");
          the animation has its own section below Dr Priyanka's film. */}
      <section className="ch-hero lux-hero hero3">
        <div className="ch-container hero3-grid">
          <div className="ch-hero-text hero3-top">
            <span className="ch-eyebrow">{HERO.eyebrow}</span>
            <h1 className="ch-hero-title">{HERO.title}</h1>
            <p className="ch-hero-sub">{HERO.sub}</p>
          </div>
          <div className="hero3-anim">
            <HeroVideo />
          </div>
          <ol className="hero3-cards">
            {HERO.outcomes.map((o, i) => (
              <li key={o.key} className="hero3-card">
                <span className="hero3-num" aria-hidden="true">{i + 1}</span>
                <h2>{o.title}</h2>
                <p>{o.line}</p>
              </li>
            ))}
          </ol>
          <div className="hero3-cta">
            <div className="ch-hero-cta">
              <Link to={HERO.cta.to} className="ch-btn ch-btn-primary">{HERO.cta.label}</Link>
            </div>
            <p className="ch-hero-trust">{HERO.ctaNote}</p>
          </div>
        </div>
      </section>

      {/* 1b. HEAR IT FROM DR PRIYANKA (owner 2026-11-28, "Section under the hero"): one film, English | हिंदी,
          loads only on tap. Words: src/data/homeOneProduct.js (DR_PRIYANKA_FILM). */}
      <DrPriyankaFilm />

      {/* 1c. HOW IT WORKS, the animation (owner 28 Nov: "find a separate place for the animation"). */}
      <section className="ch-section hero3-story-section" id="how-it-works" aria-labelledby="op-story-title">
        <div className="ch-container hero3-story-wrap">
          <h2 id="op-story-title" className="ch-h2 op-center">How it works</h2>
          <div className="hero3-story">
            <HeroStory />
          </div>
        </div>
      </section>

      {/* Dental clinics Aumy serves (consented clinics only): src/data/clinicsServed.js */}
      <ClinicsServed />

      {/* "Your clinic, handled." (scroll story) and "Aumy is one product. It does four things." were removed on
          2026-11-28 (owner-approved consistency pass): the hero now tells the three steps. Both are in git history. */}

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

      {/* 4b. POOLED PROOF (owner 2026-11-13): approved wording only, src/data/proof.js */}
      <section className="ch-section op-pooled-section" id="proof" aria-labelledby="op-pooled-title">
        <div className="ch-container ch-narrow">
          <p className="op-center"><span className="ch-eyebrow">{POOLED_PROOF.eyebrow}</span></p>
          <h2 id="op-pooled-title" className="ch-h2 op-center">{POOLED_PROOF.title}</h2>
          <ul className="op-pooled">
            {POOLED_PROOF.items.map((t) => <li key={t}><Check /><span>{t}</span></li>)}
          </ul>
          <p className="op-pooled-window">{POOLED_PROOF.window}</p>
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

      {/* 5c. QUESTIONS (owner 2026-11-13): the search questions, shown here and in the FAQPage JSON-LD,
          plus the links to the practice-management page and the AI receptionist page. */}
      <section className="ch-section ch-tint" id="questions" aria-labelledby="op-faq-title">
        <div className="ch-container ch-narrow">
          <h2 id="op-faq-title" className="ch-h2 op-center">{FAQ.title}</h2>
          <div className="op-faq">
            {FAQ.items.map((f) => (
              <div key={f.q} className="op-faq-item">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
          <p className="op-handled-more op-faq-links">
            {FAQ.links.map((l, i) => (
              <React.Fragment key={l.to}>
                {i > 0 && ' · '}
                <Link to={l.to}>{l.label} →</Link>
              </React.Fragment>
            ))}
          </p>
        </div>
      </section>

      {/* 6. ONE CLOSING CALL TO ACTION: the headline again and the call with Jayesh (owner 2026-11-28) */}
      <section className="ch-offer" id="book-a-call">
        <div className="ch-container ch-center">
          <h2 className="ch-offer-title">{FINAL.title}</h2>
          <p className="ch-offer-sub">{FINAL.sub}</p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to={FINAL.cta.to} className="ch-btn ch-btn-primary">{FINAL.cta.label}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
