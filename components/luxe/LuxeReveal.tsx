"use client";

import { useEffect } from "react";
import styles from "./LuxeProfile.module.css";

/**
 * Marks each `.rv` element as shown the first time it scrolls into view.
 * Elements entering together (a row of photos, a list) get increasing
 * delays so they appear one after another. The hidden starting state only
 * applies once the inline script has set data-rv on the page, so the
 * content stays visible without JS.
 */
export default function LuxeReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(`.${styles.rv}`);
    const show = (el: HTMLElement) => el.setAttribute("data-shown", "");

    if (!("IntersectionObserver" in window)) {
      items.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(order++, 5) * 120}ms`;
          show(el);
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
