import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import blogPosts from '../data/blogPosts';
import BlogComments from '../components/BlogComments';
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
    case 'callout':
      return (
        <div key={index} className={`insight-callout insight-callout--${block.variant || 'info'}`}>
          <div className="insight-callout-icon">
            {block.variant === 'warning' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
            ) : block.variant === 'tip' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
            )}
          </div>
          <div className="insight-callout-content">
            {block.title && <strong className="insight-callout-title">{block.title}</strong>}
            <p>{block.text}</p>
          </div>
        </div>
      );
    case 'stats':
      return (
        <div key={index} className="insight-stats">
          {block.items.map((stat, i) => (
            <div key={i} className="insight-stat" style={{ '--stat-color': stat.color || '#3b82f6' }}>
              <span className="insight-stat-value">{stat.value}</span>
              <span className="insight-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      );
    case 'table':
      return (
        <div key={index} className="insight-table-wrap">
          <table className="insight-table">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'flow':
      return (
        <div key={index} className="insight-flow">
          {block.title && <div className="insight-flow-title">{block.title}</div>}
          <div className="insight-flow-steps">
            {block.steps.map((step, i) => (
              <div key={i} className="insight-flow-step">
                <div className="insight-flow-node" style={{ '--node-color': step.color || '#3b82f6' }}>
                  <span className="insight-flow-num">{i + 1}</span>
                  <div className="insight-flow-text">
                    <strong>{step.title}</strong>
                    {step.desc && <span>{step.desc}</span>}
                  </div>
                </div>
                {i < block.steps.length - 1 && (
                  <div className="insight-flow-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    case 'diagram':
      return (
        <div key={index} className="insight-diagram">
          {block.title && <div className="insight-diagram-title">{block.title}</div>}
          <div className="insight-diagram-layers">
            {block.layers.map((layer, i) => (
              <div key={i} className="insight-diagram-layer" style={{ '--layer-color': layer.color || '#3b82f6' }}>
                <span className="insight-diagram-label">{layer.label}</span>
                <span className="insight-diagram-desc">{layer.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'comparison':
      return (
        <div key={index} className="insight-comparison">
          {block.items.map((item, i) => (
            <div key={i} className="insight-comp-card" style={{ '--comp-color': item.color || '#3b82f6' }}>
              <div className="insight-comp-header">
                <span className="insight-comp-num">{item.num || i + 1}</span>
                <h4>{item.title}</h4>
              </div>
              <p className="insight-comp-subtitle">{item.subtitle}</p>
              <p className="insight-comp-desc">{item.desc}</p>
              {item.tags && (
                <div className="insight-comp-tags">
                  {item.tags.map((tag, j) => (
                    <span key={j}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
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

          {/* Comments */}
          <BlogComments slug={slug} />
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
