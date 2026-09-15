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
            title: 'What Slips Through the Cracks? A 60-Second Check for Dental Practices | AUM AI',
            description:
              'When a dental practice is stretched, calls go unanswered, no-shows go unrecovered and patients never reappoint. A 60-second, deliberately conservative estimate of what that is worth. Free, no sign-up.',
            canonical: `${ORIGIN}/leak-calculator`,
          }
        : {
            title: 'What Slips Through the Cracks? A 60-Second Check for Dental Clinics | AUM AI',
            description:
              'When a dental clinic is stretched, enquiries go unanswered, no-shows go unrecovered and patients never come back. A 60-second, deliberately conservative estimate of what that is worth. Free, no sign-up.',
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
