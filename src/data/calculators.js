/**
 * Config-driven revenue calculators (inbound strategy, "how much money am I
 * losing?" category). One generic page component (pages/CalculatorPage.js)
 * renders every entry here; scripts/prerender.js and scripts/seo-files.js
 * require this file to generate a crawler page + sitemap entry per
 * calculator — same single-source pattern as growthPosts.js, and CommonJS
 * for the same reason.
 *
 * The originals (/leak-calculator, /missed-call-calculator) predate this file
 * and keep their standalone pages; new calculators go here.
 *
 * Math rules: deliberately conservative, assumptions PRINTED in `fine`, and
 * each formula matches the worked example in its companion Growth Hub
 * article so a reader can reproduce the article's number.
 */

const money = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

const CALCULATORS = [
  // ------------------------------------------------------------------
  // LEAD FOLLOW-UP
  // ------------------------------------------------------------------
  {
    slug: 'lead-followup-calculator',
    name: 'Lead Follow-up Calculator',
    cardBlurb:
      'What the enquiries that never got a second message are worth — and what disciplined follow-up could recover.',
    eyebrow: 'Lead follow-up calculator',
    heroTitle: 'What are your unfollowed leads worth?',
    heroSub:
      'Most enquiries don’t book on the first conversation — and at most clinics, nobody ever talks to them again. Estimate what a real follow-up system would recover.',
    seoTitle: 'Lead Follow-up Calculator for Dental Clinics — What Unfollowed Enquiries Cost | AUMY',
    seoDescription:
      'How much revenue could your dental clinic recover with systematic lead follow-up? Enter your monthly enquiries and conversion rates for a deliberately conservative estimate. Free, no sign-up.',
    relatedArticle: {
      href: '/growth/dental-lead-follow-up-system',
      label: 'the complete follow-up system, from enquiry to appointment',
    },
    sliders: [
      { key: 'enquiries', label: 'New enquiries per month (all channels)', hint: 'WhatsApp, Instagram, calls, walk-ins, website', min: 0, max: 300, step: 5, initial: 60 },
      { key: 'noBookPct', label: '…of those, how many DON’T book in the first conversation?', hint: '"I’ll think about it", "let me check", silence', min: 0, max: 90, initial: 60, suffix: '%' },
      { key: 'noFollowPct', label: '…of those, how many never get a proper follow-up?', min: 0, max: 100, initial: 70, suffix: '%' },
      { key: 'convertPct', label: 'With a real 5-touch sequence, how many could you convert?', hint: 'Be conservative — even 1 in 4 changes the math', min: 0, max: 50, initial: 25, suffix: '%' },
      { key: 'avgValue', label: 'Average first-treatment value (₹)', min: 500, max: 20000, step: 250, initial: 5000 },
    ],
    resultLabel: 'Even counting conservatively, unfollowed leads are costing your clinic about',
    compute(v) {
      const stalled = v.enquiries * (v.noBookPct / 100);
      const abandoned = stalled * (v.noFollowPct / 100);
      const recoverable = abandoned * (v.convertPct / 100);
      const monthly = recoverable * v.avgValue;
      return {
        total: money(monthly), per: '/month',
        secondary: '≈ ' + money(monthly * 12) + ' every year',
        breakdown: [
          { label: 'Enquiries that stall each month', value: String(Math.round(stalled)) },
          { label: '…abandoned with no follow-up', value: String(Math.round(abandoned)) },
          { label: 'Patients recoverable with follow-up / month', value: String(Math.round(recoverable)) },
        ],
        fine:
          'How we undercount: only first-treatment value — no lifetime value, no referrals, no implant or aligner cases. And the recovery rate you set applies only to leads currently getting NO follow-up at all.',
      };
    },
  },

  // ------------------------------------------------------------------
  // NO-SHOWS
  // ------------------------------------------------------------------
  {
    slug: 'no-show-calculator',
    name: 'No-show Calculator',
    cardBlurb:
      'Your empty-chair cost: what missed appointments that nobody rebooks or refills add up to over a year.',
    eyebrow: 'No-show calculator',
    heroTitle: 'What does the empty chair actually cost?',
    heroSub:
      'A no-show isn’t just an annoyance — it’s paid-for chair time producing nothing, and most clinics never rebook or refill it. Put a number on yours.',
    seoTitle: 'Dental No-Show Calculator — What Missed Appointments Cost Your Clinic | AUMY',
    seoDescription:
      'Estimate what appointment no-shows cost your dental clinic per month and year: appointments per week, no-show rate and average visit value, counted conservatively. Free, no sign-up.',
    relatedArticle: {
      href: '/growth/reduce-dental-appointment-no-shows',
      label: 'how to reduce no-shows — the full prevention and recovery stack',
    },
    sliders: [
      { key: 'appointments', label: 'Appointments per week', min: 0, max: 300, step: 5, initial: 50 },
      { key: 'noshowPct', label: 'No-show rate', hint: 'Count late cancellations you couldn’t refill too', min: 0, max: 40, initial: 15, suffix: '%' },
      { key: 'lostPct', label: '…of those, how many are never rebooked or refilled?', min: 0, max: 100, initial: 50, suffix: '%' },
      { key: 'avgValue', label: 'Average visit value (₹)', min: 500, max: 20000, step: 250, initial: 3000 },
    ],
    resultLabel: 'Even counting conservatively, no-shows are costing your clinic about',
    compute(v) {
      const weeklyNoShows = v.appointments * (v.noshowPct / 100);
      const weeklyLost = weeklyNoShows * (v.lostPct / 100);
      const weekly = weeklyLost * v.avgValue;
      return {
        total: money(weekly * 4), per: '/month',
        secondary: '≈ ' + money(weekly * 48) + ' every year (48 working weeks)',
        breakdown: [
          { label: 'No-shows per week', value: String(Math.round(weeklyNoShows)) },
          { label: '…lost for good (never rebooked/refilled)', value: String(Math.round(weeklyLost)) },
          { label: 'Chair revenue lost / week', value: money(weekly) },
        ],
        fine:
          'How we undercount: only the no-shows you never recover are counted, at plain visit value — not the treatment plans that die when the patient drops off, and only 48 working weeks a year.',
      };
    },
  },

  // ------------------------------------------------------------------
  // RECALL
  // ------------------------------------------------------------------
  {
    slug: 'recall-calculator',
    name: 'Recall Calculator',
    cardBlurb:
      'How much revenue is sitting in the patients whose check-up is due right now — and nobody is calling.',
    eyebrow: 'Recall calculator',
    heroTitle: 'How much is sitting in your recall list?',
    heroSub:
      'Every month, a predictable number of your patients come due for a cleaning or check-up. A well-run recall system books around 40% of them — we use that benchmark and count only the gap above what you book today.',
    seoTitle: 'Dental Recall Calculator — Revenue Sitting in Your Due-Patient List | AUMY',
    seoDescription:
      'Estimate the revenue in your dental clinic’s recall list: patients due per month, how many currently return, and average recall visit value — counted conservatively against a 40% well-run benchmark. Free, no sign-up.',
    relatedArticle: {
      href: '/growth/dental-recall-list-hidden-revenue',
      label: 'the full recall playbook, with the messages for every segment',
    },
    sliders: [
      { key: 'due', label: 'Patients due for recall each month', hint: 'Roughly: active patients ÷ 12 (6-monthly recalls count twice a year)', min: 0, max: 400, step: 5, initial: 100 },
      { key: 'currentPct', label: '…of those, how many actually book today?', hint: 'On their own, or from ad-hoc reminders', min: 0, max: 60, initial: 15, suffix: '%' },
      { key: 'avgValue', label: 'Average recall visit value (₹)', hint: 'Cleaning + X-ray + what the examination finds', min: 500, max: 15000, step: 250, initial: 3000 },
    ],
    resultLabel: 'A well-run recall system would add about',
    compute(v) {
      const SYSTEM_RATE = 0.4; // printed benchmark for a consistently-worked recall list
      const gapPct = Math.max(0, SYSTEM_RATE - v.currentPct / 100);
      const extra = v.due * gapPct;
      const monthly = extra * v.avgValue;
      return {
        total: money(monthly), per: '/month',
        secondary: '≈ ' + money(monthly * 12) + ' every year',
        breakdown: [
          { label: 'Due patients booking today / month', value: String(Math.round(v.due * (v.currentPct / 100))) },
          { label: 'Booking at the 40% benchmark / month', value: String(Math.round(v.due * SYSTEM_RATE)) },
          { label: 'Extra recall visits recovered / month', value: String(Math.round(extra)) },
        ],
        fine:
          'How we undercount: the 40% benchmark is a conservative rate for a consistently-worked recall list — not an upper bound — and we count only the visits ABOVE what you already book, at plain visit value with no findings-driven treatment.',
      };
    },
  },

  // ------------------------------------------------------------------
  // DORMANT PATIENTS
  // ------------------------------------------------------------------
  {
    slug: 'dormant-patient-calculator',
    name: 'Dormant Patient Calculator',
    cardBlurb:
      'What your 12-months-silent patient database is worth if a campaign brings back even a small share.',
    eyebrow: 'Dormant patient calculator',
    heroTitle: 'What is your inactive patient database worth?',
    heroSub:
      'Patients who haven’t visited in a year aren’t gone — most just drifted, and nobody invited them back. Estimate what a modest, well-run reactivation campaign would recover.',
    seoTitle: 'Dormant Patient Calculator — What Your Inactive Dental Database Is Worth | AUMY',
    seoDescription:
      'Estimate the value of your dental clinic’s dormant patients: total patients on file, how many visited this year, and a conservative reactivation rate. Free, no sign-up.',
    relatedArticle: {
      href: '/growth/reactivate-dormant-dental-patients',
      label: 'the full dormant-patient reactivation campaign, step by step',
    },
    sliders: [
      { key: 'totalPatients', label: 'Total patients in your records', min: 0, max: 10000, step: 100, initial: 2000 },
      { key: 'activePatients', label: '…of those, how many visited in the last 12 months?', min: 0, max: 10000, step: 50, initial: 600 },
      { key: 'reactivatePct', label: 'Share a year of campaigns could bring back', hint: 'Single digits is normal for a cold list — 5% is a sober target', min: 0, max: 20, initial: 5, suffix: '%' },
      { key: 'avgValue', label: 'Average returning-visit value (₹)', hint: 'Cleaning + X-ray + what the examination finds', min: 500, max: 15000, step: 250, initial: 3000 },
    ],
    resultLabel: 'Even at that modest rate, your dormant list is worth about',
    compute(v) {
      const dormant = Math.max(0, v.totalPatients - v.activePatients);
      const returned = dormant * (v.reactivatePct / 100);
      const yearly = returned * v.avgValue;
      return {
        total: money(yearly), per: '/year',
        secondary: '≈ ' + money(yearly / 12) + ' every month, from patients you already paid to acquire',
        breakdown: [
          { label: 'Dormant patients (12+ months silent)', value: Math.round(dormant).toLocaleString('en-IN') },
          { label: 'Patients a year of campaigns brings back', value: String(Math.round(returned)) },
          { label: 'First returning visit each, at', value: money(v.avgValue) },
        ],
        fine:
          'How we undercount: one returning visit per patient — ignoring that reactivated patients re-enter your recall cycle, refer family, and return next year. Acquisition cost for these patients was paid long ago, so this is close to pure margin.',
      };
    },
  },
];

module.exports = { CALCULATORS };
