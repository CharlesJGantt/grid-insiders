import type { Metadata } from "next";
import { SupportModuleFull } from "@/components/SupportModule";

export const metadata: Metadata = {
  title: "Support the Grid",
  description: "Support independent, ad-light Formula 1 technical journalism.",
};

export default function SupportPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-margin-desktop border-b border-outline-variant pb-6 text-center md:text-left">
        <span className="mb-2 block font-body text-label-caps uppercase tracking-widest text-tertiary">
          Independent Analysis
        </span>
        <h1 className="font-headline text-headline-lg-mobile text-on-surface md:text-headline-lg">
          Support the Grid
        </h1>
        <p className="mx-auto mt-2 max-w-2xl font-body text-body-lg text-on-surface-variant md:mx-0">
          GridInsiders runs on reader support, not chasing pageviews. Pick a tier that fits — every one keeps the
          forensic analysis ad-light and independent.
        </p>
      </div>
      <SupportModuleFull />
      <p className="mt-8 max-w-2xl font-body text-body-md text-outline">
        Payment processing isn't connected yet in this build — wire the "Select Tier" buttons up to your provider of
        choice (Stripe, Patreon, Ko-fi, etc.) when you're ready to go live.
      </p>
    </div>
  );
}
