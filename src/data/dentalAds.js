/**
 * Dental ads, Meta and Google (owner 2026-10-23): the service page at aumai.co.in/dental-ads,
 * listed under "Product & services → Services" in the header.
 *
 * ONE copy of the words: src/pages/ServicePage.js renders them and scripts/prerender.js writes
 * the same words into the crawler HTML, the Service JSON-LD and the FAQPage JSON-LD.
 *
 * Honest proof only: we run Aumy's own Facebook and Instagram ads and review them every morning;
 * AUM AI is a Meta Tech Provider; ad enquiries flow into Aumy and are followed up; the growth
 * article on leads vs patients. NO client ad results, cost-per-lead or ROI figures, NO review or
 * rating markup, NO price (we quote after the free audit).
 *
 * `module.exports` on purpose: the prerender script is plain Node.
 */
const PATH = '/dental-ads';
const KEY = 'ads';

const WHATSAPP = { display: '80071 89868', link: 'https://wa.me/918007189868?text=' + encodeURIComponent('Hi, I would like a free clinic audit for dental ads.') };

const ARTICLE = { href: '/growth/meta-ads-dental-clinics-leads-vs-patients', label: 'Meta ads for dental clinics: why leads don’t always become patients' };

const SEO = {
  title: 'Dental Ads: Meta Ads for Dental Clinics & Google Ads for Dentists | AUM AI',
  description:
    'Dental ads in India: Meta ads for dental clinics on Facebook and Instagram, and Google ads for dentists, judged by booked patients, not cheap leads. Every enquiry followed up. Free clinic audit.',
};

const HERO = {
  eyebrow: 'Dental ads · Meta and Google',
  title: 'Ads that fill chairs, not just inboxes.',
  sub: 'Facebook, Instagram and Google ads for dental clinics, aimed at the patients you want and judged by one number: how many booked a visit. Every enquiry is answered and followed up, so the money you spend on ads turns into appointments.',
  cta: 'Get a free clinic audit',
  secondary: { label: 'How an enquiry becomes a visit', href: '#how' },
  trust: 'Free audit. We look at your past ads, your Google profile and what happens today when an enquiry arrives, and tell you where patients are being lost.',
};

// Hero picture: the path from ad to booked visit (not data, so no numbers on it).
const VISUAL = {
  kind: 'journey',
  title: 'From an ad to a booked visit',
  steps: [
    { h: 'Someone nearby sees your ad', t: 'On Instagram, Facebook or Google' },
    { h: 'They message you on WhatsApp', t: 'Or call, or fill in the form' },
    { h: 'Answered straight away', t: 'Day or night, with Aumy' },
    { h: 'Followed up until they decide', t: 'Not left after one message' },
    { h: 'Visit booked', t: 'Counted against the ad that brought it' },
  ],
  caption: 'Every ad judged by the visits it booked',
};

const WHAT = {
  eyebrow: 'What we do',
  title: 'Ads, and everything after the ad',
  intro: 'Most ad money is lost after the click, not before it. So we run the ads and make sure every enquiry they bring is answered and followed up.',
  items: [
    { icon: 'phone', h: 'Meta ads on Facebook and Instagram', t: 'Ads for the treatments you want more of, shown to people near your clinic, with the WhatsApp or call button one tap away.' },
    { icon: 'search', h: 'Google ads for people searching now', t: 'Your clinic near the top when someone nearby searches for a dentist or a treatment, today.' },
    { icon: 'image', h: 'Ads that look like your clinic', t: 'Plain, honest words in your clinic’s name, made from your own photos and videos.' },
    { icon: 'chat', h: 'Every enquiry answered and followed up', t: 'With Aumy, every ad enquiry is answered straight away and followed up until the patient books or says no.' },
    { icon: 'target', h: 'Judged by booked patients', t: 'We follow each enquiry to the visit it booked, and move the budget to the ads that bring patients, not just messages.' },
    { icon: 'chart', h: 'A clear monthly report', t: 'Money spent, enquiries, visits booked and the cost of each booked visit, in plain words.' },
  ],
};

const POINTS = {
  eyebrow: 'Why ads disappoint',
  title: '“We got lots of leads, and hardly any patients.”',
  intro: 'It is the most common ads story in dentistry, and it is rarely the ad’s fault. The leads are lost in four places.',
  items: [
    { h: 'Cheap leads', t: 'Ads set to get the most leads for the least money bring the most people who were only curious.' },
    { h: 'Slow replies', t: 'An enquiry answered the next morning has often booked somewhere else by then.' },
    { h: 'No follow-up', t: 'Most people don’t book on the first message. Without a second and a third, they drift away.' },
    { h: 'The wrong number', t: 'Likes, clicks and leads look good in a report. Booked patients are what pay for the ads.' },
  ],
  link: ARTICLE,
};

const WORK = {
  eyebrow: 'Why clinics trust us with ads',
  title: 'We do this for ourselves first',
  intro: 'We don’t publish other clinics’ ad results. Here is what we can show you.',
  cases: [
    { name: 'We run our own ads every day', tag: 'Facebook and Instagram', text: 'Aumy’s own Meta ads run every day and are reviewed every morning: what to stop, what to try next, where to move the budget.' },
    { name: 'Ad enquiries go straight into Aumy', tag: 'Meta Tech Provider', text: 'AUM AI is a Meta Tech Provider, so Facebook, Instagram and WhatsApp enquiries arrive in Aumy and land in your front desk’s list the moment they come in.' },
    { name: 'We wrote the guide on it', tag: 'Growth Hub', text: 'Why ad leads don’t become patients, and the one number to judge ads by, explained for dental clinic owners.', link: { href: ARTICLE.href, label: 'Read the guide', internal: true } },
  ],
};

const STEPS = {
  eyebrow: 'How we work',
  title: 'Follow-up first, then the ads',
  items: [
    { h: 'Free clinic audit', t: 'We look at your past ads, your Google profile and what happens today when an enquiry arrives.' },
    { h: 'Fix the follow-up first', t: 'Before spending more on ads, we make sure every enquiry is answered and followed up. Otherwise the ads pay for patients you lose.' },
    { h: 'Start small', t: 'A few ads for one or two treatments, with a budget you choose, to learn what works in your area.' },
    { h: 'Every week', t: 'We check which ads bring booked visits, stop the ones that don’t, and try new ones.' },
    { h: 'Every month', t: 'A report on spend, enquiries, booked visits and the cost of each visit, and the plan for next month.' },
  ],
};

const MONTHLY = {
  eyebrow: 'Every month',
  title: 'What you get every month',
  items: [
    'Ads planned, made and run on Facebook, Instagram and Google.',
    'New ads tried every month, so you are never stuck with one that has stopped working.',
    'A weekly check, with the budget moved to the ads that bring patients.',
    'Every enquiry in one list, with who answered it and what happened next.',
    'A report in plain words: spend, enquiries, booked visits and the cost of each booked visit.',
  ],
  asideTitle: 'One person who knows your clinic',
  aside: 'Your ads are looked after by a named person on WhatsApp, not a ticket queue. Ask why an ad was stopped, and get an answer.',
};

const FIT = {
  eyebrow: 'Who it’s for',
  title: 'A good fit if…',
  items: [
    'You want more patients for a treatment: implants, aligners, braces or smile makeovers.',
    'You have tried ads before and got many leads but few patients.',
    'You are ready to answer and follow up every enquiry, with Aumy or with your own team.',
    'You want to judge ads by booked visits, not by likes or leads.',
  ],
  notFit: 'If you want the cheapest leads, we are not the right fit. We aim for patients who book.',
};

const WITH_AUMY = {
  title: 'Ads bring the enquiry. Aumy makes sure it becomes a visit.',
  text: 'With Aumy, every enquiry from an ad is answered straight away, day or night, and followed up until the patient books, and each booked visit is counted against the ad that brought it. Ads also work on their own: enquiries then come straight to your team.',
  link: { to: '/revenue-generator', label: 'How Aumy works' },
};

const FAQS = [
  { q: 'How much should we spend on ads?', a: 'It depends on your area and the treatment. We start small, with a budget you choose, and grow it only when the ads bring booked visits. The ad budget is separate from our fee.' },
  { q: 'Meta or Google: which is better for a dental clinic?', a: 'They do different jobs. Google reaches people already searching for a dentist today. Facebook and Instagram reach people nearby before they search, which suits treatments people think about for a while, like implants or aligners. Most clinics do best with both.' },
  { q: 'Do we need Aumy to run ads with you?', a: 'No. You can take ads on their own, and enquiries come to your team in one list. With Aumy, every enquiry is also answered straight away and followed up until it books, which is where most ad money is otherwise lost.' },
  { q: 'How do you know an ad brought a patient?', a: 'Every enquiry is marked with the ad it came from and followed through to the booked visit. You see booked visits for each ad, not just leads.' },
  { q: 'How much does it cost?', a: 'It depends on the treatments and the number of ads, so we quote after the free clinic audit. WhatsApp 80071 89868 to start.' },
];

const AUDIT = {
  service: 'Dental Ads Audit',
  title: 'Get a free clinic audit',
  intro: 'Tell us your clinic and the patients you want more of. We look at your past ads, your Google profile and how enquiries are answered today, and send you where patients are being lost and what we would run first.',
  goalLabel: 'Which patients do you want more of?',
  goals: ['Implants', 'Aligners or braces', 'Smile makeovers', 'More patients from nearby', 'Something else'],
  fine: 'Free. Reviewed by a person before it reaches you. Your details are used only for the audit.',
  done: 'Done. We will send your clinic audit to your WhatsApp.',
  error: 'Something went wrong. WhatsApp us at 80071 89868 and we will start your audit.',
};

const FINAL = {
  eyebrow: 'Dental ads by AUM AI',
  title: 'Every rupee on ads should end in a chair.',
  text: 'Start with a free audit of your ads and your follow-up.',
};

// JSON-LD Service (scripts/prerender.js). No review or rating markup.
const SCHEMA = {
  name: 'Dental ads: Meta ads for dental clinics and Google ads for dentists',
  serviceType: 'Online advertising for dental clinics (Meta and Google ads)',
  audience: 'Dental clinics',
};

module.exports = { PATH, KEY, WHATSAPP, ARTICLE, SEO, HERO, VISUAL, WHAT, POINTS, WORK, STEPS, MONTHLY, FIT, WITH_AUMY, FAQS, AUDIT, FINAL, SCHEMA };
module.exports.default = module.exports;
