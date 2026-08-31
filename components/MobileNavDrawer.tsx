"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AtSign, Camera, ChevronRight, Play, X, Zap, Radio } from "lucide-react";
import { primaryNav } from "@/lib/nav";
import { Button } from "@/components/Button";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-surface-container-low shadow-2xl transition-transform duration-200 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-margin-mobile py-4">
          <span className="font-headline text-headline-md font-black tracking-tighter text-on-surface">
            GRID INSIDERS
          </span>
          <button aria-label="Close menu" onClick={onClose} className="text-on-surface-variant transition-colors hover:text-secondary">
            <X size={22} />
          </button>
        </div>

        {/* Live status */}
        <Link
          href="/race-weekend"
          onClick={onClose}
          className="group flex items-center justify-between border-b border-outline-variant bg-surface-container-highest px-margin-mobile py-4 transition-colors hover:bg-surface-bright"
        >
          <span className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-error" />
            <span className="font-body text-label-caps text-error">LIVE RACE STATUS</span>
          </span>
          <Radio size={16} className="text-on-surface-variant transition-colors group-hover:text-error" />
        </Link>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col">
            {primaryNav.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between border-l-4 px-margin-mobile py-4 transition-colors ${
                      active
                        ? "border-secondary bg-surface-container-high"
                        : "border-transparent hover:bg-surface-container-high"
                    }`}
                  >
                    <span
                      className={`font-headline text-headline-md tracking-tight transition-colors ${
                        active ? "text-secondary" : "text-on-surface-variant group-hover:text-on-surface"
                      }`}
                    >
                      {item.label.toUpperCase()}
                    </span>
                    <ChevronRight
                      size={18}
                      className={active ? "text-secondary" : "text-on-surface-variant/50 group-hover:text-secondary"}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer / CTA */}
        <div className="mt-auto border-t border-outline-variant bg-surface-container-low p-margin-mobile">
          <div className="mb-6 flex gap-4">
            {[AtSign, Camera, Play].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center border border-outline-variant bg-surface-container transition-all hover:border-secondary hover:text-secondary"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <Button href="/support" variant="primary" className="w-full" onClick={onClose}>
            Support the Grid
            <Zap size={16} />
          </Button>
          <div className="mt-4 text-center">
            <span className="font-body text-[10px] tracking-widest text-on-surface-variant/50">
              v2.4.1 // SYSTEM ONLINE
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
