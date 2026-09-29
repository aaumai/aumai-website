/**
 * Reads the price list, whichever shape it has.
 *
 * The price list is one row in the Aumy API (pricing_rate_cards) and it has had
 * two shapes:
 *   - "usage"   (2026-09-15) one platform fee with allowances and overage bands;
 *   - "modules" (2026-09-29, API mig 987) pick and choose: each module has its
 *     own price — a yearly licence, a monthly platform fee, a setup fee, a rate
 *     per unit used, or a mix.
 *
 * The pricing page fetches the card LIVE, so for a while the page and the card
 * can disagree about the shape: the site is deployed before the API switches,
 * and a build snapshot can be older than the card. Everything that prints a
 * price goes through here so that neither order breaks a page.
 *
 * ⚠️ There are NO prices in this file. It only turns the card's numbers into
 * words. CommonJS on purpose: scripts/prerender.js and scripts/seo-files.js
 * require it under Node, and the React pages import it.
 */
const num = (n) => Math.round(Number(n) || 0);
const inr = (n) => num(n).toLocaleString('en-IN');

const isModules = (card) => !!card && card.model === 'modules' && Array.isArray(card.modules);
const moduleById = (card, id) => (isModules(card) ? card.modules.find((m) => m.id === id) : undefined) || null;

/** A module's usage rates as a list: the card writes one rate or several. */
const usagesOf = (mod) => {
  const u = mod && mod.price && mod.price.usage;
  if (!u) return [];
  return (Array.isArray(u) ? u : [u]).filter((x) => x && typeof x.key === 'string');
};

const rateOf = (usage, tier) => {
  if (!usage) return 0;
  if (typeof usage.rate === 'number') return usage.rate;
  return Number((usage.rate || {})[tier === 'premium' ? 'premium' : 'standard']) || 0;
};

/**
 * A module's price as the parts a person reads, in the order they pay them.
 * `money` formats a number ("₹5,000", "Rs 5,000", "&#8377;5,000").
 */
const priceParts = (mod, money) => {
  const p = (mod && mod.price) || {};
  const out = [];
  if (num(p.yearly) > 0) out.push(`${money(p.yearly)} a year`);
  if (num(p.monthly) > 0) out.push(`${money(p.monthly)} a month${num(p.yearly) > 0 ? ' platform fee' : ''}`);
  for (const u of usagesOf(mod)) {
    if (typeof u.rate === 'number') out.push(`${money(u.rate)} per ${u.unit}`);
    else out.push(`${money(u.rate.standard)} per ${u.unit} on Standard AI, ${money(u.rate.premium)} on Premium AI`);
  }
  if (num(p.setup) > 0) out.push(`${money(p.setup)} one-time setup`);
  return out;
};

const priceText = (mod, money) => {
  const parts = priceParts(mod, money);
  const p = (mod && mod.price) || {};
  const noSetup = p.setup === 0 ? ' No setup fee.' : '';
  return parts.length ? `${parts.join(' + ')}.${noSetup}` : '';
};

/** One sentence that names the price, for titles, meta descriptions and FAQ answers. */
const summary = (card, money) => {
  if (isModules(card)) {
    const os = moduleById(card, 'clinic_os');
    const pj = moduleById(card, 'patient_journey');
    const bits = [];
    if (os) bits.push(`Clinic OS at ${priceParts(os, money).join(' plus ')}${num(os.price.monthly) === 0 && num(os.price.yearly) > 0 ? ', all inclusive' : ''}${os.price.setup === 0 ? ', no setup fee' : ''}`);
    if (pj) bits.push(`the patient journey at ${priceParts(pj, money).join(' plus ')}`);
    return `Pick only the modules your clinic needs: ${bits.join('; ')}. The AI WhatsApp receptionist, AI voice receptionist, AI documentation and Get Found are separate modules, each with its own price.`;
  }
  const f = (card && card.platformFee) || {};
  const inc = (card && card.included) || {};
  return `A platform fee of ${money(f.standard)} a month (Standard AI) or ${money(f.premium)} (Premium AI) includes ${inc.enquiries} enquiries and ${inc.visits} patient visits.`;
};

/**
 * What the dental software itself starts at. `monthly` is 0 when the module is
 * priced by the year only (Clinic OS: one yearly fee, all inclusive).
 */
const entry = (card) => {
  if (isModules(card)) {
    const os = moduleById(card, 'clinic_os');
    return { monthly: num(os && os.price.monthly), yearly: num(os && os.price.yearly), label: 'Clinic OS' };
  }
  return { monthly: num(card && card.platformFee && card.platformFee.standard), yearly: 0, label: 'Standard AI' };
};

/** Setup fee in words. */
const setupText = (card, money) => {
  if (isModules(card)) {
    const withSetup = card.modules.filter((m) => num(m.price && m.price.setup) > 0);
    const none = card.modules.filter((m) => m.price && m.price.setup === 0).map((m) => m.name);
    const a = withSetup.map((m) => `${m.name} has a one-time setup of ${money(m.price.setup)}`).join('; ');
    const b = none.length ? `${none.join(' and ')} ${none.length > 1 ? 'have' : 'has'} no setup fee` : '';
    return [a, b].filter(Boolean).join('. ') + '.';
  }
  const o = (card && card.onboarding) || {};
  return `One-time setup of ${money(o.min)} to ${money(o.max)}, depending on the data migrated.`;
};

module.exports = { isModules, moduleById, usagesOf, rateOf, priceParts, priceText, summary, entry, setupText, inr, num };
