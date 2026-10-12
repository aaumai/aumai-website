import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import AppDownload from '../components/AppDownload';
import ClinicsServed from '../components/ClinicsServed';
import HomeModules from '../components/HomeModules';
import HomeExplainers from '../components/HomeExplainers';
import { HERO_VIDEO } from '../data/explainers';
// One FAQ list for the visible page, the crawler HTML and the FAQPage JSON-LD (scripts/prerender.js).
import { FAQS as HOME_FAQ } from '../data/homeFaq';
import { HERO_PRODUCTS, HOME_EXPLORE } from '../data/positioning';
import './HomeClinic.css';

// Lean home (owner 2026-10-12: "too much old information … make it lean and get rid of our old positioning",
// "make sure we do not lose the seo advantage"). Eight sections: hero → module explainers → proof → modules →
// be the patient → app → FAQ → one call to action. Title, description, H1, JSON-LD (org, software, FAQ, videos)
// and every internal link are kept (HOME_EXPLORE). The retired sections (coordination problem, chaos groups,
// two halves, Jarvis, Convert→Care→Retain→Reactivate, leak check, PMS, why it works, growth expert, Get Found,
// why us, fit gate, 30-day offer, founder close) are in git history before this commit.

// Real, attributed partner-clinic testimonials (sourced from the revenue-generator page).
const testimonials = [
  {
    quote:
      `AUM AI brought us a steady stream of new patients, woke up our dormant list, and kept our regulars coming back. Our revenue grew about 25% in just two months — and we didn’t hire a single extra person to make it happen.`,
    name: 'Vinayaka Dental Care',
    clinic: 'Dental clinic',
    result: '+25% revenue in 2 months',
  },
];

const Home = () => {
  useEffect(() => {
    setPageSeo({
      // SEO review 2026-10-06: the home page owns "AI dental software" + "AI receptionist" (brand
      // first); "dental software india" / "clinic management" belong to /ai-dental-software-india.
      // Same strings in scripts/prerender.js (slug '') and public/index.html; the description is the
      // one canonical sentence used site-wide, price from src/data/pricing.js.
      title: 'Aumy | AI Dental Software & AI Receptionist for Dental Clinics in India',
      description:
        'AI dental software for dental clinics in India: an AI receptionist on calls & WhatsApp 24/7, reminders, follow-ups, records and billing. From ₹3,000 a month.',
      canonical: 'https://aumai.co.in/',
      image: 'https://aumai.co.in/screenshots/roi-preview.png',
    });
  }, []);

  return (
    <div className="ch-home">
      {/* HERO */}
      <section className="ch-hero lux-hero">
        {/* Owner 2026-10-12: the Aumy loop is retired; the hero shows the whole-Aumy film. */}
        <span className="lux-scroll-cue" aria-hidden="true" />
        <div className="ch-container ch-hero-grid lux-hero-grid">
          <div className="ch-hero-text">
            <span className="ch-eyebrow">AI Dental Software · India</span>
            <h1 className="ch-hero-title">
              Stop <span className="ch-hero-accent">losing patients.</span>
            </h1>
            {/* Owner 2026-10-12: "keep it damn simple" — one product, one outcome, one line.
                Words: src/data/positioning.js (HERO_PRODUCTS), mirrored in scripts/prerender.js. */}
            <ul className="ch-hero-products">
              {HERO_PRODUCTS.map((p) => (
                <li key={p.id}>
                  <Link to={`/modules/${p.id}`}>{p.name}</Link> <span>{p.outcome}</span>
                </li>
              ))}
            </ul>
            <div className="ch-hero-cta">
              <a href="#get-the-app" className="ch-btn ch-btn-primary">
                Start free in the app
              </a>
              <Link to="/contact" className="ch-btn ch-btn-ghost">
                Get started — risk-free
              </Link>
            </div>
            <a
              href="#be-the-patient"
              className="ch-btn ch-hero-wa"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 12,
                background: '#25D366', color: '#fff', fontWeight: 700,
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Try it live — WhatsApp or call our demo clinic
            </a>
            <p className="ch-hero-trust">
              1,000 free Aumy credits per product · cancel any time · NVIDIA Inception member
            </p>
          </div>

          {/* Owner 2026-10-12: the loop is retired; the whole-Aumy film plays here. Words: src/data/explainers.js. */}
          <div className="lux-hero-loop">
            <figure className="ch-hero-film">
              <video controls preload="none" playsInline poster={HERO_VIDEO.poster} aria-label={`${HERO_VIDEO.name} explainer video`}>
                <source src={HERO_VIDEO.src} type="video/mp4" />
              </video>
            </figure>
          </div>
        </div>
      </section>

      {/* ── One explainer video per module (owner 2026-10-12), immediately under the hero. Words: src/data/explainers.js. */}
      <HomeExplainers />

      {/* ── Proof: who runs on Aumy (src/data/clinicsServed.js) and a clinic owner in his own words. */}
      <ClinicsServed />

      {/* PROOF */}
      <section className="ch-section">
        <div className="ch-container ch-center">
          <h2 className="ch-h2">Busy clinics already run on Aumy.</h2>
          <p className="ch-lead ch-center-lead">
            Hear it from a clinic owner — 37 seconds, in his own words.
          </p>
          <div className="ch-proof-grid">
            <figure className="ch-video-card">
              <video
                controls
                preload="none"
                playsInline
                poster="/videos/dr-ronak-poster.jpg"
              >
                <source src="/videos/dr-ronak-vinayaka.mp4" type="video/mp4" />
              </video>
              <figcaption>
                <strong>Dr. Ronak</strong> · Vinayaka Dental Care
                <span className="ch-result"> — fewer no-shows, recalls coming back, up 20–25% in 2–3 months</span>
              </figcaption>
            </figure>
            {testimonials.length > 0 && (
              <div className="ch-testimonials ch-testimonials-col">
                {testimonials.map((t, i) => (
                  <figure key={i} className="ch-testimonial">
                    <blockquote>{t.quote}</blockquote>
                    <figcaption>
                      <strong>{t.name}</strong> · {t.clinic}
                      {t.result ? <span className="ch-result"> — {t.result}</span> : null}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
          <div className="ch-badges">
            <span className="ch-badge">NVIDIA Inception member</span>
            <span className="ch-badge">Built by healthcare technologists</span>
            <span className="ch-badge">Your data, secured</span>
          </div>
        </div>
      </section>

      {/* ── Aumy is built from modules (owner 2026-10-08). Words: src/data/modules.js (HOME, PAGES). */}
      <HomeModules />

      {/* ── Be the patient: live hands-on demo ─────────────────────────── */}
      <section className="ch-section" id="be-the-patient">
        <div className="ch-container">
          <div className="ch-head">
            <span className="ch-eyebrow">Don&rsquo;t watch a demo</span>
            <h2 className="ch-h2">Be the patient.</h2>
            <p className="ch-sub">
              WhatsApp or call our live demo clinic and experience exactly what your patients would —
              the same AI, the same follow-ups, the real product.
            </p>
          </div>
          <div className="ch-why-card" style={{ display: 'block', maxWidth: 720, margin: '0 auto', padding: 28 }}>
            <p style={{ fontSize: '1.15rem', fontWeight: 700, textAlign: 'center', marginTop: 0 }}>
              📱 WhatsApp <a href="https://wa.me/919022312554?text=Hi%2C%20I%20wanted%20to%20ask%20about%20aligners" style={{ whiteSpace: 'nowrap' }}>+91 90223 12554</a>
            </p>
            <p style={{ fontSize: '1.15rem', fontWeight: 700, textAlign: 'center', margin: '8px 0 0' }}>
              📞 Call <a href="tel:+912264230581" style={{ whiteSpace: 'nowrap' }}>+91 22 6423 0581</a> and wait a couple of rings — Aumy Voice will pick up.
            </p>
            <p style={{ textAlign: 'center', color: '#5b6784', margin: '6px 0 0', fontSize: '0.95rem' }}>
              This is our demo clinic, Lumière Dental — Aumy answers as its receptionist.
            </p>
            <ol style={{ lineHeight: 1.9, margin: '18px 0 0', paddingLeft: 22 }}>
              <li><strong>Ask about aligners or implants</strong> — watch it answer instantly, like your best receptionist on her best day.</li>
              <li><strong>Book a slot… or don&rsquo;t.</strong> Go quiet, and see the gentle follow-up arrive tomorrow.</li>
              <li><strong>Booked? Try changing your mind</strong> — reschedule or cancel in one message, no phone queue.</li>
              <li><strong>Skip your appointment</strong> — and watch how it wins the rebooking without nagging.</li>
              <li><strong>After your &ldquo;visit&rdquo;</strong>, we&rsquo;ll mark it done — see how it asks for your feedback.</li>
              <li><strong>Come back in 3 months</strong> for your check-up reminder. Ghost us for 6, and Aumy will try to win you back 🙂</li>
            </ol>
            <p style={{ marginTop: 18, textAlign: 'center', color: '#5b6784' }}>
              Every message you get is exactly what your patients would get.
            </p>
          </div>
        </div>
      </section>

      {/* GET THE APP — iOS + Android (self-serve signups start here) */}
      <AppDownload />

      {/* FAQ */}
      <section className="ch-section">
        <div className="ch-container ch-narrow">
          <h2 className="ch-h2 ch-center">Questions clinic owners ask</h2>
          <div className="ch-faq">
            {HOME_FAQ.map((f, i) => (
              <details key={i} className="ch-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ONE CALL TO ACTION + explore links (keeps every key page linked from home) */}
      <section className="ch-offer">
        <div className="ch-container ch-center">
          <h2 className="ch-offer-title">Stop losing patients. Start with one module.</h2>
          <p className="ch-offer-sub">
            Pick the leak costing your clinic most and fix only that — 1,000 free Aumy credits for each product.
            Want everything set up for you? Call us on <a href="tel:+918007189868" style={{ color: 'inherit', whiteSpace: 'nowrap' }}>80071 89868</a>.
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <a href="#get-the-app" className="ch-btn ch-btn-primary">Start free in the app</a>
            <Link to="/contact" className="ch-btn ch-btn-ghost ch-ghost-light">Talk to our team</Link>
          </div>
          <nav className="ch-explore" aria-label="Explore Aumy">
            {HOME_EXPLORE.map((e) => (
              <Link key={e.to} to={e.to}>{e.label}</Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
};

export default Home;
