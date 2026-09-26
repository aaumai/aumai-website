import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { NAME, ROLE, YEARS, COUNTRIES, SUMMARY, STORY, EXPERTISE, CAREER, QUOTE } from '../data/founder';
import './HomeClinic.css';

/**
 * About — the Aumy story and its founder (owner 2026-09-26). Replaces the old
 * "healthcare engineering partner" page (components/About.js stays in code,
 * unused): the site is dental-only now. Words live in src/data/founder.js,
 * shared with the crawler HTML in scripts/prerender.js.
 */
const AboutPage = () => {
  useEffect(() => {
    setPageSeo({
      title: `About Aumy & its founder, ${NAME} | AI Dental Software`,
      description: `Aumy is built by ${NAME}: ${SUMMARY}`,
      canonical: 'https://aumai.co.in/about',
    });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-offer lux-about-hero">
        <div className="ch-container">
          <span className="ch-eyebrow">The founder</span>
          <h1 className="ch-offer-title lux-about-title">
            {YEARS} years inside healthcare. <em>One problem, seen in clinic after clinic.</em>
          </h1>
          <p className="ch-offer-sub lux-about-sub">{NAME} &middot; {ROLE}</p>
          <ul className="lux-about-facts">
            <li><strong>{YEARS}</strong><span>years in healthcare technology</span></li>
            <li><strong>{COUNTRIES.length}</strong><span>markets: {COUNTRIES.join(' · ')}</span></li>
            <li><strong>4</strong><span>disciplines: workflows, compliance, interoperability, AI</span></li>
          </ul>
        </div>
      </section>

      <section className="ch-section">
        <div className="ch-container lux-about-story">
          <div>
            <span className="ch-eyebrow">Why Aumy exists</span>
            <h2 className="ch-h2">It wasn&rsquo;t a patient problem. <em>It was a coordination problem.</em></h2>
            <p className="ch-lead">{SUMMARY}</p>
          </div>
          <div className="lux-about-prose">
            {STORY.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="ch-section ch-tint">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">What he brings</span>
            <h2 className="ch-h2">Deep in the work <em>around</em> the chair</h2>
          </div>
          <div className="ch-pillars">
            {EXPERTISE.map((e, i) => (
              <div key={e.title} className="ch-pillar">
                <span className="ch-pillar-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="ch-pillar-title">{e.title}</h3>
                <p className="ch-pillar-body">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ch-section">
        <div className="ch-container ch-narrow">
          <div className="ch-head">
            <span className="ch-eyebrow">The path to Aumy</span>
            <h2 className="ch-h2">From records and revenue cycle <em>to running the clinic</em></h2>
          </div>
          <ol className="lux-timeline">
            {CAREER.map((c) => (
              <li key={c.org + c.years}>
                <span className="lux-timeline-years">{c.years}</span>
                <div>
                  <p className="lux-timeline-role">{c.role} <span>&middot; {c.org}</span></p>
                  <p className="lux-timeline-what">{c.what}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Built with clinics in</span>
          <p className="lux-countries">{COUNTRIES.join('  ·  ')}</p>
          <blockquote className="ch-founder">
            &ldquo;{QUOTE}&rdquo;
            <cite>&mdash; {NAME}, {ROLE}</cite>
          </blockquote>
          <div className="ch-hero-cta ch-center-cta">
            <Link to="/growth-audit" className="ch-btn ch-btn-primary">Get my free Clinic Growth Audit</Link>
            <Link to="/contact" className="ch-btn ch-btn-ghost">Talk to {NAME.split(' ')[0]}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
