import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { growthPosts } from '../data/growthPosts';
import './GrowthHub.css';

// Article body lives as an HTML string in growthPosts.js so the prerenderer
// can inject the identical markup for crawlers — dangerouslySetInnerHTML is
// safe here because the content is our own authored data file, never user input.
const GrowthArticle = () => {
  const { slug } = useParams();
  const post = growthPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | AUMY Dental Practice Growth`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', post.description);
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/growth" replace />;
  }

  const formatDate = (dateStr) =>
    new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const related = growthPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="ch-home gh-page">
      <article className="gh-article-wrap">
        <div className="ch-container gh-article-container">
          <Link to="/growth" className="gh-back-link">
            ← Dental Practice Growth
          </Link>
          <span className="gh-card-category">{post.category}</span>
          <h1 className="gh-article-title">{post.title}</h1>
          <div className="gh-card-meta gh-article-meta">
            <span>{post.author}</span>
            <span className="gh-card-dot" />
            <span>{formatDate(post.date)}</span>
            <span className="gh-card-dot" />
            <span>{post.readingTime}</span>
          </div>

          <div
            className="gh-article-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* Standard CTA — the one ask every article ends with. Never "buy AUMY". */}
          <div className="gh-article-cta">
            <h2>Want to know what this looks like in your clinic?</h2>
            <p>
              Get a free Revenue Leak Audit: where your clinic is quietly losing enquiries,
              appointments and returning patients — and what each gap is worth in rupees.
              Prepared for your clinic and reviewed by a person, on your WhatsApp within 24 hours.
            </p>
            <div className="ch-hero-cta">
              <Link to="/growth-audit" className="ch-btn ch-btn-primary">
                Get my free Revenue Leak Audit
              </Link>
              {/* Experience beats explanation: the live demo lets a dentist see
                  the product at 11 pm without committing to a sales call. */}
              <a
                href="https://wa.me/918007189868?text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                className="ch-btn ch-btn-ghost"
              >
                Want to see what this actually looks like? WhatsApp AUMY
              </a>
            </div>
            <p className="gh-cta-demo">
              The WhatsApp demo is a live AI receptionist for a demo dental clinic
              (+91&nbsp;80071&nbsp;89868) — just say hello and watch it answer and book, 24/7. Or{' '}
              <a href="/downloads/dental-clinic-revenue-leak-checklist.pdf" download>
                download the one-page Revenue Leak Checklist
              </a>{' '}
              and hand it to your practice manager.
            </p>
          </div>

          {related.length > 0 && (
            <div className="gh-related">
              <h3>Keep reading</h3>
              <div className="gh-grid">
                {related.map((p) => (
                  <Link key={p.slug} to={`/growth/${p.slug}`} className="gh-card">
                    <span className="gh-card-category">{p.category}</span>
                    <h2 className="gh-card-title">{p.title}</h2>
                    <div className="gh-card-meta">
                      <span>{p.readingTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default GrowthArticle;
