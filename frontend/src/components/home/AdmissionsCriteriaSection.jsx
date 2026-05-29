import { Check, AlertTriangle, X } from 'lucide-react';
import { Link } from '../../compat/Link';

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };

const TIERS = [
  {
    badge: 'Qualified', badgeColor: '#059669',
    borderColor: '#059669',
    title: 'Active carrier ready for implementation.',
    icon: Check, iconColor: '#059669',
    items: ['Active USDOT operating authority', '1 or more commercial drivers on record', 'Registered with FMCSA Drug & Alcohol Clearinghouse', 'Willing to submit files for manual review'],
    cta: 'Request Ground 0 Briefing', href: '/ground-0-briefing', ctaBg: '#1C2B3A', ctaColor: '#FAF8F4',
  },
  {
    badge: 'Borderline — Apply Anyway', badgeColor: '#8B7355',
    borderColor: '#8B7355',
    title: 'Gaps exist. Authority is active. This is fixable.',
    icon: AlertTriangle, iconColor: '#8B7355',
    items: ['New entrant carrier (authority < 6 months)', 'Compliance gaps exist but authority is active', 'MCS-150 may be out of date'],
    cta: 'Submit for Review', href: '/ground-0-briefing', ctaBg: '#1C2B3A', ctaColor: '#FAF8F4',
  },
  {
    badge: 'Not Qualified', badgeColor: '#DC2626',
    borderColor: '#DC2626',
    title: 'The program cannot help with these conditions.',
    icon: X, iconColor: '#DC2626',
    items: ['Inactive or revoked operating authority', 'No USDOT number registered', 'Seeking documentation only (no implementation)'],
    cta: 'Visit Compliance Library', href: '/standards', ctaBg: '#F5F2EC', ctaColor: '#1C2B3A',
  },
];

export default function AdmissionsCriteriaSection() {
  return (
    <section style={{ background: '#FAF8F4', padding: 'clamp(4rem,7vw,6rem) 1.5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <p style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8B7355', marginBottom: '0.75rem' }}>Admissions Criteria</p>
        <h2 style={{ ...serif, fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: '#1C2B3A', marginBottom: '3rem' }}>Who Qualifies for LP-COH-002</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="lp-three-col">
          {TIERS.map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} style={{ background: '#F5F2EC', border: '1px solid rgba(28,43,58,0.1)', borderTop: `3px solid ${t.borderColor}`, padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column' }}>
                <span style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.badgeColor, marginBottom: '0.75rem', display: 'block' }}>{t.badge}</span>
                <p style={{ ...serif, fontWeight: 700, fontSize: '1.05rem', color: '#1C2B3A', marginBottom: '1.25rem', lineHeight: 1.3 }}>{t.title}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', flex: 1 }}>
                  {t.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: '0.6rem' }}>
                      <Icon size={13} color={t.iconColor} style={{ marginTop: 3, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '0.875rem', color: 'rgba(45,55,72,0.8)', lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to={t.href} style={{ ...mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', background: t.ctaBg, color: t.ctaColor, padding: '0.75rem 1rem', textDecoration: 'none', textAlign: 'center', borderRadius: 0, border: t.ctaBg === '#F5F2EC' ? '1px solid rgba(28,43,58,0.2)' : 'none', display: 'block' }}>
                  {t.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
