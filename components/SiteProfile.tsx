import type { CSSProperties } from "react";
import type { SiteConfig } from "@/lib/types";
import { LinkIcon } from "./icons";

export default function SiteProfile({ site }: { site: SiteConfig }) {
  const theme = site.theme ?? {};
  const background = theme.background ?? "linear-gradient(180deg,#fafaf9 0%,#ffffff 60%)";
  const accent = theme.accent ?? "#18181b";
  const accentText = theme.accentText ?? "#ffffff";
  const textColor = theme.textColor ?? "#18181b";
  const initial = site.name?.trim()?.charAt(0)?.toUpperCase() || "?";

  const rootStyle = {
    background,
    color: textColor,
    ["--accent" as string]: accent,
  } as CSSProperties;

  return (
    <main
      className="relative min-h-screen w-full flex justify-center overflow-hidden px-4 py-14"
      style={rootStyle}
    >
      {/* decorative background accents, purely ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl opacity-[0.12]"
          style={{ backgroundColor: accent }}
        />
        <div
          className="absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 translate-y-1/3 rounded-full blur-3xl opacity-[0.08]"
          style={{ backgroundColor: accent }}
        />
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        <div
          className="linkhub-enter h-24 w-24 shrink-0 overflow-hidden rounded-full outline-1 -outline-offset-1 outline-black/10 flex items-center justify-center text-3xl font-semibold"
          style={{ backgroundColor: accent, color: accentText }}
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
          style={{ animationDelay: "70ms" }}
        >
          {site.name}
        </h1>

        {site.bio && (
          <p
            className="linkhub-enter mt-1 text-center text-sm text-balance opacity-70"
            style={{ animationDelay: "130ms" }}
          >
            {site.bio}
          </p>
        )}

        <div className="mt-9 flex w-full flex-col gap-3">
          {site.links.map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              target={link.url.startsWith("tel:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="linkhub-enter group flex w-full items-center gap-3 rounded-2xl bg-white/80 px-5 py-4 ring-1 ring-black/5 backdrop-blur transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 active:translate-y-0 active:scale-[0.98] active:duration-150 active:ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              style={{ animationDelay: `${190 + index * 45}ms` }}
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
          style={{ animationDelay: `${240 + site.links.length * 45}ms` }}
        >
          Сделано на <span className="font-semibold">LinkHub.uz</span>
        </footer>
      </div>
    </main>
  );
}
