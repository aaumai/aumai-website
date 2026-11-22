/**
 * The Aumy app in the stores, and the modules a clinic can start on its own
 * from the app (owner 2026-10-09: "I want the users to be taken to the App
 * Store and Play Store from the module cards on the marketing site").
 *
 * Self-serve sign-up is OFF since 22 Nov 2026 (owner: not sold until 7 Feb 2027): every module card and page
 * offers Book a demo / WhatsApp us only. No credits, trial or price wording anywhere (owner
 * 2026-11-02/03: "no pricing on website at all"; the credits bar was removed).
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
// EMPTY since 22 Nov 2026 (owner): self-serve is not sold until 7 Feb 2027 (strategy lock), so no module card,
// module page or home card shows "Sign up in the Aumy app". The app stays in the stores for clinics already on
// Aumy. Before: dental-lead-management, dental-clinic-management-software, whatsapp-ai-receptionist-for-dentists,
// ai-voice-receptionist-for-dentists.
const SELF_SERVE_IDS = [];
const isSelfServe = (id) => SELF_SERVE_IDS.includes(id);

// Module cards and module pages.
const START_LINE = 'Sign up in the Aumy app';

module.exports = {
  APP_STORE_URL,
  PLAY_STORE_URL,
  SELF_SERVE_IDS,
  isSelfServe,
  START_LINE,
};
module.exports.default = module.exports;
