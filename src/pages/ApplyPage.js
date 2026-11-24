import React, { useEffect, useRef, useState } from 'react';
import { setPageSeo } from '../utils/seo';
import {
  PATH, SEO, HERO, QUESTIONS, DECISION_OPTIONS, CHAIR_OPTIONS, TIMELINES, SUBMIT, ERROR, PRIVACY,
  THANKS_BOOK, THANKS_MASTERCLASS, BOOK_URL, MASTERCLASS_URL,
} from '../data/apply';
import './HomeClinic.css';

/**
 * /apply: the call form for serious clinic owners (owner 2026-11-24). Every word lives in src/data/apply.js,
 * shared with scripts/prerender.js. The form posts to the site backend (POST /api/aumai/apply), which answers
 * next: { kind: 'book' | 'masterclass', url }; the form is then replaced by the matching thank-you and its button.
 */

const API = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/apply`;

const EMPTY = { decision_maker: '', chairs: '', timeline: '', name: '', clinic: '', city: '', whatsapp: '', email: '' };

const utmFromUrl = () => {
  if (typeof window === 'undefined') return null;
  const q = new URLSearchParams(window.location.search);
  const u = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((k) => { if (q.get(k)) u[k] = q.get(k).slice(0, 80); });
  return Object.keys(u).length ? u : null;
};

/** The server's answer, or the same rule decided here: not the decision-maker or just exploring → masterclass. */
const nextFor = (data, form) => {
  const n = data && data.next;
  if (n && (n.kind === 'book' || n.kind === 'masterclass') && typeof n.url === 'string' && /^https:\/\//.test(n.url)) return n;
  return form.decision_maker === 'no' || form.timeline === 'exploring'
    ? { kind: 'masterclass', url: MASTERCLASS_URL }
    : { kind: 'book', url: BOOK_URL };
};

/** One-tap answers: radio buttons shown as pills (a visible radio inside each, so the browser's "required" works). */
const Choices = ({ name, legend, options, value, onChange }) => (
  <fieldset className="ch-choices-field">
    <legend>{legend} *</legend>
    <div className="ch-choices">
      {options.map((o) => (
        <label key={o.value} className={`ch-choice${value === o.value ? ' is-on' : ''}`}>
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={onChange} required />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

const ApplyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({ title: SEO.title, description: SEO.description, canonical: `https://aumai.co.in${PATH}` });
  }, []);

  // The typed answers are never cleared: an error keeps them, and the thank-you replaces the form only on success.
  const [form, setForm] = useState(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [next, setNext] = useState(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (next && nextRef.current) nextRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [next]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sent = form;
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...sent, whatsapp_country: 'IN', utm: utmFromUrl() }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success) {
        setNext(nextFor(data, sent));
      } else {
        // A validation message from the server is shown as it is; the form keeps what was typed.
        setError(data.error || ERROR);
      }
    } catch (err) {
      console.error('Apply form error:', err);
      setError(ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ch-home">
      <section className="ch-hero ch-audit-hero">
        <div className="ch-container">
          <div className="ch-audit-grid">
            <div>
              <span className="ch-eyebrow">{HERO.eyebrow}</span>
              <h1 className="ch-hero-title">{HERO.title}</h1>
              <p className="ch-hero-sub">{HERO.intro}</p>
            </div>

            {next ? (
              <div className="ch-next-card" ref={nextRef} role="status">
                {next.kind === 'book' ? (
                  <>
                    <p className="ch-next-title">{THANKS_BOOK.title}</p>
                    <a className="ch-btn ch-btn-primary ch-next-btn" href={next.url}>{THANKS_BOOK.button}</a>
                    <p className="ch-fineprint">{THANKS_BOOK.small}</p>
                  </>
                ) : (
                  <>
                    <p className="ch-next-title">{THANKS_MASTERCLASS.title}</p>
                    <a className="ch-btn ch-btn-primary ch-next-btn" href={next.url}>{THANKS_MASTERCLASS.button}</a>
                  </>
                )}
              </div>
            ) : (
              /* Class ch-audit-form on purpose: BM's website tag counts its submit as a lead. */
              <form className="ch-audit-form" onSubmit={handleSubmit}>
                <Choices name="decision_maker" legend={QUESTIONS.decision_maker} options={DECISION_OPTIONS} value={form.decision_maker} onChange={handleChange} />
                <Choices name="chairs" legend={QUESTIONS.chairs} options={CHAIR_OPTIONS} value={form.chairs} onChange={handleChange} />
                <Choices name="timeline" legend={QUESTIONS.timeline} options={TIMELINES} value={form.timeline} onChange={handleChange} />
                <div className="ch-field-row">
                  <div className="ch-field">
                    <label htmlFor="ap-name">Your name *</label>
                    <input id="ap-name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Dr. Asha Kulkarni" autoComplete="name" />
                  </div>
                  <div className="ch-field">
                    <label htmlFor="ap-clinic">Clinic name *</label>
                    <input id="ap-clinic" name="clinic" type="text" value={form.clinic} onChange={handleChange} required placeholder="Smile Dental Studio" autoComplete="organization" />
                  </div>
                </div>
                <div className="ch-field-row">
                  <div className="ch-field">
                    <label htmlFor="ap-city">City *</label>
                    <input id="ap-city" name="city" type="text" value={form.city} onChange={handleChange} required placeholder="Pune" autoComplete="address-level2" />
                  </div>
                  <div className="ch-field">
                    <label htmlFor="ap-whatsapp">WhatsApp number *</label>
                    <input id="ap-whatsapp" name="whatsapp" type="tel" value={form.whatsapp} onChange={handleChange} required placeholder="+91 98XXXXXXXX" autoComplete="tel" />
                  </div>
                </div>
                <div className="ch-field">
                  <label htmlFor="ap-email">Email (optional)</label>
                  <input id="ap-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@yourclinic.com" autoComplete="email" />
                </div>
                <button type="submit" className="ch-btn ch-btn-primary ch-audit-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : SUBMIT}
                </button>
                <p className="ch-fineprint">{PRIVACY}</p>
                {error && <div className="ch-form-note ch-form-error" role="alert">{error}</div>}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyPage;
