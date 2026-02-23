import React from 'react';
import Services from '../components/Services';
import './Page.css';

const ServicesPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Our Healthcare Solutions</h1>
          <p className="page-subtitle">
            Comprehensive development services tailored for the US healthcare industry
          </p>
        </div>
      </div>
      <Services />
    </div>
  );
};

export default ServicesPage;
