import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import caseStudies from '../data/caseStudies';
import './Page.css';
import './CaseStudiesPage.css';

const CaseStudiesPage = () => {
  useEffect(() => {
    document.title = 'Case Studies | AUM AI Healthcare Solutions';
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Case Studies</h1>
          <p className="page-subtitle">
            Real-world healthcare technology solutions we have engineered for leading organizations
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="case-studies-list">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                to={`/case-studies/${cs.slug}`}
                className="case-study-card"
              >
                <div className="cs-card-content">
                  <div className="cs-card-info">
                    <span
                      className="cs-category-badge"
                      style={{ backgroundColor: cs.color }}
                    >
                      {cs.category}
                    </span>
                    <h2 className="cs-card-title">{cs.title}</h2>
                    <p className="cs-card-subtitle">{cs.subtitle}</p>
                    <p className="cs-card-summary">{cs.summary}</p>
                    <span className="cs-card-link">
                      View Case Study
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="cs-card-stats">
                    {cs.stats.map((stat, i) => (
                      <div key={i} className="cs-stat">
                        <span className="cs-stat-value">{stat.value}</span>
                        <span className="cs-stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;
