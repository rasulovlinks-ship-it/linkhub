import type { CSSProperties, ReactNode } from "react";
import type { PillColor, SiteConfig } from "@/lib/types";
import { LinkIcon } from "./icons";
import ScrollReveal from "./ScrollReveal";

const PILL_COLORS: Record<PillColor, { bg: string; text: string; badgeBg?: string }> = {
  pink: { bg: "#fbd5e3", text: "#9d174d" },
  rose: { bg: "#fbd0d0", text: "#9f1239" },
  peach: { bg: "#fde8cd", text: "#9a3412" },
  blue: { bg: "#d3ecfb", text: "#075985" },
  green: { bg: "#d7f5e0", text: "#166534" },
  purple: { bg: "#e6dcfb", text: "#5b21b6" },
  charcoal: { bg: "#211c16", text: "#f5c451", badgeBg: "#15120d" },
  teal: { bg: "#cdeae6", text: "#065f56" },
  mauve: { bg: "#f3e0e6", text: "#5b1a42" },
};
const PILL_COLOR_ORDER: PillColor[] = ["blue", "pink", "green", "rose", "purple", "peach"];

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function HeartGlyph({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M12 21s-7.5-4.35-9.5-8.5C1 9 2.5 5.5 6 5c2-.3 3.5.7 4.5 2 1-1.3 2.5-2.3 4.5-2 3.5.5 5 4 3.5 7.5C16.5 16.65 12 21 12 21Z" />
    </svg>
  );
}

function StarGlyph({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M12 2 L14.6 9 L22 9.6 L16.4 14.3 L18.2 21.6 L12 17.6 L5.8 21.6 L7.6 14.3 L2 9.6 L9.4 9 Z" />
    </svg>
  );
}

/** Soft cotton-candy cloud puffs + scattered heart/star accents for the photo-card panel. */
function CloudDecoration() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-12 -left-10 h-40 w-40 rounded-full bg-white/40 blur-2xl" />
      <div className="absolute -top-6 right-4 h-32 w-32 rounded-full bg-white/35 blur-2xl" />
      <div className="absolute bottom-8 -left-6 h-32 w-32 rounded-full bg-white/30 blur-2xl" />
      <div className="absolute right-0 bottom-1/3 h-28 w-28 rounded-full bg-white/30 blur-2xl" />
      <HeartGlyph className="absolute top-8 right-10 size-4" style={{ color: "#f472b6", opacity: 0.8 }} />
      <HeartGlyph className="absolute bottom-16 left-6 size-3.5" style={{ color: "#e879f9", opacity: 0.6 }} />
      <StarGlyph className="absolute top-24 left-4 size-3" style={{ color: "#fbbf24", opacity: 0.8 }} />
      <StarGlyph className="absolute right-6 bottom-6 size-3.5" style={{ color: "#fbbf24", opacity: 0.7 }} />
    </div>
  );
}

type SprinkleKind = "cake" | "candle" | "confetti-square" | "confetti-circle" | "sparkle";

const SPRINKLE_PATHS: Record<SprinkleKind, ReactNode> = {
  cake: (
    <>
      <path d="M12 3 L20 18 H4 Z" />
      <rect x="7" y="13.4" width="10" height="1.6" rx="0.8" />
      <circle cx="12" cy="1.6" r="1.3" />
    </>
  ),
  candle: (
    <>
      <rect x="10.2" y="9" width="3.6" height="11" rx="1.2" />
      <path d="M12 2c1.3 1.7 2 2.9 2 3.9a2 2 0 1 1-4 0c0-1 .7-2.2 2-3.9Z" />
    </>
  ),
  "confetti-square": <rect x="6" y="6" width="12" height="12" rx="2.5" />,
  "confetti-circle": <circle cx="12" cy="12" r="7" />,
  sparkle: <path d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z" />,
};

/** Tiny solid glyph for background decoration, viewBox 0 0 24 24. */
function SprinkleIcon({
  kind,
  className,
  style,
}: {
  kind: SprinkleKind;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      {SPRINKLE_PATHS[kind]}
    </svg>
  );
}

/** Fixed (not random) so server and client render identical markup. */
const SPRINKLES: {
  top: string;
  left: string;
  size: number;
  rotate: number;
  tone: 0 | 1;
  kind: SprinkleKind;
  delay: string;
  duration: string;
}[] = [
  { top: "6%", left: "10%", size: 20, rotate: -18, tone: 0, kind: "cake", delay: "0s", duration: "6.5s" },
  { top: "10%", left: "84%", size: 18, rotate: 12, tone: 1, kind: "candle", delay: "1.1s", duration: "7.5s" },
  { top: "28%", left: "5%", size: 12, rotate: 8, tone: 1, kind: "confetti-square", delay: "2.2s", duration: "6s" },
  { top: "3%", left: "46%", size: 22, rotate: -6, tone: 0, kind: "sparkle", delay: "0.6s", duration: "8s" },
  { top: "20%", left: "68%", size: 14, rotate: 0, tone: 0, kind: "confetti-circle", delay: "2.8s", duration: "7s" },
  { top: "34%", left: "90%", size: 16, rotate: -24, tone: 1, kind: "confetti-square", delay: "1.6s", duration: "8.5s" },
  { top: "16%", left: "38%", size: 18, rotate: 6, tone: 1, kind: "cake", delay: "3.4s", duration: "7.2s" },
  { top: "5%", left: "62%", size: 14, rotate: -10, tone: 0, kind: "confetti-circle", delay: "1.9s", duration: "6.8s" },
];

function BackgroundDecoration({
  accent,
  secondaryAccent,
  confetti,
}: {
  accent: string;
  secondaryAccent: string;
  confetti: boolean;
}) {
  const blobClass = confetti
    ? "linkhub-blob absolute rounded-full blur-3xl"
    : "absolute rounded-full blur-3xl";

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className={`${blobClass} -top-24 left-1/2 h-72 w-72 -translate-x-1/2 opacity-[0.12]`}
        style={
          {
            backgroundColor: accent,
            ["--dx"]: "-6%",
            ["--dy"]: "5%",
            animationDuration: "16s",
          } as CSSProperties
        }
      />
      <div
        className={`${blobClass} bottom-0 right-0 h-56 w-56 translate-x-1/3 translate-y-1/3 opacity-[0.08]`}
        style={
          {
            backgroundColor: accent,
            ["--dx"]: "5%",
            ["--dy"]: "-4%",
            animationDuration: "19s",
            animationDelay: "1s",
          } as CSSProperties
        }
      />

      {confetti && (
        <>
          <div
            className="linkhub-blob absolute top-1/3 left-[15%] h-64 w-64 rounded-full blur-3xl opacity-[0.10]"
            style={
              {
                backgroundColor: secondaryAccent,
                ["--dx"]: "-4%",
                ["--dy"]: "6%",
                animationDuration: "21s",
                animationDelay: "2s",
              } as CSSProperties
            }
          />
          {SPRINKLES.map((s, i) => (
            <SprinkleIcon
              key={i}
              kind={s.kind}
              className="linkhub-sprinkle absolute"
              style={
                {
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  color: s.tone === 0 ? accent : secondaryAccent,
                  opacity: 0.55,
                  ["--r"]: `${s.rotate}deg`,
                  transform: `rotate(${s.rotate}deg)`,
                  animationDuration: s.duration,
                  animationDelay: s.delay,
                } as CSSProperties
              }
            />
          ))}
        </>
      )}
    </div>
  );
}

/**
 * Whole-page background photo, shown sharp (no blur). A very light wash
 * of the site's own background gradient keeps body text/buttons legible
 * without hiding the photo itself.
 */
function PageBackgroundPhoto({ src, wash }: { src: string; wash: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ background: wash, opacity: 0.1 }} />
    </div>
  );
}

export default function SiteProfile({ site }: { site: SiteConfig }) {
  const theme = site.theme ?? {};
  const background = theme.background ?? "linear-gradient(180deg,#fafaf9 0%,#ffffff 60%)";
  const accent = theme.accent ?? "#18181b";
  const accentText = theme.accentText ?? "#ffffff";
  const textColor = theme.textColor ?? "#18181b";
  const secondaryAccent = theme.secondaryAccent ?? accent;
  const confetti = theme.backgroundStyle === "confetti";
  const initial = site.name?.trim()?.charAt(0)?.toUpperCase() || "?";
  const hasCover = Boolean(site.coverImageUrl);
  const backgroundImageUrl = theme.backgroundImageUrl;
  const avatarNeedsRing = hasCover || Boolean(backgroundImageUrl);
  const gallery = site.gallery ?? [];
  const services = site.services ?? [];
  const servicesRow = site.servicesLayout === "row";
  const serviceCards = site.serviceCards ?? [];
  const pillButtons = theme.buttonStyle === "pill";

  const rootStyle = {
    background,
    color: textColor,
    ["--accent" as string]: accent,
  } as CSSProperties;

  // Stagger entrance delays in reading order, whatever sections are present.
  let delay = 0;
  const nextDelay = (step: number) => {
    const current = delay;
    delay += step;
    return current;
  };
  const avatarDelay = nextDelay(70);
  const nameDelay = nextDelay(70);
  const bioDelay = nextDelay(60);
  const galleryDelay = gallery.length ? nextDelay(70) : delay;
  const servicesBaseDelay = delay;
  if (services.length) nextDelay(services.length * 40 + 40);
  const linksBaseDelay = delay;

  return (
    <main className="isolate relative min-h-dvh w-full overflow-hidden" style={rootStyle}>
      {backgroundImageUrl ? (
        <PageBackgroundPhoto src={backgroundImageUrl} wash={background} />
      ) : (
        <BackgroundDecoration accent={accent} secondaryAccent={secondaryAccent} confetti={confetti} />
      )}

      {hasCover && (
        <div className="linkhub-enter relative h-40 w-full overflow-hidden sm:h-56">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.coverImageUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
        </div>
      )}

      <div
        className={`flex w-full justify-center px-4 ${hasCover ? "-mt-12 pb-14 sm:-mt-16" : "py-14"}`}
      >
        <div className="w-full max-w-md flex flex-col items-center">
          <div
            className="linkhub-enter h-24 w-24 shrink-0 overflow-hidden rounded-full outline-1 -outline-offset-1 outline-black/10 flex items-center justify-center text-3xl font-semibold"
            style={{
              animationDelay: `${avatarDelay}ms`,
              backgroundColor: accent,
              color: accentText,
              ...(avatarNeedsRing
                ? { boxShadow: "0 0 0 4px rgba(255,255,255,0.9), 0 10px 25px rgba(0,0,0,0.15)" }
                : {}),
            }}
          >
            {site.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={site.avatarUrl} alt={site.name} className="h-full w-full object-cover" />
            ) : (
              initial
            )}
          </div>

          <h1
            className="linkhub-enter mt-4 text-center text-xl font-semibold"
            style={{ animationDelay: `${nameDelay}ms` }}
          >
            {site.name}
          </h1>

          {site.bio && (
            <p
              className="linkhub-enter mt-1 text-center text-sm text-balance opacity-70"
              style={{ animationDelay: `${bioDelay}ms` }}
            >
              {site.bio}
            </p>
          )}

          {gallery.length > 0 && (
            <div
              className="linkhub-enter mt-6 grid w-full grid-cols-3 gap-2"
              style={{ animationDelay: `${galleryDelay}ms` }}
            >
              {gallery.slice(0, 3).map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className="aspect-square w-full rounded-xl object-cover ring-1 ring-black/5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
                />
              ))}
            </div>
          )}

          {services.length > 0 && servicesRow && (
            <div className="mt-7 flex w-full items-stretch gap-2">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`linkhub-enter flex items-center gap-1.5 rounded-2xl ${
                    service.large ? "flex-[1.2] px-2 py-3" : "flex-1 px-2 py-2"
                  }`}
                  style={{
                    backgroundColor: service.badgeBg,
                    animationDelay: `${servicesBaseDelay + index * 40}ms`,
                  }}
                >
                  <span
                    className={`flex shrink-0 items-center justify-center rounded-full bg-white/80 ${
                      service.large ? "size-11" : "size-7"
                    }`}
                    style={{ color: service.iconColor }}
                  >
                    <LinkIcon type={service.type} className={service.large ? "size-5" : "size-3.5"} />
                  </span>
                  <span className="min-w-0 flex-1" style={{ color: service.iconColor }}>
                    <span
                      className={`block leading-tight font-bold text-balance ${
                        service.large ? "text-lg" : "text-xs"
                      }`}
                    >
                      {service.label}
                    </span>
                    {service.description && (
                      <span
                        className={`block leading-tight opacity-80 text-balance ${
                          service.large ? "text-sm" : "text-[11px]"
                        }`}
                      >
                        {service.description}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}

          {services.length > 0 && !servicesRow && (
            <div className="mt-7 flex w-full flex-col gap-4 rounded-3xl bg-white/75 p-4 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="linkhub-enter flex w-full items-center gap-3"
                  style={{ animationDelay: `${servicesBaseDelay + index * 40}ms` }}
                >
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: service.badgeBg, color: service.iconColor }}
                  >
                    <LinkIcon type={service.type} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold leading-tight">{service.label}</span>
                    {service.description && (
                      <span className="block text-sm leading-tight opacity-75">
                        {service.description}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-9 flex w-full flex-col gap-3">
            {site.links.map((link, index) => {
              if (!pillButtons) {
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.url.startsWith("tel:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="linkhub-enter group flex w-full items-center gap-3 rounded-2xl bg-white/80 px-5 py-4 ring-1 ring-black/5 backdrop-blur transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 active:translate-y-0 active:scale-[0.98] active:duration-150 active:ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    style={{ animationDelay: `${linksBaseDelay + index * 45}ms` }}
                  >
                    {link.iconUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={link.iconUrl}
                        alt=""
                        className="size-5 shrink-0 object-contain transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      />
                    ) : (
                      <LinkIcon
                        type={link.type}
                        className="size-5 shrink-0 text-[var(--accent)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      />
                    )}
                    <span className="font-medium">{link.label}</span>
                  </a>
                );
              }

              const pill =
                PILL_COLORS[link.pillColor ?? PILL_COLOR_ORDER[index % PILL_COLOR_ORDER.length]];
              const pillStyle = {
                animationDelay: `${linksBaseDelay + index * 45}ms`,
                backgroundColor: pill.bg,
                color: pill.text,
                ["--pill-text" as string]: pill.text,
              } as CSSProperties;

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.url.startsWith("tel:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="linkhub-enter group flex w-full items-center gap-3 rounded-full py-2.5 pr-4 pl-2.5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:duration-150 active:ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pill-text)]"
                  style={pillStyle}
                >
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-full shadow-sm"
                    style={{ backgroundColor: pill.badgeBg ?? "#ffffff" }}
                  >
                    {link.iconUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={link.iconUrl}
                        alt=""
                        className="size-6 object-contain transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      />
                    ) : (
                      <LinkIcon
                        type={link.type}
                        className="size-5 text-[var(--pill-text)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold leading-tight">{link.label}</span>
                    {link.description && (
                      <span className="block truncate text-sm leading-tight opacity-75">
                        {link.description}
                      </span>
                    )}
                  </span>
                  <ChevronRightIcon className="size-5 shrink-0 opacity-70 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5" />
                </a>
              );
            })}
          </div>

          {serviceCards.length > 0 && (
            <div
              className="linkhub-enter isolate relative mt-9 w-full overflow-hidden rounded-[2rem] p-5"
              style={{
                background: site.serviceCardsBackgroundUrl
                  ? undefined
                  : "linear-gradient(180deg,#fbcfe8 0%,#f0d9fb 100%)",
                animationDelay: `${linksBaseDelay + site.links.length * 45 + 60}ms`,
              }}
            >
              {site.serviceCardsBackgroundUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={site.serviceCardsBackgroundUrl}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
              ) : (
                <CloudDecoration />
              )}
              <div className="relative text-center">
                <h2
                  className="text-4xl leading-tight"
                  style={{ fontFamily: "var(--font-script)", color: "#7c3aed" }}
                >
                  {site.serviceCardsTitle ?? "Bizning xizmatlarimiz"}
                </h2>
                {site.serviceCardsSubtitle && (
                  <p className="mt-1 text-sm font-medium" style={{ color: "#6b21a8" }}>
                    {site.serviceCardsSubtitle}
                  </p>
                )}
              </div>

              <div className="relative mt-5 flex flex-col gap-6">
                {serviceCards.map((card, index) => (
                  <ScrollReveal
                    key={card.id}
                    direction={index % 2 === 0 ? "left" : "right"}
                    className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
                  >
                    <div
                      className="relative aspect-[4/3] w-full"
                      style={{ backgroundColor: card.badgeBg }}
                    >
                      {card.photoUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={card.photoUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                      <span
                        className="absolute bottom-0 left-1/2 flex size-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-white"
                        style={{ color: card.iconColor }}
                      >
                        <LinkIcon type={card.type} className="size-7" />
                      </span>
                    </div>
                    <div className="px-4 pt-9 pb-5 text-center">
                      <div className="font-bold" style={{ color: textColor }}>
                        {card.label}
                      </div>
                      {card.description && (
                        <div className="mt-0.5 text-sm opacity-70">{card.description}</div>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          <footer
            className="linkhub-enter mt-10 text-xs text-zinc-500 opacity-70"
            style={{
              animationDelay: `${linksBaseDelay + site.links.length * 45 + 100 + serviceCards.length * 60 + 40}ms`,
            }}
          >
            Сделано на <span className="font-semibold">LinkHub.uz</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
