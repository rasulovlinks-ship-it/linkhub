import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

export const dynamic = "force-static";

/** ownlink.uz itself; client sites get their own sitemap on their domain (worker.js) */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { uz: `${SITE_URL}/`, ru: `${SITE_URL}/ru` };
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/ru`, lastModified: new Date(), priority: 0.9, alternates: { languages } },
  ];
}
