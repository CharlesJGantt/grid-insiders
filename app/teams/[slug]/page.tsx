import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import standings from "@/data/standings.json";
import { getEntriesByTag, slugifyTag } from "@/lib/content";

export function generateStaticParams() {
  return standings.constructors.map((c) => ({ slug: slugifyTag(c.team) }));
}

function findTeam(slug: string) {
  return standings.constructors.find((c) => slugifyTag(c.team) === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const team = findTeam(slug);
  if (!team) return {};
  return { title: team.team, description: `GridInsiders coverage of ${team.team}.` };
}

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = findTeam(slug);
  if (!team) notFound();

  const entries = getEntriesByTag(team.team);

  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-margin-desktop flex flex-col items-center gap-4 border-b border-outline-variant pb-6 sm:flex-row">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-outline-variant bg-surface-container-high">
          <Image src="/images/placeholders/team-badge.svg" alt="" fill className="object-cover" />
        </div>
        <div>
          <span className="mb-1 block font-body text-label-caps text-tertiary">
            P{team.position} · {team.points} PTS
          </span>
          <h1 className="font-headline text-headline-lg-mobile text-on-surface md:text-headline-lg">{team.team}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {entries.length === 0 ? (
          <p className="font-body text-body-md text-on-surface-variant">No coverage tagged for this team yet.</p>
        ) : (
          entries.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="bento-card flex flex-col gap-1 rounded-lg p-4 transition-colors hover:border-tertiary"
            >
              <h3 className="font-headline text-headline-md text-base font-bold text-on-surface">{item.title}</h3>
              <p className="font-body text-body-md text-on-surface-variant">{item.summary}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
