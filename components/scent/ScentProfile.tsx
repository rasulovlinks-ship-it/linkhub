import type { CSSProperties, ReactNode } from "react";
import { Onest } from "next/font/google";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import type {
  BiText,
  ScentContent,
  SiteConfig,
} from "@/lib/types";
import { LinkIcon } from "@/components/icons";
import LangToggle from "@/components/LangToggle";
import { langInitScript } from "@/lib/siteLang";
import Bi, { biString, type Langs } from "@/components/luxe/Bi";
import ScentMotion from "./ScentMotion";
import ScentShelf from "./ScentShelf";
import { fetchStarred } from "@/lib/scentShop";
import styles from "./ScentProfile.module.css";

const sans = Onest({ variable: "--sc-sans", subsets: ["latin", "cyrillic"] });

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--sc-accent)";

const CREATED_WITH: BiText = {
  uz: "ownlink.uz orqali yaratilgan",
  ru: "Сделано на ownlink.uz",
};

/** "Mashhur atirlar *10 ml* dan" → the starred part in the accent colour */
function emphasise(text: string) {
  return text.split("*").map((part, i) =>
    i % 2 ? (
      <span key={i} className="text-(--sc-accent)">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function BiRich({ t, langs }: { t: BiText; langs: Langs }) {
  const primary = biString(t, langs);
  const alt = biString(t, langs, true);
  if (!langs.alt || alt === primary) return <>{emphasise(primary)}</>;
  return (
    <>
      <span data-l="primary">{emphasise(primary)}</span>
      <span data-l="alt">{emphasise(alt)}</span>
    </>
  );
}

function SectionHead({
  title,
  text,
  action,
  langs,
}: {
  title?: BiText;
  text?: BiText;
  action?: ReactNode;
  langs: Langs;
}) {
  return (
    <div
      className={`${styles.rv} flex flex-wrap items-end justify-between gap-x-8 gap-y-3`}
    >
      <div className="max-w-2xl">
        <h2 className="text-[1.85rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[2.6rem]">
          <BiRich t={title ?? {}} langs={langs} />
        </h2>
        {text && (
          <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-(--sc-muted) sm:text-base">
            <Bi t={text} langs={langs} />
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function ShopButton({
  scent,
  langs,
  className = "",
}: {
  scent: ScentContent;
  langs: Langs;
  className?: string;
}) {
  return (
    <a
      href={scent.shop.url}
      className={`group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-(--sc-accent) px-7 text-[15px] font-semibold text-(--sc-accent-text) shadow-[0_16px_32px_-16px_var(--sc-accent)] transition-[transform,filter] duration-200 hover:brightness-105 active:scale-[0.98] ${FOCUS} ${className}`}
    >
      <ShoppingBagIcon className="size-5 shrink-0" aria-hidden />
      <span className="whitespace-nowrap">
        <Bi t={scent.shop.label} langs={langs} />
      </span>
      <ArrowRightIcon
        className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden
      />
    </a>
  );
}

export default async function ScentProfile({ site }: { site: SiteConfig }) {
  const scent = site.scent!;
  // the shop's starred products as they are at build time; ScentShelf refreshes them on every visit
  const shelf = (scent.shelfSource && (await fetchStarred(scent.shelfSource))) || scent.shelf;
  const theme = site.theme ?? {};
  const langs: Langs = {
    primary: site.lang ?? "ru",
    alt: site.translation?.lang,
  };
  const accent = theme.accent ?? "#e0428d";
  const vars = {
    "--sc-accent": accent,
    "--sc-accent-text": theme.accentText ?? "#ffffff",
  } as CSSProperties;
  const [left, middle, right] = scent.heroProducts;
  const visit = scent.visit;

  return (
    <div
      className={`${sans.variable} ${styles.page} flex-1`}
      style={vars}
      suppressHydrationWarning
    >
      {/* Arms the scroll reveal before first paint */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            'document.currentScript.parentElement.setAttribute("data-rv","")',
        }}
      />
      <ScentMotion />
      {langs.alt && (
        <script
          dangerouslySetInnerHTML={{
            __html: langInitScript(site.slug, langs.alt),
          }}
        />
      )}

      <main className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4 pt-4 sm:pt-6">
          <a
            href={scent.shop.url}
            className={`flex items-center gap-3 rounded-full ${FOCUS}`}
          >
            {site.avatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={site.avatarUrl}
                alt=""
                className="size-10 rounded-full bg-white object-cover ring-1 ring-(--sc-line)"
              />
            )}
            <span className="leading-tight">
              <span className="block text-[17px] font-semibold tracking-[-0.02em]">
                {site.name}
              </span>
              <span className="block text-xs text-(--sc-muted)">
                {scent.links[0]?.handle}
              </span>
            </span>
          </a>
          {langs.alt && (
            <LangToggle
              slug={site.slug}
              primary={langs.primary}
              alt={langs.alt}
              accent={accent}
              accentText={theme.accentText ?? "#ffffff"}
            />
          )}
        </header>

        {/* Hero */}
        <section className="grid items-center gap-9 pt-9 sm:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-16">
          <div>
            <p
              className={`${styles.enter} flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] text-(--sc-accent-ink) uppercase`}
            >
              <span
                className="size-1.5 rounded-full bg-(--sc-accent)"
                aria-hidden
              />
              <Bi t={scent.kicker} langs={langs} />
            </p>
            <h1
              className={`${styles.enter} mt-4 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-[4.1rem]`}
              style={{ animationDelay: "70ms" }}
            >
              <BiRich t={scent.title} langs={langs} />
            </h1>
            <p
              className={`${styles.enter} mt-5 max-w-[44ch] text-[16px] leading-relaxed text-(--sc-muted) sm:text-lg`}
              style={{ animationDelay: "140ms" }}
            >
              <Bi t={scent.tagline} langs={langs} />
            </p>

            <div
              id="sc-cta"
              className={`${styles.enter} mt-7 flex flex-col gap-2.5 sm:flex-row`}
              style={{ animationDelay: "210ms" }}
            >
              <ShopButton scent={scent} langs={langs} />
              <a
                href={scent.order.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-(--sc-surface) px-7 text-[15px] font-semibold ring-1 ring-(--sc-line) transition-[transform,background-color] duration-200 hover:bg-white/60 active:scale-[0.98] ${FOCUS}`}
              >
                <LinkIcon
                  type="telegram"
                  className="size-5 shrink-0 text-[#229ed9]"
                />
                <span className="whitespace-nowrap">
                  <Bi t={scent.order.label} langs={langs} />
                </span>
              </a>
            </div>

            {scent.facts && (
              <dl
                className={`${styles.enter} mt-9 grid grid-cols-[0.85fr_1.2fr_1fr] divide-x divide-(--sc-line) border-t border-(--sc-line) pt-5`}
                style={{ animationDelay: "280ms" }}
              >
                {scent.facts.map((f) => (
                  <div
                    key={f.id}
                    className="px-2.5 first:pl-0 last:pr-0 sm:px-4"
                  >
                    <dt className="sr-only">
                      <Bi t={f.label} langs={langs} />
                    </dt>
                    <dd className="text-base leading-tight font-semibold tracking-[-0.02em] whitespace-nowrap tabular-nums sm:text-xl">
                      <Bi t={f.value} langs={langs} />
                    </dd>
                    <dd
                      className="mt-1 text-[12px] leading-snug text-(--sc-muted) sm:text-[13px]"
                      aria-hidden
                    >
                      <Bi t={f.label} langs={langs} />
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* Three bottles on a tinted stage */}
          <div
            className={`${styles.enter} relative aspect-[6/5] overflow-hidden rounded-[32px] bg-(--sc-tint) lg:aspect-square`}
            style={{ animationDelay: "120ms" }}
          >
            <div
              className="absolute inset-x-[12%] top-[14%] bottom-[8%] rounded-full bg-white/70 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[22%] bg-(--sc-tint-2)"
              aria-hidden
            />
            {left && (
              <a
                href={left.url}
                className={`${styles.blend} absolute bottom-[7%] -left-[2%] w-[46%] ${FOCUS} rounded-3xl`}
                aria-label={biString(left.name, langs)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={left.photoUrl}
                  alt=""
                  className={`${styles.float} w-full`}
                  style={
                    {
                      "--sc-rot": "-7deg",
                      animationDelay: "-2s",
                    } as CSSProperties
                  }
                />
              </a>
            )}
            {right && (
              <a
                href={right.url}
                className={`${styles.blend} absolute -right-[2%] bottom-[8%] w-[46%] ${FOCUS} rounded-3xl`}
                aria-label={biString(right.name, langs)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={right.photoUrl}
                  alt=""
                  className={`${styles.float} w-full`}
                  style={
                    {
                      "--sc-rot": "6deg",
                      animationDelay: "-4s",
                    } as CSSProperties
                  }
                />
              </a>
            )}
            {middle && (
              <a
                href={middle.url}
                className={`${styles.blend} absolute bottom-[3%] left-[20%] w-[60%] ${FOCUS} rounded-3xl`}
                aria-label={biString(middle.name, langs)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={middle.photoUrl}
                  alt=""
                  fetchPriority="high"
                  className={`${styles.float} w-full`}
                />
              </a>
            )}
            <div className="absolute top-4 left-4 flex flex-col items-start gap-2 sm:top-5 sm:left-5">
              {scent.heroBadges?.[0] && (
                <span className="rounded-full bg-white/90 px-3.5 py-2 text-[13px] font-semibold shadow-[0_10px_24px_-12px_rgb(20_20_22/0.35)] backdrop-blur">
                  <Bi t={scent.heroBadges[0]} langs={langs} />
                </span>
              )}
              {scent.heroBadges?.[1] && (
                <span className="flex items-center gap-1.5 rounded-full bg-(--sc-ink) px-3.5 py-2 text-[13px] font-semibold text-white">
                  <span
                    className="size-1.5 rounded-full bg-(--sc-accent)"
                    aria-hidden
                  />
                  <Bi t={scent.heroBadges[1]} langs={langs} />
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Links */}
        <section
          className="mt-16 sm:mt-20"
          aria-label={biString(scent.linksTitle, langs) || undefined}
        >
          {scent.linksTitle && (
            <h2
              className={`${styles.rv} mb-4 text-[13px] font-semibold tracking-[0.14em] text-(--sc-muted) uppercase`}
            >
              <Bi t={scent.linksTitle} langs={langs} />
            </h2>
          )}
          <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
            {scent.links.map((l) => (
              <li key={l.id} className={styles.rv}>
                <a
                  href={l.url}
                  target={l.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`group relative flex h-full flex-col items-start gap-3 rounded-2xl bg-(--sc-surface) p-4 ring-1 ring-(--sc-line) transition-[box-shadow,transform] duration-200 hover:shadow-[0_14px_30px_-18px_rgb(20_20_22/0.35)] active:scale-[0.98] sm:flex-row sm:items-center ${FOCUS}`}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-(--sc-tint) text-(--sc-accent-ink) sm:size-11">
                    <LinkIcon type={l.type} className="size-5" />
                  </span>
                  <span className="w-full min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold">
                      <Bi t={l.label} langs={langs} />
                    </span>
                    {l.handle && (
                      <span className="block truncate text-[12.5px] text-(--sc-muted)">
                        {l.handle}
                      </span>
                    )}
                  </span>
                  <ArrowUpRightIcon
                    className="absolute top-4 right-4 size-4 shrink-0 text-(--sc-muted) transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:static"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Shelf: the shop's starred products */}
        <section className="mt-20 sm:mt-28">
          <SectionHead
            title={scent.shelfTitle}
            text={scent.shelfText}
            langs={langs}
            action={
              scent.shelfMore && (
                <a
                  href={scent.shelfMore.url}
                  className={`group inline-flex items-center gap-1.5 text-[15px] font-semibold text-(--sc-accent-ink) ${FOCUS} rounded-full`}
                >
                  <Bi t={scent.shelfMore.label} langs={langs} />
                  <ArrowRightIcon
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              )
            }
          />
          <div className={styles.rv}>
            <ScentShelf initial={shelf} source={scent.shelfSource} langs={langs} />
          </div>
        </section>

        {/* Categories */}
        {scent.categories && (
          <section className="mt-20 sm:mt-28">
            <SectionHead title={scent.categoriesTitle} langs={langs} />
            <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3.5">
              {scent.categories.map((c) => (
                <li key={c.id} className={styles.rv}>
                  <a
                    href={c.url}
                    className={`group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-(--sc-tint) ${FOCUS}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.photoUrl}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent"
                      aria-hidden
                    />
                    <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 text-white">
                      <span className="text-[16px] leading-tight font-semibold tracking-[-0.01em] sm:text-lg">
                        <Bi t={c.title} langs={langs} />
                      </span>
                      <ArrowUpRightIcon
                        className="size-4 shrink-0 opacity-80"
                        aria-hidden
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      {/* In the store: a dark band with an endless photo strip */}
      {scent.storePhotos && (
        <section className="overflow-hidden bg-(--sc-ink) py-16 text-white sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className={styles.rv}>
              <h2 className="text-[1.85rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[2.6rem]">
                <BiRich t={scent.storeTitle ?? {}} langs={langs} />
              </h2>
              {scent.storeText && (
                <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-white/65 sm:text-base">
                  <Bi t={scent.storeText} langs={langs} />
                </p>
              )}
            </div>
            {scent.storeLink && (
              <a
                href={scent.storeLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.rv} inline-flex min-h-12 items-center gap-2.5 self-start rounded-full bg-white px-6 text-[15px] font-semibold text-(--sc-ink) transition-transform duration-200 active:scale-[0.98] lg:self-end ${FOCUS}`}
              >
                <LinkIcon type="instagram" className="size-5" />
                <Bi t={scent.storeLink.label} langs={langs} />
              </a>
            )}
          </div>
          <div className={`${styles.marqueeWrap} mt-10`}>
            <div className={styles.marquee}>
              {[...scent.storePhotos, ...scent.storePhotos].map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt=""
                  loading="lazy"
                  aria-hidden={i >= scent.storePhotos!.length || undefined}
                  className="mr-3 aspect-[4/5] w-40 shrink-0 rounded-2xl object-cover sm:mr-4 sm:w-56"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-5 pb-32 sm:px-8 lg:pb-20">
        {/* How to order */}
        {scent.steps && (
          <section className="mt-20 grid gap-10 sm:mt-28 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div>
              <SectionHead title={scent.stepsTitle} langs={langs} />
              <ol className="mt-8 divide-y divide-(--sc-line) border-y border-(--sc-line)">
                {scent.steps.map((s, i) => (
                  <li key={s.id} className={`${styles.rv} flex gap-5 py-5`}>
                    <span className="w-9 shrink-0 text-[15px] font-semibold text-(--sc-accent-ink) tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[17px] font-semibold tracking-[-0.01em]">
                        <Bi t={s.title} langs={langs} />
                      </span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-(--sc-muted)">
                        <Bi t={s.text} langs={langs} />
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            {scent.payments && (
              <div
                className={`${styles.rv} self-end rounded-[28px] bg-(--sc-tint) p-6 sm:p-8`}
              >
                <h3 className="text-xl font-semibold tracking-[-0.02em]">
                  <Bi t={scent.payTitle} langs={langs} />
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {scent.payments.map((p, i) => (
                    <li
                      key={i}
                      className="rounded-full bg-white px-4 py-2.5 text-[14px] font-medium ring-1 ring-(--sc-line)"
                    >
                      <Bi t={p} langs={langs} />
                    </li>
                  ))}
                </ul>
                <ShopButton
                  scent={scent}
                  langs={langs}
                  className="mt-7 w-full"
                />
              </div>
            )}
          </section>
        )}

        {/* Visit */}
        {visit && (
          <section
            className={`${styles.rv} mt-20 rounded-[32px] bg-(--sc-surface) p-6 ring-1 ring-(--sc-line) sm:mt-28 sm:p-10`}
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <h2 className="text-[1.85rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[2.6rem]">
                  <BiRich t={visit.title} langs={langs} />
                </h2>
                <p className="mt-5 flex gap-3 text-[15px] leading-relaxed sm:text-base">
                  <MapPinIcon
                    className="mt-0.5 size-5 shrink-0 text-(--sc-accent-ink)"
                    aria-hidden
                  />
                  <Bi t={visit.address} langs={langs} />
                </p>
                <p className="mt-3 flex gap-3 text-[15px] leading-relaxed sm:text-base">
                  <ClockIcon
                    className="mt-0.5 size-5 shrink-0 text-(--sc-accent-ink)"
                    aria-hidden
                  />
                  <Bi t={visit.hours} langs={langs} />
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                <a
                  href={visit.phone.url}
                  className={`text-[1.9rem] font-semibold tracking-[-0.03em] tabular-nums transition-colors hover:text-(--sc-accent-ink) sm:text-[2.3rem] ${FOCUS} self-start rounded-lg`}
                >
                  {visit.phone.display}
                </a>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  <a
                    href={visit.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-(--sc-ink) px-5 text-[15px] font-semibold text-white transition-transform duration-200 active:scale-[0.98] ${FOCUS}`}
                  >
                    <MapPinIcon className="size-5" aria-hidden />
                    <Bi t={visit.mapLabel} langs={langs} />
                  </a>
                  <a
                    href={visit.phone.url}
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold ring-1 ring-(--sc-line) transition-transform duration-200 hover:bg-(--sc-bg) active:scale-[0.98] ${FOCUS}`}
                  >
                    <PhoneIcon className="size-5" aria-hidden />
                    <Bi t={visit.phone.label} langs={langs} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        <footer className="mt-16 flex flex-col items-center gap-3 text-center">
          {site.avatarUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={site.avatarUrl}
              alt=""
              className="size-12 rounded-full bg-white ring-1 ring-(--sc-line)"
            />
          )}
          <p className="text-[15px] font-semibold">{site.name}</p>
          {!site.hideBranding && (
            <a
              href="https://ownlink.uz"
              className={`text-[12px] text-(--sc-muted) hover:text-(--sc-ink) ${FOCUS} rounded`}
            >
              <Bi t={CREATED_WITH} langs={langs} />
            </a>
          )}
        </footer>
      </div>

      {/* Phone bottom bar */}
      <div
        className={`${styles.dock} fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden`}
      >
        <div className="mx-auto flex max-w-md items-center gap-2 rounded-full bg-white/85 p-1.5 shadow-[0_18px_40px_-14px_rgb(20_20_22/0.45)] ring-1 ring-(--sc-line) backdrop-blur-md">
          <ShopButton
            scent={scent}
            langs={langs}
            className="min-h-12! flex-1 px-4! text-sm!"
          />
          <a
            href={scent.order.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`grid size-12 shrink-0 place-items-center rounded-full bg-(--sc-tint) ${FOCUS}`}
          >
            <LinkIcon type="telegram" className="size-5 text-[#229ed9]" />
            <span className="sr-only">
              <Bi t={scent.order.label} langs={langs} />
            </span>
          </a>
          {visit && (
            <a
              href={visit.phone.url}
              className={`grid size-12 shrink-0 place-items-center rounded-full bg-(--sc-tint) text-(--sc-accent-ink) ${FOCUS}`}
            >
              <PhoneIcon className="size-5" aria-hidden />
              <span className="sr-only">
                <Bi t={visit.phone.label} langs={langs} />
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
