import React, { useEffect } from 'react';
import { setPageSeo } from '../utils/seo';
import DemoPlaylist from '../components/DemoPlaylist';
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

// "AI Employee", not "AI receptionist". The product was renamed on 2026-08-06
// (aumy-bm-api migration 421) because BM sells to retail, services, hospitality,
// fitness and legal — "receptionist" is a clinic word and undersells an agent
// that also sells, quotes from the catalogue and makes outbound calls.
const capabilities = [
  { t: 'An AI Employee on every channel', d: 'WhatsApp, Instagram, Facebook, web chat and phone — it answers as your business, quotes from your catalogue, handles objections and books, around the clock.' },
  { t: 'Outbound calls that sound human', d: 'Upload a prospect list — or pick any audience — and your AI calls, qualifies, works your objection playbook, and puts demos on your calendar.' },
  { t: 'Ad spend → real revenue, finally connected', d: 'Pixel and server-side tracking with an identity graph: see the lifetime revenue every campaign, ad set and ad actually produced — not what the ad platform guesses.' },
  { t: 'Campaigns you describe in plain words', d: '“Call everyone who abandoned checkout this week and offer help paying.” The AI builds the audience, the messages and the call script. You approve. It runs.' },
  { t: 'Meetings, not admin', d: 'Qualified leads land as titled meetings — “Demo with Ravi, Sharma Textiles” — booked by the AI, confirmed on WhatsApp, synced to your calendar.' },
  { t: 'Your store, wired in', d: 'Shopify and WooCommerce orders flow in automatically — cart recovery, delivery follow-ups and repeat-purchase campaigns come alive.' },
  { t: 'Your catalogue, quoted correctly', d: 'Products, prices and packages live in one place — so the AI answers “how much?” from your real catalogue instead of guessing, and orders and invoices follow.' },
  { t: 'Content Studio', d: 'Turn one photo into a caption, a post and a story — written in your brand voice and published to Instagram, Facebook and Google in a few clicks.' },
  { t: 'Get Found on Google', d: 'Manage your Google Business Profile, publish posts automatically, and earn a steady stream of real reviews — so you climb the local map pack where buyers actually search.' },
  { t: 'A sales pipeline that fills itself', d: 'Every enquiry becomes a tracked lead with its source, its conversation and its value — stages, owners, reminders and follow-ups, no spreadsheet.' },
  { t: 'Step in whenever you want', d: 'A shared inbox where your team sees every conversation and can take over from the AI mid-chat — and hand it straight back.' },
  { t: 'Ask your data anything', d: 'Live dashboards for revenue, channels and campaigns — plus plain-English questions answered from your own numbers.' },
  { t: 'One-click ad connections', d: 'Connect Facebook, pick your ad account and pixel — or create a pixel on the spot. Conversions flow back to Meta to make your ads smarter.' },
  { t: 'Self-serve, start to finish', d: 'Sign up, connect, launch and pay — all yourself, all in one dashboard. Help is there if you want it, never required.' },
];

const plans = [
  { name: 'Basic', price: 77, blurb: 'Ads + pixel, AI Employee, campaigns, CRM & meetings.', quota: '1,100 messages · 33 voice min /mo' },
  { name: 'Growth', price: 237, blurb: 'Adds real outbound: AI voice campaigns with playbooks.', quota: '3,300 messages · 132 voice min /mo', popular: true },
  { name: 'Pro', price: 397, blurb: 'High-volume campaigns across message and voice.', quota: '11,000 messages · 330 voice min /mo' },
  { name: 'Scale', price: 549, blurb: 'The full machine for serious senders.', quota: 'Unlimited messages* · 1,100 voice min /mo' },
];

const BusinessManagerUS = () => {
  useEffect(() => {
    setPageSeo({
      // Keyword targets: "AI employee for small business", "WhatsApp automation
      // for ecommerce", "AI sales calls", "ad attribution / true ROAS",
      // "GoHighLevel alternative". Title leads with the category buyers search,
      // not the brand.
      title: 'AI Employee for Small Business & Ecommerce — WhatsApp, Sales Calls & True ROAS | Aumy Business Manager',
      description:
        'An AI Employee that answers every customer on WhatsApp, Instagram, Facebook and phone, makes human-sounding outbound sales calls, books meetings, recovers abandoned carts, and traces every ad dollar to real revenue. Shopify & WooCommerce ready. 7-day free trial, no card.',
      canonical: 'https://aumyai.com/business-manager',
    });
  }, []);

  return (
    <div className="ch-home us-home">
      {/* Top bar */}
      <header className="us-topbar">
        <div className="us-topbar-inner">
          <a href="/"><img src="/aumy-lockup-light.png" alt="Aumy" className="us-logo" /></a>
          <nav className="us-topnav">
            <a href="#what-it-does">What it does</a>
            <a href="#who-its-for">Who it’s for</a>
            <a href="#ads">Your ads</a>
            <a href="#pricing">Pricing</a>
            <a href="/">For clinics</a>
            <a href="https://aumai.co.in/">For India</a>
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
            One platform for any business: an AI Employee on <strong>WhatsApp, social and phone</strong>,
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

      <DemoPlaylist title="See the AI Employee actually doing it." lead="Short, unedited demos — answering on WhatsApp and social, quoting from a catalogue, making an outbound call, booking a meeting. No slides." />

      {/* ADS — "we don't replace your marketing team".
          Businesses running paid media hear "new marketing tool" and assume we
          want to take the ads over. We don't: the product is a feedback loop
          that makes whoever runs their ads perform better. Saying so plainly
          removes the biggest objection in the first sentence. */}
      <section className="ch-section" id="ads">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Your ads, made smarter</span>
          <h2 className="ch-h2">Keep your marketing team. Give them better data.</h2>
          <p className="ch-lead ch-center-lead">
            We don’t run your ads and we don’t replace your agency — they keep doing what they do.
            What changes is what Meta and Google <em>learn</em>. The moment a click turns into a real
            sale, we send that revenue back to the ad platform. So it stops optimising for whoever
            clicks and starts finding more people like the customers who actually buy.
          </p>
          <div className="ch-why">
            <div className="ch-why-card">
              <Check />
              <div>
                <h3 className="ch-why-title">Higher ROAS on the same spend</h3>
                <p className="ch-why-body">
                  Your budget doesn’t change. The targeting improves because it is finally being
                  taught with revenue instead of form fills and add-to-carts.
                </p>
              </div>
            </div>
            <div className="ch-why-card">
              <Check />
              <div>
                <h3 className="ch-why-title">Lower cost per purchase</h3>
                <p className="ch-why-body">
                  As lead and buyer quality climbs, CPP falls — you stop paying to reach people who
                  were never going to check out.
                </p>
              </div>
            </div>
            <div className="ch-why-card">
              <Check />
              <div>
                <h3 className="ch-why-title">Your agency finally gets proof</h3>
                <p className="ch-why-body">
                  Every campaign, ad set and ad traced to real revenue — so the reporting argument
                  ends and budget moves to what actually earns.
                </p>
              </div>
            </div>
          </div>
          <p className="ch-fineprint">
            Privacy-safe: conversions are sent hashed and server-side, with event de-duplication, so
            your existing pixel and ours can run side by side without double-counting.
          </p>
        </div>
      </section>

      {/* WHO IT'S FOR — real segments, in the words those buyers use when they
          search. Doubles as the page's topical-relevance signal. */}
      <section className="ch-section ch-tint" id="who-its-for">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Who it’s for</span>
          <h2 className="ch-h2">Built for businesses that already spend on getting found.</h2>
          <p className="ch-lead ch-center-lead">
            If customers reach you by message, DM or phone — and you pay to make that happen —
            Aumy pays for itself by answering all of them and proving which ads worked.
          </p>
          <div className="ch-why">
            <div className="ch-why-card">
              <Check />
              <div>
                <h3 className="ch-why-title">Ecommerce &amp; D2C brands</h3>
                <p className="ch-why-body">
                  Shopify and WooCommerce stores running Meta ads: abandoned-cart recovery on
                  WhatsApp, delivery updates, repeat-purchase campaigns, and true ROAS per campaign.
                </p>
              </div>
            </div>
            <div className="ch-why-card">
              <Check />
              <div>
                <h3 className="ch-why-title">Local &amp; service businesses</h3>
                <p className="ch-why-body">
                  Salons, gyms and studios, clinics, restaurants, real-estate and home services —
                  every missed call and DM answered and booked, plus Google Business Profile and
                  reviews handled for you.
                </p>
              </div>
            </div>
            <div className="ch-why-card">
              <Check />
              <div>
                <h3 className="ch-why-title">B2B &amp; high-ticket sales teams</h3>
                <p className="ch-why-body">
                  Coaches, consultants, education and SaaS: AI outbound calls that qualify from your
                  playbook and put demos on the calendar, with a pipeline that tracks every lead
                  back to its source.
                </p>
              </div>
            </div>
            <div className="ch-why-card">
              <Check />
              <div>
                <h3 className="ch-why-title">Marketing agencies</h3>
                <p className="ch-why-body">
                  Run every client from one workspace, prove ROAS with first-party revenue, and put
                  an AI Employee on each account — priced per managed client.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="ch-section ch-tint" id="pricing">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Pricing</span>
            <h2 className="ch-h2">Less price. More machine.</h2>
            <p className="ch-lead ch-center-lead">
              Around 20% less than comparable platforms — with the AI Employee, WhatsApp and in-plan
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
            Prove ROAS with first-party revenue data, put an AI Employee and sales caller on every
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
        <img src="/aumy-lockup-light.png" alt="Aumy" className="us-logo us-logo-footer" />
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
