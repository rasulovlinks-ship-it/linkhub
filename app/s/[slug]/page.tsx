import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSiteSlugs, getLiveUrl, getSiteBySlug } from "@/lib/sites";
import SiteProfile from "@/components/SiteProfile";
import EduProfile from "@/components/EduProfile";
import CakeProfile from "@/components/CakeProfile";
import LuxeProfile from "@/components/luxe/LuxeProfile";
import ScentProfile from "@/components/scent/ScentProfile";

export function generateStaticParams() {
  return getAllSiteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = getSiteBySlug(slug);
  if (!site) return {};
  // Client sites point search engines at their own domain; templates stay out of the index
  const liveUrl = getLiveUrl(slug);
  return {
    title: site.name,
    description: site.bio,
    ...(site.avatarUrl ? { icons: { icon: site.avatarUrl } } : {}),
    ...(liveUrl
      ? { alternates: { canonical: liveUrl } }
      : { robots: { index: false, follow: true } }),
  };
}

export default async function SitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = getSiteBySlug(slug);
  if (!site) notFound();
  if (site.template === "edu") return <EduProfile site={site} />;
  if (site.template === "cake") return <CakeProfile site={site} />;
  if (site.template === "luxe" && site.luxe) return <LuxeProfile site={site} />;
  if (site.template === "scent" && site.scent) return <ScentProfile site={site} />;
  return <SiteProfile site={site} />;
}
