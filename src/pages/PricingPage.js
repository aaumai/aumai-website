import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const INCLUDED = [
  '24/7 AI receptionist — every call & WhatsApp enquiry answered and followed up',
  'Patient follow-up automation — enquiries, pending treatment plans, no-show re-booking',
  'Recalls & reactivation — cleanings, check-ups and lapsed patients brought back',
  'After-treatment care journeys, per treatment',
  'Google review growth, review replies & Get Found local SEO',
  'WhatsApp / messaging charges & AI usage — no per-message billing',
  'Onboarding, configuration, training & ongoing support',
];

const FAQS = [
  {
    q: 'What does AUMY cost?',
    a: 'AUMY Full Suite is ₹20,000 per month per clinic, plus a one-time onboarding & setup fee of ₹50,000. The subscription includes WhatsApp/messaging charges, AI usage, support and updates — there is no per-message or per-user billing.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Instead of an empty trial account, we give you a live demo on a real clinic and back your purchase with a 60-day money-back guarantee: if AUMY does not meet your expectations, you get your money back.',
  },
  {
    q: 'What does the setup fee cover?',
    a: 'Complete onboarding: WhatsApp and Google Business Profile connection, importing your patient and appointment data, configuring treatments, recall rules and care journeys in your doctors’ own words, and training your front desk.',
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
      title: 'AUMY Pricing — ₹20,000/month for Dental Clinics | AUM AI',
      description:
        'Simple, flat pricing for dental clinics: AUMY Full Suite at ₹20,000/month plus one-time setup — AI receptionist, follow-up automation, recalls, reactivation and review growth included. 60-day money-back guarantee. Custom plans for multi-clinic groups.',
      canonical: 'https://aumai.co.in/pricing',
    });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 24 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Pricing</span>
          <h1 className="ch-hero-title">Simple, flat pricing. Everything included.</h1>
          <p className="ch-hero-sub">
            One subscription covers the full patient journey — Convert, Care, Retain, Reactivate, Grow.
            No per-message charges, no per-user seats, no surprises.
          </p>
        </div>
      </section>

      <section style={{ padding: '24px 0 48px' }}>
        <div className="ch-container" style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 420px))', justifyContent: 'center' }}>
          <div className="ch-why-card" style={{ display: 'block', padding: 28, borderTop: '4px solid #2563EB' }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem' }}>AUMY Full Suite</h2>
            <p style={{ margin: '4px 0 14px', color: '#5b6784' }}>For a single clinic</p>
            <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>₹20,000<span style={{ fontSize: '1rem', fontWeight: 500, color: '#5b6784' }}> / month</span></div>
            <p style={{ margin: '2px 0 18px', color: '#5b6784' }}>+ ₹50,000 one-time onboarding &amp; setup</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {INCLUDED.map((f) => (
                <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '9px 0' }}>
                  <Check /> <span>{f}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 20 }}>
              <Link to="/growth-audit" className="ch-btn ch-btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                Start with a free Growth Audit
              </Link>
            </div>
          </div>

          <div className="ch-why-card" style={{ display: 'block', padding: 28 }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem' }}>Multi-Clinic Group</h2>
            <p style={{ margin: '4px 0 14px', color: '#5b6784' }}>For dental groups &amp; multi-location practices</p>
            <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>Custom</div>
            <p style={{ margin: '2px 0 18px', color: '#5b6784' }}>Per-clinic pricing, one consolidated bill</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {['Everything in Full Suite, for every location', 'One consolidated billing account', 'Group-level analytics & reporting', 'Centralised onboarding across clinics'].map((f) => (
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
