import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { uz } from "@/lib/i18n/uz";

export const metadata: Metadata = {
  title: uz.meta.title,
  description: uz.meta.description,
  alternates: { canonical: "/", languages: { uz: "/", ru: "/ru" } },
  openGraph: { title: uz.meta.title, description: uz.meta.description, locale: "uz_UZ", type: "website" },
};

export default function Home() {
  return <HomePage lang="uz" />;
}
