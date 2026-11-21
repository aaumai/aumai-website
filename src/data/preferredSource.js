/**
 * Google "preferred source" link (owner 22 Nov 2026, picker "aumai.co.in blog only").
 *
 * A reader who opens this link and ticks aumai.co.in in Google's Source preferences sees more of our Growth
 * articles in THEIR OWN Top Stories, with a "preferred" badge in their AI Mode / AI Overviews answers (Google Search
 * Central: "Help your readers find your site through preferred sources"). Google does not say it changes ranking for
 * anyone else, so never promise more than that in the words below.
 *
 * Plain deep link, no Google script: nothing extra loads on the page. Checked 22 Nov 2026: Google's tool lists
 * aumai.co.in. India build only: aumyai.com (REACT_APP_MARKET=us) is a different domain and gets nothing until it
 * has its own decision.
 *
 * CommonJS on purpose (like growthPosts.js): the React app AND scripts/prerender.js read this same file.
 */
const IS_US = process.env.REACT_APP_MARKET === 'us';

const preferredSource = IS_US ? null : {
  url: 'https://www.google.com/preferences/source?q=aumai.co.in',
  label: 'Add AUM AI as a preferred source on Google',
  note: 'See more of our clinic-growth guides in your Google results.',
};

module.exports = { preferredSource };
module.exports.default = module.exports;
