import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import HomeExplainers from '../components/HomeExplainers';
import AppDownload from '../components/AppDownload';
import HowWeWork from '../components/HowWeWork';
import { HOW_SEO, HOW_HERO, HOW_CONTROL, HOW_PROOF } from '../data/howItWorks';
import { HERO as HOME_HERO, FINAL, SEO } from '../data/homeOutcomes';
import './HomeClinic.css';

/**
 * /revenue-generator — "How Aumy works" in the top menu. 2026-10-22 (outcomes as a service): leads with the five
 * "How we work" steps (the same component as home), then staying in control, the module explainer videos lower
 * down with one quiet link to /modules, real proof and the app. Words: src/data/howItWorks.js and
 * src/data/homeOutcomes.js (shared with scripts/prerender.js). The 2026-10-12 app-first page is in git history.
 */
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
    <div className="ch-home">
      {/* HERO */}
      <section className="ch-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">{HOW_HERO.eyebrow}</span>
          <h1 className="ch-hero-title">{HOW_HERO.title}</h1>
          <p className="ch-hero-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>{HOW_HERO.sub}</p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to={HOME_HERO.primary.to} className="ch-btn ch-btn-primary">{HOME_HERO.primary.label}</Link>
            <a href={HOME_HERO.whatsapp.href} className="ch-btn ch-btn-ghost" target="_blank" rel="noopener noreferrer">
              {HOME_HERO.whatsapp.label}
            </a>
          </div>
        </div>
      </section>

      {/* THE FIVE STEPS, each with an example */}
      <HowWeWork eyebrow={HOW_HERO.stepsEyebrow} />

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

      {/* THE MODULE EXPLAINERS, lower down, with one quiet link to /modules */}
      <HomeExplainers />
      <p className="ch-center" style={{ marginTop: -40, marginBottom: 80 }}>
        {FINAL.modulesLead} <Link to={FINAL.modulesLink.to}>{FINAL.modulesLink.label}</Link>
      </p>

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

      <AppDownload />
    </div>
  );
};

export default AumyRevenueGenerator;
