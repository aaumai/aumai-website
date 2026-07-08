import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';

// Deliberately conservative constants — shown to the user, not hidden.
const WEEKS_PER_YEAR = 48; // working weeks, holidays excluded
const MISSED_WOULD_BOOK = 0.3; // only 30% of unanswered enquiries would have booked
const NOSHOW_NEVER_REBOOK = 0.5; // only half of no-shows are counted as lost
const LOST_VISITS_PER_LAPSED = 1; // one lost visit per lapsed patient (real LTV is far higher)

const segments = {
  dental: { label: 'Dental clinic', avgValue: 2000 },
  aesthetic: { label: 'Aesthetic / derma clinic', avgValue: 4000 },
};

const inr = (n) =>
  '₹' + Math.round(n).toLocaleString('en-IN');

// Defined at module scope (NOT inside LeakCalculator): a component defined
// inside another is a new function reference every render, so React unmounts
// and remounts the <input> on each value change — which interrupts the native
// range drag and makes the thumb jump one step at a time instead of sliding.
const Slider = ({ label, value, onChange, min, max, step = 1, suffix = '' }) => (
  <div className="ch-calc-field">
    <div className="ch-calc-label">
      <label>{label}</label>
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
    />
  </div>
);

const LeakCalculator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'Clinic Revenue Leak Calculator — AUMY by AUM AI',
      description:
        'A 60-second, deliberately conservative estimate of the revenue quietly leaking from your dental or aesthetic clinic — missed enquiries, no-shows, and patients who never come back.',
      canonical: 'https://aumai.co.in/leak-calculator',
    });
  }, []);

  const [segment, setSegment] = useState('dental');
  const [enquiries, setEnquiries] = useState(15);
  const [missedPct, setMissedPct] = useState(20);
  const [appointments, setAppointments] = useState(50);
  const [noshowPct, setNoshowPct] = useState(10);
  const [lapsePct, setLapsePct] = useState(30);
  const [avgValue, setAvgValue] = useState(segments.dental.avgValue);

  const pickSegment = (key) => {
    setSegment(key);
    setAvgValue(segments[key].avgValue);
  };

  const leaks = useMemo(() => {
    const missed =
      enquiries * (missedPct / 100) * MISSED_WOULD_BOOK * avgValue * WEEKS_PER_YEAR;
    const noshows =
      appointments * (noshowPct / 100) * NOSHOW_NEVER_REBOOK * avgValue * WEEKS_PER_YEAR;
    const lapsed =
      appointments * WEEKS_PER_YEAR * (lapsePct / 100) * LOST_VISITS_PER_LAPSED * avgValue * 0.1;
    // 0.1 factor: of the patients seen in a year, count only 10% as unique lapsed
    // patients (repeat visits mean weekly appointments overstate unique patients).
    const total = missed + noshows + lapsed;
    return { missed, noshows, lapsed, total };
  }, [enquiries, missedPct, appointments, noshowPct, lapsePct, avgValue]);

  return (
    <div className="ch-home">
      <section className="ch-hero ch-audit-hero">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">60-second leak check</span>
            <h1 className="ch-hero-title">How much is quietly leaking from your clinic?</h1>
            <p className="ch-lead ch-center-lead">
              Six honest answers. Deliberately conservative math — we undercount on purpose.
              Your real number is almost certainly higher.
            </p>
          </div>

          <div className="ch-calc-grid">
            <div className="ch-calc-inputs">
              <div className="ch-calc-toggle">
                {Object.entries(segments).map(([key, s]) => (
                  <button
                    key={key}
                    type="button"
                    className={`ch-calc-seg ${segment === key ? 'active' : ''}`}
                    onClick={() => pickSegment(key)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <Slider label="New enquiries per week (calls, WhatsApp, Instagram, walk-ins)" value={enquiries} onChange={setEnquiries} min={0} max={100} />
              <Slider label="…of those, how many never get a proper reply or follow-up?" value={missedPct} onChange={setMissedPct} min={0} max={80} suffix="%" />
              <Slider label="Appointments per week" value={appointments} onChange={setAppointments} min={0} max={300} step={5} />
              <Slider label="No-show rate" value={noshowPct} onChange={setNoshowPct} min={0} max={40} suffix="%" />
              <Slider label="Patients who quietly never come back" value={lapsePct} onChange={setLapsePct} min={0} max={70} suffix="%" />
              <Slider label={`Average treatment value (₹)`} value={avgValue} onChange={setAvgValue} min={500} max={20000} step={250} />
            </div>

            <div className="ch-calc-result">
              <p className="ch-calc-result-label">Even counting conservatively, your clinic is leaking about</p>
              <p className="ch-calc-total">{inr(leaks.total)}<span className="ch-calc-per">/year</span></p>
              <p className="ch-calc-monthly">≈ {inr(leaks.total / 12)} every month</p>

              <ul className="ch-calc-breakdown">
                <li>
                  <span>Enquiries that never became patients</span>
                  <b>{inr(leaks.missed)}</b>
                </li>
                <li>
                  <span>No-shows nobody refilled</span>
                  <b>{inr(leaks.noshows)}</b>
                </li>
                <li>
                  <span>Patients who drifted away, uncontacted</span>
                  <b>{inr(leaks.lapsed)}</b>
                </li>
              </ul>

              <p className="ch-calc-fine">
                How we undercount: only {MISSED_WOULD_BOOK * 100}% of missed enquiries counted as
                lost bookings · only {NOSHOW_NEVER_REBOOK * 100}% of no-shows counted ·
                just {LOST_VISITS_PER_LAPSED} lost visit per lapsed patient (their future visits and
                referrals aren't counted) · {WEEKS_PER_YEAR} working weeks.
              </p>

              <Link to="/growth-audit" className="ch-btn ch-btn-primary ch-audit-submit">
                Find out where your number hides — free audit
              </Link>
              <p className="ch-fineprint ch-center">
                The audit shows the leaks in <em>your</em> clinic — Google visibility, unanswered
                enquiries, and the gaps behind these numbers. Free, within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeakCalculator;
