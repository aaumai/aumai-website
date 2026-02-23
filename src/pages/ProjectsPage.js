import React from 'react';
import Projects from '../components/Projects';
import './Page.css';

const ProjectsPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Our Healthcare Solutions</h1>
          <p className="page-subtitle">
            Comprehensive expertise in digital healthcare solutions delivered for leading healthcare organizations
          </p>
        </div>
      </div>
      <Projects />
    </div>
  );
};

export default ProjectsPage;
