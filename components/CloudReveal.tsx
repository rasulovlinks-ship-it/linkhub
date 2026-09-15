"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Wraps a photo with two cloud "doors" sitting on top of it. The photo
 * starts fully hidden behind them, and as the user scrolls the card up
 * through the viewport the doors continuously slide left/right in step
 * with the scroll position, parting to reveal the photo underneath.
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
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const leftDoor = leftRef.current;
    const rightDoor = rightRef.current;
    if (!el || !leftDoor || !rightDoor) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      leftDoor.style.transform = "translateX(-105%)";
      rightDoor.style.transform = "translateX(105%)";
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 = card just entering the bottom of the viewport (fully closed),
      // 1 = card top has scrolled ~65% of the viewport height up (fully open).
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.65)));
      leftDoor.style.transform = `translateX(${-105 * progress}%)`;
      rightDoor.style.transform = `translateX(${105 * progress}%)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
      <div
        ref={leftRef}
        aria-hidden="true"
        className="linkhub-cloud-door linkhub-cloud-door-left"
        style={{ backgroundImage: `url(${cloudLeftUrl})` }}
      />
      <div
        ref={rightRef}
        aria-hidden="true"
        className="linkhub-cloud-door linkhub-cloud-door-right"
        style={{ backgroundImage: `url(${cloudRightUrl})` }}
      />
    </div>
  );
}
