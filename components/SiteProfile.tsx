import type { CSSProperties } from "react";
import type { SiteConfig } from "@/lib/types";
import { LinkIcon } from "./icons";

/** Fixed (not random) so server and client render identical markup. */
const SPRINKLES = [
  { top: "6%", left: "10%", size: 5, length: 16, rotate: -18, tone: 0, delay: "0s", duration: "6.5s" },
  { top: "10%", left: "84%", size: 5, length: 18, rotate: 24, tone: 1, delay: "1.1s", duration: "7.5s" },
  { top: "28%", left: "5%", size: 4, length: 14, rotate: 8, tone: 1, delay: "2.2s", duration: "6s" },
  { top: "3%", left: "46%", size: 5, length: 15, rotate: -10, tone: 0, delay: "0.6s", duration: "8s" },
  { top: "20%", left: "68%", size: 4, length: 13, rotate: 32, tone: 0, delay: "2.8s", duration: "7s" },
  { top: "34%", left: "90%", size: 5, length: 17, rotate: -24, tone: 1, delay: "1.6s", duration: "8.5s" },
] as const;

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
            <span
              key={i}
              className="linkhub-sprinkle absolute rounded-full"
              style={
                {
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.length,
                  backgroundColor: s.tone === 0 ? accent : secondaryAccent,
                  opacity: 0.5,
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
  const gallery = site.gallery ?? [];

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
  const linksBaseDelay = delay;

  return (
    <main className="relative min-h-screen w-full overflow-hidden" style={rootStyle}>
      <BackgroundDecoration accent={accent} secondaryAccent={secondaryAccent} confetti={confetti} />

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
              ...(hasCover
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

          <div className="mt-9 flex w-full flex-col gap-3">
            {site.links.map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith("tel:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="linkhub-enter group flex w-full items-center gap-3 rounded-2xl bg-white/80 px-5 py-4 ring-1 ring-black/5 backdrop-blur transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 active:translate-y-0 active:scale-[0.98] active:duration-150 active:ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                style={{ animationDelay: `${linksBaseDelay + index * 45}ms` }}
              >
                <LinkIcon
                  type={link.type}
                  className="size-5 shrink-0 text-[var(--accent)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <span className="font-medium">{link.label}</span>
              </a>
            ))}
          </div>

          <footer
            className="linkhub-enter mt-10 text-xs text-zinc-500 opacity-70"
            style={{ animationDelay: `${linksBaseDelay + site.links.length * 45 + 50}ms` }}
          >
            Сделано на <span className="font-semibold">LinkHub.uz</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
