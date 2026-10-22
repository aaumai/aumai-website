/**
 * Videos pause when the visitor is not watching them (owner 2026-10-22: "there is no pause button on video
 * and it keeps playing even when the user scrolls and it's out of focus — pause automatically when out of focus").
 *
 * One page-wide manager, started once in src/index.js, so every <video> on every page (and every YouTube
 * embed that carries enablejsapi=1, see withYouTubeJsApi) follows the same rules without per-page code:
 *   1. Less than 25% of it on screen → it pauses.
 *   2. The tab is hidden (another tab, phone locked, app switched) → it pauses.
 *   3. Only one video plays at a time: starting one pauses the others.
 *   4. It never restarts by itself after the visitor touched it (paused, played, or it was paused because they
 *      started another). Only a muted autoplay video the visitor never touched (the home hero) resumes, muted,
 *      when it is back on screen and the tab is visible again.
 * YouTube: no IFrame API script is loaded. The embed's own postMessage protocol (enabled by enablejsapi=1)
 * pauses it and tells us when it starts playing.
 */

const VISIBLE_SHARE = 0.25;
const YT_HOST = /^https:\/\/www\.youtube(-nocookie)?\.com\/embed\//;

// Per-element state, kept off the DOM.
const state = new WeakMap(); // el -> { inView, autoPaused, touched, ignorePause, ignorePlay }
const videos = new Set();
const frames = new Set();
let started = false;

const st = (el) => {
  let s = state.get(el);
  if (!s) { s = { inView: true, autoPaused: false, touched: false, ignorePause: false, ignorePlay: false }; state.set(el, s); }
  return s;
};

/** Add enablejsapi=1 (and our origin) to a YouTube embed URL so the manager can pause it. Other URLs unchanged. */
export const withYouTubeJsApi = (url) => {
  if (!url || !YT_HOST.test(url) || /[?&]enablejsapi=1/.test(url)) return url;
  const origin = typeof window !== 'undefined' ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
  return `${url}${url.includes('?') ? '&' : '?'}enablejsapi=1${origin}`;
};

/** A component's own Play / Pause button calls this so its pause counts as the visitor's choice. */
export const markVideoTouched = (el) => { if (el) st(el).touched = true; };

const ytSend = (frame, payload) => {
  try {
    frame.contentWindow.postMessage(JSON.stringify(payload), new URL(frame.src).origin);
  } catch (e) { /* frame gone or not loaded yet */ }
};
const ytPause = (frame) => ytSend(frame, { event: 'command', func: 'pauseVideo', args: [] });

const pauseVideo = (v, { byOther = false } = {}) => {
  if (v.paused) return;
  const s = st(v);
  s.ignorePause = true;
  if (byOther) s.touched = true; else s.autoPaused = true;
  v.pause();
};

const pauseAllExcept = (keep) => {
  videos.forEach((v) => { if (v !== keep) pauseVideo(v, { byOther: true }); });
  frames.forEach((f) => { if (f !== keep) ytPause(f); });
};

const maybeResume = (v) => {
  const s = st(v);
  if (!s.autoPaused || s.touched || !s.inView || document.hidden) return;
  if (!v.autoplay || !v.muted || !v.paused) return;
  s.autoPaused = false;
  s.ignorePlay = true;
  const p = v.play();
  if (p && p.catch) p.catch(() => { s.ignorePlay = false; });
};

const onPlay = (e) => {
  const v = e.target;
  if (!(v instanceof HTMLVideoElement)) return;
  const s = st(v);
  if (s.ignorePlay) s.ignorePlay = false;
  else if (v.controls) s.touched = true; // started from the browser's own controls
  s.autoPaused = false;
  // An autoplay that only got going after it left the screen (or started below the fold): hold it until seen.
  if (!s.inView && !s.touched && !v.controls) { pauseVideo(v); return; }
  pauseAllExcept(v);
};

const onPause = (e) => {
  const v = e.target;
  if (!(v instanceof HTMLVideoElement)) return;
  const s = st(v);
  if (s.ignorePause) { s.ignorePause = false; return; }
  if (!v.ended) s.touched = true; // the visitor paused it
};

let io = null;
const onIntersect = (entries) => {
  entries.forEach((en) => {
    const el = en.target;
    const s = st(el);
    s.inView = en.isIntersecting && en.intersectionRatio >= VISIBLE_SHARE;
    if (s.inView) {
      if (el instanceof HTMLVideoElement) maybeResume(el);
    } else if (el instanceof HTMLVideoElement) {
      // An autoplay video that has not started yet still counts as auto-paused, so it starts once seen.
      if (el.paused && el.autoplay && !s.touched) s.autoPaused = true;
      pauseVideo(el);
    } else {
      ytPause(el);
    }
  });
};

const onVisibility = () => {
  if (document.hidden) {
    videos.forEach((v) => pauseVideo(v));
    frames.forEach(ytPause);
  } else {
    videos.forEach(maybeResume);
  }
};

const onMessage = (e) => {
  if (!/^https:\/\/www\.youtube(-nocookie)?\.com$/.test(e.origin)) return;
  let data;
  try { data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch (err) { return; }
  if (!data) return;
  const playing = (data.event === 'onStateChange' && data.info === 1)
    || (data.event === 'infoDelivery' && data.info && data.info.playerState === 1);
  if (!playing) return;
  const frame = [...frames].find((f) => f.contentWindow === e.source);
  if (frame) pauseAllExcept(frame);
};

const listenToFrame = (f) => {
  // Ask the embed to report its state; repeated because the player may not be ready on the first try.
  const hello = () => ytSend(f, { event: 'listening', id: 'aumy-video-focus', channel: 'widget' });
  f.addEventListener('load', () => { hello(); setTimeout(hello, 600); setTimeout(hello, 1800); });
};

const track = (el) => {
  if (el instanceof HTMLVideoElement) {
    if (videos.has(el)) return;
    videos.add(el);
    io.observe(el);
  } else if (el instanceof HTMLIFrameElement && YT_HOST.test(el.src) && /[?&]enablejsapi=1/.test(el.src)) {
    if (frames.has(el)) return;
    frames.add(el);
    listenToFrame(el);
    io.observe(el);
    pauseAllExcept(el); // an embed appears when the visitor pressed its play facade
  }
};

const untrack = (el) => {
  if (videos.delete(el) || frames.delete(el)) io.unobserve(el);
};

const scan = (node, fn) => {
  if (!(node instanceof Element)) return;
  if (node.matches('video, iframe')) fn(node);
  node.querySelectorAll('video, iframe').forEach(fn);
};

/** Start the manager once, before the app renders. Safe to call twice. */
export const initVideoFocus = () => {
  if (started || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  started = true;
  io = new IntersectionObserver(onIntersect, { threshold: [0, VISIBLE_SHARE, 0.5, 1] });
  // Media events do not bubble; the capture phase still sees them at the document.
  document.addEventListener('play', onPlay, true);
  document.addEventListener('pause', onPause, true);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('message', onMessage);
  new MutationObserver((muts) => {
    muts.forEach((m) => {
      m.addedNodes.forEach((n) => scan(n, track));
      m.removedNodes.forEach((n) => scan(n, untrack));
    });
  }).observe(document.body, { childList: true, subtree: true });
  scan(document.body, track);
};
