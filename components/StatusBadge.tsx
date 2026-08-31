import type { DevLogStatus } from "@/lib/content";

const statusStyles: Record<DevLogStatus, string> = {
  nominal: "bg-tertiary-container text-tertiary border-tertiary/40",
  stress: "bg-secondary-container/10 text-secondary-container border-secondary-container/40",
  evaluated: "bg-primary-container text-primary border-primary/40",
  superseded: "bg-surface-container-high text-outline border-outline-variant",
};

const statusLabel: Record<DevLogStatus, string> = {
  nominal: "NOMINAL",
  stress: "STRESS_WARN",
  evaluated: "EVALUATED",
  superseded: "SUPERSEDED",
};

export function StatusBadge({ status }: { status: DevLogStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-xs border px-2 py-0.5 font-body text-status-code uppercase tracking-wide ${statusStyles[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}
