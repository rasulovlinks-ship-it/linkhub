import fs from "fs";
import path from "path";
import type { SiteConfig } from "./types";

const SITES_DIR = path.join(process.cwd(), "data", "sites");
const DOMAINS_FILE = path.join(process.cwd(), "data", "domains.json");

export function getAllSiteSlugs(): string[] {
  if (!fs.existsSync(SITES_DIR)) return [];
  return fs
    .readdirSync(SITES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function getSiteBySlug(slug: string): SiteConfig | null {
  const safeSlug = slug.replace(/[^a-zA-Z0-9_-]/g, "");
  const filePath = path.join(SITES_DIR, `${safeSlug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SiteConfig;
}

/**
 * domain (e.g. "thebestcakestashkent.uz") -> slug (e.g. "thebestcakestashkent"),
 * or a list of slugs when one domain shows several versions (first one at "/")
 */
export function getDomainMap(): Record<string, string | string[]> {
  if (!fs.existsSync(DOMAINS_FILE)) return {};
  const raw = fs.readFileSync(DOMAINS_FILE, "utf-8");
  return JSON.parse(raw) as Record<string, string | string[]>;
}

/**
 * Public address of a site on its own domain ("https://tortiroda.uz/",
 * "https://tortiroda.uz/2" for a later version), or null when the slug has no
 * domain (templates, demos).
 */
export function getLiveUrl(slug: string): string | null {
  for (const [domain, entry] of Object.entries(getDomainMap())) {
    const i = [entry].flat().indexOf(slug);
    if (i === 0) return `https://${domain}/`;
    if (i > 0) return `https://${domain}/${i + 1}`;
  }
  return null;
}

export function getSiteByDomain(hostname: string): SiteConfig | null {
  const host = hostname.toLowerCase().replace(/^www\./, "").split(":")[0];
  const map = getDomainMap();
  const slug = [map[host] ?? []].flat()[0];
  if (!slug) return null;
  return getSiteBySlug(slug);
}
