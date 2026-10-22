import React, { useEffect, useRef, useState } from 'react';
import {
  GOOGLE_RATING,
  GOOGLE_REVIEWS,
  GOOGLE_REVIEWS_URL,
  GOOGLE_WRITE_REVIEW_URL,
} from '../data/googleReviews';
import './GoogleReviews.css';

/**
 * "What our customers say" — Aumy's Google reviews, word for word
 * (owner 2026-10-22). Words: src/data/googleReviews.js, mirrored in
 * scripts/prerender.js. No Review/AggregateRating markup (self-serving).
 *
 * `limit` shows only the first N (the compact strip on /pricing).
 */

// "Dr Ronak Oswal" -> "RO": honorifics are skipped so the avatar shows the person.
const initials = (name) =>
  name
    .split(/\s+/)
    .filter((w) => w && !/^(dr|mr|mrs|ms)\.?$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

const Stars = ({ count }) => (
  <span className="gr-stars" role="img" aria-label={`${count} out of 5 stars`}>
    {'★★★★★'.slice(0, count)}
  </span>
);

function ReviewCard({ review }) {
  const textRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [clamped, setClamped] = useState(false);

  // The full text is always in the page; long ones are clamped by CSS and get
  // "Read more" only when the clamp actually hides something at this width.
  useEffect(() => {
    const el = textRef.current;
    if (!el) return undefined;
    const check = () => {
      if (!open) setClamped(el.scrollHeight - el.clientHeight > 2);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [open]);

  return (
    <figure className="gr-card">
      <figcaption className="gr-who">
        <span className="gr-avatar" aria-hidden="true">{initials(review.name)}</span>
        <span className="gr-meta">
          <span className="gr-name">{review.name}</span>
          <span className="gr-when">{review.month} · Google review</span>
        </span>
      </figcaption>
      <Stars count={review.stars} />
      <blockquote
        ref={textRef}
        className={`gr-text${open ? '' : ' gr-text--clamped'}`}
      >
        {review.text}
      </blockquote>
      {(clamped || open) && (
        <button
          type="button"
          className="gr-more"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
    </figure>
  );
}

export default function GoogleReviews({ limit, compact = false }) {
  const reviews = limit ? GOOGLE_REVIEWS.slice(0, limit) : GOOGLE_REVIEWS;
  if (!reviews.length) return null;

  return (
    <section
      className={`ch-section gr${compact ? ' gr--compact' : ''}`}
      id="google-reviews"
      aria-labelledby="gr-title"
    >
      <div className="ch-container ch-center">
        <span className="ch-eyebrow">Google reviews</span>
        <h2 id="gr-title" className="ch-h2">What our customers say</h2>
        <ul className="gr-grid">
          {reviews.map((r) => (
            <li key={r.name}>
              <ReviewCard review={r} />
            </li>
          ))}
        </ul>
        <p className="gr-foot">
          <span className="gr-score">
            <strong>{GOOGLE_RATING}</strong> <Stars count={5} /> on Google
          </span>
          <span className="gr-dot gr-dot--lead" aria-hidden="true">·</span>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            Read all reviews
          </a>
          <span className="gr-dot" aria-hidden="true">·</span>
          <a href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
            Write a review
          </a>
        </p>
      </div>
    </section>
  );
}
