/**
 * The 4C Framework — the ONE journey model on the marketing site (owner 2026-10-17: "make it 4C everywhere
 * on our marketing website … keep it consistent throughout"). It replaced Convert → Care → Retain → Reactivate
 * and the seven-step "enquiry to recall" strip.
 *
 * ONE copy of the words: the React section (src/components/FourC.js), every page that shows the stages, and the
 * crawler HTML in scripts/prerender.js all read this file. Change the wording here, never in a page.
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */

const EYEBROW = 'The Full Chair Method';
const TITLE = 'The 4C Framework';
const STRAP = 'Four stages, in the order a patient moves through your clinic.';
// US site says "practice", never "clinic" (src/pages/HomeUS.js). Same sentence otherwise.
const STRAP_US = 'Four stages, in the order a patient moves through your practice.';

const STAGES = [
  {
    key: 'convert',
    name: 'Convert',
    line: 'Every enquiry answered within seconds and followed up until it books.',
    systems: ['The Decision Path', 'Every Call Answered'],
  },
  {
    key: 'confirm',
    name: 'Confirm',
    line: 'Every booking confirmed the day before. Every missed visit rebooked.',
    systems: ['Confirm Twice, Remind Once', 'Same-Week Rebook'],
  },
  {
    key: 'care',
    name: 'Care',
    line: 'Advised treatment accepted, started treatment finished, every patient looked after.',
    systems: ['Advised to Accepted', 'Finish Line', 'BIT (Be In Touch)'],
  },
  {
    key: 'come-back',
    name: 'Come back',
    line: 'The patients most likely to return, invited back first.',
    systems: ['Smart Comebacks'],
  },
];

// "Convert → Confirm → Care → Come back"
const CHAIN = STAGES.map((s) => s.name).join(' → ');
// "The Decision Path · Every Call Answered"
const systemsText = (stage) => stage.systems.join(' · ');

// Page-specific sentences under the strap, for pages without their own data file (React page + prerender read these).
const LEADS = {
  us: 'Aumy coordinates the work in every stage.',
  switch: 'What you get once you are in: the Aumy modules you pick run these four stages on your synced patient records.',
};

module.exports = { EYEBROW, TITLE, STRAP, STRAP_US, STAGES, CHAIN, systemsText, LEADS };
module.exports.default = module.exports;
