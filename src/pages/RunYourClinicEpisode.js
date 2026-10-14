import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { setPageSeo } from '../utils/seo';
import {
  HUB_PATH, SERIES, EXAMPLE_NOTE, AUMY_LINE,
  episodeBySlug, episodePath, nextEpisode, clock, numberLead,
} from '../data/runYourClinic';
import './HomeClinic.css';
import './GrowthHub.css';
import './RunYourClinic.css';

/**
 * /run-your-clinic/<episode> — one teaching episode: the video (loads only when played), chapters
 * that seek it, the full narration as text with each chapter as an H2, and the scorecard table.
 * Words: src/data/runYourClinic.js, shared with the crawler HTML in scripts/prerender.js.
 * `?t=<seconds>` starts the video at that point (the chapter Clip URLs in the JSON-LD use it).
 */

const Line = ({ text }) => {
  const lead = numberLead(text);
  return lead ? <p><strong>{lead[0]}</strong> {lead[1]}</p> : <p>{text}</p>;
};

// Index of the chapter playing at `sec` (-1 before the first).
const chapterAt = (ep, sec) => {
  let idx = -1;
  ep.chapters.forEach((c, i) => { if (sec >= c.start) idx = i; });
  return idx;
};

const Scorecard =({ rows }) => (
  <div className="ryc-table-wrap">
    <table className="ryc-table">
      <caption>The clinic scorecard: each system and its one number</caption>
      <thead>
        <tr><th scope="col">#</th><th scope="col">System</th><th scope="col">The one number</th></tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.system}>
            <td>{i + 1}</td>
            <th scope="row">{r.system}</th>
            <td>{r.number}{r.aim && <span className="ryc-aim">{r.aim}</span>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RunYourClinicEpisode = () => {
  const { slug } = useParams();
  const { search } = useLocation();
  const ep = episodeBySlug(slug);
  const videoRef = useRef(null);
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (ep) {
      setPageSeo({
        title: ep.seoTitle,
        description: ep.seoDescription,
        canonical: `https://aumai.co.in${episodePath(ep)}`,
        image: `https://aumai.co.in${ep.poster}`,
      });
    }
  }, [ep]);

  // A shared chapter link (?t=57) sets where the video starts. It does not autoplay.
  useEffect(() => {
    if (!ep || !videoRef.current) return;
    const t = parseInt(new URLSearchParams(search).get('t'), 10);
    if (Number.isFinite(t) && t > 0 && t < ep.durationSec) {
      videoRef.current.currentTime = t;
      setCurrent(chapterAt(ep, t));
    }
  }, [ep, search]);

  if (!ep) return <Navigate to={HUB_PATH} replace />;

  const seek = (sec) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = sec;
    setCurrent(chapterAt(ep, sec));
    const playing = v.play();
    if (playing && playing.catch) playing.catch(() => {});
    v.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const onTime = () => {
    const v = videoRef.current;
    if (v) setCurrent(chapterAt(ep, v.currentTime));
  };

  const next = nextEpisode(ep);

  return (
    <div className="ch-home gh-page">
      <article className="gh-article-wrap">
        <div className="ch-container gh-article-container">
          <nav aria-label="Breadcrumb" className="mp-crumbs">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to={HUB_PATH}>{SERIES.name}</Link></li>
              <li aria-current="page">Part {ep.part}</li>
            </ol>
          </nav>
          <span className="gh-card-category">{SERIES.name} · Part {ep.part} · {ep.durationLabel}</span>
          <h1 className="gh-article-title">{ep.h1}</h1>

          {/* Video straight under the H1 so it is above the fold on a phone. */}
          <figure className="ryc-film">
            <video
              ref={videoRef}
              controls
              preload="none"
              playsInline
              poster={ep.poster}
              onTimeUpdate={onTime}
              aria-label={`Video: ${ep.h1}`}
            >
              <source src={ep.src} type="video/mp4" />
            </video>
          </figure>

          <p className="ch-lead ryc-lead">{ep.lead}</p>

          <nav className="ryc-chapters" aria-label="Chapters">
            <h2 className="ryc-chapters-title">Chapters</h2>
            <ol>
              {ep.chapters.map((c, i) => (
                <li key={c.start}>
                  <a
                    href={`?t=${c.start}`}
                    className={i === current ? 'is-current' : undefined}
                    aria-current={i === current ? 'true' : undefined}
                    onClick={(e) => { e.preventDefault(); seek(c.start); }}
                  >
                    <span className="ryc-time">{clock(c.start)}</span>
                    <span>{c.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <p className="ryc-example-note"><span className="ryc-example-tag">Example</span> {EXAMPLE_NOTE}</p>

          <div className="gh-article-body ryc-transcript" aria-label="Full text of the episode">
            {ep.chapters.map((c) => (
              <section key={c.start} aria-labelledby={`ryc-ch-${c.start}`}>
                <h2 id={`ryc-ch-${c.start}`}>{c.heading}</h2>
                <button type="button" className="ryc-play-from" onClick={() => seek(c.start)}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  Play from {clock(c.start)}
                </button>
                {c.scorecard ? (
                  <>
                    <Line text={c.lines[0]} />
                    <Scorecard rows={ep.scorecard} />
                    {c.lines.slice(1).map((l) => <Line key={l} text={l} />)}
                  </>
                ) : (
                  c.lines.map((l) => <Line key={l} text={l} />)
                )}
              </section>
            ))}

            <p className="ryc-aumy-line">
              {AUMY_LINE.before}<Link to="/">{AUMY_LINE.link}</Link>{AUMY_LINE.after}
            </p>
          </div>

          {next && (
            <div className="ryc-next">
              {next.live ? (
                <Link to={episodePath(next)} className="ryc-ep">
                  <span className="ryc-ep-body">
                    <span className="gh-card-category">Next · Part {next.part}</span>
                    <span className="ryc-ep-title">{next.title}</span>
                    <span className="ryc-ep-text">{next.card}</span>
                  </span>
                </Link>
              ) : (
                <div className="ryc-ep ryc-ep-soon">
                  <span className="ryc-ep-body">
                    <span className="ryc-soon-tag">Part {next.part} · Coming next</span>
                    <span className="ryc-ep-title">{next.title}</span>
                    <span className="ryc-ep-text">{next.card}</span>
                  </span>
                </div>
              )}
              <Link to={HUB_PATH} className="gh-back-link ryc-all">All episodes of {SERIES.name} &rarr;</Link>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default RunYourClinicEpisode;
