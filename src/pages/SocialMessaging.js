import React, { useEffect } from 'react';
import { setPageSeo } from '../utils/seo';
import './Page.css';

// Dedicated description of the Facebook Page + Instagram messaging service, for
// Meta App Review / Tech Provider access verification. Linked from the footer.
// Copy must match the App Review "how you use Platform Data" answer and the
// Privacy Policy. Only built behaviour is claimed.
const SocialMessaging = () => {
  useEffect(() => {
    setPageSeo({
      title: 'Facebook & Instagram AI Receptionist for Clinics | AUM AI',
      description:
        'AUM AI gives healthcare clinics an AI receptionist for their own Facebook Page and Instagram account — it captures every direct message as a lead and helps the clinic reply quickly, from one dashboard.',
      canonical: 'https://aumai.co.in/facebook-instagram',
      image: 'https://aumai.co.in/screenshots/roi-preview.png',
    });
  }, []);

  const h2 = { color: '#0f172a', marginBottom: '15px', fontSize: '1.6rem' };
  const sec = { marginBottom: '34px' };
  const lead = { marginBottom: '16px' };
  const ul = { marginLeft: '24px', marginBottom: '8px', lineHeight: '1.9' };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">AI receptionist for Facebook &amp; Instagram messages</h1>
          <p className="page-subtitle">
            We help healthcare clinics answer every patient enquiry that arrives on their own
            Facebook Page and Instagram account — and never lose a lead.
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
          color: '#334155',
        }}>
          <p style={{ marginBottom: '24px', fontSize: '1.1rem' }}>
            <strong>AUM AI Healthcare Solutions</strong> provides dental, aesthetic and other
            healthcare clinics with an AI-assisted receptionist. Part of that service connects to a
            clinic&rsquo;s own <strong>Facebook Page</strong> and linked <strong>Instagram
            professional account</strong>, so the clinic can respond to patient enquiries on those
            channels quickly and never miss a new lead. This page explains the service, the data we
            use to deliver it, and the business behind it.
          </p>

          {/* 1 — The service */}
          <section style={sec}>
            <h2 style={h2}>What the service does</h2>
            <p style={lead}>
              Busy clinics lose patients in the gap between &ldquo;someone messaged us&rdquo; and
              &ldquo;the front desk replied.&rdquo; Our service closes that gap on Facebook and
              Instagram:
            </p>
            <ul style={ul}>
              <li>A clinic connects its Facebook Page and Instagram account to our platform.</li>
              <li>When a patient sends a message to the clinic&rsquo;s Page or Instagram, our AI
                prepares a helpful reply that the clinic can review and send.</li>
              <li>Every enquiry is saved as a lead in the clinic&rsquo;s dashboard, so the team can
                follow up and book the appointment.</li>
            </ul>
          </section>

          {/* 2 — Data used */}
          <section style={sec}>
            <h2 style={h2}>How we use the data we receive from Meta</h2>
            <p style={lead}>
              We use this data only to run the service for the connected clinic:
            </p>
            <ul style={ul}>
              <li><strong>Show the clinic its Pages.</strong> We retrieve the list of Facebook Pages
                the person manages so they can choose which Page to connect.</li>
              <li><strong>Receive patient messages.</strong> We receive the messages sent to the
                clinic&rsquo;s Facebook Page and Instagram account so they can be answered.</li>
              <li><strong>Recognise the sender.</strong> We read the sender&rsquo;s public name or
                Instagram username so the clinic can see who is contacting them.</li>
              <li><strong>Stay subscribed to new messages.</strong> We keep the clinic&rsquo;s Page
                subscribed to new-message notifications so no enquiry is missed.</li>
              <li><strong>Reply on the clinic&rsquo;s behalf.</strong> After the clinic reviews the
                AI&rsquo;s draft, we send the reply back through that same Facebook Page or Instagram
                inbox.</li>
            </ul>
          </section>

          {/* 3 — How clients use it */}
          <section style={sec}>
            <h2 style={h2}>How clinics use it</h2>
            <p style={lead}>
              Clinics use the service to reply to patients faster, capture every new enquiry as a
              lead, and follow up — all from one place, alongside their WhatsApp, calls and other
              channels. The clinic stays in control: a staff member reviews AI-drafted replies, and
              the clinic remains the owner of its Page, Instagram account and patient relationships.
            </p>
          </section>

          {/* 4 — Data protection */}
          <section style={sec}>
            <h2 style={h2}>How we protect this data</h2>
            <ul style={ul}>
              <li>We use the data <strong>only</strong> to provide this service to the specific
                clinic that connected its accounts.</li>
              <li>We <strong>do not sell</strong> the data, and we <strong>do not</strong> use it for
                advertising or to build advertising audiences.</li>
              <li>We do not post content, manage ads, or read a connected account&rsquo;s media,
                friends or followers.</li>
              <li>Data is stored securely (encrypted in transit and at rest) and a clinic can
                disconnect its Page or Instagram account at any time. See our{' '}
                <a href="/privacy">Privacy Policy</a> for the full detail.</li>
            </ul>
          </section>

          {/* 5 — Business details */}
          <section style={sec}>
            <h2 style={h2}>About the business providing this service</h2>
            <p style={lead}>
              This service is provided by <strong>Aaumai Healthcare Solutions Pvt Ltd</strong>{' '}
              (&ldquo;AUM AI&rdquo;), a healthcare technology company building growth, automation and
              clinic-management software for dental, aesthetic and healthcare clinics in India and
              the UAE.
            </p>
            <ul style={ul}>
              <li><strong>Website:</strong> <a href="https://aumai.co.in">https://aumai.co.in</a></li>
              <li><strong>Email:</strong>{' '}
                <a href="mailto:jayesh.chaudhari@aumai.co.in">jayesh.chaudhari@aumai.co.in</a></li>
              <li><strong>Phone:</strong> <a href="tel:+918007189868">+91 800 718 9868</a></li>
            </ul>
          </section>

          <p style={{
            marginTop: '36px',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0',
            fontSize: '0.9rem',
            color: '#64748b',
            lineHeight: '1.7',
          }}>
            Questions about this service or how we handle data? Email{' '}
            <a href="mailto:jayesh.chaudhari@aumai.co.in">jayesh.chaudhari@aumai.co.in</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMessaging;
