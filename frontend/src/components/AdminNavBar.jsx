import { Link } from '../compat/Link';
import { usePathname } from 'next/navigation';
;

const mono  = "'JetBrains Mono', 'IBM Plex Mono', monospace";
const GOLD  = "#d4900a";
const NAVY  = "#001A33";

const NAV_LINKS = [
  { to: "/admin/admissions",   label: "Admissions"   },
  { to: "/admin/modules",      label: "Modules"      },
  { to: "/admin/products",     label: "Products"     },
  { to: "/admin/gate-reviews", label: "Gate Reviews" },
  { to: "/admin/community",    label: "Community"    },
];

export default function AdminNavBar() {
  const pathname = usePathname();

  return (
    <div style={{
      background: NAVY,
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      padding: "0 1.75rem",
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <Link
        to="/admin/admissions"
        style={{
          fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: GOLD, textDecoration: "none",
          padding: "1rem 1.25rem 1rem 0",
          marginRight: "1rem",
          borderBottom: "2px solid transparent",
          flexShrink: 0,
        }}
      >
        LAUNCHPATH ADMIN
      </Link>

      {NAV_LINKS.map(({ to, label }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            style={{
              fontFamily: mono,
              fontSize: "0.667rem",
              fontWeight: active ? 700 : 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: active ? "#FFFFFF" : "rgba(255,255,255,0.38)",
              textDecoration: "none",
              padding: "1rem 0.875rem",
              borderBottom: active ? `2px solid ${GOLD}` : "2px solid transparent",
              transition: "color 0.15s, border-color 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.72)"; } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.38)"; } }}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
