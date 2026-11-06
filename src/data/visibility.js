/**
 * Pages hidden for now (owner 2026-11-06, TEMPORARY: "temporarily hide meta ads as a service from my
 * website", then "by hiding I meant just the page").
 *
 * HIDE_DENTAL_ADS_PAGE = true hides ONLY the /dental-ads page and every link to it:
 * - the React route redirects to /services (src/App.js);
 * - scripts/prerender.js writes a small noindex page with a canonical + meta refresh to /services,
 *   drops it from the crawler nav, the "Also from AUM AI" line and the /services "More on dental ads" link;
 * - scripts/seo-files.js leaves it out of sitemap.xml and llms.txt;
 * - the footer and the service pages' "other services" links skip it.
 * The dental ads service itself stays on /services (its section, wording, proof, FAQs and schema).
 *
 * To bring the page back: set HIDE_DENTAL_ADS_PAGE to false, build and deploy. Nothing else changes.
 *
 * `module.exports` on purpose: the prerender and seo-files scripts are plain Node.
 */
const HIDE_DENTAL_ADS_PAGE = true;

const DENTAL_ADS_PATH = '/dental-ads';

// true when a link to `path` may be shown (false only for a hidden page).
const showLink = (path) => !(HIDE_DENTAL_ADS_PAGE && path === DENTAL_ADS_PATH);

module.exports = { HIDE_DENTAL_ADS_PAGE, DENTAL_ADS_PATH, showLink };
module.exports.default = module.exports;
