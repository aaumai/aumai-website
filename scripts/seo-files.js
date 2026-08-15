/**
 * Generate robots.txt and sitemap.xml for the market being built.
 *
 * WHY THIS EXISTS
 * ---------------
 * `public/` is copied verbatim into every build, and it holds an India
 * robots.txt + sitemap.xml. The US build (REACT_APP_MARKET=us -> aumyai.com)
 * therefore shipped a robots.txt pointing Google at
 * `https://aumai.co.in/sitemap.xml` and a sitemap listing only India URLs.
 *
 * A sitemap on one host that lists another host's URLs is ignored — the US
 * site was telling Google "my pages are somewhere else", so aumyai.com had no
 * sitemap of its own and /business-manager was not submitted anywhere.
 *
 * Running after the build (and after prerender) means these overwrite whatever
 * came from public/, so each host gets its own correct pair.
 *
 * Also emits llms.txt: an increasing share of buyer research now happens
 * through AI assistants, and a short plain-text summary is the one format they
 * all read cheaply.
 */
const fs = require('fs');
const path = require('path');
const { growthPosts } = require('../src/data/growthPosts');
const { CALCULATORS } = require('../src/data/calculators');

const BUILD = path.join(__dirname, '..', 'build');
const MARKET = process.env.REACT_APP_MARKET || 'in';
const ORIGIN = MARKET === 'us' ? 'https://aumyai.com' : 'https://aumai.co.in';
const TODAY = new Date().toISOString().slice(0, 10);

// priority/changefreq reflect real intent: the pages that convert or change
// often rank first in our own crawl budget.
const SITEMAPS = {
  // Dental-growth pages only. The legacy engineering/consulting pages
  // (/about, /services, /case-studies, /insights, /engineering-partner, /aumy)
  // stay routable but are deliberately kept out of the sitemap — the public
  // identity of aumai.co.in is dental clinic growth, nothing else.
  in: [
    ['/', 1.0, 'weekly'],
    ['/leak-calculator', 0.9, 'monthly'],
    ['/missed-call-calculator', 0.8, 'monthly'],
    ...CALCULATORS.map((c) => [`/${c.slug}`, 0.8, 'monthly']),
    ['/revenue-generator', 0.9, 'weekly'],
    ['/growth-audit', 0.9, 'weekly'],
    ['/growth', 0.8, 'weekly'],
    ...growthPosts.map((p) => [`/growth/${p.slug}`, 0.7, 'monthly']),
    ['/platform-partner', 0.7, 'monthly'],
    ['/facebook-instagram', 0.6, 'monthly'],
    ['/compliance', 0.7, 'monthly'],
    ['/contact', 0.5, 'yearly'],
    ['/privacy', 0.2, 'yearly'],
    ['/terms', 0.2, 'yearly'],
  ],
  us: [
    ['/', 1.0, 'weekly'],
    ['/business-manager', 0.9, 'weekly'],
    ['/leak-calculator', 0.9, 'monthly'],
    ['/privacy', 0.2, 'yearly'],
    ['/terms', 0.2, 'yearly'],
  ],
};

const urls = SITEMAPS[MARKET] || SITEMAPS.in;

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      ([loc, priority, changefreq]) =>
        `  <url>\n` +
        `    <loc>${ORIGIN}${loc}</loc>\n` +
        `    <lastmod>${TODAY}</lastmod>\n` +
        `    <changefreq>${changefreq}</changefreq>\n` +
        `    <priority>${priority.toFixed(1)}</priority>\n` +
        `  </url>\n`
    )
    .join('') +
  `</urlset>\n`;

fs.writeFileSync(path.join(BUILD, 'sitemap.xml'), sitemap);

// Explicitly allow the AI crawlers by name. Several of them ignore a bare
// `User-agent: *` when deciding whether training/citation access was granted,
// and being cited by an assistant is now a real referral channel for us.
const robots =
  `# ${ORIGIN}\n` +
  `User-agent: *\n` +
  `Allow: /\n` +
  `\n` +
  `# AI assistants — allowed deliberately: being quoted in an answer is a\n` +
  `# referral channel, not a leak. Nothing here is private.\n` +
  ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot']
    .map((ua) => `User-agent: ${ua}\nAllow: /\n`)
    .join('') +
  `\n` +
  `Sitemap: ${ORIGIN}/sitemap.xml\n`;

fs.writeFileSync(path.join(BUILD, 'robots.txt'), robots);

// llms.txt — a short, plain-text description of what this site is, for AI
// assistants that fetch it. Kept factual and free of marketing adjectives:
// an assistant summarising us should get the same facts a human would.
const LLMS = {
  in: `# AUM AI — AUMY for dental & aesthetic clinics (India)

> AUMY is an AI growth system for dental, dermatology and aesthetic
> clinics in India — from single-doctor practices to multi-chair centres. It captures every patient enquiry (WhatsApp, Instagram,
> missed calls, website), books appointments 24/7 with an AI receptionist,
> recovers no-shows, wins back lapsed patients, manages Google Business Profile
> and reviews, and feeds real bookings back to Meta and Google so ad spend
> targets people who actually become patients.

## Key facts
- Operated as a managed service: a dedicated growth expert runs the system for the clinic.
- Works alongside existing practice software — no rip-and-replace. FHIR R4 sync or guided import.
- 10-day free trial. Data encrypted in transit and at rest, role-based access.
- AUM AI is an NVIDIA Inception member.

## Pages
- ${ORIGIN}/ — overview for clinic owners
- ${ORIGIN}/leak-calculator — 60-second calculator estimating revenue lost to missed enquiries, no-shows and lapsed patients
- ${ORIGIN}/missed-call-calculator — calculator estimating what unanswered calls cost a dental clinic per month and year
- Also: lead follow-up (/lead-followup-calculator), no-show (/no-show-calculator), recall (/recall-calculator) and dormant-patient (/dormant-patient-calculator) calculators
- ${ORIGIN}/revenue-generator — how the system works
- ${ORIGIN}/growth-audit — free clinic growth audit
- ${ORIGIN}/growth — Dental Practice Growth Hub: practical guides on missed calls, lead follow-up, recall and patient reactivation for Indian dental clinics
- ${ORIGIN}/compliance — security and data handling
- https://aumyai.com/ — United States market

## Contact
AUM AI Healthcare Solutions, Pune, Maharashtra, India — jayesh.chaudhari@aumai.co.in
`,
  us: `# Aumy by AUM AI (United States)

> Two products on one platform.
> 1. Aumy for Dental Practices — an AI receptionist that answers every call and
>    text 24/7, books patients, recovers no-shows, runs hygiene recall, follows
>    up treatment plans, and chases dental labs. HIPAA-compliant by design: BAA
>    signed with the practice, US data hosting, full audit logging.
> 2. Aumy Business Manager — an "AI Employee" for any business: answers
>    customers on WhatsApp, Instagram, Facebook, web chat and phone; makes
>    human-sounding outbound sales calls; books meetings; runs Content Studio
>    and Google Business Profile; and traces every ad dollar to real revenue.

## Key facts
- Aumy does NOT run your ads. It feeds real revenue back to Meta and Google so
  the ads your own team or agency runs target better — higher ROAS, lower cost
  per purchase.
- Business Manager integrates with Shopify and WooCommerce. 7-day free trial, no card.
- Dental: $450/month per location + $600 one-time setup. Business Manager: from $77/month.
- Entity: AUM AI Healthcare Technology LLC, 30 N Gould St, Ste N, Sheridan, WY 82801.

## Pages
- ${ORIGIN}/ — AI receptionist for US dental practices
- ${ORIGIN}/business-manager — Aumy Business Manager for ecommerce, local and B2B businesses
- ${ORIGIN}/leak-calculator — 60-second calculator estimating revenue lost to unanswered calls, no-shows and patients who never reappoint
- https://aumai.co.in/ — India market

## Contact
jayesh@aumyai.com — +1 (307) 263-5098
`,
};

fs.writeFileSync(path.join(BUILD, 'llms.txt'), LLMS[MARKET] || LLMS.in);

console.log(`seo-files: wrote robots.txt, sitemap.xml (${urls.length} urls) and llms.txt for ${ORIGIN}`);
