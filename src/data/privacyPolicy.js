/**
 * /privacy — ONE copy of the words, read by src/pages/PrivacyPolicy.js AND
 * scripts/prerender.js, so the crawler HTML (what search engines and Meta's
 * policy checker see) carries the full policy and can never drift from the page.
 *
 * Rewritten 8 Nov 2026 (owner approved) after a Meta Platform Terms audit found
 * statements the software does not match. Every statement here was checked
 * against aum-ehr-api origin/main on 8 Nov 2026. Rules for editing:
 *   - say only what the code does; no retention period the code does not enforce;
 *   - name only providers the live code sends data to;
 *   - no prices.
 *
 * Content model: a block is { p, lead? } (a paragraph with an optional bold
 * lead-in) or { ul: [ 'text' | ['bold lead', 'text'] ] }. Inside any text,
 * [label](href) becomes a link. Text is plain (no HTML).
 */
const LAST_UPDATED = '8 November 2026';
const TITLE = 'Privacy Policy | AUM AI';
const DESCRIPTION =
  'How AUM AI collects, uses, shares and protects personal data across Aumy, its Meta (Facebook, Instagram, WhatsApp) connections and aumai.co.in.';
const HEADLINE = 'Privacy Policy';
const SUBTITLE = 'How Aaumai Healthcare Solutions PVT LTD collects, uses, and protects your information';

const INTRO = [
  'Aaumai Healthcare Solutions PVT LTD (“Aaumai”, “AUM AI”, “we”, “us”, “our”) makes Aumy, software for healthcare clinics. Aumy covers patient records, appointments, billing, telehealth, an AI receptionist on WhatsApp, Facebook, Instagram and phone calls, patient reminders and follow-ups, and tools that help a clinic run its own Facebook and Instagram posts and Meta ads.',
  'This policy explains what information we collect through our website (aumai.co.in), our apps (such as aumy.aumai.co.in and the Aumy mobile app) and the services we provide to clinics (“clinic customers”). It explains how we use that information, who we share it with, how long we keep it, and your rights.',
];

const SECTIONS = [
  {
    title: '1. Who is responsible for your data',
    blocks: [
      { p: 'For visitors to our website, people who fill in our forms, and people who buy from our website, Aaumai is the data controller (a “Data Fiduciary” under India’s Digital Personal Data Protection Act 2023).' },
      { p: 'For data inside Aumy that belongs to a clinic, the clinic is the data controller and Aaumai is its data processor. This includes patient records, appointments, clinical notes, messages, call recordings, leads, and the data that comes from the clinic’s own connected Facebook Page, Instagram account, WhatsApp number and Meta ad account. We process it only to provide the service to that clinic, under our agreement with the clinic. That is a data-processing agreement under India’s DPDP Act 2023 (and, where they apply, the UAE PDPL, Dubai Health Authority rules, or a Business Associate Agreement under HIPAA).' },
      { p: 'If you are a patient, or you messaged a clinic or filled in a clinic’s form, please send requests about your data to that clinic. If you write to us, we will pass your request to the clinic.' },
    ],
  },
  {
    title: '2. Information we collect',
    blocks: [
      { lead: 'From website visitors:', p: 'the name, email, phone number, clinic or company name and message you send through our forms; details of a purchase you make on our website (the payment itself is handled by Razorpay); and the visit data described in Section 12 (Cookies and analytics).' },
      { lead: 'From clinic staff who log in to Aumy:', p: 'name, work email, phone number, role, the clinic you belong to, login details (hashed password, two-factor secrets), and session and audit logs. If a staff member connects the clinic’s Facebook Page, Instagram account or Meta ad account, we also keep that person’s Facebook user ID (the ID Meta gives our app for that person) and Facebook name with the connection, so we can act on a Meta deletion request (Section 6).' },
      { lead: 'Patient data we process for clinics:', p: 'identifiers (name, date of birth, gender, contact details, record numbers, and government IDs such as Aadhaar or PAN when the clinic enters them), clinical data (diagnoses, treatments, medicines, allergies, lab orders, notes, images, care plans), appointments, billing and insurance details, and AI drafts that refer to these.' },
      { lead: 'WhatsApp messages:', p: 'messages and templates the clinic sends to patients, replies and voice notes patients send to the clinic’s WhatsApp number, delivery and read status, and opt-out records, so we never message a patient who has opted out. If a person reaches the clinic by tapping a click-to-WhatsApp ad, Meta also tells us which ad it was (the ad ID and a click ID).' },
      { lead: 'Facebook and Instagram messages:', p: 'when a person sends a direct message to a clinic’s connected Facebook Page or Instagram account, Meta sends that message to us. We keep the message, the sender’s Meta-scoped ID (Page-Scoped ID or Instagram-Scoped ID), and, where the person’s privacy settings allow, their public name, Instagram username and profile picture link. We do not get a phone number this way. If the person wants to book, we ask them for a phone or WhatsApp number.' },
      { lead: 'Lead Ads (instant forms):', p: 'when a person fills in a lead form on one of the clinic’s own Facebook or Instagram ads, Meta tells us, and we fetch the answers they gave (usually name, phone number and email, plus any questions the clinic added). The lead goes into that clinic’s Aumy account only.' },
      { lead: 'The clinic’s own Facebook and Instagram posts:', p: 'once a day we read the clinic’s recent posts (caption, link, picture link and date). We store them in the clinic’s account and use AI to sort each post by topic.' },
      { lead: 'The clinic’s Meta ad account:', p: 'the clinic’s campaigns, ad sets, ads, budgets and status, and daily ad results (such as reach, clicks, cost, conversations and leads). This includes Meta’s summary breakdowns by age group, gender, region and placement. These are totals from Meta, not data about individual people.' },
      { lead: 'Phone calls:', p: 'when a clinic uses the Aumy voice receptionist, we process the caller’s phone number, the live call audio, a written transcript and a recording of the call.' },
      { lead: 'Telehealth:', p: 'video and audio of telehealth visits, live transcripts, and a recording when recording is switched on and the patient has agreed.' },
    ],
  },
  {
    title: '3. How we use information',
    blocks: [
      {
        ul: [
          'Provide the services the clinic has chosen: records, appointments, billing, telehealth, reminders, follow-ups and the AI receptionist.',
          'Log users in, apply each user’s role and permissions, and keep an audit log of reads and changes to clinical data.',
          'Send WhatsApp messages (reminders, recalls, follow-ups and, when the clinic chooses, offers) that the clinic has switched on, and never to a patient who has opted out.',
          'Reply to messages people send to the clinic on WhatsApp, Facebook Messenger and Instagram, and answer calls to the clinic. We only reply to people who wrote or called first. We do not send unsolicited direct messages on Facebook or Instagram.',
          'Publish Facebook Page posts and Instagram posts for the clinic, but only posts the clinic has approved.',
          'Read the clinic’s own posts so the AI receptionist can share a link to a relevant clinic post in a chat.',
          'Create and manage the clinic’s own Meta ad campaigns (new campaigns start paused, and the clinic launches them), and show the clinic how its ads are doing.',
          'Bring the clinic’s Lead Ads leads into its Aumy account, so the clinic can follow up.',
          'Tell Meta, through the Conversions API, when a lead that came from the clinic’s own ad looks ready to book, so the clinic’s ads can find similar people (Section 6).',
          'Make AI drafts and suggestions (visit notes, reply drafts, reminders, which patients are due back) for the clinic’s staff to review. Staff make the decisions.',
          'Give support, fix problems, keep the service secure and respond to incidents.',
          'Meet legal duties, such as keeping medical and financial records.',
          'For website visitors: answer your enquiry, follow up with you about it (by phone, WhatsApp or email), deliver what you bought, and measure our own website and ads (Section 12).',
        ],
      },
    ],
  },
  {
    title: '4. Legal bases (where applicable)',
    blocks: [
      { p: 'Where India’s DPDP Act, the UAE PDPL, the EU GDPR or similar laws apply, the basis for using data depends on the kind of data:' },
      {
        ul: [
          ['Patient data:', 'processed for the clinic under a data-processing agreement. The clinic is responsible for the consent or other legal basis on the patient side.'],
          ['Patient WhatsApp messages:', 'sent on the clinic’s instruction. Reminders rely on the patient’s relationship with the clinic. The clinic is responsible for having the patient’s consent for marketing messages. A patient who replies STOP is not messaged again.'],
          ['Data from a clinic’s connected Meta accounts:', 'processed for the clinic, on its instruction, under our agreement with the clinic and Meta’s terms.'],
          ['Clinic staff accounts:', 'needed to perform our service contract with the clinic.'],
          ['Website forms and purchases:', 'your request (you sent the form or made the purchase) and our legitimate interest in replying. Website measurement and ads: your consent, where the law requires it (Section 12).'],
        ],
      },
    ],
  },
  {
    title: '5. Service providers we share data with',
    blocks: [
      { p: 'We share data only with the providers below, and only what each needs to do its job for us. We do not sell personal data to anyone.' },
      {
        ul: [
          ['Amazon Web Services (AWS):', 'hosting, database, file storage (documents, images, call and telehealth recordings) and backups in the Mumbai (ap-south-1) region. Through AWS Bedrock we use Anthropic’s Claude AI models. On phone calls, AWS Transcribe and Polly can turn speech into text and text into speech.'],
          ['Anthropic:', 'since 8 November 2026, some clinics’ WhatsApp and other message replies, and some phone calls, use Claude through Anthropic’s own API instead of AWS Bedrock. If that fails, the request goes through AWS Bedrock. Anthropic acts as our processor.'],
          ['Google:', 'the Gemini AI models for smile previews (from the photo a patient shares), images for clinic posts, and live voice on calls for clinics that use it; and the Google Business Profile and Places APIs for the clinic’s own listing (Section 6A).'],
          ['Deepgram:', 'turns WhatsApp voice notes, recorded visits and telehealth audio into text.'],
          ['Sarvam AI and ElevenLabs:', 'speech-to-text and voice on phone calls, for clinics that use them.'],
          ['Plivo:', 'phone numbers and phone calls for the voice receptionist.'],
          ['LiveKit:', 'video and audio for telehealth visits.'],
          ['Twilio:', 'login codes by text message for phone numbers outside India, and text messages.'],
          ['MSG91:', 'WhatsApp Business Solution Provider that sends and receives WhatsApp messages for many clinics, and login codes by text message in India.'],
          ['RightSequence:', 'another WhatsApp provider, for clinics that use it.'],
          ['Meta Platforms:', 'WhatsApp Business Platform (Cloud API), Facebook, Instagram, Messenger, Lead Ads, Marketing API and Conversions API, as described in Section 6.'],
          ['Razorpay:', 'payments: clinics paying for Aumy, and purchases on our website. We do not see or store full card details.'],
          ['Expo:', 'push notifications to staff phones using the Aumy app.'],
          ['Email delivery:', '[OWNER TO CONFIRM: name of the email provider used to send account, password and alert emails]. If a clinic connects its own mailbox, Aumy reads and sends that clinic’s email through the clinic’s own email provider.'],
        ],
      },
      { lead: 'AI and your data:', p: 'messages, call audio and transcripts, and the patient and clinic details needed to answer (for example, a patient’s name and upcoming appointments) are sent to the AI provider as they are. We do not remove names or numbers first. Under the terms of AWS Bedrock and Anthropic’s API, they do not use this data to train their models. The Aumy mobile app tells clinic staff about this and asks for their agreement before its AI features are used. Patients who chat with or call a clinic’s AI receptionist are told it is an AI when they ask.' },
      { p: 'Each provider works under its own published data-protection terms. A current list is available on request from the contact email at the bottom of this page.' },
    ],
  },
  {
    title: '6. Meta: Facebook, Instagram, WhatsApp and Meta ads',
    blocks: [
      { p: 'Our Meta app is “AUM AI Platform” (App ID 2067787743777563). A clinic chooses which of its Meta accounts to connect. Each connection is used only to provide Aumy to the clinic that connected it.' },
      { lead: '(a) Facebook Page and Instagram account.', p: 'A clinic staff member connects the clinic’s Page and linked Instagram professional account with Facebook Login for Business. We request these permissions:' },
      {
        ul: [
          ['pages_show_list:', 'to list the Pages you manage, so you can pick the clinic’s Page.'],
          ['pages_messaging, instagram_basic, instagram_manage_messages, pages_manage_metadata:', 'to receive messages people send to the Page or Instagram account (through Meta webhooks), reply to them, and subscribe the Page to those webhooks. We look up the sender’s public name, username and profile picture so the clinic can recognise them. Replies are sent only in answer to a person who messaged first.'],
          ['pages_manage_posts, pages_read_engagement, instagram_content_publish:', 'to publish posts the clinic has approved to its Page and Instagram account, and to read the clinic’s own recent posts once a day.'],
          ['leads_retrieval:', 'to receive the clinic’s Lead Ads (instant form) leads and fetch the answers each person gave.'],
        ],
      },
      { lead: '(b) Meta ad account.', p: 'A clinic connects its ad account with Facebook Login for Business (permissions ads_management, ads_read and business_management), or adds AUM AI’s business as a partner on its ad account. We use this to list the clinic’s ad accounts and pixels, create and change the clinic’s campaigns, ads and lead forms, pause or start them, and read daily ad results, including Meta’s summary breakdowns by age group, gender, region and placement. We act only on the ad account the clinic chose.' },
      { lead: '(c) Conversions API.', p: 'When a clinic switches this on, we send one kind of event to the clinic’s own Meta pixel (dataset): a “Lead” event. We send it only for a new enquiry that came from one of the clinic’s own Meta ads (a click-to-WhatsApp ad or a lead form), that is not an existing patient, and that looks ready to book. The event carries the person’s phone number, email and first name, each scrambled with SHA-256 hashing before it leaves our servers, and a hashed reference number. Where we have them, it also carries the Meta click ID or Meta lead ID, and the IP address and browser details captured with the enquiry. It never carries treatments, appointments, payments, amounts or any health information.' },
      { lead: '(d) WhatsApp Business Platform.', p: 'Some clinics connect their WhatsApp number to us through Meta’s Embedded Signup (permissions whatsapp_business_management and whatsapp_business_messaging). Other clinics’ WhatsApp accounts sit in AUM AI’s Meta Business Manager and are run through MSG91. Through the Cloud API and these providers we send and receive the clinic’s WhatsApp messages, receive delivery and read status, and create and update message templates and check whether Meta approved them.' },
      { lead: 'How we use and protect Meta data:', p: 'only to provide Aumy to the clinic that connected the account. We never sell it, never use it for our own advertising, and never share it with or use it for another clinic. Access tokens are encrypted (AES-256-GCM) before they are stored. We check the signature on every webhook Meta sends us.' },
      { lead: 'How to remove our access:', p: 'in Aumy, use Disconnect for the Facebook Page / Instagram account or the Meta ad account. We stop using the connection and delete its stored access tokens. You can also remove “AUM AI Platform” in Facebook: Settings & privacy → Settings → Business integrations. Meta then tells us, and we disconnect the connections made with your login and delete their access tokens.' },
      { lead: 'How to ask for deletion:', p: 'in Facebook, go to Settings & privacy → Settings → Business integrations (or Apps and websites), find “AUM AI Platform”, remove it, and choose to send a data-deletion request. Meta sends us a signed request. We then, in one step, disconnect the Facebook Page, Instagram and ad-account connections made with your Facebook login, delete every access token stored for them, and remove your Facebook user ID and name from our connection records. We record the request under a random confirmation code and give Meta a link to a status page: https://aumy.aumai.co.in/api/v1/whatsapp-automation/meta/data-deletion/status/<confirmation code>. That page shows when the request was received and completed. See our [data-deletion page](/data-deletion) for details.' },
      { p: 'A request made through Facebook is about the person who logged in to our app with Facebook, usually a member of the clinic’s staff. Messages, leads and posts a clinic received through its connected accounts are that clinic’s data. They stay in the clinic’s Aumy account until the clinic deletes them, and people who messaged a clinic or filled in a clinic’s form should ask the clinic (Section 1).' },
    ],
  },
  {
    title: '6A. Google user data: Business Profile',
    blocks: [
      { p: 'Clinics can connect their own Google Business Profile to Aumy with Google sign-in (OAuth). Our use of information received from Google APIs follows the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements. Specifically:' },
      {
        ul: [
          ['What we access:', 'the Business Profile accounts and locations the signed-in user manages (used once, at connection, so the clinic can pick its own listing); the listing’s performance figures (views, calls, direction requests, website clicks); its reviews; and the ability to publish owner replies and posts on that listing.'],
          ['How we use it:', 'only for the clinic’s own dashboard: showing performance and reviews, and posting the review replies and updates the clinic writes or approves. Google user data is never used for advertising, never sold, never shared with other customers or third parties, and never used to train AI models.'],
          ['Storage:', 'access tokens are stored encrypted, for one clinic and one listing. Reviews and figures are stored only for that clinic’s dashboard and reply history.'],
          ['Deletion:', 'the clinic can disconnect Google Business Profile at any time in Aumy, and the stored Google tokens are cleared. Clinics can also ask for deletion through our [data-deletion process](/data-deletion).'],
        ],
      },
    ],
  },
  {
    title: '7. Where data is stored and transfers',
    blocks: [
      { p: 'Our database and app servers are in AWS Mumbai (ap-south-1). Some providers process data outside India: AI requests through AWS Bedrock may be handled in other AWS regions, Anthropic’s API, Google’s Gemini models and Deepgram are hosted outside India, and Meta’s platforms are global. These transfers happen only as needed to deliver the service, under each provider’s data-protection terms, and only to countries not restricted under the DPDP Act.' },
    ],
  },
  {
    title: '8. How long we keep data',
    blocks: [
      {
        ul: [
          ['Clinic data', '(patient records, messages, leads, call recordings, posts and ad data) is kept for as long as the clinic’s Aumy account is active, or as the clinic instructs, and deleted when the clinic asks. We do not delete messages or leads automatically after a fixed period. Clinics must keep medical records for the period the law requires, and that is their decision.'],
          ['Telehealth recordings', 'are deleted automatically after the number of days set for the clinic (90 days unless the clinic changes it).'],
          ['When a clinic leaves:', 'the clinic can export its data. We then delete or return the clinic’s data within [OWNER TO CONFIRM: number of days; our standard agreement says 30, the data-deletion page said 90] days, except copies the law requires us to keep and backups, which are overwritten in their normal cycle (database backups within 7 days).'],
          ['Meta and Google access tokens', 'are deleted when the clinic disconnects the account or a Meta deletion request is received (Section 6).'],
          ['Website forms and purchases', 'are kept while we are in touch with you and for our business and tax records. You can ask us to delete them at any time.'],
        ],
      },
      { p: 'Deleting a record inside Aumy marks it deleted first (a “soft delete”) so the audit history stays intact. Full removal happens when the clinic asks or when its data is deleted at the end of the service.' },
    ],
  },
  {
    title: '9. Security',
    blocks: [
      { p: 'Data is encrypted in transit (TLS 1.2 or higher) and at rest (database and file storage). Provider keys and access tokens (including Meta and Google tokens) are also encrypted with AES-256-GCM using a separate key before they are stored. Passwords are hashed with bcrypt, and staff can turn on two-factor login. Each user sees only what their role allows, and changes to clinical data are logged. Each clinic’s data is kept apart at the database level, so a user of one clinic cannot read or change another clinic’s data, even through direct API calls.' },
    ],
  },
  {
    title: '10. Your rights',
    blocks: [
      { p: 'Depending on where you are (India DPDP Act, UAE PDPL, EU GDPR, US state laws), you may have the right to access, correct or erase your personal data, to restrict or object to its use, to take a copy, to withdraw consent, to nominate someone to act for you, and to complain to the data-protection authority (in India, the Data Protection Board of India). For patient data we process for a clinic, please contact the clinic first. It is the data controller and can act on your request, and we help it do so. For anything else, contact us at the address below.' },
    ],
  },
  {
    title: '11. Children’s data',
    blocks: [
      { p: 'Our website is not directed at children. Clinics may hold records of child patients in Aumy. In that case the clinic is the data controller and is responsible for the consent of a parent or guardian.' },
    ],
  },
  {
    title: '12. Cookies and analytics',
    blocks: [
      { lead: 'Our own analytics:', p: 'our website stores an anonymous visitor ID in a cookie so we can recognise a returning visit, and records the pages you view, the time spent on each and an approximate city and state worked out from your IP address. This does not identify you by name, and our team may be told about visits as they happen.' },
      { lead: 'Meta Pixel and Conversions API (our own ads):', p: 'our website loads our own tracking tag, which also loads the Meta Pixel. It tells Meta about page views and actions such as sending a form, starting a checkout or making a purchase, from your browser and from our server through Meta’s Conversions API, so we can measure and improve our own ads on Facebook and Instagram. When you type a phone number, email or name into a form on our website, it may be sent to Meta to match the visit to a Meta account. Meta’s Pixel and our server scramble (hash) these details before they are sent. You can control ads based on this in your Facebook settings (Ad preferences). This applies to our own website only. Nothing inside Aumy, and no clinic or patient data, is sent to our own Meta Pixel.' },
      { lead: 'Embedded videos:', p: 'some pages show videos from YouTube, which may set its own cookies when you play them.' },
      { lead: 'Inside Aumy:', p: 'the clinic app uses only the cookies and storage needed for logging in. No advertising trackers are loaded inside Aumy.' },
    ],
  },
  {
    title: '13. Changes to this policy',
    blocks: [
      { p: 'We may update this policy. The “Last Updated” date at the top shows the latest change. If a change affects how patient data is processed, we will tell clinic customers in writing.' },
    ],
  },
];

const CONTACT_HEADING = '14. Contact';
const CONTACT_LEAD = 'For questions about this Privacy Policy, or to use your rights under data-protection law, please contact:';

module.exports = { LAST_UPDATED, TITLE, DESCRIPTION, HEADLINE, SUBTITLE, INTRO, SECTIONS, CONTACT_HEADING, CONTACT_LEAD };
module.exports.default = module.exports;
