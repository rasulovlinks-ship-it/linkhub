import { PlusIcon } from "@heroicons/react/20/solid";
import type { Dict } from "@/lib/i18n";
import { CONTACT_LINKS } from "@/lib/brand";

export default function Faq({ dict }: { dict: Dict }) {
  const t = dict.faq;
  return (
    <section id="faq" className="scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div data-reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance text-ol-ink md:text-[2.6rem] md:leading-[1.1]">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-ol-muted">
            <a href={CONTACT_LINKS.telegram} target="_blank" rel="noopener" className="underline decoration-ol-line underline-offset-4 hover:text-ol-accent-strong hover:decoration-ol-accent">
              {t.text}
            </a>
          </p>
        </div>
        <div data-reveal className="grid gap-2">
          {t.items.map((item) => (
            <details key={item.q} className="ol-faq group rounded-[14px] bg-ol-surface open:bg-ol-surface-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-medium text-ol-ink sm:text-base [&::-webkit-details-marker]:hidden">
                {item.q}
                <PlusIcon className="size-5 shrink-0 text-ol-muted transition-transform duration-300 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="px-5 pb-5 text-[15px] leading-relaxed text-ol-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
