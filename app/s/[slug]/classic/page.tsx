import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSiteSlugs, getSiteBySlug } from "@/lib/sites";
import SiteProfileClassic from "@/components/SiteProfileClassic";

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

export default async function SiteClassicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = getSiteBySlug(slug);
  if (!site) notFound();
  return <SiteProfileClassic site={site} />;
}
