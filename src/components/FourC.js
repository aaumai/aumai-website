import React from 'react';
import { EYEBROW, TITLE, STRAP, STRAP_US, STAGES, systemsText } from '../data/fourC';
import '../pages/HomeClinic.css';

/**
 * The 4C Framework section (owner 2026-10-17: one framework, everywhere on the marketing site).
 * Words: src/data/fourC.js — the same file scripts/prerender.js reads for the crawler HTML.
 *
 * Props: `id` (anchor), `tint` (tinted background), `lead` (one page-specific sentence under the strap),
 * `market="us"` (practice, not clinic), `children` (anything the page adds under the four stages).
 */
const FourC = ({ id, tint = false, lead, market, children }) => (
  <section className={`ch-section${tint ? ' ch-tint' : ''}`} id={id}>
    <div className="ch-container">
      <div className="ch-head">
        <span className="ch-eyebrow">{EYEBROW}</span>
        <h2 className="ch-h2">{TITLE}</h2>
        <p className="ch-sub">{market === 'us' ? STRAP_US : STRAP}</p>
        {lead ? <p className="ch-sub">{lead}</p> : null}
      </div>
      <div className="ch-pillars">
        {STAGES.map((s, i) => (
          <div key={s.key} className="ch-pillar">
            <span className="ch-pillar-num">{i + 1}</span>
            <h3 className="ch-pillar-title">{s.name}</h3>
            <p className="ch-pillar-body">{s.line}</p>
            <p className="ch-pillar-machinery">{systemsText(s)}</p>
          </div>
        ))}
      </div>
      {children}
    </div>
  </section>
);

export default FourC;
