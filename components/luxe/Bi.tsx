import type { BiText, SiteLang } from "@/lib/types";

export type Langs = { primary: SiteLang; alt?: SiteLang };

/** Text in the page's primary language, or in the chosen alternate (plain string for aria/alt). */
export function biString(text: BiText | undefined, langs: Langs, useAlt = false) {
  if (!text) return "";
  const primary = text[langs.primary] ?? "";
  return useAlt && langs.alt ? (text[langs.alt] ?? primary) : primary;
}

/**
 * Renders both languages; globals.css hides the inactive one based on the
 * <html> attribute that LangToggle sets. Falls back to the primary text
 * when there's no alternate.
 */
export default function Bi({ t, langs }: { t: BiText | undefined; langs: Langs }) {
  const primary = biString(t, langs);
  const alt = biString(t, langs, true);
  if (!langs.alt || alt === primary) return <>{primary}</>;
  return (
    <>
      <span data-l="primary">{primary}</span>
      <span data-l="alt">{alt}</span>
    </>
  );
}
