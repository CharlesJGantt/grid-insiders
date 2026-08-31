import type { Metadata } from "next";
import { getAllRecaps } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Race Recaps",
  description: "Structured post-Grand Prix write-ups: result, key moments, and standings shift.",
};

export default function RecapsIndexPage() {
  const recaps = getAllRecaps();

  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-margin-desktop border-b border-outline-variant pb-6">
        <span className="mb-2 block font-body text-label-caps uppercase tracking-widest text-tertiary">
          Post-Session
        </span>
        <h1 className="font-headline text-headline-lg-mobile text-on-surface md:text-headline-lg">Race Recaps</h1>
        <p className="mt-2 max-w-2xl font-body text-body-lg text-on-surface-variant">
          Result, key moments, and championship implications from every Grand Prix weekend.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {recaps.map((entry) => (
          <ArticleCard
            key={entry.frontmatter.slug}
            href={`/recaps/${entry.frontmatter.slug}`}
            title={entry.frontmatter.title}
            summary={entry.frontmatter.summary}
            cover={entry.frontmatter.cover}
            kicker={entry.frontmatter.track}
            date={entry.frontmatter.date}
          />
        ))}
      </div>
    </div>
  );
}
