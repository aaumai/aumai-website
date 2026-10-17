import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BANDS } from '../data/scorecard';
import './ScorecardPage.css';

// Admin: every 4C Scorecard filled on aumai.co.in/4c-scorecard (owner 2026-10-17:
// "I should be able to see everybody's score as admin"). Uses the analytics
// dashboard's master password (same stored key as /aumaianalytics); a clinic's
// own dashboard password is refused by the server.

const API = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/scorecard/submissions`;
const KEY_STORE = 'aumai_dash_key';
const readKey = () => { try { return localStorage.getItem(KEY_STORE) || ''; } catch (e) { return ''; } };
const saveKey = (k) => { try { if (k) localStorage.setItem(KEY_STORE, k); else localStorage.removeItem(KEY_STORE); } catch (e) { /* ignore */ } };

const formatIST = (utc) => {
  if (!utc) return '';
  return new Date(`${String(utc).replace(' ', 'T')}Z`).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true,
  });
};
const bandLabel = (k) => (BANDS.find((b) => b.key === k) || {}).label || k;
const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

export default function ScorecardAdmin() {
  const [key, setKey] = useState(readKey);
  const [pw, setPw] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [onlyContacts, setOnlyContacts] = useState(true);

  useEffect(() => {
    document.title = 'Scorecards · AUM AI admin';
    const m = document.createElement('meta');
    m.name = 'robots'; m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => m.remove();
  }, []);

  const load = useCallback(async (k) => {
    setError('');
    try {
      const r = await fetch(API, { headers: { 'X-Dashboard-Key': k } });
      const j = await r.json().catch(() => ({}));
      if (r.status === 401) { saveKey(''); setKey(''); setError('That password is not right. Please type it again.'); return; }
      if (!r.ok) { setError(j.error || 'Could not load the scorecards. Try again in a minute.'); return; }
      saveKey(k); setKey(k); setData(j);
    } catch (e) {
      setError('Could not reach the server. Check your connection and press Refresh.');
    }
  }, []);

  useEffect(() => { if (key) load(key); }, [key, load]);

  const rows = useMemo(() => (data?.submissions || []).filter((s) => !onlyContacts || s.whatsapp), [data, onlyContacts]);
  const systemAverages = useMemo(() => {
    if (!data || !rows.length) return [];
    return data.systems.map((name, i) => ({ name, avg: Math.round((rows.reduce((t, r) => t + r.system_scores[i], 0) / rows.length) * 10) / 10 }));
  }, [data, rows]);

  if (!key || !data) {
    return (
      <div className="sc-root" style={{ minHeight: '100vh', paddingTop: 80 }}>
        <form className="sc-wrap sc-form" style={{ maxWidth: 420 }} onSubmit={(e) => { e.preventDefault(); if (pw) load(pw); }}>
          <h2>4C Scorecards</h2>
          <p>Enter the dashboard password to see every clinic’s score.</p>
          <div className="sc-fields" style={{ gridTemplateColumns: '1fr' }}>
            <label>Password<input type="password" autoFocus autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} /></label>
          </div>
          {error && <p className="sc-error" role="alert">{error}</p>}
          <button type="submit" className="sc-btn">Open scorecards</button>
        </form>
      </div>
    );
  }

  const downloadCsv = () => {
    const head = ['Date (IST)', 'Clinic', 'Name', 'City', 'WhatsApp', 'Email', 'Chairs', 'Score', 'Band', 'Weakest', ...data.systems];
    const lines = rows.map((r) => [formatIST(r.created_at), r.clinic, r.name, r.city, r.whatsapp, r.email, r.chairs, r.average, bandLabel(r.band), r.weakest, ...r.system_scores]);
    const blob = new Blob([[head, ...lines].map((l) => l.map(csvCell).join(',')).join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `4c-scorecards-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const total = data.submissions.length;
  const withContact = data.submissions.filter((s) => s.whatsapp).length;
  const avgAll = rows.length ? (rows.reduce((t, r) => t + r.average, 0) / rows.length).toFixed(1) : '–';
  const count = (b) => rows.filter((r) => r.band === b).length;

  return (
    <div className="sc-root" style={{ minHeight: '100vh' }}>
      <div className="sc-wrap" style={{ maxWidth: 1200, paddingBlock: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <p className="sc-eyebrow">AUM AI admin</p>
            <h1 style={{ fontSize: 34 }}>4C Scorecards</h1>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <label className="sc-consent" style={{ alignItems: 'center' }}>
              <input type="checkbox" checked={onlyContacts} onChange={(e) => setOnlyContacts(e.target.checked)} /> Only clinics that asked for the report
            </label>
            <button type="button" className="sc-btn sc-btn-ghost" onClick={() => load(key)}>Refresh</button>
            <button type="button" className="sc-btn" onClick={downloadCsv} disabled={!rows.length}>Download CSV ({rows.length})</button>
            <button type="button" className="sc-link" onClick={() => { saveKey(''); setKey(''); setData(null); }}>Sign out</button>
          </div>
        </div>
        {error && <p className="sc-error" role="alert">{error}</p>}

        <div className="sc-start" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
          <div className="sc-start-card"><p className="sc-start-label">Scorecards finished</p><h3>{total}</h3><p>{withContact} asked for the report</p></div>
          <div className="sc-start-card"><p className="sc-start-label">Average score</p><h3>{avgAll} / 10</h3><p>of the rows shown</p></div>
          <div className="sc-start-card"><p className="sc-start-label">Running tight</p><h3>{count('tight')}</h3><p>9 to 10</p></div>
          <div className="sc-start-card"><p className="sc-start-label">Can do better</p><h3>{count('better')}</h3><p>5 to 8</p></div>
          <div className="sc-start-card"><p className="sc-start-label">Leaking patients</p><h3>{count('leak')}</h3><p>below 5</p></div>
        </div>

        {systemAverages.length > 0 && (
          <div className="sc-report" style={{ paddingInline: 20 }}>
            <h2>Average by system</h2>
            <table className="sc-table">
              <tbody>
                {systemAverages.map((s) => (
                  <tr key={s.name}><td>{s.name}</td><td><div className="sc-cell-bar"><div className="sc-bar"><div style={{ width: `${s.avg * 10}%` }} /></div><span className="sc-num">{s.avg} / 10</span></div></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ overflowX: 'auto', background: 'var(--sc-card)', border: '1px solid var(--sc-line)', borderRadius: 14 }}>
          {rows.length === 0 ? (
            <p style={{ padding: 20, margin: 0 }}>No scorecards yet{onlyContacts ? ' with contact details. Untick the box to see anonymous ones too' : ''}.</p>
          ) : (
            <table className="sc-table" style={{ minWidth: 1100 }}>
              <thead><tr><th>Date</th><th>Clinic</th><th>Name</th><th>City</th><th>WhatsApp</th><th>Chairs</th><th>Score</th><th>Band</th><th>Weakest</th>{data.systems.map((n, i) => <th key={n} title={n}>{i + 1}</th>)}</tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{formatIST(r.created_at)}</td>
                    <td>{r.clinic || <i>anonymous</i>}</td>
                    <td>{r.name || ''}</td>
                    <td>{r.city || r.geo_city || ''}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{r.whatsapp || ''}</td>
                    <td>{r.chairs || ''}</td>
                    <td className="sc-num">{r.average.toFixed(1)}</td>
                    <td><span className={`sc-band sc-band-${r.band}`} style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{bandLabel(r.band)}</span></td>
                    <td>{r.weakest}</td>
                    {r.system_scores.map((n, i) => <td key={i} className="sc-num" style={{ color: n < 5 ? '#BE185D' : undefined }}>{n}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <p className="sc-hint">Columns 1–8: {data.systems.map((n, i) => `${i + 1} ${n}`).join(' · ')}</p>
      </div>
    </div>
  );
}
