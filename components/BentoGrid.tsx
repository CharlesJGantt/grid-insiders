import type { ReactNode } from "react";
import Link from "next/link";

export function BentoGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-gutter md:grid-cols-12">{children}</div>
  );
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  accent?: boolean;
  as?: "div" | "a";
  href?: string;
}

export function BentoCard({ children, className = "", accent = false, as = "div", href }: BentoCardProps) {
  const classes = `bento-card rounded-lg ${accent ? "accent" : ""} ${className}`;

  if (as === "a" && href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
