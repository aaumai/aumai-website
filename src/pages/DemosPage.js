import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DemosPage.css';

/**
 * Watch Aumy in action — the demo video library.
 *
 * Click-to-play: each card shows the YouTube thumbnail (fast, no third-party
 * JS on load) and swaps in the iframe only when tapped. The full unedited
 * demo leads; feature clips follow in a grid. Every card funnels to the same
 * Leak Audit CTA the rest of the site uses.
 */

const VIDEOS = [
  {
    id: '3YNUFjUPRwk',
    tag: 'Full demo',
    title: 'The complete platform — one unedited take',
    blurb:
      'Enquiry answered and booked by AI, a visit documented by voice — chart, prescription and all — and a re-engagement campaign built in one sentence. No cuts, because the product doesn’t need them.',
    featured: true,
  },
  {
    id: 'Jna2UXPxBmI',
    tag: 'Quick tour',
    title: 'The 3-minute version',
    blurb: 'What a clinic day looks like when the busywork runs itself.',
  },
  {
    id: 'oPEfQT9iDww',
    tag: 'AI documentation',
    title: 'The dentist talks. Aumy documents.',
    blurb:
      'One dictation becomes the SOAP note, diagnosis, prescription, tooth-marked dental chart and the follow-up visit — reviewed and signed by the doctor.',
  },
  {
    id: 'ggKaTSgI1RY',
    tag: 'Campaigns',
    title: 'A patient campaign, built in one sentence',
    blurb:
      '“Bring back patients who haven’t visited in 6 months with a ₹499 package.” Audience, message and schedule — generated, approved, sent.',
  },
  {
    id: '7nAyyKgOtKg',
    tag: 'Smile simulation',
    title: 'Show the new smile before the treatment',
    blurb:
      'An AI before/after of the patient’s own smile, right in the consultation — watch case acceptance change.',
  },
];

function VideoCard({ video, large }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  return (
    <div className={`dv-card ${large ? 'dv-card-large' : ''}`}>
      <div className="dv-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="dv-thumb"
            style={{ backgroundImage: `url(${thumb})` }}
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${video.title}`}
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
        <span className="dv-tag">{video.tag}</span>
        <h2 className="dv-title">{video.title}</h2>
        <p className="dv-blurb">{video.blurb}</p>
      </div>
    </div>
  );
}

const DemosPage = () => {
  useEffect(() => {
    document.title = 'Watch Aumy in Action — Demo Videos | AUMY by AUM AI';
  }, []);

  const featured = VIDEOS.find((v) => v.featured);
  const rest = VIDEOS.filter((v) => !v.featured);

  return (
    <div className="ch-home dv-page">
      <section className="dv-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">See it, don’t take our word for it</span>
          <h1 className="dv-hero-title">
            Watch Aumy run a clinic — <span className="dv-accent">live, unscripted</span>
          </h1>
          <p className="ch-lead ch-center-lead">
            Real screens, real WhatsApp messages, real bookings. Five short videos that show
            exactly what your clinic gets — from the first patient enquiry to the campaign
            that brings sleeping patients back.
          </p>
        </div>
      </section>

      <section className="dv-list-section">
        <div className="ch-container">
          {featured && <VideoCard video={featured} large />}
          <div className="dv-grid">
            {rest.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>

          <div className="dv-cta">
            <h2 className="dv-cta-title">Want this running in your clinic?</h2>
            <p className="dv-cta-sub">
              Start with the free Revenue Leak Audit — we’ll show you exactly how much your
              clinic loses to missed calls, no-shows and silent patients, before you spend a rupee.
            </p>
            <div className="dv-cta-row">
              <Link to="/growth-audit" className="dv-btn dv-btn-primary">Get my free Leak Audit</Link>
              <Link to="/contact" className="dv-btn dv-btn-ghost">Book a live demo</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemosPage;
