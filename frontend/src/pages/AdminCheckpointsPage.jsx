/**
 * AdminCheckpointsPage — LP-WRK-001 §4.2 / §7.6
 * Station Custodian checkpoint review panel.
 * 5 compliance-domain checkpoints per enrolled carrier.
 * States: PENDING | SUBMITTED | UNDER_REVIEW | PASSED | FAILED
 */
import { useState, useEffect, useCallback } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import PasswordInput from '../components/PasswordInput';

const API  = process.env.REACT_APP_BACKEND_URL;
const GOLD = '#C8A96E';
const NAVY = '#001B36';
const DARK = '#0a0f1a';
const MONO = "'JetBrains Mono','Courier New',monospace";
const SANS = "'Inter',sans-serif";

const STATUS_CONFIG = {
  PENDING:      { label: 'PENDING',      color: 'rgba(250,248,244,0.72)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.10)' },
  SUBMITTED:    { label: 'SUBMITTED',    color: '#F59E0B',                bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)'   },
  UNDER_REVIEW: { label: 'UNDER REVIEW', color: '#60A5FA',                bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.25)'   },
  PASSED:       { label: 'PASSED',       color: '#34D399',                bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.25)'   },
  FAILED:       { label: 'FAILED',       color: '#F87171',                bg: 'rgba(248,113,113,0.08)',border: 'rgba(248,113,113,0.25)'  },
};

const ACTIONS = {
  PENDING:      ['SUBMITTED', 'UNDER_REVIEW', 'PASSED', 'FAILED'],
  SUBMITTED:    ['UNDER_REVIEW', 'PASSED', 'FAILED'],
  UNDER_REVIEW: ['PASSED', 'FAILED'],
  PASSED:       ['FAILED'],
  FAILED:       ['PASSED'],
};

// ── Login Gate ─────────────────────────────────────────────────────────────
function AdminLoginGate({ onSuccess }) {
  const [form, setForm]   = useState({ email: '', password: '' });
  const [state, setState] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState('loading');
    try {
      const resp = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (!resp.ok) throw new Error('bad');
      const data = await resp.json();
      if (data.user?.email !== 'vince@launchpathedu.com') { setState('error'); return; }
      onSuccess();
    } catch { setState('error'); }
  };

  return (
    <div style={{ maxWidth: 420, margin: '0 auto', padding: '112px 24px 80px' }}>
      <p style={{ fontFamily: MONO, fontSize: '0.714rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.75)', marginBottom: '1.25rem' }}>
        LP-WRK-001 | STATION CUSTODIAN
      </p>
      <h1 style={{ fontWeight: 700, fontSize: '2rem', color: '#FFF', lineHeight: 1.1, marginBottom: '2rem', fontFamily: SANS }}>
        Admin Access
      </h1>
      {state === 'error' && (
        <p style={{ fontSize: '13px', color: '#F87171', marginBottom: '1rem' }}>Invalid credentials or insufficient access.</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          data-testid="cp-login-email"
          type="email" placeholder="Email" value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
          style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.14)', color: '#FFF', fontSize: '1rem', padding: '0.875rem 1.125rem', outline: 'none', marginBottom: '1rem', fontFamily: SANS }}
        />
        <PasswordInput
          data-testid="cp-login-password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          placeholder="Password"
          required
        />
        <button
          data-testid="cp-login-submit"
          type="submit" disabled={state === 'loading'}
          style={{ marginTop: '1.25rem', width: '100%', background: GOLD, color: NAVY, fontFamily: MONO, fontSize: '0.714rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '1rem', border: 'none', cursor: 'pointer' }}
        >
          {state === 'loading' ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

// ── Status badge ───────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
  return (
    <span style={{ display: 'inline-block', fontFamily: MONO, fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, padding: '3px 8px' }}>
      {cfg.label}
    </span>
  );
}

// ── Single checkpoint row ──────────────────────────────────────────────────
function CheckpointCard({ cp, onUpdate }) {
  const [editing,       setEditing]       = useState(false);
  const [notes,         setNotes]         = useState(cp.admin_notes || '');
  const [saving,        setSaving]        = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handleAction = async (newStatus) => {
    // PASSED / FAILED require notes confirmation step
    if (!editing && (newStatus === 'PASSED' || newStatus === 'FAILED')) {
      setEditing(true);
      setPendingAction(newStatus);
      return;
    }
    setSaving(true);
    try {
      const resp = await fetch(`${API}/api/admin/checkpoints/${cp.checkpoint_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus, admin_notes: notes }),
      });
      if (!resp.ok) throw new Error('Update failed');
      onUpdate(cp.checkpoint_id, newStatus, notes);
      setEditing(false);
      setPendingAction(null);
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const cfg             = STATUS_CONFIG[cp.status] || STATUS_CONFIG.PENDING;
  const availableActions = ACTIONS[cp.status] || [];

  return (
    <div style={{ background: NAVY, border: `1px solid ${cfg.border}`, padding: '20px 24px', marginBottom: '1px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '0.16em' }}>
              {cp.checkpoint_code} — Day {cp.target_day}
            </span>
            <StatusBadge status={cp.status} />
          </div>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#ffffff', lineHeight: 1.4, fontFamily: SANS }}>
            {cp.checkpoint_label}
          </p>
          {cp.reviewed_at && (
            <p style={{ margin: '4px 0 0', fontFamily: MONO, fontSize: '10px', color: 'rgba(250,248,244,0.75)', letterSpacing: '0.08em' }}>
              Reviewed: {new Date(cp.reviewed_at).toLocaleDateString()}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {availableActions.map(action => (
            <button
              key={action}
              data-testid={`cp-action-${cp.checkpoint_id}-${action}`}
              onClick={() => handleAction(action)}
              disabled={saving}
              style={{
                fontFamily: MONO, fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '7px 14px', cursor: 'pointer', background: 'transparent',
                border: action === 'PASSED' ? '1px solid rgba(52,211,153,0.5)' : action === 'FAILED' ? '1px solid rgba(248,113,113,0.5)' : '1px solid rgba(255,255,255,0.15)',
                color: action === 'PASSED' ? '#34D399' : action === 'FAILED' ? '#F87171' : 'rgba(255,255,255,0.55)',
                opacity: saving ? 0.5 : 1,
              }}
            >
              {editing && pendingAction === action ? `CONFIRM ${action}` : `MARK ${action.replace('_', ' ')}`}
            </button>
          ))}
          {editing && (
            <button
              onClick={() => { setEditing(false); setPendingAction(null); }}
              style={{ fontFamily: MONO, fontSize: '9px', padding: '7px 12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(250,248,244,0.82)', cursor: 'pointer', letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              CANCEL
            </button>
          )}
        </div>
      </div>

      {(cp.admin_notes || editing) && (
        <div style={{ marginTop: '14px' }}>
          {editing ? (
            <div>
              <textarea
                data-testid={`cp-notes-${cp.checkpoint_id}`}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Gap notes — visible to carrier in portal when status is FAILED"
                rows={3}
                style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontSize: '13px', lineHeight: 1.6, padding: '10px 14px', fontFamily: SANS, resize: 'vertical', outline: 'none' }}
              />
              {pendingAction && (
                <button
                  data-testid={`cp-confirm-${cp.checkpoint_id}`}
                  onClick={() => handleAction(pendingAction)}
                  disabled={saving}
                  style={{
                    marginTop: '8px', fontFamily: MONO, fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '10px 20px', cursor: 'pointer',
                    background: pendingAction === 'PASSED' ? 'rgba(52,211,153,0.15)' : 'rgba(248,113,113,0.15)',
                    border: pendingAction === 'PASSED' ? '1px solid rgba(52,211,153,0.5)' : '1px solid rgba(248,113,113,0.5)',
                    color: pendingAction === 'PASSED' ? '#34D399' : '#F87171',
                  }}
                >
                  {saving ? 'SAVING...' : `CONFIRM ${pendingAction}`}
                </button>
              )}
            </div>
          ) : cp.admin_notes ? (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '10px 14px' }}>
              <p style={{ margin: '0 0 4px', fontFamily: MONO, fontSize: '9px', color: 'rgba(250,248,244,0.75)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Admin Notes</p>
              <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, whiteSpace: 'pre-wrap', fontFamily: SANS }}>{cp.admin_notes}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

// ── Carrier accordion section ──────────────────────────────────────────────
function CarrierSection({ carrierGroup, onUpdate }) {
  const [open, setOpen] = useState(false);
  const { carrier_name, carrier_email, checkpoints } = carrierGroup;

  const passed   = checkpoints.filter(c => c.status === 'PASSED').length;
  const failed   = checkpoints.filter(c => c.status === 'FAILED').length;
  const atRisk   = failed > 0;
  const allPassed = passed === 5;

  return (
    <div style={{ marginBottom: '16px', border: `1px solid ${atRisk ? 'rgba(248,113,113,0.25)' : allPassed ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.08)'}` }}>
      <button
        data-testid={`carrier-header-${carrierGroup.carrier_id}`}
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: NAVY, border: 'none', cursor: 'pointer', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}
      >
        <div style={{ flex: 1, textAlign: 'left' }}>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#ffffff', fontFamily: SANS }}>{carrier_name}</p>
          <p style={{ margin: '2px 0 0', fontFamily: MONO, fontSize: '10px', color: 'rgba(250,248,244,0.78)', letterSpacing: '0.08em' }}>{carrier_email}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {[0,1,2,3,4].map(i => {
                const cp = checkpoints[i];
                const s  = cp ? cp.status : 'PENDING';
                return <div key={i} style={{ width: 10, height: 10, background: STATUS_CONFIG[s]?.color || 'rgba(255,255,255,0.20)' }} title={cp?.checkpoint_code || ''} />;
              })}
            </div>
            <p style={{ margin: '4px 0 0', fontFamily: MONO, fontSize: '9px', color: 'rgba(250,248,244,0.75)', letterSpacing: '0.10em', textTransform: 'uppercase' }}>
              {passed}/5 Passed{failed > 0 ? ` · ${failed} Failed` : ''}
            </p>
          </div>
          <span style={{ color: 'rgba(250,248,244,0.78)', fontSize: '18px', lineHeight: 1 }}>{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div>
          {checkpoints.map(cp => (
            <CheckpointCard key={cp.checkpoint_id} cp={cp} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function AdminCheckpointsPage() {
  const [authState,       setAuthState]       = useState('checking');
  const [data,            setData]            = useState(null);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState('');
  const [filter,          setFilter]          = useState('ALL');

  const checkAuth = useCallback(async () => {
    try {
      const resp = await fetch(`${API}/api/auth/me`, { credentials: 'include' });
      if (!resp.ok) { setAuthState('unauthed'); return; }
      const d = await resp.json();
      setAuthState(d.user?.email === 'vince@launchpathedu.com' ? 'authed' : 'unauthed');
    } catch { setAuthState('unauthed'); }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const resp = await fetch(`${API}/api/admin/checkpoints`, { credentials: 'include' });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      setData(await resp.json());
    } catch (e) {
      setError('Failed to load checkpoints: ' + e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { checkAuth(); }, [checkAuth]);
  useEffect(() => { if (authState === 'authed') load(); }, [authState, load]);

  const handleUpdate = (checkpointId, newStatus, newNotes) => {
    setData(prev => !prev ? prev : ({
      ...prev,
      carriers: prev.carriers.map(c => ({
        ...c,
        checkpoints: c.checkpoints.map(cp =>
          cp.checkpoint_id === checkpointId ? { ...cp, status: newStatus, admin_notes: newNotes } : cp
        ),
      })),
    }));
  };

  const filteredCarriers = (data?.carriers || []).filter(c => {
    if (filter === 'ALL') return true;
    const hasF  = c.checkpoints.some(cp => cp.status === 'FAILED');
    const allP  = c.checkpoints.every(cp => cp.status === 'PASSED');
    if (filter === 'AT_RISK') return hasF;
    if (filter === 'COMPLETE') return allP;
    if (filter === 'ACTIVE')   return !hasF && !allP;
    return true;
  });

  // ── Render states ─────────────────────────────────────────────────────────
  if (authState === 'checking') {
    return (
      <div style={{ minHeight: '100vh', background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(250,248,244,0.75)', letterSpacing: '0.14em' }}>LOADING...</p>
      </div>
    );
  }

  if (authState === 'unauthed') {
    return (
      <div style={{ minHeight: '100vh', background: DARK, color: '#f4f7fb' }}>
        <AdminLoginGate onSuccess={() => setAuthState('authed')} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: DARK, color: '#f4f7fb' }}>
      <AdminNavBar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, margin: '0 0 12px' }}>
            LP-WRK-001 §4.2 — STATION CUSTODIAN CHECKPOINT REVIEW
          </p>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', margin: '0 0 8px', letterSpacing: '-0.02em', fontFamily: SANS }}>
            Carrier Checkpoints
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(250,248,244,0.85)', margin: 0, maxWidth: '640px', lineHeight: 1.65, fontFamily: SANS }}>
            Five compliance-domain checkpoints per enrolled carrier. Mark PASSED or FAILED and add written gap notes. Notes on FAILED checkpoints are visible to the carrier in their portal.
          </p>
        </div>

        {/* Checkpoint schedule reference */}
        <div style={{ background: NAVY, border: '1px solid rgba(255,255,255,0.07)', padding: '20px 24px', marginBottom: '32px' }}>
          <p style={{ fontFamily: MONO, fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD, margin: '0 0 14px' }}>
            CHECKPOINT SCHEDULE — LP-WRK-001 §4.2
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '12px' }}>
            {[
              { code: 'CP-01', day: 14, label: 'Authority & Entity Foundation' },
              { code: 'CP-02', day: 30, label: 'Driver Qualification Files' },
              { code: 'CP-03', day: 45, label: 'Drug & Alcohol Program' },
              { code: 'CP-04', day: 60, label: 'HOS, Maintenance & Insurance' },
              { code: 'CP-05', day: 90, label: 'Integrity Audit Simulation' },
            ].map(cp => (
              <div key={cp.code} style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: '12px' }}>
                <p style={{ fontFamily: MONO, fontSize: '9px', color: GOLD, margin: '0 0 2px', letterSpacing: '0.12em', fontWeight: 700 }}>{cp.code} — Day {cp.day}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0, fontFamily: SANS }}>{cp.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        {data && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
            <p style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(250,248,244,0.82)', margin: 0, letterSpacing: '0.08em' }}>
              {data.total_carriers} enrolled carrier{data.total_carriers !== 1 ? 's' : ''}
            </p>
            <div style={{ height: '14px', width: '1px', background: 'rgba(255,255,255,0.12)' }} />
            {['ALL', 'ACTIVE', 'AT_RISK', 'COMPLETE'].map(f => (
              <button
                key={f}
                data-testid={`filter-${f}`}
                onClick={() => setFilter(f)}
                style={{
                  fontFamily: MONO, fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '6px 14px', cursor: 'pointer',
                  background: filter === f ? GOLD : 'transparent',
                  color:      filter === f ? NAVY  : 'rgba(255,255,255,0.45)',
                  border:    `1px solid ${filter === f ? GOLD : 'rgba(255,255,255,0.12)'}`,
                }}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
            <button
              data-testid="refresh-checkpoints"
              onClick={load}
              style={{ fontFamily: MONO, fontSize: '9px', padding: '6px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(250,248,244,0.82)', cursor: 'pointer', letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 'auto' }}
            >
              REFRESH
            </button>
          </div>
        )}

        {/* Loading / error / empty */}
        {loading && (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(250,248,244,0.75)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>LOADING CHECKPOINTS...</p>
          </div>
        )}
        {error && (
          <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', padding: '16px 20px', marginBottom: '24px' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#F87171', fontFamily: SANS }}>{error}</p>
          </div>
        )}
        {!loading && !error && data && filteredCarriers.length === 0 && (
          <div style={{ padding: '80px 0', textAlign: 'center' }}>
            <p style={{ fontFamily: MONO, fontSize: '13px', color: 'rgba(250,248,244,0.72)', letterSpacing: '0.14em' }}>
              {filter === 'ALL' ? 'NO ENROLLED CARRIERS' : `NO ${filter.replace('_', ' ')} CARRIERS`}
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(250,248,244,0.72)', marginTop: '8px', fontFamily: SANS }}>
              {filter === 'ALL'
                ? 'Carriers enrolled with cohort access will appear here with their 5 checkpoints.'
                : 'Change the filter to view other carriers.'}
            </p>
          </div>
        )}

        {/* Carrier list */}
        {!loading && filteredCarriers.map(cg => (
          <CarrierSection key={cg.carrier_id} carrierGroup={cg} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  );
}
