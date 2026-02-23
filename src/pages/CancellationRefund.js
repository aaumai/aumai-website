import React from 'react';
import './Page.css';

const CancellationRefund = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Cancellation & Refund Policy</h1>
          <p className="page-subtitle">
            Our policy regarding cancellations and refunds
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
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>Cancellation Policy</h2>
            <p style={{ marginBottom: '15px' }}>
              You may cancel a service agreement or project contract subject to the terms specified in your individual 
              service agreement. Cancellation requests must be submitted in writing to our support team.
            </p>
            <p style={{ marginBottom: '15px' }}>
              <strong>Cancellation Timeline:</strong>
            </p>
            <ul style={{ marginLeft: '30px', marginBottom: '15px' }}>
              <li>Cancellations made before project commencement may be eligible for full refund</li>
              <li>Cancellations made after project commencement are subject to work completed and costs incurred</li>
              <li>Specific cancellation terms are outlined in your service agreement</li>
            </ul>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>Refund Policy</h2>
            <p style={{ marginBottom: '15px' }}>
              Refund eligibility is determined on a case-by-case basis and is subject to the terms of your service agreement:
            </p>
            <ul style={{ marginLeft: '30px', marginBottom: '15px' }}>
              <li><strong>Full Refund:</strong> May be available if cancellation occurs before project commencement and no work has been initiated</li>
              <li><strong>Partial Refund:</strong> May be available based on work completed and costs incurred up to the cancellation date</li>
              <li><strong>No Refund:</strong> If substantial work has been completed or deliverables have been provided</li>
            </ul>
            <p style={{ marginBottom: '15px' }}>
              Refund processing time is typically 7-14 business days from approval, depending on the payment method used.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>Service-Specific Terms</h2>
            <p style={{ marginBottom: '15px' }}>
              Different services may have specific cancellation and refund terms:
            </p>
            <ul style={{ marginLeft: '30px', marginBottom: '15px' }}>
              <li>Consultation services: Subject to cancellation notice requirements</li>
              <li>Development projects: Based on milestone completion and deliverables</li>
              <li>Ongoing support services: May require 30-day notice for cancellation</li>
            </ul>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>How to Request Cancellation or Refund</h2>
            <p style={{ marginBottom: '15px' }}>
              To request a cancellation or refund, please contact us:
            </p>
            <p style={{ marginBottom: '15px' }}>
              <strong>Email:</strong> jayesh.chaudhari@aumai.co.in<br />
              <strong>Phone:</strong> +91 800 718 9868
            </p>
            <p style={{ marginBottom: '15px' }}>
              Please include your project/service reference number and reason for cancellation/refund request. 
              We will review your request and respond within 5-7 business days.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>Dispute Resolution</h2>
            <p style={{ marginBottom: '15px' }}>
              If you are not satisfied with our resolution, we encourage open communication to resolve any disputes. 
              We are committed to fair and transparent resolution of all matters.
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
              <strong>Important:</strong> Specific cancellation and refund terms are detailed in your individual service agreement. 
              Please refer to your contract for exact terms applicable to your project or service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund;

