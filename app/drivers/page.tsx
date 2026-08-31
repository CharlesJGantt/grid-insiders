import type { Metadata } from "next";
import standings from "@/data/standings.json";
import { DriverCard } from "@/components/DriverCard";

export const metadata: Metadata = {
  title: "Drivers",
  description: "Browse GridInsiders coverage by driver.",
};

export default function DriversIndexPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-margin-desktop border-b border-outline-variant pb-6">
        <span className="mb-2 block font-body text-label-caps uppercase tracking-widest text-tertiary">
          Season {standings.season}
        </span>
        <h1 className="font-headline text-headline-lg-mobile text-on-surface md:text-headline-lg">Drivers</h1>
        <p className="mt-2 max-w-2xl font-body text-body-lg text-on-surface-variant">
          Every driver on the current grid, with links to every article, recap, and dev log entry that mentions them.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {standings.drivers.map((driver) => (
          <DriverCard key={driver.code} {...driver} />
        ))}
      </div>
    </div>
  );
}
