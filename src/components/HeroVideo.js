import React, { useRef, useState } from 'react';
import { HERO_VIDEO } from '../data/explainers';
import { markVideoTouched } from '../utils/videoFocus';

/**
 * Home hero video.
 *
 * 13 Nov 2026 (owner, SEO pass): the 3.3 MB film no longer loads with the page. Mobile Lighthouse showed it as the
 * biggest download on the home page (LCP 11.5 s). Now:
 *  1. only the poster image loads (`preload="none"`, no autoplay);
 *  2. a large Play button on the poster starts the film WITH sound. A tap is a user gesture, so every browser
 *     allows sound (this keeps the owner's 2026-10-20 wish, "volume should be on by default");
 *  3. once playing: Pause / Play and Mute / Sound on, as before. It still pauses by itself when scrolled away or
 *     when the tab is hidden (src/utils/videoFocus.js), and never restarts by itself after that.
 * Words and files: src/data/explainers.js (HERO_VIDEO).
 */
const HeroVideo = () => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(true);

  const start = (e) => {
    if (e) e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    markVideoTouched(v);
    setStarted(true);
    v.muted = false;
    v.play()
      .then(() => setMuted(false))
      .catch(() => {
        // Very rare (e.g. a browser that blocks sound even after a tap): play muted and offer "Sound on".
        v.muted = true;
        setMuted(true);
        v.play().catch(() => undefined);
      });
  };

  const toggle = (e) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    if (v.muted) {
      markVideoTouched(v);
      v.muted = false;
      if (v.paused) v.play().catch(() => undefined);
      setMuted(false);
    } else {
      v.muted = true;
      setMuted(true);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    if (!started) { start(); return; }
    markVideoTouched(v);
    if (v.paused) v.play().catch(() => undefined);
    else v.pause();
  };

  return (
    <figure id={HERO_VIDEO.anchorId} className={`ch-hero-film${HERO_VIDEO.vertical ? ' ch-hero-film--vertical' : ''}`}>
      <div className="ch-hero-film-stage">
        <video
          ref={ref}
          loop
          playsInline
          preload="none"
          poster={HERO_VIDEO.poster}
          aria-label={`${HERO_VIDEO.name} on Aumy (video)`}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
        >
          <source src={HERO_VIDEO.src} type="video/mp4" />
        </video>
        {!started && (
          <button type="button" className="ch-hero-film-start" onClick={start} aria-label={`Play the video: ${HERO_VIDEO.name} on Aumy`}>
            <span className="ch-hero-film-start-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="ch-hero-film-start-label">Watch their story</span>
          </button>
        )}
        {started && (
          <>
            <button type="button" className="ch-hero-film-play" onClick={togglePlay} aria-label={paused ? 'Play video' : 'Pause video'}>
              {paused ? (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
              )}
              <span aria-hidden="true">{paused ? 'Play' : 'Pause'}</span>
            </button>
            <button type="button" className="ch-hero-film-sound" onClick={toggle} aria-pressed={!muted}>
              <span aria-hidden="true">{muted ? '🔊' : '🔇'}</span> {muted ? 'Sound on' : 'Mute'}
            </button>
          </>
        )}
      </div>
      <figcaption className="ch-hero-film-caption">{HERO_VIDEO.name} · {HERO_VIDEO.line}</figcaption>
    </figure>
  );
};

export default HeroVideo;
