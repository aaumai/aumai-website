import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import LeakCheck from '../components/LeakCheck';
import DemoPlaylist from '../components/DemoPlaylist';
import AppDownload from '../components/AppDownload';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

// Positioning 2026-09-15 — the owner's own words (reports/positioning-2026-09-15-chaos-of-growth.md).
// "A successful dental clinic doesn't necessarily have a patient-acquisition
// problem. It often has a coordination problem." The page is organised around
// the chaos, not features; Convert → Care → Retain → Reactivate is the
// architecture underneath.
const before = ['Growth', 'More patients', 'More calls', 'More WhatsApp', 'More follow-ups', 'More staff workload', 'More things falling through the cracks'];
const withAumy = ['Growth', 'Aumy coordinates the work', 'Your team focuses on patients'];

// The five groups the site is organised around — the chaos, not features.
const chaosGroups = [
  {
    title: 'Patient communication',
    items: ['AI voice agent', 'Answer calls', 'Book appointments', 'Appointment reminders', 'WhatsApp', 'Patient queries', 'Follow-ups'],
  },
  {
    title: 'Appointment orchestration',
    items: ['Confirmations', 'Rescheduling', 'Cancellations', 'No-show management', 'Waitlists', 'Care gaps'],
  },
  {
    title: 'Digital clinic',
    items: ['Digital registration', 'Patient intake', 'Consent', 'X-rays', 'Invoices', 'Paperless workflows'],
  },
  {
    title: 'Patient journey',
    items: ['Pre-treatment', 'Treatment', 'After-care', 'Care gaps', 'Doctor check-ins', 'Reactivation'],
  },
  {
    title: 'Growth',
    items: ['Get Found', 'Meta Ads', 'Lead capture', 'Lead conversion'],
  },
];

// "Think of Aumy as Jarvis for your dental clinic." — owner's analogy.
const knows = [
  { when: 'A patient calls', aumy: 'Aumy knows who they are.' },
  { when: 'They need an appointment', aumy: 'Aumy knows the doctor’s availability.' },
  { when: 'They don’t show', aumy: 'Aumy knows what happened.' },
  { when: 'They need a follow-up', aumy: 'Aumy creates and manages it.' },
  { when: 'They message after treatment', aumy: 'Aumy understands the treatment context.' },
  { when: 'They have an overdue care gap', aumy: 'Aumy knows it.' },
  { when: 'The clinic gets a call', aumy: 'The voice agent has the context.' },
];

// The architecture underneath: four stages, and Aumy coordinates the work.
const pillars = [
  { stage: 'Convert', title: 'From the first enquiry to a booking', flow: 'Leads → Enquiries → Calls → Appointments → Bookings' },
  { stage: 'Care', title: 'Everything around the treatment', flow: 'Registration → Intake → Consent → Treatment → After-care → Patient communication' },
  { stage: 'Retain', title: 'Keeping patients on track', flow: 'Appointment follow-ups → Care gaps → Doctor check-ins → Preventive care' },
  { stage: 'Reactivate', title: 'Bringing patients back', flow: 'Old patients → Overdue treatment → Missed appointments → Inactive patients' },
];

const whyUs = [
  { title: 'A dedicated expert runs it with you', body: 'An expert is assigned to your clinic — they set AUMY up around how your clinic actually works, operate it end-to-end, and review it with you. You are never left to figure out software alone.' },
  { title: 'No rip-and-replace', body: 'It works on top of the systems you already use.' },
  { title: 'One connected platform', body: 'Front desk, patient records, forms, follow-ups, reviews and ads — everything talks to everything else, with full context.' },
  { title: 'Your data, secured', body: 'Encrypted, access-controlled, and private by design.' },
];

const faqs = [
  { q: 'How does the 60-day money-back guarantee work?', a: 'We set AUMY up on your clinic and it goes to work — real enquiries answered, real bookings made, real care gaps followed up. If it doesn\u2019t meet your expectations in the first 60 days, you get your money back. No lock-in, and your data stays yours.' },
  { q: 'Do you have your own dental software (PMS)?', a: 'Yes — AUMY includes a complete Dental PMS: patient records, appointments, FDI odontogram with 6-point perio charting, digital prescriptions, treatment plans, and full billing, invoicing & accounts. It even charts as you speak. Clinics that want one platform run everything on AUMY, at the same price.' },
  { q: 'Do I have to replace my current software?', a: 'No. Whatever software you use, AUMY keeps your data in sync with it and adds the growth and engagement layer on top. If you want one connected platform, we migrate your data from your current software into AUMY for a one-time migration fee — with no downtime.' },
  { q: 'Is my patient data safe?', a: 'Yes — encrypted in transit and at rest, role-based access, and private by design.' },
  { q: 'How long does it take to get started?', a: 'Most clinics are live quickly — and most of that is simple setup we handle with you.' },
  { q: 'Will my staff have to learn something complicated?', a: 'No. AUMY runs in the background and takes work off the front desk — your team does less, not more.' },
  { q: 'Is this a product or a service?', a: 'Both — you get a proven system (AUMY), run and tailored for you by a partner. You are not buying software to figure out alone.' },
  { q: 'Who actually runs all this?', a: 'A dedicated expert is assigned to your clinic on a permanent basis. They set up and operate the entire system with you, and review it with you every week — you are never left to run software yourself.' },
];

// Real, attributed partner-clinic testimonials (sourced from the revenue-generator page).
const testimonials = [
  {
    quote:
      `AUM AI brought us a steady stream of new patients, woke up our dormant list, and kept our regulars coming back. Our revenue grew about 25% in just two months — and we didn’t hire a single extra person to make it happen.`,
    name: 'Vinayaka Dental Care',
    clinic: 'Dental clinic',
    result: '+25% revenue in 2 months',
  },
];

const Home = () => {
  useEffect(() => {
    setPageSeo({
      // Title/description carry the two search themes (owner 2026-09-18) —
      // AI-powered dental clinic operations, AI-powered patient journey &
      // engagement — in front of the positioning line. Same strings in
      // scripts/prerender.js (slug '') and public/index.html.
      title: 'Aumy — AI-Powered Dental Clinic Operations & Patient Engagement | The Operating System for a Growing Dental Clinic',
      description:
        'Aumy is the AI-powered operating system for a growing dental clinic: clinic operations (calls, WhatsApp, appointments, intake, consent, invoices, tasks) and the patient journey (reminders, after-care, doctor check-ins, care gaps, reactivation) in one connected platform. Grow your clinic. Don’t grow the chaos.',
      canonical: 'https://aumai.co.in/',
      image: 'https://aumai.co.in/images/hero-dental.jpg',
    });
  }, []);

  return (
    <div className="ch-home">
      {/* HERO */}
      <section className="ch-hero">
        <div className="ch-container ch-hero-grid">
          <div className="ch-hero-text">
            <span className="ch-eyebrow">The operating system for a growing dental clinic</span>
            <h1 className="ch-hero-title">
              Your clinic is growing. <span className="ch-hero-accent">Don&rsquo;t let the chaos grow with it.</span>
            </h1>
            <p className="ch-hero-sub">
              Aumy is the AI-powered operating system for dental clinics — managing patient journeys,
              follow-ups, appointments, calls, digital intake and clinic tasks in one connected platform.
            </p>
            <p className="ch-hero-chain">CONVERT → CARE → RETAIN → REACTIVATE</p>
            <p className="ch-hero-sub"><strong>One platform. One patient context. Less manual work.</strong></p>
            <div className="ch-hero-cta">
              <a href="#how-it-works" className="ch-btn ch-btn-primary">
                See How Aumy Works
              </a>
              <Link to="/contact" className="ch-btn ch-btn-ghost">
                Get started — risk-free
              </Link>
            </div>
            <a
              href="https://wa.me/919022312554?text=Hi%2C%20I%20wanted%20to%20ask%20about%20aligners"
              target="_blank"
              rel="noopener noreferrer"
              className="ch-btn ch-hero-wa"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 12,
                background: '#25D366', color: '#fff', fontWeight: 700,
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Try it live — WhatsApp us like a patient would
            </a>
            <p className="ch-hero-trust">
              60-day money-back guarantee · no lock-in · we set everything up for you · limited implementation capacity · built only for dental clinics · NVIDIA Inception member
            </p>
          </div>

          <div className="ch-hero-visual">
            <div className="ch-hero-photo">
              <img
                src="/images/hero-dental.jpg"
                alt="A premium modern dental treatment room in soft morning light — cream dental chair, sage-teal accent wall"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Be the patient: live hands-on demo ─────────────────────────── */}
      <section className="ch-section" id="be-the-patient">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Don&rsquo;t watch a demo</span>
            <h2 className="ch-h2">Be the patient.</h2>
            <p className="ch-sub">
              WhatsApp our live demo clinic and experience exactly what your patients would —
              the same AI, the same follow-ups, the real product.
            </p>
          </div>
          <div className="ch-why-card" style={{ display: 'block', maxWidth: 720, margin: '0 auto', padding: 28 }}>
            <p style={{ fontSize: '1.15rem', fontWeight: 700, textAlign: 'center', marginTop: 0 }}>
              📱 WhatsApp <a href="https://wa.me/919022312554?text=Hi%2C%20I%20wanted%20to%20ask%20about%20aligners" style={{ whiteSpace: 'nowrap' }}>+91 90223 12554</a>
            </p>
            <ol style={{ lineHeight: 1.9, margin: '18px 0 0', paddingLeft: 22 }}>
              <li><strong>Ask about aligners or implants</strong> — watch it answer instantly, like your best receptionist on her best day.</li>
              <li><strong>Book a slot… or don&rsquo;t.</strong> Go quiet, and see the gentle follow-up arrive tomorrow.</li>
              <li><strong>Booked? Try changing your mind</strong> — reschedule or cancel in one message, no phone queue.</li>
              <li><strong>Skip your appointment</strong> — and watch how it wins the rebooking without nagging.</li>
              <li><strong>After your &ldquo;visit&rdquo;</strong>, we&rsquo;ll mark it done — see how it asks for your feedback.</li>
              <li><strong>Come back in 3 months</strong> for your check-up reminder. Ghost us for 6, and AUMY will try to win you back 🙂</li>
            </ol>
            <p style={{ marginTop: 18, textAlign: 'center', color: '#5b6784' }}>
              Every message you receive is the same system your patients would experience — Convert, Care, Retain, Reactivate, in real time.
            </p>
          </div>
        </div>
      </section>


      <DemoPlaylist />

      {/* PROBLEM — owner's insight: a coordination problem, not an acquisition problem. */}
      <section className="ch-section">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">What we learned from hundreds of dental clinics</span>
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

      {/* THE FIVE GROUPS — the site is organised around the chaos, not features. */}
      <section className="ch-section ch-tint">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">What Aumy manages</span>
            <h2 className="ch-h2">Aumy manages the chaos that comes with growth.</h2>
            <p className="ch-lead ch-center-lead">
              Coordinating your patients, people and processes from the first enquiry to ongoing care.
            </p>
          </div>
          {/* Five groups in one row on desktop (no orphan card); wraps on smaller screens. */}
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

      {/* TWO HALVES — the two things clinic owners search for (owner 2026-09-18):
          AI-powered dental clinic operations, and an AI-powered patient journey.
          The five groups above fold into these two; each has its own page. */}
      <section className="ch-section" id="two-halves">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Two halves of one system</span>
            <h2 className="ch-h2">AI-powered dental clinic operations. An AI-powered patient journey. One connected platform.</h2>
            <p className="ch-lead ch-center-lead">
              The work around your chairs, and the journey of every patient through them &mdash;
              coordinated by the same system, with the same patient context.
            </p>
          </div>
          <div className="ch-paths">
            <div className="ch-pillar ch-path">
              <span className="ch-eyebrow">Clinic operations</span>
              <h3 className="ch-pillar-title">AI-powered dental clinic operations</h3>
              <p className="ch-pillar-body">
                Every call and WhatsApp answered, appointments booked, confirmed and rescheduled, no-shows
                followed up, registration, intake, consent and invoices digital &mdash; and one team inbox
                for whatever needs a person.
              </p>
              <Link to="/ai-dental-clinic-operations" className="ch-btn ch-btn-ghost" style={{ marginTop: 14 }}>
                See clinic operations
              </Link>
            </div>
            <div className="ch-pillar ch-path">
              <span className="ch-eyebrow">Patient journey</span>
              <h3 className="ch-pillar-title">AI-powered patient journey &amp; engagement</h3>
              <p className="ch-pillar-body">
                Reminders, pre-treatment instructions, treatment-specific after-care, doctor check-ins, care
                gaps, treatment-plan follow-ups and reactivation &mdash; each message in the context of that
                patient&rsquo;s treatment, and each journey ending the moment the patient books.
              </p>
              <Link to="/ai-patient-engagement" className="ch-btn ch-btn-ghost" style={{ marginTop: 14 }}>
                See the patient journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EVERYTHING IS CONNECTED — moat lines + the Jarvis analogy. */}
      <section className="ch-section">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Everything is connected</span>
          <h2 className="ch-h2">Think of Aumy as Jarvis for your dental clinic.</h2>
          <p className="ch-lead">
            Not because it&rsquo;s a chatbot. Because everything knows what&rsquo;s happening.
          </p>
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

      {/* ARCHITECTURE — Convert → Care → Retain → Reactivate, and Aumy coordinates the work. */}
      <section className="ch-section ch-tint" id="how-it-works">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">How Aumy works</span>
            <h2 className="ch-h2">Convert → Care → Retain → Reactivate. Aumy coordinates the work.</h2>
            <p className="ch-lead ch-center-lead">
              One connected platform underneath the whole patient journey — so your clinic can grow
              without growing the chaos.
            </p>
          </div>
          <div className="ch-pillars">
            {pillars.map((p, i) => (
              <div key={i} className="ch-pillar">
                <span className="ch-eyebrow">{p.stage}</span>
                <h3 className="ch-pillar-title">{p.title}</h3>
                <p className="ch-pillar-body">{p.flow}</p>
              </div>
            ))}
          </div>
          <p className="ch-note ch-center">
            Surrounding all four: <strong>Aumy coordinates the work.</strong>
          </p>
        </div>
      </section>

      {/* LEAK CHECK — optional, below the story (it estimates what slips through). */}
      <section className="ch-section ch-tint" id="leak-check">
        <div className="ch-container">
          <LeakCheck market="in" headingLevel="h2" />
        </div>
      </section>

      {/* TWO WAYS TO RUN AUMY — with our full PMS, or on top of yours */}
      <section className="ch-section" id="pms">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Your software, your choice</span>
            <h2 className="ch-h2 ch-center">Full dental software included — or keep the one you have.</h2>
            <p className="ch-lead ch-center-lead">
              AUMY works both ways. Run your whole clinic on it, or let it power growth on top of the
              software you already use — same price either way.
            </p>
          </div>
          <div className="ch-paths">
            <div className="ch-pillar ch-path">
              <span className="ch-eyebrow">Want one complete platform?</span>
              <h3 className="ch-pillar-title">AUMY includes a full Dental PMS</h3>
              <p className="ch-pillar-body">
                Everything a traditional dental software does — and then some. Patient records &amp;
                appointments, FDI odontogram with 6-point perio charting, digital prescriptions,
                treatment plans, billing, invoicing &amp; accounts. Plus voice-powered charting:
                you talk, AUMY charts.
              </p>
            </div>
            <div className="ch-pillar ch-path">
              <span className="ch-eyebrow">Happy with your current PMS?</span>
              <h3 className="ch-pillar-title">Keep it — AUMY runs on top</h3>
              <p className="ch-pillar-body">
                No retraining on day one. Whatever software you use, AUMY keeps your data in sync
                with it and runs the front-desk and patient-journey layer — Convert, Care, Retain, Reactivate — on top.
                <strong> Want one connected platform? We migrate your data from your current software
                into AUMY for a one-time migration fee.</strong>{' '}
                <Link to="/switch">How the move works</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / MOAT */}
      <section className="ch-section ch-tint">
        <div className="ch-container ch-split">
          <div className="ch-split-text">
            <span className="ch-eyebrow">Why it works</span>
            <h2 className="ch-h2">Anyone can send a reminder. We hold the conversation — and book the patient.</h2>
            <p className="ch-lead">
              That is the difference. AUMY does not just fire off messages. It answers questions,
              handles rescheduling, and turns interest into a booked appointment — the way your best
              receptionist would, at any hour. And we configure it around how your clinic actually
              works.
            </p>
            <ul className="ch-mini">
              <li><Check /> Captures every enquiry and follows up until it books — no lead goes cold</li>
              <li><Check /> Confirms, reschedules and cancels — so a would-be no-show reopens the slot</li>
              <li><Check /> Follows up care gaps on time and reactivates patients who drifted away</li>
              <li><Check /> Follows up every accepted treatment plan until the patient books it</li>
              <li><Check /> Every call, message, form and follow-up in one patient record — full context, always</li>
            </ul>
          </div>
          <div className="ch-split-visual">
            <div className="ch-chat">
              <div className="ch-chat-head">
                <span className="ch-chat-avatar">A</span>
                <div>
                  <div className="ch-chat-name">AUMY</div>
                  <div className="ch-chat-status">AI receptionist · online</div>
                </div>
              </div>
              <div className="ch-chat-body">
                <div className="ch-bubble ch-in">Hi, saw your ad — how much is a consultation?</div>
                <div className="ch-bubble ch-out">
                  Happy to help! I have Tue 4 PM or Wed 11 AM open — shall I reserve one for you?
                </div>
                <div className="ch-bubble ch-in">Tuesday, please.</div>
                <div className="ch-bubble ch-out">Reserved for Tue 4 PM. See you then! ✅</div>
              </div>
              <div className="ch-chat-foot">Booked — no staff lifted a finger.</div>
            </div>
          </div>
        </div>
      </section>

      {/* GROWTH EXPERT — the human partner who runs it */}
      <section className="ch-section">
        <div className="ch-container ch-split">
          <div className="ch-split-text">
            <span className="ch-eyebrow">Not just software</span>
            <h2 className="ch-h2">A dedicated expert — assigned to your clinic, for good.</h2>
            <p className="ch-lead">
              You are never handed a login and left to work it out. An AUMY expert is assigned to your
              clinic and stays with you — they learn how your clinic runs, set AUMY up around it, and
              operate the entire system with you.
            </p>
            <p className="ch-lead">
              You get a calmer clinic; they carry the work — a permanent partner, not another tool for
              your front desk to manage.
            </p>
          </div>
          <div className="ch-split-visual">
            <div className="ch-expert-card">
              <div className="ch-chat-head">
                <span className="ch-chat-avatar">✦</span>
                <div>
                  <div className="ch-chat-name">Your AUMY expert</div>
                  <div className="ch-chat-status">Assigned to your clinic · permanent</div>
                </div>
              </div>
              <ul className="ch-mini ch-expert-list">
                <li><Check /> Maps how your front desk and doctors actually work</li>
                <li><Check /> Sets up and runs the whole system for you</li>
                <li><Check /> Takes calls, follow-ups and paperwork off your team</li>
                <li><Check /> Reviews the numbers that matter with you, weekly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="ch-section">
        <div className="ch-container ch-center">
          <h2 className="ch-h2">Busy clinics already run on AUMY.</h2>
          <p className="ch-lead ch-center-lead">
            Hear it from a clinic owner — 37 seconds, in his own words.
          </p>
          <div className="ch-proof-grid">
            <figure className="ch-video-card">
              <video
                controls
                preload="none"
                playsInline
                poster="/videos/dr-ronak-poster.jpg"
              >
                <source src="/videos/dr-ronak-vinayaka.mp4" type="video/mp4" />
              </video>
              <figcaption>
                <strong>Dr. Ronak</strong> · Vinayaka Dental Care
                <span className="ch-result"> — fewer no-shows, recalls coming back, up 20–25% in 2–3 months</span>
              </figcaption>
            </figure>
            {testimonials.length > 0 && (
              <div className="ch-testimonials ch-testimonials-col">
                {testimonials.map((t, i) => (
                  <figure key={i} className="ch-testimonial">
                    <blockquote>{t.quote}</blockquote>
                    <figcaption>
                      <strong>{t.name}</strong> · {t.clinic}
                      {t.result ? <span className="ch-result"> — {t.result}</span> : null}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
          <div className="ch-badges">
            <span className="ch-badge">NVIDIA Inception member</span>
            <span className="ch-badge">Built by healthcare technologists</span>
            <span className="ch-badge">Your data, secured</span>
          </div>
        </div>
      </section>

      {/* GROWTH — Get Found + Meta Ads on the same connected platform. */}
      <section className="ch-section">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Growth, on the same platform</span>
          <h2 className="ch-h2">Get Found, Meta Ads, lead capture and conversion — connected to everything else.</h2>
          <p className="ch-lead ch-center-lead">
            Aumy keeps your Google profile and reviews working, and your Meta Ads get real data: Aumy
            privately tracks every ad-clicked patient through booking, so you see which campaigns bring
            patients, not just clicks. Meta only ever receives an anonymous lead signal: your patients’
            health data never leaves the clinic, exactly as Meta’s health-data rules and India’s DPDP Act
            demand.
          </p>
          <p className="ch-note">Grow your clinic. Don&rsquo;t grow the chaos.</p>
        </div>
      </section>

      {/* WHY US */}
      <section className="ch-section ch-tint">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Why us</span>
            <h2 className="ch-h2">A partner, not another tool you have to run.</h2>
          </div>
          <div className="ch-why">
            {whyUs.map((w, i) => (
              <div key={i} className="ch-why-card">
                <Check />
                <div>
                  <h3 className="ch-why-title">{w.title}</h3>
                  <p className="ch-why-body">{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALIFICATION GATE — honest fit, premium positioning */}
      <section className="ch-section">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">A fit, or not</span>
          <h2 className="ch-h2">We take on a handful of clinics at a time — and we&apos;re honest about fit.</h2>
          <p className="ch-lead ch-center-lead">
            AUMY works best for dental clinics that are already busy — from single-doctor practices to
            multi-chair centres. It is built for you if:
          </p>
          <div className="ch-fit-card">
            <ul className="ch-mini">
              <li><Check /> You run a dental clinic</li>
              <li><Check /> Your chairs are filling up and your front desk is stretched</li>
              <li><Check /> You are the founder or owner — the one who decides how the clinic runs</li>
              <li><Check /> You would rather run a calm clinic on one system than keep hiring to keep up</li>
            </ul>
          </div>
          <p className="ch-note">
            This is not built for every clinic, and that is deliberate. If it is not the right fit yet,
            we will tell you plainly rather than take you on. When it is, we should talk.
          </p>
        </div>
      </section>

      {/* OFFER — dark accent band */}
      <section className="ch-offer">
        <div className="ch-container ch-center">
          <h2 className="ch-offer-title">So your clinic can grow without growing the chaos.</h2>
          <p className="ch-offer-sub"><strong>Try Aumy free for 30 days — see the difference yourself.</strong></p>
          <p className="ch-offer-sub">
            We set AUMY up on your clinic — the AI answering calls and WhatsApp, the follow-ups, the
            digital forms — and you watch it work for 30 days alongside everything you use today. If the
            difference convinces you, we continue. If not, you walk away — no charges, no lock-in,
            no obligation to stay. Prefer to start smaller? Get a free Clinic Growth Audit first:
            where you rank on Google versus the clinics near you, and the specific gaps quietly
            costing you bookings — on your WhatsApp within 24 hours.
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to="/contact" className="ch-btn ch-btn-primary">Get started — risk-free</Link>
            <Link to="/growth-audit" className="ch-btn ch-btn-ghost ch-ghost-light">Get my free Clinic Growth Audit</Link>
          </div>
        </div>
      </section>

      {/* GET THE APP — iOS + Android */}
      <AppDownload />

      {/* FAQ */}
      <section className="ch-section">
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center">Questions clinic owners ask</h2>
          <div className="ch-faq">
            {faqs.map((f, i) => (
              <details key={i} className="ch-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA + FOUNDER */}
      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2">Grow your dental clinic. Not your administrative workload.</h2>
          <p className="ch-lead">
            Aumy coordinates the manual tasks and patient journey behind your clinic, so your team can
            spend less time chasing patients and more time caring for them.
          </p>
          <blockquote className="ch-founder">
            &ldquo;I&rsquo;ve spoken to hundreds of dental clinics. Many of the clinics interested in Aumy
            aren&rsquo;t struggling to fill their chairs. Their chairs are already full. The problem is
            everything happening around those chairs.&rdquo;
            <cite>— Jayesh, Founder, AUM AI</cite>
          </blockquote>
          <Link to="/growth-audit" className="ch-btn ch-btn-primary">Get my free Clinic Growth Audit</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
