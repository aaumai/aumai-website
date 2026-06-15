import React from 'react';
import './Page.css';

const CONTACT = 'jayesh.chaudhari@aumai.co.in';

const DataDeletion = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Data &amp; Account Deletion</h1>
          <p className="page-subtitle">
            How to request deletion of your account and personal data from Aaumai Healthcare Solutions PVT LTD
          </p>
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
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <p style={{ marginBottom: '20px' }}>
            This page explains how to request deletion of your account and associated personal data
            from the AUM AI / Aumy platform, including the <strong>Aumy</strong> mobile app and our
            hosted applications (such as aumy.aumai.co.in). Aaumai Healthcare Solutions PVT LTD
            ("Aaumai", "AUM AI", "we") provides a B2B healthcare platform: most accounts are created
            and managed by the clinic ("clinic customer") you belong to, so the deletion path depends
            on who you are.
          </p>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>1. Clinic staff &amp; app users</h2>
            <p style={{ marginBottom: '15px' }}>
              The Aumy app is used by clinic operators and clinicians whose accounts are provisioned
              by their clinic administrator. To delete your user account and personal data:
            </p>
            <ul style={{ marginBottom: '15px', paddingLeft: '22px' }}>
              <li style={{ marginBottom: '8px' }}>Ask your clinic administrator to remove your user from the clinic workspace, <strong>or</strong></li>
              <li style={{ marginBottom: '8px' }}>Email us at <a href={`mailto:${CONTACT}?subject=Account%20Deletion%20Request`} style={{ color: '#4f46e5' }}>{CONTACT}</a> from your registered email with the subject "Account Deletion Request".</li>
            </ul>
            <p style={{ marginBottom: '15px' }}>
              <strong>What is deleted:</strong> your user profile (name, work email, phone), login
              credentials, multi-factor secrets, push-notification tokens, and personal session data.
              <strong> What is retained:</strong> security and audit-trail logs that record which user
              performed clinical actions, which we are legally required to keep for medical-record
              integrity and compliance (see Section 4).
            </p>
            <p>
              We action verified requests within <strong>30 days</strong> and confirm by email.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>2. Patients</h2>
            <p style={{ marginBottom: '15px' }}>
              If you are a patient of a clinic that uses our platform, your clinic is the data
              controller of your medical record and Aaumai processes that data on the clinic's behalf.
              Please direct deletion or correction requests to your clinic. Once the clinic verifies
              and authorises the request, Aaumai will delete the relevant data from our systems,
              subject to the medical-record retention obligations the clinic is bound by. You may also
              email <a href={`mailto:${CONTACT}?subject=Patient%20Data%20Deletion`} style={{ color: '#4f46e5' }}>{CONTACT}</a> and we will route your request to the correct clinic.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>3. Clinic customers (whole workspace)</h2>
            <p style={{ marginBottom: '15px' }}>
              On termination of a clinic's service agreement, we provide a data export on request and
              then delete or irreversibly anonymise the clinic's tenant data within the period set out
              in our Data Processing Agreement (default <strong>90 days</strong>), except where longer
              retention is required by law.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>4. Data we must retain</h2>
            <p style={{ marginBottom: '15px' }}>
              Some records cannot be deleted on request because the law requires us (or the clinic) to
              keep them — for example medical-record retention periods, financial/invoice records, and
              security audit logs. Where we retain such data we limit it to what is legally necessary,
              and we may retain anonymised or aggregated data that can no longer identify you.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>5. How to reach us</h2>
            <p style={{ marginBottom: '15px' }}>
              For any account or data-deletion request, email{' '}
              <a href={`mailto:${CONTACT}?subject=Data%20Deletion%20Request`} style={{ color: '#4f46e5' }}>{CONTACT}</a>.
              We respond to deletion requests within 30 days. This page complements our{' '}
              <a href="/privacy" style={{ color: '#4f46e5' }}>Privacy Policy</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DataDeletion;
