import React from 'react';
import { CAPACITY } from '../data/capacity';
import './CapacityLine.css';

/** "We start 3 new clinics a month … Next start: 1 December · 2 places left." True numbers only (src/data/capacity.js). */
export default function CapacityLine({ className = '' }) {
  const { perMonth, nextStart, placesLeft } = CAPACITY;
  const places = placesLeft > 0
    ? `${placesLeft} ${placesLeft === 1 ? 'place' : 'places'} left`
    : 'this start is full';
  return (
    <p className={`cap-line ${className}`}>
      <strong>We start {perMonth} new clinics a month,</strong> so each gets a hands-on setup and a go-live week where
      we watch every message with you. <strong>Next start: {nextStart} · {places}.</strong>
    </p>
  );
}
