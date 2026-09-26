import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Gentle fade-up of each section as it scrolls into view (the "quiet luxury"
 * theme, src/styles/lux.css). Runs per route. Sections are only hidden once
 * this script has run, so without JavaScript — and for crawlers reading the
 * prerendered HTML — every section is simply visible.
 */
export default function LuxReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    // Let the new page render first.
    const t = setTimeout(() => {
      const els = Array.from(document.querySelectorAll('.site-lux section:not(.lux-hero), .site-lux .ch-pillar, .site-lux .ch-why-card'));
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('lux-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      els.forEach((el) => {
        // Already on screen: show at once, never flash it away.
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) return;
        el.classList.add('lux-reveal');
        io.observe(el);
      });
      LuxReveal.io = io;
    }, 60);
    return () => { clearTimeout(t); if (LuxReveal.io) LuxReveal.io.disconnect(); };
  }, [pathname]);
  return null;
}
