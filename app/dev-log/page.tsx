import type { Metadata } from "next";
import { Rows3 } from "lucide-react";
import { getAllDevLog } from "@/lib/content";
import { BentoCard } from "@/components/BentoGrid";
import { DevLogEntry } from "@/components/DevLogEntry";

export const metadata: Metadata = {
  title: "Dev Log",
  description: "Season Development Log — tracking real F1 car upgrades through the season, version by version.",
};

export default function DevLogPage() {
  const entries = getAllDevLog();

  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-margin-desktop border-b border-outline-variant pb-6">
        <span className="mb-2 block font-body text-label-caps uppercase tracking-widest text-tertiary">
          Audit Trail
        </span>
        <h1 className="font-headline text-headline-lg-mobile text-on-surface md:text-headline-lg">Dev Log</h1>
        <p className="mt-2 max-w-2xl font-body text-body-lg text-on-surface-variant">
          GridInsiders' running editorial log of real car upgrades through the season — version-coded, status-tracked.
        </p>
      </div>

      <BentoCard className="flex flex-col overflow-hidden rounded-lg">
        <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-high p-4">
          <h2 className="flex items-center gap-2 font-body text-label-caps text-on-background">
            <Rows3 size={16} className="text-tertiary" />
            IMPLEMENTATION TIMELINE
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-body-md">
            <thead>
              <tr className="border-b border-outline-variant font-body text-label-caps text-on-surface-variant">
                <th className="py-2 pr-4 font-normal">CYCLE CODE</th>
                <th className="py-2 pr-4 font-normal">TEAM</th>
                <th className="w-1/2 py-2 pr-4 font-normal">IMPACT SUMMARY</th>
                <th className="py-2 text-right font-normal">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <DevLogEntry key={entry.frontmatter.slug} frontmatter={entry.frontmatter} />
              ))}
            </tbody>
          </table>
        </div>
      </BentoCard>
    </div>
  );
}
