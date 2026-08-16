import React, { useEffect } from 'react';
import LeakCheck from '../components/LeakCheck';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';

/**
 * The standalone leak-check route. The calculator itself lives in
 * components/LeakCheck so this page, the India home page and the US home page
 * all run the same arithmetic — see that file for why the math is deliberately
 * conservative.
 *
 * Market is compile-time: the US build (REACT_APP_MARKET=us) serves USD,
 * US segment benchmarks and a call booking instead of the India audit form.
 */
const IS_US = process.env.REACT_APP_MARKET === 'us';
const ORIGIN = IS_US ? 'https://aumyai.com' : 'https://aumai.co.in';

const LeakCalculator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo(
      IS_US
        ? {
            title: 'Dental Revenue Leak Calculator — What Missed Calls & No-Shows Cost You | AUM AI',
            description:
              'A 60-second, deliberately conservative estimate of the revenue leaking from your dental practice or med spa — unanswered calls, no-shows, and patients who never reappoint. Free, no sign-up.',
            canonical: `${ORIGIN}/leak-calculator`,
          }
        : {
            title: 'Clinic Revenue Leak Calculator — Dental | AUM AI',
            description:
              'A 60-second, deliberately conservative estimate of the revenue quietly leaking from your dental clinic — missed enquiries, no-shows, and patients who never come back. Free, no sign-up.',
            canonical: `${ORIGIN}/leak-calculator`,
          }
    );
  }, []);

  return (
    <div className="ch-home">
      <section className="ch-hero ch-audit-hero">
        <div className="ch-container">
          <LeakCheck market={IS_US ? 'us' : 'in'} headingLevel="h1" />
        </div>
      </section>
    </div>
  );
};

export default LeakCalculator;
