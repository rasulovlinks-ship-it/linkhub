import { CheckIcon, XMarkIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import type { Dict } from "@/lib/i18n";

function AddressBar({ url, muted }: { url: string; muted?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-4 py-3 font-mono text-[13px] sm:text-sm ${
        muted
          ? "border-ol-line bg-ol-surface-2 text-ol-muted"
          : "border-ol-accent/30 bg-ol-surface text-ol-ink shadow-[0_12px_32px_-18px_var(--ol-accent)]"
      }`}
    >
      <LockClosedIcon className={`size-3.5 shrink-0 ${muted ? "opacity-50" : "text-ol-accent"}`} aria-hidden />
      <span className="truncate">{url}</span>
    </div>
  );
}

export default function DomainCompare({ dict }: { dict: Dict }) {
  const t = dict.compare;
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-4xl">
        <div data-reveal className="max-w-[40ch]">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance text-ol-ink md:text-[2.6rem] md:leading-[1.1]">
            {t.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ol-muted">{t.text}</p>
        </div>

        <div data-reveal className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div>
            <p className="mb-2 px-1 text-sm text-ol-muted">{t.theirs}</p>
            <AddressBar url={t.theirsUrl} muted />
          </div>
          <div>
            <p className="mb-2 px-1 text-sm font-medium text-ol-accent">{t.ours}</p>
            <AddressBar url={t.oursUrl} />
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
