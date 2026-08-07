import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    { path: '/leak-calculator', label: 'Leak check' },
    { path: '/contact', label: 'Contact' },
    { path: 'https://aumyai.com/', label: 'For USA', external: true },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src="/PNG-01-01.png"
                alt="AUM AI Healthcare Solutions"
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
