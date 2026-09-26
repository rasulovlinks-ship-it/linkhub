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
  | "impact"
  | "certificate"
  | "branch";

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
  /**
   * Pre-made full button graphic (badge, label, description, chevron all
   * baked in). When set, "pill" button style renders this image on its
   * own instead of the composed pill markup — label, description,
   * pillColor, and iconUrl are ignored. Needs a transparent background
   * outside the pill shape.
   */
  imageUrl?: string;
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
   * How the background photo fills the page.
   * "cover" (default): scaled to fill the page completely, cropping
   * whichever side overflows.
   * "contain": whole photo shown uncropped, letterboxed if needed.
   */
  backgroundImageFit?: "cover" | "contain";
  /**
   * CSS object-position for the background photo, e.g. "center", "top",
   * "center 20%". Controls which part of the photo stays visible when
   * "cover" crops it, or where it's anchored under "contain". Defaults
   * to "center".
   */
  backgroundImagePosition?: string;
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
  /**
   * Pre-made badge image (icon + label baked in). When set, "row" layout
   * renders this image on its own instead of the icon/badgeBg/label
   * composition — label, description, badgeBg, and iconColor are ignored.
   */
  imageUrl?: string;
};

export type ServiceCard = {
  id: string;
  type: LinkType;
  label: string;
  description?: string;
  /** Photo shown at the top of the card; falls back to a solid tint of badgeBg when omitted */
  photoUrl?: string;
  /** Icon badge background, and the placeholder tint when photoUrl is missing */
  badgeBg: string;
  iconColor: string;
};

/** Named color pair (tinted background + readable ink) used by the EDU template. */
export type EduTone = "indigo" | "amber" | "emerald" | "rose" | "sky" | "violet";

export type EduStat = { id: string; value: string; label: string };

export type EduCourse = {
  id: string;
  title: string;
  /** Short detail line, e.g. "6 oy · haftada 3 dars" */
  meta?: string;
  tone: EduTone;
};

export type EduTeacher = {
  id: string;
  name: string;
  /** Subject, e.g. "Ingliz tili" */
  role: string;
  /** e.g. "8 yil tajriba" */
  experience?: string;
  /** Portrait photo; falls back to a tinted initials tile when omitted */
  photoUrl?: string;
  tone: EduTone;
};

export type EduResult = {
  id: string;
  /** Headline result, e.g. "IELTS 7.5" */
  title: string;
  /** Student name or extra line */
  student?: string;
  /** Photo/scan of the certificate; falls back to a drawn certificate card when omitted */
  photoUrl?: string;
  tone: EduTone;
};

export type EduBranch = {
  id: string;
  name: string;
  address: string;
  /** e.g. "Du-Sha 09:00-20:00" */
  hours?: string;
  /** Display phone; digits are used to build the tel: link */
  phone?: string;
  /** Opens the branch in a maps app/site */
  mapUrl: string;
  photoUrl?: string;
  tone: EduTone;
};

/**
 * Content for template "edu" (education center). Colors come from the
 * site theme (accent = primary, secondaryAccent = call-to-action, textColor
 * = ink, background = page background), so no colors live in this block.
 */
export type EduContent = {
  stats?: EduStat[];
  coursesTitle?: string;
  courses?: EduCourse[];
  teachersTitle?: string;
  teachersSubtitle?: string;
  teachers?: EduTeacher[];
  resultsTitle?: string;
  resultsSubtitle?: string;
  results?: EduResult[];
  branchesTitle?: string;
  branchesSubtitle?: string;
  branches?: EduBranch[];
  /** Main call-to-action, used in the hero (desktop) and the sticky bottom bar (mobile) */
  cta?: { label: string; url: string };
};

/** Frosting palette for the drawn cake illustrations (and matching tinted backgrounds). */
export type CakeTone = "rose" | "cream" | "chocolate" | "pistachio" | "violet" | "lemon" | "velvet";

/** How a cake is drawn when no photo is given. */
export type CakeStyle = {
  tone: CakeTone;
  /** Number of tiers (default 1) */
  tiers?: 1 | 2 | 3;
  topper?: "berries" | "flowers" | "candles" | "heart" | "sprinkles" | "none";
  /** Glaze dripping down the top tier, in a darker shade */
  drip?: boolean;
  /** Row of piped pearls around the base of each tier */
  pearls?: boolean;
};

export type CakeCategory = { id: string; title: string; meta?: string; style: CakeStyle };

export type CakeItem = {
  id: string;
  name: string;
  /** Flavor / filling line */
  description?: string;
  /** Display price, e.g. "от 280 000 сум" */
  price?: string;
  /** Size / servings, e.g. "1.5 кг · 8–10 порций" */
  size?: string;
  /** Small ribbon, e.g. "Хит" */
  tag?: string;
  /** Real photo; falls back to a drawn cake when omitted */
  photoUrl?: string;
  style: CakeStyle;
};

export type CakeFlavor = { id: string; name: string; tone: CakeTone };

export type CakeStep = { id: string; title: string; text: string };

export type CakeReview = {
  id: string;
  name: string;
  text: string;
  /** 1–5 */
  rating?: number;
  /** e.g. "Instagram", "2GIS" */
  source?: string;
};

export type CakeInfoCard = {
  id: string;
  title: string;
  text: string;
  icon: "delivery" | "clock" | "payment" | "location";
};

export type CakeFaq = { id: string; q: string; a: string };

/** Interface strings; every one has a Russian default in the component. */
export type CakeLabels = {
  callAria?: string;
  orderCake?: string;
  callUs?: string;
  contactsNav?: string;
  carouselPause?: string;
  carouselPlay?: string;
  carouselPrev?: string;
  carouselNext?: string;
  createdWith?: string;
};

/**
 * Content for template "cake" (bakery / custom cakes). Colors come from the
 * site theme (accent = primary, secondaryAccent = gold highlight, textColor
 * = ink, background = page background).
 */
export type CakeContent = {
  /** Small trust chips under the bio, e.g. "Доставка по городу" */
  badges?: string[];
  stats?: EduStat[];
  /**
   * Main order button. When the url is a wa.me link, "Заказать" buttons on
   * individual cakes add a ready-made message naming that cake.
   */
  order?: {
    label: string;
    url: string;
    /** Ready-made chat message for the main button (wa.me only) */
    message?: string;
    /** Message for a single cake; "{cake}" is replaced with its name */
    cakeMessage?: string;
  };
  /** Optional hero photo shown instead of the drawn cake on desktop */
  heroImageUrl?: string;
  heroCake?: CakeStyle;
  categoriesTitle?: string;
  categories?: CakeCategory[];
  cakesTitle?: string;
  cakesSubtitle?: string;
  cakes?: CakeItem[];
  flavorsTitle?: string;
  flavorsSubtitle?: string;
  flavors?: CakeFlavor[];
  stepsTitle?: string;
  steps?: CakeStep[];
  reviewsTitle?: string;
  reviewsSubtitle?: string;
  reviews?: CakeReview[];
  infoTitle?: string;
  info?: CakeInfoCard[];
  faqTitle?: string;
  faq?: CakeFaq[];
  /** Closing call-to-action banner */
  closingTitle?: string;
  closingText?: string;
  labels?: CakeLabels;
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
  /**
   * When true, each service card's photo starts hidden behind 4 flat
   * cartoon cloud pieces (one per corner) that part outward the first
   * time it scrolls into view, revealing the photo underneath.
   */
  serviceCardsCloudCover?: boolean;
  serviceCards?: ServiceCard[];
  /** Selects a dedicated page layout instead of the default link-in-bio profile. */
  template?: "edu" | "cake";
  /** Content for template "edu". */
  edu?: EduContent;
  /** Content for template "cake". */
  cake?: CakeContent;
  theme?: SiteTheme;
  links: LinkItem[];
  /** Hides the "Сделано на LinkHub.uz" footer credit when true. */
  hideBranding?: boolean;
  /** Language of the texts above (default "ru"); picks the footer credit wording. */
  lang?: SiteLang;
  /**
   * Second language. When set, a toggle at the top of the page switches
   * name, bio and link texts to these overrides (anything omitted keeps
   * the primary text). Only the default link-in-bio profile uses it.
   */
  translation?: SiteTranslation;
};

export type SiteLang = "uz" | "ru";

export type SiteTranslation = {
  lang: SiteLang;
  name?: string;
  bio?: string;
  /** Overrides keyed by LinkItem.id */
  links?: Record<string, { label?: string; description?: string }>;
};
