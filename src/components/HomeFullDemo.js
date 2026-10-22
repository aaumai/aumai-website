import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FULL_DEMO } from '../data/explainers';
import { withYouTubeJsApi } from '../utils/videoFocus';
import '../pages/DemosPage.css';

/**
 * Home: the full Aumy demo film (owner 2026-10-20: "put our demo on our marketing website where people can watch
 * it"). Click-to-play: the YouTube thumbnail shows first and the player loads only when tapped (no third-party JS
 * on page load). Words: src/data/explainers.js, shared with the home crawler HTML in scripts/prerender.js.
 */
const HomeFullDemo = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="ch-section" id="full-demo" aria-labelledby="home-full-demo-title">
      <div className="ch-container">
        <div className="dv-card dv-card-large">
          <div className="dv-frame">
            {playing ? (
              <iframe
                src={withYouTubeJsApi(`https://www.youtube.com/embed/${FULL_DEMO.youtubeId}?autoplay=1&rel=0`)}
                title={FULL_DEMO.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className="dv-thumb"
                style={{ backgroundImage: `url(https://i.ytimg.com/vi/${FULL_DEMO.youtubeId}/hqdefault.jpg)` }}
                onClick={() => setPlaying(true)}
                aria-label={`Play: ${FULL_DEMO.title}`}
              >
                <span className="dv-play">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5-11-6.5z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
          <div className="dv-body">
            <span className="dv-tag">{FULL_DEMO.tag}</span>
            <h2 id="home-full-demo-title" className="dv-title">{FULL_DEMO.title}</h2>
            <p className="dv-blurb">{FULL_DEMO.blurb}</p>
            <p className="dv-blurb"><Link to="/demos">More demo videos &rarr;</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFullDemo;
