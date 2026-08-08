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

/**
 * The video that plays FIRST — the full unedited walkthrough. Playback then
 * continues into the rest of the playlist.
 *
 * Featuring one video rather than opening on whatever the playlist happens to
 * order first: a visitor who presses play should land on the flagship demo, not
 * on whichever clip was uploaded most recently. Clear this to open the playlist
 * from the top instead.
 *
 * WHEN CHANGING THIS, change scripts/prerender.js too — the VideoObject schema
 * there carries the same id, and the two drifting apart hands Google structured
 * data for a video the page doesn't play. A stale id also fails SILENTLY: the
 * facade is our own poster image, so the section looks healthy right up until a
 * visitor clicks and gets YouTube's "Video unavailable". That is exactly how the
 * first upload's removal went unnoticed on both live sites.
 */
export const FEATURED_VIDEO_ID = '3YNUFjUPRwk';

const DemoPlaylist = ({
  title = 'Watch AUMY run a clinic for 40 minutes.',
  lead = 'The full walkthrough, unedited — answering a patient at night, verifying who they are, moving an appointment, chasing a treatment that stalled. A real clinic’s number, in real time.',
  eyebrow = 'Watch it work',
  posterSrc = '/images/hero-dental.jpg',
}) => {
  const [playing, setPlaying] = useState(false);

  if (!PLAYLIST_ID) return null;

  // Featured video plays first and then runs on into the playlist; without one,
  // open the playlist from the top.
  const embedSrc = FEATURED_VIDEO_ID
    ? `https://www.youtube-nocookie.com/embed/${FEATURED_VIDEO_ID}?list=${PLAYLIST_ID}&autoplay=1&rel=0&modestbranding=1`
    : `https://www.youtube-nocookie.com/embed/videoseries?list=${PLAYLIST_ID}&autoplay=1&rel=0&modestbranding=1`;
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

        {/* A recognisable YouTube button rather than a sentence of fine print:
            this is a destination people opt into, and the platform's own
            visual language is what makes it read as one at a glance. */}
        <a
          className="dp-yt-btn"
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="dp-yt-icon" viewBox="0 0 28 20" aria-hidden="true">
            <path
              className="dp-yt-icon-bg"
              d="M27.4 3.1c-.3-1.2-1.3-2.1-2.4-2.4C22.9 0 14 0 14 0S5.1 0 3 .6C1.8 1 .9 1.9.6 3.1.1 5.3.1 10 .1 10s0 4.7.5 6.9c.3 1.2 1.3 2.1 2.4 2.4 2.1.6 11 .6 11 .6s8.9 0 11-.6c1.2-.3 2.1-1.2 2.4-2.4.5-2.2.5-6.9.5-6.9s0-4.7-.5-6.9z"
            />
            <path className="dp-yt-icon-arrow" d="M11.2 14.3 18.6 10l-7.4-4.3z" />
          </svg>
          Watch full playlist on YouTube
        </a>
      </div>
    </section>
  );
};

export default DemoPlaylist;
