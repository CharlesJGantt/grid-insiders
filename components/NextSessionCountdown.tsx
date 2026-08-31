"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import raceWeekend from "@/data/race-weekend.json";
import { BentoCard } from "@/components/BentoGrid";

function getRemaining(targetIso: string) {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export function NextSessionCountdown({ className = "" }: { className?: string }) {
  const target = raceWeekend.nextSession.start;
  // Starts null so the static-export HTML (rendered at build time) never bakes in a
  // stale countdown — the real value is computed once mounted in the browser.
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining>>(null);

  useEffect(() => {
    setRemaining(getRemaining(target));
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <BentoCard className={`flex flex-col justify-center p-4 ${className}`}>
      <span className="mb-3 flex items-center gap-2 font-body text-label-caps text-on-surface-variant">
        <Timer size={14} className="text-tertiary" />
        NEXT SESSION — {raceWeekend.event.toUpperCase()}
      </span>
      <span className="mb-3 block font-body text-body-md text-on-surface-variant">
        {raceWeekend.nextSession.name} · {raceWeekend.track}
      </span>
      {remaining ? (
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: "D", value: remaining.days },
            { label: "H", value: remaining.hours },
            { label: "M", value: remaining.minutes },
            { label: "S", value: remaining.seconds },
          ].map((unit) => (
            <div key={unit.label} className="glass-panel rounded py-2">
              <span className="block font-body text-headline-md text-lg font-bold text-on-surface tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="block font-body text-[10px] uppercase tracking-widest text-outline">{unit.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <span className="font-body text-label-caps text-secondary">SESSION LIVE</span>
      )}
    </BentoCard>
  );
}
