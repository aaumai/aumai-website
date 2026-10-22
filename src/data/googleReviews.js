/**
 * Aumy's Google reviews — ONE copy of the words (owner 2026-10-22: "put all our
 * Google reviews on the website").
 *
 * src/components/GoogleReviews.js renders this list (home page, and the first
 * three on /pricing); scripts/prerender.js writes the same list into the
 * crawler HTML. Rules for every row:
 *   - text is WORD FOR WORD as on Google: no edits, no trimming, typos kept;
 *     a blank line ("\n\n") is a paragraph break exactly where Google shows one;
 *   - name exactly as Google shows it, except a reviewer we know, shown by her
 *     real identity: then `googleName` keeps Google's spelling and `clinic`
 *     says who she is; month is approximate (Google shows "a month ago",
 *     "19 hours ago");
 *   - at most ONE row has `hero: true`: it leads the home section as a wide
 *     featured card headed by its `pullQuote` (a line copied word for word
 *     from its own text) and is the first card on /pricing. `videoId` links
 *     "Watch her team's video" to that element id, only on a page that has it;
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
  // Owner 2026-10-22: Dr Priyanka's review is the HERO review. Google shows her as "priyanka giroti".
  { name: "Dr Priyanka Giroti", googleName: "priyanka giroti", clinic: "The Sterling Dental Clinic, New Delhi", month: 'Oct 2026', stars: 5, hero: true, pullQuote: "My only regret? That we didn't have this years ago.", videoId: 'sterling-video', text: "Twenty-six years of running Sterling, and honestly, I didn't think any software could surprise me anymore. Aumy did.\n\nIf you run a clinic, you know the hard part isn't the dentistry. It's the phone ringing while you're with a patient, the WhatsApp you're answering at eleven at night, the patient who was advised treatment and never came back.\n\nWe moved to Aumy on 23 September, and my team, who aren't tech people, picked it up quickly. In the first two weeks, most of the appointments were confirmed by the patients themselves on WhatsApp. Almost half. Nobody had to call them.\n\nReminders, follow-ups, patients who need to come back: everything runs almost on auto mode, and nothing goes to a patient without my team seeing it first. Nothing gets missed.\n\nThank you, Jayesh ji, and your team. You were with us at every step. My only regret? That we didn't have this years ago. If you run a clinic, please, just see it once." },
  { name: "Dr Ronak Oswal", month: 'Sep 2026', stars: 5, text: "We run Vinaykia Dental Care in Pune and have been using AUMY by AUM AI for our clinic. The AI receptionist answers our WhatsApp enquiries instantly — even at night when the clinic is closed — books appointments, and follows up with patients who didn't confirm. Our Google reviews have grown because it asks happy patients at the right time, and it even posts on our Google profile regularly. The team is very responsive — Jayesh personally sets things up and fixes issues fast. For any dental clinic losing enquiries because the front desk is busy, this genuinely works. Highly recommended." },
  { name: "Aditi Singh", month: 'Oct 2026', stars: 5, text: "Aumy has made managing our clinic so much easier and more efficient. From handling daily operations to keeping everything organized, the software helps our clinic run smoothly. It’s user friendly, reliable, and a great solution for healthcare professionals. Excellent software and highly recommended" },
  { name: "Neha Upadhyay", month: 'Oct 2026', stars: 5, text: "We have recently started using AUMY, and my experience so far has been really good. The software is user-friendly, easy to access, and convenient to use in my day to day operations. The interface is simple to understand, which makes managing work much smoother and more efficient. I am really happy with the experience so far and look forward to continuing to use AUMY. Highly recommended for anyone looking for an easy-to-use and efficient software solution!" },
  { name: "Suruchi Pandey", month: 'Oct 2026', stars: 5, text: "I really love using Aumy AI! It’s user-friendly, helpful, and makes things so much easier. A great app with a smooth experience and useful features. Keep improving and growing ❤️" },
];

module.exports = { GOOGLE_RATING, GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL, GOOGLE_REVIEWS };
