import React from 'react';
import './Page.css';

const PrivacyPolicy = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">
            How Aaumai Healthcare Solutions PVT LTD collects, uses, and protects your information
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
            Aaumai Healthcare Solutions PVT LTD ("Aaumai", "AUM AI", "we", "us", "our") provides
            healthcare technology services including electronic health record (EHR) software, AI
            clinical tools, predictive retention analytics, telehealth, and patient-communication
            automation over channels such as WhatsApp. This Privacy Policy explains what
            information we collect through our website (aumai.co.in), our hosted applications
            (such as aumy.aumai.co.in), and the services we deliver to healthcare client clinics
            ("clinic customers"); how we use it; with whom we share it; how long we keep it; and
            the rights you have over it.
          </p>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>1. Who is responsible for your data</h2>
            <p style={{ marginBottom: '15px' }}>
              For visitors to our marketing website and contact-form submissions, Aaumai is the
              data controller. For data processed inside our hosted clinical platform on behalf
              of a clinic customer (including patient, appointment, clinical-note, and message
              data), the clinic is the data controller and Aaumai acts as the data processor
              under a separate service agreement (a Business Associate Agreement in
              HIPAA-covered engagements, an equivalent data-processing agreement under India's
              Digital Personal Data Protection Act 2023, UAE PDPL, and Dubai Health Authority
              rules).
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>2. Information we collect</h2>
            <p style={{ marginBottom: '10px' }}>
              <strong>From website visitors:</strong> name, email, phone, company name and the
              message you send via our contact form; standard request logs (IP address, browser
              user-agent, page-visited timestamps) for security and analytics.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>From clinic staff who log in to our platform:</strong> name, work email,
              phone number, role, the tenant (clinic) you belong to, authentication metadata
              (hashed password, multi-factor secrets), session and audit logs.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Patient data processed for clinic customers:</strong> identifiers (name,
              date of birth, gender, contact details, medical record number, government
              identifiers such as Aadhaar / PAN / Emirates ID when supplied by the clinic),
              clinical data (vitals, diagnoses, problems, medications, allergies, lab orders and
              results, encounters and notes, imaging metadata, care plans), scheduling data,
              insurance and billing data, telehealth call and recording metadata, and
              AI-generated drafts that reference the foregoing.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>WhatsApp messaging data (when the clinic uses our WhatsApp Automation
              module):</strong> outbound message templates and free-text messages sent on the
              clinic's behalf, inbound replies from patients, message-status events (sent,
              delivered, read, failed), opt-out records, and the consent state we keep so we
              never message a patient who has opted out. Outbound message sending is performed
              by our Business Solution Provider (MSG91) on behalf of the clinic; template
              management (create, submit for Meta approval, status tracking, delete) is
              performed directly by Aaumai against Meta's WhatsApp Business Management API on
              WhatsApp Business Accounts owned by our Aaumai Meta Business Manager.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Instagram &amp; Facebook Messenger data (when the clinic uses our
              social-DM lead capture):</strong> when a person sends a direct message to a
              clinic's connected Instagram or Facebook Page, Meta delivers that message to us
              via webhook. We process the message content, the sender's Meta-scoped identifier
              (Page-Scoped ID / Instagram-Scoped ID), and — where the person's privacy settings
              allow and we hold a valid Page access token — the sender's public display name,
              Instagram @username, and profile-picture URL (retrieved via Meta's Messenger /
              Instagram User Profile API). We use this to reply on the clinic's behalf through
              our AI receptionist and to record the enquiry as a lead for the clinic. We do NOT
              receive a phone number through these channels; if the person decides to book, we
              ask them to share a phone or WhatsApp number, which is then used for appointment
              confirmation and reminders.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>What we do NOT collect:</strong> we do not run third-party advertising
              trackers or build profiles of website visitors for advertising. We do not sell
              personal data. We do not use patient data to train AI models other than our own
              internal, clinic-scoped retention models that operate exclusively on de-identified
              data.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>3. How we use information</h2>
            <ul style={{ marginLeft: '30px', marginBottom: '15px' }}>
              <li>Deliver the EHR, telehealth, billing, AI-clinical-assistant (AUMY), and
                WhatsApp Automation services the clinic has subscribed to.</li>
              <li>Authenticate users, enforce role-based and feature-level permissions, and
                audit every read and write of clinical data.</li>
              <li>Send transactional WhatsApp messages (appointment reminders, recall
                reminders, post-visit follow-ups) when the clinic has enabled the corresponding
                automation capability and the patient has not opted out.</li>
              <li>Reply to inbound Instagram and Facebook Page direct messages on the clinic's
                behalf through the AI receptionist, and capture each enquiry as a lead for the
                clinic to follow up.</li>
              <li>Generate AI drafts and recommendations (ambient SOAP notes, care-gap alerts,
                drug-interaction checks, churn-risk scoring) for the clinic's clinicians to
                review. AI outputs are always reviewable; the clinician is the decision-maker.</li>
              <li>Provide customer support, debugging, security investigation, and incident
                response.</li>
              <li>Comply with legal obligations including healthcare record-retention rules.</li>
              <li>For website visitors only: respond to enquiries you send through the contact
                form and measure aggregate traffic to improve the site.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>4. Legal bases (where applicable)</h2>
            <p style={{ marginBottom: '15px' }}>
              Where India's DPDP Act, the UAE PDPL, EU GDPR, or similar laws apply, the legal
              basis for processing depends on the data category:
            </p>
            <ul style={{ marginLeft: '30px', marginBottom: '15px' }}>
              <li><strong>Patient clinical data:</strong> processed on behalf of the clinic
                under a data-processing agreement; the clinic is responsible for the consent
                or legal basis on the data-subject side.</li>
              <li><strong>Patient WhatsApp messages:</strong> transactional reminders rely on
                the existing patient-clinic relationship; promotional or marketing-style
                outreach (e.g. re-engagement campaigns) additionally requires explicit
                marketing consent recorded against the patient. The opt-out list is honoured
                in every case.</li>
              <li><strong>Clinic-staff account data:</strong> performance of the service
                contract with the clinic.</li>
              <li><strong>Website-visitor contact form:</strong> your explicit submission and
                our legitimate interest in responding.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>5. Sharing with third parties (sub-processors)</h2>
            <p style={{ marginBottom: '15px' }}>
              We use the following sub-processors strictly to deliver the services. We do not
              sell data to anyone.
            </p>
            <ul style={{ marginLeft: '30px', marginBottom: '15px' }}>
              <li><strong>Amazon Web Services (AWS):</strong> infrastructure hosting in the
                ap-south-1 (Mumbai) region for in-country data residency, plus object storage
                (S3) for clinical documents and call recordings.</li>
              <li><strong>Anthropic (Claude AI):</strong> our primary large-language-model
                provider, used for AUMY's clinical assistant, draft generation, and
                natural-language report queries. When you use AUMY in our mobile or web apps,
                the messages, voice and documents you share with it — together with the relevant
                clinic / patient context needed to answer — are sent to Anthropic through our
                servers to generate a response. The apps disclose this and ask for your consent
                before any data is sent to the AI, and you can withdraw that consent at any time
                in the app. Patient identifiers are de-identified before any prompt that leaves
                our infrastructure where the use case permits. Anthropic processes this data only
                to return a response and does not use it to train its models. (For specific
                tenant configurations the same inference may run via AWS Bedrock under equivalent
                terms.)</li>
              <li><strong>OpenAI:</strong> alternative LLM provider used for specific extractor
                pipelines (e.g. ambient documentation) when configured for a tenant.</li>
              <li><strong>Deepgram:</strong> speech-to-text transcription for telehealth calls
                and ambient note capture.</li>
              <li><strong>LiveKit Cloud:</strong> WebRTC video and audio infrastructure for
                telehealth sessions, including session recording when enabled.</li>
              <li><strong>Razorpay:</strong> payment processing for clinic-side billing.</li>
              <li><strong>MSG91 / Jio Haptik Tech Ltd:</strong> WhatsApp Business Solution
                Provider that delivers outbound WhatsApp messages and SMS / OTP on the
                clinic's behalf, and Exotel for voice OTP and proxy calls.</li>
              <li><strong>Meta Platforms (WhatsApp Business Platform):</strong> our Aaumai Meta
                Business Manager hosts the WhatsApp Business Accounts (WABAs) that serve our
                clinic customers. We call Meta's Business Management API directly to create,
                submit, query, and delete WhatsApp message templates on those WABAs. Meta also
                sends us webhook events (template approval status) for those WABAs. We do not
                send messages directly through Meta's WhatsApp Cloud API; outbound messaging
                continues through MSG91.</li>
              <li><strong>Meta Platforms (Instagram &amp; Messenger Platform):</strong> when a
                clinic connects its Facebook Page and linked Instagram professional account to
                our app, Meta delivers direct-message webhook events to us and we send replies
                through the Messenger Send API (graph.facebook.com) and Instagram messaging API
                (graph.instagram.com) using that Page's access token. We also call Meta's User
                Profile API to resolve the sender's public name / Instagram @username so the
                clinic sees a recognisable lead. We receive and store only the data described in
                Section 2; we do not post content, manage ads, or read a connected account's
                media, friends, or followers.</li>
              <li><strong>Google Maps Platform:</strong> directions and place-lookup APIs for
                delivery-window estimation.</li>
              <li><strong>EmailJS / SES:</strong> transactional email delivery (account
                invites, password resets, alerts).</li>
            </ul>
            <p style={{ marginBottom: '15px' }}>
              Each sub-processor is bound by a written data-processing agreement to
              confidentiality, to processing data only on our documented instructions, and to
              maintaining data-protection safeguards equivalent to those described in this
              policy. We do not use any third-party AI service that trains its models on your
              data. A current list of sub-processors is available on request to the contact
              email at the bottom of this page.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>6. Meta Platforms — WhatsApp, Instagram &amp; Facebook Messenger disclosures</h2>
            <p style={{ marginBottom: '15px' }}>
              Our AUM AI Platform Meta App (App ID 2067787743777563) integrates with Meta in two
              ways, both in service of our healthcare clinic customers:
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>(a) WhatsApp Business Platform — template management.</strong> Our Aaumai
              Meta Business Manager (Business ID 1216026913963369) hosts the WhatsApp Business
              Accounts (WABAs) that serve our clinics. Specifically:
            </p>
            <ul style={{ marginLeft: '30px', marginBottom: '15px' }}>
              <li>We create, update, list, and delete message templates on the WABAs through
                Meta's Business Management API.</li>
              <li>We receive webhook events about template approval status
                (<code>message_template_status_update</code>) so the clinic-facing composer
                shows whether a submitted template has been approved or rejected in real
                time.</li>
              <li>We do not send messages directly through Meta's WhatsApp Cloud API; outbound
                WhatsApp messaging is delivered by our Business Solution Provider (MSG91).</li>
              <li>We do not perform WhatsApp Embedded Signup; clinic WABAs are onboarded via
                MSG91 and sit under Aaumai's Business Manager.</li>
            </ul>
            <p style={{ marginBottom: '10px' }}>
              <strong>(b) Instagram &amp; Facebook Messenger — direct-message lead capture and
              AI receptionist.</strong> When a clinic explicitly connects its Facebook Page and
              linked Instagram professional account through Facebook Login for Business, we
              request only the permissions needed to receive and reply to direct messages:
              <code>pages_show_list</code>, <code>pages_messaging</code>,
              <code>pages_manage_metadata</code>, <code>business_management</code>,
              <code>instagram_basic</code>, and <code>instagram_manage_messages</code>.
              Specifically:
            </p>
            <ul style={{ marginLeft: '30px', marginBottom: '15px' }}>
              <li>We receive a webhook event for each inbound direct message to a connected
                Page or Instagram account (the <code>messages</code> and
                <code>messaging_postbacks</code> fields on the <code>page</code> and
                <code>instagram</code> objects), and we verify every webhook payload's
                <code>X-Hub-Signature-256</code> signature against our app secret.</li>
              <li>We send replies on the clinic's behalf through the Messenger Send API and the
                Instagram messaging API, using that Page's access token, within Meta's standard
                messaging window.</li>
              <li>We call Meta's User Profile API to resolve the sender's public display name,
                Instagram @username, and profile-picture URL so the clinic recognises the lead.</li>
              <li>We store only the message content, the sender's Meta-scoped identifier, and the
                profile fields above (see Section 2). We do not post content, run or read ads,
                or access a connected account's media, comments, friends, or followers.</li>
              <li>The Page access tokens we hold are encrypted at rest (AES-256-GCM). A clinic
                can disconnect at any time from within our app; we then soft-delete the stored
                credentials and stop receiving or sending messages for that Page.</li>
              <li>If a person removes our app, Meta calls our <strong>deauthorize callback</strong>;
                a person may request deletion of their data via our <strong>data-deletion
                request</strong> endpoint, after which we erase the lead and conversation records
                associated with their Meta-scoped identifier.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>7. Data location and transfers</h2>
            <p style={{ marginBottom: '15px' }}>
              Our primary database and application servers run in AWS ap-south-1 (Mumbai) for
              Indian data-residency. Cross-border transfers occur when an LLM provider, a
              messaging provider, or a payment processor is hosted in another region; these
              transfers are made under the sub-processor's published data-protection terms and
              applicable model contractual clauses. For UAE clinics subject to Dubai Health
              Authority rules, telehealth recordings can be pinned to UAE region or kept
              in-country at the clinic's choice.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>8. Retention</h2>
            <p style={{ marginBottom: '15px' }}>
              Clinical records are retained for the period required by applicable
              record-retention rules (typically 7–10 years in India for adult patients, longer
              for paediatric records; HIPAA-aligned minimums where applicable; DHA-specified
              minimums for UAE clinics) or for as long as the clinic customer's contract is
              active, whichever is longer. WhatsApp message logs are retained for 12 months by
              default, configurable per tenant. Website contact-form submissions are retained
              for 24 months. All deletes inside the clinical platform are soft deletes
              (<code>deleted_at</code> set) to preserve audit history; hard deletion happens
              only on contract termination per agreed data-disposition terms.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>9. Security</h2>
            <p style={{ marginBottom: '15px' }}>
              Encryption in transit (TLS 1.2+); encryption at rest for the database and S3.
              Sensitive secrets (provider API keys, WhatsApp Meta System User tokens, Meta App
              Secret, telehealth vendor secrets) are encrypted with AES-256-GCM using a
              separate application-level key before storage. Authentication uses bcrypt-hashed
              passwords plus optional TOTP-based multi-factor authentication. Role-based
              access control gates every clinical and configuration endpoint; every write is
              logged in an immutable audit trail. The platform is built with row-level tenant
              isolation so a logged-in user of one clinic cannot read or modify another
              clinic's data, even via direct API calls.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>10. Your rights</h2>
            <p style={{ marginBottom: '15px' }}>
              Depending on your jurisdiction (India DPDP, UAE PDPL, EU GDPR, US state laws),
              you may have the right to access, correct, erase, restrict the processing of, or
              port your personal data; to withdraw consent; and to lodge a complaint with the
              relevant data-protection authority (the Data Protection Board of India, the UAE
              Data Office, your local DPA in the EU, etc.). For patient data processed by us on
              behalf of a clinic, please contact the clinic directly in the first instance —
              they are the data controller and are best placed to action requests. For all
              other queries, contact us at the address below.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>11. Children's data</h2>
            <p style={{ marginBottom: '15px' }}>
              Our marketing website is not directed at children under 13 (or the equivalent age
              of digital consent in your jurisdiction). Paediatric records may exist inside our
              clinical platform because we serve healthcare providers; in that case the clinic
              is the data controller and is responsible for obtaining parental or guardian
              consent.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>12. Cookies and analytics</h2>
            <p style={{ marginBottom: '15px' }}>
              The marketing website uses a small number of first-party cookies to remember your
              session and a privacy-respecting analytics endpoint we operate ourselves (no
              third-party advertising trackers). The hosted clinical platform uses only
              functional cookies needed for authentication; no third-party tracking is loaded
              inside the clinical platform.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>13. Changes to this policy</h2>
            <p style={{ marginBottom: '15px' }}>
              We may update this policy from time to time. The "Last Updated" date at the top
              of this page reflects the most recent change. For material changes that affect
              how patient data is processed, we will notify clinic customers in writing.
            </p>
          </section>

          <section style={{ marginBottom: '10px' }}>
            <h2 style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.8rem' }}>14. Contact</h2>
            <p style={{ marginBottom: '15px' }}>
              For questions about this Privacy Policy or to exercise your rights under
              applicable data-protection law, please contact:
            </p>
            <p style={{ marginBottom: '5px' }}>
              <strong>Aaumai Healthcare Solutions PVT LTD</strong>
            </p>
            <p style={{ marginBottom: '5px' }}>
              Email: <a href="mailto:jayesh.chaudhari@aumai.co.in">jayesh.chaudhari@aumai.co.in</a>
            </p>
            <p style={{ marginBottom: '5px' }}>
              Website: <a href="https://aumai.co.in">https://aumai.co.in</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
