import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './Home.css';

const Home = () => {
  const advantages = [
    {
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
      title: 'AI-Accelerated Development',
      description:
        'We leverage AI across every phase of the SDLC — from architecture and code generation to testing and documentation. What takes traditional teams months, we deliver in weeks.',
      color: '#3b82f6',
    },
    {
      icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
      title: 'Fraction of the Cost',
      description:
        'A lean expert team augmented by AI delivers the output of a 20-person engineering department. You get enterprise-grade quality without the enterprise price tag.',
      color: '#10b981',
    },
    {
      icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
      title: 'Deep Healthcare Expertise',
      description:
        'AI accelerates execution, but domain expertise drives the architecture. We bring years of hands-on experience with FHIR, HL7, HIPAA, risk adjustment, and clinical workflows.',
      color: '#8b5cf6',
    },
  ];

  return (
    <div className="home-page">
      <Hero />

      {/* AI-Accelerated Engineering Section */}
      <section className="section home-ai-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              Our Approach
            </span>
            <h2 className="section-title">AI-Accelerated Engineering</h2>
            <p className="section-subtitle">
              We combine deep healthcare domain expertise with AI-powered development to deliver
              production-grade platforms faster and at a fraction of traditional costs.
            </p>
          </div>

          <div className="home-advantages-grid">
            {advantages.map((adv, index) => (
              <div key={index} className="home-advantage-card" style={{ '--adv-color': adv.color }}>
                <div className="home-advantage-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={adv.icon} />
                  </svg>
                </div>
                <h3 className="home-advantage-title">{adv.title}</h3>
                <p className="home-advantage-desc">{adv.description}</p>
              </div>
            ))}
          </div>

          <div className="home-ai-cta">
            <Link to="/case-studies" className="btn btn-primary">
              See It in Action
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
