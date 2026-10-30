/**
 * The Full Chair Method masterclass refund rule. Since 2026-10-30 there are two one-time
 * payments: joining (to watch, with WhatsApp Q&A) and the kit. Owner 2026-10-30 (the ad):
 * 'if you feel it did not add value I'll return your 299, no questions asked' — the joining
 * fee comes back on request; the kit stays non-refundable (owner 2026-10-18); a duplicate
 * charge is a mistake and is always returned. ONE copy, read by src/pages/CancellationRefund.js,
 * src/data/masterclass.js (the refund FAQ) and scripts/prerender.js, so the page a
 * buyer reads and the crawler copy never drift apart.
 *
 * No price on the refund page (reviewer 2026-10-25): the rule says "paid once".
 *
 * `module.exports` on purpose: the prerender scripts are plain Node.
 */
const CONTACT_EMAIL = 'jayesh.chaudhari@aumai.co.in';
const HEADING = 'The Full Chair Method masterclass';
const JOIN_MONEY_BACK = 'Joining the masterclass: if you watch it and feel it did not add value, write to us and we return your joining fee in full, no questions asked.';
const NON_REFUNDABLE = 'The kit fee is paid once and is non-refundable once paid.';
const DUPLICATE = 'If you were charged more than once for the same thing by mistake, we return the extra payment in full to the same payment method, usually within 5–7 working days.';
const RULES = [
  JOIN_MONEY_BACK,
  NON_REFUNDABLE,
  DUPLICATE,
  `Write to us at ${CONTACT_EMAIL}.`,
];

module.exports = { CONTACT_EMAIL, HEADING, JOIN_MONEY_BACK, NON_REFUNDABLE, DUPLICATE, RULES };
