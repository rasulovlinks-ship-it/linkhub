"use client";

import { useEffect } from "react";
import styles from "./ScentProfile.module.css";

/**
 * Scroll reveal for `.rv` elements (neighbours entering together appear one
 * after another), and the phone bottom bar, shown once the hero buttons
 * (#sc-cta) have scrolled up out of view.
 */
export default function ScentMotion() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(`.${styles.rv}`);
    const show = (el: HTMLElement) => el.setAttribute("data-shown", "");
    const dock = document.querySelector<HTMLElement>(`.${styles.dock}`);
    const cta = document.getElementById("sc-cta");

    if (!("IntersectionObserver" in window)) {
      items.forEach(show);
      dock?.setAttribute("data-on", "");
      return;
    }

    const reveal = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(order++, 5) * 90}ms`;
          show(el);
          reveal.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
    );
    items.forEach((el) => reveal.observe(el));

    const bar = new IntersectionObserver(([entry]) => {
      // only once the buttons are above the screen, not before they scroll in
      dock?.toggleAttribute("data-on", !entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    if (cta && dock) bar.observe(cta);

    return () => {
      reveal.disconnect();
      bar.disconnect();
    };
  }, []);

  return null;
}
