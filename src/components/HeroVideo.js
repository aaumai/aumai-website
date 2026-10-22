import React, { useEffect, useRef, useState } from 'react';
import { HERO_VIDEO } from '../data/explainers';
import { markVideoTouched } from '../utils/videoFocus';

/**
 * Home hero video (owner 2026-10-20: "volume should be on by default and a mute button to turn it off").
 * Browsers only let a page start a video WITH sound when the visitor has interacted with the site before, so:
 *  1. it first tries to play with sound; where allowed, it plays with sound and shows "Mute";
 *  2. where the browser refuses, it plays muted at once, and the visitor's FIRST tap, click or key press
 *     anywhere on the page turns the sound on and restarts the film from the top (only while it is playing:
 *     a tap elsewhere never starts a paused film);
 *  3. one button on the video always switches between Mute and Sound on;
 *  4. a Pause / Play button (owner 2026-10-22). It also pauses by itself when scrolled away or the tab is
 *     hidden (src/utils/videoFocus.js) and, if the visitor never touched it, resumes muted when back on screen.
 * Words and files: src/data/explainers.js (HERO_VIDEO).
 */
const HeroVideo = () => {
  const ref = useRef(null);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    let cancelled = false;
    const gestures = ['pointerdown', 'keydown', 'touchstart'];
    const removeGestures = () => gestures.forEach((g) => document.removeEventListener(g, onFirstGesture, true));

    function onFirstGesture(e) {
      const el = ref.current;
      // Paused (scrolled away, or the visitor paused it): leave it alone and wait for a later tap.
      if (el && el.paused) return;
      removeGestures();
      // A tap on the film's own buttons is handled by that button (else the two would cancel out).
      if (e && e.target && typeof e.target.closest === 'function'
        && e.target.closest('.ch-hero-film-sound, .ch-hero-film-play')) return;
      if (!el || !el.muted) return;
      el.muted = false;
      el.currentTime = 0;
      el.play().then(() => setMuted(false)).catch(() => { el.muted = true; setMuted(true); });
    }

    v.muted = false;
    v.play()
      .then(() => { if (!cancelled) setMuted(false); })
      .catch(() => {
        if (cancelled) return;
        v.muted = true;
        setMuted(true);
        v.play().catch(() => undefined);
        gestures.forEach((g) => document.addEventListener(g, onFirstGesture, true));
      });
    return () => { cancelled = true; removeGestures(); };
  }, []);

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
    markVideoTouched(v);
    if (v.paused) v.play().catch(() => undefined);
    else v.pause();
  };

  return (
    <figure className={`ch-hero-film${HERO_VIDEO.vertical ? ' ch-hero-film--vertical' : ''}`}>
      <div className="ch-hero-film-stage">
        <video
          ref={ref}
          autoPlay
          loop
          playsInline
          preload="auto"
          poster={HERO_VIDEO.poster}
          aria-label={`${HERO_VIDEO.name} on Aumy (video)`}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
        >
          <source src={HERO_VIDEO.src} type="video/mp4" />
        </video>
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
      </div>
      <figcaption className="ch-hero-film-caption">{HERO_VIDEO.name} · {HERO_VIDEO.line}</figcaption>
    </figure>
  );
};

export default HeroVideo;
