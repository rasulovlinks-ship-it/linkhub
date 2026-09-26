import type { SiteLang } from "./types";

/**
 * Two-language site pages render both languages; this attribute on <html>
 * marks the second one as active and globals.css hides the other side.
 */
export const LANG_ALT_ATTR = "data-lang-alt";

export const langStorageKey = (slug: string) => `site-lang:${slug}`;

/** Inline script that restores the saved choice before first paint (no flash of the wrong language). */
export function langInitScript(slug: string, alt: SiteLang) {
  const key = JSON.stringify(langStorageKey(slug));
  const altLang = JSON.stringify(alt);
  return `try{if(localStorage.getItem(${key})===${altLang}){var r=document.documentElement;r.setAttribute("${LANG_ALT_ATTR}","");r.lang=${altLang}}}catch(e){}`;
}
