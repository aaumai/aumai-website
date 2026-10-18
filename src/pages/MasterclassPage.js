import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setNoindex } from '../utils/seo';
import { SYSTEMS, C_COLORS } from '../data/scorecard';
import { INDIA_OFFICE } from '../config/contact';
import './ScorecardPage.css';
import './MasterclassPage.css';

// Masterclass members area (owner 2026-10-18): attendees of The Full Chair Method
// sign in with a 6-digit email code (no password), then watch the video and
// download the workbooks for one month. Accounts are created by us at
// /masterclass-admin. Private: noindex, and nothing here is in the prerendered HTML.
// The session is an HttpOnly cookie set by site-api.aumai.co.in (same site).

const API = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/masterclass`;
const EMAIL_STORE = 'aumai_mc_email';
const readEmail = () => { try { return localStorage.getItem(EMAIL_STORE) || ''; } catch (e) { return ''; } };
const saveEmail = (v) => { try { localStorage.setItem(EMAIL_STORE, v); } catch (e) { /* fine */ } };
const RESEND_WAIT = 30; // seconds before "Send a new code" works again

async function call(path, body) {
  const r = await fetch(`${API}${path}`, {
    method: body ? 'POST' : 'GET',
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await r.json().catch(() => ({}));
  return { status: r.status, ok: r.ok, j };
}

const sysClass = (n) => (n >= 1 && n <= SYSTEMS.length ? `sc-${C_COLORS[SYSTEMS[n - 1].c]}` : '');
const badge = (f) => (f.system === 0 ? 'Owner scorecard' : f.system ? `System ${f.system}` : 'Workbook');
const daysText = (n) => (n <= 0 ? 'today is your last day' : n === 1 ? '1 day left' : `${n} days left`);

export default function MasterclassPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState('loading'); // loading | email | code | member | ended
  const [email, setEmail] = useState(readEmail);
  const [code, setCode] = useState('');
  const [me, setMe] = useState(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(0);
  const videoRetried = useRef(false);
  const contact = INDIA_OFFICE.email;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Masterclass members · AUM AI';
    return setNoindex();
  }, []);

  const loadMe = useCallback(async () => {
    try {
      const { status, j } = await call('/me');
      if (status === 200) { setMe(j); setStage('member'); return; }
      if (status === 403) { setNotice(j.message || ''); setStage('ended'); return; }
      setStage('email');
    } catch (e) {
      setError('We could not reach the server. Check your internet connection and refresh the page.');
      setStage('email');
    }
  }, []);

  useEffect(() => { loadMe(); }, [loadMe]);

  useEffect(() => {
    if (wait <= 0) return undefined;
    const t = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  const sendCode = async (e) => {
    if (e) e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) { setError('Please type your email address, for example name@gmail.com.'); return; }
    setBusy(true); setError('');
    try {
      const { ok, j } = await call('/request-code', { email: clean });
      if (!ok) { setError(j.error || 'Something went wrong. Please try again.'); return; }
      saveEmail(clean); setEmail(clean);
      setNotice(j.message); setCode(''); setWait(RESEND_WAIT); setStage('code');
    } catch (err) {
      setError('We could not reach the server. Check your internet connection and try again.');
    } finally { setBusy(false); }
  };

  const verify = async (value) => {
    const digits = String(value ?? code).replace(/\D/g, '');
    if (digits.length !== 6) { setError('Type all 6 digits of the code from our email.'); return; }
    setBusy(true); setError('');
    try {
      const { status, ok, j } = await call('/verify', { email, code: digits });
      if (ok) {
        setMe(j); setStage('member'); setNotice('');
        if (location.pathname !== '/masterclass/my') navigate('/masterclass/my', { replace: true });
        return;
      }
      if (status === 403) { setNotice(j.error); setStage('ended'); return; }
      setError(j.error || 'That did not work. Please try again.');
    } catch (err) {
      setError('We could not reach the server. Check your internet connection and try again.');
    } finally { setBusy(false); }
  };

  const onCode = (v) => {
    const digits = v.replace(/\D/g, '').slice(0, 6);
    setCode(digits);
    if (digits.length === 6 && !busy) verify(digits);
  };

  const signOut = async () => {
    try { await call('/sign-out', {}); } catch (e) { /* the cookie ends anyway */ }
    setMe(null); setCode(''); setNotice(''); setError(''); setStage('email');
    if (location.pathname !== '/masterclass') navigate('/masterclass', { replace: true });
  };

  // A presigned video link lasts 4 hours: if it has run out, fetch a fresh one once.
  const onVideoError = () => {
    if (videoRetried.current) return;
    videoRetried.current = true;
    loadMe();
  };

  if (stage === 'loading') {
    return <div className="sc-root"><div className="sc-wrap mc-narrow mc-hero"><p className="mc-help" role="status">Opening your masterclass…</p></div></div>;
  }

  if (stage === 'member' && me) {
    const files = me.files || [];
    return (
      <div className="sc-root">
        <section className="mc-hero">
          <div className="sc-wrap">
            <div className="mc-top">
              <p className="sc-eyebrow">The Full Chair Method · Masterclass</p>
              <button type="button" className="sc-link" onClick={signOut}>Sign out</button>
            </div>
            <h1>Welcome, {me.display_name}</h1>
            <p className="mc-access">Your access is open until <b>{me.access_until_label}</b> ({daysText(me.days_left)}).</p>
            {location.state?.justPaid && <p className="mc-sent" role="status">Payment received, thank you. We have also emailed you how to sign in next time.</p>}
          </div>
        </section>

        <div className="sc-wrap">
          <section className="mc-section" aria-labelledby="mc-video-h">
            <h2 id="mc-video-h">The masterclass video</h2>
            {me.video && me.video.type === 'embed' && (
              <div className="mc-video">
                <iframe src={me.video.url} title="The Full Chair Method masterclass" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
              </div>
            )}
            {me.video && me.video.type === 'file' && (
              <div className="mc-video">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src={me.video.url} controls playsInline preload="metadata" controlsList="nodownload" onError={onVideoError} />
              </div>
            )}
            {!me.video && (
              <div className="mc-video mc-video-wait"><p style={{ margin: 0 }}>The video will appear here within 24 hours of the session.</p></div>
            )}
          </section>

          <section className="mc-section" aria-labelledby="mc-files-h">
            <h2 id="mc-files-h">{files.length ? `Your ${files.length} workbooks` : 'Your workbooks'}</h2>
            {files.length === 0 ? (
              <p className="sc-note">The workbooks will appear here soon. Please check again later today.</p>
            ) : (
              <>
                <ul className="mc-files">
                  {files.map((f) => (
                    <li key={f.name} className={`mc-file ${sysClass(f.system)}`}>
                      <span className="mc-badge">{badge(f)}</span>
                      <h3>{f.title}</h3>
                      {f.about && <p>{f.about}</p>}
                      <a className="sc-btn" href={`${API}/files/${encodeURIComponent(f.name)}`}>Download</a>
                    </li>
                  ))}
                </ul>
                <div className="mc-all">
                  {files.length > 1 && <a className="sc-btn sc-btn-ghost" href={`${API}/download-all`}>Download all {files.length} (one zip file)</a>}
                  <p className="mc-help">Open them in Excel or Google Sheets (File › Import).</p>
                </div>
              </>
            )}
          </section>

          <p className="mc-help" style={{ paddingTop: 32 }}>Something not working? Write to us at <a href={`mailto:${contact}`}>{contact}</a>.</p>
        </div>
      </div>
    );
  }

  if (stage === 'ended') {
    return (
      <div className="sc-root">
        <div className="sc-wrap mc-narrow mc-hero">
          <div className="sc-form mc-ended" role="alert">
            <p className="sc-eyebrow">The Full Chair Method · Masterclass</p>
            <h2>Your access has ended</h2>
            <p>{notice || `Your masterclass access has ended. Write to us at ${contact}.`}</p>
            <a className="sc-btn mc-btn-wide" href={`mailto:${contact}?subject=${encodeURIComponent('Masterclass access')}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Write to us</a>
            <button type="button" className="sc-link" onClick={signOut}>Sign in with a different email</button>
          </div>
        </div>
      </div>
    );
  }

  // Sign in: email, then the 6-digit code.
  return (
    <div className="sc-root">
      <div className="sc-wrap mc-narrow mc-hero">
        <p className="sc-eyebrow">The Full Chair Method · Masterclass</p>
        <h1>Sign in to your masterclass</h1>
        {stage === 'email' ? (
          <form className="sc-form" onSubmit={sendCode} noValidate>
            <p>Type the email you registered with. We will email you a 6-digit code. There is no password.</p>
            <label className="mc-label">Your email
              <input className="mc-input" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck="false"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com" autoFocus={!email} />
            </label>
            {error && <p className="sc-error" role="alert">{error}</p>}
            <button type="submit" className="sc-btn mc-btn-wide" disabled={busy}>{busy ? 'Sending…' : 'Send my code'}</button>
            <p className="mc-help">Not sure which email you used? It is the one our masterclass email came to. Or write to us at <a href={`mailto:${contact}`}>{contact}</a>.</p>
          </form>
        ) : (
          <form className="sc-form" onSubmit={(e) => { e.preventDefault(); verify(); }} noValidate>
            {notice && <p className="mc-sent" role="status">{notice}</p>}
            <label className="mc-label">The 6-digit code we sent to {email}
              <input className="mc-input mc-code" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]*" maxLength={6}
                value={code} onChange={(e) => onCode(e.target.value)} placeholder="______" autoFocus aria-describedby="mc-code-help" />
            </label>
            {error && <p className="sc-error" role="alert">{error}</p>}
            <button type="submit" className="sc-btn mc-btn-wide" disabled={busy}>{busy ? 'Checking…' : 'Sign in'}</button>
            <div className="mc-row-links">
              <button type="button" className="sc-link" onClick={() => sendCode()} disabled={busy || wait > 0}>
                {wait > 0 ? `Send a new code (in ${wait}s)` : 'Send a new code'}
              </button>
              <button type="button" className="sc-link" onClick={() => { setStage('email'); setError(''); setCode(''); }}>Use a different email</button>
            </div>
            <p className="mc-help" id="mc-code-help">No email after 5 minutes? Check Spam or Promotions, and check the email address above. Still nothing? Write to us at <a href={`mailto:${contact}`}>{contact}</a>.</p>
          </form>
        )}
        {stage === 'email' && (
          <p className="mc-help" style={{ paddingTop: 16 }}>Not registered yet? <Link to="/masterclass/register">Join the masterclass</Link>.</p>
        )}
      </div>
    </div>
  );
}
