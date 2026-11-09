/**
 * Ads hidden for now (owner 2026-11-06, TEMPORARY, a few hours: "temporarily hide meta ads as a service
 * from my website", then "hide all three" while an implant-marketing agency looks at aumai.co.in).
 *
 * ONE switch: HIDE_ADS. Set it to false, build and deploy, and everything below comes back unchanged.
 *
 * While HIDE_ADS is true:
 * 1. The /dental-ads page is hidden (HIDE_DENTAL_ADS_PAGE):
 *    - the React route redirects to /services (src/App.js);
 *    - scripts/prerender.js writes a small noindex page with a canonical + meta refresh to /services;
 *    - scripts/seo-files.js leaves it out of sitemap.xml and llms.txt;
 *    - no link points to it (footer, crawler nav, service-page sibling links, "Also from AUM AI").
 * 2. /services shows two services, dental websites and dental SEO (src/data/services.js): the dental ads
 *    service, its proof item, the ads FAQ and the ads wording in the hero, SEO and steps are left out.
 * 3. Aumy Convert reads as "Lead Nurturing & Follow-up" with plain enquiry follow-up wording, no ads
 *    optimisation (src/data/modules.js, positioning.js, explainers.js, and llms.txt).
 * The growth article on Meta ads and the US Business Manager pages are not affected.
 *
 * `module.exports` on purpose: the prerender and seo-files scripts are plain Node.
 *
 * Shown again (owner 2026-11-09: unhide, with the "Your clinic, handled." list on the home page,
 * src/data/homeOneProduct.js HANDLED, whose ads line also follows this switch).
 */
const HIDE_ADS = false;

// The /dental-ads page follows the one switch.
const HIDE_DENTAL_ADS_PAGE = HIDE_ADS;

const DENTAL_ADS_PATH = '/dental-ads';

// true when a link to `path` may be shown (false only for a hidden page).
const showLink = (path) => !(HIDE_DENTAL_ADS_PAGE && path === DENTAL_ADS_PATH);

// The ads wording when ads are shown, the plain wording while they are hidden.
const adsText = (withAds, withoutAds) => (HIDE_ADS ? withoutAds : withAds);

module.exports = { HIDE_ADS, HIDE_DENTAL_ADS_PAGE, DENTAL_ADS_PATH, showLink, adsText };
module.exports.default = module.exports;
