import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogPosts, { BLOG_CATEGORIES } from '../data/blogPosts';
import './Page.css';
import './InsightsPage.css';

const InsightsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = 'Insights | AUM AI Healthcare Solutions';
  }, []);

  const filteredPosts =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const formatDate = (dateStr) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Insights</h1>
          <p className="page-subtitle">
            Ideas and perspectives on clinic growth, patient experience, and healthcare technology
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Category Filters */}
          <div className="insights-filters">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`insights-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="insights-grid">
            {sortedPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/insights/${post.slug}`}
                className="insight-card"
              >
                <span className="insight-card-category">{post.category}</span>
                <h3 className="insight-card-title">{post.title}</h3>
                <p className="insight-card-excerpt">{post.excerpt}</p>
                <div className="insight-card-meta">
                  <span className="insight-card-author">{post.author}</span>
                  <span className="insight-card-dot" />
                  <span>{formatDate(post.date)}</span>
                  <span className="insight-card-dot" />
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>

          {sortedPosts.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--slate-500)', padding: '3rem 0' }}>
              No posts in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
