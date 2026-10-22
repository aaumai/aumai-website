import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setNoindex } from '../utils/seo';
import { withYouTubeJsApi } from '../utils/videoFocus';
import { INDIA_OFFICE } from '../config/contact';
import MC from '../data/masterclass';
import './ScorecardPage.css';
import './MasterclassPage.css';

// Masterclass members area (owner 2026-10-18): attendees of The Full Chair Method
// sign in with a 6-digit email code (no password), then watch the video and
// download the Clinic Master Sheet and the other files, with lifetime access (owner 2026-10-20). Accounts are created by us at
// /masterclass-admin. Private: noindex, and nothing here is in the prerendered HTML.
// The session is an HttpOnly cookie set by site-api.aumai.co.in (same site).

const API = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/masterclass`;
const EMAIL_STORE = 'aumai_mc_email';
const readEmail = () => { try { return localStorage.getItem(EMAIL_STORE) || ''; } catch (e) { return ''; } };
const saveEmail = (v) => { try { localStorage.setItem(EMAIL_STORE, v); } catch (e) { /* fine */ } };
const RESEND_WAIT = 30; // seconds before "Send a new code" works again
// The code screen survives a reload (or the mail app taking over the tab): { email, sentAt }.
const SENT_STORE = 'aumai_mc_code_sent';
const CODE_LIFE_MS = 15 * 60 * 1000;
const readSent = () => {
  try {
    const s = JSON.parse(localStorage.getItem(SENT_STORE) || 'null');
    return s && s.email && Date.now() - s.sentAt < CODE_LIFE_MS ? s : null;
  } catch (e) { return null; }
};
const saveSent = (v) => { try { if (v) localStorage.setItem(SENT_STORE, JSON.stringify(v)); else localStorage.removeItem(SENT_STORE); } catch (e) { /* fine */ } };

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

// kind comes from the backend (master_sheet | worksheet | skill | guide | file); the extension is the fallback.
const kindOf = (f) => f.kind || (/.(xlsx|xls|csv)$/i.test(f.name) ? 'workbook' : 'file');
// One sheet replaces the 12 workbooks (owner 2026-10-21): the Clinic Master Sheet gets its own
// card, and any other spreadsheet the server still lists is not shown.
const isMasterSheet = (f) => f.kind === 'master_sheet' || /Master-Sheet/i.test(f.name);
const isSpreadsheet = (f) => /\.(xlsx|xls|csv)$/i.test(f.name);
const isPromptPack = (f) => /Prompt-Pack/i.test(f.name);
const fileUrl = (f) => `${API}/files/${encodeURIComponent(f.name)}`;
const KIND_BADGE = { worksheet: 'Worksheet', skill: 'Skill file', guide: 'Guide', file: 'File' };
const badge = (f) => KIND_BADGE[kindOf(f)] || 'File';
// The worksheet first (it is printed before the session starts), then the skill file, then its guide.
const EXTRA_ORDER = { worksheet: 0, skill: 1, guide: 2, file: 3 };

export default function MasterclassPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState('loading'); // loading | email | code | member | ended
  const [email, setEmail] = useState(() => location.state?.email || readEmail());
  const [code, setCode] = useState('');
  const [me, setMe] = useState(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(0);
  const videoRetried = useRef(false);
  const [packError, setPackError] = useState('');
  const contact = INDIA_OFFICE.email;

  // The Prompt Pack opens in a new tab (owner 2026-10-20), members only: the tab is
  // opened on the tap itself (so no pop-up blocker), then filled with the pack fetched
  // through the signed-in files route. Nothing is public. Pop-ups blocked → the link downloads it.
  const openPack = async (e, f) => {
    e.preventDefault();
    setPackError('');
    const w = window.open('', '_blank');
    if (!w) { window.location.href = fileUrl(f); return; }
    try { w.document.title = 'Prompt Pack'; w.document.body.textContent = 'Opening your Prompt Pack…'; } catch (err) { /* fine */ }
    try {
      const r = await fetch(fileUrl(f), { credentials: 'include', headers: { Accept: 'application/octet-stream' } });
      if (!r.ok) throw new Error(String(r.status));
      const blob = new Blob([await r.arrayBuffer()], { type: 'text/html;charset=utf-8' });
      w.opener = null;
      w.location.href = URL.createObjectURL(blob);
    } catch (err) {
      w.close();
      setPackError('We could not open the Prompt Pack. Refresh this page and try again, or use Download PDF.');
    }
  };

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
      const sent = readSent();
      if (sent) { setEmail(sent.email); setNotice(`Use the code we sent to ${sent.email}.`); setStage('code'); return; }
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
      saveEmail(clean); setEmail(clean); saveSent({ email: clean, sentAt: Date.now() });
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
        saveSent(null);
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
    saveSent(null);
    setMe(null); setCode(''); setNotice(''); setError(''); setStage('email');
    if (location.pathname !== MC.PATHS.signIn) navigate(MC.PATHS.signIn, { replace: true });
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
    const sheet = files.find(isMasterSheet);
    // The Prompt Pack (owner 2026-10-20) gets its own card at the top, so it is not repeated below.
    const packHtml = files.find((f) => isPromptPack(f) && /\.html$/i.test(f.name));
    const packPdf = files.find((f) => isPromptPack(f) && /\.pdf$/i.test(f.name));
    const extras = files.filter((f) => !isSpreadsheet(f) && !isPromptPack(f)).sort((a, b) => (EXTRA_ORDER[kindOf(a)] ?? 9) - (EXTRA_ORDER[kindOf(b)] ?? 9));
    const fileCard = (f) => (
      <li key={f.name} className="mc-file">
        <span className="mc-badge">{badge(f)}</span>
        <h3>{f.title}</h3>
        {f.about && <p>{f.about}</p>}
        {kindOf(f) === 'skill' && <p className="mc-file-how">Upload it in claude.ai → Settings → Customize → Skills → + Add → Upload skill. Code execution must be on (Settings → Capabilities → Run code in the cloud).</p>}
        <a className="sc-btn" href={fileUrl(f)}>Download</a>
      </li>
    );
    return (
      <div className="sc-root">
        <section className="mc-hero">
          <div className="sc-wrap">
            <div className="mc-top">
              <p className="sc-eyebrow">The Full Chair Method · Masterclass</p>
              <button type="button" className="sc-link" onClick={signOut}>Sign out</button>
            </div>
            <h1>Welcome, {me.display_name}</h1>
            <p className="mc-access">You have <b>lifetime access</b>: come back any time.</p>
            {location.state?.justPaid && (
              <p className="mc-sent" role="status">Payment received, thank you. We emailed sign-in steps to <b>{me.email}</b>. Wrong address? Write to us at <a href={`mailto:${contact}`}>{contact}</a>.</p>
            )}
          </div>
        </section>

        <div className="sc-wrap">
          {(packHtml || packPdf) && (
            <section className="mc-section mc-pack" aria-labelledby="mc-pack-h">
              <h2 id="mc-pack-h">Your Prompt Pack</h2>
              <p>Every prompt from the masterclass, grouped by system. Copy, paste into Claude, done.</p>
              <div className="mc-all">
                {packHtml && <a className="sc-btn" href={fileUrl(packHtml)} onClick={(e) => openPack(e, packHtml)}>Open Prompt Pack (with Copy buttons)</a>}
                {packPdf && <a className="sc-btn sc-btn-ghost" href={fileUrl(packPdf)}>Download PDF</a>}
              </div>
              {packHtml && <p className="mc-help">Opens in a new tab. Tap Copy next to any prompt and paste it into Claude.</p>}
              {packError && <p className="sc-error" role="alert">{packError}</p>}
            </section>
          )}

          {/* One sheet for the whole clinic (owner 2026-10-21): one download, then the steps for Google Sheets. */}
          <section className="mc-section mc-pack" aria-labelledby="mc-sheet-h">
            <h2 id="mc-sheet-h">{MC.MASTER_SHEET.title}</h2>
            <p>{MC.MASTER_SHEET.short}</p>
            {sheet ? (
              <>
                <div className="mc-all">
                  <a className="sc-btn" href={fileUrl(sheet)}>{MC.MASTER_SHEET.button}</a>
                </div>
                <p className="mc-help">{MC.MASTER_SHEET.excel}</p>
                <ol className="mc-steps">
                  {MC.MASTER_SHEET.steps.map((s) => <li key={s}>{s}</li>)}
                </ol>
                <p className="mc-help">{MC.MASTER_SHEET.then}</p>
              </>
            ) : (
              <p className="sc-note">{MC.MASTER_SHEET.soon}</p>
            )}
          </section>

          {/* No live Q&A (owner 2026-10-19): questions go to WhatsApp, any time. */}
          <p className="mc-sent mc-wa" style={{ marginTop: 20 }}>
            {MC.MEMBER_HELP.replace(MC.WHATSAPP.display, '')}
            <a href={MC.WHATSAPP.link} target="_blank" rel="noopener noreferrer">{MC.WHATSAPP.display}</a>
          </p>

          <section className="mc-section" aria-labelledby="mc-video-h">
            <h2 id="mc-video-h">The masterclass video</h2>
            {me.video && me.video.type === 'embed' && (
              <div className="mc-video">
                <iframe src={withYouTubeJsApi(me.video.url)} title="The Full Chair Method masterclass" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
              </div>
            )}
            {me.video && me.video.type === 'file' && (
              <div className="mc-video">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video src={me.video.url} controls playsInline preload="metadata" controlsList="nodownload" onError={onVideoError} />
              </div>
            )}
            {!me.video && (
              <div className="mc-video mc-video-wait"><p style={{ margin: 0 }}>{me.video_by_label ? `The video will be here by ${me.video_by_label}.` : 'The video will appear here soon.'}</p></div>
            )}
          </section>

          {extras.length > 0 && (
            <section className="mc-section" aria-labelledby="mc-extras-h">
              <h2 id="mc-extras-h">Your worksheet and Claude skill file</h2>
              <ul className="mc-files">{extras.map(fileCard)}</ul>
            </section>
          )}

          {files.length > 0 && (
            <section className="mc-section" aria-label="Download help">
              {files.length > 1 && (
                <div className="mc-all">
                  <a className="sc-btn sc-btn-ghost" href={`${API}/download-all`}>Download everything: all {files.length} files (one zip file)</a>
                </div>
              )}
              <p className="mc-help">If Download does nothing, open this page in Chrome or Safari (Instagram and Facebook’s own browsers often block downloads).</p>
            </section>
          )}

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
            <h2>Your access is closed</h2>
            <p>{notice || `Your masterclass access is closed. Write to us at ${contact}.`}</p>
            <Link className="sc-btn mc-btn-wide" to="/masterclass/register" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Join again</Link>
            <a className="sc-btn sc-btn-ghost mc-btn-wide" href={`mailto:${contact}?subject=${encodeURIComponent('Masterclass access')}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Write to us</a>
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
            {location.state?.justPaid && (
              <p className="mc-sent" role="status">Payment received. Sign in with the email you used{location.state.email ? `: ${location.state.email}` : ''}.</p>
            )}
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
              <button type="button" className="sc-link" onClick={() => { saveSent(null); setStage('email'); setError(''); setCode(''); setNotice(''); }}>Use a different email</button>
            </div>
            <p className="mc-help" id="mc-code-help">No email after 5 minutes? Check Spam or Promotions, and check the email address above. Still nothing? Write to us at <a href={`mailto:${contact}`}>{contact}</a>.</p>
          </form>
        )}
        {stage === 'email' && (
          <p className="mc-help" style={{ paddingTop: 16 }}>Not registered yet? <Link to={MC.PATHS.info}>See what the masterclass covers</Link> or <Link to={MC.PATHS.register}>register</Link>.</p>
        )}
      </div>
    </div>
  );
}
