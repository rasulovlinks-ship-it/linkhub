/**
 * Light/dark choice on site pages that offer it (template "scent"): this
 * attribute on <html> switches the page to its dark look.
 */
export const THEME_ATTR = "data-sc-theme";

export const themeStorageKey = (slug: string) => `site-theme:${slug}`;

/** Inline script that restores the saved choice before first paint (no flash of the light page). */
export function themeInitScript(slug: string) {
  return `try{if(localStorage.getItem(${JSON.stringify(themeStorageKey(slug))})==="dark")document.documentElement.setAttribute("${THEME_ATTR}","dark")}catch(e){}`;
}
