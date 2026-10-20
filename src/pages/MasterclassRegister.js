import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { INDIA_OFFICE } from '../config/contact';
import MC from '../data/masterclass';
import './ScorecardPage.css';
import './MasterclassPage.css';

// Join the masterclass (owner 2026-10-18): one screen, pay through Razorpay
// Checkout, and the account is made the moment the payment is confirmed. The
// price and whether registration is open come from the site backend; nothing
// about money is typed into this page. Out of the sitemap for now.
//
// Once Razorpay says "paid", this page never offers Pay again. A UPI app switch
// on Android can reload the page before Razorpay's handler runs: the order id
// and its claim token are kept in localStorage first, and on load the page asks
// the backend (order-status) whether that order is paid.

const API = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/masterclass`;
const CHECKOUT_JS = 'https://checkout.razorpay.com/v1/checkout.js';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const CLINIC_TYPES = [['dental', 'Dental'], ['skin', 'Skin / aesthetic'], ['other', 'Other']];
const PENDING_STORE = 'aumai_mc_pending'; // localStorage: { order_id, claim, email, at }
const FORM_STORE = 'aumai_mc_form';       // sessionStorage: the form, so a retry needs no retyping
const PENDING_MAX_MS = 48 * 3600 * 1000;
const EMPTY = { name: '', clinic: '', city: '', email: '', whatsapp: '', clinic_type: '', agree: false };
const FAILED_COPY = 'If money left your account, your bank returns it automatically within 5–7 working days. You can press Pay again.';

const store = (kind) => { try { return kind === 'session' ? window.sessionStorage : window.localStorage; } catch (e) { return null; } };
const readJson = (kind, key) => { try { return JSON.parse(store(kind)?.getItem(key) || 'null'); } catch (e) { return null; } };
const writeJson = (kind, key, v) => { try { if (v == null) store(kind)?.removeItem(key); else store(kind)?.setItem(key, JSON.stringify(v)); } catch (e) { /* fine */ } };
const readPending = () => {
  const p = readJson('local', PENDING_STORE);
  return p && p.order_id && p.claim && Date.now() - p.at < PENDING_MAX_MS ? p : null;
};
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e || '').trim());

function loadCheckout() {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    let s = document.querySelector(`script[src="${CHECKOUT_JS}"]`);
    if (!s) { s = document.createElement('script'); s.src = CHECKOUT_JS; s.async = true; document.body.appendChild(s); }
    s.addEventListener('load', () => resolve(true));
    s.addEventListener('error', () => resolve(false));
  });
}

async function post(path, body) {
  const r = await fetch(`${API}${path}`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  return { status: r.status, ok: r.ok, j };
}

export default function MasterclassRegister() {
  const navigate = useNavigate();
  const [price, setPrice] = useState(null); // { open, label, lifetime, starts_on, starts_on_label, message }
  const [priceError, setPriceError] = useState('');
  const [have, setHave] = useState(null);   // already signed in: /me
  const [f, setF] = useState(() => ({ ...EMPTY, ...(readJson('session', FORM_STORE) || {}), agree: false }));
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  // form | confirming (Razorpay said paid, or a payment from before a reload is being checked)
  const [stage, setStage] = useState(() => (readPending() ? 'confirming' : 'form'));
  const [confirmMsg, setConfirmMsg] = useState('');
  const [checking, setChecking] = useState(false);
  const utm = useRef({});
  const contact = INDIA_OFFICE.email;

  // Paid and booked: go to the members area (signed in), or to code sign-in.
  const landPaid = useCallback((j, email) => {
    writeJson('local', PENDING_STORE, null);
    writeJson('session', FORM_STORE, null);
    if (j.sign_in === 'code') navigate('/masterclass/sign-in', { replace: true, state: { justPaid: true, email: j.email || email } });
    else navigate('/masterclass/my', { replace: true, state: { justPaid: true } });
  }, [navigate]);

  const checkStatus = useCallback(async () => {
    const p = readPending();
    if (!p) { setStage('form'); return; }
    setChecking(true); setError('');
    try {
      const { status, j } = await post('/order-status', { order_id: p.order_id, claim: p.claim });
      if (j.paid && (j.ok || j.sign_in)) { landPaid(j, p.email); return; }
      if (status === 403 && j.paid) { writeJson('local', PENDING_STORE, null); setError(j.error); return; }
      if (j.unknown) { writeJson('local', PENDING_STORE, null); setStage('form'); return; }
      if (j.failed) { writeJson('local', PENDING_STORE, null); setError(j.error); return; }
      setConfirmMsg(j.message || j.error || 'We are checking your payment. This can take a few minutes.');
    } catch (e) {
      setConfirmMsg('We could not reach the server. Check your internet connection and press Check again.');
    } finally { setChecking(false); }
  }, [landPaid]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'Join The Full Chair Method masterclass | AUM AI',
      description: MC.REGISTER_SEO_DESCRIPTION,
      canonical: 'https://aumai.co.in/masterclass/register',
    });
    try {
      const q = new URLSearchParams(window.location.search);
      UTM_KEYS.forEach((k) => { if (q.get(k)) utm.current[k] = q.get(k).slice(0, 160); });
    } catch (e) { /* no utm */ }
    fetch(`${API}/price`).then((r) => r.json()).then(setPrice)
      .catch(() => setPriceError('We could not reach the server. Check your internet connection and refresh the page.'));
    fetch(`${API}/me`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : null)).then((j) => { if (j && j.ok) setHave(j); }).catch(() => { /* not signed in */ });
    if (readPending()) checkStatus();
    else loadCheckout();
  }, [checkStatus]);

  const set = (k) => (e) => {
    const next = { ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value };
    setF(next);
    const { agree, ...keep } = next;
    writeJson('session', FORM_STORE, keep);
  };

  // Razorpay's success handler: from here on this page never offers Pay again.
  const onPaid = async (resp, email) => {
    setStage('confirming'); setConfirmMsg('Payment received — we are confirming it.'); setError('');
    try {
      const { status, ok, j } = await post('/payment-verify', resp);
      if (ok) { landPaid(j, email); return; }
      if (status === 409) { setConfirmMsg(j.error); return; }
      setError(j.error || `We could not confirm the payment yet. If money left your account, it is safe: write to us at ${contact}.`);
    } catch (e) {
      setConfirmMsg('Payment received. We could not confirm it from this page yet: press Check again in a minute. We will also email you how to sign in.');
    } finally { setBusy(false); }
  };

  const pay = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const { ok, j } = await post('/order', { ...f, utm: utm.current, referrer: document.referrer || null });
      if (!ok) { setError(j.error || 'Something went wrong. Please try again.'); setBusy(false); return; }
      if (!(await loadCheckout())) { setError('The payment window could not open. Check your internet connection and press Pay again.'); setBusy(false); return; }
      // Kept BEFORE the window opens: a UPI app switch may reload this page.
      writeJson('local', PENDING_STORE, { order_id: j.order_id, claim: j.claim, email: j.prefill.email, at: Date.now() });
      const rz = new window.Razorpay({
        key: j.key_id, amount: j.amount, currency: j.currency, order_id: j.order_id,
        name: j.name, description: j.description, prefill: j.prefill, notes: j.notes,
        theme: { color: '#2563EB' },
        handler: (resp) => onPaid(resp, j.prefill.email),
        modal: { ondismiss: () => { writeJson('local', PENDING_STORE, null); setBusy(false); } },
      });
      rz.on('payment.failed', (r) => {
        setError(`The payment did not go through${r?.error?.description ? `: ${r.error.description}` : ''}. ${FAILED_COPY}`);
      });
      rz.open();
    } catch (err) {
      setError('We could not reach the server. Check your internet connection and try again.');
      setBusy(false);
    }
  };

  const startAgain = () => { writeJson('local', PENDING_STORE, null); setStage('form'); setConfirmMsg(''); setError(''); };

  const open = price && price.open;
  const todayIst = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
  return (
    <div className="sc-root">
      <div className="sc-wrap mc-narrow mc-hero">
        <p className="sc-eyebrow">The Full Chair Method · Masterclass</p>
        <h1>Join the masterclass</h1>
        <p className="mc-access">{MC.REGISTER.lead}</p>
        <ul className="mc-points">
          {MC.REGISTER.points.map((p) => <li key={p}>{p.includes(MC.WHATSAPP.display)
            ? <>{p.split(MC.WHATSAPP.display)[0]}<a href={MC.WHATSAPP.link} target="_blank" rel="noopener noreferrer">{MC.WHATSAPP.display}</a>{p.split(MC.WHATSAPP.display)[1]}</>
            : p}</li>)}
        </ul>
        <p className="mc-help"><Link to={MC.PATHS.info}>See everything the masterclass covers</Link></p>

        {stage === 'confirming' && (
          <div className="sc-form" role="status">
            <h2>Payment received — we are confirming it</h2>
            <p>{confirmMsg || 'We are checking your payment. This can take a few minutes.'}</p>
            {error && <p className="sc-error" role="alert">{error}</p>}
            <button type="button" className="sc-btn mc-btn-wide" onClick={checkStatus} disabled={checking}>{checking ? 'Checking…' : 'Check again'}</button>
            <p className="mc-help">You do not need to pay again. We also email you how to sign in as soon as the payment is confirmed. Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
            {!readPending() ? null : <button type="button" className="sc-link" onClick={startAgain}>I did not pay. Start again</button>}
          </div>
        )}

        {stage === 'form' && (
          <>
            {priceError && <p className="sc-error" role="alert">{priceError}</p>}
            {price && !open && (
              <div className="sc-form" role="status">
                <h2>Registration opens soon</h2>
                <p>{price.message || 'Please check again later.'} Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
              </div>
            )}

            {/* Lifetime access (owner 2026-10-20): a member has nothing more to buy, so no "Add a month". */}
            {open && have && (
              <div className="sc-form" role="status">
                <h2>You already have access</h2>
                <p>You already have <b>lifetime access</b>. Open your masterclass any time.</p>
                <Link className="sc-btn mc-btn-wide" to="/masterclass/my" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Open my masterclass</Link>
              </div>
            )}

            {open && !have && (
              <form className="sc-form" onSubmit={pay} noValidate>
                <div className="sc-fields" style={{ gridTemplateColumns: '1fr' }}>
                  <label>Your name<input className="mc-input" value={f.name} onChange={set('name')} placeholder="Dr Meera Joshi" autoComplete="name" required /></label>
                  <label>Clinic name<input className="mc-input" value={f.clinic} onChange={set('clinic')} placeholder="Smile Care Clinic" autoComplete="organization" required /></label>
                  <label>City<input className="mc-input" value={f.city} onChange={set('city')} placeholder="Pune" autoComplete="address-level2" required /></label>
                  <label>Email (your sign-in code comes here)<input className="mc-input" type="email" inputMode="email" autoCapitalize="none" spellCheck="false" value={f.email} onChange={set('email')} placeholder="name@gmail.com" autoComplete="email" required /></label>
                  <label>WhatsApp number<input className="mc-input" type="tel" inputMode="tel" value={f.whatsapp} onChange={set('whatsapp')} placeholder="98765 43210" autoComplete="tel-national" required /></label>
                  <label>Clinic type
                    <select className="mc-input" value={f.clinic_type} onChange={set('clinic_type')} required>
                      <option value="">Choose one</option>
                      {CLINIC_TYPES.map(([v, label]) => <option key={v} value={v}>{label}</option>)}
                    </select>
                  </label>
                </div>
                <label className="sc-consent" style={{ fontSize: 15 }}>
                  <input type="checkbox" checked={f.agree} onChange={set('agree')} style={{ width: 22, height: 22 }} />
                  <span>I understand the fee is <Link to="/refund#masterclass" target="_blank" rel="noopener">non-refundable</Link>, and I agree to the <Link to="/terms" target="_blank" rel="noopener">terms</Link>.</span>
                </label>
                {validEmail(f.email) && <p className="mc-help" style={{ color: 'var(--sc-ink)' }}>Your sign-in code will go to: <b>{f.email.trim().toLowerCase()}</b></p>}
                {error && <p className="sc-error" role="alert">{error}</p>}
                <button type="submit" className="sc-btn mc-btn-wide" disabled={busy}>{busy ? 'Opening the payment…' : `Pay ${price.label}`}</button>
                <p className="mc-help">Secure payment by Razorpay: UPI, card or net banking. Your access starts {price.starts_on <= todayIst ? 'today' : `on ${price.starts_on_label}`}, and we email you how to sign in.</p>
              </form>
            )}
          </>
        )}

        <p className="mc-help">Already registered? <Link to={MC.PATHS.signIn}>Sign in</Link>. Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
      </div>
    </div>
  );
}
