import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Share2, Zap } from "lucide-react";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { ArticleBody } from "@/components/ArticleBody";
import { AdPlaceholder } from "@/components/AdPlaceholder";

export function generateStaticParams() {
  return getAllArticles().map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getArticleBySlug(slug);
  if (!entry) return {};
  return { title: entry.frontmatter.title, description: entry.frontmatter.summary };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getArticleBySlug(slug);
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
          <span className="font-body text-label-caps text-tertiary">
            {(frontmatter.tags[0] ?? "TECHNICAL").toUpperCase()} / {(frontmatter.category ?? "ANALYSIS").toUpperCase()}
          </span>
          <h1 className="font-headline text-headline-lg-mobile text-on-background md:text-headline-lg">
            {frontmatter.title}
          </h1>
          <div className="mt-gutter flex flex-col justify-between gap-gutter md:flex-row md:items-end">
            <div className="flex items-center gap-unit">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-outline-variant">
                <Image src="/images/placeholders/avatar.svg" alt="" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-body text-label-caps text-on-background">
                  {(frontmatter.author ?? "GridInsiders Desk").toUpperCase()}
                </span>
                <span className="font-body text-body-md text-on-surface-variant">
                  {new Date(frontmatter.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <button className="bento-card flex w-fit items-center justify-center gap-2 rounded p-2 font-body text-label-caps text-on-surface-variant hover:text-on-background">
              <Share2 size={16} />
              SHARE
            </button>
          </div>
        </header>

        <ArticleBody html={html} />

        <div className="relative mt-12 flex flex-col items-center gap-gutter overflow-hidden border-l-4 border-l-secondary-container bg-surface-container-low p-gutter md:flex-row md:justify-between">
          <div className="flex flex-col">
            <h3 className="font-headline text-headline-md text-on-background">INDEPENDENT TECHNICAL ANALYSIS</h3>
            <p className="mt-2 max-w-md font-body text-body-md text-on-surface-variant">
              GridInsiders relies on reader support to fund in-depth telemetry breakdowns. Support data-driven journalism.
            </p>
          </div>
          <Link
            href="/support"
            className="btn-primary flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3 font-body text-label-caps md:w-auto"
          >
            <Zap size={16} />
            SUPPORT ANALYSIS
          </Link>
        </div>

        <AdPlaceholder className="mt-8" />
      </article>
    </div>
  );
}
