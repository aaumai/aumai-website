import React, { useEffect, useRef, useState } from 'react';
import { StoreBadge, APP_STORE_URL, PLAY_STORE_URL } from './AppDownload';
import { START_LINE, START_FINE, TOP_LINE, TOP_SUB } from '../data/appStores';
import './StartInApp.css';

/**
 * "Start free in the app" (owner 2026-10-09): clinics sign up themselves in
 * the Aumy app and get 1,000 Aumy credits per product, for the four
 * self-serve modules in src/data/appStores.js.
 *
 * Module cards show BOTH stores on every device, the visitor's own store first
 * (owner 2026-10-09). The top credits bar stays one tap target on a phone. Detection runs
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
  `Start ${moduleName} free: ${store === 'ios' ? 'download Aumy on the App Store' : 'get Aumy on Google Play'}`;

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
      {variant !== 'compact' && <p className="sia-fine">{START_FINE}</p>}
      <div className="app-badges sia-badges">
        {stores.map((s) => (
          <StoreBadge key={s} store={s} label={badgeLabel(s, moduleName)} />
        ))}
      </div>
    </div>
  );
};

/**
 * The slim bar at the very top of every page, inside the fixed header.
 * Phones get ONE big tap target to their own store; a desktop gets both links.
 * Its height (it wraps on narrow phones) is published as --notice-h, which
 * .App in App.css uses to push the page down below the fixed header.
 */
export const CreditsBar = () => {
  const store = useStore();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    if (!el) return undefined;
    const update = () => root.style.setProperty('--notice-h', `${el.offsetHeight}px`);
    update();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', update);
      root.style.removeProperty('--notice-h');
    };
  }, []);

  return (
    <div className="credits-bar" ref={ref}>
      <div className="container">
        {store === 'both' ? (
          <p className="credits-bar-text">
            <strong>{TOP_LINE}</strong>
            <span className="credits-bar-sub"> &mdash; {TOP_SUB}:</span>{' '}
            <a href={APP_STORE_URL} className="credits-bar-link" target="_blank" rel="noopener noreferrer" aria-label="Download Aumy on the App Store">App Store</a>
            <span className="credits-bar-sep" aria-hidden="true"> · </span>
            <a href={PLAY_STORE_URL} className="credits-bar-link" target="_blank" rel="noopener noreferrer" aria-label="Get Aumy on Google Play">Google Play</a>
          </p>
        ) : (
          <a
            href={store === 'ios' ? APP_STORE_URL : PLAY_STORE_URL}
            className="credits-bar-text credits-bar-whole"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>{TOP_LINE}</strong>
            <span className="credits-bar-sub"> &mdash; </span>
            <span className="credits-bar-link">{store === 'ios' ? 'Download on the App Store' : 'Get it on Google Play'}</span>
            <span aria-hidden="true"> &rarr;</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default StartInApp;
