import React from 'react';
import { consentedClinics, servedCities } from '../data/clinicsServed';
import './ClinicsServed.css';

/**
 * "Dental clinics Aumy serves" — the trust strip on the homepage.
 *
 * TWO STATES, and which one shows is decided by CONSENT, never by design
 * preference:
 *
 *   logos   the clinics that have given permission to be named
 *           (MSA §10A India / §9A US), each shown with its city.
 *   cities  the fallback if that list is ever empty: the real cities we serve,
 *           no clinic named. True, and needs nobody's permission.
 *
 * Holding a clinic's logo is not consent — those were given so we could brand
 * THEIR patient messages. Naming a dental clinic as our customer tells the
 * world their patient records sit on our system, which is a statement about
 * them, not about us. So `consent` in data/clinicsServed.js is the only thing
 * that puts a name on this page.
 *
 * A consented clinic whose logo file we don't have yet renders as a
 * typographic nameplate rather than a broken image, so a missing asset never
 * blocks a clinic that has already said yes. Drop the file in
 * public/logos/clinics/, set `logo`, rebuild — it upgrades in place.
 *
 * No count is printed. The number of clinics is not the proof on offer here;
 * naming real ones is, and a small number argues against us.
 */
export default function ClinicsServed() {
  const named = consentedClinics;

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
                <li key={c.name} className={c.logo ? 'cs-logo' : 'cs-logo cs-logo--text'}>
                  {c.logo ? (
                    <img src={c.logo} alt={c.name} loading="lazy" />
                  ) : (
                    <span className="cs-name">{c.name}</span>
                  )}
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
              Clinics run their front desk, patient journeys and records on Aumy —
              from single practices to multi-location groups.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
