import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { WatchButton, VideoLightbox } from '../components/FeatureVideo';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const heroStats = [
  { value: '20–40%*', label: 'Lost revenue recovered' },
  { value: '2–3×*', label: 'More enquiries converted' },
  { value: '+25%†', label: 'Revenue in 60 days' },
  { value: '100%', label: 'Bookings attributed' },
];

const steps = [
  { n: '01', t: 'Catch every lead', d: 'Instagram, WhatsApp, a missed call, a walk-in, Google or an ad — every enquiry instantly opens a WhatsApp conversation.' },
  { n: '02', t: 'Book it and keep the slot', d: 'AUMY answers, qualifies and books in seconds, 24/7 — then reminds, confirms, and rebooks the few who still miss.' },
  { n: '03', t: 'Revive patients you have', d: 'Overdue and dormant patients are re-engaged automatically — reactivating revenue you already paid to acquire.' },
  { n: '04', t: 'Keep them for life', d: 'Timely follow-ups, helpful content in your name, and well-timed review prompts — so patients return and refer.' },
];

const capabilities = [
  { t: 'Lead capture, every channel', d: 'Instagram, WhatsApp, calls, ads, walk-ins.' },
  { t: 'Cold-lead follow-up', d: 'Polite retries until they book or opt out.' },
  { t: 'No-show recovery', d: 'Reminders, confirmations, and automatic rebooking.' },
  { t: 'Recall & reactivation', d: 'Personalised to each patient — not generic blasts.' },
  { t: 'Treatment-plan follow-up', d: 'Turn accepted plans into booked revenue.' },
  { t: 'Lab work automation', d: 'Chases your dental lab; rebooks the patient the moment the crown is ready.' },
  { t: 'ROI dashboard', d: 'Every booking and rupee attributed.' },
];

const extras = [
  { t: 'Reviews & Google profile', d: 'Review replies, 5-star prompts, and Google Business posts — automatic.' },
  { t: 'Social & educational content', d: 'Posts in your name that keep you top-of-mind between visits.' },
];

const workingModel = [
  { n: '01', t: 'We audit your data', d: 'From your software — or even paper registers. No work for your team.' },
  { n: '02', t: 'We show you the money first', d: 'Exactly how much revenue is sitting unrecovered, on your real numbers.' },
  { n: '03', t: 'We build it around your clinic', d: 'A dedicated growth expert sets up AUMY on your data and runs it end-to-end — you don’t lift a finger.' },
  { n: '04', t: 'We own the outcome with you', d: 'Every booking and rupee tracked live and reviewed with you every week — a partner accountable for real results.' },
];

const testimonials = [
  {
    quote: `AUM AI brought us a steady stream of new patients, woke up our dormant list, and kept our regulars coming back. Our revenue grew about 25% in just two months — and we didn’t hire a single extra person to make it happen.`,
    name: 'Vinaykia Dental Care',
    clinic: 'Dental clinic',
    result: '+25% revenue in 2 months',
  },
  {
    quote: `AUMY quietly went to work on the patients we already had — waking up our dormant list, sending recall reminders right on time, and following up after every appointment. Patients feel genuinely looked after, our Google reviews keep climbing, and we’re earning more from the same chairs.`,
    name: 'Vinayaka Derma',
    clinic: 'Dermatology & aesthetics',
    result: '4.9★ Google rating',
  },
];

const AumyRevenueGenerator = () => {
  const [video, setVideo] = useState(null);
  useEffect(() => {
    setPageSeo({
      title: 'How AUMY Works — Recover Lost Revenue for Your Clinic | AUM AI',
      description:
        'AUMY is the growth system we run for dental & aesthetic clinics — it captures every enquiry, books it, wins back patients who drift, and makes your ad spend work harder, with the recovered revenue proven on a live dashboard.',
      canonical: 'https://aumai.co.in/revenue-generator',
      image: 'https://aumai.co.in/images/hero-dental.jpg',
    });
  }, []);

  return (
    <div className="ch-home">
      {/* HERO */}
      <section className="ch-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">How AUMY works</span>
          <h1 className="ch-hero-title">Recover the revenue your clinic is already leaking.</h1>
          <p className="ch-hero-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            AUMY is the growth system we run for dental &amp; aesthetic clinics. It captures every
            enquiry, books it, wins back patients who drift away, and makes your ad spend work harder —
            with the recovered revenue proven on a live dashboard.
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to="/growth-audit" className="ch-btn ch-btn-primary">Get my free Clinic Growth Audit</Link>
            <Link to="/contact" className="ch-btn ch-btn-ghost">Talk to us</Link>
          </div>
          <div className="ch-stats">
            {heroStats.map((s, i) => (
              <div key={i} className="ch-stat">
                <span className="ch-stat-value">{s.value}</span>
                <span className="ch-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="ch-fineprint">* Illustrative ranges, tuned to your clinic. † Real result from a partner clinic.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="ch-section ch-tint">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">The engine</span>
            <h2 className="ch-h2">Four things, working as one.</h2>
          </div>
          <div className="ch-pillars">
            {steps.map((s, i) => (
              <div key={i} className="ch-pillar">
                <span className="ch-pillar-num">{s.n}</span>
                <h3 className="ch-pillar-title">{s.t}</h3>
                <p className="ch-pillar-body">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SMARTER ADS */}
      <section className="ch-section">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Smarter ads</span>
          <h2 className="ch-h2">Your ads learn from your real patients.</h2>
          <p className="ch-lead">
            The moment a lead books or pays, AUMY sends that real conversion straight to Meta &amp;
            Google — so your budget finds more people like the patients who actually show up.
          </p>
          <ul className="ch-mini" style={{ display: 'inline-grid', textAlign: 'left' }}>
            <li><Check /> Real bookings sent server-side — not clicks a pixel guessed at</li>
            <li><Check /> Cost per genuine lead drops as lead quality climbs</li>
            <li><Check /> It compounds every month — privacy-safe, no patient data exposed</li>
          </ul>
          <div>
            <WatchButton onClick={() => setVideo({ file: 'smarter-ads', title: 'Smarter ads — how the loop works' })} />
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="ch-section ch-tint">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Your AI receptionist</span>
            <h2 className="ch-h2">One AI receptionist. Everything the front desk never has time for.</h2>
            <p className="ch-lead ch-center-lead">
              AUMY isn&rsquo;t a bundle of separate tools — it&rsquo;s one AI receptionist on WhatsApp
              that books every lead 24/7 and quietly handles all of this for your clinic:
            </p>
          </div>
          <div className="ch-why">
            {capabilities.map((c, i) => (
              <div key={i} className="ch-why-card">
                <Check />
                <div>
                  <h3 className="ch-why-title">{c.t}</h3>
                  <p className="ch-why-body">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ch-head" style={{ marginTop: 56 }}>
            <span className="ch-eyebrow">Good to have</span>
            <h2 className="ch-h2">And it keeps you visible, too.</h2>
          </div>
          <div className="ch-why">
            {extras.map((c, i) => (
              <div key={i} className="ch-why-card">
                <Check />
                <div>
                  <h3 className="ch-why-title">{c.t}</h3>
                  <p className="ch-why-body">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="ch-section">
        <div className="ch-container ch-center">
          <h2 className="ch-h2">Clinics are already growing with us.</h2>
          <div className="ch-testimonials">
            {testimonials.map((t, i) => (
              <figure key={i} className="ch-testimonial">
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong> · {t.clinic}
                  <span className="ch-result"> — {t.result}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WORKING MODEL */}
      <section className="ch-section ch-tint">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">How we work with you</span>
            <h2 className="ch-h2">We lead with your numbers — then we get to work.</h2>
          </div>
          <div className="ch-pillars">
            {workingModel.map((s, i) => (
              <div key={i} className="ch-pillar">
                <span className="ch-pillar-num">{s.n}</span>
                <h3 className="ch-pillar-title">{s.t}</h3>
                <p className="ch-pillar-body">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ch-offer">
        <div className="ch-container ch-center">
          <h2 className="ch-offer-title">See what your clinic is leaving on the table — free.</h2>
          <p className="ch-offer-sub">
            A free Clinic Growth Audit shows exactly where your clinic is leaking revenue — no
            obligation.
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to="/growth-audit" className="ch-btn ch-btn-primary">Get my free Clinic Growth Audit</Link>
          </div>
        </div>
      </section>

      <VideoLightbox video={video} onClose={() => setVideo(null)} />
    </div>
  );
};

export default AumyRevenueGenerator;
