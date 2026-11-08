/**
 * /data-deletion (also served at /delete-account) — ONE copy of the words, read
 * by src/pages/DataDeletion.js AND scripts/prerender.js, so Meta's checker and
 * search engines see the full page in the crawler HTML.
 *
 * Rewritten 8 Nov 2026 (owner approved). The Meta section describes what EHR
 * PR #341 (mig 1288, live 8 Nov 2026) does on a verified Meta data-deletion or
 * deauthorize request — say nothing beyond that.
 *
 * Same content model as src/data/privacyPolicy.js. The literal string {CONTACT}
 * is replaced with the market's contact email by the page and by the prerender.
 */
const LAST_UPDATED = '8 November 2026';
const TITLE = 'Data & Account Deletion | AUM AI';
const DESCRIPTION =
  'How to delete your Aumy account and personal data, how to remove AUM AI’s access to Facebook and Instagram, and how Meta data-deletion requests are handled.';
const HEADLINE = 'Data & Account Deletion';
const SUBTITLE = 'How to request deletion of your account and personal data from Aaumai Healthcare Solutions PVT LTD';

const INTRO = [
  'This page explains how to ask for your account and personal data to be deleted from Aumy, including the Aumy mobile app, our hosted apps (such as aumy.aumai.co.in) and our Meta app “AUM AI Platform”. Aaumai Healthcare Solutions PVT LTD (“Aaumai”, “AUM AI”, “we”) makes software for clinics. Most accounts are created and managed by the clinic (“clinic customer”) you belong to, so the way to ask depends on who you are.',
];

const SECTIONS = [
  {
    title: '1. Clinic staff and app users',
    blocks: [
      { p: 'Clinic staff accounts in Aumy are set up by the clinic’s administrator. To delete your user account and personal data:' },
      {
        ul: [
          'Ask your clinic administrator to remove you from the clinic’s Aumy account, or',
          'Email us at [{CONTACT}](mailto:{CONTACT}?subject=Account%20Deletion%20Request) from your registered email with the subject “Account Deletion Request”.',
        ],
      },
      { p: 'We delete your profile (name, work email, phone), login details, two-factor secrets, push-notification tokens and session data. We keep the audit logs that show which user did what in clinical records, because medical records must stay complete (see Section 5).' },
      { p: 'We act on verified requests within 30 days and confirm by email.' },
    ],
  },
  {
    title: '2. Patients, and people who contacted a clinic',
    blocks: [
      { p: 'If you are a patient of a clinic that uses Aumy, or you messaged a clinic on WhatsApp, Facebook or Instagram, called it, or filled in one of its forms or ads, that clinic controls your data and we process it for the clinic. Please send deletion or correction requests to the clinic. Once the clinic confirms the request, we delete the data from Aumy, subject to the medical-record rules the clinic must follow. You can also email [{CONTACT}](mailto:{CONTACT}?subject=Patient%20Data%20Deletion) and we will pass your request to the right clinic.' },
    ],
  },
  {
    title: '3. Facebook, Instagram and Meta ads (Meta data-deletion requests)',
    blocks: [
      { p: 'This section is for people who logged in to our Meta app, “AUM AI Platform” (App ID 2067787743777563), with Facebook to connect a clinic’s Facebook Page, Instagram account or Meta ad account to Aumy.' },
      { lead: 'To remove our access:', p: 'either' },
      {
        ul: [
          'In Aumy, go to the clinic’s Facebook / Instagram or Meta ads connection and press Disconnect. We stop using it and delete the stored access tokens straight away, or',
          'In Facebook, go to Settings & privacy → Settings → Business integrations, find “AUM AI Platform” and remove it. Meta tells us, and we disconnect the connections made with your Facebook login and delete their access tokens.',
        ],
      },
      { lead: 'To ask for your data to be deleted:', p: 'in Facebook, go to Settings & privacy → Settings → Business integrations (or Apps and websites), find “AUM AI Platform”, remove it, and choose to send a data-deletion request. When Meta sends us your signed request, we check that it really came from Meta, and then in one step we:' },
      {
        ul: [
          'disconnect every Facebook Page, Instagram and Meta ad-account connection made with your Facebook login;',
          'delete every access token we stored for those connections (and stop any Meta pixel link that used the same token);',
          'remove your Facebook user ID and name from our connection records;',
          'record the request under a random confirmation code. We keep only a scrambled (hashed) form of your Facebook ID with it.',
        ],
      },
      { lead: 'Checking the status:', p: 'Meta shows you the confirmation code and a link to a status page at https://aumy.aumai.co.in/api/v1/whatsapp-automation/meta/data-deletion/status/<confirmation code>. The page shows whether it was a deletion request or an app removal, when we received it and when it was completed. If we held no connection for your login, it says so. It shows no personal data.' },
      { lead: 'What a Meta request does not cover:', p: 'messages, leads and posts the clinic received through its connected accounts belong to the clinic and stay in its Aumy account (see Section 2). If your connection was made before 8 November 2026, or the status page says we found nothing and you think we hold data from your login, email [{CONTACT}](mailto:{CONTACT}?subject=Meta%20Data%20Deletion) and we will remove it by hand.' },
    ],
  },
  {
    title: '4. Clinic customers (the whole clinic account)',
    blocks: [
      { p: 'When a clinic’s service agreement ends, we give the clinic an export of its data on request. We then delete or return the clinic’s data within [OWNER TO CONFIRM: number of days; our standard agreement says 30, this page said 90] days, except where the law requires longer.' },
    ],
  },
  {
    title: '5. Data we must keep',
    blocks: [
      { p: 'Some records cannot be deleted on request because the law requires us or the clinic to keep them, for example medical records, invoices and financial records, and security audit logs. We keep only what the law requires. We may also keep anonymous totals that can no longer identify you.' },
    ],
  },
  {
    title: '6. How to reach us',
    blocks: [
      { p: 'For any account or data-deletion request, email [{CONTACT}](mailto:{CONTACT}?subject=Data%20Deletion%20Request). We reply to deletion requests within 30 days. This page goes with our [Privacy Policy](/privacy).' },
    ],
  },
];

module.exports = { LAST_UPDATED, TITLE, DESCRIPTION, HEADLINE, SUBTITLE, INTRO, SECTIONS };
module.exports.default = module.exports;
