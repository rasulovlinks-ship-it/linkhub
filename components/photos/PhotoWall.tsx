"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import type { PhotoItem } from "@/lib/types";
import Bi, { biString, type Langs } from "@/components/luxe/Bi";
import Pic from "./Pic";
import styles from "./PhotoWall.module.css";

/**
 * A list of cake pictures that each open full-screen in a viewer (arrows,
 * swipe, Esc to close). The parent template decides how the list looks by
 * passing its own classes; this component only owns behaviour and the viewer.
 */
export default function PhotoWall({
  items,
  langs,
  ink,
  listClass,
  tileClass,
  labels,
}: {
  items: PhotoItem[];
  langs: Langs;
  ink: string;
  listClass: string;
  tileClass: string;
  labels: { open: string; close: string; prev: string; next: string };
}) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<number | null>(null);

  const count = items.length;
  const go = useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)), [count]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const current = index === null ? null : items[index];

  return (
    <>
      <ul className={listClass}>
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              className={tileClass}
              onClick={() => setIndex(i)}
              aria-label={`${labels.open} ${i + 1}${item.caption ? `: ${biString(item.caption, langs)}` : ""}`}
            >
              <Pic item={item} index={i} ink={ink} />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={labels.open}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === dialog.current && setIndex(null)}
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          touch.current = null;
          if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
        }}
      >
        {current && (
          <div className={styles.frame}>
            <div className={styles.pic} key={current.id}>
              <Pic item={current} index={index ?? 0} ink={ink} priority />
            </div>
            {current.caption && (
              <p className={styles.caption}>
                <Bi t={current.caption} langs={langs} />
              </p>
            )}
            <p className={styles.counter}>
              {(index ?? 0) + 1} / {count}
            </p>
          </div>
        )}
        <button type="button" className={`${styles.btn} ${styles.close}`} onClick={() => setIndex(null)} aria-label={labels.close}>
          <XMarkIcon className="size-6" aria-hidden />
        </button>
        {count > 1 && (
          <>
            <button type="button" className={`${styles.btn} ${styles.prev}`} onClick={() => go(-1)} aria-label={labels.prev}>
              <ChevronLeftIcon className="size-6" aria-hidden />
            </button>
            <button type="button" className={`${styles.btn} ${styles.next}`} onClick={() => go(1)} aria-label={labels.next}>
              <ChevronRightIcon className="size-6" aria-hidden />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
