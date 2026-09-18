import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';

// Theme page (owner 2026-09-18): "AI-powered patient journey & patient
// engagement" — everything before, around and after treatment. Positioning
// 2026-09-15 applies: context, not broadcasts; never a revenue promise; "care
// gaps" is the word. Crawler copy lives in scripts/prerender.js — keep the two
// in step.

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const STAGES = [
  ['Before the visit', 'Confirmations and reminders by WhatsApp and call, pre-treatment instructions in the doctor’s words, and intake done before the patient walks in.'],
  ['Around the treatment', 'Treatment-specific after-care, day by day — and when a patient messages after treatment, Aumy understands which treatment, which doctor and what was said last time.'],
  ['Doctor check-ins', 'A check-in from the doctor at the right moment. Pain, worry or a question surfaces as a signal your team sees — not as a message nobody read.'],
  ['Care gaps', 'Recalls, cleanings and next sittings followed up on time — and the follow-up stops the moment the patient books. Every care gap is known; none is chased twice.'],
  ['Treatment plans', 'Advised-but-not-started treatment followed up until the patient decides. The moment they book, the follow-up ends.'],
  ['Reactivation', 'Patients who drifted away invited back in the doctor’s own words, with opt-outs honoured instantly. One patient. One journey. One connected system.'],
];

// "Think of Aumy as Jarvis for your dental clinic." — the owner's analogy, in
// the patient-journey frame.
const KNOWS = [
  { when: 'They message after treatment', aumy: 'Aumy understands the treatment context.' },
  { when: 'They have an overdue care gap', aumy: 'Aumy knows it — and knows when they last came in.' },
  { when: 'They book', aumy: 'Every nurture, check-in and care-gap follow-up they were in stops.' },
  { when: 'They don’t show', aumy: 'Aumy knows what happened and follows up to rebook.' },
  { when: 'They say stop', aumy: 'Every journey stops. Instantly. On every channel.' },
];

const FAQS = [
  { q: 'Isn’t this just automated spam?', a: 'No. Every message is the one relevant to that patient at that moment: their reminder when the visit is near, their after-care on the day of treatment, their care-gap follow-up when it is due. When a patient books, replies or opts out, the journey they are in stops — nobody is chased twice.' },
  { q: 'Does the doctor have to write the messages?', a: 'The doctors define the after-care and the tone once, in their own words, during setup. Aumy then sends the right message to the right patient in the right context.' },
  { q: 'Does it work with the software we already use?', a: 'Yes. Aumy syncs with your practice management software, so the appointments, treatments and patients it acts on are the ones you already have. No migration is needed to start.' },
  { q: 'Can patients opt out?', a: 'Instantly, with one word, on every channel — and the opt-out is honoured across every journey, not just the one that sent the last message.' },
];

const AIPatientEngagementPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'AI-Powered Patient Journey & Patient Engagement for Dental Clinics | Aumy',
      description:
        'Aumy runs the patient journey of a dental clinic with AI: reminders, pre-treatment instructions, treatment-specific after-care, doctor check-ins, care-gap follow-ups, treatment-plan follow-ups and reactivation — every message in the context of that patient’s treatment, on WhatsApp and by call.',
      canonical: 'https://aumai.co.in/ai-patient-engagement',
    });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 24 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">AI-powered patient journey &amp; engagement</span>
          <h1 className="ch-hero-title">An AI-powered patient journey that keeps every patient engaged &mdash; before, during and after treatment.</h1>
          <p className="ch-hero-sub">
            Aumy knows where each patient is in their journey and sends the right message at the right
            moment &mdash; on WhatsApp and by call &mdash; so nobody is forgotten, and nobody is spammed.
          </p>
          <div style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/demos" className="ch-btn ch-btn-primary">Watch the whole patient journey, live</Link>
            <Link to="/contact" className="ch-btn ch-btn-ghost">Get started &mdash; risk-free</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 0 8px' }}>
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>Patient engagement with context, not broadcasts</h2>
          <p style={{ color: '#5b6784', maxWidth: 680, margin: '8px auto 0' }}>
            Reminder tools send the same message to everyone. Aumy sends each patient the message that fits
            where they are: the reminder for their visit, the after-care for their treatment, the doctor&rsquo;s
            check-in when it is due, the care-gap follow-up when it is overdue &mdash; and it stops the moment
            the patient books, replies or asks it to. Convert &rarr; Care &rarr; Retain &rarr; Reactivate, coordinated
            by one system that knows the whole journey.
          </p>
        </div>
      </section>

      <section style={{ padding: '28px 0 40px' }}>
        <div className="ch-container" style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))' }}>
          {STAGES.map(([title, body]) => (
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
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>Everything knows what&rsquo;s happening</h2>
          <div className="ch-closetable">
            {KNOWS.map((row) => (
              <div key={row.when} className="ch-close-row">
                <span className="ch-close-leak">{row.when}</span>
                <span className="ch-close-arrow" aria-hidden="true">&rarr;</span>
                <span className="ch-close-aumy">{row.aumy}</span>
              </div>
            ))}
          </div>
          <p style={{ color: '#5b6784', maxWidth: 680, margin: '16px auto 0' }}>
            The patient journey is one half of Aumy. The other half is the clinic&rsquo;s day-to-day
            operations &mdash; calls, WhatsApp, bookings, intake, consent, invoices and tasks &mdash; run by
            the same system, with the same patient context.
          </p>
          <div style={{ marginTop: 16 }}>
            <Link to="/ai-dental-clinic-operations" className="ch-btn ch-btn-ghost">See AI-powered clinic operations</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '8px 0 64px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>Patient journey questions, answered</h2>
          {FAQS.map((f) => (
            <div key={f.q} className="ch-why-card" style={{ display: 'block', padding: '18px 22px', margin: '12px 0' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem' }}>{f.q}</h3>
              <p style={{ margin: 0, color: '#5b6784' }}>{f.a}</p>
            </div>
          ))}
          <div className="ch-center" style={{ textAlign: 'center', marginTop: 26 }}>
            <Link to="/pricing" className="ch-btn ch-btn-primary">See pricing &mdash; everything included</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIPatientEngagementPage;
