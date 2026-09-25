"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole page: every [data-reveal] element
 * gets [data-shown] the first time it enters the viewport. The hidden
 * starting state only applies under .ol-js (see globals.css), so content is
 * visible without JS and for crawlers.
 */
export default function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-shown", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
