import React, { useEffect, useState } from 'react';

/**
 * "Aumy runs the loop" — the hero animation (owner 2026-09-26: "the video
 * doesn't suit our product … a rich animation in the same fonts, design and
 * colours our website uses, this loop showing Get Found, Convert, Care,
 * Retain"). After the Priya ad's scene 9, rebuilt as live HTML/SVG so it is
 * crisp on every screen, weighs a few KB, and its words are real text.
 *
 * Five jobs around one ring with the Aumy mark at the centre. Each lights in
 * turn with its one-line promise while a gold light travels the ring; after
 * the fifth, the whole ring glows on the close line, then it runs again.
 * Reduced motion: the ring is shown complete and still.
 */
const STEPS = [
  { key: 'found', label: 'Get Found', line: 'Your Google profile, reviews and ads working, so patients find you first.', icon: 'M11 4a7 7 0 1 0 4.9 12l4.6 4.6 1.4-1.4-4.6-4.6A7 7 0 0 0 11 4zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10z' },
  { key: 'convert', label: 'Convert', line: 'Every call and WhatsApp answered in seconds. Booked, not lost.', icon: 'M4 4h16v11H8l-4 4V4zm2 2v8.2L7.2 13H18V6H6z' },
  { key: 'care', label: 'Care', line: 'Registration, consent and after-care handled. Patients feel looked after.', icon: 'M12 21l-1.4-1.3C5.4 15 2 12 2 8.4 2 5.4 4.4 3 7.4 3c1.7 0 3.4.8 4.6 2.1C13.2 3.8 14.9 3 16.6 3 19.6 3 22 5.4 22 8.4c0 3.6-3.4 6.6-8.6 11.3L12 21z' },
  { key: 'retain', label: 'Retain', line: 'Check-ups and care gaps followed up on time, automatically.', icon: 'M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11zm-8.5-2.5L7 14l1.4-1.4 2.1 2.1 5.1-5.1L17 11l-6.5 6.5z' },
  { key: 'reactivate', label: 'Reactivate', line: 'Patients who drifted away, personally invited back.', icon: 'M12 5V2L8 6l4 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z' },
];
const CLOSE = { title: 'No patient slips through the cracks.', line: 'One system runs the whole patient journey, every day.' };

const STEP_MS = 2600;
const R = 38; // ring radius, % of the box
const pos = (i) => {
  const a = (-90 + i * (360 / STEPS.length)) * (Math.PI / 180);
  return { left: `${50 + R * Math.cos(a)}%`, top: `${50 + R * Math.sin(a)}%` };
};

export default function AumyLoop() {
  // 0..4 = a step is live; 5 = the close (whole ring lit).
  // `tick` only ever counts up, so the light keeps travelling forward lap after lap.
  const [tick, setTick] = useState(0);
  const [still, setStill] = useState(false);
  // WCAG 2.2.2: anything that moves for more than 5 s can be paused.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStill(true); setTick(STEPS.length); return undefined; }
    if (paused) return undefined;
    const t = setInterval(() => setTick((n) => n + 1), STEP_MS);
    return () => clearInterval(t);
  }, [paused]);
  const i = tick % (STEPS.length + 1);
  const lap = Math.floor(tick / (STEPS.length + 1));
  const closing = i === STEPS.length;
  // The travelling light: its head sits on the live step; the lit arc behind it
  // resets (without animating) at the start of each lap.
  const within = closing ? 360 : i * (360 / STEPS.length);
  const angle = lap * 360 + within;
  const caption = closing ? CLOSE : { title: STEPS[i].label, line: STEPS[i].line };

  return (
    <div className={`lux-loop ${closing ? 'is-closing' : ''} ${still ? 'is-still' : ''}`} role="img"
      aria-label={`Manage your clinic seamlessly with Aumy: ${STEPS.map((s) => s.label).join(', ')}. ${CLOSE.title}`}>
      <p className="lux-loop-kicker" aria-hidden="true">Manage your clinic <em>seamlessly</em></p>
      <div className="lux-loop-stage" aria-hidden="true">
        <svg className="lux-loop-svg" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="luxArc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#dcc594" stopOpacity="0" />
              <stop offset="100%" stopColor="#dcc594" stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r={R} className="lux-loop-ring" />
          <circle cx="50" cy="50" r={R} className="lux-loop-ring-lit" style={{ strokeDashoffset: `${2 * Math.PI * R * (1 - within / 360)}`, transition: i === 0 ? 'none' : undefined }} />
          <g className="lux-loop-comet" style={{ transform: `rotate(${angle}deg)` }}>
            <circle cx="50" cy={50 - R} r="1.25" />
          </g>
        </svg>
        <div className="lux-loop-core">
          <img src="/aumy-mark-256.png" alt="" width="64" height="64" />
        </div>
        {STEPS.map((s, n) => (
          <div key={s.key} style={pos(n)}
            className={`lux-loop-node ${n === i ? 'is-live' : ''} ${closing || n < i ? 'is-done' : ''}`}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d={s.icon} /></svg>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      {!still && (
        <button type="button" className="lux-loop-pause" onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play the animation' : 'Pause the animation'} aria-pressed={paused}>
          {paused
            ? <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            : <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z" /></svg>}
        </button>
      )}
      <div className="lux-loop-caption" aria-hidden="true" key={caption.title}>
        <p className="lux-loop-caption-title">{caption.title}</p>
        <p className="lux-loop-caption-line">{caption.line}</p>
      </div>
    </div>
  );
}
