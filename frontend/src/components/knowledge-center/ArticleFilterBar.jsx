const mono = { fontFamily: 'JetBrains Mono, monospace' };

const TABS = [
  { id: 'articles', label: 'Articles', count: 19 },
  { id: 'briefs',   label: 'Briefs',   count: 8 },
  { id: 'series',   label: '90-Day Series', count: 5 },
];

const CAT_COUNTS = {
  'New Entrant Program': 8,
  'Authority Registration': 3,
  'Insurance Continuity': 1,
  'Drug & Alcohol Program': 3,
  'Vehicle & Operations': 2,
  'Hours of Service': 2,
};

export default function ArticleFilterBar({ activeTab, activeCategory, articleCount, onTabChange, onCategoryChange }) {
  return (
    <div data-testid="kc-filter-bar" style={{ background: '#FAF8F4', borderBottom: '1px solid rgba(28,43,58,0.12)', position: 'sticky', top: 60, zIndex: 40 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Content type tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(28,43,58,0.08)' }}>
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                data-testid={`kc-tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                style={{ ...mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, padding: '1rem 1.5rem', background: 'none', border: 'none', borderBottom: isActive ? '2px solid #1C2B3A' : '2px solid transparent', color: isActive ? '#1C2B3A' : '#6B7280', cursor: 'pointer', transition: 'color 0.15s, border-color 0.15s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#1C2B3A'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#6B7280'; }}
              >
                {tab.label}
                <span style={{ ...mono, fontSize: 8, letterSpacing: '0.1em', background: isActive ? '#1C2B3A' : 'rgba(28,43,58,0.1)', color: isActive ? '#FAF8F4' : '#6B7280', padding: '0.15rem 0.45rem', marginLeft: '0.5rem' }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category filters — only on articles tab */}
        {activeTab === 'articles' && (
          <div style={{ padding: '0.875rem 0', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {['All', ...Object.keys(CAT_COUNTS)].map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  data-testid={`filter-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  onClick={() => onCategoryChange(cat)}
                  style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, padding: '0.4rem 0.85rem', background: isActive ? '#1C2B3A' : 'transparent', color: isActive ? '#FAF8F4' : 'rgba(28,43,58,0.5)', border: isActive ? '1px solid #1C2B3A' : '1px solid rgba(28,43,58,0.18)', cursor: 'pointer', transition: 'all 0.15s', lineHeight: 1.5, borderRadius: 0 }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#1C2B3A'; e.currentTarget.style.borderColor = 'rgba(28,43,58,0.4)'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'rgba(28,43,58,0.5)'; e.currentTarget.style.borderColor = 'rgba(28,43,58,0.18)'; } }}
                >
                  {cat}{cat !== 'All' && <span style={{ opacity: 0.5, marginLeft: 4 }}>{CAT_COUNTS[cat]}</span>}
                </button>
              );
            })}
            <span style={{ ...mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280', marginLeft: 'auto' }}>
              {articleCount} {articleCount === 1 ? 'ARTICLE' : 'ARTICLES'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
