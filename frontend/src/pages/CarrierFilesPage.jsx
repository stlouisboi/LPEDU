const GOLD   = "#C8A96E";
const NAVY   = "#1C2B3A";
const DEEP   = "#0F1C27";
const CARD   = "#111F2A";
const MONO   = "'JetBrains Mono', 'Courier New', monospace";
const SANS   = "'Instrument Sans', 'Inter', sans-serif";
const SERIF  = "'Playfair Display', Georgia, serif";
const BODY   = "rgba(250,248,244,0.78)";
const MUTED  = "rgba(250,248,244,0.42)";

const CASES = [
  {
    code: "LP-CF-001",
    index: "001",
    outcome: "SATISFACTORY",
    outcomeOk: true,
    profile: {
      "Operation type":    "Owner-operator · dry van · 1 power unit",
      "Authority granted": "10 months before New Entrant Safety Audit",
      "Entered LaunchPath": "Month 2 of 18-month window",
      "Audit window remaining": "16 months at enrollment",
      "Region":            "Southeast",
    },
    entry: "DQ file existed as a folder — no formal structure. Employment verification section incomplete for prior employer contacts. MVR pulled once at hire; no annual review scheduled. Medical certificate on file; no tracking system for expiration or renewal. §391 gap score at entry: four of seven required elements either absent or non-compliant.",
    installed: [
      { cfr: "49 CFR §391.51", desc: "DQ file architecture — all seven required elements indexed and tabbed. File organized for immediate audit presentation." },
      { cfr: "49 CFR §391.25", desc: "Annual MVR review calendar installed with 30-day advance flag." },
      { cfr: "49 CFR §391.27", desc: "Annual driver inquiry procedure — FMCSA Drug & Alcohol Clearinghouse query added." },
      { cfr: "Medical certificate tracking", desc: "Expiration log with 30/60/90-day renewal reminders. Certificate filed in DQ file with notation of issue and expiration dates." },
    ],
    auditResult: {
      rating: "Satisfactory",
      acute: 0,
      recordable: 1,
      recordableNotes: "§391.51 — incomplete employment history for one prior position. Corrective documentation submitted and accepted prior to audit close.",
      retained: true,
    },
    consequence: "Incomplete employment verification and absent MVR review constitutes a §391.51 violation pattern. A pattern of DQ deficiencies without corrective documentation typically results in a Conditional rating. Conditional carriers face expedited follow-up review, increased broker scrutiny, and resistance from insurance underwriters during renewal.",
    note: '"I thought a folder was enough. I didn\'t know there was a specific structure FMCSA expected to find."',
  },
  {
    code: "LP-CF-002",
    index: "002",
    outcome: "SATISFACTORY",
    outcomeOk: true,
    profile: {
      "Operation type":    "Small fleet · dry van · 3 power units · 4 drivers",
      "Authority granted": "6 months before New Entrant Safety Audit",
      "Entered LaunchPath": "Month 6 of 18-month window",
      "Audit window remaining": "12 months at enrollment",
      "Region":            "Midwest",
    },
    entry: "Drug & alcohol policy document existed — carrier believed this satisfied §382 requirements. No consortium enrollment on file. Pre-employment test records absent for two of four drivers. No designated Medical Review Officer. No random testing pool membership. Supervisor training not documented. Carrier was operating under the assumption that having a written policy was sufficient.",
    installed: [
      { cfr: "49 CFR §382 (full program)", desc: "Consortium enrollment confirmed, MRO designation letter executed and filed. Testing calendar established with annual random selections tracked." },
      { cfr: "49 CFR §382.301", desc: "Pre-employment test records retrieved and filed for all four drivers. Gap closed prior to audit." },
      { cfr: "49 CFR §382.603", desc: "Supervisor training certificates obtained and filed for all supervisory personnel." },
      { cfr: "Random testing record", desc: "Annual pool membership confirmation on file. First random selection documented per consortium protocol." },
    ],
    auditResult: {
      rating: "Satisfactory",
      acute: 0,
      recordable: 0,
      recordableNotes: null,
      retained: true,
    },
    consequence: "Absence of consortium enrollment and missing pre-employment test records constitutes §382.301 and §382.305 violations. Either finding is classified as an acute violation under FMCSA's acute/critical framework. A single acute violation triggers an automatic Unsatisfactory safety rating. Unsatisfactory-rated carriers cannot operate — authority is subject to revocation within 45 days of the finding.",
    note: null,
  },
  {
    code: "LP-CF-003",
    index: "003",
    outcome: "SATISFACTORY",
    outcomeOk: true,
    profile: {
      "Operation type":    "Owner-operator · flatbed · 1 power unit",
      "Authority granted": "5 months before New Entrant Safety Audit",
      "Entered LaunchPath": "Month 5 of 18-month window",
      "Audit window remaining": "13 months at enrollment",
      "Region":            "Mid-Atlantic",
    },
    entry: "No systematic vehicle preventive maintenance records. DVIRs not consistently completed — treated as optional. HOS logs present but inconsistent: missing off-duty/sleeper berth notations across several weeks of records. Equipment file contained only title and registration. No PM interval documented. Operator was running the truck and running the business simultaneously — records were not the operational priority.",
    installed: [
      { cfr: "49 CFR §396.11", desc: "DVIR daily completion standard and 90-day retention protocol installed. Procedure laminated in cab." },
      { cfr: "49 CFR §396.3", desc: "Preventive maintenance schedule established by mileage and calendar interval. First scheduled PM event completed and documented." },
      { cfr: "49 CFR §395.8", desc: "HOS log review procedure — weekly self-review, notation correction process, six-month retention standard." },
      { cfr: "Equipment file rebuild", desc: "PM record tab, DVIR retention tab, and inspection history tab. File formatted for immediate audit presentation." },
    ],
    auditResult: {
      rating: "Satisfactory",
      acute: 0,
      recordable: 2,
      recordableNotes: "§396.11 — DVIRs missing for 3 pre-enrollment dates (historical gap; corrective action plan accepted). §395.8 — HOS notation gaps on 4 pre-enrollment logs (historical gap; corrective action plan accepted).",
      retained: true,
    },
    consequence: "Two recordable violations with no corrective documentation in place would have produced a Conditional rating. Conditional-rated carriers are flagged for expedited follow-up compliance review. The combination of maintenance and HOS deficiencies — without systematic records — also exposes the carrier to individual driver violations under §395 and §396 during roadside inspections, contributing to CSA score deterioration and making broker qualification more difficult.",
    note: '"I was running the truck and running the business. The records were never the priority. Now they are."',
  },
];

const PRIVACY_ROWS = [
  { field: "Names",           standard: "No carrier names, driver names, or owner names published." },
  { field: "DOT numbers",     standard: "Never included." },
  { field: "Location",        standard: "Region only — e.g., 'Southeast,' 'Midwest.' No city or state." },
  { field: "Operation type",  standard: "Published — e.g., 'Owner-operator, dry van, 1 power unit.'" },
  { field: "Outcome data",    standard: "Published in full: audit result, violations cited, authority status." },
];

function AuditBadge({ ok }) {
  return (
    <span style={{
      fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: ok ? '#059669' : '#ef4444',
      background: ok ? 'rgba(5,150,105,0.08)' : 'rgba(239,68,68,0.08)',
      border: `1px solid ${ok ? 'rgba(5,150,105,0.25)' : 'rgba(239,68,68,0.25)'}`,
      padding: '3px 8px',
    }}>
      {ok ? 'SATISFACTORY' : 'CONDITIONAL'}
    </span>
  );
}

function CaseFile({ c, index }) {
  return (
    <div
      data-testid={`carrier-file-${c.index}`}
      style={{
        background: CARD,
        borderTop: `3px solid ${c.outcomeOk ? 'rgba(200,169,110,0.55)' : 'rgba(239,68,68,0.4)'}`,
        border: `1px solid rgba(200,169,110,0.12)`,
        borderTopWidth: 3,
        marginBottom: '3rem',
      }}
    >
      {/* File header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        padding: '1.25rem 1.75rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, flexShrink: 0 }} />
          <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD }}>
            CARRIER FILE {c.code}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <AuditBadge ok={c.outcomeOk} />
          <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', color: MUTED }}>
            AUTHORITY RETAINED
          </span>
        </div>
      </div>

      {/* Carrier profile — compact grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1px',
        background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {Object.entries(c.profile).map(([k, v]) => (
          <div key={k} style={{ background: CARD, padding: '0.875rem 1.25rem' }}>
            <p style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', margin: '0 0 0.3rem' }}>{k}</p>
            <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: BODY, margin: 0, lineHeight: 1.5 }}>{v}</p>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div style={{ padding: '0 1.75rem' }}>

        {/* Situation at Entry */}
        <Section label="SITUATION AT ENTRY" cfr={null}>
          <p style={{ fontFamily: SANS, fontSize: '0.925rem', color: BODY, lineHeight: 1.8, margin: 0 }}>{c.entry}</p>
        </Section>

        {/* What Was Installed */}
        <Section label="WHAT WAS INSTALLED">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {c.installed.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
                  color: GOLD, background: 'rgba(200,169,110,0.08)',
                  padding: '3px 7px', flexShrink: 0, whiteSpace: 'nowrap', marginTop: 2,
                }}>
                  {item.cfr}
                </span>
                <p style={{ fontFamily: SANS, fontSize: '0.9rem', color: BODY, margin: 0, lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Audit Outcome */}
        <Section label="AUDIT OUTCOME">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: c.auditResult.recordableNotes ? '1.25rem' : 0 }}>
            {[
              { label: 'Safety Rating',        value: c.auditResult.rating,          gold: c.outcomeOk },
              { label: 'Acute Violations',      value: c.auditResult.acute,           gold: c.auditResult.acute === 0 },
              { label: 'Recordable Violations', value: c.auditResult.recordable,      gold: c.auditResult.recordable === 0 },
              { label: 'Authority Retained',    value: c.auditResult.retained ? 'YES' : 'NO', gold: c.auditResult.retained },
            ].map(({ label, value, gold }) => (
              <div key={label} style={{ borderLeft: '2px solid rgba(200,169,110,0.2)', paddingLeft: '0.875rem' }}>
                <p style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED, margin: '0 0 0.3rem' }}>{label}</p>
                <p style={{ fontFamily: MONO, fontSize: '1rem', fontWeight: 700, color: gold ? '#C8A96E' : '#ef4444', margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
          {c.auditResult.recordableNotes && (
            <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: MUTED, lineHeight: 1.75, margin: 0, paddingLeft: '0.1rem' }}>
              <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(200,169,110,0.45)', marginRight: 8 }}>NOTES</span>
              {c.auditResult.recordableNotes}
            </p>
          )}
        </Section>

        {/* Where They Would Have Been */}
        <Section label="WHERE THEY WOULD HAVE BEEN">
          <p style={{ fontFamily: SANS, fontSize: '0.925rem', color: BODY, lineHeight: 1.8, margin: 0 }}>{c.consequence}</p>
        </Section>

        {/* Carrier Note */}
        {c.note ? (
          <Section label="CARRIER NOTE" last>
            <blockquote style={{
              margin: 0,
              paddingLeft: '1.25rem',
              borderLeft: `3px solid rgba(200,169,110,0.35)`,
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontSize: '1.05rem',
              color: 'rgba(250,248,244,0.85)',
              lineHeight: 1.75,
            }}>
              {c.note}
            </blockquote>
          </Section>
        ) : (
          <Section label="CARRIER NOTE" last>
            <p style={{ fontFamily: MONO, fontSize: '0.75rem', color: MUTED, margin: 0, letterSpacing: '0.06em' }}>Section omitted — carrier declined to provide a statement.</p>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ label, children, last }) {
  return (
    <div style={{
      padding: '1.5rem 0',
      borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.05)',
    }}>
      <p style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.5)', margin: '0 0 0.875rem' }}>
        {label}
      </p>
      {children}
    </div>
  );
}

export default function CarrierFilesPage() {
  return (
    <div style={{ background: NAVY, minHeight: '100vh', fontFamily: SANS }}>

      {/* Classification band */}
      <div style={{ borderBottom: '1px solid rgba(200,169,110,0.1)', padding: '0 1.5rem' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 40 }}>
          <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.45)' }}>
            LP-MKT-001 · Carrier Files
          </span>
          <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.35)' }}>
            3 FILES PUBLISHED
          </span>
        </div>
      </div>

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(3rem,7vw,5rem) 1.5rem' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <h1 style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.25rem)', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.08, marginBottom: '1.25rem' }}>
            Carrier Files
          </h1>
          <p style={{ fontFamily: SANS, fontSize: '1rem', color: BODY, lineHeight: 1.85, maxWidth: 620, margin: 0 }}>
            Documented carrier outcomes — what was missing at entry, what was installed, and what the New Entrant Safety Audit found. No names. No DOT numbers. Outcome data published in full.
          </p>
        </div>
      </div>

      {/* Files */}
      <div style={{ maxWidth: 920, margin: '0 auto', padding: 'clamp(3rem,6vw,4.5rem) 1.5rem' }}>
        {CASES.map((c, i) => <CaseFile key={c.code} c={c} index={i} />)}

        {/* Privacy standard */}
        <div style={{ marginTop: '1rem' }}>
          <p style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,169,110,0.45)', marginBottom: '1.25rem' }}>
            PRIVACY STANDARD — ALL FILES
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(255,255,255,0.06)' }}>
              <thead>
                <tr>
                  {['Field', 'Standard'].map(h => (
                    <th key={h} style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED, padding: '0.75rem 1.25rem', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRIVACY_ROWS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.012)' : 'transparent' }}>
                    <td style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: GOLD, padding: '0.875rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.04)', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{row.field}</td>
                    <td style={{ fontFamily: SANS, fontSize: '0.875rem', color: BODY, padding: '0.875rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.04)', lineHeight: 1.6 }}>{row.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
