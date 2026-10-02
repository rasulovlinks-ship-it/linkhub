/**
 * Adds a ready-made message to a chat link: t.me/name?text=..., wa.me/998...?text=...
 * Any other link is returned unchanged (the customer just opens the chat).
 */
export function orderUrl(url: string, text: string) {
  try {
    const u = new URL(url);
    if (u.hostname === "t.me" || u.hostname === "wa.me" || u.hostname === "api.whatsapp.com") {
      // %20, not "+": Telegram would show a literal plus sign
      return `${u.origin}${u.pathname}?text=${encodeURIComponent(text)}`;
    }
  } catch {}
  return url;
}

/** 1250000 -> "1 250 000" (fixed grouping, so server and browser always agree) */
export function formatSum(n: number) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
