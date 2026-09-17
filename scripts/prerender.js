/**
 * Post-build prerender for the CRA SPA.
 *
 * Why: crawlers (and most AI crawlers) receive an empty <div id="root"></div>,
 * so none of the page copy or per-route metadata is visible. This writes a real
 * static HTML file per route with the correct <title>/description/canonical/OG
 * tags, route-specific JSON-LD, and visible content injected into #root.
 *
 * Safe because the app mounts with ReactDOM.createRoot(...).render() (not
 * hydrateRoot): React clears #root and re-renders on mount, so the injected
 * content is discarded client-side — no hydration mismatch. Crawlers that don't
 * run JS keep the static content; browsers get the real app.
 *
 * Pure Node — no headless browser — so it adds no memory pressure to the build
 * host. Runs automatically after `react-scripts build` (see package.json).
 */
const fs = require('fs');
const path = require('path');
// Growth Hub articles: same data file the React app renders from, so the
// crawler-visible HTML and the client-rendered article can never drift apart.
const { growthPosts } = require('../src/data/growthPosts');
const { CALCULATORS } = require('../src/data/calculators');
// Prices come from the AUMY API's rate card (the one clinics are billed from),
// snapshotted by scripts/fetch-pricing.js just before the build — never typed here.
const PRICING = require('../src/data/pricing.json');
const PC = PRICING.card;
const rs = (n) => '&#8377;' + Math.round(Number(n) || 0).toLocaleString('en-IN');
const rsText = (n) => 'Rs ' + Math.round(Number(n) || 0).toLocaleString('en-IN');
// A single open band ([[null, rate]]) is a flat rate ("Rs 7 per minute") —
// no "beyond" because there is no previous ceiling. Same rule as bandsText in
// PricingPage.js; keep the two in step.
const bands = (list, unit, money) => {
  let prev = null;
  return list.map(([upTo, rate]) => {
    const part = upTo == null
      ? (prev == null ? money(rate) : money(rate) + ' beyond ' + prev.toLocaleString('en-IN'))
      : money(rate) + ' up to ' + upTo.toLocaleString('en-IN');
    prev = upTo;
    return part;
  }).join(', ') + ' per ' + unit;
};
const moneyRate = (r) => '&#8377;' + r;
const textRate = (r) => 'Rs ' + r;

const BUILD = path.join(__dirname, '..', 'build');
// US-market build (REACT_APP_MARKET=us → aumyai.com) prerenders only the US
// landing route with US metadata; default is the India site unchanged.
const MARKET = process.env.REACT_APP_MARKET || 'in';
const ORIGIN = MARKET === 'us' ? 'https://aumyai.com' : 'https://aumai.co.in';
const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function setTag(html, re, replacement) {
  if (re.test(html)) return html.replace(re, replacement);
  return html;
}
function apply(html, r) {
  let out = html;
  out = setTag(out, /<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`);
  out = setTag(out, /(<meta name="description" content=")[^"]*(")/, `$1${esc(r.description)}$2`);
  out = setTag(out, /(<link rel="canonical" href=")[^"]*(")/, `$1${r.canonical}$2`);
  out = setTag(out, /(<meta property="og:title" content=")[^"]*(")/, `$1${esc(r.title)}$2`);
  out = setTag(out, /(<meta property="og:description" content=")[^"]*(")/, `$1${esc(r.description)}$2`);
  out = setTag(out, /(<meta property="og:url" content=")[^"]*(")/, `$1${r.canonical}$2`);
  out = setTag(out, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(r.title)}$2`);
  out = setTag(out, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(r.description)}$2`);
  if (r.ogImage) {
    out = setTag(out, /(<meta property="og:image" content=")[^"]*(")/, `$1${r.ogImage}$2`);
    out = setTag(out, /(<meta name="twitter:image" content=")[^"]*(")/, `$1${r.ogImage}$2`);
  }
  if (r.jsonld) {
    const blocks = r.jsonld
      .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
      .join('');
    out = out.replace('</head>', `${blocks}</head>`);
  }
  // Onboarding pause (owner 2026-09-15) — same wording as
  // src/config/onboardingNotice.js; India site only (the US build has no header).
  const notice = MARKET === 'us'
    ? ''
    : `<p class="onboarding-notice">We&rsquo;re not onboarding new clinics until 15 October 2026. <a href="/contact">Join the waitlist</a> and we&rsquo;ll reach out when onboarding reopens.</p>`;
  out = out.replace(
    '<div id="root"></div>',
    `<div id="root">${notice}<div class="ch-home">${r.content}</div></div>`
  );
  return out;
}

// ---- shared JSON-LD helpers ----------------------------------------------
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ['How does the 60-day money-back guarantee work?', 'We set AUMY up on your clinic and it goes to work — real enquiries answered, real bookings made, real care gaps followed up. If it does not meet your expectations in the first 60 days, you get your money back. No lock-in, and your data stays yours.'],
    ['Do you have your own dental software (PMS)?', 'Yes — AUMY includes a complete Dental PMS: patient records, appointments, FDI odontogram with 6-point perio charting, digital prescriptions, treatment plans, and full billing, invoicing & accounts. Clinics that want one platform run everything on AUMY, at the same price.'],
    ['Do I have to replace my current software?', 'No. AUMY works alongside what you already use — it adds the growth and engagement layer on top. You can move onto AUMY’s full PMS later, whenever you choose.'],
    ['Is my patient data safe?', 'Yes — encrypted in transit and at rest, role-based access, and private by design.'],
    ['How long does it take to get started?', 'Most clinics are live quickly — and most of that is simple setup we handle with you.'],
    ['Will my staff have to learn something complicated?', 'No. AUMY runs in the background; your team does less, not more.'],
    ['Is this a product or a service?', 'Both — you get a proven system (AUMY), run and tailored for you by a partner. You are getting a growth partner, not software to figure out alone.'],
    ['Who actually runs all this?', 'A dedicated growth expert is assigned to your clinic on a permanent basis — they strategise, set up and operate the entire system on your behalf, and review results with you every week.'],
  ].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};
// Organization: ties both hosts to one legal entity and declares the
// cross-market relationship, so Google treats aumai.co.in and aumyai.com as
// sister sites rather than duplicate competitors.
const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: MARKET === 'us' ? 'AUM AI Healthcare Technology LLC' : 'AUM AI Healthcare Solutions',
  url: `${ORIGIN}/`,
  logo: `${ORIGIN}/aumy-mark-512.png`,
  sameAs: ['https://aumai.co.in/', 'https://aumyai.com/'],
  address:
    MARKET === 'us'
      ? { '@type': 'PostalAddress', streetAddress: '30 N Gould St, Ste N', addressLocality: 'Sheridan', addressRegion: 'WY', postalCode: '82801', addressCountry: 'US' }
      : { '@type': 'PostalAddress', addressLocality: 'Pune', addressRegion: 'Maharashtra', addressCountry: 'IN' },
  contactPoint: [{
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: MARKET === 'us' ? 'jayesh@aumyai.com' : 'jayesh.chaudhari@aumai.co.in',
    telephone: MARKET === 'us' ? '+1-307-263-5098' : '+91-800-718-9868',
  }],
};

// SoftwareApplication with offers: this is what makes a product page eligible
// for price/rating treatment in results, and what AI assistants quote when
// asked "how much does X cost".
const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Aumy Business Manager',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  url: `${ORIGIN}/business-manager`,
  description:
    'An AI Employee that answers customers on WhatsApp, Instagram, Facebook, web chat and phone, makes outbound sales calls, books meetings, recovers abandoned carts, and traces ad spend to real revenue.',
  offers: [
    { '@type': 'Offer', name: 'Basic', price: '77', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Growth', price: '237', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Pro', price: '397', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Scale', price: '549', priceCurrency: 'USD' },
  ],
};

const bmFaqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ['Does Aumy run my ads or replace my marketing agency?', 'No. Your team or agency keeps running your ads exactly as they do now. Aumy sends real revenue back to Meta and Google when a click becomes a sale, so the ad platforms learn who actually buys — which raises ROAS and lowers cost per purchase on the same budget.'],
    ['What is an AI Employee?', 'A single AI that answers your customers on WhatsApp, Instagram, Facebook, web chat and phone — quoting from your product catalogue, handling objections and booking meetings — and also makes outbound sales calls in a human-sounding voice.'],
    ['Does it work with Shopify or WooCommerce?', 'Yes. Orders flow in automatically, which turns on abandoned-cart recovery, delivery follow-ups and repeat-purchase campaigns.'],
    ['How much does it cost?', 'Plans start at $77/month (Basic) and run to $549/month (Scale). Every plan includes the AI Employee, WhatsApp and in-plan voice minutes rather than selling them as add-ons. Yearly billing is two months free.'],
    ['Is there a free trial?', 'Yes — 7 days, no card required. You can sign up, connect your channels, launch and pay entirely self-serve.'],
    ['Can my team take over a conversation from the AI?', 'Yes. A shared inbox shows every conversation, and anyone on your team can step in mid-chat and hand it back to the AI afterwards.'],
  ].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const demoVideoLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'One Patient, Five Stages, Zero Typing \u2014 AUMY runs the whole dental patient journey on WhatsApp (live, unedited)',
  description:
    'A live, unedited demo on a real dental clinic\u2019s WhatsApp number: a lead from an ad who says \u201clet me think about it\u201d, the unprompted follow-up and booking, day-one aligner aftercare, the tracking recall, an eight-month-dormant patient won back with a \u20b9999 wellness package, and a review ask that listens before asking. Convert, Care, Retain, Reactivate, Grow.',
  thumbnailUrl: 'https://i.ytimg.com/vi/-qw1sp7Ub4k/maxresdefault.jpg',
  embedUrl: 'https://www.youtube.com/embed/-qw1sp7Ub4k',
  contentUrl: 'https://www.youtube.com/watch?v=-qw1sp7Ub4k',
  uploadDate: '2026-08-23',
  publisher: {
    '@type': 'Organization',
    name: 'AUM AI',
    logo: { '@type': 'ImageObject', url: `${ORIGIN}/aumy-mark-512.png` },
  },
};

const videoLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Dr. Ronak, Vinayaka Dental Care — patient growth with AUMY',
  description: 'A dental clinic owner describes how AUMY reduced no-shows, brought recall patients back, and grew the clinic 20–25% in 2–3 months.',
  thumbnailUrl: `${ORIGIN}/videos/dr-ronak-poster.jpg`,
  contentUrl: `${ORIGIN}/videos/dr-ronak-vinayaka.mp4`,
  uploadDate: '2026-07-02',
};

// ---- routes ---------------------------------------------------------------
const routes = [
  {
    slug: 'pricing',
    title: `AUMY Pricing — from ${rsText(PC.platformFee.standard)}/month, priced by your enquiries and patient visits | AUM AI`,
    description:
      `Transparent pricing for dental clinics. ${rsText(PC.platformFee.standard)}/month (Standard AI) or ${rsText(PC.platformFee.premium)}/month (Premium AI) includes ${PC.included.enquiries} enquiries and ${PC.included.visits} patient visits. Work out your exact monthly price — no surprises.`,
    canonical: `${ORIGIN}/pricing`,
    jsonld: [orgLd, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How is my AUMY price worked out?', acceptedAnswer: { '@type': 'Answer', text: `A platform fee of ${rsText(PC.platformFee.standard)} a month on Standard AI or ${rsText(PC.platformFee.premium)} on Premium covers the first ${PC.included.enquiries} enquiries and ${PC.included.visits} patient visits each month. Beyond that each extra enquiry and visit is charged at a rate that falls as the clinic gets busier, band by band like tax slabs. Add-ons (AI voice agent, Get Found, Meta Ads management) are flat monthly fees.` } },
        { '@type': 'Question', name: 'What counts as an enquiry and a visit?', acceptedAnswer: { '@type': 'Answer', text: 'An enquiry is someone who is not yet a patient writing to the clinic on WhatsApp for the first time, or calling from an unknown number. A visit is an appointment that actually happened: completed, checked in or in the chair.' } },
        { '@type': 'Question', name: 'Are WhatsApp messages extra?', acceptedAnswer: { '@type': 'Answer', text: 'With the clinic’s own WhatsApp Business number, Meta bills its message fees to the clinic directly and AUMY adds nothing. If messages go out through AUMY’s number, Meta’s fees are passed through on the invoice.' } },
        { '@type': 'Question', name: 'What is never charged extra?', acceptedAnswer: { '@type': 'Answer', text: `${(PC.notBilled || []).join(', ')}, unlimited patients and staff logins, the Clinic OS, and every patient-journey message: reminders, after-care, care gaps and reviews.` } },
        { '@type': 'Question', name: 'Is there a setup fee?', acceptedAnswer: { '@type': 'Answer', text: `One-time setup of ${rsText(PC.onboarding.min)} to ${rsText(PC.onboarding.max)}, depending on the data migrated. Paying yearly saves ${Math.round(PC.annualPrepayDiscount * 100)}%. Prices exclude GST.` } },
      ],
    }],
    content: `
      <section><div class="ch-container ch-narrow">
        <h1 class="ch-hero-title">Grow your clinic. Don&rsquo;t grow the chaos &mdash; or the bill.</h1>
        <p>Transparent pricing, worked out in front of you. You pay for the enquiries AUMY handles and the patient visits it coordinates, and the busier you get, the less each one costs. No hidden fees, no surprises.</p>
        <h2>The rates, in full</h2>
        <ul>
          <li><strong>Platform fee:</strong> ${rs(PC.platformFee.standard)}/month on Standard AI or ${rs(PC.platformFee.premium)}/month on Premium AI, including ${PC.included.enquiries} enquiries and ${PC.included.visits} patient visits every month.</li>
          <li><strong>Extra enquiries:</strong> Standard ${bands(PC.enquiries.standard, 'enquiry', moneyRate)}; Premium ${bands(PC.enquiries.premium, 'enquiry', moneyRate)}.</li>
          <li><strong>Extra patient visits:</strong> Standard ${bands(PC.visits.standard, 'visit', moneyRate)}; Premium ${bands(PC.visits.premium, 'visit', moneyRate)}.</li>
          <li><strong>AI voice agent:</strong> ${rs(PC.voice.monthly)}/month with a number and ${PC.voice.includedMinutes} minutes, then ${bands(PC.voice.minutes, 'minute', moneyRate)}.</li>
          <li><strong>Get Found:</strong> ${rs(PC.addons.getFound.monthly)}/month. <strong>Meta Ads management:</strong> ${rs(PC.addons.metaAds.monthly)}/month (your ad budget is paid to Meta).</li>
          <li><strong>Included, never charged extra:</strong> ${(PC.notBilled || []).join(', ')}, unlimited patients and staff logins, the Clinic OS and every patient-journey message.</li>
          <li><strong>One-time setup:</strong> ${rs(PC.onboarding.min)}&ndash;${rs(PC.onboarding.max)} depending on the data we migrate. Pay yearly and save ${Math.round(PC.annualPrepayDiscount * 100)}%. Prices exclude GST.</li>
        </ul>
        <p>Example: a clinic with 250 new enquiries a month seeing 20 patients a day for 26 days pays ${rs(PRICING.sample.quote.total)} a month on Standard AI.</p>
        <p>With your own WhatsApp Business number, Meta bills message fees to you directly &mdash; AUMY adds nothing on top.</p>
        <p>We&rsquo;re not onboarding new clinics until 15 October 2026. You can still get your price or send us your details &mdash; we&rsquo;ll add you to the waitlist and reach out when onboarding reopens.</p>
      </div></section>`,
  },
  {
    slug: 'ai-receptionist',
    title: 'AI Receptionist for Dental Clinics — 24/7 Calls & WhatsApp | AUMY',
    description:
      'AUMY\u2019s AI receptionist answers every call and WhatsApp enquiry for your dental clinic 24/7 — in the patient\u2019s own language — and converts enquiries into booked appointments. Works alongside your existing software.',
    canonical: `${ORIGIN}/ai-receptionist`,
    jsonld: [orgLd, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: "Will an AI receptionist replace my front-desk staff?", acceptedAnswer: { '@type': 'Answer', text: "No — it covers what staff cannot: nights, Sundays, lunch rushes and simultaneous calls. Your team keeps full control and can join any conversation at any time." } },
        { '@type': 'Question', name: "Will patients realise they are talking to AI?", acceptedAnswer: { '@type': 'Answer', text: "AUMY replies naturally in the patient's own language and hands anything sensitive to your team immediately. Patients care about getting an instant, helpful answer." } },
        { '@type': 'Question', name: "Which languages does the AI receptionist speak?", acceptedAnswer: { '@type': 'Answer', text: "It replies in the language the patient writes in — English, Hindi, Marathi and more — switching automatically mid-conversation." } },
        { '@type': 'Question', name: "How long does setup take?", acceptedAnswer: { '@type': 'Answer', text: "Onboarding is done for you — WhatsApp connection and your treatments configured in your doctors' own words. Most clinics are live within a week." } },
      ],
    }],
    content: `
      <section><div class="ch-container ch-narrow">
        <h1 class="ch-hero-title">An AI receptionist that never misses a patient</h1>
        <p>Every call and WhatsApp message answered in seconds — nights, Sundays, lunch rush — in your patient's own language, and converted into a booked appointment. A busy clinic misses 20–30% of its calls; every missed enquiry is a patient who books with the next clinic on Google.</p>
        <p>AUMY's AI receptionist answers instantly, books appointments end-to-end, recovers missed calls over WhatsApp, follows up until patients decide, and hands over to your staff the moment they want to join. It is trained on your clinic's treatments, doctors and pricing — and it is the first stage of the Aumy patient journey: Convert, Care, Retain, Reactivate.</p>
      </div></section>`,
  },
  {
    slug: 'whatsapp-automation-for-clinics',
    title: 'WhatsApp Automation for Dental Clinics — Official API | AUMY',
    description:
      'AUMY automates your dental clinic\u2019s WhatsApp on the official Business API — instant replies, appointment booking, care-gap reminders, reactivation and review requests — with human takeover and booking attribution built in.',
    canonical: `${ORIGIN}/whatsapp-automation-for-clinics`,
    jsonld: [orgLd, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: "Is this the official WhatsApp API?", acceptedAnswer: { '@type': 'Answer', text: "Yes — AUMY uses the official WhatsApp Business API from Meta on your clinic's own verified number, following Meta's messaging rules, which is why numbers do not get blocked." } },
        { '@type': 'Question', name: "Is automated WhatsApp messaging spam?", acceptedAnswer: { '@type': 'Answer', text: "No — AUMY sends each patient the message relevant to them at the right moment: their care-gap reminder when due, after-care on the day of treatment, follow-ups while a plan is pending. Opt-outs are honoured instantly." } },
        { '@type': 'Question', name: "Can staff still use the WhatsApp number normally?", acceptedAnswer: { '@type': 'Answer', text: "Yes. The team sees every conversation and can take over any chat with one tap; the AI steps back the moment a human joins." } },
        { '@type': 'Question', name: "Do I need a new number or new software?", acceptedAnswer: { '@type': 'Answer', text: "No. AUMY connects to your existing WhatsApp number and runs alongside your existing practice software." } },
      ],
    }],
    content: `
      <section><div class="ch-container ch-narrow">
        <h1 class="ch-hero-title">WhatsApp automation built for dental clinics</h1>
        <p>India's patients live on WhatsApp. AUMY turns your clinic's number into a system that answers, books, follows up, closes care gaps and reactivates — on the official WhatsApp Business API, across the whole patient journey: Convert, Care, Retain, Reactivate.</p>
        <p>Unlike broadcast tools, every message is a conversation the AI actually continues: enquiries are nurtured until they book, after-treatment care goes out day by day, care gaps get followed up, lapsed patients get win-back journeys, and happy patients are guided to leave Google reviews. Campaigns run with start/end dates, daily caps and instant opt-out handling — and every booking is attributed back to the message that produced it.</p>
      </div></section>`,
  },
  {
    slug: '',
    title: 'Aumy — The Operating System for a Growing Dental Clinic',
    description:
      'Aumy manages the chaos that comes with growth — coordinating your patients, people and processes from the first enquiry to ongoing care: AI voice agent, appointments, follow-ups, digital intake and clinic tasks in one connected platform. Grow your clinic. Don’t grow the chaos.',
    canonical: `${ORIGIN}/`,
    ogImage: `${ORIGIN}/images/hero-dental.jpg`,
    jsonld: [orgLd, faqLd, videoLd, demoVideoLd],
    content: `
      <section><div class="ch-container ch-narrow">
        <p><strong>See it for yourself — live.</strong> WhatsApp our live demo dental clinic at +91 90223 12554 and have a real conversation, the way one of your patients would — ask about a treatment, book, reschedule or cancel, 24/7. No sign-up — just say hello.</p>
      </div></section>
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">The operating system for a growing dental clinic</p>
        <h1 class="ch-hero-title">Your clinic is growing. Don't let the chaos grow with it.</h1>
        <p class="ch-hero-sub">Aumy is the AI-powered operating system for dental clinics — managing patient journeys, follow-ups, appointments, calls, digital intake and clinic tasks in one connected platform.</p>
        <p>CONVERT → CARE → RETAIN → REACTIVATE</p>
        <p><strong>One platform. One patient context. Less manual work.</strong></p>
        <p><a href="/#how-it-works">See How Aumy Works</a> · <a href="/contact">Get started — risk-free</a></p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>A successful dental clinic doesn't necessarily have a patient-acquisition problem. It often has a coordination problem.</h2>
        <p>When chairs are full, growth creates chaos: calls, WhatsApp messages, enquiries, appointment confirmations, rescheduling, cancellations, no-shows, follow-ups, paperwork, consents, X-rays, invoices and patient questions.</p>
        <p><strong>Before Aumy:</strong> Growth → More patients → More calls → More WhatsApp → More follow-ups → More staff workload → More things falling through the cracks.</p>
        <p><strong>With Aumy:</strong> Growth → Aumy coordinates the work → Your team focuses on patients.</p>
        <p>When your clinic grows, Aumy makes sure the operational workload doesn't grow with it.</p>
        <h2>Aumy manages the chaos that comes with growth.</h2>
        <p>Coordinating your patients, people and processes from the first enquiry to ongoing care.</p>
        <ul>
          <li><strong>Patient communication</strong> — AI voice agent, answer calls, book appointments, appointment reminders, WhatsApp, patient queries, follow-ups.</li>
          <li><strong>Appointment orchestration</strong> — confirmations, rescheduling, cancellations, no-show management, waitlists, care gaps.</li>
          <li><strong>Digital clinic</strong> — digital registration, patient intake, consent, X-rays, invoices, paperless workflows.</li>
          <li><strong>Patient journey</strong> — pre-treatment, treatment, after-care, care gaps, doctor check-ins, reactivation.</li>
          <li><strong>Growth</strong> — Get Found, Meta Ads, lead capture, lead conversion.</li>
        </ul>
        <h2>Everything is connected. Think of Aumy as Jarvis for your dental clinic.</h2>
        <p>Not because it's a chatbot. Because everything knows what's happening. A patient calls → Aumy knows who they are. They need an appointment → Aumy knows the doctor's availability. They don't show → Aumy knows what happened. They need a follow-up → Aumy creates and manages it. They message after treatment → Aumy understands the treatment context. They have an overdue care gap → Aumy knows it. The clinic gets a call → the voice agent has the context.</p>
        <p>Your calls know your appointments. Your appointments know your patients. Your patients know their treatment. Your follow-ups know what happened. And Aumy knows all of it. One patient. One journey. One connected system.</p>
        <h2>Convert → Care → Retain → Reactivate. Aumy coordinates the work.</h2>
        <ul>
          <li><strong>CONVERT</strong> — Leads → Enquiries → Calls → Appointments → Bookings.</li>
          <li><strong>CARE</strong> — Registration → Intake → Consent → Treatment → After-care → Patient communication.</li>
          <li><strong>RETAIN</strong> — Appointment follow-ups → Care gaps → Doctor check-ins → Preventive care.</li>
          <li><strong>REACTIVATE</strong> — Old patients → Overdue treatment → Missed appointments → Inactive patients.</li>
        </ul>
        <p>So your clinic can grow without growing the chaos.</p>
        <h2>Full dental software included — or keep the one you have.</h2>
        <p><strong>Want one complete platform?</strong> AUMY includes a full Dental PMS: patient records &amp; appointments, FDI odontogram with 6-point perio charting, digital prescriptions, treatment plans, and complete billing, invoicing &amp; accounts — plus voice-powered charting where you talk and AUMY charts.</p>
        <p><strong>Happy with your current PMS?</strong> Keep it. Aumy runs on top and coordinates the patient journey — Convert, Care, Retain, Reactivate — with no migration and no retraining. Move onto the full platform later, whenever you choose. Same price either way.</p>
        <h2>A dedicated expert runs it with you.</h2>
        <p>You are never handed a login and left to work it out. An AUMY expert is assigned to your clinic on a permanent basis — they learn how your clinic runs, set AUMY up around it, operate the system with you, and review it with you every week. You get a calmer clinic; they carry the work.</p>
        <h2>We take on a handful of clinics at a time — and we are honest about fit.</h2>
        <p>AUMY works best for dental clinics that are already busy — from single-doctor practices to multi-chair centres — whose chairs are filling up and whose front desk is stretched, led by an owner who would rather run a calm clinic on one system than keep hiring to keep up. This is not built for every clinic, and that is deliberate — if it is not the right fit yet, we will tell you plainly.</p>
        <h2>Watch AUMY actually doing it.</h2>
        <p>Short, unedited demos of the live product - answering, booking, rescheduling and following up. New clip every day: <a href="https://www.youtube.com/watch?v=-qw1sp7Ub4k">Watch the whole patient journey, live and unedited</a>.</p>
        <h2>Busy clinics already run on AUMY.</h2>
        <p>Vinayaka Dental Care: fewer no-shows and patients coming back — "we didn't hire a single extra person to make it happen." AUM AI is an NVIDIA Inception member.</p>
        <h2>Grow your dental clinic. Not your administrative workload.</h2>
        <p>Aumy coordinates the manual tasks and patient journey behind your clinic, so your team can spend less time chasing patients and more time caring for them.</p>
        <h2>Try Aumy free for 30 days — see the difference yourself.</h2>
        <p>We set AUMY up on your clinic and you watch it work for 30 days alongside everything you use today — real calls and enquiries answered, real bookings made, forms gone digital. If the difference convinces you, we continue. If not, you walk away: no charges, no lock-in, no obligation to stay.</p>
        <h2>Questions clinic owners ask</h2>
        <p><strong>How does the 60-day money-back guarantee work?</strong> We set AUMY up on your clinic and it goes to work — real enquiries answered, real bookings made. If it does not meet your expectations in the first 60 days, you get your money back. No lock-in, and your data stays yours.</p>
        <p><strong>Do you have your own dental software (PMS)?</strong> Yes — a complete Dental PMS is included: records, appointments, charting, prescriptions, treatment plans and full billing &amp; accounts.</p>
        <p><strong>Do I have to replace my current software?</strong> No — AUMY works alongside what you already use, and you can move onto its full PMS whenever you choose.</p>
        <p><strong>Is my patient data safe?</strong> Yes — encrypted in transit and at rest, role-based access, private by design.</p>
        <p><strong>Is this a product or a service?</strong> Both — a proven system (AUMY), run and tailored for you by a partner.</p>
        <p><a href="/growth-audit">Get my free Clinic Audit</a></p>
      </div></section>`,
  },
  {
    slug: 'revenue-generator',
    title: 'How Aumy Works — The Operating System for a Growing Dental Clinic',
    description:
      'How Aumy manages the chaos that comes with growth: calls, WhatsApp, appointments, follow-ups, digital registration, intake, consent, X-rays and invoices on one connected platform — Convert, Care, Retain, Reactivate. Grow your clinic. Don’t grow the chaos.',
    canonical: `${ORIGIN}/revenue-generator`,
    ogImage: `${ORIGIN}/images/hero-dental.jpg`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">How Aumy works</p>
        <h1 class="ch-hero-title">Grow your clinic. Don't grow the chaos.</h1>
        <p class="ch-hero-sub">Aumy is the operating system for a growing dental clinic. It manages the chaos that comes with growth — coordinating your patients, people and processes from the first enquiry to ongoing care.</p>
        <p>CONVERT → CARE → RETAIN → REACTIVATE</p>
        <p><a href="/growth-audit">Get my free Clinic Audit</a> · <a href="/contact">Talk to us</a></p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>A successful dental clinic doesn't necessarily have a patient-acquisition problem. It often has a coordination problem.</h2>
        <p>When chairs are full, growth creates chaos: calls, WhatsApp messages, enquiries, appointment confirmations, rescheduling, cancellations, no-shows, follow-ups, paperwork, consents, X-rays, invoices and patient questions.</p>
        <p><strong>Before Aumy:</strong> Growth → More patients → More calls → More WhatsApp → More follow-ups → More staff workload → More things falling through the cracks.</p>
        <p><strong>With Aumy:</strong> Growth → Aumy coordinates the work → Your team focuses on patients.</p>
        <h2>Convert → Care → Retain → Reactivate. Aumy coordinates the work.</h2>
        <ul>
          <li><strong>CONVERT — from the first enquiry to a booking.</strong> Leads → Enquiries → Calls → Appointments → Bookings. Every call, WhatsApp message and ad enquiry answered, followed up and booked into a real slot. (AI voice agent · WhatsApp answers · Lead follow-up · Appointment booking)</li>
          <li><strong>CARE — everything around the treatment.</strong> Registration → Intake → Consent → Treatment → After-care → Patient communication. Digital registration and intake, consent signed on a phone or the clinic iPad, and treatment-specific after-care your doctors define. (Digital registration · Intake forms · Digital consent · After-care plans)</li>
          <li><strong>RETAIN — keeping patients on track.</strong> Appointment follow-ups → Care gaps → Doctor check-ins → Preventive care. Confirmations, rescheduling and no-show recovery handled in the conversation, and every care gap followed up on time. (Reminders &amp; confirmations · No-show recovery · Care gaps · Doctor check-ins)</li>
          <li><strong>REACTIVATE — bringing patients back.</strong> Old patients → Overdue treatment → Missed appointments → Inactive patients. Patients who drifted away invited back in your doctors' own words. (Inactive patients · Overdue treatment · Missed appointments · Stalled treatment plans)</li>
        </ul>
        <h2>The work around your chairs, handled.</h2>
        <ul>
          <li><strong>Patient communication</strong> — AI voice agent that answers calls, books appointments, appointment reminders, WhatsApp and patient queries, follow-ups, one-tap human takeover.</li>
          <li><strong>Appointment orchestration</strong> — confirmations, rescheduling and cancellations, no-show management, waitlists for earlier slots, care gaps.</li>
          <li><strong>Digital clinic</strong> — digital registration, patient intake with signature, digital consent, X-rays and documents on the record, invoices and payments, paperless workflows.</li>
          <li><strong>Patient journey</strong> — pre-treatment instructions, treatment records and charting, after-care, care gaps, doctor check-ins, reactivation.</li>
          <li><strong>Growth</strong> — Get Found on Google, reviews, Meta Ads, lead capture, lead conversion.</li>
        </ul>
        <h2>Think of Aumy as Jarvis for your dental clinic.</h2>
        <p>Not because it's a chatbot. Because everything knows what's happening. A patient calls → Aumy knows who they are. They need an appointment → Aumy knows the doctor's availability. They don't show → Aumy knows what happened. They need a follow-up → Aumy creates and manages it. They message after treatment → Aumy understands the treatment context. They have an overdue care gap → Aumy knows it. The clinic gets a call → the voice agent has the context.</p>
        <p>Your calls know your appointments. Your appointments know your patients. Your patients know their treatment. Your follow-ups know what happened. And Aumy knows all of it. <strong>One patient. One journey. One connected system.</strong></p>
        <h2>Examine first. Prescribe after.</h2>
        <p>We understand how your clinic runs, find where work gets stuck and patients fall through the cracks, set Aumy up around your clinic, and measure it with you every week.</p>
        <p><a href="/growth-audit">Get my free Clinic Audit</a></p>
      </div></section>`,
  },
  {
    slug: 'growth-audit',
    title: 'Free Clinic Audit for Dental Clinics | AUM AI',
    description:
      'A free audit for your dental clinic: where work gets stuck and patients slip through the cracks, where you rank on Google versus the clinics near you, and what each gap is worth. Prepared for your clinic within 24 hours.',
    canonical: `${ORIGIN}/growth-audit`,
    content: `
      <section class="ch-hero"><div class="ch-container">
        <p class="ch-eyebrow">Free Clinic Audit</p>
        <h1 class="ch-hero-title">See where work gets stuck in your clinic — and where patients slip through the cracks.</h1>
        <p class="ch-hero-sub">Tell us your clinic and city. Within 24 hours you get an audit prepared for your clinic — not an automated template.</p>
        <ul>
          <li>Where you rank on Google versus the clinics near you — and why.</li>
          <li>How visible you are to the patients searching in your area right now.</li>
          <li>Where enquiries, follow-ups and appointments slip through the cracks — and what each gap is worth.</li>
        </ul>
        <p>Free. No obligation. Reviewed by a person before it reaches you.</p>
      </div></section>`,
  },
  {
    slug: 'leak-calculator',
    title: 'What Slips Through the Cracks? A 60-Second Check for Dental Clinics | AUM AI',
    description:
      'When a dental clinic is stretched, enquiries go unanswered, no-shows go unrecovered and patients never come back. A 60-second, deliberately conservative estimate of what that is worth.',
    canonical: `${ORIGIN}/leak-calculator`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">60-second check</p>
        <h1 class="ch-hero-title">What slips through the cracks when your clinic is stretched?</h1>
        <p class="ch-hero-sub">When chairs are full, enquiries go unanswered, follow-ups stall, no-shows go unrecovered and patients quietly never come back. Answer six honest questions about your clinic — enquiries, missed follow-ups, no-shows, patients who never return, and average treatment value — and see an estimate of what that is worth every year. Deliberately conservative math: we undercount on purpose.</p>
        <p><a href="/growth-audit">See where work gets stuck in your clinic — free audit</a></p>
      </div></section>`,
  },
  {
    slug: 'switch',
    title: 'Switch Dental Software Without Losing a Single Record — Move to AUMY | AUM AI',
    description:
      'Whatever dental software your clinic uses today, AUMY keeps your data in sync from day one. Ready for one connected platform? We migrate patients, appointments, treatment history, notes and images into AUMY for a one-time migration fee. No downtime.',
    canonical: `${ORIGIN}/switch`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">Moving from your current dental software</p>
        <h1 class="ch-hero-title">Switch without losing a single patient record.</h1>
        <p class="ch-hero-sub">Your data is not locked in. Whatever software your clinic runs today, AUMY keeps your data in sync with it from day one. When you are ready for one connected platform, we migrate patients, appointment history, treatment history, clinical notes, X-rays and images into AUMY for a one-time migration fee — with no downtime and nothing re-typed.</p>
        <h2>How the move works</h2>
        <ol>
          <li><b>Sync</b> — AUMY keeps your current software and AUMY in step from day one.</li>
          <li><b>Run on top</b> — Convert, Care, Retain and Reactivate start working on the synced data.</li>
          <li><b>Migrate when you are ready</b> — full history moved, counts verified with you, sync kept running until you switch the old system off.</li>
        </ol>
        <p><a href="/contact">Book a migration call</a> · <a href="/pricing">See pricing</a> · <a href="/revenue-generator">How Aumy works</a></p>
      </div></section>`,
  },
  {
    slug: 'missed-call-calculator',
    title: 'Missed Call Calculator for Dental Clinics — What Unanswered Calls Cost | AUMY',
    description:
      'How much revenue is your dental clinic losing to missed calls? Enter your missed calls per month and average treatment value — get a deliberately conservative monthly and yearly estimate. Free, no sign-up.',
    canonical: `${ORIGIN}/missed-call-calculator`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">Missed call calculator</p>
        <h1 class="ch-hero-title">What is that unanswered phone costing you?</h1>
        <p class="ch-hero-sub">Every missed call was a patient ready to talk at that exact moment. Four honest answers — missed calls per month from your phone's call log, how many were potential new patients, how many enquiries you normally convert, and your average first-treatment value — and you'll know what those calls are worth per month and per year. Deliberately conservative: first treatment only, no lifetime value, no referrals, not a single implant case counted.</p>
        <p><a href="/growth/dental-clinic-missed-calls-revenue-loss">Read how much revenue missed calls really cost</a> · <a href="/leak-calculator">Run the complete 60-second check</a> · <a href="/growth-audit">Get my free Clinic Audit</a></p>
      </div></section>`,
  },
  {
    slug: 'contact',
    title: 'Contact AUM AI — Clinic Growth & Healthcare Engineering',
    description:
      'Talk to AUM AI: a growth strategy call for your dental clinic, or a build partner for your healthcare product. We reply within 24 hours.',
    canonical: `${ORIGIN}/contact`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <h1 class="ch-hero-title">Get in touch.</h1>
        <p class="ch-hero-sub">Tell us what you need — a growth strategy call for your clinic, or a build partner for your product. We reply within 24 hours.</p>
        <p><strong>Clinics:</strong> We&rsquo;re not onboarding new clinics until 15 October 2026. You can still get your price or send us your details &mdash; we&rsquo;ll add you to the waitlist and reach out when onboarding reopens.</p>
        <p><strong>India:</strong> AUM AI Healthcare Solutions &middot; Pune, Maharashtra, India &middot; jayesh.chaudhari@aumai.co.in &middot; +91 800 718 9868</p>
        <p><strong>United States:</strong> AUM AI Healthcare Technology LLC &middot; 30 N Gould St, Ste N, Sheridan, WY 82801 &middot; jayesh@aumyai.com &middot; +1 (307) 263-5098</p>
      </div></section>`,
  },
];

routes.push({
  slug: 'podcast',
  title: 'The Dental Growth Podcast — Be a Guest | Conversations on the Business of Dentistry in India',
  description:
    'A podcast about the business of dentistry in India: growth, patients, marketing, operations and practice economics — told by the dentists, orthodontists, dental marketers, educators and entrepreneurs living it. Apply to be a guest.',
  canonical: `${ORIGIN}/podcast`,
  content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">The Dental Growth Podcast</p>
        <h1 class="ch-hero-title">The business of dentistry, told by the people living it.</h1>
        <p class="ch-hero-sub">Honest conversations with Indian dentists and the people who help them grow — how practices actually get patients, what marketing really costs, why leads vanish, how a solo clinic becomes three chairs. No clinical lectures, no product pitches.</p>
        <p>We're looking for guests: dentists and practice owners with a growth story, orthodontists and specialists, dental entrepreneurs (chains, labs, products), dental marketers, consultants and educators. 40 minutes, online or in person (Pune). Free — guests never pay and never get paid. Apply on this page, or WhatsApp +91 800 718 9868 with "podcast".</p>
      </div></section>`,
});

// ---- Config-driven calculators — one crawler page per entry ---------------
for (const c of CALCULATORS) {
  routes.push({
    slug: c.slug,
    title: c.seoTitle,
    description: c.seoDescription,
    canonical: `${ORIGIN}/${c.slug}`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(c.eyebrow)}</p>
        <h1 class="ch-hero-title">${esc(c.heroTitle)}</h1>
        <p class="ch-hero-sub">${esc(c.heroSub)}</p>
        <p><a href="${c.relatedArticle.href}">Read ${esc(c.relatedArticle.label)}</a> · <a href="/leak-calculator">Run the complete 60-second check</a> · <a href="/growth-audit">Get my free Clinic Audit</a></p>
      </div></section>`,
  });
}

// ---- Dental Practice Growth Hub — hub page + one route per article --------
// Article bodies are already HTML strings, injected verbatim so crawlers see
// the full text. BlogPosting JSON-LD makes each eligible for article treatment.
routes.push({
  slug: 'growth',
  title: 'Dental Practice Growth Hub — Missed Calls, Follow-Up, Care Gaps & More | Aumy',
  description:
    'Practical, India-specific guides for dental clinic owners: what missed calls really cost, how to follow up leads until they book, how many patients sit in your care-gap list — with real numbers and real WhatsApp messages, no jargon.',
  canonical: `${ORIGIN}/growth`,
  content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">Dental Practice Growth</p>
        <h1 class="ch-hero-title">Practical answers to "why isn't my clinic growing faster?"</h1>
        <p class="ch-hero-sub">No jargon, no hype. Real numbers, real WhatsApp messages, and systems you can run this week — written from daily conversations with Indian dental clinic owners.</p>
      </div></section>
      <section><div class="ch-container ch-narrow">` +
    growthPosts
      .map(
        (p) =>
          `<h2><a href="/growth/${p.slug}">${esc(p.title)}</a></h2><p>${esc(p.excerpt)}</p>`
      )
      .join('') +
    `<p><a href="/growth-audit">Get my free Clinic Audit</a> · <a href="/leak-calculator">Try the 60-second check</a></p>
      </div></section>`,
});
for (const p of growthPosts) {
  routes.push({
    slug: `growth/${p.slug}`,
    title: `${p.title} | Aumy Growth Hub`,
    description: p.description,
    canonical: `${ORIGIN}/growth/${p.slug}`,
    // Social shares of articles need an image; the dental hero is the site
    // default until articles get their own art.
    ogImage: `${ORIGIN}/images/hero-dental.jpg`,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        author: { '@type': 'Person', name: p.author },
        publisher: {
          '@type': 'Organization',
          name: 'AUM AI Healthcare Solutions',
          logo: { '@type': 'ImageObject', url: `${ORIGIN}/aumy-mark-512.png` },
        },
        mainEntityOfPage: `${ORIGIN}/growth/${p.slug}`,
      },
    ],
    content: `
      <article><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(p.category)}</p>
        <h1 class="ch-hero-title">${esc(p.title)}</h1>
        <p>${esc(p.author)} · ${p.date} · ${esc(p.readingTime)}</p>
        ${p.body}
        <h2>Want to know what this looks like in your clinic?</h2>
        <p>Get a free Clinic Audit: where work gets stuck in your clinic and enquiries, appointments and returning patients slip through the cracks — and what each gap is worth. <a href="/growth-audit">Get my free Clinic Audit</a> · <a href="/leak-calculator">Run the 60-second check</a>. Want to see what this actually looks like? <a href="https://wa.me/918007189868?text=Hi">WhatsApp AUMY</a> — a live AI receptionist for a demo dental clinic (+91 80071 89868), any time, no sales call.</p>
      </div></article>`,
  });
}

// Write each route to BOTH <slug>.html and <slug>/index.html so it serves
// correctly regardless of nginx config:
//   - current `try_files $uri $uri/ /index.html`   -> serves <slug>/index.html (301 adds slash)
//   - upgraded `try_files $uri $uri.html $uri/ ...` -> serves <slug>.html directly (no redirect,
//     so the served URL matches the slashless canonical + internal links)
// US build: single landing route with US metadata + crawler-visible US copy.
const usRoutes = [
  {
    slug: '',
    title: 'Aumy — The Operating System for a Growing Dental Practice',
    description:
      'Aumy manages the chaos that comes with growth — coordinating your patients, people and processes from the first call to ongoing care: AI voice agent, texts, appointments, follow-ups, intake, consent and care gaps on one connected platform. Grow your practice. Don’t grow the chaos.',
    canonical: `${ORIGIN}/`,
    ogImage: `${ORIGIN}/images/hero-dental.jpg`,
    jsonld: [orgLd, demoVideoLd],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">The operating system for a growing dental practice</p>
        <h1 class="ch-hero-title">Grow your practice. Don't grow the chaos.</h1>
        <p class="ch-hero-sub">Aumy manages the chaos that comes with growth — coordinating your patients, people and processes from the first call to ongoing care. Calls answered, texts replied to, appointments confirmed, follow-ups sent and care gaps closed, on one connected platform.</p>
        <p class="ch-hero-chain">CONVERT → CARE → RETAIN → REACTIVATE</p>
        <h2>A successful dental practice doesn't necessarily have a patient-acquisition problem. It often has a coordination problem.</h2>
        <p>When the schedule is full, growth creates chaos: calls, texts, enquiries, confirmations, rescheduling, cancellations, no-shows, follow-ups, paperwork, consents, X-rays, invoices and patient questions. Before Aumy: growth → more patients → more calls → more texts → more follow-ups → more front-desk workload → more things falling through the cracks. With Aumy: growth → Aumy coordinates the work → your team focuses on patients.</p>
        <h2>Convert → Care → Retain → Reactivate. Aumy coordinates the work.</h2>
        <ul>
          <li><strong>Convert</strong> — every call, text and web enquiry answered, followed up and booked into a real slot.</li>
          <li><strong>Care</strong> — registration and intake before the visit, digital consent, and after-care your doctors define.</li>
          <li><strong>Retain</strong> — confirmations, rescheduling, no-shows and care gaps followed up on time.</li>
          <li><strong>Reactivate</strong> — patients who drifted away invited back in your doctors' own words.</li>
        </ul>
        <h2>What Aumy manages</h2>
        <ul>
          <li><strong>Patient communication</strong> — AI voice agent, texts and web chat, reminders, follow-ups, one-tap human takeover.</li>
          <li><strong>Appointment orchestration</strong> — confirmations, rescheduling, cancellations, no-shows, waitlists, care gaps.</li>
          <li><strong>Digital practice</strong> — digital registration, intake with signature, consent, X-rays and documents, invoices.</li>
          <li><strong>Patient journey</strong> — pre-treatment instructions, after-care, care gaps, doctor check-ins, reactivation.</li>
          <li><strong>Growth</strong> — Google Business Profile, reviews, ad attribution, lead capture and conversion.</li>
        </ul>
        <h2>Think of Aumy as Jarvis for your dental practice.</h2>
        <p>Not because it's a chatbot. Because everything knows what's happening. Your calls know your appointments. Your appointments know your patients. Your patients know their treatment. Your follow-ups know what happened. And Aumy knows all of it. One patient. One journey. One connected system.</p>
        <p>Security &amp; HIPAA: we sign a BAA with your practice, log every access, and send no patient data to any AI or telecom subprocessor until its BAA is signed. Consent-first texting with automatic STOP/HELP handling.</p>
        <p>Watch short, unedited demos of the live product - a new clip every day: <a href="https://www.youtube.com/watch?v=-qw1sp7Ub4k">Watch the whole patient journey, live and unedited</a>.</p>
        <p>Book a 30-minute call: https://calendar.app.google/tecaeebTBEWSoJnV7 &middot; jayesh@aumyai.com &middot; +1 (307) 263-5098</p>
        <p>AUM AI Healthcare Technology LLC &middot; 30 N Gould St, Ste N, Sheridan, WY 82801</p>
      </div></section>`,
  },
];

// Business Manager and the leak check were NOT prerendered, so crawlers
// received an empty <div id="root"> for both — the BM page is the URL our own
// ads point at, and it had no indexable content at all.
usRoutes.push(
  {
    slug: 'business-manager',
    title:
      'AI Employee for Small Business & Ecommerce — WhatsApp, Sales Calls & True ROAS | Aumy Business Manager',
    description:
      'An AI Employee that answers every customer on WhatsApp, Instagram, Facebook and phone, makes human-sounding outbound sales calls, books meetings, recovers abandoned carts, and traces every ad dollar to real revenue. Shopify & WooCommerce ready. 7-day free trial, no card.',
    canonical: `${ORIGIN}/business-manager`,
    jsonld: [softwareLd, bmFaqLd, demoVideoLd],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">Aumy Business Manager</p>
        <h1 class="ch-hero-title">The AI that answers, calls, books - and proves what your ads really earn.</h1>
        <p class="ch-hero-sub">One platform for any business: an AI Employee on WhatsApp, Instagram, Facebook, web chat and phone; an AI that makes outbound sales calls in a human voice; meetings booked straight onto your calendar; and ad reporting that shows the real revenue behind every dollar, not clicks. Seven-day free trial, no card.</p>
      </div></section>
      <section><div class="ch-container">
        <h2>What it does</h2>
        <ul>
          <li><strong>An AI Employee on every channel</strong> - WhatsApp, Instagram, Facebook, web chat and phone. It answers as your business, quotes from your catalogue, handles objections and books, around the clock.</li>
          <li><strong>Outbound calls that sound human</strong> - upload a prospect list or pick any audience; the AI calls, qualifies, works your objection playbook and puts demos on your calendar.</li>
          <li><strong>Ad spend to real revenue</strong> - pixel and server-side tracking with an identity graph: the lifetime revenue every campaign, ad set and ad actually produced.</li>
          <li><strong>Campaigns in plain words</strong> - "Call everyone who abandoned checkout this week." The AI builds the audience, the messages and the call script. You approve. It runs.</li>
          <li><strong>Your store, wired in</strong> - Shopify and WooCommerce orders flow in automatically: abandoned-cart recovery, delivery follow-ups, repeat-purchase campaigns.</li>
          <li><strong>Your catalogue, quoted correctly</strong> - products, prices and packages in one place, so the AI answers "how much?" from real data. Orders and invoices follow.</li>
          <li><strong>Content Studio</strong> - turn one photo into a caption, a post and a story in your brand voice, published to Instagram, Facebook and Google.</li>
          <li><strong>Get Found on Google</strong> - manage your Google Business Profile, publish posts automatically and earn a steady stream of real reviews, so you climb the local map pack.</li>
          <li><strong>A sales pipeline that fills itself</strong> - every enquiry becomes a tracked lead with its source, conversation and value.</li>
          <li><strong>Human takeover</strong> - a shared inbox where your team can step into any conversation mid-chat and hand it back.</li>
          <li><strong>Ask your data anything</strong> - live dashboards for revenue, channels and campaigns, plus plain-English questions answered from your own numbers.</li>
        </ul>
        <h2>Keep your marketing team. Give them better data.</h2>
        <p>We do not run your ads and we do not replace your agency. What changes is what Meta and Google learn: the moment a click turns into a real sale, we send that revenue back to the ad platform. It stops optimising for whoever clicks and starts finding more people like the customers who actually buy - higher ROAS on the same spend, lower cost per purchase, and every campaign traced to real revenue. Conversions are sent hashed and server-side with event de-duplication, so your existing pixel and ours run side by side without double-counting.</p>
        <h2>Who it is for</h2>
        <ul>
          <li><strong>Ecommerce and D2C brands</strong> - Shopify and WooCommerce stores running Meta ads.</li>
          <li><strong>Local and service businesses</strong> - salons, gyms and studios, clinics, restaurants, real estate and home services.</li>
          <li><strong>B2B and high-ticket sales teams</strong> - coaches, consultants, education and SaaS.</li>
          <li><strong>Marketing agencies</strong> - run every client from one workspace, priced per managed client.</li>
        </ul>
        <h2>See it working</h2>
        <p>Short, unedited demos of the AI Employee answering on WhatsApp and social, quoting from a catalogue, making an outbound call and booking a meeting. New clip every day: <a href="https://www.youtube.com/watch?v=-qw1sp7Ub4k">Watch the demo</a>.</p>
        <h2>Pricing</h2>
        <p>Basic $77/mo - ads and pixel, AI Employee, campaigns, CRM and meetings (1,100 messages, 33 voice minutes). Growth $237/mo - adds AI voice campaigns with playbooks (3,300 messages, 132 voice minutes). Pro $397/mo (11,000 messages, 330 voice minutes). Scale $549/mo (unlimited messages under fair use, 1,100 voice minutes). Around 20% less than comparable platforms, with the AI Employee, WhatsApp and in-plan voice minutes included rather than sold as add-ons. Yearly billing is two months free. Every plan starts with a 7-day free trial, no card required.</p>
      </div></section>`,
  },
  {
    slug: 'leak-calculator',
    title: 'What Slips Through the Cracks? A 60-Second Check for Dental Practices | AUM AI',
    description:
      'When a dental practice is stretched, calls go unanswered, no-shows go unrecovered and patients never reappoint. A 60-second, deliberately conservative estimate of what that is worth. Free, no sign-up.',
    canonical: `${ORIGIN}/leak-calculator`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">60-second check</p>
        <h1 class="ch-hero-title">What slips through the cracks when your practice is stretched?</h1>
        <p class="ch-hero-sub">Answer six honest questions about your practice - new patient enquiries per week, how many never get a reply, appointments per week, no-show rate, patients who never reappoint, and average production per visit - and see an estimate of what slips through every year. Deliberately conservative: only 35% of missed enquiries are counted as lost bookings, only half of no-shows are counted, just three visits per lapsed patient, and 48 working weeks. Your real number is almost certainly higher.</p>
      </div></section>`,
  }
);

const activeRoutes = MARKET === 'us' ? usRoutes : routes;
let written = 0;
for (const r of activeRoutes) {
  const html = apply(template, r);
  if (!r.slug) {
    fs.writeFileSync(path.join(BUILD, 'index.html'), html);
  } else {
    // Nested slugs (growth/<article>) need their parent dir to exist before
    // the flat <slug>.html write.
    const flat = path.join(BUILD, `${r.slug}.html`);
    fs.mkdirSync(path.dirname(flat), { recursive: true });
    fs.writeFileSync(flat, html);
    fs.mkdirSync(path.join(BUILD, r.slug), { recursive: true });
    fs.writeFileSync(path.join(BUILD, r.slug, 'index.html'), html);
  }
  written += 1;
  console.log(`prerendered /${r.slug}`);
}
console.log(`\nprerender: wrote ${written} route(s).`);
