/**
 * Clinic websites built for search (owner 2026-10-19): the service page at
 * aumai.co.in/clinic-websites (also reachable at /websites).
 *
 * ONE copy of the words: src/pages/ClinicWebsitesPage.js renders them and
 * scripts/prerender.js writes the same words into the crawler HTML, the Service
 * JSON-LD and the FAQPage JSON-LD, so the two can never drift apart.
 *
 * Every Sterling figure is a real count, taken on 2026-10-19 from the live site
 * (sitemap.xml), the Sterling repo (src/lib/areas.ts, src/content/blog,
 * docs/SEO-URL-MAP.csv) and the live nginx redirect file. The site launched on
 * 15 Oct 2026, so there are NO results numbers yet: never add traffic, ranking
 * or enquiry gains here until the monthly report measures them. Sterling agreed
 * to a public "Website by AUM AI" credit; never quote its doctors or use
 * patient photos on this page. No price: there is none in src/data/pricing.js.
 *
 * `module.exports` on purpose: the prerender script is plain Node.
 */
const PATH = '/clinic-websites';
const ALIASES = ['/websites'];

const WHATSAPP = { display: '80071 89868', link: 'https://wa.me/918007189868?text=' + encodeURIComponent('Hi, I would like a website audit for my clinic.') };

const SEO = {
  title: 'Clinic Websites Built for SEO and International Patients | AUM AI',
  description:
    'Websites for dental and skin clinics, built to bring patients from Google: treatment and area pages, international patient pages, weekly blogs, technical SEO and redirects that keep your rankings. Free website audit.',
};

const HERO = {
  eyebrow: 'Clinic websites · built for search',
  titleA: 'Clinic websites built to bring patients from search,',
  titleB: 'including international patients',
  sub: 'For dental and skin clinics. Every treatment, every area you serve and every country your patients fly in from gets its own page, written for the way people search, and launched without losing the Google rankings you already have.',
  cta: 'Get a website audit',
  trust: 'Free audit. We look at your current site and Search Console, and tell you what is costing you patients.',
  caption: 'sterlingdentalclinic.com · built by AUM AI · live since 15 Oct 2026',
};

const IMG = {
  desktop: { src: '/images/clinic-websites/sterling-desktop.webp', w: 1440, h: 900, alt: 'The home page of sterlingdentalclinic.com on a desktop browser: The Sterling Dental Clinic, Vasant Vihar, New Delhi' },
  phone: { src: '/images/clinic-websites/sterling-phone.webp', w: 600, h: 1298, alt: 'The home page of sterlingdentalclinic.com on a phone, with Call and WhatsApp buttons at the bottom' },
};

const PROBLEMS = {
  title: 'Why most clinic websites don’t bring patients',
  intro: 'Most clinic websites are a brochure: a home page, a list of treatments, a contact form. Google has very little to show, and the patient has very little to read.',
  items: [
    { h: 'Slow', t: 'Cheap shared hosting and heavy themes. The page takes seconds to open on a phone, and the patient goes back to the results.' },
    { h: 'Thin pages', t: 'All treatments on one page, a line each. A patient comparing implants or aligners finds nothing to decide on, and Google finds nothing to rank.' },
    { h: 'No treatment or area pages', t: 'Patients search “dental implants in Vasant Vihar” or “acne scar treatment near me”. Without a page for that treatment and that area, you are not in the answer.' },
    { h: 'Rankings lost in a redesign', t: 'The new site goes live, the old addresses stop working, and years of Google rankings disappear in a week. It happens on most redesigns.' },
    { h: 'No tracking', t: 'Nobody knows which page brought an enquiry, which country visitors came from, or whether the site is getting better or worse.' },
  ],
};

const BUILD = {
  title: 'What we build',
  headingA: 'A page for every search your',
  headingEm: 'patients',
  headingB: 'make',
  intro: 'A fast, static website that Google can read in full, with a page for every search your patients make.',
  items: [
    { h: 'Treatment pages and price guides', t: 'One page per treatment, written to answer the questions patients ask before they book: how it works, how long it takes, what it costs and what is included.' },
    { h: 'Area and locality pages', t: 'A page for each neighbourhood you serve, with real directions and the treatments people there search for, so you show up beyond your own street.' },
    { h: 'International patient pages', t: 'Dental tourism and treatment-travel pages for patients in the UK, USA, Canada, Australia and the Gulf: costs in their currency, how many trips, the visa, and what to bring home.' },
    { h: 'Weekly expert blogs', t: 'A new article every week on the questions your patients search for. You approve each one before it goes live.' },
    { h: 'Technical SEO', t: 'Speed, schema for your clinic, doctors and FAQs, a clean sitemap, and redirects for every old address, so your old Google rankings carry over.' },
    { h: 'Google Business Profile alignment', t: 'Your name, address, phone, hours, services and categories match between the website and your Google listing, and the listing links to the right pages.' },
    { h: 'Analytics', t: 'Google Analytics plus your own visitor page: who came, from which city and country, which pages they read, and how far they scrolled.' },
    { h: 'Enquiries straight into Aumy', t: 'The enquiry form and WhatsApp button land in Aumy, so every website enquiry becomes a task for your front desk and no lead is missed.' },
  ],
};

const CASE = {
  eyebrow: 'Case study',
  title: 'The Sterling Dental Clinic, Vasant Vihar, New Delhi',
  intro: 'An implant-led clinic in South Delhi, established in 2001, with patients from 97+ countries (the clinic’s own figure). We rebuilt sterlingdentalclinic.com from scratch as a fast static Next.js site and launched it on 15 October 2026, moving the old PHP pages and WordPress blog without dropping a single indexed address.',
  stats: [
    { n: '204', t: 'pages in the sitemap' },
    { n: '25', t: 'in-depth implant and treatment-travel guides' },
    { n: '15', t: 'area pages, Vasant Vihar to Gurgaon' },
    { n: '409', t: 'redirect rules, so no old address breaks' },
  ],
  did: [
    '12 treatment pages, a main implants page, and 5 implant-brand pages with prices.',
    '15 area pages for the neighbourhoods the clinic serves, from Vasant Vihar, Munirka and R K Puram to Hauz Khas, Greater Kailash and Gurgaon.',
    'A dental-tourism page and 25 in-depth guides, most written for overseas patients: costs, guides for the UK, USA, Canada, Australia and the Gulf, the e-Medical visa, one trip or two, and flying after implant surgery.',
    'All 108 old blog posts kept at their exact old addresses, and every one of the 261 old addresses mapped before launch: kept, or redirected with a 301 to the closest new page.',
    'Checked on launch day: every page that got a Google click in the 3 months before launch opens on the new site.',
    'Schema for the clinic, its doctors and every FAQ; the sitemap submitted to Search Console on launch day.',
    'Enquiries from the website form arrive in Aumy as booking requests for the front desk. Google Analytics and a private visitor page from day one.',
    'A blog post every Saturday and an SEO routine every Monday, measured against the baseline we took before launch.',
  ],
  goalTitle: 'The goal: international implant patients',
  goal: 'Before the rebuild, Search Console showed the old site was already being seen in searches from the USA, the UK, Canada, Australia and the UAE, but its implant pages sat far down the results, around positions 40 to 90. The new site is built to turn that interest into enquiries, with a guide for every question an overseas implant patient asks. It went live on 15 October 2026, so we will report results once they are measured, not before.',
  link: { href: 'https://sterlingdentalclinic.com/', label: 'Visit sterlingdentalclinic.com' },
  credit: 'Shown with the clinic’s permission. The site carries a “Website by AUM AI” credit.',
};

const STEPS = {
  title: 'How it works',
  items: [
    { h: 'The onboarding form', t: 'One form covers everything we need: clinic details, each doctor with their council registration number, services, the keywords you want, your Google Business Profile, photos and branding.' },
    { h: 'Content and design', t: 'We write every page from your services and from what patients actually search, and design it in your brand. You approve the facts about your clinic: prices, doctors and timings.' },
    { h: 'Launch without losing rankings', t: 'Every old address is mapped before launch and redirected to its new page. On launch day we check them all, submit the sitemap and watch Search Console.' },
    { h: 'A weekly SEO routine and blogs', t: 'Every week: one new blog post, a look at Search Console and your map rankings, your Google Business Profile, and one improvement shipped to the site.' },
    { h: 'A monthly report', t: 'Once a month you get a short report against the baseline we took before launch: searches, clicks, rankings and enquiries, by country.' },
  ],
};

const FAQS = [
  { q: 'Who owns the website?', a: 'Your domain stays yours, and the text, photos and pages made for your clinic are yours. The site is plain static files, so if you ever move on it can be hosted anywhere.' },
  { q: 'Do you host it?', a: 'Yes. We host it on our servers behind Cloudflare, with SSL and daily backups, and we keep it updated. You don’t need to manage any hosting.' },
  { q: 'How long does it take to launch?', a: 'Typically a few weeks, depending mostly on how quickly photos, doctor details and approvals come back. Sterling’s site took about three weeks from the first build to launch.' },
  { q: 'Does it work with Aumy, or without it?', a: 'Both. With Aumy, every website enquiry lands in the front desk’s queue as a task, so nobody forgets to call back. Without Aumy, enquiries come to your email and WhatsApp.' },
  { q: 'We already have a website. Will we lose our Google rankings?', a: 'Not if the move is done properly. We list every address your old site has, keep the ones that rank, and redirect the rest with a 301 to the closest new page before the switch. Old blog posts keep their exact addresses.' },
  { q: 'Is it only for dental clinics?', a: 'No. We build for dental and skin clinics. The method is the same: a page for every treatment, area and country your patients search from.' },
  { q: 'How much does it cost?', a: 'It depends on how many treatments, areas and countries you want to cover, so we quote after the free website audit. WhatsApp 80071 89868 to start.' },
];

const AUDIT = {
  title: 'Get a website audit',
  intro: 'Tell us your clinic and your current website. We look at its speed, its pages, your Google rankings and Search Console, and send you what is costing you patients and what we would build.',
  goals: ['Local patients from my area', 'International patients', 'Both'],
  fine: 'Free. Reviewed by a person before it reaches you. Your details are used only for the audit.',
  done: 'Done. We will send your website audit to your WhatsApp.',
  error: 'Something went wrong. WhatsApp us at 80071 89868 and we will start your audit.',
};

const FINAL = {
  title: 'Your next patient is searching right now.',
  text: 'Make sure they find a page that answers them, at your clinic.',
};

module.exports = { PATH, ALIASES, WHATSAPP, SEO, HERO, IMG, PROBLEMS, BUILD, CASE, STEPS, FAQS, AUDIT, FINAL };
module.exports.default = module.exports;
