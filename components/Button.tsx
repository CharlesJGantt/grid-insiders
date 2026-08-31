import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type Variant = "primary" | "secondary";

type ButtonProps = {
  variant?: Variant;
  href?: string;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

const base =
  "font-body text-label-caps uppercase inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm transition-transform active:scale-95";

export function Button({ variant = "primary", href, className = "", children, ...rest }: ButtonProps) {
  const classes = `${base} ${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`;

  if (href) {
    const Comp = Link as ElementType;
    return (
      <Comp href={href} className={classes} {...rest}>
        {children}
      </Comp>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
