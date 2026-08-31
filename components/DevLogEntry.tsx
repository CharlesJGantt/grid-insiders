import Link from "next/link";
import type { DevLogFrontmatter } from "@/lib/content";
import { StatusBadge } from "@/components/StatusBadge";

export function DevLogEntry({ frontmatter }: { frontmatter: DevLogFrontmatter }) {
  return (
    <tr className="border-b border-outline-variant transition-colors hover:bg-surface-variant/30">
      <td className="py-3 pr-4 font-body font-bold text-on-surface">{frontmatter.version}</td>
      <td className="py-3 pr-4 font-body text-body-md text-on-surface-variant">{frontmatter.team}</td>
      <td className="py-3 pr-4">
        <Link href={`/dev-log/${frontmatter.slug}`} className="font-body text-body-md text-on-surface-variant hover:text-tertiary">
          {frontmatter.summary}
        </Link>
      </td>
      <td className="py-3 text-right">
        <StatusBadge status={frontmatter.status} />
      </td>
    </tr>
  );
}
