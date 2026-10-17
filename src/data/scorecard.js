// The 4C Scorecard (masterclass self-audit, 2026-10-17). 8 systems × 5 statements,
// answered Always (2) / Sometimes (1) / Never or don't know (0): each system scores
// 0–10, the clinic's score is the average. The server (aumai-site-backend
// lib/scorecard.js) re-scores the same way and must keep the same system order.

export const OPTIONS = [
  { label: 'Always', value: 2 },
  { label: 'Sometimes', value: 1 },
  { label: 'Never / don’t know', value: 0 },
];

export const BANDS = [
  { key: 'tight', min: 9, label: 'Running tight', text: 'Your systems already keep the chairs full. Keep them running, and measure them every month.' },
  { key: 'better', min: 5, label: 'Can do better', text: 'Good foundations, but patients slip through. Fix your two lowest systems first.' },
  { key: 'leak', min: 0, label: 'Leaking patients', text: 'You are losing patients you have already paid to get. Start with your weakest system this week.' },
];

export const bandFor = (avg) => BANDS.find((b) => avg >= b.min) || BANDS[BANDS.length - 1];

export const SYSTEMS = [
  {
    c: 'Convert', name: 'The Decision Path', sub: 'Enquiries become bookings',
    fix: 'Reply to every enquiry within 5 minutes, and follow up a quiet implant or aligner enquiry four times over 2–4 weeks, each message adding something useful.',
    q: [
      'Every WhatsApp and Instagram enquiry gets a reply within 5 minutes, evenings and Sundays included.',
      'When a patient asks “what does an implant cost?”, we answer with a range and what’s included, not only “come in for a consultation”.',
      'An implant, aligner or smile-makeover enquiry that goes quiet is followed up at least four times over 2 to 4 weeks.',
      'Each follow-up adds something useful (a video, a case, an answer to a fear), never just “book now”.',
      'We know how many of last month’s enquiries booked.',
    ],
  },
  {
    c: 'Convert', name: 'Every Call Answered', sub: 'No caller goes to the next clinic',
    fix: 'For one week, count every missed call. Then make sure every missed caller gets a WhatsApp message within 5 minutes and a call back the same day.',
    q: [
      'We know how many calls we missed yesterday.',
      'Calls are answered at lunch, when the desk is busy, and after closing time.',
      'Every missed call gets a WhatsApp message within 5 minutes.',
      'Every call ends with a note: who called, what they wanted, what we promised.',
      'Every missed caller is called back the same day.',
    ],
  },
  {
    c: 'Confirm', name: 'Confirm Twice, Remind Once', sub: 'Bookings become patients in the chair',
    fix: 'Ask every patient to confirm at 9:30 am the day before, nudge only those who haven’t replied at 1 pm, and send one reminder with the map two hours before.',
    q: [
      'Every patient gets a message the day before asking them to reply to confirm.',
      'Patients who don’t reply get a second, shorter nudge the same day.',
      'On the day, every patient gets a reminder with the clinic’s map link.',
      'A “can’t come” the day before goes straight back into the diary and gets refilled.',
      'We know our no-show rate for last month.',
    ],
  },
  {
    c: 'Confirm', name: 'Same-Week Rebook', sub: 'A missed visit is rebooked, not forgotten',
    fix: 'Message every no-show and cancellation kindly the same day, offer two specific slots within two days, then move them to the desk’s call list after a week.',
    q: [
      'A patient who misses an appointment hears from us the same day, kindly.',
      'We offer two specific slots, not “let us know when you’re free”.',
      'A cancellation gets the same follow-up as a no-show.',
      'After a week with no reply, the patient goes on the desk’s call list.',
      'We know how many missed patients rebooked within 30 days.',
    ],
  },
  {
    c: 'Care', name: 'Advised to Accepted', sub: 'Advised treatment gets started',
    fix: 'Within a week of “I’ll think about it”, send the doctor’s advice in writing with the cost, and answer the real worry: cost, fear or time.',
    q: [
      'Every advised treatment is recorded with the patient, the doctor and the cost.',
      'Within a week of “I’ll think about it”, the patient gets the doctor’s advice again in writing, with the cost.',
      'We find and answer the real reason they’re waiting: cost, fear or time.',
      'When cost is the worry, we offer a payment plan or a staged treatment plan.',
      'Every month we review the list of patients advised a treatment who haven’t started.',
    ],
  },
  {
    c: 'Care', name: 'Finish Line', sub: 'Started treatment gets finished',
    fix: 'List every root canal without a crown and every half-finished treatment, and send each patient “your crown is the last step” with two slots.',
    q: [
      'Every root canal patient is reminded about the crown until it’s fitted.',
      'We can list every patient with a treatment started but not finished: crown pending, implant awaiting its crown, aligners stopped.',
      'The reminder names the next step and why it matters (“until the crown is fitted, the tooth can crack”).',
      'If there’s no reply, someone at the desk calls.',
      'We know how many of last year’s root canals never got a crown.',
    ],
  },
  {
    c: 'Care', name: 'BIT: Be In Touch', sub: 'Every patient feels looked after',
    fix: 'The day after every extraction, root canal and implant, send a check-in in the doctor’s name, and read every reply that same day.',
    q: [
      'The day after an extraction, root canal or implant, the patient hears from us.',
      'The check-in comes in the doctor’s name, about the procedure they had.',
      'Replies are read the same day, and a problem reaches the doctor at once.',
      'The doctor sees the replies.',
      'Every patient is invited to leave a Google review after their treatment.',
    ],
  },
  {
    c: 'Come back', name: 'Smart Comebacks', sub: 'Patients return when they’re due',
    fix: 'Sort your patients by last visit and start recalls with those who used to come every six months, in small batches, each with their own reason.',
    q: [
      'We know how many patients haven’t visited in the last 12 months.',
      'Patients due a check-up or cleaning get a recall message.',
      'We start with the patients most likely to return, not the whole list at once.',
      'Each recall gives the patient their own reason: a check-up due, a treatment left unfinished.',
      'We track who came back after a recall.',
    ],
  },
];

export const C_COLORS = { Convert: 'convert', Confirm: 'confirm', Care: 'care', 'Come back': 'comeback' };
export const CALL_LINK = 'https://calendar.app.google/tecaeebTBEWSoJnV7';
