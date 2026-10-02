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

/**
 * Text in both languages of a two-language page; the key is the language.
 * The luxe template shows site.lang first and translation.lang on toggle.
 */
export type BiText = Partial<Record<SiteLang, string>>;

export type LuxeStat = { id: string; value: BiText; label: BiText };

export type LuxePiece = {
  id: string;
  photoUrl: string;
  title: BiText;
  /** One descriptive line under the title, e.g. "Multi-tier, sculpted sugar folds" */
  detail?: BiText;
};

export type LuxeOccasion = { id: string; title: BiText; text?: BiText };

export type LuxeStep = { id: string; title: BiText; text: BiText };

export type LuxeChannel = {
  id: string;
  type: LinkType;
  label: BiText;
  /** Shown under the label, e.g. "@tort_iroda" */
  handle: string;
  url: string;
};

/**
 * Content for template "luxe": a dark, editorial boutique page for one maker
 * (hero photo in an arch, numbered collection with a full-screen viewer,
 * occasions, quote, ordering steps, channels). Colors come from the site
 * theme: background = page, accent = gold, textColor = ivory ink.
 */
export type LuxeContent = {
  kicker: BiText;
  /** Small italic line above the display name */
  nameLead?: BiText;
  /** Large display name (defaults to site.name) */
  displayName?: BiText;
  tagline: BiText;
  heroImageUrl: string;
  /**
   * Colour of the metallic gradient (buttons, numbers, frames): "gold" (default,
   * champagne gold) or "accent", the same shine made from theme.accent.
   */
  metal?: "gold" | "accent";
  stats?: LuxeStat[];
  /** icon defaults to "order" (a cake); a shop link can use "shop" */
  order: { url: string; label: BiText; note?: BiText; icon?: LinkType };
  phone?: { url: string; display: string; label: BiText };
  collectionTitle: BiText;
  collectionSubtitle?: BiText;
  collection: LuxePiece[];
  occasionsTitle?: BiText;
  occasions?: LuxeOccasion[];
  quote?: BiText;
  quoteAuthor?: BiText;
  stepsTitle?: BiText;
  steps?: LuxeStep[];
  /** "What to write when ordering" checklist */
  briefTitle?: BiText;
  brief?: BiText[];
  channelsTitle?: BiText;
  channels?: LuxeChannel[];
  closingTitle?: BiText;
  closingText?: BiText;
  /** Interface strings (viewer buttons, section numbers) */
  labels?: {
    close?: BiText;
    prev?: BiText;
    next?: BiText;
    open?: BiText;
  };
};

/** A product shown on a "scent" page, linking to the shop */
export type ScentProduct = {
  id: string;
  /** Packshot on white (blended into the tinted card) */
  photoUrl: string;
  brand: string;
  name: BiText;
  /** e.g. "10 ml · 480 000 so'm" */
  price?: BiText;
  url: string;
};

export type ScentTile = { id: string; photoUrl: string; title: BiText; url: string };

export type ScentLink = {
  id: string;
  type: LinkType;
  label: BiText;
  /** Second line, e.g. "@s_perfume_uz" */
  handle?: string;
  url: string;
};

/**
 * Content for template "scent": a light, product-first landing page for a
 * perfume and cosmetics shop (packshot hero, decant shelf, categories,
 * in-store photos, ordering, visit). theme.accent is the brand colour.
 */
export type ScentContent = {
  kicker: BiText;
  /** Headline; the part wrapped in *asterisks* is drawn in the accent colour */
  title: BiText;
  tagline: BiText;
  /** Three packshots arranged in the hero, the middle one in front */
  heroProducts: ScentProduct[];
  /** Small floating notes on the hero picture */
  heroBadges?: BiText[];
  shop: { url: string; label: BiText };
  order: { url: string; label: BiText };
  facts?: LuxeStat[];
  linksTitle?: BiText;
  links: ScentLink[];
  shelfTitle: BiText;
  shelfText?: BiText;
  shelfMore?: { url: string; label: BiText };
  /** Shown when there's no shelfSource, or the shop can't be reached */
  shelf: ScentProduct[];
  /**
   * Fill the shelf from an ownlink shop: api is its product list URL (e.g. the
   * starred products, "/api/products?top=1&facets=0"), shop its address.
   */
  shelfSource?: { api: string; shop: string };
  categoriesTitle?: BiText;
  categories?: ScentTile[];
  storeTitle?: BiText;
  storeText?: BiText;
  storePhotos?: string[];
  storeLink?: { url: string; label: BiText };
  stepsTitle?: BiText;
  steps?: LuxeStep[];
  payTitle?: BiText;
  payments?: BiText[];
  visit?: {
    title: BiText;
    address: BiText;
    hours: BiText;
    mapUrl: string;
    mapLabel: BiText;
    phone: { url: string; display: string; label: BiText };
  };
};

/** Drawn cake used by the "pop" and "menu" templates when there is no photo. */
export type SketchKind = "round" | "tiers" | "bento" | "cupcake" | "slice";

export type Sketch = {
  kind: SketchKind;
  /** Frosting colour (hex); the drawing derives its light and dark shades from it */
  color: string;
  topper?: "cherry" | "berries" | "candle" | "flower" | "heart" | "none";
};

/** A cake or dessert card on a "pop" page */
export type PopItem = {
  id: string;
  name: BiText;
  note?: BiText;
  /** Display price, e.g. "от 180 000" */
  price: BiText;
  /** Small ribbon, e.g. "Хит" */
  tag?: BiText;
  sketch: Sketch;
  /** Real photo; replaces the drawing */
  photoUrl?: string;
};

export type PopReview = { id: string; name: string; text: BiText; source?: string };

export type PopBuilder = {
  title: BiText;
  subtitle?: BiText;
  occasionsLabel: BiText;
  occasions: { id: string; label: BiText }[];
  sizesLabel: BiText;
  sizes: { id: string; label: BiText; serves: BiText; price: number }[];
  flavorsLabel: BiText;
  flavors: { id: string; name: BiText; color: string }[];
  currency: BiText;
  totalLabel: BiText;
  sendLabel: BiText;
  /** Message sent to the maker (in the page's primary language): {occasion} {size} {flavor} {price} */
  message: BiText;
};

/**
 * Content for template "pop": a loud sticker-style page for a young home
 * bakery (bento, birthday and gift cakes) with a build-your-cake order
 * picker. Colours come from the site theme: accent = main colour, secondaryAccent
 * = highlight, background = page, textColor = ink.
 */
export type PopContent = {
  kicker: BiText;
  /** Headline; the part wrapped in *asterisks* gets a highlighter mark */
  title: BiText;
  tagline: BiText;
  heroSketch: Sketch;
  heroPhotoUrl?: string;
  /** Up to three notes stuck around the hero picture */
  stickers?: BiText[];
  marquee?: BiText[];
  order: { url: string; label: BiText };
  stats?: LuxeStat[];
  menuTitle: BiText;
  menuSubtitle?: BiText;
  menu: PopItem[];
  /** Message sent when a card is tapped (primary language); "{name}" is the card's name */
  itemMessage?: BiText;
  builder?: PopBuilder;
  stepsTitle?: BiText;
  steps?: LuxeStep[];
  reviewsTitle?: BiText;
  reviews?: PopReview[];
  infoTitle?: BiText;
  info?: LuxeOccasion[];
  channelsTitle?: BiText;
  channels?: LuxeChannel[];
  closingTitle?: BiText;
  closingText?: BiText;
};

export type MenuItem = {
  id: string;
  name: BiText;
  note?: BiText;
  /** e.g. "1.2 kg · 8 porsiya" */
  size?: BiText;
  /** Price in so'm */
  price: number;
  tag?: BiText;
  sketch: Sketch;
  photoUrl?: string;
};

export type MenuCategory = { id: string; title: BiText; items: MenuItem[] };

/**
 * Content for template "menu": a calm pastry-menu page. Pick items from a
 * priced menu, choose a free date on a booking strip, and send it all as one
 * ready-made message. Colours: background = paper, textColor = ink,
 * accent = the single bright colour, secondaryAccent = soft tint.
 */
export type MenuContent = {
  kicker: BiText;
  title: BiText;
  tagline: BiText;
  heroSketch: Sketch;
  heroPhotoUrl?: string;
  /** Mono facts under the hero, e.g. opening hours and city */
  facts?: BiText[];
  order: { url: string; label: BiText };
  menuTitle: BiText;
  menuSubtitle?: BiText;
  categories: MenuCategory[];
  currency: BiText;
  /** Booking strip: the next three weeks; ISO dates ("2026-10-12") that are full, weekdays (0 = Sunday) that are closed */
  calendar?: {
    title: BiText;
    subtitle?: BiText;
    busy?: string[];
    closedWeekdays?: number[];
    /** Days between today and the first free date */
    leadDays?: number;
    busyLabel: BiText;
    freeLabel: BiText;
    weekdays: { uz: string[]; ru: string[] };
  };
  request: {
    title: BiText;
    empty: BiText;
    send: BiText;
    dateLabel: BiText;
    nameLabel: BiText;
    totalLabel: BiText;
    /** First line of the message sent to the maker (in the page's primary language) */
    intro: BiText;
  };
  sizesTitle?: BiText;
  sizes?: { id: string; label: BiText; serves: BiText; price: BiText }[];
  infoTitle?: BiText;
  info?: LuxeOccasion[];
  channelsTitle?: BiText;
  channels?: LuxeChannel[];
  closingText?: BiText;
};

/** A place on a "box" or "ticket" page: name of the button, street address, map link */
export type PlaceInfo = { label: BiText; address: BiText; mapUrl: string };

/**
 * Content for template "box": the page opens like a gift box. Gift wrap
 * covers the screen, then splits open to show a short link page (name, order
 * button, a row of drawn or photographed cakes, contacts, location). No
 * prices, no menu. Colours: accent = wrap, secondaryAccent = ribbon,
 * background = page, textColor = ink.
 */
export type BoxContent = {
  /** Written on the gift tag hanging from the bow */
  giftTag: BiText;
  /** Small prompt under the bow, e.g. "Ochish uchun bosing" */
  openHint: BiText;
  tagline: BiText;
  hours?: BiText;
  heroSketch: Sketch;
  order: { url: string; label: BiText };
  bakesTitle?: BiText;
  /** A few round tiles, each a drawing or a photo with a caption */
  bakes?: { id: string; label: BiText; sketch: Sketch; photoUrl?: string }[];
  channels: LuxeChannel[];
  location?: PlaceInfo;
  closing?: BiText;
};

/**
 * Content for template "ticket": the page is a printed order slip that
 * slides out of a slot (typewriter type, dashed rules, a stamp, a barcode).
 * No prices. Colours: background = the desk, accent = stamp, textColor = ink
 * on the paper, secondaryAccent = paper.
 */
export type TicketContent = {
  /** Small line at the top of the slip, e.g. "Buyurtma cheki" */
  kicker: BiText;
  tagline: BiText;
  heroSketch: Sketch;
  address: BiText;
  hours: BiText;
  order: { url: string; label: BiText };
  /** Printed list of what is baked, one line each (a tick instead of a price) */
  bakesTitle: BiText;
  bakes: BiText[];
  channelsTitle: BiText;
  channels: LuxeChannel[];
  location: PlaceInfo;
  /** Labels in the slip header */
  numberLabel: BiText;
  dateLabel: BiText;
  thanks: BiText;
  stamp: BiText;
};

/**
 * A photo slot on the plain photo templates ("grid", "slider", "intro").
 * The owner attaches a real photo with photoUrl; until then the slot shows
 * the drawing in sketch (or a neutral tile).
 */
export type PhotoItem = {
  id: string;
  photoUrl?: string;
  sketch?: Sketch;
  caption?: BiText;
};

/** A number that counts up when seen, e.g. 10000 + "+" + "cakes baked" */
export type CountStat = { id: string; value: number; suffix?: string; label: BiText };

/**
 * Content for template "grid": a clean, Instagram-like page. Round avatar,
 * short bio, stacked contact buttons and a grid of the owner's cakes that
 * opens full-screen. Colours: accent = main button, textColor = ink,
 * background = page.
 */
export type GridContent = {
  tagline: BiText;
  hours?: BiText;
  stats?: LuxeStat[];
  order: { url: string; label: BiText };
  channels: LuxeChannel[];
  location?: PlaceInfo;
  galleryTitle: BiText;
  photos: PhotoItem[];
  closing?: BiText;
};

/**
 * Content for template "slider": big swipeable photos of the owner's cakes
 * at the top with the name over them, then round quick-contact buttons, a
 * short "about" and the location.
 */
export type SliderContent = {
  tagline: BiText;
  slides: PhotoItem[];
  order: { url: string; label: BiText };
  /** Round icon buttons under the photos (Telegram, Instagram, phone ...) */
  quick: LuxeChannel[];
  aboutTitle: BiText;
  about: BiText;
  facts?: LuxeStat[];
  location?: PlaceInfo;
  hours?: BiText;
};

/**
 * Content for template "intro": starts with the owner ("Hi, my name is ...")
 * and their portrait, then big counters ("10 000+ cakes baked"), a strip of
 * works, and the contacts.
 */
export type IntroContent = {
  /** "Salom, men" / "Привет, меня зовут" - the name follows from site.name */
  greeting: BiText;
  /** One sentence; *starred* words are highlighted, e.g. "I have baked *more than 10 000 cakes*" */
  pitch: BiText;
  /** The owner's photo; a drawn baker is shown until it is set */
  portraitUrl?: string;
  counters: CountStat[];
  story?: BiText;
  worksTitle: BiText;
  works: PhotoItem[];
  order: { url: string; label: BiText };
  channels: LuxeChannel[];
  location?: PlaceInfo;
  hours?: BiText;
  closing?: BiText;
};

export type SiteConfig = {
  /** Unique id, also the JSON filename under data/sites/ and the /s/[slug] path */
  slug: string;
  /** Display name shown on the page */
  name: string;
  /** Small uppercase line above the name, e.g. "Konditer · Iroda Mahmudovna" */
  eyebrow?: string;
  bio?: string;
  /** Colored icon chips under the bio (specialties, city, follower count) */
  badges?: SiteBadge[];
  avatarUrl?: string;
  /** Wide banner photo shown above the avatar */
  coverImageUrl?: string;
  /** Small photo strip (product shots, portfolio pieces, etc.) shown below the bio */
  gallery?: string[];
  /**
   * Captioned portfolio photos ("what I make"), shown below the bio as a
   * horizontally swipeable strip, one card per kind of work.
   */
  worksTitle?: string;
  works?: WorkItem[];
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
  template?: "edu" | "cake" | "luxe" | "scent" | "pop" | "menu" | "box" | "ticket" | "grid" | "slider" | "intro";
  /** Content for template "edu". */
  edu?: EduContent;
  /** Content for template "cake". */
  cake?: CakeContent;
  /** Content for template "luxe". */
  luxe?: LuxeContent;
  /** Content for template "scent". */
  scent?: ScentContent;
  /** Content for template "pop". */
  pop?: PopContent;
  /** Content for template "menu". */
  menu?: MenuContent;
  /** Content for template "box". */
  box?: BoxContent;
  /** Content for template "ticket". */
  ticket?: TicketContent;
  /** Content for template "grid". */
  grid?: GridContent;
  /** Content for template "slider". */
  slider?: SliderContent;
  /** Content for template "intro". */
  intro?: IntroContent;
  theme?: SiteTheme;
  links: LinkItem[];
  /** Hides the "Сделано на ownlink.uz" footer credit when true. */
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

export type WorkItem = { id: string; photoUrl: string; label: string };

export type SiteBadge = {
  id: string;
  label: string;
  icon?: LinkType;
  /** Chip color from the pill palette; auto-cycled if omitted */
  color?: PillColor;
};

export type SiteLang = "uz" | "ru";

export type SiteTranslation = {
  lang: SiteLang;
  name?: string;
  eyebrow?: string;
  bio?: string;
  /** Badge labels keyed by SiteBadge.id */
  badges?: Record<string, string>;
  /** Overrides keyed by LinkItem.id */
  links?: Record<string, { label?: string; description?: string }>;
  worksTitle?: string;
  /** Work labels keyed by WorkItem.id */
  works?: Record<string, string>;
};
