import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { INDIA_WHATSAPP } from '../config/contact';
import { PAGES, CONNECTED, pageById } from '../data/modules';
import { MODULES_LINE } from '../data/positioning';
import ModuleIcon from '../components/ModuleIcon';
import './HomeClinic.css';
import './ModulesPage.css';

/**
 * /modules/<id> — one page per Aumy module (owner 2026-10-08): what it does,
 * who it suits, what you get, what it works with. One template; every word
 * lives in PAGES in src/data/modules.js, shared with scripts/prerender.js.
 */

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const waLink = (what) =>
  `https://wa.me/${INDIA_WHATSAPP.number}?text=${encodeURIComponent(`Hi, I'd like to know more about ${what} for my clinic.`)}`;

const ModuleDetailPage = () => {
  const { slug } = useParams();
  const page = pageById(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (page) {
      setPageSeo({
        title: page.seoTitle,
        description: page.seoDescription,
        canonical: `https://aumai.co.in/modules/${page.id}`,
      });
    }
  }, [page]);

  if (!page) return <Navigate to="/modules" replace />;

  const pairs = page.pairs.map(pageById).filter(Boolean);
  const isOne = !!page.featured;

  return (
    <div className="ch-home">
      <section className="ch-hero md-hero mp-hero">
        <div className="ch-container ch-narrow">
          <nav aria-label="Breadcrumb" className="mp-crumbs">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/modules">Modules</Link></li>
              <li aria-current="page">{page.short}</li>
            </ol>
          </nav>
          <span className="md-icon mp-icon"><ModuleIcon name={page.icon} /></span>
          {page.addonOf && <span className="mp-addon-tag">Add-on to {page.addonOf}</span>}
          <h1 className="ch-hero-title mp-title">
            {page.short}
            <span className="mp-formal">{page.title}</span>
          </h1>
          <p className="ch-hero-sub mp-intro">{page.intro}</p>
          <p className="ch-dental-line">{MODULES_LINE}</p>
          <div className="ch-hero-cta">
            <Link to="/contact" className="ch-btn ch-btn-primary">Book a demo</Link>
            <a href={waLink(page.short)} className="ch-btn ch-btn-ghost" target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          </div>
        </div>
      </section>

      <section className="ch-section mp-section">
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2">{isOne ? 'How it works, from enquiry to recall' : 'What it does'}</h2>
          <ul className="md-does mp-list">
            {page.does.map((d) => <li key={d}><Check /><span>{d}</span></li>)}
          </ul>
          {page.addons.length > 0 && (
            <div className="md-addons mp-addons">
              <span className="md-addons-label">Add if you want</span>
              <ul>{page.addons.map((a) => <li key={a} className="md-chip">+ {a}</li>)}</ul>
            </div>
          )}
        </div>
      </section>

      <section className="ch-section ch-tint mp-section">
        <div className="ch-container mp-two">
          <div className="mp-panel">
            <h2 className="ch-h2">Who it&rsquo;s for</h2>
            <ul className="mp-who">
              {page.whoFor.map((w) => <li key={w}>{w}</li>)}
            </ul>
          </div>
          <div className="mp-panel">
            <h2 className="ch-h2">What you get</h2>
            <ul className="md-does mp-list">
              {page.outcomes.map((o) => <li key={o}><Check /><span>{o}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="ch-section mp-section">
        <div className="ch-container">
          <h2 className="ch-h2 ch-center">{isOne ? 'The modules inside Aumy One' : 'Works even better with'}</h2>
          <ul className="mh-grid mp-pairs">
            {pairs.map((p) => (
              <li key={p.id}>
                <Link to={`/modules/${p.id}`} className="mh-card">
                  <span className="md-icon"><ModuleIcon name={p.icon} /></span>
                  <span className="mh-name">{p.short}</span>
                  <span className="mh-formal">{p.title}</span>
                  <span className="mh-line">{p.card}</span>
                  <span className="mh-go" aria-hidden="true">See what it does &rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
          {page.deep.length > 0 && (
            <p className="mp-deep">
              Go deeper:{' '}
              {page.deep.map((d, i) => (
                <React.Fragment key={d.path}>
                  {i > 0 && ' · '}
                  <Link to={d.path}>{d.label}</Link>
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
      </section>

      {!isOne && (
        <section className="md-connected-section">
          <div className="ch-container">
            <div className="md-connected mp-one-band">
              <div className="md-connected-head">
                <span className="md-icon md-icon-light"><ModuleIcon name="all" /></span>
                <span className="md-connected-eyebrow">Or run it all as one</span>
                <h2 className="md-connected-title">{CONNECTED.short}<span className="md-formal">{CONNECTED.title}</span></h2>
                <p className="md-connected-sub">{CONNECTED.sub}</p>
              </div>
              <div className="md-connected-cta">
                <Link to="/modules/aumy-one" className="ch-btn ch-btn-primary">See Aumy One</Link>
                <Link to="/modules" className="ch-btn ch-btn-ghost ch-ghost-light">Compare all modules</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2">See {page.short} working in a dental clinic</h2>
          <p className="ch-sub">A short demo on a call, or message us on WhatsApp — whichever is easier for you.</p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to="/contact" className="ch-btn ch-btn-primary">Book a demo</Link>
            <a href={waLink(page.short)} className="ch-btn ch-btn-ghost" target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          </div>
          <p className="mp-other">
            Other modules:{' '}
            {PAGES.filter((p) => p.id !== page.id).map((p, i) => (
              <React.Fragment key={p.id}>
                {i > 0 && ' · '}
                <Link to={`/modules/${p.id}`}>{p.short}</Link>
              </React.Fragment>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ModuleDetailPage;
