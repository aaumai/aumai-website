import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const WA = (msg) => `https://wa.me/918007189868?text=${encodeURIComponent(msg)}`;

/**
 * ⚠️ PRICING TRUTH RULES — read before editing.
 *
 * 1. This page deliberately shows STARTING prices ("from ₹X"), not final ones.
 *    A clinic's bill = the modules they take + their monthly message/call
 *    volume. Quoting one flat number pushed small clinics away (they read
 *    ₹20,000 and never called) and boxed us in with big ones.
 *
 * 2. Any "from" figure here MUST be a price we would actually honour on a call.
 *    The site previously advertised flat pricing with "no per-message billing"
 *    while the product metered templates and voice minutes — a promise we would
 *    have had to break on the first heavy clinic. Never again.
 *
 * 3. Volume allowances and overage rates live in the product's `usage_plans`
 *    and `usage_addon_catalog` tables. Do not restate specific allowances here
 *    unless they are changed in the same session in BOTH places.
 */

/**
 * The modules, in the order a clinic grows into them. Every clinic starts with
 * Clinic OS; the rest are genuinely optional, which is the whole point.
 */
const MODULES = [
  {
    name: 'Clinic OS',
    tag: 'Where most clinics start',
    from: '₹5,000',
    featured: true,
    blurb: 'Run the day. Appointments, patient records and dental charting in one place.',
    points: [
      'Appointment book, calendar and reminders',
      'Patient records, dental charting and treatment history',
      'Prescriptions, invoices and reports',
      'Unlimited patients and unlimited staff logins',
    ],
  },
  {
    name: 'Patient Journey',
    tag: 'The one that pays for itself',
    from: '₹15,000',
    featured: true,
    blurb:
      'Turns enquiries into patients and keeps the ones you have. This is the module that finds revenue you already earned but never collected.',
    points: [
      'Every enquiry answered and followed up, day or night',
      'Books, reschedules and cancels appointments on its own',
      'Closes care gaps — reminds patients when their next treatment is due',
      'Brings lapsed patients back, in your own doctors’ words',
      'Birthday and festival messages, review requests, campaigns',
      'After-treatment care, per treatment',
    ],
  },
  {
    name: 'Get Found',
    tag: 'For clinics nobody is searching yet',
    from: '₹5,000',
    blurb: 'Be the clinic people find when they search for a dentist near them.',
    points: [
      'Google Business Profile kept live and posting',
      'Review growth, and replies written for you',
      'Local search visibility for the treatments you want more of',
    ],
  },
  {
    name: 'Voice Assistant',
    tag: 'When the phone is the problem',
    from: '₹6,000',
    blurb: 'Answers the calls your front desk cannot get to, and never sends one to voicemail.',
    points: ['Answers, books and reschedules by phone', 'Call recordings and quality review'],
  },
  {
    name: 'Ads Manager',
    tag: 'If you are already spending on ads',
    from: '₹3,000',
    blurb: 'Runs and measures your Google and Meta ads, and follows up the leads they produce.',
    points: ['Campaigns built and managed for you', 'Every lead answered within seconds'],
  },
  {
    name: 'Smile Simulation',
    tag: 'For cosmetic cases',
    from: '₹2,000',
    blurb: 'Show a patient their result before they say yes. Consultations close faster.',
    points: ['AI smile preview from a photo', 'Shareable with the patient on WhatsApp'],
  },
];

/** True on every module — the things a clinic should never have to ask about. */
const INCLUDED = [
  'Unlimited patients and unlimited staff logins — we never charge per seat',
  'Onboarding, configuration and training for your team',
  'Your data stays yours, and leaves with you if you go',
  'Ongoing support from the people who built it',
  'A 60-day money-back guarantee',
];

const FAQS = [
  {
    q: 'Why is there no fixed price on this page?',
    a: 'Because a two-chair clinic and a six-doctor practice should not pay the same, and until recently ours did. What you pay depends on two things: which modules you switch on, and how many patients you message and call in a month. A single-doctor clinic taking just Clinic OS starts at ₹5,000 a month. A busy multi-doctor practice running the full patient journey pays a good deal more, and gets a good deal more back. One short call and we will tell you your number.',
  },
  {
    q: 'I am a small clinic. Is this built for someone my size?',
    a: 'Yes, and we would rather you called than assumed otherwise. Small clinics usually take Clinic OS on its own to get the day organised, and add the Patient Journey later once the appointment book is full enough to be worth protecting. There is no minimum size and no minimum patient count. If you are two chairs and a receptionist, say so on the call — we will build you the smallest thing that solves your actual problem.',
  },
  {
    q: 'Can I start with one module and add more later?',
    a: 'That is how most clinics do it. Modules switch on and off month to month, and nothing has to be reinstalled or re-onboarded when you add one. Your patient data is already there, so a module you add in month six starts working with your full history on day one.',
  },
  {
    q: 'What decides the price beyond the modules?',
    a: 'Your monthly volume — how many appointment reminders, follow-ups and campaign messages go out, and how many minutes the AI spends on the phone. We size that from your actual patient numbers on the call rather than guessing, and we tell you before you approach a limit. You will never get a surprise bill.',
  },
  {
    q: 'Is there a setup fee?',
    a: 'For most clinics, yes — it covers connecting WhatsApp and your Google Business Profile, importing your patients and appointments, and configuring treatments and recall rules in your own doctors’ words. It scales with how much we migrate. A clinic starting fresh on Clinic OS pays very little. A practice moving twenty years of history, clinical notes and x-rays across pays more, because that is real work. We quote it exactly after seeing what you are on today.',
  },
  {
    q: 'Do I have to replace the software I already use?',
    a: 'Only if you want to. If you are happy with your current practice management software, take the Patient Journey or Get Found modules and leave it in place — they work alongside it. If your current system is the thing holding you back, Clinic OS replaces it and we migrate your history across.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Instead of an empty trial account, we show you a live demo on a real clinic so you can see it working with real patients and real messages. Every purchase is backed by a 60-day money-back guarantee.',
  },
  {
    q: 'What about multi-clinic groups?',
    a: 'Groups get per-clinic pricing under one consolidated bill, with group-level reporting across every location. Tell us how many clinics and we will put a number together.',
  },
];

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'AUMY Pricing — modular software for dental clinics, from ₹5,000/month | AUM AI',
      description:
        'One connected system, priced by the modules you need. Clinic OS from ₹5,000/month, plus Patient Journey, Get Found, Voice and more. Small clinics welcome — call us for pricing built around your patient volume. 60-day money-back guarantee.',
      canonical: 'https://aumai.co.in/pricing',
    });
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero" style={{ paddingBottom: 24 }}>
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Pricing</span>
          <h1 className="ch-hero-title">One system. Pay for the parts you need.</h1>
          <p className="ch-hero-sub">
            AUMY is one connected platform, but you do not have to buy all of it. Switch on the
            modules that solve your problem today and add the rest when you are ready. What you pay
            depends on which modules you take and how many patients you have — so a small clinic
            pays like a small clinic.
          </p>
          <div className="ch-hero-cta" style={{ marginTop: 22 }}>
            <a href={WA('Hi, I would like pricing for my clinic. Here is roughly my size and what I need:')} className="ch-btn ch-btn-primary">
              Get your price on WhatsApp
            </a>
            <Link to="/growth-audit" className="ch-btn ch-btn-ghost">
              Or start with a free Growth Audit
            </Link>
          </div>
        </div>
      </section>

      {/* Small clinics are the ones who bounce off a pricing page. Say it early,
          say it plainly, and give them their own way in. */}
      <section style={{ padding: '8px 0 8px' }}>
        <div className="ch-container ch-narrow">
          <div
            className="ch-why-card"
            style={{ display: 'block', padding: '22px 26px', borderLeft: '4px solid #2563EB' }}
          >
            <h2 style={{ margin: '0 0 6px', fontSize: '1.15rem' }}>Running a smaller clinic?</h2>
            <p style={{ margin: 0, color: '#5b6784' }}>
              Please still call. Most small clinics do not need the whole platform, and we would
              rather sell you the one module that fixes your actual problem than talk you into six.
              Plenty of our clinics started on Clinic OS alone at{' '}
              <strong style={{ color: '#0f172a' }}>₹5,000 a month</strong> and added more only once
              they were busy enough to need it. There is no minimum size.
            </p>
            <div style={{ marginTop: 14 }}>
              <a
                href={WA('Hi, I run a small clinic and want to know which module would suit me and what it would cost.')}
                className="ch-btn ch-btn-primary"
              >
                Tell us your size, get a straight answer
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '30px 0 20px' }}>
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-h2" style={{ textAlign: 'center', marginBottom: 6 }}>The modules</h2>
          <p style={{ textAlign: 'center', color: '#5b6784', maxWidth: 680, margin: '0 auto 8px' }}>
            Starting prices per clinic, per month. Your final number depends on your patient volume,
            which we work out with you rather than guess at.
          </p>
        </div>

        <div
          className="ch-container"
          style={{
            display: 'grid',
            gap: 22,
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 370px))',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {MODULES.map((m) => (
            <div
              key={m.name}
              className="ch-why-card"
              style={{ display: 'block', padding: 26, ...(m.featured ? { borderTop: '4px solid #2563EB' } : {}) }}
            >
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{m.name}</h3>
              <p style={{ margin: '3px 0 12px', color: '#2563EB', fontWeight: 600, fontSize: '0.86rem' }}>
                {m.tag}
              </p>
              <div style={{ fontSize: '1.9rem', fontWeight: 800 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#5b6784' }}>from </span>
                {m.from}
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#5b6784' }}> / month</span>
              </div>
              <p style={{ margin: '12px 0 14px', color: '#5b6784' }}>{m.blurb}</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {m.points.map((f) => (
                  <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '8px 0' }}>
                    <Check /> <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How the number is actually arrived at. Clinics distrust "custom pricing"
          when nobody explains the inputs. */}
      <section style={{ padding: '18px 0' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center" style={{ textAlign: 'center', marginBottom: 14 }}>
            How we arrive at your price
          </h2>
          <div className="ch-why-card" style={{ display: 'block', padding: '20px 24px' }}>
            {[
              ['The modules you switch on', 'Only what you need. Add or drop them month to month.'],
              ['Your monthly patient volume', 'How many patients you message and call. A quiet clinic pays less than a busy one, permanently.'],
              ['One-time setup', 'Connecting WhatsApp and Google, bringing your data across, and setting up your treatments and recalls. Scales with how much history you are moving.'],
            ].map(([h, s]) => (
              <div key={h} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', margin: '12px 0' }}>
                <Check />
                <div>
                  <strong>{h}</strong>
                  <div style={{ color: '#5b6784' }}>{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '10px 0 20px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center" style={{ textAlign: 'center', marginBottom: 14 }}>
            On every module
          </h2>
          <div className="ch-why-card" style={{ display: 'block', padding: '18px 22px' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {INCLUDED.map((f) => (
                <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '9px 0' }}>
                  <Check /> <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 0 56px' }}>
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center" style={{ textAlign: 'center', marginBottom: 16 }}>
            Questions clinics actually ask
          </h2>
          <div className="ch-faq">
            {FAQS.map((f) => (
              <div key={f.q} className="ch-faq-item">
                <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem' }}>{f.q}</h3>
                <p style={{ margin: 0, color: '#5b6784' }}>{f.a}</p>
              </div>
            ))}
          </div>

          <div className="ch-center-cta" style={{ textAlign: 'center', marginTop: 34 }}>
            <h2 className="ch-h2" style={{ marginBottom: 8 }}>Tell us your size. We will tell you your price.</h2>
            <p style={{ color: '#5b6784', maxWidth: 620, margin: '0 auto 18px' }}>
              No form to fill in, no sales sequence. One conversation about how many chairs you run
              and what is not working, and you will have a number the same day.
            </p>
            <a href={WA('Hi, I would like pricing for my clinic. Here is roughly my size and what I need:')} className="ch-btn ch-btn-primary">
              Get your price on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
