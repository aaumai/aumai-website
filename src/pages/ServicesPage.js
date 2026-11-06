import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import CapacityLine from '../components/CapacityLine';
import S from '../data/services';
import './HomeClinic.css';
import './ClinicWebsitesPage.css';
import './ServicePage.css';
import './ServicesPage.css';

// /services (owner 2026-11-05): the three services on one page, dental ads, dental websites and
// dental SEO, each linking to its own deeper page. Words: src/data/services.js (the same file
// scripts/prerender.js writes into the crawler HTML). Built on the clinic system (.ch-*), the
// /clinic-websites pieces (.cw-*) and the service pages (.sv-*) under the lux theme. No prices.

const ORIGIN = 'https://aumai.co.in';

// The call with Jayesh opens his booking page; the audit is a page on this site.
const CallLink = ({ className }) => (
  <a className={className} href={S.CTA.primary.href} target="_blank" rel="noopener noreferrer">{S.CTA.primary.label}</a>
);
const AuditLink = ({ className }) => <Link className={className} to={S.CTA.secondary.href}>{S.CTA.secondary.label}</Link>;

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({ title: S.SEO.title, description: S.SEO.description, canonical: `${ORIGIN}${S.PATH}` });
  }, []);

  return (
    <div className="ch-home cw-page sv-page so-page">
      {/* Hero: who it is for, the three services, the call */}
      <section className="ch-hero lux-hero cw-hero">
        <div className="ch-container">
          <div className="ch-hero-grid lux-hero-grid cw-hero-grid">
            <div className="ch-hero-text">
              <span className="ch-eyebrow">{S.HERO.eyebrow}</span>
              <h1 className="ch-hero-title cw-hero-title">{S.HERO.title}</h1>
              <p className="ch-hero-sub">{S.HERO.sub}</p>
              <div className="ch-hero-cta">
                <CallLink className="ch-btn ch-btn-primary" />
                <AuditLink className="ch-btn ch-btn-ghost" />
              </div>
              <p className="ch-hero-trust">{S.HERO.note}</p>
              <CapacityLine />
            </div>
            <nav className="so-index" aria-label={S.HERO.indexTitle}>
              <p className="so-index-title">{S.HERO.indexTitle}</p>
              <ol>
                {S.SERVICES.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>
                      <span className="so-index-n" aria-hidden="true">{s.n}</span>
                      <span className="so-index-text"><strong>{s.name}</strong><span>{s.short}</span></span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* The three services */}
      {S.SERVICES.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`ch-section so-service${i % 2 ? ' ch-tint' : ''}`}
          aria-labelledby={`so-${s.id}-title`}
        >
          <div className="ch-container">
            <div className="so-service-head">
              <span className="so-n" aria-hidden="true">{s.n}</span>
              <div>
                <span className="ch-eyebrow">{s.name}</span>
                <h2 id={`so-${s.id}-title`} className="ch-h2 sv-h2-left">{s.title}</h2>
                <p className="so-problem"><strong>The problem. </strong>{s.problem}</p>
              </div>
            </div>
            <div className="cw-case-grid so-service-grid">
              <div>
                <h3 className="so-subhead">What we do</h3>
                <ul className="cw-did">{s.does.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
              <aside className="cw-goal so-gets">
                <h3 className="so-subhead">What your clinic gets</h3>
                <ul className="sv-fit">{s.gets.map((g) => <li key={g}>{g}</li>)}</ul>
                <p className="so-measured">{s.measured}</p>
                <Link className="ch-btn ch-btn-ghost so-more" to={s.link.to}>{s.link.label}</Link>
              </aside>
            </div>
          </div>
        </section>
      ))}

      {/* Our work: named clients only with their OK, no numbers */}
      <section className="ch-section ch-tint" id="work" aria-labelledby="so-work">
        <div className="ch-container">
          <div className="cw-case-head">
            <span className="ch-eyebrow">{S.WORK.eyebrow}</span>
            <h2 id="so-work" className="ch-h2">{S.WORK.title}</h2>
            <p className="ch-lead">{S.WORK.intro}</p>
          </div>
          <ul className="sv-cases">
            {S.WORK.cases.map((c) => (
              <li key={c.name}>
                <span className="sv-case-tag">{c.tag}</span>
                <h3>{c.name}</h3>
                {c.place && <p className="sv-case-place">{c.place}</p>}
                <p>{c.text}</p>
                {c.link && <Link className="sv-case-link" to={c.link.href}>{c.link.label}</Link>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it starts */}
      <section className="ch-section" aria-labelledby="so-how">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">{S.STEPS.eyebrow}</span>
            <h2 id="so-how" className="ch-h2">{S.STEPS.title}</h2>
          </div>
          <ol className="cw-steps so-steps">
            {S.STEPS.items.map((st, i) => (
              <li key={st.h}>
                <span className="cw-step-n">Step {i + 1}</span>
                <h3>{st.h}</h3>
                <p>{st.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="ch-section ch-tint" aria-labelledby="so-faq">
        <div className="ch-container ch-narrow">
          <div className="ch-head cw-faq-head">
            <span className="ch-eyebrow">Questions</span>
            <h2 id="so-faq" className="ch-h2">Questions, answered</h2>
          </div>
          <div className="ch-faq">
            {S.FAQS.map((f) => (
              <details key={f.q} className="ch-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="ch-offer">
        <div className="ch-container ch-center">
          <span className="ch-eyebrow">{S.FINAL.eyebrow}</span>
          <h2 className="ch-offer-title">{S.FINAL.title}</h2>
          <p className="ch-offer-sub">{S.FINAL.text}</p>
          <div className="ch-hero-cta ch-center-cta">
            <CallLink className="ch-btn ch-btn-primary" />
            <AuditLink className="ch-btn ch-btn-ghost" />
          </div>
          <CapacityLine />
          <nav className="sv-siblings" aria-label="Services">
            {S.SERVICES.map((s) => <Link key={s.id} to={s.link.to}>{s.name}</Link>)}
            <Link to="/revenue-generator">Aumy, our main product</Link>
          </nav>
        </div>
      </section>
    </div>
  );
}
