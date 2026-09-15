"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

const CLOUD_PATH =
  "M30,140 C10,140 0,115 15,100 C0,85 10,60 35,60 C35,35 60,15 90,25 C100,5 135,0 155,20 C175,0 210,5 215,30 C245,25 265,50 250,70 C270,85 265,115 240,120 C245,140 220,150 195,140 Z";

function CloudShape({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 270 150" preserveAspectRatio="none" className={className} style={style} aria-hidden="true">
      <path d={CLOUD_PATH} fill="#fbcfe8" stroke="#be185d" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

type Corner = "tl" | "tr" | "bl" | "br";

const CORNERS: {
  corner: Corner;
  wrapperStyle: CSSProperties;
  flip: string;
  outX: number;
  outY: number;
}[] = [
  { corner: "tl", wrapperStyle: { top: "-10%", left: "-8%" }, flip: "", outX: -55, outY: -55 },
  { corner: "tr", wrapperStyle: { top: "-10%", right: "-8%" }, flip: "scaleX(-1)", outX: 55, outY: -55 },
  { corner: "bl", wrapperStyle: { bottom: "-10%", left: "-8%" }, flip: "scaleY(-1)", outX: -55, outY: 55 },
  { corner: "br", wrapperStyle: { bottom: "-10%", right: "-8%" }, flip: "scale(-1,-1)", outX: 55, outY: 55 },
];

/**
 * Wraps a photo with 4 flat cartoon cloud pieces sitting on top of it,
 * one per corner, sized and overlapped so together they fully cover the
 * photo at rest. As the user scrolls the card up through the viewport,
 * each piece continuously slides out toward its own corner in step with
 * the scroll position, parting to reveal the photo underneath.
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
      CORNERS.forEach((c, i) => {
        pieces[i]!.style.transform = `translate(${c.outX}%, ${c.outY}%)`;
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
      CORNERS.forEach((c, i) => {
        pieces[i]!.style.transform = `translate(${c.outX * progress}%, ${c.outY * progress}%)`;
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
      {CORNERS.map((c, i) => (
        <div
          key={c.corner}
          ref={(node) => {
            pieceRefs.current[i] = node;
          }}
          aria-hidden="true"
          className="absolute z-10 h-[65%] w-[65%]"
          style={c.wrapperStyle}
        >
          <CloudShape className="h-full w-full" style={{ transform: c.flip }} />
        </div>
      ))}
    </div>
  );
}
