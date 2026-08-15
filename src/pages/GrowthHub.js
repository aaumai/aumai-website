import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GROWTH_CATEGORIES, growthPosts } from '../data/growthPosts';
import './GrowthHub.css';

// Hub for the dental-growth content engine (strategy doc:
// aum-ehr-api/docs/growth/inbound-marketing-strategy.md). Every article
// funnels to the free Revenue Leak Audit — the hub itself closes with the
// same CTA so a browser who reads nothing still sees the offer.
const GrowthHub = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = 'Dental Practice Growth Hub | AUMY by AUM AI';
  }, []);

  const posts =
    activeCategory === 'All'
      ? growthPosts
      : growthPosts.filter((p) => p.category === activeCategory);

  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (dateStr) =>
    new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // Only show category chips that will ever match something, plus All —
  // empty categories will appear as articles get published.
  const visibleCategories = GROWTH_CATEGORIES.filter(
    (cat) => cat === 'All' || growthPosts.some((p) => p.category === cat)
  );

  return (
    <div className="ch-home gh-page">
      <section className="gh-hero">
        <div className="ch-container ch-narrow ch-center">
          <span className="ch-eyebrow">Dental Practice Growth</span>
          <h1 className="gh-hero-title">
            Practical answers to the question every clinic owner asks:
            <span className="gh-accent"> “why isn’t my clinic growing faster?”</span>
          </h1>
          <p className="ch-lead ch-center-lead">
            No jargon, no “AI in dentistry” think-pieces. Real numbers, real WhatsApp messages,
            and systems you can run this week — written from daily conversations with Indian
            dental clinic owners.
          </p>
        </div>
      </section>

      <section className="gh-list-section">
        <div className="ch-container">
          <div className="gh-filters">
            {visibleCategories.map((cat) => (
              <button
                key={cat}
                className={`gh-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="gh-grid">
            {sorted.map((post) => (
              <Link key={post.slug} to={`/growth/${post.slug}`} className="gh-card">
                <span className="gh-card-category">{post.category}</span>
                <h2 className="gh-card-title">{post.title}</h2>
                <p className="gh-card-excerpt">{post.excerpt}</p>
                <div className="gh-card-meta">
                  <span>{formatDate(post.date)}</span>
                  <span className="gh-card-dot" />
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>

          {sorted.length === 0 && (
            <p className="gh-empty">Articles in this category are on the way — check back soon.</p>
          )}
        </div>
      </section>

      <section className="gh-cta-band">
        <div className="ch-container ch-center">
          <h2 className="gh-cta-title">Want to know what this looks like in your clinic?</h2>
          <p className="gh-cta-sub">
            Get a free Revenue Leak Audit — where your clinic is quietly losing bookings, and what
            each gap is worth. Prepared for your clinic, on your WhatsApp within 24 hours.
          </p>
          <div className="ch-hero-cta ch-center-cta">
            <Link to="/growth-audit" className="ch-btn ch-btn-primary">
              Get my free Revenue Leak Audit
            </Link>
            <Link to="/leak-calculator" className="ch-btn ch-btn-ghost ch-ghost-light">
              Try the 60-second leak calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GrowthHub;
