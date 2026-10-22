/**
 * Aumy's Google reviews — ONE copy of the words (owner 2026-10-22: "put all our
 * Google reviews on the website").
 *
 * src/components/GoogleReviews.js renders this list (home page, and the first
 * three on /pricing); scripts/prerender.js writes the same list into the
 * crawler HTML. Rules for every row:
 *   - text is WORD FOR WORD as on Google: no edits, no trimming, typos kept;
 *   - name exactly as Google shows it; month is approximate (Google shows
 *     "a month ago", "19 hours ago");
 *   - only reviews WITH text (the owner's own star-only review is left out);
 *   - no reviewer profile photos (the card shows initials).
 *
 * Adding a review = one line in GOOGLE_REVIEWS. Order is the order on the page.
 *
 * 🚨 NO Review / AggregateRating schema.org markup for these, anywhere. Reviews
 * a business shows about itself are "self-serving" under Google's review
 * snippet guidelines, and marking them up risks a manual action.
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */

// Copy from the header of the Google profile ("5.0 ★") when it changes.
const GOOGLE_RATING = '5.0';
// The Aumy listing on Google Maps (CID 0xb375d49d75486db) and its write-a-review link.
const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps?cid=808217229862930139';
const GOOGLE_WRITE_REVIEW_URL = 'https://g.page/r/CduGVNdJXTcLEBM/review';

const GOOGLE_REVIEWS = [
  { name: "Dr Ronak Oswal", month: 'Sep 2026', stars: 5, text: "We run Vinaykia Dental Care in Pune and have been using AUMY by AUM AI for our clinic. The AI receptionist answers our WhatsApp enquiries instantly — even at night when the clinic is closed — books appointments, and follows up with patients who didn't confirm. Our Google reviews have grown because it asks happy patients at the right time, and it even posts on our Google profile regularly. The team is very responsive — Jayesh personally sets things up and fixes issues fast. For any dental clinic losing enquiries because the front desk is busy, this genuinely works. Highly recommended." },
  { name: "Komal Chaudhari", month: 'Sep 2026', stars: 5, text: "I run a dental clinic in Pune and my biggest problem was never the software — it was everything my front desk couldn't get to. Enquiries on WhatsApp at 9 PM, quotes we gave and never followed up, recall lists nobody called. AUMY fixed exactly that. The AI receptionist answers every enquiry within seconds and actually converts them into booked appointments — we've had patients book at midnight. Patients get proper day-by-day care instructions after treatments, which they genuinely appreciate. Our cleaning and check-up slots now fill automatically from recalls, and a few patients who hadn't visited in over a year came back after their reactivation messages. Our Google reviews have also grown steadily since it started asking happy patients at the right time. We kept our existing practice software — AUMY just works on top of it, so there was no painful migration." },
  { name: "Aditi Singh", month: 'Oct 2026', stars: 5, text: "Aumy has made managing our clinic so much easier and more efficient. From handling daily operations to keeping everything organized, the software helps our clinic run smoothly. It’s user friendly, reliable, and a great solution for healthcare professionals. Excellent software and highly recommended" },
  { name: "Neha Upadhyay", month: 'Oct 2026', stars: 5, text: "We have recently started using AUMY, and my experience so far has been really good. The software is user-friendly, easy to access, and convenient to use in my day to day operations. The interface is simple to understand, which makes managing work much smoother and more efficient. I am really happy with the experience so far and look forward to continuing to use AUMY. Highly recommended for anyone looking for an easy-to-use and efficient software solution!" },
  { name: "Suruchi Pandey", month: 'Oct 2026', stars: 5, text: "I really love using Aumy AI! It’s user-friendly, helpful, and makes things so much easier. A great app with a smooth experience and useful features. Keep improving and growing ❤️" },
];

module.exports = { GOOGLE_RATING, GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL, GOOGLE_REVIEWS };
