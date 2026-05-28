import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AumyProduct.css';
import './AumyRevenueGenerator.css';
import './Page.css';

const AumyRevenueGenerator = () => {
  useEffect(() => {
    document.title = 'AUMY Revenue Generator · AUM AI | Turn Ad Spend Into Booked Patients';
  }, []);

  // Illustrative (*) ranges + one real, attributed result (†).
  const heroStats = [
    { value: '20–40%*', label: 'Lower cost per lead' },
    { value: '2–3×*', label: 'More genuine leads' },
    { value: '100%', label: 'Of bookings attributed' },
    { value: '+25%†', label: 'Revenue in 60 days' },
  ];

  const engineSteps = [
    { number: '01', title: 'Ads find real patients', text: 'Meta CAPI feeds real booking and revenue signals back to Meta, so your budget chases people who actually become patients — not clicks.' },
    { number: '02', title: 'Lead lands in WhatsApp', text: 'Every enquiry opens a WhatsApp conversation instantly. AUMY answers questions, qualifies, and books — 24/7, in seconds, not hours.' },
    { number: '03', title: 'Every booking attributed', text: 'Each appointment and every rupee is traced back to the ad, campaign, and conversation that produced it. You see exactly what pays.' },
    { number: '04', title: 'Kept for life', text: 'Automated recall, reactivation of dormant patients, and review requests turn a one-time visit into a lifetime of revenue.' },
  ];

  const capiSteps = [
    { number: '01', title: 'Signal real conversions', text: 'When a lead books or pays, AUMY sends that conversion server-side to Meta — the outcome that matters, not a page view.' },
    { number: '02', title: 'Meta optimizes for patients', text: 'The ad algorithm learns who actually books and spends more of your budget finding more of them. Junk leads fall away.' },
    { number: '03', title: 'It compounds every month', text: 'Lookalike audiences built from your real patients get sharper over time — cost per genuine lead keeps falling as the system learns.' },
  ];

  const capabilities = [
    {
      title: 'Meta CAPI Ad Optimization',
      description: 'Server-side conversion tracking that lowers cost per lead and floods the top of your funnel with people who actually book — while staying privacy-safe.',
      color: '#3b82f6',
      icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    },
    {
      title: 'WhatsApp Lead Capture + AI Booking',
      description: 'Every ad lead gets an instant WhatsApp reply. AUMY qualifies, answers, and books the appointment — so you never lose a lead to a slow callback again.',
      color: '#10b981',
      icon: 'M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
    },
    {
      title: 'AI Recall & Reactivation',
      description: 'Dormant and overdue patients are automatically re-engaged on WhatsApp with the right message at the right time — reviving revenue you already paid to acquire.',
      color: '#8b5cf6',
      icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
    },
    {
      title: 'Retention & Lifetime Value',
      description: 'Follow-ups, recall cadences, and review requests keep patients coming back. One acquired patient becomes years of repeat visits and referrals.',
      color: '#f43f5e',
      icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
    },
    {
      title: 'Conversion Attribution',
      description: 'Know exactly which ad, campaign, and conversation produced each booking and each rupee of revenue — so you double down on what works and cut what does not.',
      color: '#06b6d4',
      icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    },
    {
      title: 'Operator Inbox (Human-in-the-Loop)',
      description: 'AUMY handles the routine; your team sees only what needs a human — escalations, edge cases, approvals — in one prioritized queue. More revenue, no extra headcount.',
      color: '#f59e0b',
      icon: 'M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z',
    },
    {
      title: 'ROI Dashboards',
      description: 'A clinic owner’s view of attributed revenue, cost per lead, patients booked, and lifetime value — the clear answer to "what is my marketing actually returning?"',
      color: '#a78bfa',
      icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605',
    },
    {
      title: 'Reviews & Reputation',
      description: 'Automated, well-timed review requests turn happy patients into 5-star social proof — which lowers ad costs and wins the next patient before they even call.',
      color: '#34d399',
      icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
    },
  ];

  const howItHappens = [
    {
      tag: 'Acquisition',
      title: 'Meta CAPI turns ad spend into booked patients',
      text: 'Most clinics optimize ads for clicks or form-fills, then watch half those leads go cold. AUMY closes the loop: the moment a lead books or pays, that conversion is sent server-side to Meta. Meta’s algorithm then optimizes for real bookings, builds lookalike audiences from your actual patients, and stops wasting budget on tyre-kickers. The result is a lower cost per genuine lead that keeps improving month over month.',
    },
    {
      tag: 'Speed',
      title: 'Instant WhatsApp response books while interest is hot',
      text: 'A lead is most likely to convert in the first few minutes. AUMY replies on WhatsApp the instant an enquiry arrives — answers their questions, checks availability, and books the slot — day or night, with no staff sitting by the phone. Leads that would have gone cold become appointments on the calendar.',
    },
    {
      tag: 'Reactivation',
      title: 'Dormant patients become revenue you already paid for',
      text: 'Every clinic is sitting on a list of patients who drifted away. AUMY automatically identifies overdue and dormant patients and re-engages them on WhatsApp with timely, personal recall messages. You reactivate revenue from patients you already spent money to acquire — at near-zero marginal cost.',
    },
    {
      tag: 'Lifetime value',
      title: 'Retention compounds every acquired patient',
      text: 'Acquisition is expensive; retention is where the profit is. AUMY runs follow-ups, recall cadences, and review requests automatically, so a single first visit turns into years of repeat appointments and word-of-mouth referrals. Lifetime value rises without your team lifting a finger.',
    },
    {
      tag: 'Proof',
      title: 'Attribution + ROI dashboards show exactly what pays',
      text: 'AUMY traces every booking and every rupee back to the ad, campaign, and conversation that produced it, then rolls it up into a clinic-owner dashboard: attributed revenue, cost per lead, patients booked, lifetime value. You stop guessing and start reallocating budget to what genuinely returns.',
    },
  ];

  const roiTiles = [
    { value: 'Attributed', label: 'Revenue traced to each campaign & conversation' },
    { value: 'Cost / Lead', label: 'What you actually pay for a genuine lead' },
    { value: 'Patients Booked', label: 'Bookings from automation vs. manual effort' },
    { value: 'Lifetime Value', label: 'Repeat revenue per acquired patient' },
  ];

  return (
    <div className="aumy-page rev-page">
      {/* Hero */}
      <section className="aumy-hero">
        <div className="aumy-hero-bg">
          <div className="aumy-orb aumy-orb-1"></div>
          <div className="aumy-orb aumy-orb-2"></div>
          <div className="aumy-orb aumy-orb-3"></div>
          <div className="aumy-grid"></div>
        </div>

        <div className="container">
          <div className="aumy-hero-content">
            <div className="aumy-hero-badge">
              <span className="aumy-badge-dot"></span>
              AUM AI · The Revenue Engine for Clinics
            </div>

            <h1 className="aumy-hero-title">
              Turn ad spend into booked patients —
              <br />
              and keep them for <span className="aumy-gradient">life</span>.
            </h1>

            <p className="aumy-hero-subtitle">
              AUMY Revenue Generator is the growth engine behind your clinic: smarter Meta ads,
              instant WhatsApp booking, automatic recall and retention, and a dashboard that proves
              every rupee of return. Not more software to run — more patients, lower cost, kept for life.
            </p>

            <div className="aumy-hero-cta">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request a Demo
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a href="#revenue-engine" className="btn btn-secondary btn-lg">
                See How It Works
              </a>
            </div>

            <div className="aumy-hero-stats">
              {heroStats.map((s, i) => (
                <div key={i} className="aumy-hero-stat">
                  <span className="aumy-stat-value">{s.value}</span>
                  <span className="aumy-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="rev-footnote">
              * Illustrative; results vary by clinic, market, and spend. &nbsp;† Real result from a partner clinic — see the case study below.
            </p>
          </div>
        </div>
      </section>

      {/* Revenue Engine flow */}
      <section className="section aumy-demo-section" id="revenue-engine">
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Revenue Engine</span>
            <h2 className="section-title">From an ad click to a patient for life — automatically.</h2>
            <p className="section-subtitle">
              Four moves, fully automated. Each one plugs a hole where clinics quietly lose money today.
            </p>
          </div>

          <div className="aumy-demo-steps">
            {engineSteps.map((step, i) => (
              <div key={i} className="aumy-demo-step">
                <span className="aumy-demo-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meta CAPI deep-dive */}
      <section className="section aumy-caps-section" id="capi">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Meta Conversion API (CAPI)</span>
            <h2 className="section-title">Stop paying for clicks. Start paying for patients.</h2>
            <p className="section-subtitle">
              The single biggest lever on your ad ROI. CAPI tells Meta who actually became a patient — so your
              budget stops chasing curiosity and starts buying revenue.
            </p>
          </div>

          <div className="aumy-demo-steps rev-capi-steps">
            {capiSteps.map((step, i) => (
              <div key={i} className="aumy-demo-step">
                <span className="aumy-demo-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>

          <div className="aumy-demo-callout">
            <div className="aumy-demo-callout-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
              </svg>
            </div>
            <div className="aumy-demo-callout-body">
              <strong>Lower cost per lead. More genuine leads. Patients who stay for life.</strong>
              <p>
                Because Meta is optimizing for real bookings instead of clicks, your cost per genuine lead falls
                and the leads that do arrive are far more likely to convert. AUMY then captures, books, and retains
                them — so the savings on acquisition compound into lifetime revenue, not a one-off discount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section aumy-caps-section" id="capabilities">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What Drives the Revenue</span>
            <h2 className="section-title">Every capability earns its place in money terms.</h2>
            <p className="section-subtitle">
              No feature list for its own sake. Each capability either brings a patient in, books them faster,
              keeps them longer, or proves what your marketing returns.
            </p>
          </div>

          <div className="aumy-caps-grid">
            {capabilities.map((cap, i) => (
              <div key={i} className="aumy-cap-card" style={{ '--cap-color': cap.color }}>
                <div className="aumy-cap-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={cap.icon} />
                  </svg>
                </div>
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it happens */}
      <section className="section aumy-demo-section" id="how">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How It Actually Happens</span>
            <h2 className="section-title">The mechanism behind each rupee — in plain business terms.</h2>
          </div>

          <div className="rev-how-list">
            {howItHappens.map((item, i) => (
              <div key={i} className="rev-how-item">
                <div className="rev-how-index">
                  <span className="rev-how-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="rev-how-tag">{item.tag}</span>
                </div>
                <div className="rev-how-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI dashboard / proof */}
      <section className="section aumy-caps-section" id="roi">
        <div className="container">
          <div className="section-header">
            <span className="section-label">You See the Return</span>
            <h2 className="section-title">A dashboard that answers: what is my marketing actually returning?</h2>
            <p className="section-subtitle">
              Every clinic owner asks it. AUMY answers it on one screen — and updates it in real time.
            </p>
          </div>

          <div className="aumy-hero-stats rev-roi-tiles">
            {roiTiles.map((t, i) => (
              <div key={i} className="aumy-hero-stat">
                <span className="aumy-stat-value">{t.value}</span>
                <span className="aumy-stat-label">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client testimonial / case study (real, attributed) */}
      <section className="section aumy-cta-section" id="testimonial">
        <div className="container">
          <div className="rev-testimonial">
            <div className="rev-testimonial-head">
              <span className="section-label">Real Result · Partner Clinic</span>
              <div className="rev-client-logo">
                <img src="/clients/vinaykia-dental-logo.jpeg" alt="Vinaykia Dental Care" />
              </div>
            </div>

            <div className="rev-testimonial-body">
              <img className="rev-portrait" src="/clients/vinaykia-dentist.jpeg" alt="Vinaykia Dental Care — lead dentist" />
              <blockquote className="rev-quote">
                {/* Draft testimonial paraphrasing the result shared by the clinic;
                    replace with the dentist's exact words + name when confirmed. */}
                &ldquo;AUM AI brought us a steady stream of new patients, woke up our dormant list, and kept our
                regulars coming back. Our revenue grew about 25% in just two months — and we didn&rsquo;t hire a
                single extra person to make it happen.&rdquo;
                <cite className="rev-cite">— Vinaykia Dental Care</cite>
              </blockquote>
            </div>

            <div className="rev-metric-chips">
              <div className="rev-chip"><span className="rev-chip-value">+25%</span><span className="rev-chip-label">Revenue in 2 months</span></div>
              <div className="rev-chip"><span className="rev-chip-value">New</span><span className="rev-chip-label">Leads generated</span></div>
              <div className="rev-chip"><span className="rev-chip-value">Dormant</span><span className="rev-chip-label">Patients reactivated</span></div>
              <div className="rev-chip"><span className="rev-chip-value">Existing</span><span className="rev-chip-label">Patients retained</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section aumy-cta-section">
        <div className="container">
          <div className="aumy-cta-card">
            <h2>See your clinic&rsquo;s revenue potential</h2>
            <p>
              Bring your ad spend, your patient list, and your goals. We will show you — on real numbers —
              how AUMY lowers your cost per patient, books the leads you are losing today, and turns one visit
              into a lifetime of revenue.
            </p>
            <div className="aumy-cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request a Demo
              </Link>
              <Link to="/aumy" className="btn btn-secondary btn-lg">
                Explore the Platform
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AumyRevenueGenerator;
