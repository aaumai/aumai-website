import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { INDIA_WHATSAPP } from '../config/contact';
import { TITLE, DESCRIPTION, HERO, MODULES, CONNECTED, TABLE, FAQS } from '../data/modules';
import { MODULES_LINE } from '../data/positioning';
import ModuleIcon from '../components/ModuleIcon';
import './HomeClinic.css';
import './ModulesPage.css';

/**
 * /modules — every Aumy module sold on its own, or all of it as one connected
 * system (owner 2026-10-08). Every word lives in src/data/modules.js, shared
 * with scripts/prerender.js — edit it there, never here. No prices here:
 * /pricing owns them.
 */

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

// Shared module icons (also used by /modules/<id> and the home cards).
const Icon = ModuleIcon;

const waLink = (what) =>
  `https://wa.me/${INDIA_WHATSAPP.number}?text=${encodeURIComponent(`Hi, I'd like to know more about Aumy's ${what} for my clinic.`)}`;

const CELL = {
  yes: { text: '✓', label: 'Included', cls: 'md-yes' },
  opt: { text: 'Add-on', label: 'Optional add-on', cls: 'md-opt' },
  no: { text: '—', label: 'Not included', cls: 'md-no' },
};

const ModulesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({ title: TITLE, description: DESCRIPTION, canonical: 'https://aumai.co.in/modules' });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero md-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">{HERO.eyebrow}</span>
          <h1 className="ch-hero-title">{HERO.title}</h1>
          <p className="ch-hero-sub">{HERO.sub}</p>
          <p className="ch-dental-line ch-dental-center">{MODULES_LINE}</p>
          <nav aria-label="Modules on this page">
            <ul className="md-jump">
              {MODULES.map((m) => (
                <li key={m.id}><a href={`#${m.id}`}>{m.short}</a></li>
              ))}
              <li><a href="#one-system" className="md-jump-all">{CONNECTED.short}</a></li>
            </ul>
          </nav>
        </div>
      </section>

      <section className="md-cards-section" aria-label="Modules">
        <div className="ch-container md-grid">
          {MODULES.map((m, i) => (
            <article key={m.id} id={m.id} className="md-card" aria-labelledby={`${m.id}-title`}>
              <div className="md-card-top">
                <span className="md-icon"><Icon name={m.icon} /></span>
                <span className="md-kicker">Module {i + 1}</span>
              </div>
              {/* Short name as the heading; the formal name carries the search keywords. */}
              <h2 id={`${m.id}-title`} className="md-title">
                <Link to={`/modules/${m.id}`} className="md-title-link">{m.short}</Link>
                <span className="md-formal">{m.title}</span>
              </h2>
              <p className="md-promise">{m.promise}</p>
              <p className="md-for">{m.forWho}</p>
              <ul className="md-does">
                {m.does.map((d) => (
                  <li key={d}><Check /><span>{d}</span></li>
                ))}
              </ul>
              {m.scribe && (
                <div className="md-scribe">
                  <h3 className="md-scribe-title">
                    + <Link to="/modules/aumy-scribe" className="md-title-link">{m.scribe.short}</Link><span className="md-formal">{m.scribe.title}</span>
                  </h3>
                  <p>{m.scribe.promise}</p>
                </div>
              )}
              <div className="md-addons">
                <span className="md-addons-label">Add if you want</span>
                <ul>
                  {m.addons.map((a) => <li key={a} className="md-chip">+ {a}</li>)}
                </ul>
              </div>
              <div className="md-card-foot">
                <div className="md-cta">
                  <Link to="/contact" className="ch-btn ch-btn-primary">Book a demo</Link>
                  <a href={waLink(m.short)} className="ch-btn ch-btn-ghost" target="_blank" rel="noopener noreferrer">
                    WhatsApp us
                  </a>
                </div>
                <Link to={`/modules/${m.id}`} className="md-more md-page-link">Everything about {m.short} &rarr;</Link>
                <Link to={m.more.path} className="md-more">{m.more.label} &rarr;</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="one-system" className="md-connected-section" aria-labelledby="one-system-title">
        <div className="ch-container">
          <div className="md-connected">
            <div className="md-connected-head">
              <span className="md-icon md-icon-light"><Icon name="all" /></span>
              <span className="md-connected-eyebrow">{CONNECTED.eyebrow}</span>
              <h2 id="one-system-title" className="md-connected-title">{CONNECTED.short}<span className="md-formal">{CONNECTED.title}</span></h2>
              <p className="md-connected-sub">{CONNECTED.sub}</p>
            </div>
            <ol className="md-strip">
              {CONNECTED.steps.map((s) => (
                <li key={s.title} className="md-strip-step">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="md-connected-why">
              {CONNECTED.why.map(([t, b]) => (
                <div key={t}>
                  <h3>{t}</h3>
                  <p>{b}</p>
                </div>
              ))}
            </div>
            <div className="md-connected-cta">
              <Link to="/modules/aumy-one" className="ch-btn ch-btn-primary">See {CONNECTED.short}</Link>
              <Link to="/contact" className="ch-btn ch-btn-ghost ch-ghost-light">Book a demo of {CONNECTED.short}</Link>
              <a href={waLink(CONNECTED.short)} className="ch-btn ch-btn-ghost ch-ghost-light" target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="ch-section">
        <div className="ch-container">
          <div className="ch-head" style={{ marginBottom: 0 }}>
            <h2 className="ch-h2">{TABLE.title}</h2>
            <p className="ch-lead ch-center-lead">{TABLE.sub}</p>
          </div>
          <div className="md-table-wrap" role="region" aria-label={TABLE.title} tabIndex={0}>
            <table className="md-table">
              <caption>{TABLE.caption}</caption>
              <thead>
                <tr>
                  <th scope="col">What it covers</th>
                  {TABLE.cols.map((c, i) => (
                    <th key={c} scope="col" className={i === TABLE.cols.length - 1 ? 'md-all' : undefined}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE.rows.map(([label, cells]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {cells.map((v, i) => (
                      <td key={i} className={`${CELL[v].cls}${i === cells.length - 1 ? ' md-all' : ''}`}>
                        <span aria-hidden="true">{CELL[v].text}</span>
                        <span className="md-sr">{CELL[v].label}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="md-price-note">
            Prices: the Clinic OS starting price is on our <Link to="/pricing">pricing page</Link>; the AI
            modules are priced with you.
          </p>
        </div>
      </section>

      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center">Questions clinics ask about the modules</h2>
          <div className="ch-faq">
            {FAQS.map((f) => (
              <details key={f.q} className="ch-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <div className="ch-hero-cta ch-center-cta" style={{ marginTop: 30 }}>
            <Link to="/contact" className="ch-btn ch-btn-primary">Book a demo</Link>
            <Link to="/demos" className="ch-btn ch-btn-ghost">Watch the demo videos</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModulesPage;
