import type { CSSProperties, ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { ArrowUpRightIcon, CheckIcon, PhoneIcon } from "@heroicons/react/24/outline";
import type { BiText, LuxeContent, SiteConfig } from "@/lib/types";
import { LinkIcon } from "@/components/icons";
import LangToggle from "@/components/LangToggle";
import { langInitScript } from "@/lib/siteLang";
import Bi, { biString, type Langs } from "./Bi";
import LuxeCollection from "./LuxeCollection";
import LuxeReveal from "./LuxeReveal";
import styles from "./LuxeProfile.module.css";

const serif = Cormorant_Garamond({
  variable: "--lx-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Manrope({
  variable: "--lx-sans",
  subsets: ["latin", "cyrillic"],
});

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lx-gold)";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const CREATED_WITH: BiText = { uz: "ownlink.uz orqali yaratilgan", ru: "Сделано на ownlink.uz" };

function Diamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 12" className={className} aria-hidden>
      <path d="M14 1.5 18.5 6 14 10.5 9.5 6Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="3" cy="6" r="1.1" fill="currentColor" />
      <circle cx="25" cy="6" r="1.1" fill="currentColor" />
    </svg>
  );
}

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-(--lx-gold) ${className}`} aria-hidden>
      <span className="h-px w-14 bg-linear-to-r from-transparent to-(--lx-gold)/70" />
      <Diamond className="h-3 w-7" />
      <span className="h-px w-14 bg-linear-to-l from-transparent to-(--lx-gold)/70" />
    </div>
  );
}

function SectionHead({
  index,
  title,
  subtitle,
  langs,
}: {
  index: number;
  title?: BiText;
  subtitle?: BiText;
  langs: Langs;
}) {
  return (
    <header className={`${styles.rv} text-center`}>
      <p className={`${styles.serif} text-lg text-(--lx-gold) italic`}>{ROMAN[index]}</p>
      <h2 className={`${styles.serif} mt-1 text-[2.4rem] leading-[1.02] font-medium text-balance`}>
        <Bi t={title} langs={langs} />
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-[32ch] text-sm leading-relaxed text-(--lx-ink)/60">
          <Bi t={subtitle} langs={langs} />
        </p>
      )}
      <Ornament className="mt-5" />
    </header>
  );
}

function OrderButton({ luxe, langs, className = "" }: { luxe: LuxeContent; langs: Langs; className?: string }) {
  return (
    <a
      href={luxe.order.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.goldFill} ${styles.shimmer} flex min-h-14 items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-bold tracking-wide shadow-[0_18px_40px_-18px_var(--lx-glow)] transition-[transform,filter] duration-200 hover:brightness-105 active:scale-[0.98] ${FOCUS} ${className}`}
    >
      <LinkIcon type={luxe.order.icon ?? "order"} className="size-6 shrink-0" />
      <Bi t={luxe.order.label} langs={langs} />
    </a>
  );
}

function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mt-24 ${className}`}>{children}</section>;
}

export default function LuxeProfile({ site }: { site: SiteConfig }) {
  const luxe = site.luxe!;
  const theme = site.theme ?? {};
  const langs: Langs = { primary: site.lang ?? "ru", alt: site.translation?.lang };
  const labels = luxe.labels ?? {};
  const gold = theme.accent ?? "#d8b97f";

  const vars = {
    "--lx-bg": theme.background ?? "#120d09",
    "--lx-ink": theme.textColor ?? "#f3ebdd",
    "--lx-gold": gold,
    "--lx-panel": "color-mix(in oklab, var(--lx-bg), white 4%)",
    "--lx-glow": "rgb(220 187 126 / 0.8)",
    // the gold shine redrawn in the site's accent colour
    ...(luxe.metal === "accent" && {
      "--lx-gold-grad": `linear-gradient(120deg, color-mix(in oklab, ${gold}, white 55%) 0%, ${gold} 24%, color-mix(in oklab, ${gold}, black 25%) 50%, color-mix(in oklab, ${gold}, white 35%) 74%, color-mix(in oklab, ${gold}, black 10%) 100%)`,
      "--lx-glow": `color-mix(in oklab, ${gold} 75%, transparent)`,
    }),
  } as CSSProperties;

  let sectionIndex = 0;

  return (
    <div
      className={`${serif.variable} ${sans.variable} ${styles.page} flex-1`}
      style={vars}
      suppressHydrationWarning
    >
      {/* Arms the scroll reveal before first paint (see .rv in the stylesheet) */}
      <script dangerouslySetInnerHTML={{ __html: 'document.currentScript.parentElement.setAttribute("data-rv","")' }} />
      <LuxeReveal />
      {langs.alt && <script dangerouslySetInnerHTML={{ __html: langInitScript(site.slug, langs.alt) }} />}

      <main className="relative mx-auto max-w-[440px] px-5 pb-36">
        {/* Top bar */}
        <div className="flex items-center justify-between pt-5">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-(--lx-ink)/55">
            {luxe.channels?.[0]?.handle}
          </span>
          {langs.alt && (
            <LangToggle
              slug={site.slug}
              primary={langs.primary}
              alt={langs.alt}
              accent={gold}
              accentText="#1c140b"
              variant="dark"
            />
          )}
        </div>

        {/* Hero */}
        <section className="pt-10 text-center">
          <div className={`${styles.enter} flex items-center justify-center gap-3`}>
            <span className="h-px w-6 shrink-0 bg-(--lx-gold)/60" aria-hidden />
            <p className="text-[10.5px] font-semibold tracking-[0.22em] whitespace-nowrap text-(--lx-gold) uppercase">
              <Bi t={luxe.kicker} langs={langs} />
            </p>
            <span className="h-px w-6 shrink-0 bg-(--lx-gold)/60" aria-hidden />
          </div>

          <h1 className={`${styles.serif} ${styles.enter} mt-5`} style={{ animationDelay: "80ms" }}>
            {luxe.nameLead && (
              <span className={`${styles.goldText} block text-[1.7rem] leading-none italic`}>
                <Bi t={luxe.nameLead} langs={langs} />
              </span>
            )}
            <span className="mt-1 block text-[5rem] leading-[0.95] font-medium tracking-tight">
              {luxe.displayName ? <Bi t={luxe.displayName} langs={langs} /> : site.name}
            </span>
          </h1>

          <div
            className={`${styles.enter} relative mx-auto mt-10 w-[78%] max-w-[330px]`}
            style={{ animationDelay: "160ms" }}
          >
            <div className="absolute -inset-3 rounded-t-full border border-(--lx-gold)/35" aria-hidden />
            <Diamond className="absolute -top-[18px] left-1/2 h-3 w-7 -translate-x-1/2 bg-(--lx-bg) px-1 text-(--lx-gold)" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full ring-1 ring-(--lx-gold)/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={luxe.heroImageUrl}
                alt={biString(luxe.collection[0]?.title, langs)}
                fetchPriority="high"
                className={`${styles.kenburns} size-full object-cover`}
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/55 to-transparent" />
            </div>
            {site.avatarUrl && (
              <div className={`${styles.goldFill} absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full p-[2px] shadow-[0_12px_30px_-8px_rgb(0_0_0/0.7)]`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.avatarUrl}
                  alt=""
                  className="size-20 rounded-full object-cover ring-[3px] ring-(--lx-bg)"
                />
              </div>
            )}
          </div>

          <p
            className={`${styles.serif} ${styles.enter} mx-auto mt-16 max-w-[26ch] text-[1.45rem] leading-snug text-(--lx-ink)/85 italic`}
            style={{ animationDelay: "240ms" }}
          >
            <Bi t={luxe.tagline} langs={langs} />
          </p>

          {luxe.stats && luxe.stats.length > 0 && (
            <dl
              className={`${styles.enter} mt-8 grid border-y border-(--lx-gold)/25 py-5`}
              style={{ gridTemplateColumns: `repeat(${luxe.stats.length}, minmax(0, 1fr))`, animationDelay: "300ms" }}
            >
              {luxe.stats.map((stat, i) => (
                <div
                  key={stat.id}
                  className={`flex flex-col-reverse justify-end px-1.5 ${i > 0 ? "border-l border-(--lx-gold)/25" : ""}`}
                >
                  <dt className="mt-2 text-[9.5px] leading-snug font-semibold tracking-[0.18em] text-(--lx-ink)/55 uppercase">
                    <Bi t={stat.label} langs={langs} />
                  </dt>
                  <dd className={`${styles.serif} ${styles.goldText} text-[1.75rem] leading-none font-semibold lining-nums`}>
                    <Bi t={stat.value} langs={langs} />
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className={`${styles.enter} mt-8 space-y-3`} style={{ animationDelay: "360ms" }}>
            <OrderButton luxe={luxe} langs={langs} />
            {luxe.phone && (
              <a
                href={luxe.phone.url}
                className={`flex min-h-13 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-semibold ring-1 ring-(--lx-gold)/45 transition-colors duration-200 hover:bg-(--lx-gold)/10 ${FOCUS}`}
              >
                <PhoneIcon className="size-[18px] text-(--lx-gold)" aria-hidden />
                <Bi t={luxe.phone.label} langs={langs} />
                <span className="text-(--lx-ink)/50">·</span>
                <span className="tabular-nums">{luxe.phone.display}</span>
              </a>
            )}
          </div>
        </section>

        {/* Collection */}
        <Section>
          <SectionHead
            index={sectionIndex++}
            title={luxe.collectionTitle}
            subtitle={luxe.collectionSubtitle}
            langs={langs}
          />
          <div className="mt-10">
            <LuxeCollection pieces={luxe.collection} langs={langs} labels={labels} />
          </div>
        </Section>

        {/* Occasions */}
        {luxe.occasions && luxe.occasions.length > 0 && (
          <Section>
            <SectionHead index={sectionIndex++} title={luxe.occasionsTitle} langs={langs} />
            <ul className={`${styles.goldFrame} ${styles.rv} mt-10 grid grid-cols-2 gap-x-5 gap-y-7 rounded-[28px] p-6`}>
              {luxe.occasions.map((occasion) => (
                <li key={occasion.id} className={styles.rv}>
                  <Diamond className="h-2.5 w-6 text-(--lx-gold)" />
                  <p className={`${styles.serif} mt-2 text-[1.3rem] leading-tight font-medium`}>
                    <Bi t={occasion.title} langs={langs} />
                  </p>
                  {occasion.text && (
                    <p className="mt-1 text-xs leading-relaxed text-(--lx-ink)/55">
                      <Bi t={occasion.text} langs={langs} />
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Quote */}
        {luxe.quote && (
          <Section>
            <figure
              className={`${styles.rv} relative overflow-hidden rounded-[32px] bg-[#f4ecdf] px-7 pt-14 pb-10 text-center text-[#2a1f14] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)]`}
            >
              <span
                className={`${styles.serif} ${styles.goldText} absolute top-2 left-1/2 -translate-x-1/2 text-[7rem] leading-none select-none`}
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className={`${styles.serif} relative text-[2rem] leading-[1.12] font-medium text-balance italic`}>
                <Bi t={luxe.quote} langs={langs} />
              </blockquote>
              {luxe.quoteAuthor && (
                <figcaption className="mt-6 flex items-center justify-center gap-3 text-[11px] font-semibold tracking-[0.28em] text-[#8a6a3a] uppercase">
                  <span className="h-px w-8 bg-[#b98f50]/60" aria-hidden />
                  <Bi t={luxe.quoteAuthor} langs={langs} />
                  <span className="h-px w-8 bg-[#b98f50]/60" aria-hidden />
                </figcaption>
              )}
            </figure>
          </Section>
        )}

        {/* How to order */}
        {luxe.steps && luxe.steps.length > 0 && (
          <Section>
            <SectionHead index={sectionIndex++} title={luxe.stepsTitle} langs={langs} />
            <ol className="relative mt-10 space-y-8">
              <span
                className="absolute top-3 bottom-3 left-[23px] w-px bg-linear-to-b from-(--lx-gold)/60 via-(--lx-gold)/25 to-transparent"
                aria-hidden
              />
              {luxe.steps.map((step, i) => (
                <li key={step.id} className={`${styles.rv} relative flex gap-5`}>
                  <span
                    className={`${styles.goldFrame} ${styles.serif} flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold`}
                  >
                    <span className={styles.goldText}>{ROMAN[i]}</span>
                  </span>
                  <div className="pt-1.5">
                    <h3 className={`${styles.serif} text-[1.45rem] leading-tight font-medium`}>
                      <Bi t={step.title} langs={langs} />
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-(--lx-ink)/60">
                      <Bi t={step.text} langs={langs} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {luxe.brief && luxe.brief.length > 0 && (
              <div className={`${styles.rv} mt-10 rounded-[28px] bg-white/[0.035] p-6 ring-1 ring-(--lx-gold)/20`}>
                <p className={`${styles.serif} text-[1.5rem] leading-tight font-medium`}>
                  <Bi t={luxe.briefTitle} langs={langs} />
                </p>
                <ul className="mt-4 space-y-3">
                  {luxe.brief.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-(--lx-ink)/80">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-(--lx-gold)/15 text-(--lx-gold)">
                        <CheckIcon className="size-3" strokeWidth={2.5} aria-hidden />
                      </span>
                      <Bi t={item} langs={langs} />
                    </li>
                  ))}
                </ul>
                <a
                  href={luxe.order.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-(--lx-gold) ${FOCUS}`}
                >
                  <Bi t={luxe.order.note ?? luxe.order.label} langs={langs} />
                  <ArrowUpRightIcon
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            )}
          </Section>
        )}

        {/* Channels */}
        {luxe.channels && luxe.channels.length > 0 && (
          <Section>
            <SectionHead index={sectionIndex++} title={luxe.channelsTitle} langs={langs} />
            <ul className={`mt-8 divide-y divide-(--lx-gold)/15 border-y border-(--lx-gold)/15`}>
              {luxe.channels.map((channel, i) => (
                <li key={channel.id} className={styles.rv}>
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex min-h-20 items-center gap-4 py-4 ${FOCUS}`}
                  >
                    <span className="w-5 text-[10px] font-semibold tracking-[0.2em] text-(--lx-gold)/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full text-(--lx-gold) ring-1 ring-(--lx-gold)/40 transition-colors duration-300 group-hover:bg-(--lx-gold)/10">
                      <LinkIcon type={channel.type} className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`${styles.serif} block text-[1.35rem] leading-tight font-medium`}>
                        <Bi t={channel.label} langs={langs} />
                      </span>
                      <span className="block truncate text-xs text-(--lx-ink)/50">{channel.handle}</span>
                    </span>
                    <ArrowUpRightIcon
                      className="size-5 shrink-0 text-(--lx-gold)/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Closing */}
        <Section>
          <div className={`${styles.goldFrame} ${styles.rv} rounded-[32px] px-6 py-10 text-center`}>
            <Ornament />
            <h2 className={`${styles.serif} mt-5 text-[2.3rem] leading-[1.05] font-medium text-balance`}>
              <Bi t={luxe.closingTitle} langs={langs} />
            </h2>
            {luxe.closingText && (
              <p className="mx-auto mt-3 max-w-[30ch] text-sm leading-relaxed text-(--lx-ink)/60">
                <Bi t={luxe.closingText} langs={langs} />
              </p>
            )}
            <OrderButton luxe={luxe} langs={langs} className="mt-7" />
            {luxe.phone && (
              <a
                href={luxe.phone.url}
                className={`${styles.serif} ${styles.goldText} mt-5 inline-block text-[1.7rem] font-semibold lining-nums tabular-nums ${FOCUS}`}
              >
                {luxe.phone.display}
              </a>
            )}
          </div>
        </Section>

        {/* Footer */}
        <footer className={`${styles.rv} mt-16 flex flex-col items-center text-center`}>
          {site.avatarUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={site.avatarUrl}
              alt=""
              className="size-14 rounded-full object-cover ring-1 ring-(--lx-gold)/50"
            />
          )}
          <p className={`${styles.serif} mt-3 text-xl font-medium`}>
            {luxe.nameLead && <Bi t={luxe.nameLead} langs={langs} />}{" "}
            {luxe.displayName ? <Bi t={luxe.displayName} langs={langs} /> : site.name}
          </p>
          {!site.hideBranding && (
            <p className="mt-6 text-[11px] tracking-wide text-(--lx-ink)/35">
              <Bi t={CREATED_WITH} langs={langs} />
            </p>
          )}
        </footer>
      </main>

      {/* Floating order bar */}
      <div className={`${styles.dock} fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]`}>
        <div className="mx-auto flex max-w-[440px] items-center gap-2 rounded-full bg-[#15100b]/80 p-1.5 shadow-[0_20px_40px_-12px_rgb(0_0_0/0.8)] ring-1 ring-(--lx-gold)/30 backdrop-blur-md">
          <OrderButton luxe={luxe} langs={langs} className="min-h-12! flex-1 text-sm" />
          {luxe.phone && (
            <a
              href={luxe.phone.url}
              className={`flex size-12 shrink-0 items-center justify-center rounded-full text-(--lx-gold) ring-1 ring-(--lx-gold)/45 transition-colors hover:bg-(--lx-gold)/10 ${FOCUS}`}
            >
              <PhoneIcon className="size-5" aria-hidden />
              <span className="sr-only">
                <Bi t={luxe.phone.label} langs={langs} />
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
