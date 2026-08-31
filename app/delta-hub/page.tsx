import type { Metadata } from "next";
import { BentoCard } from "@/components/BentoGrid";

export const metadata: Metadata = {
  title: "Performance Delta Hub",
  description: "Comparative analysis matrix for chassis and aerodynamic stability.",
};

const radarAxes = [
  "HIGH-SPEED STABILITY",
  "TRACTION",
  "TYRE DEGRADATION",
  "LOW-SPEED ROTATION",
  "ENERGY HARVESTING",
  "AERO EFFICIENCY",
];

const metrics = [
  { label: "DELTA: SECTOR 1 AVG", value: "-0.145s", tone: "text-tertiary" },
  { label: "DELTA: SECTOR 2 AVG", value: "+0.082s", tone: "text-secondary" },
  { label: "DELTA: SECTOR 3 AVG", value: "-0.210s", tone: "text-tertiary" },
  { label: "OVERALL PACE ADV.", value: "-0.273s", tone: "text-tertiary font-bold" },
];

export default function DeltaHubPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-outline-variant pb-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-headline text-headline-lg-mobile text-on-surface md:text-headline-lg">
            Performance Delta
          </h1>
          <p className="mt-2 max-w-2xl font-body text-body-lg text-on-surface-variant">
            Comparative analysis matrix for chassis and aerodynamic stability.
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="rounded border border-tertiary px-3 py-1 font-body text-label-caps text-tertiary">
            BASELINE / TEAM ALPHA
          </span>
          <span className="rounded border border-secondary px-3 py-1 font-body text-label-caps text-secondary">
            CHALLENGER / TEAM BETA
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
        {/* Radar chart */}
        <BentoCard className="relative col-span-1 flex min-h-[420px] flex-col rounded-lg p-4 md:col-span-6">
          <span className="absolute left-4 top-4 z-10 font-body text-label-caps text-on-surface-variant">
            DYNAMIC STABILITY MATRIX
          </span>
          <div className="flex flex-1 items-center justify-center">
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full stroke-outline-variant opacity-40" fill="none" strokeWidth="0.5">
                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" />
                <polygon points="50,20 80,38 80,62 50,80 20,62 20,38" />
                <polygon points="50,30 70,45 70,55 50,70 30,55 30,45" />
                <line x1="50" y1="50" x2="50" y2="10" />
                <line x1="50" y1="50" x2="90" y2="30" />
                <line x1="50" y1="50" x2="90" y2="70" />
                <line x1="50" y1="50" x2="50" y2="90" />
                <line x1="50" y1="50" x2="10" y2="70" />
                <line x1="50" y1="50" x2="10" y2="30" />
              </svg>
              <svg viewBox="0 0 100 100" className="absolute inset-0 z-10 h-full w-full">
                <polygon fill="rgba(0,219,231,0.1)" stroke="#00dbe7" strokeWidth="1.5" points="50,20 85,35 75,65 50,75 25,60 15,35" />
              </svg>
              <svg viewBox="0 0 100 100" className="absolute inset-0 z-20 h-full w-full">
                <polygon fill="rgba(255,181,158,0.1)" stroke="#ffb59e" strokeWidth="1.5" points="50,35 70,25 85,60 50,85 15,65 30,30" />
              </svg>
              {radarAxes.map((label, i) => (
                <span
                  key={label}
                  className="absolute whitespace-nowrap font-body text-[10px] text-on-surface"
                  style={
                    [
                      { top: "-1.5rem", left: "50%", transform: "translateX(-50%)" },
                      { top: "25%", right: "-5.5rem" },
                      { bottom: "25%", right: "-4.5rem" },
                      { bottom: "-1.5rem", left: "50%", transform: "translateX(-50%)" },
                      { bottom: "25%", left: "-4.5rem" },
                      { top: "25%", left: "-5.5rem" },
                    ][i]
                  }
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Aero-load heatmap */}
        <BentoCard className="relative col-span-1 flex min-h-[420px] flex-col rounded-lg p-4 md:col-span-6">
          <span className="absolute left-4 top-4 z-10 font-body text-label-caps text-on-surface-variant">
            AERO-LOAD DISTRIBUTION HEATMAP
          </span>
          <div className="relative mt-8 flex flex-1 items-center justify-center overflow-hidden">
            <div
              className="h-48 w-full max-w-md opacity-80 mix-blend-screen blur-md"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,181,158,0) 0%, rgba(255,181,158,0.2) 20%, rgba(255,87,26,0.6) 50%, rgba(0,219,231,0.4) 80%, rgba(0,219,231,0) 100%)",
              }}
            />
            <div className="absolute left-1/4 top-10 rounded border border-outline-variant bg-surface-container-high/90 p-2 backdrop-blur-md">
              <div className="font-body text-[10px] text-tertiary">FRONT WING LIFT</div>
              <div className="font-body text-on-surface">-12.4% Δ</div>
            </div>
            <div className="absolute bottom-10 right-1/4 rounded border border-outline-variant bg-surface-container-high/90 p-2 backdrop-blur-md">
              <div className="font-body text-[10px] text-secondary">DIFFUSER STALL</div>
              <div className="font-body text-on-surface">+8.2% Δ</div>
            </div>
          </div>
        </BentoCard>

        {/* Key metrics strip */}
        <div className="col-span-1 grid grid-cols-2 gap-4 md:col-span-12 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded border border-outline-variant bg-surface-container p-4">
              <div className="mb-1 font-body text-[10px] text-on-surface-variant">{m.label}</div>
              <div className={`font-headline text-headline-md ${m.tone}`}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
