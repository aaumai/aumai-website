import React from 'react';
import { Link } from 'react-router-dom';
import { TITLE, SUB, VIDEOS } from '../data/explainers';

/**
 * Home: one explainer video per module (owner 2026-10-12). Words: src/data/explainers.js,
 * shared with the home crawler HTML in scripts/prerender.js. Videos load only when played.
 */
const HomeExplainers = () => (
  <section className="ch-section" id="explainers" aria-labelledby="home-explainers-title">
    <div className="ch-container">
      <div className="ch-head">
        <span className="ch-eyebrow">Watch</span>
        <h2 id="home-explainers-title" className="ch-h2">{TITLE}</h2>
        <p className="ch-sub">{SUB}</p>
      </div>
      <div className="ch-explainers">
        {VIDEOS.map((v) => (
          <figure key={v.moduleId} className="ch-explainer">
            <video controls preload="none" playsInline poster={v.poster} aria-label={`${v.name} explainer video`}>
              <source src={v.src} type="video/mp4" />
            </video>
            <figcaption>
              <strong>{v.name}</strong>
              <span>{v.line}</span>
              <Link to={`/modules/${v.moduleId}`}>See what {v.name} does &rarr;</Link>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default HomeExplainers;
