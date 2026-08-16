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
  out = out.replace(
    '<div id="root"></div>',
    `<div id="root"><div class="ch-home">${r.content}</div></div>`
  );
  return out;
}

// ---- shared JSON-LD helpers ----------------------------------------------
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ['How does the 10-day free trial work?', 'We set AUMY up on your clinic and you watch it work for 10 days — real enquiries answered, real bookings made. Continue only if you see the difference. If not, you walk away: no charges, no lock-in, and your data stays yours.'],
    ['Do I have to replace my current software?', 'No. AUMY works alongside what you already use — it adds the growth and engagement layer on top.'],
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
  name: 'AI Receptionist for Dental Clinics \u2014 Full Live Demo (Unedited)',
  description:
    'An unedited walkthrough of AUMY running a dental clinic front desk on a real WhatsApp number: answering a patient at night, verifying identity before discussing anything personal, moving an appointment earlier, following up a stalled treatment, and feeding real bookings back to Meta and Google.',
  thumbnailUrl: 'https://i.ytimg.com/vi/Jna2UXPxBmI/maxresdefault.jpg',
  embedUrl: 'https://www.youtube.com/embed/Jna2UXPxBmI',
  contentUrl: 'https://www.youtube.com/watch?v=Jna2UXPxBmI',
  uploadDate: '2026-08-08',
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
    slug: '',
    title: 'AUMY — Never Lose Revenue to Missed Calls & Follow-Ups | AI Patient Conversion & Revenue Recovery for Dental Clinics',
    description:
      'AUMY is the AI Patient Conversion & Revenue Recovery System for dental clinics — every call and message answered in seconds, every lead followed up until it books, missed appointments, due recalls and dormant patients recovered automatically. Live in clinics; one grew 20–25% in 2–3 months.',
    canonical: `${ORIGIN}/`,
    ogImage: `${ORIGIN}/images/hero-dental.jpg`,
    jsonld: [orgLd, faqLd, videoLd, demoVideoLd],
    content: `
      <section><div class="ch-container ch-narrow">
        <p><strong>See it for yourself — live.</strong> Message our AI receptionist for a demo dental clinic on WhatsApp at +91 80071 89868 and watch it answer, book, reschedule and cancel appointments, 24/7. No sign-up — just say hello.</p>
      </div></section>
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">The AI Patient Conversion & Revenue Recovery System for dental clinics</p>
        <h1 class="ch-hero-title">Never lose revenue to missed calls &amp; follow-ups again.</h1>
        <p class="ch-hero-sub">Every call and message answered in seconds. Every lead followed up until it books. Every missed appointment, due recall and drifting patient — recovered, automatically. AUMY makes sure the revenue your clinic already earned never slips through the cracks.</p>
        <p><a href="/contact">Start my 10-day free trial</a> · <a href="/growth-audit">Get my free Clinic Growth Audit</a></p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>Dentistry changed. Great work and a good location are no longer enough.</h2>
        <p>Before a patient ever sits in your chair, an ad reaches them first, they check your Google reviews, and they call or message your clinic — and if no one answers, they move to the next name in the results. Winning patients now runs on systems, not skill alone.</p>
        <ul>
          <li>The phone rings while your team is with a patient, or after hours. That caller books somewhere else.</li>
          <li>A patient no-shows. The chair sits empty. No one had time to fill it.</li>
          <li>An enquiry asks a question, gets no reply, and quietly disappears.</li>
          <li>Patients you treated once never come back — and no one reminds them.</li>
          <li>On Google, the clinic down the road shows up above you.</li>
          <li>You spend on ads every month — shown to the same people — with no idea which ones become patients.</li>
        </ul>
        <h2>One system. The entire patient journey.</h2>
        <p>From first enquiry to ongoing care, AUMY manages the patient relationship beyond the appointment — four stages, one connected engine:</p>
        <ul>
          <li><strong>CONVERT — turn enquiries into booked patients.</strong> Every enquiry from WhatsApp, Instagram, a missed call or your website answered in seconds, 24/7, across chat and phone; leads followed up until they book, no-shows recovered and refilled.</li>
          <li><strong>CARE — look after patients beyond the chair.</strong> Treatment Care Plans: your doctors define what a patient should hear after an implant, a root canal or whitening — the day-1 recovery check, care tips, the one-month follow-up — and AUMY delivers it consistently, flagging replies that need the clinic.</li>
          <li><strong>RETAIN — bring patients back for ongoing care.</strong> Cleaning recalls, periodic check-ups and treatment maintenance, sent personally and on time.</li>
          <li><strong>REACTIVATE — win back patients who drifted away.</strong> Dormant patients, overdue recalls and stalled treatment plans re-engaged automatically.</li>
        </ul>
        <p>Underneath the four stages sits the machinery: the AI receptionist across WhatsApp and phone, Google Business Profile and reviews, Instagram and Facebook, the Content Studio, and ad spend that learns from real bookings via the Conversions API.</p>
        <p>None of this is a one-off push. Every patient captured, review earned and slot saved feeds the next — organic growth that builds on itself, month after month.</p>
        <h2>A dedicated growth expert runs it for you.</h2>
        <p>You are never handed a login and left to work it out. A growth expert is assigned to your clinic on a permanent basis — they learn how your practice runs, build the strategy, operate the entire system on your behalf, and review results with you every week. You get the outcome; they carry the work.</p>
        <h2>We take on a handful of clinics at a time — and we are honest about fit.</h2>
        <p>AUMY works best for dental, dermatology and aesthetics clinics serious about growth — from single-doctor practices to multi-chair centres — led by a founder or owner who makes the growth calls and would rather grow with a system than by hiring more front-desk staff. This is not built for every clinic, and that is deliberate — if it is not the right fit yet, we will tell you plainly.</p>
        <h2>Watch AUMY actually doing it.</h2>
        <p>Short, unedited demos of the live product - answering, booking, rescheduling and following up. New clip every day: <a href="https://www.youtube.com/watch?v=Jna2UXPxBmI">Watch the full 40-minute demo</a>.</p>
        <h2>Clinics are already growing with us.</h2>
        <p>Vinayaka Dental Care grew revenue about 25% in two months without hiring a single extra person. Vinayaka Derma keeps a 4.9-star Google rating with recalls and follow-ups running automatically. AUM AI is an NVIDIA Inception member.</p>
        <h2>Try AUMY free for 10 days — see the difference yourself.</h2>
        <p>We set AUMY up on your clinic and you watch it work for 10 days alongside everything you use today — real enquiries answered, real bookings made. If the difference convinces you, we continue. If not, you walk away: no charges, no lock-in, no obligation to stay.</p>
        <h2>Questions clinic owners ask</h2>
        <p><strong>How does the 10-day free trial work?</strong> We set AUMY up on your clinic and you watch it work for 10 days. Continue only if you see the difference — no charges, no lock-in, and your data stays yours.</p>
        <p><strong>Do I have to replace my current software?</strong> No — AUMY works alongside what you already use.</p>
        <p><strong>Is my patient data safe?</strong> Yes — encrypted in transit and at rest, role-based access, private by design.</p>
        <p><strong>Is this a product or a service?</strong> Both — a proven system (AUMY), run and tailored for you by a partner.</p>
        <p><a href="/growth-audit">Get my free Clinic Growth Audit</a></p>
      </div></section>`,
  },
  {
    slug: 'revenue-generator',
    title: 'How AUMY Works — Recover Lost Clinic Revenue | AUM AI',
    description:
      'AUMY recovers the revenue dental & aesthetic clinics leak every day: it captures every enquiry, books it, wins back patients who drift, feeds real bookings back to Meta so ads get smarter, and proves recovered revenue on a live dashboard.',
    canonical: `${ORIGIN}/revenue-generator`,
    ogImage: `${ORIGIN}/images/hero-dental.jpg`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">How AUMY works</p>
        <h1 class="ch-hero-title">Recover the revenue your clinic is already leaking.</h1>
        <p class="ch-hero-sub">AUMY finds where your clinic leaks revenue and closes every gap. It captures every enquiry, books it, wins back patients who drift away, and makes your ad spend work harder — with the recovered revenue proven on a live dashboard.</p>
        <p><a href="/growth-audit">Get my free Clinic Growth Audit</a></p>
      </div></section>
      <section><div class="ch-container">
        <h2>Four things, working as one.</h2>
        <ul>
          <li><strong>Catch every lead</strong> — Instagram, WhatsApp, a missed call, a walk-in, Google or an ad — every enquiry instantly opens a WhatsApp conversation.</li>
          <li><strong>Book it and keep the slot</strong> — AUMY answers, qualifies and books in seconds, 24/7 — then reminds, confirms and rebooks the few who still miss.</li>
          <li><strong>Revive patients you have</strong> — overdue and dormant patients are re-engaged automatically, reactivating revenue you already paid to acquire.</li>
          <li><strong>Keep them for life</strong> — timely follow-ups, helpful content in your name, and well-timed review prompts, so patients return and refer.</li>
        </ul>
        <h2>Your ads learn from your real patients.</h2>
        <p>The moment a lead books or pays, AUMY sends that real conversion straight to Meta &amp; Google — so your budget finds more people like the patients who actually show up. Cost per genuine lead drops as lead quality climbs, privacy-safe, with no patient data exposed.</p>
      </div></section>`,
  },
  {
    slug: 'growth-audit',
    title: 'Free Clinic Growth Audit for Dental & Aesthetic Clinics | AUM AI',
    description:
      'A free growth audit for your dental or aesthetic clinic: where you rank on Google versus the clinics near you, how visible you are to new patients, and the specific gaps quietly costing you bookings. Prepared for your clinic within 24 hours.',
    canonical: `${ORIGIN}/growth-audit`,
    content: `
      <section class="ch-hero"><div class="ch-container">
        <p class="ch-eyebrow">Free Clinic Growth Audit</p>
        <h1 class="ch-hero-title">See exactly where your clinic is leaking — and how much.</h1>
        <p class="ch-hero-sub">Tell us your clinic and city. Within 24 hours you get a growth audit prepared for your clinic — not an automated template.</p>
        <ul>
          <li>Where you rank on Google versus the clinics near you — and why.</li>
          <li>How visible you are to the patients searching in your area right now.</li>
          <li>The specific gaps quietly costing you bookings, and what each one is worth.</li>
        </ul>
        <p>Free. No obligation. Reviewed by a person before it reaches you.</p>
      </div></section>`,
  },
  {
    slug: 'leak-calculator',
    title: 'Clinic Revenue Leak Calculator — Dental & Aesthetic | AUM AI',
    description:
      'A 60-second, deliberately conservative estimate of the revenue quietly leaking from your dental or aesthetic clinic — missed enquiries, no-shows, and patients who never come back.',
    canonical: `${ORIGIN}/leak-calculator`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">60-second leak check</p>
        <h1 class="ch-hero-title">How much is quietly leaking from your clinic?</h1>
        <p class="ch-hero-sub">Answer six honest questions about your clinic — enquiries, missed follow-ups, no-shows, patients who never return, and average treatment value — and see an estimate of the revenue leaking every year. Deliberately conservative math: we undercount on purpose, so your real number is almost certainly higher.</p>
        <p><a href="/growth-audit">Find out where your number hides — free audit</a></p>
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
        <p><a href="/growth/dental-clinic-missed-calls-revenue-loss">Read how much revenue missed calls really cost</a> · <a href="/leak-calculator">Run the complete 60-second leak check</a> · <a href="/growth-audit">Get my free Revenue Leak Audit</a></p>
      </div></section>`,
  },
  {
    slug: 'contact',
    title: 'Contact AUM AI — Clinic Growth & Healthcare Engineering',
    description:
      'Talk to AUM AI: a growth strategy call for your dental or aesthetic clinic, or a build partner for your healthcare product. We reply within 24 hours.',
    canonical: `${ORIGIN}/contact`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <h1 class="ch-hero-title">Get in touch.</h1>
        <p class="ch-hero-sub">Tell us what you need — a growth strategy call for your clinic, or a build partner for your product. We reply within 24 hours.</p>
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
        <p><a href="${c.relatedArticle.href}">Read ${esc(c.relatedArticle.label)}</a> · <a href="/leak-calculator">Run the complete 60-second leak check</a> · <a href="/growth-audit">Get my free Revenue Leak Audit</a></p>
      </div></section>`,
  });
}

// ---- Dental Practice Growth Hub — hub page + one route per article --------
// Article bodies are already HTML strings, injected verbatim so crawlers see
// the full text. BlogPosting JSON-LD makes each eligible for article treatment.
routes.push({
  slug: 'growth',
  title: 'Dental Practice Growth Hub — Missed Calls, Follow-Up, Recall & More | AUMY',
  description:
    'Practical, India-specific guides for dental clinic owners: what missed calls really cost, how to follow up leads until they book, how much revenue sits in your recall list — with real numbers and real WhatsApp messages, no jargon.',
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
    `<p><a href="/growth-audit">Get my free Revenue Leak Audit</a> · <a href="/leak-calculator">Try the 60-second leak calculator</a></p>
      </div></section>`,
});
for (const p of growthPosts) {
  routes.push({
    slug: `growth/${p.slug}`,
    title: `${p.title} | AUMY Dental Practice Growth`,
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
        <p>Get a free Revenue Leak Audit: where your clinic is quietly losing enquiries, appointments and returning patients — and what each gap is worth. <a href="/growth-audit">Get my free Revenue Leak Audit</a> · <a href="/leak-calculator">Run the 60-second leak calculator</a>. Want to see what this actually looks like? <a href="https://wa.me/918007189868?text=Hi">WhatsApp AUMY</a> — a live AI receptionist for a demo dental clinic (+91 80071 89868), any time, no sales call.</p>
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
    title: 'AI Receptionist for Dental Practices — Every Call & Text Answered | AUM AI',
    description:
      'AUM AI’s AI receptionist answers every call and text 24/7, books patients, recovers no-shows, runs hygiene recall, and wins back patients who drifted — recovering $120,000+ a year for a typical practice. HIPAA-compliant by design.',
    canonical: `${ORIGIN}/`,
    ogImage: `${ORIGIN}/images/hero-dental.jpg`,
    jsonld: [orgLd, demoVideoLd],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">AI receptionist for US dental practices</p>
        <h1 class="ch-hero-title">Your practice is leaking revenue every day. AUMY stops the leak — then grows what stays.</h1>
        <p class="ch-hero-sub">AUMY answers every call and text in seconds — 2 PM or 2 AM — books patients straight into your calendar, follows up every lead until it books, runs hygiene recall, recovers no-shows, and quietly brings back patients who stopped coming. Your marketing team keeps running the ads; AUMY makes sure their leads become patients. For a typical $1M practice, that's $120,000+ a year quietly recovered. HIPAA-compliant by design: we sign a BAA with your practice, host data in US data centers, and log every access.</p>
        <p>Watch short, unedited demos of the live product - a new clip every day: <a href="https://www.youtube.com/watch?v=Jna2UXPxBmI">Watch the full 40-minute demo</a>.</p>
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
        <p>Short, unedited demos of the AI Employee answering on WhatsApp and social, quoting from a catalogue, making an outbound call and booking a meeting. New clip every day: <a href="https://www.youtube.com/watch?v=Jna2UXPxBmI">Watch the full demo</a>.</p>
        <h2>Pricing</h2>
        <p>Basic $77/mo - ads and pixel, AI Employee, campaigns, CRM and meetings (1,100 messages, 33 voice minutes). Growth $237/mo - adds AI voice campaigns with playbooks (3,300 messages, 132 voice minutes). Pro $397/mo (11,000 messages, 330 voice minutes). Scale $549/mo (unlimited messages under fair use, 1,100 voice minutes). Around 20% less than comparable platforms, with the AI Employee, WhatsApp and in-plan voice minutes included rather than sold as add-ons. Yearly billing is two months free. Every plan starts with a 7-day free trial, no card required.</p>
      </div></section>`,
  },
  {
    slug: 'leak-calculator',
    title: 'Dental Revenue Leak Calculator - What Missed Calls & No-Shows Cost You | AUM AI',
    description:
      'A 60-second, deliberately conservative estimate of the revenue leaking from your dental practice or med spa - unanswered calls, no-shows, and patients who never reappoint. Free, no sign-up.',
    canonical: `${ORIGIN}/leak-calculator`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">60-second leak check</p>
        <h1 class="ch-hero-title">Do the math for your practice.</h1>
        <p class="ch-hero-sub">Answer six honest questions about your practice - new patient enquiries per week, how many never get a reply, appointments per week, no-show rate, patients who never reappoint, and average production per visit - and see an estimate of the revenue leaking every year. Deliberately conservative: only 35% of missed enquiries are counted as lost bookings, only half of no-shows are counted, just three visits per lapsed patient, and 48 working weeks. Your real number is almost certainly higher.</p>
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
