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
// Clinic trust strip: same consent-gated list the React component renders, so a
// clinic that has NOT given permission (or withdraws it) can never survive in
// the crawler-visible HTML after the app stops showing it.
const { consentedClinics, servedCities } = require('../src/data/clinicsServed');
// Prices: one file shared with the React /pricing page (owner 2026-10-04:
// "starts from ₹3,000 a month" — no calculator, no rate card). Never typed here.
const PRICE = require('../src/data/pricing');
const ADS = require('../src/data/aiDentalSoftwareIndia');
// The founder: same words as the About page (src/data/founder.js).
const FOUNDER = require('../src/data/founder');
const AIR = require('../src/data/aiReceptionist');
const WA = require('../src/data/whatsappAutomation');
const COMP = require('../src/data/compliance');
const MC_REFUND = require('../src/data/masterclassRefund');
// The Full Chair Method information page (owner 2026-10-19): same file as src/pages/MasterclassInfo.js.
const MC = require('../src/data/masterclass');
// Clinic websites built for search (owner 2026-10-19): same file as src/pages/ClinicWebsitesPage.js.
const CW = require('../src/data/clinicWebsites');
// Services (owner 2026-10-23): same files as src/pages/ServicePage.js on /dental-seo and /dental-ads.
const DSEO = require('../src/data/dentalSeo');
const DADS = require('../src/data/dentalAds');
// /modules: same words as src/pages/ModulesPage.js.
const MODS = require('../src/data/modules');
// Home explainer videos (owner 2026-10-12): same file as src/components/HomeExplainers.js.
const EXPL = require('../src/data/explainers');
// "How to Run Your Clinic" video series (owner 2026-10-13): same file as src/pages/RunYourClinic*.js.
const RYC = require('../src/data/runYourClinic');
// How Aumy works (/revenue-generator, lean 2026-10-12): same file as src/pages/AumyRevenueGenerator.js.
const HOW = require('../src/data/howItWorks');
// Home FAQ: the list src/pages/Home.js renders — crawler HTML and FAQPage JSON-LD read the same one.
const HOME_FAQ = require('../src/data/homeFaq');
// "Handcrafted only for dentists" (owner 2026-10-08): same words as the React pages.
const POS = require('../src/data/positioning');
// Home, outcomes as a service (owner 2026-10-22): same file as src/pages/Home.js.
const HO = require('../src/data/homeOutcomes');
// FAQPage JSON-LD straight from a page's own FAQ list ({q, a}), so the
// answers an assistant quotes are word for word what the page says.
const faqPageLd = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
// Crawler HTML for the FAQ block and a [title, body] list.
const faqHtml = (faqs, heading) => `<h2>${esc(heading)}</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}`;
// The Aumy app in the stores + the self-serve modules (owner 2026-10-09): same file
// src/components/StartInApp.js reads. The React app shows only this phone's store;
// the crawler / no-JS HTML always lists both.
const STORES = require('../src/data/appStores');
const storeLinksHtml = (name) =>
  `<a href="${STORES.APP_STORE_URL}" aria-label="Start ${esc(name)} free: download Aumy on the App Store">Download on the App Store</a> · ` +
  `<a href="${STORES.PLAY_STORE_URL}" aria-label="Start ${esc(name)} free: get Aumy on Google Play">Get it on Google Play</a>`;
const startInAppHtml = (name) => `<p><strong>${esc(STORES.START_LINE)}</strong>. ${esc(STORES.START_FINE)}. ${storeLinksHtml(name)}</p>`;
// What our customers say (owner 2026-10-22): the same Google reviews, word for word, that
// src/components/GoogleReviews.js renders (src/data/googleReviews.js). Plain HTML only:
// NO Review / AggregateRating JSON-LD (self-serving reviews break Google's guidelines).
const GR = require('../src/data/googleReviews');
// The hero review (Dr Priyanka, owner 2026-10-22) leads the full home list under its pull-quote
// heading; on /pricing (limit) it is just the first review. Blank lines in a review are paragraphs.
const reviewTextHtml = (text) => {
  const paras = text.split(/\n\s*\n/);
  return paras.length > 1 ? paras.map((p) => `<p>${esc(p)}</p>`).join('') : esc(text);
};
const googleReviewsHtml = (limit) => {
  const list = limit ? GR.GOOGLE_REVIEWS.slice(0, limit) : GR.GOOGLE_REVIEWS;
  return `<section id="google-reviews"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">Google reviews</p>
        <h2>What our customers say</h2>
        ${list.map((r) => `<figure>${!limit && r.hero && r.pullQuote ? `<h3>${esc(r.pullQuote)}</h3>` : ''}<blockquote>${reviewTextHtml((limit && r.excerptShort) || r.excerpt || r.text)}</blockquote>${r.excerpt && r.fullReviewUrl ? `<p><a href="${r.fullReviewUrl}">Read her full review on Google →</a></p>` : ''}<figcaption>${esc(r.name)}${r.clinic ? `, ${esc(r.clinic)}` : ''} · ${r.stars} out of 5 stars${r.hideMonth ? '' : ` · ${esc(r.month)}`} · Google review</figcaption></figure>`).join('\n        ')}
        <p>${esc(GR.GOOGLE_RATING)} out of 5 on Google · <a href="${GR.GOOGLE_REVIEWS_URL}">Read all reviews</a> · <a href="${GR.GOOGLE_WRITE_REVIEW_URL}">Write a review</a></p>
      </div></section>`;
};
// Slim bar at the top of every India page (React: CreditsBar in the header).
const creditsBarHtml = () => `<div class="credits-bar"><div class="container"><p class="credits-bar-text"><strong>${esc(STORES.TOP_LINE)}</strong> — ${esc(STORES.TOP_SUB)}: <a class="credits-bar-link" href="${STORES.APP_STORE_URL}">App Store</a> · <a class="credits-bar-link" href="${STORES.PLAY_STORE_URL}">Google Play</a></p></div></div>`;
// Module cards as links to /modules/<id> (home section + "works even better with").
// `stores`: the home cards also carry the app-store links for the self-serve modules.
const moduleCardsHtml = (pages, { stores = false } = {}) => pages.map((p) => `<li><a href="/modules/${p.id}"><strong>${esc(p.short)}</strong>: ${esc(p.title)}</a> — ${esc(p.card)}${p.addonOf ? ` (add-on to ${esc(p.addonOf)})` : ''}${stores && STORES.isSelfServe(p.id) ? ` ${esc(STORES.START_LINE)}: ${storeLinksHtml(p.short)}` : ''}</li>`).join('\n          ');
const pairsHtml = (pairs) => `<ul>${pairs.map(([t, b]) => `<li><strong>${esc(t)}</strong> — ${esc(b)}</li>`).join('')}</ul>`;

const BUILD = path.join(__dirname, '..', 'build');
// US-market build (REACT_APP_MARKET=us → aumyai.com) prerenders only the US
// landing route with US metadata; default is the India site unchanged.
const MARKET = process.env.REACT_APP_MARKET || 'in';
const ORIGIN = MARKET === 'us' ? 'https://aumyai.com' : 'https://aumai.co.in';
// schema.org uploadDate: Google flags a bare date ("missing a timezone"), so YYYY-MM-DD goes out as midnight IST.
const isoDateTime = (d) => (/^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T00:00:00+05:30` : d);
const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Crawler-visible twin of <ClinicsServed>. Mirrors that component's two states
 * off the SAME consent list, so the static HTML can never name a clinic the app
 * has stopped naming. Deliberately prints no clinic count — the number is not
 * the proof, the names are.
 */
// The site's own links, in the crawler HTML of every India page. AI crawlers
// do not run JavaScript, so without this each prerendered page was an island
// (no nav, no footer) — the React header/footer replace it for people.
const SITE_LINKS = `<nav aria-label="Aumy"><ul>${[
  ['/', 'Aumy — AI dental software'],
  ['/ai-dental-software-india', 'AI dental software in India'],
  ['/ai-receptionist', 'AI receptionist for dental clinics'],
  ['/whatsapp-automation-for-clinics', 'WhatsApp automation for clinics'],
  ['/modules', 'Dental clinic software modules'],
  ['/revenue-generator', 'How Aumy works'],
  ['/pricing', 'Pricing'],
  ['/switch', 'Switching dental software'],
  ['/demos', 'Demo videos'],
  ['/growth', 'Growth Hub'],
  ['/masterclass', 'The Full Chair Method masterclass'],
  // Product & services (owner 2026-10-23): the three services, as in the header.
  ['/dental-seo', 'Dental SEO for international patients'],
  ['/clinic-websites', 'Dental websites built for SEO'],
  ['/dental-ads', 'Dental ads (Meta & Google)'],
  ['/compliance', 'Security & compliance'],
  ['/about', 'About the founder'],
  ['/contact', 'Contact'],
].map(([href, label]) => `<li><a href="${href}">${label.replace(/&/g, '&amp;')}</a></li>`).join('')}</ul></nav>`;

function clinicsStripHtml() {
  if (!consentedClinics.length) {
    return `<h2>Trusted by dental clinics in ${esc(servedCities())}.</h2>
        <p>Clinics run their front desk, patient journeys and records on Aumy — from single practices to multi-location groups.</p>`;
  }
  const items = consentedClinics
    .map((c) => {
      const lead = c.lead ? `, ${esc(c.lead)}` : '';
      const where = c.descriptor ? `${esc(c.descriptor)}, ${esc(c.city)}` : esc(c.city);
      const branches = c.locations?.length ? ` (${c.locations.map(esc).join(', ')})` : '';
      return `<li>${esc(c.name)}${lead} — ${where}${branches}</li>`;
    })
    .join('\n          ');
  return `<h2>Trusted by growing dental clinics across India.</h2>
        <ul>
          ${items}
        </ul>`;
}

function setTag(html, re, replacement) {
  if (re.test(html)) return html.replace(re, replacement);
  return html;
}
function apply(html, r) {
  let out = html;
  out = setTag(out, /<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`);
  out = setTag(out, /(<meta name="description" content=")[^"]*(")/, `$1${esc(r.description)}$2`);
  out = setTag(out, /(<link rel="canonical" href=")[^"]*(")/, `$1${r.canonical}$2`);
  // Private pages (masterclass members area, admin): never indexed, never followed.
  if (r.noindex) out = setTag(out, /(<meta name="robots" content=")[^"]*(")/, '$1noindex, nofollow$2');
  out = setTag(out, /(<meta property="og:title" content=")[^"]*(")/, `$1${esc(r.title)}$2`);
  out = setTag(out, /(<meta property="og:description" content=")[^"]*(")/, `$1${esc(r.description)}$2`);
  out = setTag(out, /(<meta property="og:url" content=")[^"]*(")/, `$1${r.canonical}$2`);
  out = setTag(out, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(r.title)}$2`);
  out = setTag(out, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(r.description)}$2`);
  if (r.ogImage) {
    out = setTag(out, /(<meta property="og:image" content=")[^"]*(")/, `$1${r.ogImage}$2`);
    out = setTag(out, /(<meta name="twitter:image" content=")[^"]*(")/, `$1${r.ogImage}$2`);
  }
  // One Aumy product entity (#aumy-dental) on every India page — the template
  // no longer carries its own, conflicting copy (SEO review 2026-09-26).
  const ld = [...(r.jsonld || [])];
  if (MARKET !== 'us' && !r.noindex && !ld.includes(dentalSoftwareLd)) ld.push(dentalSoftwareLd);
  // Google treats FAQ markup for text that is not on the page as spam: every
  // FAQPage question must also be in the crawler HTML. Missing ones are added.
  const faqExtra = ld.filter((o) => o && o['@type'] === 'FAQPage')
    .flatMap((o) => o.mainEntity || [])
    .filter((q) => !String(r.content || '').includes(esc(q.name)) && !String(r.content || '').includes(q.name));
  r = { ...r, content: (r.content || '')
    + (faqExtra.length ? `<section><div class="ch-container ch-narrow"><h2>Questions, answered</h2>${faqExtra.map((q) => `<h3>${esc(q.name)}</h3><p>${esc(q.acceptedAnswer && q.acceptedAnswer.text)}</p>`).join('')}</div></section>` : '')
    + (MARKET === 'us' ? '' : SITE_LINKS) };
  if (r.refresh) out = out.replace('</head>', `<meta http-equiv="refresh" content="0; url=${r.refresh}"></head>`);
  if (ld.length) {
    const blocks = ld
      .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
      .join('');
    out = out.replace('</head>', `${blocks}</head>`);
  }
  // The site-wide onboarding-pause banner was removed (owner 2026-09-26),
  // here as in Header.js; pricing and contact keep their own notice.
  // The "1,000 Aumy credits" bar (owner 2026-10-09) tops every India page, as in Header.js.
  // Owner 2026-10-22: not on the home page (slug ''), as in Header.js.
  const bar = MARKET === 'us' || r.refresh || r.slug === '' ? '' : creditsBarHtml();
  out = out.replace(
    '<div id="root"></div>',
    `<div id="root"><div class="ch-home">${bar}${r.content}</div></div>`
  );
  return out;
}

// ---- shared JSON-LD helpers ----------------------------------------------
// Home FAQPage: word for word the list src/pages/Home.js shows (src/data/homeFaq.js).
const faqLd = faqPageLd(HOME_FAQ.FAQS);
// Organization: ties both hosts to one legal entity and declares the
// cross-market relationship, so Google treats aumai.co.in and aumyai.com as
// sister sites rather than duplicate competitors.
const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  // Same entity as the template node in public/index.html (merged by @id).
  '@id': `${ORIGIN}/#organization`,
  ...(MARKET === 'us' ? {} : { founder: { '@id': `${ORIGIN}/about#founder` } }),
  name: MARKET === 'us' ? 'AUM AI Healthcare Technology LLC' : 'AUM AI Healthcare Solutions',
  // The new positioning, no price (owner 2026-10-22): src/data/homeOutcomes.js.
  ...(MARKET === 'us' ? {} : { description: HO.ORG_DESCRIPTION }),
  url: `${ORIGIN}/`,
  logo: `${ORIGIN}${HO.LOGO_URL}`,
  // Same-entity profiles (all verified live 2026-10-06). LinkedIn is deliberately absent:
  // https://www.linkedin.com/company/aumy returned 404 when checked.
  sameAs: [
    'https://aumai.co.in/',
    'https://aumyai.com/',
    'https://play.google.com/store/apps/details?id=co.aumai.ehr',
    'https://apps.apple.com/in/app/aumy/id6780580041',
    'https://www.softwaresuggest.com/aumy', 'https://www.linkedin.com/company/110661944/',
  ],
  address:
    MARKET === 'us'
      ? { '@type': 'PostalAddress', streetAddress: '30 N Gould St, Ste N', addressLocality: 'Sheridan', addressRegion: 'WY', postalCode: '82801', addressCountry: 'US' }
      : { '@type': 'PostalAddress', streetAddress: 'Sr. No. 78, Sasane Nagar, Lane 1, Hadapsar', addressLocality: 'Pune', addressRegion: 'Maharashtra', postalCode: '411028', addressCountry: 'IN' },
  contactPoint: [{
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: MARKET === 'us' ? 'jayesh@aumyai.com' : 'jayesh.chaudhari@aumai.co.in',
    telephone: MARKET === 'us' ? '+1-307-263-5098' : '+91-800-718-9868',
  }],
};

// Aumy (dental, India) as a product entity. AI assistants answering "AI dental
// software in India" and "how much does it cost" read this; the price comes
// from src/data/pricing.js, the same file the pricing page uses.
const dentalSoftwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Aumy',
  alternateName: 'Aumy AI dental software',
  applicationCategory: 'HealthApplication',
  applicationSubCategory: 'AI dental software / dental practice management software',
  operatingSystem: 'Web, iOS, Android',
  '@id': `${ORIGIN}/#aumy-dental`,
  url: `${ORIGIN}/`,
  description: `${HO.PRODUCT_DESCRIPTION} ${POS.LD_SUFFIX}`,
  areaServed: { '@type': 'Country', name: 'India' },
  inLanguage: ['en-IN', 'hi-IN', 'mr-IN'],
  featureList: ADS.CAPABILITIES.map(([t]) => t),
  // No price in the search data (owner 2026-10-22); prices live on /pricing.
  publisher: { '@id': `${ORIGIN}/#organization` },
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
  name: 'One Patient, Five Stages, Zero Typing \u2014 Aumy runs the whole dental patient journey on WhatsApp (live, unedited)',
  description:
    'A live, unedited demo on a real dental clinic\u2019s WhatsApp number: a lead from an ad who says \u201clet me think about it\u201d, the unprompted follow-up and booking, day-one aligner aftercare, the tracking recall, an eight-month-dormant patient won back with a \u20b9999 wellness package, and a review ask that listens before asking.',
  thumbnailUrl: 'https://i.ytimg.com/vi/-qw1sp7Ub4k/maxresdefault.jpg',
  embedUrl: 'https://www.youtube.com/embed/-qw1sp7Ub4k',
  contentUrl: 'https://www.youtube.com/watch?v=-qw1sp7Ub4k',
  uploadDate: isoDateTime('2026-08-23'),
  publisher: {
    '@type': 'Organization',
    name: 'AUM AI',
    logo: { '@type': 'ImageObject', url: `${ORIGIN}${HO.LOGO_URL}` },
  },
};

// Main demo video since 2026-10-20: the full Aumy demo film (leads /demos).
const filmVideoLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Aumy full demo: the AI front desk that fills dental chairs (WhatsApp + calls, 24x7)',
  description:
    'A 9-minute walkthrough of Aumy on a demo dental clinic: every WhatsApp enquiry and call answered, bookings confirmed and reminded, missed visits rebooked, advised treatment moved to accepted, lab cases and unfinished treatment tracked, patients brought back, and a weekly report for the owner.',
  thumbnailUrl: 'https://i.ytimg.com/vi/0LE0iwNvcZQ/maxresdefault.jpg',
  embedUrl: 'https://www.youtube.com/embed/0LE0iwNvcZQ',
  contentUrl: 'https://www.youtube.com/watch?v=0LE0iwNvcZQ',
  uploadDate: isoDateTime('2026-10-20'),
  publisher: {
    '@type': 'Organization',
    name: 'AUM AI',
    logo: { '@type': 'ImageObject', url: `${ORIGIN}${HO.LOGO_URL}` },
  },
};

// Module explainer videos on the home page (owner 2026-10-12) — src/data/explainers.js.
const explainerVideoLd = [EXPL.HERO_VIDEO, ...EXPL.VIDEOS].map((v) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: `${v.name} explainer video`,
  description: v.description,
  thumbnailUrl: `${ORIGIN}${v.poster}`,
  contentUrl: `${ORIGIN}${v.src}`,
  uploadDate: isoDateTime(EXPL.UPLOAD_DATE),
  duration: v.duration,
  publisher: { '@type': 'Organization', name: 'AUM AI', logo: { '@type': 'ImageObject', url: `${ORIGIN}${HO.LOGO_URL}` } },
}));

const videoLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Dr. Ronak, Vinayaka Dental Care — patient growth with Aumy',
  description: 'A dental clinic owner describes how Aumy reduced no-shows, brought recall patients back, and grew the clinic 20–25% in 2–3 months.',
  thumbnailUrl: `${ORIGIN}/videos/dr-ronak-poster.jpg`,
  contentUrl: `${ORIGIN}/videos/dr-ronak-vinayaka.mp4`,
  uploadDate: isoDateTime('2026-07-02'),
};

// The five "How we work" steps (owner 2026-10-22): word for word what src/components/HowWeWork.js renders on
// home, /revenue-generator and /about (src/data/homeOutcomes.js, HOW).
function howWeWorkHtml(eyebrow = HO.HOW.eyebrow) {
  return `<section id="how-we-work"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(eyebrow)}</p>
        <h2>${esc(HO.HOW.titleA)} ${esc(HO.HOW.titleB)}</h2>
        <ol>
          ${HO.HOW.steps.map((st) => '<li><h3>' + esc(st.title) + '</h3><p>' + esc(st.body) + '</p>' + (st.pull ? '<p>“' + esc(st.pull.q) + '” — ' + esc(st.pull.who) + '</p>' : '') + '<p>' + esc(st.exTag) + ': ' + esc(st.ex) + '</p></li>').join('\n          ')}
        </ol>
      </div></section>`;
}
// ---- home (outcomes as a service, owner 2026-10-22) -----------------------
// Word for word what src/pages/Home.js renders, from src/data/homeOutcomes.js and src/data/homeFaq.js.
function homeContent() {
  const li = (arr, f) => arr.map(f).join('\n          ');
  const chatHtml = (it) => '<ul>' + it.chat.map(([who, text, time, note]) => '<li>' + (who === 'sys'
    ? esc(text)
    : (who === 'in' ? esc(it.who) : 'Clinic') + (time ? ' (' + esc(time) + ')' : '') + ': ' + esc(text) + (note ? ' [' + esc(note) + ']' : '')) + '</li>').join('') + '</ul>';
  const baHtml = (it) => '<p>Before: ' + esc(it.ba.before) + '</p>' + (it.ba.after
    ? '<ul>' + it.ba.after.map(([w, t]) => '<li>' + esc(w) + ': ' + esc(t) + '</li>').join('') + '</ul>'
    : '<p>' + esc(it.ba.afterLabel || 'After') + ': ' + esc(it.ba.afterText) + '</p>');
  return `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(HO.HERO.eyebrow)}</p>
        <h1 class="ch-hero-title">${esc(HO.HERO.title)}</h1>
        <ul>
          ${li(HO.HERO.every, (l) => '<li>' + esc(l) + '</li>')}
        </ul>
        <p><strong>${esc(HO.HERO.close)}</strong></p>
        <p><a href="${HO.HERO.primary.to}">${esc(HO.HERO.primary.label)}</a> · <a href="${esc(HO.HERO.whatsapp.href)}">${esc(HO.HERO.whatsapp.label)}</a></p>
        <p><strong>${esc(HO.HERO.proofNumber)}</strong> ${esc(HO.HERO.proofText)}</p>
        <p><a href="${EXPL.HERO_VIDEO.src}"><strong>Watch: ${esc(EXPL.HERO_VIDEO.name)} on Aumy</strong></a> — ${esc(EXPL.HERO_VIDEO.line)}</p>
        <p>Aumy is AI dental software for dental clinics in India, set up and run with your team: an AI receptionist on calls and WhatsApp, confirmations, follow-ups and recalls, and your clinic’s records and billing. <a href="/ai-dental-software-india">What AI dental software does in an Indian clinic</a>.</p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">Dental clinics Aumy serves</p>
        ${clinicsStripHtml()}
      </div></section>
      <section><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(HO.PAIN.eyebrow)}</p>
        <h2>${esc(HO.PAIN.titleA)} ${esc(HO.PAIN.titleB)}</h2>
        <ul>
          ${li(HO.PAIN.quotes, (q) => '<li>“' + esc(q) + '”</li>')}
        </ul>
        <p>${esc(HO.PAIN.statsLabel)} ${esc(HO.PAIN.statsSource)}</p>
        <ul>
          ${li(HO.PAIN.stats, (st) => '<li><strong>' + esc(st.n) + '</strong> ' + esc(st.t) + '</li>')}
        </ul>
        <p>${esc(HO.PAIN.close)}</p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(HO.VS.eyebrow)}</p>
        <h2>${esc(HO.VS.titleA)} ${esc(HO.VS.titleB)}</h2>
        <p>${esc(HO.VS.lead)}</p>
        <table><thead><tr><th>${esc(HO.VS.headVendor)}</th><th>${esc(HO.VS.headUs)}</th></tr></thead><tbody>
          ${li(HO.VS.rows, ([a, b]) => '<tr><td>' + esc(a) + '</td><td>' + esc(b) + '</td></tr>')}
        </tbody></table>
        ${li(HO.VS.quotes, (q) => '<blockquote>“' + esc(q.q) + '” — ' + esc(q.who) + ', ' + esc(q.where) + '</blockquote>')}
        <p>${esc(HO.VS.closeA)} ${esc(HO.VS.closeB)}</p>
      </div></section>
      ${howWeWorkHtml()}
      <section id="the-4c-framework"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(HO.FOURC.eyebrow)}</p>
        <h2>${esc(HO.FOURC.titleA)} ${esc(HO.FOURC.titleB)}</h2>
        <p>${esc(HO.FOURC.lead)}</p>
        ${li(HO.FOURC.stages, (st) => '<h3>' + esc(st.c) + ': ' + esc(st.job) + '</h3><ul>' + st.systems.map(([n, l]) => '<li><strong>' + esc(n) + '</strong> — ' + esc(l) + '</li>').join('') + '</ul><p>The outcome: ' + esc(st.outcomeB) + (st.outcome ? ' ' + esc(st.outcome) : '') + '</p>')}
        <p>${esc(HO.FOURC.under)}</p>
      </div></section>
      <section id="full-demo"><div class="ch-container ch-narrow">
        <h2>${esc(EXPL.FULL_DEMO.title)}</h2>
        <p>${esc(EXPL.FULL_DEMO.blurb)} <a href="https://www.youtube.com/watch?v=${EXPL.FULL_DEMO.youtubeId}">Watch the 9-minute demo</a> · <a href="/demos">More demo videos</a></p>
      </div></section>
      <section id="strategies"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(HO.STRATEGIES.eyebrow)}</p>
        <h2>${esc(HO.STRATEGIES.titleA)} ${esc(HO.STRATEGIES.titleB)}</h2>
        <p>${esc(HO.STRATEGIES.lead)}</p>
        ${li(HO.STRATEGIES.items, (it, i) => '<h3>' + (i + 1) + '. ' + esc(it.name) + (it.alt ? ' (' + esc(it.alt) + ')' : '') + '</h3><p>' + esc(it.body) + '</p><p>' + esc(it.tag) + ':</p>' + (it.chat ? chatHtml(it) : baHtml(it)) + '<p>' + esc(it.why) + '</p>')}
        <h3>${esc(HO.STRATEGIES.guardTitle)}</h3>
        <p>${esc(HO.STRATEGIES.guard)}</p>
      </div></section>
      <section id="kpis"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(HO.KPIS.eyebrow)}</p>
        <h2>${esc(HO.KPIS.titleA)} ${esc(HO.KPIS.titleB)}</h2>
        <p>${esc(HO.KPIS.lead)}</p>
        <table><thead><tr>${HO.KPIS.head.map((h) => '<th>' + esc(h) + '</th>').join('')}</tr></thead><tbody>
          ${li(HO.KPIS.rows, (r) => '<tr>' + r.map((c) => '<td>' + esc(c) + '</td>').join('') + '</tr>')}
        </tbody></table>
        <p>${HO.KPIS.legend.map(esc).join(' · ')}. ${esc(HO.KPIS.legendNote)}</p>
      </div></section>
      ${googleReviewsHtml()}
      <section><div class="ch-container ch-narrow">
        <ul>
          ${li(HO.STERLING_PROOF, (p) => '<li><strong>' + esc(p.n) + '</strong> ' + esc(p.t) + ' (' + esc(p.s) + ')</li>')}
        </ul>
        <p><a href="/videos/dr-ronak-vinayaka.mp4">Dr Ronak Oswal, Vinaykia Dental Care, Pune</a> — 37 seconds, in his own words.</p>
      </div></section>
      <section id="be-the-patient"><div class="ch-container ch-narrow">
        <h2>${esc(HO.BE_PATIENT.titleA)} ${esc(HO.BE_PATIENT.titleB)}</h2>
        <p>${esc(HO.BE_PATIENT.body)} WhatsApp ${esc(HO.BE_PATIENT.whatsapp.display)} · call ${esc(HO.BE_PATIENT.call.display)}. ${esc(HO.BE_PATIENT.note)}</p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(HO.FIT.titleA)} ${esc(HO.FIT.titleB)}</h2>
        <h3>${esc(HO.FIT.yesTitle)}</h3><ul>${HO.FIT.yes.map((y) => '<li>' + esc(y) + '</li>').join('')}</ul>
        <h3>${esc(HO.FIT.noTitle)}</h3><ul>${HO.FIT.no.map((y) => '<li>' + esc(y) + '</li>').join('')}</ul>
        <p>${esc(HO.FIT.ownerOperator)}</p>
        ${faqHtml(HOME_FAQ.FAQS, 'Questions dental clinic owners ask')}
      </div></section>
      <section id="run-it-yourself"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(HO.DIY.eyebrow)}</p>
        <h2>${esc(HO.DIY.titleA)} ${esc(HO.DIY.titleB)}</h2>
        <p>${esc(HO.DIY.lead)} ${esc(HO.DIY.honest)}</p>
        <p>${esc(HO.DIY.watch)} · ${esc(HO.DIY.length)} · ${esc(MC.ACCESS)}</p>
        <ul>${HO.DIY.items.map(([b, t]) => '<li><strong>' + esc(b) + '</strong> — ' + esc(t) + '</li>').join('')}</ul>
        <p><a href="${HO.DIY.button.to}">${esc(HO.DIY.button.label)}</a></p>
      </div></section>
      <section id="free-audit"><div class="ch-container ch-narrow">
        <h2>${esc(HO.FINAL.titleA)} ${esc(HO.FINAL.titleB)}</h2>
        <p>${esc(HO.FINAL.sub)}</p>
        <p><a href="${HO.FINAL.primary.to}">${esc(HO.FINAL.primary.label)}</a> · <a href="${esc(HO.FINAL.whatsapp.href)}">${esc(HO.FINAL.whatsapp.label)}</a></p>
        <p>${esc(HO.FINAL.modulesLead)} <a href="${HO.FINAL.modulesLink.to}">${esc(HO.FINAL.modulesLink.label)}</a></p>
        <ul>
          ${li(POS.HOME_EXPLORE, (e) => '<li><a href="' + e.to + '">' + esc(e.label) + '</a></li>')}
        </ul>
      </div></section>`;
}

// Service pages under "Product & services" (owner 2026-10-23): /dental-seo and /dental-ads.
// Every word comes from the page's data file, as on the React page (src/pages/ServicePage.js).
// Service JSON-LD + FAQPage only: no review or rating markup, no price.
function serviceRoute(D) {
  const url = `${ORIGIN}${D.PATH}`;
  return {
    slug: D.PATH.slice(1),
    title: D.SEO.title,
    description: D.SEO.description,
    canonical: url,
    ogImage: D.VISUAL.kind === 'devices' ? `${ORIGIN}${D.VISUAL.desktop.src}` : undefined,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        name: D.SCHEMA.name,
        serviceType: D.SCHEMA.serviceType,
        description: D.SEO.description,
        url,
        provider: { '@id': `${ORIGIN}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        audience: { '@type': 'BusinessAudience', audienceType: D.SCHEMA.audience },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: D.WHAT.title,
          itemListElement: D.WHAT.items.map((b) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: b.h, description: b.t } })),
        },
      },
      faqPageLd(D.FAQS),
    ],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(D.HERO.eyebrow)}</p>
        <h1 class="ch-hero-title">${esc(D.HERO.title)}</h1>
        <p class="ch-hero-sub">${esc(D.HERO.sub)}</p>
        <p><a href="#audit">${esc(D.HERO.cta)}</a> · <a href="${D.WHATSAPP.link}">WhatsApp ${esc(D.WHATSAPP.display)}</a></p>
        <p>${esc(D.HERO.trust)}</p>
        ${D.VISUAL.kind === 'devices'
          ? `<p><img src="${D.VISUAL.desktop.src}" width="${D.VISUAL.desktop.w}" height="${D.VISUAL.desktop.h}" alt="${esc(D.VISUAL.desktop.alt)}"></p><p>${esc(D.VISUAL.caption)}</p>`
          : `<h2>${esc(D.VISUAL.title)}</h2><ol>${D.VISUAL.steps.map((s) => `<li><strong>${esc(s.h)}</strong> — ${esc(s.t)}</li>`).join('')}</ol>`}
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(D.WHAT.title)}</h2>
        <p>${esc(D.WHAT.intro)}</p>
        <ul>${D.WHAT.items.map((b) => `<li><strong>${esc(b.h)}.</strong> ${esc(b.t)}</li>`).join('')}</ul>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(D.POINTS.eyebrow)}</p>
        <h2>${esc(D.POINTS.title)}</h2>
        <p>${esc(D.POINTS.intro)}</p>
        <ol>${D.POINTS.items.map((p) => `<li><strong>${esc(p.h)}.</strong> ${esc(p.t)}</li>`).join('')}</ol>
        ${D.POINTS.link ? `<p>Read the guide: <a href="${D.POINTS.link.href}">${esc(D.POINTS.link.label)}</a></p>` : ''}
      </div></section>
      <section id="work"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(D.WORK.eyebrow)}</p>
        <h2>${esc(D.WORK.title)}</h2>
        <p>${esc(D.WORK.intro)}</p>
        ${D.WORK.cases.map((c) => `<h3>${esc(c.name)}${c.place ? `, ${esc(c.place)}` : ''}</h3><p><em>${esc(c.tag)}.</em> ${esc(c.text)}${c.link ? ` <a href="${c.link.href}">${esc(c.link.label)}</a>` : ''}</p>`).join('')}
        ${D.WORK.note ? `<p>${esc(D.WORK.note)}</p>` : ''}
      </div></section>
      <section id="how"><div class="ch-container ch-narrow">
        <h2>${esc(D.STEPS.title)}</h2>
        <ol>${D.STEPS.items.map((s) => `<li><strong>${esc(s.h)}.</strong> ${esc(s.t)}</li>`).join('')}</ol>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(D.MONTHLY.title)}</h2>
        <ul>${D.MONTHLY.items.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
        <p><strong>${esc(D.MONTHLY.asideTitle)}.</strong> ${esc(D.MONTHLY.aside)}</p>
        <h2>${esc(D.FIT.eyebrow)}: ${esc(D.FIT.title)}</h2>
        <ul>${D.FIT.items.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
        <p>${esc(D.FIT.notFit)}</p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(D.WITH_AUMY.title)}</h2>
        <p>${esc(D.WITH_AUMY.text)} <a href="${D.WITH_AUMY.link.to}">${esc(D.WITH_AUMY.link.label)}</a></p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        ${faqHtml(D.FAQS, 'Questions, answered')}
      </div></section>
      <section id="audit"><div class="ch-container ch-narrow">
        <h2>${esc(D.AUDIT.title)}</h2>
        <p>${esc(D.AUDIT.intro)}</p>
        <p><a href="${D.WHATSAPP.link}">WhatsApp ${esc(D.WHATSAPP.display)}</a> · <a href="/growth-audit">Free clinic audit</a></p>
        <h2>${esc(D.FINAL.title)}</h2>
        <p>${esc(D.FINAL.text)}</p>
        <p>Also from AUM AI: <a href="/dental-seo">Dental SEO</a> · <a href="/clinic-websites">Dental websites</a> · <a href="/dental-ads">Dental ads (Meta &amp; Google)</a> · <a href="/revenue-generator">Aumy, our main product</a></p>
      </div></section>`,
  };
}

// ---- routes ---------------------------------------------------------------
const routes = [
  {
    slug: 'pricing',
    title: PRICE.SEO_TITLE,
    description: PRICE.SEO_DESCRIPTION,
    canonical: `${ORIGIN}/pricing`,
    jsonld: [orgLd, dentalSoftwareLd, faqPageLd(PRICE.FAQS)],
    content: `
      <section><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">Pricing</p>
        <h1 class="ch-hero-title">${esc(PRICE.HEADLINE)} <em>${esc(PRICE.HEADLINE_ACCENT)}</em></h1>
        <p>${esc(PRICE.SUB)}</p>
        <h2>Aumy Clinic OS &mdash; starts from ${esc(PRICE.inr(PRICE.MONTHLY_FROM))} / month</h2>
        <ul>
          ${PRICE.CLINIC_OS.map((item) => `<li>${esc(item)}</li>`).join('\n          ')}
        </ul>
        <p>${esc(PRICE.ADDONS)}</p>
        <p><a href="/contact">Talk to us about your clinic</a>. ${esc(PRICE.GST)}</p>
        <p>Want only one part of Aumy? <a href="/modules">See the modules you can buy on their own</a>.</p>
      </div></section>
      ${googleReviewsHtml(3)}
      <section><div class="ch-container ch-narrow">
        ${faqHtml(PRICE.FAQS, 'Questions clinics ask')}
      </div></section>`,
  },
  {
    // /modules — words from src/data/modules.js (same file the React page renders).
    slug: 'modules',
    title: MODS.TITLE,
    description: MODS.DESCRIPTION,
    canonical: `${ORIGIN}/modules`,
    jsonld: [orgLd, faqPageLd(MODS.FAQS), {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Aumy dental clinic software modules',
      numberOfItems: MODS.MODULES.length + 1,
      itemListElement: [
        ...MODS.MODULES.map((m, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${ORIGIN}/modules#${m.id}`,
          name: `${m.short}: ${m.title}`,
          description: m.promise,
        })),
        {
          '@type': 'ListItem',
          position: MODS.MODULES.length + 1,
          url: `${ORIGIN}/modules#one-system`,
          name: `${MODS.CONNECTED.short}: ${MODS.CONNECTED.title}`,
          description: MODS.CONNECTED.sub,
        },
      ],
    }, {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${ORIGIN}/modules`,
      name: MODS.TITLE,
      description: MODS.DESCRIPTION,
      about: { '@id': `${ORIGIN}/#aumy-dental` },
    }, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Aumy', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Modules', item: `${ORIGIN}/modules` },
      ],
    }],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(MODS.HERO.eyebrow)}</p>
        <h1 class="ch-hero-title">${esc(MODS.HERO.title)}</h1>
        <p class="ch-hero-sub">${esc(MODS.HERO.sub)}</p>
        <p>${esc(POS.MODULES_LINE)}</p>
      </div></section>
      <section><div class="ch-container">
        ${MODS.MODULES.map((m, i) => `
        <article id="${m.id}">
          <p>Module ${i + 1}</p>
          <h2>${esc(m.short)}: ${esc(m.title)}</h2>
          <p><strong>${esc(m.promise)}</strong></p>
          <p>${esc(m.forWho)}</p>
          <ul>${m.does.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
          ${m.scribe ? `<h3>${esc(m.scribe.short)}: ${esc(m.scribe.title)} (add-on)</h3><p>${esc(m.scribe.promise)}</p>` : ""}
          <p>Add if you want: ${m.addons.map((a) => `+ ${esc(a)}`).join(" · ")}</p>
          ${STORES.isSelfServe(m.id) ? startInAppHtml(m.short) : ''}
          <p><a href="/modules/${m.id}">Everything about ${esc(m.short)}</a>${m.scribe ? ` · <a href="/modules/ai-clinical-notes-for-dentists">Everything about ${esc(m.scribe.short)}</a>` : ''} · <a href="/contact">Book a demo</a> · <a href="${m.more.path}">${esc(m.more.label)}</a></p>
        </article>`).join('')}
      </div></section>
      <section id="one-system"><div class="ch-container">
        <p>${esc(MODS.CONNECTED.eyebrow)}</p>
        <h2>${esc(MODS.CONNECTED.short)}: ${esc(MODS.CONNECTED.title)}</h2>
        <p>${esc(MODS.CONNECTED.sub)}</p>
        <ol>${MODS.CONNECTED.steps.map((s) => `<li><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></li>`).join('')}</ol>
        ${MODS.CONNECTED.why.map(([t, b]) => `<h3>${esc(t)}</h3><p>${esc(b)}</p>`).join('')}
        <p><a href="/modules/automate-dental-clinic-operations">See ${esc(MODS.CONNECTED.short)}</a> · <a href="/contact">Book a demo of ${esc(MODS.CONNECTED.short)}</a></p>
      </div></section>
      <section><div class="ch-container">
        <h2>${esc(MODS.TABLE.title)}</h2>
        <p>${esc(MODS.TABLE.sub)}</p>
        <table>
          <caption>${esc(MODS.TABLE.caption)}</caption>
          <thead><tr><th>What it covers</th>${MODS.TABLE.cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
          <tbody>${MODS.TABLE.rows.map(([label, cells]) => `<tr><th>${esc(label)}</th>${cells.map((v) => `<td>${{ yes: 'Included', opt: 'Add-on', no: '—' }[v]}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
        <p>Prices: the Clinic OS starting price is on our <a href="/pricing">pricing page</a>; the AI modules are priced with you.</p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        ${faqHtml(MODS.FAQS, 'Questions clinics ask about the modules')}
        <p><a href="/contact">Book a demo</a> · <a href="/demos">Watch the demo videos</a></p>
      </div></section>`,
  },
  {
    slug: 'ai-receptionist',
    title: AIR.TITLE,
    description: AIR.DESCRIPTION,
    canonical: `${ORIGIN}/ai-receptionist`,
    jsonld: [orgLd, faqPageLd(AIR.FAQS)],
    content: `
      <section><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">AI receptionist for dental clinics</p>
        <h1 class="ch-hero-title">${esc(AIR.HERO.title)}</h1>
        <p>${esc(AIR.HERO.sub)}</p>
        <p>${esc(POS.AI_TRAINED_FOR_DENTISTRY)}</p>
        <h2>${esc(AIR.MATHS.title)}</h2><p>${esc(AIR.MATHS.body)}</p>
        <h2>What the AI receptionist does</h2>${pairsHtml(AIR.CAPABILITIES)}
        <h2>${esc(AIR.STAGE.title)}</h2><p>${esc(AIR.STAGE.body)}</p>
        ${faqHtml(AIR.FAQS, 'AI receptionist questions, answered')}
        <p><a href="/whatsapp-automation-for-clinics">WhatsApp automation for clinics</a> · <a href="/pricing">Pricing</a> · <a href="/demos">Watch the demos</a> · <a href="/modules">Buy Aumy Chat or Aumy Voice on its own</a></p>
      </div></section>`,
  },
  {
    slug: 'whatsapp-automation-for-clinics',
    title: WA.TITLE,
    description: WA.DESCRIPTION,
    canonical: `${ORIGIN}/whatsapp-automation-for-clinics`,
    jsonld: [orgLd, faqPageLd(WA.FAQS)],
    content: `
      <section><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">WhatsApp automation for dental clinics</p>
        <h1 class="ch-hero-title">${esc(WA.HERO.title)}</h1>
        <p>${esc(WA.HERO.sub)}</p>
        <p>${esc(POS.AI_TRAINED_FOR_DENTISTRY)}</p>
        <h2>${esc(WA.JOURNEY.title)}</h2><p>${esc(WA.JOURNEY.body)}</p>
        ${pairsHtml(WA.STAGES)}
        <h2>Not another broadcast tool</h2>${pairsHtml(WA.DIFFERENCE)}
        ${faqHtml(WA.FAQS, 'WhatsApp automation questions, answered')}
        <p><a href="/ai-receptionist">The AI receptionist</a> · <a href="/pricing">Pricing</a> · <a href="/demos">Watch the demos</a> · <a href="/modules">Buy Aumy Chat on its own</a></p>
      </div></section>`,
  },
  {
    slug: 'ai-dental-software-india',
    title: ADS.TITLE,
    description: ADS.DESCRIPTION,
    canonical: `${ORIGIN}/ai-dental-software-india`,
    jsonld: [orgLd, dentalSoftwareLd, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ADS.FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }, {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${ORIGIN}/ai-dental-software-india`,
      name: ADS.TITLE,
      dateModified: ADS.UPDATED_ISO,
      about: { '@id': `${ORIGIN}/#aumy-dental` },
    }, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Aumy', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'AI dental software India', item: `${ORIGIN}/ai-dental-software-india` },
      ],
    }],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(ADS.HERO.eyebrow)}</p>
        <h1 class="ch-hero-title">${esc(ADS.HERO.h1)}</h1>
        <p class="ch-hero-sub">${esc(ADS.HERO.sub)}</p>
        <p><a href="/demos">Watch it work, live</a> · <a href="/pricing">See pricing in ₹</a></p>
        <p>Try it yourself: WhatsApp our demo dental clinic at +91 90223 12554 and book, reschedule or cancel like a patient would — or call +91 22 6423 0581 and wait a couple of rings for Aumy Voice to pick up. (Demo clinic: Lumière Dental.) That live demo is Aumy Chat and Aumy Voice only — for a full Aumy One demo, call us on +91 80071 89868.</p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>What is AI dental software?</h2>
        ${ADS.DEFINITION.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
        <h2>What Aumy’s AI does in your clinic</h2>
        <ul>
          ${ADS.CAPABILITIES.map(([t, b]) => `<li><strong>${esc(t)}</strong> — ${esc(b)}</li>`).join('\n          ')}
        </ul>
        <h2>Built for dental clinics in India</h2>
        <ul>
          ${ADS.INDIA.map(([t, b]) => `<li><strong>${esc(t)}</strong> — ${esc(b)}</li>`).join('\n          ')}
        </ul>
        <h2>AI dental software vs traditional dental software</h2>
        <table>
          <thead><tr>${ADS.COMPARE.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>
            ${ADS.COMPARE.rows.map(([k, a, b]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('\n            ')}
          </tbody>
        </table>
        ${clinicsStripHtml()}
        <h2>How to choose AI dental software in India: six questions to ask</h2>
        <ol>
          ${ADS.CHOOSE.map(([t, b]) => `<li><strong>${esc(t)}</strong> ${esc(b)}</li>`).join('\n          ')}
        </ol>
        <h2>AI dental software questions, answered</h2>
        ${ADS.FAQS.map((f) => `<h3>${esc(f.q)}</h3>\n        <p>${esc(f.a)}</p>`).join('\n        ')}
        <p>Last updated ${esc(ADS.UPDATED)}. Comparing named products? <a href="/growth/best-dental-software-india">Best dental software in India (2026): an honest comparison</a>. See also <a href="/modules/automate-dental-clinic-operations">Aumy One</a>, <a href="/modules/dental-patient-follow-up">Aumy Journey</a>, <a href="/switch">switching dental software</a> and <a href="/modules">the modules you can buy on their own</a>.</p>
        <p><a href="/contact">Talk to us</a></p>
      </div></section>`,
  },
  // The two search themes the site targets (owner 2026-09-18). Each has a
  // React page (src/pages/AIDentalClinicOperationsPage.js,
  // AIPatientEngagementPage.js) — keep this crawler copy in step with them.
  {
    slug: '',
    // Outcomes as a service (owner 2026-10-22). Words: src/data/homeOutcomes.js + src/data/homeFaq.js, the same
    // files src/pages/Home.js renders. SEO strings also in public/index.html. No module names on this page:
    // the one quiet link to /modules sits in the closing band; module terms belong to the module pages.
    title: HO.SEO.title,
    description: HO.SEO.description,
    canonical: `${ORIGIN}/`,
    ogImage: `${ORIGIN}${HO.SEO.shareImage}`,
    // The Sterling film (hero), Dr Ronak's video and the full demo film are on this page. The module explainer
    // VideoObjects moved to /revenue-generator, the page that shows those videos.
    jsonld: [orgLd, dentalSoftwareLd, faqLd, videoLd, filmVideoLd, explainerVideoLd[0]],
    content: homeContent(),
  },
  {
    slug: 'revenue-generator',
    // "How Aumy works" (2026-10-22): leads with the five "How we work" steps. Words: src/data/howItWorks.js and
    // src/data/homeOutcomes.js (same files as the React page).
    title: HOW.HOW_SEO.title,
    description: HOW.HOW_SEO.description,
    canonical: `${ORIGIN}/revenue-generator`,
    ogImage: `${ORIGIN}${HO.SEO.shareImage}`,
    // The module explainer videos play on this page (src/components/HomeExplainers.js); moved from home 2026-10-22.
    jsonld: [orgLd, ...explainerVideoLd.slice(1)],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(HOW.HOW_HERO.eyebrow)}</p>
        <h1 class="ch-hero-title">${esc(HOW.HOW_HERO.title)}</h1>
        <p class="ch-hero-sub">${esc(HOW.HOW_HERO.sub)}</p>
        <p><a href="${HO.HERO.primary.to}">${esc(HO.HERO.primary.label)}</a> · <a href="${esc(HO.HERO.whatsapp.href)}">${esc(HO.HERO.whatsapp.label)}</a></p>
      </div></section>
      ${howWeWorkHtml(HOW.HOW_HERO.stepsEyebrow)}
      <section><div class="ch-container ch-narrow">
        <h2>We work for your team, not around it.</h2>
        <ul>
          ${HOW.HOW_CONTROL.map((c) => `<li><strong>${esc(c.title)}</strong> — ${esc(c.body)}</li>`).join('\n          ')}
        </ul>
        <h2>${esc(EXPL.TITLE)}</h2>
        <ul>
          ${EXPL.VIDEOS.map((v) => `<li><a href="${v.src}"><strong>${esc(v.name)}</strong> explainer video</a> — ${esc(v.line)}</li>`).join('\n          ')}
        </ul>
        <p>${esc(HO.FINAL.modulesLead)} <a href="${HO.FINAL.modulesLink.to}">${esc(HO.FINAL.modulesLink.label)}</a></p>
        <h2>Busy clinics already run on Aumy.</h2>
        <blockquote>“${esc(HOW.HOW_PROOF.quote)}” — ${esc(HOW.HOW_PROOF.who)}</blockquote>
        <p><strong>${esc(HOW.HOW_PROOF.number)}</strong> ${esc(HOW.HOW_PROOF.numberText)} <a href="/#google-reviews">Read what clinic owners say</a></p>
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
    slug: '4c-scorecard',
    title: 'The 4C Scorecard: a free audit for dental clinics | AUM AI',
    description:
      'Score your dental clinic on the eight systems that keep chairs full: Convert, Confirm, Care, Come back. 40 questions, ten minutes, and a printable audit report of what to fix first.',
    canonical: `${ORIGIN}/4c-scorecard`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">The Full Chair Method · free clinic audit</p>
        <h1 class="ch-hero-title">The 4C Scorecard</h1>
        <p class="ch-hero-sub">Eight systems keep a dental clinic’s chairs full. Score your clinic on each one in about ten minutes, then get a printable audit report of what to fix first.</p>
        <ul>
          <li>Convert: The Decision Path, Every Call Answered.</li>
          <li>Confirm: Confirm Twice, Remind Once, Same-Week Rebook.</li>
          <li>Care: Advised to Accepted, Finish Line, BIT (Be In Touch).</li>
          <li>Come back: Smart Comebacks.</li>
        </ul>
        <p>Always scores 2, sometimes 1, never or don’t know 0. 9 to 10: running tight. 5 to 8: can do better. Below 5: leaking patients.</p>
      </div></section>`,
  },
  // The Full Chair Method information page (owner 2026-10-19): public and in the
  // sitemap. Every word comes from src/data/masterclass.js, as on the React page.
  {
    slug: 'masterclass',
    title: MC.SEO.title,
    description: MC.SEO.description,
    canonical: `${ORIGIN}${MC.PATHS.info}`,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: `${MC.TITLE}: the 4C Framework`,
        description: MC.SEO.description,
        inLanguage: 'en-IN',
        provider: { '@type': 'Organization', name: 'AUM AI', sameAs: ORIGIN },
        // The offer is the kit, paid once (owner 2026-10-25); the video plays on the page with an account.
        offers: { '@type': 'Offer', price: MC.PRICE_LABEL.replace(/[^\d.]/g, ''), priceCurrency: 'INR', category: 'Paid', url: `${ORIGIN}${MC.PATHS.register}`, description: `This offer is the kit, paid once: the Clinic Master Sheet, the Claude skill file, the Prompt Pack and the slides, with lifetime access. The masterclass video plays on this page with an account.` },
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: MC.VIDEO.duration, instructor: { '@type': 'Person', name: MC.TRAINER.name } },
      },
      faqPageLd(MC.FAQS),
      // The full masterclass, on YouTube and embedded right under the title (owner 2026-10-25, 2026-10-26).
      {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: MC.VIDEO.name,
        description: MC.VIDEO.description,
        thumbnailUrl: [`https://i.ytimg.com/vi/${MC.VIDEO.youtubeId}/maxresdefault.jpg`, `https://i.ytimg.com/vi/${MC.VIDEO.youtubeId}/hqdefault.jpg`],
        uploadDate: isoDateTime(MC.VIDEO.uploadDate),
        duration: MC.VIDEO.duration,
        embedUrl: `https://www.youtube.com/embed/${MC.VIDEO.youtubeId}`,
        url: `https://www.youtube.com/watch?v=${MC.VIDEO.youtubeId}`,
        inLanguage: 'en',
        isFamilyFriendly: true,
        publisher: { '@type': 'Organization', name: 'AUM AI', url: ORIGIN },
        author: { '@type': 'Person', '@id': `${ORIGIN}/about#founder`, name: MC.TRAINER.name, url: `${ORIGIN}/about` },
      },
    ],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p><a href="${MC.PATHS.signIn}">Already have an account? Sign in to your masterclass</a></p>
        <p class="ch-eyebrow">${esc(MC.HERO.eyebrow)}</p>
        <h1 class="ch-hero-title">${esc(MC.HERO.title)}</h1>
        <div id="watch">
          <h2>${esc(MC.VIDEO.title)}</h2>
          <p>${esc(MC.VIDEO.intro)}</p>
          <p>${esc(MC.GATE.blurb)} <a href="${MC.PATHS.signIn}">${esc(MC.GATE.title)}</a></p>
          <iframe src="https://www.youtube-nocookie.com/embed/${MC.VIDEO.youtubeId}?rel=0&amp;modestbranding=1" title="${esc(MC.VIDEO.name)}" width="1040" height="585" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <ul>${MC.HERO.facts.map((f) => `<li><strong>${esc(f.b)}</strong> ${esc(f.t)}</li>`).join('')}</ul>
        <p>${esc(MC.VIDEO.kitNote)} <a href="${MC.PATHS.register}">${esc(MC.CTA.kit)}</a></p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <p class="ch-hero-sub">${esc(MC.HERO.promise)}</p>
        <p>${esc(MC.HERO.who)}</p>
        <p>${esc(MC.HERO.note)}</p>
        <ul>${MC.STAGES.map((s) => `<li><strong>${esc(s.c)}.</strong> ${esc(s.line)}</li>`).join('')}</ul>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(MC.PROBLEM.title)}</h2>
        <p>${esc(MC.PROBLEM.intro)}</p>
        <ul>${MC.PROBLEM.leaks.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
        <h3>${esc(MC.PROBLEM.numbersTitle)}</h3>
        <ul>${MC.PROBLEM.numbers.map((x) => `<li><strong>${esc(x.n)}</strong> ${esc(x.t)}</li>`).join('')}</ul>
        <p>${esc(MC.PROBLEM.numbersNote)}</p>
        <p>${esc(MC.PROBLEM.closeA)} ${esc(MC.PROBLEM.closeB)} ${esc(MC.PROBLEM.closeC)}</p>
        <h3>${esc(MC.BEFORE_AFTER.title)}</h3>
        <p>${esc(MC.BEFORE_AFTER.intro)}</p>
        <ul>${MC.BEFORE_AFTER.rows.map((x) => `<li><strong>${esc(x.sys)}.</strong> Before: ${esc(x.before)} After: ${esc(x.after)}</li>`).join("")}</ul>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(MC.LEARN.title)}</h2>
        <p>${esc(MC.LEARN.intro)}</p>
        ${MC.STAGES.map((s) => `<h3>${esc(s.c)}: ${esc(s.line)}</h3><ul>${s.items.map((it) => `<li><strong>${it.foundation ? 'Foundation' : 'System'} ${esc(it.n)} · ${esc(it.name)}.</strong> ${esc(it.t)}</li>`).join('')}</ul>`).join('')}
        ${MC.LEARN.extras.map((x) => `<h3>${esc(x.h)}</h3><p>${esc(x.t)}</p>`).join('')}
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(MC.WAYS.title)}</h2>
        <p>${esc(MC.WAYS.intro)}</p>
        <ol>${MC.WAYS.items.map((w) => `<li><strong>${esc(w.h)}.</strong> ${esc(w.t)}</li>`).join('')}</ol>
        <p>${esc(MC.WAYS.noSoftware)}</p>
        <h3>${esc(MC.WAYS.buildTitle)}</h3>
        <ol>${MC.WAYS.build.map((b) => `<li>${esc(b)}</li>`).join('')}</ol>
        <p>${esc(MC.WAYS.buildNote)}</p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(MC.KIT.title)}</h2>
        <p>${esc(MC.KIT.intro)}</p>
        <ul>${MC.KIT.items.map((k) => `<li><strong>${k.wa ? `<a href="${MC.WHATSAPP.link}">${esc(k.h)}</a>` : esc(k.h)}.</strong> ${esc(k.t)}</li>`).join('')}</ul>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(MC.EXPECT.title)}</h2>
        ${MC.EXPECT.items.map((x) => `<h3>${esc(x.h)}</h3><p>${esc(x.t)}</p>`).join('')}
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(MC.FOR_WHO.title)}</h2>
        <h3>For you if</h3><ul>${MC.FOR_WHO.yes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <h3>Not for you if</h3><ul>${MC.FOR_WHO.no.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <p>${esc(MC.FOR_WHO.skinNote)}</p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(MC.TRAINER.title)}</h2>
        <h3>${esc(MC.TRAINER.name)}, ${esc(MC.TRAINER.role)}</h3>
        ${MC.TRAINER.bio.map((b) => `<p>${esc(b)}</p>`).join('')}
        <p><a href="/about">More about Jayesh</a></p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        ${faqHtml(MC.FAQS, 'Questions, answered')}
        <p><a href="/refund#masterclass">The full refund policy</a></p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(MC.FINAL.title)}</h2>
        <p>${esc(MC.FINAL.text)}</p>
        <p><a href="#watch">${esc(MC.CTA.watch)}</a> · <a href="${MC.PATHS.register}">${esc(MC.CTA.kit)}</a></p>
        <p><a href="${MC.WHATSAPP.link}">${esc(MC.FINAL.questions)}</a></p>
        <p>${esc(MC.MEMBER.licence)}</p>
      </div></section>`,
  },
  // Masterclass members area (owner 2026-10-18; sign-in moved to /masterclass/sign-in
  // on 2026-10-19; free accounts, owner 2026-10-25). Private: noindex, nofollow, out of
  // seo-files.js's sitemap. Only the public sign-in words are here; the video, the
  // Clinic Master Sheet and member details exist only after sign-in, in the browser.
  ...['masterclass/sign-in', 'masterclass/my'].map((slug) => ({
    slug,
    noindex: true,
    title: 'Masterclass members | AUM AI',
    description: 'Watch The Full Chair Method masterclass: sign in, or create your account.',
    canonical: `${ORIGIN}${MC.PATHS.signIn}`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">The Full Chair Method · Masterclass</p>
        <h1 class="ch-hero-title">${esc(MC.SIGNIN.title)}</h1>
        <p class="ch-hero-sub">${esc(MC.SIGNIN.sub)}</p>
        <h2>${esc(MC.SIGNIN.signInTitle)}</h2>
        <p>${esc(MC.SIGNIN.signInBlurb)}</p>
        <h2>${esc(MC.SIGNIN.createTitle)}</h2>
        <p>${esc(MC.SIGNIN.createBlurb)}</p>
      </div></section>`,
  })),
  // Clinic websites built for search (owner 2026-10-19): public and in the sitemap.
  // Every word comes from src/data/clinicWebsites.js, as on the React page.
  {
    slug: CW.PATH.slice(1),
    title: CW.SEO.title,
    description: CW.SEO.description,
    canonical: `${ORIGIN}${CW.PATH}`,
    ogImage: `${ORIGIN}${CW.IMG.desktop.src}`,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${ORIGIN}${CW.PATH}#service`,
        name: 'Clinic websites built for SEO and international patients',
        serviceType: 'Clinic website design and search engine optimisation',
        description: CW.SEO.description,
        url: `${ORIGIN}${CW.PATH}`,
        provider: { '@id': `${ORIGIN}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        audience: { '@type': 'BusinessAudience', audienceType: 'Dental and skin clinics' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: CW.BUILD.title,
          itemListElement: CW.BUILD.items.map((b) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: b.h, description: b.t } })),
        },
        subjectOf: { '@type': 'WebSite', name: 'The Sterling Dental Clinic', url: CW.CASE.link.href, creator: { '@id': `${ORIGIN}/#organization` } },
      },
      faqPageLd(CW.FAQS),
    ],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(CW.HERO.eyebrow)}</p>
        <h1 class="ch-hero-title">${esc(CW.HERO.titleA)} ${esc(CW.HERO.titleB)}</h1>
        <p class="ch-hero-sub">${esc(CW.HERO.sub)}</p>
        <p><a href="#audit">${esc(CW.HERO.cta)}</a> · <a href="${CW.WHATSAPP.link}">WhatsApp ${esc(CW.WHATSAPP.display)}</a></p>
        <p>${esc(CW.HERO.trust)}</p>
        <p><img src="${CW.IMG.desktop.src}" width="${CW.IMG.desktop.w}" height="${CW.IMG.desktop.h}" alt="${esc(CW.IMG.desktop.alt)}"></p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(CW.PROBLEMS.title)}</h2>
        <p>${esc(CW.PROBLEMS.intro)}</p>
        <ul>${CW.PROBLEMS.items.map((p) => `<li><strong>${esc(p.h)}.</strong> ${esc(p.t)}</li>`).join('')}</ul>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(CW.BUILD.title)}: ${esc(CW.BUILD.headingA)} ${esc(CW.BUILD.headingEm)} ${esc(CW.BUILD.headingB)}</h2>
        <p>${esc(CW.BUILD.intro)}</p>
        <ul>${CW.BUILD.items.map((b) => `<li><strong>${esc(b.h)}.</strong> ${esc(b.t)}</li>`).join('')}</ul>
      </div></section>
      <section id="sterling"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(CW.CASE.eyebrow)}</p>
        <h2>${esc(CW.CASE.title)}</h2>
        <p>${esc(CW.CASE.intro)}</p>
        <ul>${CW.CASE.stats.map((s) => `<li><strong>${esc(s.n)}</strong> ${esc(s.t)}</li>`).join('')}</ul>
        <h3>What we did</h3>
        <ul>${CW.CASE.did.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
        <h3>${esc(CW.CASE.goalTitle)}</h3>
        <p>${esc(CW.CASE.goal)}</p>
        <p><a href="${CW.CASE.link.href}">${esc(CW.CASE.link.label)}</a></p>
        <p>${esc(CW.CASE.credit)}</p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${esc(CW.STEPS.title)}</h2>
        <ol>${CW.STEPS.items.map((s) => `<li><strong>${esc(s.h)}.</strong> ${esc(s.t)}</li>`).join('')}</ol>
      </div></section>
      <section><div class="ch-container ch-narrow">
        ${faqHtml(CW.FAQS, 'Questions, answered')}
      </div></section>
      <section id="audit"><div class="ch-container ch-narrow">
        <h2>${esc(CW.AUDIT.title)}</h2>
        <p>${esc(CW.AUDIT.intro)}</p>
        <p><a href="${CW.WHATSAPP.link}">WhatsApp ${esc(CW.WHATSAPP.display)}</a></p>
        <h2>${esc(CW.FINAL.title)}</h2>
        <p>${esc(CW.FINAL.text)}</p>
      </div></section>`,
  },
  // Short address: /websites → /clinic-websites (React: <Navigate>; crawlers: refresh + canonical).
  ...CW.ALIASES.map((alias) => ({
    slug: alias.slice(1),
    title: CW.SEO.title,
    description: CW.SEO.description,
    canonical: `${ORIGIN}${CW.PATH}`,
    refresh: CW.PATH,
    content: `<section><div class="ch-container ch-narrow"><p>This page has moved: <a href="${CW.PATH}">${esc(CW.HERO.titleA)} ${esc(CW.HERO.titleB)}</a>.</p></div></section>`,
  })),
  // Services (owner 2026-10-23): public and in the sitemap.
  serviceRoute(DSEO),
  serviceRoute(DADS),
  // Public and indexable, but out of the sitemap for now (owner 2026-10-18). The
  // price comes from the backend at run time; the default label is written here.
  {
    slug: 'masterclass/register',
    title: 'Get The Full Chair Method kit | AUM AI',
    description: MC.REGISTER_SEO_DESCRIPTION,
    canonical: `${ORIGIN}${MC.PATHS.register}`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">The Full Chair Method · Masterclass</p>
        <h1 class="ch-hero-title">${esc(MC.REGISTER.title)}</h1>
        <p class="ch-hero-sub">${esc(MC.REGISTER.lead)}</p>
        <ul>${MC.REGISTER.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        <p><a href="${MC.PATHS.info}">See everything the masterclass covers</a></p>
        <p><a href="${MC.PATHS.info}#watch">${esc(MC.REGISTER.watchLink)}</a></p>
        <p>Type your name, clinic, city, email and WhatsApp number, and pay ${esc(MC.PRICE_LABEL)} once, securely by Razorpay. Your account and every download are ready the moment the payment is confirmed. Already have an account? <a href="${MC.PATHS.signIn}">Sign in</a>.</p>
      </div></section>`,
  },
  {
    slug: 'masterclass-admin',
    noindex: true,
    title: 'Masterclass members · AUM AI admin',
    description: 'AUM AI admin.',
    canonical: `${ORIGIN}/masterclass-admin`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">AUM AI admin</p>
        <h1 class="ch-hero-title">Masterclass members</h1>
        <p class="ch-hero-sub">Enter the dashboard password to continue.</p>
      </div></section>`,
  },
  // Routes that are in the sitemap but were never prerendered (audit
  // 2026-09-18): the SPA fallback served the HOME page's title, description
  // and H1 for all six, so crawlers saw six copies of the home page. Minimal
  // entries — the React pages carry the full content client-side.
  {
    slug: 'demos',
    title: 'Watch Aumy in Action — Demo Videos | Aumy by AUM AI',
    description:
      'Short, unedited demos of Aumy running a dental clinic: answering WhatsApp, booking and rescheduling, after-care, care-gap follow-ups and campaigns — the AI-powered patient journey, live.',
    canonical: `${ORIGIN}/demos`,
    jsonld: [orgLd, filmVideoLd],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">See it, don't take our word for it</p>
        <h1 class="ch-hero-title">Watch Aumy run a clinic — live, unscripted</h1>
        <p class="ch-hero-sub">Short, unedited demos of the live product: answering a real clinic's WhatsApp, booking, rescheduling, after-care and follow-ups. Start with the full 9-minute demo: <a href="https://www.youtube.com/watch?v=0LE0iwNvcZQ">watch Aumy run a dental clinic, start to finish</a>. Prefer to feel it? WhatsApp our live demo clinic on +91 90223 12554 as if you were a patient.</p>
        <p><a href="/modules/automate-dental-clinic-operations">Aumy One</a> · <a href="/modules/dental-patient-follow-up">Aumy Journey</a></p>
      </div></section>`,
  },
  {
    slug: 'compliance',
    title: COMP.TITLE,
    description: COMP.DESCRIPTION,
    canonical: `${ORIGIN}/compliance`,
    jsonld: [orgLd],
    content: `
      <section><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">Security &amp; compliance</p>
        <h1 class="ch-hero-title">${esc(COMP.HEADLINE)}</h1>
        <p class="ch-hero-sub">${esc(COMP.SUBTITLE)}</p>
        <p>${esc(COMP.INTRO)}</p>
        ${COMP.SECTIONS.map((sec) => `<h2>${esc(sec.title)}</h2>${sec.lead ? `<p>${esc(sec.lead)}</p>` : ''}<ul>${sec.items.map(([k, v]) => `<li>${k ? `<strong>${esc(k)}</strong> ` : ''}${esc(v)}</li>`).join('')}</ul>`).join('')}
        <p>${esc(COMP.DISCLAIMER)}</p>
        <p>Questions from your IT or compliance team? Email <a href="mailto:${COMP.CONTACT_EMAIL}">${COMP.CONTACT_EMAIL}</a>.</p>
      </div></section>`,
  },
  {
    slug: 'platform-partner',
    title: 'White-Label Platform Partner Program — Resell Aumy Under Your Own Brand | AUM AI',
    description:
      'Run Aumy as your own platform: white-labelled, exclusive in your territory, simple per-clinic rental. We carry the technology; you grow the clients.',
    canonical: `${ORIGIN}/platform-partner`,
    jsonld: [orgLd],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">Platform partner program</p>
        <h1 class="ch-hero-title">Run Aumy as your own platform — and own your territory.</h1>
        <p class="ch-hero-sub">Your brand, white-labelled. Exclusive in your territory. Simple per-clinic rental. Sell the whole system — AI-powered clinic operations and the patient journey — while we carry the technology.</p>
      </div></section>`,
  },
  {
    slug: 'facebook-instagram',
    title: 'Facebook & Instagram AI Receptionist for Clinics | AUM AI',
    description:
      'Aumy answers Facebook and Instagram messages for dental clinics the way it answers WhatsApp — instantly, in the patient’s own language — and books the appointment. Part of AI-powered clinic operations.',
    canonical: `${ORIGIN}/facebook-instagram`,
    jsonld: [orgLd],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">Facebook &amp; Instagram</p>
        <h1 class="ch-hero-title">AI receptionist for Facebook &amp; Instagram messages</h1>
        <p class="ch-hero-sub">Enquiries that arrive as Facebook or Instagram messages get the same instant, in-context answer as WhatsApp — and the same booking, follow-up and one-tap human takeover.</p>
        <p><a href="/ai-receptionist">The AI receptionist</a> · <a href="/modules/automate-dental-clinic-operations">Aumy One</a></p>
      </div></section>`,
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy | AUM AI',
    description: 'How AUM AI Healthcare Solutions collects, uses and protects personal data across Aumy and aumai.co.in.',
    canonical: `${ORIGIN}/privacy`,
    content: `
      <section><div class="ch-container ch-narrow">
        <h1 class="ch-hero-title">Privacy Policy</h1>
        <p>How AUM AI Healthcare Solutions collects, uses and protects personal data across Aumy and aumai.co.in.</p>
      </div></section>`,
  },
  {
    slug: 'terms',
    title: 'Terms and Conditions | AUM AI',
    description: 'The terms and conditions for using Aumy and the aumai.co.in website.',
    canonical: `${ORIGIN}/terms`,
    content: `
      <section><div class="ch-container ch-narrow">
        <h1 class="ch-hero-title">Terms and Conditions</h1>
        <p>The terms and conditions for using Aumy and the aumai.co.in website.</p>
      </div></section>`,
  },
  // The refund page (src/pages/CancellationRefund.js). The masterclass rule comes
  // from src/data/masterclassRefund.js, the same file the page reads.
  {
    slug: 'refund',
    title: 'Cancellation & Refund Policy | AUM AI',
    description: 'How cancellations and refunds work at AUM AI, including The Full Chair Method masterclass.',
    canonical: `${ORIGIN}/refund`,
    content: `
      <section><div class="ch-container ch-narrow">
        <h1 class="ch-hero-title">Cancellation &amp; Refund Policy</h1>
        <p>Cancellations of a service agreement are handled under the terms of that agreement; write to ${esc(MC_REFUND.CONTACT_EMAIL)}.</p>
        <h2>Masterclass: ${esc(MC_REFUND.HEADING)}</h2>
        <ul>${MC_REFUND.RULES.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
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
    title: 'Switch Dental Software Without Losing a Single Record — Move to Aumy | AUM AI',
    description:
      'Whatever dental software your clinic uses today, Aumy keeps your data in sync from day one. Ready for one connected platform? We migrate patients, appointments, treatment history, notes and images into Aumy for a one-time migration fee. No downtime.',
    canonical: `${ORIGIN}/switch`,
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">Moving from your current dental software</p>
        <h1 class="ch-hero-title">Switch without losing a single patient record.</h1>
        <p class="ch-hero-sub">Your data is not locked in. Whatever software your clinic runs today, Aumy keeps your data in sync with it from day one. When you are ready for one connected platform, we migrate patients, appointment history, treatment history, clinical notes, X-rays and images into Aumy for a one-time migration fee — with no downtime and nothing re-typed.</p>
        <h2>How the move works</h2>
        <ol>
          <li><b>Sync</b> — Aumy keeps your current software and Aumy in step from day one.</li>
          <li><b>Run on top</b> — the Aumy modules you pick start working on the synced data.</li>
          <li><b>Migrate when you are ready</b> — full history moved, counts verified with you, sync kept running until you switch the old system off.</li>
        </ol>
        <p><a href="/contact">Book a migration call</a> · <a href="/pricing">See pricing</a> · <a href="/revenue-generator">How Aumy works</a></p>
      </div></section>`,
  },
  {
    slug: 'missed-call-calculator',
    title: 'Missed Call Calculator for Dental Clinics — What Unanswered Calls Cost | Aumy',
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
        <p><strong>India:</strong> AUM AI Healthcare Solutions &middot; Sr. No. 78, Sasane Nagar, Lane 1, Hadapsar, Pune, Maharashtra 411028, India &middot; jayesh.chaudhari@aumai.co.in &middot; +91 800 718 9868</p>
        <p><strong>United States:</strong> AUM AI Healthcare Technology LLC &middot; 30 N Gould St, Ste N, Sheridan, WY 82801 &middot; jayesh@aumyai.com &middot; +1 (307) 263-5098</p>
      </div></section>`,
  },
  {
    slug: 'about',
    title: `About Aumy & its founder, ${FOUNDER.NAME} | AI Dental Software`,
    description: `Aumy is built by ${FOUNDER.NAME}: ${FOUNDER.SUMMARY}`,
    canonical: `${ORIGIN}/about`,
    ogImage: `${ORIGIN}${HO.SEO.shareImage}`,
    jsonld: [orgLd, {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://aumai.co.in/about#founder',
      name: FOUNDER.NAME,
      jobTitle: FOUNDER.ROLE,
      description: FOUNDER.SUMMARY,
      worksFor: { '@type': 'Organization', name: 'AUM AI Healthcare Solutions', url: `${ORIGIN}/` },
      knowsAbout: FOUNDER.EXPERTISE.map((e) => e.title),
      url: `${ORIGIN}/about`,
      sameAs: ['https://www.linkedin.com/in/chaudhari-jayesh-b9762a3b/'],
    }],
    content: `
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">The founder</p>
        <h1 class="ch-hero-title">${FOUNDER.YEARS} years inside healthcare. One problem, seen in clinic after clinic.</h1>
        <p class="ch-hero-sub">${esc(FOUNDER.NAME)} &middot; ${esc(FOUNDER.ROLE)}. ${esc(FOUNDER.SUMMARY)}</p>
      </div></section>
      ${howWeWorkHtml()}
      <section><div class="ch-container ch-narrow">
        ${FOUNDER.STORY.map((p) => `<p>${esc(p)}</p>`).join('')}
        <h2>${esc(POS.WHY_DENTAL_ONLY.title)}</h2>
        <p>${esc(POS.WHY_DENTAL_ONLY.body)}</p>
        <h2>What he brings</h2>
        <ul>${FOUNDER.EXPERTISE.map((e) => `<li><strong>${esc(e.title)}</strong> — ${esc(e.body)}</li>`).join('')}</ul>
        <h2>Career</h2>
        <ul>${FOUNDER.CAREER.map((c) => `<li>${esc(c.years)} · ${esc(c.role)}, ${esc(c.org)} — ${esc(c.what)}</li>`).join('')}</ul>
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
    `<h2><a href="${RYC.HUB_PATH}">${esc(RYC.SERIES.name)}</a></h2><p>${esc(RYC.SERIES.eyebrow)}. ${esc(RYC.SERIES.hubBlurb)} <a href="${RYC.HUB_PATH}">Watch the series</a></p>` +
    `<p><a href="/growth-audit">Get my free Clinic Audit</a> · <a href="/leak-calculator">Try the 60-second check</a></p>
      </div></section>`,
});
for (const p of growthPosts) {
  routes.push({
    slug: `growth/${p.slug}`,
    title: `${p.title} | Aumy`,
    description: p.description,
    canonical: `${ORIGIN}/growth/${p.slug}`,
    // Social shares of articles need an image; the dental hero is the site
    // default until articles get their own art.
    ogImage: `${ORIGIN}${HO.SEO.shareImage}`,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        dateModified: p.updated || p.date,
        // Google wants author.url (Search Console, 26 Oct); every guide is by the founder (/about#founder).
        author: p.author === FOUNDER.NAME
          ? { '@type': 'Person', '@id': `${ORIGIN}/about#founder`, name: p.author, url: `${ORIGIN}/about` }
          : { '@type': 'Person', name: p.author },
        publisher: {
          '@type': 'Organization',
          name: 'AUM AI Healthcare Solutions',
          logo: { '@type': 'ImageObject', url: `${ORIGIN}${HO.LOGO_URL}` },
        },
        mainEntityOfPage: `${ORIGIN}/growth/${p.slug}`,
      },
    ],
    content: `
      <article><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(p.category)}</p>
        <h1 class="ch-hero-title">${esc(p.title)}</h1>
        <p>${esc(p.author)} · ${p.date}${p.updated ? ` · Updated ${p.updated}` : ''} · ${esc(p.readingTime)}</p>
        ${p.body}
        <h2>Want to know what this looks like in your clinic?</h2>
        <p>Get a free Clinic Audit: where work gets stuck in your clinic and enquiries, appointments and returning patients slip through the cracks — and what each gap is worth. <a href="/growth-audit">Get my free Clinic Audit</a> · <a href="/leak-calculator">Run the 60-second check</a>. Want to see what this actually looks like? <a href="https://wa.me/918007189868?text=Hi">WhatsApp Aumy</a> — a live AI receptionist for a demo dental clinic (+91 80071 89868), any time, no sales call.</p>
      </div></article>`,
  });
}

// ---- How to Run Your Clinic — hub + one page per episode (owner 2026-10-13) ----
// Same words as src/pages/RunYourClinicHub.js / RunYourClinicEpisode.js (src/data/runYourClinic.js).
// The episode HTML carries the video itself, the chapters (?t= links), the full narration with each
// chapter as an H2, and the scorecard table — the same content people see.
const rycLine = (line) => {
  const lead = RYC.numberLead(line);
  return lead ? `<p><strong>${esc(lead[0])}</strong> ${esc(lead[1])}</p>` : `<p>${esc(line)}</p>`;
};
const rycScorecardHtml = (rows) =>
  `<table><caption>The clinic scorecard: each system and its one number</caption><thead><tr><th scope="col">#</th><th scope="col">System</th><th scope="col">The one number</th></tr></thead><tbody>` +
  rows.map((r, i) => `<tr><td>${i + 1}</td><th scope="row">${esc(r.system)}</th><td>${esc(r.number)}${r.aim ? `<br><em>${esc(r.aim)}</em>` : ''}</td></tr>`).join('') +
  `</tbody></table>`;
const rycEpisodeCardHtml = (ep) => ep.live
  ? `<li><a href="${RYC.episodePath(ep)}"><strong>Part ${ep.part}: ${esc(ep.title)}</strong></a> (${esc(ep.durationLabel)}) — ${esc(ep.card)}</li>`
  : `<li><strong>Part ${ep.part}: ${esc(ep.title)}</strong> — Coming next. ${esc(ep.card)}</li>`;
routes.push({
  slug: RYC.HUB_PATH.slice(1),
  title: RYC.SERIES.seoTitle,
  description: RYC.SERIES.seoDescription,
  canonical: `${ORIGIN}${RYC.HUB_PATH}`,
  ogImage: `${ORIGIN}${RYC.liveEpisodes()[0].poster}`,
  jsonld: [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: RYC.SERIES.name, item: `${ORIGIN}${RYC.HUB_PATH}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: RYC.SERIES.name,
      itemListElement: RYC.liveEpisodes().map((ep, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${ORIGIN}${RYC.episodePath(ep)}`,
        name: ep.h1,
      })),
    },
  ],
  content: `
      <nav aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li>${esc(RYC.SERIES.name)}</li></ol></nav>
      <section class="ch-hero"><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(RYC.SERIES.eyebrow)}</p>
        <h1 class="ch-hero-title">${esc(RYC.SERIES.h1)}</h1>
        <p class="ch-hero-sub">${esc(RYC.SERIES.intro)}</p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>Episodes</h2>
        <ol>
          ${RYC.EPISODES.map(rycEpisodeCardHtml).join('\n          ')}
        </ol>
      </div></section>`,
});
for (const ep of RYC.liveEpisodes()) {
  const url = `${ORIGIN}${RYC.episodePath(ep)}`;
  const next = RYC.nextEpisode(ep);
  routes.push({
    slug: RYC.episodePath(ep).slice(1),
    title: ep.seoTitle,
    description: ep.seoDescription,
    canonical: url,
    ogImage: `${ORIGIN}${ep.poster}`,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: ep.h1,
        description: ep.videoDescription,
        thumbnailUrl: `${ORIGIN}${ep.poster}`,
        uploadDate: isoDateTime(ep.uploadDate),
        duration: ep.duration,
        contentUrl: `${ORIGIN}${ep.src}`,
        inLanguage: 'en-IN',
        publisher: { '@type': 'Organization', name: 'AUM AI', logo: { '@type': 'ImageObject', url: `${ORIGIN}${HO.LOGO_URL}` } },
        hasPart: ep.chapters.map((c, i) => ({
          '@type': 'Clip',
          name: c.label,
          startOffset: c.start,
          endOffset: RYC.chapterEnd(ep, i),
          url: `${url}?t=${c.start}`,
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: RYC.SERIES.name, item: `${ORIGIN}${RYC.HUB_PATH}` },
          { '@type': 'ListItem', position: 3, name: `Part ${ep.part}: ${ep.title}`, item: url },
        ],
      },
    ],
    content: `
      <nav aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="${RYC.HUB_PATH}">${esc(RYC.SERIES.name)}</a></li><li>Part ${ep.part}</li></ol></nav>
      <article><div class="ch-container ch-narrow">
        <p class="ch-eyebrow">${esc(RYC.SERIES.name)} · Part ${ep.part} · ${esc(ep.durationLabel)}</p>
        <h1 class="ch-hero-title">${esc(ep.h1)}</h1>
        <video controls preload="none" playsinline poster="${ep.poster}" aria-label="Video: ${esc(ep.h1)}"><source src="${ep.src}" type="video/mp4"></video>
        <p>${esc(ep.lead)}</p>
        <h2>Chapters</h2>
        <ol>
          ${ep.chapters.map((c) => `<li><a href="?t=${c.start}">${RYC.clock(c.start)} ${esc(c.label)}</a></li>`).join('\n          ')}
        </ol>
        <p><strong>Example.</strong> ${esc(RYC.EXAMPLE_NOTE)}</p>
        ${ep.chapters.map((c) => `
        <h2>${esc(c.heading)}</h2>
        ${c.scorecard
          ? `${rycLine(c.lines[0])}${rycScorecardHtml(ep.scorecard)}${c.lines.slice(1).map(rycLine).join('')}`
          : c.lines.map(rycLine).join('')}`).join('')}
        ${next ? `<p>${next.live ? `Next: <a href="${RYC.episodePath(next)}">Part ${next.part}: ${esc(next.title)}</a>` : `Part ${next.part}, ${esc(next.title)}, is coming next. ${esc(next.card)}`}</p>` : ''}
        <p><a href="${RYC.HUB_PATH}">All episodes of ${esc(RYC.SERIES.name)}</a></p>
      </div></article>`,
  });
}

// ---- One page per Aumy module: /modules/<id> (owner 2026-10-08) ------------
// Same words as src/pages/ModuleDetailPage.js (PAGES in src/data/modules.js).
// INDIA_WHATSAPP.number in src/config/contact.js (ESM, so not require-able here).
const MODS_WA = '918007189868';
for (const p of MODS.PAGES) {
  const url = `${ORIGIN}/modules/${p.id}`;
  const pairs = p.pairs.map(MODS.pageById).filter(Boolean);
  routes.push({
    slug: `modules/${p.id}`,
    title: p.seoTitle,
    description: p.seoDescription,
    canonical: url,
    jsonld: [
      orgLd,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Modules', item: `${ORIGIN}/modules` },
          { '@type': 'ListItem', position: 3, name: p.short, item: url },
        ],
      },
      {
        // No offers/prices: /pricing owns them, and the AI modules are priced per clinic.
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': `${url}#software`,
        name: `${p.short}: ${p.title}`,
        url,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: p.keyword,
        operatingSystem: 'Web, Android, iOS',
        description: `${p.intro} ${POS.LD_SUFFIX}`,
        featureList: p.does,
        audience: { '@type': 'BusinessAudience', audienceType: 'Dental clinics' },
        isPartOf: { '@id': `${ORIGIN}/#aumy-dental` },
        provider: { '@type': 'Organization', name: 'AUM AI Healthcare Solutions', url: `${ORIGIN}/` },
      },
    ],
    content: `
      <nav aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/modules">Modules</a></li><li>${esc(p.short)}</li></ol></nav>
      <section class="ch-hero"><div class="ch-container ch-narrow">
        ${p.addonOf ? `<p>Add-on to ${esc(p.addonOf)}</p>` : ''}
        <p class="ch-eyebrow">${esc(p.short.toUpperCase())}</p>
        <h1 class="ch-hero-title">${esc(p.h1)}</h1>
        <p><strong>${esc(p.sub)}</strong></p>
        <p class="ch-hero-sub">${esc(p.intro)}</p>
        <p>${esc(POS.MODULES_LINE)}</p>
        ${STORES.isSelfServe(p.id) ? startInAppHtml(p.short) : ''}
        <p><a href="/contact">Book a demo</a> · <a href="https://wa.me/${MODS_WA}">WhatsApp us</a></p>
      </div></section>
      <section><div class="ch-container ch-narrow">
        <h2>${p.featured ? 'How it works, from enquiry to recall' : 'What it does'}</h2>
        <ul>${p.does.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
        ${p.addons.length ? `<p>Add if you want: ${p.addons.map((a) => `+ ${esc(a)}`).join(' · ')}</p>` : ''}
        <h2>Who it's for</h2>
        <ul>${p.whoFor.map((w) => `<li>${esc(w)}</li>`).join('')}</ul>
        <h2>What you get</h2>
        <ul>${p.outcomes.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
        <h2>${p.featured ? 'The modules inside Aumy One' : 'Works even better with'}</h2>
        <ul>
          ${moduleCardsHtml(pairs)}
        </ul>
        ${p.deep.length ? `<p>Go deeper: ${p.deep.map((d) => `<a href="${d.path}">${esc(d.label)}</a>`).join(' · ')}</p>` : ''}
        ${p.featured ? '' : `<h2>Or run it all as ${esc(MODS.CONNECTED.short)}: ${esc(MODS.CONNECTED.title)}</h2>
        <p>${esc(MODS.CONNECTED.sub)} <a href="/modules/automate-dental-clinic-operations">See ${esc(MODS.CONNECTED.short)}</a> · <a href="/modules">Compare all modules</a></p>`}
        <h2>See ${esc(p.short)} working in a dental clinic</h2>
        <p><a href="/contact">Book a demo</a> · <a href="https://wa.me/${MODS_WA}">WhatsApp us</a></p>
        <p>Other modules: ${MODS.PAGES.filter((o) => o.id !== p.id).map((o) => `<a href="/modules/${o.id}">${esc(o.short)}</a>`).join(' · ')}</p>
      </div></section>`,
  });
}
// Old module URLs → keyword URLs (owner 2026-10-08; src/data/modules.js OLD_SLUGS). Not in the sitemap;
// canonical + meta refresh point crawlers and no-JS visitors at the new page.
const MODULE_REDIRECTS = MODS.OLD_SLUGS;
for (const [oldId, newId] of Object.entries(MODULE_REDIRECTS)) {
  const p = MODS.pageById(newId);
  routes.push({
    slug: `modules/${oldId}`,
    title: p.seoTitle,
    description: p.seoDescription,
    canonical: `${ORIGIN}/modules/${newId}`,
    refresh: `/modules/${newId}`,
    content: `<section><div class="ch-container ch-narrow"><p>${esc(p.short)} has moved: <a href="/modules/${newId}">${esc(p.short)} — ${esc(p.title)}</a>.</p></div></section>`,
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
