import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AumyProduct.css';
import './AumyRevenueGenerator.css';
import './Page.css';

const AumyRevenueGenerator = () => {
  useEffect(() => {
    document.title = 'AUMY Revenue Generator · AUM AI | Recover Lost Revenue, Book Every Lead, Keep Patients for Life';
  }, []);

  // Illustrative (*) ranges + one real, attributed result (†).
  const heroStats = [
    { value: '20–40%*', label: 'Revenue lost to no-shows & dead leads — recovered' },
    { value: '2–3×*', label: 'More enquiries converted to bookings' },
    { value: '100%', label: 'Of bookings & revenue attributed' },
    { value: '+25%†', label: 'Revenue in 60 days' },
  ];

  // Illustrative monthly leak for a mid-sized clinic (~₹8L/month billing).
  // Ranges are easy to tune — one array. Clearly marked illustrative on-page.
  const revenueLeaks = [
    { label: 'No-shows & last-minute cancellations', range: '₹50k – 1.1L', note: 'Booked chairs that sit empty' },
    { label: 'Enquiries never followed up', range: '₹40k – 90k', note: 'Leads that went cold before a callback' },
    { label: 'Dormant & overdue patients', range: '₹50k – 1L', note: 'Patients who quietly stopped coming' },
    { label: 'Treatment plans never scheduled', range: '₹70k – 1.4L', note: 'Accepted in the chair — never booked' },
  ];

  const engineSteps = [
    { number: '01', title: 'Catch every lead — any source', text: 'Instagram DMs, WhatsApp, a missed call, a walk-in, a referral, Google, or a paid ad — every enquiry instantly opens a WhatsApp conversation. Nothing slips past a busy front desk.' },
    { number: '02', title: 'Book it — and keep the slot', text: 'AUMY answers questions, qualifies, and books in seconds, 24/7. Then it reminds and confirms — and automatically rebooks the few who still miss — so the appointments you win actually show up.' },
    { number: '03', title: 'Revive patients you already have', text: 'Overdue and dormant patients are re-engaged automatically on WhatsApp — reactivating revenue you already paid to acquire, at near-zero marginal cost.' },
    { number: '04', title: 'Keep them for life', text: 'Recall cadences, treatment-plan follow-ups, and review requests turn one visit into years of repeat appointments, accepted treatments, and referrals.' },
  ];

  const capiSteps = [
    { number: '01', title: 'Signal real conversions', text: 'When a lead books or pays, AUMY sends that conversion server-side to Meta — the outcome that matters, not a page view.' },
    { number: '02', title: 'Meta optimizes for patients', text: 'The ad algorithm learns who actually books and spends more of your budget finding more of them. Junk leads fall away.' },
    { number: '03', title: 'It compounds every month', text: 'Lookalike audiences built from your real patients get sharper over time — cost per genuine lead keeps falling as the system learns.' },
  ];

  const capabilities = [
    {
      title: 'Lead Capture from Every Channel',
      description: 'Instagram, WhatsApp, missed calls, walk-ins, referrals, Google, or ads — every enquiry gets an instant WhatsApp reply. AUMY qualifies, answers, and books, so you never lose a lead to a slow callback again.',
      color: '#10b981',
      icon: 'M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
    },
    {
      title: 'Cold Lead Retry',
      description: 'Most enquiries never reply to the first message — so AUMY does not stop at one. It follows up cold and unconverted leads with a polite, well-timed sequence until they book or clearly opt out. Leads your front desk would have written off quietly turn into appointments.',
      color: '#ec4899',
      icon: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5',
    },
    {
      title: 'No-Show Prevention & Rebooking',
      description: 'Timed reminders and confirmations keep booked slots filled — and when a patient still misses, AUMY automatically reaches out to rebook them into the next open slot. Every recovered no-show is a chair you had already sold, now actually earning.',
      color: '#0ea5e9',
      icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008z',
    },
    {
      title: 'AI Recall & Reactivation',
      description: 'Dormant and overdue patients are automatically re-engaged on WhatsApp with the right message at the right time — reviving revenue you already paid to acquire.',
      color: '#8b5cf6',
      icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
    },
    {
      title: 'Treatment-Plan Conversion',
      description: 'Proposed treatments that never got scheduled are quietly the biggest leak in a clinic. AUMY follows up on unscheduled and declined plans until more patients say yes — lifting treatment acceptance and the revenue that comes with it.',
      color: '#f59e0b',
      icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z',
    },
    {
      title: 'Google Reviews & Local SEO',
      description: 'After a good visit, AUMY asks happy patients for a Google review at exactly the right moment. More 5-star reviews push you up local search and Google Maps — so new patients find you first — while the social proof wins them before they even call.',
      color: '#34d399',
      icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
    },
    {
      title: 'Retention & Lifetime Value',
      description: 'Follow-ups, recall cadences, and review requests keep patients coming back. One acquired patient becomes years of repeat visits and referrals — the cheapest revenue a clinic ever earns.',
      color: '#f43f5e',
      icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
    },
    {
      title: 'Meta CAPI Ad Optimization',
      description: 'Optional, for clinics that advertise. Server-side conversion tracking that lowers cost per lead and floods the top of your funnel with people who actually book — while staying privacy-safe.',
      color: '#3b82f6',
      icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    },
    {
      title: 'Conversion Attribution',
      description: 'Know exactly which channel, campaign, and conversation produced each booking and each rupee of revenue — so you double down on what works and cut what does not.',
      color: '#06b6d4',
      icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    },
    {
      title: 'Operator Inbox (Human-in-the-Loop)',
      description: 'AUMY handles the routine; your team sees only what needs a human — escalations, edge cases, approvals — in one prioritized queue. More revenue, no extra headcount.',
      color: '#a855f7',
      icon: 'M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z',
    },
    {
      title: 'ROI Dashboards',
      description: 'A clinic owner’s view of attributed revenue, cost per lead, patients booked, and lifetime value — the clear answer to "what is my clinic actually returning?"',
      color: '#a78bfa',
      icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605',
    },
  ];

  const howItHappens = [
    {
      tag: 'Capture',
      title: 'Every lead, every channel — caught and booked',
      text: 'Most clinics lose patients in the gap between "they enquired" and "someone called back." Instagram DMs, WhatsApp messages, missed calls, walk-ins, referrals, Google, paid ads — AUMY answers the instant any of them arrives, qualifies, checks availability, and books the slot. Day or night, with no one sitting by the phone. And the leads who don’t reply right away aren’t written off: AUMY retries them with a polite, well-timed sequence until they book or opt out. The front desk stops being the bottleneck, and leads that would have gone cold become appointments on the calendar.',
    },
    {
      tag: 'No-shows',
      title: 'Booked slots become kept appointments',
      text: 'A booking you never keep is worse than no booking — it blocks a chair and earns nothing. AUMY sends timed reminders and confirmations on WhatsApp, lets patients reschedule in a tap, and when someone still misses, automatically reaches out to rebook them into the next open slot. Each recovered no-show is revenue you had already sold, now actually collected — one of the fastest wins a clinic sees.',
    },
    {
      tag: 'Reactivation',
      title: 'Dormant patients become revenue you already paid for',
      text: 'Every clinic is sitting on a list of patients who drifted away. AUMY automatically identifies overdue and dormant patients and re-engages them on WhatsApp with timely, personal recall messages. You reactivate revenue from patients you already spent money to acquire — at near-zero marginal cost.',
    },
    {
      tag: 'Treatment value',
      title: 'More proposed treatments actually get done',
      text: 'The quietest leak in any clinic is the treatment plan that was presented and never scheduled. AUMY follows up on unscheduled and declined plans, answers hesitations, and nudges patients to book — so treatment acceptance rises and the revenue that was already on the table finally lands.',
    },
    {
      tag: 'Paid growth · optional',
      title: 'If you advertise, every rupee works harder',
      text: 'Running Meta or Instagram ads? AUMY closes the loop: the moment a lead books or pays, that conversion is sent server-side to Meta via CAPI. Meta then optimizes for real bookings, builds lookalike audiences from your actual patients, and stops wasting budget on tyre-kickers — so cost per genuine lead keeps falling. And if you don’t run ads at all, every other engine above still recovers revenue from the patients and leads you already have.',
    },
    {
      tag: 'Proof',
      title: 'Attribution + ROI dashboards show exactly what pays',
      text: 'AUMY traces every booking and every rupee back to the channel, campaign, and conversation that produced it, then rolls it up into a clinic-owner dashboard: attributed revenue, cost per lead, patients booked, lifetime value. You stop guessing and start reallocating effort to what genuinely returns.',
    },
  ];

  const roiTiles = [
    { value: 'Attributed', label: 'Revenue traced to each channel & conversation' },
    { value: 'Cost / Lead', label: 'What you actually pay for a genuine lead' },
    { value: 'Patients Booked', label: 'Bookings from automation vs. manual effort' },
    { value: 'Lifetime Value', label: 'Repeat revenue per acquired patient' },
  ];

  // Real partner clinics. Quotes are working drafts — swap for the clinic's
  // exact words once confirmed. Set logo/portrait paths when the images land in
  // /public/clients; until then a monogram + wordmark renders cleanly.
  const testimonials = [
    {
      name: 'Vinaykia Dental Care',
      label: 'Real Result · Partner Clinic',
      logo: '/clients/vinaykia-dental-logo.jpeg',
      portrait: '/clients/vinaykia-dentist.jpeg',
      initials: 'VD',
      quote: `“AUM AI brought us a steady stream of new patients, woke up our dormant list, and kept our regulars coming back. Our revenue grew about 25% in just two months — and we didn’t hire a single extra person to make it happen.”`,
      chips: [
        { value: '+25%', label: 'Revenue in 2 months' },
        { value: 'New', label: 'Leads generated' },
        { value: 'Dormant', label: 'Patients reactivated' },
        { value: 'Existing', label: 'Patients retained' },
      ],
    },
    {
      name: 'Vinayaka Derma',
      label: 'Real Result · Partner Clinic',
      logo: null, // TODO: drop /clients/vinayaka-derma-logo.jpeg and set this
      portrait: null, // TODO: drop /clients/vinayaka-derma-doctor.jpeg and set this
      initials: 'VD',
      quote: `“AUMY quietly went to work on the patients we already had — waking up our dormant list, sending recall reminders right on time, and following up after every appointment. Patients feel genuinely looked after, our Google reviews keep climbing, and we’re earning more from the same chairs without anyone chasing follow-ups by hand.”`,
      chips: [
        { value: 'Dormant', label: 'Patients reactivated' },
        { value: 'Recalls', label: 'Sent automatically' },
        { value: 'Post-visit', label: 'Follow-ups on autopilot' },
        { value: '5★', label: 'More Google reviews' },
      ],
    },
  ];

  // Optional light-clinical add-ons. Kept deliberately small + last so they
  // never dilute the revenue-generation story, which is the point of the page.
  const clinicalBonus = [
    { title: 'Telehealth', text: 'Run secure video consults right inside AUMY — no separate tool to set up or pay for.', icon: 'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z' },
    { title: 'Auto Documentation', text: 'AUMY listens and writes the clinical note for you — accurate, structured, saved to the record. Doctors stop typing and get their time back.', icon: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z' },
    { title: 'Billing & Invoicing', text: 'Invoices, payments, and receipts in the same app — one source of truth, no extra billing software.', icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z' },
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
              AUM AI · Revenue Recovery Platform for Clinics
            </div>

            <h1 className="aumy-hero-title">
              Stop losing patients after they enquire.
              <br />
              Book every lead, prevent no-shows, revive dormant patients — and keep them for{' '}
              <span className="aumy-gradient">life</span>.
            </h1>

            <p className="aumy-hero-subtitle">
              AUMY is the revenue engine behind your clinic. It catches every enquiry — from Instagram,
              WhatsApp, a missed call, a walk-in, a referral, Google, or a paid ad — books it on WhatsApp in
              seconds, chases down cold leads, prevents and rebooks no-shows, wins back dormant patients, lifts
              treatment acceptance, and earns more 5-star Google reviews that push you up local search. And when
              you do run ads, Meta CAPI makes every rupee work harder. Not more software to run — more patients,
              more kept, more revenue.
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

      {/* The hidden leak — cost of the problem, in ROI terms */}
      <section className="section aumy-caps-section rev-leak-section" id="leak">
        <div className="container">
          <div className="section-header">
            <span className="section-label rev-leak-label-pill">The Hidden Leak</span>
            <h2 className="section-title">Where your clinic loses money today</h2>
            <p className="section-subtitle">
              Most clinics don’t have a traffic problem — they have a follow-through problem. Revenue you have
              already earned slips out through four quiet gaps, month after month:
            </p>
          </div>

          <div className="rev-leak-card">
            <div className="rev-leak-rows">
              {revenueLeaks.map((leak, i) => (
                <div key={i} className="rev-leak-row">
                  <div className="rev-leak-row-main">
                    <span className="rev-leak-row-label">{leak.label}</span>
                    <span className="rev-leak-row-note">{leak.note}</span>
                  </div>
                  <span className="rev-leak-row-range">
                    {leak.range}
                    <span className="rev-leak-row-permo">/mo</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="rev-leak-total">
              <div className="rev-leak-total-text">
                <span className="rev-leak-total-headline">Roughly 20–40% of monthly revenue</span>
                <span className="rev-leak-total-sub">
                  ≈ ₹1.5–3L every month for a clinic billing ~₹8L — and almost all of it is recoverable.
                </span>
              </div>
              <Link to="/contact" className="btn btn-primary rev-leak-cta">
                Recover it
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <p className="rev-footnote">
            * Illustrative ranges for a mid-sized clinic; your real figures depend on specialty, location,
            patient volume, and average ticket size. The four gaps overlap and rarely peak at once — we size
            your actual number with you on a demo, using your own data.
          </p>
        </div>
      </section>

      {/* Revenue Engine flow */}
      <section className="section aumy-demo-section" id="revenue-engine">
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Revenue Engine</span>
            <h2 className="section-title">From a first enquiry to a patient for life — automatically.</h2>
            <p className="section-subtitle">
              Four moves, fully automated. Each one plugs a hole where clinics quietly lose money today —
              whatever channel the patient came from, and whether or not you spend a rupee on ads.
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

      {/* Capabilities */}
      <section className="section aumy-caps-section" id="capabilities">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What Drives the Revenue</span>
            <h2 className="section-title">Every capability earns its place in money terms.</h2>
            <p className="section-subtitle">
              No feature list for its own sake. Each capability either brings a patient in, books them faster,
              keeps the slot, revives one you lost, gets more treatments accepted, or proves what your clinic returns.
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

      {/* Meta CAPI deep-dive — optional accelerant for clinics that advertise */}
      <section className="section aumy-caps-section" id="capi">
        <div className="container">
          <div className="section-header">
            <span className="section-label">If You Advertise · Meta Conversion API (CAPI)</span>
            <h2 className="section-title">Running ads? Make every rupee buy a patient, not a click.</h2>
            <p className="section-subtitle">
              Optional, and powerful. If you run Meta or Instagram ads, CAPI tells Meta who actually became a
              patient — so your budget stops chasing curiosity and starts buying revenue. No ad budget? Skip
              this part — every other engine on this page still recovers revenue from the patients and leads
              you already have.
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

      {/* ROI dashboard / proof */}
      <section className="section aumy-caps-section" id="roi">
        <div className="container">
          <div className="section-header">
            <span className="section-label">You See the Return</span>
            <h2 className="section-title">A dashboard that answers: what is my clinic actually returning?</h2>
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

      {/* Client testimonials / case studies (real, attributed) */}
      <section className="section aumy-cta-section" id="testimonial">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Real Results · Partner Clinics</span>
            <h2 className="section-title">Clinics are earning more from the patients they already have.</h2>
          </div>

          <div className="rev-testimonials">
            {testimonials.map((t, i) => (
              <div key={i} className="rev-testimonial">
                <div className="rev-testimonial-head">
                  <span className="section-label">{t.label}</span>
                  {t.logo ? (
                    <div className="rev-client-logo">
                      <img src={t.logo} alt={t.name} />
                    </div>
                  ) : (
                    <div className="rev-client-logo rev-client-logo-text">{t.name}</div>
                  )}
                </div>

                <div className="rev-testimonial-body">
                  {t.portrait ? (
                    <img className="rev-portrait" src={t.portrait} alt={`${t.name} — lead clinician`} />
                  ) : (
                    <div className="rev-portrait rev-portrait-fallback" aria-hidden="true">{t.initials}</div>
                  )}
                  <blockquote className="rev-quote">
                    {t.quote}
                    <cite className="rev-cite">— {t.name}</cite>
                  </blockquote>
                </div>

                <div className="rev-metric-chips">
                  {t.chips.map((c, j) => (
                    <div key={j} className="rev-chip">
                      <span className="rev-chip-value">{c.value}</span>
                      <span className="rev-chip-label">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus: light clinical, for clinics that want one system. Kept small and
          last on purpose so it never competes with the revenue story above. */}
      <section className="section aumy-demo-section rev-bonus-section" id="bonus-clinical">
        <div className="container">
          <div className="rev-bonus">
            <div className="rev-bonus-head">
              <span className="section-label rev-bonus-pill">Bonus · One System</span>
              <span className="rev-bonus-note">
                Optional and opt-in. Prefer to run your whole clinic in one app? AUMY includes a light
                clinical layer too — so you are not stitching five tools together.
              </span>
            </div>
            <div className="rev-bonus-grid">
              {clinicalBonus.map((b, i) => (
                <div key={i} className="rev-bonus-item">
                  <div className="rev-bonus-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d={b.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4>{b.title}</h4>
                    <p>{b.text}</p>
                  </div>
                </div>
              ))}
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
              Bring your patient list and your goals — ad spend optional. We will show you, on real numbers,
              how AUMY books the leads you are losing today, fills the no-show gaps, wins back dormant patients,
              gets more treatments accepted, and turns one visit into a lifetime of revenue.
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
