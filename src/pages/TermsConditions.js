import React from 'react';
import { PRIMARY_OFFICE } from '../config/contact';
import './Page.css';

const TermsConditions = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Terms and Conditions</h1>
          <p className="page-subtitle">
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>
      <div className="container" style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '12px', 
          padding: '40px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          lineHeight: '1.8',
          color: '#334155'
        }}>
          <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
          
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>1. Acceptance of Terms</h2>
            <p style={{ marginBottom: '15px' }}>
              By accessing and using the services of AUM AI Healthcare Solutions, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>2. Services</h2>
            <p style={{ marginBottom: '15px' }}>
              AUM AI Healthcare Solutions provides healthcare technology services including but not limited to:
            </p>
            <ul style={{ marginLeft: '30px', marginBottom: '15px' }}>
              <li>EHR Integrations and Custom Development</li>
              <li>RCM Software Solutions</li>
              <li>FHIR & HL7 Implementation</li>
              <li>Clinical Data Warehouses</li>
              <li>AI Automation Services</li>
            </ul>
            <p style={{ marginBottom: '15px' }}>
              All services are provided subject to individual service agreements and project contracts.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>3. Payment Terms</h2>
            <p style={{ marginBottom: '15px' }}>
              Payment terms are specified in individual service agreements. Payments are typically processed through 
              secure payment gateways. All prices are in the currency specified in your agreement.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>4. Intellectual Property</h2>
            <p style={{ marginBottom: '15px' }}>
              All intellectual property rights in the services and deliverables remain with AUM AI Healthcare Solutions 
              unless otherwise specified in your service agreement. Client data and proprietary information remain the 
              property of the client.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>5. Confidentiality</h2>
            <p style={{ marginBottom: '15px' }}>
              We maintain strict confidentiality regarding client information and project details in accordance with 
              applicable privacy laws and healthcare regulations, including HIPAA compliance where applicable.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>6. Limitation of Liability</h2>
            <p style={{ marginBottom: '15px' }}>
              AUM AI Healthcare Solutions shall not be liable for any indirect, incidental, special, or consequential 
              damages arising out of or in connection with the use of our services.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>7. Contact Information</h2>
            <p style={{ marginBottom: '15px' }}>
              For questions about these terms, please contact us:
            </p>
            <p style={{ marginBottom: '15px' }}>
              <strong>Email:</strong> {PRIMARY_OFFICE.email}<br />
              <strong>Phone:</strong> {PRIMARY_OFFICE.phone}
            </p>
          </section>

          <div style={{ 
            marginTop: '40px', 
            padding: '20px', 
            background: '#f1f5f9', 
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
              <strong>Note:</strong> These terms may be updated from time to time. Please review this page periodically 
              for any changes. Your continued use of our services after changes are posted constitutes acceptance of those changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;

