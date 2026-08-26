import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const CAPABILITIES = [
  ['Answers every WhatsApp enquiry in seconds', 'Treatment questions, timings, pricing, directions — answered instantly in the patient’s own language, any hour of the day.'],
  ['Books appointments end-to-end', 'Checks real availability, offers slots, confirms the booking and sends the reminder — no human in the loop unless you want one.'],
  ['Recovers missed calls', 'A call your front desk couldn’t pick up gets an instant WhatsApp follow-up, so the patient books with you instead of the next clinic on Google.'],
  ['Knows your clinic, not a script', 'Trained on your treatments, your doctors, your pricing and your policies — configured in your own words during onboarding.'],
  ['Follows up until patients decide', 'Enquiries that go quiet get polite, well-timed nudges. Treatment plans get chased. Nothing falls through the cracks.'],
  ['Hands over to humans instantly', 'Your staff can take over any conversation with one tap; the AI steps back the moment a human joins and stays back while they chat.'],
];

const FAQS = [
  {
    q: 'Will an AI receptionist replace my front-desk staff?',
    a: 'No — it covers what staff physically cannot: nights, Sundays, lunch rushes and the second call that comes in while they’re on the first. Your team keeps full control and can join any conversation at any time.',
  },
  {
    q: 'Will patients realise they’re talking to AI — and mind?',
    a: 'Patients care about getting a helpful answer at 11 pm, not about who typed it. Aumy replies naturally in the patient’s own language and hands anything sensitive to your team immediately.',
  },
  {
    q: 'Which languages does it speak?',
    a: 'It replies in the language the patient writes in — English, Hindi, Marathi and more — switching automatically mid-conversation if the patient does.',
  },
  {
    q: 'What happens when the AI doesn’t know an answer?',
    a: 'It never guesses about clinical matters. Unknown or sensitive questions are handed to your staff with full context, and the patient is told a team member will respond shortly.',
  },
  {
    q: 'How long does setup take?',
    a: 'Onboarding is done for you — WhatsApp connection, your treatments and FAQs configured in your doctors’ own words. Most clinics are live within a week.',
  },
];

const AIReceptionistPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'AI Receptionist for Dental Clinics — 24/7 Calls & WhatsApp | AUMY',
      description:
        'AUMY’s AI receptionist answers every call and WhatsApp enquiry for your dental clinic 24/7 — in the patient’s own language — and converts enquiries into booked appointments. Works alongside your existing software.',
      canonical: 'https://aumai.co.in/ai-receptionist',
    });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 24 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">AI Receptionist</span>
          <h1 className="ch-hero-title">An AI receptionist that never misses a patient</h1>
          <p className="ch-hero-sub">
            Every call and WhatsApp message answered in seconds — nights, Sundays, lunch rush —
            in your patient&rsquo;s own language, and converted into a booked appointment.
            That&rsquo;s the Convert stage of the AUMY patient journey, running 24/7.
          </p>
          <div style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/demos" className="ch-btn ch-btn-primary">Watch it handle a real clinic&rsquo;s WhatsApp</Link>
            <Link to="/growth-audit" className="ch-btn ch-btn-ghost">Get a free Growth Audit</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 0 8px' }}>
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>The maths your front desk already knows</h2>
          <p style={{ color: '#5b6784', maxWidth: 640, margin: '8px auto 0' }}>
            A busy clinic misses 20&ndash;30% of its calls, and most enquiries after 8 pm are never answered at all.
            Every missed enquiry is a patient who books with the next clinic on Google. An implant enquiry lost
            this way isn&rsquo;t a missed call — it&rsquo;s lakhs of treatment revenue walking to a competitor.
          </p>
        </div>
      </section>

      <section style={{ padding: '28px 0 40px' }}>
        <div className="ch-container" style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))' }}>
          {CAPABILITIES.map(([title, body]) => (
            <div key={title} className="ch-why-card" style={{ display: 'block', padding: '20px 22px' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Check />
                <div>
                  <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem' }}>{title}</h3>
                  <p style={{ margin: 0, color: '#5b6784' }}>{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '8px 0 40px' }}>
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>Converting is only stage one</h2>
          <p style={{ color: '#5b6784', maxWidth: 640, margin: '8px auto 0' }}>
            The receptionist is the front door of the full AUMY journey — after it Converts an enquiry,
            AUMY Cares for the patient after treatment, Retains them with automated recalls, Reactivates
            them if they drift away, and Grows your Google reviews. One platform, five stages,
            alongside the practice software you already use.
          </p>
          <div style={{ marginTop: 16 }}>
            <Link to="/whatsapp-automation-for-clinics" className="ch-btn ch-btn-ghost">See the WhatsApp automation behind it</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '8px 0 64px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>AI receptionist questions, answered</h2>
          {FAQS.map((f) => (
            <div key={f.q} className="ch-why-card" style={{ display: 'block', padding: '18px 22px', margin: '12px 0' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem' }}>{f.q}</h3>
              <p style={{ margin: 0, color: '#5b6784' }}>{f.a}</p>
            </div>
          ))}
          <div className="ch-center" style={{ textAlign: 'center', marginTop: 26 }}>
            <Link to="/pricing" className="ch-btn ch-btn-primary">See pricing — everything included</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIReceptionistPage;
