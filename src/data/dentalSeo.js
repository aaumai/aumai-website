/**
 * Dental SEO (owner 2026-10-23): the service page at aumai.co.in/dental-seo, listed under
 * "Product & services → Services" in the header. Hero (owner, exact): "More international
 * patients find you on Google"; local patients stay in one line.
 *
 * ONE copy of the words: src/pages/ServicePage.js renders them and scripts/prerender.js writes
 * the same words into the crawler HTML, the Service JSON-LD and the FAQPage JSON-LD.
 *
 * Honest proof only. Sterling: we built sterlingdentalclinic.com (live 15 Oct 2026) and run its
 * SEO: a blog post every Saturday, an SEO routine every Monday, a monthly Search Console report
 * across five countries against the 6 Oct 2026 baseline. Vinaykia's site and one unnamed implant clinic's (no naming consent; owner 2026-10-23) are being
 * built. NO traffic, ranking or enquiry numbers until a report measures them, NO review or rating
 * markup, NO price (we quote after the free audit).
 *
 * `module.exports` on purpose: the prerender script is plain Node.
 */
const PATH = '/dental-seo';
const KEY = 'seo';

const WHATSAPP = { display: '80071 89868', link: 'https://wa.me/918007189868?text=' + encodeURIComponent('Hi, I would like a free clinic audit for dental SEO.') };

const SEO = {
  title: 'Dental SEO for international patients | AUM AI',
  description:
    'Dental SEO in India for clinics that want overseas and local patients: treatment pages patients abroad search for, Google Business Profile looked after every week, and a monthly report by country. Free clinic audit.',
};

const HERO = {
  eyebrow: 'Dental SEO · clinics in India',
  title: 'More international patients find you on Google',
  sub: 'When someone in London, Dubai or Toronto searches “dental implants in Delhi”, your clinic should be what they find: a page that answers the cost, the number of trips and who the doctor is, a Google profile that looks cared for, and a reply on WhatsApp in their time zone. And the patients in your own city find you too.',
  cta: 'Get a free clinic audit',
  secondary: { label: 'See our work', href: '#work' },
  trust: 'Free audit. We look at your Google profile, your website and where you show up today, in India and abroad, and tell you what is costing you patients.',
};

// Hero picture: the real Sterling website (same files as /clinic-websites).
const VISUAL = {
  kind: 'devices',
  domain: 'sterlingdentalclinic.com',
  desktop: { src: '/images/clinic-websites/sterling-desktop.webp', w: 1440, h: 900, alt: 'The home page of sterlingdentalclinic.com on a desktop browser: The Sterling Dental Clinic, Vasant Vihar, New Delhi' },
  phone: { src: '/images/clinic-websites/sterling-phone.webp', w: 600, h: 1298, alt: 'The home page of sterlingdentalclinic.com on a phone, with Call and WhatsApp buttons at the bottom' },
  caption: 'sterlingdentalclinic.com · website and SEO by AUM AI',
};

const WHAT = {
  eyebrow: 'What we do',
  title: 'Everything Google needs to send you patients',
  intro: 'The work is not one big launch. It is a list of small things done every week, so Google and patients both see a clinic that is active, clear and trusted.',
  items: [
    { icon: 'globe', h: 'Pages for patients abroad', t: 'One page for each treatment people travel for, written the way they search: “dental implants in Delhi”, “veneers cost in India”. Each answers the cost, how many days and trips it takes, and what to bring home.' },
    { icon: 'star', h: 'Your Google profile, looked after', t: 'A post every week, a reply to every review, fresh photos every month, and holiday hours set before the holiday. Your listing looks cared for, because it is.' },
    { icon: 'pin', h: 'Found in your own city', t: 'A page for each area you serve, and your name, address, phone and hours the same everywhere, so you show up on Google Maps beyond your own street.' },
    { icon: 'doc', h: 'A new article on a fixed day', t: 'Answers to the questions your patients search before they decide, on the same day every week or fortnight. We write it and check every fact; it carries your main doctor’s name.' },
    { icon: 'link', h: 'Keep the rankings you already have', t: 'Moving to a new website? Every old page address is kept or pointed to its new page, so what Google already knows about your clinic is not lost.' },
    { icon: 'chart', h: 'A monthly report, by country', t: 'How many people found you, in which countries and cities, what they searched, and how many called or messaged. Measured against where you started.' },
  ],
};

// The international section (owner 2026-10-23): what it honestly takes.
const POINTS = {
  eyebrow: 'International patients',
  title: 'What it takes to win a patient from abroad',
  intro: 'A patient flying in for implants or a smile makeover compares clinics in three countries before they write to anyone. They choose the clinic that answers their questions first, and answers them honestly.',
  items: [
    { h: 'Pages that answer their searches', t: 'The treatment plus “in Delhi” or “in India”, with the cost shown openly, so they can compare with home.' },
    { h: 'A plan for a short stay', t: 'How many days, how many visits, one trip or two, and when they can fly after treatment.' },
    { h: 'The doctor, in full', t: 'Qualifications, registration, years in practice and the treatments they do most, on the page.' },
    { h: 'Real results, with consent', t: 'Before-and-after photos of your own patients, shown only with the patient’s written permission.' },
    { h: 'Reviews that mention travel', t: 'We help you ask patients who travelled to say so in their Google review, because that is what the next one looks for.' },
    { h: 'Fast replies across time zones', t: 'With Aumy, a WhatsApp message sent at 2 am your time gets an answer straight away, not the next morning.' },
    { h: 'Tracking by country', t: 'Google Search Console shows which countries see you and click. We read it every week and report it every month.' },
  ],
};

const WORK = {
  eyebrow: 'Our work',
  title: 'The clinics we work with',
  intro: 'We name only the work we actually do, and we publish results only after they are measured.',
  cases: [
    {
      name: 'The Sterling Dental Clinic',
      place: 'Vasant Vihar, New Delhi',
      tag: 'Website and SEO · live since 15 Oct 2026',
      text: 'An implant-led clinic that treats patients from many countries. We built sterlingdentalclinic.com and run its SEO: a new article every Saturday, an SEO check every Monday, its Google profile, and a monthly Search Console report across five countries, measured against the baseline we took in October 2026.',
      link: { href: '/clinic-websites#sterling', label: 'Read the Sterling case study', internal: true },
    },
    {
      name: 'A dental implant clinic’s new site',
      tag: 'Website and SEO · being built',
      text: 'A new website and SEO for an implant-led clinic, built to keep every ranking the old site already has.',
    },
    {
      name: 'Vinaykia Dental Care',
      place: 'Pune',
      tag: 'New website · being built',
      text: 'A rebuild of the clinic’s website on the same standard, keeping every page address the old site had.',
    },
  ],
  note: 'Good SEO takes months, not days. Sterling’s new site went live in October 2026, so its first monthly report is still to come. We will share numbers when they are measured, not before.',
};

const STEPS = {
  eyebrow: 'How we work',
  title: 'From a free audit to a report every month',
  items: [
    { h: 'Free clinic audit', t: 'We look at your Google profile, your website and the searches you show up for, in India and abroad, and show you where patients slip past you.' },
    { h: 'A plan for your clinic', t: 'The treatments you want more of, the countries and areas they come from, and the searches that bring them. You approve it.' },
    { h: 'Fix the basics first', t: 'Your Google profile, your clinic details and your main treatment pages, set right in the first weeks.' },
    { h: 'Every week', t: 'Google posts, review replies, a new article and one improvement to your site. Each week’s posts come to you for a yes first.' },
    { h: 'Every month', t: 'A short report: what changed, by country, what it brought, and what we do next.' },
  ],
};

const MONTHLY = {
  eyebrow: 'Every month',
  title: 'What you get every month',
  items: [
    'A Google post every week, sent to you for approval before it goes out.',
    'A reply to every new Google review.',
    'Fresh photos and up-to-date hours on your Google profile.',
    'New articles on your website, on the day we agree.',
    'One improvement to your website every week.',
    'A report in plain words: searches, countries, calls, messages and directions, against where you started.',
  ],
  asideTitle: 'One person who knows your clinic',
  aside: 'Your SEO is looked after by a named person on WhatsApp, not a ticket queue. Ask what changed this week, and get an answer.',
};

const FIT = {
  eyebrow: 'Who it’s for',
  title: 'A good fit if…',
  items: [
    'You want more patients for treatments people travel for: implants, smile makeovers, full-mouth work.',
    'Your clinic already sees some patients from abroad and you want more of them.',
    'Your Google profile has nobody looking after it every week.',
    'Your website is years old and rarely brings an enquiry.',
    'You want to see, every month, what the work brought.',
  ],
  notFit: 'If you want to be first on Google by next week, we are not the right fit. SEO builds over months, and keeps paying after that.',
};

const WITH_AUMY = {
  title: 'SEO brings the enquiry. Aumy makes sure it becomes a visit.',
  text: 'With Aumy, every call, WhatsApp and website enquiry is answered straight away, day or night, and followed up until the patient books. SEO also works on its own: enquiries then come straight to your team.',
  link: { to: '/revenue-generator', label: 'How Aumy works' },
};

const FAQS = [
  { q: 'How long before we see results?', a: 'Fixes to your Google profile can show within weeks. Ranking for treatment searches, in India and abroad, usually takes a few months and keeps building after that. Your monthly report shows the change from the day we started.' },
  { q: 'Do we need a new website?', a: 'Not always. The free audit tells you whether your current website can be improved or is holding you back. If you need a new one, we build that too, with a page for every treatment, area and country your patients search from.' },
  { q: 'Will you post on our Google profile without asking?', a: 'No. Each week’s posts come to you first and go out only after you say yes.' },
  { q: 'Can you promise the first position on Google?', a: 'Nobody honestly can: Google decides. What we promise is the work, every week, and a monthly report that shows what it brought.' },
  { q: 'How much does it cost?', a: 'It depends on how many treatments, areas and countries you want to be found for, so we quote after the free clinic audit. WhatsApp 80071 89868 to start.' },
];

const AUDIT = {
  service: 'Dental SEO Audit',
  title: 'Get a free clinic audit',
  intro: 'Tell us your clinic and your website. We look at your Google profile, your pages and where you show up, in India and abroad, and send you what is costing you patients and what we would do first.',
  goalLabel: 'Which patients do you want more of?',
  goals: ['Patients from abroad', 'Patients from my city', 'Both'],
  fine: 'Free. Reviewed by a person before it reaches you. Your details are used only for the audit.',
  done: 'Done. We will send your clinic audit to your WhatsApp.',
  error: 'Something went wrong. WhatsApp us at 80071 89868 and we will start your audit.',
};

const FINAL = {
  eyebrow: 'Dental SEO by AUM AI',
  title: 'Your next patient is searching from another country right now.',
  text: 'Make sure they find a page that answers them, at your clinic.',
};

// JSON-LD Service (scripts/prerender.js). No review or rating markup.
const SCHEMA = {
  name: 'Dental SEO for international patients',
  serviceType: 'Search engine optimisation for dental clinics',
  audience: 'Dental clinics',
};

module.exports = { PATH, KEY, WHATSAPP, SEO, HERO, VISUAL, WHAT, POINTS, WORK, STEPS, MONTHLY, FIT, WITH_AUMY, FAQS, AUDIT, FINAL, SCHEMA };
module.exports.default = module.exports;
