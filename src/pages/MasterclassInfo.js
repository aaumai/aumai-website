import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { withYouTubeJsApi } from '../utils/videoFocus';
import { INDIA_OFFICE } from '../config/contact';
import MC from '../data/masterclass';
import { API, EP, accessLevel, call, canWatch, priceLabels, readUtm, settlePending, useMasterclassCheckout, validEmail } from '../lib/masterclassCheckout';
import './HomeClinic.css';
import './MasterclassInfo.css';

// The Full Chair Method: the public information page (owner 2026-10-19). What the
// masterclass is, what it is worth, what to expect. Built from the site's own
// clinic system (.ch-*) under the "quiet luxury" theme (styles/lux.css), so it
// reads like every other page. Every word is in src/data/masterclass.js, shared
// with scripts/prerender.js. Right under the title (owner 2026-10-31): one field, the
// email; Continue opens the ₹299 Razorpay payment at once (no code first); then the
// video plays in place. The video URL comes only from /me.video. The kit is ₹999 in
// total (₹700 more after joining); members sign in at /masterclass/sign-in.

const C_KEY = { Convert: 'convert', Confirm: 'confirm', Care: 'care', 'Come back': 'comeback' };

const WaLink = ({ children, className }) => (
  <a className={className} href={MC.WHATSAPP.link} target="_blank" rel="noopener noreferrer">{children}</a>
);
// The WhatsApp number inside a sentence becomes a link.
const withWa = (text) => {
  const parts = String(text).split(MC.WHATSAPP.display);
  return parts.length < 2 ? text : parts.reduce((acc, p, i) => (i ? [...acc, <WaLink key={i}>{MC.WHATSAPP.display}</WaLink>, p] : [p]), []);
};

// Line icons for "What you get", in the order of MC.KIT.items.
const ICONS = [
  'M5 4h14a1 1 0 011 1v11a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zm5 4.5v6l5-3-5-3zM8 21h8', // video
  'M4 4h16v16H4zM4 9h16M4 14h16M9 4v16M14 4v16', // workbooks (grid)
  'M5 20V10M10 20V4M15 20v-7M20 20v-11M3 20h18', // scorecard (bars)
  'M12 3l2.2 5.3L20 9l-4.4 3.8L17 18.5 12 15.6 7 18.5l1.4-5.7L4 9l5.8-.7z', // skill (star)
  'M4 5h16v10H8l-4 4zM8 9h8M8 12h5', // scripts (speech)
  'M4 4h16v16H4zM4 9h16M9 9v11M12 17v-3M15 17v-5M18 17v-2', // Leak tab (sheet with figures)
  'M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9zm-1-6l5-3-5-3v6z', // WhatsApp Q&A (round)
  'M12 2l3 6.5 7 .8-5.2 4.8 1.4 6.9L12 17.6 5.8 21l1.4-6.9L2 9.3l7-.8z', // bonus (star)
];
const Icon = ({ d }) => (
  <svg className="mi-icon" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const Pic = ({ img, eager, className }) => (
  <img className={className} src={img.src} width={img.w} height={img.h} alt={img.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
);


// The API's labels swapped into the shared words (the words carry the fallback constants).
const live = (text, L) => String(text)
  .split(MC.ENTRY_LABEL).join(L.entry)
  .split(MC.UPGRADE_LABEL).join(L.upgrade)
  .split(MC.PRICE_LABEL).join(L.kitTotal);

// The money-back line and the terms, under every ₹299 button (owner 2026-10-31: the ad's words).
const PayTerms = ({ entry }) => (
  <>
    <p className="mi-gate-money">{MC.GATE.moneyBack(entry)}</p>
    <p className="mi-gate-consent">
      Secure payment by Razorpay: UPI, card or net banking. By continuing you agree to the <Link to="/terms" target="_blank" rel="noopener">terms</Link> and
      the <Link to="/refund#masterclass" target="_blank" rel="noopener">money-back promise</Link>. {MC.GATE.consent}
    </p>
  </>
);

// What was typed into the form in the page's HTML before this script arrived (scripts/prerender.js puts the
// same form there, id mi-pre-email), or ?email= from that form sent before the script loaded. Read during
// the first render, while that HTML is still on screen. The address leaves the URL at once.
const earlyEmail = () => {
  try {
    const el = document.getElementById('mi-pre-email');
    const typed = el && el.value ? { email: el.value, focus: document.activeElement === el } : null;
    const q = new URLSearchParams(window.location.search);
    const fromUrl = q.get('email');
    if (fromUrl) {
      q.delete('email');
      const rest = q.toString();
      window.history.replaceState(window.history.state, '', `${window.location.pathname}${rest ? `?${rest}` : ''}${window.location.hash || '#watch'}`);
    }
    if (typed) return typed;
    if (fromUrl) return { email: fromUrl.slice(0, 160), focus: false };
  } catch (e) { /* nothing typed yet */ }
  return { email: '', focus: false };
};

/**
 * Where the video is (owner 2026-10-31: "just allow them to sign up with email directly"). ONE field:
 * Continue → POST /join → the ₹299 Razorpay Checkout opens at once, email prefilled and locked, and
 * Razorpay asks for the phone. No code before paying. A new email is signed in by that reply, so when
 * the payment lands the video plays here; closing the payment window shows the one-button pay step.
 * An email that already has the masterclass pays nothing: the backend emails a real sign-in code and
 * the code step shows (409 already_member). A refusal (honeypot, too many tries) is shown as it is,
 * never as "check your email". `mc_trap` is a honeypot the visitor never sees.
 */
function WatchGate({ onMember, onPaid, entryLabel, contact, utm }) {
  const [early] = useState(earlyEmail);
  const [email, setEmail] = useState(early.email);
  const [trap, setTrap] = useState('');
  const [step, setStep] = useState('form'); // form | code
  const [code, setCode] = useState('');
  const [codeEmail, setCodeEmail] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false); // the code check
  const [error, setError] = useState(''); // the code step's own error
  const inputRef = useRef(null);
  const joined = useRef(null); // the /join reply: was this browser signed in by it?
  const co = useMasterclassCheckout({
    onPaid,
    contact,
    onAlreadyPaid: () => onMember(null), // their own session can already watch: /me shows the video
    onAlreadyMember: (j) => { setCodeEmail(j.email || email.trim().toLowerCase()); setCode(''); setError(''); setStep('code'); },
    // Closed the payment window: a signed-in new account gets the one-button pay step; otherwise the form stays.
    onDismiss: () => { if (joined.current && joined.current.signed_in) onMember(null); else setNote(MC.GATE.dismissed); },
  });
  useEffect(() => {
    if (early.focus && inputRef.current) {
      inputRef.current.focus();
      try { const n = inputRef.current.value.length; inputRef.current.setSelectionRange(n, n); } catch (e) { /* type=email has no caret API */ }
    }
  }, [early.focus]);

  const submit = (e) => {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    setNote('');
    if (!validEmail(clean)) { co.setError('Please type your email address, for example name@gmail.com.'); return; }
    co.pay(
      { product: 'entry', agree: true, email: clean, mc_trap: trap, utm: utm || {}, referrer: document.referrer || null },
      { path: EP.join, lead: true, onReply: (j) => { joined.current = j; } },
    );
  };
  const verify = async (e) => {
    e.preventDefault();
    const digits = code.replace(/\D/g, '');
    if (digits.length !== 6) { setError('Type the 6-digit code from our email.'); return; }
    setBusy(true); setError('');
    try {
      const { ok, j } = await call(EP.verify, { email: codeEmail, code: digits });
      if (!ok) { setError(j.error || 'That code is not right or has expired. Check the newest email.'); return; }
      onMember(j);
    } catch (err) {
      setError('We could not connect. Check your internet connection and try again.');
    } finally { setBusy(false); }
  };

  if (co.stage === 'confirming') {
    return (
      <div className="mi-gate" role="status" data-testid="mi-gate">
        <h2 id="mi-gate-h">{MC.JOIN.confirmTitle}</h2>
        <p className="mi-gate-blurb">{co.confirmMsg || 'We are checking your payment. This can take a few minutes.'}</p>
        {co.error && <p className="mi-gate-error" role="alert">{co.error}</p>}
        <button type="button" className="ch-btn ch-btn-primary mi-gate-btn" onClick={co.checkStatus} disabled={co.checking}>{co.checking ? 'Checking…' : 'Check again'}</button>
        <p className="mi-gate-consent">{MC.JOIN.confirmHelp} Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
        {co.hasPending && <button type="button" className="mi-gate-link" onClick={co.startAgain}>I did not pay. Start again</button>}
      </div>
    );
  }

  if (step === 'code') {
    return (
      <div className="mi-gate" data-testid="mi-gate">
        <form onSubmit={verify} noValidate>
          <h2 id="mi-gate-h">{MC.GATE.codeTitle}</h2>
          <p className="mi-gate-blurb">{MC.GATE.codeBlurb} <b>{codeEmail}</b>. {MC.GATE.codeHelp}</p>
          <label className="mi-gate-one-label">6-digit code<input inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value)} maxLength={7} required autoFocus /></label>
          {error && <p className="mi-gate-error" role="alert">{error}</p>}
          <button type="submit" className="ch-btn ch-btn-primary mi-gate-btn" disabled={busy}>{busy ? 'Checking…' : MC.GATE.codeButton}</button>
          <button type="button" className="mi-gate-link" onClick={() => { setStep('form'); setError(''); }}>Use a different email</button>
        </form>
      </div>
    );
  }

  return (
    <div className="mi-gate mi-gate-one" data-testid="mi-gate">
      <form onSubmit={submit} noValidate aria-labelledby="mi-gate-h">
        <h2 id="mi-gate-h">{MC.GATE.title}</h2>
        <p className="mi-gate-blurb">{MC.GATE.blurb(entryLabel)}</p>
        <label className="mi-gate-one-label" htmlFor="mi-email">{MC.GATE.label}</label>
        <div className="mi-gate-row">
          <input id="mi-email" ref={inputRef} type="email" name="email" inputMode="email" autoCapitalize="none" spellCheck="false" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com" autoComplete="email" required />
          <button type="submit" className="ch-btn ch-btn-primary mi-gate-btn" disabled={co.busy}>{co.busy ? MC.GATE.busy : MC.GATE.button}</button>
        </div>
        <input className="mi-gate-hp" type="text" name="mc_trap" value={trap} onChange={(e) => setTrap(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" />
        {co.error && <p className="mi-gate-error" role="alert">{co.error}</p>}
        {note && !co.error && <p className="mi-gate-note" role="status">{note}</p>}
        <PayTerms entry={entryLabel} />
      </form>
    </div>
  );
}

/**
 * The pay step for a signed-in member who cannot watch yet (owner 2026-10-30): someone who closed the
 * payment window, or signed in to an unpaid account. Owner 2026-10-31: one button, no fields; Razorpay
 * asks for the phone. After a UPI app switch reloads the page, the hook finds the pending order and asks
 * order-status.
 */
function JoinStep({ me, L, onPaid, onAlreadyIn, contact, utm }) {
  const co = useMasterclassCheckout({ onPaid, onAlreadyPaid: onAlreadyIn, contact });
  const submit = (e) => {
    e.preventDefault();
    co.pay({ product: 'entry', agree: true, utm: utm || {}, referrer: document.referrer || null });
  };

  if (co.stage === 'confirming') {
    return (
      <div className="mi-gate" role="status" data-testid="mi-join">
        <p className="mi-gate-step">{MC.JOIN.step}</p>
        <h2 id="mi-gate-h">{MC.JOIN.confirmTitle}</h2>
        <p className="mi-gate-blurb">{co.confirmMsg || 'We are checking your payment. This can take a few minutes.'}</p>
        {co.error && <p className="mi-gate-error" role="alert">{co.error}</p>}
        <button type="button" className="ch-btn ch-btn-primary mi-gate-btn" onClick={co.checkStatus} disabled={co.checking}>{co.checking ? 'Checking…' : 'Check again'}</button>
        <p className="mi-gate-consent">{MC.JOIN.confirmHelp} Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
        {co.hasPending && <button type="button" className="mi-gate-link" onClick={co.startAgain}>I did not pay. Start again</button>}
      </div>
    );
  }

  if (!L.entryOpen) {
    return (
      <div className="mi-gate" role="status" data-testid="mi-join">
        <h2 id="mi-gate-h">{MC.JOIN.closed}</h2>
        <p className="mi-gate-blurb">{L.entryMessage || MC.JOIN.closedText} Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
      </div>
    );
  }

  return (
    <div className="mi-gate" data-testid="mi-join">
      <form onSubmit={submit} noValidate>
        <p className="mi-gate-step">{MC.JOIN.step}</p>
        <h2 id="mi-gate-h">{MC.JOIN.title(L.entry)}</h2>
        <p className="mi-gate-blurb">{MC.JOIN.blurb(L.entry)}</p>
        <p className="mi-gate-qa">{MC.JOIN.qa}</p>
        <p className="mi-gate-who">Signed in as <b>{me.name || me.email}</b>{me.name ? ` · ${me.email}` : ''}</p>
        {co.error && <p className="mi-gate-error" role="alert">{co.error}</p>}
        <button type="submit" className="ch-btn ch-btn-primary mi-gate-btn" disabled={co.busy}>{co.busy ? MC.JOIN.busy : MC.JOIN.button(L.entry)}</button>
        <PayTerms entry={L.entry} />
        <p className="mi-gate-consent">{MC.JOIN.kit(L.kitTotal, L.upgrade)}</p>
      </form>
    </div>
  );
}

// The video, only ever from /me.video (owner 2026-10-30): an embed or a presigned file.
function MemberVideo({ video, autoplay, onError }) {
  if (video && video.type === 'embed') {
    const src = withYouTubeJsApi(video.url);
    return (
      <div className="mi-video">
        <iframe
          src={autoplay ? `${src}${src.includes('?') ? '&' : '?'}autoplay=1` : src}
          title={MC.VIDEO.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }
  if (video && video.type === 'file') {
    return (
      <div className="mi-video">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video src={video.url} controls playsInline preload="metadata" controlsList="nodownload" autoPlay={!!autoplay} onError={onError} />
      </div>
    );
  }
  return <div className="mi-video mi-video-wait"><p>{MC.VIDEO.soon}</p></div>;
}

export default function MasterclassInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const utm = useRef(null);
  if (utm.current === null) utm.current = readUtm(); // the landing URL's UTM tags, recorded with a ₹299 payment
  const [pricePayload, setPricePayload] = useState(null); // /price: the kit, plus entry and kit_upgrade
  const [me, setMe] = useState(null); // /me when signed in
  const [justIn, setJustIn] = useState(false); // joined on this page just now: the video starts by itself
  const [sticky, setSticky] = useState(false);
  const watchRef = useRef(null);
  const videoRetried = useRef(false);
  const contact = INDIA_OFFICE.email;

  const loadMe = useCallback(async () => {
    try {
      const { status, j } = await call(EP.me);
      const fresh = status === 200 && j && j.ok ? j : null;
      settlePending(fresh); // a ₹299 order /me already shows as paid is never offered "Check again"
      setMe(fresh);
      return fresh;
    } catch (e) { /* not signed in, or offline: the form stays */ }
    return null;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({ title: MC.SEO.title, description: MC.SEO.description, canonical: `https://aumai.co.in${MC.PATHS.info}` });
    fetch(`${API}${EP.price}`).then((r) => r.json()).then((j) => { if (j && j.label) setPricePayload(j); }).catch(() => { /* keep the defaults */ });
    loadMe();
  }, [loadMe]);

  const member = !!me;
  const level = accessLevel(me);
  const watching = canWatch(me);
  const L = priceLabels(me, pricePayload);
  // Signed up or signed in on this page: the reply is the /me payload; anything else, ask /me.
  const onMember = (j) => { if (j && j.ok && j.email) setMe(j); else loadMe(); };
  // Paid: /me now says watch (or kit), and the video starts by itself. A payment that did not sign this
  // browser in (sign_in: 'code', backend 2026-10-30) sends the buyer to the code sign-in.
  const onJoined = async (j, email) => {
    setJustIn(true);
    const fresh = await loadMe();
    if (j && j.sign_in === 'code' && !canWatch(fresh)) {
      navigate(MC.PATHS.signIn, { replace: true, state: { justPaid: true, email: j.email || email } });
    }
  };
  // A presigned file link lasts hours: if it ran out, fetch a fresh one once.
  const onVideoError = () => { if (!videoRetried.current) { videoRetried.current = true; loadMe(); } };

  // Phones: a bar slides up whenever the masterclass block (video or form) is off screen.
  useEffect(() => {
    const el = watchRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => { entries.forEach((e) => setSticky(!e.isIntersecting)); });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    document.body.classList.toggle('mi-sticky-on', sticky);
    return () => document.body.classList.remove('mi-sticky-on');
  }, [sticky]);

  // Old links: a just-paid buyer used to land on /masterclass to sign in.
  if (location.state?.justPaid) return <Navigate to={MC.PATHS.signIn} replace state={location.state} />;

  // The masterclass is at the top of this page, so the main button scrolls to it: "Join for ₹299"
  // until the member can watch. The kit second: ₹999 straight away, ₹700 more after joining, or
  // the member's own page once it is theirs.
  const kitLink = (cls) => {
    if (level === 'kit') return <Link className={cls} to={MC.PATHS.my}>Open my kit</Link>;
    if (member && level === 'watch') return <Link className={cls} to={`${MC.PATHS.my}#unlock`}>{`Get the kit · ${L.upgrade} more`}</Link>;
    return <Link className={cls} to={MC.PATHS.register}>{`Get the kit · ${L.kitTotal}`}</Link>;
  };
  const ctas = (extra = '') => (
    <>
      <a className={`ch-btn ch-btn-primary ${extra}`} href="#watch">{watching ? MC.CTA.watch : MC.CTA.join(L.entry)}</a>
      {kitLink(`ch-btn ch-btn-ghost ${extra}`)}
    </>
  );

  return (
    <div className="ch-home mi-page">
      {/* Hero: the title, then the masterclass itself (owner 2026-10-26: "the video is the first thing after
          the title, and everything else below"). Owner 2026-10-30: the sign-up form, then "Join for ₹299",
          then the video plays in their place. */}
      <section className="ch-hero lux-hero mi-hero">
        <div className="ch-container">
          <p className="mi-member">
            {member
              ? <>{MC.GATE.signedIn} <Link to={MC.PATHS.my}>Open my masterclass</Link></>
              : <>Already have an account? <Link to={MC.PATHS.signIn}>Sign in</Link></>}
          </p>
          <div className="mi-hero-top">
            <span className="ch-eyebrow">{MC.HERO.eyebrow}</span>
            <h1 className="ch-hero-title">{MC.HERO.titleLead}<span className="ch-hero-accent">{MC.HERO.titleAccent}</span>{MC.HERO.titleTail}</h1>
          </div>
          <div id="watch" className="mi-watch" ref={watchRef}>
            {/* Joining closed (price.entry.open === false): no promise of "Next, join for ₹299". */}
            {!member && !L.entryOpen && (
              <div className="mi-gate" role="status" data-testid="mi-closed">
                <h2 id="mi-gate-h">{MC.JOIN.closed}</h2>
                <p className="mi-gate-blurb">{L.entryMessage || MC.JOIN.closedText} <WaLink>{MC.WHATSAPP.display}</WaLink></p>
              </div>
            )}
            {!member && L.entryOpen && <WatchGate onMember={onMember} onPaid={onJoined} entryLabel={L.entry} contact={contact} utm={utm.current} />}
            {member && !watching && <JoinStep me={me} L={L} onPaid={onJoined} onAlreadyIn={onJoined} contact={contact} utm={utm.current} />}
            {member && watching && (
              <>
                <MemberVideo video={me.video} autoplay={justIn} onError={onVideoError} />
                {me.whatsapp_qa && me.whatsapp_qa.link && (
                  <p className="mi-watch-qa">{MC.MEMBER.qaLine} <a href={me.whatsapp_qa.link} target="_blank" rel="noopener noreferrer">{me.whatsapp_qa.display}</a></p>
                )}
              </>
            )}
          </div>
          <ul className="mi-facts">
            {MC.HERO.facts.map((f) => <li key={f.b}><strong>{(f.entry || f.price) ? live(f.b, L) : f.b}</strong><span>{f.t}</span></li>)}
          </ul>
          {level !== 'kit' && <p className="mi-watch-kit">{MC.VIDEO.kitNote} {kitLink('')}</p>}
        </div>
      </section>

      {/* What it is: the promise, who it is for and the four Cs, under the video now. */}
      <section className="ch-section mi-intro" aria-labelledby="mi-intro-h">
        <div className="ch-container">
          <div className="mi-split">
            <div>
              <span className="ch-eyebrow">{MC.VIDEO.eyebrow}</span>
              <h2 id="mi-intro-h" className="ch-h2">{MC.VIDEO.title}</h2>
              <p className="ch-lead">{MC.VIDEO.intro}</p>
              <p className="mi-promise">{MC.HERO.promise}</p>
              <p>{MC.HERO.who}</p>
              <p className="mi-note">{MC.HERO.note}</p>
              <div className="ch-hero-cta mi-intro-cta">{ctas()}</div>
            </div>
            <figure className="mi-hero-figure">
              <Pic img={MC.IMG.hero} className="mi-hero-img" />
              <ul className="mi-hero-4c" aria-label="The 4C Framework">
                {MC.STAGES.map((s) => <li key={s.c} className={`mi-c-${C_KEY[s.c]}`}><b>{s.c}</b><span>{s.line}</span></li>)}
              </ul>
            </figure>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="ch-section" aria-labelledby="mi-problem">
        <div className="ch-container">
          <div className="mi-split">
            <div>
              <span className="ch-eyebrow">The leak nobody counts</span>
              <h2 id="mi-problem" className="ch-h2">{MC.PROBLEM.title}</h2>
              <p className="ch-lead">{MC.PROBLEM.intro}</p>
              <ul className="mi-leaks">{MC.PROBLEM.leaks.map((l) => <li key={l}>{l}</li>)}</ul>
            </div>
            <figure className="mi-frame"><div className="mi-frame-in"><Pic img={MC.IMG.leaks} /></div></figure>
          </div>
        </div>
      </section>

      {/* Real numbers */}
      <section className="ch-offer mi-numbers" aria-labelledby="mi-numbers">
        <div className="ch-container">
          <span className="ch-eyebrow">{MC.PROBLEM.numbersTitle}</span>
          <h2 id="mi-numbers" className="mi-numbers-title">{MC.PROBLEM.closeA} <em>{MC.PROBLEM.closeB}</em></h2>
          <ul className="mi-stats">{MC.PROBLEM.numbers.map((x) => <li key={x.n}><strong>{x.n}</strong><span>{x.t}</span></li>)}</ul>
          <p className="mi-stats-close">{MC.PROBLEM.closeC}</p>
          <p className="mi-stats-note">{MC.PROBLEM.numbersNote}</p>
        </div>
      </section>

      {/* Before and after */}
      <section className="ch-section" aria-labelledby="mi-ba">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Before and after</span>
            <h2 id="mi-ba" className="ch-h2">{MC.BEFORE_AFTER.title}</h2>
            <p className="ch-lead ch-center-lead">{MC.BEFORE_AFTER.intro}</p>
          </div>
          <div className="mi-ba" role="table" aria-label="Each leak, and the system that closes it">
            <div className="mi-ba-row mi-ba-head" role="row">
              <span role="columnheader">Without a system</span><span role="columnheader">With the Full Chair Method</span>
            </div>
            {MC.BEFORE_AFTER.rows.map((r) => (
              <div className="mi-ba-row" role="row" key={r.sys}>
                <p className="mi-before" role="cell">{r.before}</p>
                <p className="mi-after" role="cell"><b>{r.sys}</b>{r.after}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll learn: the 4C Framework */}
      <section className="ch-section ch-tint" id="learn" aria-labelledby="mi-learn">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">What you’ll learn</span>
            <h2 id="mi-learn" className="ch-h2">The <em>4C</em> Framework</h2>
            <p className="ch-lead ch-center-lead">{MC.LEARN.intro}</p>
          </div>
          <div className="mi-4c">
            {MC.STAGES.map((s, i) => (
              <article key={s.c} className={`mi-c mi-c-${C_KEY[s.c]}`}>
                <img src={s.img} alt={s.alt} width="900" height="657" loading="lazy" decoding="async" />
                <div className="mi-c-body">
                  <p className="mi-c-step">Stage {i + 1} of 4</p>
                  <h3>{s.c}</h3>
                  <p className="mi-c-line">{s.line}</p>
                  <ol className="mi-sys">
                    {s.items.map((it) => (
                      <li key={it.n} className={it.foundation ? 'is-foundation' : ''}>
                        <span className="mi-sys-n">{it.foundation ? `Foundation ${it.n}` : `System ${it.n}`}</span>
                        <b>{it.name}</b>
                        <span className="mi-sys-t">{it.t}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Owners and KPIs, the leak in rupees, WhatsApp through Meta */}
      <section className="ch-section" aria-labelledby="mi-measure">
        <div className="ch-container">
          <div className="mi-split mi-split-rev">
            <figure className="mi-frame"><div className="mi-frame-in"><Pic img={MC.IMG.team} /></div></figure>
            <div>
              <span className="ch-eyebrow">How it keeps running</span>
              <h2 id="mi-measure" className="ch-h2">{MC.LEARN.extras[0].h}</h2>
              <p className="ch-lead">{MC.LEARN.extras[0].t}</p>
            </div>
          </div>
          <div className="ch-pillars ch-pillars-3 mi-pillars">
            {MC.LEARN.extras.slice(1).map((x, i) => (
              <div key={x.h} className="ch-pillar">
                <div className="ch-pillar-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="ch-pillar-title">{x.h}</h3>
                <p className="ch-pillar-body">{x.t}</p>
              </div>
            ))}
            <div className="ch-pillar">
              <div className="ch-pillar-num">03</div>
              <h3 className="ch-pillar-title">{MC.WAYS.buildTitle}</h3>
              <ol className="mi-build">{MC.WAYS.build.map((b) => <li key={b}>{b}</li>)}</ol>
              <p className="ch-pillar-body">{MC.WAYS.buildNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three ways */}
      <section className="ch-section ch-tint" aria-labelledby="mi-ways">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">How it works</span>
            <h2 id="mi-ways" className="ch-h2">{MC.WAYS.title}</h2>
            <p className="ch-lead ch-center-lead">{MC.WAYS.intro}</p>
          </div>
          <div className="mi-ways">
            <article className="mi-way">
              <div className="mi-way-text">
              <p className="mi-way-n">Way 1</p>
              <h3>{MC.WAYS.items[0].h}</h3>
              <p>{MC.WAYS.items[0].t}</p>
              </div>
              <figure className="mi-shot"><Pic img={MC.IMG.workbook} /><figcaption>Workbook 05, sample rows</figcaption></figure>
            </article>
            <article className="mi-way">
              <div className="mi-way-text">
              <p className="mi-way-n">Way 2</p>
              <h3>{MC.WAYS.items[1].h}</h3>
              <p>{MC.WAYS.items[1].t}</p>
              </div>
              <figure className="mi-shot">
                <div className="mi-claude" aria-label="Example of a Claude chat with the Clinic Master Sheet connected">
                  <p className="mi-claude-you"><span className="mi-claude-file">Clinic Master Sheet · Due · 5 Advised</span>Which advised treatments are at risk this week, and what should I send?</p>
                  <div className="mi-claude-ai">
                    <p><b>Manoj Tiwari</b> · root canal + crown · follow-up 1 not sent; the window closed. <b className="mi-red">Breached</b></p>
                    <p><b>Suresh Nambiar</b> · implant, ₹38,000 · follow-up 1 due today; a call is recommended. <b className="mi-amber">On track</b></p>
                    <p className="mi-claude-msg">“Namaste Manoj ji, Dr Mehta asked us to check on the crown for your root canal. We know time is short: shall we keep a 30-minute slot on Saturday morning for you?”</p>
                  </div>
                </div>
                <figcaption>Claude with the Clinic Master Sheet connected (sample rows)</figcaption>
              </figure>
            </article>
            <article className="mi-way">
              <div className="mi-way-text">
              <p className="mi-way-n">Way 3</p>
              <h3>{MC.WAYS.items[2].h}</h3>
              <p>{MC.WAYS.items[2].t}</p>
              </div>
              <figure className="mi-shot"><Pic img={MC.IMG.aumy} /><figcaption>Aumy on our demo clinic (sample data)</figcaption></figure>
            </article>
          </div>
          <p className="mi-callout">{MC.WAYS.noSoftware}</p>
        </div>
      </section>

      {/* What you get */}
      <section className="ch-section" aria-labelledby="mi-kit">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">The kit</span>
            <h2 id="mi-kit" className="ch-h2">{MC.KIT.title}</h2>
            <p className="ch-lead ch-center-lead">{live(MC.KIT.intro, L)}</p>
          </div>
          {/* One picture: the leak is worked out on the sheet's Leak tab, not a printed calculator (owner 2026-10-22). */}
          <div className="mi-showcase mi-showcase-one">
            <figure className="mi-frame"><div className="mi-frame-in"><Pic img={MC.IMG.kpis} /></div><figcaption>The Owner Weekly Scorecard: KPIs and owners</figcaption></figure>
          </div>
          <ul className="mi-kit">
            {MC.KIT.items.map((k, i) => (
              <li key={k.h} className={`mi-kit-card${k.wa ? ' mi-kit-wa' : ''}`}>
                <Icon d={ICONS[i] || ICONS[0]} />
                <h3>{k.wa ? <WaLink>{k.h}</WaLink> : k.h}</h3>
                <p>{k.t}</p>
              </li>
            ))}
          </ul>
          <div className="ch-hero-cta ch-center-cta mi-mid-cta">{ctas()}</div>
        </div>
      </section>

      {/* What to expect */}
      <section className="ch-section ch-tint" aria-labelledby="mi-expect">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Before you start</span>
            <h2 id="mi-expect" className="ch-h2">{MC.EXPECT.title}</h2>
          </div>
          <div className="ch-pillars mi-pillars">
            {MC.EXPECT.items.map((x, i) => (
              <div key={x.h} className="ch-pillar">
                <div className="ch-pillar-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="ch-pillar-title">{x.h}</h3>
                <p className="ch-pillar-body">{x.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="ch-section" aria-labelledby="mi-who">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Is it for you?</span>
            <h2 id="mi-who" className="ch-h2">{MC.FOR_WHO.title}</h2>
          </div>
          <div className="mi-fit">
            <div className="mi-fit-col mi-fit-yes"><h3>For you if</h3><ul>{MC.FOR_WHO.yes.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div className="mi-fit-col mi-fit-no"><h3>Not for you if</h3><ul>{MC.FOR_WHO.no.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </div>
          <p className="mi-callout">{MC.FOR_WHO.skinNote}</p>
        </div>
      </section>

      {/* The trainer */}
      <section className="ch-section ch-tint" aria-labelledby="mi-trainer">
        <div className="ch-container ch-narrow">
          <span className="ch-eyebrow">{MC.TRAINER.title}</span>
          <h2 id="mi-trainer" className="ch-h2 mi-trainer-name">{MC.TRAINER.name}</h2>
          <p className="mi-trainer-role">{MC.TRAINER.role}</p>
          {MC.TRAINER.bio.map((b) => <p key={b} className="ch-lead">{b}</p>)}
          <p><Link to="/about">More about Jayesh</Link></p>
        </div>
      </section>

      {/* FAQ */}
      <section className="ch-section" aria-labelledby="mi-faq">
        <div className="ch-container ch-narrow">
          <h2 id="mi-faq" className="ch-h2 ch-center">Questions, answered</h2>
          <div className="ch-faq">
            {MC.FAQS.map((f) => (
              <details key={f.q} className="ch-faq-item">
                <summary>{f.q}</summary>
                <p>{withWa(live(f.a, L))}</p>
                {f.q === 'Can I get a refund?' && <p><Link to="/refund#masterclass">The full refund policy</Link></p>}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="ch-offer">
        <div className="ch-container ch-center">
          <span className="ch-eyebrow">{MC.TITLE}</span>
          <h2 className="ch-offer-title">{MC.FINAL.title}</h2>
          <p className="ch-offer-sub">{MC.FINAL.text}</p>
          <div className="ch-hero-cta ch-center-cta">{ctas()}</div>
          <p className="mi-final-q"><WaLink>{MC.FINAL.questions}</WaLink></p>
          <p className="mi-final-q">Already have an account? <Link to={MC.PATHS.signIn}>Sign in</Link></p>
          <p className="mi-final-q" style={{ fontSize: 13 }}>{MC.MEMBER.licence}</p>
        </div>
      </section>

      {/* Phones: the masterclass stays one tap away. */}
      <div className={`mi-sticky${sticky ? ' is-on' : ''}`} aria-hidden={!sticky}>
        <span><b>{MC.TITLE}</b> · {MC.CTA.watchLine}</span>
        <a className="ch-btn ch-btn-primary" href="#watch" tabIndex={sticky ? 0 : -1}>{watching ? MC.CTA.watch : MC.CTA.join(L.entry)}</a>
      </div>
    </div>
  );
}
