import type { Metadata } from "next";
import Link from "next/link";
import standings from "@/data/standings.json";
import { BentoCard } from "@/components/BentoGrid";
import { slugifyTag } from "@/lib/content";

export const metadata: Metadata = {
  title: "Standings",
  description: "Drivers' and constructors' championship standings.",
};

export default function StandingsPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-margin-desktop border-b border-outline-variant pb-6">
        <span className="mb-2 block font-body text-label-caps uppercase tracking-widest text-tertiary">
          Season {standings.season}
        </span>
        <h1 className="font-headline text-headline-lg-mobile text-on-surface md:text-headline-lg">Standings</h1>
        <p className="mt-2 font-body text-body-md text-on-surface-variant">Updated {standings.updated}</p>
      </div>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
        <BentoCard className="flex flex-col overflow-hidden rounded-lg">
          <div className="border-b border-outline-variant bg-surface-container-high p-4">
            <h2 className="font-body text-label-caps text-on-background">DRIVERS</h2>
          </div>
          <table className="w-full text-left font-body text-body-md">
            <tbody>
              {standings.drivers.map((d) => (
                <tr key={d.code} className="border-b border-outline-variant/50 transition-colors hover:bg-surface-container-high">
                  <td className="p-3 text-center font-bold text-outline">{d.position}</td>
                  <td className="p-3">
                    <Link href={`/drivers/${slugifyTag(d.name)}`} className="font-bold text-on-surface hover:text-tertiary">
                      {d.name}
                    </Link>
                    <span className="ml-2 text-on-surface-variant">{d.team}</span>
                  </td>
                  <td className="p-3 text-right font-bold text-secondary">{d.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </BentoCard>

        <BentoCard className="flex flex-col overflow-hidden rounded-lg">
          <div className="border-b border-outline-variant bg-surface-container-high p-4">
            <h2 className="font-body text-label-caps text-on-background">CONSTRUCTORS</h2>
          </div>
          <table className="w-full text-left font-body text-body-md">
            <tbody>
              {standings.constructors.map((c) => (
                <tr key={c.team} className="border-b border-outline-variant/50 transition-colors hover:bg-surface-container-high">
                  <td className="p-3 text-center font-bold text-outline">{c.position}</td>
                  <td className="p-3">
                    <Link href={`/teams/${slugifyTag(c.team)}`} className="font-bold text-on-surface hover:text-tertiary">
                      {c.team}
                    </Link>
                  </td>
                  <td className="p-3 text-right font-bold text-secondary">{c.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </BentoCard>
      </div>
    </div>
  );
}
