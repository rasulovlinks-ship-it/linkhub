"use client";

import { useEffect } from "react";

/**
 * Scroll behaviour for the "pop" and "menu" pages: elements with data-reveal pop in the
 * first time they are seen (staggered when they arrive together), and, when a
 * ctaId is given, the sticky order bar shows once that button has scrolled away.
 * The hidden starting states only apply after the page sets data-rv, so
 * everything stays visible without JS.
 */
export default function ScrollMotion({ rootId, ctaId }: { rootId: string; ctaId?: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    const cta = ctaId ? document.getElementById(ctaId) : null;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const show = (el: HTMLElement) => el.setAttribute("data-shown", "");

    if (!("IntersectionObserver" in window)) {
      items.forEach(show);
      return;
    }

    const reveal = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(order++, 5) * 70}ms`;
          show(el);
          reveal.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
    );
    items.forEach((el) => reveal.observe(el));

    let bar: IntersectionObserver | undefined;
    if (cta) {
      bar = new IntersectionObserver(
        ([entry]) => {
          // Only show the bar once the button has left through the top
          const gone = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          root.toggleAttribute("data-bar", gone);
        },
        { threshold: 0 },
      );
      bar.observe(cta);
    }

    return () => {
      reveal.disconnect();
      bar?.disconnect();
    };
  }, [rootId, ctaId]);

  return null;
}
