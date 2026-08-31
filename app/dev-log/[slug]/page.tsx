import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllDevLog, getDevLogBySlug } from "@/lib/content";
import { ArticleBody } from "@/components/ArticleBody";
import { StatusBadge } from "@/components/StatusBadge";

export function generateStaticParams() {
  return getAllDevLog().map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getDevLogBySlug(slug);
  if (!entry) return {};
  return { title: `${entry.frontmatter.version} — ${entry.frontmatter.team}`, description: entry.frontmatter.summary };
}

export default async function DevLogEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getDevLogBySlug(slug);
  if (!entry) notFound();
  const { frontmatter, html } = entry;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-margin-mobile py-margin-desktop">
      <div className="mb-margin-desktop aspect-[21/9] w-full overflow-hidden rounded border border-outline-variant md:aspect-[16/6]">
        <div className="relative h-full w-full">
          <Image src={frontmatter.cover} alt="" fill className="object-cover" priority />
        </div>
      </div>
      <article className="flex w-full flex-col gap-gutter">
        <header className="flex flex-col gap-unit border-b border-outline-variant pb-gutter">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-body text-label-caps text-tertiary">{frontmatter.version}</span>
            <span className="font-body text-label-caps text-on-surface-variant">{frontmatter.team}</span>
            <StatusBadge status={frontmatter.status} />
          </div>
          <h1 className="font-headline text-headline-lg-mobile text-on-background md:text-headline-lg">
            {frontmatter.title}
          </h1>
        </header>
        <ArticleBody html={html} />
      </article>
    </div>
  );
}
