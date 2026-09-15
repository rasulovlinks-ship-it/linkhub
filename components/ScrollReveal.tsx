"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Wraps children so they start hidden (off to one side) and slide in +
 * fade in the first time they scroll into view. Direction alternates
 * per card based on its position, matching the "opens as you scroll to
 * it" effect requested for the service-card list.
 */
export default function ScrollReveal({
  children,
  direction = "left",
  className = "",
}: {
  children: ReactNode;
  direction?: "left" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? "linkhub-scroll-visible" : "linkhub-scroll-hidden"} ${className}`}
      style={{ ["--reveal-x" as string]: direction === "left" ? "-72px" : "72px" } as CSSProperties}
    >
      {children}
    </div>
  );
}
