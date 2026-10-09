import React from 'react';
import { Link } from 'react-router-dom';
import ModuleIcon from './ModuleIcon';
import StartInApp from './StartInApp';
import { HOME, PAGES } from '../data/modules';
import { isSelfServe } from '../data/appStores';
import '../pages/ModulesPage.css';

/**
 * Home: "Aumy is built from modules" (owner 2026-10-08). Every card is one
 * link to its /modules/<id> page. Words live in src/data/modules.js, shared
 * with the home crawler HTML in scripts/prerender.js.
 */
const HomeModules = () => {
  const one = PAGES.find((p) => p.featured);
  const mods = PAGES.filter((p) => !p.featured && !p.addonOf);
  const scribe = PAGES.find((p) => p.addonOf);

  return (
    <section className="ch-section mh-section" id="modules" aria-labelledby="home-modules-title">
      <div className="ch-container">
        <div className="ch-head">
          <span className="ch-eyebrow">{HOME.eyebrow}</span>
          <h2 id="home-modules-title" className="ch-h2">{HOME.title}</h2>
          <p className="ch-sub">{HOME.sub}</p>
        </div>
        <ul className="mh-grid mh-grid-5">
          {mods.map((m) => (
            <li key={m.id}>
              {/* The whole card still opens /modules/<id> (the name's link stretches over
                  it), so the store badges can sit inside the card as their own links. */}
              <div className="mh-card mh-card-stretch">
                <span className="md-icon"><ModuleIcon name={m.icon} /></span>
                <Link to={`/modules/${m.id}`} className="mh-name mh-stretch">{m.short}</Link>
                <span className="mh-formal">{m.title}</span>
                <span className="mh-line">{m.card}</span>
                {m.id === 'dental-clinic-management-software' && scribe && (
                  <span className="md-chip mh-chip">+ {scribe.short} add-on</span>
                )}
                {/* Owner 2026-10-09: self-serve modules start in the app. */}
                {isSelfServe(m.id) && <StartInApp moduleName={m.short} variant="compact" />}
                <span className="mh-go" aria-hidden="true">See what it does &rarr;</span>
              </div>
            </li>
          ))}
          <li className="mh-one-item">
            <Link to={`/modules/${one.id}`} className="mh-card mh-one">
              <span className="md-icon md-icon-light"><ModuleIcon name={one.icon} /></span>
              <span className="mh-badge">All modules, one system</span>
              <span className="mh-name">{one.short}</span>
              <span className="mh-formal">{one.title}</span>
              <span className="mh-line">{one.card}</span>
              <span className="mh-go" aria-hidden="true">See Aumy One &rarr;</span>
            </Link>
          </li>
        </ul>
        <p className="mh-foot">
          <Link to="/modules">Compare all the modules side by side</Link>
        </p>
      </div>
    </section>
  );
};

export default HomeModules;
