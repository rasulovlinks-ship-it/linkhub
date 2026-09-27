import {
  BoltIcon,
  MagnifyingGlassIcon,
  KeyIcon,
  NoSymbolIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import type { Dict } from "@/lib/i18n";

function Small({
  icon: Icon,
  title,
  text,
  tinted,
  i,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
  tinted?: boolean;
  i: number;
}) {
  return (
    <div
      data-reveal
      style={{ ["--i" as string]: i }}
      className={`flex flex-col rounded-[20px] border border-ol-line p-6 ${tinted ? "bg-ol-surface-2" : "bg-ol-surface"}`}
    >
      <Icon className="size-6 text-ol-accent" strokeWidth={1.6} aria-hidden />
      <h3 className="mt-auto pt-8 text-lg font-semibold tracking-tight text-ol-ink">{title}</h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ol-muted">{text}</p>
    </div>
  );
}

export default function Benefits({ dict }: { dict: Dict }) {
  const t = dict.benefits;
  return (
    <section id="why" className="scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2
          data-reveal
          className="max-w-[20ch] font-display text-3xl font-semibold tracking-tight text-balance text-ol-ink md:text-[2.6rem] md:leading-[1.1]"
        >
          {t.title}
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:auto-rows-[minmax(200px,auto)] lg:grid-cols-4">
          {/* Professional look: a real client background with the address on top */}
          <div
            data-reveal
            className="relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[20px] md:col-span-2 lg:row-span-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sites/babyland/background.webp"
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="relative p-6 sm:p-8">
              <p className="inline-block rounded-full bg-white/90 px-4 py-2 font-mono text-sm font-semibold text-zinc-900 backdrop-blur">
                komolababyland.uz
              </p>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">{t.pro.title}</h3>
              <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-white/80">{t.pro.text}</p>
            </div>
          </div>

          {/* One-time payment */}
          <div
            data-reveal
            style={{ ["--i" as string]: 1 }}
            className="relative flex flex-col overflow-hidden rounded-[20px] bg-[image:var(--ol-accent-gradient)] p-6 text-ol-accent-ink sm:p-8 md:col-span-2"
          >
            <span className="pointer-events-none absolute -top-6 right-2 font-display text-[9rem] leading-none font-semibold opacity-15 select-none" aria-hidden>
              1×
            </span>
            <h3 className="relative mt-auto pt-10 text-2xl font-semibold tracking-tight">{t.once.title}</h3>
            <p className="relative mt-2 max-w-[42ch] text-[15px] leading-relaxed opacity-85">{t.once.text}</p>
          </div>

          {/* Custom design: real client artwork */}
          <div
            data-reveal
            style={{ ["--i" as string]: 2 }}
            className="relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[20px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sites/thebestcakestashkent/background.webp"
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="relative p-6">
              <h3 className="text-lg font-semibold tracking-tight text-white">{t.design.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/80">{t.design.text}</p>
            </div>
          </div>

          <Small icon={NoSymbolIcon} title={t.noAds.title} text={t.noAds.text} tinted i={3} />
          <Small icon={BoltIcon} title={t.fast.title} text={t.fast.text} i={0} />
          <Small icon={MagnifyingGlassIcon} title={t.google.title} text={t.google.text} i={1} />
          <Small icon={KeyIcon} title={t.owned.title} text={t.owned.text} i={2} />
          <Small icon={MapPinIcon} title={t.local.title} text={t.local.text} tinted i={3} />
        </div>
      </div>
    </section>
  );
}
