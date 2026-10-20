import React, { useEffect, useRef, useState } from 'react';
import { HERO_VIDEO } from '../data/explainers';

/**
 * Home hero video (owner 2026-10-20: "volume should be on by default and a mute button to turn it off").
 * Browsers only let a page start a video WITH sound when the visitor has interacted with the site before, so:
 *  1. it first tries to play with sound; where allowed, it plays with sound and shows "Mute";
 *  2. where the browser refuses, it plays muted at once, and the visitor's FIRST tap, click or key press
 *     anywhere on the page turns the sound on and restarts the film from the top;
 *  3. one button on the video always switches between Mute and Sound on.
 * Words and files: src/data/explainers.js (HERO_VIDEO).
 */
const HeroVideo = () => {
  const ref = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    let cancelled = false;
    const gestures = ['pointerdown', 'keydown', 'touchstart'];
    const removeGestures = () => gestures.forEach((g) => document.removeEventListener(g, onFirstGesture, true));

    function onFirstGesture(e) {
      removeGestures();
      // A tap on the Mute / Sound on button itself is handled by that button (else the two would cancel out).
      if (e && e.target && typeof e.target.closest === 'function' && e.target.closest('.ch-hero-film-sound')) return;
      const el = ref.current;
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
      v.muted = false;
      if (v.paused) v.play().catch(() => undefined);
      setMuted(false);
    } else {
      v.muted = true;
      setMuted(true);
    }
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
        >
          <source src={HERO_VIDEO.src} type="video/mp4" />
        </video>
        <button type="button" className="ch-hero-film-sound" onClick={toggle} aria-pressed={!muted}>
          <span aria-hidden="true">{muted ? '🔊' : '🔇'}</span> {muted ? 'Sound on' : 'Mute'}
        </button>
      </div>
      <figcaption className="ch-hero-film-caption">{HERO_VIDEO.name} · {HERO_VIDEO.line}</figcaption>
    </figure>
  );
};

export default HeroVideo;
