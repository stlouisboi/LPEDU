const mono = "'Inter', sans-serif";

export function ArticleByline({ date = "January 2026", author = "Vince Lawrence" }) {
  return (
    <p
      data-testid="article-byline"
      style={{
        fontFamily: mono,
        fontSize: "0.857rem",
        color: "rgba(13,27,48,0.55)",
        lineHeight: 1.5,
        marginTop: "0.875rem",
        paddingTop: "0.875rem",
        borderTop: "1px solid rgba(13,27,48,0.07)",
      }}
    >
      By {author} — Founder, LaunchPath Transportation EDU LLC · Published {date}
    </p>
  );
}
