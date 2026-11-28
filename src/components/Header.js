import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PATH as APPLY_PATH, CTA_LABEL as CALL_LABEL } from '../data/apply';
import './Header.css';

const LAUNCH_BAR_KEY = 'aumai_dubai_launch_bar';

// The menu (owner 2026-11-02: Aumy is ONE product; "the website is very noisy … keep it clean simple").
// Five plain links (Services added 2026-11-05) plus the one call to action; Home (Aumy) is the logo. No module names, no services
// dropdown and no pricing (owner 2026-11-02: "no pricing on website at all"). The module pages, the
// services, the Growth Hub, the podcast and the calculators keep their URLs and are linked from the footer
// and from scripts/prerender.js SITE_LINKS. The group code below stays for any future dropdown.
const NAV_ITEMS = [
  { path: '/revenue-generator', label: 'How it works' },
  { path: '/demos', label: 'Watch demos' },
  // The Full Chair Method masterclass (owner 2026-10-19).
  { path: '/masterclass', label: 'Masterclass' },
  // Dental ads, dental websites and dental SEO on one page (owner 2026-11-05).
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
];

const isActive = (pathname, path) => pathname === path || pathname.startsWith(`${path}/`);

// Hover-to-open only where there is a real pointer and the desktop menu is showing.
const canHover = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(hover: hover) and (min-width: 1201px)').matches;

const Chevron = () => (
  <svg className="nav-chevron" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false">
    <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);
  const hoverTimer = useRef(null);
  // "Launching in Dubai soon!" bar on every page (owner 2026-11-15, an exception to the 9 Nov strategy lock).
  // Closeable; stays closed for that visitor. Plain text: no link, no dates, no prices.
  const [showLaunchBar, setShowLaunchBar] = useState(() => {
    try { return window.localStorage.getItem(LAUNCH_BAR_KEY) !== 'closed'; } catch { return true; }
  });
  const launchBarRef = useRef(null);

  // The fixed header grows by the bar's height; .App pads by --notice-h so nothing hides under it.
  useEffect(() => {
    const root = document.documentElement;
    const el = launchBarRef.current;
    if (!showLaunchBar || !el) { root.style.removeProperty('--notice-h'); return undefined; }
    const apply = () => root.style.setProperty('--notice-h', `${el.offsetHeight}px`);
    apply();
    window.addEventListener('resize', apply);
    return () => { window.removeEventListener('resize', apply); root.style.removeProperty('--notice-h'); };
  }, [showLaunchBar]);

  const closeLaunchBar = () => {
    setShowLaunchBar(false);
    try { window.localStorage.setItem(LAUNCH_BAR_KEY, 'closed'); } catch { /* private window: closes for this visit only */ }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // A click anywhere outside the menu closes an open group.
  useEffect(() => {
    if (!openMenu) return undefined;
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [openMenu]);

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
  };

  const menuLinks = (key) =>
    navRef.current ? [...navRef.current.querySelectorAll(`#nav-menu-${key} a`)] : [];

  const focusItem = (key, index) => {
    const links = menuLinks(key);
    if (!links.length) return;
    links[(index + links.length) % links.length].focus();
  };

  const focusToggle = (key) => {
    const btn = navRef.current && navRef.current.querySelector(`[data-menu-toggle="${key}"]`);
    if (btn) btn.focus();
  };

  const onHoverOpen = useCallback((key) => {
    if (!canHover()) return;
    clearTimeout(hoverTimer.current);
    setOpenMenu(key);
  }, []);

  const onHoverClose = useCallback(() => {
    if (!canHover()) return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(null), 160);
  }, []);

  const onToggleKeyDown = (e, key) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpenMenu(key);
      // The list is already in the DOM (hidden by CSS); focus it once it is shown.
      requestAnimationFrame(() => focusItem(key, 0));
    } else if (e.key === 'Escape' && openMenu === key) {
      setOpenMenu(null);
    }
  };

  const onMenuKeyDown = (e, key) => {
    const links = menuLinks(key);
    const index = links.indexOf(document.activeElement);
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpenMenu(null);
      focusToggle(key);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem(key, index + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItem(key, index - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusItem(key, 0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusItem(key, links.length - 1);
    }
  };

  // Tabbing out of a group closes it.
  const onGroupBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setOpenMenu(null);
  };

  const renderLink = (link) => {
    const active = isActive(location.pathname, link.path);
    return (
      <Link
        to={link.path}
        className={`nav-link ${active ? 'active' : ''}`}
        aria-current={active ? 'page' : undefined}
        onClick={closeMobileMenu}
      >
        {link.label}
        {link.badge && <span className="nav-badge">{link.badge}</span>}
      </Link>
    );
  };

  const renderChild = (child) => {
    const active = isActive(location.pathname, child.path);
    return (
      <li key={child.path}>
        <Link
          to={child.path}
          className={`nav-dropdown-link ${active ? 'active' : ''}`}
          aria-current={active ? 'page' : undefined}
          onClick={closeMobileMenu}
        >
          <span className="nav-dropdown-label">{child.label}</span>
          <span className="nav-dropdown-hint">{child.hint}</span>
        </Link>
      </li>
    );
  };

  const renderGroup = (item) => {
    const open = openMenu === item.key;
    const allChildren = item.sections ? item.sections.flatMap((s) => s.children) : item.children;
    const groupActive = allChildren.some((c) => isActive(location.pathname, c.path));
    return (
      <li
        key={item.key}
        className={`nav-item nav-dropdown ${open ? 'open' : ''}`}
        onMouseEnter={() => onHoverOpen(item.key)}
        onMouseLeave={onHoverClose}
        onBlur={onGroupBlur}
      >
        <button
          type="button"
          className={`nav-link nav-dropdown-toggle ${groupActive ? 'active' : ''}`}
          aria-expanded={open}
          aria-controls={`nav-menu-${item.key}`}
          data-menu-toggle={item.key}
          onClick={() => setOpenMenu(open ? null : item.key)}
          onKeyDown={(e) => onToggleKeyDown(e, item.key)}
        >
          {item.label}
          <Chevron />
        </button>
        {/* Phone menu: the group is listed open under a small heading instead. */}
        <span className="nav-group-label" aria-hidden="true">{item.label}</span>
        <ul
          id={`nav-menu-${item.key}`}
          className={`nav-dropdown-menu ${item.sections ? 'nav-dropdown-menu-sections' : ''}`}
          aria-label={item.label}
          onKeyDown={(e) => onMenuKeyDown(e, item.key)}
        >
          {item.sections
            ? item.sections.map((section) => (
                <li key={section.label} className="nav-dropdown-section">
                  <span className="nav-dropdown-section-label" id={`nav-section-${item.key}-${section.label}`}>
                    {section.label}
                    {section.note && <span className="nav-dropdown-section-note"> · {section.note}</span>}
                  </span>
                  <ul className="nav-dropdown-sublist" aria-labelledby={`nav-section-${item.key}-${section.label}`}>
                    {section.children.map(renderChild)}
                  </ul>
                </li>
              ))
            : item.children.map(renderChild)}
        </ul>
      </li>
    );
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      {/* The "1,000 Aumy credits" bar was removed on every page (owner 2026-11-03: no pricing, trial or credits). */}
      {showLaunchBar && (
        <div className="launch-notice" ref={launchBarRef} role="note">
          <span className="launch-notice-text">Launching in Dubai soon! Being built for DHA and NABIDH requirements.</span>
          <button type="button" className="launch-notice-close" onClick={closeLaunchBar} aria-label="Close this notice">
            <span aria-hidden="true">×</span>
          </button>
        </div>
      )}
      <div className="container header-container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src="/aumy-waves-lockup-light.png"
                alt="Aumy by AUM AI — home"
                className="logo-image"
              />
            </Link>
          </div>

          <nav
            ref={navRef}
            id="site-nav"
            aria-label="Main"
            className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}
          >
            <ul className="nav-list">
              {NAV_ITEMS.map((item) =>
                item.children || item.sections ? (
                  renderGroup(item)
                ) : (
                  <li key={item.path} className="nav-item">{renderLink(item)}</li>
                )
              )}
            </ul>
            <div className="nav-cta">
              {/* Clinics already on Aumy sign in to the app (owner 22 Nov 2026). */}
              <a href="https://aumy.aumai.co.in/login" className="nav-login" onClick={closeMobileMenu}>
                Log in
              </a>
              {/* Owner 2026-11-28: one call to action on every page, the call with Jayesh (was the free clinic audit). */}
              <Link to={APPLY_PATH} className="btn btn-primary" onClick={closeMobileMenu}>
                {CALL_LABEL}
              </Link>
            </div>
          </nav>

          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="site-nav"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
