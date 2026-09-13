import type { SiteConfig } from "@/lib/types";
import { LinkIcon } from "./icons";

export default function SiteProfile({ site }: { site: SiteConfig }) {
  const theme = site.theme ?? {};
  const background = theme.background ?? "linear-gradient(180deg,#f8fafc 0%,#ffffff 60%)";
  const accent = theme.accent ?? "#111827";
  const accentText = theme.accentText ?? "#ffffff";
  const textColor = theme.textColor ?? "#1f2937";
  const initial = site.name?.trim()?.charAt(0)?.toUpperCase() || "?";

  return (
    <main
      className="min-h-screen w-full flex justify-center px-4 py-12"
      style={{ background, color: textColor }}
    >
      <div className="w-full max-w-md flex flex-col items-center">
        <div
          className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center text-3xl font-semibold shadow-md"
          style={{ backgroundColor: accent, color: accentText }}
        >
          {site.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={site.avatarUrl} alt={site.name} className="w-full h-full object-cover" />
          ) : (
            initial
          )}
        </div>

        <h1 className="mt-4 text-xl font-semibold text-center">{site.name}</h1>
        {site.bio && <p className="mt-1 text-sm text-center opacity-80">{site.bio}</p>}

        <div className="mt-8 w-full flex flex-col gap-3">
          {site.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target={link.url.startsWith("tel:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 rounded-2xl px-5 py-4 shadow-sm border border-black/5 bg-white/70 backdrop-blur transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
                style={{ backgroundColor: accent, color: accentText }}
              >
                <LinkIcon type={link.type} className="w-5 h-5" />
              </span>
              <span className="font-medium">{link.label}</span>
            </a>
          ))}
        </div>

        <footer className="mt-10 text-xs opacity-50">
          Сделано на <span className="font-semibold">LinkHub.uz</span>
        </footer>
      </div>
    </main>
  );
}
