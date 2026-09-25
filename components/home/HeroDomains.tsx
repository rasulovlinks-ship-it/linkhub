import { LockClosedIcon } from "@heroicons/react/20/solid";

/**
 * Faint example .uz addresses around the hero edges. They fade in once the
 * glass breaks (see .ol-domain-chip in globals.css): the subscription is
 * gone, everyone gets their own domain. Decorative only, desktop only.
 */
const CHIPS = [
  { name: "tortlar.uz", pos: "left-[8%] top-[13%]", depth: "far" },
  { name: "gulnora.uz", pos: "left-[40%] top-[11%]", depth: "near" },
  { name: "kitobxon.uz", pos: "left-[58%] top-[15%]", depth: "far" },
  { name: "shifo-klinika.uz", pos: "right-[2.5%] top-[24%]", depth: "near" },
  { name: "fitzone.uz", pos: "left-[51%] top-[70%]", depth: "near" },
  { name: "sayohat.uz", pos: "right-[4%] top-[68%]", depth: "far" },
  { name: "dizayn-studio.uz", pos: "left-[11%] top-[83%]", depth: "far" },
  { name: "shirinliklar.uz", pos: "left-[36%] top-[91%]", depth: "near" },
] as const;

export default function HeroDomains() {
  return (
    <div aria-hidden className="ol-hero-domains pointer-events-none absolute inset-0 hidden lg:block">
      {CHIPS.map((c, i) => (
        <span
          key={c.name}
          className={`ol-domain-chip absolute ${c.pos}`}
          data-depth={c.depth}
          style={{ ["--i" as string]: i }}
        >
          <span className="ol-domain-chip-inner flex items-center gap-1.5 rounded-full border border-ol-line bg-ol-surface/70 px-3 py-1.5 font-mono text-xs whitespace-nowrap text-ol-muted shadow-[0_8px_24px_-14px_var(--ol-shadow)]">
            <LockClosedIcon className="size-3 text-ol-accent/70" />
            {c.name}
          </span>
        </span>
      ))}
    </div>
  );
}
