"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Wraps a photo so it starts fully hidden behind two cloud "doors" and
 * parts them left/right the first time it scrolls into view, revealing
 * the photo underneath.
 */
export default function CloudReveal({
  cloudLeftUrl,
  cloudRightUrl,
  children,
  className = "",
}: {
  cloudLeftUrl: string;
  cloudRightUrl: string;
  children?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
      <div
        aria-hidden="true"
        className={`linkhub-cloud-door linkhub-cloud-door-left ${open ? "linkhub-cloud-door-open" : ""}`}
        style={{ backgroundImage: `url(${cloudLeftUrl})` }}
      />
      <div
        aria-hidden="true"
        className={`linkhub-cloud-door linkhub-cloud-door-right ${open ? "linkhub-cloud-door-open" : ""}`}
        style={{ backgroundImage: `url(${cloudRightUrl})` }}
      />
    </div>
  );
}
