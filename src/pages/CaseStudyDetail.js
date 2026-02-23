import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import caseStudies from '../data/caseStudies';
import './Page.css';
import './CaseStudiesPage.css';

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const cs = caseStudies.find((c) => c.slug === slug);

  useEffect(() => {
    if (cs) {
      document.title = `${cs.title} | AUM AI Healthcare Solutions`;
    }
  }, [cs]);

  if (!cs) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <div className="page-container">
      {/* Hero */}
      <div className="page-header cs-detail-header">
        <div className="container">
          <Link to="/case-studies" className="cs-back-link">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Case Studies
          </Link>
          <span
            className="cs-category-badge"
            style={{ backgroundColor: cs.color }}
          >
            {cs.category}
          </span>
          <h1 className="page-title">{cs.title}</h1>
          <p className="page-subtitle">{cs.subtitle}</p>
          <div className="cs-hero-stats">
            {cs.stats.map((stat, i) => (
              <div key={i} className="cs-hero-stat">
                <span className="cs-hero-stat-value">{stat.value}</span>
                <span className="cs-hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Challenge */}
      <section className="section">
        <div className="container cs-section">
          <h2 className="cs-section-title">The Challenge</h2>
          <p className="cs-section-text">{cs.problem}</p>
        </div>
      </section>

      {/* Our Solution */}
      <section className="section section-dark">
        <div className="container cs-section">
          <h2 className="cs-section-title cs-section-title-light">
            Our Solution
          </h2>
          <p className="cs-section-text cs-section-text-light">
            {cs.solution}
          </p>
        </div>
      </section>

      {/* Architecture */}
      <section className="section">
        <div className="container cs-section">
          <h2 className="cs-section-title">Architecture</h2>
          <div className="cs-architecture">
            {cs.architecture.layers.map((layer, i) => (
              <div key={i} className="cs-arch-layer">
                <div className="cs-arch-layer-number">{i + 1}</div>
                <div className="cs-arch-layer-content">
                  <h3 className="cs-arch-layer-name">{layer.name}</h3>
                  <p className="cs-arch-layer-desc">{layer.description}</p>
                  <span className="cs-arch-layer-tech">{layer.tech}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section section-dark">
        <div className="container cs-section">
          <h2 className="cs-section-title cs-section-title-light">
            Technology Stack
          </h2>
          <div className="cs-tech-grid">
            {cs.techStack.map((group, i) => (
              <div key={i} className="cs-tech-group">
                <h4 className="cs-tech-category">{group.category}</h4>
                <div className="cs-tech-tags">
                  {group.items.map((item, j) => (
                    <span key={j} className="cs-tech-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section">
        <div className="container cs-section">
          <h2 className="cs-section-title">Key Features</h2>
          <ul className="cs-features-list">
            {cs.features.map((feature, i) => (
              <li key={i} className="cs-feature-item">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent-emerald)"
                  strokeWidth="2.5"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Business Outcomes */}
      <section className="section section-dark">
        <div className="container cs-section">
          <h2 className="cs-section-title cs-section-title-light">
            Business Outcomes
          </h2>
          <div className="cs-outcomes-grid">
            {cs.outcomes.map((outcome, i) => (
              <div key={i} className="cs-outcome-card">
                <span className="cs-outcome-metric">{outcome.metric}</span>
                <p className="cs-outcome-desc">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container cs-section" style={{ textAlign: 'center' }}>
          <h2 className="cs-section-title">
            Ready to Build Something Similar?
          </h2>
          <p className="cs-section-text" style={{ marginBottom: '2rem' }}>
            Let us discuss how we can engineer a solution tailored to your
            healthcare organization.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail;
