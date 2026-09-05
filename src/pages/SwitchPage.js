import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import { INDIA_WHATSAPP } from '../config/contact';
import './HomeClinic.css';
import './SwitchPage.css';

// Moving-from-your-current-software landing page (2026-09-05).
// Never names any other software vendor: the fear ("my data is locked in")
// is universal, and naming a competitor on our own site invites a fight we
// do not need. The page answers the fear, then shows the five pillars.

const WA_HREF = `https://wa.me/${INDIA_WHATSAPP.number}?text=${encodeURIComponent(
  "Hi, I'd like to move my clinic to AUMY. Can we talk about keeping my data in sync and migrating it?",
)}`;

const worries = [
  {
    title: '“My data is locked in.”',
    body:
      'It is not. Patients, appointment history, treatment history, clinical notes, X-rays and images can all be moved into AUMY. We have done full migrations of years of records, images included.',
  },
  {
    title: '“Migration means weeks of downtime.”',
    body:
      'There is no downtime. Your current software keeps running the whole time. AUMY syncs with it first, so the clinic never stops seeing patients while the move happens.',
  },
  {
    title: '“My staff will have to re-learn everything.”',
    body:
      'On day one nothing changes for your team. AUMY works on top of what they already use. When you switch fully, we train your staff and stay with you through the first weeks.',
  },
];

const steps = [
  {
    n: '1',
    title: 'Sync',
    body:
      'Whatever software you run today, AUMY keeps your data in sync with it from day one. Patients and appointments flow into AUMY automatically. Nothing to re-type, nothing to give up.',
  },
  {
    n: '2',
    title: 'Grow on top',
    body:
      'AUMY starts working immediately on the synced data: converting enquiries, caring for patients, filling recalls, winning back the ones who drifted, and growing your reviews.',
  },
  {
    n: '3',
    title: 'Migrate when you are ready',
    body:
      'When you want one connected platform, we migrate your full history from your current software into AUMY for a one-time migration fee, verify the counts with you, and keep the sync running until you switch the old system off.',
  },
];

const moves = [
  ['Patient records', 'Every patient, contact details, medical history and allergies'],
  ['Appointment history', 'Years of visits, per doctor, per patient'],
  ['Treatment & procedure history', 'What was done, when, on which tooth'],
  ['Clinical notes', 'Case notes and examination findings, attached to the right visit'],
  ['X-rays, photos & documents', 'Every image and file, linked to the patient it belongs to'],
  ['Billing history', 'On request, depending on what your current software can export'],
];

const pillars = [
  {
    stage: 'Convert',
    title: 'Turn enquiries into booked patients',
    body:
      'Every enquiry, on WhatsApp, Instagram, a missed call or your website, is answered in seconds and followed up until it becomes a booking.',
  },
  {
    stage: 'Care',
    title: 'Look after patients around every visit',
    body:
      'Reminders and preparation before the visit, and easy rescheduling if they cannot make it, so it is a reschedule instead of a no-show. Day-by-day care instructions after every treatment. And if a patient reports something urgent, severe pain, swelling or bleeding after a procedure, AUMY does not leave it in a chat: it calls your staff immediately so a human takes over within minutes.',
  },
  {
    stage: 'Retain',
    title: 'Bring patients back for ongoing care',
    body:
      'Cleaning, check-up and maintenance recalls reached out to on time, every time, without anyone in the clinic having to remember.',
  },
  {
    stage: 'Reactivate',
    title: 'Win back patients who drifted away',
    body:
      'Patients who came once and forgot you are brought back with a campaign you approve. Revenue you already paid to acquire, recovered.',
  },
  {
    stage: 'Grow',
    title: 'Grow your reputation and reach',
    body:
      'Happy patients become Google reviews, asked at the right moment. Every review answered in your voice, your Google profile kept active, so the next patient finds you first.',
  },
];

const faqs = [
  {
    q: 'Which dental software can you sync with or migrate from?',
    a: 'Any practice-management software your clinic uses today. We have moved full histories, images included, from the systems most Indian dental clinics run on. Tell us what you use and we will confirm the exact path on the call.',
  },
  {
    q: 'Will my clinic have to stop working during the move?',
    a: 'No. Your current software keeps running throughout. AUMY syncs with it first, the migration runs in the background, and we verify the record counts together before you switch anything off.',
  },
  {
    q: 'What does the migration cost?',
    a: 'Syncing is included. A full migration into AUMY carries a one-time migration fee, scoped on the call once we know how many years of records and images you have. Plans are on the pricing page.',
  },
  {
    q: 'What if some data does not map cleanly?',
    a: 'We show you exactly what moved and what did not, record by record, before you rely on it. Anything that needs a decision, such as duplicate patients or unnamed doctors, is resolved with you, not silently.',
  },
  {
    q: 'Do I have to migrate at all?',
    a: 'No. Many clinics keep their current software and simply let AUMY run on top of it in sync. Migrate only if and when you want one connected platform.',
  },
  {
    q: 'Is my patient data safe during the move?',
    a: 'Yes. Data is encrypted in transit and at rest, access is role-based, and nothing is shared with any third party. A signed data-processing agreement covers the migration.',
  },
];

const SwitchPage = () => {
  useEffect(() => {
    setPageSeo({
      title: 'Switch Dental Software Without Losing a Single Record — Move to AUMY | AUM AI',
      description:
        'Whatever dental software your clinic uses today, AUMY keeps your data in sync from day one. Ready for one connected platform? We migrate patients, appointments, treatment history, notes and images into AUMY for a one-time migration fee. No downtime.',
      canonical: 'https://aumai.co.in/switch',
      image: 'https://aumai.co.in/screenshots/automation.png',
    });
  }, []);

  return (
    <div className="ch-home sw-page">
      {/* HERO */}
      <section className="ch-hero">
        <div className="ch-container ch-narrow">
          <span className="ch-eyebrow">Moving from your current dental software</span>
          <h1 className="ch-hero-title">
            Switch without losing <span className="ch-hero-accent">a single patient record.</span>
          </h1>
          <p className="ch-hero-sub">
            <strong>Your data is not locked in.</strong> Whatever software your clinic runs today,
            AUMY keeps your data in sync with it from day one. And when you are ready for one
            connected platform, we move everything, patients, appointments, treatment history,
            clinical notes and images, into AUMY. No downtime. Nothing re-typed.
          </p>
          <div className="ch-hero-cta">
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="ch-btn ch-btn-primary">
              Talk to us about moving
            </a>
            <Link to="/contact" className="ch-btn ch-btn-ghost">
              Book a migration call
            </Link>
          </div>
          <p className="ch-hero-trust">
            No downtime · your current software keeps running · we verify every record with you · signed data agreement
          </p>
        </div>
      </section>

      {/* THE PROMISE, IN BOLD */}
      <section className="ch-section">
        <div className="ch-container ch-narrow">
          <div className="sw-promise">
            <p>
              <strong>
                No matter what practice-management software you use, we keep your data in sync.
              </strong>{' '}
              And if you want to move completely to one connected platform, we migrate your data
              from your current software into AUMY, for a one-time migration fee.
            </p>
          </div>
        </div>
      </section>

      {/* THE THREE WORRIES */}
      <section className="ch-section ch-tint">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">What every clinic worries about</span>
            <h2 className="ch-h2">Three fears keep clinics on software they have outgrown.</h2>
          </div>
          <div className="ch-pillars sw-three">
            {worries.map((w, i) => (
              <div key={i} className="ch-pillar">
                <h3 className="ch-pillar-title">{w.title}</h3>
                <p className="ch-pillar-body">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW THE MOVE WORKS */}
      <section className="ch-section">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">How the move works</span>
            <h2 className="ch-h2">Sync first. Grow on top. Migrate when you are ready.</h2>
            <p className="ch-lead ch-center-lead">
              You never have to choose between keeping your records and growing your practice.
              The order is yours.
            </p>
          </div>
          <div className="ch-pillars sw-three">
            {steps.map((s) => (
              <div key={s.n} className="ch-pillar sw-step">
                <span className="sw-step-n">{s.n}</span>
                <h3 className="ch-pillar-title">{s.title}</h3>
                <p className="ch-pillar-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MOVES */}
      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow">
          <div className="ch-head">
            <span className="ch-eyebrow">What moves</span>
            <h2 className="ch-h2">Everything your clinic has built up.</h2>
          </div>
          <div className="ch-closetable">
            {moves.map(([what, detail], i) => (
              <div key={i} className="ch-close-row">
                <span className="ch-close-aumy">{what}</span>
                <span className="ch-close-arrow">→</span>
                <span className="ch-close-leak">{detail}</span>
              </div>
            ))}
          </div>
          <p className="ch-note ch-center sw-proof">
            One Delhi clinic moved 84,000+ appointments and years of clinical notes and images
            into AUMY, and kept seeing patients the whole time. A small sync app now keeps its old
            system and AUMY in step every day.
          </p>
        </div>
      </section>

      {/* THE FIVE PILLARS */}
      <section className="ch-section">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">What you get once you are in</span>
            <h2 className="ch-h2">Your software keeps records. AUMY grows your practice.</h2>
            <p className="ch-hero-chain">CONVERT → CARE → RETAIN → REACTIVATE → GROW</p>
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
            AUMY also includes a complete dental PMS: records, appointments, dental charting,
            prescriptions, treatment plans, billing. One platform, one login, one brain.{' '}
            <Link to="/revenue-generator">See how it works</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="ch-section ch-tint">
        <div className="ch-container ch-narrow">
          <div className="ch-head">
            <span className="ch-eyebrow">Questions clinics ask before moving</span>
            <h2 className="ch-h2">Straight answers.</h2>
          </div>
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

      {/* FINAL CTA */}
      <section className="ch-section">
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2">Tell us what you run today. We will tell you exactly how the move works.</h2>
          <blockquote className="ch-founder">
            &ldquo;Clinics stay on software they have outgrown because they believe their data is
            trapped. It is not. We keep it in sync from day one, and when you are ready, we move
            all of it and check every record with you.&rdquo;
            <cite>&mdash; Jayesh, Founder, AUM AI</cite>
          </blockquote>
          <div className="ch-hero-cta ch-center-cta">
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="ch-btn ch-btn-primary">
              Talk to us about moving
            </a>
            <Link to="/pricing" className="ch-btn ch-btn-ghost">See pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SwitchPage;
