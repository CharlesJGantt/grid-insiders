import type { Metadata } from "next";
import { ListOrdered, TrendingDown, TrendingUp, Minus } from "lucide-react";
import raceWeekend from "@/data/race-weekend.json";
import { NextSessionCountdown } from "@/components/NextSessionCountdown";
import { BentoCard } from "@/components/BentoGrid";

export const metadata: Metadata = {
  title: "Race Weekend",
  description: "Live session classification, weekend schedule, and gap-to-leader telemetry.",
};

const trendIcon = { up: TrendingUp, down: TrendingDown, steady: Minus } as const;

export default function RaceWeekendPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-margin-desktop border-b border-outline-variant pb-6">
        <span className="mb-2 block font-body text-label-caps uppercase tracking-widest text-tertiary">
          Race Operations
        </span>
        <h1 className="font-headline text-headline-lg-mobile text-on-surface md:text-headline-lg">
          {raceWeekend.event}
        </h1>
        <p className="mt-2 font-body text-body-lg text-on-surface-variant">
          Round {raceWeekend.round} · {raceWeekend.track}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
        {/* Classification */}
        <BentoCard className="flex flex-col overflow-hidden rounded-lg md:col-span-8">
          <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-high p-4">
            <h2 className="flex items-center gap-2 font-body text-label-caps text-on-background">
              <ListOrdered size={16} className="text-tertiary" />
              GAP TO LEADER
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-left font-body text-body-md">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low font-body text-[10px] uppercase tracking-wider text-on-surface-variant">
                  <th className="w-12 p-3 text-center">POS</th>
                  <th className="p-3">DRIVER</th>
                  <th className="p-3 text-right">GAP</th>
                  <th className="p-3 text-center">TYRE</th>
                  <th className="p-3 text-center">TREND</th>
                </tr>
              </thead>
              <tbody className="text-on-background">
                {raceWeekend.classification.map((row) => {
                  const Trend = trendIcon[row.trend as keyof typeof trendIcon];
                  return (
                    <tr key={row.position} className="border-b border-outline-variant/50 transition-colors hover:bg-surface-container-high">
                      <td className="p-3 text-center font-bold">{row.position}</td>
                      <td className="p-3 font-bold text-on-background">{row.code}</td>
                      <td className="p-3 text-right text-tertiary">{row.gapToLeader}</td>
                      <td className="p-3 text-center text-on-surface-variant">{row.tyre}</td>
                      <td className="p-3 text-center">
                        <Trend size={16} className="mx-auto text-on-surface-variant" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </BentoCard>

        <div className="flex flex-col gap-gutter md:col-span-4">
          <NextSessionCountdown />
          <BentoCard className="flex flex-col rounded-lg p-4">
            <span className="mb-3 font-body text-label-caps text-on-surface-variant">WEEKEND SCHEDULE</span>
            <ul className="flex flex-col gap-2">
              {raceWeekend.sessions.map((session) => (
                <li key={session.name} className="flex items-center justify-between border-b border-outline-variant/50 py-2 last:border-0">
                  <span className="font-body text-body-md text-on-surface">{session.name}</span>
                  <span className="font-body text-label-caps text-on-surface-variant">
                    {new Date(session.start).toLocaleString("en-GB", {
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC",
                    })}{" "}
                    UTC
                  </span>
                </li>
              ))}
            </ul>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
