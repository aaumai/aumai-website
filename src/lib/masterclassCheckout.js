import { useCallback, useEffect, useRef, useState } from 'react';
import MC from '../data/masterclass';

// The Full Chair Method: ONE copy of the site-API paths and of the Razorpay checkout
// flow. Two products (owner 2026-10-30, contract: site backend docs/masterclass-paid-entry.md):
// 'entry' (₹299 once: watch + 24×7 WhatsApp Q&A) and 'kit' (₹999 in total; ₹700 for a member
// who joined). Used by /masterclass (the join step), /masterclass/register (the kit straight
// away) and /masterclass/my (join, or unlock the kit). The amounts and whether a product can
// be bought come from the backend; src/data/masterclass.js only holds the fallback labels.
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
// Members from before 2026-10-25 have no `paid` flag: every one of them paid, so only an explicit false is unpaid.
export const isPaid = (me) => !!me && me.paid !== false;
// 'none' | 'watch' | 'kit' (owner 2026-10-30). A backend from before that change sends no
// access_level and lets every account watch, so the fallback keeps that behaviour.
export const accessLevel = (me) => {
  if (!me) return 'none';
  if (me.access_level === 'none' || me.access_level === 'watch' || me.access_level === 'kit') return me.access_level;
  return isPaid(me) ? 'kit' : 'watch';
};
export const canWatch = (me) => !!me && (typeof me.can_watch === 'boolean' ? me.can_watch : accessLevel(me) !== 'none');
// The labels, from the API when it has them; the constants in src/data/masterclass.js otherwise.
// `kit` is what THIS member pays for the kit (₹700 for a `watch` member, ₹999 otherwise).
// `pricePayload` is GET /price; pass it wherever the page has it (the constants are only for the
// moment before the API answers).
export const priceLabels = (me, pricePayload) => {
  const kit = (me && me.price) || pricePayload || {};
  const entry = (me && me.entry_price) || (pricePayload && pricePayload.entry) || {};
  const upgradeApi = (kit.upgrade && kit.label) || (pricePayload && pricePayload.kit_upgrade && pricePayload.kit_upgrade.label)
    || (me && me.kit_upgrade && me.kit_upgrade.label) || null;
  return {
    entry: entry.label || MC.ENTRY_LABEL,
    entryOpen: entry.open !== false,
    entryMessage: entry.message || null,
    kit: kit.label || MC.PRICE_LABEL,
    kitUpgrade: !!kit.upgrade,
    kitTotal: kit.kit_total_label || (kit.upgrade ? MC.PRICE_LABEL : kit.label) || MC.PRICE_LABEL,
    // The kit after joining: /me.price for a `watch` member, else /price.kit_upgrade.
    upgrade: upgradeApi || MC.UPGRADE_LABEL,
    kitOpen: kit.open !== false,
  };
};

const CHECKOUT_JS = 'https://checkout.razorpay.com/v1/checkout.js';
const PENDING_STORE = 'aumai_mc_pending'; // localStorage: { order_id, claim, email, product, at }
const PENDING_MAX_MS = 48 * 3600 * 1000;

const store = (kind) => { try { return kind === 'session' ? window.sessionStorage : window.localStorage; } catch (e) { return null; } };
export const readJson = (kind, key) => { try { return JSON.parse(store(kind)?.getItem(key) || 'null'); } catch (e) { return null; } };
export const writeJson = (kind, key, v) => { try { if (v == null) store(kind)?.removeItem(key); else store(kind)?.setItem(key, JSON.stringify(v)); } catch (e) { /* fine */ } };
export const readPending = () => {
  const p = readJson('local', PENDING_STORE);
  return p && p.order_id && p.claim && Date.now() - p.at < PENDING_MAX_MS ? p : null;
};
export const clearPending = () => writeJson('local', PENDING_STORE, null);
// Product of the order waiting for confirmation ('entry' | 'kit'), or null. Orders saved before
// 2026-10-30 carry no product: they were all the kit.
export const pendingProduct = () => { const p = readPending(); return p ? (p.product || 'kit') : null; };
// A pending order that /me already shows as done (the ₹299 when the member can watch; any order
// once they have the kit) is cleared, so no form reopens on it and offers "Check again".
export const settlePending = (me) => {
  const prod = pendingProduct();
  if (!prod || !me) return;
  const level = accessLevel(me);
  if (level === 'kit' || (prod === 'entry' && canWatch(me))) clearPending();
};

// UTM tags from the landing URL, so a payment records where the buyer came from.
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
export const readUtm = () => {
  const utm = {};
  try {
    const q = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach((k) => { if (q.get(k)) utm[k] = q.get(k).slice(0, 160); });
  } catch (e) { /* no utm */ }
  return utm;
};

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
 * The checkout flow as a hook. `onPaid(j, email, product)` runs once the backend confirms the
 * payment (from Razorpay's handler, or from order-status after a reload), with the product of
 * THAT order ('entry' | 'kit'). `j.sign_in === 'code'` means the payment is booked but did not
 * sign this browser in (backend 2026-10-30): the page sends the buyer to the code sign-in.
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

  const landPaid = useCallback((j, email, product) => {
    clearPending();
    setStage('form'); setConfirmMsg(''); setError('');
    onPaidRef.current(j, email, product || 'kit');
  }, []);

  const checkStatus = useCallback(async () => {
    const p = readPending();
    if (!p) { setStage('form'); return; }
    setChecking(true); setError('');
    try {
      const { status, j } = await call(EP.orderStatus, { order_id: p.order_id, claim: p.claim });
      const booked = !!(j.payment_booked || j.paid); // the backend's name is payment_booked; paid is its old alias
      if (booked && (j.ok || j.sign_in)) { landPaid(j, p.email, p.product); return; }
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
  const onRazorpayPaid = async (resp, email, product) => {
    setStage('confirming'); setConfirmMsg('Payment received — we are confirming it.'); setError('');
    try {
      const { status, ok, j } = await call(EP.paymentVerify, resp);
      if (ok) { landPaid(j, email, product); return; }
      if (status === 409) { setConfirmMsg(j.error); return; }
      setError(j.error || `We could not confirm the payment yet. If money left your account, it is safe: write to us at ${contact}.`);
    } catch (e) {
      setConfirmMsg('Payment received. We could not confirm it from this page yet: press Check again in a minute. We will also email you.');
    } finally { setBusy(false); }
  };

  // `body` is what /order needs: product ('entry' | 'kit'; the backend's default is 'kit'),
  // name, clinic, city, email, whatsapp, clinic_type, agree (+ utm, referrer). For a signed-in
  // member the backend takes name, email and WhatsApp from the account, so only clinic, city,
  // clinic_type and agree are sent. Nothing left to buy (409 already_paid for the kit,
  // 409 already_watching for entry): the page refetches /me instead.
  const pay = async (body) => {
    setError('');
    setBusy(true);
    try {
      const { status, ok, j } = await call(EP.order, body);
      if (status === 409 && (j.already_paid || j.already_watching)) { setBusy(false); if (onAlreadyPaidRef.current) onAlreadyPaidRef.current(j); else setError(j.error || 'You already have access.'); return; }
      if (!ok) { setError(j.error || 'Something went wrong. Please try again.'); setBusy(false); return; }
      if (!(await loadCheckout())) { setError('The payment window could not open. Check your internet connection and press Pay again.'); setBusy(false); return; }
      // Kept BEFORE the window opens: a UPI app switch may reload this page.
      writeJson('local', PENDING_STORE, { order_id: j.order_id, claim: j.claim, email: j.prefill.email, product: body.product || 'kit', at: Date.now() });
      const rz = new window.Razorpay({
        key: j.key_id, amount: j.amount, currency: j.currency, order_id: j.order_id,
        name: j.name, description: j.description, prefill: j.prefill, notes: j.notes,
        theme: { color: '#2563EB' },
        handler: (resp) => onRazorpayPaid(resp, j.prefill.email, body.product || 'kit'),
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

  const pending = readPending();
  return { stage, confirmMsg, error, setError, busy, checking, pay, checkStatus, startAgain, hasPending: !!pending, pendingProduct: pendingProduct() };
}
