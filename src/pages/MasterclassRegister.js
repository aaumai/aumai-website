import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { INDIA_OFFICE } from '../config/contact';
import './ScorecardPage.css';
import './MasterclassPage.css';

// Join the masterclass (owner 2026-10-18): one screen, pay through Razorpay
// Checkout, and the account is made the moment the payment is confirmed. The
// price and whether registration is open come from the site backend; nothing
// about money is typed into this page. Out of the sitemap for now.

const API = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/masterclass`;
const CHECKOUT_JS = 'https://checkout.razorpay.com/v1/checkout.js';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const CLINIC_TYPES = [['dental', 'Dental'], ['skin', 'Skin / aesthetic'], ['other', 'Other']];

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
  const [price, setPrice] = useState(null); // { open, label, access_days, starts_on_label, message }
  const [priceError, setPriceError] = useState('');
  const [f, setF] = useState({ name: '', clinic: '', city: '', email: '', whatsapp: '', clinic_type: '', agree: false });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [waiting, setWaiting] = useState(''); // paid, but the confirmation is still on its way
  const utm = useRef({});
  const contact = INDIA_OFFICE.email;

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'Join The Full Chair Method masterclass | AUM AI',
      description: 'Register for The Full Chair Method masterclass for clinic owners: the 4C Framework, eight systems, the video and nine workbooks for a month.',
      canonical: 'https://aumai.co.in/masterclass/register',
    });
    try {
      const q = new URLSearchParams(window.location.search);
      UTM_KEYS.forEach((k) => { if (q.get(k)) utm.current[k] = q.get(k).slice(0, 160); });
    } catch (e) { /* no utm */ }
    fetch(`${API}/price`).then((r) => r.json()).then(setPrice)
      .catch(() => setPriceError('We could not reach the server. Check your internet connection and refresh the page.'));
    loadCheckout();
  }, []);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const onPaid = async (resp) => {
    setWaiting(''); setError('');
    try {
      const { status, ok, j } = await post('/payment-verify', resp);
      if (ok) { navigate('/masterclass/my', { replace: true, state: { justPaid: true } }); return; }
      if (status === 409) { setWaiting(j.error); return; }
      setError(j.error || `We could not confirm the payment. If money left your account, it is safe: write to us at ${contact}.`);
    } catch (e) {
      setWaiting(`Your payment went through, but we could not confirm it from this page. We will email you how to sign in within a few minutes. Questions: ${contact}.`);
    } finally { setBusy(false); }
  };

  const pay = async (e) => {
    e.preventDefault();
    setError(''); setWaiting('');
    setBusy(true);
    try {
      const { ok, j } = await post('/order', { ...f, utm: utm.current, referrer: document.referrer || null });
      if (!ok) { setError(j.error || 'Something went wrong. Please try again.'); setBusy(false); return; }
      if (!(await loadCheckout())) { setError('The payment window could not open. Check your internet connection and press Pay again.'); setBusy(false); return; }
      const rz = new window.Razorpay({
        key: j.key_id, amount: j.amount, currency: j.currency, order_id: j.order_id,
        name: j.name, description: j.description, prefill: j.prefill, notes: j.notes,
        theme: { color: '#2563EB' },
        handler: onPaid,
        modal: { ondismiss: () => setBusy(false) },
      });
      rz.on('payment.failed', (r) => {
        setError(`The payment did not go through${r?.error?.description ? `: ${r.error.description}` : ''}. No money was taken. You can press Pay again.`);
      });
      rz.open();
    } catch (err) {
      setError('We could not reach the server. Check your internet connection and try again.');
      setBusy(false);
    }
  };

  const open = price && price.open;
  return (
    <div className="sc-root">
      <div className="sc-wrap mc-narrow mc-hero">
        <p className="sc-eyebrow">The Full Chair Method · Masterclass</p>
        <h1>Join the masterclass</h1>
        <p className="mc-access">The 4C Framework: eight systems that keep your chairs full. You get the masterclass video and nine Excel workbooks{price ? ` for ${price.access_days} days` : ''}.</p>

        {priceError && <p className="sc-error" role="alert">{priceError}</p>}
        {price && !open && (
          <div className="sc-form" role="status">
            <h2>Registration opens soon</h2>
            <p>{price.message || 'Please check again later.'} Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
          </div>
        )}

        {waiting && <p className="mc-sent" role="status">{waiting}</p>}

        {open && (
          <form className="sc-form" onSubmit={pay} noValidate>
            <div className="sc-fields" style={{ gridTemplateColumns: '1fr' }}>
              <label>Your name<input className="mc-input" value={f.name} onChange={set('name')} placeholder="Dr Meera Joshi" autoComplete="name" required /></label>
              <label>Clinic name<input className="mc-input" value={f.clinic} onChange={set('clinic')} placeholder="Smile Care Dental Clinic" autoComplete="organization" required /></label>
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
              <span>I agree to the <Link to="/terms" target="_blank" rel="noopener">terms</Link> and the <Link to="/refund" target="_blank" rel="noopener">refund policy</Link>.</span>
            </label>
            {error && <p className="sc-error" role="alert">{error}</p>}
            <button type="submit" className="sc-btn mc-btn-wide" disabled={busy}>{busy ? 'Opening the payment…' : `Pay ${price.label}`}</button>
            <p className="mc-help">Secure payment by Razorpay: UPI, card or net banking. Your access starts {price.starts_on <= new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10) ? 'today' : `on ${price.starts_on_label}`}, and we email you how to sign in.</p>
          </form>
        )}

        <p className="mc-help">Already registered? <Link to="/masterclass">Sign in</Link>. Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
      </div>
    </div>
  );
}
