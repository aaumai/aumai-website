import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

/**
 * ⚠️ These numbers MIRROR the product's `usage_plans` and `usage_addon_catalog`
 * tables (AUM AI EHR DB). The site previously advertised flat pricing with "no
 * per-message billing" while the product metered templates and voice minutes and
 * sold top-ups — a promise we would have had to break on the first heavy clinic.
 *
 * If a plan or add-on price changes, change it in the migration AND here, in the
 * same session. Prices below are rupees (the tables store paise).
 */
const PLANS = [
  {
    code: 'growth',
    name: 'AUMY Growth',
    blurb: 'For a single clinic',
    price: '₹20,000',
    setup: '+ ₹50,000–₹80,000 one-time onboarding & setup',
    featured: true,
    includes: [
      '10,000 appointment messages a month — reminders, confirmations, follow-ups',
      '2,000 campaign messages a month — recalls, reactivation, offers',
      '300 minutes of AI phone time a month',
      '100 AI-generated images a month for your social posts',
    ],
  },
  {
    code: 'business',
    name: 'AUMY Business',
    blurb: 'For busier or fast-growing clinics',
    price: '₹30,000',
    setup: '+ ₹50,000–₹80,000 one-time onboarding & setup',
    featured: false,
    includes: [
      '25,000 appointment messages a month',
      '5,000 campaign messages a month',
      '600 minutes of AI phone time a month',
      '200 AI-generated images a month',
    ],
  },
];

/** Everything both plans include, regardless of volume. */
const INCLUDED = [
  '24/7 AI receptionist — every call & WhatsApp enquiry answered and followed up',
  'Patient follow-up automation — enquiries, pending treatment plans, no-show re-booking',
  'Recalls & reactivation — cleanings, check-ups and lapsed patients brought back',
  'After-treatment care journeys, per treatment',
  'Google review growth, review replies & Get Found local SEO',
  'Unlimited patients, unlimited staff logins — no per-user seats',
  'Onboarding, configuration, training & ongoing support',
];

/** Mirrors usage_addon_catalog. */
const ADDONS = [
  ['500 extra campaign messages', '₹500'],
  ['5,000 extra appointment messages', '₹950'],
  ['100 extra AI phone minutes', '₹1,199'],
  ['500 extra AI phone minutes', '₹4,999'],
];

const FAQS = [
  {
    q: 'What does AUMY cost?',
    a: 'AUMY Growth is ₹20,000 per month per clinic, plus a one-time onboarding & setup fee of ₹50,000–₹80,000 depending on how much of your existing system we migrate. That covers the whole platform and a monthly allowance of 10,000 appointment messages, 2,000 campaign messages and 300 minutes of AI phone time — comfortably more than a typical single-doctor clinic uses. Busier practices take AUMY Business at ₹30,000.',
  },
  {
    q: 'What happens if we go over the monthly allowance?',
    a: 'Nothing stops and nothing breaks. We tell you before you reach the limit, and you either move up a plan or top up just what you need — 500 extra campaign messages for ₹500, or 100 extra AI phone minutes for ₹1,199. You will never get a surprise bill: top-ups are something you choose, not something that happens to you.',
  },
  {
    q: 'Are there per-user or per-patient charges?',
    a: 'No. Every plan includes unlimited patients and unlimited staff logins. The only thing that scales is how much you message and call — which is also the part that brings patients back, so it tends to pay for itself.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Instead of an empty trial account, we give you a live demo on a real clinic and back your purchase with a 60-day money-back guarantee: if AUMY does not meet your expectations, you get your money back.',
  },
  {
    q: 'What does the setup fee cover, and why is it a range?',
    a: '₹50,000 covers a standard onboarding: WhatsApp and Google Business Profile connection, importing your patient and appointment data, configuring treatments, recall rules and care journeys in your doctors’ own words, and training your front desk. It goes up to ₹80,000 when you want a complete migration off your current system — full visit history, clinical notes, treatment records and x-rays brought across and linked to the right patient, so nothing is left behind. We quote the exact figure after seeing what you are on today.',
  },
  {
    q: 'Do I have to replace my practice management software?',
    a: 'No. AUMY works alongside whatever PMS you already use — it is the growth layer, not the system of record. There is no migration.',
  },
  {
    q: 'What about multi-clinic groups?',
    a: 'Dental groups get custom per-clinic pricing with one consolidated billing account and group-level analytics. Contact us for a tailored quote.',
  },
];

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'AUMY Pricing — from ₹20,000/month for Dental Clinics | AUM AI',
      description:
        'Clear pricing for dental clinics: AUMY Growth at ₹20,000/month with 10,000 appointment messages, 2,000 campaign messages and 300 AI phone minutes included. Unlimited patients and staff logins. 60-day money-back guarantee. Custom plans for multi-clinic groups.',
      canonical: 'https://aumai.co.in/pricing',
    });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 24 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Pricing</span>
          <h1 className="ch-hero-title">Clear pricing. Generous limits. No surprises.</h1>
          <p className="ch-hero-sub">
            One subscription covers the full patient journey — Convert, Care, Retain, Reactivate, Grow.
            Unlimited patients, unlimited staff logins, and a monthly message &amp; call allowance most
            clinics never finish.
          </p>
        </div>
      </section>

      <section style={{ padding: '24px 0 48px' }}>
        <div className="ch-container" style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 380px))', justifyContent: 'center' }}>
          {PLANS.map((p) => (
            <div
              key={p.code}
              className="ch-why-card"
              style={{ display: 'block', padding: 28, ...(p.featured ? { borderTop: '4px solid #2563EB' } : {}) }}
            >
              <h2 style={{ margin: 0, fontSize: '1.3rem' }}>{p.name}</h2>
              <p style={{ margin: '4px 0 14px', color: '#5b6784' }}>{p.blurb}</p>
              <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>
                {p.price}
                <span style={{ fontSize: '1rem', fontWeight: 500, color: '#5b6784' }}> / month</span>
              </div>
              <p style={{ margin: '2px 0 18px', color: '#5b6784' }}>{p.setup}</p>

              <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: '0.92rem' }}>Included every month</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {p.includes.map((f) => (
                  <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '9px 0' }}>
                    <Check /> <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 20 }}>
                <Link to="/growth-audit" className={`ch-btn ${p.featured ? 'ch-btn-primary' : 'ch-btn-ghost'}`} style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                  Start with a free Growth Audit
                </Link>
              </div>
            </div>
          ))}

          <div className="ch-why-card" style={{ display: 'block', padding: 28 }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem' }}>Multi-Clinic Group</h2>
            <p style={{ margin: '4px 0 14px', color: '#5b6784' }}>For dental groups &amp; multi-location practices</p>
            <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>Custom</div>
            <p style={{ margin: '2px 0 18px', color: '#5b6784' }}>Per-clinic pricing, one consolidated bill</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {['Everything in Business, for every location', 'One consolidated billing account', 'Group-level analytics & reporting', 'Centralised onboarding across clinics'].map((f) => (
                <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '9px 0' }}>
                  <Check /> <span>{f}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 20 }}>
              <a href="https://wa.me/918007189868?text=Hi%2C%20I%20run%20a%20multi-clinic%20dental%20group%20and%20want%20a%20custom%20AUMY%20quote."
                className="ch-btn ch-btn-ghost" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                Talk to us for a group quote
              </a>
            </div>
          </div>
        </div>

        {/* Everything included on every plan — the part that never depends on volume. */}
        <div className="ch-container ch-narrow" style={{ marginTop: 34 }}>
          <h2 className="ch-h2 ch-center" style={{ textAlign: 'center', marginBottom: 14 }}>On every plan</h2>
          <div className="ch-why-card" style={{ display: 'block', padding: '18px 22px' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {INCLUDED.map((f) => (
                <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '9px 0' }}>
                  <Check /> <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top-ups, stated plainly — a busy month should feel like a good problem. */}
        <div className="ch-container ch-narrow" style={{ marginTop: 28 }}>
          <h2 className="ch-h2 ch-center" style={{ textAlign: 'center', marginBottom: 6 }}>Had a busy month?</h2>
          <p className="ch-center" style={{ textAlign: 'center', color: '#5b6784', maxWidth: 640, margin: '0 auto 16px' }}>
            We tell you before you reach your limit. Move up a plan, or top up only what you need —
            nothing stops, and nothing is charged without you choosing it.
          </p>
          <div className="ch-why-card" style={{ display: 'block', padding: '18px 22px' }}>
            {ADDONS.map(([label, price]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, margin: '9px 0' }}>
                <span>{label}</span>
                <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ch-container ch-narrow ch-center" style={{ marginTop: 28 }}>
          <p style={{ fontWeight: 700, fontSize: '1.05rem' }}>🛡️ 60-day money-back guarantee</p>
          <p style={{ color: '#5b6784', maxWidth: 620, margin: '4px auto 0' }}>
            If AUMY doesn&rsquo;t meet your expectations in the first 60 days, you get your money back. That&rsquo;s the whole policy.
          </p>
        </div>
      </section>

      <section style={{ padding: '12px 0 64px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center" style={{ textAlign: 'center' }}>Pricing questions, answered</h2>
          {FAQS.map((f) => (
            <div key={f.q} className="ch-why-card" style={{ display: 'block', padding: '18px 22px', margin: '12px 0' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem' }}>{f.q}</h3>
              <p style={{ margin: 0, color: '#5b6784' }}>{f.a}</p>
            </div>
          ))}
          <div className="ch-center" style={{ textAlign: 'center', marginTop: 26 }}>
            <Link to="/demos" className="ch-btn ch-btn-primary">See AUMY in action — real clinic, real WhatsApp</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
