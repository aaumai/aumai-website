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
            Tell us what you need — a growth strategy call for your clinic, or a build partner for
            your product. We reply within 24 hours.
          </p>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default ContactPage;
