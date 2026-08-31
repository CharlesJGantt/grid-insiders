export interface NavItem {
  label: string;
  href: string;
}

/** Primary top-level navigation — see the "Nav / IA mapping" section of the build plan. */
export const primaryNav: NavItem[] = [
  { label: "News", href: "/articles" },
  { label: "Race Recaps", href: "/recaps" },
  { label: "Race Weekend", href: "/race-weekend" },
  { label: "Standings", href: "/standings" },
  { label: "Technical", href: "/delta-hub" },
  { label: "Aero Academy", href: "/aero-academy" },
  { label: "Dev Log", href: "/dev-log" },
  { label: "Drivers", href: "/drivers" },
  { label: "Teams", href: "/teams" },
];

/** Secondary / footer navigation (PRD explicit). */
export const secondaryNav: NavItem[] = [
  { label: "Search & Archive", href: "/search" },
  { label: "Support the Grid", href: "/support" },
  { label: "Data Disclosure & Privacy", href: "/privacy" },
];
