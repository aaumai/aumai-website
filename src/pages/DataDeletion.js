import React from 'react';
import { PRIMARY_OFFICE } from '../config/contact';
import { LAST_UPDATED, SUBTITLE, INTRO, SECTIONS } from '../data/dataDeletion';
import { PolicySections, PolicyText } from '../components/PolicyBody';
import './Page.css';

// The words live in src/data/dataDeletion.js (shared with scripts/prerender.js).
// Renders on both the India and US builds — use the market's own contact.
const CONTACT = PRIMARY_OFFICE.email;

const DataDeletion = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Data &amp; Account Deletion</h1>
          <p className="page-subtitle">{SUBTITLE}</p>
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
            <strong>Last Updated:</strong> {LAST_UPDATED}
          </p>

          {INTRO.map((t, i) => (
            <p key={i} style={{ marginBottom: '20px' }}><PolicyText text={t} contact={CONTACT} /></p>
          ))}

          <PolicySections sections={SECTIONS} contact={CONTACT} />
        </div>
      </div>
    </div>
  );
};

export default DataDeletion;
