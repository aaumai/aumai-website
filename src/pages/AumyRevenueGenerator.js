import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import HomeExplainers from '../components/HomeExplainers';
import AppDownload from '../components/AppDownload';
import FourC from '../components/FourC';
import { HERO_PRODUCTS } from '../data/positioning';
import { HOW_STEPS, HOW_CONTROL, HOW_SEO, HOW_FOURC_LEAD, HOW_START } from '../data/howItWorks';
import './HomeClinic.css';

/**
 * /revenue-generator — "How Aumy works" in the top menu. Rebuilt lean on 2026-10-12 (owner: "get rid of our old
 * positioning"): three steps to go live, the module explainers, what each module does, staying in control, proof,
 * the app. Words: src/data/howItWorks.js (shared with scripts/prerender.js). The retired page (coordination problem,
 * Convert → Care → Retain → Reactivate, Jarvis, dedicated expert, Get Found) is in git history before this commit.
 * 2026-10-17 (owner: "make it 4C everywhere"): the 4C Framework leads the page (src/data/fourC.js); the three
 * onboarding steps follow, labelled "Getting started" so they never read as a second journey.
 */
const AumyRevenueGenerator = () => {
  useEffect(() => {
    setPageSeo({
      title: HOW_SEO.title,
      description: HOW_SEO.description,
      canonical: 'https://aumai.co.in/revenue-generator',
      image: 'https://aumai.co.in/screenshots/roi-preview.png',
    });
  }, []);

  return (
    <div className="ch-home">
      {/* HERO */}
      <section className="ch-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">How Aumy works</span>
          <h1 className="ch-hero-title">Pick a module. Connect. Stop losing patients.</h1>
          <p className="ch-hero-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Aumy is built from modules for dental clinics. Start with the one for your biggest leak, set it up from
            your phone, and add more whenever you want.
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <a href="#get-the-app" className="ch-btn ch-btn-primary">Start free in the app</a>
            <Link to="/contact" className="ch-btn ch-btn-ghost">Talk to our team</Link>
          </div>
        </div>
      </section>

      {/* THE 4C FRAMEWORK — how Aumy works */}
      <FourC id="the-4c-framework" tint lead={HOW_FOURC_LEAD} />

      {/* GETTING STARTED — three steps to go live */}
      <section className="ch-section">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">{HOW_START.eyebrow}</span>
            <h2 className="ch-h2">{HOW_START.title}</h2>
          </div>
          <ol className="ch-how-steps">
            {HOW_STEPS.map((s, i) => (
              <li key={s.title} className="ch-why-card">
                <span className="ch-how-num">{i + 1}</span>
                <div>
                  <h3 className="ch-why-title">{s.title}</h3>
                  <p className="ch-why-body">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="ch-note ch-center">
            Prefer it set up for you? Call our team on <a href="tel:+918007189868">80071 89868</a>.
          </p>
        </div>
      </section>

      {/* THE MODULE EXPLAINERS */}
      <HomeExplainers />

      {/* WHAT EACH MODULE DOES */}
      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow">
          <div className="ch-head">
            <span className="ch-eyebrow">The modules</span>
            <h2 className="ch-h2">Buy only what you need.</h2>
          </div>
          <ul className="ch-how-modules">
            {HERO_PRODUCTS.map((p) => (
              <li key={p.id}>
                <Link to={`/modules/${p.id}`}>{p.name}</Link> <span>{p.outcome}</span>
              </li>
            ))}
          </ul>
          <p className="ch-center"><Link to="/modules">Compare all the modules side by side &rarr;</Link></p>
        </div>
      </section>

      {/* STAYING IN CONTROL */}
      <section className="ch-section">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Your clinic stays in control</span>
            <h2 className="ch-h2">Aumy works for your team, not around it.</h2>
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
            &ldquo;Our revenue grew about 25% in just two months — and we didn&rsquo;t hire a single extra person to
            make it happen.&rdquo;
            <cite>— Vinayaka Dental Care</cite>
          </blockquote>
          <Link to="/case-studies" className="ch-btn ch-btn-ghost">Read the case studies</Link>
        </div>
      </section>

      <AppDownload />
    </div>
  );
};

export default AumyRevenueGenerator;
