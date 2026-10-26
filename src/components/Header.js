import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CreditsBar } from './StartInApp';
import './Header.css';

// The menu (owner 2026-10-19: "too congested — logo to the left, space the menus").
// Six top-level items plus the Free Clinic Audit button; Home is the logo. The two
// groups open on hover or click on laptops and are listed open in the phone menu.
// Every page here is also in the footer, and in scripts/prerender.js SITE_LINKS.
// "Product & services" (owner 2026-10-23): Aumy, the main product, first; then the three
// services. A group with `sections` shows them as labelled columns on laptops and as labelled
// lists in the phone menu.
const NAV_ITEMS = [
  {
    key: 'product',
    label: 'Product & services',
    sections: [
      {
        label: 'Aumy',
        note: 'our main product',
        children: [
          { path: '/revenue-generator', label: 'How it works', hint: 'Every patient, from first call to recall' },
          { path: '/demos', label: 'Watch demos', hint: 'Short videos of Aumy at work' },
          { path: '/switch', label: 'Switching software?', hint: 'Move from your current system' },
        ],
      },
      {
        label: 'Services',
        children: [
          { path: '/managed-follow-ups', label: 'Managed follow-ups', hint: 'We follow up your enquiries and patients, by WhatsApp and calls' },
          { path: '/dental-seo', label: 'Dental SEO', hint: 'More patients find you on Google, from India and abroad' },
          { path: '/clinic-websites', label: 'Dental websites', hint: 'Websites built to be found on Google' },
          { path: '/dental-ads', label: 'Dental ads (Meta & Google)', hint: 'Ads judged by booked patients, not leads' },
        ],
      },
    ],
  },
  { path: '/modules', label: 'Modules' },
  { path: '/ai-receptionist', label: 'AI receptionist' },
  { path: '/pricing', label: 'Pricing' },
  {
    key: 'resources',
    label: 'Resources',
    children: [
      { path: '/growth', label: 'Growth Hub', hint: 'Guides for growing your practice' },
      { path: '/podcast', label: 'Podcast', hint: 'Be a guest on the show' },
      { path: '/leak-calculator', label: '60-second check', hint: 'What slips through the cracks' },
    ],
  },
  // The Full Chair Method masterclass (owner 2026-10-19).
  { path: '/masterclass', label: 'Masterclass', badge: 'New' },
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
      {/* Owner 2026-10-09: "1,000 Aumy credits to try each product" right at the top,
          linking to this phone's app store. Mirrored in scripts/prerender.js.
          Owner 2026-10-22: hidden on the home page only (outcomes as a service); every other page keeps it. */}
      {location.pathname !== '/' && <CreditsBar />}
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
              <Link to="/growth-audit" className="btn btn-primary" onClick={closeMobileMenu}>
                Free Clinic Audit
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
