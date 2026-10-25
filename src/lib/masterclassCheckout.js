import { useCallback, useEffect, useRef, useState } from 'react';

// The Full Chair Method: ONE copy of the site-API paths and of the Razorpay checkout
// flow (owner 2026-10-25: the masterclass is free to watch; a one-time payment unlocks
// the kit). Used by /masterclass/register (pay straight away) and by /masterclass/my
// (a free member unlocking the kit). Nothing about money is typed into the pages:
// the price and whether the kit can be bought come from the backend.
//
// Once Razorpay says "paid", a page never offers Pay again. A UPI app switch on
// Android can reload the page before Razorpay's handler runs: the order id and its
// claim token are kept in localStorage first, and on load the page asks the backend
// (order-status) whether that order is paid.

export const API = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/masterclass`;

// Every path in one place: a rename on the backend is one edit here.
export const EP = {
  price: '/price',
  me: '/me',
  signUp: '/sign-up',
  requestCode: '/request-code',
  verify: '/verify',
  signOut: '/sign-out',
  order: '/order',
  paymentVerify: '/payment-verify',
  orderStatus: '/order-status',
  files: '/files',
  downloadAll: '/download-all',
};

export const CLINIC_TYPES = [['dental', 'Dental'], ['skin', 'Skin / aesthetic'], ['other', 'Other']];
export const FAILED_COPY = 'If money left your account, your bank returns it automatically within 5–7 working days. You can press Pay again.';
export const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e || '').trim());
export const fileUrl = (f) => `${API}${EP.files}/${encodeURIComponent(f.name)}`;
export const downloadAllUrl = () => `${API}${EP.downloadAll}`;
// Members from before 2026-10-25 have no `paid` flag: every one of them paid, so only an explicit false is free.
export const isPaid = (me) => !!me && me.paid !== false;

const CHECKOUT_JS = 'https://checkout.razorpay.com/v1/checkout.js';
const PENDING_STORE = 'aumai_mc_pending'; // localStorage: { order_id, claim, email, at }
const PENDING_MAX_MS = 48 * 3600 * 1000;

const store = (kind) => { try { return kind === 'session' ? window.sessionStorage : window.localStorage; } catch (e) { return null; } };
export const readJson = (kind, key) => { try { return JSON.parse(store(kind)?.getItem(key) || 'null'); } catch (e) { return null; } };
export const writeJson = (kind, key, v) => { try { if (v == null) store(kind)?.removeItem(key); else store(kind)?.setItem(key, JSON.stringify(v)); } catch (e) { /* fine */ } };
export const readPending = () => {
  const p = readJson('local', PENDING_STORE);
  return p && p.order_id && p.claim && Date.now() - p.at < PENDING_MAX_MS ? p : null;
};
export const clearPending = () => writeJson('local', PENDING_STORE, null);

export async function call(path, body, method) {
  const r = await fetch(`${API}${path}`, {
    method: method || (body ? 'POST' : 'GET'),
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await r.json().catch(() => ({}));
  return { status: r.status, ok: r.ok, j };
}

export function loadCheckout() {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    let s = document.querySelector(`script[src="${CHECKOUT_JS}"]`);
    if (!s) { s = document.createElement('script'); s.src = CHECKOUT_JS; s.async = true; document.body.appendChild(s); }
    s.addEventListener('load', () => resolve(true));
    s.addEventListener('error', () => resolve(false));
  });
}

/**
 * The checkout flow as a hook. `onPaid(j, email)` runs once the backend confirms the
 * payment (from Razorpay's handler, or from order-status after a reload); it must
 * clear the pending order itself if it leaves the page (clearPending()).
 *
 * Returns { stage: 'form' | 'confirming', confirmMsg, error, setError, busy, checking,
 *           pay(body), checkStatus(), startAgain(), contactLine }.
 */
export function useMasterclassCheckout({ onPaid, onAlreadyPaid, contact }) {
  const [stage, setStage] = useState(() => (readPending() ? 'confirming' : 'form'));
  const [confirmMsg, setConfirmMsg] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(false);
  const onPaidRef = useRef(onPaid);
  const onAlreadyPaidRef = useRef(onAlreadyPaid);
  useEffect(() => { onPaidRef.current = onPaid; onAlreadyPaidRef.current = onAlreadyPaid; }, [onPaid, onAlreadyPaid]);

  const landPaid = useCallback((j, email) => {
    clearPending();
    setStage('form'); setConfirmMsg(''); setError('');
    onPaidRef.current(j, email);
  }, []);

  const checkStatus = useCallback(async () => {
    const p = readPending();
    if (!p) { setStage('form'); return; }
    setChecking(true); setError('');
    try {
      const { status, j } = await call(EP.orderStatus, { order_id: p.order_id, claim: p.claim });
      const booked = !!(j.payment_booked || j.paid); // the backend's name is payment_booked; paid is its old alias
      if (booked && (j.ok || j.sign_in)) { landPaid(j, p.email); return; }
      if (status === 403 && booked) { clearPending(); setError(j.error); return; }
      if (j.unknown) { clearPending(); setStage('form'); return; }
      if (j.failed) { clearPending(); setError(j.error); return; }
      setConfirmMsg(j.message || j.error || 'We are checking your payment. This can take a few minutes.');
    } catch (e) {
      setConfirmMsg('We could not connect. Check your internet connection and press Check again.');
    } finally { setChecking(false); }
  }, [landPaid]);

  useEffect(() => {
    if (readPending()) checkStatus();
    else loadCheckout();
  }, [checkStatus]);

  // Razorpay's success handler: from here on the page never offers Pay again.
  const onRazorpayPaid = async (resp, email) => {
    setStage('confirming'); setConfirmMsg('Payment received — we are confirming it.'); setError('');
    try {
      const { status, ok, j } = await call(EP.paymentVerify, resp);
      if (ok) { landPaid(j, email); return; }
      if (status === 409) { setConfirmMsg(j.error); return; }
      setError(j.error || `We could not confirm the payment yet. If money left your account, it is safe: write to us at ${contact}.`);
    } catch (e) {
      setConfirmMsg('Payment received. We could not confirm it from this page yet: press Check again in a minute. We will also email you.');
    } finally { setBusy(false); }
  };

  // `body` is what /order needs: name, clinic, city, email, whatsapp, clinic_type, agree (+ utm,
  // referrer). For a signed-in member the backend takes name, email and WhatsApp from the
  // account, so only clinic, city, clinic_type and agree are sent. A member who already paid
  // gets 409 { already_paid: true }: nothing to buy, so the page refetches /me instead.
  const pay = async (body) => {
    setError('');
    setBusy(true);
    try {
      const { status, ok, j } = await call(EP.order, body);
      if (status === 409 && j.already_paid) { setBusy(false); if (onAlreadyPaidRef.current) onAlreadyPaidRef.current(j); else setError(j.error || 'You already have access.'); return; }
      if (!ok) { setError(j.error || 'Something went wrong. Please try again.'); setBusy(false); return; }
      if (!(await loadCheckout())) { setError('The payment window could not open. Check your internet connection and press Pay again.'); setBusy(false); return; }
      // Kept BEFORE the window opens: a UPI app switch may reload this page.
      writeJson('local', PENDING_STORE, { order_id: j.order_id, claim: j.claim, email: j.prefill.email, at: Date.now() });
      const rz = new window.Razorpay({
        key: j.key_id, amount: j.amount, currency: j.currency, order_id: j.order_id,
        name: j.name, description: j.description, prefill: j.prefill, notes: j.notes,
        theme: { color: '#2563EB' },
        handler: (resp) => onRazorpayPaid(resp, j.prefill.email),
        modal: { ondismiss: () => { clearPending(); setBusy(false); } },
      });
      rz.on('payment.failed', (r) => {
        setError(`The payment did not go through${r?.error?.description ? `: ${r.error.description}` : ''}. ${FAILED_COPY}`);
      });
      rz.open();
    } catch (err) {
      setError('We could not connect. Check your internet connection and try again.');
      setBusy(false);
    }
  };

  const startAgain = () => { clearPending(); setStage('form'); setConfirmMsg(''); setError(''); };

  return { stage, confirmMsg, error, setError, busy, checking, pay, checkStatus, startAgain, hasPending: !!readPending() };
}
