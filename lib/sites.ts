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

/** domain (e.g. "thebestcakestashkent.uz") -> slug (e.g. "thebestcakestashkent") */
export function getDomainMap(): Record<string, string> {
  if (!fs.existsSync(DOMAINS_FILE)) return {};
  const raw = fs.readFileSync(DOMAINS_FILE, "utf-8");
  return JSON.parse(raw) as Record<string, string>;
}

export function getSiteByDomain(hostname: string): SiteConfig | null {
  const host = hostname.toLowerCase().replace(/^www\./, "").split(":")[0];
  const map = getDomainMap();
  const slug = map[host];
  if (!slug) return null;
  return getSiteBySlug(slug);
}
