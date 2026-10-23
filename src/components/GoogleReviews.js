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
 * The full section leads with the `hero` review as a wide featured card
 * (owner 2026-10-22: Dr Priyanka's review), then the rest as cards.
 * `limit` shows only the first N (the compact strip on /pricing), where the
 * hero review is simply the first card.
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

// The words shown on a card: an excerpt (her exact sentences, owner 2026-10-23) when the row has one,
// the short excerpt in the compact /pricing strip, otherwise the full review.
const shownText = (review, compact = false) =>
  (compact && review.excerptShort) || review.excerpt || review.text;

// "Read her full review on Google" under an excerpt.
const FullReviewLink = ({ review }) =>
  review.excerpt && review.fullReviewUrl ? (
    <a className="gr-full-link" href={review.fullReviewUrl} target="_blank" rel="noopener noreferrer">
      Read her full review on Google <span aria-hidden="true">→</span>
    </a>
  ) : null;

const Who = ({ review, featured = false }) => (
  <figcaption className="gr-who">
    <span className="gr-avatar" aria-hidden="true">{initials(review.name)}</span>
    <span className="gr-meta">
      <span className="gr-name">{review.name}</span>
      {review.clinic && <span className="gr-clinic">{review.clinic}</span>}
      <span className="gr-when">
        {review.hideMonth ? 'Google review' : featured ? `Google review · ${review.month}` : `${review.month} · Google review`}
      </span>
    </span>
  </figcaption>
);

// The full text is always in the page; long ones are clamped by CSS and get
// "Read more" only when the clamp actually hides something at this width.
function useClamp() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const check = () => {
      if (!open) setClamped(el.scrollHeight - el.clientHeight > 2);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [open]);

  return { ref, open, setOpen, clamped };
}

function ReviewText({ text, clampRef, open }) {
  return (
    <blockquote ref={clampRef} className={`gr-text${open ? '' : ' gr-text--clamped'}`}>
      {text}
    </blockquote>
  );
}

function MoreButton({ open, setOpen, clamped }) {
  if (!clamped && !open) return null;
  return (
    <button type="button" className="gr-more" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
      {open ? 'Show less' : 'Read more'}
    </button>
  );
}

function ReviewCard({ review, compact }) {
  const { ref, open, setOpen, clamped } = useClamp();
  return (
    <figure className="gr-card">
      <Who review={review} />
      <Stars count={review.stars} />
      <ReviewText text={shownText(review, compact)} clampRef={ref} open={open} />
      <MoreButton open={open} setOpen={setOpen} clamped={clamped} />
      <FullReviewLink review={review} />
    </figure>
  );
}

// The featured review: her own line as the heading, the full review, then who she is.
function HeroReviewCard({ review }) {
  const { ref, open, setOpen, clamped } = useClamp();
  // "Watch her team's video" only when that video is on this page (the home hero).
  const [hasVideo, setHasVideo] = useState(false);
  useEffect(() => {
    setHasVideo(Boolean(review.videoId && document.getElementById(review.videoId)));
  }, [review.videoId]);

  return (
    <figure className="gr-card gr-hero">
      <h3 className="gr-pull">
        <span className="gr-pull-mark" aria-hidden="true">“</span>
        {review.pullQuote}
      </h3>
      <div className="gr-hero-body">
        <ReviewText text={shownText(review)} clampRef={ref} open={open} />
        <MoreButton open={open} setOpen={setOpen} clamped={clamped} />
        <FullReviewLink review={review} />
      </div>
      <div className="gr-hero-who">
        <Stars count={review.stars} />
        <Who review={review} featured />
        {hasVideo && (
          <a className="gr-video-link" href={`#${review.videoId}`}>
            <span aria-hidden="true">▶</span> Watch her team's video
          </a>
        )}
      </div>
    </figure>
  );
}

export default function GoogleReviews({ limit, compact = false }) {
  const reviews = limit ? GOOGLE_REVIEWS.slice(0, limit) : GOOGLE_REVIEWS;
  if (!reviews.length) return null;
  // The compact strip keeps every review as a plain card (the hero is its first card).
  const hero = compact ? null : reviews.find((r) => r.hero && r.pullQuote);
  const cards = hero ? reviews.filter((r) => r !== hero) : reviews;

  return (
    <section
      className={`ch-section gr${compact ? ' gr--compact' : ''}`}
      id="google-reviews"
      aria-labelledby="gr-title"
    >
      <div className="ch-container ch-center">
        <span className="ch-eyebrow">Google reviews</span>
        <h2 id="gr-title" className="ch-h2">What our customers say</h2>
        {hero && <HeroReviewCard review={hero} />}
        <ul className="gr-grid">
          {cards.map((r) => (
            <li key={r.name}>
              <ReviewCard review={r} compact={compact} />
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
