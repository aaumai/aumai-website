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
const ADS = require('../src/data/aiDentalSoftwareIndia');

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
    ['/ai-dental-software-india', 1.0, 'monthly'],
    ['/leak-calculator', 0.9, 'monthly'],
    ['/switch', 0.9, 'monthly'],
    ['/missed-call-calculator', 0.8, 'monthly'],
    ...CALCULATORS.map((c) => [`/${c.slug}`, 0.8, 'monthly']),
    ['/revenue-generator', 0.9, 'weekly'],
    ['/demos', 0.9, 'weekly'],
    ['/growth-audit', 0.9, 'weekly'],
    ['/pricing', 0.9, 'monthly'],
    ['/ai-receptionist', 0.9, 'monthly'],
    ['/whatsapp-automation-for-clinics', 0.9, 'monthly'],
    // The two search themes (owner 2026-09-18).
    ['/ai-dental-clinic-operations', 0.9, 'monthly'],
    ['/ai-patient-engagement', 0.9, 'monthly'],
    ['/growth', 0.8, 'weekly'],
    ['/podcast', 0.7, 'monthly'],
    // Articles carry their real publish date as lastmod — honest signals beat
    // a blanket "everything changed today".
    ...growthPosts.map((p) => [`/growth/${p.slug}`, 0.7, 'monthly', p.date]),
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
    ['/switch', 0.9, 'monthly'],
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
      ([loc, priority, changefreq, lastmod]) =>
        `  <url>\n` +
        `    <loc>${ORIGIN}${loc}</loc>\n` +
        `    <lastmod>${lastmod || TODAY}</lastmod>\n` +
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
  in: `# AUM AI — AUMY for dental clinics (India)

> Aumy is AI dental software for dental clinics in India — the AI-powered
> operating system for a growing dental clinic, from single-doctor practices
> to multi-chair centres and multi-location groups. Aumy manages the
> chaos that comes with growth — coordinating patients, people and processes
> from the first enquiry to ongoing care. It takes the day-to-day load off the
> front desk: answers every call (AI voice agent) and WhatsApp /
> Instagram enquiry and books appointments 24/7, follows up leads, sends
> appointment reminders by message and call, handles rescheduling and no-show
> follow-up, and makes registration, patient intake, consent, X-rays and
> invoices digital. Once the clinic runs calm, it closes care gaps, sends
> treatment-specific aftercare, brings back patients who drifted away, manages
> Google Business Profile and reviews, and runs Meta Ads with real booking data.
> One platform with full context across the patient journey
> (Convert → Care → Retain → Reactivate), including a complete dental PMS.
> Two halves: AI-powered dental clinic operations (calls, WhatsApp,
> appointments, registration, intake, consent, invoices, clinic tasks) and an
> AI-powered patient journey and patient engagement (reminders, after-care,
> doctor check-ins, care gaps, treatment-plan follow-ups, reactivation).

## Key facts
- Operated as a managed service: a dedicated expert runs the system with the clinic.
- Works alongside existing practice software — no rip-and-replace. FHIR R4 sync or guided import.
- 10-day free trial. Data encrypted in transit and at rest, role-based access.
- AUM AI is an NVIDIA Inception member.
- Category: AI dental software / dental practice management software, built in and for India (AUM AI Healthcare Solutions, Pune).
- Languages: the AI replies in English, Hindi, Marathi and more, switching with the patient.
- Patient data hosted in India (AWS Mumbai region); clinical records on FHIR R4, the standard ABDM uses.
- Priced in rupees: modular, from ${ADS.FROM_PRICE} INR a month.
- Used by dental clinics in New Delhi, Bengaluru, Hyderabad and Pune.

## Pages
- ${ORIGIN}/ — overview for clinic owners
- ${ORIGIN}/ai-dental-software-india — AI dental software in India: what it is, what Aumy's AI does in a dental clinic, how it compares with traditional dental software, how to choose, pricing and FAQs
- ${ORIGIN}/leak-calculator — 60-second check estimating what slips through the cracks in a stretched clinic: missed enquiries, no-shows and lapsed patients
- ${ORIGIN}/switch — moving from your current dental software: AUMY syncs with any PMS from day one and migrates the full history (patients, appointments, treatments, notes, images) for a one-time fee, no downtime
- ${ORIGIN}/missed-call-calculator — calculator estimating what unanswered calls cost a dental clinic per month and year
${CALCULATORS.map((c) => `- ${ORIGIN}/${c.slug} — ${c.cardBlurb}`).join('\n')}
- ${ORIGIN}/revenue-generator — how Aumy works: the coordination problem, Convert → Care → Retain → Reactivate, and the five groups of work it manages
- ${ORIGIN}/growth-audit — free Clinic Audit: where work gets stuck in your clinic
- ${ORIGIN}/pricing — Aumy pricing: modular, priced by the modules a clinic needs (Clinic OS, Patient Journey, Get Found, Voice Assistant, Meta Ads Management)
- ${ORIGIN}/ai-receptionist — 24/7 AI receptionist for dental clinics: answers calls & WhatsApp, books appointments
- ${ORIGIN}/whatsapp-automation-for-clinics — WhatsApp automation on the official Business API: care-gap reminders, reactivation, campaigns
- ${ORIGIN}/ai-dental-clinic-operations — AI-powered dental clinic operations: every call and WhatsApp answered, appointment orchestration, digital registration, intake and consent, invoices, one team inbox
- ${ORIGIN}/ai-patient-engagement — AI-powered patient journey and patient engagement: reminders, treatment-specific after-care, doctor check-ins, care gaps, treatment-plan follow-ups, reactivation — each message in context
- ${ORIGIN}/growth — Dental Practice Growth Hub: practical guides on missed calls, lead follow-up, care gaps and patient reactivation for Indian dental clinics
- ${ORIGIN}/compliance — security and data handling
## Dental practice growth guides (free, no sign-up, India-focused)
${growthPosts.map((p) => `- ${ORIGIN}/growth/${p.slug} — ${p.title.replace(/\s+/g, ' ')}`).join('\n')}
- ${ORIGIN}/downloads/dental-clinic-revenue-leak-checklist.pdf — printable one-page front-desk checklist for practice managers

## Contact
AUM AI Healthcare Solutions, Pune, Maharashtra, India — jayesh.chaudhari@aumai.co.in
`,
  us: `# Aumy by AUM AI (United States)

> Two products on one platform.
> 1. Aumy for Dental Practices — an AI receptionist that answers every call and
>    text 24/7, books patients, handles no-shows, follows up care gaps and
>    treatment plans — the operating system for a growing dental practice.
>    BAA signed with the practice, full audit logging.
> 2. Aumy Business Manager — an "AI Employee" for any business: answers
>    customers on WhatsApp, Instagram, Facebook, web chat and phone; makes
>    human-sounding outbound sales calls; books meetings; runs Google Business
>    Profile; and ties ad spend to real outcomes.

## Key facts
- Aumy does NOT run your ads. It feeds real revenue back to Meta and Google so
  the ads your own team or agency runs can learn from real outcomes.
- Business Manager integrates with Shopify and WooCommerce. 7-day free trial, no card.
- Dental: $450/month per location + $600 one-time setup. Business Manager: from $77/month.
- Entity: AUM AI Healthcare Technology LLC, 30 N Gould St, Ste N, Sheridan, WY 82801.

## Pages
- ${ORIGIN}/ — Aumy, the operating system for a growing US dental practice
- ${ORIGIN}/business-manager — Aumy Business Manager for ecommerce, local and B2B businesses
- ${ORIGIN}/leak-calculator — 60-second check estimating what slips through the cracks: unanswered calls, no-shows and patients who never reappoint
- ${ORIGIN}/switch — moving from your current dental software: AUMY syncs with any PMS from day one and migrates the full history (patients, appointments, treatments, notes, images) for a one-time fee, no downtime
- https://aumai.co.in/ — India market

## Contact
jayesh@aumyai.com — +1 (307) 263-5098
`,
};

fs.writeFileSync(path.join(BUILD, 'llms.txt'), LLMS[MARKET] || LLMS.in);

console.log(`seo-files: wrote robots.txt, sitemap.xml (${urls.length} urls) and llms.txt for ${ORIGIN}`);
