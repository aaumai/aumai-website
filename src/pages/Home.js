import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const leaks = [
  'You spend on ads every month — shown to the same people — with no idea which ones become patients.',
  'The phone rings while your team is with a patient. Or after hours. That caller books somewhere else.',
  'A patient no-shows. The chair sits empty. No one had time to fill it.',
  'An enquiry asks a question, gets no reply, and quietly disappears.',
  'Patients you treated once never come back — and no one reminds them.',
  'On Google, the clinic down the road shows up above you.',
];

const pillars = [
  {
    title: 'Capture & book',
    body: 'Every enquiry — WhatsApp, website, Instagram, a phone call — answered instantly by an AI receptionist that talks like a human and actually books the appointment. 24/7.',
  },
  {
    title: 'Nurture & retain',
    body: 'No-shows recovered, cold leads revived, recalls kept, dormant patients won back — automatically, in a real conversation, not a dead-end text.',
  },
  {
    title: 'Smarter ads',
    body: 'We tell your ads who actually booked and paid, so Meta stops wasting budget on clicks and starts finding patients like your best ones.',
  },
  {
    title: 'Get found',
    body: 'More 5-star reviews from real patients, a reply to every one, and a Google profile that climbs — so new patients find you first.',
  },
];

const whyUs = [
  { title: 'We run it for you', body: 'You do not buy software and figure it out — we tailor AUMY to your clinic and operate it alongside you.' },
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
      image: 'https://aumai.co.in/images/clinic-ambiance.jpg',
    });
  }, []);

  return (
    <div className="ch-home">
      {/* HERO */}
      <section className="ch-hero">
        <div className="ch-container ch-hero-grid">
          <div className="ch-hero-text">
            <span className="ch-eyebrow">For dental &amp; aesthetic clinics</span>
            <h1 className="ch-hero-title">
              Your clinic is leaking patients — and revenue you never see.
            </h1>
            <p className="ch-hero-sub">
              We are the growth partner for dental &amp; aesthetic clinics. Powered by AUMY — our AI
              growth system, tailored to your clinic — we capture every enquiry, book it like a human,
              win back the patients who drift away, and make your ad spend work harder. All connected,
              all automatic.
            </p>
            <div className="ch-hero-cta">
              <Link to="/contact" className="ch-btn ch-btn-primary">
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
                src="/images/hero-clinic.webp"
                alt="A friendly dentist smiling in a bright, calm, modern dental clinic"
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
        </div>
      </section>

      {/* SOLUTION — connected system */}
      <section className="ch-section" id="how-it-works">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">The connected system</span>
            <h2 className="ch-h2">One connected system, run by a partner who tailors it to you.</h2>
            <p className="ch-lead ch-center-lead">
              Most clinics bolt together four tools that do not talk to each other. We bring them onto
              one platform — AUMY — and tune it to your clinic&apos;s specific leaks. That connection
              is what changes everything.
            </p>
          </div>
          <div className="ch-pillars">
            {pillars.map((p, i) => (
              <div key={i} className="ch-pillar">
                <span className="ch-pillar-num">{i + 1}</span>
                <h3 className="ch-pillar-title">{p.title}</h3>
                <p className="ch-pillar-body">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="ch-note ch-center">
            Alone, each plugs a leak. Together, they compound — every part making the others work
            better. That is the magic.
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

      {/* PROOF */}
      <section className="ch-section">
        <div className="ch-container ch-center">
          <h2 className="ch-h2">Clinics are already growing with us.</h2>
          {testimonials.length > 0 && (
            <div className="ch-testimonials">
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

      {/* OFFER — dark accent band */}
      <section className="ch-offer">
        <div className="ch-container ch-center">
          <h2 className="ch-offer-title">See exactly where your clinic is leaking — free.</h2>
          <p className="ch-offer-sub">
            In minutes, get a free Clinic Growth Audit: where you rank on Google versus the clinics near
            you, how visible you are to new patients, and the specific gaps quietly costing you bookings.
            No obligation. No sales pitch. Just a clear picture of what is on the table.
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to="/contact" className="ch-btn ch-btn-primary">Get my free Clinic Growth Audit</Link>
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
          <h2 className="ch-h2">This is not a sales pitch. It is a look at what you are leaving on the table.</h2>
          <blockquote className="ch-founder">
            &ldquo;I built AUMY because good clinics lose patients they have already earned — for no
            reason other than no one had time to follow up. If that is you, let me show you exactly
            where. Free.&rdquo;
            <cite>— Jayesh, Founder, AUM AI</cite>
          </blockquote>
          <Link to="/contact" className="ch-btn ch-btn-primary">Get my free Clinic Growth Audit</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
