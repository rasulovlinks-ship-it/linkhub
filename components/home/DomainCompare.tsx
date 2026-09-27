import { CheckIcon, XMarkIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import type { Dict, Lang } from "@/lib/i18n";
import PhoneFrame from "./PhoneFrame";

/**
 * One address as a pill whose width follows its length, so the platform link
 * reads visibly longer than the client's own domain. The platform prefix
 * ("taplink.cc/") is tinted as the part the client no longer needs.
 */
function AddressLength({
  url,
  maxLength,
  chars,
  muted,
}: {
  url: string;
  maxLength: number;
  chars: string;
  muted?: boolean;
}) {
  const slash = url.indexOf("/") + 1;
  return (
    <div className="grid grid-cols-[1fr_5.75rem] items-center gap-3 sm:grid-cols-[1fr_7rem]">
      <div className="flex min-w-0">
        <div
          style={{ width: `${(url.length / maxLength) * 100}%` }}
          className={`flex min-w-fit items-center gap-2 rounded-full border px-3.5 py-2.5 font-mono text-[13px] sm:px-4 sm:py-3 sm:text-base ${
            muted
              ? "border-ol-line bg-ol-surface-2 text-ol-muted"
              : "border-ol-accent/30 bg-ol-surface text-ol-ink shadow-[0_12px_32px_-18px_var(--ol-accent)]"
          }`}
        >
          <LockClosedIcon className={`size-3.5 shrink-0 ${muted ? "opacity-50" : "text-ol-accent"}`} aria-hidden />
          <span className="whitespace-nowrap">
            {slash > 0 && (
              <span className="text-rose-600 decoration-rose-600/40 underline decoration-wavy underline-offset-4 dark:text-rose-400">
                {url.slice(0, slash)}
              </span>
            )}
            {url.slice(slash)}
          </span>
        </div>
      </div>
      <span className={`text-sm tabular-nums ${muted ? "text-ol-muted" : "font-medium text-ol-ink"}`}>
        {url.length} {chars}
      </span>
    </div>
  );
}

export default function DomainCompare({ dict, lang }: { dict: Dict; lang: Lang }) {
  const t = dict.compare;
  const maxLength = Math.max(t.theirsUrl.length, t.oursUrl.length);
  const plural = new Intl.PluralRules(lang === "ru" ? "ru" : "uz");
  const chars = (n: number) => t.chars[plural.select(n)] ?? t.chars.other;
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div data-reveal className="max-w-[40ch]">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance text-ol-ink md:text-[2.6rem] md:leading-[1.1]">
            {t.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ol-muted">{t.text}</p>
        </div>

        <div data-reveal className="mt-10 md:max-w-2xl">
          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            <figure className="min-w-0">
              <figcaption className="mb-3 px-1 text-sm text-ol-muted">{t.before}</figcaption>
              <PhoneFrame src="/showcase/tortiroda-before.jpg" alt={t.beforeAlt} className="opacity-90 saturate-50" />
            </figure>
            <figure className="min-w-0">
              <figcaption className="mb-3 px-1 text-sm font-medium text-ol-accent-strong">{t.after}</figcaption>
              <PhoneFrame src="/showcase/tortiroda.jpg" alt={t.afterAlt} />
            </figure>
          </div>
          <div className="mt-8 space-y-3">
            <AddressLength url={t.theirsUrl} maxLength={maxLength} chars={chars(t.theirsUrl.length)} muted />
            <AddressLength url={t.oursUrl} maxLength={maxLength} chars={chars(t.oursUrl.length)} />
          </div>
        </div>

        <div data-reveal className="mt-10 overflow-hidden rounded-[20px] border border-ol-line bg-ol-surface">
          <div className="grid grid-cols-[1fr_1fr] text-sm sm:grid-cols-[0.8fr_1fr_1fr]">
            <div className="hidden sm:block" />
            <div className="px-4 pt-5 pb-3 text-ol-muted sm:px-5">{t.theirs}</div>
            <div className="bg-ol-accent-soft/60 px-4 pt-5 pb-3 font-semibold text-ol-accent-strong sm:px-5">
              {t.ours}
            </div>
            {t.rows.map((row) => (
              <div key={row.label} className="contents">
                <div className="col-span-2 px-4 pt-4 text-[13px] font-medium text-ol-ink sm:col-span-1 sm:px-5 sm:py-4 sm:text-sm">
                  {row.label}
                </div>
                <div className="flex items-start gap-2 px-4 py-2 text-ol-muted sm:px-5 sm:py-4">
                  <XMarkIcon className="mt-0.5 size-4 shrink-0 opacity-50" aria-hidden />
                  {row.theirs}
                </div>
                <div className="flex items-start gap-2 bg-ol-accent-soft/60 px-4 py-2 text-ol-ink sm:px-5 sm:py-4">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-ol-accent" aria-hidden />
                  {row.ours}
                </div>
              </div>
            ))}
            <div className="hidden h-3 sm:block" />
            <div className="h-3" />
            <div className="h-3 bg-ol-accent-soft/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
