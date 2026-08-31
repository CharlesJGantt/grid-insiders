import type { Metadata } from "next";
import { getAllAeroAcademy } from "@/lib/content";
import { AeroAcademyCard } from "@/components/AeroAcademyCard";

export const metadata: Metadata = {
  title: "Aero Academy",
  description:
    "Technical knowledge base detailing core aerodynamic principles, downforce generation mechanics, and fluid dynamics.",
};

export default function AeroAcademyIndexPage() {
  const modules = getAllAeroAcademy();

  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-margin-desktop border-b border-outline-variant pb-6">
        <span className="mb-2 block font-body text-label-caps uppercase tracking-widest text-tertiary">
          Knowledge Hub
        </span>
        <h1 className="font-headline text-headline-display text-on-surface">Aero Academy</h1>
        <p className="mt-2 max-w-3xl font-body text-body-lg text-on-surface-variant">
          Technical knowledge base detailing core aerodynamic principles, downforce generation mechanics, and fluid
          dynamics relevant to high-performance track vehicles.
        </p>
      </div>
      <div className="flex flex-col gap-gutter">
        {modules.map((entry) => (
          <AeroAcademyCard key={entry.frontmatter.slug} frontmatter={entry.frontmatter} />
        ))}
      </div>
    </div>
  );
}
