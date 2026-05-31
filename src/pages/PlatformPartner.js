import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import './AumyProduct.css';
import './AumyRevenueGenerator.css';
import './Page.css';

const PlatformPartner = () => {
  useEffect(() => {
    setPageSeo({
      title: 'White-Label Platform Partner Program — Resell AUMY Under Your Own Brand | AUM AI',
      description:
        'Agencies, voice-AI and revenue-recovery operators: run AUMY as your own white-labelled platform, exclusive to your territory, on a flat per-clinic rental. Sell the complete clinic growth engine — ads + Meta CAPI, AI receptionist, booking, recalls, reactivation, reviews, ROI dashboards and a light EHR — without building any of it.',
      canonical: 'https://aumai.co.in/platform-partner',
      image: 'https://aumai.co.in/screenshots/roi-preview.png',
    });
  }, []);

  // Platform-partner / white-label program. Positioned for agencies and
  // voice-AI / revenue-recovery operators who want to sell a COMPLETE end-to-end
  // platform under their own brand, exclusive to their territory, on a flat
  // per-clinic rental — with us as the silent platform partner behind them.
  const partnerBenefits = [
    {
      title: 'Your brand, white-labelled',
      description: 'AUMY runs under your name, your logo, your domain. Your clients see your brand end-to-end — we stay invisible. You own the relationship; we power the platform underneath it.',
      color: '#10b981',
      icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z',
    },
    {
      title: 'Exclusive in your territory',
      description: 'We partner with one leader per market. Lock your country or region as the exclusive AUMY platform partner — so you build your book without competing against other partners on your home turf.',
      color: '#3b82f6',
      icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
    },
    {
      title: 'Simple per-clinic rental',
      description: 'Pay a flat monthly rental for each clinic (tenant) you onboard — no revenue share, no per-message surprises. Price your clients however you like and keep the margin. Predictable economics that scale cleanly as you add clinics.',
      color: '#f59e0b',
      icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Sell end-to-end, not just voice',
      description: 'A voice agent alone is not enough. Offer the whole revenue engine under one roof — ads + Meta CAPI, AI receptionist, booking, no-show rebooking, recalls, dormant reactivation, reviews, attribution + ROI dashboards, and a light EHR. One platform, a complete pitch.',
      color: '#8b5cf6',
      icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
    },
    {
      title: 'We carry the tech — you scale clients',
      description: 'A battle-tested multi-tenant platform, onboarding playbooks, and engineering support are on us. You focus on signing and serving clinics; we keep the platform running, secure, and shipping new capabilities.',
      color: '#06b6d4',
      icon: 'M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z',
    },
    {
      title: 'Launch fast, look established',
      description: 'Go live with a proven, polished platform in days — not the year, the team, and the budget it would take to build this yourself. Walk into every client conversation with a complete product already behind you.',
      color: '#ec4899',
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
    },
  ];

  return (
    <div className="aumy-page rev-page">
      {/* Hero */}
      <section className="aumy-hero">
        <div className="aumy-hero-bg">
          <div className="aumy-orb aumy-orb-1"></div>
          <div className="aumy-orb aumy-orb-2"></div>
          <div className="aumy-orb aumy-orb-3"></div>
          <div className="aumy-grid"></div>
        </div>

        <div className="container">
          <div className="aumy-hero-content">
            <div className="aumy-hero-badge">
              <span className="aumy-badge-dot"></span>
              Platform Partner Program · White-Label
            </div>

            <h1 className="aumy-hero-title">
              Run AUMY as your own platform —
              <br />
              and <span className="aumy-gradient">own your territory</span>.
            </h1>

            <p className="aumy-hero-subtitle">
              Already selling to clinics — a voice agent, ads, or revenue recovery? Offer the complete
              end-to-end platform under <em>your</em> brand. We become your silent platform partner: you sign
              and serve the clinics, we power everything behind the scenes — exclusive to your territory, on a
              simple flat rental per clinic.
            </p>

            <div className="aumy-hero-cta">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Become a Platform Partner
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/revenue-generator" className="btn btn-secondary btn-lg">
                See the Product
              </Link>
            </div>

            <p className="rev-footnote" style={{ marginTop: '1rem' }}>
              Looking for AUMY for your own clinic instead?{' '}
              <Link to="/revenue-generator" className="aumy-gradient" style={{ fontWeight: 600 }}>
                Explore the Revenue Generator →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Why partner with us */}
      <section className="section aumy-caps-section" id="partner-benefits">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Partner With Us</span>
            <h2 className="section-title">Sell the whole revenue engine — without building any of it.</h2>
            <p className="section-subtitle">
              Everything a clinic needs to win and keep patients, packaged as one platform you resell under
              your own brand. You own the market and the margin; we carry the technology.
            </p>
          </div>

          <div className="aumy-caps-grid">
            {partnerBenefits.map((cap, i) => (
              <div key={i} className="aumy-cap-card" style={{ '--cap-color': cap.color }}>
                <div className="aumy-cap-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={cap.icon} />
                  </svg>
                </div>
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
              </div>
            ))}
          </div>

          <div className="aumy-demo-callout">
            <div className="aumy-demo-callout-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="aumy-demo-callout-body">
              <strong>A complete revenue platform, under your brand — exclusive to your territory, for a flat rental per clinic.</strong>
              <p>
                You set the price your clients pay and keep the margin. We handle the platform, security, and
                roadmap. It is the fastest way to go from selling one feature to owning the whole solution in
                your market — without building or maintaining any of it yourself.
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg" style={{ marginTop: '1rem' }}>
                Become a Platform Partner
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section aumy-cta-section">
        <div className="container">
          <div className="aumy-cta-card">
            <h2>Own your market with AUMY</h2>
            <p>
              Tell us your territory and the clinics you already serve. We will show you the full platform,
              the white-label setup, and the per-clinic economics — so you can start selling a complete
              revenue engine under your own brand.
            </p>
            <div className="aumy-cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Talk to Us About Partnering
              </Link>
              <Link to="/revenue-generator" className="btn btn-secondary btn-lg">
                See What You&rsquo;d Be Selling
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlatformPartner;
