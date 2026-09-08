import React from 'react';
import './AppDownload.css';

/**
 * "Get the Aumy app" — download card for the iOS and Android apps (owner ask,
 * 8 Sept 2026). Two variants:
 *   - "section": the full branded band on the home page (mark, headline,
 *     three things the app does, both store badges, a phone frame).
 *   - "compact": just the two badges, for the footer.
 * The badges are drawn inline (no third-party assets) so they load with the
 * page and match the site's palette.
 */
export const APP_STORE_URL = 'https://apps.apple.com/in/app/aumy/id6780580041';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=co.aumai.ehr';

const AppleGlyph = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
    <path d="M16.37 12.63c-.03-2.6 2.13-3.86 2.23-3.92-1.22-1.78-3.11-2.02-3.78-2.05-1.61-.16-3.14.95-3.96.95-.82 0-2.08-.93-3.42-.9-1.76.03-3.38 1.02-4.29 2.6-1.83 3.17-.47 7.87 1.31 10.44.87 1.26 1.91 2.67 3.27 2.62 1.31-.05 1.81-.85 3.4-.85 1.59 0 2.03.85 3.42.82 1.41-.03 2.3-1.28 3.16-2.55 1-1.46 1.41-2.88 1.43-2.95-.03-.01-2.74-1.05-2.77-4.21zM13.77 4.96c.72-.87 1.2-2.08 1.07-3.29-1.04.04-2.29.69-3.04 1.56-.67.77-1.25 2-1.09 3.18 1.16.09 2.34-.59 3.06-1.45z" />
  </svg>
);

const PlayGlyph = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M3.6 2.4c-.3.3-.5.8-.5 1.4v16.4c0 .6.2 1.1.5 1.4l.1.1 9.2-9.2v-.2L3.7 2.3l-.1.1z" fill="#2196f3" />
    <path d="M15.9 15.6l-3-3v-.2l3-3.1.1.1 3.6 2.1c1 .6 1 1.5 0 2.1l-3.6 2.1-.1-.1z" fill="#ffc107" />
    <path d="M16 15.5L12.9 12.4 3.6 21.7c.3.4.9.4 1.5.1L16 15.5" fill="#f44336" />
    <path d="M16 9.3L5.1 3.1c-.6-.4-1.2-.3-1.5.1l9.3 9.2L16 9.3z" fill="#4caf50" />
  </svg>
);

export const StoreBadge = ({ store }) => {
  const apple = store === 'ios';
  return (
    <a
      href={apple ? APP_STORE_URL : PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="app-badge"
      aria-label={apple ? 'Download Aumy on the App Store' : 'Get Aumy on Google Play'}
    >
      <span className="app-badge-icon">{apple ? <AppleGlyph /> : <PlayGlyph />}</span>
      <span className="app-badge-text">
        <span className="app-badge-small">{apple ? 'Download on the' : 'GET IT ON'}</span>
        <span className="app-badge-big">{apple ? 'App Store' : 'Google Play'}</span>
      </span>
    </a>
  );
};

const points = [
  { title: 'Today at a glance', body: 'Every doctor’s appointments, who has arrived and who is in the chair — on your phone, wherever you are.' },
  { title: 'The patient in your hand', body: 'Open any patient’s workspace: history, alerts, notes, X-rays, what was done and what it cost.' },
  { title: 'Speak the visit, done', body: 'Dictate or type the visit; AUMY writes the note, charts the treatment and drafts the prescription for your review.' },
];

const AppDownload = ({ variant = 'section' }) => {
  if (variant === 'compact') {
    return (
      <div className="app-badges app-badges-compact">
        <StoreBadge store="ios" />
        <StoreBadge store="android" />
      </div>
    );
  }
  return (
    <section className="app-dl" id="get-the-app" aria-labelledby="app-dl-title">
      <div className="ch-container app-dl-grid">
        <div className="app-dl-copy">
          <div className="app-dl-eyebrow">
            <img src="/aumy-mark-64.png" alt="" width="28" height="28" />
            <span>Aumy for iOS &amp; Android</span>
          </div>
          <h2 id="app-dl-title" className="app-dl-title">Your clinic, in your pocket.</h2>
          <p className="app-dl-sub">
            The Aumy app puts the day, every patient and AUMY&rsquo;s help on your phone &mdash; for doctors
            between chairs and the front desk on the move. Same login as the web.
          </p>
          <ul className="app-dl-points">
            {points.map((p) => (
              <li key={p.title}>
                <span className="app-dl-check" aria-hidden="true">
                  <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
                </span>
                <span><strong>{p.title}.</strong> {p.body}</span>
              </li>
            ))}
          </ul>
          <div className="app-badges">
            <StoreBadge store="ios" />
            <StoreBadge store="android" />
          </div>
          <p className="app-dl-fine">Free with your Aumy subscription. Available in India on the App Store and Google Play.</p>
        </div>

        <div className="app-dl-phone" aria-hidden="true">
          <div className="app-phone">
            <div className="app-phone-notch" />
            <div className="app-phone-screen">
              <div className="app-phone-top">
                <img src="/aumy-mark-64.png" alt="" width="26" height="26" />
                <div>
                  <div className="app-phone-brand">Aumy</div>
                  <div className="app-phone-sub">Tuesday, 8 Sep</div>
                </div>
              </div>
              <div className="app-phone-tallies">
                <span><b>58</b>today</span>
                <span><b>5</b>engaged</span>
                <span><b>16</b>done</span>
              </div>
              <div className="app-phone-card c1"><i /><div><b>Rukmani C.</b><small>9:00 am &middot; 30 min &middot; Crown 36</small></div></div>
              <div className="app-phone-card c2"><i /><div><b>Amit P.</b><small>10:00 am &middot; 45 min &middot; RCT sitting 2</small></div></div>
              <div className="app-phone-card c3"><i /><div><b>Sheila K.</b><small>11:00 am &middot; 30 min &middot; Scaling</small></div></div>
              <div className="app-phone-ai">
                <span className="app-phone-ai-dot" />
                AUMY drafted the note, 2 treatments and the prescription &mdash; review &amp; sign
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
