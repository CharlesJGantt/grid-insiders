import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllArticles } from "@/lib/content";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { LiveIntelWidget } from "@/components/LiveIntelWidget";
import { StandingsWidget } from "@/components/StandingsWidget";
import { NextSessionCountdown } from "@/components/NextSessionCountdown";
import { SupportModuleCompact } from "@/components/SupportModule";
import { AdPlaceholder } from "@/components/AdPlaceholder";

export default function HomePage() {
  const articles = getAllArticles();
  const [hero, ...rest] = articles;
  const secondary = rest.slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <BentoGrid>
        {/* Hero */}
        <BentoCard accent className="group relative col-span-1 flex flex-col justify-end md:col-span-8 md:row-span-3">
          <Image
            src={hero.frontmatter.cover}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-background/20" />
          <div className="relative z-10 w-full p-6 md:w-3/4 md:p-8">
            <span className="mb-4 block font-body text-label-caps uppercase tracking-widest text-tertiary">
              {hero.frontmatter.category === "Analysis" ? "Analysis" : "Breaking News"}
            </span>
            <h1 className="mb-4 font-headline text-headline-lg-mobile text-on-background md:text-headline-lg">
              {hero.frontmatter.title}
            </h1>
            <p className="mb-6 font-body text-body-lg text-on-surface-variant">{hero.frontmatter.summary}</p>
            <Link href={`/articles/${hero.frontmatter.slug}`} className="btn-primary flex w-fit items-center gap-2 rounded-sm px-6 py-3 font-body text-label-caps uppercase">
              Read Briefing
              <ArrowRight size={16} />
            </Link>
          </div>
        </BentoCard>

        <LiveIntelWidget className="col-span-1 md:col-span-4 md:row-span-2" />
        <StandingsWidget className="col-span-1 md:col-span-4 md:row-span-1" />

        {secondary.map((entry) => (
          <BentoCard key={entry.frontmatter.slug} as="a" href={`/articles/${entry.frontmatter.slug}`} className="col-span-1 flex flex-col justify-between p-5 md:col-span-4 md:row-span-1">
            <span className="mb-4 font-body text-label-caps uppercase text-outline">
              {entry.frontmatter.tags[0] ?? "Technical"}
            </span>
            <div>
              <h3 className="mb-2 font-headline text-headline-md text-lg font-bold text-on-surface">
                {entry.frontmatter.title}
              </h3>
              <p className="line-clamp-2 font-body text-body-md text-on-surface-variant">{entry.frontmatter.summary}</p>
            </div>
          </BentoCard>
        ))}

        <NextSessionCountdown className="col-span-1 md:col-span-4 md:row-span-1" />
        <SupportModuleCompact className="col-span-1 md:col-span-4 md:row-span-1" />

        <AdPlaceholder className="col-span-1 md:col-span-12" />
      </BentoGrid>
    </div>
  );
}
