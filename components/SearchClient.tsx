"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, Search, X } from "lucide-react";
import type { SearchIndexItem } from "@/lib/content";

const typeLabel: Record<SearchIndexItem["type"], string> = {
  articles: "NEWS",
  recaps: "RACE RECAP",
  "aero-academy": "AERO ACADEMY",
  "dev-log": "DEV LOG",
};

export function SearchClient({ index, allTags }: { index: SearchIndexItem[]; allTags: string[] }) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return index.filter((item) => {
      const matchesQuery =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      const matchesTags = activeTags.length === 0 || activeTags.every((t) => item.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [index, query, activeTags]);

  return (
    <div className="flex flex-col gap-gutter md:flex-row">
      {/* Sidebar filters */}
      <aside className="flex w-full shrink-0 flex-col gap-6 md:w-64">
        <div className="bento-card flex flex-col gap-3 rounded-lg p-4">
          <h3 className="flex items-center gap-2 font-body text-label-caps uppercase text-on-surface-variant">
            <Filter size={16} />
            ACTIVE FILTERS
          </h3>
          {activeTags.length === 0 ? (
            <span className="font-body text-body-md text-outline">None — showing everything.</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {activeTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 border border-outline-variant bg-surface-container-highest px-2 py-1 text-[10px] text-tertiary-fixed"
                >
                  {tag.toUpperCase()}
                  <button onClick={() => toggleTag(tag)} aria-label={`Remove ${tag} filter`} className="transition-colors hover:text-error">
                    <X size={12} />
                  </button>
                </span>
              ))}
              <button
                onClick={() => setActiveTags([])}
                className="text-left text-[10px] text-on-surface-variant underline decoration-outline-variant hover:text-on-surface"
              >
                CLEAR ALL
              </button>
            </div>
          )}
        </div>

        <div className="bento-card flex flex-col gap-3 rounded-lg p-4">
          <h3 className="border-b border-outline-variant pb-2 font-body text-label-caps uppercase text-on-surface">
            TOPICS
          </h3>
          {allTags.map((tag) => (
            <label key={tag} className="group flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={activeTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="accent-secondary-container"
              />
              <span className="font-body text-body-md text-on-surface-variant transition-colors group-hover:text-on-surface">
                {tag.toUpperCase()}
              </span>
            </label>
          ))}
        </div>
      </aside>

      {/* Results */}
      <section className="flex flex-grow flex-col gap-6">
        <div className="flex flex-col gap-4 border-b border-outline-variant pb-6">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH ARCHIVE..."
              className="w-full border border-outline-variant bg-transparent px-3 py-2 font-body text-label-caps text-on-surface transition-colors focus:border-secondary-container focus:outline-none"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          </div>
          <span className="font-body text-label-caps text-on-surface-variant">
            {results.length} {results.length === 1 ? "FILE" : "FILES"} RETRIEVED
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {results.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="bento-card flex flex-col gap-1 rounded-lg p-4 transition-colors hover:border-tertiary"
            >
              <span className="font-body text-status-code uppercase tracking-widest text-tertiary">
                {typeLabel[item.type]}
              </span>
              <h3 className="font-headline text-headline-md text-base font-bold text-on-surface">{item.title}</h3>
              <p className="font-body text-body-md text-on-surface-variant">{item.summary}</p>
            </Link>
          ))}
          {results.length === 0 ? (
            <p className="font-body text-body-md text-on-surface-variant">No matches. Try a different query or filter.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
