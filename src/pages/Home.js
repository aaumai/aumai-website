import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import LeakCheck from '../components/LeakCheck';
import DemoPlaylist from '../components/DemoPlaylist';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

// The five leaks — one problem (revenue leakage), told as the places it
// happens. Deliberately excludes visibility/SEO and ads: those are the
// expansion story lower on the page, not a competing story up here.
const leaks = [
  {
    title: 'Missed calls',
    body: 'Someone calls while your front desk is with a patient — or after hours. That caller books at the next clinic on Google.',
  },
  {
    title: 'Unanswered messages',
    body: 'WhatsApp and Instagram enquiries sit unread for hours. Patients read the silence as "they don’t need me."',
  },
  {
    title: 'Unfollowed leads',
    body: 'Someone asks about a root canal or aligners, gets one reply, and nobody ever follows up. They were ready to book.',
  },
  {
    title: 'No-shows',
    body: 'A ₹10,000 appointment quietly disappears from the schedule — and the chair sits empty because no one had time to refill it.',
  },
  {
    title: 'Dormant patients',
    body: 'Patients who already know and trust you — crowns, aligners, cleanings — never come back, because nobody reminds them.',
  },
];

// Leak → what AUMY does about it. The whole product, one glance.
const leakCloses = [
  { leak: 'A call goes unanswered', aumy: 'AUMY answers — in seconds, 24/7' },
  { leak: 'A new enquiry comes in', aumy: 'AUMY replies and holds the conversation' },
  { leak: 'A lead doesn’t book', aumy: 'AUMY follows up until they do (or say no)' },
  { leak: 'A patient no-shows', aumy: 'AUMY recovers and refills the slot' },
  { leak: 'A recall comes due', aumy: 'AUMY reminds — on time, every time' },
  { leak: 'A patient goes quiet', aumy: 'AUMY reactivates them, personally' },
  { leak: 'A treatment plan stalls', aumy: 'AUMY follows up until it books' },
];

// The five stages of the patient journey — the product architecture
// (Convert → Care → Retain → Reactivate → Grow). Every capability on the
// page is machinery underneath one of these five.
const pillars = [
  {
    stage: 'Convert',
    title: 'Turn enquiries into booked patients',
    body: 'Every enquiry — WhatsApp, Instagram, a missed call, your website — answered in seconds, 24/7, across chat and phone: inbound calls taken, outbound follow-up calls made — every call recorded and quality-checked, so no enquiry is ever fumbled on the phone. Leads are followed up until they book (or say no), and no-shows are recovered and refilled.',
  },
  {
    stage: 'Care',
    title: 'Look after patients beyond the chair',
    body: 'Care before and after every visit. The moment an appointment is booked, AUMY sends doctor-approved pre-visit instructions and a smart intake form — so the patient arrives prepared and the doctor sees allergies and red flags before they sit down. After the visit, Treatment Care Plans take over: day-1 recovery check, care tips, the one-month follow-up — delivered consistently, flagging any reply that needs the clinic.',
  },
  {
    stage: 'Retain',
    title: 'Bring patients back for ongoing care',
    body: 'Cleaning recalls, periodic check-ups and treatment maintenance — messaged and called personally and on time, every time. Recall calls are recorded and quality-checked so your team keeps getting better, and the patients you already have keep coming back.',
  },
  {
    stage: 'Reactivate',
    title: 'Win back patients who drifted away',
    body: 'Dormant patients, overdue recalls and stalled treatment plans are re-engaged automatically — revenue you already paid to acquire, recovered instead of written off.',
  },
  {
    stage: 'Grow',
    title: 'Grow your reputation and reach',
    body: 'Happy patients become Google reviews — asked at the right moment, and every review answered in your voice. Your profile climbs, your Instagram and YouTube presence compounds, and the next patient finds you first. And you see all of it on one operations dashboard — how every part of the clinic is performing, where revenue is leaking, and what to fix today — so you run the practice with real efficiency.',
  },
];

const whyUs = [
  { title: 'A dedicated growth expert runs it', body: 'A growth expert is assigned to your clinic — they build the strategy, operate AUMY end-to-end, and own the outcome with you. You are never left to figure out software alone.' },
  { title: 'No rip-and-replace', body: 'It works on top of the systems you already use.' },
  { title: 'One source of truth', body: 'Your marketing, front desk, and reputation — finally connected.' },
  { title: 'Your data, secured', body: 'Encrypted, access-controlled, and private by design.' },
];

const faqs = [
  { q: 'How does the 60-day money-back guarantee work?', a: 'We set AUMY up on your clinic and it goes to work — real enquiries answered, real bookings made, real recalls filled. If it doesn\u2019t meet your expectations in the first 60 days, you get your money back. No lock-in, and your data stays yours.' },
  { q: 'Do I have to replace my current software?', a: 'No. AUMY works alongside what you already use — it adds the growth and engagement layer on top.' },
  { q: 'Is my patient data safe?', a: 'Yes — encrypted in transit and at rest, role-based access, and private by design.' },
  { q: 'How long does it take to get started?', a: 'Most clinics are live quickly — and most of that is simple setup we handle with you.' },
  { q: 'Will my staff have to learn something complicated?', a: 'No. AUMY runs in the background; your team does less, not more.' },
  { q: 'Is this a product or a service?', a: 'Both — you get a proven system (AUMY), run and tailored for you by a partner. You are not buying software to figure out alone; you are getting a growth partner.' },
  { q: 'Who actually runs all this?', a: 'A dedicated growth expert is assigned to your clinic on a permanent basis. They strategise, set up and operate the entire system on your behalf, and review results with you every week — you are never left to run software yourself.' },
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
  {
    quote:
      `AUMY quietly went to work on the patients we already had — waking up our dormant list, sending recall reminders right on time, and following up after every appointment. Patients feel genuinely looked after, our Google reviews keep climbing, and we’re earning more from the same chairs.`,
    name: 'Vinayaka Derma',
    clinic: 'Dermatology & aesthetics',
    result: '4.9★ Google rating',
  },
];

const Home = () => {
  useEffect(() => {
    setPageSeo({
      title: 'AUMY — AI Receptionist & Practice Growth Platform for Dental Clinics',
      description:
        'AUMY — the Next-Gen Dental Platform: a 24/7 AI receptionist for dental clinics, patient follow-up automation, recalls, reactivation and Google review growth. Works alongside your dental practice management software — convert every enquiry, retain every patient.',
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
            <span className="ch-eyebrow">The Next-Gen Dental Platform</span>
            <h1 className="ch-hero-title">
              Your software keeps records. <span className="ch-hero-accent">AUMY grows your practice.</span>
            </h1>
            <p className="ch-hero-sub">
              <strong>AI-powered patient engagement and practice growth.</strong> AUMY converts your
              enquiries, cares for patients after treatment, brings them back on time, wins back the
              ones who drifted — and grows your reviews, reach and revenue. Automatically, even while
              you&nbsp;sleep.
            </p>
            <p className="ch-hero-chain">CONVERT → CARE → RETAIN → REACTIVATE → GROW</p>
            <div className="ch-hero-cta">
              <Link to="/contact" className="ch-btn ch-btn-primary">
                Get started — risk-free
              </Link>
              <Link to="/growth-audit" className="ch-btn ch-btn-ghost">
                Get my free Clinic Growth Audit
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

      {/* LEAK CHECK — the hook.
          Placed immediately below the hero on purpose: it is the one thing on
          this page that gives a visitor a number about their OWN clinic before
          we ask them for anything. It has to be the first thing after the fold,
          not a link they may never scroll to. Same component and same
          arithmetic as /leak-calculator. */}
      <section className="ch-section ch-tint" id="leak-check">
        <div className="ch-container">
          <LeakCheck market="in" headingLevel="h2" />
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
              <li><strong>Come back in 3 months</strong> for your recall reminder. Ghost us for 6, and AUMY will try to win you back 🙂</li>
            </ol>
            <p style={{ marginTop: 18, textAlign: 'center', color: '#5b6784' }}>
              Every message you receive is the same system your patients would experience — Convert, Care, Retain, Reactivate, in real time.
            </p>
          </div>
        </div>
      </section>


      <DemoPlaylist />

      {/* PROBLEM — one enemy: revenue leaking between marketing and the front
          desk. Five named leaks, nothing else competing for attention here. */}
      <section className="ch-section">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">The enemy</span>
            <h2 className="ch-h2">Where is your clinic leaking revenue?</h2>
            <p className="ch-lead ch-center-lead">
              It happens in the quiet gaps between your marketing and your front desk — one patient at a
              time, in the places no report ever shows you.
            </p>
          </div>
          <div className="ch-leakgrid">
            {leaks.map((leak, i) => (
              <div key={i} className="ch-leak-card">
                <h3 className="ch-leak-title">{leak.title}</h3>
                <p className="ch-leak-body">{leak.body}</p>
              </div>
            ))}
          </div>
          <p className="ch-note ch-center">
            Sound familiar? None of it is your fault. It is just more than any front desk can hold.
          </p>
        </div>
      </section>

      {/* THE ANSWER — leak → AUMY, the whole product in one glance. */}
      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow">
          <div className="ch-head">
            <span className="ch-eyebrow">The answer</span>
            <h2 className="ch-h2 ch-center">AUMY closes every leak.</h2>
          </div>
          <div className="ch-closetable">
            {leakCloses.map((row, i) => (
              <div key={i} className="ch-close-row">
                <span className="ch-close-leak">{row.leak}</span>
                <span className="ch-close-arrow" aria-hidden="true">→</span>
                <span className="ch-close-aumy">{row.aumy}</span>
              </div>
            ))}
          </div>
          <p className="ch-note ch-center">
            Every leak points to the same destination: a booked appointment and a filled chair.
          </p>
        </div>
      </section>

      {/* IMPLICATION */}
      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2">The most expensive patients are the ones you never knew you lost.</h2>
          <p className="ch-lead">
            A no-show is one empty slot. But a patient who drifts away is every visit, every treatment,
            and every referral you will never see — for years.
          </p>
          <p className="ch-lead">
            It never shows on a report, because the patient who did not come back never raises an
            invoice. Add it up across a year, and it is the biggest number in your practice: the one
            you cannot see.
          </p>
          <Link to="/leak-calculator" className="ch-btn ch-btn-ghost">
            Do the math for your clinic — 60-second leak check
          </Link>
        </div>
      </section>

      {/* SOLUTION — connected system */}
      <section className="ch-section" id="how-it-works">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">The patient journey</span>
            <h2 className="ch-h2">One system. The entire patient journey.</h2>
            <p className="ch-lead ch-center-lead">
              From first enquiry to ongoing care, AUMY manages the patient relationship beyond the
              appointment — four stages, one connected engine.
            </p>
          </div>
          <div className="ch-pillars">
            {pillars.map((p, i) => (
              <div key={i} className="ch-pillar">
                <span className="ch-eyebrow">{p.stage}</span>
                <h3 className="ch-pillar-title">{p.title}</h3>
                <p className="ch-pillar-body">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="ch-note ch-center">
            None of this is a one-off push. Every patient captured, review earned and slot saved feeds
            the next — organic growth that builds on itself, month after month.
          </p>
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
              <li><Check /> Sends recall reminders on time and reactivates patients who drifted away</li>
              <li><Check /> Follows up every accepted treatment plan until the patient books it</li>
              <li><Check /> Every booking and rupee attributed — so you see exactly what is working</li>
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
            <h2 className="ch-h2">A dedicated growth expert — assigned to your clinic, for good.</h2>
            <p className="ch-lead">
              You are never handed a login and left to work it out. A growth expert is assigned to your
              clinic and stays with you — they learn how your practice runs, build the strategy, and
              operate the entire system on your behalf.
            </p>
            <p className="ch-lead">
              You get the outcome; they carry the work — a permanent partner who owns your growth
              alongside you, not another tool for your front desk to manage.
            </p>
          </div>
          <div className="ch-split-visual">
            <div className="ch-expert-card">
              <div className="ch-chat-head">
                <span className="ch-chat-avatar">✦</span>
                <div>
                  <div className="ch-chat-name">Your growth expert</div>
                  <div className="ch-chat-status">Assigned to your clinic · permanent</div>
                </div>
              </div>
              <ul className="ch-mini ch-expert-list">
                <li><Check /> Builds your growth plan around your goals</li>
                <li><Check /> Sets up and runs the whole system for you</li>
                <li><Check /> Wins back dormant patients and fills the calendar</li>
                <li><Check /> Reviews the numbers that matter with you, weekly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="ch-section">
        <div className="ch-container ch-center">
          <h2 className="ch-h2">Clinics are already growing with us.</h2>
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

      {/* EXPANSION — deliberately BELOW the core recovery story. Visibility and
          smarter ads are what AUMY does once the leaks are closed, not a
          competing reason to buy. */}
      <section className="ch-section">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Once the leaks are closed</span>
          <h2 className="ch-h2">Then AUMY grows what stays.</h2>
          <p className="ch-lead ch-center-lead">
            With every call answered and every patient followed up, growth compounds. AUMY keeps your
            Google profile, reviews and social presence working — every recovered patient becomes a
            5-star review, and every review wins the next patient. And your ads get a teacher: AUMY
            privately tracks every ad-clicked patient through booking and payment — which ad, which
            treatment, what revenue — and shows you exactly which campaigns produce paying patients,
            not just clicks. Meta only ever receives an anonymous lead signal: your patients’ health
            data never leaves the clinic, exactly as Meta’s health-data rules and India’s DPDP Act demand.
          </p>
          <p className="ch-note">
            That is the order that works: close the leaks first, then pour more in the top.
          </p>
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
            AUMY works best for clinics serious about growth — from single-doctor practices to
            multi-chair centres. It is built for you if:
          </p>
          <div className="ch-fit-card">
            <ul className="ch-mini">
              <li><Check /> You run a dental clinic</li>
              <li><Check /> You are serious about growing — not just curious about AI</li>
              <li><Check /> You are the founder or owner — the one who makes the growth calls</li>
              <li><Check /> You would rather grow with a system than by hiring more front-desk staff</li>
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
          <h2 className="ch-offer-title">Try AUMY free for 30 days — see the difference yourself.</h2>
          <p className="ch-offer-sub">
            We set AUMY up on your clinic — the AI receptionist answering and booking, the follow-ups,
            the reviews — and you watch it work for 30 days alongside everything you use today. If the
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
          <h2 className="ch-h2">A clear look at what you are leaving on the table.</h2>
          <blockquote className="ch-founder">
            &ldquo;I built AUMY because good clinics lose patients they have already earned — for no
            reason other than no one had time to follow up. If that is you, let me show you exactly
            where. Free.&rdquo;
            <cite>— Jayesh, Founder, AUM AI</cite>
          </blockquote>
          <Link to="/growth-audit" className="ch-btn ch-btn-primary">Get my free Clinic Growth Audit</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
