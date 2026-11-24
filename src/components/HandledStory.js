import React, { useEffect, useRef, useState } from 'react';
import './HandledStory.css';

/**
 * "Your clinic, handled." told as a scroll story (owner 2026-11-24): the clinic at the centre, and the four stages
 * lighting up in order as the visitor scrolls: 1 Aumy sets up the systems (inner ring), 2 get found (middle ring),
 * 3 fill the chairs (outer ring, enquiries flowing in), 4 the story so far (a second clinic appears).
 *
 * Every word comes from src/data/homeOneProduct.js (HANDLED); scripts/prerender.js writes the same words for
 * crawlers. The drawing is decoration only (aria-hidden): the stages are real headings and lists.
 *
 * Restraint on purpose: opacity, transforms and SVG strokes only, so nothing moves the layout. One
 * IntersectionObserver, no scroll handler. Reduced motion (or no IntersectionObserver): every stage is shown,
 * still. Without JavaScript the content is simply visible (the dim state needs the `hs-anim` class).
 */

const RINGS = [82, 124, 166];
const RING_LABELS = ['Aumy', 'Found', 'Chairs'];
const rad = (deg) => (deg * Math.PI) / 180;
const at = (r, deg) => ({ x: Math.round(r * Math.cos(rad(deg)) * 10) / 10, y: Math.round(r * Math.sin(rad(deg)) * 10) / 10 });

// 24-unit icon paths for the outer two rings (the inner ring reuses the home page's own four icons).
const FOUND_ICONS = [
  // search
  <path key="s" d="M11 4a7 7 0 104.9 12l4.6 4.6 1.4-1.4-4.6-4.6A7 7 0 0011 4zm0 2a5 5 0 110 10 5 5 0 010-10z" fill="currentColor" />,
  // map pin
  <path key="p" d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.6a2.6 2.6 0 110-5.2 2.6 2.6 0 010 5.2z" fill="currentColor" />,
  // review star
  <path key="r" d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" fill="currentColor" />,
];
const CHAIRS_ICONS = [
  // ads (megaphone)
  <path key="a" d="M3 10v4h3l6 4.5V5.5L6 10H3zm13 2a4 4 0 00-2-3.5v7a4 4 0 002-3.5zm-2-8v2.1a6.5 6.5 0 010 11.8V20a8.5 8.5 0 000-16z" fill="currentColor" />,
  // booked (calendar tick)
  <path key="b" d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V9h14v11zm-8.5-2.5L7 14l1.4-1.4 2.1 2.1 5.1-5.1L17 11l-6.5 6.5z" fill="currentColor" />,
];
const TOOTH = 'M7.5 3C5 3 3.5 5 3.5 7.6c0 2 .8 3.4 1.3 5 .6 2 .8 4.3 1.4 6.3.3 1 .8 2.1 1.8 2.1 1.4 0 1.6-2.2 1.9-3.6.3-1.3.7-2.6 2.1-2.6s1.8 1.3 2.1 2.6c.3 1.4.5 3.6 1.9 3.6 1 0 1.5-1.1 1.8-2.1.6-2 .8-4.3 1.4-6.3.5-1.6 1.3-3 1.3-5C20.5 5 19 3 16.5 3c-1.9 0-2.9 1-4.5 1S9.4 3 7.5 3z';

const NODE_ANGLES = [[-150, -30, 30, 150], [-12, 96, 204], [-128, 52]];
const FLOW_ANGLES = [14, 74, 126, 190, 236, 318];
const SECOND = at(208, -45);

function Node({ x, y, icon, size = 13 }) {
  return (
    <g className="hs-node" transform={`translate(${x} ${y})`}>
      <circle r={size} />
      <g transform={`translate(${-size * 0.62} ${-size * 0.62}) scale(${(size * 1.24) / 24})`}>{icon}</g>
    </g>
  );
}

function Diagram({ icons }) {
  const inner = ['whatsapp', 'voice', 'followups', 'paperless'].map((k) => icons[k]);
  const nodeIcons = [inner, FOUND_ICONS, CHAIRS_ICONS];
  return (
    <svg className="hs-svg" viewBox="-200 -200 400 400" aria-hidden="true" focusable="false">
      {/* guides: the whole shape is there from the start, faintly */}
      {RINGS.map((r) => <circle key={`g${r}`} className="hs-guide" r={r} />)}
      {/* stage 3: enquiries flowing in towards the clinic */}
      <g className="hs-flow">
        {FLOW_ANGLES.map((a, i) => (
          <g key={a} transform={`rotate(${a})`}>
            <circle className="hs-dot" r="3" style={{ animationDelay: `${i * 0.28}s` }} />
          </g>
        ))}
      </g>
      {/* stage 4: the second clinic */}
      <g className="hs-second">
        <line className="hs-link" x1={at(50, -45).x} y1={at(50, -45).y} x2={SECOND.x + 17} y2={SECOND.y - 17} pathLength="1" />
        <g transform={`translate(${SECOND.x} ${SECOND.y})`}>
          <circle className="hs-second-disc" r="24" />
          <g transform="translate(-11 -11) scale(0.92)"><path d={TOOTH} fill="currentColor" /></g>
        </g>
      </g>
      {RINGS.map((r, k) => (
        <g key={r} className={`hs-ring-g hs-ring-${k}`}>
          <circle className="hs-ring" r={r} pathLength="1" transform="rotate(-90)" />
          {NODE_ANGLES[k].map((a, j) => {
            const p = at(r, a);
            return <Node key={a} x={p.x} y={p.y} icon={nodeIcons[k][j]} />;
          })}
          <text className="hs-ring-label" x="0" y={-r + 4} textAnchor="middle">{RING_LABELS[k]}</text>
        </g>
      ))}
      {/* the clinic, at the centre */}
      <g className="hs-clinic">
        <circle className="hs-halo" r="58" />
        <circle className="hs-clinic-disc" r="46" />
        <g transform="translate(-17 -21) scale(1.42)"><path d={TOOTH} fill="currentColor" /></g>
        <text className="hs-clinic-label" x="0" y="66" textAnchor="middle">Your clinic</text>
      </g>
    </svg>
  );
}

export default function HandledStory({ data, Check, icons }) {
  const rootRef = useRef(null);
  const [reached, setReached] = useState(-1);
  const [anim, setAnim] = useState(false);
  const n = data.stages.length;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    // The drawing sticks just under the fixed header (its height changes: the closeable notice bar, phone vs laptop).
    // Wide screens: centred in the space below the header. Phones: a slim strip right under it.
    const header = document.querySelector('header.header');
    const visual = root.querySelector('.hs-visual');
    const setTop = () => {
      const h = header ? header.getBoundingClientRect().bottom : 0;
      const phone = window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
      const top = phone ? h : h + Math.max(16, (window.innerHeight - h - visual.offsetHeight) / 2);
      root.style.setProperty('--hs-top', `${Math.round(top)}px`);
    };
    setTop();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(setTop) : null;
    if (ro) { if (header) ro.observe(header); ro.observe(visual); }
    window.addEventListener('resize', setTop);
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') { setReached(n - 1); return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', setTop); }; }
    setAnim(true);
    const stages = Array.from(root.querySelectorAll('.hs-stage'));
    let raf = 0;
    // A stage is "reached" once its top passes 62% of the window height; scrolling back up un-reaches it.
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.62;
      let k = -1;
      stages.forEach((el, i) => { if (el.getBoundingClientRect().top < line) k = i; });
      setReached(k);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver(schedule, { rootMargin: '0px 0px -38% 0px', threshold: [0, 0.5, 1] });
    stages.forEach((el) => io.observe(el));
    update();
    return () => { io.disconnect(); if (ro) ro.disconnect(); window.removeEventListener('resize', setTop); if (raf) cancelAnimationFrame(raf); };
  }, [n]);

  const caption = reached < 0
    ? 'Your clinic'
    : reached < n - 1 ? `${reached + 1} · ${data.stages[reached].label}` : data.stages[reached].kicker;

  return (
    <div
      ref={rootRef}
      className={`hs${anim ? ' hs-anim' : ''}`}
      data-reached={reached}
      style={{ '--hs-p': Math.max(0, reached + 1) / n }}
    >
      <div className="hs-visual">
        <Diagram icons={icons} />
        <p className="hs-caption" aria-hidden="true">{caption}</p>
      </div>
      <div className="hs-track">
        <span className="hs-rail" aria-hidden="true"><span className="hs-rail-fill" /></span>
        <ol className="hs-stages">
          {data.stages.map((s, i) => {
            const proof = !s.items.length;
            const cls = ['hs-stage', proof ? 'hs-proof' : '', i <= reached ? 'is-on' : '', i === reached ? 'is-current' : ''].filter(Boolean).join(' ');
            return (
              <li key={s.key} className={cls}>
                <span className="hs-badge" aria-hidden="true">
                  {proof ? <svg viewBox="0 0 24 24" width="14" height="14"><path d={TOOTH} fill="currentColor" /></svg> : i + 1}
                </span>
                <p className="hs-kicker">{s.kicker}</p>
                {proof ? (
                  <>
                    <p className="hs-who">{s.who}</p>
                    <h3 className="hs-title hs-proof-line">{s.label}</h3>
                  </>
                ) : (
                  <>
                    <h3 className="hs-title">{s.label}</h3>
                    <p className="hs-line">{s.line}</p>
                    <ul className="hs-items">
                      {s.items.map((t, j) => (
                        <li key={t} style={{ '--hs-d': `${0.12 + j * 0.07}s` }}><Check /><span>{t}</span></li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
