import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import blogPosts from '../data/blogPosts';
import './Page.css';
import './InsightsPage.css';

const renderContentBlock = (block, index) => {
  switch (block.type) {
    case 'paragraph':
      return <p key={index} className="insight-p">{block.text}</p>;
    case 'heading':
      return <h2 key={index} className="insight-h2">{block.text}</h2>;
    case 'subheading':
      return <h3 key={index} className="insight-h3">{block.text}</h3>;
    case 'code':
      return (
        <pre key={index} className="insight-code">
          <code>{block.text}</code>
        </pre>
      );
    case 'list':
      return (
        <ul key={index} className="insight-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote key={index} className="insight-quote">
          <p>{block.text}</p>
        </blockquote>
      );
    default:
      return null;
  }
};

const InsightDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | AUM AI Healthcare Solutions`;
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/insights" replace />;
  }

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
          <Link to="/insights" className="insight-back-link">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Insights
          </Link>
          <span className="insight-detail-category">{post.category}</span>
          <h1 className="page-title">{post.title}</h1>
          <div className="insight-detail-meta">
            <span>{post.author}</span>
            <span className="insight-card-dot" />
            <span>{post.authorRole}</span>
            <span className="insight-card-dot" />
            <span>{formatDate(post.date)}</span>
            <span className="insight-card-dot" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </div>

      <article className="section">
        <div className="insight-content">
          {post.content.map((block, i) => renderContentBlock(block, i))}

          {/* Tags */}
          <div className="insight-tags">
            {post.tags.map((tag, i) => (
              <span key={i} className="insight-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="section section-dark">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '1rem',
              fontFamily: 'var(--font-display)',
            }}
          >
            Want to Discuss This Topic?
          </h2>
          <p
            style={{
              color: 'var(--slate-300)',
              fontSize: '1.1rem',
              marginBottom: '2rem',
            }}
          >
            We love talking healthcare technology. Reach out and let us know
            what you think.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default InsightDetail;
