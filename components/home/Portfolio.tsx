import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import type { Dict, Lang } from "@/lib/i18n";
import { getSiteBySlug } from "@/lib/sites";
import { LinkIcon } from "@/components/icons";
import showcase from "@/data/showcase.json";
import PhoneFrame from "./PhoneFrame";

export default function Portfolio({ dict, lang }: { dict: Dict; lang: Lang }) {
  const t = dict.work;
  const clients = showcase.clients.map((c) => ({ ...c, name: getSiteBySlug(c.slug)?.name ?? c.slug }));
  const templates = showcase.templates.map((c) => ({ ...c, name: getSiteBySlug(c.slug)?.name ?? c.slug }));

  return (
    <section id="work" className="scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="max-w-[40ch]">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance text-ol-ink md:text-[2.6rem] md:leading-[1.1]">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-ol-muted">{t.text}</p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {clients.map((c, i) => (
            <article
              key={c.slug}
              data-reveal
              style={{ ["--i" as string]: i }}
              className="group grid grid-cols-[minmax(0,150px)_1fr] items-center gap-6 rounded-[20px] border border-ol-line bg-ol-surface p-5 sm:grid-cols-[190px_1fr] sm:gap-8 sm:p-7"
            >
              <PhoneFrame
                src={c.screenshot}
                alt={c.name}
                className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1.5 group-hover:-rotate-1"
              />
              <div className="min-w-0">
                <p className="text-sm text-ol-muted">{c.category[lang]}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-ol-ink sm:text-2xl">{c.name}</h3>
                <p className="mt-3 truncate font-mono text-sm text-ol-accent-strong">{c.domain}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href={`https://${c.domain}`}
                    target="_blank"
                    rel="noopener"
                    className="ol-btn ol-btn-ghost h-10! px-4! text-sm!"
                  >
                    {t.open}
                    <ArrowUpRightIcon className="size-4" aria-hidden />
                  </a>
                  {c.instagram && (
                    <a
                      href={c.instagram}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${c.name} ${t.instagram}`}
                      className="ol-btn ol-btn-ghost size-10! px-0!"
                    >
                      <LinkIcon type="instagram" className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <h3 data-reveal className="mt-16 text-lg font-semibold tracking-tight text-ol-ink">
          {t.templates}
        </h3>
        <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:overflow-visible sm:px-0 sm:pb-0">
          {templates.map((c, i) => (
            <a
              key={c.slug}
              href={`/s/${c.slug}`}
              target="_blank"
              data-reveal
              style={{ ["--i" as string]: i }}
              className="group w-[44%] shrink-0 snap-start sm:w-auto"
            >
              <PhoneFrame
                src={c.screenshot}
                alt={c.name}
                className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1.5"
              />
              <p className="mt-4 text-[15px] font-medium text-ol-ink">{c.name}</p>
              <p className="text-sm text-ol-muted">{c.category[lang]}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
