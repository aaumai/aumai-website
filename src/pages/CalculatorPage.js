import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';
import './GrowthHub.css';

/**
 * Generic revenue-calculator page. Everything specific — sliders, math,
 * copy, SEO — comes from an entry in src/data/calculators.js; App.js mounts
 * one route per entry. See MissedCallCalculator.js for the original
 * hand-built version of this layout.
 */

// Module scope so the input isn't remounted mid-drag (same fix as LeakCheck).
const Slider = ({ label, hint, value, onChange, min, max, step = 1, suffix = '' }) => (
  <div className="ch-calc-field">
    <div className="ch-calc-label">
      <label>
        {label}
        {hint && <span className="mc-hint">{hint}</span>}
      </label>
      <span className="ch-calc-value">
        {value.toLocaleString('en-IN')}
        {suffix}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={label}
    />
  </div>
);

const CalculatorPage = ({ config }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: config.seoTitle,
      description: config.seoDescription,
      canonical: `https://aumai.co.in/${config.slug}`,
    });
  }, [config]);

  const [values, setValues] = useState(() =>
    Object.fromEntries(config.sliders.map((s) => [s.key, s.initial]))
  );
  const setValue = (key) => (v) => setValues((prev) => ({ ...prev, [key]: v }));

  const result = useMemo(() => config.compute(values), [config, values]);

  return (
    <div className="ch-home">
      <section className="ch-hero ch-audit-hero">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">{config.eyebrow}</span>
            <h1 className="ch-hero-title">{config.heroTitle}</h1>
            <p className="ch-lead ch-center-lead">{config.heroSub}</p>
          </div>

          <div className="ch-calc-grid">
            <div className="ch-calc-inputs">
              {config.sliders.map((s) => (
                <Slider
                  key={s.key}
                  label={s.label}
                  hint={s.hint}
                  value={values[s.key]}
                  onChange={setValue(s.key)}
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  suffix={s.suffix}
                />
              ))}
            </div>

            <div className="ch-calc-result">
              <p className="ch-calc-result-label">{result.resultLabel || config.resultLabel}</p>
              <p className="ch-calc-total">
                {result.total}
                <span className="ch-calc-per">{result.per}</span>
              </p>
              <p className="ch-calc-monthly">{result.secondary}</p>

              <ul className="ch-calc-breakdown">
                {result.breakdown.map((b) => (
                  <li key={b.label}>
                    <span>{b.label}</span>
                    <b>{b.value}</b>
                  </li>
                ))}
              </ul>

              <p className="ch-calc-fine">{result.fine}</p>

              <Link to="/growth-audit" className="ch-btn ch-btn-primary ch-audit-submit">
                Find out where else your clinic leaks — free audit
              </Link>
              <p className="ch-fineprint ch-center">
                Want the full picture first? Read{' '}
                <Link to={config.relatedArticle.href}>{config.relatedArticle.label}</Link> — or run
                the <Link to="/leak-calculator">complete 60-second leak check</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalculatorPage;
