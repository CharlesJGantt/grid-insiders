import { Check, Coins } from "lucide-react";
import { Button } from "@/components/Button";

interface Tier {
  label: string;
  price: string;
  perks: string[];
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    label: "PRACTICE RUN",
    price: "$5",
    perks: ["Keep the servers online", "Supporter badge in comments"],
  },
  {
    label: "QUALIFYING PACE",
    price: "$15",
    perks: [
      "All Practice Run perks",
      "Access to raw telemetry datasets",
      "Monthly live Q&A sessions",
    ],
    highlighted: true,
  },
  {
    label: "RACE TRIM",
    price: "$50",
    perks: [
      "All Qualifying Pace perks",
      "Direct inbox access for analysis requests",
      "GridInsiders Official Merch Pack (Annual)",
    ],
  },
];

/** Compact version — used on Home and article footers. */
export function SupportModuleCompact({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bento-card flex flex-col items-center justify-center rounded-lg border-outline-variant bg-surface-container-high p-5 text-center ${className}`}
    >
      <Coins size={28} className="mb-2 text-secondary-container" />
      <h3 className="mb-2 font-headline text-headline-md text-lg font-bold text-on-surface">
        Independent Analysis
      </h3>
      <p className="mb-4 font-body text-body-md text-on-surface-variant">
        Support ad-free technical journalism.
      </p>
      <Button href="/support" variant="secondary" className="w-full">
        Support the Grid
      </Button>
    </div>
  );
}

/** Full three-tier pricing module — used on /support. Tiers link to # (no payment
 * processor is connected yet — wire this up to your provider of choice). */
export function SupportModuleFull() {
  return (
    <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.label}
          className={`relative flex h-full flex-col border p-6 ${
            tier.highlighted
              ? "border-secondary-container bg-surface-container-high"
              : "border-outline-variant bg-surface-container"
          }`}
        >
          <div className={`absolute inset-x-0 top-0 h-1 ${tier.highlighted ? "bg-secondary-container" : "bg-outline-variant"}`} />
          {tier.highlighted ? (
            <div className="absolute right-2 top-2 bg-secondary-container px-2 py-1 font-body text-[10px] font-bold tracking-widest text-background">
              OPTIMAL
            </div>
          ) : null}
          <span className={`mb-2 font-body text-label-caps ${tier.highlighted ? "text-secondary" : "text-on-surface-variant"}`}>
            {tier.label}
          </span>
          <h3 className="mb-4 font-headline text-headline-lg text-on-background">
            {tier.price}
            <span className="font-body text-body-md font-normal text-on-surface-variant">/mo</span>
          </h3>
          <ul className="mb-8 flex-grow space-y-2 font-body text-body-md text-on-surface-variant">
            {tier.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2">
                <Check size={18} className={tier.highlighted ? "text-secondary-container" : "text-tertiary"} />
                {perk}
              </li>
            ))}
          </ul>
          <Button href="#" variant={tier.highlighted ? "primary" : "secondary"} className="w-full">
            Select Tier
          </Button>
        </div>
      ))}
    </div>
  );
}
