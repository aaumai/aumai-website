import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';
import './GrowthHub.css';

/**
 * Missed Call Calculator — the second public calculator from the inbound
 * strategy (docs/growth/inbound-marketing-strategy.md in the API repo).
 *
 * Where /leak-calculator sums every leak, this one goes deep on a single,
 * viscerally familiar one: the phone that rang while everyone was busy. It is
 * the companion tool to /growth/dental-clinic-missed-calls-revenue-loss and
 * uses the exact same formula that article walks through, so a reader can
 * check the article's ₹30,000 example against their own numbers.
 *
 * India-only for now (it ships in the India route table); like LeakCheck, the
 * discount factors are printed on screen — a visibly undercounted number gets
 * believed.
 */

const money = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

// Module scope, same reason as LeakCheck's Slider: an inline component is a
// new reference every render, which remounts the input mid-drag.
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

const MissedCallCalculator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'Missed Call Calculator for Dental Clinics — What Unanswered Calls Cost | AUMY',
      description:
        'How much revenue is your dental clinic losing to missed calls? Enter your missed calls per month and average treatment value — get a deliberately conservative monthly and yearly estimate. Free, no sign-up.',
      canonical: 'https://aumai.co.in/missed-call-calculator',
    });
  }, []);

  const [missedCalls, setMissedCalls] = useState(30);
  const [newPatientPct, setNewPatientPct] = useState(40);
  const [convertPct, setConvertPct] = useState(50);
  const [avgValue, setAvgValue] = useState(5000);

  const r = useMemo(() => {
    const lostEnquiries = missedCalls * (newPatientPct / 100);
    const lostPatients = lostEnquiries * (convertPct / 100);
    const monthly = lostPatients * avgValue;
    return { lostEnquiries, lostPatients, monthly, yearly: monthly * 12 };
  }, [missedCalls, newPatientPct, convertPct, avgValue]);

  return (
    <div className="ch-home">
      <section className="ch-hero ch-audit-hero">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Missed call calculator</span>
            <h1 className="ch-hero-title">What is that unanswered phone costing you?</h1>
            <p className="ch-lead ch-center-lead">
              Every missed call was a patient ready to talk at that exact moment. Four honest
              answers — from your phone's call log — and you'll know what those calls are worth.
              Deliberately conservative: first treatment only, no lifetime value, no referrals.
            </p>
          </div>

          <div className="ch-calc-grid">
            <div className="ch-calc-inputs">
              <Slider
                label="Missed calls per month"
                hint="Check the clinic phone's call log — count lunch, evenings and Sundays too"
                value={missedCalls}
                onChange={setMissedCalls}
                min={0}
                max={200}
              />
              <Slider
                label="…of those, how many were potential new patients?"
                hint="The rest are labs, salespeople, and existing patients who call back"
                value={newPatientPct}
                onChange={setNewPatientPct}
                min={0}
                max={80}
                suffix="%"
              />
              <Slider
                label="Of new-patient enquiries you DO answer, how many book?"
                value={convertPct}
                onChange={setConvertPct}
                min={0}
                max={90}
                suffix="%"
              />
              <Slider
                label="Average first-treatment value (₹)"
                hint="Blended across consultations, cleanings, fillings, RCTs"
                value={avgValue}
                onChange={setAvgValue}
                min={500}
                max={20000}
                step={250}
              />
            </div>

            <div className="ch-calc-result">
              <p className="ch-calc-result-label">
                Even counting conservatively, missed calls are costing your clinic about
              </p>
              <p className="ch-calc-total">
                {money(r.monthly)}
                <span className="ch-calc-per">/month</span>
              </p>
              <p className="ch-calc-monthly">≈ {money(r.yearly)} every year</p>

              <ul className="ch-calc-breakdown">
                <li>
                  <span>Lost new-patient enquiries / month</span>
                  <b>{Math.round(r.lostEnquiries)}</b>
                </li>
                <li>
                  <span>Patients who booked elsewhere / month</span>
                  <b>{Math.round(r.lostPatients)}</b>
                </li>
                <li>
                  <span>First-treatment revenue lost / month</span>
                  <b>{money(r.monthly)}</b>
                </li>
              </ul>

              <p className="ch-calc-fine">
                How we undercount: only the first treatment is counted — not the patient's
                lifetime value, not the family they would have brought, and not a single implant
                or aligner case. One implant enquiry among these calls changes the number
                completely.
              </p>

              <Link to="/growth-audit" className="ch-btn ch-btn-primary ch-audit-submit">
                Find out where else your clinic leaks — free audit
              </Link>
              <p className="ch-fineprint ch-center">
                Want the full picture first? Read{' '}
                <Link to="/growth/dental-clinic-missed-calls-revenue-loss">
                  how much revenue missed calls really cost
                </Link>{' '}
                — including a ladder of fixes from free to fully automatic — or run the{' '}
                <Link to="/leak-calculator">complete 60-second leak check</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissedCallCalculator;
