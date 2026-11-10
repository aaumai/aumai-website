/**
 * Dental implant ads, Meta and Google (owner 2026-10-23; implants only since 2026-11-10): the service
 * page at aumai.co.in/dental-ads, listed under "Product & services → Services" in the header.
 *
 * Niche (owner 2026-11-10, "position ... only for Implant ads and that too for within india and dental
 * tourism, people should see that as our niche"): our ads service runs implant ads only, for implant
 * patients from the clinic's city, from across India, and from abroad (dental tourism: NRIs and
 * international patients). The home headline and Aumy-first stay as they are (strategy lock, 9 Nov).
 * The URL stays /dental-ads so nothing it was found for is lost.
 *
 * ONE copy of the words: src/pages/ServicePage.js renders them and scripts/prerender.js writes
 * the same words into the crawler HTML, the Service JSON-LD and the FAQPage JSON-LD.
 *
 * Honest proof only: we run Sterling's Meta ads (implants); AUM AI is a Meta Tech Provider; ad
 * enquiries flow into Aumy and are followed up; the growth article on leads vs patients. NO client ad
 * results, cost-per-lead or ROI figures, NO review or rating markup, NO price (we quote after the free
 * audit), nothing about travel, visas or stays we don't arrange.
 *
 * `module.exports` on purpose: the prerender script is plain Node.
 */
const PATH = '/dental-ads';
const KEY = 'ads';

const WHATSAPP = { display: '80071 89868', link: 'https://wa.me/918007189868?text=' + encodeURIComponent('Hi, I would like a free clinic audit for implant ads.') };

const ARTICLE = { href: '/growth/meta-ads-dental-clinics-leads-vs-patients', label: 'Meta ads for dental clinics: why leads don’t always become patients' };

const SEO = {
  title: 'Dental Implant Ads: India & Dental Tourism | AUM AI',
  description:
    'Implant ads for dental clinics: Meta and Google ads that bring implant patients from your city, across India and abroad. Judged by booked consultations.',
};

const HERO = {
  eyebrow: 'Dental implant ads · India and dental tourism',
  title: 'Implant patients, from your city and from abroad.',
  sub: 'We run only implant ads. Facebook, Instagram and Google ads that bring implant patients from near your clinic, from across India, and from abroad, judged by one number: how many booked a consultation. Every enquiry is answered and followed up, in any time zone, so the money you spend turns into implant cases.',
  cta: 'Get a free clinic audit',
  secondary: { label: 'How an enquiry becomes a visit', href: '#how' },
  trust: 'Free audit. We look at your past ads, your Google profile and what happens today when an implant enquiry arrives, and tell you where patients are being lost.',
};

// Hero picture: the path from ad to booked visit (not data, so no numbers on it).
const VISUAL = {
  kind: 'journey',
  title: 'From an implant ad to a booked visit',
  steps: [
    { h: 'Someone sees your implant ad', t: 'Nearby, across India or abroad' },
    { h: 'They message you on WhatsApp', t: 'Or call, or fill in the form' },
    { h: 'Answered straight away', t: 'Day or night, any time zone, with Aumy' },
    { h: 'Followed up until they decide', t: 'Implants take thought; we don’t stop at one message' },
    { h: 'Consultation booked', t: 'Counted against the ad that brought it' },
  ],
  caption: 'Every ad judged by the consultations it booked',
};

const WHAT = {
  eyebrow: 'What we do',
  title: 'Implant ads, and everything after the ad',
  intro: 'Implants are the treatment patients think about longest, and the one where most ad money is lost after the click. So we run only implant ads, and make sure every enquiry they bring is answered and followed up.',
  items: [
    { icon: 'phone', h: 'Implant ads on Facebook and Instagram', t: 'Ads for missing teeth, implants and full-mouth rehabilitation, shown to the people you choose, with the WhatsApp or call button one tap away.' },
    { icon: 'search', h: 'Google ads for people searching for implants', t: 'Your clinic near the top when someone searches for dental implants, in your city or from another one.' },
    { icon: 'target', h: 'Patients from across India and abroad', t: 'Campaigns for implant patients who will travel: from other cities in India, and NRIs and international patients coming for dental treatment.' },
    { icon: 'image', h: 'Ads that look like your clinic', t: 'Plain, honest words in your clinic’s name, made from your own photos, videos and implant doctors.' },
    { icon: 'chat', h: 'Every enquiry answered and followed up', t: 'With Aumy, every implant enquiry is answered straight away, day or night and in any time zone, and followed up until the patient books or says no.' },
    { icon: 'chart', h: 'A clear monthly report', t: 'Money spent, enquiries, consultations booked and the cost of each, in plain words.' },
  ],
};

const POINTS = {
  eyebrow: 'Why implant ads disappoint',
  title: '“We got lots of implant enquiries, and hardly any patients.”',
  intro: 'It is the most common implant ads story, and it is rarely the ad’s fault. The enquiries are lost in four places.',
  items: [
    { h: 'Cheap leads', t: 'Ads set to get the most leads for the least money bring the most people who were only curious about the price.' },
    { h: 'Slow replies', t: 'An enquiry answered the next morning, or the next day for someone abroad, has often gone to another clinic.' },
    { h: 'No follow-up', t: 'Nobody decides on implants after one message. Without a second and a third, they drift away.' },
    { h: 'The wrong number', t: 'Likes, clicks and leads look good in a report. Booked implant consultations are what pay for the ads.' },
  ],
  link: ARTICLE,
};

const WORK = {
  eyebrow: 'Why clinics trust us with implant ads',
  title: 'Dental clinics we run implant ads for',
  intro: 'We don’t publish a clinic’s ad results until a monthly report has measured them. Here is what we can show you.',
  cases: [
    { name: 'The Sterling Dental Clinic', place: 'Vasant Vihar, New Delhi', tag: 'Facebook and Instagram', text: 'We run Sterling’s Meta ads for dental implants and review them every morning: what to stop, what to try next and where to move the budget.' },
    { name: 'Ad enquiries go straight into Aumy', tag: 'Meta Tech Provider', text: 'AUM AI is a Meta Tech Provider, so Facebook, Instagram and WhatsApp enquiries arrive in Aumy and land in your front desk’s list the moment they come in.' },
    { name: 'We wrote the guide on it', tag: 'Growth Hub', text: 'Why ad leads don’t become patients, and the one number to judge ads by, explained for dental clinic owners.', link: { href: ARTICLE.href, label: 'Read the guide', internal: true } },
  ],
};

const STEPS = {
  eyebrow: 'How we work',
  title: 'Follow-up first, then the ads',
  items: [
    { h: 'Free clinic audit', t: 'We look at your past ads, your Google profile and what happens today when an implant enquiry arrives.' },
    { h: 'Fix the follow-up first', t: 'Before spending more on ads, we make sure every enquiry is answered and followed up. Otherwise the ads pay for patients you lose.' },
    { h: 'Start small', t: 'Implant ads for the patients you want first (your city, the rest of India or abroad), with a budget you choose.' },
    { h: 'Every week', t: 'We check which ads bring booked consultations, stop the ones that don’t, and try new ones.' },
    { h: 'Every month', t: 'A report on spend, enquiries, booked consultations and the cost of each, and the plan for next month.' },
  ],
};

const MONTHLY = {
  eyebrow: 'Every month',
  title: 'What you get every month',
  items: [
    'Implant ads planned, made and run on Facebook, Instagram and Google.',
    'New ads tried every month, so you are never stuck with one that has stopped working.',
    'A weekly check, with the budget moved to the ads that bring implant patients.',
    'Every enquiry in one list, with who answered it and what happened next.',
    'A report in plain words: spend, enquiries, booked consultations and the cost of each.',
  ],
  asideTitle: 'One person who knows your clinic',
  aside: 'Your ads are looked after by a named person on WhatsApp, not a ticket queue. Ask why an ad was stopped, and get an answer.',
};

const FIT = {
  eyebrow: 'Who it’s for',
  title: 'A good fit if…',
  items: [
    'Your clinic places implants and wants more implant patients.',
    'You want implant patients from your city, from across India, or from abroad.',
    'You have tried ads before and got many leads but few patients.',
    'Your clinic runs on Aumy, or is starting on it, so every enquiry is answered and followed up.',
  ],
  notFit: 'We run only implant ads. If you want ads for other treatments, or the cheapest leads, we are not the right fit.',
};

const WITH_AUMY = {
  title: 'Ads bring the enquiry. Aumy makes sure it becomes a visit.',
  text: 'With Aumy, every implant enquiry is answered straight away, day or night and in any time zone, and followed up until the patient books, and each booked visit is counted against the ad that brought it. That is why we run ads only for clinics on Aumy: Aumy goes in first, then the ads.',
  link: { to: '/revenue-generator', label: 'How Aumy works' },
};

const FAQS = [
  { q: 'Why only implant ads?', a: 'Implants are the treatment where good ads and good follow-up make the biggest difference to a clinic, and the one patients will travel for. Doing one thing lets us get very good at it.' },
  { q: 'Can you bring implant patients from abroad?', a: 'Yes. We run implant ads aimed at NRIs and international patients who come to India for dental treatment, and Aumy answers their WhatsApp messages straight away, whatever their time zone. We run the ads and the follow-up; travel and accommodation are arranged by the patient and your clinic.' },
  { q: 'How much should we spend on ads?', a: 'It depends on your area and on where you want patients from. We start small, with a budget you choose, and grow it only when the ads bring booked consultations. The ad budget is separate from our fee.' },
  { q: 'Meta or Google: which is better for implants?', a: 'They do different jobs. Google reaches people already searching for implants. Facebook and Instagram reach people before they search, which suits implants, a treatment people think about for a while. Most clinics do best with both.' },
  { q: 'Do we need Aumy to run ads with you?', a: 'Yes. We run ads only for clinics on Aumy. Most ad money is lost after the click, when an enquiry is answered late or never followed up. With Aumy in first, every enquiry is answered straight away and followed up until it books, and each booked visit is counted against the ad that brought it.' },
  { q: 'How much does it cost?', a: 'It depends on where you want patients from and the number of ads, so we quote after the free clinic audit. WhatsApp 80071 89868 to start.' },
];

const AUDIT = {
  service: 'Dental Implant Ads Audit',
  title: 'Get a free clinic audit',
  intro: 'Tell us your clinic and where you want implant patients from. We look at your past ads, your Google profile and how enquiries are answered today, and send you where patients are being lost and what we would run first.',
  goalLabel: 'Where do you want implant patients from?',
  goals: ['Near my clinic', 'Across India', 'From abroad (dental tourism)', 'All of these', 'Not sure yet'],
  fine: 'Free. Reviewed by a person before it reaches you. Your details are used only for the audit.',
  done: 'Done. We will send your clinic audit to your WhatsApp.',
  error: 'Something went wrong. WhatsApp us at 80071 89868 and we will start your audit.',
};

const FINAL = {
  eyebrow: 'Dental implant ads by AUM AI',
  title: 'Every rupee on implant ads should end in a chair.',
  text: 'Start with a free audit of your ads and your follow-up.',
};

// JSON-LD Service (scripts/prerender.js). No review or rating markup.
const SCHEMA = {
  name: 'Dental implant ads: Meta and Google ads for implant patients in India and from abroad',
  serviceType: 'Online advertising for dental implant clinics (Meta and Google ads)',
  audience: 'Dental clinics that place implants',
};

module.exports = { PATH, KEY, WHATSAPP, ARTICLE, SEO, HERO, VISUAL, WHAT, POINTS, WORK, STEPS, MONTHLY, FIT, WITH_AUMY, FAQS, AUDIT, FINAL, SCHEMA };
module.exports.default = module.exports;
