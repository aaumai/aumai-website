import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import HowWeWork from '../components/HowWeWork';
import {
  HOW_SEO, HOW_HERO, HOW_PARTS, HOW_DAY, HOW_STEPS, HOW_CONTROL, HOW_PROOF, HOW_FINAL,
} from '../data/howItWorks';
import { SEO } from '../data/homeOutcomes';
import './HomeClinic.css';
import './HomeOneProduct.css';

/**
 * /revenue-generator — "How it works" in the top menu. 2026-11-03 (owner): the one-product story, the same as
 * the home page. Each of the three parts at work (with its explainer film, labelled by part), the follow-ups,
 * an example day, the five setup steps, staying in control, proof and the one call to action. Words:
 * src/data/howItWorks.js (shared with scripts/prerender.js). The 2026-10-22 version is in git history.
 */
const Check = () => (
  <svg className="op-check" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
    <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AumyRevenueGenerator = () => {
  useEffect(() => {
    setPageSeo({
      title: HOW_SEO.title,
      description: HOW_SEO.description,
      canonical: 'https://aumai.co.in/revenue-generator',
      image: `https://aumai.co.in${SEO.shareImage}`,
    });
  }, []);

  return (
    <div className="ch-home ho op">
      {/* HERO: what this page answers, and the one next step */}
      <section className="ch-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">{HOW_HERO.eyebrow}</span>
          <h1 className="ch-hero-title">{HOW_HERO.title}</h1>
          <p className="ch-hero-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>{HOW_HERO.sub}</p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to={HOW_HERO.cta.to} className="ch-btn ch-btn-primary">{HOW_HERO.cta.label}</Link>
          </div>
          <p className="ch-hero-trust">{HOW_HERO.ctaNote}</p>
        </div>
      </section>

      {/* THE THREE PARTS (and the follow-ups), each with its film */}
      <section className="ch-section ch-tint" id="parts" aria-labelledby="hw-parts-title">
        <div className="ch-container">
          <h2 id="hw-parts-title" className="ch-h2 op-center">{HOW_PARTS.title} <em>{HOW_PARTS.titleB}</em></h2>
          <p className="op-center op-film-note">{HOW_PARTS.filmNote}</p>
          <div className="hw-parts">
            {HOW_PARTS.items.map((it, i) => (
              <article key={it.key} className={`hw-part${it.film ? '' : ' hw-part--nofilm'}`}>
                <div className="hw-part-text">
                  <span className="op-num">{i < 3 ? i + 1 : '+'}</span>
                  <h3>{it.name}</h3>
                  <p className="op-card-line">{it.line}</p>
                  <ul className="op-list">
                    {it.bullets.map((b) => <li key={b}><Check />{b}</li>)}
                  </ul>
                </div>
                {it.film && (
                  <figure className="ch-explainer hw-film">
                    <video controls preload="none" playsInline poster={it.film.poster} aria-label={`${it.name}: video`}>
                      <source src={it.film.src} type="video/mp4" />
                    </video>
                  </figure>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AN EXAMPLE DAY */}
      <section className="ch-section" id="a-day" aria-labelledby="hw-day-title">
        <div className="ch-container ch-narrow">
          <h2 id="hw-day-title" className="ch-h2 op-center">{HOW_DAY.title} <em>{HOW_DAY.titleB}</em></h2>
          <p className="ch-lead op-center">{HOW_DAY.lead}</p>
          <ol className="hw-day">
            {HOW_DAY.steps.map(([when, what]) => (
              <li key={when}>
                <span className="hw-day-when">{when}</span>
                <span className="hw-day-what">{what}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* THE FIVE SETUP STEPS (shared component, one-product title) */}
      <HowWeWork eyebrow={HOW_STEPS.eyebrow} titleA={HOW_STEPS.titleA} titleB={HOW_STEPS.titleB} />

      {/* STAYING IN CONTROL */}
      <section className="ch-section">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Your clinic stays in control</span>
            <h2 className="ch-h2">We work for your team, not around it.</h2>
          </div>
          <div className="ch-why">
            {HOW_CONTROL.map((c) => (
              <div key={c.title} className="ch-why-card">
                <div>
                  <h3 className="ch-why-title">{c.title}</h3>
                  <p className="ch-why-body">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2">Busy clinics already run on Aumy.</h2>
          <blockquote className="ch-founder">
            &ldquo;{HOW_PROOF.quote}&rdquo;
            <cite>— {HOW_PROOF.who}</cite>
          </blockquote>
          <p className="ch-lead"><strong>{HOW_PROOF.number}</strong> {HOW_PROOF.numberText}</p>
          <Link to="/#google-reviews" className="ch-btn ch-btn-ghost">Read what clinic owners say</Link>
        </div>
      </section>

      {/* ONE CLOSING CALL TO ACTION */}
      <section className="ch-offer">
        <div className="ch-container ch-center">
          <h2 className="ch-offer-title">{HOW_FINAL.title}</h2>
          <p className="ch-offer-sub">{HOW_FINAL.sub}</p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to={HOW_FINAL.cta.to} className="ch-btn ch-btn-primary">{HOW_FINAL.cta.label}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AumyRevenueGenerator;
