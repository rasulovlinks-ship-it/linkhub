import type { Dict, Lang } from "@/lib/i18n";
import reviews from "@/data/reviews.json";
import Marquee from "@/components/Marquee";

type Review = (typeof reviews)[number];

export function getVisibleReviews(): Review[] {
  const isDev = process.env.NODE_ENV !== "production";
  return reviews.filter((r) => r.published || isDev);
}

/**
 * Curated reviews from data/reviews.json. Unpublished entries (placeholders
 * waiting for a real client quote) only render in development, marked as
 * drafts, so nothing invented ever ships to production.
 */
export default function Reviews({ dict, lang }: { dict: Dict; lang: Lang }) {
  const t = dict.reviews;
  const items = getVisibleReviews();
  if (items.length === 0) return null;

  const card = (r: Review) => (
    <figure className="flex h-full w-[300px] flex-col rounded-[20px] border border-ol-line bg-ol-surface p-6 sm:w-[360px]">
      {!r.published && (
        <span className="mb-3 self-start rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-900">
          {t.draft}
        </span>
      )}
      <blockquote className="line-clamp-3 text-[15px] leading-relaxed text-ol-ink">
        &ldquo;{r.text[lang]}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        {r.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.avatar} alt="" width={40} height={40} loading="lazy" className="size-10 rounded-full object-cover" />
        ) : (
          <span className="grid size-10 place-items-center rounded-full bg-ol-accent-soft text-sm font-semibold text-ol-accent-strong">
            {r.name.charAt(0)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-ol-ink">{r.name}</span>
          <a href={r.url} target="_blank" rel="noopener" className="block truncate text-sm text-ol-muted hover:text-ol-accent-strong">
            {r.business}
          </a>
        </span>
      </figcaption>
    </figure>
  );

  return (
    <section id="reviews" className="scroll-mt-20 py-20 md:py-28">
      <h2
        data-reveal
        className="mx-auto max-w-6xl px-4 font-display text-3xl font-semibold tracking-tight text-ol-ink sm:px-6 md:text-[2.6rem] md:leading-[1.1]"
      >
        {t.title}
      </h2>
      <div data-reveal className="mt-12">
        {items.length >= 3 ? (
          <Marquee duration="60s" gap="1rem">
            {items.map((r) => (
              <div key={r.name} className="h-full">{card(r)}</div>
            ))}
          </Marquee>
        ) : (
          <div className="mx-auto flex max-w-6xl snap-x gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:px-6">
            {items.map((r) => (
              <div key={r.name} className="shrink-0 snap-start">{card(r)}</div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
