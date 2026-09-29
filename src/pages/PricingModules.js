import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ONBOARDING_NOTICE } from '../config/onboardingNotice';
import snapshot from '../data/pricing.json';
import { priceText, setupText, moduleById, usagesOf } from '../data/pricingView';
import { PRICING_API, WA, inr, Check, Slider, Segmented } from './pricingParts';

/**
 * /pricing for the MODULE price list (API mig 987, owner 2026-09-29):
 * "people can pick and choose what they want".
 *
 * ⚠️ PRICING TRUTH RULES — the same as the usage layout.
 * 1. There are NO prices in this file. Names, descriptions and every number
 *    come from the rate card; this file only lays them out.
 * 2. No total is computed here. Every change asks the API's /quote, so the
 *    site cannot show a sum the product would not.
 *
 * Who reads this page: a clinic owner or a dentist, not a software buyer. So
 * each module is one card with a switch, its price in plain words, and a
 * slider only where the price depends on how much they use. The answer sits
 * beside it and says what is paid every month, once a year, and once.
 */

// Starting position — must match MODULE_SAMPLE in scripts/fetch-pricing.js.
export const MODULE_DEFAULTS = {
  modules: ['clinic_os', 'patient_journey'],
  tier: 'standard',
  usage: { notes_read: 300, dictated_visits: 20, chats: 300, voice_minutes: 200 },
};

const USAGE_UI = {
  chats: { label: 'Chats per month', max: 3000, step: 10, definition: 'chat' },
  voice_minutes: { label: 'Call minutes per month', max: 2000, step: 25, definition: 'voiceMinute' },
  notes_read: { label: 'Notes read per month', max: 3000, step: 10, definition: 'noteRead' },
  dictated_visits: { label: 'Dictated visits per month', max: 1000, step: 5, definition: 'dictatedVisit' },
};
const PERIODS = [
  ['monthly', 'Every month'],
  ['yearly', 'Every year'],
  ['one_time', 'Once, at the start'],
];

const queryOf = (sel) => {
  const q = new URLSearchParams({ modules: sel.modules.join(','), tier: sel.tier });
  for (const [k, v] of Object.entries(sel.usage)) q.set(k, String(v));
  return q.toString();
};
const sameSelection = (a, b) => !!a && !!b && queryOf(a) === queryOf(b);

const PricingModules = ({ rate }) => {
  const card = rate.card;
  const sample = snapshot.sample && snapshot.sample.inputs && Array.isArray(snapshot.sample.inputs.modules) ? snapshot.sample : null;
  const [sel, setSel] = useState(MODULE_DEFAULTS);
  const [quote, setQuote] = useState(sample && sameSelection(sample.inputs, MODULE_DEFAULTS) ? sample.quote : null);
  const [quoteState, setQuoteState] = useState('ready'); // ready | loading | error
  const firstQuote = useRef(true);

  const on = (id) => sel.modules.includes(id);
  const toggle = (id) => setSel((prev) => {
    const has = prev.modules.includes(id);
    let next = has ? prev.modules.filter((x) => x !== id) : [...prev.modules, id];
    if (!has) {
      // Switching a module on brings what it needs with it.
      for (const need of (moduleById(card, id) || {}).requires || []) if (!next.includes(need)) next.push(need);
    } else {
      // Switching one off takes off what cannot work without it.
      next = next.filter((x) => !(((moduleById(card, x) || {}).requires || []).includes(id)));
    }
    return { ...prev, modules: card.modules.map((m) => m.id).filter((x) => next.includes(x)) };
  });
  const setUsage = (key, v) => setSel((prev) => ({ ...prev, usage: { ...prev.usage, [key]: v } }));

  useEffect(() => {
    if (firstQuote.current && quote && sameSelection(sel, MODULE_DEFAULTS)) {
      firstQuote.current = false;
      return undefined;
    }
    firstQuote.current = false;
    if (sel.modules.length === 0) {
      setQuote(null);
      setQuoteState('ready');
      return undefined;
    }
    const ctl = new AbortController();
    setQuoteState('loading');
    const t = setTimeout(() => {
      fetch(`${PRICING_API}/quote?${queryOf(sel)}`, { signal: ctl.signal })
        .then((r) => r.json())
        .then((b) => {
          if (!b.success || b.data.model !== 'modules') throw new Error('quote failed');
          setQuote(b.data);
          setQuoteState('ready');
        })
        .catch((e) => { if (e.name !== 'AbortError') setQuoteState('error'); });
    }, 250);
    return () => { clearTimeout(t); ctl.abort(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel]);

  const tiered = card.modules.some((m) => on(m.id) && usagesOf(m).some((u) => typeof u.rate !== 'number'));
  // What is owed, largest rhythm first. The first one that applies is the
  // headline: a clinic taking only the Clinic OS pays by the year, so its
  // headline is the yearly figure, not "₹0 a month".
  const figures = quote ? [
    { key: 'monthly', value: quote.monthly_total, per: '/month', words: 'every month' },
    { key: 'yearly', value: quote.yearly_total, per: '/year', words: 'every year' },
    { key: 'one_time', value: quote.one_time_total, per: '', words: 'once, at the start' },
  ].filter((f) => f.value > 0) : [];
  const chosenNames = card.modules.filter((m) => on(m.id)).map((m) => m.name);
  const linesOf = (period) => (quote ? quote.lines.filter((l) => l.period === period) : []);
  const defs = card.definitions || {};
  const tiers = card.tiers || {};

  const waMessage = quote && chosenNames.length
    ? `Hi, my Aumy estimate is ${figures.map((f) => `${inr(f.value)} ${f.words}`).join(', ')} for: ${chosenNames.join(', ')}. I would like to talk it through.`
    : 'Hi, I would like pricing for my clinic.';

  const receptionist = moduleById(card, 'ai_receptionist');
  const journey = moduleById(card, 'patient_journey');
  const faqs = useMemo(() => [
    {
      q: 'How is my price worked out?',
      a: 'You pick the modules your clinic needs and pay for those only. Each module has its own price: some are a fixed fee, and some follow how much you use them. The calculator above adds them up with the same prices we quote on a call.',
    },
    {
      q: 'Do I have to take everything?',
      a: 'No. Take one module or take them all. A clinic can run only the Clinic OS, only the patient journey alongside the software it already has, or add the AI receptionist later.',
    },
    ...(defs.chat ? [{ q: 'What counts as a chat?', a: defs.chat }] : []),
    ...(defs.noteRead ? [{ q: 'What counts as a note read?', a: defs.noteRead }] : []),
    ...(defs.dictatedVisit ? [{ q: 'What counts as a dictated visit?', a: defs.dictatedVisit }] : []),
    ...(defs.voiceMinute ? [{ q: 'What counts as a call minute?', a: defs.voiceMinute }] : []),
    ...(tiers.standard && tiers.premium ? [{
      q: 'What is the difference between Standard and Premium AI?',
      a: `Standard AI: ${tiers.standard.what} Premium AI: ${tiers.premium.what} You can move between them month to month.`,
    }] : []),
    {
      q: 'Can I run the AI receptionist only when my clinic is closed?',
      a: 'Yes, and most clinics should start there. Your own team answers during opening hours and Aumy covers the nights, Sundays and holidays. You pay for the chats Aumy handles, so covering only your closed hours costs a fraction of covering the whole day. It is a single setting, so you can hand Aumy the full day in a busy season and switch back afterwards.',
    },
    ...(journey && (journey.notes || []).length ? [{ q: 'Are WhatsApp messages extra?', a: journey.notes.filter((n) => /whatsapp/i.test(n)).join(' ') || 'WhatsApp message charges are paid by the clinic directly.' }] : []),
    { q: 'Is there a setup fee?', a: setupText(card, inr) },
    {
      q: 'Do I have to replace the software I already use?',
      a: 'Only if you want to. The patient journey works alongside your current practice management software; if that system is what is holding you back, the Clinic OS replaces it. Moving your records across is scoped on a call.',
    },
    { q: 'What about multi-clinic groups?', a: 'Each clinic picks its own modules, all on one consolidated bill with group-level reporting.' },
    { q: 'Do prices include GST?', a: 'No. Prices on this page exclude GST.' },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [card]);

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 18 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Pricing</span>
          <h1 className="ch-hero-title">Pick only what your clinic needs.</h1>
          <p className="ch-hero-sub">
            Every module has its own price. Take one, or take them all, and add more when you are ready.
            Switch on what you want below and see your price. No hidden fees, no surprises.
          </p>
          <p className="pp-notice">{ONBOARDING_NOTICE.inline}</p>
        </div>
      </section>

      <section className="pp-section">
        <div className="ch-container">
          <div className="ch-calc-grid pp-grid">
            <div className="pp-modules">
              {card.modules.map((m) => {
                const isOn = on(m.id);
                const usages = usagesOf(m);
                const tieredUse = usages.find((u) => typeof u.rate !== 'number');
                const needs = (m.requires || []).map((id) => (moduleById(card, id) || {}).name).filter(Boolean);
                return (
                  <div key={m.id} className={`pp-module${isOn ? ' on' : ''}`} data-module={m.id}>
                    <div className="pp-module-head">
                      <div>
                        <h2 className="pp-module-name">{m.name}</h2>
                        <p className="pp-cap-what">{m.what}</p>
                        <p className="pp-module-price">{priceText(m, inr)}</p>
                        {needs.length > 0 && <p className="pp-hint">Works with {needs.join(' and ')}.</p>}
                      </div>
                      <button type="button" role="switch" aria-checked={isOn} aria-label={m.name}
                        className={`pp-switch${isOn ? ' on' : ''}`} onClick={() => toggle(m.id)} />
                    </div>
                    {(m.includes || []).length > 0 && (
                      <ul className="pp-module-list">{m.includes.map((x) => <li key={x}>{x}</li>)}</ul>
                    )}
                    {(m.notes || []).map((n) => <p key={n} className="pp-hint pp-module-note">{n}</p>)}
                    {isOn && tieredUse && (
                      <Segmented label="AI tier" value={sel.tier} onChange={(v) => setSel((p) => ({ ...p, tier: v }))}
                        options={[['standard', `${(tiers.standard || {}).label || 'Standard AI'} · ${inr(tieredUse.rate.standard)}`], ['premium', `${(tiers.premium || {}).label || 'Premium AI'} · ${inr(tieredUse.rate.premium)}`]]} />
                    )}
                    {isOn && usages.map((u) => {
                      const ui = USAGE_UI[u.key] || { label: `${u.unit}s per month`, max: 3000, step: 10 };
                      return (
                        <Slider key={u.key} id={`pp-${u.key}`} label={ui.label} hint={ui.definition ? defs[ui.definition] : undefined}
                          value={sel.usage[u.key] || 0} min={0} max={ui.max} step={ui.step} onChange={(v) => setUsage(u.key, v)} />
                      );
                    })}
                    {(m.capabilities || []).length > 0 && (
                      <details className="pp-module-more">
                        <summary>See everything it includes</summary>
                        {m.capabilities.map((g) => (
                          <div key={g.group} className="pp-module-group">
                            <h3>{g.group}</h3>
                            <p className="pp-gwhat">{g.what}</p>
                            <ul>{g.items.map((c) => <li key={c.id}><b>{c.name}.</b> {c.what}</li>)}</ul>
                          </div>
                        ))}
                      </details>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="ch-calc-result pp-result" aria-live="polite">
              <p className="ch-calc-result-label">Your price{figures.length ? `, ${figures[0].words}` : ''} {quoteState === 'loading' && <span className="pp-updating">updating…</span>}</p>
              <p className="ch-calc-total">{figures.length ? inr(figures[0].value) : '—'}{figures.length > 0 && <span className="ch-calc-per">{figures[0].per}</span>}</p>
              {sel.modules.length === 0 && (
                <p className="pp-error">Nothing is switched on. Switch on a module to see your price.</p>
              )}
              {figures.length > 1 && (
                <p className="ch-calc-monthly">
                  plus {figures.slice(1).map((f) => `${inr(f.value)} ${f.words}`).join(' · ')}
                </p>
              )}
              {quoteState === 'error' && (
                <p className="pp-error">We could not reach the price service just now. Message us and we will send your number.</p>
              )}
              {quote && PERIODS.map(([period, title]) => (linesOf(period).length > 0 && (
                <div key={period} className="pp-period">
                  <p className="pp-period-title">{title}</p>
                  <ul className="ch-calc-breakdown">
                    {linesOf(period).map((l, i) => (
                      <li key={`${l.label}-${i}`}>
                        <span>{l.label}{/ × /.test(l.sub || '') && <small className="pp-sub">{l.sub}</small>}</span>
                        <b>{inr(l.amount)}</b>
                      </li>
                    ))}
                  </ul>
                </div>
              )))}
              {quote && (
                <p className="ch-calc-fine">
                  First year {inr(quote.first_year_total)}; every year after {inr(quote.later_year_total)}.{' '}
                  {tiered ? `${sel.tier === 'premium' ? 'Premium' : 'Standard'} AI. ` : ''}
                  Prices exclude GST.
                </p>
              )}
              <a href={WA(waMessage)} className="ch-btn ch-btn-primary pp-cta">Talk this price through on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className="pp-section">
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center" style={{ textAlign: 'center', marginBottom: 14 }}>The prices, in full</h2>
          <div className="ch-why-card pp-rates">
            {card.modules.map((m) => (
              <div key={m.id}><Check /><span><strong>{m.name}:</strong> {priceText(m, inr)}</span></div>
            ))}
            <div><Check /><span>Prices exclude GST.</span></div>
          </div>
        </div>
      </section>

      {receptionist && (
        <section className="pp-section">
          <div className="ch-container ch-narrow">
            <h2 className="ch-h2 ch-center" style={{ textAlign: 'center', marginBottom: 14 }}>
              Don&rsquo;t need the AI receptionist all day? Pay for the hours you actually need it.
            </h2>
            <div className="ch-why-card pp-rates">
              <div><Check /><span><strong>Your team answers while you&rsquo;re open.</strong> Nobody is replacing your receptionist. She is better at it, and patients can tell.</span></div>
              <div><Check /><span><strong>Aumy takes the nights, Sundays and holidays.</strong> The hours when a patient in pain messages, gets silence, and books with the clinic that answered.</span></div>
              <div><Check /><span><strong>You pay for a fraction of the chats.</strong> The bill follows what Aumy handles, so covering only the closed hours costs a fraction of covering all of them.</span></div>
              <div><Check /><span><strong>Switch it on or off whenever you like.</strong> One setting. Busy season, or a receptionist on leave: turn it on for the full day and back again.</span></div>
            </div>
          </div>
        </section>
      )}

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
              Send us the estimate above and we will check it against how your clinic actually runs, the same day.
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

export default PricingModules;
