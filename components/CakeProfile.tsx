import type { CSSProperties } from "react";
import {
  ChevronDownIcon,
  ClockIcon,
  CreditCardIcon,
  MapPinIcon,
  SparklesIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import type {
  CakeCategory,
  CakeContent,
  CakeFaq,
  CakeFlavor,
  CakeInfoCard,
  CakeItem,
  CakeLabels,
  CakeReview,
  CakeStep,
  LinkItem,
  LinkType,
  SiteConfig,
} from "@/lib/types";
import { LinkIcon } from "./icons";
import CakeArt, { CAKE_PALETTES } from "./CakeArt";
import HubCarousel from "./HubCarousel";

const DEFAULT_LABELS: Required<CakeLabels> = {
  callAria: "Позвонить",
  orderCake: "Заказать",
  callUs: "Позвонить",
  contactsNav: "Связаться с нами",
  carouselPause: "Остановить автопрокрутку",
  carouselPlay: "Включить автопрокрутку",
  carouselPrev: "Назад",
  carouselNext: "Вперёд",
  createdWith: "Сделано на",
};

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-primary)";

const LINK_TINT: Partial<Record<LinkType, string>> = {
  whatsapp: "#DCFCE7",
  order: "#FFE4EE",
  telegram: "#E0F2FE",
  instagram: "#FFE4EE",
  phone: "#FEF3C7",
  contact: "#FEF3C7",
  location: "#EDE9FE",
  shop: "#FFE4EE",
};

const INFO_ICONS: Record<CakeInfoCard["icon"], typeof TruckIcon> = {
  delivery: TruckIcon,
  clock: ClockIcon,
  payment: CreditCardIcon,
  location: MapPinIcon,
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function externalProps(url: string) {
  return url.startsWith("tel:") ? {} : { target: "_blank", rel: "noopener noreferrer" };
}

/** wa.me links get a ready-made message; anything else is used as-is. */
function orderHref(order: NonNullable<CakeContent["order"]>, cakeName?: string) {
  if (!/^https:\/\/wa\.me\//.test(order.url)) return order.url;
  const message = cakeName
    ? (order.cakeMessage ?? "Здравствуйте! Хочу заказать торт «{cake}».").replace("{cake}", cakeName)
    : (order.message ?? "Здравствуйте! Хочу заказать торт.");
  return `${order.url}${order.url.includes("?") ? "&" : "?"}text=${encodeURIComponent(message)}`;
}

function SectionHeader({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`mb-5 lg:mb-8 ${className}`}>
      <h2 className="text-2xl font-extrabold tracking-tight text-balance lg:text-4xl">{title}</h2>
      {subtitle && <p className="mt-1.5 text-sm text-(--tpl-ink)/70 lg:text-base">{subtitle}</p>}
    </div>
  );
}

function Stars({ value = 5 }: { value?: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${value} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`size-4 ${i < value ? "text-(--tpl-gold)" : "text-black/15"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function CategoryTile({ category }: { category: CakeCategory }) {
  const palette = CAKE_PALETTES[category.style.tone];
  return (
    <li
      className="flex flex-col items-center rounded-3xl px-2 pt-3 pb-4 text-center ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 lg:px-3 lg:pt-4"
      style={{ background: `linear-gradient(180deg, ${palette.tint}, #fff)` }}
    >
      <CakeArt style={category.style} className="h-20 w-full lg:h-28" />
      <div className="mt-2 text-sm leading-tight font-bold lg:text-base">{category.title}</div>
      {category.meta && (
        <div className="mt-0.5 text-xs text-(--tpl-ink)/65 lg:text-sm">{category.meta}</div>
      )}
    </li>
  );
}

function CakeCard({
  cake,
  orderUrl,
  orderLabel,
}: {
  cake: CakeItem;
  orderUrl?: string;
  orderLabel: string;
}) {
  const palette = CAKE_PALETTES[cake.style.tone];
  return (
    <article className="flex h-full w-56 flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 lg:w-64">
      <div
        className="relative aspect-[5/4] w-full overflow-hidden"
        style={{ background: `radial-gradient(120% 90% at 50% 100%, ${palette.tint}, #fff)` }}
      >
        {cake.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cake.photoUrl}
            alt={cake.name}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover"
          />
        ) : (
          <CakeArt style={cake.style} className="absolute inset-x-0 bottom-0 h-[92%] w-full" />
        )}
        {cake.tag && (
          <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-(--tpl-primary) shadow-sm">
            {cake.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base leading-snug font-extrabold">{cake.name}</h3>
        {cake.description && (
          <p className="mt-1 text-sm leading-snug text-(--tpl-ink)/70">{cake.description}</p>
        )}
        {cake.size && <p className="mt-2 text-xs font-medium text-(--tpl-ink)/60">{cake.size}</p>}

        <div className="mt-auto pt-4">
          {cake.price && (
            <div className="mb-3 text-base leading-tight font-extrabold text-(--tpl-primary)">
              {cake.price}
            </div>
          )}
          {orderUrl && (
            <a
              href={orderUrl}
              {...externalProps(orderUrl)}
              aria-label={`${orderLabel}: ${cake.name}`}
              className={`flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full bg-(--tpl-primary) px-4 text-sm font-bold text-white transition-[transform,filter] duration-200 hover:brightness-110 active:scale-95 ${FOCUS_RING}`}
            >
              {orderLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ReviewCard({ review }: { review: CakeReview }) {
  return (
    <figure className="flex h-full w-72 flex-col rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 lg:w-80">
      <Stars value={review.rating ?? 5} />
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-(--tpl-ink)/85">
        «{review.text}»
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-(--tpl-primary)/10 text-sm font-extrabold text-(--tpl-primary)"
          aria-hidden="true"
        >
          {initials(review.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold">{review.name}</span>
          {review.source && (
            <span className="block truncate text-xs text-(--tpl-ink)/60">{review.source}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

function FlavorChip({ flavor }: { flavor: CakeFlavor }) {
  const palette = CAKE_PALETTES[flavor.tone];
  return (
    <li className="inline-flex items-center gap-2.5 rounded-full bg-white py-2 pr-4 pl-2.5 text-sm font-semibold ring-1 ring-black/10 lg:text-[15px]">
      <span
        className="size-5 shrink-0 rounded-full ring-2 ring-white"
        style={{
          background: `linear-gradient(135deg, ${palette.light}, ${palette.frost} 55%, ${palette.deep})`,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
        }}
        aria-hidden="true"
      />
      {flavor.name}
    </li>
  );
}

function StepItem({ step, index }: { step: CakeStep; index: number }) {
  return (
    <li className="group relative flex gap-4 pb-8 last:pb-0 lg:flex-col lg:gap-5 lg:pb-0">
      <span
        className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-(--tpl-primary) text-lg font-extrabold text-white shadow-[0_8px_18px_-8px_var(--tpl-primary)] ring-4 ring-white"
        aria-hidden="true"
      >
        {index + 1}
      </span>
      {/* connectors: vertical on phones, horizontal on desktop */}
      <span
        className="absolute top-12 bottom-0 left-6 w-px bg-(--tpl-primary)/25 group-last:hidden lg:top-6 lg:right-[-1.5rem] lg:bottom-auto lg:left-14 lg:h-px lg:w-auto"
        aria-hidden="true"
      />
      <div className="min-w-0 pt-1 lg:pt-0">
        <h3 className="text-lg font-extrabold">{step.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-(--tpl-ink)/70 lg:text-[15px]">{step.text}</p>
      </div>
    </li>
  );
}

function InfoCard({ card }: { card: CakeInfoCard }) {
  const Icon = INFO_ICONS[card.icon];
  return (
    <li className="rounded-3xl bg-white p-5 ring-1 ring-black/5">
      <span className="flex size-11 items-center justify-center rounded-2xl bg-(--tpl-primary)/10 text-(--tpl-primary)">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-extrabold">{card.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-(--tpl-ink)/70">{card.text}</p>
    </li>
  );
}

function FaqItem({ item }: { item: CakeFaq }) {
  return (
    <details className="group rounded-2xl bg-white ring-1 ring-black/5 open:shadow-sm">
      <summary
        className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3 text-[15px] font-bold marker:hidden [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}
      >
        {item.q}
        <ChevronDownIcon
          className="size-5 shrink-0 text-(--tpl-primary) transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <p className="px-5 pb-5 text-sm leading-relaxed text-(--tpl-ink)/75">{item.a}</p>
    </details>
  );
}

function QuickLink({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      {...externalProps(link.url)}
      className={`group flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl bg-white px-3 py-2.5 text-left ring-1 ring-black/5 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] ${FOCUS_RING}`}
    >
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-xl text-(--tpl-primary)"
        style={{ backgroundColor: LINK_TINT[link.type] ?? "#FFE4EE" }}
      >
        <LinkIcon type={link.type} className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm leading-tight font-bold">{link.label}</span>
        {link.description && (
          <span className="mt-0.5 block truncate text-xs text-(--tpl-ink)/65">
            {link.description}
          </span>
        )}
      </span>
    </a>
  );
}

export default function CakeProfile({ site }: { site: SiteConfig }) {
  const cake = site.cake ?? {};
  const theme = site.theme ?? {};
  const primary = theme.accent ?? "#BE123C";
  const gold = theme.secondaryAccent ?? "#CA8A04";
  const ink = theme.textColor ?? "#18181B";
  const background = theme.background ?? "linear-gradient(180deg,#fdf3f4 0%,#ffffff 60%)";
  const labels = { ...DEFAULT_LABELS, ...cake.labels };

  const order = cake.order;
  const stats = cake.stats ?? [];
  const badges = cake.badges ?? [];
  const categories = cake.categories ?? [];
  const cakes = cake.cakes ?? [];
  const flavors = cake.flavors ?? [];
  const steps = cake.steps ?? [];
  const reviews = cake.reviews ?? [];
  const info = cake.info ?? [];
  const faq = cake.faq ?? [];
  const callLink = site.links.find((link) => link.type === "phone");
  const heroCake = cake.heroCake ?? { tone: "rose", tiers: 3, topper: "flowers", pearls: true };
  const carouselLabels = {
    pause: labels.carouselPause,
    play: labels.carouselPlay,
    prev: labels.carouselPrev,
    next: labels.carouselNext,
  };

  const rootStyle = {
    background,
    color: ink,
    ["--tpl-primary" as string]: primary,
    ["--tpl-gold" as string]: gold,
    ["--tpl-ink" as string]: ink,
  } as CSSProperties;

  const orderClass = `inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-(--tpl-primary) px-7 text-base font-bold text-white shadow-[0_14px_26px_-12px_var(--tpl-primary)] transition-[transform,filter] duration-200 hover:brightness-110 active:scale-[0.98] lg:w-auto ${FOCUS_RING}`;
  const ghostClass = `min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-6 text-base font-bold text-(--tpl-ink) ring-1 ring-black/15 transition-[transform,background-color] duration-200 hover:bg-black/[0.03] active:scale-[0.98] ${FOCUS_RING}`;

  return (
    <main
      className="relative isolate min-h-dvh overflow-x-clip pb-28 lg:pb-0"
      style={rootStyle}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-36 left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-(--tpl-primary) opacity-[0.11] blur-3xl lg:left-[72%]" />
        <div className="absolute top-52 -left-28 size-[380px] rounded-full bg-(--tpl-gold) opacity-[0.10] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-md px-4 pt-10 lg:max-w-6xl lg:px-8 lg:pt-16">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <header className="grid gap-9 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div
              className="linkhub-enter flex size-24 items-center justify-center overflow-hidden rounded-full bg-(--tpl-primary) text-4xl font-extrabold text-white shadow-lg ring-4 ring-white lg:size-28"
              style={{ animationDelay: "0ms" }}
            >
              {site.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={site.avatarUrl}
                  alt={site.name}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                initials(site.name) || "?"
              )}
            </div>

            <h1
              className="linkhub-enter mt-5 text-3xl font-extrabold tracking-tight text-balance lg:text-6xl lg:leading-[1.05]"
              style={{ animationDelay: "70ms" }}
            >
              {site.name}
            </h1>
            {site.bio && (
              <p
                className="linkhub-enter mt-3 max-w-prose text-base text-balance text-(--tpl-ink)/75 lg:mt-5 lg:text-xl"
                style={{ animationDelay: "130ms" }}
              >
                {site.bio}
              </p>
            )}

            {badges.length > 0 && (
              <ul
                className="linkhub-enter mt-5 flex flex-wrap justify-center gap-2 lg:justify-start"
                style={{ animationDelay: "170ms" }}
              >
                {badges.map((badge) => (
                  <li
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold ring-1 ring-black/5 lg:text-sm"
                  >
                    <SparklesIcon className="size-4 text-(--tpl-gold)" aria-hidden="true" />
                    {badge}
                  </li>
                ))}
              </ul>
            )}

            {order && (
              <div
                className="linkhub-enter mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:mt-8 lg:w-auto lg:justify-start"
                style={{ animationDelay: "210ms" }}
              >
                <a href={orderHref(order)} {...externalProps(order.url)} className={orderClass}>
                  <LinkIcon type="order" className="size-5" />
                  {order.label}
                </a>
                {callLink && (
                  <a href={callLink.url} className={`${ghostClass} hidden lg:inline-flex`}>
                    <LinkIcon type="phone" className="size-5" />
                    {callLink.description ?? callLink.label}
                  </a>
                )}
              </div>
            )}

            {site.links.length > 0 && (
              <nav
                aria-label={labels.contactsNav}
                className="linkhub-enter mt-5 w-full lg:mt-6 lg:max-w-xl"
                style={{ animationDelay: "250ms" }}
              >
                <ul className="grid grid-cols-2 gap-2.5">
                  {site.links.map((link) => (
                    <li key={link.id} className="odd:last:col-span-2">
                      <QuickLink link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* Desktop showcase: photo if given, otherwise the drawn cake */}
          <div
            className="linkhub-enter relative hidden lg:block"
            style={{ animationDelay: "160ms" }}
            aria-hidden={cake.heroImageUrl ? undefined : "true"}
          >
            <div className="relative mx-auto aspect-[5/6] w-full max-w-[30rem] overflow-hidden rounded-[2.75rem] bg-white/70 shadow-[0_30px_70px_-30px_var(--tpl-primary)] ring-1 ring-black/5">
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(90% 70% at 50% 100%, ${CAKE_PALETTES[heroCake.tone].tint}, transparent 70%), radial-gradient(60% 40% at 80% 10%, ${gold}22, transparent)`,
                }}
              />
              {cake.heroImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cake.heroImageUrl}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <CakeArt style={heroCake} className="absolute inset-x-6 bottom-8 h-[86%] w-[calc(100%-3rem)]" />
              )}
            </div>
            {stats.length > 0 && (
              <dl className="absolute -bottom-6 left-1/2 flex w-[calc(100%-2rem)] max-w-[32rem] -translate-x-1/2 divide-x divide-black/10 rounded-3xl bg-white px-2 py-4 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex flex-1 flex-col-reverse items-center px-3 text-center">
                    <dt className="mt-0.5 text-xs leading-tight text-(--tpl-ink)/65">{stat.label}</dt>
                    <dd className="text-2xl font-extrabold text-(--tpl-primary) tabular-nums">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* Phone stats */}
          {stats.length > 0 && (
            <dl
              className="linkhub-enter grid grid-cols-3 gap-2.5 lg:hidden"
              style={{ animationDelay: "290ms" }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col-reverse justify-end rounded-2xl bg-white/85 px-2 py-3 text-center ring-1 ring-black/5"
                >
                  <dt className="mt-0.5 text-xs leading-tight text-(--tpl-ink)/70">{stat.label}</dt>
                  <dd className="text-2xl font-extrabold text-(--tpl-primary) tabular-nums">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        <div className="mt-14 space-y-16 lg:mt-28 lg:space-y-28">
          {categories.length > 0 && (
            <section aria-label={cake.categoriesTitle}>
              {cake.categoriesTitle && <SectionHeader title={cake.categoriesTitle} />}
              <ul className="grid grid-cols-3 gap-2.5 lg:grid-cols-6 lg:gap-4">
                {categories.map((category) => (
                  <CategoryTile key={category.id} category={category} />
                ))}
              </ul>
            </section>
          )}

          {cakes.length > 0 && (
            <HubCarousel
              title={cake.cakesTitle ?? "Хиты"}
              subtitle={cake.cakesSubtitle}
              label={cake.cakesTitle ?? "Торты"}
              speed={24}
              labels={carouselLabels}
            >
              {cakes.map((item) => (
                <CakeCard
                  key={item.id}
                  cake={item}
                  orderLabel={labels.orderCake}
                  orderUrl={order ? orderHref(order, item.name) : undefined}
                />
              ))}
            </HubCarousel>
          )}

          {flavors.length > 0 && (
            <section
              aria-label={cake.flavorsTitle}
              className="rounded-[2rem] bg-white/70 p-6 ring-1 ring-black/5 lg:p-12"
            >
              <SectionHeader
                title={cake.flavorsTitle ?? "Начинки"}
                subtitle={cake.flavorsSubtitle}
              />
              <ul className="flex flex-wrap gap-2.5 lg:gap-3">
                {flavors.map((flavor) => (
                  <FlavorChip key={flavor.id} flavor={flavor} />
                ))}
              </ul>
            </section>
          )}

          {steps.length > 0 && (
            <section aria-label={cake.stepsTitle}>
              <SectionHeader title={cake.stepsTitle ?? "Как заказать"} />
              <ol className={`grid gap-0 lg:gap-8 ${steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
                {steps.map((step, i) => (
                  <StepItem key={step.id} step={step} index={i} />
                ))}
              </ol>
            </section>
          )}

          {reviews.length > 0 && (
            <HubCarousel
              title={cake.reviewsTitle ?? "Отзывы"}
              subtitle={cake.reviewsSubtitle}
              label={cake.reviewsTitle ?? "Отзывы"}
              speed={20}
              labels={carouselLabels}
            >
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </HubCarousel>
          )}

          {info.length > 0 && (
            <section aria-label={cake.infoTitle}>
              <SectionHeader title={cake.infoTitle ?? "Доставка и оплата"} />
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                {info.map((card) => (
                  <InfoCard key={card.id} card={card} />
                ))}
              </ul>
            </section>
          )}

          {faq.length > 0 && (
            <section
              aria-label={cake.faqTitle}
              className="lg:grid lg:grid-cols-[1fr_1.6fr] lg:gap-14"
            >
              <SectionHeader title={cake.faqTitle ?? "Частые вопросы"} className="lg:sticky lg:top-8 lg:self-start" />
              <div className="space-y-3">
                {faq.map((item) => (
                  <FaqItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {order && (
            <section
              aria-label={cake.closingTitle}
              className="relative overflow-hidden rounded-[2rem] bg-(--tpl-primary) px-6 py-10 text-white lg:px-14 lg:py-14"
              style={{
                backgroundImage:
                  "radial-gradient(90% 120% at 100% 0%, rgba(255,255,255,0.18), transparent 60%)",
              }}
            >
              <div className="relative z-10 max-w-lg">
                <h2 className="text-2xl font-extrabold tracking-tight text-balance lg:text-4xl">
                  {cake.closingTitle ?? order.label}
                </h2>
                {cake.closingText && (
                  <p className="mt-3 text-base text-white/85 lg:text-lg">{cake.closingText}</p>
                )}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={orderHref(order)}
                    {...externalProps(order.url)}
                    className={`inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-7 text-base font-bold text-(--tpl-primary) shadow-lg transition-[transform,filter] duration-200 hover:brightness-95 active:scale-[0.98] ${FOCUS_RING}`}
                  >
                    <LinkIcon type="order" className="size-5" />
                    {order.label}
                  </a>
                  {callLink && (
                    <a
                      href={callLink.url}
                      className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl px-6 text-base font-bold text-white ring-1 ring-white/50 transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <LinkIcon type="phone" className="size-5" />
                      {callLink.description ?? labels.callUs}
                    </a>
                  )}
                </div>
              </div>
              <CakeArt
                style={{ tone: "cream", tiers: 2, topper: "berries", pearls: true }}
                className="pointer-events-none absolute -right-6 -bottom-6 hidden h-[115%] w-72 opacity-95 lg:block"
              />
            </section>
          )}
        </div>

        {!site.hideBranding && (
          <footer className="mt-14 pb-8 text-center text-xs text-(--tpl-ink)/60 lg:mt-24 lg:pb-12">
            {labels.createdWith} <span className="font-semibold">ownlink.uz</span>
          </footer>
        )}
      </div>

      {order && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-md gap-3">
            {callLink && (
              <a
                href={callLink.url}
                aria-label={callLink.description ? `${labels.callAria}: ${callLink.description}` : labels.callAria}
                className={`flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-white text-(--tpl-primary) ring-1 ring-black/15 transition-transform duration-200 active:scale-95 ${FOCUS_RING}`}
              >
                <LinkIcon type="phone" className="size-6" />
              </a>
            )}
            <a href={orderHref(order)} {...externalProps(order.url)} className={orderClass}>
              <LinkIcon type="order" className="size-5" />
              {order.label}
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
