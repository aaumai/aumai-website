import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setNoindex } from '../utils/seo';
import { NOT_FOUND } from '../data/notFound';
import './HomeClinic.css';

// Unknown route (13 Nov 2026): never the home page again. Words: src/data/notFound.js (also build/404.html).
const NotFoundPage = () => {
  useEffect(() => {
    document.title = NOT_FOUND.title;
    return setNoindex();
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-section">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">{NOT_FOUND.eyebrow}</span>
          <h1 className="ch-h2">{NOT_FOUND.h1}</h1>
          <p className="ch-lead">{NOT_FOUND.body}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gap: 10 }}>
            {NOT_FOUND.links.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label} →</Link></li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
