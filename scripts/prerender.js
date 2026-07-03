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

const BUILD = path.join(__dirname, '..', 'build');
const ORIGIN = 'https://aumai.co.in';
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
    ['Do I have to replace my current software?', 'No. AUMY works alongside what you already use — it adds the growth and engagement layer on top.'],
    ['Is my patient data safe?', 'Yes — encrypted in transit and at rest, role-based access, and private by design.'],
    ['How long does it take to get started?', 'Most clinics are live quickly — and most of that is simple setup we handle with you.'],
    ['Will my staff have to learn something complicated?', 'No. AUMY runs in the background; your team does less, not more.'],
    ['Is this a product or a service?', 'Both — you get a proven system (AUMY), run and tailored for you by a partner. You are getting a growth partner, not software to figure out alone.'],
  ].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
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
    title: 'Grow Your Dental or Aesthetic Clinic with AI | AUMY by AUM AI',
    description:
      'AUMY is the AI growth system for dental & aesthetic clinics — capture every enquiry, book it like a human, win back patients who drift away, and make your ad spend work harder. Live in clinics; one grew 20–25% in 2–3 months.',
    canonical: `${ORIGIN}/`,
    ogImage: `${ORIGIN}/images/hero-dental.jpg`,
    jsonld: [faqLd, videoLd],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">For dental &amp; aesthetic clinics</p>
        <h1 class="ch-hero-title">Your clinic is leaking patients — and revenue you never see.</h1>
        <p class="ch-hero-sub">We are the growth partner for dental &amp; aesthetic clinics. Powered by AUMY — our AI growth system, tailored to your clinic — we capture every enquiry, book it like a human, win back the patients who drift away, and make your ad spend work harder. All connected, all automatic.</p>
        <p><a href="/growth-audit">Get my free Clinic Growth Audit</a></p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>You are working harder than ever. So why does growth feel stuck?</h2>
        <ul>
          <li>You spend on ads every month — shown to the same people — with no idea which ones become patients.</li>
          <li>The phone rings while your team is with a patient, or after hours. That caller books somewhere else.</li>
          <li>A patient no-shows. The chair sits empty. No one had time to fill it.</li>
          <li>An enquiry asks a question, gets no reply, and quietly disappears.</li>
          <li>Patients you treated once never come back — and no one reminds them.</li>
          <li>On Google, the clinic down the road shows up above you.</li>
        </ul>
        <h2>One connected system, run by a partner who tailors it to you.</h2>
        <p>Most clinics bolt together four tools that do not talk to each other. We bring them onto one platform — AUMY — and tune it to your clinic's specific leaks: capture &amp; book every enquiry 24/7, nurture &amp; retain patients who drift, make your ads smarter by feeding real bookings back to Meta, and get found on Google with more reviews and higher ranking.</p>
        <h2>Clinics are already growing with us.</h2>
        <p>Vinayaka Dental Care grew revenue about 25% in two months without hiring a single extra person. Vinayaka Derma keeps a 4.9-star Google rating with recalls and follow-ups running automatically. AUM AI is an NVIDIA Inception member.</p>
        <h2>Questions clinic owners ask</h2>
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
      'AUMY is the growth system we run for dental & aesthetic clinics: it captures every enquiry, books it, wins back patients who drift, feeds real bookings back to Meta so ads get smarter, and proves recovered revenue on a live dashboard.',
    canonical: `${ORIGIN}/revenue-generator`,
    ogImage: `${ORIGIN}/images/hero-dental.jpg`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">How AUMY works</p>
        <h1 class="ch-hero-title">Recover the revenue your clinic is already leaking.</h1>
        <p class="ch-hero-sub">AUMY is the growth system we run for dental &amp; aesthetic clinics. It captures every enquiry, books it, wins back patients who drift away, and makes your ad spend work harder — with the recovered revenue proven on a live dashboard.</p>
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
    slug: 'contact',
    title: 'Contact AUM AI — Clinic Growth & Healthcare Engineering',
    description:
      'Talk to AUM AI: a growth strategy call for your dental or aesthetic clinic, or a build partner for your healthcare product. We reply within 24 hours.',
    canonical: `${ORIGIN}/contact`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <h1 class="ch-hero-title">Get in touch.</h1>
        <p class="ch-hero-sub">Tell us what you need — a growth strategy call for your clinic, or a build partner for your product. We reply within 24 hours.</p>
        <p>Email: jayesh.chaudhari@aumai.co.in &middot; Phone: +91 800 718 9868</p>
      </div></section>`,
  },
];

let written = 0;
for (const r of routes) {
  const html = apply(template, r);
  const dir = r.slug ? path.join(BUILD, r.slug) : BUILD;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  written += 1;
  console.log(`prerendered /${r.slug}`);
}
console.log(`\nprerender: wrote ${written} route(s).`);
