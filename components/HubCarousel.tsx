"use client";

import { Children, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

const RESUME_DELAY_MS = 2500;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

function PlayPauseIcon({ playing }: { playing: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      {playing ? (
        <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
      ) : (
        <path d="M8 5.5v13a.6.6 0 0 0 .9.5l10.4-6.5a.6.6 0 0 0 0-1L8.9 5a.6.6 0 0 0-.9.5Z" />
      )}
    </svg>
  );
}

export type CarouselLabels = { pause: string; play: string; prev: string; next: string };

const DEFAULT_LABELS: CarouselLabels = {
  pause: "Avtomatik aylanishni to'xtatish",
  play: "Avtomatik aylanishni yoqish",
  prev: "Oldingisi",
  next: "Keyingisi",
};

const CONTROL_CLASS =
  "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-(--tpl-ink) shadow-sm ring-1 ring-black/10 transition-[transform,box-shadow] duration-200 hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-primary)";

/**
 * Section header + horizontally scrolling card strip (shared by the EDU and
 * cake templates; colors come from --tpl-primary / --tpl-ink on an ancestor).
 *
 * - Drifts slowly on its own, and loops seamlessly, but only when the cards
 *   actually overflow the row (on a wide desktop that fits everyone, it stays
 *   a static row instead of repeating cards).
 * - Stops while hovered, focused, touched, off-screen, or when the visitor
 *   presses pause; never auto-moves under prefers-reduced-motion.
 * - Always swipeable / draggable / keyboard-scrollable; prev/next buttons on
 *   desktop.
 */
export default function HubCarousel({
  title,
  subtitle,
  label,
  speed = 28,
  labels = DEFAULT_LABELS,
  children,
}: {
  title: string;
  subtitle?: string;
  /** Accessible name for the scrolling region */
  label: string;
  /** Auto-scroll speed in px per second */
  speed?: number;
  /** Accessible names for the carousel controls (defaults to Uzbek) */
  labels?: CarouselLabels;
  children: ReactNode;
}) {
  const items = Children.toArray(children);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [loop, setLoop] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );

  const setWidth = () => setRef.current?.offsetWidth ?? 0;

  const hold = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    holdRef.current = true;
  }, []);

  const releaseSoon = useCallback((delay = RESUME_DELAY_MS) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      holdRef.current = false;
    }, delay);
  }, []);

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

  // Decide whether the cards overflow the row (=> scrollable, and loopable).
  useEffect(() => {
    const scroller = scrollerRef.current;
    const set = setRef.current;
    if (!scroller || !set) return;
    const measure = () => {
      const over = set.offsetWidth > scroller.clientWidth + 4;
      setOverflows(over);
      setLoop(over);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(scroller);
    ro.observe(set);
    return () => ro.disconnect();
  }, [items.length]);

  // Auto-drift.
  const auto = loop && !paused && !reducedMotion;
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !auto) return;

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    let pos = el.scrollLeft;
    let lastSet = pos;
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      if (visible && !holdRef.current) {
        // If something else moved the scroller (drag, button), follow it.
        if (Math.abs(el.scrollLeft - lastSet) > 2) pos = el.scrollLeft;
        const w = setWidth();
        pos += speed * dt;
        if (w > 0 && pos >= w) pos -= w;
        el.scrollLeft = pos;
        lastSet = el.scrollLeft;
      } else {
        pos = el.scrollLeft;
        lastSet = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [auto, speed]);

  // Keep the second (duplicate) set seamless if the visitor scrolls past it.
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el || !loop) return;
    const w = setWidth();
    if (w > 0 && el.scrollLeft >= w) el.scrollLeft -= w;
  };

  const step = () => {
    const first = setRef.current?.firstElementChild as HTMLElement | null;
    return (first?.offsetWidth ?? 240) * 1.5;
  };

  const nudge = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    hold();
    releaseSoon(3500);
    const w = setWidth();
    if (loop && dir === -1 && el.scrollLeft < step()) el.scrollLeft += w;
    el.scrollBy({ left: dir * step(), behavior: reducedMotion ? "auto" : "smooth" });
  };

  const showControls = overflows;

  return (
    <section aria-label={label}>
      <div className="mb-4 flex items-end justify-between gap-4 lg:mb-6">
        <div className="min-w-0">
          <h2 className="text-xl font-extrabold tracking-tight text-balance lg:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-(--tpl-ink)/70 lg:text-base">{subtitle}</p>}
        </div>

        {showControls && (
          <div className="flex shrink-0 items-center gap-2">
            {loop && !reducedMotion && (
              <button
                type="button"
                className={CONTROL_CLASS}
                aria-label={paused ? labels.play : labels.pause}
                aria-pressed={paused}
                onClick={() => setPaused((p) => !p)}
              >
                <PlayPauseIcon playing={!paused} />
              </button>
            )}
            <button
              type="button"
              className={`${CONTROL_CLASS} hidden lg:flex`}
              aria-label={labels.prev}
              onClick={() => nudge(-1)}
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              className={`${CONTROL_CLASS} hidden lg:flex`}
              aria-label={labels.next}
              onClick={() => nudge(1)}
            >
              <Chevron dir="right" />
            </button>
          </div>
        )}
      </div>

      <div
        ref={scrollerRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        className="edu-scroller -mx-4 overflow-x-auto px-4 pb-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-primary) lg:mx-0 lg:px-0"
        onScroll={onScroll}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") hold();
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") releaseSoon(400);
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") hold();
        }}
        onPointerUp={(e) => {
          if (e.pointerType !== "mouse") releaseSoon();
        }}
        onPointerCancel={() => releaseSoon()}
        onFocus={hold}
        onBlur={() => releaseSoon(400)}
      >
        <div className="flex w-max">
          <div ref={setRef} className="flex">
            {items.map((item, i) => (
              <div key={i} className="shrink-0 pr-4">
                {item}
              </div>
            ))}
          </div>
          {loop && (
            <div className="flex" aria-hidden="true">
              {items.map((item, i) => (
                <div key={i} className="shrink-0 pr-4">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
