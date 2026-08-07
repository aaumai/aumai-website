import React, { useState } from 'react';
import './DemoPlaylist.css';

/**
 * The AUMY demo playlist, embedded as a click-to-load facade.
 *
 * WHY NOT A PLAIN <iframe>
 * ------------------------
 * A YouTube iframe loads ~1MB of scripts and several third-party requests
 * BEFORE the visitor has decided to watch anything. On a marketing home page
 * that lands on Largest Contentful Paint and Interaction to Next Paint — both
 * Core Web Vitals, both ranking signals. Embedding eagerly would work directly
 * against the SEO this page depends on.
 *
 * So we render only the poster until the visitor clicks. Nothing from YouTube
 * is requested until then, and after the click they get the real player with
 * the full playlist and autoplay.
 *
 * `youtube-nocookie.com` is the privacy-enhanced host: no tracking cookie is
 * set unless playback starts — which also keeps the cookie banner honest.
 *
 * TO POINT THIS AT A DIFFERENT PLAYLIST: change PLAYLIST_ID only. It is the
 * `list=` parameter of the playlist URL, e.g.
 *   https://www.youtube.com/playlist?list=PLxxxxxxxxxxxxxxxx
 *                                          ^^^^^^^^^^^^^^^^^ this part
 * Leave it empty and the whole section renders nothing — so an unconfigured
 * build never shows a broken player.
 */
export const PLAYLIST_ID = 'PLZ8QbQSGNg1A';

const DemoPlaylist = ({
  title = 'See AUMY actually doing it.',
  lead = 'Short, unedited demos — the AI answering, booking, rescheduling and following up. No slides.',
  eyebrow = 'Watch it work',
  posterSrc = '/images/hero-dental.jpg',
}) => {
  const [playing, setPlaying] = useState(false);

  if (!PLAYLIST_ID) return null;

  const embedSrc =
    `https://www.youtube-nocookie.com/embed/videoseries?list=${PLAYLIST_ID}` +
    `&autoplay=1&rel=0&modestbranding=1`;
  const playlistUrl = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;

  return (
    <section className="ch-section dp-section" id="demos">
      <div className="ch-container ch-narrow ch-center">
        <span className="ch-eyebrow">{eyebrow}</span>
        <h2 className="ch-h2">{title}</h2>
        <p className="ch-lead ch-center-lead">{lead}</p>

        <div className="dp-frame">
          {playing ? (
            <iframe
              className="dp-player"
              src={embedSrc}
              title="AUMY product demos"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="dp-facade"
              onClick={() => setPlaying(true)}
              aria-label="Play the AUMY demo playlist"
              style={{ backgroundImage: `url(${posterSrc})` }}
            >
              <span className="dp-play" aria-hidden="true">
                <svg viewBox="0 0 68 48" width="68" height="48">
                  <path
                    className="dp-play-bg"
                    d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8 0 34 0 34 0S12.2 0 6.9 1.4C4 2.2 2.3 4.8 1.5 7.7 0 13 0 24 0 24s0 11 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 48 34 48 34 48s21.8 0 27.1-1.4c2.9-.8 4.6-3.3 5.4-6.2C68 35 68 24 68 24s0-11-1.5-16.3z"
                  />
                  <path className="dp-play-arrow" d="M45 24 27 14v20" />
                </svg>
              </span>
              <span className="dp-facade-label">Play the demo playlist</span>
            </button>
          )}
        </div>

        <p className="ch-fineprint dp-fine">
          Prefer YouTube?{' '}
          <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
            Open the full playlist
          </a>
          . Nothing loads from YouTube until you press play.
        </p>
      </div>
    </section>
  );
};

export default DemoPlaylist;
