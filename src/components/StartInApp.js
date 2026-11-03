import React, { useState } from 'react';
import { StoreBadge } from './AppDownload';
import { START_LINE } from '../data/appStores';
import './StartInApp.css';

/**
 * "Sign up in the Aumy app" (owner 2026-10-09): clinics sign up themselves in
 * the Aumy app, for the four self-serve modules in src/data/appStores.js. The
 * credits / trial wording and the top credits bar were removed (owner 2026-11-03).
 *
 * Module cards show BOTH stores on every device, the visitor's own store first
 * (owner 2026-10-09). Detection runs
 * in the browser only — the app mounts with createRoot, and the crawler HTML
 * from scripts/prerender.js always lists both stores.
 */

export const detectStore = () => {
  if (typeof navigator === 'undefined') return 'both';
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  // iPadOS 13+ asks for the desktop site and says it is a Mac; a real Mac has no touch screen.
  if (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return 'ios';
  return 'both';
};

// Read once per mount; a phone does not change platform mid-visit.
export const useStore = () => {
  const [store] = useState(detectStore);
  return store;
};

const badgeLabel = (store, moduleName) =>
  `Start ${moduleName}: ${store === 'ios' ? 'download Aumy on the App Store' : 'get Aumy on Google Play'}`;

/**
 * Store action for one module.
 *   variant "card"    — /modules cards (the primary action on the card)
 *   variant "hero"    — the /modules/<id> page hero
 *   variant "compact" — the home module cards
 */
const StartInApp = ({ moduleName, variant = 'card' }) => {
  const store = useStore();
  // Both stores on every device (owner 2026-10-09: a phone showed only the App Store) — the visitor's own store first.
  const stores = store === 'android' ? ['android', 'ios'] : ['ios', 'android'];
  return (
    <div className={`sia sia-${variant}`}>
      <p className="sia-line">{START_LINE}</p>
      <div className="app-badges sia-badges">
        {stores.map((s) => (
          <StoreBadge key={s} store={s} label={badgeLabel(s, moduleName)} />
        ))}
      </div>
    </div>
  );
};

export default StartInApp;
