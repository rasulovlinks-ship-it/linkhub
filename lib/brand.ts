/**
 * ownlink.uz contact channels and pricing constants, in one place so the
 * header, hero, CTA and footer never drift apart.
 *
 * TODO(owner): replace the placeholder handles / number with the real ones.
 */
export const CONTACTS = {
  telegram: "ownlink_uz",
  instagram: "ownlink.uz",
  /** Display format */
  phone: "+998 90 000 00 00",
} as const;

const phoneDigits = CONTACTS.phone.replace(/\D/g, "");

export const CONTACT_LINKS = {
  telegram: `https://t.me/${CONTACTS.telegram}`,
  instagram: `https://instagram.com/${CONTACTS.instagram}`,
  whatsapp: `https://wa.me/${phoneDigits}`,
  phone: `tel:+${phoneDigits}`,
} as const;

/**
 * Approximate monthly price of a paid link-in-bio subscription
 * (Taplink / Linktree paid tiers), used by the hero meter and calculator.
 */
export const COMPETITOR_MONTHLY_USD = 6;

export const SITE_URL = "https://ownlink.uz";
