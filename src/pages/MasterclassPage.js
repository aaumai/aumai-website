import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setNoindex } from '../utils/seo';
import { withYouTubeJsApi } from '../utils/videoFocus';
import { INDIA_OFFICE } from '../config/contact';
import MC from '../data/masterclass';
import MasterclassUnlockForm from '../components/MasterclassUnlockForm';
import { EP, call, fileUrl, downloadAllUrl, isPaid, validEmail } from '../lib/masterclassCheckout';
import './ScorecardPage.css';
import './MasterclassPage.css';

// Masterclass members area (owner 2026-10-18): members sign in with a 6-digit email
// code (no password). Owner 2026-10-25: anyone creates a FREE account here (name,
// clinic, WhatsApp, email) and watches the masterclass; one payment of the kit price
// unlocks every download. A free member sees the video first and the kit locked, with
// one Unlock button (#unlock). A paid member sees exactly the page from before
// 2026-10-25. Lifetime access (owner 2026-10-20). Private: noindex, and nothing here
// is in the prerendered HTML. The session is an HttpOnly cookie set by
// site-api.aumai.co.in (same site).

const EMAIL_STORE = 'aumai_mc_email';
const readEmail = () => { try { return localStorage.getItem(EMAIL_STORE) || ''; } catch (e) { return ''; } };
const saveEmail = (v) => { try { localStorage.setItem(EMAIL_STORE, v); } catch (e) { /* fine */ } };
const RESEND_WAIT = 30; // seconds before "Send a new code" works again
// The code screen survives a reload (or the mail app taking over the tab): { email, sentAt, via }.
const SENT_STORE = 'aumai_mc_code_sent';
const CODE_LIFE_MS = 15 * 60 * 1000;
const readSent = () => {
  try {
    const s = JSON.parse(localStorage.getItem(SENT_STORE) || 'null');
    return s && s.email && Date.now() - s.sentAt < CODE_LIFE_MS ? s : null;
  } catch (e) { return null; }
};
const saveSent = (v) => { try { if (v) localStorage.setItem(SENT_STORE, JSON.stringify(v)); else localStorage.removeItem(SENT_STORE); } catch (e) { /* fine */ } };
// `website` is a honeypot: never shown, never prefilled; the backend drops a sign-up that fills it.
const EMPTY_CREATE = { name: '', clinic: '', whatsapp: '', email: '', website: '' };

// kind comes from the backend (master_sheet | worksheet | skill | guide | slides | file); the extension is the fallback.
const kindOf = (f) => f.kind || (/.(xlsx|xls|csv)$/i.test(f.name) ? 'workbook' : 'file');
// One sheet replaces the 12 workbooks (owner 2026-10-21): the Clinic Master Sheet gets its own
// card, and any other spreadsheet the server still lists is not shown.
const isMasterSheet = (f) => f.kind === 'master_sheet' || /Master-Sheet/i.test(f.name);
const isSpreadsheet = (f) => /\.(xlsx|xls|csv)$/i.test(f.name);
const isPromptPack = (f) => /Prompt-Pack/i.test(f.name);
// The class slides as a PDF (owner 2026-10-23): shown under the video, not with the skill file.
const isSlides = (f) => f.kind === 'slides' || /Presentation/i.test(f.name);
const KIND_BADGE = { skill: 'Skill file', guide: 'Guide', file: 'File' };
const badge = (f) => KIND_BADGE[kindOf(f)] || 'File';
// The skill file first, then its guide. No printable leak worksheet any more: the leak is
// worked out on the Clinic Master Sheet's Leak tab (owner 2026-10-22).
const EXTRA_ORDER = { skill: 0, guide: 1, file: 2 };

// The kit as a free member sees it (owner 2026-10-25): the same files, in the paid page's
// order, one line each, no links. The Prompt Pack's HTML and PDF are one item. Until the
// server has the files, the public kit list stands in.
const kitListFor = (files) => {
  const sheet = files.find(isMasterSheet);
  const pack = files.find((f) => isPromptPack(f) && /\.html$/i.test(f.name)) || files.find(isPromptPack);
  const slides = files.find(isSlides);
  const extras = files.filter((f) => !isSpreadsheet(f) && !isPromptPack(f) && !isSlides(f)).sort((a, b) => (EXTRA_ORDER[kindOf(a)] ?? 9) - (EXTRA_ORDER[kindOf(b)] ?? 9));
  const items = [pack, sheet, slides, ...extras].filter(Boolean).map((f) => ({ key: f.name, title: f.title || f.name, about: f.about || '' }));
  if (items.length) return items;
  return MC.KIT.items.filter((k) => !k.wa && !/video/i.test(k.h)).map((k) => ({ key: k.h, title: k.h, about: k.t }));
};

const LockIcon = () => (
  <svg className="mc-lock" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg>
);

export default function MasterclassPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState('loading'); // loading | email | code | member | ended
  const [email, setEmail] = useState(() => location.state?.email || readEmail());
  const [cf, setCf] = useState(EMPTY_CREATE); // the free-account form
  const [code, setCode] = useState('');
  const [sentVia, setSentVia] = useState(''); // 'sign-in' | 'sign-up': which path sent the code
  const [me, setMe] = useState(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [createError, setCreateError] = useState('');
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(0);
  const videoRetried = useRef(false);
  const [packError, setPackError] = useState('');
  const [showUnlock, setShowUnlock] = useState(() => location.hash === '#unlock');
  const [justUnlocked, setJustUnlocked] = useState(!!location.state?.justUnlocked);
  const createRef = useRef(null);
  const unlockRef = useRef(null);
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
      const { status, j } = await call(EP.me);
      if (status === 200) { setMe(j); setStage('member'); return j; }
      if (status === 403) { setNotice(j.message || ''); setStage('ended'); return null; }
      const sent = readSent();
      if (sent) { setEmail(sent.email); setSentVia(sent.via || 'sign-in'); setNotice(`Use the code we sent to ${sent.email}.`); setStage('code'); return null; }
      setStage('email');
    } catch (e) {
      setError('We could not connect. Check your internet connection and refresh the page.');
      setStage('email');
    }
    return null;
  }, []);

  useEffect(() => { loadMe(); }, [loadMe]);

  useEffect(() => {
    if (wait <= 0) return undefined;
    const t = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  // #create (from "Watch free" on the sales page) lands on the free-account form;
  // #unlock (from a locked download) lands on the Unlock button.
  useEffect(() => {
    if (location.hash === '#create' && stage === 'email' && createRef.current) {
      createRef.current.scrollIntoView({ block: 'start' });
      const first = createRef.current.querySelector('input');
      if (first) first.focus({ preventScroll: true });
    }
    if (location.hash === '#unlock' && stage === 'member' && unlockRef.current) {
      unlockRef.current.scrollIntoView({ block: 'start' });
    }
  }, [location.hash, stage]);

  const sendCode = async (e) => {
    if (e) e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!validEmail(clean)) { setError('Please type your email address, for example name@gmail.com.'); return; }
    setBusy(true); setError('');
    try {
      const { ok, j } = await call(EP.requestCode, { email: clean });
      if (!ok) { setError(j.error || 'Something went wrong. Please try again.'); return; }
      saveEmail(clean); setEmail(clean); saveSent({ email: clean, sentAt: Date.now(), via: 'sign-in' }); setSentVia('sign-in');
      setNotice(j.message); setCode(''); setWait(RESEND_WAIT); setStage('code');
    } catch (err) {
      setError('We could not connect. Check your internet connection and try again.');
    } finally { setBusy(false); }
  };

  // The free account (owner 2026-10-25): sign-up answers the same whether or not the
  // email is new, then the code step takes over.
  const createAccount = async (e) => {
    e.preventDefault();
    const clean = cf.email.trim().toLowerCase();
    if (!cf.name.trim()) { setCreateError('Please type your name.'); return; }
    if (!cf.whatsapp.replace(/\D/g, '').length) { setCreateError('Please type your WhatsApp number.'); return; }
    if (!validEmail(clean)) { setCreateError('Please type your email address, for example name@gmail.com.'); return; }
    setBusy(true); setCreateError('');
    try {
      const { ok, j } = await call(EP.signUp, { name: cf.name.trim(), email: clean, whatsapp: cf.whatsapp.trim(), clinic: cf.clinic.trim() || undefined, website: cf.website || '' });
      if (!ok) { setCreateError(j.error || 'Something went wrong. Please try again.'); return; }
      saveEmail(clean); setEmail(clean); saveSent({ email: clean, sentAt: Date.now(), via: 'sign-up' }); setSentVia('sign-up');
      setNotice(j.message || `We've emailed your code to ${clean}.`); setCode(''); setError(''); setWait(RESEND_WAIT); setStage('code');
      if (location.hash) navigate(MC.PATHS.signIn, { replace: true });
    } catch (err) {
      setCreateError('We could not connect. Check your internet connection and try again.');
    } finally { setBusy(false); }
  };

  const verify = async (value) => {
    const digits = String(value ?? code).replace(/\D/g, '');
    if (digits.length !== 6) { setError('Type all 6 digits of the code from our email.'); return; }
    setBusy(true); setError('');
    try {
      const { status, ok, j } = await call(EP.verify, { email, code: digits });
      if (ok) {
        saveSent(null);
        setMe(j); setStage('member'); setNotice('');
        if (location.pathname !== MC.PATHS.my) navigate(MC.PATHS.my, { replace: true });
        return;
      }
      if (status === 403) { setNotice(j.error); setStage('ended'); return; }
      setError(j.error || 'That did not work. Please try again.');
    } catch (err) {
      setError('We could not connect. Check your internet connection and try again.');
    } finally { setBusy(false); }
  };

  const onCode = (v) => {
    const digits = v.replace(/\D/g, '').slice(0, 6);
    setCode(digits);
    if (digits.length === 6 && !busy) verify(digits);
  };

  const backToStart = (toCreate) => {
    saveSent(null); setStage('email'); setError(''); setCode(''); setNotice('');
    if (toCreate) { setCf((c) => ({ ...c, email: c.email || email })); navigate(MC.PATHS.create, { replace: true }); }
  };

  const signOut = async () => {
    try { await call(EP.signOut, {}); } catch (e) { /* the cookie ends anyway */ }
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

  // The payment is confirmed: the same session is now paid, so /me says so.
  const onUnlocked = async () => {
    await loadMe();
    setShowUnlock(false);
    setJustUnlocked(true);
    window.scrollTo(0, 0);
  };

  if (stage === 'loading') {
    return <div className="sc-root"><div className="sc-wrap mc-narrow mc-hero"><p className="mc-help" role="status">Opening your masterclass…</p></div></div>;
  }

  if (stage === 'member' && me && !isPaid(me)) {
    const files = me.files || [];
    const kit = kitListFor(files);
    const qa = me.live_qa && (me.live_qa.at_label || me.live_qa.at || me.live_qa.link) ? me.live_qa : null;
    return (
      <div className="sc-root">
        <section className="mc-hero">
          <div className="sc-wrap">
            <div className="mc-top">
              <p className="sc-eyebrow">The Full Chair Method · Masterclass</p>
              <button type="button" className="sc-link" onClick={signOut}>Sign out</button>
            </div>
            <h1>Welcome, {me.display_name}</h1>
            <p className="mc-access">{MC.MEMBER.welcomeFree}</p>
            {justUnlocked && <p className="mc-sent" role="status">Payment received, thank you. Your kit is opening: if it still shows as locked, refresh this page in a minute.</p>}
          </div>
        </section>

        <div className="sc-wrap">
          <section className="mc-section" aria-labelledby="mc-video-h" style={{ paddingTop: 8 }}>
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

          {qa && (
            <section className="mc-section mc-pack" aria-labelledby="mc-qa-h">
              <h2 id="mc-qa-h">{qa.title || 'Live Q&A'}</h2>
              <p>{qa.at_label || qa.at}{qa.note ? ` · ${qa.note}` : ''}</p>
              {qa.link && <div className="mc-all"><a className="sc-btn" href={qa.link} target="_blank" rel="noopener noreferrer">{qa.button || 'Join the live Q&A'}</a></div>}
            </section>
          )}

          <p className="mc-sent mc-wa" style={{ marginTop: 20 }}>
            {MC.MEMBER_HELP.replace(MC.WHATSAPP.display, '')}
            <a href={MC.WHATSAPP.link} target="_blank" rel="noopener noreferrer">{MC.WHATSAPP.display}</a>
          </p>

          {/* The kit, locked: titles and one line each, no download links at all (owner 2026-10-25). */}
          <section className="mc-section mc-pack mc-kit" id="unlock" ref={unlockRef} aria-labelledby="mc-kit-h">
            <h2 id="mc-kit-h">{MC.MEMBER.kitTitle}</h2>
            <p>{MC.MEMBER.kitLead}</p>
            <ul className="mc-kit-list">
              {kit.map((k) => (
                <li key={k.key}>
                  <LockIcon />
                  <div><h3><span className="mc-sr">Locked: </span>{k.title}</h3>{k.about && <p>{k.about}</p>}</div>
                </li>
              ))}
            </ul>
            {justUnlocked && !showUnlock && (
              <div className="mc-all">
                <button type="button" className="sc-btn sc-btn-ghost mc-btn-wide mc-unlock-btn" onClick={loadMe}>Check again</button>
              </div>
            )}
            {!justUnlocked && !showUnlock && (
              <div className="mc-all">
                <button type="button" className="sc-btn mc-btn-wide mc-unlock-btn" onClick={() => setShowUnlock(true)}>{(me.price && me.price.label) ? `Unlock the kit · ${me.price.label} once` : MC.CTA.unlock}</button>
              </div>
            )}
            {showUnlock && (
              <MasterclassUnlockForm me={me} price={me.price} onPaid={onUnlocked} onAlreadyPaid={onUnlocked} onCancel={() => setShowUnlock(false)} contact={contact} />
            )}
          </section>

          <p className="mc-help" style={{ paddingTop: 32 }}>Something not working? Write to us at <a href={`mailto:${contact}`}>{contact}</a>.</p>
        </div>
      </div>
    );
  }

  if (stage === 'member' && me) {
    const files = me.files || [];
    const sheet = files.find(isMasterSheet);
    // The Prompt Pack (owner 2026-10-20) gets its own card at the top, so it is not repeated below.
    const packHtml = files.find((f) => isPromptPack(f) && /\.html$/i.test(f.name));
    const packPdf = files.find((f) => isPromptPack(f) && /\.pdf$/i.test(f.name));
    const slides = files.find(isSlides);
    const extras = files.filter((f) => !isSpreadsheet(f) && !isPromptPack(f) && !isSlides(f)).sort((a, b) => (EXTRA_ORDER[kindOf(a)] ?? 9) - (EXTRA_ORDER[kindOf(b)] ?? 9));
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
            {justUnlocked && <p className="mc-sent" role="status">{MC.MEMBER.unlocked}</p>}
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

          {slides && (
            <section className="mc-section mc-pack" aria-labelledby="mc-slides-h">
              <h2 id="mc-slides-h">{slides.title || 'The Full Chair Method — the presentation'}</h2>
              <p>{slides.about || 'Every slide from the class, to refer to any time.'}</p>
              <div className="mc-all">
                <a className="sc-btn" href={fileUrl(slides)}>Download the slides (PDF)</a>
              </div>
            </section>
          )}

          {extras.length > 0 && (
            <section className="mc-section" aria-labelledby="mc-extras-h">
              <h2 id="mc-extras-h">Your Claude skill file</h2>
              <ul className="mc-files">{extras.map(fileCard)}</ul>
            </section>
          )}

          {files.length > 0 && (
            <section className="mc-section" aria-label="Download help">
              {files.length > 1 && (
                <div className="mc-all">
                  <a className="sc-btn sc-btn-ghost" href={downloadAllUrl()}>Download everything: all {files.length} files (one zip file)</a>
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
            <Link className="sc-btn mc-btn-wide" to={MC.PATHS.register} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Join again</Link>
            <a className="sc-btn sc-btn-ghost mc-btn-wide" href={`mailto:${contact}?subject=${encodeURIComponent('Masterclass access')}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Write to us</a>
            <button type="button" className="sc-link" onClick={signOut}>Sign in with a different email</button>
          </div>
        </div>
      </div>
    );
  }

  // The code step (after Sign in or Create your free account).
  if (stage === 'code') {
    return (
      <div className="sc-root">
        <div className="sc-wrap mc-narrow mc-hero">
          <p className="sc-eyebrow">The Full Chair Method · Masterclass</p>
          <h1>{sentVia === 'sign-up' ? 'One more step' : 'Sign in to your masterclass'}</h1>
          <form className="sc-form" onSubmit={(e) => { e.preventDefault(); verify(); }} noValidate>
            {notice && <p className="mc-sent" role="status">{notice}</p>}
            <label className="mc-label">The 6-digit code for {email}
              <input className="mc-input mc-code" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]*" maxLength={6}
                value={code} onChange={(e) => onCode(e.target.value)} placeholder="______" autoFocus aria-describedby="mc-code-help" />
            </label>
            {error && <p className="sc-error" role="alert">{error}</p>}
            <button type="submit" className="sc-btn mc-btn-wide" disabled={busy}>{busy ? 'Checking…' : (sentVia === 'sign-up' ? 'Open my masterclass' : 'Sign in')}</button>
            {sentVia !== 'sign-up' && (
              <p className="mc-help" style={{ fontSize: 15, color: 'var(--sc-ink)' }}>No account yet? <button type="button" className="sc-link" onClick={() => backToStart(true)}>Create your free account</button>: it takes a minute, and the code arrives straight away.</p>
            )}
            <div className="mc-row-links">
              <button type="button" className="sc-link" onClick={() => sendCode()} disabled={busy || wait > 0}>
                {wait > 0 ? `Send a new code (in ${wait}s)` : 'Send a new code'}
              </button>
              <button type="button" className="sc-link" onClick={() => backToStart(false)}>Use a different email</button>
            </div>
            <p className="mc-help" id="mc-code-help">No email after 5 minutes? Check Spam or Promotions, and check the email address above. Still nothing? Write to us at <a href={`mailto:${contact}`}>{contact}</a>.</p>
          </form>
        </div>
      </div>
    );
  }

  // Two paths on one screen (owner 2026-10-25): sign in, or create a free account.
  const setC = (k) => (e) => setCf({ ...cf, [k]: e.target.value });
  const focusCreate = location.hash === '#create';
  return (
    <div className="sc-root">
      <div className="sc-wrap mc-wide mc-hero">
        <p className="sc-eyebrow">The Full Chair Method · Masterclass</p>
        <h1>{MC.SIGNIN.title}</h1>
        <p className="mc-access">{MC.SIGNIN.sub}</p>
        {location.state?.justPaid && (
          <p className="mc-sent" role="status">Payment received. Sign in with the email you used{location.state.email ? `: ${location.state.email}` : ''}.</p>
        )}
        <div className={`mc-two${focusCreate ? ' mc-create-first' : ''}`}>
          <form className="sc-form" onSubmit={sendCode} noValidate aria-labelledby="mc-signin-h">
            <h2 id="mc-signin-h">{MC.SIGNIN.signInTitle}</h2>
            <p>{MC.SIGNIN.signInBlurb}</p>
            <label className="mc-label">Your email
              <input className="mc-input" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck="false"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com" autoFocus={!focusCreate && !email} />
            </label>
            {error && <p className="sc-error" role="alert">{error}</p>}
            <button type="submit" className="sc-btn mc-btn-wide" disabled={busy}>{busy ? 'Sending…' : 'Send my code'}</button>
            <p className="mc-help">Not sure which email you used? It is the one our masterclass email came to. Or write to us at <a href={`mailto:${contact}`}>{contact}</a>.</p>
          </form>

          <form className="sc-form mc-create" id="create" ref={createRef} onSubmit={createAccount} noValidate aria-labelledby="mc-create-h">
            <h2 id="mc-create-h">{MC.SIGNIN.createTitle}</h2>
            <p>{MC.SIGNIN.createBlurb}</p>
            <div className="sc-fields" style={{ gridTemplateColumns: '1fr' }}>
              <label>Your name<input className="mc-input" value={cf.name} onChange={setC('name')} placeholder="Dr Meera Joshi" autoComplete="name" autoFocus={focusCreate} required /></label>
              <label>Clinic name<input className="mc-input" value={cf.clinic} onChange={setC('clinic')} placeholder="Smile Care Clinic" autoComplete="organization" /></label>
              <label>WhatsApp number<input className="mc-input" type="tel" inputMode="tel" value={cf.whatsapp} onChange={setC('whatsapp')} placeholder="98765 43210" autoComplete="tel-national" required /></label>
              <label>Email (your code comes here)<input className="mc-input" type="email" inputMode="email" autoCapitalize="none" spellCheck="false" value={cf.email} onChange={setC('email')} placeholder="name@gmail.com" autoComplete="email" required /></label>
            </div>
            {/* Honeypot: off-screen, not focusable, never prefilled. A real person never fills it. */}
            <div className="mc-hp" aria-hidden="true">
              <label htmlFor="mc-website">Website</label>
              <input id="mc-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={cf.website} onChange={setC('website')} />
            </div>
            {createError && <p className="sc-error" role="alert">{createError}</p>}
            <button type="submit" className="sc-btn mc-btn-wide" disabled={busy}>{busy ? 'One moment…' : 'Create my free account'}</button>
            <p className="mc-help">Want the kit straight away? <Link to={MC.PATHS.register}>{MC.CTA.kitOnce}</Link>.</p>
          </form>
        </div>
        <p className="mc-help" style={{ paddingTop: 8 }}>New here? <Link to={MC.PATHS.info}>See what the masterclass covers</Link>.</p>
      </div>
    </div>
  );
}
