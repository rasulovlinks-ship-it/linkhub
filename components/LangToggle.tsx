"use client";

import { useSyncExternalStore } from "react";
import type { SiteLang } from "@/lib/types";
import { LANG_ALT_ATTR as ATTR, langStorageKey as storageKey } from "@/lib/siteLang";

/**
 * Two-language switch for site pages. The page renders both languages;
 * this toggles the <html> attribute from lib/siteLang, so switching needs
 * no re-render of the page itself.
 */
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export default function LangToggle({
  slug,
  primary,
  alt,
  accent,
  accentText,
  variant = "light",
}: {
  slug: string;
  primary: SiteLang;
  alt: SiteLang;
  accent: string;
  accentText: string;
  /** "dark": translucent dark pill with a hairline border, for dark pages */
  variant?: "light" | "dark";
}) {
  const showAlt = useSyncExternalStore(
    subscribe,
    () => document.documentElement.hasAttribute(ATTR),
    () => false,
  );

  const select = (lang: SiteLang) => {
    const useAlt = lang === alt;
    const root = document.documentElement;
    root.toggleAttribute(ATTR, useAlt);
    root.setAttribute("lang", lang);
    try {
      localStorage.setItem(storageKey(slug), lang);
    } catch {}
    listeners.forEach((listener) => listener());
  };

  return (
    <div
      role="group"
      aria-label="Til / Язык"
      className={
        variant === "dark"
          ? "flex rounded-full bg-black/35 p-1 ring-1 ring-white/15 backdrop-blur"
          : "flex rounded-full bg-white/75 p-1 shadow-sm ring-1 ring-black/10 backdrop-blur"
      }
    >
      {[primary, alt].map((lang) => {
        const active = (lang === alt) === showAlt;
        return (
          <button
            key={lang}
            type="button"
            aria-pressed={active}
            onClick={() => select(lang)}
            className="h-9 min-w-11 rounded-full px-3 text-xs font-bold tracking-wide uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            style={active ? { backgroundColor: accent, color: accentText } : { opacity: 0.65 }}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
}
