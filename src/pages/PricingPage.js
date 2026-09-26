import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { ONBOARDING_NOTICE } from '../config/onboardingNotice';
import snapshot from '../data/pricing.json';
import './HomeClinic.css';
import './PricingPage.css';

/**
 * ⚠️ PRICING TRUTH RULES — read before editing.
 *
 * 1. There are NO prices in this file. Every number comes from the Aumy API's
 *    pricing rate card (EHR API mig 830) — the same rate card clinics are
 *    billed from. src/data/pricing.json is a build-time snapshot
 *    (scripts/fetch-pricing.js) for the first paint and the prerendered HTML;
 *    the page refreshes it live.
 * 2. The monthly total is never computed here. Every change asks the API's
 *    /quote endpoint, which runs the exact formula used to bill clinics. One
 *    formula, so the website can never promise a price the bill does not honour.
 * 3. To change a price: add a new rate card version in the Aumy API (effective
 *    date), then rebuild the site so the prerendered copy follows.
 */

const API = 'https://aumy.aumai.co.in/api/v1/public/pricing';
const WA = (msg) => `https://wa.me/918007189868?text=${encodeURIComponent(msg)}`;

// Starting position of the calculator — must match SAMPLE in scripts/fetch-pricing.js.
const DEFAULT_INPUTS = { tier: 'standard', enquiries: 250, patients_per_day: 20, working_days: 26, voice: false, voice_minutes: 200, own_number: true, marketing: 800, get_found: false, meta_ads: false };

const inr = (n) => `₹${Math.round(Number(n) || 0).toLocaleString('en-IN')}`;
const sameInputs = (a, b) => Object.keys(DEFAULT_INPUTS).every((k) => a[k] === b[k]);

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

// Module scope so a slider is not remounted mid-drag.
const Slider = ({ id, label, hint, value, onChange, min, max, step = 1 }) => (
  <div className="ch-calc-field">
    <div className="ch-calc-label">
      <label htmlFor={id}>{label}</label>
      <input
        className="pp-num"
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        aria-label={`${label} (number)`}
      />
    </div>
    <input id={id} type="range" min={min} max={max} step={step} value={Math.min(value, max)} onChange={(e) => onChange(Number(e.target.value))} />
    {hint && <span className="pp-hint">{hint}</span>}
  </div>
);

const Segmented = ({ label, options, value, onChange }) => (
  <div className="ch-calc-field">
    <span className="pp-field-label">{label}</span>
    <div className="ch-calc-toggle" role="group" aria-label={label}>
      {options.map(([v, text]) => (
        <button key={String(v)} type="button" className={`ch-calc-seg${value === v ? ' active' : ''}`} aria-pressed={value === v} onClick={() => onChange(v)}>
          {text}
        </button>
      ))}
    </div>
  </div>
);

// A single open band ([[null, rate]]) is a flat rate — "₹7 per minute" — with
// no "beyond" (there is no previous ceiling to name). Voice minutes went flat
// on 2026-09-17; the old code dereferenced null and blanked the page.
const bandsText = (bands, unit) => {
  let prev = null;
  return bands
    .map(([upTo, rate]) => {
      const part = upTo == null
        ? (prev == null ? `₹${rate}` : `₹${rate} beyond ${prev.toLocaleString('en-IN')}`)
        : `₹${rate} up to ${upTo.toLocaleString('en-IN')}`;
      prev = upTo;
      return part;
    })
    .join(' · ') + ` per ${unit}`;
};

const PricingPage = () => {
  const [rate, setRate] = useState(snapshot);
  const card = rate.card;
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [quote, setQuote] = useState(snapshot.sample && sameInputs(snapshot.sample.inputs, DEFAULT_INPUTS) ? snapshot.sample.quote : null);
  const [quoteState, setQuoteState] = useState('ready'); // ready | loading | error
  const [journey, setJourney] = useState(() => {
    const on = {};
    for (const g of card.capabilities || []) for (const c of g.items) if (!c.addon && !c.fixed) on[c.id] = !!c.on;
    return on;
  });
  const [dormantPace, setDormantPace] = useState({ n: 20, unit: 'day' });
  const firstQuote = useRef(true);

  const set = (patch) => setInputs((prev) => ({ ...prev, ...patch }));

  useEffect(() => {
    window.scrollTo(0, 0);
    const p = card.platformFee;
    setPageSeo({
      title: `Aumy Pricing — from ${inr(p.standard)}/month, priced by your enquiries and patient visits | AUM AI`,
      description: `Transparent pricing for dental clinics. ${inr(p.standard)}/month (Standard AI) or ${inr(p.premium)}/month (Premium AI) includes ${card.included.enquiries} enquiries and ${card.included.visits} patient visits. Work out your exact monthly price — no surprises.`,
      canonical: 'https://aumai.co.in/pricing',
    });
    // Refresh the rate card: a price change shows here without a site rebuild.
    fetch(API)
      .then((r) => (r.ok ? r.json() : null))
      .then((b) => { if (b && b.success && b.data && b.data.card) setRate((prev) => ({ ...prev, ...b.data })); })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstQuote.current && quote && sameInputs(inputs, DEFAULT_INPUTS)) {
      firstQuote.current = false;
      return undefined;
    }
    firstQuote.current = false;
    const ctl = new AbortController();
    setQuoteState('loading');
    const t = setTimeout(() => {
      const qs = new URLSearchParams(Object.entries(inputs).map(([k, v]) => [k, String(v)])).toString();
      fetch(`${API}/quote?${qs}`, { signal: ctl.signal })
        .then((r) => r.json())
        .then((b) => {
          if (!b.success) throw new Error('quote failed');
          setQuote(b.data);
          setQuoteState('ready');
        })
        .catch((e) => { if (e.name !== 'AbortError') setQuoteState('error'); });
    }, 250);
    return () => { clearTimeout(t); ctl.abort(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  const visits = inputs.patients_per_day * inputs.working_days;
  const chosenJourney = useMemo(
    () => (card.capabilities || [])
      .map((g) => ({ group: g.group, names: g.items.filter((c) => !c.addon && !c.fixed && journey[c.id]).map((c) => c.name) }))
      .filter((x) => x.names.length),
    [card, journey],
  );

  const addonOn = (c) => (c.addon === 'voice' ? inputs.voice : c.addon === 'getFound' ? inputs.get_found : inputs.meta_ads);
  const toggleAddon = (c) => {
    if (c.addon === 'voice') set({ voice: !inputs.voice });
    else if (c.addon === 'getFound') set({ get_found: !inputs.get_found });
    else set({ meta_ads: !inputs.meta_ads });
  };
  const priceOf = (c) => {
    if (c.addon === 'voice') return `${inr(card.voice.monthly)}/month + call minutes`;
    if (c.addon === 'getFound') return `${inr(card.addons.getFound.monthly)}/month`;
    if (c.addon === 'metaAds') return `${inr(card.addons.metaAds.monthly)}/month`;
    if (c.fixed) return 'Always included';
    if (c.dormant) return 'Included — as many as you choose';
    return 'Included';
  };

  const waMessage = quote
    ? `Hi, my Aumy estimate is ${inr(quote.total)}/month (${inputs.tier === 'premium' ? 'Premium' : 'Standard'} AI, ${inputs.enquiries} enquiries/month, ${inputs.patients_per_day} patients/day${inputs.voice ? ', voice agent' : ''}${inputs.get_found ? ', Get Found' : ''}${inputs.meta_ads ? ', Meta Ads' : ''}). I would like to talk it through.`
    : 'Hi, I would like pricing for my clinic.';

  const faqs = [
    {
      q: 'How is my price worked out?',
      a: `A platform fee — ${inr(card.platformFee.standard)} a month on Standard AI, ${inr(card.platformFee.premium)} on Premium — covers your first ${card.included.enquiries} enquiries and ${card.included.visits} patient visits every month. Beyond that you pay per extra enquiry and per extra visit, and the rate drops as your clinic gets busier, like tax slabs: each unit is charged at the rate of the band it falls in, so the bill never jumps at a threshold. Add-ons such as the AI voice agent, Get Found and Meta Ads management are flat monthly fees. The calculator above runs the exact formula we bill with.`,
    },
    {
      q: 'What counts as an enquiry, and what counts as a visit?',
      a: 'An enquiry is someone who is not yet your patient writing to your clinic on WhatsApp for the first time, or calling from an unknown number (hang-ups under ten seconds are not counted). A visit is an appointment that actually happened — completed, checked in or in the chair. Cancellations and no-shows are not visits.',
    },
    {
      q: 'Can I run Aumy only when my clinic is closed?',
      a: 'Yes — and most clinics should start there. In off-hours-only mode your own team answers during opening hours and Aumy covers the nights, Sundays and holidays. Since you are billed on the enquiries Aumy actually handles, covering only your closed hours costs a fraction of covering the whole day, while catching the enquiry you are most likely losing today: the one that arrives after you have gone home. It is a single setting, so you can hand Aumy the full day in a busy season or when a receptionist is on leave, and switch back afterwards.',
    },
    {
      q: 'What is the difference between Standard and Premium AI?',
      a: 'Premium runs every patient conversation on our most capable AI model: better with long, messy conversations, mixed languages and unusual requests. Standard uses a faster, lighter model that handles the everyday enquiry and booking very well. You can move between them month to month.',
    },
    {
      q: 'Are WhatsApp messages extra?',
      a: 'If you connect your own WhatsApp Business number (most clinics do), Meta bills its message fees to you directly and Aumy adds nothing on top. If your messages go out through Aumy’s number instead, those Meta fees are passed through on your invoice at the rates shown in the calculator.',
    },
    {
      q: 'What is never charged extra?',
      a: `${(card.notBilled || ['AI charting']).join(', ')}, unlimited patients and unlimited staff logins, the Clinic OS — appointments, records, dental charting, digital registration, intake and consent — and every patient-journey message: reminders, after-care, care gaps, reviews and more.`,
    },
    {
      q: 'Is there a setup fee?',
      a: card.onboarding ? `${card.onboarding.text} It covers connecting WhatsApp and your Google Business Profile, bringing your patients and appointments across, and setting up your treatments and care gaps in your own doctors’ words.` : 'Yes — it scales with how much data we migrate.',
    },
    {
      q: 'Is there a discount for paying yearly?',
      a: `Yes — pay for the year up front and save ${Math.round((card.annualPrepayDiscount || 0) * 100)}%.`,
    },
    {
      q: 'I am a small clinic. Will I pay for capacity I do not use?',
      a: `No. A clinic seeing ten patients a day, six days a week, is around 260 visits a month — well inside the ${card.included.visits} included — so it pays the platform fee and nothing more.`,
    },
    {
      q: 'Do I have to replace the software I already use?',
      a: 'Only if you want to. The patient journey works alongside your current practice management software; if that system is what is holding you back, the Clinic OS replaces it and we migrate your history across.',
    },
    {
      q: 'What about multi-clinic groups?',
      a: 'Each clinic is priced on its own enquiries and visits, all on one consolidated bill with group-level reporting.',
    },
    {
      q: 'Do prices include GST?',
      a: 'No. Prices on this page exclude GST.',
    },
  ];

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 18 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Pricing</span>
          <h1 className="ch-hero-title">Grow your clinic. Don&rsquo;t grow the chaos &mdash; or the bill.</h1>
          <p className="ch-hero-sub">
            Transparent pricing, worked out in front of you. You pay for the enquiries Aumy handles and the patient
            visits it coordinates, and the busier you get, the less each one costs. No hidden fees, no surprises.
          </p>
          <p className="pp-notice">{ONBOARDING_NOTICE.inline}</p>
        </div>
      </section>

      <section className="pp-section">
        <div className="ch-container">
          <div className="ch-calc-grid pp-grid">
            <div className="ch-calc-inputs">
              <Slider id="pp-enq" label="New enquiries per month" hint="People who are not yet patients: WhatsApp, calls, website, ads."
                value={inputs.enquiries} min={0} max={3000} step={10} onChange={(v) => set({ enquiries: v })} />
              <Slider id="pp-ppd" label="Patients seen per day" value={inputs.patients_per_day} min={0} max={150} onChange={(v) => set({ patients_per_day: v })} />
              <Slider id="pp-days" label="Working days per month" value={inputs.working_days} min={15} max={31} onChange={(v) => set({ working_days: Math.min(31, Math.max(1, v)) })} />
              <Segmented label="AI tier" value={inputs.tier} onChange={(v) => set({ tier: v })} options={[['standard', 'Standard'], ['premium', 'Premium']]} />
              <Segmented label="AI voice agent" value={inputs.voice} onChange={(v) => set({ voice: v })} options={[[false, 'Off'], [true, 'On']]} />
              {inputs.voice && (
                <Slider id="pp-vmin" label="Call minutes per month" hint="Answering calls, reminders and bookings by phone."
                  value={inputs.voice_minutes} min={0} max={2000} step={25} onChange={(v) => set({ voice_minutes: v })} />
              )}
              <Segmented label="WhatsApp number" value={inputs.own_number} onChange={(v) => set({ own_number: v })} options={[[true, 'Our own number'], [false, 'Send via Aumy']]} />
              {!inputs.own_number && (
                <Slider id="pp-mkt" label="Marketing messages per month" hint="Appointment and after-care messages are estimated from your visits."
                  value={inputs.marketing} min={0} max={10000} step={50} onChange={(v) => set({ marketing: v })} />
              )}
            </div>

            <div className="ch-calc-result pp-result" aria-live="polite">
              <p className="ch-calc-result-label">Your monthly price {quoteState === 'loading' && <span className="pp-updating">updating…</span>}</p>
              <p className="ch-calc-total">{quote ? inr(quote.total) : '—'}<span className="ch-calc-per">/month</span></p>
              <p className="ch-calc-monthly">{visits.toLocaleString('en-IN')} visits a month · {inputs.tier === 'premium' ? 'Premium' : 'Standard'} AI</p>
              {quoteState === 'error' && (
                <p className="pp-error">We could not reach the price service just now. Message us and we will send your number.</p>
              )}
              {quote && (
                <ul className="ch-calc-breakdown">
                  {quote.lines.map((l, i) => (
                    <li key={`${l.label}-${i}`}>
                      <span>{l.label}{l.sub && <small className="pp-sub">{l.sub}</small>}</span>
                      <b>{inr(l.amount)}</b>
                    </li>
                  ))}
                </ul>
              )}
              <p className="ch-calc-fine">
                {inputs.own_number ? 'With your own WhatsApp number, Meta bills message fees to you directly — Aumy adds nothing on top. ' : ''}
                Allowances reset every month. {card.onboarding ? card.onboarding.text : ''}{' '}
                {quote ? `Pay annually and save ${Math.round((card.annualPrepayDiscount || 0) * 100)}% (${inr(quote.annual_total)}/year). ` : ''}
                Prices exclude GST.
              </p>
              <a href={WA(waMessage)} className="ch-btn ch-btn-primary pp-cta">Talk this price through on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className="pp-section">
        <div className="ch-container">
          <h2 className="ch-h2 ch-center" style={{ textAlign: 'center', marginBottom: 6 }}>Choose your patient journey</h2>
          <p className="pp-lede">
            Every patient message below is included in the platform fee — switch on the ones you want. The Clinic OS is
            always part of it; add-ons show their price.
          </p>
          <div className="pp-capgroups">
            {(card.capabilities || []).map((g) => (
              <div key={g.group} className="pp-capgroup">
                <h3>{g.group}</h3>
                <p className="pp-gwhat">{g.what}</p>
                {g.items.map((c) => {
                  const isAddon = !!c.addon;
                  const on = isAddon ? addonOn(c) : !!journey[c.id];
                  return (
                    <div key={c.id} className="pp-cap">
                      <div>
                        <div className="pp-cap-name">{c.name}</div>
                        <div className="pp-cap-what">{c.what}</div>
                        <div className="pp-cap-price">{priceOf(c)}</div>
                        {c.dormant && on && (
                          <div className="pp-extra">
                            <label htmlFor="pp-dorm" className="pp-hint">Follow up</label>
                            <input id="pp-dorm" className="pp-num" type="number" min="0" value={dormantPace.n}
                              onChange={(e) => setDormantPace({ ...dormantPace, n: Math.max(0, Number(e.target.value) || 0) })} />
                            <div className="ch-calc-toggle pp-mini" role="group" aria-label="per day or per month">
                              {['day', 'month'].map((u) => (
                                <button key={u} type="button" className={`ch-calc-seg${dormantPace.unit === u ? ' active' : ''}`} aria-pressed={dormantPace.unit === u}
                                  onClick={() => setDormantPace({ ...dormantPace, unit: u })}>per {u}</button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {!c.fixed && (
                        <button type="button" role="switch" aria-checked={on} aria-label={c.name} className={`pp-switch${on ? ' on' : ''}`}
                          onClick={() => (isAddon ? toggleAddon(c) : setJourney({ ...journey, [c.id]: !journey[c.id] }))} />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {chosenJourney.length > 0 && (
            <div className="pp-included">
              <strong>Your patient journey — included:</strong>
              <ul>{chosenJourney.map((x) => <li key={x.group}><b>{x.group}:</b> {x.names.join(', ')}</li>)}</ul>
            </div>
          )}
        </div>
      </section>

      <section className="pp-section">
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center" style={{ textAlign: 'center', marginBottom: 14 }}>The rates, in full</h2>
          <div className="ch-why-card pp-rates">
            <div><Check /><span><strong>Platform fee:</strong> {inr(card.platformFee.standard)}/month Standard AI · {inr(card.platformFee.premium)}/month Premium AI — includes {card.included.enquiries} enquiries and {card.included.visits} patient visits.</span></div>
            <div><Check /><span><strong>Extra enquiries (Standard):</strong> {bandsText(card.enquiries.standard, 'enquiry')}. <strong>Premium:</strong> {bandsText(card.enquiries.premium, 'enquiry')}.</span></div>
            <div><Check /><span><strong>Extra visits (Standard):</strong> {bandsText(card.visits.standard, 'visit')}. <strong>Premium:</strong> {bandsText(card.visits.premium, 'visit')}.</span></div>
            <div><Check /><span><strong>AI voice agent:</strong> {inr(card.voice.monthly)}/month with a number and {card.voice.includedMinutes} minutes; then {bandsText(card.voice.minutes, 'minute')}.</span></div>
            <div><Check /><span><strong>Get Found:</strong> {inr(card.addons.getFound.monthly)}/month · <strong>Meta Ads management:</strong> {inr(card.addons.metaAds.monthly)}/month ({card.addons.metaAds.note}).</span></div>
            <div><Check /><span><strong>One-time setup:</strong> {card.onboarding ? card.onboarding.text : '—'} Pay yearly and save {Math.round((card.annualPrepayDiscount || 0) * 100)}%. Prices exclude GST.</span></div>
          </div>
        </div>
      </section>

      {/* Off-hours-only mode (owner 2026-09-23). A real switch, not a pitch:
          tenants.ai_receptionist_off_hours_only + voice_assistant_config.
          off_hours_only (mig 949). It belongs on the pricing page because
          that is where it changes the number — the bill follows enquiries,
          and a clinic whose team answers all day sends Aumy only the ones
          that arrive after closing. */}
      <section className="pp-section">
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center" style={{ textAlign: 'center', marginBottom: 14 }}>
            Don&rsquo;t need Aumy all day? Pay for the hours you actually need it.
          </h2>
          <div className="ch-why-card pp-rates">
            <div><Check /><span><strong>Your team answers while you&rsquo;re open.</strong> Nobody is replacing your receptionist — she is better at it, and patients can tell.</span></div>
            <div><Check /><span><strong>Aumy takes the nights, Sundays and holidays.</strong> The hours when a patient in pain messages, gets silence, and books with the clinic that answered.</span></div>
            <div><Check /><span><strong>You pay for a fraction of the enquiries.</strong> The bill follows what Aumy handles, so covering only the closed hours costs a fraction of covering all of them.</span></div>
            <div><Check /><span><strong>Switch it on or off whenever you like.</strong> One setting. Busy season, or a receptionist on leave — turn it on for the full day and back again.</span></div>
          </div>
          <p className="ch-center" style={{ textAlign: 'center', marginTop: 12, opacity: 0.85 }}>
            The after-hours enquiry is the one you are losing today. This is the cheapest way to stop losing it.
          </p>
        </div>
      </section>

      <section className="pp-section" style={{ paddingBottom: 56 }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center" style={{ textAlign: 'center', marginBottom: 16 }}>Questions clinics actually ask</h2>
          <div className="ch-faq">
            {faqs.map((f) => (
              <details key={f.q} className="ch-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 34 }}>
            <h2 className="ch-h2" style={{ marginBottom: 8 }}>Your number, then a conversation.</h2>
            <p className="pp-lede" style={{ marginBottom: 18 }}>
              Send us the estimate above and we will check it against how your clinic actually runs — same day.
            </p>
            <div className="ch-hero-cta" style={{ justifyContent: 'center' }}>
              <a href={WA(waMessage)} className="ch-btn ch-btn-primary">Send my estimate on WhatsApp</a>
              <Link to="/growth-audit" className="ch-btn ch-btn-ghost">Or start with a free Growth Audit</Link>
            </div>
            <p className="pp-notice">{ONBOARDING_NOTICE.inline}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
