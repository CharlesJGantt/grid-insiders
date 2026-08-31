import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Flag, MapPin, Trophy } from "lucide-react";
import { getAllRecaps, getRecapBySlug } from "@/lib/content";
import { ArticleBody } from "@/components/ArticleBody";
import { AdPlaceholder } from "@/components/AdPlaceholder";

export function generateStaticParams() {
  return getAllRecaps().map((entry) => ({ slug: entry.frontmatter.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getRecapBySlug(slug);
  if (!entry) return {};
  return { title: entry.frontmatter.title, description: entry.frontmatter.summary };
}

export default async function RecapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getRecapBySlug(slug);
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
          <span className="font-body text-label-caps text-tertiary">RACE RECAP / {frontmatter.session.toUpperCase()}</span>
          <h1 className="font-headline text-headline-lg-mobile text-on-background md:text-headline-lg">
            {frontmatter.title}
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded border border-outline-variant bg-outline-variant sm:grid-cols-3">
          <div className="flex items-center gap-3 bg-surface-container p-4">
            <Trophy size={18} className="text-secondary-container" />
            <div>
              <span className="block font-body text-status-code uppercase text-outline">Winner</span>
              <span className="font-body text-body-md font-bold text-on-surface">{frontmatter.winner}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-surface-container p-4">
            <MapPin size={18} className="text-tertiary" />
            <div>
              <span className="block font-body text-status-code uppercase text-outline">Track</span>
              <span className="font-body text-body-md font-bold text-on-surface">{frontmatter.track}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-surface-container p-4">
            <Flag size={18} className="text-on-surface-variant" />
            <div>
              <span className="block font-body text-status-code uppercase text-outline">Session</span>
              <span className="font-body text-body-md font-bold text-on-surface">{frontmatter.session}</span>
            </div>
          </div>
        </div>

        <ArticleBody html={html} />
        <AdPlaceholder className="mt-8" />
      </article>
    </div>
  );
}
