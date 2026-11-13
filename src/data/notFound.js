/**
 * The "page not found" page (13 Nov 2026, SEO pass). Unknown URLs used to show the home page with a 200, which
 * Google counts as a soft 404. nginx now answers unknown URLs with a real 404 status and this page
 * (build/404.html, written by scripts/prerender.js); the React app shows the same words for an unknown route.
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */
const NOT_FOUND = {
  title: 'Page not found | Aumy by AUM AI',
  description: 'This page does not exist. Go to the home page, the AI receptionist for dental clinics, or AI dental practice management software.',
  eyebrow: 'Page not found',
  h1: 'We couldn’t find that page.',
  body: 'The link may be old or mistyped. These are the pages most dental clinic owners are looking for:',
  links: [
    { to: '/', label: 'Aumy: AI dental clinic software' },
    { to: '/ai-receptionist', label: 'AI receptionist for dental clinics' },
    { to: '/modules/dental-clinic-management-software', label: 'AI dental practice management software' },
    { to: '/growth-audit', label: 'Free clinic audit' },
    { to: '/contact', label: 'Contact us' },
  ],
};

module.exports = { NOT_FOUND };
module.exports.default = module.exports;
