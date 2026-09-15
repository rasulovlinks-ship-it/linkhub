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
  | "itinerary"
  | "looks"
  | "selfcare"
  | "routine"
  | "babymassage"
  | "therapeutic"
  | "corrective"
  | "hydro"
  | "therapies"
  | "education"
  | "landmark"
  | "yandexpin"
  | "students"
  | "impact";

export type PillColor =
  | "pink"
  | "peach"
  | "blue"
  | "green"
  | "purple"
  | "rose"
  | "charcoal"
  | "teal"
  | "mauve";

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

export type ServiceItem = {
  id: string;
  type: LinkType;
  label: string;
  description?: string;
  /** Pastel circle background behind the icon */
  badgeBg: string;
  /** Icon color within the badge */
  iconColor: string;
  /** In "row" layout, renders this item larger than its siblings */
  large?: boolean;
};

export type ServiceCard = {
  id: string;
  type: LinkType;
  label: string;
  description?: string;
  /** Photo shown at the top of the card; falls back to a solid tint of badgeBg when omitted */
  photoUrl?: string;
  /**
   * When set (together with cloudRightUrl), the photo starts hidden behind
   * two cloud "doors" that part left/right the first time it scrolls into
   * view, revealing the photo underneath.
   */
  cloudLeftUrl?: string;
  cloudRightUrl?: string;
  /** Icon badge background, and the placeholder tint when photoUrl is missing */
  badgeBg: string;
  iconColor: string;
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
  /**
   * Plain informational rows (icon + title + subtitle, no pill background
   * or link chevron) shown above the clickable links. For listing service
   * categories, features, etc. that aren't individually clickable.
   */
  services?: ServiceItem[];
  /**
   * "list" (default): full-width stacked rows.
   * "row": compact equal-width pill chips side by side, for short stats
   * or credentials (e.g. "100+ students").
   */
  servicesLayout?: "list" | "row";
  /**
   * Standalone section rendered at the very bottom of the page (after the
   * links), on its own pastel "cloud" card background with a script-font
   * heading: a vertical stack of photo cards, each with an icon badge
   * overlapping the photo's bottom edge.
   */
  serviceCardsTitle?: string;
  serviceCardsSubtitle?: string;
  /** Decorative background photo for the section panel; falls back to a plain pink gradient */
  serviceCardsBackgroundUrl?: string;
  /**
   * Extra floating cloud-puff cutouts (transparent PNG/WEBP) scattered at
   * fixed positions/sizes around the section panel, layered above the
   * background but behind the heading and cards, for extra depth. Up to 6
   * are used, cycling through fixed slots if fewer are given.
   */
  serviceCardsPuffUrls?: string[];
  serviceCards?: ServiceCard[];
  theme?: SiteTheme;
  links: LinkItem[];
};
