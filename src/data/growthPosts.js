/**
 * Dental Practice Growth Hub — articles.
 *
 * CommonJS on purpose: this file is the single source of truth for BOTH the
 * React app (GrowthHub / GrowthArticle pages) and the post-build Node scripts
 * (scripts/prerender.js writes a static HTML file per article for crawlers;
 * scripts/seo-files.js lists every article in sitemap.xml). Node can't
 * require() an ES module, so keep `module.exports` here — webpack handles it
 * fine on the React side.
 *
 * `body` is an HTML string rendered identically by the React article page and
 * the prerenderer — one copy of the content, no dual renderer to keep in sync.
 *
 * Content rules (docs/growth/inbound-marketing-strategy.md in the API repo):
 * written from real sales-call material, India-specific, about money and
 * patients — never "AI in dentistry". Worked examples state their assumptions
 * explicitly; no invented statistics. Every article's CTA is the free Revenue
 * Leak Audit (the component appends it — don't put "buy AUMY" in the body).
 */

const GROWTH_CATEGORIES = [
  'All',
  'Missed Calls',
  'Lead Conversion & Follow-up',
  'No-shows & Appointments',
  'Recall & Retention',
  'Patient Reactivation',
  'Marketing & ROI',
  'WhatsApp for Clinics',
];

const growthPosts = [
  // ------------------------------------------------------------------
  // 1. MISSED CALLS
  // ------------------------------------------------------------------
  {
    slug: 'dental-clinic-missed-calls-revenue-loss',
    title: 'How Much Revenue Is Your Dental Clinic Losing From Missed Calls?',
    category: 'Missed Calls',
    date: '2026-08-15',
    readingTime: '7 min read',
    author: 'Jayesh Chaudhari',
    excerpt:
      'Every missed call is a patient who was ready to talk to you at that exact moment. Here is how to put a number on what those calls cost your clinic — and a practical ladder of fixes, from free to fully automatic.',
    description:
      'A practical way for Indian dental clinic owners to calculate the revenue lost to missed and unanswered calls, why callers rarely try twice, and a step-by-step ladder of fixes — from a missed-call register to 24/7 answering.',
    body: `
<p>A missed call feels like a small thing. The phone rang, nobody could pick up, the moment passed. But think about who was on the other end: someone who had already decided to contact a dental clinic, had already chosen <em>yours</em>, and was ready to talk <em>at that exact moment</em>. That is the most valuable kind of enquiry there is — and it just evaporated.</p>

<h2>Why good clinics miss calls</h2>
<p>Missed calls are not a sign of a badly run clinic. They are a sign of a normally run clinic:</p>
<ul>
  <li><strong>Your receptionist is helping the patient in front of them.</strong> The person at the desk deserves attention; the phone loses.</li>
  <li><strong>You are chairside.</strong> In single-doctor practices, the dentist often <em>is</em> the phone-answerer — and dentistry needs both hands.</li>
  <li><strong>Lunch, evenings, Sundays.</strong> Patients search for dentists when <em>they</em> are free — which is precisely when your clinic is closed or thinly staffed.</li>
  <li><strong>Two calls at once.</strong> One line, one person. The second caller hears ringing.</li>
</ul>
<p>None of these are fixable by telling your team to "try harder." They are structural — which is also why they are so predictable, and so measurable.</p>

<h2>What the caller does next</h2>
<p>Here is the uncomfortable part. When a new patient's call goes unanswered, they very rarely leave a voicemail or patiently try again in an hour. They are looking at a Google results page or a friend's WhatsApp recommendation with four other clinics on it. The next tap takes two seconds. The clinic that answers first usually wins the patient — not the clinic with the better dentist.</p>
<blockquote>An existing patient will call you back. A <em>new</em> patient calls the next clinic on the list.</blockquote>

<h2>Put a number on it</h2>
<p>You cannot manage what you have never measured, so let's measure. The formula is simple:</p>
<div class="gh-formula">
  <span>Missed calls per month</span>
  <span class="gh-formula-op">×</span>
  <span>% that were potential new patients</span>
  <span class="gh-formula-op">×</span>
  <span>% you could have converted</span>
  <span class="gh-formula-op">×</span>
  <span>average first-treatment value</span>
  <span class="gh-formula-op">=</span>
  <span><strong>monthly revenue at risk</strong></span>
</div>
<p>A worked example — and to be clear, these are illustrative assumptions, not statistics; put in your own numbers:</p>
<ul>
  <li>Say your clinic misses <strong>30 calls a month</strong> — one a day, counting after-hours calls. Most owners who actually check their phone log find it is more.</li>
  <li>Say <strong>40%</strong> of those were potential patients (the rest are labs, salespeople, existing patients who will call back). That is 12 lost enquiries.</li>
  <li>Say you would normally convert <strong>half</strong> of the new-patient enquiries you do answer. That is 6 lost patients.</li>
  <li>Say your average first-treatment value is <strong>₹5,000</strong> — a conservative blended figure across consultations, cleanings, fillings and RCTs.</li>
</ul>
<div class="gh-box">
  <p><strong>30 × 40% × 50% × ₹5,000 = ₹30,000 a month</strong> — ₹3.6 lakh a year — before counting even one implant or aligner case, and before counting the lifetime value of the family that patient would have brought with them.</p>
</div>
<p>One implant enquiry changes the math completely. If even two of those lost callers per year were implant or full-mouth-rehab cases, you can add a few lakh to the number.</p>
<p>Don't take our example on faith — <a href="/missed-call-calculator">run your own numbers in the missed call calculator</a> (or the <a href="/leak-calculator">full 60-second leak check</a>). Both are deliberately conservative, so your real number is probably higher.</p>

<h2>How to actually check your missed calls</h2>
<p>Before fixing anything, spend one week measuring:</p>
<ol>
  <li>Open the call log on the clinic phone every evening. Count the incoming calls with no answering entry — including the ones during lunch and after closing.</li>
  <li>Mark which numbers are unknown (likely new patients) versus saved contacts.</li>
  <li>Try calling two or three of the unknown numbers back the next morning and note what happens. Most owners find the patient has "already gone somewhere, thank you."</li>
</ol>
<p>That last experience is usually what convinces a clinic owner this is real — not any calculator.</p>

<h2>The ladder of fixes — from free to fully automatic</h2>
<p>You do not have to jump straight to technology. Each rung recovers more than the last:</p>
<ol>
  <li><strong>A missed-call register (free).</strong> Every missed number gets a call-back the same day, logged in a notebook or sheet. This alone recovers a meaningful share — <em>if</em> someone actually owns the job. In most clinics it survives about two weeks, because the person responsible also has a queue of patients at the desk. Be honest with yourself about whether it will stick.</li>
  <li><strong>A missed-call WhatsApp message (cheap).</strong> The moment a call goes unanswered, the caller gets a WhatsApp message: <em>"Sorry we missed your call! This is [clinic name]. How can we help — would you like to book an appointment?"</em> This converts a dead end into a conversation, on the channel Indian patients actually prefer. The catch: someone still has to answer the replies, including the ones that arrive at 9 pm.</li>
  <li><strong>24/7 answering (automatic).</strong> Every call and message gets answered in seconds, around the clock — questions handled, appointment booked into your calendar, no human required. The after-hours and lunch-hour enquiries, which are the majority of what you are losing, stop leaking entirely.</li>
</ol>
<p>Whichever rung you choose, choose one this week. The register costs nothing but discipline — and even if it only survives a month, the data it produces will tell you exactly what the next rung is worth to you.</p>`,
  },

  // ------------------------------------------------------------------
  // 2. LEAD FOLLOW-UP SYSTEM
  // ------------------------------------------------------------------
  {
    slug: 'dental-lead-follow-up-system',
    title: 'The Dental Lead Follow-Up System: From Enquiry to Appointment',
    category: 'Lead Conversion & Follow-up',
    date: '2026-08-15',
    readingTime: '9 min read',
    author: 'Jayesh Chaudhari',
    excerpt:
      'Most dental enquiries don’t say no — they say "I’ll think about it," and then nobody ever talks to them again. Here is a complete follow-up system: response time, the first conversation, and a day-by-day sequence that helps patients decide instead of chasing them.',
    description:
      'A complete follow-up system for dental clinic enquiries in India: why response speed decides who gets the patient, what to say in the first conversation, a day 1-3-5-7-10 WhatsApp sequence for "I’ll think about it," and how to adapt it by treatment.',
    body: `
<p>Ask a clinic owner how many enquiries they got last month and you usually get a guess. Ask how many of those enquiries became booked appointments and you get silence. That gap — between "someone asked" and "someone sat in the chair" — is where more dental revenue is lost than anywhere else, and it is lost silently, because a lead that quietly disappears never complains.</p>

<h2>First: speed decides more than skill</h2>
<p>A patient who messages your clinic about implants is, in that moment, thinking about implants. Two hours later they are picking up children, cooking dinner, back in meetings. Reply within minutes and you are talking to someone whose attention you already have. Reply tomorrow and you are an interruption asking them to re-open a decision they had shelved — and quite possibly the second or third clinic to respond, because they messaged more than one.</p>
<div class="gh-box">
  <p><strong>The standard worth holding:</strong> every new enquiry — WhatsApp, Instagram, missed call, website — gets a first response in under 5 minutes during working hours, and never waits overnight. If your team cannot do that manually (most cannot, through no fault of their own), that is a system problem, not a people problem.</p>
</div>

<h2>The first conversation: qualify by helping</h2>
<p>The first reply's job is not to close an appointment by force. It is to start a real conversation. Three things belong in it:</p>
<ul>
  <li><strong>Answer what they actually asked.</strong> If they asked the price of a cleaning, give a straight answer or an honest range. Dodging the price question ("please visit for details") is the fastest way to lose an Indian WhatsApp enquiry.</li>
  <li><strong>Ask one useful question back.</strong> "Is this for you or a family member?" "Is there pain right now, or is this something you've been planning?" One question keeps the conversation alive and tells you how urgent the case is.</li>
  <li><strong>Offer a concrete next step.</strong> Not "let us know" — a real slot: "Dr. is available tomorrow at 11 or Saturday at 5. Would either work?"</li>
</ul>

<h2>"I'll think about it" — where most clinics stop</h2>
<p>Some enquiries book immediately. Most don't. "I'll think about it," "let me check with my husband," "I'll come next month" — and at most clinics, that is the end. Nobody is assigned to follow up; the front desk is busy with the patients who <em>did</em> book.</p>
<p>Here is the reframe that changes everything:</p>
<blockquote>Follow-up isn't chasing. It's helping a patient make a decision they already started making — they contacted you, remember.</blockquote>
<p>"Hi, have you decided?" is chasing, and it feels like pressure. Useful follow-up gives the patient something at each touch: an answer, a piece of education, reassurance, options. Done that way, four or five touches don't feel like nagging — they feel like a clinic that cares.</p>

<h2>A day-by-day sequence for a considered treatment</h2>
<p>For a bigger decision — an implant, aligners, smile design, full-mouth work — a patient genuinely needs time, and your follow-ups should match the questions forming in their head:</p>
<table class="gh-table">
  <thead><tr><th>When</th><th>What you send</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td><strong>Day 1</strong></td><td>Answer every open question from the first conversation, fully. Recap what they asked about and what it involves.</td><td>Completeness builds trust while interest is hottest.</td></tr>
    <tr><td><strong>Day 3</strong></td><td>Education: "Since you were asking about implants — here's a short guide on how the procedure actually works and how long it lasts."</td><td>They are researching anyway. Be the source, not a bystander.</td></tr>
    <tr><td><strong>Day 5</strong></td><td>Reassurance: address the fear they didn't say out loud — pain, recovery time, "will it look natural," safety. A patient story helps if you have a real one.</td><td>Hesitation at this stage is almost never about information. It's about fear.</td></tr>
    <tr><td><strong>Day 7</strong></td><td>Options: "There's more than one way to do this — different materials and budgets. Want me to send a comparison?"</td><td>Often the silent objection is money. Options let them say so without embarrassment.</td></tr>
    <tr><td><strong>Day 10</strong></td><td>A low-pressure consultation invite: "The easiest way to know what's right for your case is a quick consultation with Dr. — no commitment. Would this week or next suit you?"</td><td>Now the ask is earned. You've helped five times before asking once.</td></tr>
  </tbody>
</table>
<p>If there is still no reply after the sequence, park the lead for a monthly gentle check-in and stop. Persistence past that point costs goodwill.</p>

<h2>Match the sequence to the treatment</h2>
<p>One sequence does not fit all — the mistake is running implant-style follow-up on a toothache:</p>
<ul>
  <li><strong>Pain / emergency:</strong> there is no "day 3." Follow up the same day and the next morning: "Were you able to get relief? We can see you today at 4." After 48 hours they have been treated — by someone.</li>
  <li><strong>Cleaning / general check-up:</strong> low-consideration; keep it short. A same-day nudge and one reminder in 3–4 days with a bookable slot. More than that is overkill.</li>
  <li><strong>Implants / aligners / cosmetic:</strong> the full day 1–10 arc above. These patients take weeks; clinics that stay usefully present win them.</li>
  <li><strong>"Just asking the price":</strong> answer honestly, then one value follow-up ("here's what that price includes and how we're different"), then one invite. Price-shoppers convert on trust, not discounts.</li>
</ul>

<h2>Make it a system, or it won't happen</h2>
<p>Everything above is common sense — and almost no clinic does it, because it depends on a busy human remembering. The fix is structural:</p>
<ol>
  <li><strong>One list.</strong> Every enquiry from every channel lands in one place with a status: new → in conversation → follow-up due → booked → parked. A spreadsheet is enough to start.</li>
  <li><strong>One owner.</strong> A named person whose job includes follow-up — with 30 blocked minutes a day, or it loses to the front desk queue every time.</li>
  <li><strong>Written touches.</strong> The day 1/3/5/7/10 messages drafted once, per treatment type, so each follow-up is a 30-second personalisation, not a composition exercise.</li>
  <li><strong>Count one number weekly:</strong> enquiries → booked. That conversion rate is the single most improvable number in your clinic, and watching it move is what keeps the system alive.</li>
</ol>
<p>Or automate exactly this: instant first response on every channel, the right sequence per treatment, every conversation tracked — which is, candidly, the job we built AUMY to do. But the system matters more than the tool. A clinic running this manually will beat a clinic running nothing, every month.</p>`,
  },

  // ------------------------------------------------------------------
  // 3. RECALL LIST
  // ------------------------------------------------------------------
  {
    slug: 'dental-recall-list-hidden-revenue',
    title: 'How Much Revenue Is Sitting in Your Dental Recall List?',
    category: 'Recall & Retention',
    date: '2026-08-15',
    readingTime: '8 min read',
    author: 'Jayesh Chaudhari',
    excerpt:
      'Your next patient may already be in your database. Every clinic that has operated for a few years is sitting on hundreds of patients who are due, overdue, or quietly gone — here is how to segment them, what to say to each group, and what the list is worth.',
    description:
      'How Indian dental clinics can turn their existing patient database into predictable revenue: due vs overdue recall vs dormant patients, a 0-6 / 6-12 / 12+ month segmentation, WhatsApp message examples for each group, and the math on what a recall list is worth.',
    body: `
<p>Every rupee most clinics spend on growth goes toward strangers — ads, listings, hoardings, referrals. Meanwhile, sitting in the clinic's own records is a list of hundreds of people who already know the clinic, already trust the doctor, already found the location once — and simply haven't come back. No acquisition cost. No trust to build. Just nobody inviting them.</p>
<blockquote>Your next patient may already be in your database.</blockquote>

<h2>Three groups hiding in one list</h2>
<p>"Old patients" is not one group, and treating them as one is why generic bulk blasts perform poorly. Segment by time since last visit:</p>
<table class="gh-table">
  <thead><tr><th>Segment</th><th>Who they are</th><th>What they need</th></tr></thead>
  <tbody>
    <tr><td><strong>0–6 months<br/>(due recall)</strong></td><td>Recently treated; their next cleaning, review or continuation is coming due — or the dentist noted work they postponed.</td><td>A timely, personal reminder. This is service, not marketing — they expect it from a good clinic.</td></tr>
    <tr><td><strong>6–12 months<br/>(overdue / drifting)</strong></td><td>Missed their recall window. Not gone — life happened. They still consider you "their dentist" if asked.</td><td>Reactivation: a warmer nudge with an easy way to book, before the connection fades.</td></tr>
    <tr><td><strong>12+ months<br/>(dormant)</strong></td><td>Haven't visited in over a year. Many have moved on or found another clinic; some just never got around to it.</td><td>A genuine re-invitation campaign — acknowledging the gap, giving a reason to return.</td></tr>
  </tbody>
</table>
<p>The message that is perfect for one group is wrong for another. "Your cleaning is due" is helpful at 5 months and slightly absurd at 3 years.</p>

<h2>What the list is worth — do the math</h2>
<p>Illustrative assumptions again — replace with your own numbers:</p>
<ul>
  <li>A clinic running for 5 years has, say, <strong>2,000 patients</strong> in its records. Suppose only <strong>600</strong> visited in the last year. That leaves <strong>1,400</strong> who are overdue or dormant.</li>
  <li>Suppose a well-run recall and reactivation effort brings back just <strong>5%</strong> of them over a year — a deliberately modest figure. That is <strong>70 patients</strong>.</li>
  <li>A returning patient rarely needs only a cleaning. Between the cleaning, the X-ray, the filling found on examination, say <strong>₹3,000</strong> average per returning visit — again conservative.</li>
</ul>
<div class="gh-box">
  <p><strong>70 patients × ₹3,000 = ₹2.1 lakh a year</strong> — from people you already paid to acquire, at essentially zero marketing cost. And that ignores the compounding part: a reactivated patient re-enters the recall cycle, refers family, and returns next year too.</p>
</div>
<p>The recall list is the highest-margin revenue a clinic has, because the acquisition cost was paid years ago.</p>

<h2>What to send each group</h2>
<p>WhatsApp is the channel — it is where Indian patients actually reply. The tone shifts with the segment:</p>
<h3>Due recall (0–6 months)</h3>
<div class="gh-msg">Hi Priya! It's been about 6 months since your cleaning at [clinic]. Dr. Sharma recommends a check-up around now to keep everything on track. Would this Saturday or early next week suit you?</div>
<p>Personal, specific, framed as the doctor's care — because it is. Best sent as if from the clinic's front desk, not a promo blast.</p>
<h3>Overdue (6–12 months)</h3>
<div class="gh-msg">Hi Rahul, it's [clinic] — it's been almost a year since your last visit! A lot can change in a year (quietly 😊). Dr. Sharma would like to take a quick look and make sure all is well. Shall I find you a convenient slot this week?</div>
<p>Warm, no guilt, and it closes with an offer to do the work of booking for them.</p>
<h3>Dormant (12+ months)</h3>
<div class="gh-msg">Hi Sunita, this is [clinic] — it's been a while, and we wanted to check in. If you've been meaning to get a dental check-up, we'd love to see you again; Dr. Sharma still has your records, so there's no starting over. Is there anything you've been putting off that we can help with?</div>
<p>Acknowledge the gap. The "your records are still here, no starting over" line matters more than any discount — returning to a known doctor is easier than auditioning a new one. If you do offer something, make it a service ("a complete check-up and cleaning visit"), not a percentage off, which cheapens the relationship.</p>
<p><strong>Two rules for all three:</strong> send in small batches so the front desk can actually handle the replies (a hundred messages producing twenty replies into an unmanned inbox recreates the missed-call problem — <a href="/growth/dental-clinic-missed-calls-revenue-loss">the same leak in a new costume</a>), and stop after two unanswered touches per campaign. The list is an asset; spamming it is how you burn it.</p>

<h2>Why this never happens manually</h2>
<p>Every clinic owner nods along to all of this — and almost none of it happens, for one reason: recall is <em>important but never urgent</em>. The front desk's day is consumed by the patients who are present. The patients who are absent have no one advocating for them. Running recall well means, every single week, pulling who is due, drafting personal messages, sending them, answering replies, booking slots, and remembering who was contacted when — forever. It is a part-time job, and clinics don't staff it.</p>
<p>So make it systematic or make it automatic:</p>
<ol>
  <li><strong>This week:</strong> pull one list — every patient whose last visit was 6–12 months ago. Send twenty messages like the overdue example above, twenty per day, and book the replies. This one batch usually pays for the time tenfold and proves the list is alive.</li>
  <li><strong>Ongoing:</strong> a standing weekly 30-minute recall block, owned by a named person, working the due and overdue lists.</li>
  <li><strong>Automatic:</strong> this is among the first things clinics automate with AUMY — every patient enters the right sequence at the right time, replies get answered instantly and booked, and the dormant list is worked steadily in the background without anyone at the desk lifting a finger.</li>
</ol>
<p>Before spending another rupee acquiring strangers, find out what the patients you already have are worth. It is usually the easiest revenue you will recover this year.</p>`,
  },
];

module.exports = { GROWTH_CATEGORIES, growthPosts };
module.exports.default = module.exports;
