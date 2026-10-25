/**
 * The Full Chair Method masterclass refund rule (owner 2026-10-18: no refunds;
 * a duplicate charge is a mistake and is always returned). Since 2026-10-25 the
 * masterclass is free to watch and the one-time ₹999 buys the kit, so the rule is
 * about the kit. ONE copy, read by src/pages/CancellationRefund.js,
 * src/data/masterclass.js (the refund FAQ) and scripts/prerender.js, so the page a
 * buyer reads and the crawler copy never drift apart.
 *
 * No price on the refund page (reviewer 2026-10-25): the rule says "paid once".
 *
 * `module.exports` on purpose: the prerender scripts are plain Node.
 */
const CONTACT_EMAIL = 'jayesh.chaudhari@aumai.co.in';
const HEADING = 'The Full Chair Method masterclass';
const NON_REFUNDABLE = 'The kit is paid once and is non-refundable once paid.';
const FREE_ACCOUNT = 'Watching the masterclass is free: a free account costs nothing, so there is nothing to refund.';
const DUPLICATE = 'If you were charged more than once for the same kit by mistake, we return the extra payment in full to the same payment method, usually within 5–7 working days.';
const RULES = [
  NON_REFUNDABLE,
  FREE_ACCOUNT,
  DUPLICATE,
  `Write to us at ${CONTACT_EMAIL}.`,
];

module.exports = { CONTACT_EMAIL, HEADING, NON_REFUNDABLE, FREE_ACCOUNT, DUPLICATE, RULES };
