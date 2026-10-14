/**
 * "How to Run Your Clinic" — the free teaching video series (owner 2026-10-13). ONE copy of the words:
 * the React pages (src/pages/RunYourClinicHub.js, src/pages/RunYourClinicEpisode.js) and the crawler
 * HTML + VideoObject JSON-LD (scripts/prerender.js) both read this file. Edit here, never there.
 *
 * Episodes are made in the EHR repo: marketing/clinic-systems-series (SERIES.md has the routine).
 * The transcript is the narration's caption text (vo.json `cap`, digits) grouped by the YouTube
 * chapters (out/<ep>-chapters.txt). Videos are web-compressed to 720p and copied to
 * public/videos/run-your-clinic/ with a poster frame next to each.
 *
 * Tone (SERIES.md §1): a teacher, not a salesman. No prices, no claimed results; Aumy once, at the end.
 */

const HUB_PATH = '/run-your-clinic';

const SERIES = {
  name: 'How to Run Your Clinic',
  eyebrow: 'Free video series',
  h1: 'How to Run Your Clinic',
  intro:
    'A short video series for dental clinic owners. Each episode takes one system your clinic needs, shows how money leaks out when it is missing, and gives you the one number that tells you whether it is working. Every example is from a dental clinic. Owners of other clinics can follow along too.',
  // The Growth Hub's link to the series (src/pages/GrowthHub.js + its crawler twin).
  hubBlurb:
    'Short videos for dental clinic owners: one system per episode, and the one number that checks it. Part 1: the 8 systems every clinic needs.',
  seoTitle: 'How to Run a Dental Clinic: Free Video Series for Clinic Owners | Aumy',
  seoDescription:
    'A free video series on dental clinic management. Each episode covers one system a dental clinic needs and the one number that shows whether it works. Part 1 is out now.',
};

// Rupee figures in every episode are worked examples (SERIES.md §3 rules).
const EXAMPLE_NOTE =
  'The rupee figures in this episode are examples to show the arithmetic. They are not results from any clinic.';

const EPISODES = [
  {
    part: 1,
    live: true,
    slug: '8-systems-every-clinic-needs',
    title: 'The 8 systems every clinic needs',
    h1: 'How to Run a Dental Clinic: The 8 Systems Every Clinic Needs',
    seoTitle: 'How to Run a Dental Clinic: The 8 Systems Every Clinic Needs | Aumy',
    seoDescription:
      'How to run a dental clinic: the 8 systems every clinic needs, and the one number that checks each. A 6-minute video on dental clinic management, with the full text.',
    card: 'Your clinic as a pipe: the 8 systems that plug the leaks, and the one number that checks each.',
    lead:
      'Two dental clinics. Same city, same chairs, same fees. One is booked 3 weeks out. The other has empty chairs every afternoon. The difference is almost never the dentistry. It is systems. Here are the 8 every clinic needs, and the one number that tells you whether each one is working.',
    videoDescription:
      'Part 1 of How to Run Your Clinic. Your dental clinic is a pipe: enquiries come in at one end, revenue (treatments, cleanings, referrals) goes out at the other, and every missing system is a leak. The 8 systems every clinic needs, and the one number that tells you whether each one is working.',
    src: '/videos/run-your-clinic/8-systems-every-clinic-needs.mp4',
    poster: '/videos/run-your-clinic/8-systems-every-clinic-needs.jpg',
    uploadDate: '2026-10-14',
    duration: 'PT5M50S',
    durationSec: 350,
    durationLabel: '5 min 50 s',
    // One entry per YouTube chapter. `heading` is the H2 in the transcript.
    chapters: [
      {
        label: 'Two clinics',
        heading: 'Two clinics',
        start: 0,
        lines: [
          'Two dental clinics. Same city, same chairs, same fees.',
          'One is booked 3 weeks out. The other has empty chairs every afternoon, and the owner is posting on Instagram at 11 at night.',
          'The difference is almost never the dentistry. The first clinic runs on systems. The second runs on memory.',
        ],
      },
      {
        label: 'Your clinic is a pipe',
        heading: 'Your clinic is a pipe',
        start: 21,
        lines: [
          'Think of your clinic as a pipe. Patients come in at one end, as enquiries. Revenue comes out at the other, as treatments, cleanings and referrals.',
          'And every pipe leaks. Today, the eight systems that plug those leaks, and the one number that tells you whether each one is working.',
          "A system is simple. A job done the same way every time, whoever is at the desk. And one number to check it. No number? Then it's a habit, not a system.",
        ],
      },
      {
        label: '1 · Patient acquisition',
        heading: 'System 1: Patient acquisition',
        start: 57,
        lines: [
          'System one: patient acquisition. Enquiries come from walk-ins, referrals, Google, Instagram and ads.',
          "Ask most owners how many enquiries came in last week, and you'll hear: quite a few. Quite a few is not a number.",
          'Work backwards from the chair. Want 15 new patients a week, and 4 in 10 enquiries book? Then you need about 40 enquiries a week. Getting 25? Now you know exactly how far off you are.',
          'The number: enquiries per week, by channel.',
        ],
      },
      {
        label: '2 · Sales',
        heading: 'System 2: Sales',
        start: 93,
        lines: [
          'System two: sales. Of the enquiries marketing brought in, how many booked an appointment?',
          "40 enquiries, 14 bookings. That's 35%. 26 people reached out, and walked away.",
          "If this number is low, more ads won't help. You'll just lose more people, faster. The number: conversion percent.",
        ],
      },
      {
        label: '3 · Follow-up',
        heading: 'System 3: Follow-up',
        start: 117,
        lines: [
          "System three: follow-up. Most people don't book on the first message. They ask what an implant costs, then go quiet. Quiet is not a no.",
          'A follow-up system is a written schedule. Day 1, day 3, day 7, day 14, day 30. It happens whether or not anyone remembers.',
          "The number: follow-ups per lead. In most clinics, it's one. Sometimes zero.",
        ],
      },
      {
        label: '4 · Appointment management',
        heading: 'System 4: Appointment management',
        start: 151,
        lines: [
          'System four: appointment management. A no-show costs you twice. The chair sits empty, and the staff are paid anyway.',
          "60 appointments a week, 9 no-shows. That's 15%. At ₹1,500 a slot, that's over ₹50,000 a month, gone.",
          'The fix: confirm every appointment the day before, and remind on the morning. The number: no-show %. Aim for under 5.',
        ],
      },
      {
        label: '5 · Advised treatment',
        heading: 'System 5: Advised treatment',
        start: 182,
        lines: [
          "System five: advised treatment. You advise a root canal and crown. The patient says, I'll think about it. And the file closes.",
          '20 patients advised this quarter. 8 completed. The other 12, at ₹12,000 each, are ₹1,44,000, sitting in your own records.',
          "Follow up every advised treatment until it's done, or clearly declined. The number: treatment completion percent.",
        ],
      },
      {
        label: '6 · Retention',
        heading: 'System 6: Retention',
        start: 218,
        lines: [
          'System six: retention. Six-monthly cleanings. Unfinished treatments. Retainer checks after braces.',
          "100 patients due for recall this month. 30 come back. That's 70 cleanings missed, and every problem you would have caught at them.",
          'The number: recall completion %. Most clinics are under 30. The best are above 70.',
        ],
      },
      {
        label: '7 · Patient engagement',
        heading: 'System 7: Patient engagement',
        start: 246,
        lines: [
          "System seven: patient engagement. Treatment ends. The relationship shouldn't.",
          'Six months after an implant, a short message from the doctor: how is it feeling? A year after a root canal and crown: any sensitivity? Patients remember that clinic, and send their family there.',
          'The number: check-ins done, as a % of those due.',
        ],
      },
      {
        label: '8 · Online presence',
        heading: 'System 8: Online presence',
        start: 274,
        lines: [
          'System eight: online presence. When someone searches for a dentist near me, your Google profile is your front door.',
          'Two numbers: Google reviews collected this month, and where you rank when you search for a dentist in your own area. Not in the top 3? Patients are finding someone else.',
        ],
      },
      {
        label: 'The scorecard',
        heading: 'The scorecard: 8 systems, 8 numbers',
        start: 296,
        scorecard: true, // the table is shown under this heading
        lines: [
          'Eight systems. Eight numbers. Enquiries per week. Conversion. Follow-ups per lead. No-shows. Treatment completion. Recalls. Check-ins. Reviews and rank.',
          "You don't need all eight at once. Pick one. Put its number on a whiteboard at reception, and fix it this month. Next month, the next one.",
          'Plug the leaks one by one, and growth stops being luck. It becomes natural.',
        ],
      },
      {
        label: 'Next episode',
        heading: 'Next episode',
        start: 328,
        lines: [
          'Next episode: patient acquisition. Where your enquiries really come from, and how to count them.',
          "And if you'd like these eight numbers in front of you every Monday, without a spreadsheet, that's what we built Aumy for. See you in part two.",
        ],
      },
    ],
    // System -> its one number (the narration's scorecard).
    scorecard: [
      { system: 'Patient acquisition', number: 'Enquiries per week, by channel' },
      { system: 'Sales', number: 'Conversion % (enquiries that book)' },
      { system: 'Follow-up', number: 'Follow-ups per lead' },
      { system: 'Appointment management', number: 'No-show %', aim: 'Aim for under 5%' },
      { system: 'Advised treatment', number: 'Treatment completion %' },
      { system: 'Retention', number: 'Recall completion %', aim: 'Most clinics are under 30%; the best are above 70%' },
      { system: 'Patient engagement', number: 'Check-ins done, as a % of those due' },
      { system: 'Online presence', number: 'Google reviews per month, and your local rank' },
    ],
  },
  {
    part: 2,
    live: false,
    title: 'Patient acquisition',
    card: 'Where your enquiries really come from, and how to count them.',
  },
];

const episodePath = (ep) => `${HUB_PATH}/${ep.slug}`;
const liveEpisodes = () => EPISODES.filter((ep) => ep.live);
const episodeBySlug = (slug) => EPISODES.find((ep) => ep.live && ep.slug === slug);
const nextEpisode = (ep) => EPISODES.find((e) => e.part === ep.part + 1);

// "0:57", "5:28"
const clock = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;

// A chapter ends where the next one starts; the last one at the end of the video.
const chapterEnd = (ep, i) => (i + 1 < ep.chapters.length ? ep.chapters[i + 1].start : ep.durationSec);

// Lines that open with "The number:" / "Two numbers:" get that lead in bold: [lead, rest] or null.
const numberLead = (line) => {
  const m = /^(The number:|Two numbers:)\s(.*)$/.exec(line);
  return m ? [m[1], m[2]] : null;
};

module.exports = {
  HUB_PATH,
  SERIES,
  EXAMPLE_NOTE,
  EPISODES,
  episodePath,
  liveEpisodes,
  episodeBySlug,
  nextEpisode,
  clock,
  chapterEnd,
  numberLead,
};
module.exports.default = module.exports;
