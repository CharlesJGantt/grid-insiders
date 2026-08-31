import type { Metadata } from "next";
import { Activity, Cookie, Download, Gavel, Network, Trash2 } from "lucide-react";
import { BentoCard } from "@/components/BentoGrid";

export const metadata: Metadata = {
  title: "Data Disclosure & Privacy",
  description: "GridInsiders' data disclosure protocol — what this site actually collects, and your rights over it.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-margin-desktop border-b border-outline-variant pb-6">
        <h1 className="font-headline text-headline-lg-mobile text-on-background md:text-headline-lg">
          DATA DISCLOSURE PROTOCOL
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-4 font-body text-label-caps text-outline">
          <span>LAST COMPILED: 2026-08-31</span>
          <span>STATUS: ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
        <BentoCard className="col-span-1 rounded-lg p-6 md:col-span-12">
          <div className="mb-4 inline-block border-b border-outline-variant pb-2 font-body text-label-caps text-tertiary">
            SYSTEM CONTEXT
          </div>
          <p className="max-w-4xl font-body text-body-md text-on-surface-variant">
            GridInsiders is a static, statically-hosted publication — this build currently has no user accounts, no
            server-side database, and no payment processor connected. This page describes exactly what the site
            collects today, and will be updated the moment that changes (e.g. if analytics or an ad network are added).
          </p>
        </BentoCard>

        <BentoCard className="col-span-1 flex flex-col gap-4 rounded-lg p-6 md:col-span-8">
          <div className="mb-2 flex items-center justify-between border-b border-outline-variant pb-2">
            <h2 className="font-body text-label-caps tracking-widest text-on-background">DATA COLLECTED TODAY</h2>
            <Activity size={18} className="text-secondary" />
          </div>
          <div className="grid flex-grow grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-sm border border-surface-variant bg-surface-container-low p-4">
              <h3 className="mb-2 font-body text-label-caps text-tertiary">ON THIS SITE</h3>
              <ul className="space-y-2 font-body text-body-md text-on-surface-variant">
                <li>No accounts, forms, or logins exist yet.</li>
                <li>No cookies are set beyond your browser's own local storage.</li>
              </ul>
            </div>
            <div className="rounded-sm border border-surface-variant bg-surface-container-low p-4">
              <h3 className="mb-2 font-body text-label-caps text-tertiary">STORED IN YOUR BROWSER</h3>
              <ul className="space-y-2 font-body text-body-md text-on-surface-variant">
                <li>Whether you've dismissed the cookie/consent banner.</li>
                <li>Never leaves your device — GridInsiders never receives it.</li>
              </ul>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="col-span-1 flex flex-col rounded-lg p-6 md:col-span-4">
          <div className="mb-4 flex items-center justify-between border-b border-outline-variant pb-2">
            <h2 className="font-body text-label-caps tracking-widest text-on-background">COOKIE PROTOCOL</h2>
            <Cookie size={18} className="text-secondary" />
          </div>
          <div className="flex-grow space-y-4">
            <p className="font-body text-body-md text-on-surface-variant">
              The only client-side storage GridInsiders uses today:
            </p>
            <div className="border-l-2 border-tertiary pl-3">
              <span className="mb-1 block font-body text-label-caps text-on-surface">gi-consent-ack</span>
              <span className="font-body text-xs text-outline">
                Remembers that you dismissed the consent banner. Not required, not a tracker, and not sent to a
                server.
              </span>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="col-span-1 rounded-lg p-6 md:col-span-6">
          <div className="mb-4 flex items-center justify-between border-b border-outline-variant pb-2">
            <h2 className="font-body text-label-caps tracking-widest text-on-background">EXTERNAL INTERFACES</h2>
            <Network size={18} className="text-secondary" />
          </div>
          <p className="mb-4 font-body text-body-md text-on-surface-variant">
            No third-party analytics, advertising, or payment processors are connected to this build. Any future
            integration (e.g. an analytics tool or a donation processor for Support the Grid) will be listed here
            before it goes live.
          </p>
        </BentoCard>

        <BentoCard className="col-span-1 rounded-lg p-6 md:col-span-6">
          <div className="mb-4 flex items-center justify-between border-b border-outline-variant pb-2">
            <h2 className="font-body text-label-caps tracking-widest text-on-background">USER AUTHORITY</h2>
            <Gavel size={18} className="text-secondary" />
          </div>
          <p className="mb-6 font-body text-body-md text-on-surface-variant">
            Since no personal data is collected or stored server-side today, there is nothing to export or delete —
            once accounts or analytics exist, this section will describe how to exercise your access and deletion
            rights.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="group cursor-not-allowed border border-surface-variant p-3 opacity-60">
              <Download size={18} className="mb-2 block text-outline" />
              <h4 className="font-body text-label-caps text-on-surface">DATA EXTRACTION</h4>
              <p className="mt-1 font-body text-xs text-outline">Not applicable — no account data exists.</p>
            </div>
            <div className="group cursor-not-allowed border border-surface-variant p-3 opacity-60">
              <Trash2 size={18} className="mb-2 block text-outline" />
              <h4 className="font-body text-label-caps text-on-surface">DATA DELETION</h4>
              <p className="mt-1 font-body text-xs text-outline">Not applicable — no account data exists.</p>
            </div>
          </div>
        </BentoCard>
      </div>
    </div>
  );
}
