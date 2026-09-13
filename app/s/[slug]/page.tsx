import { notFound } from "next/navigation";
import { getAllSiteSlugs, getSiteBySlug } from "@/lib/sites";
import SiteProfile from "@/components/SiteProfile";

export function generateStaticParams() {
  return getAllSiteSlugs().map((slug) => ({ slug }));
}

export default async function SitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = getSiteBySlug(slug);
  if (!site) notFound();
  return <SiteProfile site={site} />;
}
