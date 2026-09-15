"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

type Piece = {
  key: string;
  src: string;
  wrapperStyle: CSSProperties;
  outY: number;
};

const PIECES: Piece[] = [
  { key: "top", src: "/sites/babyland/puffs/door-top.webp", wrapperStyle: { top: "-8%", left: 0, width: "100%", height: "58%" }, outY: -102 },
  { key: "bottom", src: "/sites/babyland/puffs/door-bottom.webp", wrapperStyle: { bottom: "-8%", left: 0, width: "100%", height: "58%" }, outY: 102 },
];

/**
 * Wraps a photo with 2 cloud-band pieces (cropped from the client's own
 * cloud artwork) sitting on top of it, one covering the top, one the
 * bottom, overlapping in the middle so together they fully cover the
 * photo at rest. As the user scrolls the card up through the viewport,
 * each piece continuously slides out (up/down) in step with the scroll
 * position, parting to reveal the photo underneath.
 */
export default function CloudReveal({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = ref.current;
    const pieces = pieceRefs.current;
    if (!el || pieces.some((p) => !p)) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      PIECES.forEach((p, i) => {
        pieces[i]!.style.transform = `translateY(${p.outY}%)`;
      });
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
      PIECES.forEach((p, i) => {
        pieces[i]!.style.transform = `translateY(${p.outY * progress}%)`;
      });
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
      {PIECES.map((p, i) => (
        <div
          key={p.key}
          ref={(node) => {
            pieceRefs.current[i] = node;
          }}
          aria-hidden="true"
          className="absolute z-10 overflow-hidden"
          style={p.wrapperStyle}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}
