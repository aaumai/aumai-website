/**
 * Build-time snapshot of Aumy's price list.
 *
 * The price list lives in ONE place — the Aumy API's pricing rate card, the
 * same one clinics are billed from (EHR API mig 830). This script copies the
 * current rate card and a sample quote into src/data/pricing.json before the
 * React build, so:
 *   - the first paint of /pricing shows real prices before any network call,
 *   - scripts/prerender.js puts real prices in the HTML search engines read.
 * The page then refreshes the rate card and every quote live from the API.
 *
 * If the API is unreachable the committed snapshot is kept and the build goes
 * on (a stale-by-hours price is better than a failed deploy); the warning says so.
 */
const fs = require('fs');
const path = require('path');

const API = process.env.AUMY_PRICING_API || 'https://aumy.aumai.co.in/api/v1/public/pricing';
const OUT = path.join(__dirname, '..', 'src', 'data', 'pricing.json');

// The calculator's starting position — must match DEFAULT_INPUTS in PricingPage.js.
const SAMPLE = { tier: 'standard', enquiries: 250, patients_per_day: 20, working_days: 26, voice: false, voice_minutes: 200, own_number: true, marketing: 800, get_found: false, meta_ads: false };

async function getJson(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 15000);
  try {
    const res = await fetch(url, { signal: ctl.signal, headers: { Origin: 'https://aumai.co.in' } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const body = await res.json();
    if (!body.success) throw new Error('API returned success=false');
    return body.data;
  } finally {
    clearTimeout(t);
  }
}

(async () => {
  try {
    const card = await getJson(API);
    const qs = new URLSearchParams(Object.entries(SAMPLE).map(([k, v]) => [k, String(v)])).toString();
    const quote = await getJson(`${API}/quote?${qs}`);
    const snapshot = { fetched_at: new Date().toISOString(), ...card, sample: { inputs: SAMPLE, quote } };
    // The site spells the product "Aumy", as the logo does (owner 2026-09-26);
    // the rate card's own copy still says "AUMY" in places.
    const json = JSON.stringify(snapshot, null, 2).replace(/\bAUMY\b/g, 'Aumy');
    fs.writeFileSync(OUT, `${json}\n`);
    console.log(`fetch-pricing: rate card ${card.code} v${card.version} (effective ${card.effective_from}); sample total ₹${quote.total}`);
  } catch (err) {
    if (!fs.existsSync(OUT)) {
      console.error(`fetch-pricing: API unreachable (${err.message}) and no snapshot exists — cannot build /pricing.`);
      process.exit(1);
    }
    console.warn(`fetch-pricing: API unreachable (${err.message}) — keeping the committed snapshot src/data/pricing.json.`);
  }
})();
