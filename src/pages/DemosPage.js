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
  // Revenue + patient-journey demos only (owner directive 2026-08-23): the
  // clinical clips (documentation, smile simulation, charting) are deliberately
  // NOT here — we are known for revenue recovery and the patient journey.
  // The hero demo leads everywhere (site, deck, AI employee).
  {
    id: '-qw1sp7Ub4k',
    tag: 'The patient journey',
    title: 'One patient, five stages, zero typing.',
    blurb:
      'Live and unedited on a real clinic’s WhatsApp number: a lead who says “let me think about it”, day-one aftercare, the recall, an eight-month-dormant patient won back with a ₹999 package, and the review ask that listens first. Convert → Care → Retain → Reactivate → Grow.',
    featured: true,
  },
  {
    id: 'ggKaTSgI1RY',
    tag: 'Reactivate',
    title: 'Tell Aumy what you want. It builds and runs the campaign.',
    blurb:
      '“Bring back patients who haven’t visited in 6–12 months for cleaning, X-ray and consultation.” Audience, messages, AI calls, follow-ups and tracking — generated and executed from one sentence.',
  },
  {
    id: 'Jna2UXPxBmI',
    tag: 'Quick tour',
    title: 'A patient in pain messages at night. Nobody is at the clinic.',
    blurb:
      'Verified, rescheduled and confirmed before anyone opens the door — plus quoting prices, catching a hesitating patient, following up days later and bringing back an overdue one.',
  },
  {
    id: '3YNUFjUPRwk',
    tag: 'Full demo',
    title: 'A real clinic’s WhatsApp number. One unedited take.',
    blurb:
      'No edits, no staged messages, no slides — the whole patient journey on a live number, from first enquiry to the revenue showing up in the clinic dashboard, tied to the exact ad it came from.',
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

  return (
    <div className="ch-home dv-page">
      <section className="dv-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">See it, don’t take our word for it</span>
          <h1 className="dv-hero-title">
            Watch Aumy run a clinic — <span className="dv-accent">live, unscripted</span>
          </h1>
          <p style={{ margin: '14px auto 0', maxWidth: 640, fontWeight: 600 }}>
            Prefer to feel it instead of watching? WhatsApp our live demo clinic on{' '}
            <a href="https://wa.me/919022312554?text=Hi%2C%20I%20wanted%20to%20ask%20about%20implants">+91 90223 12554</a>{' '}
            as if you were a patient — ask about any treatment, book (or don&rsquo;t), and experience every follow-up your patients would.
          </p>
          <p className="ch-lead ch-center-lead">
            Real screens, real WhatsApp messages, real bookings. A growing set of short videos that shows
            exactly what your clinic gets — from the first patient enquiry to the campaign
            that brings sleeping patients back.
          </p>
        </div>
      </section>

      <section className="dv-list-section">
        <div className="ch-container">
          {/* 3-across grid: every demo video, CTA card fills the last cell. */}
          <div className="dv-grid">
            {VIDEOS.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
            <div className="dv-cta dv-cta-cell">
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
        </div>
      </section>
    </div>
  );
};

export default DemosPage;
