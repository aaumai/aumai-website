import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';

// Theme page (owner 2026-09-18): "AI-powered dental clinic operations" — the
// work AROUND the chairs. Positioning 2026-09-15 applies throughout: a
// coordination problem, not an acquisition problem; never a revenue promise;
// "care gaps" is the word. Crawler copy lives in scripts/prerender.js — keep
// the two in step.

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const AREAS = [
  ['Every call answered', 'Aumy’s AI voice agent answers the clinic phone, knows who is calling, books or reschedules against the doctor’s real availability, and hands the call to your team when it should. No call goes unanswered because everyone was busy.'],
  ['Every WhatsApp enquiry answered', 'Treatment questions, timings, directions and bookings answered in seconds on the official WhatsApp Business API, in the patient’s own language. Your team can take over any conversation with one tap.'],
  ['Appointment orchestration', 'Confirmations, reminders by message and call, rescheduling, cancellations, waitlists for earlier slots and no-show follow-up — handled in the conversation and written back to your calendar.'],
  ['Digital registration, intake and consent', 'Registration and intake forms completed on the patient’s phone before they arrive; consent signed on a phone or the clinic iPad; X-rays, documents and invoices on the record.'],
  ['Clinic tasks, in one inbox', 'Everything that needs a human today — a callback, a patient who wants the doctor, a form to check — lands in one team inbox with the full context, instead of in somebody’s head.'],
  ['Full dental software included — or keep yours', 'Run the whole clinic on Aumy’s dental PMS, or keep the software you use today: Aumy syncs with it from day one, so nothing is retyped and nobody is retrained.'],
];

const FAQS = [
  { q: 'Do I have to replace my practice management software?', a: 'No. Aumy runs on top of whatever you use today and keeps your data in sync with it. If you want one connected platform, Aumy includes a complete dental PMS you can move onto whenever you choose.' },
  { q: 'Will my front desk have to change how they work?', a: 'They do less of the chasing, not more. Calls and messages are answered whether or not someone is free, confirmations and reminders go out on their own, forms arrive filled in, and the team inbox shows what actually needs a person.' },
  { q: 'What happens when the AI cannot handle something?', a: 'It hands over — to a person, with the context. Clinical questions, upset patients and anything sensitive go to your team immediately, and the AI steps back the moment a human joins a conversation.' },
  { q: 'How is it set up?', a: 'A dedicated Aumy expert learns how your clinic runs — your doctors, treatments, timings and policies — sets Aumy up around it, and reviews it with you every week. You are not handed a login and left alone.' },
];

const AIDentalClinicOperationsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'AI-Powered Dental Clinic Operations — Calls, WhatsApp, Appointments, Intake & Tasks | Aumy',
      description:
        'Aumy runs the operations of a growing dental clinic with AI: every call and WhatsApp answered, appointments booked and confirmed, no-shows followed up, digital registration, intake and consent, invoices and clinic tasks — one connected platform, so the workload does not grow with the clinic.',
      canonical: 'https://aumai.co.in/ai-dental-clinic-operations',
    });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 24 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">AI-powered dental clinic operations</span>
          <h1 className="ch-hero-title">AI-powered dental clinic operations &mdash; the work around your chairs, handled.</h1>
          <p className="ch-hero-sub">
            Calls, WhatsApp, appointments, confirmations, rescheduling, no-shows, registration, intake,
            consent, X-rays, invoices and the tasks in between &mdash; coordinated by Aumy, the operating
            system for a growing dental clinic.
          </p>
          <div style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/revenue-generator" className="ch-btn ch-btn-primary">See How Aumy Works</Link>
            <Link to="/contact" className="ch-btn ch-btn-ghost">Get started &mdash; risk-free</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 0 8px' }}>
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>Growth creates chaos. Aumy coordinates it.</h2>
          <p style={{ color: '#5b6784', maxWidth: 680, margin: '8px auto 0' }}>
            A successful dental clinic doesn&rsquo;t necessarily have a patient-acquisition problem. It often
            has a coordination problem. When chairs are full, every new patient brings more calls, more
            WhatsApp messages, more confirmations, more rescheduling, more paperwork &mdash; and more things
            falling through the cracks. Aumy takes that work off the front desk, so when your clinic grows,
            the operational workload doesn&rsquo;t grow with it.
          </p>
        </div>
      </section>

      <section style={{ padding: '28px 0 40px' }}>
        <div className="ch-container" style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))' }}>
          {AREAS.map(([title, body]) => (
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
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>One half of one system</h2>
          <p style={{ color: '#5b6784', maxWidth: 680, margin: '8px auto 0' }}>
            Clinic operations are the Convert and Care stages of the Aumy patient journey &mdash; from the
            first enquiry to the visit itself. The other half is what happens around and after treatment:
            reminders, after-care, doctor check-ins, care gaps and reactivation. Same platform, same
            patient context. Your calls know your appointments. Your appointments know your patients.
          </p>
          <div style={{ marginTop: 16 }}>
            <Link to="/ai-patient-engagement" className="ch-btn ch-btn-ghost">See the AI-powered patient journey</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '8px 0 64px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>Clinic operations questions, answered</h2>
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

export default AIDentalClinicOperationsPage;
