/**
 * Home page FAQ — ONE copy of the words (SEO review 2026-10-06).
 *
 * src/pages/Home.js renders this list; scripts/prerender.js writes the same
 * list into the crawler HTML and the FAQPage JSON-LD of the home route, so
 * visible text == JSON-LD == crawler HTML and Google never sees FAQ markup
 * for text that is not on the page.
 *
 * 2026-10-22 (outcomes as a service, owner-approved): five questions a
 * sceptical clinic owner asks. No price and no module names here; prices live
 * on /pricing. No "no lock-in / cancel any time" line (not confirmed by the
 * owner). The dropped questions (cost, PMS, data safety, getting started,
 * "just reminder software?") are answered on /pricing, /modules and
 * /ai-dental-software-india.
 *
 * `module.exports` on purpose: prerender.js is plain Node and require()s it.
 */

const FAQS = [
  { q: 'Is this software or a service?', a: 'Both, but what you’re paying for is the outcome. Our team sets it up with your staff, writes your clinic’s messages in your doctor’s name, runs it every day and reports to you every Monday. The software is ours, and you never have to learn it alone.' },
  { q: 'Will anything go to my patients without us seeing it?', a: 'Not at the start. Every clinic begins with your team approving each message before it goes. As you come to trust it, you choose what runs on its own. Nobody who asked you to stop ever hears from you again.' },
  { q: 'Will my staff have to learn something complicated?', a: 'No. We sit with them and run the first days together, and the desk ends up doing less, not more. In Dr Priyanka’s words: “my team, who aren’t tech people, picked it up quickly.”' },
  { q: 'Do I have to replace my current software?', a: 'No. Whatever software you use, Aumy keeps your data in sync with it and adds what your clinic needs on top. If you’d rather have one connected platform, we move your data into Aumy for a one-time fee, with no downtime.' },
  { q: 'What does it cost?', a: 'It depends on which systems your clinic needs. After the free audit, we give you one clear monthly number, before anything starts. Prices are on our pricing page.' },
];

module.exports = { FAQS };
