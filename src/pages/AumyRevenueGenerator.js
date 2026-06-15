import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './AumyProduct.css';
import './AumyRevenueGenerator.css';
import './Page.css';

const AumyRevenueGenerator = () => {
  useEffect(() => {
    setPageSeo({
      title: 'The Clinic Patients Choose, Return to, and Recommend | AUMY by AUM AI',
      description: 'AUMY helps dental and aesthetic clinics build genuine patient loyalty — through emotional, personalised WhatsApp communication that makes patients feel cared for between visits. Not a chatbot. Not templates. The clinic that nurtures wins for life.',
      canonical: 'https://aumai.co.in/revenue-generator',
      image: 'https://aumai.co.in/screenshots/roi-preview.png',
    });
  }, []);

  // Recoverable-revenue calculator — lets the visitor compute their OWN number
  // (the strongest implication is the one the buyer works out themselves).
  // Deliberately conservative (15–30% of billing) so it under-claims and stays defensible.
  const [ppw, setPpw] = useState(40);
  const [ticket, setTicket] = useState(3000);
  const monthlyBilling = ppw * 4.3 * ticket;
  const leakLow = monthlyBilling * 0.15;
  const leakHigh = monthlyBilling * 0.30;
  const leakLowYear = leakLow * 12;
  const leakHighYear = leakHigh * 12;
  const recoverHalf = ((leakLow + leakHigh) / 2) * 0.5 * 12;
  const fmt = (n) => {
    if (!n || n < 0) return '₹0';
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${Math.round(n / 1000)}k`;
    return `₹${Math.round(n)}`;
  };

  // Illustrative (*) ranges + one real, attributed result (†).
  const heroStats = [
    { value: '20–40%*', label: 'Revenue lost to no-shows & dead leads — recovered' },
    { value: '2–3×*', label: 'More enquiries converted to bookings' },
    { value: '100%', label: 'Of bookings & revenue attributed' },
    { value: '+25%†', label: 'Revenue in 60 days' },
  ];

  // Illustrative monthly leak for a mid-sized clinic (~₹8L/month billing).
  // Ranges are easy to tune — one array. Clearly marked illustrative on-page.
  const revenueLeaks = [
    { label: 'No-shows & last-minute cancellations', range: '₹50k – 1.1L', note: 'Booked chairs that sit empty' },
    { label: 'Enquiries never followed up', range: '₹40k – 90k', note: 'Leads that went cold before a callback' },
    { label: 'Dormant & overdue patients', range: '₹50k – 1L', note: 'Patients who quietly stopped coming' },
    { label: 'Treatment plans never scheduled', range: '₹70k – 1.4L', note: 'Accepted in the chair — never booked' },
  ];

  const engineSteps = [
    { number: '01', title: 'Catch every lead — any source', text: 'Instagram DMs, WhatsApp, a missed call, a walk-in, a referral, Google, or a paid ad — every enquiry instantly opens a WhatsApp conversation. Nothing slips past a busy front desk.' },
    { number: '02', title: 'Book it — and keep the slot', text: 'AUMY answers questions, qualifies, and books in seconds, 24/7. Then it reminds and confirms — and automatically rebooks the few who still miss — so the appointments you win actually show up.' },
    { number: '03', title: 'Revive patients you already have', text: 'Overdue and dormant patients are re-engaged automatically on WhatsApp — reactivating revenue you already paid to acquire, at near-zero marginal cost.' },
    { number: '04', title: 'Be the clinic they never want to leave', text: 'Most clinics disappear the moment a patient walks out. AUMY keeps your clinic present — educational health tips in your name, sophisticated post-treatment follow-ups, feedback requests that show patients you listen, and well-timed review prompts. Patients feel genuinely cared for between visits. They return. They refer. And when someone asks them which clinic to go to, they answer without hesitating.' },
  ];

  const capiSteps = [
    { number: '01', title: 'Signal real conversions', text: 'When a lead books or pays, AUMY sends that conversion server-side to Meta — the outcome that matters, not a page view.' },
    { number: '02', title: 'Meta optimizes for patients', text: 'The ad algorithm learns who actually books and spends more of your budget finding more of them. Junk leads fall away.' },
    { number: '03', title: 'It compounds every month', text: 'Lookalike audiences built from your real patients get sharper over time — cost per genuine lead keeps falling as the system learns.' },
  ];

  const capabilities = [
    {
      title: 'AI Receptionist — Always On',
      description: 'Your front desk goes home. AUMY does not. Every enquiry that arrives at night, on weekends, or mid-holiday gets an instant, intelligent reply — qualifying the patient, answering questions, and booking the appointment without anyone lifting a finger. A clinic that never sleeps converts the leads that human-only reception loses every evening.',
      color: '#6366f1',
      icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    },
    {
      title: 'Lead Capture from Every Channel',
      description: 'Instagram, WhatsApp, missed calls, walk-ins, referrals, Google, or ads — every enquiry gets an instant WhatsApp reply. AUMY qualifies, answers, and books, so you never lose a lead to a slow callback again.',
      color: '#10b981',
      icon: 'M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
    },
    {
      title: 'Cold Lead Retry',
      description: 'Most enquiries never reply to the first message — so AUMY does not stop at one. It follows up cold and unconverted leads with a polite, well-timed sequence until they book or clearly opt out. Leads your front desk would have written off quietly turn into appointments.',
      color: '#ec4899',
      icon: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5',
    },
    {
      title: 'No-Show Prevention & Rebooking',
      description: 'Timed reminders and confirmations keep booked slots filled — and when a patient still misses, AUMY automatically reaches out to rebook them into the next open slot. Every recovered no-show is a chair you had already sold, now actually earning.',
      color: '#0ea5e9',
      icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008z',
    },
    {
      title: 'AI Recall & Reactivation — Personalised, Not Generic',
      description: 'Most clinics send "We miss you!" to every dormant patient. AUMY reads each patient\'s last treatment record and sends something that proves you remember them specifically. A patient who had a root canal 14 months ago gets: "Just checking in on your root canal — and reminding you that your 6-month cleaning is due, as we discussed." They do not feel like a number on a list. They feel remembered. That is what brings them back — and keeps them.',
      color: '#8b5cf6',
      icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
    },
    {
      title: 'Treatment-Plan Conversion',
      description: 'Proposed treatments that never got scheduled are quietly the biggest leak in a clinic. AUMY follows up on unscheduled and declined plans until more patients say yes — lifting treatment acceptance and the revenue that comes with it.',
      color: '#f59e0b',
      icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z',
    },
    {
      title: 'Google Reviews & Local SEO',
      description: 'After a good visit, AUMY sends a perfectly-timed review request and happy patients leave 5-star ratings that push you up Google Maps and local search. Every review — positive or negative — gets an automatic, professional response that keeps your Google Business Profile active. Google rewards active, responsive profiles with higher rankings. More reviews, more responses, more profile activity — new patients find you first, and the social proof wins them before they even call.',
      color: '#34d399',
      icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
    },
    {
      title: 'Emotional Patient Communication — Not Templates',
      description: 'Two days after fixing a patient\'s cap, AUMY messages them: "Are you eating comfortably? Any sensitivity?" That one message does more for loyalty than any ad campaign. AUMY reads each patient\'s history and sends something that feels personal — because it is. Not a broadcast. Not a template. The kind of message that makes a patient think: my clinic actually remembered me. You cannot fake care. But you can make it scale.',
      color: '#f43f5e',
      icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
    },
    {
      title: 'Educational Content — Your Voice, Your Name',
      description: 'Biweekly health tips, care guides, and treatment education sent to your patients in your name — not promotions, actual value. The clinic that teaches is the clinic patients trust. Patients who learn from you never comparison-shop. They send their family. They leave the reviews that say "Dr. [Name] actually cares." Educational content is the most powerful loyalty tool a clinic has — and almost no clinic uses it.',
      color: '#0ea5e9',
      icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
    },
    {
      title: 'Patient Feedback — Know Before Google Does',
      description: 'After every visit, AUMY asks patients how they felt — structured feedback that reaches you before it reaches a public review. You find out what patients love, what surprised them, and what could be better — and you act on it. The clinic that listens and improves is the clinic patients stay loyal to. Closing the feedback loop is also what turns a 4-star clinic into a 4.9-star clinic over time.',
      color: '#ec4899',
      icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V20.25a.75.75 0 001.035.69l4.5-2.25a.75.75 0 00.465-.69v-1.861a48.61 48.61 0 002.993-.349',
    },
    {
      title: 'Meta CAPI Ad Optimization',
      description: 'Optional, for clinics that advertise. Server-side conversion tracking that lowers cost per lead and floods the top of your funnel with people who actually book — while staying privacy-safe.',
      color: '#3b82f6',
      icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    },
    {
      title: 'Conversion Attribution',
      description: 'Know exactly which channel, campaign, and conversation produced each booking and every unit of revenue — so you double down on what works and cut what does not.',
      color: '#06b6d4',
      icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    },
    {
      title: 'Operator Inbox (Human-in-the-Loop)',
      description: 'AUMY handles the routine; your team sees only what needs a human — escalations, edge cases, approvals — in one prioritized queue. More revenue, no extra headcount.',
      color: '#a855f7',
      icon: 'M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z',
    },
    {
      title: 'ROI Dashboards',
      description: 'A clinic owner’s view of attributed revenue, cost per lead, patients booked, and lifetime value — the clear answer to "what is my clinic actually returning?"',
      color: '#a78bfa',
      icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605',
    },
  ];

  // SPIN grouping: each capability maps to a specific leak it plugs, so the section
  // reads as "problems solved", not a flat 14-feature dump. Titles must match `capabilities`.
  const capabilityGroups = [
    {
      bucket: 'Capture',
      problem: 'Stop losing the patients already trying to reach you',
      titles: ['AI Receptionist — Always On', 'Lead Capture from Every Channel', 'Cold Lead Retry'],
    },
    {
      bucket: 'Keep',
      problem: 'Keep the appointments and treatments you have already won',
      titles: ['No-Show Prevention & Rebooking', 'Treatment-Plan Conversion'],
    },
    {
      bucket: 'Win Back',
      problem: 'Win back the patients you already paid to acquire',
      titles: ['AI Recall & Reactivation — Personalised, Not Generic'],
    },
    {
      bucket: 'Loyalty',
      problem: 'Become the clinic they never want to leave',
      titles: [
        'Emotional Patient Communication — Not Templates',
        'Educational Content — Your Voice, Your Name',
        'Patient Feedback — Know Before Google Does',
        'Google Reviews & Local SEO',
      ],
    },
    {
      bucket: 'Prove & Control',
      problem: 'See every rupee — and run the whole engine',
      titles: ['Meta CAPI Ad Optimization', 'Conversion Attribution', 'Operator Inbox (Human-in-the-Loop)', 'ROI Dashboards'],
    },
  ];

  const howItHappens = [
    {
      tag: 'Capture',
      title: 'Every lead, every channel — caught and booked',
      text: 'Most clinics lose patients in the gap between "they enquired" and "someone called back." Instagram DMs, WhatsApp messages, missed calls, walk-ins, referrals, Google, paid ads — AUMY answers the instant any of them arrives, qualifies, checks availability, and books the slot. Day or night, with no one sitting by the phone. And the leads who don’t reply right away aren’t written off: AUMY retries them with a polite, well-timed sequence until they book or opt out. The front desk stops being the bottleneck, and leads that would have gone cold become appointments on the calendar.',
    },
    {
      tag: 'No-shows',
      title: 'Booked slots become kept appointments',
      text: 'A booking you never keep is worse than no booking — it blocks a chair and earns nothing. AUMY sends timed reminders and confirmations on WhatsApp, lets patients reschedule in a tap, and when someone still misses, automatically reaches out to rebook them into the next open slot. Each recovered no-show is revenue you had already sold, now actually collected — one of the fastest wins a clinic sees.',
    },
    {
      tag: 'Reactivation',
      title: 'Dormant patients become revenue you already paid for',
      text: 'Every clinic is sitting on a list of patients who drifted away. Most clinics send the same "We miss you!" message to all of them. AUMY does not. It reads each patient\'s last treatment record and sends something that proves the clinic actually remembers them. A patient who had a root canal 14 months ago receives: "Hi [Name], you had your root canal with Dr. [Name] last year — just checking in to see how everything is feeling. Also wanted to remind you that as discussed, a cleaning session every 6 months is really important to protect your gum health and the work done. Would love to see you back soon." That patient does not feel like a number on a reactivation list. They feel remembered. That is what brings them back.',
    },
    {
      tag: 'Premium experience',
      title: 'The relationship that makes your clinic the obvious choice',
      text: 'Most clinics disappear the moment a patient walks out the door. AUMY keeps your clinic present in their lives — biweekly health education in your name, sophisticated post-treatment check-ins, structured feedback that reaches you before it reaches Google, and well-timed review prompts that build your reputation one genuine 5-star at a time. Patients who feel cared for between visits do not compare prices. They do not try another clinic when something comes up. They send their family. This is the difference between a clinic patients visit and a clinic patients belong to.',
    },
    {
      tag: 'Treatment value',
      title: 'More proposed treatments actually get done',
      text: 'The quietest leak in any clinic is the treatment plan that was presented and never scheduled. AUMY follows up on unscheduled and declined plans, answers hesitations, and nudges patients to book — so treatment acceptance rises and the revenue that was already on the table finally lands.',
    },
    {
      tag: 'Paid growth · optional',
      title: 'If you advertise, your budget works harder',
      text: 'Running Meta or Instagram ads? AUMY closes the loop: the moment a lead books or pays, that conversion is sent server-side to Meta via CAPI. Meta then optimizes for real bookings, builds lookalike audiences from your actual patients, and stops wasting budget on tyre-kickers — so cost per genuine lead keeps falling. And if you don’t run ads at all, every other engine above still recovers revenue from the patients and leads you already have.',
    },
    {
      tag: 'Proof',
      title: 'Attribution + ROI dashboards show exactly what pays',
      text: 'AUMY traces every booking and every unit of revenue back to the channel, campaign, and conversation that produced it, then rolls it up into a clinic-owner dashboard: attributed revenue, cost per lead, patients booked, lifetime value. You stop guessing and start reallocating effort to what genuinely returns.',
    },
  ];

  const roiTiles = [
    { value: 'Attributed', label: 'Revenue traced to each channel & conversation' },
    { value: 'Cost / Lead', label: 'What you actually pay for a genuine lead' },
    { value: 'Patients Booked', label: 'Bookings from automation vs. manual effort' },
    { value: 'Lifetime Value', label: 'Repeat revenue per acquired patient' },
  ];

  // Real partner clinics. Quotes are working drafts — swap for the clinic's
  // exact words once confirmed. Set logo/portrait paths when the images land in
  // /public/clients; until then a monogram + wordmark renders cleanly.
  const testimonials = [
    {
      name: 'Vinaykia Dental Care',
      label: 'Real Result · Partner Clinic',
      logo: '/clients/vinaykia-dental-logo.jpeg',
      portrait: '/clients/vinaykia-dentist.jpeg',
      initials: 'VD',
      quote: `“AUM AI brought us a steady stream of new patients, woke up our dormant list, and kept our regulars coming back. Our revenue grew about 25% in just two months — and we didn’t hire a single extra person to make it happen.”`,
      chips: [
        { value: '+25%', label: 'Revenue in 2 months' },
        { value: '80+', label: 'New patient leads' },
        { value: '50+', label: 'Dormant reactivated' },
        { value: '90%', label: 'Patients retained' },
      ],
    },
    {
      name: 'Vinayaka Derma',
      label: 'Real Result · Partner Clinic',
      logo: null, // TODO: drop /clients/vinayaka-derma-logo.jpeg and set this
      portrait: null, // TODO: drop /clients/vinayaka-derma-doctor.jpeg and set this
      initials: 'VD',
      quote: `“AUMY quietly went to work on the patients we already had — waking up our dormant list, sending recall reminders right on time, and following up after every appointment. Patients feel genuinely looked after, our Google reviews keep climbing, and we’re earning more from the same chairs without anyone chasing follow-ups by hand.”`,
      chips: [
        { value: '60+', label: 'Dormant reactivated' },
        { value: '300+', label: 'Recalls sent' },
        { value: '100%', label: 'Post-visit follow-ups' },
        { value: '4.9★', label: 'Google rating' },
      ],
    },
  ];

  // Our engagement model — audit-first, prove ROI before any commitment, then a
  // fully-managed 30-day pilot. The risk-reversal that gets clinics to say yes.
  const workingModel = [
    { number: '01', title: 'We audit your data', text: 'We take your patient history straight from your existing software — or even your handwritten registers and appointment books — and clean, structure, and digitise it for you. No IT project, no data entry on your side, no disruption to your front desk.' },
    { number: '02', title: 'We show you the money first', text: 'Before you commit to anything, we show you exactly how much revenue is sitting unrecovered in your own data — dormant patients, overdue recalls, no-shows, and unbooked treatment plans — quantified and laid out month by month. You see the opportunity in real rupees, on your real numbers.' },
    { number: '03', title: 'We run a 30-day pilot', text: 'We switch AUMY on for your clinic for 30 days and run it end to end — booking, reminders, recalls, reactivation, reviews — fully managed by us. Real messages, real patients, real bookings on your calendar, with the recovered revenue tracked live on your dashboard.' },
    { number: '04', title: 'You continue only if it pays', text: 'At the end of the 30 days you see the actual, attributed results. If AUMY paid for itself — and it usually does many times over — you continue. If it didn’t, you walk away. No lock-in, no long contract, no risk.' },
  ];

  // Optional light-clinical add-ons. Kept deliberately small + last so they
  // never dilute the revenue-generation story, which is the point of the page.
  const clinicalBonus = [
    { title: 'Telehealth', text: 'Run secure video consults right inside AUMY — no separate tool to set up or pay for.', icon: 'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z' },
    { title: 'Auto Documentation', text: 'AUMY listens and writes the clinical note for you — accurate, structured, saved to the record. Doctors stop typing and get their time back.', icon: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z' },
    { title: 'Billing & Invoicing', text: 'Invoices, payments, and receipts in the same app — one source of truth, no extra billing software.', icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z' },
  ];

  // Security & Compliance trust cards. Copy is accuracy-checked against
  // PROJECT_INFO.md — only built capabilities are claimed. Lock/shield Heroicons.
  const trustCards = [
    { title: 'Patient Data Isolation', color: '#10b981', description: "Every clinic's data lives in a fully isolated tenant — Row-Level Security at the database layer. One clinic can never see another's records.", icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z' },
    { title: 'End-to-End Encryption', color: '#3b82f6', description: 'All data encrypted at rest (AES-256, AWS KMS) and in transit (TLS 1.3). Patient records never travel unprotected.', icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' },
    { title: 'Complete Audit Trail', color: '#8b5cf6', description: 'Every record access, edit, and deletion is logged in an append-only audit trail. Nothing is silently changed or deleted.', icon: 'M10.125 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12' },
    { title: 'ABDM & ABHA Ready', color: '#06b6d4', description: "FHIR R4-native data model with ABHA linking and consent manager built in. Ready for India's Ayushman Bharat Digital Mission from day one.", icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244' },
    { title: 'DPDP Act 2023 Aligned', color: '#f59e0b', description: "Patient consent, data access logs, and right-to-erasure workflows are part of the platform — not an afterthought. Built for India's Digital Personal Data Protection Act.", icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' },
    { title: 'Granular Access Control', color: '#f43f5e', description: 'Role-based permissions down to individual actions (40+ permission types). Receptionists, doctors, and admins each see only what they should.', icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z' },
  ];

  return (
    <div className="aumy-page rev-page">
      {/* Hero */}
      <section className="aumy-hero">
        <div className="aumy-hero-bg">
          <div className="aumy-orb aumy-orb-1"></div>
          <div className="aumy-orb aumy-orb-2"></div>
          <div className="aumy-orb aumy-orb-3"></div>
          <div className="aumy-grid"></div>
        </div>

        <div className="container">
          <div className="aumy-hero-content">
            <div className="aumy-hero-badge">
              <span className="aumy-badge-dot"></span>
              AUM AI · The Clinic Your Patients Choose, Return to, and Recommend
            </div>

            <h1 className="aumy-hero-title">
              Every clinic in your area delivers good care.
              <br />
              Only one is the clinic patients call first, return to, and{' '}
              <span className="aumy-gradient">never stop recommending</span>.
            </h1>

            <p className="aumy-hero-subtitle">
              The difference is not the treatment — every good clinic delivers that. It is what happens in the
              silence between visits: the follow-up that never went out, the enquiry no one called back, the
              patient who quietly drifted to another clinic. That silence is where your revenue leaks — and
              where loyalty is won or lost. AUMY closes every one of those gaps automatically, so the patients
              you have already earned actually stay, return, and recommend you.
            </p>

            <div className="aumy-hero-cta">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request a Demo
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a href="#revenue-engine" className="btn btn-secondary btn-lg">
                See How It Works
              </a>
            </div>

            <p className="rev-footnote" style={{ marginTop: '1rem' }}>
              Agency, voice-AI, or revenue-recovery operator?{' '}
              <Link to="/platform-partner" className="aumy-gradient" style={{ fontWeight: 600 }}>
                Run AUMY under your own brand, exclusive to your territory →
              </Link>
            </p>

            <div className="aumy-hero-stats">
              {heroStats.map((s, i) => (
                <div key={i} className="aumy-hero-stat">
                  <span className="aumy-stat-value">{s.value}</span>
                  <span className="aumy-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="rev-footnote">
              * Illustrative; results vary by clinic, market, and spend. &nbsp;† Real result from a partner clinic — see the case study below.
            </p>
          </div>
        </div>
      </section>

      {/* The hidden leak — cost of the problem, in ROI terms */}
      <section className="section aumy-caps-section rev-leak-section" id="leak">
        <div className="container">
          <div className="section-header">
            <span className="section-label rev-leak-label-pill">The Hidden Leak</span>
            <h2 className="section-title">Where your clinic loses money today</h2>
            <p className="section-subtitle">
              Most clinics don’t have a traffic problem — they have a follow-through problem. Revenue you have
              already earned slips out through four quiet gaps, month after month:
            </p>
          </div>

          <div className="rev-leak-card">
            <div className="rev-leak-rows">
              {revenueLeaks.map((leak, i) => (
                <div key={i} className="rev-leak-row">
                  <div className="rev-leak-row-main">
                    <span className="rev-leak-row-label">{leak.label}</span>
                    <span className="rev-leak-row-note">{leak.note}</span>
                  </div>
                  <span className="rev-leak-row-range">
                    {leak.range}
                    <span className="rev-leak-row-permo">/mo</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="rev-leak-total">
              <div className="rev-leak-total-text">
                <span className="rev-leak-total-headline">Roughly 20–40% of monthly revenue</span>
                <span className="rev-leak-total-sub">
                  ≈ ₹1.5–3L every month for a clinic billing ~₹8L — and almost all of it is recoverable.
                </span>
              </div>
              <Link to="/contact" className="btn btn-primary rev-leak-cta">
                Recover it
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Let the visitor compute their OWN number — the strongest implication */}
          <div className="rev-calc">
            <p className="rev-calc-title">Now run it on your clinic</p>
            <p className="rev-calc-sub">
              Two numbers you already know. We keep the recovery estimate deliberately conservative — your real
              figure is almost always higher.
            </p>
            <div className="rev-calc-inputs">
              <div className="rev-calc-field">
                <label htmlFor="calc-ppw">Patients you see per week</label>
                <input
                  id="calc-ppw"
                  type="number"
                  min="0"
                  value={ppw}
                  onChange={(e) => setPpw(Math.max(0, parseInt(e.target.value, 10) || 0))}
                />
              </div>
              <div className="rev-calc-field">
                <label htmlFor="calc-ticket">Average value per patient (₹)</label>
                <input
                  id="calc-ticket"
                  type="number"
                  min="0"
                  value={ticket}
                  onChange={(e) => setTicket(Math.max(0, parseInt(e.target.value, 10) || 0))}
                />
              </div>
            </div>
            <div className="rev-calc-output">
              <div className="rev-calc-output-main">
                <span className="rev-calc-output-value">{fmt(leakLow)} – {fmt(leakHigh)} / month</span>
                <span className="rev-calc-output-sub">
                  sitting unrecovered in patients you have already earned — roughly {fmt(leakLowYear)} – {fmt(leakHighYear)} a
                  year. Even if you win back just half, that is about {fmt(recoverHalf)} a year.
                </span>
              </div>
              <Link to="/contact" className="btn btn-primary rev-leak-cta">
                See it on my real data
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <p className="rev-footnote">
            * Illustrative ranges for a mid-sized clinic; your real figures depend on specialty, location,
            patient volume, and average ticket size. The four gaps overlap and rarely peak at once — we size
            your actual number with you on a demo, using your own data.
          </p>
        </div>
      </section>

      {/* Premium Clinic — Identity / Emotional section */}
      <section className="section aumy-demo-section" id="premium-clinic">
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Premium Clinic</span>
            <h2 className="section-title">Revenue is what your business earns. Loyalty is what your clinic builds.</h2>
            <p className="section-subtitle">
              Patients choose a clinic for the first visit. They return — and refer — because of how they felt
              between visits. The most trusted clinics in any city are not the ones with the biggest ad budgets.
              They are the ones that show up in their patients' lives with education, care, and consistency.
            </p>
          </div>

          <div className="aumy-demo-steps">
            <div className="aumy-demo-step">
              <span className="aumy-demo-number" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>✦</span>
              <h3>You become the health authority in their life</h3>
              <p>Biweekly health tips, care reminders, and treatment guides — sent in your name, not a brand's. The clinic that educates is the clinic patients trust. Trust converts to loyalty faster than any discount ever will.</p>
            </div>
            <div className="aumy-demo-step">
              <span className="aumy-demo-number" style={{ background: 'linear-gradient(135deg, #10b981, #0ea5e9)' }}>✦</span>
              <h3>Sophisticated communication — not generic blasts</h3>
              <p>Post-treatment follow-ups that feel personal. Check-ins that show patients you are thinking about them. Every message reflects your standard of care — not a template. The patients who feel remembered between visits are the ones who never quietly leave for a competitor.</p>
            </div>
            <div className="aumy-demo-step">
              <span className="aumy-demo-number" style={{ background: 'linear-gradient(135deg, #ec4899, #f59e0b)' }}>✦</span>
              <h3>You know what patients feel — before Google does</h3>
              <p>Structured feedback after every visit reaches you first. You find out what patients love, what surprised them, and what to improve — and you act on it. The clinic that listens and responds is the clinic that earns 4.9 stars and keeps them.</p>
            </div>
            <div className="aumy-demo-step">
              <span className="aumy-demo-number" style={{ background: 'linear-gradient(135deg, #f43f5e, #8b5cf6)' }}>✦</span>
              <h3>Your Google presence reflects your actual standard</h3>
              <p>Automated review prompts go out at the right moment — after a great visit, when the patient is most likely to share how they felt. Happy patients leave honest 5-star reviews. Your Google profile climbs. New patients choose you before they have even called — because of what your existing patients said.</p>
            </div>
          </div>
        </div>
      </section>

      {/* You Cannot Fake Care — the emotional intelligence section */}
      <section className="section aumy-demo-section" id="care">
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Moment That Changes Everything</span>
            <h2 className="section-title">You cannot fake care. But you can make it scale.</h2>
            <p className="section-subtitle">
              Two days after fixing a patient's dental cap — has your clinic ever messaged them and asked:
              <br /><br />
              <em style={{ color: 'var(--text-primary)', fontStyle: 'italic', fontSize: '1.1rem' }}>
                "Hey, how are you doing? Are you able to eat comfortably? Any sensitivity?"
              </em>
              <br /><br />
              Take a moment and imagine what that patient feels when they receive that message.
              Not a reminder. Not a promotion. Not "book your next appointment."
              Just — <strong>we were thinking about you.</strong>
              <br /><br />
              That patient does not just come back. They bring their family. They leave a review that says
              "this clinic actually cares." They never once Google "clinic near me" again — because the answer
              is already in their heart.
            </p>
          </div>

          <div className="aumy-demo-steps">
            <div className="aumy-demo-step">
              <span className="aumy-demo-number">01</span>
              <h3>Almost no clinic does this — and that is the entire opportunity</h3>
              <p>Most doctors know this kind of care builds loyalty. Almost none do it consistently — because it does not scale. You cannot personally follow up with 200 patients every week. So clinics gave up and turned to automation. The same WhatsApp template sent to everyone. "Dear Patient, your appointment is due." Patients feel it immediately. They know. The moment something feels automated, the emotional value drops to zero.</p>
            </div>
            <div className="aumy-demo-step">
              <span className="aumy-demo-number">02</span>
              <h3>AUMY is not a chatbot. It is emotional intelligence at scale.</h3>
              <p>AUMY reads each patient's history — their treatment, their last visit, how long since they came in — and sends something that feels like it came from their doctor personally. The two-day check-in after a cap. The biweekly health tip that feels written for them. The feedback message that says their experience matters. Not because it was scheduled. Because the timing was right for that patient, and that patient only.</p>
            </div>
            <div className="aumy-demo-step">
              <span className="aumy-demo-number">03</span>
              <h3>The clinics that do this are not building a patient list. They are building a tribe.</h3>
              <p>A cohort of people who belong to them for life. Who send their parents, their colleagues, their friends — not because of a referral programme, but because of how the clinic made them feel. These clinics are not the ones with the best equipment or the best location. They are the ones that showed up when they had nothing to gain from it.</p>
            </div>
            <div className="aumy-demo-step">
              <span className="aumy-demo-number">04</span>
              <h3>The revenue? That is just the side effect.</h3>
              <p>When patients feel genuinely cared for, they return more often, accept more treatments, refer more people, and leave more reviews. Not because you pushed them to. Because they wanted to. The clinics that lead with care do not chase revenue — revenue follows them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Engine flow */}
      <section className="section aumy-demo-section" id="revenue-engine">
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Revenue Engine</span>
            <h2 className="section-title">From a first enquiry to a patient for life — automatically.</h2>
            <p className="section-subtitle">
              Four moves, fully automated. Each one plugs a hole where clinics quietly lose money today —
              whatever channel the patient came from, and whether or not you spend anything on ads.
            </p>
          </div>

          <div className="aumy-demo-steps">
            {engineSteps.map((step, i) => (
              <div key={i} className="aumy-demo-step">
                <span className="aumy-demo-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section aumy-caps-section" id="capabilities">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How Every Leak Gets Plugged</span>
            <h2 className="section-title">Not a feature list — a fix for each way clinics lose money.</h2>
            <p className="section-subtitle">
              Every capability maps to a specific gap: the patients who can’t reach you, the appointments that
              slip, the patients who drift away, and the loyalty that’s never built — plus the dashboard that
              proves what each one returns.
            </p>
          </div>

          {capabilityGroups.map((group, gi) => (
            <div key={gi} className="rev-cap-group">
              <div className="rev-cap-group-head">
                <span className="rev-cap-group-tag">{group.bucket}</span>
                <h3 className="rev-cap-group-problem">{group.problem}</h3>
              </div>
              <div className="aumy-caps-grid">
                {capabilities
                  .filter((cap) => group.titles.includes(cap.title))
                  .map((cap, i) => (
                    <div key={i} className="aumy-cap-card" style={{ '--cap-color': cap.color }}>
                      <div className="aumy-cap-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d={cap.icon} />
                        </svg>
                      </div>
                      <h3>{cap.title}</h3>
                      <p>{cap.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it happens */}
      <section className="section aumy-demo-section" id="how">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How It Actually Happens</span>
            <h2 className="section-title">The mechanism behind every booking — in plain business terms.</h2>
          </div>

          <div className="rev-how-list">
            {howItHappens.map((item, i) => (
              <div key={i} className="rev-how-item">
                <div className="rev-how-index">
                  <span className="rev-how-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="rev-how-tag">{item.tag}</span>
                </div>
                <div className="rev-how-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meta CAPI deep-dive — optional accelerant for clinics that advertise */}
      <section className="section aumy-caps-section" id="capi">
        <div className="container">
          <div className="section-header">
            <span className="section-label">If You Advertise · Meta Conversion API (CAPI)</span>
            <h2 className="section-title">Running ads? Make every ad spend buy a patient, not a click.</h2>
            <p className="section-subtitle">
              Optional, and powerful. If you run Meta or Instagram ads, CAPI tells Meta who actually became a
              patient — so your budget stops chasing curiosity and starts buying revenue. No ad budget? Skip
              this part — every other engine on this page still recovers revenue from the patients and leads
              you already have.
            </p>
          </div>

          <div className="aumy-demo-steps rev-capi-steps">
            {capiSteps.map((step, i) => (
              <div key={i} className="aumy-demo-step">
                <span className="aumy-demo-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>

          <div className="aumy-demo-callout">
            <div className="aumy-demo-callout-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
              </svg>
            </div>
            <div className="aumy-demo-callout-body">
              <strong>Lower cost per lead. More genuine leads. Patients who stay for life.</strong>
              <p>
                Because Meta is optimizing for real bookings instead of clicks, your cost per genuine lead falls
                and the leads that do arrive are far more likely to convert. AUMY then captures, books, and retains
                them — so the savings on acquisition compound into lifetime revenue, not a one-off discount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI dashboard / proof */}
      <section className="section aumy-caps-section" id="roi">
        <div className="container">
          <div className="section-header">
            <span className="section-label">You See the Return</span>
            <h2 className="section-title">A dashboard that answers: what is my clinic actually returning?</h2>
            <p className="section-subtitle">
              Every clinic owner asks it. AUMY answers it on one screen — and updates it in real time.
            </p>
          </div>

          <div className="aumy-hero-stats rev-roi-tiles">
            {roiTiles.map((t, i) => (
              <div key={i} className="aumy-hero-stat">
                <span className="aumy-stat-value">{t.value}</span>
                <span className="aumy-stat-label">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product showcase — real aggregate dashboards (no patient data). */}
      <section className="section aumy-caps-section" id="showcase">
        <div className="container">
          <div className="section-header">
            <span className="section-label">See It In Action</span>
            <h2 className="section-title">Your revenue, on one screen — in real time.</h2>
            <p className="section-subtitle">
              The same dashboards your clinic gets. The recoverable-revenue preview shows the money sitting
              in your data before you commit; the automation console runs every capability end to end.
            </p>
          </div>

          <figure className="rev-shot rev-shot-wide">
            <div className="rev-shot-frame">
              <div className="rev-shot-bar"><span></span><span></span><span></span></div>
              <img src="/screenshots/dashboard.png" alt="AUMY clinic dashboard — revenue attributed, patients booked, surfaced and replied, open operator tasks, hours saved, and per-capability performance, all on one screen" loading="lazy" />
            </div>
            <figcaption>Your clinic dashboard — every automation outcome and the revenue it drives, on one screen</figcaption>
          </figure>

          <div className="rev-showcase-grid">
            <figure className="rev-shot">
              <div className="rev-shot-frame">
                <div className="rev-shot-bar"><span></span><span></span><span></span></div>
                <img src="/screenshots/roi-preview.png" alt="AUMY recoverable-revenue preview — dormant patients, recalls due, and projected revenue over the next 90 days" loading="lazy" />
              </div>
              <figcaption>Recoverable-revenue preview — what your patients are worth, before you commit</figcaption>
            </figure>
            <figure className="rev-shot">
              <div className="rev-shot-frame">
                <div className="rev-shot-bar"><span></span><span></span><span></span></div>
                <img src="/screenshots/automation.png" alt="AUMY automation console — AI receptionist, reminders, lead nurture, recalls, all configurable per clinic" loading="lazy" />
              </div>
              <figcaption>Automation console — every capability, on or off, in your control</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Security & Compliance — the trust answer a healthcare buyer needs */}
      <section className="section aumy-caps-section" id="compliance">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Security &amp; Compliance</span>
            <h2 className="section-title">Your patients&rsquo; data is safe. Your clinic is covered.</h2>
            <p className="section-subtitle">
              Built on healthcare-grade infrastructure from the ground up — not retrofitted.
            </p>
          </div>

          <div className="aumy-caps-grid">
            {trustCards.map((c, i) => (
              <div key={i} className="aumy-cap-card" style={{ '--cap-color': c.color }}>
                <div className="aumy-cap-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={c.icon} />
                  </svg>
                </div>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
              </div>
            ))}
          </div>

          <p className="rev-footnote" style={{ marginTop: '1.5rem' }}>
            AUMY is designed for ABDM and DPDP Act 2023 compliance. Healthcare providers are
            responsible for their own regulatory obligations. Consult your compliance team for
            jurisdiction-specific requirements.
          </p>
          <p className="rev-footnote" style={{ marginTop: '0.5rem' }}>
            <Link to="/compliance" className="aumy-gradient" style={{ fontWeight: 600 }}>
              Read the full security &amp; compliance overview →
            </Link>
          </p>
        </div>
      </section>

      {/* Client testimonials / case studies (real, attributed) */}
      <section className="section aumy-cta-section" id="testimonial">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Real Results · Partner Clinics</span>
            <h2 className="section-title">Clinics are earning more from the patients they already have.</h2>
          </div>

          <div className="rev-testimonials">
            {testimonials.map((t, i) => (
              <div key={i} className="rev-testimonial">
                <div className="rev-testimonial-head">
                  <span className="section-label">{t.label}</span>
                  {t.logo ? (
                    <div className="rev-client-logo">
                      <img src={t.logo} alt={t.name} />
                    </div>
                  ) : (
                    <div className="rev-client-logo rev-client-logo-text">{t.name}</div>
                  )}
                </div>

                <div className="rev-testimonial-body">
                  {t.portrait ? (
                    <img className="rev-portrait" src={t.portrait} alt={`${t.name} — lead clinician`} />
                  ) : (
                    <div className="rev-portrait rev-portrait-fallback" aria-hidden="true">{t.initials}</div>
                  )}
                  <blockquote className="rev-quote">
                    {t.quote}
                    <cite className="rev-cite">— {t.name}</cite>
                  </blockquote>
                </div>

                <div className="rev-metric-chips">
                  {t.chips.map((c, j) => (
                    <div key={j} className="rev-chip">
                      <span className="rev-chip-value">{c.value}</span>
                      <span className="rev-chip-label">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work — audit-first, prove ROI, fully-managed risk-free 30-day pilot. */}
      <section className="section aumy-demo-section" id="how-we-work">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How We Work · Risk-Free</span>
            <h2 className="section-title">We prove the revenue before you commit a rupee.</h2>
            <p className="section-subtitle">
              No big software purchase, no leap of faith. We audit your data, show you the money you’re
              losing today, then prove it with a fully-managed 30-day pilot. You only continue if it pays.
            </p>
          </div>

          <div className="aumy-demo-steps">
            {workingModel.map((step, i) => (
              <div key={i} className="aumy-demo-step">
                <span className="aumy-demo-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>

          <div className="aumy-demo-callout">
            <div className="aumy-demo-callout-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="aumy-demo-callout-body">
              <strong>We carry the risk, not you.</strong>
              <p>
                You bring your patient list and your goals. We do the data audit, build the business case
                in your own numbers, and run the pilot end to end. The only thing you decide at day 30 is
                whether the results are worth continuing — and by then you’ve already watched the bookings land.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus: light clinical, for clinics that want one system. Kept small and
          last on purpose so it never competes with the revenue story above. */}
      <section className="section aumy-demo-section rev-bonus-section" id="bonus-clinical">
        <div className="container">
          <div className="rev-bonus">
            <div className="rev-bonus-head">
              <span className="section-label rev-bonus-pill">Bonus · One System</span>
              <span className="rev-bonus-note">
                Optional and opt-in. Prefer to run your whole clinic in one app? AUMY includes a light
                clinical layer too — so you are not stitching five tools together.
              </span>
            </div>
            <div className="rev-bonus-grid">
              {clinicalBonus.map((b, i) => (
                <div key={i} className="rev-bonus-item">
                  <div className="rev-bonus-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d={b.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4>{b.title}</h4>
                    <p>{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compact partner strip — full pitch lives on /platform-partner */}
      <section className="section aumy-caps-section" id="partner">
        <div className="container">
          <div className="aumy-demo-callout">
            <div className="aumy-demo-callout-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z" />
              </svg>
            </div>
            <div className="aumy-demo-callout-body">
              <strong>Are you an agency, voice-AI, or revenue-recovery operator?</strong>
              <p>
                Run AUMY as your own white-labelled platform — exclusive to your territory, on a simple flat
                rental per clinic. You sign and serve the clinics; we power everything behind the scenes.
              </p>
              <Link to="/platform-partner" className="btn btn-primary btn-lg" style={{ marginTop: '1rem' }}>
                Explore the Platform Partner Program
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section aumy-cta-section">
        <div className="container">
          <div className="aumy-cta-card">
            <h2>Be the clinic patients choose — and never want to leave</h2>
            <p>
              Bring your patient list and your goals. We will show you, on your real numbers, exactly how much
              revenue is sitting unrecovered in your own data — and how AUMY builds the patient relationship
              that turns a one-time visit into years of loyalty, referrals, and a reputation that no ad budget
              can buy.
            </p>
            <div className="aumy-cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Request a Demo
              </Link>
              <Link to="/aumy" className="btn btn-secondary btn-lg">
                Explore the Platform
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AumyRevenueGenerator;
