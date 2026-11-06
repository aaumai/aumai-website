/**
 * Services overview (owner 2026-11-05: "a services page with our 3 services mentioned: dental ads,
 * dental websites and dental SEO"): aumai.co.in/services, in the header, footer and crawler nav.
 *
 * ONE copy of the words: src/pages/ServicesPage.js renders them, scripts/prerender.js writes the same
 * words into the crawler HTML, the Service JSON-LD and the FAQPage JSON-LD, and scripts/seo-files.js
 * lists the page in sitemap.xml and llms.txt. Each service links to its own deeper page
 * (/dental-ads, /clinic-websites, /dental-seo); this page does not repeat them.
 *
 * Rules kept here:
 * - NO price anywhere (owner 2026-11-02, reconfirmed 2026-11-04 "remove pricing"). "How much?" = a call
 *   with Jayesh.
 * - Ad budget is paid by the clinic straight to Meta and Google, separate from our fee (owner 2026-10-23).
 * - Clients named only with an OK on file: Sterling (agreed to the public "Website by AUM AI" credit;
 *   already the case study on /clinic-websites and /dental-seo) and Dr Rajat Sachdeva (owner 2026-10-23:
 *   "let Dr Rajat be"; site live 2026-11-04) and Vinaykia Dental Care (owner 2026-11-05: "Vinaykia is ok
 *   put them on the page too"). No other client by name.
 * - Proof stays qualitative: no traffic, ranking, enquiry or ad-result numbers until a monthly report
 *   measures them and the owner clears them.
 * - Copy for established dental practice owners (owner 2026-11-02 persona); never say "premium".
 *
 * `module.exports` on purpose: the prerender script is plain Node.
 */
// Ads hidden for now (owner 2026-11-06, src/data/visibility.js): the /dental-ads link goes, and while
// HIDE_ADS is on this page shows two services (websites and SEO) with no ads wording.
const { showLink, adsText, HIDE_ADS } = require('./visibility');

const PATH = '/services';
const CALL_LINK = 'https://calendar.app.google/tecaeebTBEWSoJnV7';
const AUDIT_PATH = '/growth-audit';

const CTA = {
  primary: { label: 'Book a call with Jayesh', href: CALL_LINK },
  secondary: { label: 'Get a free clinic audit', href: AUDIT_PATH },
};

const SEO = {
  title: adsText('Dental Ads, Dental Websites and Dental SEO | AUM AI', 'Dental Websites and Dental SEO | AUM AI'),
  description: adsText(
    'Three services for established dental clinics in India: Meta and Google ads that bring implant, aligner and root canal enquiries, fast dental websites that keep your rankings, and dental SEO with your Google Business Profile looked after.',
    'Two services for established dental clinics in India: fast dental websites that keep your rankings, and dental SEO with your Google Business Profile looked after.',
  ),
};

const HERO = {
  eyebrow: 'For owners of established dental practices',
  title: adsText('Dental ads, dental websites and dental SEO', 'Dental websites and dental SEO'),
  sub: adsText('Patients look for a dentist on Instagram, on Google and on Maps before they ever call.', 'Patients look for a dentist on Google and on Maps before they ever call.') + ' We make sure they find your clinic, like what they see, and get in touch. Each service is run by our team, checked every week, and reported every month against where your clinic started.',
  note: adsText('Take one service or all three. Each works on its own.', 'Take one service or both. Each works on its own.'),
  indexTitle: adsText('Our three services', 'Our two services'),
};

const ALL_SERVICES = [
  {
    id: 'dental-ads',
    n: '01',
    name: 'Dental ads',
    title: 'Dental ads that end in a booked visit',
    short: 'Meta and Google ads for implants, aligners and root canal treatment',
    problem:
      'Most clinics that run ads get plenty of leads and very few patients. The money is lost after the click: enquiries answered the next morning, never followed up, and ads judged by cheap leads instead of booked visits.',
    does: [
      'Facebook, Instagram and Google ads for the treatments you want more of: implants, aligners and root canal treatment.',
      'A landing page for each ad, about that one treatment, with call and WhatsApp one tap away.',
      'Every enquiry answered and followed up on WhatsApp until the patient books or says no (with Aumy).',
      'Ads made from your own clinic’s photos and videos, in plain words and in your clinic’s name.',
      'A review every week: the budget moves to the ads that bring booked visits, the rest are stopped, and new ones are tried.',
    ],
    gets: [
      'A report every month: money spent, enquiries, visits booked and the cost of each booked visit.',
      'Every enquiry in one list, with who answered it and what happened next.',
      'Your clinic pays Meta and Google directly for the ads. The ad budget is never mixed with our fee.',
    ],
    measured: 'Judged by one number: visits booked from the ads.',
    // No link while the /dental-ads page is hidden (owner 2026-11-06, src/data/visibility.js).
    link: showLink('/dental-ads') ? { to: '/dental-ads', label: 'More on dental ads' } : null,
    schema: { name: 'Dental ads: Meta and Google ads for dental clinics', serviceType: 'Online advertising for dental clinics (Meta and Google ads)' },
  },
  {
    id: 'dental-websites',
    n: '02',
    name: 'Dental websites',
    title: 'A dental website built for patients and for Google',
    short: 'Fast, modern websites that keep the rankings you already have',
    problem:
      'Most dental clinic websites are a slow brochure: one page of treatments, nothing for Google to rank, and a patient on a phone who gives up before it loads. A redesign often makes it worse, because the old pages stop working and the rankings go with them.',
    does: [
      'A fast, modern website that opens quickly on a phone, with call and WhatsApp buttons always in reach.',
      'A page for each treatment and each area you serve, written the way patients search.',
      'Built for Google from day one: your clinic, doctors and answers set out so Google can read them, and a clean sitemap.',
      'Moving from an old site? Every old page address is kept or pointed to its new page and checked on launch day, so the rankings your old site earned are not lost.',
      'Google Analytics set up, so you see which pages patients read and which ones bring calls and messages.',
    ],
    gets: [
      'A website your patients can use in seconds, on any phone.',
      'A careful launch, watched for weeks after, so nothing that worked before is lost.',
      'A small “Website by AUM AI” credit in the footer.',
    ],
    measured: 'Measured by calls, WhatsApp messages and enquiries from the website, against the months before launch.',
    link: { to: '/clinic-websites', label: 'More on dental websites' },
    schema: { name: 'Dental websites built for SEO', serviceType: 'Website design and development for dental clinics' },
  },
  {
    id: 'dental-seo',
    n: '03',
    name: 'Dental SEO',
    title: 'Dental SEO: found on Google and Maps',
    short: 'Google rankings and your Google Business Profile, looked after every week',
    problem:
      'Patients search “dentist near me” or “dental implants in” their area and choose from the first few clinics they see. A Google profile nobody looks after and a website with nothing to rank send them to the clinic down the road.',
    does: [
      'Google rankings for the treatments and areas you want, with one improvement to your site every week.',
      'Your Google Business Profile looked after: a post every week, sent to you for a yes first, and a reply to every review.',
      'Found on Google Maps beyond your own street: your name, address, phone and hours the same everywhere, fresh photos every month.',
      'New articles on a fixed day, answering what patients search before they decide. We write them and check every fact; your main doctor is named as the medical reviewer.',
      'Pages for patients from abroad, if you want them: the cost, the number of days and trips, and who the doctor is.',
    ],
    gets: [
      'A report every month in plain words: searches, Maps views, calls, direction requests and website enquiries.',
      'A starting point measured before we begin, so every month is compared with it.',
      'One named person on WhatsApp who knows your clinic.',
    ],
    measured: 'Measured every month against the baseline we take before we start. SEO builds over months, not days.',
    link: { to: '/dental-seo', label: 'More on dental SEO' },
    schema: { name: 'Dental SEO and Google Business Profile management', serviceType: 'Search engine optimisation for dental clinics' },
  },
];

// While ads are hidden (src/data/visibility.js) the dental ads service is left out and the rest renumbered.
const SERVICES = HIDE_ADS
  ? ALL_SERVICES.filter((s) => s.id !== 'dental-ads').map((s, i) => Object.assign({}, s, { n: String(i + 1).padStart(2, '0') }))
  : ALL_SERVICES;

// Proof: only work we actually do, and only clients cleared to be named.
const WORK = {
  eyebrow: 'Our work',
  title: 'Dental clinics we do this for',
  intro: 'We name only the work we actually do, and we publish results only after a monthly report has measured them.',
  cases: [
    {
      name: 'The Sterling Dental Clinic',
      place: 'Vasant Vihar, New Delhi',
      tag: 'Website and SEO',
      text: 'We rebuilt sterlingdentalclinic.com and run its SEO: a new article every Saturday, an SEO check every Monday, its Google profile, and a monthly Search Console report measured against the baseline we took before launch.',
      link: { href: '/clinic-websites#sterling', label: 'Read the Sterling case study' },
    },
    {
      name: 'Dr Rajat Sachdeva’s dental implant clinic',
      place: 'Ashok Vihar, Delhi',
      tag: 'Website and SEO',
      text: 'We rebuilt dentalimplantindia.co.in around implants and smile makeovers, kept every page address the old site was found for, and look after its SEO and Google profile.',
    },
    {
      name: 'Vinaykia Dental Care',
      place: 'Somwar Peth, Pune',
      tag: 'Website and SEO',
      text: 'We built vinaykiadentalcare.com and run its local SEO for root canal and aligners: two Google profile posts a week, review requests, and a monthly report measured against the baseline we took before launch.',
    },
    {
      name: 'Our own ads, every day',
      place: 'Facebook and Instagram',
      tag: 'Dental ads',
      text: 'We run Aumy’s own Meta ads to dental clinic owners and review them every morning: what to stop, what to try next and where to move the budget. AUM AI is a Meta Tech Provider.',
    },
  ].filter((c) => !(HIDE_ADS && c.tag === 'Dental ads')),
};

const STEPS = {
  eyebrow: 'How it starts',
  title: 'From a call to a report every month',
  items: [
    { h: 'A call with Jayesh', t: 'A short call on where your clinic loses patients today and which service fits. Or start with a free clinic audit.' },
    { h: 'A plan for your clinic', t: 'The treatments you want more of, the areas they come from, and what we do first. You approve it.' },
    { h: 'We run it, every week', t: adsText('Ads checked, pages improved, Google posts sent to you for a yes, reviews answered.', 'Pages improved, Google posts sent to you for a yes, reviews answered.') },
    { h: 'A report every month', t: 'What changed, against where you started, and what we do next.' },
  ],
};

const FAQS = [
  { q: 'Can we take just one service?', a: 'Yes. Each service works on its own. Start with the one closest to where your clinic loses patients today; the call with Jayesh helps you choose.' },
  { q: 'Who pays for the ads?', a: 'Your clinic pays Meta and Google directly for the ads. Our fee is separate, and the ad budget is never mixed with it.', ads: true },
  { q: 'Will a new website lose our Google rankings?', a: 'Not when the move is done carefully. Before launch we list every address your old site has, keep it or point it to its new page, and check each one on launch day and in the weeks after.' },
  { q: 'Do we need Aumy to use these services?', a: 'No. Each service works on its own, and enquiries come straight to your team. With Aumy, every enquiry is also answered straight away and followed up until the patient books.' },
  { q: 'Can you promise the first position on Google?', a: 'Nobody honestly can: Google decides. What we promise is the work, every week, and a monthly report that shows what it brought.' },
  { q: 'How much does it cost?', a: 'It depends on your clinic and which services you take, so Jayesh gives you the exact figure on a short call.' },
].filter((f) => !(HIDE_ADS && f.ads)).map(({ q, a }) => ({ q, a })); // `ads: true` = left out while ads are hidden

const FINAL = {
  eyebrow: adsText('Dental ads, websites and SEO by AUM AI', 'Dental websites and SEO by AUM AI'),
  title: 'Tell us where your clinic loses patients today.',
  text: 'A short call with Jayesh: which service fits your clinic, what it involves and what it costs.',
};

module.exports = { PATH, CALL_LINK, AUDIT_PATH, CTA, SEO, HERO, SERVICES, WORK, STEPS, FAQS, FINAL };
module.exports.default = module.exports;
