import React from 'react';
import './Services.css';

const Services = () => {
  const serviceCategories = [
    {
      id: 'platform-engineering',
      category: 'Healthcare Platform Engineering',
      description: 'End-to-end product development and maintenance for healthcare technology platforms',
      icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
      color: '#f59e0b',
      services: [
        {
          title: 'Healthcare Product Development',
          description: 'Build and maintain healthcare platforms from architecture to deployment.',
          features: ['Platform Architecture', 'Full-Stack Development', 'DevOps & CI/CD', 'Ongoing Maintenance']
        },
        {
          title: 'Compliance-Ready Engineering',
          description: 'Build HIPAA-compliant, CMS-ready systems with security built in from day one.',
          features: ['HIPAA Compliance', 'CMS Readiness', 'Security Engineering', 'Audit Support']
        },
        {
          title: 'Value-Based Care Platforms',
          description: 'Engineering solutions for quality reporting, risk adjustment, and population health.',
          features: ['Quality Measures Engines', 'Risk Adjustment Systems', 'Population Health Platforms', 'Care Gap Analytics']
        }
      ]
    },
    {
      id: 'integration',
      category: 'Healthcare Integration',
      description: 'Connect systems, enable interoperability, and streamline data exchange',
      icon: 'M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25',
      color: '#3b82f6',
      services: [
        {
          title: 'EHR Integrations',
          description: 'Seamless integration with Epic, Cerner, Allscripts, and 50+ other EHR systems.',
          features: ['Epic MyChart', 'Cerner PowerChart', 'Allscripts TouchWorks', 'Custom Adapters']
        },
        {
          title: 'FHIR R4 & HL7',
          description: 'Expert implementation of healthcare interoperability standards.',
          features: ['FHIR R4 APIs', 'HL7 v2.x/v3', 'CDA Documents', 'SMART on FHIR']
        },
        {
          title: 'Healthcare APIs',
          description: 'Build secure, scalable APIs for healthcare data exchange.',
          features: ['RESTful APIs', 'OAuth 2.0', 'Bulk FHIR', 'Webhooks']
        }
      ]
    },
    {
      id: 'development',
      category: 'Product Engineering',
      description: 'Custom healthcare software engineered for your specific needs',
      icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
      color: '#8b5cf6',
      services: [
        {
          title: 'RPM & Telehealth Platforms',
          description: 'Remote Patient Monitoring and telehealth solutions for chronic care management.',
          features: ['Vitals Monitoring', 'Clinical Alerts', 'Patient Apps', 'CMS Billing Codes']
        },
        {
          title: 'RCM & Revenue Optimization',
          description: 'Revenue Cycle Management solutions for better financial outcomes.',
          features: ['Claims Processing', 'Denial Management', 'Payment Posting', 'Analytics']
        },
        {
          title: 'Quality Measures & Reporting',
          description: 'Platforms for MIPS, HEDIS, and value-based care reporting.',
          features: ['MIPS Reporting', 'HEDIS Measures', 'Quality Dashboards', 'Gap Analysis']
        }
      ]
    },
    {
      id: 'data',
      category: 'Data & Analytics',
      description: 'Transform healthcare data into actionable insights',
      icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375',
      color: '#06b6d4',
      services: [
        {
          title: 'Clinical Data Warehouses',
          description: 'Centralized repositories for all your clinical data.',
          features: ['ETL Pipelines', 'Data Quality', 'HIPAA Compliant', 'Real-time Sync']
        },
        {
          title: 'Risk Adjustment & HCC',
          description: 'AI-powered HCC coding and RAF score optimization.',
          features: ['HCC Coding', 'RAF Scores', 'CMS Data Analytics', 'Revenue Integrity']
        },
        {
          title: 'Population Health Analytics',
          description: 'Data-driven insights for population health management.',
          features: ['Risk Stratification', 'Care Gap Analysis', 'Predictive Models', 'Reporting']
        }
      ]
    },
    {
      id: 'ai',
      category: 'AI & Automation',
      description: 'Leverage artificial intelligence to transform healthcare operations',
      icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3',
      color: '#10b981',
      services: [
        {
          title: 'Clinical NLP & AI',
          description: 'Natural Language Processing for clinical documentation and coding.',
          features: ['Clinical NLP', 'Auto-Coding', 'Document Processing', 'Coding Assist']
        },
        {
          title: 'Workflow Automation',
          description: 'Intelligent automation for clinical and administrative workflows.',
          features: ['Prior Auth Automation', 'Scheduling', 'Claims Processing', 'Care Coordination']
        },
        {
          title: 'Security & Compliance',
          description: 'Enterprise-grade security with full HIPAA compliance.',
          features: ['HIPAA Compliance', 'SOC 2 Type II', 'Encryption', 'Audit Logs']
        }
      ]
    }
  ];

  return (
    <section className="section services-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">
            Healthcare <span className="section-title-gradient">Engineering & Development</span>
          </h2>
          <p className="section-subtitle">
            End-to-end healthcare technology engineering for US healthcare organizations.
            From platform development to EHR integrations — we help you build, deploy, and scale.
          </p>
        </div>

        <div className="services-categories">
          {serviceCategories.map((category, catIndex) => (
            <div key={category.id} className="service-category" style={{ '--category-color': category.color }}>
              <div className="category-header">
                <div className="category-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={category.icon} />
                  </svg>
                </div>
                <div className="category-info">
                  <h3 className="category-title">{category.category}</h3>
                  <p className="category-description">{category.description}</p>
                </div>
              </div>

              <div className="services-grid">
                {category.services.map((service, servIndex) => (
                  <div key={servIndex} className="service-card">
                    <h4 className="service-title">{service.title}</h4>
                    <p className="service-description">{service.description}</p>
                    <ul className="service-features">
                      {service.features.map((feature, featIndex) => (
                        <li key={featIndex}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
