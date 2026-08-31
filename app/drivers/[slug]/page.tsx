import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import standings from "@/data/standings.json";
import { getEntriesByTag, slugifyTag } from "@/lib/content";

export function generateStaticParams() {
  return standings.drivers.map((d) => ({ slug: slugifyTag(d.name) }));
}

function findDriver(slug: string) {
  return standings.drivers.find((d) => slugifyTag(d.name) === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const driver = findDriver(slug);
  if (!driver) return {};
  return { title: driver.name, description: `GridInsiders coverage of ${driver.name} (${driver.team}).` };
}

export default async function DriverPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const driver = findDriver(slug);
  if (!driver) notFound();

  const entries = getEntriesByTag(driver.name);

  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-margin-desktop flex flex-col items-center gap-4 border-b border-outline-variant pb-6 sm:flex-row">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-outline-variant bg-surface-container-high">
          <Image src="/images/placeholders/avatar.svg" alt="" fill className="object-cover" />
        </div>
        <div>
          <span className="mb-1 block font-body text-label-caps text-tertiary">
            P{driver.position} · {driver.points} PTS
          </span>
          <h1 className="font-headline text-headline-lg-mobile text-on-surface md:text-headline-lg">{driver.name}</h1>
          <p className="mt-1 font-body text-body-md text-on-surface-variant">{driver.team}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {entries.length === 0 ? (
          <p className="font-body text-body-md text-on-surface-variant">No coverage tagged for this driver yet.</p>
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
