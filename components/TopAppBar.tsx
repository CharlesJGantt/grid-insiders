"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { primaryNav } from "@/lib/nav";
import { MobileNavDrawer } from "@/components/MobileNavDrawer";

export function TopAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 z-30 w-full border-b border-outline-variant bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-margin-mobile md:px-margin-desktop">
          <div className="flex min-w-0 items-center gap-6">
            <Link href="/" className="font-headline text-headline-md font-black tracking-tighter text-on-background">
              GRID INSIDERS
            </Link>
            <nav className="hidden lg:flex lg:flex-wrap lg:items-center lg:gap-1 xl:gap-2">
              {primaryNav.map((item) => {
                const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap rounded-xs px-2.5 py-2 font-body text-label-caps uppercase transition-all xl:px-3 ${
                      active
                        ? "border-b-2 border-secondary text-secondary"
                        : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/search"
              className="hidden items-center gap-2 font-body text-label-caps text-on-surface-variant transition-colors hover:text-on-surface lg:flex"
            >
              <Search size={16} />
              SEARCH
            </Link>
            <Link
              href="/race-weekend"
              className="hidden items-center gap-2 rounded-sm bg-surface-container-highest px-4 py-2 font-body text-label-caps text-on-surface transition-transform hover:bg-surface-container-high active:scale-95 sm:flex"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-container" />
              LIVE RACE STATUS
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              className="text-on-surface-variant transition-colors hover:text-on-surface lg:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <MobileNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
