import React, { useEffect, useState } from 'react';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';

const Check = () => (
  <svg className="ch-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const headaches = [
  'Missed calls & enquiries that never book',
  'No-shows and empty chairs',
  'Patients who never come back',
  'Ads that cost money but bring few patients',
  'Not showing up on Google',
  'Something else',
];

const GrowthAudit = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'Free Clinic Growth Audit — AUMY by AUM AI',
      description:
        'A free growth audit for dental & aesthetic clinics: where you rank on Google versus the clinics near you, how visible you are to new patients, and the specific gaps quietly costing you bookings. Prepared for your clinic within 24 hours.',
      canonical: 'https://aumai.co.in/growth-audit',
    });
  }, []);

  const [form, setForm] = useState({
    name: '',
    clinic: '',
    city: '',
    whatsapp: '',
    email: '',
    headache: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch('https://dabbewaala.aumai.co.in/api/aumai/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email || 'not-provided@aumai.co.in',
          company: `${form.clinic} (${form.city})`,
          service: 'Clinic Growth Audit',
          message: [
            'FREE CLINIC GROWTH AUDIT REQUEST',
            `Clinic: ${form.clinic}`,
            `City/Area: ${form.city}`,
            `WhatsApp: ${form.whatsapp}`,
            form.email ? `Email: ${form.email}` : null,
            form.headache ? `Biggest headache: ${form.headache}` : null,
          ]
            .filter(Boolean)
            .join('\n'),
        }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', clinic: '', city: '', whatsapp: '', email: '', headache: '' });
      } else {
        throw new Error(data.error || 'Failed to send');
      }
    } catch (err) {
      console.error('Growth audit form error:', err);
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
              <span className="ch-eyebrow">Free Clinic Growth Audit</span>
              <h1 className="ch-hero-title">See exactly where your clinic is leaking — and how much.</h1>
              <p className="ch-hero-sub">
                Tell us your clinic and city. Within 24 hours, you get a growth audit prepared
                for <em>your</em> clinic — not an automated template:
              </p>
              <ul className="ch-mini">
                <li><Check /> Where you rank on Google versus the clinics near you — and why</li>
                <li><Check /> How visible you are to the patients searching in your area right now</li>
                <li><Check /> The specific gaps quietly costing you bookings, and what each one is worth</li>
              </ul>
              <p className="ch-hero-trust">
                Free. No obligation. Reviewed by a person before it reaches you.
              </p>
            </div>

            <form className="ch-audit-form" onSubmit={handleSubmit}>
              <div className="ch-field">
                <label htmlFor="ga-name">Your name *</label>
                <input id="ga-name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Dr. Asha Kulkarni" />
              </div>
              <div className="ch-field">
                <label htmlFor="ga-clinic">Clinic name *</label>
                <input id="ga-clinic" name="clinic" type="text" value={form.clinic} onChange={handleChange} required placeholder="Smile Dental Studio" />
              </div>
              <div className="ch-field-row">
                <div className="ch-field">
                  <label htmlFor="ga-city">City / area *</label>
                  <input id="ga-city" name="city" type="text" value={form.city} onChange={handleChange} required placeholder="Baner, Pune" />
                </div>
                <div className="ch-field">
                  <label htmlFor="ga-whatsapp">WhatsApp number *</label>
                  <input id="ga-whatsapp" name="whatsapp" type="tel" value={form.whatsapp} onChange={handleChange} required placeholder="+91 98XXXXXXXX" />
                </div>
              </div>
              <div className="ch-field">
                <label htmlFor="ga-email">Email (optional)</label>
                <input id="ga-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@yourclinic.com" />
              </div>
              <div className="ch-field">
                <label htmlFor="ga-headache">Biggest headache right now? (optional)</label>
                <select id="ga-headache" name="headache" value={form.headache} onChange={handleChange}>
                  <option value="">Choose one…</option>
                  {headaches.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="ch-btn ch-btn-primary ch-audit-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send me my free audit'}
              </button>
              <p className="ch-fineprint">Your details stay with us — used only to prepare and send your audit.</p>

              {status === 'success' && (
                <div className="ch-form-note ch-form-success">
                  Done — your audit is being prepared. It will reach your WhatsApp within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div className="ch-form-note ch-form-error">
                  Something went wrong. WhatsApp us directly at +91 800 718 9868 and we will start your audit.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GrowthAudit;
