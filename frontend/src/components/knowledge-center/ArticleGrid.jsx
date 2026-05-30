import ArticleCard from './ArticleCard';

export default function ArticleGrid({ articles, activeCategory }) {
  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const pillar = filtered.find(a => a.isPillar);
  const rest = filtered.filter(a => !a.isPillar);

  return (
    <div data-testid="kc-article-grid" style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
      {filtered.length === 0 && (
        <div style={{ padding: '3rem 0', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B7280' }}>
          No articles in this category.
        </div>
      )}

      {pillar && (
        <div style={{ marginBottom: 0 }}>
          <ArticleCard
            variant="featured"
            code={pillar.code}
            category={pillar.category}
            title={pillar.title}
            excerpt={pillar.teaser}
            readTime={pillar.readTime}
            cfr={pillar.cfr}
            slug={pillar.slug}
            isPillar
          />
        </div>
      )}

      {rest.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', borderTop: pillar ? '1px solid rgba(28,43,58,0.1)' : 'none', borderLeft: '1px solid rgba(28,43,58,0.1)' }} className="kc-articles-grid">
          {rest.map((article, i) => (
            <ArticleCard
              key={article.slug}
              variant="standard"
              code={article.code}
              category={article.category}
              title={article.title}
              excerpt={article.teaser}
              readTime={article.readTime}
              cfr={article.cfr}
              slug={article.slug}
            />
          ))}
        </div>
      )}

      <style>{`@media(max-width:768px){.kc-articles-grid{grid-template-columns:1fr!important}.kc-featured-grid{grid-template-columns:1fr!important}.kc-featured-img{display:none!important}}`}</style>
    </div>
  );
}
