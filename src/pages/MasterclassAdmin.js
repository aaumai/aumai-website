import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { setNoindex } from '../utils/seo';
import './ScorecardPage.css';
import './MasterclassPage.css';

// Admin: masterclass members (owner 2026-10-18). Members sign in at
// aumai.co.in/masterclass/sign-in with an email code. Owner 2026-10-30: an account
// alone cannot watch; ₹299 once lets a member watch (with 24×7 WhatsApp Q&A), and the
// kit is ₹999 in total (₹700 more after ₹299). This page shows each member's access
// level (none / watch / kit, from the backend's access_level), and can mark a member's
// kit paid by hand (a bank transfer, a gift). Registrations and payments: Refund on a paid row
// (owner 2026-10-31) returns the full amount through Razorpay and closes the access that payment
// bought, after a confirm box that says exactly what will happen. Opens with the analytics dashboard's master password (same
// stored key as /aumaianalytics and /scorecard-admin); a clinic's own password is refused.

const API = `${process.env.REACT_APP_SITE_API || 'https://site-api.aumai.co.in'}/api/aumai/masterclass/admin`;
const KEY_STORE = 'aumai_dash_key';
const readKey = () => { try { return localStorage.getItem(KEY_STORE) || ''; } catch (e) { return ''; } };
const saveKey = (k) => { try { if (k) localStorage.setItem(KEY_STORE, k); else localStorage.removeItem(KEY_STORE); } catch (e) { /* ignore */ } };

const istToday = () => new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
const formatIST = (utc) => {
  if (!utc) return '';
  return new Date(`${String(utc).replace(' ', 'T')}Z`).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true,
  });
};
const formatISTDate = (utc) => {
  if (!utc) return '';
  return new Date(`${String(utc).replace(' ', 'T')}Z`).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric' });
};
// Members from before 2026-10-25 may come without paid_at from an older backend: only an explicit null/false is free.
const isPaidMember = (m) => !!m.paid_at || m.paid === true;
// none (signed up, not paid) | watch (₹299) | kit. An older backend sends no access_level: everyone watched then.
const levelOf = (m) => m.access_level || (isPaidMember(m) ? 'kit' : 'watch');
const LEVEL_LABEL = { none: 'Not paid', watch: 'Watching (₹299)', kit: 'Kit' };
const PRODUCT_LABEL = { entry: 'Join (₹299)', kit: 'Kit' };
const STATE_LABEL = { ok: 'Active', ended: 'Ended', revoked: 'Closed' }; // 'ended' no longer happens: access is lifetime (owner 2026-10-20)
const welcomeWords = (s) => (s === 'sent' ? 'Welcome email sent.' : s === 'simulated' ? 'Email NOT sent: the server has no email account set up.' : s === 'failed' ? 'The welcome email failed. Use Resend on their row.' : '');
const blankForm = () => ({ name: '', email: '', whatsapp: '', starts_on: istToday(), send_welcome: true });

export default function MasterclassAdmin() {
  const [key, setKey] = useState(readKey);
  const [pw, setPw] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState('');
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState('');
  const [show, setShow] = useState('all');
  const [form, setForm] = useState(blankForm);
  const [paste, setPaste] = useState('');
  const [pasteStart, setPasteStart] = useState(istToday);
  const [pasteWelcome, setPasteWelcome] = useState(true);
  const [preview, setPreview] = useState(null);
  const [video, setVideo] = useState({ type: 'none', url: '', key: '' });
  const [sess, setSess] = useState({ qa_at: '', qa_link: '', video_by: '' });
  const [sessMsg, setSessMsg] = useState('');
  const [editingEmail, setEditingEmail] = useState(null); // { id, email }
  const [videoMsg, setVideoMsg] = useState('');
  const [tab, setTab] = useState('members'); // members | registrations
  const [regs, setRegs] = useState(null);
  const [regShow, setRegShow] = useState('all');
  const [refundAsk, setRefundAsk] = useState(null); // the backend's preview of one refund, while the confirm box is open
  const [refundEmail, setRefundEmail] = useState(true);
  const [refundErr, setRefundErr] = useState('');

  useEffect(() => {
    document.title = 'Masterclass members · AUM AI admin';
    return setNoindex();
  }, []);

  const req = useCallback(async (path, body, k = key) => {
    const r = await fetch(`${API}${path}`, {
      method: body ? 'POST' : 'GET',
      headers: { 'X-Dashboard-Key': k, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    const j = await r.json().catch(() => ({}));
    if (r.status === 401) { saveKey(''); setKey(''); setData(null); throw new Error('That password is not right. Please type it again.'); }
    if (!r.ok) { const e = new Error(j.error || 'Something went wrong. Try again in a minute.'); e.body = j; throw e; }
    return j;
  }, [key]);

  const load = useCallback(async (k) => {
    setError('');
    try {
      const j = await req('/members', null, k);
      saveKey(k); setKey(k); setData(j);
      setVideo((v) => ({ ...v, type: j.video.type, url: j.video.type === 'embed' ? j.video.value : v.url, key: j.video.type === 's3' ? j.video.value : v.key }));
      if (j.session) setSess({ qa_at: j.session.qa_at || '', qa_link: j.session.qa_link || '', video_by: j.session.video_by || '' });
    } catch (e) {
      setError(e.message === 'Failed to fetch' ? 'Could not reach the server. Check your connection and press Refresh.' : e.message);
    }
  }, [req]);

  useEffect(() => { if (key) load(key); }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadRegs = useCallback(async () => {
    setError('');
    try { setRegs(await req('/registrations')); } catch (e) {
      setError(e.message === 'Failed to fetch' ? 'Could not reach the server. Check your connection and press Refresh.' : e.message);
    }
  }, [req]);
  useEffect(() => { if (tab === 'registrations' && key && data) loadRegs(); }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!refundAsk) return undefined;
    const onKey = (e) => { if (e.key === 'Escape' && !busy) setRefundAsk(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [refundAsk, busy]);

  // Refund (owner 2026-10-31): the backend first says what it will do (amount, the access it closes), the owner confirms.
  const askRefund = async (r) => {
    setBusy(true); setError(''); setFlash(''); setRefundErr('');
    try {
      const j = await req(`/registrations/${r.id}/refund`);
      setRefundEmail(true); setRefundAsk(j.refund);
    } catch (e) {
      setError(e.message === 'Failed to fetch' ? 'Could not reach the server. Nothing was changed. Try again.' : e.message);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // the message shows at the top; the row may be far down
    } finally { setBusy(false); }
  };
  const doRefund = async () => {
    const r = refundAsk;
    setBusy(true); setRefundErr('');
    try {
      const j = await req(`/registrations/${r.id}/refund`, { amount_paise: r.amount_paise, send_email: refundEmail });
      setRefundAsk(null);
      setFlash(`Refunded ${r.amount_label} to ${r.name}: ${CLOSED_WORDS[j.closes] || ''} Razorpay reference ${j.refund_id}; it reaches their account in 5–7 working days.${refundEmail ? ` ${j.email === 'sent' ? 'They have been emailed.' : j.email === 'simulated' ? 'Email NOT sent: the server has no email account set up.' : 'The email to them failed.'}` : ' No email sent.'}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      loadRegs();
      // Only the member list: a full reload would overwrite unsaved edits in the settings forms.
      req('/members').then((m) => setData((d) => ({ ...d, members: m.members }))).catch(() => {});
    } catch (e) {
      setRefundErr(e.message === 'Failed to fetch' ? 'Could not reach the server. Press Refresh to see whether the refund went through before trying again.' : e.message);
      loadRegs();
    } finally { setBusy(false); }
  };

  // Every action returns the fresh member list; the search, filter and forms stay as they are.
  const act = async (path, body, done) => {
    setBusy(true); setError(''); setFlash('');
    try {
      const j = await req(path, body || {});
      if (j.members) setData((d) => ({ ...d, members: j.members }));
      if (done) done(j);
    } catch (e) {
      setError(e.message === 'Failed to fetch' ? 'Could not reach the server. Nothing was changed. Try again.' : e.message);
    } finally { setBusy(false); }
  };

  const members = useMemo(() => data?.members || [], [data]);
  const counts = useMemo(() => ({
    all: members.length,
    ok: members.filter((m) => m.state === 'ok').length,
    ended: members.filter((m) => m.state === 'ended').length,
    revoked: members.filter((m) => m.state === 'revoked').length,
    kit: members.filter((m) => levelOf(m) === 'kit').length,
    watch: members.filter((m) => levelOf(m) === 'watch').length,
    none: members.filter((m) => levelOf(m) === 'none').length,
  }), [members]);
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    const digits = s.replace(/\D/g, '');
    const inShow = (m) => show === 'all' || (LEVEL_LABEL[show] ? levelOf(m) === show : m.state === show);
    return members.filter((m) => inShow(m) && (!s
      || m.name.toLowerCase().includes(s) || m.email.includes(s) || (digits.length >= 3 && (m.whatsapp || '').replace(/\D/g, '').includes(digits))));
  }, [members, q, show]);

  if (!key || !data) {
    return (
      <div className="sc-root" style={{ minHeight: '100vh', paddingTop: 80 }}>
        <form className="sc-wrap sc-form" style={{ maxWidth: 420 }} onSubmit={(e) => { e.preventDefault(); if (pw) load(pw); }}>
          <h2>Masterclass members</h2>
          <p>Enter the dashboard password to manage masterclass access.</p>
          <div className="sc-fields" style={{ gridTemplateColumns: '1fr' }}>
            <label>Password<input type="password" autoFocus autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} /></label>
          </div>
          {error && <p className="sc-error" role="alert">{error}</p>}
          <button type="submit" className="sc-btn">Open</button>
        </form>
      </div>
    );
  }

  const addOne = (e) => {
    e.preventDefault();
    act('/members', form, (j) => {
      setFlash(`Added ${form.name} (lifetime access). ${form.send_welcome ? welcomeWords(j.welcome) : 'No email sent.'}`);
      setForm(blankForm());
    });
  };
  const checkPaste = () => act('/members/bulk', { text: paste, starts_on: pasteStart, dry_run: true }, (j) => setPreview(j));
  const addPaste = () => act('/members/bulk', { text: paste, starts_on: pasteStart, dry_run: false, send_welcome: pasteWelcome }, (j) => {
    setFlash(`Added ${j.added} member${j.added === 1 ? '' : 's'}.${j.welcome === 'sending' ? ' Welcome emails are going out now; press Refresh in a minute to see them as sent.' : ' No emails sent.'}`);
    setPreview(null); setPaste('');
  });
  const saveVideo = (e) => {
    e.preventDefault(); setVideoMsg('');
    const body = video.type === 'embed' ? { type: 'embed', url: video.url } : video.type === 's3' ? { type: 's3', key: video.key } : { type: 'none' };
    act('/video', body, (j) => {
      setData((d) => ({ ...d, video: j.video }));
      setVideoMsg(j.check || (j.video.type === 'none' ? 'Saved. Members see “The video will appear here within 24 hours of the session.”' : 'Saved. Members see this video now.'));
    });
  };
  const revoke = (m) => { if (window.confirm(`Close masterclass access for ${m.name} (${m.email})? They are signed out now and cannot sign in again until you press Restore.`)) act(`/members/${m.id}/revoke`, {}, () => setFlash(`Closed access for ${m.name}.`)); };
  const saveEmail = (m) => {
    const to = String(editingEmail.email || '').trim().toLowerCase();
    if (!window.confirm(`Change ${m.name}'s email from ${m.email} to ${to}? They are signed out, and the sign-in steps go to the new address.`)) return;
    act(`/members/${m.id}/email`, { email: to }, (j) => { setEditingEmail(null); setFlash(`${m.name}'s email is now ${to}. ${welcomeWords(j.welcome)}`); });
  };
  const saveSession = (e) => {
    e.preventDefault(); setSessMsg('');
    act('/settings', { ...sess, qa_at: '', qa_link: '' }, (j) => { // no live Q&A any more: saving clears any old one
      setData((d) => ({ ...d, session: j.session }));
      setSessMsg(j.session.video_by_label ? 'Saved. Members see this on their page and in new welcome emails.' : 'Cleared.');
    });
  };
  const resend = (m) => { if (window.confirm(`Email the sign-in details to ${m.email} again?`)) act(`/members/${m.id}/resend`, {}, (j) => setFlash(`${m.name}: ${welcomeWords(j.welcome)}`)); };
  // Paid by hand (owner 2026-10-25): every download opens for them the moment this is saved.
  const markPaid = (m) => { if (window.confirm(`Mark ${m.name} (${m.email}) as paid for the kit? Watching and every download open for them straight away. Use this only when the money came another way (bank transfer, gift).`)) act(`/members/${m.id}/mark-paid`, { via: 'admin' }, () => setFlash(`${m.name} is now paid: the kit is open for them.`)); };

  const files = data.files || [];
  const signedIn = members.filter((m) => m.last_login_at).length;

  return (
    <div className="sc-root" style={{ minHeight: '100vh' }}>
      <div className="sc-wrap" style={{ maxWidth: 1200, paddingBlock: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <p className="sc-eyebrow">AUM AI admin</p>
            <h1 style={{ fontSize: 34 }}>Masterclass members</h1>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <a className="sc-link" href="/masterclass/sign-in" target="_blank" rel="noopener noreferrer">Open the members page</a>
            <button type="button" className="sc-btn sc-btn-ghost" onClick={() => (tab === 'registrations' ? loadRegs() : load(key))} disabled={busy}>Refresh</button>
            <button type="button" className="sc-link" onClick={() => { saveKey(''); setKey(''); setData(null); }}>Sign out</button>
          </div>
        </div>
        {error && <p className="sc-error" role="alert">{error}</p>}
        {flash && <p className="mc-ok" role="status">{flash}</p>}

        <div className="mc-chips" aria-label="View">
          <button type="button" className="mc-chip" aria-pressed={tab === 'members'} onClick={() => setTab('members')}>Members {counts.all} · Kit {counts.kit} · Watching {counts.watch} · Not paid {counts.none}</button>
          <button type="button" className="mc-chip" aria-pressed={tab === 'registrations'} onClick={() => setTab('registrations')}>Registrations and payments</button>
        </div>

        {tab === 'registrations' && <Registrations data={regs} show={regShow} setShow={setRegShow} onRefund={askRefund} busy={busy} />}
        {refundAsk && (
          <div role="presentation" onClick={() => { if (!busy) setRefundAsk(null); }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(16,26,62,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50 }}>
            <div className="sc-form" role="dialog" aria-modal="true" aria-labelledby="refund-title" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520, width: '100%' }}>
              <h2 id="refund-title">Refund {refundAsk.amount_label} to {refundAsk.name}?</h2>
              <p style={{ margin: 0 }}>
                {refundAsk.email}{refundAsk.clinic ? ` · ${refundAsk.clinic}` : ''}<br />
                Paid {refundAsk.amount_label} {refundAsk.what} on {formatIST(refundAsk.paid_at)} · Razorpay payment {refundAsk.payment_id}
              </p>
              <p style={{ margin: 0 }}><b>{refundAsk.message}</b></p>
              <p className="mc-small" style={{ margin: 0 }}>The full {refundAsk.amount_label} goes back to the card, UPI or bank account they paid with, usually within 5–7 working days. This cannot be undone.</p>
              {refundAsk.flag && <p style={{ margin: 0, color: '#BE185D' }}><b>{refundAsk.flag}</b></p>}
              {refundAsk.last_error && <p className="mc-small" style={{ margin: 0 }}>The last try did not go through: {refundAsk.last_error}</p>}
              <label className="sc-consent"><input type="checkbox" checked={refundEmail} onChange={(e) => setRefundEmail(e.target.checked)} /> Email them that the refund is on its way</label>
              {refundErr && <p className="sc-error" role="alert" style={{ margin: 0 }}>{refundErr}</p>}
              <div className="mc-row-links">
                <button type="button" className="sc-btn" style={{ background: '#BE185D', borderColor: '#BE185D' }} onClick={doRefund} disabled={busy}>{busy ? 'Refunding…' : `Refund ${refundAsk.amount_label}`}</button>
                <button type="button" className="sc-link" onClick={() => setRefundAsk(null)} disabled={busy}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {tab === 'members' && (<>

        <div className="sc-start" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
          <div className="sc-start-card"><p className="sc-start-label">Members</p><h3>{counts.all}</h3><p>{counts.ok} active now</p></div>
          <div className="sc-start-card"><p className="sc-start-label">Kit</p><h3>{counts.kit}</h3><p>every download</p></div>
          <div className="sc-start-card"><p className="sc-start-label">Watching</p><h3>{counts.watch}</h3><p>paid ₹299, no kit</p></div>
          <div className="sc-start-card"><p className="sc-start-label">Not paid</p><h3>{counts.none}</h3><p>signed up, cannot watch yet</p></div>
          <div className="sc-start-card"><p className="sc-start-label">Signed in</p><h3>{signedIn}</h3><p>at least once</p></div>
          <div className="sc-start-card"><p className="sc-start-label">Ended</p><h3>{counts.ended}</h3><p>month is over</p></div>
          <div className="sc-start-card"><p className="sc-start-label">Files</p><h3>{files.length}</h3><p>{files.length ? 'ready to download' : 'none on the server yet'}</p></div>
          <div className="sc-start-card"><p className="sc-start-label">Video</p><h3 style={{ fontSize: 20 }}>{data.video.type === 'none' ? 'Not set' : data.video.type === 'embed' ? 'Link' : 'S3 file'}</h3><p>{data.video.type === 'none' ? 'members see “within 24 hours”' : 'members can watch'}</p></div>
        </div>

        <div className="mc-admin-grid">
          <form className="sc-form" onSubmit={addOne}>
            <h2>Add a member</h2>
            <div className="sc-fields">
              <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Asha Rao" required /></label>
              <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@gmail.com" required /></label>
              <label>WhatsApp (optional)<input type="tel" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="98765 43210" /></label>
              <label>Access starts<input type="date" value={form.starts_on} onChange={(e) => setForm({ ...form, starts_on: e.target.value })} required /></label>
            </div>
            <p className="mc-small" style={{ margin: 0 }}>Access: lifetime (no end date).</p>
            <label className="sc-consent"><input type="checkbox" checked={form.send_welcome} onChange={(e) => setForm({ ...form, send_welcome: e.target.checked })} /> Email them how to sign in now</label>
            <button type="submit" className="sc-btn" disabled={busy}>{form.send_welcome ? 'Add and send the email' : 'Add member'}</button>
          </form>

          <div className="sc-form">
            <h2>Paste many</h2>
            <p>One person per line: name, email, WhatsApp. WhatsApp is optional. A copy from Excel or Google Sheets works too.</p>
            <textarea className="mc-textarea" value={paste} onChange={(e) => { setPaste(e.target.value); setPreview(null); }} placeholder={'Asha Rao, asha@gmail.com, 9876543210\nVikram Shah, vikram@yahoo.com'} />
            <div className="sc-fields">
              <label>Access starts<input type="date" value={pasteStart} onChange={(e) => { setPasteStart(e.target.value); setPreview(null); }} /></label>
            </div>
            <label className="sc-consent"><input type="checkbox" checked={pasteWelcome} onChange={(e) => setPasteWelcome(e.target.checked)} /> Email each of them how to sign in</label>
            {!preview && <button type="button" className="sc-btn sc-btn-ghost" onClick={checkPaste} disabled={busy || !paste.trim()}>Check the list</button>}
            {preview && (
              <>
                <p style={{ margin: 0 }}><b>{preview.ready.length} ready to add</b>{preview.ready.length ? `: ${preview.ready.map((r) => r.name).join(', ')}` : ''}.</p>
                {preview.errors.length > 0 && (
                  <div>
                    <p style={{ margin: 0 }}><b>{preview.errors.length} will be skipped:</b></p>
                    <ul className="mc-small" style={{ margin: '4px 0 0', paddingLeft: 18 }}>
                      {preview.errors.map((x) => <li key={`${x.line}-${x.text}`}>Line {x.line} “{x.text}”: {x.reason}</li>)}
                    </ul>
                  </div>
                )}
                <div className="mc-row-links">
                  <button type="button" className="sc-btn" onClick={addPaste} disabled={busy || !preview.ready.length}>
                    Add {preview.ready.length} member{preview.ready.length === 1 ? '' : 's'}{pasteWelcome ? ' and email them' : ''}
                  </button>
                  <button type="button" className="sc-link" onClick={() => setPreview(null)}>Change the list</button>
                </div>
              </>
            )}
          </div>
        </div>

        <form className="sc-form" onSubmit={saveSession}>
          <h2>Video date</h2>
          <p>Shown on the members page and in welcome emails. Leave it empty to hide it. (There is no live Q&amp;A: questions go to WhatsApp, owner 2026-10-19.)</p>
          <div className="sc-fields">
            <label>Video available by<input type="date" value={sess.video_by} onChange={(e) => setSess({ ...sess, video_by: e.target.value })} /></label>
          </div>
          {sessMsg && <p className="mc-ok" role="status">{sessMsg}</p>}
          <button type="submit" className="sc-btn" disabled={busy} style={{ alignSelf: 'flex-start' }}>Save</button>
        </form>

        <form className="sc-form" onSubmit={saveVideo}>
          <h2>The masterclass video</h2>
          <div className="mc-radio" role="radiogroup" aria-label="Video source">
            <label><input type="radio" name="vt" checked={video.type === 'embed'} onChange={() => setVideo({ ...video, type: 'embed' })} /> A YouTube or Vimeo link (unlisted is fine)</label>
            <label><input type="radio" name="vt" checked={video.type === 's3'} onChange={() => setVideo({ ...video, type: 's3' })} /> A file in our S3 bucket{data.video.bucket_set ? '' : ' (the server has no bucket set up yet)'}</label>
            <label><input type="radio" name="vt" checked={video.type === 'none'} onChange={() => setVideo({ ...video, type: 'none' })} /> No video yet</label>
          </div>
          {video.type === 'embed' && <div className="sc-fields" style={{ gridTemplateColumns: '1fr' }}><label>Video link<input value={video.url} onChange={(e) => setVideo({ ...video, url: e.target.value })} placeholder="https://youtu.be/… or https://vimeo.com/…" /></label></div>}
          {video.type === 's3' && <div className="sc-fields" style={{ gridTemplateColumns: '1fr' }}><label>S3 key<input value={video.key} onChange={(e) => setVideo({ ...video, key: e.target.value })} placeholder="masterclass/full-chair-method.mp4" /></label></div>}
          {videoMsg && <p className="mc-ok" role="status">{videoMsg}</p>}
          <button type="submit" className="sc-btn" disabled={busy} style={{ alignSelf: 'flex-start' }}>Save video</button>
          {files.length > 0 && <p className="mc-small" style={{ margin: 0 }}>Files on the server: {files.map((f) => f.name).join(' · ')}</p>}
          {files.length === 0 && <p className="sc-error" style={{ margin: 0 }}>No files on the server yet. Members see “The Clinic Master Sheet will appear here soon”.</p>}
        </form>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <input className="mc-input" style={{ maxWidth: 360, fontSize: 16, minHeight: 44, padding: '10px 12px' }} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email or WhatsApp" aria-label="Search members" />
          <div className="mc-chips">
            {[['all', 'All'], ['kit', 'Kit'], ['watch', 'Watching'], ['none', 'Not paid'], ['ok', 'Active'], ['ended', 'Ended'], ['revoked', 'Closed']].map(([k, label]) => (
              <button key={k} type="button" className="mc-chip" aria-pressed={show === k} onClick={() => setShow(k)}>{label} ({counts[k]})</button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto', background: 'var(--sc-card)', border: '1px solid var(--sc-line)', borderRadius: 14 }}>
          {rows.length === 0 ? (
            <p style={{ padding: 20, margin: 0 }}>{members.length ? 'No members match. Change the search or press All.' : 'No members yet. Add the first one above.'}</p>
          ) : (
            <table className="sc-table" style={{ minWidth: 1100 }}>
              <thead><tr><th>Name</th><th>Email</th><th>WhatsApp</th><th>Access</th><th>Paid for</th><th>Until</th><th>Last sign-in</th><th>Downloads</th><th>Welcome email</th><th>Actions</th></tr></thead>
              <tbody>
                {rows.map((m) => (
                  <tr key={m.id}>
                    <td>{m.name}{m.notes && <div className="mc-small">{m.notes}</div>}</td>
                    <td>
                      {editingEmail && editingEmail.id === m.id ? (
                        <span className="mc-actions">
                          <input type="email" value={editingEmail.email} onChange={(e) => setEditingEmail({ id: m.id, email: e.target.value })} aria-label="New email" />
                          <button type="button" onClick={() => saveEmail(m)} disabled={busy}>Save</button>
                          <button type="button" onClick={() => setEditingEmail(null)}>Cancel</button>
                        </span>
                      ) : m.email}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{m.whatsapp || ''}</td>
                    <td><span className={`mc-state mc-state-${m.state}`}>{STATE_LABEL[m.state]}</span></td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <span className={`mc-state mc-state-${levelOf(m) === 'kit' ? 'ok' : levelOf(m) === 'watch' ? 'ok' : 'ended'}`}>{LEVEL_LABEL[levelOf(m)]}</span>
                      {levelOf(m) === 'kit' && m.paid_at && <div className="mc-small">{formatISTDate(m.paid_at)}</div>}
                      {levelOf(m) === 'watch' && m.entry_paid_at && <div className="mc-small">{formatISTDate(m.entry_paid_at)}</div>}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>Lifetime</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{m.last_login_at ? formatIST(m.last_login_at) : <span className="mc-small">never</span>}</td>
                    <td className="sc-num">{m.downloads}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{m.welcome_sent_at ? `${m.welcome_status === 'sent' ? 'Sent' : m.welcome_status === 'simulated' ? 'Not sent (no email set up)' : 'Failed'} ${formatIST(m.welcome_sent_at)}` : <span className="mc-small">not sent</span>}</td>
                    <td>
                      <div className="mc-actions">
                        <button type="button" onClick={() => resend(m)} disabled={busy || m.state !== 'ok'}>Resend email</button>
                        <button type="button" onClick={() => setEditingEmail({ id: m.id, email: m.email })} disabled={busy}>Change email</button>
                        {levelOf(m) !== 'kit' && <button type="button" onClick={() => markPaid(m)} disabled={busy || m.state === 'revoked'}>Mark paid</button>}
                        {m.state === 'revoked'
                          ? <button type="button" onClick={() => act(`/members/${m.id}/restore`, {}, () => setFlash(`Restored access for ${m.name}.`))} disabled={busy}>Restore</button>
                          : <button type="button" className="mc-danger" onClick={() => revoke(m)} disabled={busy}>Close access</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <p className="sc-hint">Members sign in at aumai.co.in/masterclass/sign-in with a code sent to their email. Signing up makes an account; it watches only after paying ₹299 once (with 24×7 WhatsApp Q&A). Kit members (₹999 in total, or ₹700 more after ₹299) also have every download. Mark paid opens the kit. Access is lifetime: it ends only if you press Close access.</p>
        </>)}
      </div>
    </div>
  );
}

const REG_STATUS = { paid: 'Paid', created: 'Not paid yet', failed: 'Failed', refunded: 'Refunded' };
const REFUND_ACCESS = { watch: 'watching closed', kit: 'kit closed', none: 'access unchanged (this payment bought nothing)', kept: 'access unchanged (another payment covers it)', no_member: 'no account linked' };
const CLOSED_WORDS = { watch: 'their access to the video is closed.', kit: 'the kit downloads are closed.', none: 'their access did not change.', kept: 'their access did not change (another payment covers it).', no_member: '' };
const REFUND_EMAIL = { sent: 'emailed', simulated: 'email NOT sent (no email set up)', failed: 'email failed', skipped: 'not emailed' };
const rupees = (paise) => `₹${(paise / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

const ACTION_WORDS = { added: 'Account made', extended: 'Existing member: access extended', closed: 'Access was closed: not reopened' };

function Registrations({ data, show, setShow, onRefund, busy }) {
  if (!data) return <p className="mc-small">Loading registrations…</p>;
  const extrasFor = (id) => (data.extra_payments || []).filter((e) => e.registration_id === id);
  const all = data.registrations;
  const rows = all.filter((r) => show === 'all' || r.status === show);
  return (
    <>
      <div className="sc-start" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
        <div className="sc-start-card"><p className="sc-start-label">Total paid</p><h3>{rupees(data.totals.paid_paise)}</h3><p>{data.totals.paid} payment{data.totals.paid === 1 ? '' : 's'}</p></div>
        <div className="sc-start-card"><p className="sc-start-label">To refund</p><h3>{rupees(data.totals.extra_paise)}</h3><p>{data.totals.extra} extra payment{data.totals.extra === 1 ? '' : 's'} · {data.totals.flagged} row{data.totals.flagged === 1 ? '' : 's'} need a decision</p></div>
        {data.totals.refunded != null && <div className="sc-start-card"><p className="sc-start-label">Refunded</p><h3>{rupees(data.totals.refunded_paise)}</h3><p>{data.totals.refunded} refund{data.totals.refunded === 1 ? '' : 's'}</p></div>}
        <div className="sc-start-card"><p className="sc-start-label">Not paid yet</p><h3>{data.totals.created}</h3><p>opened the payment, did not finish</p></div>
        <div className="sc-start-card"><p className="sc-start-label">Failed</p><h3>{data.totals.failed}</h3><p>see the reason in the table</p></div>
        <div className="sc-start-card"><p className="sc-start-label">Price now</p><h3>{data.price.label}</h3><p>{data.price.open ? `the kit is on sale${data.price.entry && data.price.entry.label ? ` · join ${data.price.entry.label}` : ''}` : 'sales closed (no Razorpay keys)'}</p></div>
        {data.totals.paid_members != null && <div className="sc-start-card"><p className="sc-start-label">Kit members</p><h3>{data.totals.paid_members}</h3><p>have the kit</p></div>}
        {data.totals.free_members != null && <div className="sc-start-card"><p className="sc-start-label">Without the kit</p><h3>{data.totals.free_members}</h3><p>watching (₹299) or not paid</p></div>}
        {data.totals.blocked_downloads_7d != null && <div className="sc-start-card"><p className="sc-start-label">Locked downloads</p><h3>{data.totals.blocked_downloads_7d}</h3><p>tried by members without the kit, last 7 days</p></div>}
      </div>
      {data.extra_payments.length > 0 && (
        <div className="sc-form" style={{ borderLeft: '6px solid #BE185D' }}>
          <h2>Extra payments: refund these in Razorpay</h2>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {data.extra_payments.map((e) => (
              <li key={e.razorpay_payment_id}>Extra payment — refund {e.razorpay_payment_id}: {rupees(e.amount_paise)} from {e.name} ({e.email}), {formatIST(e.created_at)}. The first payment on this order already gave access.</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mc-chips">
        {[['all', 'All', all.length], ['paid', 'Paid', data.totals.paid], ['refunded', 'Refunded', data.totals.refunded || 0], ['created', 'Not paid yet', data.totals.created], ['failed', 'Failed', data.totals.failed]].map(([k, label, n]) => (
          <button key={k} type="button" className="mc-chip" aria-pressed={show === k} onClick={() => setShow(k)}>{label} ({n})</button>
        ))}
      </div>
      <div style={{ overflowX: 'auto', background: 'var(--sc-card)', border: '1px solid var(--sc-line)', borderRadius: 14 }}>
        {rows.length === 0 ? <p style={{ padding: 20, margin: 0 }}>{all.length ? 'None with this status. Press All.' : 'No payments yet. They appear here as soon as someone presses Pay ₹299 on aumai.co.in/masterclass, Pay on /masterclass/register or Unlock the kit on their masterclass page.'}</p> : (
          <table className="sc-table" style={{ minWidth: 1100 }}>
            <thead><tr><th>Date</th><th>Name</th><th>Clinic</th><th>City</th><th>Email</th><th>WhatsApp</th><th>Type</th><th>Bought</th><th>Amount</th><th>Status</th><th>Came from</th><th>Notes</th><th>Actions</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>{formatIST(r.paid_at || r.created_at)}</td>
                  <td>{r.name}</td>
                  <td>{r.clinic}</td>
                  <td>{r.city || ''}</td>
                  <td>{r.email}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{r.whatsapp}</td>
                  <td>{data.clinic_types[r.clinic_type] || r.clinic_type}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{PRODUCT_LABEL[r.product] || PRODUCT_LABEL.kit}</td>
                  <td className="sc-num">{rupees(r.amount_paise)}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <span className={`mc-state mc-state-${r.status === 'paid' ? 'ok' : r.status === 'failed' ? 'revoked' : 'ended'}`} style={r.status === 'refunded' ? { background: '#E0E7FF' } : undefined}>{REG_STATUS[r.status] || r.status}</span>
                    {r.status === 'refunded' && <div className="mc-small">{formatISTDate(r.refunded_at)}</div>}
                  </td>
                  <td>{[r.utm_source, r.utm_campaign].filter(Boolean).join(' / ') || <span className="mc-small">direct</span>}</td>
                  <td className="mc-small">
                    {r.flag && r.status !== 'refunded' && <b style={{ color: '#BE185D', display: 'block' }}>{r.flag}</b>}
                    {r.status === 'refunded' && r.refund_rz_status === 'failed' && <b style={{ color: '#BE185D', display: 'block' }}>Razorpay FAILED this refund: the money did not go back. Refund them in the Razorpay dashboard.</b>}
                    {r.status === 'refunded'
                      ? `Refunded ${rupees(r.refund_amount_paise || r.amount_paise)} · ${r.refund_id}${r.refund_rz_status === 'pending' ? ' (Razorpay still processing)' : ''} · ${REFUND_ACCESS[r.refund_access] || ''}${r.refund_email_status ? ` · ${REFUND_EMAIL[r.refund_email_status] || r.refund_email_status}` : ''}`
                      : r.status === 'paid' ? `${ACTION_WORDS[r.member_action] || 'Account made'}${r.paid_via && r.paid_via !== 'checkout' ? ` (found by ${r.paid_via})` : ''}` : (r.error || '')}
                    {r.status === 'paid' && r.refund_state === 'failed' && <b style={{ color: '#BE185D', display: 'block' }}>Refund did not go through: {r.refund_error}</b>}
                    {r.status === 'paid' && r.refund_state === 'pending' && <b style={{ display: 'block' }}>Refund being checked with Razorpay: press Refresh in 15 minutes. Do not refund it in Razorpay.</b>}
                    {extrasFor(r.id).map((e) => <b key={e.razorpay_payment_id} style={{ color: '#BE185D', display: 'block' }}>Extra payment — refund {e.razorpay_payment_id}</b>)}
                  </td>
                  <td>
                    {r.status === 'paid' && r.razorpay_payment_id && r.refund_state !== 'pending' && (
                      <div className="mc-actions"><button type="button" className="mc-danger" onClick={() => onRefund(r)} disabled={busy}>Refund {rupees(r.amount_paise)}</button></div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
