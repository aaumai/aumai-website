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
/**
 * Where each logo starts on the grid, in HALF-column tracks (each logo spans two), so a short row can be centred:
 * desktop = 4 columns (8 tracks): rows of 4, and a last row with fewer than 4 is centred (owner 2026-11-27: "4 on
 * 1st line and 3 on next"; this replaces the 2026-11-04 Delhi-pair-alone row 1 — the two Delhi clinics still come
 * first, so they open row 1). Phone = 2 columns (4 tracks), an odd last logo centred. A start lower than the one
 * before it begins a new row.
 */
function gridStarts(i, n) {
  const centred = (cols, count, pos) => 1 + (cols - count) + 2 * pos;
  const row = Math.floor(i / 4);
  const desktop = centred(4, Math.min(4, n - row * 4), i % 4);
  const mRow = Math.floor(i / 2);
  const phone = centred(2, Math.min(2, n - mRow * 2), i % 2);
  return { '--cs-start': desktop, '--cs-start-m': phone };
}

export default function ClinicsServed() {
  const named = consentedClinics;

  return (
    <section className="cs" aria-labelledby="cs-title">
      <div className="ch-container">
        <p className="cs-eyebrow">Across India</p>

        {named.length > 0 ? (
          <>
            <h2 id="cs-title" className="cs-title">
              {/* Owner 2026-11-24: "Trusted by dental clinics" (reads as some of many). 2026-11-03 it was "Dental clinics that run on Aumy"; before that "Trusted by growing dental clinics across India." */}
              Trusted by dental clinics
            </h2>
            <ul className="cs-logos">
              {/* One grid, identical columns and gaps on every row (owner 2026-11-11: logos were different sizes and
                  Sterling/Omlesh sat closer together than the rest). Every logo sits in the SAME fixed-size box,
                  centred and contained, with its caption in the area beneath, so a long caption never moves a logo.
                  Rows of 4 (owner 2026-11-27: "4 on 1st line and 3 on next"), the two Delhi clinics first, and a
                  short last row is centred (see gridStarts above). */}
              {named.map((c, i) => (
                <li
                  key={c.name}
                  className={[
                    'cs-logo',
                    c.logo ? '' : 'cs-logo--text',
                    c.logo && c.showName ? 'cs-logo--named' : '',
                  ].filter(Boolean).join(' ')}
                  // Grid position, plus the per-logo optical size from `scale` in data/clinicsServed.js (1 = fills the
                  // box; the only size knob).
                  style={{ ...gridStarts(i, named.length), ...(c.scale ? { '--cs-scale': c.scale } : {}) }}
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
                    {/* LOCALITY + CITY (owner 2026-11-11): the place a visitor recognises. Each part is kept whole, so
                        a narrow column breaks only between "Vasant Vihar," and "Delhi", never inside a name. */}
                    <span className="cs-city">
                      {c.locality ? (
                        <>
                          <span className="cs-city-part">{c.locality},</span>{' '}
                          <span className="cs-city-part">{c.city}</span>
                        </>
                      ) : c.descriptor ? (
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
                      // Each branch name kept whole; the " · " separator stays with the name before it, so no line starts with "·".
                      <span className="cs-branches">
                        {c.locations.map((loc, j) => (
                          <React.Fragment key={loc}>
                            <span className="cs-branch">{j < c.locations.length - 1 ? `${loc} ·` : loc}</span>
                            {j < c.locations.length - 1 && ' '}
                          </React.Fragment>
                        ))}
                      </span>
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
