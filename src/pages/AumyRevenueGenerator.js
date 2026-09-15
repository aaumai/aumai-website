import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { WatchButton, VideoLightbox } from '../components/FeatureVideo';
import './HomeClinic.css';

// "How Aumy works" (route kept at /revenue-generator so every existing link and
// the /aumy redirect still land here). Positioning 2026-09-15, owner's words —
// reports/positioning-2026-09-15-chaos-of-growth.md: Aumy is the operating
// system for a growing dental clinic; the problem is coordination, not
// patient acquisition; Convert → Care → Retain → Reactivate is the
// architecture underneath, and Aumy coordinates the work.

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const before = ['Growth', 'More patients', 'More calls', 'More WhatsApp', 'More follow-ups', 'More staff workload', 'More things falling through the cracks'];
const withAumy = ['Growth', 'Aumy coordinates the work', 'Your team focuses on patients'];

// The four stages — the architecture underneath. `m` is the work Aumy does in each.
const steps = [
  {
    stage: 'Convert',
    t: 'From the first enquiry to a booking',
    flow: 'Leads → Enquiries → Calls → Appointments → Bookings',
    d: 'Every call, WhatsApp message and ad enquiry answered, followed up and booked into a real slot — without someone at the front desk having to remember who asked what.',
    m: 'AI voice agent · WhatsApp answers · Lead follow-up · Appointment booking',
  },
  {
    stage: 'Care',
    t: 'Everything around the treatment',
    flow: 'Registration → Intake → Consent → Treatment → After-care → Patient communication',
    d: 'Digital registration and intake before the visit, consent signed on a phone or the clinic iPad, and treatment-specific after-care your doctors define — with any worrying reply routed to a person.',
    m: 'Digital registration · Intake forms · Digital consent · After-care plans',
  },
  {
    stage: 'Retain',
    t: 'Keeping patients on track',
    flow: 'Appointment follow-ups → Care gaps → Doctor check-ins → Preventive care',
    d: 'Confirmations, rescheduling and no-show recovery handled in the conversation, and every care gap — the crown after a root canal, the overdue cleaning — followed up on time.',
    m: 'Reminders & confirmations · No-show recovery · Care gaps · Doctor check-ins',
  },
  {
    stage: 'Reactivate',
    t: 'Bringing patients back',
    flow: 'Old patients → Overdue treatment → Missed appointments → Inactive patients',
    d: 'Patients who drifted away invited back in your doctors’ own words, at a pace your team can handle — not a blast to your whole list.',
    m: 'Inactive patients · Overdue treatment · Missed appointments · Stalled treatment plans',
  },
];

// The five groups of work Aumy manages — the chaos, not features.
const chaosGroups = [
  {
    title: 'Patient communication',
    items: ['AI voice agent that answers calls', 'Books appointments', 'Appointment reminders', 'WhatsApp and patient queries', 'Follow-ups', 'Your team takes over any chat in one tap'],
  },
  {
    title: 'Appointment orchestration',
    items: ['Confirmations', 'Rescheduling and cancellations', 'No-show management', 'Waitlists for earlier slots', 'Care gaps', 'Doctor away? Booked patients handled'],
  },
  {
    title: 'Digital clinic',
    items: ['Digital registration', 'Patient intake with signature', 'Digital consent', 'X-rays and documents on the record', 'Invoices and payments', 'Paperless workflows'],
  },
  {
    title: 'Patient journey',
    items: ['Pre-treatment instructions', 'Treatment records and charting', 'After-care', 'Care gaps', 'Doctor check-ins', 'Reactivation'],
  },
  {
    title: 'Growth',
    items: ['Get Found on Google', 'Reviews', 'Meta Ads', 'Lead capture', 'Lead conversion'],
  },
];

const knows = [
  { when: 'A patient calls', aumy: 'Aumy knows who they are.' },
  { when: 'They need an appointment', aumy: 'Aumy knows the doctor’s availability.' },
  { when: 'They don’t show', aumy: 'Aumy knows what happened.' },
  { when: 'They need a follow-up', aumy: 'Aumy creates and manages it.' },
  { when: 'They message after treatment', aumy: 'Aumy understands the treatment context.' },
  { when: 'They have an overdue care gap', aumy: 'Aumy knows it.' },
  { when: 'The clinic gets a call', aumy: 'The voice agent has the context.' },
];

// "Examine first. Prescribe after." — how we start with a clinic.
const workingModel = [
  { n: '01', t: 'We understand how your clinic runs', d: 'Your front desk, your doctors, your software — even paper registers. No work for your team.' },
  { n: '02', t: 'We find where work gets stuck', d: 'Where calls go unanswered, follow-ups stall and patients fall through the cracks — on your real data.' },
  { n: '03', t: 'We set Aumy up around your clinic', d: 'A dedicated expert configures Aumy to how your clinic actually works and runs it with you.' },
  { n: '04', t: 'We measure it with you', d: 'What was handled, what was booked, what still needs a person — reviewed with you every week.' },
];

const testimonials = [
  {
    quote: `AUM AI brought us a steady stream of new patients, woke up our dormant list, and kept our regulars coming back. Our revenue grew about 25% in just two months — and we didn’t hire a single extra person to make it happen.`,
    name: 'Vinayaka Dental Care',
    clinic: 'Dental clinic',
  },
];

const AumyRevenueGenerator = () => {
  const [video, setVideo] = useState(null);
  useEffect(() => {
    setPageSeo({
      title: 'How Aumy Works — The Operating System for a Growing Dental Clinic',
      description:
        'How Aumy manages the chaos that comes with growth: calls, WhatsApp, appointments, follow-ups, digital registration, intake, consent, X-rays and invoices on one connected platform — Convert, Care, Retain, Reactivate. Grow your clinic. Don’t grow the chaos.',
      canonical: 'https://aumai.co.in/revenue-generator',
      image: 'https://aumai.co.in/images/hero-dental.jpg',
    });
  }, []);

  return (
    <div className="ch-home">
      {/* HERO */}
      <section className="ch-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">How Aumy works</span>
          <h1 className="ch-hero-title">Grow your clinic. Don&rsquo;t grow the chaos.</h1>
          <p className="ch-hero-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Aumy is the operating system for a growing dental clinic. It manages the chaos that comes
            with growth — coordinating your patients, people and processes from the first enquiry to
            ongoing care.
          </p>
          <p className="ch-hero-chain">CONVERT → CARE → RETAIN → REACTIVATE</p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to="/growth-audit" className="ch-btn ch-btn-primary">Get my free Clinic Audit</Link>
            <Link to="/contact" className="ch-btn ch-btn-ghost">Talk to us</Link>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="ch-section">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">The problem</span>
          <h2 className="ch-h2">
            A successful dental clinic doesn&rsquo;t necessarily have a patient-acquisition problem.
            It often has a coordination problem.
          </h2>
          <p className="ch-lead">
            When chairs are full, growth creates chaos: calls, WhatsApp messages, enquiries, appointment
            confirmations, rescheduling, cancellations, no-shows, follow-ups, paperwork, consents,
            X-rays, invoices and patient questions.
          </p>
          <div className="ch-closetable">
            <div className="ch-close-row">
              <span className="ch-close-leak"><strong>Before Aumy</strong></span>
              <span className="ch-close-arrow" aria-hidden="true">·</span>
              <span className="ch-close-aumy">{before.join(' → ')}</span>
            </div>
            <div className="ch-close-row">
              <span className="ch-close-leak"><strong>With Aumy</strong></span>
              <span className="ch-close-arrow" aria-hidden="true">·</span>
              <span className="ch-close-aumy">{withAumy.join(' → ')}</span>
            </div>
          </div>
          <p className="ch-note ch-center">
            When your clinic grows, Aumy makes sure the operational workload doesn&rsquo;t grow with it.
          </p>
        </div>
      </section>

      {/* THE ARCHITECTURE */}
      <section className="ch-section ch-tint">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">The architecture underneath</span>
            <h2 className="ch-h2">Convert → Care → Retain → Reactivate. Aumy coordinates the work.</h2>
          </div>
          <div className="ch-pillars">
            {steps.map((s, i) => (
              <div key={i} className="ch-pillar">
                <span className="ch-eyebrow">{s.stage}</span>
                <h3 className="ch-pillar-title">{s.t}</h3>
                <p className="ch-pillar-body"><strong>{s.flow}</strong></p>
                <p className="ch-pillar-body">{s.d}</p>
                <p className="ch-pillar-machinery">{s.m}</p>
              </div>
            ))}
          </div>
          <p className="ch-note ch-center">Surrounding all four: <strong>Aumy coordinates the work.</strong></p>
        </div>
      </section>

      {/* THE FIVE GROUPS OF WORK */}
      <section className="ch-section">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">What Aumy manages</span>
            <h2 className="ch-h2">The work around your chairs, handled.</h2>
            <p className="ch-lead ch-center-lead">
              Not a bundle of separate tools — one connected platform doing the operational work in
              between, so your team spends less time chasing patients and more time caring for them.
            </p>
          </div>
          <div className="ch-pillars" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>
            {chaosGroups.map((g, i) => (
              <div key={i} className="ch-pillar">
                <span className="ch-eyebrow">{String(i + 1)}</span>
                <h3 className="ch-pillar-title">{g.title}</h3>
                <ul className="ch-mini">
                  {g.items.map((it) => <li key={it}><Check /> {it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVERYTHING IS CONNECTED */}
      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Everything is connected</span>
          <h2 className="ch-h2">Think of Aumy as Jarvis for your dental clinic.</h2>
          <p className="ch-lead">Not because it&rsquo;s a chatbot. Because everything knows what&rsquo;s happening.</p>
          <div className="ch-closetable">
            {knows.map((row, i) => (
              <div key={i} className="ch-close-row">
                <span className="ch-close-leak">{row.when}</span>
                <span className="ch-close-arrow" aria-hidden="true">→</span>
                <span className="ch-close-aumy">{row.aumy}</span>
              </div>
            ))}
          </div>
          <p className="ch-lead">
            Your calls know your appointments. Your appointments know your patients. Your patients know
            their treatment. Your follow-ups know what happened. And Aumy knows all of it.
          </p>
          <p className="ch-note ch-center"><strong>One patient. One journey. One connected system.</strong></p>
        </div>
      </section>

      {/* GROWTH — ads on the same connected platform */}
      <section className="ch-section">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">And when you do advertise</span>
          <h2 className="ch-h2">Your ads learn from what happens next.</h2>
          <p className="ch-lead">
            Because the platform running your Meta ads also handles the enquiry, the booking and the
            visit, it knows which leads became patients — and your campaigns learn from that. Meta
            &amp; Google only ever see anonymous lead signals: treatment and health details never leave
            the clinic.
          </p>
          <ul className="ch-mini" style={{ display: 'inline-grid', textAlign: 'left' }}>
            <li><Check /> Every enquiry from an ad answered and followed up — not left in a spreadsheet</li>
            <li><Check /> Campaigns judged by patients who booked, not clicks</li>
            <li><Check /> Privacy-safe — no patient data handed to ad platforms</li>
          </ul>
          <div>
            <WatchButton onClick={() => setVideo({ file: 'smarter-ads', title: 'Smarter ads — how the loop works' })} />
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="ch-section ch-tint">
        <div className="ch-container ch-center">
          <h2 className="ch-h2">Busy clinics already run on Aumy.</h2>
          <div className="ch-testimonials">
            {testimonials.map((t, i) => (
              <figure key={i} className="ch-testimonial">
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong> · {t.clinic}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WORKING MODEL */}
      <section className="ch-section">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">How we work with you</span>
            <h2 className="ch-h2">Examine first. Prescribe after.</h2>
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
          <h2 className="ch-offer-title">See where work gets stuck in your clinic — free.</h2>
          <p className="ch-offer-sub">
            A free Clinic Audit shows where enquiries, follow-ups and patients slip through the cracks
            in your clinic — no obligation.
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to="/growth-audit" className="ch-btn ch-btn-primary">Get my free Clinic Audit</Link>
          </div>
        </div>
      </section>

      <VideoLightbox video={video} onClose={() => setVideo(null)} />
    </div>
  );
};

export default AumyRevenueGenerator;
