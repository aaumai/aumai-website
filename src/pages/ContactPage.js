import React from 'react';
import Contact from '../components/Contact';
import './Page.css';

const ContactPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">
            Ready to transform your healthcare technology? Let's discuss your project requirements.
          </p>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default ContactPage;
