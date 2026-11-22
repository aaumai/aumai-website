/**
 * Approved public proof (owner 2026-11-13, aumy-marketing-sales skill, proof list N08 + N01).
 *
 * ONE copy of the words: the home page (src/pages/Home.js), the Aumy Clinic page (src/pages/ModuleDetailPage.js)
 * and scripts/prerender.js all read this file. Edit here, never there.
 *
 * Rules (do not loosen without the founder):
 *   - the public wording below is word for word from the approved list; never round up, never add a figure;
 *   - POOLED: always say "across 4 dental clinics on Aumy" and give the window. No clinic is named.
 *     Re-measure before reuse after 12 Dec 2026 (30 days);
 *   - STERLING (owner 2026-11-22, approved by picker): "2 in 3" of Sterling's patients ANSWERED their appointment
 *     reminder on WhatsApp: 906 of 1,354 (67%), measured 23 Oct–21 Nov 2026 (visit dates) on prod, read-only.
 *     Answered = between the first reminder and the visit start the patient confirmed, replied by WhatsApp text or
 *     voice note (own, second or linked family number; auto-replies and STOP left out), cancelled, or called the clinic.
 *     Say "answered their reminder", NEVER "confirm": confirmed-only is 40.5% (548 of 1,354) in the same window.
 *     The old 281 of 603 (47%, 2–16 Oct) was a confirmed-only figure; it is retired. Re-measure after 21 Dec 2026.
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */

const POOLED = {
  eyebrow: 'Measured, not promised',
  title: 'Across 4 dental clinics on Aumy',
  window: 'Measured 14 Oct–12 Nov 2026.',
  items: [
    'More than 1 in 3 replies sent while the clinic was closed',
    'Median reply under 10 seconds',
    '751 confirmations, 55 moves, 62 cancellations handled by the AI',
    '105 visits booked by Aumy, still on the book',
    'About 1 in 7 missed-visit patients rebooked within 7 days',
  ],
};

const STERLING_ANSWERED = {
  short: '2 in 3',
  line: 'of Sterling’s patients answered their appointment reminder on WhatsApp: 906 of 1,354 (67%).',
  window: 'Measured 23 Oct–21 Nov 2026.',
};

module.exports = { POOLED, STERLING_ANSWERED };
module.exports.default = module.exports;
