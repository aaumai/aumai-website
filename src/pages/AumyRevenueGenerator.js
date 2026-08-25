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

// The four journey pillars (Convert → Care → Retain → Reactivate) — outcome
// first; WhatsApp/phone/Instagram are channels inside them, never the story.
// The pillars are the JOURNEY; `m` is the machinery underneath each — named
// capabilities, so the page keeps up with what the product actually ships.
const steps = [
  { stage: 'Convert', t: 'Turn every enquiry into a booked patient', d: 'Instagram, WhatsApp, a missed call, your website, a walk-in — every enquiry answered in seconds, qualified, and followed up until it books or clearly declines.', m: 'AI Receptionist · Lead Nurture · Missed-Call Recovery · WhatsApp Booking' },
  { stage: 'Care', t: 'A structured journey after every treatment', d: 'Your doctors define the treatment-specific follow-up — the day-1 recovery check, care tips, the one-month review — and AUMY delivers it consistently, flagging any reply that needs the clinic.', m: 'Treatment Care Plans · Day-by-Day Follow-up · Patient Check-ins' },
  { stage: 'Retain', t: 'Keep patients engaged — before they drift', d: 'Recalls and maintenance on time, every time — and AUMY knows which patients are at risk of disappearing, so your clinic can intervene before they go dormant.', m: 'No-Show Reduction · Recall Automation · Predictive Retention' },
  { stage: 'Reactivate', t: 'Bring back patients who already went quiet', d: 'Overdue recalls, stalled treatment plans and dormant patients re-engaged automatically — revenue you already paid to acquire, recovered.', m: 'Dormant Reactivation · Overdue Recalls · Stalled Treatment Plans' },
];

const capabilities = [
  { t: 'Lead capture, every channel', d: 'Instagram, WhatsApp, calls, ads, walk-ins — every enquiry answered in seconds.' },
  { t: '24/7 appointment booking', d: 'Patients book a real slot in a natural WhatsApp chat — straight into your calendar.' },
  { t: 'Voice AI for missed calls', d: 'The call you couldn’t pick up — answered naturally, in their language, and booked.' },
  { t: 'Cold-lead follow-up', d: 'Polite retries until they book or opt out.' },
  { t: 'No-show recovery', d: 'Reminders, confirmations, and automatic rebooking.' },
  { t: 'Recall & reactivation', d: 'Personalised to each patient — not generic blasts.' },
  { t: 'Treatment-plan follow-up', d: 'Turn accepted plans into booked revenue.' },
  { t: 'After-treatment care plans', d: 'Treatment-specific follow-up your doctors define — day-by-day guidance and scheduled check-ins after every major treatment.' },
  { t: 'Predictive retention', d: 'Knows which patients are at risk of disappearing — churn risk and revenue-at-risk per patient — so you intervene before they go dormant.' },
  { t: 'Products & upsells, in the chat', d: 'Sells your packages and products right inside the conversation.' },
  { t: 'ROI dashboard', d: 'Every booking and rupee attributed.' },
];

const platform = [
  { t: 'Reviews & Google profile', d: 'Asks happy patients for a review at the right moment, follows up, auto-replies to every review — and your local ranking climbs.' },
  { t: 'Local SEO & AI search visibility', d: 'Get found on Google Maps — and recommended when patients ask ChatGPT or Gemini for a clinic.' },
  { t: 'One-click social posting', d: 'The AI drafts the post; one tap publishes to Google Business, Instagram and Facebook together.' },
  { t: 'AI Creative Studio', d: 'Branded photos and short videos for your clinic, generated from a single snapshot — always ready to post or run as an ad.' },
  { t: 'Patient education, in your name', d: 'Helpful health content sent between visits — branded to your clinic, never repeated.' },
  { t: 'Ambient Scribe', d: 'You talk to your patient; the AI writes the visit note. Every consultation documented automatically — no typing after hours.' },
  { t: 'Telehealth', d: 'Secure video consultations built in — follow-ups, second opinions and out-of-town patients without the travel.' },
  { t: 'Predictive retention AI', d: 'Machine learning flags your best patients before they drift — so a 5-minute call saves a lifetime patient.' },
  { t: 'Ask-anything reports', d: 'Ask a question in plain English — get the report. No spreadsheets, no analyst.' },
  { t: 'Clinic records (light EHR)', d: 'A clean, modern patient record — appointments, plans, prescriptions — for clinics that want one system, not five.' },
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
    name: 'Vinayaka Dental Care',
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
      title: 'Aumy — The AI Patient Journey & Revenue Operating System for Dental Clinics',
      description:
        'Aumy is the AI Patient Journey & Revenue Operating System we run for dental clinics — it captures every enquiry, books it, wins back patients who drift, and makes your ad spend work harder, with the recovered revenue proven on a live dashboard. Never lose revenue to missed calls & follow-ups again.',
      canonical: 'https://aumai.co.in/revenue-generator',
      image: 'https://aumai.co.in/images/hero-dental.jpg',
    });
  }, []);

  return (
    <div className="ch-home">
      {/* HERO */}
      <section className="ch-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Aumy — how it works</span>
          <h1 className="ch-hero-title">Recover the revenue your clinic is already leaking.</h1>
          <p className="ch-hero-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            AUMY is the AI Patient Journey &amp; Revenue Operating System for dental clinics. It
            works across the entire patient journey — from first enquiry to treatment,
            after-treatment care, recall and reactivation — with the recovered revenue proven on a
            live dashboard.
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
            <span className="ch-eyebrow">The patient journey</span>
            <h2 className="ch-h2">Four stages, working as one.</h2>
          </div>
          <div className="ch-pillars">
            {steps.map((s, i) => (
              <div key={i} className="ch-pillar">
                <span className="ch-eyebrow">{s.stage}</span>
                <h3 className="ch-pillar-title">{s.t}</h3>
                <p className="ch-pillar-body">{s.d}</p>
                <p className="ch-pillar-machinery">{s.m}</p>
              </div>
            ))}
          </div>
          <p className="ch-note ch-center">One patient journey. One operating system.</p>
        </div>
      </section>

      {/* SMARTER ADS */}
      <section className="ch-section">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">And your marketing gets smarter</span>
          <h2 className="ch-h2">Your ads learn from your real patients.</h2>
          <p className="ch-lead">
            On top of the four stages, a growth flywheel: when a lead becomes a real patient, AUMY&rsquo;s
            private attribution ties that revenue to the exact ad and audience — so you put budget
            where paying patients come from. Meta &amp; Google only ever see anonymous lead
            signals: treatment and health details never leave the clinic.
          </p>
          <ul className="ch-mini" style={{ display: 'inline-grid', textAlign: 'left' }}>
            <li><Check /> Revenue tracked per ad inside AUMY — not clicks a pixel guessed at</li>
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
            <h2 className="ch-h2">One AI receptionist. The work of ten.</h2>
            <p className="ch-lead ch-center-lead">
              AUMY isn&rsquo;t a bundle of separate tools — it&rsquo;s one AI working across
              WhatsApp, phone, Instagram and your website, doing what would take a team of ten
              humans: answering every lead in seconds, 24/7, never sick, never on leave — and
              quietly handling all of this for your clinic:
            </p>
          </div>
          <div className="ch-why">
            {capabilities.map((c, i) => (
              <div key={i} className="ch-why-card">
                <Check />
                <div>
                  <h3 className="ch-why-title">
                    {c.t}
                    {c.badge && (
                      <span style={{
                        marginLeft: 8, padding: '2px 8px', borderRadius: 999,
                        background: '#312e81', color: '#fff',
                        fontSize: 11, fontWeight: 700, verticalAlign: 'middle',
                        whiteSpace: 'nowrap',
                      }}>{c.badge}</span>
                    )}
                  </h3>
                  <p className="ch-why-body">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ch-head" style={{ marginTop: 56 }}>
            <span className="ch-eyebrow">The full platform</span>
            <h2 className="ch-h2">And it goes far beyond the receptionist.</h2>
            <p className="ch-lead ch-center-lead">
              These aren&rsquo;t bolt-ons from five different vendors — one platform, one dashboard,
              one login. The receptionist is the hero; this breadth is the moat:
            </p>
          </div>
          <div className="ch-why">
            {platform.map((c, i) => (
              <div key={i} className="ch-why-card">
                <Check />
                <div>
                  <h3 className="ch-why-title">
                    {c.t}
                    {c.badge && (
                      <span style={{
                        marginLeft: 8, padding: '2px 8px', borderRadius: 999,
                        background: '#eef2ff', color: '#312e81',
                        fontSize: 11, fontWeight: 700, verticalAlign: 'middle',
                        whiteSpace: 'nowrap',
                      }}>{c.badge}</span>
                    )}
                  </h3>
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
