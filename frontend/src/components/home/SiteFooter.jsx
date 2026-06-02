import Image from 'next/image';
import { Link } from '../../compat/Link';

const mono = { fontFamily: 'JetBrains Mono, monospace' };

const NAV = [
  { label: 'REACH Diagnostic', href: '/reach-diagnostic' },
  { label: '16 Sins', href: '/standards/16-deadly-sins' },
  { label: 'Tools', href: '/tools' },
  { label: 'About Vince', href: '/about' },
  { label: 'Documents', href: '/compliance-library' },
  { label: 'Portal', href: '/portal' },
];

export default function SiteFooter() {
  return (
    <footer style={{ background: '#1C2B3A', borderTop: '1px solid rgba(250,248,244,0.1)', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', alignItems: 'start' }} className="lp-footer-grid">

        {/* Col 1 */}
        <div>
          <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem', textDecoration: 'none' }}>
            <Image
              src="/launchpath-logo-white.png"
              alt="LaunchPath"
              width={140}
              height={21}
              style={{ objectFit: 'contain', objectPosition: 'left center', display: 'block', opacity: 0.9 }}
            />
          </Link>
          <p style={{ ...mono, fontSize: 11, letterSpacing: '0.08em', color: 'rgba(250,248,244,0.65)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
            Install the compliance system FMCSA expects to find before they open your file.
          </p>
          <address style={{ fontStyle: 'normal' }}>
            <a href="mailto:vince@launchpathedu.com" style={{ ...mono, fontSize: 11, letterSpacing: '0.08em', color: '#C8A96E', textDecoration: 'none' }}>vince@launchpathedu.com</a>
          </address>
        </div>

        {/* Col 2 — Nav */}
        <nav aria-label="Footer navigation" style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {NAV.map(n => (
            <Link key={n.href} to={n.href} style={{ ...mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.70)', textDecoration: 'none' }}>{n.label}</Link>
          ))}
        </nav>

        {/* Col 3 — Legal + CTA */}
        <div style={{ textAlign: 'right' }}>
          <Link to="/ground-0-briefing" data-testid="footer-admission-cta" style={{ ...mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1C2B3A', background: '#C8A96E', padding: '0.65rem 1.25rem', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem', fontWeight: 700 }}>
            REQUEST ADMISSION →
          </Link>
          <p style={{ ...mono, fontSize: 10, letterSpacing: '0.08em', color: 'rgba(250,248,244,0.82)', lineHeight: 1.8 }}>
            © 2026 LaunchPath Standard.<br />
            Verified against 49 CFR.<br />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
