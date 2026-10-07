import React, { useState, useEffect, useCallback } from 'react';

// REACT_APP_SITE_API lets a local run point at a local backend; prod uses the default.
const API_BASE = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/analytics`;

// Site selector options. '' = all sites combined.
const SITES = [
  { value: '', label: 'All sites' },
  { value: 'aumai.co.in', label: '🇮🇳 India (aumai.co.in)' },
  { value: 'aumyai.com', label: '🇺🇸 US (aumyai.com)' },
];

// Storage can throw (private mode); the page must still work.
const KEY_STORE = 'aumai_dash_key';
const readKey = () => { try { return localStorage.getItem(KEY_STORE) || ''; } catch (e) { return ''; } };
const saveKey = (k) => {
  try {
    if (k) {
      localStorage.setItem(KEY_STORE, k);
      // Mark this browser as ours so our own website visits never send WhatsApp alerts.
      localStorage.setItem('aumai_internal', '1');
    } else {
      localStorage.removeItem(KEY_STORE);
    }
  } catch (e) { /* ignore */ }
};

// Backend timestamps are UTC ("2026-10-07 05:59:12"); show them in IST.
const formatIST = (utc) => {
  if (!utc) return '';
  const d = new Date(`${String(utc).replace(' ', 'T')}Z`);
  return d.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true,
  });
};

const pageName = (url) => (!url || url === '/' ? 'Home' : url);

const formatDuration = (seconds) => {
  if (!seconds) return '0s';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

const AumaiAnalytics = () => {
  const [data, setData] = useState(null);
  const [visits, setVisits] = useState(null);
  const [visitor, setVisitor] = useState(null); // visitor_no to show alone
  const [days, setDays] = useState(7);
  const [site, setSite] = useState('');
  // Default to India — the market we sell in. 'All' shows the raw world.
  const [country, setCountry] = useState('IN');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashKey, setDashKey] = useState(readKey);
  const [pwInput, setPwInput] = useState('');
  const [authError, setAuthError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!dashKey) { setLoading(false); return; }
    setLoading(true);
    try {
      const qs = `days=${days}${site ? `&site=${encodeURIComponent(site)}` : ''}${country ? `&country=${country}` : ''}`;
      const headers = { 'X-Dashboard-Key': dashKey };
      const [res, vRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard?${qs}`, { headers }),
        fetch(`${API_BASE}/visits?${qs}${visitor ? `&visitor=${visitor}` : ''}&limit=200`, { headers }),
      ]);
      if (res.status === 401 || vRes.status === 401) {
        saveKey('');
        setDashKey('');
        setAuthError('That password is not right. Please type it again.');
        setLoading(false);
        return;
      }
      if (!res.ok || !vRes.ok) {
        const body = await (res.ok ? vRes : res).json().catch(() => ({}));
        throw new Error(body.error || 'Could not load analytics. Press Refresh to try again.');
      }
      setData(await res.json());
      setVisits((await vRes.json()).visits || []);
      setError(null);
    } catch (err) {
      // Keep whatever was already on screen; just say what went wrong.
      setError(err.message || 'Could not load analytics. Press Refresh to try again.');
    }
    setLoading(false);
  }, [days, site, country, visitor, dashKey]);

  useEffect(() => {
    document.title = 'Analytics | AUM AI';
    fetchData();
  }, [fetchData]);

  const login = (e) => {
    e.preventDefault();
    const k = pwInput.trim();
    if (!k) return;
    setAuthError(null);
    saveKey(k);
    setDashKey(k);
    setPwInput('');
  };

  const logout = () => {
    saveKey('');
    setDashKey('');
    setData(null);
    setVisits(null);
  };

  if (!dashKey) {
    return (
      <div style={styles.page}>
        <form onSubmit={login} style={styles.loginBox}>
          <h1 style={{ ...styles.title, marginBottom: '0.5rem' }}>AUM AI Analytics</h1>
          <p style={{ color: '#94a3b8', margin: '0 0 1.25rem', fontSize: '0.9rem' }}>
            Enter the dashboard password to see who is visiting the website.
          </p>
          <label htmlFor="dash-pw" style={styles.label}>Password</label>
          <input
            id="dash-pw"
            type="password"
            autoFocus
            autoComplete="current-password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            style={styles.input}
          />
          {authError && <p style={{ ...styles.error, padding: '0.75rem 0 0', textAlign: 'left' }}>{authError}</p>}
          <button type="submit" style={{ ...styles.btn, ...styles.btnActive, width: '100%', marginTop: '1rem', padding: '0.7rem' }}>
            Open dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>AUM AI Analytics</h1>
          <div style={styles.controls}>
            {SITES.map((s) => (
              <button
                key={s.value}
                onClick={() => setSite(s.value)}
                style={{ ...styles.btn, ...(site === s.value ? styles.btnActive : {}) }}
              >
                {s.label}
              </button>
            ))}
            <span style={{ width: '1px', background: '#334155', margin: '0 0.25rem' }} />
            {['IN', ''].map((c) => (
              <button
                key={c || 'all'}
                onClick={() => setCountry(c)}
                style={{ ...styles.btn, ...(country === c ? styles.btnActive : {}) }}
              >
                {c === 'IN' ? '🇮🇳 India' : '🌍 All'}
              </button>
            ))}
            <span style={{ width: '1px', background: '#334155', margin: '0 0.25rem' }} />
            {[1, 7, 14, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                style={{
                  ...styles.btn,
                  ...(days === d ? styles.btnActive : {}),
                }}
              >
                {d === 1 ? 'Today' : `${d}d`}
              </button>
            ))}
            <button onClick={fetchData} style={styles.btnRefresh} disabled={loading}>
              {loading ? 'Loading…' : 'Refresh'}
            </button>
            <button onClick={logout} style={styles.btn}>
              Log out
            </button>
          </div>
        </div>

        {loading && !data && <p style={styles.loading}>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {data && (
          <>
            {/* Summary Cards */}
            <div style={styles.statsGrid}>
              <div style={{ ...styles.statCard, borderTopColor: '#3b82f6' }}>
                <span style={{ ...styles.statValue, color: '#3b82f6' }}>
                  {data.summary?.total_sessions || 0}
                </span>
                <span style={styles.statLabel}>Total Sessions</span>
              </div>
              <div style={{ ...styles.statCard, borderTopColor: '#8b5cf6' }}>
                <span style={{ ...styles.statValue, color: '#8b5cf6' }}>
                  {data.summary?.unique_visitors || 0}
                </span>
                <span style={styles.statLabel}>Unique Visitors</span>
              </div>
              <div style={{ ...styles.statCard, borderTopColor: '#10b981' }}>
                <span style={{ ...styles.statValue, color: '#10b981' }}>
                  {data.summary?.total_page_views || 0}
                </span>
                <span style={styles.statLabel}>Page Views</span>
              </div>
              <div style={{ ...styles.statCard, borderTopColor: '#f59e0b' }}>
                <span style={{ ...styles.statValue, color: '#f59e0b' }}>
                  {formatDuration(data.summary?.avg_duration)}
                </span>
                <span style={styles.statLabel}>Avg Session Duration</span>
              </div>
            </div>

            {/* Visitors — one row per visit, named so returning people are recognisable */}
            <div style={styles.section}>
              <div style={styles.sectionHead}>
                <h2 style={{ ...styles.sectionTitle, margin: 0 }}>
                  Visitors {visits ? `(${visits.length} visit${visits.length === 1 ? '' : 's'})` : ''}
                </h2>
                {visitor && (
                  <span style={styles.filterChip}>
                    Showing Visitor {visitor} only
                    <button onClick={() => setVisitor(null)} style={styles.linkBtn}>Show everyone</button>
                  </span>
                )}
              </div>
              <p style={styles.hint}>
                Tap a visitor's name to see all their visits. A visit ends after 30 minutes with no activity.
                Location is approximate (from the internet connection).
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Visitor</th>
                      <th style={styles.th}>When</th>
                      <th style={styles.th}>Location</th>
                      <th style={styles.th}>Came from</th>
                      <th style={styles.th}>Time on site</th>
                      <th style={styles.th}>Pages and time spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visits?.map((v, i) => (
                      <tr key={v.session_id} style={i % 2 === 0 ? styles.trEven : {}}>
                        <td style={styles.td}>
                          {v.visitor_no ? (
                            <button onClick={() => setVisitor(v.visitor_no)} style={styles.nameBtn}>
                              {v.visitor_name}
                            </button>
                          ) : (
                            <span style={{ fontWeight: 600 }}>{v.visitor_name}</span>
                          )}
                          <div style={styles.subText}>
                            {v.visit_number <= 1 ? 'First visit' : `Returning · visit ${v.visit_number} of ${v.total_visits}`}
                            {v.in_progress && <span style={styles.liveBadge}>On site now</span>}
                            {v.internal && <span style={styles.mutedBadge}>Our team</span>}
                          </div>
                        </td>
                        <td style={styles.td}>
                          {formatIST(v.started_at)}
                          <div style={styles.subText}>{v.device_type}{site ? '' : ` · ${(v.site || '').replace(/^www\./, '')}`}</div>
                        </td>
                        <td style={styles.td}>{v.location}</td>
                        <td style={styles.td}>{v.source}</td>
                        <td style={styles.td}>{formatDuration(v.time_on_site_seconds)}</td>
                        <td style={{ ...styles.td, whiteSpace: 'normal', minWidth: '260px' }}>
                          {v.pages.length
                            ? v.pages.map((p, j) => (
                                <span key={j}>
                                  {j > 0 && <span style={{ color: '#64748b' }}> → </span>}
                                  {pageName(p.page_url)} <span style={{ color: '#94a3b8' }}>{formatDuration(p.time_seconds)}</span>
                                </span>
                              ))
                            : <span style={{ color: '#64748b' }}>No pages recorded</span>}
                        </td>
                      </tr>
                    ))}
                    {visits && visits.length === 0 && (
                      <tr>
                        <td style={styles.td} colSpan={6}>
                          No visits in this period. Pick a longer period (for example 30d) or press 🌍 All.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Daily Breakdown */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Daily Breakdown</h2>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Sessions</th>
                    <th style={styles.th}>Visitors</th>
                    <th style={styles.th}>Page Views</th>
                  </tr>
                </thead>
                <tbody>
                  {data.daily_breakdown?.map((row, i) => (
                    <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                      <td style={styles.td}>{row.date}</td>
                      <td style={styles.td}>{row.sessions}</td>
                      <td style={styles.td}>{row.visitors}</td>
                      <td style={styles.td}>{row.page_views}</td>
                    </tr>
                  ))}
                  {(!data.daily_breakdown || data.daily_breakdown.length === 0) && (
                    <tr>
                      <td style={styles.td} colSpan={4}>No data yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Two column layout */}
            <div style={styles.twoCol}>
              {/* Top Pages */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Top Pages</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Page</th>
                      <th style={styles.th}>Views</th>
                      <th style={styles.th}>Avg Time</th>
                      <th style={styles.th}>Scroll %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.top_pages?.map((row, i) => (
                      <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                        <td style={{ ...styles.td, maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {row.page_url}
                        </td>
                        <td style={styles.td}>{row.views}</td>
                        <td style={styles.td}>{formatDuration(row.avg_time)}</td>
                        <td style={styles.td}>{row.avg_scroll || 0}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Traffic Sources */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Traffic Sources</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Source</th>
                      <th style={styles.th}>Sessions</th>
                      <th style={styles.th}>Visitors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.traffic_sources?.map((row, i) => (
                      <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                        <td style={{ ...styles.td, fontWeight: 600 }}>{row.source}</td>
                        <td style={styles.td}>{row.sessions}</td>
                        <td style={styles.td}>{row.visitors}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Two column: Devices + Landing Pages */}
            <div style={styles.twoCol}>
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Devices</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Device</th>
                      <th style={styles.th}>Sessions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.devices?.map((row, i) => (
                      <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                        <td style={{ ...styles.td, textTransform: 'capitalize' }}>{row.device_type}</td>
                        <td style={styles.td}>{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Top Landing Pages</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Page</th>
                      <th style={styles.th}>Sessions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.landing_pages?.map((row, i) => (
                      <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                        <td style={{ ...styles.td, maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {row.landing_page}
                        </td>
                        <td style={styles.td}>{row.sessions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Geolocation: states/regions + cities + countries */}
            <div style={styles.twoCol}>
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Top States / Regions</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Region</th>
                      <th style={styles.th}>Country</th>
                      <th style={styles.th}>Sessions</th>
                      <th style={styles.th}>Visitors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.top_regions?.map((row, i) => (
                      <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                        <td style={{ ...styles.td, fontWeight: 600 }}>{row.region}</td>
                        <td style={styles.td}>{row.country || '?'}</td>
                        <td style={styles.td}>{row.sessions}</td>
                        <td style={styles.td}>{row.visitors}</td>
                      </tr>
                    ))}
                    {(!data.top_regions || data.top_regions.length === 0) && (
                      <tr><td style={styles.td} colSpan={4}>No location data yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Top Cities</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>City</th>
                      <th style={styles.th}>Region</th>
                      <th style={styles.th}>Country</th>
                      <th style={styles.th}>Sessions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.top_cities?.map((row, i) => (
                      <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                        <td style={{ ...styles.td, fontWeight: 600 }}>{row.city}</td>
                        <td style={styles.td}>{row.region || '?'}</td>
                        <td style={styles.td}>{row.country || '?'}</td>
                        <td style={styles.td}>{row.sessions}</td>
                      </tr>
                    ))}
                    {(!data.top_cities || data.top_cities.length === 0) && (
                      <tr><td style={styles.td} colSpan={4}>No location data yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Per-site split (helps confirm US vs India capture) */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Traffic by Site</h2>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Site</th>
                    <th style={styles.th}>Sessions</th>
                    <th style={styles.th}>Visitors</th>
                  </tr>
                </thead>
                <tbody>
                  {data.sites?.map((row, i) => (
                    <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                      <td style={{ ...styles.td, fontWeight: 600 }}>{row.site}</td>
                      <td style={styles.td}>{row.sessions}</td>
                      <td style={styles.td}>{row.visitors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '2rem 1rem',
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 800,
    margin: 0,
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  controls: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  btn: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#1e293b',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  btnActive: {
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: '#fff',
    border: '1px solid transparent',
  },
  btnRefresh: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#1e293b',
    color: '#10b981',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  loading: { color: '#94a3b8', textAlign: 'center', padding: '3rem' },
  error: { color: '#f43f5e', textAlign: 'center', padding: '3rem' },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '1.5rem',
    textAlign: 'center',
    borderTop: '3px solid',
  },
  statValue: {
    display: 'block',
    fontSize: '2.2rem',
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: '0.3rem',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    fontWeight: 500,
  },
  section: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    margin: '0 0 1rem',
    color: '#e2e8f0',
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
    gap: '1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.85rem',
  },
  th: {
    textAlign: 'left',
    padding: '0.6rem 0.75rem',
    borderBottom: '1px solid #334155',
    color: '#94a3b8',
    fontWeight: 600,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  td: {
    padding: '0.6rem 0.75rem',
    borderBottom: '1px solid rgba(51,65,85,0.5)',
    color: '#cbd5e1',
    whiteSpace: 'nowrap',
  },
  trEven: {
    background: 'rgba(15,23,42,0.3)',
  },
  loginBox: {
    maxWidth: '380px',
    margin: '10vh auto 0',
    background: '#1e293b',
    borderRadius: '12px',
    padding: '2rem 1.5rem',
    border: '1px solid #334155',
  },
  label: { display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.4rem', fontWeight: 600 },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.7rem 0.8rem',
    borderRadius: '8px',
    border: '1px solid #475569',
    background: '#0f172a',
    color: '#e2e8f0',
    fontSize: '1rem',
  },
  sectionHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
    flexWrap: 'wrap',
    marginBottom: '0.4rem',
  },
  hint: { color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 1rem' },
  filterChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.6rem',
    background: 'rgba(59,130,246,0.15)',
    border: '1px solid #3b82f6',
    borderRadius: '999px',
    padding: '0.3rem 0.8rem',
    fontSize: '0.8rem',
    color: '#bfdbfe',
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#93c5fd',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '0.8rem',
    padding: 0,
  },
  nameBtn: {
    background: 'none',
    border: 'none',
    padding: 0,
    color: '#93c5fd',
    fontWeight: 700,
    fontSize: '0.9rem',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  subText: { color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.2rem' },
  liveBadge: {
    marginLeft: '0.4rem',
    background: 'rgba(16,185,129,0.15)',
    color: '#34d399',
    borderRadius: '999px',
    padding: '0.05rem 0.5rem',
    fontWeight: 600,
  },
  mutedBadge: {
    marginLeft: '0.4rem',
    background: 'rgba(148,163,184,0.15)',
    color: '#cbd5e1',
    borderRadius: '999px',
    padding: '0.05rem 0.5rem',
  },
};

export default AumaiAnalytics;
