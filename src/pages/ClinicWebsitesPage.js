import React, { useEffect, useState } from 'react';
import { setPageSeo } from '../utils/seo';
import CW from '../data/clinicWebsites';
import './HomeClinic.css';
import './ClinicWebsitesPage.css';

// Clinic websites built for search (owner 2026-10-19): the service page, with
// sterlingdentalclinic.com as the case study. Built from the site's clinic system
// (.ch-*) under the lux theme, like /masterclass. Every word is in
// src/data/clinicWebsites.js, shared with scripts/prerender.js. The audit form
// posts to the same contact endpoint as /growth-audit.

const CONTACT_API = 'https://dabbewaala.aumai.co.in/api/aumai/contact';

// Line icons for "What we build", in the order of CW.BUILD.items.
const ICONS = [
  'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6', // treatment pages
  'M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21zm0-9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z', // areas
  'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z', // international
  'M4 5h16v14H4zM8 9h8M8 13h8M8 17h5', // blogs
  'M13 3L5 13h6l-1 8 8-10h-6z', // technical SEO (speed)
  'M12 2l2.6 6.3L21 9l-5 4.3L17.4 20 12 16.6 6.6 20 8 13.3 3 9l6.4-.7z', // GBP (star)
  'M5 20V10M10 20V4M15 20v-7M20 20v-11M3 20h18', // analytics
  'M4 5h16v10H8l-4 4zM8 9h8M8 12h5', // enquiries
];
const Icon = ({ d }) => (
  <svg className="cw-icon" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const Pic = ({ img, eager, className }) => (
  <img className={className} src={img.src} width={img.w} height={img.h} alt={img.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
);
const WaLink = ({ children, className }) => (
  <a className={className} href={CW.WHATSAPP.link} target="_blank" rel="noopener noreferrer">{children}</a>
);
// The WhatsApp number inside a sentence becomes a link.
const withWa = (text) => {
  const parts = String(text).split(CW.WHATSAPP.display);
  return parts.length < 2 ? text : parts.reduce((acc, p, i) => (i ? [...acc, <WaLink key={i}>{CW.WHATSAPP.display}</WaLink>, p] : [p]), []);
};

// Desktop screenshot in a browser frame, the phone screenshot in front of it.
const Devices = ({ eager }) => (
  <div className="cw-devices">
    <div className="cw-browser">
      <div className="cw-browser-bar" aria-hidden="true"><i /><i /><i /><span>sterlingdentalclinic.com</span></div>
      <Pic img={CW.IMG.desktop} eager={eager} />
    </div>
    <div className="cw-phone"><Pic img={CW.IMG.phone} eager={eager} /></div>
  </div>
);

const EMPTY = { name: '', clinic: '', city: '', whatsapp: '', website: '', goal: '' };

export default function ClinicWebsitesPage() {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({ title: CW.SEO.title, description: CW.SEO.description, canonical: `https://aumai.co.in${CW.PATH}`, image: `https://aumai.co.in${CW.IMG.desktop.src}` });
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: 'not-provided@aumai.co.in',
          company: `${form.clinic} (${form.city})`,
          service: 'Clinic Website Audit',
          message: [
            'CLINIC WEBSITE AUDIT REQUEST',
            `Clinic: ${form.clinic}`,
            `City/Area: ${form.city}`,
            `WhatsApp: ${form.whatsapp}`,
            `Current website: ${form.website || 'none'}`,
            form.goal ? `Wants: ${form.goal}` : null,
          ].filter(Boolean).join('\n'),
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to send');
      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      console.error('Website audit form error:', err);
      setStatus('error'); // the form keeps what they typed
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="ch-home cw-page">
      {/* Hero */}
      <section className="ch-hero lux-hero cw-hero">
        <div className="ch-container">
          <div className="ch-hero-grid lux-hero-grid cw-hero-grid">
            <div className="ch-hero-text">
              <span className="ch-eyebrow">{CW.HERO.eyebrow}</span>
              <h1 className="ch-hero-title cw-hero-title">{CW.HERO.titleA} <span className="ch-hero-accent">{CW.HERO.titleB}</span></h1>
              <p className="ch-hero-sub">{CW.HERO.sub}</p>
              <div className="ch-hero-cta">
                <a className="ch-btn ch-btn-primary" href="#audit">{CW.HERO.cta}</a>
                <a className="ch-btn ch-btn-ghost" href="#sterling">See the Sterling website</a>
              </div>
              <p className="cw-wa">or <WaLink>WhatsApp {CW.WHATSAPP.display}</WaLink></p>
              <p className="ch-hero-trust">{CW.HERO.trust}</p>
            </div>
            <figure className="cw-hero-figure">
              <Devices eager />
              <figcaption>{CW.HERO.caption}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Why most clinic websites don't bring patients */}
      <section className="ch-section" aria-labelledby="cw-why">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">The problem</span>
            <h2 id="cw-why" className="ch-h2">{CW.PROBLEMS.title}</h2>
            <p className="ch-lead ch-center-lead">{CW.PROBLEMS.intro}</p>
          </div>
          <ol className="cw-problems">
            {CW.PROBLEMS.items.map((p, i) => (
              <li key={p.h}>
                <span className="cw-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.h}</h3>
                <p>{p.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we build */}
      <section className="ch-section ch-tint" aria-labelledby="cw-build">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">What we build</span>
            <h2 id="cw-build" className="ch-h2">{CW.BUILD.headingA} <em>{CW.BUILD.headingEm}</em> {CW.BUILD.headingB}</h2>
            <p className="ch-lead ch-center-lead">{CW.BUILD.intro}</p>
          </div>
          <ul className="cw-build">
            {CW.BUILD.items.map((b, i) => (
              <li key={b.h} className={`cw-card${i === CW.BUILD.items.length - 1 ? ' cw-card-aumy' : ''}`}>
                <Icon d={ICONS[i] || ICONS[0]} />
                <h3>{b.h}</h3>
                <p>{b.t}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Case study: Sterling */}
      <section className="ch-section" id="sterling" aria-labelledby="cw-case">
        <div className="ch-container">
          <div className="cw-case-head">
            <span className="ch-eyebrow">{CW.CASE.eyebrow}</span>
            <h2 id="cw-case" className="ch-h2">{CW.CASE.title}</h2>
            <p className="ch-lead">{CW.CASE.intro}</p>
          </div>
          <figure className="cw-case-shot">
            <Devices />
          </figure>
          <ul className="cw-stats">
            {CW.CASE.stats.map((s) => <li key={s.t}><strong>{s.n}</strong><span>{s.t}</span></li>)}
          </ul>
          <div className="cw-case-grid">
            <div>
              <h3 className="cw-h3">What we did</h3>
              <ul className="cw-did">{CW.CASE.did.map((d) => <li key={d}>{d}</li>)}</ul>
            </div>
            <aside className="cw-goal">
              <span className="ch-eyebrow">The goal</span>
              <h3>{CW.CASE.goalTitle}</h3>
              <p>{CW.CASE.goal}</p>
              <a className="ch-btn ch-btn-primary" href={CW.CASE.link.href} target="_blank" rel="noopener noreferrer">{CW.CASE.link.label}</a>
              <p className="cw-credit">{CW.CASE.credit}</p>
            </aside>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="ch-section ch-tint" aria-labelledby="cw-how">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">How it works</span>
            <h2 id="cw-how" className="ch-h2">{CW.STEPS.title}</h2>
          </div>
          <ol className="cw-steps">
            {CW.STEPS.items.map((s, i) => (
              <li key={s.h}>
                <span className="cw-step-n">Step {i + 1}</span>
                <h3>{s.h}</h3>
                <p>{s.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="ch-section" aria-labelledby="cw-faq">
        <div className="ch-container ch-narrow">
          <div className="ch-head cw-faq-head">
            <span className="ch-eyebrow">What you get</span>
            <h2 id="cw-faq" className="ch-h2">Questions, answered</h2>
          </div>
          <div className="ch-faq">
            {CW.FAQS.map((f) => (
              <details key={f.q} className="ch-faq-item">
                <summary>{f.q}</summary>
                <p>{withWa(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* The audit form */}
      <section className="ch-section ch-tint" id="audit" aria-labelledby="cw-audit">
        <div className="ch-container">
          <div className="ch-audit-grid cw-audit-grid">
            <div>
              <span className="ch-eyebrow">Free</span>
              <h2 id="cw-audit" className="ch-h2">{CW.AUDIT.title}</h2>
              <p className="ch-lead">{CW.AUDIT.intro}</p>
              <p className="cw-wa cw-wa-dark">Prefer to talk? <WaLink>WhatsApp {CW.WHATSAPP.display}</WaLink></p>
            </div>
            <form className="ch-audit-form" onSubmit={onSubmit}>
              <div className="ch-field">
                <label htmlFor="cw-name">Your name *</label>
                <input id="cw-name" name="name" type="text" value={form.name} onChange={onChange} required placeholder="Dr. Asha Kulkarni" />
              </div>
              <div className="ch-field-row">
                <div className="ch-field">
                  <label htmlFor="cw-clinic">Clinic name *</label>
                  <input id="cw-clinic" name="clinic" type="text" value={form.clinic} onChange={onChange} required placeholder="Smile Dental Studio" />
                </div>
                <div className="ch-field">
                  <label htmlFor="cw-city">City / area *</label>
                  <input id="cw-city" name="city" type="text" value={form.city} onChange={onChange} required placeholder="Baner, Pune" />
                </div>
              </div>
              <div className="ch-field-row">
                <div className="ch-field">
                  <label htmlFor="cw-whatsapp">WhatsApp number *</label>
                  <input id="cw-whatsapp" name="whatsapp" type="tel" value={form.whatsapp} onChange={onChange} required placeholder="+91 98XXXXXXXX" />
                </div>
                <div className="ch-field">
                  <label htmlFor="cw-website">Current website</label>
                  <input id="cw-website" name="website" type="text" value={form.website} onChange={onChange} placeholder="yourclinic.com (or leave empty)" />
                </div>
              </div>
              <div className="ch-field">
                <label htmlFor="cw-goal">Which patients do you want more of?</label>
                <select id="cw-goal" name="goal" value={form.goal} onChange={onChange}>
                  <option value="">Choose one…</option>
                  {CW.AUDIT.goals.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <button type="submit" className="ch-btn ch-btn-primary ch-audit-submit" disabled={sending}>
                {sending ? 'Sending…' : CW.HERO.cta}
              </button>
              <p className="ch-fineprint">{CW.AUDIT.fine}</p>
              {status === 'success' && <div className="ch-form-note ch-form-success">{CW.AUDIT.done}</div>}
              {status === 'error' && <div className="ch-form-note ch-form-error">{withWa(CW.AUDIT.error)}</div>}
            </form>
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="ch-offer">
        <div className="ch-container ch-center">
          <span className="ch-eyebrow">Clinic websites by AUM AI</span>
          <h2 className="ch-offer-title">{CW.FINAL.title}</h2>
          <p className="ch-offer-sub">{CW.FINAL.text}</p>
          <div className="ch-hero-cta ch-center-cta"><a className="ch-btn ch-btn-primary" href="#audit">{CW.HERO.cta}</a></div>
          <p className="cw-wa"><WaLink>WhatsApp {CW.WHATSAPP.display}</WaLink></p>
        </div>
      </section>
    </div>
  );
}
