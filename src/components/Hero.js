import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const capabilities = [
    { icon: 'M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25', label: 'FHIR & HL7', color: '#3b82f6' },
    { icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375', label: 'Clinical Data', color: '#8b5cf6' },
    { icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3', label: 'AI & ML', color: '#06b6d4' },
    { icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z', label: 'Analytics', color: '#10b981' },
    { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623', label: 'HIPAA', color: '#f59e0b' },
    { icon: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3', label: 'Consulting', color: '#f43f5e' },
  ];

  const stats = [
    { value: '6+', label: 'EHR Integrations' },
    { value: '100+', label: 'Quality Measures Automated' },
    { value: '95%+', label: 'AI Accuracy' },
  ];

  return (
    <section className="hero">
      {/* Animated Background */}
      <div className="hero-bg">
        <div className="hero-gradient-orb orb-1"></div>
        <div className="hero-gradient-orb orb-2"></div>
        <div className="hero-gradient-orb orb-3"></div>
        <div className="hero-grid"></div>
        <div className="hero-noise"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          {/* Left Content */}
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              AI-Powered Healthcare Technology
            </div>

            <h1 className="hero-title">
              Turn Clinical Data
              <span className="hero-title-highlight"> Into Intelligence</span>
            </h1>

            <p className="hero-description">
              We build AI-powered healthcare platforms that transform how organizations manage clinical
              data, measure quality, and optimize outcomes. From clinical NLP pipelines to EHR
              integrations, quality measure engines to AI automation — we deliver production-grade
              systems at a fraction of the cost.
            </p>

            <div className="hero-cta">
              <button onClick={() => navigate('/contact')} className="btn btn-primary btn-lg">
                <span>Schedule a Consultation</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button onClick={() => navigate('/case-studies')} className="btn btn-secondary btn-lg">
                View Case Studies
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="hero-stat">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="hero-visual">
            <div className="visual-container">
              {/* Floating capability cards */}
              <div className="capabilities-grid">
                {capabilities.map((cap, index) => (
                  <div
                    key={index}
                    className={`capability-card card-${index + 1}`}
                    style={{ '--card-color': cap.color }}
                  >
                    <div className="capability-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d={cap.icon} />
                      </svg>
                    </div>
                    <span className="capability-label">{cap.label}</span>
                  </div>
                ))}
              </div>

              {/* Central glow effect */}
              <div className="visual-glow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
