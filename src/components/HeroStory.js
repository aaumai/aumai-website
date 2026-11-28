import React, { useEffect, useRef, useState } from 'react';
import { HERO } from '../data/homeOneProduct';
import './HeroStory.css';

/**
 * Home hero animation (owner 2026-11-28, storyboard approved): one inline SVG, animated with CSS keyframes only,
 * ~14 s loop, silent, no library, no video, no image download.
 *
 *  1. A calm clinic: a dentist at the chair with a patient; a phone answers "New enquiry 10:47 pm" and books it.
 *  2. Step 1, Aumy set up: reminder sent, missed visit rebooked, crown follow-up done. "Operations streamlined".
 *  3. Step 2: a generic search card, "dentist near me", the clinic first, stars to 4.9, Directions tapped.
 *  4. Step 3: an "Implants · enquiry" ad card flows into the clinic. "Ads, taught to your team".
 *  5. The split frame: "You: the dentistry." | "Aumy: everything else." (2 am call answered, bookings filling a
 *     calendar, follow-ups ticked). Held ~2 s, then the loop starts again.
 *
 * Every element of scenes 1-4 is hidden by default and scene 5 is shown, so with prefers-reduced-motion (where no
 * animation is declared at all) the visitor sees the final frame, still. It pauses when scrolled out of view, and the
 * button pauses it for good (WCAG 2.2.2). Fixed aspect ratio: no layout shift. Words: src/data/homeOneProduct.js
 * (HERO.story). Timings: src/components/HeroStory.css.
 */

const S = HERO.story;
const [STEP1, STEP2, STEP3] = S.steps;

const NAVY = '#0a0f22';
const NAVY2 = '#101a3e';
const NAVY3 = '#17307c';
const GOLD = '#b8975a';
const GOLD2 = '#dcc594';
const MIST = '#f3f0e9';
const LINE = '#e2dbcd';
const SKIN_DR = '#9c6240';
const SKIN_PT = '#c68a5e';
const HAIR = '#1b1410';

const STAR = 'M0 -6L1.41 -1.94L5.71 -1.85L2.28 0.74L3.53 4.85L0 2.4L-3.53 4.85L-2.28 0.74L-5.71 -1.85L-1.41 -1.94Z';

// The booking calendar of the last frame: 5 days x 4 slots; 1 = a booking that fills in.
const CAL = [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1];
const CAL_CELLS = (() => {
  let n = 0;
  return CAL.map((on, idx) => ({ idx, on, order: on ? n++ : -1 }));
})();

// A gold disc with a navy tick, centred on (cx, cy).
const TickDisc = ({ cx, cy, r = 10 }) => (
  <>
    <circle cx={cx} cy={cy} r={r} fill={GOLD2} />
    <path
      d={`M${cx - r * 0.48} ${cy + r * 0.05}l${r * 0.32} ${r * 0.32} ${r * 0.62} -${r * 0.66}`}
      fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
  </>
);

// A white row card with a gold edge (scene 2 and the last frame).
const RowCard = ({ w, h, children }) => (
  <>
    <rect width={w} height={h} fill="#fff" stroke={LINE} />
    <rect width="3" height={h} fill={GOLD} />
    {children}
  </>
);

const HeroStory = () => {
  const ref = useRef(null);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paused = userPaused || !inView;
  const [youA, youB] = S.final.you.split(': ');
  const [aumyA, aumyB] = S.final.aumy.split(': ');

  return (
    <figure ref={ref} className={`hx${paused ? ' is-paused' : ''}`}>
      <svg className="hx-svg" viewBox="0 0 400 440" width="400" height="440" role="img" aria-label={S.alt}>
        <defs>
          <linearGradient id="hx-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={GOLD2} stopOpacity="0.75" />
            <stop offset="1" stopColor={GOLD2} stopOpacity="0" />
          </linearGradient>
          <clipPath id="hx-pill"><rect x="40" y="14" width="126" height="26" /></clipPath>
          <clipPath id="hx-star5"><rect x="-6.5" y="-7" width="11.3" height="14" /></clipPath>
        </defs>

        {/* The room: wall, floor, a framed tooth on the wall */}
        <rect width="400" height="440" fill={MIST} />
        <rect y="360" width="400" height="80" fill="#ece5d8" />
        <line x1="0" y1="360.5" x2="400" y2="360.5" stroke={LINE} />
        <g transform="translate(26 80)">
          <rect width="54" height="66" fill="#fff" stroke={GOLD} strokeWidth="1.5" />
          <path
            transform="translate(12 15)"
            d="M9 2C4 2 1 6 1 11c0 6 3 9 4 16 1 5 2 8 4 8 3 0 3-8 6-8s3 8 6 8c2 0 3-3 4-8 1-7 4-10 4-16 0-5-3-9-8-9-3 0-4 2-6 2s-3-2-6-2z"
            fill="none" stroke={NAVY2} strokeWidth="1.6" strokeLinejoin="round"
          />
        </g>

        {/* Scene 4: the glow where the ad's enquiry lands (behind the chair) */}
        <circle className="hx-glow2" cx="112" cy="290" r="46" fill={GOLD2} />

        {/* The dental lamp and its light */}
        <path d="M182 0V58L152 134" fill="none" stroke={NAVY2} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="182" cy="58" r="4.5" fill={NAVY2} />
        <polygon points="138,150 162,146 178,252 126,258" fill="url(#hx-light)" />
        <g transform="translate(150 142) rotate(-24)">
          <rect x="-20" y="-8" width="40" height="16" rx="8" fill={NAVY2} />
          <rect x="-14" y="4" width="28" height="5" rx="2.5" fill={GOLD2} />
        </g>

        {/* The dental chair */}
        <rect x="52" y="344" width="84" height="8" rx="4" fill={NAVY2} />
        <rect x="84" y="302" width="20" height="44" fill={NAVY2} />
        <path d="M152 272L98 304H46L26 326" fill="none" stroke={NAVY3} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="152" y="256" width="24" height="14" rx="7" fill={NAVY3} transform="rotate(-30 164 263)" />

        {/* The patient, reclined */}
        <path d="M146 268L98 293H48L31 311" fill="none" stroke="#c9d6ef" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="134,268 148,262 147,277" fill="#fff" />
        <circle cx="157" cy="253" r="11" fill={SKIN_PT} />
        <path d="M149 245a11 11 0 0 1 19 7l-4 1a8 8 0 0 0-13-5z" fill={HAIR} />

        {/* The dentist: white coat, hair in a bun, mask */}
        <rect x="177" y="332" width="9" height="28" fill={NAVY2} />
        <rect x="190" y="332" width="9" height="28" fill={NAVY2} />
        <rect x="173" y="356" width="14" height="5" rx="2.5" fill={NAVY} />
        <rect x="188" y="356" width="14" height="5" rx="2.5" fill={NAVY} />
        <rect x="184" y="238" width="8" height="12" fill={SKIN_DR} />
        <path d="M174 258Q188 245 202 258L208 338H170Z" fill="#fff" stroke="#d9d1c1" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M182 252L188 263L194 252Z" fill={NAVY3} />
        <path d="M188 263V336" stroke={LINE} strokeWidth="1.2" />
        <rect x="194" y="272" width="2" height="8" fill={GOLD} />
        <path d="M201 263L206 300" stroke="#d9d1c1" strokeWidth="9" strokeLinecap="round" />
        <path d="M201 263L206 300" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        <circle cx="206" cy="302" r="3.6" fill={SKIN_DR} />
        <circle cx="191" cy="226" r="13" fill={HAIR} />
        <circle cx="203" cy="221" r="6.5" fill={HAIR} />
        <circle cx="186" cy="231" r="11.5" fill={SKIN_DR} />
        <path d="M175 228a11.5 11.5 0 0 1 20-9c-6 0-13 3-20 9z" fill={HAIR} />
        <circle cx="179.5" cy="229" r="1.3" fill={HAIR} />
        <path d="M174.5 233Q184 237 193 233L192.5 240Q184 245 176 240Z" fill="#cfe3ea" />
        <path d="M193 234L197 231" stroke="#cfe3ea" strokeWidth="1.2" />
        <g className="hx-arm">
          <path d="M181 263Q170 272 162 259" fill="none" stroke="#d9d1c1" strokeWidth="9" strokeLinecap="round" />
          <path d="M181 263Q170 272 162 259" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
          <circle cx="161.5" cy="257.5" r="3.6" fill={SKIN_DR} />
          <path d="M160 256L153 250" stroke={NAVY2} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="152" cy="249" r="2.2" fill={GOLD2} stroke={NAVY2} strokeWidth="0.8" />
        </g>

        {/* Scene 1: the phone at night, "New enquiry 10:47 pm" → "Answered, Booked Tue 11:00" */}
        <g className="hx-s1">
          <path d="M240 84a10 10 0 1 0 8 15 8 8 0 1 1-8-15z" fill={GOLD} />
          <g transform="translate(296 70)">
            <g className="hx-phone">
              <rect width="84" height="156" rx="14" fill={NAVY} />
              <rect x="5" y="8" width="74" height="140" rx="10" fill="#16234f" />
              <g className="hx-screen">
                <rect x="5" y="8" width="74" height="140" rx="10" fill="#faf8f4" />
                <rect x="12" y="22" width="46" height="11" rx="5.5" fill={LINE} />
                <rect x="26" y="40" width="46" height="11" rx="5.5" fill={GOLD2} />
              </g>
              <rect x="32" y="3" width="20" height="2.5" rx="1.25" fill="#2a3566" />
            </g>
          </g>
          <g transform="translate(220 150)">
            <g className="hx-chip1">
              <RowCard w={170} h={52}>
                <circle cx="18" cy="26" r="5" fill={GOLD} />
                <text x="32" y="22" className="hx-t">{S.enquiry.k}</text>
                <text x="32" y="40" className="hx-t-sm">{S.enquiry.t}</text>
              </RowCard>
            </g>
          </g>
          <g transform="translate(220 212)">
            <g className="hx-chip2">
              <rect width="170" height="52" fill="#fff" stroke={LINE} />
              <rect width="3" height="52" fill={NAVY3} />
              <TickDisc cx={18} cy={26} r={9} />
              <text x="34" y="22" className="hx-t">{S.enquiry.done}</text>
              <text x="34" y="40" className="hx-t hx-t-gold">{S.enquiry.booked}</text>
            </g>
          </g>
        </g>

        {/* Scene 2: Step 1, Aumy set up: the follow-ups tick themselves */}
        <g className="hx-s2">
          {STEP1.cards.map((c, i) => (
            <g key={c} transform={`translate(210 ${112 + i * 58})`}>
              <g className={`hx-c2 hx-c2-${i}`}>
                <RowCard w={186} h={46}>
                  <circle cx="20" cy="23" r="10" fill="none" stroke={LINE} strokeWidth="1.5" />
                  <g className={`hx-t2 hx-t2-${i}`}><TickDisc cx={20} cy={23} /></g>
                  <text x="37" y="27.5" className="hx-t">{c}</text>
                </RowCard>
              </g>
            </g>
          ))}
        </g>

        {/* Scene 3: Step 2, found online: a generic search card (no search-engine branding) */}
        <g className="hx-s3">
          <g transform="translate(212 92)">
            <rect width="182" height="246" fill="#fff" stroke={LINE} />
            <rect x="12" y="12" width="158" height="30" rx="15" fill={MIST} stroke={LINE} />
            <circle cx="28" cy="27" r="5.5" fill="none" stroke="#4a5163" strokeWidth="1.6" />
            <path d="M32 31l4 4" stroke="#4a5163" strokeWidth="1.6" strokeLinecap="round" />
            <g clipPath="url(#hx-pill)">
              <text x="42" y="31.5" className="hx-t-sm hx-t-ink">{STEP2.search}</text>
              <g className="hx-type"><rect x="40" y="14" width="126" height="26" fill={MIST} /></g>
            </g>
            <rect x="10" y="54" width="162" height="96" fill="#fffdf8" stroke={GOLD} strokeWidth="1.2" />
            <path transform="translate(24 79)" d="M0 -9a6 6 0 0 1 6 6c0 4.5-6 10-6 10s-6-5.5-6-10a6 6 0 0 1 6-6z" fill={NAVY3} />
            <circle cx="24" cy="76" r="2" fill="#fff" />
            <text x="36" y="81" className="hx-name">{STEP2.clinic}</text>
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={`g${i}`} transform={`translate(${42 + i * 14} 100)`} d={STAR} fill={LINE} />
            ))}
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={`s${i}`} transform={`translate(${42 + i * 14} 100)`}>
                <g className="hx-star" style={{ '--i': i }}>
                  {i < 4 ? <path d={STAR} fill={GOLD} /> : <g clipPath="url(#hx-star5)"><path d={STAR} fill={GOLD} /></g>}
                </g>
              </g>
            ))}
            <text x="114" y="104.5" className="hx-t hx-rate">{STEP2.rating}</text>
            <g transform="translate(36 116)">
              <circle className="hx-tap" cx="44" cy="12" r="14" fill={GOLD2} />
              <g className="hx-dir">
                <rect width="88" height="24" rx="12" fill={NAVY2} />
                <text x="44" y="16" textAnchor="middle" className="hx-t hx-t-white">{STEP2.directions}</text>
              </g>
            </g>
            <rect x="12" y="166" width="110" height="9" rx="4.5" fill={MIST} />
            <rect x="12" y="182" width="150" height="7" rx="3.5" fill={MIST} />
            <rect x="12" y="195" width="90" height="7" rx="3.5" fill={MIST} />
            <rect x="12" y="216" width="96" height="9" rx="4.5" fill={MIST} />
            <rect x="12" y="232" width="140" height="7" rx="3.5" fill={MIST} />
          </g>
        </g>

        {/* Scene 4: Step 3, an ad's enquiry flows into the clinic */}
        <path className="hx-flow" d="M304 256C292 318 214 330 150 298" pathLength="100" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
        <g transform="translate(228 120)">
          <g className="hx-ad">
            <rect width="160" height="132" fill="#fff" stroke={LINE} />
            <rect width="160" height="72" fill={NAVY2} />
            <circle cx="80" cy="36" r="26" fill={NAVY3} />
            <path d="M68 22q12-8 24 0 2 8-2 14H70q-4-6-2-14z" fill="#faf8f4" />
            <rect x="74" y="38" width="12" height="20" rx="2" fill={GOLD2} />
            <path d="M72 43h16M72 48h16M72 53h16" stroke={NAVY2} strokeWidth="1.5" />
            <text x="12" y="95" className="hx-t">{STEP3.ad}</text>
            <rect x="12" y="107" width="96" height="7" rx="3.5" fill={MIST} />
          </g>
        </g>

        {/* The step labels for scenes 2-4 */}
        {S.steps.map((st, i) => (
          <g key={st.kicker} className={`hx-l hx-l${i + 2}`}>
            <text x="200" y="395" textAnchor="middle" className="hx-kicker">{st.kicker.toUpperCase()}</text>
            <text x="200" y="423" textAnchor="middle" className="hx-label">{st.label}</text>
          </g>
        ))}

        {/* Scene 5, the final frame (also the still frame for reduced motion) */}
        <line className="hx-div" x1="212.5" y1="66" x2="212.5" y2="372" stroke={GOLD} strokeWidth="1.2" />
        <g className="hx-you">
          <text x="106" y="414" textAnchor="middle" className="hx-label hx-final">
            <tspan className="hx-em">{youA}:</tspan>{' '}{youB}
          </text>
        </g>
        <g className="hx-aumy">
          <text x="306" y="414" textAnchor="middle" className="hx-label hx-final">
            <tspan className="hx-em">{aumyA}:</tspan>{' '}{aumyB}
          </text>
        </g>
        <g transform="translate(222 82)">
          <g className="hx-f1">
            <RowCard w={168} h={48}>
              <circle cx="22" cy="24" r="13" fill={NAVY2} />
              <path
                transform="translate(16 17) scale(0.6)"
                d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"
                fill="#fff"
              />
              <text x="44" y="21" className="hx-t">{S.final.call}</text>
              <path d="M44 33.5l2.6 2.6 5-5.4" fill="none" stroke="#8a6a36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <text x="56" y="38" className="hx-t hx-t-gold">{S.final.callDone}</text>
            </RowCard>
          </g>
        </g>
        <g transform="translate(222 142)">
          <g className="hx-f2">
            <rect width="168" height="124" fill="#fff" stroke={LINE} />
            <rect width="168" height="24" fill={NAVY2} />
            <text x="12" y="16" className="hx-kicker hx-kicker-white">{S.final.calendar.toUpperCase()}</text>
            {CAL_CELLS.map(({ idx, on, order }) => {
              const x = 12 + (idx % 5) * 31;
              const y = 34 + Math.floor(idx / 5) * 22;
              return (
                <g key={idx}>
                  <rect x={x} y={y} width="26" height="16" fill={MIST} />
                  {on ? (
                    <rect className="hx-cell" style={{ '--i': order }} x={x} y={y} width="26" height="16" fill={order % 3 === 2 ? GOLD : NAVY3} />
                  ) : null}
                </g>
              );
            })}
          </g>
        </g>
        {S.final.ticks.map((t, i) => (
          <g key={t} transform={`translate(222 ${278 + i * 36})`}>
            <g className={`hx-f3 hx-f3-${i}`}>
              <RowCard w={168} h={30}>
                <TickDisc cx={17} cy={15} r={8} />
                <text x="32" y="19.5" className="hx-t">{t}</text>
              </RowCard>
            </g>
          </g>
        ))}
      </svg>
      <button
        type="button"
        className="hx-pause"
        onClick={() => setUserPaused((p) => !p)}
        aria-label={userPaused ? S.play : S.pause}
      >
        {userPaused ? (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
        )}
      </button>
    </figure>
  );
};

export default HeroStory;
