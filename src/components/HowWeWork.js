import React from 'react';
import { HOW } from '../data/homeOutcomes';
import '../pages/HomeOutcomes.css';

/**
 * "How we work with your dental clinic": the five steps, each with its example (owner 2026-10-22,
 * outcomes as a service). One component for home, /revenue-generator and /about, so the steps never drift.
 * Words: src/data/homeOutcomes.js (HOW), mirrored by howWeWorkHtml() in scripts/prerender.js.
 */
const HowWeWork = ({ id = 'how-we-work', tint = true, eyebrow = HOW.eyebrow, titleA = HOW.titleA, titleB = HOW.titleB }) => (
  <section className={`ch-section ho${tint ? ' ch-tint' : ''}`} id={id} aria-labelledby={`${id}-title`}>
    <div className="ch-container">
      <div className="ho-head">
        <span className="ch-eyebrow">{eyebrow}</span>
        <h2 id={`${id}-title`} className="ch-h2">{titleA} <em>{titleB}</em></h2>
      </div>
      <ol className="ho-steps">
        {HOW.steps.map((st, i) => (
          <li key={st.title} className="ho-step">
            <span className="ho-step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{st.title}</h3>
              <p>{st.body}</p>
              {st.pull && (
                <p className="ho-step-pull">“{st.pull.q}” <span>{st.pull.who}</span></p>
              )}
            </div>
            <div className="ho-ex">
              <span className="ho-tag">{st.exTag}</span>
              <p>{st.ex}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowWeWork;
