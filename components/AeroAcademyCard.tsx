import Image from "next/image";
import Link from "next/link";
import type { AeroAcademyFrontmatter } from "@/lib/content";

/**
 * "Aero Academy Modules" component per DESIGN.md: a technical reference image on the
 * left and JetBrains Mono description on the right, with a "Protocol Disclosure" footer.
 */
export function AeroAcademyCard({ frontmatter }: { frontmatter: AeroAcademyFrontmatter }) {
  return (
    <Link
      href={`/aero-academy/${frontmatter.slug}`}
      className="bento-card group flex flex-col overflow-hidden rounded-lg sm:flex-row"
    >
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-surface-container-high sm:aspect-square sm:w-48">
        <Image
          src={frontmatter.cover}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 w-fit rounded-sm border border-tertiary/30 bg-tertiary/10 px-2 py-1 font-body text-label-caps text-tertiary">
          {frontmatter.module.toUpperCase()}
        </span>
        <h3 className="mb-2 font-headline text-headline-md text-lg font-bold text-on-surface">{frontmatter.title}</h3>
        <p className="font-body text-body-md text-on-surface-variant">{frontmatter.summary}</p>
        <span className="mt-auto pt-4 font-body text-status-code uppercase tracking-widest text-outline">
          Protocol Disclosure: Editorial analysis, not official team data.
        </span>
      </div>
    </Link>
  );
}
