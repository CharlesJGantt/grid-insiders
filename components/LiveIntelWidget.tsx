import { Radio } from "lucide-react";
import liveIntel from "@/data/live-intel.json";
import { BentoCard } from "@/components/BentoGrid";

export function LiveIntelWidget({ className = "" }: { className?: string }) {
  return (
    <BentoCard className={`flex flex-col p-4 ${className}`}>
      <div className="mb-4 flex items-center justify-between border-b border-outline-variant pb-2">
        <span className="flex items-center gap-2 font-body text-label-caps text-on-surface-variant">
          <Radio size={14} className="text-secondary-container" />
          LIVE INTELLIGENCE
        </span>
        <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-container" />
      </div>
      <div className="flex flex-grow flex-col gap-3 overflow-y-auto pr-2">
        {liveIntel.items.map((item, i) => (
          <div
            key={i}
            className={`glass-panel flex flex-col gap-1 rounded p-3 ${
              item.highlight ? "border-l-2 border-l-tertiary" : ""
            }`}
          >
            <span className="font-body text-[10px] text-outline">{item.timestamp}</span>
            <p className={`font-body text-sm ${item.highlight ? "text-on-surface" : "text-on-surface-variant"}`}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
