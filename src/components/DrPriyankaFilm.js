import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DR_PRIYANKA_FILM as F } from '../data/homeOneProduct';
import { markVideoTouched } from '../utils/videoFocus';

/**
 * "Hear it from Dr Priyanka" (owner 2026-11-28): the section directly under the home hero.
 *
 * One upright (9:16) player with an English | हिंदी switch above it. English is the default; the choice lives
 * only in this component's state (nothing stored). Like the hero film, nothing but the poster loads with the page:
 * `preload="none"`, no autoplay, and the film starts only when the visitor taps Play (with sound: a tap is a user
 * gesture). Switching language swaps the poster and the source, back to the Play button; it never starts the
 * other film by itself. Words and files: src/data/homeOneProduct.js (DR_PRIYANKA_FILM), mirrored in
 * scripts/prerender.js.
 */
const DrPriyankaFilm = () => {
  const ref = useRef(null);
  const [langKey, setLangKey] = useState(F.versions[0].key);
  const [started, setStarted] = useState(false);
  const version = F.versions.find((v) => v.key === langKey) || F.versions[0];

  const pick = (key) => {
    if (key === langKey) return;
    const v = ref.current;
    if (v && !v.paused) v.pause();
    setStarted(false);
    setLangKey(key);
  };

  const start = () => {
    const v = ref.current;
    if (!v) return;
    markVideoTouched(v);
    setStarted(true);
    v.muted = false;
    v.play().catch(() => {
      // A browser that blocks sound even after a tap: play muted; the native controls offer sound.
      v.muted = true;
      v.play().catch(() => undefined);
    });
  };

  return (
    <section className="ch-section ch-tint op-film" id={F.id} aria-labelledby="op-film-title">
      <div className="ch-container op-film-grid">
        <div className="op-film-head">
          <span className="ch-eyebrow">{F.eyebrow}</span>
          <h2 id="op-film-title" className="ch-h2">{F.title}</h2>
        </div>

        <div className="op-film-media">
          <div className="op-film-switch" role="group" aria-label={F.switchLabel}>
            {F.versions.map((v) => (
              <button
                key={v.key}
                type="button"
                lang={v.lang}
                className={`op-film-lang${v.key === langKey ? ' is-on' : ''}`}
                aria-pressed={v.key === langKey}
                onClick={() => pick(v.key)}
              >
                {v.label}
              </button>
            ))}
          </div>
          <div className="op-film-stage">
            {/* key: a fresh <video> per language, so the old film is dropped and the new one stays unloaded. */}
            <video
              key={version.key}
              ref={ref}
              src={version.src}
              poster={version.poster}
              preload="none"
              playsInline
              controls={started}
              lang={version.lang}
              aria-label={`${F.title} (video, ${version.label})`}
            />
            {!started && (
              <button type="button" className="op-film-start" onClick={start} aria-label={`Play the video: ${F.title} (${version.label})`}>
                <span className="op-film-start-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span className="op-film-start-label">{F.playLabel}</span>
              </button>
            )}
          </div>
        </div>

        <div className="op-film-caption">
          <p className="op-film-who">{F.who}</p>
          <p className="op-film-line">{F.line}</p>
        </div>

        <div className="op-film-cta">
          <Link to={F.cta.to} className="ch-btn ch-btn-primary">{F.cta.label}</Link>
        </div>
      </div>
    </section>
  );
};

export default DrPriyankaFilm;
