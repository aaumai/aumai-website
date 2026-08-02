import React, { useEffect } from 'react';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';
import './HomeUS.css';
import './BusinessManagerUS.css';

/**
 * Aumy Business Manager — the self-serve landing page (aumyai.com/business-manager).
 * This is the URL our own ads point at (AUMY-sells-AUMY): hero → proof →
 * capabilities → pricing (the vs-GoHighLevel ladder) → Start free trial, which
 * goes straight into the live signup at bm.aumyai.com/signup. Reuses the ch-*
 * / us-* design system from the clinic page.
 */

const SIGNUP_URL = 'https://bm.aumyai.com/signup';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const heroStats = [
  { value: '24/7', label: 'every call, WhatsApp & DM answered — and booked' },
  { value: 'Human-grade', label: 'AI voice that makes your outbound calls' },
  { value: 'Real ROAS', label: 'every ad dollar traced to actual revenue' },
  { value: '7 days', label: 'free trial — no card, set up in minutes' },
];

const capabilities = [
  { t: 'An AI receptionist on every channel', d: 'WhatsApp, Instagram, Facebook, web chat and phone — it answers as your business, helps, and books, around the clock.' },
  { t: 'Outbound calls that sound human', d: 'Upload a prospect list — or pick any audience — and your AI calls, qualifies, handles objections from your playbook, and puts demos on your calendar.' },
  { t: 'Ad spend → real revenue, finally connected', d: 'Pixel and server-side tracking with an identity graph: see the lifetime revenue every campaign, ad set and ad actually produced — not what the ad platform guesses.' },
  { t: 'Campaigns you describe in plain words', d: '“Call everyone who abandoned checkout this week and offer help paying.” The AI builds the audience, the messages and the call script. You approve. It runs.' },
  { t: 'Meetings, not admin', d: 'Qualified leads land as titled meetings — “Demo with Ravi, Sharma Textiles” — booked by the AI, confirmed on WhatsApp.' },
  { t: 'Your store, wired in', d: 'Shopify and WooCommerce orders flow in automatically — cart recovery, delivery follow-ups and repeat-purchase campaigns come alive.' },
  { t: 'One-click ad connections', d: 'Connect Facebook, pick your ad account and pixel — or create a pixel on the spot. Conversions flow back to Meta to make your ads smarter.' },
  { t: 'Self-serve, start to finish', d: 'Sign up, connect, launch and pay — all yourself, all in one dashboard. Help is there if you want it, never required.' },
];

const plans = [
  { name: 'Basic', price: 77, blurb: 'Ads + pixel, AI receptionist, campaigns, CRM & meetings.', quota: '1,100 messages · 33 voice min /mo' },
  { name: 'Growth', price: 237, blurb: 'Adds real outbound: AI voice campaigns with playbooks.', quota: '3,300 messages · 132 voice min /mo', popular: true },
  { name: 'Pro', price: 397, blurb: 'High-volume campaigns across message and voice.', quota: '11,000 messages · 330 voice min /mo' },
  { name: 'Scale', price: 549, blurb: 'The full machine for serious senders.', quota: 'Unlimited messages* · 1,100 voice min /mo' },
];

const BusinessManagerUS = () => {
  useEffect(() => {
    setPageSeo({
      title: 'Aumy Business Manager — AI Receptionist, AI Sales Calls & Real Ad ROI | Aumy',
      description:
        'One platform that answers every customer on WhatsApp, social and phone, makes human-sounding outbound sales calls, books meetings, and traces every ad dollar to real revenue. 7-day free trial, no card.',
      canonical: 'https://aumyai.com/business-manager',
    });
  }, []);

  return (
    <div className="ch-home us-home">
      {/* Top bar */}
      <header className="us-topbar">
        <div className="us-topbar-inner">
          <a href="/"><img src="/PNG-01-01.png" alt="Aumy" className="us-logo" /></a>
          <nav className="us-topnav">
            <a href="#what-it-does">What it does</a>
            <a href="#pricing">Pricing</a>
            <a href="#agencies">For agencies</a>
            <a href="/">For clinics</a>
          </nav>
          <a className="ch-btn ch-btn-primary us-topbar-cta" href={SIGNUP_URL}>
            Start free trial
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="ch-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Aumy Business Manager</span>
          <h1 className="ch-hero-title">The AI that answers, calls, books — and proves what your ads really earn.</h1>
          <p className="ch-hero-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            One platform for any business: an AI receptionist on <strong>WhatsApp, social and phone</strong>,
            an AI that makes <strong>outbound sales calls in a human voice</strong>, meetings booked straight
            onto your calendar — and ad reporting that shows the <strong>real revenue</strong> behind every
            dollar, not clicks.
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <a className="ch-btn ch-btn-primary" href={SIGNUP_URL}>Start free trial — 7 days, no card</a>
            <a className="ch-btn ch-btn-ghost" href="#pricing">See pricing</a>
          </div>
          <div className="ch-stats">
            {heroStats.map((s, i) => (
              <div key={i} className="ch-stat">
                <span className="ch-stat-value">{s.value}</span>
                <span className="ch-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="ch-section ch-tint" id="what-it-does">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">What it does</span>
            <h2 className="ch-h2">Marketing, sales and follow-up — run by AI, owned by you.</h2>
            <p className="ch-lead ch-center-lead">
              Not a chatbot with a dashboard. A connected system: the same AI that answers your customers
              also calls your leads, books your meetings, and learns from every ad click and every sale.
            </p>
          </div>
          <div className="ch-why">
            {capabilities.map((c, i) => (
              <div key={i} className="ch-why-card">
                <Check />
                <div>
                  <h3 className="ch-why-title">{c.t}</h3>
                  <p className="ch-why-body">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE LOOP (differentiator) */}
      <section className="ch-section us-dark">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow us-dark-eyebrow">Why it works</span>
          <h2 className="ch-h2 us-dark-h2">The loop nobody else closes.</h2>
          <p className="ch-lead ch-center-lead us-dark-body">
            Ad click → conversation → sale → revenue matched back to the exact ad → conversions fed back to
            Meta so the next dollar targets better → and the AI follows up with that same customer, with
            full context. Attribution tools can see but can’t act. Messaging tools act but can’t see.
            Aumy does both — on one customer record.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="ch-section ch-tint" id="pricing">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Pricing</span>
            <h2 className="ch-h2">Less price. More machine.</h2>
            <p className="ch-lead ch-center-lead">
              Around 20% less than comparable platforms — with the AI receptionist, WhatsApp and in-plan
              voice minutes <strong>included</strong>, not sold as add-ons. Yearly = two months free.
            </p>
          </div>
          <div className="bm-plans">
            {plans.map((p) => (
              <div key={p.name} className={`bm-plan${p.popular ? ' bm-plan-popular' : ''}`}>
                {p.popular && <span className="bm-plan-badge">Most popular</span>}
                <h3 className="bm-plan-name">{p.name}</h3>
                <div className="bm-plan-price">${p.price}<span>/mo</span></div>
                <p className="bm-plan-blurb">{p.blurb}</p>
                <p className="bm-plan-quota">{p.quota}</p>
                <a className={`ch-btn ${p.popular ? 'ch-btn-primary' : 'ch-btn-ghost'} bm-plan-cta`} href={SIGNUP_URL}>
                  Start free trial
                </a>
              </div>
            ))}
          </div>
          <p className="ch-fineprint" style={{ textAlign: 'center' }}>
            * Fair-use policy applies. Every plan starts with a 7-day free trial — no card required.
            Extra voice minutes and messages available as simple top-ups.
          </p>
        </div>
      </section>

      {/* AGENCIES */}
      <section className="ch-section" id="agencies">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">For marketing agencies</span>
          <h2 className="ch-h2">Run every client through one login.</h2>
          <p className="ch-lead ch-center-lead">
            Prove ROAS with first-party revenue data, put an AI receptionist and sales caller on every
            client, and manage them all from one workspace. Agency pricing is per managed client —
            write us at <a href="mailto:jayesh@aumyai.com">jayesh@aumyai.com</a>.
          </p>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="ch-offer">
        <div className="ch-container ch-narrow ch-center">
          <h2 className="ch-offer-title">Your competitors’ AI answers in seconds. Does yours?</h2>
          <p className="ch-offer-sub">
            Set up in minutes: connect your WhatsApp, your ads and your store — and your AI goes to work.
            Seven days free. No card. Cancel anytime.
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <a className="ch-btn ch-btn-primary" href={SIGNUP_URL}>Start free trial</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="us-footer">
        <img src="/PNG-01-01.png" alt="Aumy" className="us-logo us-logo-footer" />
        <p className="us-footer-line">
          Aumy Business Manager · <a href="mailto:jayesh@aumyai.com">jayesh@aumyai.com</a> · <a href="tel:+13072635098">+1 (307) 263-5098</a>
        </p>
        <p className="us-footer-line">
          AUM AI Healthcare Technology LLC · 30 N Gould St, Ste N, Sheridan, WY 82801
        </p>
        <p className="us-footer-links">
          <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/">Aumy for Clinics</a>
        </p>
        <p className="us-footer-fine">© {new Date().getFullYear()} AUM AI Healthcare Technology LLC. Product &amp; engineering: Pune, India.</p>
      </footer>
    </div>
  );
};

export default BusinessManagerUS;
