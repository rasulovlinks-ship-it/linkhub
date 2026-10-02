"use client";

import { useEffect, useRef, useState } from "react";
import type { PhotoItem } from "@/lib/types";
import { biString, type Langs } from "@/components/luxe/Bi";
import Pic from "@/components/photos/Pic";
import styles from "./SliderProfile.module.css";

/**
 * Swipeable photos, one per screen width, with story-style progress bars
 * along the top. Taps on the left/right bars (or the keyboard) jump between
 * photos; the browser's own scroll-snap does the swiping.
 */
export default function SliderTrack({
  items,
  langs,
  ink,
  labels,
}: {
  items: PhotoItem[];
  langs: Langs;
  ink: string;
  labels: { slide: string; prev: string; next: string };
}) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setActive(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = (i + items.length) % items.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <>
      <ul className={styles.track} ref={track} aria-roledescription="carousel" tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") goTo(active + 1);
          if (e.key === "ArrowLeft") goTo(active - 1);
        }}
      >
        {items.map((item, i) => (
          <li key={item.id} className={styles.slide} aria-label={`${labels.slide} ${i + 1} / ${items.length}`}>
            <Pic item={item} index={i} ink={ink} priority={i === 0} alt={item.caption ? biString(item.caption, langs) : ""} />
          </li>
        ))}
      </ul>
      {items.length > 1 && (
        <div className={styles.bars}>
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={styles.bar}
              data-on={i <= active || undefined}
              data-current={i === active || undefined}
              aria-label={`${labels.slide} ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </>
  );
}
