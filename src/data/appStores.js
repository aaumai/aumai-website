/**
 * The Aumy app in the stores, and the modules a clinic can start on its own
 * from the app (owner 2026-10-09: "I want the users to be taken to the App
 * Store and Play Store from the module cards on the marketing site").
 *
 * Clinics sign up THEMSELVES in the Aumy mobile app and start free with 1,000
 * Aumy credits per product — only for the four modules below. Aumy Journey and
 * Aumy One are set up with our team, so they keep Book a demo / WhatsApp us.
 *
 * ONE copy of the store links and the words: the React components
 * (src/components/AppDownload.js, src/components/StartInApp.js) and the crawler
 * HTML (scripts/prerender.js) all read this file.
 *
 * `module.exports` on purpose: the prerender script is plain Node.
 */

const APP_STORE_URL = 'https://apps.apple.com/in/app/aumy/id6780580041';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=co.aumai.ehr';

// Module ids (src/data/modules.js) a clinic can start from the app on its own.
const SELF_SERVE_IDS = [
  'dental-lead-management', // Aumy Convert
  'dental-clinic-management-software', // Aumy Clinic
  'whatsapp-ai-receptionist-for-dentists', // Aumy Chat
  'ai-voice-receptionist-for-dentists', // Aumy Voice
];
const isSelfServe = (id) => SELF_SERVE_IDS.includes(id);

// Module cards and module pages.
const START_LINE = 'Start free in the app — 1,000 Aumy credits';
const START_FINE = '14-day trial · no card needed to start';

// The slim bar at the very top of every page (owner ask: "1,000 Aumy credits
// to try each product" right at the top of the site).
const TOP_LINE = '1,000 Aumy credits to try each product';
const TOP_SUB = 'start free in the Aumy app';

module.exports = {
  APP_STORE_URL,
  PLAY_STORE_URL,
  SELF_SERVE_IDS,
  isSelfServe,
  START_LINE,
  START_FINE,
  TOP_LINE,
  TOP_SUB,
};
module.exports.default = module.exports;
