import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { INDIA_OFFICE } from '../config/contact';
import MC from '../data/masterclass';
import MasterclassUnlockForm from '../components/MasterclassUnlockForm';
import { API, EP, CLINIC_TYPES, accessLevel, priceLabels, readJson, readUtm, writeJson, useMasterclassCheckout, validEmail } from '../lib/masterclassCheckout';
import './ScorecardPage.css';
import './MasterclassPage.css';

// Get the kit (owner 2026-10-18, re-worded 2026-10-25): the "pay straight away" path. The kit
// is product 'kit' (owner 2026-10-30): ₹999, watching the masterclass included; a signed-in member
// who joined for ₹299 pays ₹700 more (the backend decides the amount; /me.price says it).
// One screen: create the account and pay through Razorpay Checkout in one go; the
// account is made the moment the payment is confirmed. The masterclass itself plays on
// /masterclass once the member has joined; this page sells the kit, once.
// A signed-in member without the kit who lands here gets the unlock form, prefilled. A kit
// member sees "You already have access". The price and whether the kit is on sale come
// from the site backend; nothing about money is typed into this page. Out of the
// sitemap for now. The Razorpay flow itself lives in src/lib/masterclassCheckout.js.

const FORM_STORE = 'aumai_mc_form';       // sessionStorage: the form, so a retry needs no retyping
const EMPTY = { name: '', clinic: '', city: '', email: '', whatsapp: '', clinic_type: '', agree: false };

export default function MasterclassRegister() {
  const navigate = useNavigate();
  const [price, setPrice] = useState(null); // { open, label, lifetime, starts_on, starts_on_label, message }
  const [priceError, setPriceError] = useState('');
  const [have, setHave] = useState(null);   // already signed in: /me
  const [f, setF] = useState(() => ({ ...EMPTY, ...(readJson('session', FORM_STORE) || {}), agree: false }));
  const utm = useRef({});
  const contact = INDIA_OFFICE.email;

  // Paid and booked: go to the members area (signed in), or to code sign-in.
  const landPaid = useCallback((j, email) => {
    writeJson('session', FORM_STORE, null);
    if (j.sign_in === 'code') navigate(MC.PATHS.signIn, { replace: true, state: { justPaid: true, email: j.email || email } });
    else navigate(MC.PATHS.my, { replace: true, state: { justPaid: true } });
  }, [navigate]);
  const co = useMasterclassCheckout({ onPaid: landPaid, contact });

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'Get The Full Chair Method kit | AUM AI',
      description: MC.REGISTER_SEO_DESCRIPTION,
      canonical: `https://aumai.co.in${MC.PATHS.register}`,
    });
    utm.current = readUtm();
    fetch(`${API}${EP.price}`).then((r) => r.json()).then(setPrice)
      .catch(() => setPriceError('We could not connect. Check your internet connection and refresh the page.'));
    fetch(`${API}${EP.me}`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : null)).then((j) => { if (j && j.ok) setHave(j); }).catch(() => { /* not signed in */ });
  }, []);

  const set = (k) => (e) => {
    const next = { ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value };
    setF(next);
    const { agree, ...keep } = next;
    writeJson('session', FORM_STORE, keep);
  };

  const pay = (e) => { e.preventDefault(); co.pay({ product: 'kit', ...f, utm: utm.current, referrer: document.referrer || null }); };

  const open = price && price.open;
  const L = priceLabels(have, price);
  const label = L.kit;
  const todayIst = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
  const hasKit = have && accessLevel(have) === 'kit';
  const freeMember = have && !hasKit; // signed in, kit not bought yet (joined or not)
  return (
    <div className="sc-root">
      <div className="sc-wrap mc-narrow mc-hero">
        <p className="sc-eyebrow">The Full Chair Method · Masterclass</p>
        <h1>{L.kitUpgrade ? `Get the kit · ${label} more` : `Get the kit · ${label} once`}</h1>
        {/* A member who joined for ₹299 already watches: the kit only, for the difference (owner 2026-10-30). */}
        <p className="mc-access">{L.kitUpgrade ? MC.REGISTER.leadUpgrade(L.kit, L.kitTotal, L.entry) : MC.REGISTER.lead}</p>
        <ul className="mc-points">
          {(L.kitUpgrade ? MC.REGISTER.pointsKitOnly(MC.REGISTER.points) : MC.REGISTER.points).map((p) => <li key={p}>{p.includes(MC.WHATSAPP.display)
            ? <>{p.split(MC.WHATSAPP.display)[0]}<a href={MC.WHATSAPP.link} target="_blank" rel="noopener noreferrer">{MC.WHATSAPP.display}</a>{p.split(MC.WHATSAPP.display)[1]}</>
            : p}</li>)}
        </ul>
        <p className="mc-help"><Link to={MC.PATHS.info}>See everything the masterclass covers</Link></p>
        {!have && <p className="mc-watch-free"><Link to={`${MC.PATHS.info}#watch`}>{MC.REGISTER.watchLink}</Link></p>}

        {co.stage === 'confirming' && (
          <div className="sc-form" role="status">
            <h2>Payment received — we are confirming it</h2>
            <p>{co.confirmMsg || 'We are checking your payment. This can take a few minutes.'}</p>
            {co.error && <p className="sc-error" role="alert">{co.error}</p>}
            <button type="button" className="sc-btn mc-btn-wide" onClick={co.checkStatus} disabled={co.checking}>{co.checking ? 'Checking…' : 'Check again'}</button>
            <p className="mc-help">You do not need to pay again. We also email you how to sign in as soon as the payment is confirmed. Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
            {!co.hasPending ? null : <button type="button" className="sc-link" onClick={co.startAgain}>I did not pay. Start again</button>}
          </div>
        )}

        {co.stage === 'form' && (
          <>
            {priceError && <p className="sc-error" role="alert">{priceError}</p>}
            {price && !open && !freeMember && (
              <div className="sc-form" role="status">
                <h2>The kit is not on sale right now</h2>
                <p>{price.message || 'Please check again later.'} Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
              </div>
            )}

            {/* Lifetime access (owner 2026-10-20): a paid member has nothing more to buy. */}
            {hasKit && (
              <div className="sc-form" role="status">
                <h2>You already have access</h2>
                <p>You already have <b>lifetime access</b>, kit included. Open your masterclass any time.</p>
                <Link className="sc-btn mc-btn-wide" to={MC.PATHS.my} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Open my masterclass</Link>
              </div>
            )}

            {/* A free member (owner 2026-10-25): the same unlock form as on their masterclass page. */}
            {freeMember && price && (
              <>
                <p className="mc-sent" role="status">You are signed in as <b>{have.email}</b>. Unlock the kit below, and every download opens on your masterclass page.</p>
                <MasterclassUnlockForm me={have} price={price} onPaid={(j, email) => (j && j.sign_in === 'code' ? landPaid(j, email) : navigate(MC.PATHS.my, { replace: true, state: { justUnlocked: true } }))} onAlreadyPaid={() => setHave((h) => ({ ...h, paid: true, access_level: 'kit', can_watch: true }))} contact={contact} utm={utm.current} />
              </>
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
                      {CLINIC_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </label>
                </div>
                <label className="sc-consent" style={{ fontSize: 15 }}>
                  <input type="checkbox" checked={f.agree} onChange={set('agree')} style={{ width: 22, height: 22 }} />
                  <span>I understand the kit fee is <Link to="/refund#masterclass" target="_blank" rel="noopener">non-refundable</Link>, and I agree to the <Link to="/terms" target="_blank" rel="noopener">terms</Link>.</span>
                </label>
                {validEmail(f.email) && <p className="mc-help" style={{ color: 'var(--sc-ink)' }}>Your sign-in code will go to: <b>{f.email.trim().toLowerCase()}</b></p>}
                {co.error && <p className="sc-error" role="alert">{co.error}</p>}
                <button type="submit" className="sc-btn mc-btn-wide" disabled={co.busy}>{co.busy ? 'Opening the payment…' : `Pay ${label} once`}</button>
                <p className="mc-help">Secure payment by Razorpay: UPI, card or net banking. Your access starts {price.starts_on <= todayIst ? 'today' : `on ${price.starts_on_label}`}, and we email you how to sign in.</p>
              </form>
            )}
          </>
        )}

        <p className="mc-help">{!have && <>Already have an account? <Link to={MC.PATHS.signIn}>Sign in</Link>. </>}Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
      </div>
    </div>
  );
}
