import React from 'react';
import './Page.css';

const ShippingPolicy = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Shipping Policy</h1>
          <p className="page-subtitle">
            Information about our shipping and delivery policies
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
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>Digital Services Delivery</h2>
            <p style={{ marginBottom: '15px' }}>
              AUM AI Healthcare Solutions provides digital healthcare technology services. 
              As our services are digital in nature, there is no physical shipping involved.
            </p>
            <p style={{ marginBottom: '15px' }}>
              Upon completion of service delivery or project milestones, you will receive:
            </p>
            <ul style={{ marginLeft: '30px', marginBottom: '15px' }}>
              <li>Digital deliverables via secure file transfer or cloud storage</li>
              <li>Access credentials to development environments or systems</li>
              <li>Documentation and technical specifications</li>
              <li>Project reports and completion certificates</li>
            </ul>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>Delivery Timeline</h2>
            <p style={{ marginBottom: '15px' }}>
              Delivery timelines are specified in individual service agreements and project contracts. 
              Standard delivery times vary based on the scope and complexity of the project.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>Contact</h2>
            <p style={{ marginBottom: '15px' }}>
              For questions about delivery or shipping, please contact us at:
            </p>
            <p style={{ marginBottom: '15px' }}>
              <strong>Email:</strong> jayesh.chaudhari@aumai.co.in<br />
              <strong>Phone:</strong> +91 800 718 9868
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
              <strong>Note:</strong> For detailed shipping information specific to your project, 
              please refer to your service agreement or contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;

