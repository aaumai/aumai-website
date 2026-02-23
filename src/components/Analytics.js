import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const API_BASE = 'https://dabbewaala.aumai.co.in/api/aumai/analytics';

// Generate or retrieve persistent visitor ID
const getVisitorId = () => {
  let id = localStorage.getItem('aumai_vid');
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
    localStorage.setItem('aumai_vid', id);
  }
  return id;
};

// Generate session ID (new per browser session)
const getSessionId = () => {
  let id = sessionStorage.getItem('aumai_sid');
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
    sessionStorage.setItem('aumai_sid', id);
  }
  return id;
};

// Detect device type
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android.*mobile|opera m(ob|in)i/i.test(ua)) return 'mobile';
  return 'desktop';
};

// Parse UTM params from URL
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
    const body = JSON.stringify(data);
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

const Analytics = () => {
  const location = useLocation();
  const pageEnteredAt = useRef(Date.now());
  const maxScroll = useRef(0);
  const sessionStarted = useRef(false);
  const prevPath = useRef(null);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll.current) {
        maxScroll.current = scrollPercent;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Start session on first load
  useEffect(() => {
    if (!sessionStarted.current) {
      sessionStarted.current = true;
      const utm = getUtmParams();
      send('session', {
        session_id: getSessionId(),
        visitor_id: getVisitorId(),
        referrer: document.referrer || null,
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        landing_page: window.location.pathname,
        device_type: getDeviceType(),
      });
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    const currentPath = location.pathname;

    // Send time-on-page for the PREVIOUS page
    if (prevPath.current && prevPath.current !== currentPath) {
      const timeSeconds = Math.round((Date.now() - pageEnteredAt.current) / 1000);
      send('time', {
        session_id: getSessionId(),
        page_url: prevPath.current,
        time_seconds: timeSeconds,
        scroll_depth: maxScroll.current,
      });
    }

    // Track the new page view
    send('pageview', {
      session_id: getSessionId(),
      visitor_id: getVisitorId(),
      page_url: currentPath,
      page_title: document.title,
      referrer_page: prevPath.current,
    });

    // Reset counters for new page
    pageEnteredAt.current = Date.now();
    maxScroll.current = 0;
    prevPath.current = currentPath;
  }, [location.pathname]);

  // Send time-on-page when user leaves
  useEffect(() => {
    const handleUnload = () => {
      const timeSeconds = Math.round((Date.now() - pageEnteredAt.current) / 1000);
      send('time', {
        session_id: getSessionId(),
        page_url: prevPath.current || location.pathname,
        time_seconds: timeSeconds,
        scroll_depth: maxScroll.current,
      });
    };

    // visibilitychange is more reliable than beforeunload on mobile
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        handleUnload();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [location.pathname]);

  return null; // Invisible component
};

export default Analytics;
