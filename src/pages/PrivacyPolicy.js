import React from 'react';
import { IS_US, PRIMARY_OFFICE } from '../config/contact';
import { LAST_UPDATED, SUBTITLE, INTRO, SECTIONS, CONTACT_HEADING, CONTACT_LEAD } from '../data/privacyPolicy';
import { PolicySections, PolicyText } from '../components/PolicyBody';
import './Page.css';

// The words live in src/data/privacyPolicy.js (shared with scripts/prerender.js,
// so the crawler HTML Meta's checker reads carries the full policy).

// The registered data controller differs by market (India Pvt Ltd vs US LLC).
const CONTROLLER_ENTITY = IS_US ? 'AUM AI Healthcare Technology LLC' : 'Aaumai Healthcare Solutions PVT LTD';
const CONTROLLER_SITE = IS_US ? 'https://aumyai.com' : 'https://aumai.co.in';

const PrivacyPolicy = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Privacy Policy</h1>
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
            <p key={i} style={{ marginBottom: '20px' }}><PolicyText text={t} /></p>
          ))}

          <PolicySections sections={SECTIONS} />

          <section style={{ marginBottom: '10px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>{CONTACT_HEADING}</h2>
            <p style={{ marginBottom: '15px' }}>{CONTACT_LEAD}</p>
            <p style={{ marginBottom: '5px' }}>
              <strong>{CONTROLLER_ENTITY}</strong>
            </p>
            <p style={{ marginBottom: '5px' }}>
              Email: <a href={`mailto:${PRIMARY_OFFICE.email}`}>{PRIMARY_OFFICE.email}</a>
            </p>
            <p style={{ marginBottom: '5px' }}>
              Website: <a href={CONTROLLER_SITE}>{CONTROLLER_SITE}</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
