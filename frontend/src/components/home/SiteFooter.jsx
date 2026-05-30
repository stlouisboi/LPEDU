import Image from 'next/image';
import { Link } from '../../compat/Link';

const mono = { fontFamily: 'JetBrains Mono, monospace' };

const NAV = [
  { label: 'REACH Diagnostic', href: '/reach-diagnostic' },
  { label: '16 Sins', href: '/standards/16-deadly-sins' },
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
              width={120}
              height={18}
              style={{ objectFit: 'contain', objectPosition: 'left center', display: 'block', opacity: 0.85 }}
            />
          </Link>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', color: 'rgba(250,248,244,0.4)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Install the compliance system FMCSA expects to find before they open your file.
          </p>
          <address style={{ fontStyle: 'normal' }}>
            <a href="mailto:vince@giglinecompliance.com" style={{ ...mono, fontSize: 9, letterSpacing: '0.08em', color: '#8B7355', textDecoration: 'none' }}>vince@giglinecompliance.com</a>
          </address>
        </div>

        {/* Col 2 — Nav */}
        <nav aria-label="Footer navigation" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {NAV.map(n => (
            <Link key={n.href} to={n.href} style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.45)', textDecoration: 'none' }}>{n.label}</Link>
          ))}
        </nav>

        {/* Col 3 — Legal + CTA */}
        <div style={{ textAlign: 'right' }}>
          <Link to="/ground-0-briefing" data-testid="footer-admission-cta" style={{ ...mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FAF8F4', background: '#8B7355', padding: '0.5rem 1rem', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
            REQUEST ADMISSION →
          </Link>
          <p style={{ ...mono, fontSize: 9, letterSpacing: '0.08em', color: 'rgba(250,248,244,0.3)', lineHeight: 1.8 }}>
            © 2026 LaunchPath Standard.<br />
            Verified against 49 CFR.<br />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
