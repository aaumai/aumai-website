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
        <p className="cs-eyebrow">Across India</p>

        {named.length > 0 ? (
          <>
            <h2 id="cs-title" className="cs-title">
              {/* Owner 2026-11-03: matches the established-practice persona (was "Trusted by growing dental clinics across India."). */}
              Dental clinics that run on Aumy
            </h2>
            <ul className="cs-logos">
              {/* One grid, identical columns and gaps on every row (owner 2026-11-11: logos were different sizes and
                  Sterling/Omlesh sat closer together than the rest). Every logo sits in the SAME fixed-size box,
                  centred and contained, with its caption in the area beneath, so a long caption never moves a logo.
                  Row 1 = the two Delhi clinics (owner 2026-11-04): on the 4-column grid they take the two middle
                  columns, and the third clinic starts row 2 (see .cs-logo--row2 in ClinicsServed.css). */}
              {named.map((c, i) => (
                <li
                  key={c.name}
                  className={[
                    'cs-logo',
                    i === 0 ? 'cs-logo--row1' : '',
                    i === 2 ? 'cs-logo--row2' : '',
                    c.logo ? '' : 'cs-logo--text',
                    c.logo && c.showName ? 'cs-logo--named' : '',
                  ].filter(Boolean).join(' ')}
                  // Per-logo optical size, from `scale` in data/clinicsServed.js (1 = fills the box). The only knob.
                  style={c.scale ? { '--cs-scale': c.scale } : undefined}
                >
                  <span className="cs-box">
                    {c.logo ? (
                      c.showName ? (
                        // A MONOGRAM logo carries no name, so the name is set in type under the mark, inside the box.
                        <span className="cs-markstack">
                          <img src={c.logo} alt={c.name} loading="lazy" />
                          <span className="cs-wordmark">{c.name}</span>
                        </span>
                      ) : (
                        <img src={c.logo} alt={c.name} loading="lazy" />
                      )
                    ) : (
                      <span className="cs-name">{c.name}</span>
                    )}
                  </span>
                  <span className="cs-caption">
                    <span className="cs-city">
                      {c.descriptor ? (
                        <>
                          <span className="cs-city-part">{c.descriptor} ·</span>{' '}
                          <span className="cs-city-part">{c.city}</span>
                        </>
                      ) : (
                        c.city
                      )}
                    </span>
                    {c.lead && <span className="cs-lead">{c.lead}</span>}
                    {c.locations?.length > 0 && (
                      <span className="cs-branches">{c.locations.join(' · ')}</span>
                    )}
                  </span>
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
