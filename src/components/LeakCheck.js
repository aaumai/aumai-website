import React, { useMemo, useState } from 'react';

/**
 * The 60-second leak check — one implementation, two markets.
 *
 * This is the site's primary hook: it asks six questions a clinic owner can
 * answer from memory and returns a number they did not know. It therefore has
 * to live ABOVE the fold on the home page, not only on its own route — a
 * calculator nobody scrolls to earns nothing.
 *
 * India (INR) and the US (USD) differ only in currency, locale, segment
 * benchmarks and slider ranges, so they share this component rather than
 * forking. Two copies of an estimate that we publish and defend would drift,
 * and the arithmetic is the thing being trusted.
 *
 * The math is deliberately conservative and the discount factors are PRINTED on
 * screen. That is the point: an inflated number gets argued with, a visibly
 * undercounted one gets believed — and the real figure is almost always higher.
 */

// Shared discount factors. Shown to the visitor, never hidden.
const WEEKS_PER_YEAR = 48;        // working weeks, holidays excluded
const MISSED_WOULD_BOOK = 0.35;   // only 35% of unanswered enquiries would have booked
const NOSHOW_NEVER_REBOOK = 0.5;  // only half of no-shows counted as lost
const LOST_VISITS_PER_LAPSED = 3; // 3 visits per lapsed patient, not lifetime value
const UNIQUE_PATIENT_FACTOR = 0.1; // weekly appointments overstate unique patients

export const MARKETS = {
  in: {
    locale: 'en-IN',
    symbol: '₹',
    // "Enquiry" channels differ by market — an Indian clinic's front door is
    // WhatsApp and Instagram; a US practice's is the phone.
    enquiryLabel: 'New enquiries per week (calls, WhatsApp, Instagram, walk-ins)',
    valueLabel: 'Average treatment value (₹)',
    value: { min: 500, max: 20000, step: 250 },
    segments: [
      { key: 'dental', label: 'Dental clinic', avgValue: 4000 },
      { key: 'aesthetic', label: 'Aesthetic / derma clinic', avgValue: 4000 },
    ],
    auditHref: '/growth-audit',
    auditCta: 'Find out where your number hides — free audit',
    auditNote: (
      <>
        The audit shows the leaks in <em>your</em> clinic — Google visibility, unanswered
        enquiries, and the gaps behind these numbers. Free, within 24 hours.
      </>
    ),
  },
  us: {
    locale: 'en-US',
    symbol: '$',
    enquiryLabel: 'New patient enquiries per week (calls, texts, web forms)',
    valueLabel: 'Average production per visit ($)',
    value: { min: 100, max: 3000, step: 25 },
    segments: [
      { key: 'dental', label: 'Dental practice', avgValue: 450 },
      { key: 'medspa', label: 'Med spa / aesthetics', avgValue: 700 },
    ],
    auditHref: 'https://calendar.app.google/tecaeebTBEWSoJnV7',
    auditCta: 'See where your number hides — book a 30-minute call',
    auditNote:
      'On the call we walk through your own numbers — unanswered calls, recall gaps, and what each one is worth. No obligation.',
  },
};

const Money = (locale, symbol) => (n) =>
  symbol + Math.round(n).toLocaleString(locale);

// Defined at module scope, NOT inside LeakCheck: a component declared inside
// another is a new function reference every render, so React unmounts and
// remounts the <input> on each change — which aborts the native range drag and
// makes the thumb step instead of slide.
const Slider = ({ label, value, onChange, min, max, step = 1, suffix = '', locale }) => (
  <div className="ch-calc-field">
    <div className="ch-calc-label">
      <label>{label}</label>
      <span className="ch-calc-value">
        {value.toLocaleString(locale)}
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

const LeakCheck = ({ market = 'in', headingLevel = 'h1', showHeading = true }) => {
  const cfg = MARKETS[market] || MARKETS.in;
  const money = useMemo(() => Money(cfg.locale, cfg.symbol), [cfg.locale, cfg.symbol]);

  const [segment, setSegment] = useState(cfg.segments[0].key);
  const [enquiries, setEnquiries] = useState(15);
  const [missedPct, setMissedPct] = useState(50);
  const [appointments, setAppointments] = useState(50);
  const [noshowPct, setNoshowPct] = useState(15);
  const [lapsePct, setLapsePct] = useState(30);
  const [avgValue, setAvgValue] = useState(cfg.segments[0].avgValue);

  const pickSegment = (key) => {
    setSegment(key);
    const s = cfg.segments.find((x) => x.key === key);
    if (s) setAvgValue(s.avgValue);
  };

  const leaks = useMemo(() => {
    const missed =
      enquiries * (missedPct / 100) * MISSED_WOULD_BOOK * avgValue * WEEKS_PER_YEAR;
    const noshows =
      appointments * (noshowPct / 100) * NOSHOW_NEVER_REBOOK * avgValue * WEEKS_PER_YEAR;
    const lapsed =
      appointments * WEEKS_PER_YEAR * (lapsePct / 100) *
      LOST_VISITS_PER_LAPSED * avgValue * UNIQUE_PATIENT_FACTOR;
    return { missed, noshows, lapsed, total: missed + noshows + lapsed };
  }, [enquiries, missedPct, appointments, noshowPct, lapsePct, avgValue]);

  const Heading = headingLevel;
  const isExternalAudit = cfg.auditHref.startsWith('http');

  return (
    <>
      {showHeading && (
        <div className="ch-head">
          <span className="ch-eyebrow">60-second leak check</span>
          <Heading className="ch-hero-title">
            Do the math for your {market === 'us' ? 'practice' : 'clinic'}.
          </Heading>
          <p className="ch-lead ch-center-lead">
            Six honest answers. Deliberately conservative math — we undercount on purpose.
            Your real number is almost certainly higher.
          </p>
        </div>
      )}

      <div className="ch-calc-grid">
        <div className="ch-calc-inputs">
          <div className="ch-calc-toggle">
            {cfg.segments.map((s) => (
              <button
                key={s.key}
                type="button"
                className={`ch-calc-seg ${segment === s.key ? 'active' : ''}`}
                onClick={() => pickSegment(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <Slider locale={cfg.locale} label={cfg.enquiryLabel} value={enquiries} onChange={setEnquiries} min={0} max={100} />
          <Slider locale={cfg.locale} label="…of those, how many never get a proper reply or follow-up?" value={missedPct} onChange={setMissedPct} min={0} max={80} suffix="%" />
          <Slider locale={cfg.locale} label="Appointments per week" value={appointments} onChange={setAppointments} min={0} max={300} step={5} />
          <Slider locale={cfg.locale} label="No-show rate" value={noshowPct} onChange={setNoshowPct} min={0} max={40} suffix="%" />
          <Slider locale={cfg.locale} label={`${market === 'us' ? 'Patients' : 'Patients'} who quietly never come back`} value={lapsePct} onChange={setLapsePct} min={0} max={70} suffix="%" />
          <Slider locale={cfg.locale} label={cfg.valueLabel} value={avgValue} onChange={setAvgValue} min={cfg.value.min} max={cfg.value.max} step={cfg.value.step} />
        </div>

        <div className="ch-calc-result">
          <p className="ch-calc-result-label">
            Even counting conservatively, your {market === 'us' ? 'practice' : 'clinic'} is leaking about
          </p>
          <p className="ch-calc-total">
            {money(leaks.total)}<span className="ch-calc-per">/year</span>
          </p>
          <p className="ch-calc-monthly">≈ {money(leaks.total / 12)} every month</p>

          <ul className="ch-calc-breakdown">
            <li>
              <span>Enquiries that never became patients</span>
              <b>{money(leaks.missed)}</b>
            </li>
            <li>
              <span>No-shows nobody refilled</span>
              <b>{money(leaks.noshows)}</b>
            </li>
            <li>
              <span>Patients who drifted away, uncontacted</span>
              <b>{money(leaks.lapsed)}</b>
            </li>
          </ul>

          <p className="ch-calc-fine">
            How we undercount: only {Math.round(MISSED_WOULD_BOOK * 100)}% of missed enquiries
            counted as lost bookings · only {Math.round(NOSHOW_NEVER_REBOOK * 100)}% of no-shows
            counted · just {LOST_VISITS_PER_LAPSED} visits per lapsed patient (their full lifetime
            value and referrals aren't counted) · {WEEKS_PER_YEAR} working weeks.
          </p>

          <a
            href={cfg.auditHref}
            className="ch-btn ch-btn-primary ch-audit-submit"
            {...(isExternalAudit ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {cfg.auditCta}
          </a>
          <p className="ch-fineprint ch-center">{cfg.auditNote}</p>
        </div>
      </div>
    </>
  );
};

export default LeakCheck;
