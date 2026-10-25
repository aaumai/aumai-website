import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MC from '../data/masterclass';
import { CLINIC_TYPES, useMasterclassCheckout } from '../lib/masterclassCheckout';

// A signed-in FREE member buys the kit (owner 2026-10-25): clinic, city, clinic type and
// the non-refundable agree box; name, email and WhatsApp come from the account (the
// backend takes them from the member cookie, so they are shown, not sent). Used on
// /masterclass/my (inline, under "Your kit") and on /masterclass/register (when a free
// member lands there). One payment, no renewal.
//
// Props: me (from /me), price (from /me.price or /price: { open, label, one_time }),
// onPaid(j), onAlreadyPaid(j) (409 already_paid: refetch /me), contact (email),
// utm (object, optional). `price.open === false` shows why Pay is not offered.

export default function MasterclassUnlockForm({ me, price, onPaid, onAlreadyPaid, contact, utm }) {
  const [f, setF] = useState({ clinic: me.clinic || '', city: me.city || '', clinic_type: me.clinic_type || '', agree: false });
  const co = useMasterclassCheckout({ onPaid, onAlreadyPaid, contact });
  const name = me.name || me.display_name || '';
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const label = (price && price.label) || MC.PRICE_LABEL;

  const submit = (e) => {
    e.preventDefault();
    co.pay({ clinic: f.clinic, city: f.city, clinic_type: f.clinic_type, agree: f.agree, utm: utm || {}, referrer: document.referrer || null });
  };

  if (co.stage === 'confirming') {
    return (
      <div className="sc-form mc-unlock" role="status">
        <h3>Payment received — we are confirming it</h3>
        <p>{co.confirmMsg || 'We are checking your payment. This can take a few minutes.'}</p>
        {co.error && <p className="sc-error" role="alert">{co.error}</p>}
        <button type="button" className="sc-btn mc-btn-wide" onClick={co.checkStatus} disabled={co.checking}>{co.checking ? 'Checking…' : 'Check again'}</button>
        <p className="mc-help">You do not need to pay again. Your downloads open as soon as the payment is confirmed. Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
        {co.hasPending && <button type="button" className="sc-link" onClick={co.startAgain}>I did not pay. Start again</button>}
      </div>
    );
  }

  if (price && price.open === false) {
    return (
      <div className="sc-form mc-unlock" role="status">
        <h3>The kit is not on sale right now</h3>
        <p>{price.message || 'Please check again later.'} Questions: <a href={`mailto:${contact}`}>{contact}</a>.</p>
      </div>
    );
  }

  return (
    <form className="sc-form mc-unlock" onSubmit={submit} noValidate aria-label="Unlock the kit">
      <h3>Unlock the kit</h3>
      <dl className="mc-readonly">
        <div><dt>Name</dt><dd>{name}</dd></div>
        <div><dt>Email</dt><dd>{me.email}</dd></div>
        {me.whatsapp && <div><dt>WhatsApp</dt><dd>{me.whatsapp}</dd></div>}
      </dl>
      <div className="sc-fields" style={{ gridTemplateColumns: '1fr' }}>
        <label>Clinic name<input className="mc-input" value={f.clinic} onChange={set('clinic')} placeholder="Smile Care Clinic" autoComplete="organization" required /></label>
        <label>City<input className="mc-input" value={f.city} onChange={set('city')} placeholder="Pune" autoComplete="address-level2" required /></label>
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
      {co.error && <p className="sc-error" role="alert">{co.error}</p>}
      <button type="submit" className="sc-btn mc-btn-wide" disabled={co.busy}>{co.busy ? 'Opening the payment…' : `Pay ${label} once`}</button>
      <p className="mc-help">{MC.MEMBER.unlockHelp}</p>
    </form>
  );
}
