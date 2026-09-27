/**
 * ownlink.uz contact channels and pricing constants, in one place so the
 * header, hero, CTA and footer never drift apart.
 */
export const CONTACTS = {
  telegram: "ownlinkuz",
  instagram: "ownlink.uz",
  /** Display format; also the WhatsApp number (wa.me needs digits, not a username) */
  phone: "+998 90 994 08 42",
} as const;

const phoneDigits = CONTACTS.phone.replace(/\D/g, "");

export const CONTACT_LINKS = {
  telegram: `https://t.me/${CONTACTS.telegram}`,
  instagram: `https://www.instagram.com/${CONTACTS.instagram}/`,
  whatsapp: `https://wa.me/${phoneDigits}`,
  phone: `tel:+${phoneDigits}`,
} as const;

/** WhatsApp chat link with a ready-to-send message */
export function whatsappLink(text: string): string {
  return `${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent(text)}`;
}

/**
 * Approximate monthly price of a paid link-in-bio subscription
 * (Taplink / Linktree paid tiers), used by the hero meter and calculator.
 */
export const COMPETITOR_MONTHLY_USD = 6;

export const SITE_URL = "https://ownlink.uz";
