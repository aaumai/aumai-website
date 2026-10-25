import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import MC from '../data/masterclass';
import './HomeClinic.css';
import './MasterclassInfo.css';

// The Full Chair Method: the public information page (owner 2026-10-19). What the
// masterclass is, what it is worth, what to expect. Built from the site's own
// clinic system (.ch-*) under the "quiet luxury" theme (styles/lux.css), so it
// reads like every other page. Every word is in src/data/masterclass.js, shared
// with scripts/prerender.js. Owner 2026-10-25: the masterclass is free to watch
// ("Watch free" → the free-account form at /masterclass/sign-in#create) and the kit
// is one payment ("Get the kit · ₹999" → /masterclass/register); members sign in at
// /masterclass/sign-in (the welcome email used to send them here, so the sign-in
// link sits at the very top).

const API = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/masterclass`;
const C_KEY = { Convert: 'convert', Confirm: 'confirm', Care: 'care', 'Come back': 'comeback' };

const WaLink = ({ children, className }) => (
  <a className={className} href={MC.WHATSAPP.link} target="_blank" rel="noopener noreferrer">{children}</a>
);
// The WhatsApp number inside a sentence becomes a link.
const withWa = (text) => {
  const parts = String(text).split(MC.WHATSAPP.display);
  return parts.length < 2 ? text : parts.reduce((acc, p, i) => (i ? [...acc, <WaLink key={i}>{MC.WHATSAPP.display}</WaLink>, p] : [p]), []);
};

// Line icons for "What you get", in the order of MC.KIT.items.
const ICONS = [
  'M5 4h14a1 1 0 011 1v11a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zm5 4.5v6l5-3-5-3zM8 21h8', // video
  'M4 4h16v16H4zM4 9h16M4 14h16M9 4v16M14 4v16', // workbooks (grid)
  'M5 20V10M10 20V4M15 20v-7M20 20v-11M3 20h18', // scorecard (bars)
  'M12 3l2.2 5.3L20 9l-4.4 3.8L17 18.5 12 15.6 7 18.5l1.4-5.7L4 9l5.8-.7z', // skill (star)
  'M4 5h16v10H8l-4 4zM8 9h8M8 12h5', // scripts (speech)
  'M4 4h16v16H4zM4 9h16M9 9v11M12 17v-3M15 17v-5M18 17v-2', // Leak tab (sheet with figures)
  'M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9zm-1-6l5-3-5-3v6z', // WhatsApp Q&A (round)
  'M12 2l3 6.5 7 .8-5.2 4.8 1.4 6.9L12 17.6 5.8 21l1.4-6.9L2 9.3l7-.8z', // bonus (star)
];
const Icon = ({ d }) => (
  <svg className="mi-icon" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const Pic = ({ img, eager, className }) => (
  <img className={className} src={img.src} width={img.w} height={img.h} alt={img.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
);

export default function MasterclassInfo() {
  const location = useLocation();
  const [price, setPrice] = useState(MC.PRICE_LABEL);
  const [member, setMember] = useState(false);
  const [sticky, setSticky] = useState(false);
  const heroCta = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({ title: MC.SEO.title, description: MC.SEO.description, canonical: `https://aumai.co.in${MC.PATHS.info}` });
    fetch(`${API}/price`).then((r) => r.json()).then((j) => { if (j && j.label) setPrice(j.label); }).catch(() => { /* keep the default */ });
    fetch(`${API}/me`, { credentials: 'include' }).then((r) => (r.ok ? r.json() : null)).then((j) => { if (j && j.ok) setMember(true); }).catch(() => { /* not signed in */ });
  }, []);

  // Phones: a Register bar slides up whenever the hero's own button is off screen.
  useEffect(() => {
    const el = heroCta.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    document.body.classList.toggle('mi-sticky-on', sticky);
    return () => document.body.classList.remove('mi-sticky-on');
  }, [sticky]);

  // Old links: a just-paid buyer used to land on /masterclass to sign in.
  if (location.state?.justPaid) return <Navigate to={MC.PATHS.signIn} replace state={location.state} />;

  // Watch free first (a signed-in member goes straight to their page); the kit second.
  const watchTo = member ? MC.PATHS.my : MC.PATHS.create;
  const ctas = (extra = '') => (
    <>
      <Link className={`ch-btn ch-btn-primary ${extra}`} to={watchTo}>{MC.CTA.watch}</Link>
      <Link className={`ch-btn ch-btn-ghost ${extra}`} to={MC.PATHS.register}>{MC.CTA.kit.replace(MC.PRICE_LABEL, price)}</Link>
    </>
  );

  return (
    <div className="ch-home mi-page">
      {/* Hero */}
      <section className="ch-hero lux-hero mi-hero">
        <div className="ch-container">
          <p className="mi-member">
            {member
              ? <>You are signed in. <Link to={MC.PATHS.my}>Open my masterclass</Link></>
              : <>Already have an account? <Link to={MC.PATHS.signIn}>Sign in</Link></>}
          </p>
          <div className="ch-hero-grid lux-hero-grid mi-hero-grid">
            <div className="ch-hero-text">
              <span className="ch-eyebrow">{MC.HERO.eyebrow}</span>
              <h1 className="ch-hero-title">{MC.HERO.titleLead}<span className="ch-hero-accent">{MC.HERO.titleAccent}</span>{MC.HERO.titleTail}</h1>
              <p className="lux-promise">{MC.HERO.promise}</p>
              <p className="ch-hero-sub">{MC.HERO.who}</p>
              <ul className="mi-facts">
                {MC.HERO.facts.map((f) => <li key={f.b}><strong>{f.price ? f.b.replace(MC.PRICE_LABEL, price) : f.b}</strong><span>{f.t}</span></li>)}
              </ul>
              <div className="ch-hero-cta" ref={heroCta}>
                {ctas()}
              </div>
              <p className="ch-hero-trust">{MC.HERO.note}</p>
            </div>
            <figure className="mi-hero-figure">
              <Pic img={MC.IMG.hero} eager className="mi-hero-img" />
              <ul className="mi-hero-4c" aria-label="The 4C Framework">
                {MC.STAGES.map((s) => <li key={s.c} className={`mi-c-${C_KEY[s.c]}`}><b>{s.c}</b><span>{s.line}</span></li>)}
              </ul>
            </figure>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="ch-section" aria-labelledby="mi-problem">
        <div className="ch-container">
          <div className="mi-split">
            <div>
              <span className="ch-eyebrow">The leak nobody counts</span>
              <h2 id="mi-problem" className="ch-h2">{MC.PROBLEM.title}</h2>
              <p className="ch-lead">{MC.PROBLEM.intro}</p>
              <ul className="mi-leaks">{MC.PROBLEM.leaks.map((l) => <li key={l}>{l}</li>)}</ul>
            </div>
            <figure className="mi-frame"><div className="mi-frame-in"><Pic img={MC.IMG.leaks} /></div></figure>
          </div>
        </div>
      </section>

      {/* Real numbers */}
      <section className="ch-offer mi-numbers" aria-labelledby="mi-numbers">
        <div className="ch-container">
          <span className="ch-eyebrow">{MC.PROBLEM.numbersTitle}</span>
          <h2 id="mi-numbers" className="mi-numbers-title">{MC.PROBLEM.closeA} <em>{MC.PROBLEM.closeB}</em></h2>
          <ul className="mi-stats">{MC.PROBLEM.numbers.map((x) => <li key={x.n}><strong>{x.n}</strong><span>{x.t}</span></li>)}</ul>
          <p className="mi-stats-close">{MC.PROBLEM.closeC}</p>
          <p className="mi-stats-note">{MC.PROBLEM.numbersNote}</p>
        </div>
      </section>

      {/* Before and after */}
      <section className="ch-section" aria-labelledby="mi-ba">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Before and after</span>
            <h2 id="mi-ba" className="ch-h2">{MC.BEFORE_AFTER.title}</h2>
            <p className="ch-lead ch-center-lead">{MC.BEFORE_AFTER.intro}</p>
          </div>
          <div className="mi-ba" role="table" aria-label="Each leak, and the system that closes it">
            <div className="mi-ba-row mi-ba-head" role="row">
              <span role="columnheader">Without a system</span><span role="columnheader">With the Full Chair Method</span>
            </div>
            {MC.BEFORE_AFTER.rows.map((r) => (
              <div className="mi-ba-row" role="row" key={r.sys}>
                <p className="mi-before" role="cell">{r.before}</p>
                <p className="mi-after" role="cell"><b>{r.sys}</b>{r.after}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll learn: the 4C Framework */}
      <section className="ch-section ch-tint" id="learn" aria-labelledby="mi-learn">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">What you’ll learn</span>
            <h2 id="mi-learn" className="ch-h2">The <em>4C</em> Framework</h2>
            <p className="ch-lead ch-center-lead">{MC.LEARN.intro}</p>
          </div>
          <div className="mi-4c">
            {MC.STAGES.map((s, i) => (
              <article key={s.c} className={`mi-c mi-c-${C_KEY[s.c]}`}>
                <img src={s.img} alt={s.alt} width="900" height="657" loading="lazy" decoding="async" />
                <div className="mi-c-body">
                  <p className="mi-c-step">Stage {i + 1} of 4</p>
                  <h3>{s.c}</h3>
                  <p className="mi-c-line">{s.line}</p>
                  <ol className="mi-sys">
                    {s.items.map((it) => (
                      <li key={it.n} className={it.foundation ? 'is-foundation' : ''}>
                        <span className="mi-sys-n">{it.foundation ? `Foundation ${it.n}` : `System ${it.n}`}</span>
                        <b>{it.name}</b>
                        <span className="mi-sys-t">{it.t}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Owners and KPIs, the leak in rupees, WhatsApp through Meta */}
      <section className="ch-section" aria-labelledby="mi-measure">
        <div className="ch-container">
          <div className="mi-split mi-split-rev">
            <figure className="mi-frame"><div className="mi-frame-in"><Pic img={MC.IMG.team} /></div></figure>
            <div>
              <span className="ch-eyebrow">How it keeps running</span>
              <h2 id="mi-measure" className="ch-h2">{MC.LEARN.extras[0].h}</h2>
              <p className="ch-lead">{MC.LEARN.extras[0].t}</p>
            </div>
          </div>
          <div className="ch-pillars ch-pillars-3 mi-pillars">
            {MC.LEARN.extras.slice(1).map((x, i) => (
              <div key={x.h} className="ch-pillar">
                <div className="ch-pillar-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="ch-pillar-title">{x.h}</h3>
                <p className="ch-pillar-body">{x.t}</p>
              </div>
            ))}
            <div className="ch-pillar">
              <div className="ch-pillar-num">03</div>
              <h3 className="ch-pillar-title">{MC.WAYS.buildTitle}</h3>
              <ol className="mi-build">{MC.WAYS.build.map((b) => <li key={b}>{b}</li>)}</ol>
              <p className="ch-pillar-body">{MC.WAYS.buildNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three ways */}
      <section className="ch-section ch-tint" aria-labelledby="mi-ways">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">How it works</span>
            <h2 id="mi-ways" className="ch-h2">{MC.WAYS.title}</h2>
            <p className="ch-lead ch-center-lead">{MC.WAYS.intro}</p>
          </div>
          <div className="mi-ways">
            <article className="mi-way">
              <div className="mi-way-text">
              <p className="mi-way-n">Way 1</p>
              <h3>{MC.WAYS.items[0].h}</h3>
              <p>{MC.WAYS.items[0].t}</p>
              </div>
              <figure className="mi-shot"><Pic img={MC.IMG.workbook} /><figcaption>Workbook 05, sample rows</figcaption></figure>
            </article>
            <article className="mi-way">
              <div className="mi-way-text">
              <p className="mi-way-n">Way 2</p>
              <h3>{MC.WAYS.items[1].h}</h3>
              <p>{MC.WAYS.items[1].t}</p>
              </div>
              <figure className="mi-shot">
                <div className="mi-claude" aria-label="Example of a Claude chat with the Clinic Master Sheet connected">
                  <p className="mi-claude-you"><span className="mi-claude-file">Clinic Master Sheet · Due · 5 Advised</span>Which advised treatments are at risk this week, and what should I send?</p>
                  <div className="mi-claude-ai">
                    <p><b>Manoj Tiwari</b> · root canal + crown · follow-up 1 not sent; the window closed. <b className="mi-red">Breached</b></p>
                    <p><b>Suresh Nambiar</b> · implant, ₹38,000 · follow-up 1 due today; a call is recommended. <b className="mi-amber">On track</b></p>
                    <p className="mi-claude-msg">“Namaste Manoj ji, Dr Mehta asked us to check on the crown for your root canal. We know time is short: shall we keep a 30-minute slot on Saturday morning for you?”</p>
                  </div>
                </div>
                <figcaption>Claude with the Clinic Master Sheet connected (sample rows)</figcaption>
              </figure>
            </article>
            <article className="mi-way">
              <div className="mi-way-text">
              <p className="mi-way-n">Way 3</p>
              <h3>{MC.WAYS.items[2].h}</h3>
              <p>{MC.WAYS.items[2].t}</p>
              </div>
              <figure className="mi-shot"><Pic img={MC.IMG.aumy} /><figcaption>Aumy on our demo clinic (sample data)</figcaption></figure>
            </article>
          </div>
          <p className="mi-callout">{MC.WAYS.noSoftware}</p>
        </div>
      </section>

      {/* What you get */}
      <section className="ch-section" aria-labelledby="mi-kit">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">The kit</span>
            <h2 id="mi-kit" className="ch-h2">{MC.KIT.title}</h2>
            <p className="ch-lead ch-center-lead">{MC.KIT.intro.replace(MC.PRICE_LABEL, price)}</p>
          </div>
          {/* One picture: the leak is worked out on the sheet's Leak tab, not a printed calculator (owner 2026-10-22). */}
          <div className="mi-showcase mi-showcase-one">
            <figure className="mi-frame"><div className="mi-frame-in"><Pic img={MC.IMG.kpis} /></div><figcaption>The Owner Weekly Scorecard: KPIs and owners</figcaption></figure>
          </div>
          <ul className="mi-kit">
            {MC.KIT.items.map((k, i) => (
              <li key={k.h} className={`mi-kit-card${k.wa ? ' mi-kit-wa' : ''}`}>
                <Icon d={ICONS[i] || ICONS[0]} />
                <h3>{k.wa ? <WaLink>{k.h}</WaLink> : k.h}</h3>
                <p>{k.t}</p>
              </li>
            ))}
          </ul>
          <div className="ch-hero-cta ch-center-cta mi-mid-cta">{ctas()}</div>
        </div>
      </section>

      {/* What to expect */}
      <section className="ch-section ch-tint" aria-labelledby="mi-expect">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Before you start</span>
            <h2 id="mi-expect" className="ch-h2">{MC.EXPECT.title}</h2>
          </div>
          <div className="ch-pillars mi-pillars">
            {MC.EXPECT.items.map((x, i) => (
              <div key={x.h} className="ch-pillar">
                <div className="ch-pillar-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="ch-pillar-title">{x.h}</h3>
                <p className="ch-pillar-body">{x.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="ch-section" aria-labelledby="mi-who">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Is it for you?</span>
            <h2 id="mi-who" className="ch-h2">{MC.FOR_WHO.title}</h2>
          </div>
          <div className="mi-fit">
            <div className="mi-fit-col mi-fit-yes"><h3>For you if</h3><ul>{MC.FOR_WHO.yes.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div className="mi-fit-col mi-fit-no"><h3>Not for you if</h3><ul>{MC.FOR_WHO.no.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </div>
          <p className="mi-callout">{MC.FOR_WHO.skinNote}</p>
        </div>
      </section>

      {/* The trainer */}
      <section className="ch-section ch-tint" aria-labelledby="mi-trainer">
        <div className="ch-container ch-narrow">
          <span className="ch-eyebrow">{MC.TRAINER.title}</span>
          <h2 id="mi-trainer" className="ch-h2 mi-trainer-name">{MC.TRAINER.name}</h2>
          <p className="mi-trainer-role">{MC.TRAINER.role}</p>
          {MC.TRAINER.bio.map((b) => <p key={b} className="ch-lead">{b}</p>)}
          <p><Link to="/about">More about Jayesh</Link></p>
        </div>
      </section>

      {/* FAQ */}
      <section className="ch-section" aria-labelledby="mi-faq">
        <div className="ch-container ch-narrow">
          <h2 id="mi-faq" className="ch-h2 ch-center">Questions, answered</h2>
          <div className="ch-faq">
            {MC.FAQS.map((f) => (
              <details key={f.q} className="ch-faq-item">
                <summary>{f.q}</summary>
                <p>{withWa(f.a)}</p>
                {f.q === 'Can I get a refund?' && <p><Link to="/refund#masterclass">The full refund policy</Link></p>}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="ch-offer">
        <div className="ch-container ch-center">
          <span className="ch-eyebrow">{MC.TITLE}</span>
          <h2 className="ch-offer-title">{MC.FINAL.title}</h2>
          <p className="ch-offer-sub">{MC.FINAL.text}</p>
          <div className="ch-hero-cta ch-center-cta">{ctas()}</div>
          <p className="mi-final-q"><WaLink>{MC.FINAL.questions}</WaLink></p>
          <p className="mi-final-q">Already have an account? <Link to={MC.PATHS.signIn}>Sign in</Link></p>
        </div>
      </section>

      {/* Phones: Watch free stays one tap away. */}
      <div className={`mi-sticky${sticky ? ' is-on' : ''}`} aria-hidden={!sticky}>
        <span><b>{MC.TITLE}</b> · {MC.CTA.freeLine} · {MC.CTA.kitLine.replace(MC.PRICE_LABEL, price)}</span>
        <Link className="ch-btn ch-btn-primary" to={watchTo} tabIndex={sticky ? 0 : -1}>{MC.CTA.watch}</Link>
      </div>
    </div>
  );
}
