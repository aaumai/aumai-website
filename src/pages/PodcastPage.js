import React, { useEffect, useState } from 'react';
import { setPageSeo } from '../utils/seo';
import './HomeClinic.css';
import './GrowthHub.css';

/**
 * The Dental Growth Podcast — guest application page. Live BEFORE episode 1
 * on purpose: it collects guests (dentists, orthodontists, dental marketers,
 * educators, entrepreneurs) while the show is in prep. Podcast plan:
 * aum-ehr-api/docs/growth/dental-growth-podcast-plan.md. The show is
 * deliberately NOT AUMY-branded — this page is the only place it touches
 * the AUMY site, as the application funnel.
 */

const ROLES = [
  'Dentist / practice owner',
  'Orthodontist / specialist',
  'Dental entrepreneur (chains, labs, products)',
  'Dental marketer / growth consultant',
  'Dental educator / academician',
  'Other (tell us below)',
];

const PodcastPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo({
      title: 'The Dental Growth Podcast — Be a Guest | Conversations on the Business of Dentistry in India',
      description:
        'A podcast about the business of dentistry in India: growth, patients, marketing, operations and practice economics — told by the dentists, orthodontists, dental marketers, educators and entrepreneurs living it. Apply to be a guest.',
      canonical: 'https://aumai.co.in/podcast',
    });
  }, []);

  const [form, setForm] = useState({ name: '', role: '', org: '', city: '', whatsapp: '', email: '', topic: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch('https://site-api.aumai.co.in/api/aumai/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email || 'not-provided@aumai.co.in',
          company: `${form.org} (${form.city})`,
          service: 'Podcast Guest Application',
          message: [
            'PODCAST GUEST APPLICATION',
            `Name: ${form.name}`,
            `Role: ${form.role}`,
            `Clinic/Company: ${form.org}`,
            `City: ${form.city}`,
            `WhatsApp: ${form.whatsapp}`,
            form.email ? `Email: ${form.email}` : null,
            form.topic ? `Story/topic they want to talk about: ${form.topic}` : null,
          ]
            .filter(Boolean)
            .join('\n'),
        }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', role: '', org: '', city: '', whatsapp: '', email: '', topic: '' });
      } else {
        throw new Error(data.error || 'Failed to send');
      }
    } catch (err) {
      console.error('Podcast guest form error:', err);
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
              <span className="ch-eyebrow">The Dental Growth Podcast</span>
              <h1 className="ch-hero-title">The business of dentistry, told by the people living it.</h1>
              <p className="ch-hero-sub">
                Honest conversations with Indian dentists and the people who help them grow — how
                practices actually get patients, what marketing really costs, why leads vanish, how
                a solo clinic becomes three chairs. No clinical lectures, no product pitches. Just
                the part of dentistry nobody teaches in college: running it as a business.
              </p>
              <h2 className="gh-cta-title" style={{ fontSize: '22px', marginTop: '28px' }}>
                We're looking for guests
              </h2>
              <ul className="ch-mini">
                <li>Dentists &amp; practice owners with a growth story (or a hard lesson)</li>
                <li>Orthodontists &amp; specialists building a referral practice</li>
                <li>Dental entrepreneurs — chains, labs, products, platforms</li>
                <li>Dental marketers, consultants &amp; educators who work with clinics</li>
              </ul>
              <p className="ch-hero-trust">
                40 minutes, online or in person (Pune). Free — guests never pay and never get paid.
                Your clinic or company gets the spotlight, and every episode is shared as clips,
                articles and posts your network will actually see.
              </p>
            </div>

            <form className="ch-audit-form podcast-form" onSubmit={handleSubmit}>
              <div className="ch-field">
                <label htmlFor="pg-name">Your name *</label>
                <input id="pg-name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Dr. Asha Kulkarni" />
              </div>
              <div className="ch-field">
                <label htmlFor="pg-role">You are a… *</label>
                <select id="pg-role" name="role" value={form.role} onChange={handleChange} required>
                  <option value="">Choose one…</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="ch-field-row">
                <div className="ch-field">
                  <label htmlFor="pg-org">Clinic / company *</label>
                  <input id="pg-org" name="org" type="text" value={form.org} onChange={handleChange} required placeholder="Smile Dental Studio" />
                </div>
                <div className="ch-field">
                  <label htmlFor="pg-city">City *</label>
                  <input id="pg-city" name="city" type="text" value={form.city} onChange={handleChange} required placeholder="Pune" />
                </div>
              </div>
              <div className="ch-field-row">
                <div className="ch-field">
                  <label htmlFor="pg-whatsapp">WhatsApp number *</label>
                  <input id="pg-whatsapp" name="whatsapp" type="tel" value={form.whatsapp} onChange={handleChange} required placeholder="+91 98XXXXXXXX" />
                </div>
                <div className="ch-field">
                  <label htmlFor="pg-email">Email (optional)</label>
                  <input id="pg-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@yourclinic.com" />
                </div>
              </div>
              <div className="ch-field">
                <label htmlFor="pg-topic">What story or topic would you want to talk about? *</label>
                <input id="pg-topic" name="topic" type="text" value={form.topic} onChange={handleChange} required placeholder="How we grew from one chair to three in two years" />
              </div>
              <button type="submit" className="ch-btn ch-btn-primary ch-audit-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Apply to be a guest'}
              </button>
              <p className="ch-fineprint">
                We reply within 48 hours. Your details are used only to plan the episode.
              </p>

              {status === 'success' && (
                <div className="ch-form-note ch-form-success">
                  Got it — we'll be in touch on WhatsApp within 48 hours to find a slot.
                </div>
              )}
              {status === 'error' && (
                <div className="ch-form-note ch-form-error">
                  Something went wrong. WhatsApp us directly at +91 800 718 9868 with "podcast" and
                  we'll take it from there.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodcastPage;
