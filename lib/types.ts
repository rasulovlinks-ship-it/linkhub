export type LinkType =
  | "telegram"
  | "instagram"
  | "youtube"
  | "whatsapp"
  | "phone"
  | "location"
  | "website"
  | "custom";

export type LinkItem = {
  id: string;
  type: LinkType;
  label: string;
  url: string;
};

export type SiteTheme = {
  /** CSS background value: solid color or gradient, e.g. "linear-gradient(180deg,#fdf2f8,#fff)" */
  background?: string;
  /** Accent color used for buttons */
  accent?: string;
  /** Text color for accent buttons */
  accentText?: string;
  /** Main page text color */
  textColor?: string;
  /** Second decorative color, paired with accent for richer backgrounds */
  secondaryAccent?: string;
  /**
   * Background decoration style.
   * "plain": two static soft blurred blobs (default).
   * "confetti": drifting blobs plus small scattered sprinkle shapes,
   * for businesses (bakeries, parties, kids' brands) where that fits.
   */
  backgroundStyle?: "plain" | "confetti";
};

export type SiteConfig = {
  /** Unique id, also the JSON filename under data/sites/ and the /s/[slug] path */
  slug: string;
  /** Display name shown on the page */
  name: string;
  bio?: string;
  avatarUrl?: string;
  /** Wide banner photo shown above the avatar */
  coverImageUrl?: string;
  /** Small photo strip (product shots, portfolio pieces, etc.) shown below the bio */
  gallery?: string[];
  theme?: SiteTheme;
  links: LinkItem[];
};
