import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// REACT_APP_SITE_API lets a local run point at a local backend; prod uses the default.
const API_BASE = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/analytics`;

// A visit ends after this long with no activity — same rule the backend uses
// to send the "visit summary" WhatsApp. Coming back later starts a new visit.
const VISIT_IDLE_MS = 30 * 60 * 1000;
const HEARTBEAT_MS = 60 * 1000;
// Heartbeats only count while someone is actually there (moved, scrolled,
// tapped or typed recently) — a tab left open on a desk must not keep a visit alive.
const ACTIVE_WINDOW_MS = 5 * 60 * 1000;

const newId = () =>
  (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));

// Storage can throw (private mode, blocked site data) — analytics must never break the site.
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
};

const readCookie = (name) => {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
  } catch (e) { return null; }
};

const writeCookie = (name, value) => {
  try {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    // 400 days is the longest browsers keep a cookie.
    document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=34560000; Path=/; SameSite=Lax${secure}`;
  } catch (e) { /* ignore */ }
};

// Persistent visitor ID — kept in a first-party cookie AND localStorage, so
// clearing one still recognises a returning visitor.
const getVisitorId = () => {
  const id = readCookie('aumai_vid') || store.get('aumai_vid') || newId();
  writeCookie('aumai_vid', id);
  store.set('aumai_vid', id);
  return id;
};

// One visit is shared across tabs and ends after VISIT_IDLE_MS of no activity.
// Returns { id, isNew } and refreshes the activity clock.
const touchSession = () => {
  const now = Date.now();
  let sess = null;
  try { sess = JSON.parse(store.get('aumai_sess') || 'null'); } catch (e) { sess = null; }
  const isNew = !sess || !sess.id || now - (sess.last || 0) > VISIT_IDLE_MS;
  const id = isNew ? newId() : sess.id;
  store.set('aumai_sess', JSON.stringify({ id, last: now }));
  return { id, isNew };
};

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android.*mobile|opera m(ob|in)i/i.test(ua)) return 'mobile';
  return 'desktop';
};

const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
  };
};

// Fire-and-forget beacon
const send = (endpoint, data) => {
  try {
    // Tag every event with the site it came from (aumai.co.in vs aumyai.com) so
    // the dashboard can separate India and US traffic.
    const body = JSON.stringify({ ...data, site: window.location.hostname });
    // Use sendBeacon for reliability (survives page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${API_BASE}/${endpoint}`, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch (e) {
    // Analytics should never break the site
  }
};

// Current visit id; starts (and announces) a new visit when the last one went idle.
const ensureSession = (landingPath) => {
  const { id, isNew } = touchSession();
  if (isNew) {
    const utm = getUtmParams();
    send('session', {
      session_id: id,
      visitor_id: getVisitorId(),
      referrer: document.referrer || null,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      landing_page: landingPath,
      device_type: getDeviceType(),
      // Set when this browser has logged in to /aumaianalytics — our own visits never alert.
      internal: store.get('aumai_internal') === '1',
    });
  }
  return id;
};

// Seconds this page has been on screen (finished stretches + the running one).
const onScreenSeconds = (visibleMs, visibleSince) => {
  const running = visibleSince.current ? Date.now() - visibleSince.current : 0;
  return Math.round((visibleMs.current + running) / 1000);
};

const Analytics = () => {
  const location = useLocation();
  const visibleMs = useRef(0);          // time this page was actually on screen
  const visibleSince = useRef(null);    // when the current on-screen stretch began
  const lastInteraction = useRef(Date.now());
  const maxScroll = useRef(0);
  const prevPath = useRef(null);
  const sessionId = useRef(null);

  // Scroll depth + "someone is here" signals
  useEffect(() => {
    const handleScroll = () => {
      lastInteraction.current = Date.now();
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll.current) {
        maxScroll.current = scrollPercent;
      }
    };
    const markActive = () => { lastInteraction.current = Date.now(); };
    const activity = ['pointerdown', 'keydown', 'mousemove', 'touchstart'];

    window.addEventListener('scroll', handleScroll, { passive: true });
    activity.forEach((e) => window.addEventListener(e, markActive, { passive: true }));
    return () => {
      window.removeEventListener('scroll', handleScroll);
      activity.forEach((e) => window.removeEventListener(e, markActive));
    };
  }, []);

  // Page views on route change (the first one also starts the visit)
  useEffect(() => {
    const currentPath = location.pathname;

    // Send time-on-page for the PREVIOUS page
    if (prevPath.current && prevPath.current !== currentPath && sessionId.current) {
      send('time', {
        session_id: sessionId.current,
        page_url: prevPath.current,
        time_seconds: onScreenSeconds(visibleMs, visibleSince),
        scroll_depth: maxScroll.current,
      });
    }

    sessionId.current = ensureSession(currentPath);
    send('pageview', {
      session_id: sessionId.current,
      visitor_id: getVisitorId(),
      page_url: currentPath,
      page_title: document.title,
      referrer_page: prevPath.current,
    });

    // Reset counters for new page
    visibleMs.current = 0;
    visibleSince.current = document.visibilityState === 'visible' ? Date.now() : null;
    lastInteraction.current = Date.now();
    maxScroll.current = 0;
    prevPath.current = currentPath;
  }, [location.pathname]);

  // Time on page: sent when the tab is hidden/closed, plus a heartbeat while
  // someone is reading so long reads count and the visit stays open.
  useEffect(() => {
    const flush = () => {
      if (!sessionId.current) return;
      send('time', {
        session_id: sessionId.current,
        page_url: prevPath.current || location.pathname,
        time_seconds: onScreenSeconds(visibleMs, visibleSince),
        scroll_depth: maxScroll.current,
      });
    };

    // visibilitychange is more reliable than beforeunload on mobile
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        if (visibleSince.current) {
          visibleMs.current += Date.now() - visibleSince.current;
          visibleSince.current = null;
        }
        flush();
      } else {
        // Back after a long break → that is a new visit, starting on this page.
        const prevId = sessionId.current;
        sessionId.current = ensureSession(location.pathname);
        if (sessionId.current !== prevId) {
          send('pageview', {
            session_id: sessionId.current,
            visitor_id: getVisitorId(),
            page_url: location.pathname,
            page_title: document.title,
            referrer_page: null,
          });
          visibleMs.current = 0;
          maxScroll.current = 0;
        }
        visibleSince.current = Date.now();
        lastInteraction.current = Date.now();
      }
    };

    const heartbeat = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      if (Date.now() - lastInteraction.current > ACTIVE_WINDOW_MS) return;
      touchSession();
      flush();
    }, HEARTBEAT_MS);

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', flush);

    return () => {
      clearInterval(heartbeat);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', flush);
    };
  }, [location.pathname]);

  return null; // Invisible component
};

export default Analytics;
