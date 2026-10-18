/**
 * The Full Chair Method masterclass refund rule (owner 2026-10-18: no refunds;
 * a duplicate charge is a mistake and is always returned). ONE copy, read by
 * src/pages/CancellationRefund.js and scripts/prerender.js, so the page a buyer
 * reads and the crawler copy never drift apart.
 *
 * `module.exports` on purpose: the prerender scripts are plain Node.
 */
const CONTACT_EMAIL = 'jayesh.chaudhari@aumai.co.in';
const HEADING = 'The Full Chair Method masterclass';
const RULES = [
  'The masterclass fee is non-refundable once paid.',
  'If you were charged more than once for the same registration by mistake, we return the extra payment in full to the same payment method, usually within 5–7 working days.',
  `Write to us at ${CONTACT_EMAIL}.`,
];

module.exports = { CONTACT_EMAIL, HEADING, RULES };
