import type { Metadata } from "next";
import { getAllArticles } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "News",
  description: "Breaking news and technical-analysis features from the GridInsiders desk.",
};

export default function ArticlesIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-margin-desktop border-b border-outline-variant pb-6">
        <span className="mb-2 block font-body text-label-caps uppercase tracking-widest text-tertiary">
          Flagship Section
        </span>
        <h1 className="font-headline text-headline-lg-mobile text-on-surface md:text-headline-lg">News</h1>
        <p className="mt-2 max-w-2xl font-body text-body-lg text-on-surface-variant">
          Breaking news and deep technical-analysis features, from the pit wall to the wind tunnel.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((entry) => (
          <ArticleCard
            key={entry.frontmatter.slug}
            href={`/articles/${entry.frontmatter.slug}`}
            title={entry.frontmatter.title}
            summary={entry.frontmatter.summary}
            cover={entry.frontmatter.cover}
            kicker={entry.frontmatter.category ?? entry.frontmatter.tags[0]}
            date={entry.frontmatter.date}
          />
        ))}
      </div>
    </div>
  );
}
