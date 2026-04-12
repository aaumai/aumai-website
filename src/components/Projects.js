import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  // Featured product - AUMY / AUM AI HealthSystem
  const featuredProject = {
    title: 'AUMY · AUM AI HealthSystem',
    category: 'Flagship Product · In Production',
    description: 'A voice-first AI operating system powering a production multi-tenant EHR. Ambient scribing, ICD-10 coding, medication reconciliation, and care-gap evaluation run behind a single voice interface on every screen. Click Start. Talk to the patient. Click Stop. 47 seconds later AUMY returns a signed, coded, care-gap-aware encounter.',
    features: [
      'Ambient scribe with structured SOAP, HPI, and vitals extraction',
      'ICD-10 + CPT + RxNorm coding validated against reference sets',
      'Voice-command care-gap evaluation (multi-agent eCQM engine)',
      'Visual DAG workflow engine for clinical orchestration',
      'FHIR R4 native data model with ABDM/ABHA integration',
      'Multi-tenant PostgreSQL with row-level security from day one'
    ],
    technologies: ['TypeScript', 'Next.js', 'React Native', 'PostgreSQL + RLS', 'FHIR R4', 'ABDM', 'AWS', 'Claude API', 'pgvector'],
    stats: [
      { value: '47s', label: 'Conversation to Signed Encounter' },
      { value: '1,000+', label: 'Medical Codes Pre-loaded' },
      { value: 'FHIR R4', label: 'Native Data Model' }
    ],
    color: '#8b5cf6',
    link: '/aumy',
    linkLabel: 'Explore AUMY'
  };

  const projects = [
    {
      id: 1,
      title: 'Clinical Data Warehouse & Oncology Trial Matching',
      category: 'Healthcare Data',
      description: 'Scalable data warehouse integrating clinical and trial data with advanced patient-matching logic to identify eligible oncology patients.',
      outcomes: [
        'Faster trial recruitment',
        'Accurate data integration',
        'Improved patient matching'
      ],
      technologies: ['Python', 'PostgreSQL', 'Apache Spark', 'ML', 'FHIR'],
      color: '#8b5cf6'
    },
    {
      id: 2,
      title: 'Risk Adjustment Automation & Analytics',
      category: 'AI/ML Solutions',
      description: 'Risk engine to calculate HCC and RAF scores with AI/ML models that identify under-coded chronic conditions from CMS data.',
      outcomes: [
        'Improved coding accuracy',
        'Ensured revenue integrity',
        'Reduced manual review'
      ],
      technologies: ['Python', 'TensorFlow', 'CMS Data', 'ML'],
      color: '#10b981'
    },
    {
      id: 3,
      title: 'Quality Measures Engine & Dashboard',
      category: 'Quality Reporting',
      description: 'Configurable engine to compute MIPS, HEDIS, and Value-Based Care measures with data integration from multiple EHR systems.',
      outcomes: [
        'Real-time quality visibility',
        'Automated gap closure',
        'Enhanced compliance'
      ],
      technologies: ['React.js', 'Node.js', 'Epic', 'Cerner'],
      color: '#3b82f6'
    },
    {
      id: 4,
      title: 'RCM Automation & Denial Management',
      category: 'Revenue Cycle',
      description: 'AI-powered Revenue Cycle Management platform automating claims processing, denial prediction, and payment posting for multi-specialty practices.',
      outcomes: [
        'Reduced denial rates by 35%',
        'Faster claims processing',
        'Improved clean claim rate'
      ],
      technologies: ['C#', 'SQL Server', 'Azure', 'ML', 'HL7'],
      color: '#f59e0b'
    }
  ];

  return (
    <section className="section projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">
            Featured <span className="section-title-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">
            Deep expertise in US healthcare engineering and product development. We deliver scalable,
            HIPAA-compliant platforms that drive real clinical and business outcomes.
          </p>
        </div>

        {/* Featured Project - RPM Platform */}
        <div className="featured-project" style={{ '--project-color': featuredProject.color }}>
          <div className="featured-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Featured Project
          </div>

          <div className="featured-content">
            <div className="featured-info">
              <span className="featured-category">{featuredProject.category}</span>
              <h3 className="featured-title">{featuredProject.title}</h3>
              <p className="featured-description">{featuredProject.description}</p>

              <div className="featured-features">
                <h4>Key Features</h4>
                <ul>
                  {featuredProject.features.map((feature, index) => (
                    <li key={index}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="featured-tech">
                <h4>Technologies Used</h4>
                <div className="tech-tags">
                  {featuredProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              {featuredProject.link && (
                <div className="featured-cta">
                  <Link to={featuredProject.link} className="btn btn-primary">
                    {featuredProject.linkLabel}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            <div className="featured-visual">
              <div className="featured-stats-display">
                {featuredProject.stats.map((stat, index) => (
                  <div key={index} className="featured-stat-card">
                    <span className="featured-stat-value">{stat.value}</span>
                    <span className="featured-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="featured-glow"></div>
            </div>
          </div>
        </div>

        {/* Other Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card" style={{ '--project-color': project.color }}>
              <div className="project-header">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-outcomes">
                <h4>Key Outcomes</h4>
                <ul>
                  {project.outcomes.map((outcome, index) => (
                    <li key={index}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-pill">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="projects-cta">
          <div className="cta-content">
            <h3>Ready to Build Your Healthcare Platform?</h3>
            <p>Let's discuss how we can engineer the right solution for your healthcare business.</p>
            <Link to="/contact" className="btn btn-primary">
              Start a Conversation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
