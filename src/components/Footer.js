import React from 'react';
import { Link } from 'react-router-dom';
import { OFFICES, ICON } from '../config/contact';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Contact offices come from the shared config: US build shows the US office
  // only; India build shows both India and US.
  const multiOffice = OFFICES.length > 1;

  const services = [
    'AI Receptionist — 24/7 Booking',
    'Lead Capture — Every Channel',
    'No-show Recovery & Recalls',
    'Dormant-Patient Reactivation',
    'Reviews & Local SEO',
    'Smarter Ads (Conversion API)'
  ];

  // Dental-growth pages only. The legacy engineering/consulting pages (About,
  // Services, Case Studies, Insights, Engineering Partner) keep their routes
  // but are intentionally not linked anywhere on the AUMY site.
  const company = [
    { label: 'Aumy — How It Works', path: '/revenue-generator' },
    { label: 'AI Receptionist', path: '/ai-receptionist' },
    { label: 'WhatsApp Automation', path: '/whatsapp-automation-for-clinics' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Watch Demo Videos', path: '/demos' },
    { label: 'Dental Practice Growth Hub', path: '/growth' },
    { label: 'Podcast — Be a Guest', path: '/podcast' },
    { label: 'Facebook & Instagram Receptionist', path: '/facebook-instagram' },
    { label: 'Free Clinic Growth Audit', path: '/growth-audit' },
    { label: 'Revenue Leak Calculator', path: '/leak-calculator' },
    { label: 'Missed Call Calculator', path: '/missed-call-calculator' },
    { label: 'Platform Partners', path: '/platform-partner' },
    { label: 'Contact', path: '/contact' }
  ];

  const legal = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Compliance', path: '/compliance' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Shipping Policy', path: '/shipping' },
    { label: 'Cancellation & Refund', path: '/refund' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/aumy-lockup-dark.png" alt="Aumy by AUM AI" />
            </Link>
            <p className="footer-byline">an AUM AI product</p>
            <p className="footer-tagline">
              The AI Patient Journey &amp; Revenue Operating System for Dental Clinics. Turn more
              enquiries into patients, deliver better post-treatment care, and bring patients back —
              one system across the entire patient journey.
            </p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/chaudhari-jayesh-b9762a3b/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="footer-column">
            <h4>What AUMY Does</h4>
            <ul>
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              {company.map((item, index) => (
                <li key={index}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-column">
            <h4>Contact</h4>
            <div className="footer-contact">
              {OFFICES.map((office) => (
                <div className="footer-office" key={office.key}>
                  {multiOffice && <p className="footer-office-name">{office.label}</p>}
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={ICON.mail} />
                    </svg>
                    <a href={`mailto:${office.email}`}>{office.email}</a>
                  </div>
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={ICON.phone} />
                    </svg>
                    <a href={office.phoneTel}>{office.phone}</a>
                  </div>
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={ICON.pin} />
                    </svg>
                    <span>{office.entity} · {office.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} AUM AI Healthcare Solutions. All rights reserved.</p>
          <div className="footer-legal">
            {legal.map((item, index) => (
              <Link key={index} to={item.path}>{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
