import React, { useState, useEffect, useCallback } from 'react';

const API_BASE = 'https://site-api.aumai.co.in/api/aumai/analytics';

// Site selector options. '' = all sites combined.
const SITES = [
  { value: '', label: 'All sites' },
  { value: 'aumai.co.in', label: '🇮🇳 India (aumai.co.in)' },
  { value: 'aumyai.com', label: '🇺🇸 US (aumyai.com)' },
];

const AumaiAnalytics = () => {
  const [data, setData] = useState(null);
  const [days, setDays] = useState(7);
  const [site, setSite] = useState('');
  // Default to India — the market we sell in. 'All' shows the raw world.
  const [country, setCountry] = useState('IN');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const qs = `days=${days}${site ? `&site=${encodeURIComponent(site)}` : ''}${country ? `&country=${country}` : ''}`;
      const res = await fetch(`${API_BASE}/dashboard?${qs}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError('Failed to load analytics');
    }
    setLoading(false);
  }, [days, site, country]);

  useEffect(() => {
    document.title = 'Analytics | AUM AI';
    fetchData();
  }, [fetchData]);

  const formatDuration = (seconds) => {
    if (!seconds) return '0s';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

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
            <button onClick={fetchData} style={styles.btnRefresh}>
              Refresh
            </button>
          </div>
        </div>

        {loading && <p style={styles.loading}>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {data && !loading && (
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
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
};

export default AumaiAnalytics;
