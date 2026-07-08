import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const leaks = [
  'The phone rings while your team is with a patient. Or after hours. That caller books somewhere else.',
  'A patient no-shows. The chair sits empty. No one had time to fill it.',
  'An enquiry asks a question, gets no reply, and quietly disappears.',
  'Patients you treated once never come back — and no one reminds them.',
  'On Google, the clinic down the road shows up above you.',
  'You spend on ads every month — shown to the same people — with no idea which ones become patients.',
];

const pillars = [
  {
    title: 'More patients through the door',
    body: 'Every enquiry — WhatsApp, Instagram, a missed call, your website — answered in seconds and booked by an AI receptionist that talks like a human. Your ad spend learns who actually booked and paid, so it stops buying clicks and starts finding patients like your best ones.',
  },
  {
    title: 'The clinic patients find — and trust',
    body: 'Manage your Google Business Profile, Instagram and Facebook from one place — and create and publish content to every channel in a few clicks with our Content Studio. Climb Google above the clinic down the road and earn a steady stream of real 5-star reviews, each with a reply.',
  },
  {
    title: 'A front desk that never clocks out',
    body: 'A 24/7 AI receptionist that answers, reschedules, recovers no-shows and quietly wins back patients who have drifted away — the way your sharpest receptionist would, at any hour, without another hire.',
  },
];

const whyUs = [
  { title: 'A dedicated growth expert runs it', body: 'A growth expert is assigned to your clinic — they build the strategy, operate AUMY end-to-end, and own the outcome with you. You are never left to figure out software alone.' },
  { title: 'No rip-and-replace', body: 'It works on top of the systems you already use.' },
  { title: 'One source of truth', body: 'Your marketing, front desk, and reputation — finally connected.' },
  { title: 'Your data, secured', body: 'Encrypted, access-controlled, and private by design.' },
];

const faqs = [
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
    name: 'Vinaykia Dental Care',
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
      title: 'AUMY by AUM AI — The Growth Partner for Dental & Aesthetic Clinics',
      description:
        'AUMY is the AI growth system for dental & aesthetic clinics — capture every enquiry, book it like a human, win back patients who drift away, and make your ad spend work harder. Your growth partner, not just software.',
      canonical: 'https://aumai.co.in/',
      image: 'https://aumai.co.in/images/hero-dental.jpg',
    });
  }, []);

  return (
    <div className="ch-home">
      {/* LIVE DEMO — text the AI receptionist yourself */}
      <section className="ch-trydemo">
        <div className="ch-container ch-trydemo-inner">
          <div className="ch-trydemo-text">
            <span className="ch-trydemo-eyebrow">See it for yourself — live</span>
            <h2 className="ch-trydemo-title">Text our AI receptionist and watch it book you in.</h2>
            <p className="ch-trydemo-sub">
              Message our demo dental clinic on WhatsApp right now and see exactly how it answers, books,
              reschedules and cancels — the way it would for your clinic, 24/7. No sign-up. Just say hello.
            </p>
          </div>
          <a
            className="ch-trydemo-btn"
            href="https://wa.me/918007189868?text=Hi!%20I%20saw%20your%20site%20%E2%80%94%20I%27d%20like%20to%20see%20how%20your%20AI%20receptionist%20works."
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Message +91 80071 89868
          </a>
        </div>
      </section>

      {/* HERO */}
      <section className="ch-hero">
        <div className="ch-container ch-hero-grid">
          <div className="ch-hero-text">
            <span className="ch-eyebrow">For established dental &amp; aesthetic clinics</span>
            <h1 className="ch-hero-title">
              You run a premium clinic. Your growth should feel like&nbsp;it.
            </h1>
            <p className="ch-hero-sub">
              AUMY is the growth system we run for dental and aesthetic clinics. It brings more patients
              through your door, makes yours the clinic they find and trust online, and gives you a front
              desk that never clocks out — all connected, all automatic, and built to compound month
              after&nbsp;month.
            </p>
            <div className="ch-hero-cta">
              <Link to="/growth-audit" className="ch-btn ch-btn-primary">
                Get my free Clinic Growth Audit
              </Link>
              <a href="#how-it-works" className="ch-btn ch-btn-ghost">
                See how it works
              </a>
            </div>
            <p className="ch-hero-trust">
              Built for dental &amp; aesthetic clinics · NVIDIA Inception member · works with your
              existing systems
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

      {/* PROBLEM */}
      <section className="ch-section">
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2">You are working harder than ever. So why does growth feel stuck?</h2>
          <p className="ch-lead">
            It is rarely your dentistry. It is the quiet gaps between your marketing and your front
            desk — where patients and money slip away, one at a time, in the places no report ever
            shows you:
          </p>
          <ul className="ch-leaks">
            {leaks.map((leak, i) => (
              <li key={i}>
                <span className="ch-leak-dot" />
                {leak}
              </li>
            ))}
          </ul>
          <p className="ch-note">Sound familiar? None of it is your fault. It is just more than any front desk can hold.</p>
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
            <span className="ch-eyebrow">What you actually get</span>
            <h2 className="ch-h2">Three outcomes, one connected system — tuned to your clinic.</h2>
            <p className="ch-lead ch-center-lead">
              Most clinics stitch together four tools that never talk to each other. We bring them onto
              one platform — AUMY — and point it at your clinic&apos;s specific gaps. Here is what that
              delivers.
            </p>
          </div>
          <div className="ch-pillars ch-pillars-3">
            {pillars.map((p, i) => (
              <div key={i} className="ch-pillar">
                <span className="ch-pillar-num">{i + 1}</span>
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
              <li><Check /> Confirms, reschedules and cancels — so a would-be no-show reopens the slot</li>
              <li><Check /> Recovers no-shows, revives cold leads, reactivates dormant patients</li>
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
            AUMY works best for established clinics with real patient volume and the ambition to compound
            it. It is built for you if:
          </p>
          <div className="ch-fit-card">
            <ul className="ch-mini">
              <li><Check /> You are a dental, dermatology or aesthetics clinic</li>
              <li><Check /> You collect upwards of ₹5 lakh a month</li>
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
          <h2 className="ch-offer-title">See exactly where your clinic is leaking — free.</h2>
          <p className="ch-offer-sub">
            Get a free Clinic Growth Audit, prepared for your clinic: where you rank on Google versus
            the clinics near you, how visible you are to new patients, and the specific gaps quietly
            costing you bookings — on your WhatsApp within 24 hours. No obligation. Just a clear
            picture of what is on the table.
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to="/growth-audit" className="ch-btn ch-btn-primary">Get my free Clinic Growth Audit</Link>
            <Link to="/contact" className="ch-btn ch-btn-ghost ch-ghost-light">Book a free growth strategy call</Link>
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
