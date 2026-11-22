import React, { useEffect, useState } from 'react';
import { setPageSeo } from '../utils/seo';
import { PATH, SEO, HERO, FOR_YOU, HOW, NOTE, ROLES, TIMELINES, QUESTIONS, SUBMIT, SUCCESS, ERROR, PRIVACY } from '../data/apply';
import './HomeClinic.css';

/**
 * /apply — calls with Jayesh are by application (owner 2026-11-22). Every word lives in src/data/apply.js,
 * shared with scripts/prerender.js. The form posts to the site backend (POST /api/aumai/apply), which forwards
 * it to BM; no calendar link is shown.
 */

const API = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/apply`;

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const EMPTY = { name: '', clinic: '', city: '', whatsapp: '', email: '', role: '', chairs: '', new_patients_month: '', enquiry_today: '', timeline: '' };

const utmFromUrl = () => {
  if (typeof window === 'undefined') return null;
  const q = new URLSearchParams(window.location.search);
  const u = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((k) => { if (q.get(k)) u[k] = q.get(k).slice(0, 80); });
  return Object.keys(u).length ? u : null;
};

const ApplyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({ title: SEO.title, description: SEO.description, canonical: `https://aumai.co.in${PATH}` });
  }, []);

  const [form, setForm] = useState(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setError('');
    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, whatsapp_country: 'IN', utm: utmFromUrl() }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success) {
        setStatus('success');
        setForm(EMPTY);
      } else {
        // A validation message from the server is shown as it is; the form keeps what was typed.
        setError(data.error || ERROR);
        setStatus('error');
      }
    } catch (err) {
      console.error('Apply form error:', err);
      setError(ERROR);
      setStatus('error');
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
              <p className="ch-hero-sub">{HERO.sub}</p>
              <p className="ch-hero-sub"><strong>{FOR_YOU.title}</strong></p>
              <ul className="ch-mini">
                {FOR_YOU.items.map((t) => <li key={t}><Check /> {t}</li>)}
              </ul>
              <p className="ch-hero-sub"><strong>{HOW.title}</strong></p>
              <ol className="ch-mini">
                {HOW.steps.map((t, i) => <li key={t}><strong>{i + 1}.</strong>&nbsp;{t}</li>)}
              </ol>
              <p className="ch-hero-trust">{NOTE}</p>
            </div>

            {/* Class ch-audit-form on purpose: BM's website tag counts its submit as a lead. */}
            <form className="ch-audit-form" onSubmit={handleSubmit}>
              <div className="ch-field">
                <label htmlFor="ap-role">{QUESTIONS.role} *</label>
                <select id="ap-role" name="role" value={form.role} onChange={handleChange} required>
                  <option value="">Choose one…</option>
                  {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
              <div className="ch-field-row">
                <div className="ch-field">
                  <label htmlFor="ap-chairs">{QUESTIONS.chairs} *</label>
                  <input id="ap-chairs" name="chairs" type="number" inputMode="numeric" min="1" max="200" value={form.chairs} onChange={handleChange} required placeholder="4" />
                </div>
                <div className="ch-field">
                  <label htmlFor="ap-newpatients">{QUESTIONS.newPatients}</label>
                  <input id="ap-newpatients" name="new_patients_month" type="text" value={form.new_patients_month} onChange={handleChange} placeholder="About 60" maxLength={40} />
                </div>
              </div>
              <div className="ch-field">
                <label htmlFor="ap-enquiry">{QUESTIONS.enquiry} *</label>
                <textarea id="ap-enquiry" name="enquiry_today" rows={3} value={form.enquiry_today} onChange={handleChange} required maxLength={600} placeholder="For example: the desk calls back if they remember" />
              </div>
              <div className="ch-field">
                <label htmlFor="ap-timeline">{QUESTIONS.timeline} *</label>
                <select id="ap-timeline" name="timeline" value={form.timeline} onChange={handleChange} required>
                  <option value="">Choose one…</option>
                  {TIMELINES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="ch-field-row">
                <div className="ch-field">
                  <label htmlFor="ap-name">Your name *</label>
                  <input id="ap-name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Dr. Asha Kulkarni" />
                </div>
                <div className="ch-field">
                  <label htmlFor="ap-clinic">Clinic name *</label>
                  <input id="ap-clinic" name="clinic" type="text" value={form.clinic} onChange={handleChange} required placeholder="Smile Dental Studio" />
                </div>
              </div>
              <div className="ch-field-row">
                <div className="ch-field">
                  <label htmlFor="ap-city">City *</label>
                  <input id="ap-city" name="city" type="text" value={form.city} onChange={handleChange} required placeholder="Pune" />
                </div>
                <div className="ch-field">
                  <label htmlFor="ap-whatsapp">WhatsApp number *</label>
                  <input id="ap-whatsapp" name="whatsapp" type="tel" value={form.whatsapp} onChange={handleChange} required placeholder="+91 98XXXXXXXX" />
                </div>
              </div>
              <div className="ch-field">
                <label htmlFor="ap-email">Email (optional)</label>
                <input id="ap-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@yourclinic.com" />
              </div>
              <button type="submit" className="ch-btn ch-btn-primary ch-audit-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : SUBMIT}
              </button>
              <p className="ch-fineprint">{PRIVACY}</p>
              {status === 'success' && <div className="ch-form-note ch-form-success" role="status">{SUCCESS}</div>}
              {status === 'error' && <div className="ch-form-note ch-form-error" role="alert">{error}</div>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyPage;
