export type LinkType =
  | "telegram"
  | "instagram"
  | "youtube"
  | "whatsapp"
  | "phone"
  | "location"
  | "website"
  | "custom"
  | "order"
  | "shop"
  | "reviews"
  | "promo"
  | "faq"
  | "contact"
  | "workout"
  | "nutrition"
  | "progress"
  | "supplements"
  | "guides"
  | "destinations"
  | "tips"
  | "gallery"
  | "itinerary";

export type PillColor = "pink" | "peach" | "blue" | "green" | "purple" | "rose" | "charcoal" | "teal";

export type LinkItem = {
  id: string;
  type: LinkType;
  label: string;
  /** Short subtitle shown under the label, only used by the "pill" button style */
  description?: string;
  url: string;
  /** Explicit color for the "pill" button style; auto-cycled if omitted */
  pillColor?: PillColor;
  /** Custom icon image (PNG/SVG/data URI) shown instead of the built-in vector icon */
  iconUrl?: string;
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
   * Ignored when backgroundImageUrl is set.
   */
  backgroundStyle?: "plain" | "confetti";
  /**
   * Full-page background photo, shown blurred behind a tint of `background`
   * so text and buttons stay legible regardless of the photo's content.
   * Replaces the blob/confetti decoration when set.
   */
  backgroundImageUrl?: string;
  /**
   * Link button style.
   * "card": translucent white card, single-line label, icon in accent color (default).
   * "pill": fully rounded, solid pastel color per button, icon in a white
   * badge, optional description line, trailing chevron.
   */
  buttonStyle?: "card" | "pill";
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
