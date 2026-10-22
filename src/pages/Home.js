import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import ClinicsServed from '../components/ClinicsServed';
import HomeFullDemo from '../components/HomeFullDemo';
import HeroVideo from '../components/HeroVideo';
import GoogleReviews from '../components/GoogleReviews';
// One FAQ list for the visible page, the crawler HTML and the FAQPage JSON-LD (scripts/prerender.js).
import { FAQS as HOME_FAQ } from '../data/homeFaq';
import { HOME_EXPLORE } from '../data/positioning';
import { PRICE_LABEL, ACCESS } from '../data/masterclass';
import {
  HERO, PAIN, VS, HOW, FOURC, STRATEGIES, KPIS, STERLING_PROOF, BE_PATIENT, FIT, DIY, FINAL, SEO,
} from '../data/homeOutcomes';
import './HomeClinic.css';
import './HomeOutcomes.css';

// Home: outcomes as a service (owner 2026-10-22: "go back to our old positioning, not module-wise selling …
// the MAIN page should talk about our framework, systems and outcomes"). No module names or module cards here;
// the only pointer is one quiet link to /modules in the closing band. Every word: src/data/homeOutcomes.js and
// src/data/homeFaq.js, mirrored in scripts/prerender.js (slug ''). Kept from the previous home: the Sterling
// hero film, the clinics strip, the full demo film, the Google reviews with Dr Priyanka's hero card, the live
// demo clinic and the explore links. The module explainers, module cards and app section moved off home
// (they live on /modules, /revenue-generator and /pricing); they are in git history before this commit.

const Title = ({ a, b, as: Tag = 'h2', className = 'ch-h2' }) => (
  <Tag className={className}>
    {a} <em>{b}</em>
  </Tag>
);

const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// One strategy's example: a WhatsApp-style exchange, or a before / after.
function StrategyExample({ s }) {
  if (s.chat) {
    return (
      <figure className="ho-phone" aria-label={`${s.tag}: ${s.who}`}>
        <figcaption className="ho-phone-top">
          <strong>{s.who}</strong>
          <span className="ho-tag">{s.tag}</span>
        </figcaption>
        <div className="ho-chat">
          {s.chat.map(([who, text, time, note], i) =>
            who === 'sys' ? (
              <p key={i} className="ho-sys">{text}</p>
            ) : (
              <p key={i} className={`ho-msg ho-msg--${who}`}>
                <span className="ho-msg-who">{who === 'in' ? s.who : 'Clinic'}: </span>
                {text}
                {note && <span className="ho-fee">{note}</span>}
                {time && <span className="ho-time">{time}</span>}
              </p>
            )
          )}
        </div>
      </figure>
    );
  }
  const { ba } = s;
  return (
    <div className="ho-ba">
      <span className="ho-tag">{s.tag}</span>
      <div className="ho-ba-before">
        <span className="ho-ba-label">Before</span>
        {ba.before}
      </div>
      <div className="ho-ba-after">
        <span className="ho-ba-label">{ba.afterLabel || 'After'}</span>
        {ba.after ? (
          <ul className="ho-timeline">
            {ba.after.map(([when, what]) => (
              <li key={when}><span>{when}</span>{what}</li>
            ))}
          </ul>
        ) : (
          ba.afterText
        )}
      </div>
    </div>
  );
}

const Home = () => {
  useEffect(() => {
    setPageSeo({
      // SEO 2026-10-22: home keeps "AI dental software" + "AI receptionist" + "dental clinic … India" (brand
      // first); module terms belong to the module pages. Same strings in scripts/prerender.js (slug '') and
      // public/index.html — all three read src/data/homeOutcomes.js (SEO) or copy it.
      title: SEO.title,
      description: SEO.description,
      canonical: 'https://aumai.co.in/',
      image: 'https://aumai.co.in/screenshots/roi-preview.png',
    });
  }, []);

  return (
    <div className="ch-home ho">
      {/* HERO: the outcome, the service, the Sterling film */}
      <section className="ch-hero lux-hero">
        <span className="lux-scroll-cue" aria-hidden="true" />
        <div className="ch-container ch-hero-grid lux-hero-grid">
          <div className="ch-hero-text">
            <span className="ch-eyebrow">{HERO.eyebrow}</span>
            <h1 className="ch-hero-title">{HERO.title}</h1>
            <ul className="ho-every">
              {HERO.every.map((line) => <li key={line}>{line}</li>)}
            </ul>
            <p className="ho-every-close ch-hero-accent">{HERO.close}</p>
            <div className="ch-hero-cta">
              <Link to={HERO.primary.to} className="ch-btn ch-btn-primary">{HERO.primary.label}</Link>
              <a
                href={HERO.whatsapp.href}
                className="ch-btn ch-hero-wa"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
              >
                <WaIcon />
                {HERO.whatsapp.label}
              </a>
            </div>
            <p className="ch-hero-trust ho-hero-proof">
              <strong>{HERO.proofNumber}</strong> {HERO.proofText}
            </p>
          </div>
          <div className="lux-hero-loop">
            <HeroVideo />
          </div>
        </div>
      </section>

      {/* Dental clinics Aumy serves (consented clinics only): src/data/clinicsServed.js */}
      <ClinicsServed />

      {/* SOUND FAMILIAR? Their words, then what we measure in real clinics */}
      <section className="ch-section ch-tint" aria-labelledby="ho-pain-title">
        <div className="ch-container">
          <div className="ho-head">
            <span className="ch-eyebrow">{PAIN.eyebrow}</span>
            <h2 id="ho-pain-title" className="ch-h2">{PAIN.titleA} <em>{PAIN.titleB}</em></h2>
          </div>
          <div className="ho-quotes-grid">
            {PAIN.quotes.map((q) => (
              <blockquote key={q}>“{q}”</blockquote>
            ))}
          </div>
          <div className="ho-stats">
            {PAIN.stats.map((s) => (
              <p key={s.n} className="ho-stat"><strong>{s.n}</strong>{s.t}</p>
            ))}
          </div>
          <p className="ho-stats-cap"><span>{PAIN.statsLabel}</span><span>{PAIN.statsSource}</span></p>
          <p className="ho-close-line">{PAIN.close}</p>
        </div>
      </section>

      {/* NOT ANOTHER SOFTWARE */}
      <section className="ch-section" aria-labelledby="ho-vs-title">
        <div className="ch-container">
          <div className="ho-head">
            <span className="ch-eyebrow">{VS.eyebrow}</span>
            <h2 id="ho-vs-title" className="ch-h2">{VS.titleA} <em>{VS.titleB}</em></h2>
            <p className="ch-lead">{VS.lead}</p>
          </div>
          <table className="ho-vs">
            <thead>
              <tr><th scope="col">{VS.headVendor}</th><th scope="col">{VS.headUs}</th></tr>
            </thead>
            <tbody>
              {VS.rows.map(([them, us]) => (
                <tr key={us}>
                  <td data-label={VS.headVendor}>{them}</td>
                  <td data-label={VS.headUs}>{us}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ho-vs-quotes">
            {VS.quotes.map((q) => (
              <figure key={q.who}>
                <blockquote>“{q.q}”</blockquote>
                <figcaption><strong>{q.who}</strong> · {q.where}</figcaption>
              </figure>
            ))}
          </div>
          <p className="ho-vs-close">{VS.closeA} <strong>{VS.closeB}</strong></p>
        </div>
      </section>

      {/* HOW WE WORK WITH YOUR CLINIC: five steps, each with an example */}
      <section className="ch-section ch-tint" id="how-we-work" aria-labelledby="ho-how-title">
        <div className="ch-container">
          <div className="ho-head">
            <span className="ch-eyebrow">{HOW.eyebrow}</span>
            <h2 id="ho-how-title" className="ch-h2">{HOW.titleA} <em>{HOW.titleB}</em></h2>
          </div>
          <ol className="ho-steps">
            {HOW.steps.map((st, i) => (
              <li key={st.title} className="ho-step">
                <span className="ho-step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                  {st.pull && (
                    <p className="ho-step-pull">“{st.pull.q}” <span>{st.pull.who}</span></p>
                  )}
                </div>
                <div className="ho-ex">
                  <span className="ho-tag">{st.exTag}</span>
                  <p>{st.ex}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* THE 4C FRAMEWORK: each C, its systems, the outcome it moves */}
      <section className="ch-section" id="the-4c-framework" aria-labelledby="ho-4c-title">
        <div className="ch-container">
          <div className="ho-head">
            <span className="ch-eyebrow">{FOURC.eyebrow}</span>
            <h2 id="ho-4c-title" className="ch-h2">{FOURC.titleA} <em>{FOURC.titleB}</em></h2>
            <p className="ch-lead">{FOURC.lead}</p>
          </div>
          <div className="ho-fourc">
            {FOURC.stages.map((st, i) => (
              <article key={st.c} className="ho-c">
                <span className="ho-c-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{st.c}</h3>
                <p className="ho-c-job">{st.job}</p>
                <ul>
                  {st.systems.map(([name, line]) => (
                    <li key={name}><strong>{name}</strong>{line}</li>
                  ))}
                </ul>
                <p className="ho-c-out">
                  <span>The outcome</span>
                  <strong>{st.outcomeB}</strong>{st.outcome ? ` ${st.outcome}` : ''}
                </p>
              </article>
            ))}
          </div>
          <p className="ho-under">{FOURC.under}</p>
        </div>
      </section>

      {/* The full demo film: a whole clinic day (owner 2026-10-20). Words: src/data/explainers.js. */}
      <HomeFullDemo />

      {/* THE STRATEGIES INSIDE: seven, each with an example */}
      <section className="ch-section ch-tint" id="strategies" aria-labelledby="ho-strat-title">
        <div className="ch-container">
          <div className="ho-head">
            <span className="ch-eyebrow">{STRATEGIES.eyebrow}</span>
            <h2 id="ho-strat-title" className="ch-h2">{STRATEGIES.titleA} <em>{STRATEGIES.titleB}</em></h2>
            <p className="ch-lead">{STRATEGIES.lead}</p>
          </div>
          {STRATEGIES.items.map((s, i) => (
            <article key={s.name} className="ho-strat">
              <div>
                <span className="ho-strat-n">{String(i + 1).padStart(2, '0')} · {s.c}</span>
                <h3>{s.name}{s.alt && <span className="ho-strat-alt"> ({s.alt})</span>}</h3>
                <p>{s.body}</p>
                <p className="ho-why">{s.why}</p>
              </div>
              <StrategyExample s={s} />
            </article>
          ))}
          <div className="ho-guard">
            <h3>{STRATEGIES.guardTitle}</h3>
            <p>{STRATEGIES.guard}</p>
          </div>
        </div>
      </section>

      {/* WHAT WE MEASURE EVERY MONDAY */}
      <section className="ch-section" id="kpis" aria-labelledby="ho-kpi-title">
        <div className="ch-container">
          <div className="ho-head">
            <span className="ch-eyebrow">{KPIS.eyebrow}</span>
            <h2 id="ho-kpi-title" className="ch-h2">{KPIS.titleA} <em>{KPIS.titleB}</em></h2>
            <p className="ch-lead">{KPIS.lead}</p>
          </div>
          <table className="ho-kpi">
            <thead>
              <tr>{KPIS.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
            </thead>
            <tbody>
              {KPIS.rows.map(([sys, promise, number]) => (
                <tr key={sys}>
                  <th scope="row">{sys}</th>
                  <td data-label={KPIS.head[1]}>{promise}</td>
                  <td data-label={KPIS.head[2]}>{number}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="ho-legend">
            <span><i className="ho-dot ho-dot--g" aria-hidden="true" />{KPIS.legend[0]}</span>
            <span><i className="ho-dot ho-dot--o" aria-hidden="true" />{KPIS.legend[1]}</span>
            <span><i className="ho-dot ho-dot--r" aria-hidden="true" />{KPIS.legend[2]}</span>
            <span className="ho-legend-note">{KPIS.legendNote}</span>
          </p>
        </div>
      </section>

      {/* PROOF: every Google review word for word, Dr Priyanka's first (src/data/googleReviews.js) */}
      <GoogleReviews />

      {/* Sterling's numbers and Dr Ronak on camera */}
      <section className="ch-section ho-proof" aria-label="Results from clinics we work with">
        <div className="ch-container ho-proof-grid">
          <div className="ho-proof-stats">
            {STERLING_PROOF.map((p) => (
              <p key={p.n}><strong>{p.n}</strong>{p.t}<small>{p.s}</small></p>
            ))}
          </div>
          <figure className="ch-video-card ho-proof-video">
            <video controls preload="none" playsInline poster="/videos/dr-ronak-poster.jpg" aria-label="Dr Ronak, Vinaykia Dental Care (video)">
              <source src="/videos/dr-ronak-vinayaka.mp4" type="video/mp4" />
            </video>
            <figcaption><strong>Dr Ronak Oswal</strong> · Vinaykia Dental Care, Pune · 37 seconds, in his own words</figcaption>
          </figure>
        </div>
      </section>

      {/* BE THE PATIENT: the live demo clinic */}
      <section className="ch-section ch-tint" id="be-the-patient" aria-labelledby="ho-bp-title">
        <div className="ch-container ho-bp">
          <div>
            <span className="ch-eyebrow">{BE_PATIENT.eyebrow}</span>
            <h2 id="ho-bp-title" className="ch-h2">{BE_PATIENT.titleA} <em>{BE_PATIENT.titleB}</em></h2>
            <p className="ch-lead">{BE_PATIENT.body}</p>
          </div>
          <div className="ho-bp-card">
            <p>WhatsApp <a href={BE_PATIENT.whatsapp.href}>{BE_PATIENT.whatsapp.display}</a></p>
            <p>Call <a href={BE_PATIENT.call.href}>{BE_PATIENT.call.display}</a></p>
            <p className="ho-note">{BE_PATIENT.note}</p>
          </div>
        </div>
      </section>

      {/* WHO WE WORK BEST WITH */}
      <section className="ch-section" aria-labelledby="ho-fit-title">
        <div className="ch-container">
          <div className="ho-head">
            <span className="ch-eyebrow">{FIT.eyebrow}</span>
            <h2 id="ho-fit-title" className="ch-h2">{FIT.titleA} <em>{FIT.titleB}</em></h2>
          </div>
          <div className="ho-fit">
            <div>
              <h3>{FIT.yesTitle}</h3>
              <ul>{FIT.yes.map((y) => <li key={y}>{y}</li>)}</ul>
            </div>
            <div className="ho-fit-no">
              <h3>{FIT.noTitle}</h3>
              <ul>{FIT.no.map((y) => <li key={y}>{y}</li>)}</ul>
            </div>
          </div>
          <p className="ho-owner-op">{FIT.ownerOperator}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center">Questions dental clinic owners ask</h2>
          <div className="ch-faq">
            {HOME_FAQ.map((f, i) => (
              <details key={f.q} className="ch-faq-item" open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* NOT READY FOR US TO RUN IT? The masterclass (src/data/masterclass.js for price and access) */}
      <section className="ch-section" id="run-it-yourself" aria-labelledby="ho-diy-title">
        <div className="ch-container ho-diy">
          <div>
            <span className="ch-eyebrow">{DIY.eyebrow}</span>
            <h2 id="ho-diy-title" className="ch-h2">{DIY.titleA} <em>{DIY.titleB}</em></h2>
            <p className="ch-lead">{DIY.lead}</p>
            <p>{DIY.honest}</p>
            <p className="ho-note">{DIY.byline}</p>
          </div>
          <div className="ho-diy-card">
            <p className="ho-diy-price"><strong>{PRICE_LABEL}</strong><span>{DIY.length} · {ACCESS.toLowerCase()}</span></p>
            <ul>
              {DIY.items.map(([b, t]) => (
                <li key={b}><strong>{b}</strong>{t}</li>
              ))}
            </ul>
            <Link to={DIY.button.to} className="ch-btn ch-btn-primary">{DIY.button.label}</Link>
          </div>
        </div>
      </section>

      {/* ONE CALL TO ACTION + the one quiet modules link + explore links (keeps every key page linked from home) */}
      <section className="ch-offer" id="free-audit">
        <div className="ch-container ch-center">
          <Title a={FINAL.titleA} b={FINAL.titleB} className="ch-offer-title" />
          <p className="ch-offer-sub">{FINAL.sub}</p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to={FINAL.primary.to} className="ch-btn ch-btn-primary">{FINAL.primary.label}</Link>
            <a href={FINAL.whatsapp.href} className="ch-btn ch-btn-ghost ch-ghost-light" target="_blank" rel="noopener noreferrer">
              {FINAL.whatsapp.label}
            </a>
          </div>
          <p className="ho-quiet">
            {FINAL.modulesLead} <Link to={FINAL.modulesLink.to}>{FINAL.modulesLink.label}</Link>
          </p>
          <nav className="ch-explore" aria-label="Explore Aumy">
            {HOME_EXPLORE.map((e) => (
              <Link key={e.to} to={e.to}>{e.label}</Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
};

export default Home;
