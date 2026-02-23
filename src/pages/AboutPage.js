import React from 'react';
import About from '../components/About';
import './Page.css';

const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">About AUM AI Healthcare Solutions</h1>
          <p className="page-subtitle">
            Specialized healthcare technology company focused on delivering innovative solutions
          </p>
        </div>
      </div>
      <About />
    </div>
  );
};

export default AboutPage;
