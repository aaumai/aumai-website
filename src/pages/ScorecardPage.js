import React, { useEffect, useMemo, useState } from 'react';
import { setPageSeo } from '../utils/seo';
import { OPTIONS, SYSTEMS, BANDS, bandFor, C_COLORS, CALL_LINK } from '../data/scorecard';
import './ScorecardPage.css';

// The 4C Scorecard (masterclass self-audit, owner 2026-10-17): 40 statements,
// live scores, then the clinic's details unlock a printable audit report.
// Every finished scorecard is saved to the site backend; the owner sees all
// of them at /scorecard-admin.

const API = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/scorecard`;
const STORE = 'aumai_4c_scorecard_v1';
const TOTAL = SYSTEMS.length * 5;

const emptyAnswers = () => SYSTEMS.map(() => [null, null, null, null, null]);
const newId = () => {
  try { if (window.crypto?.randomUUID) return window.crypto.randomUUID().replace(/-/g, ''); } catch (_e) { /* fall through */ }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
};

function loadSaved() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE) || 'null');
    if (s && Array.isArray(s.answers) && s.answers.length === SYSTEMS.length && s.id) return s;
  } catch (_e) { /* storage blocked or corrupt: start fresh */ }
  return null;
}

const sysScore = (row) => row.reduce((t, v) => t + (v ?? 0), 0);
const answeredIn = (row) => row.filter((v) => v !== null).length;
const strength = (n) => (n >= 8 ? 'Strong' : n >= 5 ? 'Room to grow' : 'Weak');

async function save(id, answers, contact) {
  const r = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ submission_id: id, answers, contact }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j.error || 'We could not save your scorecard. Please try again.');
  return j;
}

export default function ScorecardPage() {
  const saved = useMemo(loadSaved, []);
  const [id] = useState(() => saved?.id || newId());
  const [answers, setAnswers] = useState(() => saved?.answers || emptyAnswers());
  const [contact, setContact] = useState(() => saved?.contact || { name: '', clinic: '', city: '', whatsapp: '', email: '', chairs: '', consent: false });
  const [report, setReport] = useState(() => saved?.report || null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'The 4C Scorecard: a free audit for dental clinics | AUM AI',
      description: 'Score your dental clinic on the eight systems that keep chairs full: Convert, Confirm, Care, Come back. 40 questions, ten minutes, and a printable audit report of what to fix first.',
      canonical: 'https://aumai.co.in/4c-scorecard',
    });
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORE, JSON.stringify({ id, answers, contact, report })); } catch (_e) { /* fine: answers stay on screen */ }
  }, [id, answers, contact, report]);

  const answered = answers.reduce((t, row) => t + answeredIn(row), 0);
  const complete = answered === TOTAL;
  const scores = answers.map(sysScore);
  const avg = Math.round((scores.reduce((a, b) => a + b, 0) / SYSTEMS.length) * 10) / 10;
  const band = bandFor(avg);

  // Save the finished answers (no contact yet) once all 40 are in, and again if they change.
  const answersKey = JSON.stringify(answers);
  useEffect(() => {
    if (!complete) return undefined;
    const t = setTimeout(() => { save(id, JSON.parse(answersKey), null).catch(() => { /* retried with the report request */ }); }, 800);
    return () => clearTimeout(t);
  }, [complete, answersKey, id]);

  const pick = (si, qi, value) => {
    setAnswers((prev) => prev.map((row, r) => (r === si ? row.map((v, c) => (c === qi ? value : v)) : row)));
    setReport(null);
  };

  const onField = (e) => {
    const { name, value, type, checked } = e.target;
    setContact((c) => ({ ...c, [name]: type === 'checkbox' ? checked : value }));
  };

  const requestReport = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    const sentAnswers = answers;
    const sentContact = contact;
    try {
      const r = await save(id, sentAnswers, sentContact);
      setReport({ ...r, contact: sentContact, answers: sentAnswers, at: new Date().toISOString() });
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (report) return <Report report={report} onEdit={() => { setReport(null); window.scrollTo(0, 0); }} />;

  let lastC = '';
  return (
    <div className="sc-root">
      <section className="sc-hero">
        <div className="sc-wrap">
          <p className="sc-eyebrow">The Full Chair Method · free clinic audit</p>
          <h1>The 4C Scorecard</h1>
          <p className="sc-lead">Eight systems keep a dental clinic’s chairs full. Score your clinic on each one in about ten minutes, then get a printable audit report of what to fix first. Be honest: a “don’t know” scores zero, because what you can’t see, you can’t fix.</p>
          <div className="sc-how">
            <div><b>Always = 2</b>It happens every time, without anyone remembering to do it.</div>
            <div><b>Sometimes = 1</b>It happens when someone has time.</div>
            <div><b>Never = 0</b>Or you don’t know. Both score zero.</div>
          </div>
        </div>
      </section>

      <div className="sc-progress" role="status">
        <div className="sc-wrap sc-progress-row">
          <span><b>{answered}</b> of {TOTAL} answered</span>
          <div className="sc-track" aria-hidden="true"><div className="sc-fill" style={{ width: `${(answered / TOTAL) * 100}%` }} /></div>
          <span className="sc-live">{answered ? `${avg.toFixed(1)} / 10 so far` : 'Score: –'}</span>
        </div>
      </div>

      <div className="sc-wrap sc-systems">
        {SYSTEMS.map((s, si) => {
          const head = s.c !== lastC ? <h2 className={`sc-stage sc-${C_COLORS[s.c]}`}>{s.c}</h2> : null;
          lastC = s.c;
          const done = answeredIn(answers[si]);
          return (
            <React.Fragment key={s.name}>
              {head}
              <article className={`sc-sys sc-${C_COLORS[s.c]}`}>
                <header className="sc-sys-head">
                  <h3>{si + 1} · {s.name}<small>{s.sub}</small></h3>
                  <span className="sc-score">{done ? `${scores[si]} / 10` : '– / 10'}</span>
                </header>
                {s.q.map((q, qi) => {
                  const nm = `q${si}_${qi}`;
                  return (
                    <div className="sc-q" key={nm}>
                      <p id={`${nm}_t`}>{q}</p>
                      <div className="sc-opts" role="radiogroup" aria-labelledby={`${nm}_t`}>
                        {OPTIONS.map((o) => (
                          <React.Fragment key={o.value}>
                            <input type="radio" id={`${nm}_${o.value}`} name={nm} value={o.value}
                              checked={answers[si][qi] === o.value} onChange={() => pick(si, qi, o.value)} />
                            <label htmlFor={`${nm}_${o.value}`}>{o.label}</label>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </article>
            </React.Fragment>
          );
        })}
      </div>

      <section className="sc-wrap sc-finish">
        <div className="sc-result-card">
          <p className="sc-eyebrow">Your score</p>
          <div className="sc-big"><strong>{answered ? avg.toFixed(1) : '–'}</strong><span>/ 10</span>
            {complete && <span className={`sc-band sc-band-${band.key}`}>{band.label}</span>}</div>
          <div className="sc-legend">
            {BANDS.map((b) => (
              <div key={b.key} className={complete && b.key === band.key ? 'on' : ''}>
                <b>{b.key === 'tight' ? '9 to 10' : b.key === 'better' ? '5 to 8' : 'Below 5'} · {b.label}</b>{b.text}
              </div>
            ))}
          </div>
        </div>

        {!complete ? (
          <p className="sc-note">Answer all {TOTAL} statements to get your audit report. {TOTAL - answered} left.</p>
        ) : (
          <form className="sc-form" onSubmit={requestReport}>
            <h2>Get your 4C audit report</h2>
            <p>Your scores, your weakest systems, and exactly what to fix first. Print it or save it as a PDF.</p>
            <div className="sc-fields">
              <label>Your name *<input name="name" value={contact.name} onChange={onField} required autoComplete="name" /></label>
              <label>Clinic name *<input name="clinic" value={contact.clinic} onChange={onField} required autoComplete="organization" /></label>
              <label>City<input name="city" value={contact.city} onChange={onField} autoComplete="address-level2" /></label>
              <label>WhatsApp number *<input name="whatsapp" type="tel" value={contact.whatsapp} onChange={onField} required placeholder="+91 98XXXXXXXX" autoComplete="tel" /></label>
              <label>Email<input name="email" type="email" value={contact.email} onChange={onField} autoComplete="email" /></label>
              <label>Dental chairs
                <select name="chairs" value={contact.chairs} onChange={onField}>
                  <option value="">Choose</option><option value="1">1</option><option value="2-3">2 to 3</option><option value="4+">4 or more</option>
                </select>
              </label>
            </div>
            <label className="sc-consent"><input type="checkbox" name="consent" checked={contact.consent} onChange={onField} required />
              AUM AI may contact me on WhatsApp about my report. My answers and details are used only for this audit.</label>
            {error && <p className="sc-error" role="alert">{error}</p>}
            <button type="submit" className="sc-btn" disabled={sending}>{sending ? 'Preparing your report…' : 'Show my audit report'}</button>
          </form>
        )}
      </section>
    </div>
  );
}

function Report({ report, onEdit }) {
  const { systemScores, average, contact } = report;
  const band = bandFor(average);
  const order = systemScores.map((n, i) => ({ n, i })).sort((a, b) => a.n - b.n || a.i - b.i);
  const startHere = order.slice(0, 2);
  const date = new Date(report.at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="sc-root">
      <div className="sc-wrap sc-report-tools">
        <button type="button" className="sc-btn" onClick={() => window.print()}>Print report</button>
        <button type="button" className="sc-btn sc-btn-ghost" onClick={() => window.print()}>Download as PDF</button>
        <button type="button" className="sc-link" onClick={onEdit}>Change my answers</button>
        <p className="sc-hint">To download, choose “Save as PDF” as the printer.</p>
      </div>

      <article className="sc-wrap sc-report">
        <header className="sc-report-head">
          <div>
            <p className="sc-eyebrow">4C audit report · The Full Chair Method</p>
            <h1>{contact.clinic}</h1>
            <p className="sc-meta">{[contact.name, contact.city, date].filter(Boolean).join(' · ')}</p>
          </div>
          <div className="sc-report-score">
            <strong>{average.toFixed(1)}</strong><span>/ 10</span>
            <span className={`sc-band sc-band-${band.key}`}>{band.label}</span>
          </div>
        </header>
        <p className="sc-verdict">{band.text}</p>

        <h2>Start here</h2>
        <div className="sc-start">
          {startHere.map(({ n, i }) => (
            <div key={i} className={`sc-start-card sc-${C_COLORS[SYSTEMS[i].c]}`}>
              <p className="sc-start-label">{SYSTEMS[i].c} · {n} / 10</p>
              <h3>{SYSTEMS[i].name}</h3>
              <p>{SYSTEMS[i].fix}</p>
            </div>
          ))}
        </div>

        <h2>All eight systems</h2>
        <table className="sc-table sc-table-report">
          <thead><tr><th>System</th><th>Stage</th><th>Score</th><th>Status</th></tr></thead>
          <tbody>
            {SYSTEMS.map((s, i) => (
              <tr key={s.name}>
                <td>{i + 1}. {s.name}</td>
                <td><span className={`sc-chip sc-${C_COLORS[s.c]}`}>{s.c}</span></td>
                <td><div className="sc-bar"><div style={{ width: `${systemScores[i] * 10}%` }} /></div><span className="sc-num">{systemScores[i]} / 10</span></td>
                <td>{strength(systemScores[i])}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>What to do next</h2>
        <ol className="sc-next">
          {order.filter(({ n }) => n < 8).map(({ i }) => <li key={i}><b>{SYSTEMS[i].name}:</b> {SYSTEMS[i].fix}</li>)}
          {order.every(({ n }) => n >= 8) && <li>Every system scores 8 or more. Re-score your clinic in a month to keep it there.</li>}
        </ol>

        <div className="sc-cta">
          <div>
            <h3>Want these systems running for you?</h3>
            <p>Book a free 15-minute call. Bring this report, and we’ll tell you honestly which systems are worth automating for a clinic your size.</p>
          </div>
          <a className="sc-btn" href={CALL_LINK} target="_blank" rel="noopener noreferrer">Book a 15-minute call</a>
        </div>
        <p className="sc-foot">The 4C Scorecard · The Full Chair Method by AUM AI · aumai.co.in/4c-scorecard</p>
      </article>
    </div>
  );
}
