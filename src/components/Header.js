import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ONBOARDING_NOTICE } from '../config/onboardingNotice';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const noticeRef = useRef(null);

  // The notice sits inside the fixed header, so the page below must be pushed
  // down by its real height (it wraps to two lines on phones). --notice-h is
  // read by .App in App.css.
  useEffect(() => {
    const el = noticeRef.current;
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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // `external: true` renders a plain <a> — react-router's <Link> would treat an
  // absolute URL as an in-app path and route to a 404 instead of leaving the site.
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/revenue-generator', label: 'How it works' },
    { path: '/demos', label: 'Watch demos' },
    { path: '/leak-calculator', label: 'Leak check' },
    { path: '/switch', label: 'Switching software?' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/growth', label: 'Growth Hub' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="onboarding-notice" ref={noticeRef} role="status">
        <div className="container">
          {ONBOARDING_NOTICE.banner}{' '}
          <Link to="/contact" className="onboarding-notice-link" onClick={closeMobileMenu}>
            Join the waitlist
          </Link>
          {' '}and we&rsquo;ll reach out when onboarding reopens.
        </div>
      </div>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src="/aumy-lockup-light.png"
                alt="Aumy by AUM AI"
                className="logo-image"
              />
            </Link>
          </div>

          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {navLinks.map((link) =>
                link.external ? (
                  <li key={link.path}>
                    {/* Crawlable cross-market link: a real href, no rel="nofollow",
                        so Google can follow aumai.co.in -> aumyai.com and back. */}
                    <a href={link.path} className="nav-link" onClick={closeMobileMenu}>
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`nav-link ${
                        link.path === '/'
                          ? location.pathname === '/'
                            ? 'active'
                            : ''
                          : location.pathname.startsWith(link.path)
                            ? 'active'
                            : ''
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
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
