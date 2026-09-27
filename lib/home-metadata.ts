import type { Metadata } from "next";
import { getDict, type Lang } from "@/lib/i18n";

/**
 * ownlink.uz homepage metadata. Brand favicon / share image are set here,
 * not in the root layout, so client sites (/s/[slug]) keep their own icons.
 */
export function homeMetadata(lang: Lang): Metadata {
  const { meta } = getDict(lang);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: lang === "ru" ? "/ru" : "/", languages: { uz: "/", ru: "/ru" } },
    icons: {
      icon: [
        { url: "/brand/favicon.svg", type: "image/svg+xml" },
        { url: "/brand/favicon.ico", sizes: "16x16 32x32 48x48" },
      ],
      apple: "/brand/apple-touch-icon.png",
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: lang === "ru" ? "ru_RU" : "uz_UZ",
      type: "website",
      siteName: "ownlink.uz",
      images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: "ownlink.uz" }],
    },
    twitter: { card: "summary_large_image", images: ["/brand/og.png"] },
  };
}
