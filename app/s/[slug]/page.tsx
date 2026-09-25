import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSiteSlugs, getSiteBySlug } from "@/lib/sites";
import SiteProfile from "@/components/SiteProfile";
import EduProfile from "@/components/EduProfile";
import CakeProfile from "@/components/CakeProfile";

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
  return {
    title: site.name,
    description: site.bio,
    ...(site.avatarUrl ? { icons: { icon: site.avatarUrl } } : {}),
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
  return <SiteProfile site={site} />;
}
