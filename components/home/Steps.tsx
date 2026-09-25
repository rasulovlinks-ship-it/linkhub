import type { Dict } from "@/lib/i18n";

export default function Steps({ dict }: { dict: Dict }) {
  const t = dict.steps;
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2
          data-reveal
          className="font-display text-3xl font-semibold tracking-tight text-ol-ink md:text-[2.6rem] md:leading-[1.1]"
        >
          {t.title}
        </h2>
        <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Connecting rail (desktop) */}
          <span aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-px bg-ol-line md:block" />
          <span aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-ol-line md:hidden" />
          {t.items.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ ["--i" as string]: i }}
              className="relative pl-10 md:pt-10 md:pl-0"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 size-[15px] rounded-full border-[3px] border-ol-bg bg-ol-accent ring-1 ring-ol-accent/40"
              />
              <h3 className="text-xl font-semibold tracking-tight text-ol-ink">{s.title}</h3>
              <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-ol-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
