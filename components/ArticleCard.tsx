import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  href: string;
  title: string;
  summary: string;
  cover: string;
  kicker?: string;
  date?: string;
}

export function ArticleCard({ href, title, summary, cover, kicker, date }: ArticleCardProps) {
  return (
    <Link
      href={href}
      className="bento-card group flex flex-col overflow-hidden rounded-lg"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-container-high">
        <Image
          src={cover}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {kicker ? (
          <span className="mb-2 font-body text-label-caps uppercase tracking-widest text-tertiary">{kicker}</span>
        ) : null}
        <h3 className="mb-2 font-headline text-headline-md text-lg font-bold text-on-surface">{title}</h3>
        <p className="line-clamp-2 font-body text-body-md text-on-surface-variant">{summary}</p>
        {date ? (
          <span className="mt-auto pt-4 font-body text-[10px] uppercase tracking-widest text-outline">{date}</span>
        ) : null}
      </div>
    </Link>
  );
}
