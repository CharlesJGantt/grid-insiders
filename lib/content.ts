import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ContentType = "articles" | "recaps" | "aero-academy" | "dev-log";

export interface BaseFrontmatter {
  title: string;
  slug: string;
  date: string; // ISO date
  summary: string;
  tags: string[]; // driver / team / topic tags, used by /search, /drivers, /teams
  cover: string; // path under /public/images/placeholders
  author?: string;
}

export interface ArticleFrontmatter extends BaseFrontmatter {
  category?: "News" | "Analysis";
}

export interface RecapFrontmatter extends BaseFrontmatter {
  session: string; // e.g. "Race", "Qualifying"
  track: string;
  winner: string;
}

export interface AeroAcademyFrontmatter extends BaseFrontmatter {
  module: string; // e.g. "Aerodynamics", "Power Unit"
}

export type DevLogStatus = "nominal" | "stress" | "evaluated" | "superseded";

export interface DevLogFrontmatter extends BaseFrontmatter {
  version: string; // e.g. "UPGRADE_v2.4"
  team: string;
  status: DevLogStatus;
}

export interface ContentEntry<F extends BaseFrontmatter> {
  frontmatter: F;
  html: string;
}

function readDir(type: ContentType): string[] {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

function readEntry<F extends BaseFrontmatter>(type: ContentType, filename: string): ContentEntry<F> {
  const raw = fs.readFileSync(path.join(CONTENT_ROOT, type, filename), "utf8");
  const { data, content } = matter(raw);
  const html = remark().use(remarkGfm).use(remarkHtml).processSync(content).toString();
  return { frontmatter: data as F, html };
}

function getAll<F extends BaseFrontmatter>(type: ContentType): ContentEntry<F>[] {
  return readDir(type)
    .map((filename) => readEntry<F>(type, filename))
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

function getBySlug<F extends BaseFrontmatter>(type: ContentType, slug: string): ContentEntry<F> | null {
  const filename = readDir(type).find((f) => f.replace(/\.md$/, "") === slug);
  if (!filename) return null;
  return readEntry<F>(type, filename);
}

export const getAllArticles = () => getAll<ArticleFrontmatter>("articles");
export const getArticleBySlug = (slug: string) => getBySlug<ArticleFrontmatter>("articles", slug);

export const getAllRecaps = () => getAll<RecapFrontmatter>("recaps");
export const getRecapBySlug = (slug: string) => getBySlug<RecapFrontmatter>("recaps", slug);

export const getAllAeroAcademy = () => getAll<AeroAcademyFrontmatter>("aero-academy");
export const getAeroAcademyBySlug = (slug: string) => getBySlug<AeroAcademyFrontmatter>("aero-academy", slug);

export const getAllDevLog = () => getAll<DevLogFrontmatter>("dev-log");
export const getDevLogBySlug = (slug: string) => getBySlug<DevLogFrontmatter>("dev-log", slug);

export interface SearchIndexItem {
  title: string;
  summary: string;
  tags: string[];
  type: ContentType;
  slug: string;
  url: string;
  date: string;
}

const typeToUrlBase: Record<ContentType, string> = {
  articles: "/articles",
  recaps: "/recaps",
  "aero-academy": "/aero-academy",
  "dev-log": "/dev-log",
};

/** Flat, tagged index across every content type — powers /search and the /drivers, /teams archives. */
export function getSearchIndex(): SearchIndexItem[] {
  const all: [ContentType, ContentEntry<BaseFrontmatter>[]][] = [
    ["articles", getAllArticles()],
    ["recaps", getAllRecaps()],
    ["aero-academy", getAllAeroAcademy()],
    ["dev-log", getAllDevLog()],
  ];

  return all.flatMap(([type, entries]) =>
    entries.map((entry) => ({
      title: entry.frontmatter.title,
      summary: entry.frontmatter.summary,
      tags: entry.frontmatter.tags ?? [],
      type,
      slug: entry.frontmatter.slug,
      url: `${typeToUrlBase[type]}/${entry.frontmatter.slug}`,
      date: entry.frontmatter.date,
    }))
  );
}

function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** All entries (any content type) tagged with the given driver/team/topic tag. */
export function getEntriesByTag(tag: string): SearchIndexItem[] {
  const target = slugifyTag(tag);
  return getSearchIndex().filter((item) => item.tags.some((t) => slugifyTag(t) === target));
}

export { slugifyTag };
