import Link from "next/link";
import standings from "@/data/standings.json";
import { BentoCard } from "@/components/BentoGrid";
import { slugifyTag } from "@/lib/content";

export function StandingsWidget({ className = "" }: { className?: string }) {
  const top3 = standings.drivers.slice(0, 3);

  return (
    <BentoCard className={`flex flex-col justify-center p-4 ${className}`}>
      <span className="mb-3 block font-body text-label-caps text-on-surface-variant">CHAMPIONSHIP TOP 3</span>
      <div className="flex flex-col gap-2">
        {top3.map((driver) => (
          <Link
            key={driver.code}
            href={`/drivers/${slugifyTag(driver.name)}`}
            className="glass-panel flex items-center justify-between rounded px-3 py-2 transition-colors hover:bg-surface-container-high"
          >
            <div className="flex items-center gap-3">
              <span className={`font-body text-label-caps ${driver.position === 1 ? "text-tertiary" : "text-outline"}`}>
                {String(driver.position).padStart(2, "0")}
              </span>
              <span className="font-body text-body-md font-bold text-on-surface">{driver.code}</span>
            </div>
            <span className="font-body text-label-caps text-on-surface-variant">{driver.points} PTS</span>
          </Link>
        ))}
      </div>
    </BentoCard>
  );
}
