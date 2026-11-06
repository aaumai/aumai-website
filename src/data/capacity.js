/**
 * Onboarding capacity line (owner 2026-11-06, option A: "create a demand supply tension but should look genuine").
 * It MUST stay true: update these three values when a clinic signs or a new month opens (reminder on the 1st).
 * Shown under the main call to action on the home page and the services page (src/components/CapacityLine.js).
 * Rules: never reset to the same number every month; when full, set placesLeft 0 and the next start moves on.
 */
const CAPACITY = {
  perMonth: 3,
  nextStart: '1 December',
  placesLeft: 2,
  updated: '2026-11-06',
};

module.exports = { CAPACITY };
module.exports.default = module.exports;
