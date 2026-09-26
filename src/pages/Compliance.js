import React, { useEffect } from 'react';
import { setPageSeo } from '../utils/seo';
import { TITLE, DESCRIPTION, HEADLINE, SUBTITLE, INTRO, SECTIONS, DISCLAIMER, CONTACT_EMAIL } from '../data/compliance';
import './Page.css';

// Dedicated trust document. Linked from /revenue-generator, /platform-partner,
// and the footer. The words live in src/data/compliance.js (shared with the
// crawler HTML) and are accuracy-checked against the EHR project's
// PROJECT_INFO.md — only built capabilities are claimed. Regulatory frameworks
// are framed as "aligned / aware / ready", never "certified", per the handover
// accuracy guardrails. The disclaimer is mandatory and must not be removed.
const Compliance = () => {
  useEffect(() => {
    setPageSeo({
      title: TITLE,
      description: DESCRIPTION,
      canonical: 'https://aumai.co.in/compliance',
      image: 'https://aumai.co.in/screenshots/roi-preview.png',
    });
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">{HEADLINE}</h1>
          <p className="page-subtitle">{SUBTITLE}</p>
        </div>
      </div>

      <div className="container lux-doc">
        <p className="lux-doc-intro">{INTRO}</p>

        {SECTIONS.map((s) => (
          <section key={s.title} className="lux-doc-section">
            <h2>{s.title}</h2>
            {s.lead && <p>{s.lead}</p>}
            <ul>
              {s.items.map(([k, v]) => (
                <li key={k + v.slice(0, 20)}>{k && <strong>{k} </strong>}{v}</li>
              ))}
            </ul>
          </section>
        ))}

        <p className="lux-doc-disclaimer">{DISCLAIMER}</p>
        <p className="lux-doc-contact">
          Questions from your IT or compliance team? Email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
};

export default Compliance;
