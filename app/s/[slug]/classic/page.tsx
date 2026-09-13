import { notFound } from "next/navigation";
import { getSiteBySlug } from "@/lib/sites";
import SiteProfileClassic from "@/components/SiteProfileClassic";

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
