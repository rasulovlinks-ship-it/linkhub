import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import { ru } from "@/lib/i18n/ru";

export const metadata: Metadata = {
  title: ru.meta.title,
  description: ru.meta.description,
  alternates: { canonical: "/ru", languages: { uz: "/", ru: "/ru" } },
  openGraph: { title: ru.meta.title, description: ru.meta.description, locale: "ru_RU", type: "website" },
};

export default function HomeRu() {
  return <HomePage lang="ru" />;
}
