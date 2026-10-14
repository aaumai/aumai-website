import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { HUB_PATH, SERIES, EPISODES, episodePath, liveEpisodes } from '../data/runYourClinic';
import './HomeClinic.css';
import './GrowthHub.css';
import './RunYourClinic.css';

/**
 * /run-your-clinic — hub of the "How to Run Your Clinic" video series (owner 2026-10-13).
 * Words: src/data/runYourClinic.js, shared with the crawler HTML in scripts/prerender.js.
 * Episodes that are not out yet show as "Coming next" and are never links.
 */
const RunYourClinicHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: SERIES.seoTitle,
      description: SERIES.seoDescription,
      canonical: `https://aumai.co.in${HUB_PATH}`,
      image: `https://aumai.co.in${liveEpisodes()[0].poster}`,
    });
  }, []);

  return (
    <div className="ch-home gh-page">
      <section className="gh-hero">
        <div className="ch-container ch-narrow">
          <nav aria-label="Breadcrumb" className="mp-crumbs">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li aria-current="page">{SERIES.name}</li>
            </ol>
          </nav>
          <span className="ch-eyebrow">{SERIES.eyebrow}</span>
          <h1 className="gh-hero-title">{SERIES.h1}</h1>
          <p className="ch-lead">{SERIES.intro}</p>
        </div>
      </section>

      <section className="gh-list-section">
        <div className="ch-container ch-narrow">
          <ol className="ryc-episodes">
            {EPISODES.map((ep) => (
              <li key={ep.part}>
                {ep.live ? (
                  <Link to={episodePath(ep)} className="ryc-ep">
                    <img className="ryc-ep-thumb" src={ep.poster} alt="" width="1280" height="720" loading="lazy" />
                    <span className="ryc-ep-body">
                      <span className="gh-card-category">Part {ep.part} · {ep.durationLabel}</span>
                      <span className="ryc-ep-title">{ep.title}</span>
                      <span className="ryc-ep-text">{ep.card}</span>
                      <span className="ryc-ep-cta">Watch Part {ep.part} &rarr;</span>
                    </span>
                  </Link>
                ) : (
                  <div className="ryc-ep ryc-ep-soon">
                    <span className="ryc-ep-body">
                      <span className="ryc-soon-tag">Part {ep.part} · Coming next</span>
                      <span className="ryc-ep-title">{ep.title}</span>
                      <span className="ryc-ep-text">{ep.card}</span>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default RunYourClinicHub;
