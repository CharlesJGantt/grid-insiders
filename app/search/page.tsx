import type { Metadata } from "next";
import { getSearchIndex } from "@/lib/content";
import { SearchClient } from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "Search & Archive",
  description: "Search the full GridInsiders technical archive by keyword, driver, team, or topic.",
};

export default function SearchPage() {
  const index = getSearchIndex();
  const allTags = Array.from(new Set(index.flatMap((item) => item.tags))).sort();

  return (
    <div className="mx-auto w-full max-w-[1600px] p-margin-mobile md:p-margin-desktop">
      <div className="mb-margin-desktop border-b border-outline-variant pb-6">
        <span className="mb-2 block font-body text-label-caps uppercase tracking-widest text-tertiary">
          Technical Archive
        </span>
        <h1 className="font-headline text-headline-lg-mobile text-on-surface md:text-headline-lg">
          Search &amp; Archive
        </h1>
      </div>
      <SearchClient index={index} allTags={allTags} />
    </div>
  );
}
