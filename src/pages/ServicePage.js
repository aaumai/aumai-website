import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';
import './ClinicWebsitesPage.css';
import './ServicePage.css';

// The service pages under "Product & services → Services" (owner 2026-10-23): /dental-seo and
// /dental-ads. One layout, two word files (src/data/dentalSeo.js, src/data/dentalAds.js), the
// same files scripts/prerender.js writes into the crawler HTML. Built on the clinic system
// (.ch-*) and the /clinic-websites pieces (.cw-*) under the lux theme. The audit form posts to
// the same contact endpoint as /clinic-websites and /growth-audit.

const CONTACT_API = 'https://dabbewaala.aumai.co.in/api/aumai/contact';
const ORIGIN = 'https://aumai.co.in';

// Line icons, by name.
const ICONS = {
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z',
  star: 'M12 2l2.6 6.3L21 9l-5 4.3L17.4 20 12 16.6 6.6 20 8 13.3 3 9l6.4-.7z',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21zm0-9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  link: 'M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1',
  chart: 'M5 20V10M10 20V4M15 20v-7M20 20v-11M3 20h18',
  phone: 'M8 2h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V3a1 1 0 011-1zM11 18h2',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4',
  image: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9.5a1.5 1.5 0 100-.01',
  chat: 'M4 5h16v10H8l-4 4zM8 9h8M8 12h5',
  target: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7a5 5 0 100 10 5 5 0 000-10zM12 11a1 1 0 100 2 1 1 0 000-2z',
};
const Icon = ({ name }) => (
  <svg className="cw-icon" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name] || ICONS.doc} /></svg>
);

// A link inside the page data: internal paths use the router, others open in a new tab.
const DataLink = ({ link, className }) => (link.internal
  ? <Link className={className} to={link.href}>{link.label}</Link>
  : <a className={className} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>);

// The other services and Aumy, so every service page links to its siblings.
const SIBLINGS = [
  { to: '/dental-seo', label: 'Dental SEO' },
  { to: '/clinic-websites', label: 'Dental websites' },
  { to: '/dental-ads', label: 'Dental ads (Meta & Google)' },
  { to: '/revenue-generator', label: 'Aumy, our main product' },
];

const HeroVisual = ({ v }) => {
  if (v.kind === 'devices') {
    return (
      <figure className="cw-hero-figure">
        <div className="cw-devices">
          <div className="cw-browser">
            <div className="cw-browser-bar" aria-hidden="true"><i /><i /><i /><span>{v.domain}</span></div>
            <img src={v.desktop.src} width={v.desktop.w} height={v.desktop.h} alt={v.desktop.alt} loading="eager" decoding="async" />
          </div>
          <div className="cw-phone"><img src={v.phone.src} width={v.phone.w} height={v.phone.h} alt={v.phone.alt} loading="eager" decoding="async" /></div>
        </div>
        <figcaption>{v.caption}</figcaption>
      </figure>
    );
  }
  return (
    <figure className="sv-journey">
      <p className="sv-journey-title">{v.title}</p>
      <ol>
        {v.steps.map((s, i) => (
          <li key={s.h} className={i === v.steps.length - 1 ? 'sv-journey-done' : undefined}>
            <span className="sv-journey-dot" aria-hidden="true">{i === v.steps.length - 1 ? '✓' : i + 1}</span>
            <span className="sv-journey-text"><strong>{s.h}</strong><span>{s.t}</span></span>
          </li>
        ))}
      </ol>
      <figcaption>{v.caption}</figcaption>
    </figure>
  );
};

const EMPTY = { name: '', clinic: '', city: '', whatsapp: '', website: '', goal: '' };

export default function ServicePage({ data: D }) {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: D.SEO.title,
      description: D.SEO.description,
      canonical: `${ORIGIN}${D.PATH}`,
      image: D.VISUAL.kind === 'devices' ? `${ORIGIN}${D.VISUAL.desktop.src}` : undefined,
    });
  }, [D]);

  const WaLink = ({ children, className }) => (
    <a className={className} href={D.WHATSAPP.link} target="_blank" rel="noopener noreferrer">{children}</a>
  );
  // The WhatsApp number inside a sentence becomes a link.
  const withWa = (text) => {
    const parts = String(text).split(D.WHATSAPP.display);
    return parts.length < 2 ? text : parts.reduce((acc, p, i) => (i ? [...acc, <WaLink key={i}>{D.WHATSAPP.display}</WaLink>, p] : [p]), []);
  };

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
          service: D.AUDIT.service,
          message: [
            `${D.AUDIT.service.toUpperCase()} REQUEST`,
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
      console.error(`${D.AUDIT.service} form error:`, err);
      setStatus('error'); // the form keeps what they typed
    } finally {
      setSending(false);
    }
  };

  const id = (s) => `sv-${D.KEY}-${s}`;

  return (
    <div className="ch-home cw-page sv-page">
      {/* Hero */}
      <section className="ch-hero lux-hero cw-hero">
        <div className="ch-container">
          <div className="ch-hero-grid lux-hero-grid cw-hero-grid">
            <div className="ch-hero-text">
              <span className="ch-eyebrow">{D.HERO.eyebrow}</span>
              <h1 className="ch-hero-title cw-hero-title">{D.HERO.title}</h1>
              <p className="ch-hero-sub">{D.HERO.sub}</p>
              <div className="ch-hero-cta">
                <a className="ch-btn ch-btn-primary" href="#audit">{D.HERO.cta}</a>
                <a className="ch-btn ch-btn-ghost" href={D.HERO.secondary.href}>{D.HERO.secondary.label}</a>
              </div>
              <p className="cw-wa">or <WaLink>WhatsApp {D.WHATSAPP.display}</WaLink></p>
              <p className="ch-hero-trust">{D.HERO.trust}</p>
            </div>
            <HeroVisual v={D.VISUAL} />
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="ch-section" aria-labelledby={id('what')}>
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">{D.WHAT.eyebrow}</span>
            <h2 id={id('what')} className="ch-h2">{D.WHAT.title}</h2>
            <p className="ch-lead ch-center-lead">{D.WHAT.intro}</p>
          </div>
          <ul className="cw-build sv-build">
            {D.WHAT.items.map((b) => (
              <li key={b.h} className="cw-card">
                <Icon name={b.icon} />
                <h3>{b.h}</h3>
                <p>{b.t}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The page's own point: what international patients need / why ads disappoint */}
      <section className="ch-section ch-tint" aria-labelledby={id('points')}>
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">{D.POINTS.eyebrow}</span>
            <h2 id={id('points')} className="ch-h2">{D.POINTS.title}</h2>
            <p className="ch-lead ch-center-lead">{D.POINTS.intro}</p>
          </div>
          <ol className={`sv-points sv-points-${D.POINTS.items.length}`}>
            {D.POINTS.items.map((p, i) => (
              <li key={p.h}>
                <span className="cw-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.h}</h3>
                <p>{p.t}</p>
              </li>
            ))}
          </ol>
          {D.POINTS.link && (
            <p className="sv-read">Read the guide: <Link to={D.POINTS.link.href}>{D.POINTS.link.label}</Link></p>
          )}
        </div>
      </section>

      {/* Our work / proof */}
      <section className="ch-section" id="work" aria-labelledby={id('work')}>
        <div className="ch-container">
          <div className="cw-case-head">
            <span className="ch-eyebrow">{D.WORK.eyebrow}</span>
            <h2 id={id('work')} className="ch-h2">{D.WORK.title}</h2>
            <p className="ch-lead">{D.WORK.intro}</p>
          </div>
          <ul className="sv-cases">
            {D.WORK.cases.map((c) => (
              <li key={c.name}>
                <span className="sv-case-tag">{c.tag}</span>
                <h3>{c.name}</h3>
                {c.place && <p className="sv-case-place">{c.place}</p>}
                <p>{c.text}</p>
                {c.link && <DataLink className="sv-case-link" link={c.link} />}
              </li>
            ))}
          </ul>
          {D.WORK.note && <p className="sv-note">{D.WORK.note}</p>}
        </div>
      </section>

      {/* How we work */}
      <section className="ch-section ch-tint" id="how" aria-labelledby={id('how')}>
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">{D.STEPS.eyebrow}</span>
            <h2 id={id('how')} className="ch-h2">{D.STEPS.title}</h2>
          </div>
          <ol className="cw-steps">
            {D.STEPS.items.map((s, i) => (
              <li key={s.h}>
                <span className="cw-step-n">Step {i + 1}</span>
                <h3>{s.h}</h3>
                <p>{s.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Every month + who it's for */}
      <section className="ch-section" aria-labelledby={id('monthly')}>
        <div className="ch-container">
          <div className="cw-case-grid">
            <div>
              <span className="ch-eyebrow">{D.MONTHLY.eyebrow}</span>
              <h2 id={id('monthly')} className="ch-h2 sv-h2-left">{D.MONTHLY.title}</h2>
              <ul className="cw-did">{D.MONTHLY.items.map((d) => <li key={d}>{d}</li>)}</ul>
            </div>
            <aside className="cw-goal">
              <span className="ch-eyebrow">{D.FIT.eyebrow}</span>
              <h3>{D.FIT.title}</h3>
              <ul className="sv-fit">{D.FIT.items.map((f) => <li key={f}>{f}</li>)}</ul>
              <p className="sv-notfit">{D.FIT.notFit}</p>
              <p className="sv-aside-h">{D.MONTHLY.asideTitle}</p>
              <p className="sv-aside-t">{D.MONTHLY.aside}</p>
            </aside>
          </div>
        </div>
      </section>

      {/* Works best with Aumy, sold on its own too */}
      <section className="sv-aumy" aria-labelledby={id('aumy')}>
        <div className="ch-container">
          <div className="sv-aumy-inner">
            <div>
              <span className="ch-eyebrow">With Aumy, or on its own</span>
              <h2 id={id('aumy')} className="sv-aumy-title">{D.WITH_AUMY.title}</h2>
              <p>{D.WITH_AUMY.text}</p>
            </div>
            <Link className="ch-btn ch-btn-primary" to={D.WITH_AUMY.link.to}>{D.WITH_AUMY.link.label}</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ch-section" aria-labelledby={id('faq')}>
        <div className="ch-container ch-narrow">
          <div className="ch-head cw-faq-head">
            <span className="ch-eyebrow">Questions</span>
            <h2 id={id('faq')} className="ch-h2">Questions, answered</h2>
          </div>
          <div className="ch-faq">
            {D.FAQS.map((f) => (
              <details key={f.q} className="ch-faq-item">
                <summary>{f.q}</summary>
                <p>{withWa(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* The audit form */}
      <section className="ch-section ch-tint" id="audit" aria-labelledby={id('audit')}>
        <div className="ch-container">
          <div className="ch-audit-grid cw-audit-grid">
            <div>
              <span className="ch-eyebrow">Free</span>
              <h2 id={id('audit')} className="ch-h2">{D.AUDIT.title}</h2>
              <p className="ch-lead">{D.AUDIT.intro}</p>
              <p className="cw-wa cw-wa-dark">Prefer to talk? <WaLink>WhatsApp {D.WHATSAPP.display}</WaLink></p>
            </div>
            <form className="ch-audit-form" onSubmit={onSubmit}>
              <div className="ch-field">
                <label htmlFor={id('name')}>Your name *</label>
                <input id={id('name')} name="name" type="text" value={form.name} onChange={onChange} required placeholder="Dr. Asha Kulkarni" />
              </div>
              <div className="ch-field-row">
                <div className="ch-field">
                  <label htmlFor={id('clinic')}>Clinic name *</label>
                  <input id={id('clinic')} name="clinic" type="text" value={form.clinic} onChange={onChange} required placeholder="Smile Dental Studio" />
                </div>
                <div className="ch-field">
                  <label htmlFor={id('city')}>City / area *</label>
                  <input id={id('city')} name="city" type="text" value={form.city} onChange={onChange} required placeholder="Baner, Pune" />
                </div>
              </div>
              <div className="ch-field-row">
                <div className="ch-field">
                  <label htmlFor={id('whatsapp')}>WhatsApp number *</label>
                  <input id={id('whatsapp')} name="whatsapp" type="tel" value={form.whatsapp} onChange={onChange} required placeholder="+91 98XXXXXXXX" />
                </div>
                <div className="ch-field">
                  <label htmlFor={id('website')}>Current website</label>
                  <input id={id('website')} name="website" type="text" value={form.website} onChange={onChange} placeholder="yourclinic.com (or leave empty)" />
                </div>
              </div>
              <div className="ch-field">
                <label htmlFor={id('goal')}>{D.AUDIT.goalLabel}</label>
                <select id={id('goal')} name="goal" value={form.goal} onChange={onChange}>
                  <option value="">Choose one…</option>
                  {D.AUDIT.goals.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <button type="submit" className="ch-btn ch-btn-primary ch-audit-submit" disabled={sending}>
                {sending ? 'Sending…' : D.HERO.cta}
              </button>
              <p className="ch-fineprint">{D.AUDIT.fine}</p>
              {status === 'success' && <div className="ch-form-note ch-form-success">{D.AUDIT.done}</div>}
              {status === 'error' && <div className="ch-form-note ch-form-error">{withWa(D.AUDIT.error)}</div>}
            </form>
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="ch-offer">
        <div className="ch-container ch-center">
          <span className="ch-eyebrow">{D.FINAL.eyebrow}</span>
          <h2 className="ch-offer-title">{D.FINAL.title}</h2>
          <p className="ch-offer-sub">{D.FINAL.text}</p>
          <div className="ch-hero-cta ch-center-cta"><a className="ch-btn ch-btn-primary" href="#audit">{D.HERO.cta}</a></div>
          <p className="cw-wa"><WaLink>WhatsApp {D.WHATSAPP.display}</WaLink></p>
          <nav className="sv-siblings" aria-label="Product and services">
            {SIBLINGS.filter((s) => s.to !== D.PATH).map((s) => <Link key={s.to} to={s.to}>{s.label}</Link>)}
          </nav>
        </div>
      </section>
    </div>
  );
}
