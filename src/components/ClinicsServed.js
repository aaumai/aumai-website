import React from 'react';
import { clinicsServed, consentedClinics, servedCities } from '../data/clinicsServed';
import './ClinicsServed.css';

/**
 * "Dental clinics Aumy serves" — the trust strip on the homepage.
 *
 * TWO STATES, and which one shows is decided by CONSENT, never by design
 * preference:
 *
 *   logos   only the clinics that have given written permission to be named
 *           (MSA §10A India / §9A US). Verbal is fine to ask, but it gets
 *           confirmed in writing before a name appears here.
 *   cities  the fallback, and what ships today: the real cities we serve, no
 *           clinic named. True, verifiable, and needs nobody's permission.
 *
 * Our first four clinics signed BEFORE that clause existed, so none is covered
 * by their agreement. Holding a clinic's logo is not consent either — those
 * were given so we could brand THEIR patient messages. Naming a dental clinic
 * as our customer tells the world their patient records sit on our system,
 * which is a statement about them, not about us.
 *
 * So the section goes live now in its honest form and upgrades itself, clinic
 * by clinic, as each yes lands: flip `consent` in data/clinicsServed.js, drop
 * the logo in public/logos/clinics/, rebuild.
 */
export default function ClinicsServed() {
  const named = consentedClinics;
  const count = clinicsServed.length;

  return (
    <section className="cs" aria-labelledby="cs-title">
      <div className="ch-container">
        <p className="cs-eyebrow">Dental clinics Aumy serves</p>

        {named.length > 0 ? (
          <>
            <h2 id="cs-title" className="cs-title">
              Trusted by growing dental clinics across India.
            </h2>
            <ul className="cs-logos">
              {named.map((c) => (
                <li key={c.name} className="cs-logo">
                  <img src={c.logo} alt={c.name} loading="lazy" />
                  <span className="cs-city">{c.city}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2 id="cs-title" className="cs-title">
              Trusted by dental clinics in {servedCities()}.
            </h2>
            <p className="cs-sub">
              {count} clinics run their front desk, patient journeys and records on Aumy —
              from single practices to multi-location groups.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
