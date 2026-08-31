import Link from "next/link";
import { primaryNav, secondaryNav } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-outline-variant bg-surface-container-lowest">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-gutter px-margin-mobile py-margin-desktop md:grid-cols-4 md:px-margin-desktop">
        <div className="col-span-2 md:col-span-1">
          <span className="font-headline text-headline-md font-black tracking-tighter text-on-surface">
            GRID INSIDERS
          </span>
          <p className="mt-3 font-body text-body-md text-on-surface-variant">
            Independent technical analysis for the forensic F1 fan.
          </p>
        </div>

        <div>
          <span className="mb-3 block font-body text-label-caps text-outline">SECTIONS</span>
          <ul className="flex flex-col gap-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-body-md text-on-surface-variant transition-colors hover:text-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="mb-3 block font-body text-label-caps text-outline">SITE</span>
          <ul className="flex flex-col gap-2">
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-body-md text-on-surface-variant transition-colors hover:text-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-gutter border-t border-outline-variant px-margin-mobile py-6 md:flex-row md:px-margin-desktop">
        <span className="font-body text-label-caps font-bold text-on-surface">
          © 2026 GRID INSIDERS. INDEPENDENT TECHNICAL ANALYSIS.
        </span>
        <span className="font-body text-[10px] tracking-widest text-on-surface-variant/50">
          v2.4.1 // SYSTEM ONLINE
        </span>
      </div>
    </footer>
  );
}
