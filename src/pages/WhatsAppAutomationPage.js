import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const STAGES = [
  ['Convert', 'New enquiries answered in seconds and nurtured until they book — with treatment-aware follow-ups for implants, aligners, RCTs and more.'],
  ['Care', 'Day-by-day after-treatment instructions sent automatically, matched to the procedure performed — fewer anxious calls, better outcomes.'],
  ['Retain', 'Cleaning and check-up recalls that go out on schedule and fill your chair — no register, no reminder diary, no staff time.'],
  ['Reactivate', 'Patients who haven’t visited in months get personal win-back journeys that bring them back — your highest-ROI revenue, already in your database.'],
  ['Grow', 'Happy patients nudged at the right moment to leave a Google review, compounding your local visibility month after month.'],
];

const DIFFERENCE = [
  ['Official WhatsApp Business API', 'Your clinic’s own verified number and branding on Meta’s approved business channel — not an unofficial bulk tool that gets numbers banned.'],
  ['Conversations, not blasts', 'Every message can be replied to — and the AI actually answers, books and follows up. Broadcast tools stop where AUMY starts.'],
  ['Campaigns with guardrails', 'Festival offers and promotions with start/end dates, daily send caps and automatic opt-out handling built in.'],
  ['Human takeover any time', 'Your team can step into any conversation with one tap; the AI yields instantly and stays out while they chat.'],
  ['Revenue attribution', 'Every booking is traced back to the message, campaign or channel that produced it — you see what each rupee returned.'],
];

const FAQS = [
  {
    q: 'Is this the official WhatsApp? Will my number get blocked?',
    a: 'AUMY uses the official WhatsApp Business API from Meta on your clinic’s own number. It follows Meta’s messaging rules — approved templates, opt-outs, send limits — which is exactly why it doesn’t get blocked the way unofficial bulk tools do.',
  },
  {
    q: 'Isn’t automated WhatsApp just spam?',
    a: 'Blast tools are spam. AUMY sends each patient the message that’s relevant to them at the moment it’s relevant — their recall when it’s due, their after-care on the day of treatment, their follow-up when their plan is pending. Relevance is the opposite of spam, and opt-outs are honoured instantly.',
  },
  {
    q: 'Can my staff still use the WhatsApp number normally?',
    a: 'Yes. Your team sees every conversation, can jump in whenever they want, and the AI steps back the moment they do. The number stays fully theirs.',
  },
  {
    q: 'What can I send campaigns about?',
    a: 'Festival offers, new services, health-camp announcements — composed with AI, sent to the right patient segments with daily caps and campaign start/end dates, and measured down to bookings and revenue.',
  },
  {
    q: 'Do I need new software or a new number?',
    a: 'No. AUMY connects to your existing WhatsApp number and runs alongside your existing practice software. Setup is done for you, typically within a week.',
  },
];

const WhatsAppAutomationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'WhatsApp Automation for Dental Clinics — Official API | AUMY',
      description:
        'AUMY automates your dental clinic’s WhatsApp on the official Business API — instant replies, appointment booking, recalls, reactivation and review requests — with human takeover and revenue attribution built in.',
      canonical: 'https://aumai.co.in/whatsapp-automation-for-clinics',
    });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 24 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">WhatsApp Automation</span>
          <h1 className="ch-hero-title">WhatsApp automation built for dental clinics</h1>
          <p className="ch-hero-sub">
            India&rsquo;s patients live on WhatsApp. AUMY turns your clinic&rsquo;s number into a system that
            answers, books, follows up, recalls and reactivates — on the official WhatsApp Business API,
            across all five stages of the patient journey.
          </p>
          <div style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/demos" className="ch-btn ch-btn-primary">See it live on a real clinic&rsquo;s WhatsApp</Link>
            <Link to="/pricing" className="ch-btn ch-btn-ghost">View pricing</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 0 8px' }}>
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>One number, five automated stages</h2>
          <p style={{ color: '#5b6784', maxWidth: 640, margin: '8px auto 0' }}>
            Most clinics use WhatsApp manually — replying when the front desk gets a minute, forgetting
            follow-ups by Friday. AUMY runs the entire patient journey on it, automatically.
          </p>
        </div>
      </section>

      <section style={{ padding: '24px 0 32px' }}>
        <div className="ch-container" style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))' }}>
          {STAGES.map(([stage, body], i) => (
            <div key={stage} className="ch-why-card" style={{ display: 'block', padding: '20px 22px', borderTop: '3px solid #2563EB' }}>
              <span className="ch-eyebrow">Stage {i + 1}</span>
              <h3 style={{ margin: '4px 0 6px', fontSize: '1.05rem' }}>{stage}</h3>
              <p style={{ margin: 0, color: '#5b6784' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '8px 0 36px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>Not another broadcast tool</h2>
          <ul style={{ listStyle: 'none', margin: '18px 0 0', padding: 0 }}>
            {DIFFERENCE.map(([title, body]) => (
              <li key={title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '14px 0' }}>
                <Check />
                <span><strong>{title}.</strong> <span style={{ color: '#5b6784' }}>{body}</span></span>
              </li>
            ))}
          </ul>
          <div className="ch-center" style={{ textAlign: 'center', marginTop: 22 }}>
            <Link to="/ai-receptionist" className="ch-btn ch-btn-ghost">Meet the AI receptionist that powers the replies</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '8px 0 64px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2" style={{ textAlign: 'center' }}>WhatsApp automation questions, answered</h2>
          {FAQS.map((f) => (
            <div key={f.q} className="ch-why-card" style={{ display: 'block', padding: '18px 22px', margin: '12px 0' }}>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem' }}>{f.q}</h3>
              <p style={{ margin: 0, color: '#5b6784' }}>{f.a}</p>
            </div>
          ))}
          <div className="ch-center" style={{ textAlign: 'center', marginTop: 26 }}>
            <Link to="/growth-audit" className="ch-btn ch-btn-primary">Start with a free Growth Audit</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatsAppAutomationPage;
