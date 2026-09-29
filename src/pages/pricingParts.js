import React from 'react';
import { inr as exact } from '../data/pricingView';

/** Small pieces shared by the two pricing layouts (usage card and module card). */

export const PRICING_API = process.env.REACT_APP_PRICING_API || 'https://aumy.aumai.co.in/api/v1/public/pricing';
export const WA = (msg) => `https://wa.me/918007189868?text=${encodeURIComponent(msg)}`;
export const inr = (n) => `₹${Math.round(Number(n) || 0).toLocaleString('en-IN')}`;
/** Keeps paise when there are any: a rate of ₹6.60 must not print as ₹7. */
export const inrExact = (n) => `₹${exact(n)}`;

export const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

// Module scope so a slider is not remounted mid-drag.
export const Slider = ({ id, label, hint, value, onChange, min, max, step = 1 }) => (
  <div className="ch-calc-field">
    <div className="ch-calc-label">
      <label htmlFor={id}>{label}</label>
      <input
        className="pp-num"
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        aria-label={`${label} (number)`}
      />
    </div>
    <input id={id} type="range" min={min} max={max} step={step} value={Math.min(value, max)} onChange={(e) => onChange(Number(e.target.value))} />
    {hint && <span className="pp-hint">{hint}</span>}
  </div>
);

export const Segmented = ({ label, options, value, onChange }) => (
  <div className="ch-calc-field">
    <span className="pp-field-label">{label}</span>
    <div className="ch-calc-toggle" role="group" aria-label={label}>
      {options.map(([v, text]) => (
        <button key={String(v)} type="button" className={`ch-calc-seg${value === v ? ' active' : ''}`} aria-pressed={value === v} onClick={() => onChange(v)}>
          {text}
        </button>
      ))}
    </div>
  </div>
);
