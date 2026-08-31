import Image from "next/image";
import Link from "next/link";
import { slugifyTag } from "@/lib/content";

interface DriverCardProps {
  position: number;
  code: string;
  name: string;
  team: string;
  points: number;
}

export function DriverCard({ position, code, name, team, points }: DriverCardProps) {
  return (
    <Link href={`/drivers/${slugifyTag(name)}`} className="bento-card group flex items-center gap-4 rounded-lg p-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-surface-container-high">
        <Image src="/images/placeholders/avatar.svg" alt="" fill className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-body text-label-caps text-outline">{String(position).padStart(2, "0")}</span>
          <span className="font-body text-label-caps text-tertiary">{code}</span>
        </div>
        <h3 className="truncate font-headline text-headline-md text-base font-bold text-on-surface">{name}</h3>
        <p className="truncate font-body text-body-md text-on-surface-variant">{team}</p>
      </div>
      <span className="shrink-0 font-body text-label-caps text-on-surface-variant">{points} PTS</span>
    </Link>
  );
}

interface TeamCardProps {
  position: number;
  team: string;
  points: number;
}

export function TeamCard({ position, team, points }: TeamCardProps) {
  return (
    <Link href={`/teams/${slugifyTag(team)}`} className="bento-card group flex items-center gap-4 rounded-lg p-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-surface-container-high">
        <Image src="/images/placeholders/team-badge.svg" alt="" fill className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <span className="font-body text-label-caps text-outline">{String(position).padStart(2, "0")}</span>
        <h3 className="truncate font-headline text-headline-md text-base font-bold text-on-surface">{team}</h3>
      </div>
      <span className="shrink-0 font-body text-label-caps text-on-surface-variant">{points} PTS</span>
    </Link>
  );
}
