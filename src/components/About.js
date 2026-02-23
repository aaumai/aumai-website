import React from 'react';
import './About.css';

const About = () => {
  const stats = [
    { value: '50+', label: 'Healthcare Projects', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { value: '25+', label: 'EHR Integrations', icon: 'M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25' },
    { value: '100%', label: 'HIPAA Compliant', icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' },
    { value: '24/7', label: 'Support Available', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' }
  ];

  const features = [
    {
      title: 'Healthcare Focused',
      description: 'Deep expertise in healthcare IT, compliance requirements, and industry standards like FHIR, HL7, and HIPAA.',
      icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
      color: '#3b82f6'
    },
    {
      title: 'Agile Delivery',
      description: 'Modern development practices with iterative delivery, ensuring you see progress and can provide feedback throughout.',
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
      color: '#f59e0b'
    },
    {
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with HIPAA compliance built into every solution we deliver.',
      icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
      color: '#10b981'
    },
    {
      title: 'Partnership Approach',
      description: 'We work as your technology partner, not just a vendor. Your success is our success.',
      icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
      color: '#8b5cf6'
    }
  ];

  const technologies = [
    { name: 'React.js', category: 'frontend' },
    { name: 'React Native', category: 'mobile' },
    { name: 'Node.js', category: 'backend' },
    { name: 'Python', category: 'backend' },
    { name: 'Java', category: 'backend' },
    { name: 'C#', category: 'backend' },
    { name: 'SQL Server', category: 'database' },
    { name: 'PostgreSQL', category: 'database' },
    { name: 'MongoDB', category: 'database' },
    { name: 'AWS', category: 'cloud' },
    { name: 'Azure', category: 'cloud' },
    { name: 'Docker', category: 'devops' },
    { name: 'Kubernetes', category: 'devops' },
    { name: 'FHIR R4', category: 'healthcare' },
    { name: 'HL7', category: 'healthcare' },
    { name: 'Epic', category: 'healthcare' },
    { name: 'Cerner', category: 'healthcare' }
  ];

  return (
    <section className="section about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">About Us</span>
          <h2 className="section-title">
            Your Healthcare <span className="section-title-gradient">Engineering & Consulting Partner</span>
          </h2>
          <p className="section-subtitle">
            We combine deep US healthcare domain expertise with engineering excellence
            to build platforms that drive clinical outcomes and business growth.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={stat.icon} />
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="features-section">
          <h3 className="features-title">Why Choose Us</h3>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card" style={{ '--feature-color': feature.color }}>
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={feature.icon} />
                  </svg>
                </div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="tech-section">
          <h3 className="tech-title">Technologies & Standards</h3>
          <p className="tech-subtitle">Our team is proficient across the full healthcare technology stack</p>
          <div className="tech-cloud">
            {technologies.map((tech, index) => (
              <span key={index} className={`tech-item tech-${tech.category}`}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
