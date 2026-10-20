import React, { useRef, useState } from 'react';
import { HERO_VIDEO } from '../data/explainers';

/**
 * Home hero video (owner 2026-10-20: "plays automatically when anybody visits").
 * Browsers only allow autoplay when the video is muted, so it starts muted and loops (the captions carry
 * the message), with one obvious "Tap for sound" button that turns the sound on and restarts from the top.
 * Words and files: src/data/explainers.js (HERO_VIDEO).
 */
const HeroVideo = () => {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);

  const soundOn = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.loop = false;
    v.currentTime = 0;
    v.play().catch(() => undefined);
    setMuted(false);
  };

  return (
    <figure className={`ch-hero-film${HERO_VIDEO.vertical ? ' ch-hero-film--vertical' : ''}`}>
      <div className="ch-hero-film-stage">
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={!muted}
          poster={HERO_VIDEO.poster}
          aria-label={`${HERO_VIDEO.name} on Aumy (video)`}
        >
          <source src={HERO_VIDEO.src} type="video/mp4" />
        </video>
        {muted && (
          <button type="button" className="ch-hero-film-sound" onClick={soundOn}>
            <span aria-hidden="true">🔊</span> Tap for sound
          </button>
        )}
      </div>
      <figcaption className="ch-hero-film-caption">{HERO_VIDEO.name} · {HERO_VIDEO.line}</figcaption>
    </figure>
  );
};

export default HeroVideo;
