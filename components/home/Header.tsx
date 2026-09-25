"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { CONTACT_LINKS } from "@/lib/brand";
import { LinkIcon } from "@/components/icons";

export default function Header({ dict, showReviews }: { dict: Dict; showReviews: boolean }) {
  const t = dict.nav;
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} className="absolute top-0 h-6 w-px" aria-hidden />
      <header
        data-scrolled={scrolled || undefined}
        className="fixed inset-x-0 top-0 z-40 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300 data-scrolled:border-ol-line data-scrolled:bg-ol-bg/80 data-scrolled:backdrop-blur-xl"
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
          <a href="#top" className="font-display text-[17px] font-semibold tracking-tight text-ol-ink">
            ownlink<span className="text-ol-accent">.uz</span>
          </a>
          <div className="ml-auto hidden items-center gap-7 text-sm text-ol-muted md:flex">
            <a href="#why" className="transition-colors hover:text-ol-ink">{t.why}</a>
            <a href="#work" className="transition-colors hover:text-ol-ink">{t.work}</a>
            {showReviews && (
              <a href="#reviews" className="transition-colors hover:text-ol-ink">{t.reviews}</a>
            )}
            <a href="#faq" className="transition-colors hover:text-ol-ink">{t.faq}</a>
          </div>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <a
              href={t.switchHref}
              hrefLang={t.switchShort.toLowerCase()}
              aria-label={t.switchLabel}
              className="rounded-full px-3 py-2 text-sm font-medium text-ol-muted transition-colors hover:text-ol-ink"
            >
              {t.switchShort}
            </a>
            <a
              href={CONTACT_LINKS.telegram}
              target="_blank"
              rel="noopener"
              className="ol-btn ol-btn-primary h-10! px-4! text-sm!"
            >
              <LinkIcon type="telegram" className="size-4 sm:hidden" />
              <span className="max-sm:sr-only">{t.cta}</span>
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
