"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import type { BiText } from "@/lib/types";
import Bi, { type Langs } from "@/components/luxe/Bi";
import { THEME_ATTR as ATTR, themeStorageKey as storageKey } from "@/lib/siteTheme";

const LIGHT: BiText = { uz: "Oq dizayn", ru: "Светлый дизайн" };
const DARK: BiText = { uz: "Qora dizayn", ru: "Тёмный дизайн" };

const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Switches the page between the white look and the dark one; the choice is kept for the next visit */
export default function ScentThemeToggle({ slug, langs }: { slug: string; langs: Langs }) {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.getAttribute(ATTR) === "dark",
    () => false,
  );

  const toggle = () => {
    const next = !dark;
    const root = document.documentElement;
    if (next) root.setAttribute(ATTR, "dark");
    else root.removeAttribute(ATTR);
    try {
      localStorage.setItem(storageKey(slug), next ? "dark" : "light");
    } catch {}
    listeners.forEach((listener) => listener());
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      className="grid size-11 shrink-0 place-items-center rounded-full bg-(--sc-surface) ring-1 ring-(--sc-line) transition-transform duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--sc-accent)"
    >
      {dark ? <SunIcon className="size-5" aria-hidden /> : <MoonIcon className="size-5" aria-hidden />}
      <span className="sr-only">
        <Bi t={dark ? LIGHT : DARK} langs={langs} />
      </span>
    </button>
  );
}
