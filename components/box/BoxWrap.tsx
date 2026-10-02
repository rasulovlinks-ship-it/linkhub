"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./BoxProfile.module.css";

const CONFETTI = ["#ffd84d", "#ffffff", "#ff8fb8", "#7fe0c3", "#8ab4ff", "#ffd84d", "#ffffff", "#ff8fb8"];

function Bow() {
  return (
    <svg viewBox="0 0 160 110" className={styles.bowSvg} aria-hidden>
      <g strokeLinejoin="round" strokeLinecap="round" stroke="#231a4a" strokeWidth="4">
        <path d="M80 62 L48 100 L66 96 L74 108Z" fill="var(--bx-ribbon)" />
        <path d="M80 62 L112 100 L94 96 L86 108Z" fill="var(--bx-ribbon)" />
        <path d="M80 56 C60 14 8 8 12 40 C14 62 52 62 80 56Z" fill="var(--bx-ribbon)" />
        <path d="M80 56 C100 14 152 8 148 40 C146 62 108 62 80 56Z" fill="var(--bx-ribbon)" />
        <path d="M30 34 C42 30 56 34 66 46" fill="none" strokeWidth="3" opacity="0.35" />
        <path d="M130 34 C118 30 104 34 94 46" fill="none" strokeWidth="3" opacity="0.35" />
        <rect x="64" y="42" width="32" height="28" rx="9" fill="var(--bx-ribbon)" />
      </g>
    </svg>
  );
}

/**
 * The gift wrap over the page: two halves of wrapping paper with a ribbon
 * cross. It opens by itself after a moment (or on a tap): the bow pops, the
 * halves slide apart like doors and confetti flies. It only exists once the
 * page's inline script has set data-wrap, so without JS (or with reduced
 * motion) the page is simply open.
 */
export default function BoxWrap({
  rootId,
  openLabel,
  hint,
  autoMs = 1900,
  children,
}: {
  rootId: string;
  /** Accessible name of the open button */
  openLabel: string;
  /** Prompt under the bow */
  hint: ReactNode;
  autoMs?: number;
  /** Written on the gift tag */
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    if (!open) {
      const t = window.setTimeout(() => setOpen(true), autoMs);
      return () => window.clearTimeout(t);
    }
    root.setAttribute("data-open", "");
    const done = window.setTimeout(() => root.setAttribute("data-gone", ""), 1300);
    return () => window.clearTimeout(done);
  }, [open, rootId, autoMs]);

  return (
    <div className={styles.wrap} data-state={open ? "open" : "closed"}>
      <div className={`${styles.half} ${styles.halfL}`} />
      <div className={`${styles.half} ${styles.halfR}`} />
      <button type="button" className={styles.bow} onClick={() => setOpen(true)} aria-label={openLabel}>
        <Bow />
        <span className={styles.giftTag}>{children}</span>
        <span className={styles.hint}>{hint}</span>
      </button>
      {open && (
        <div className={styles.confetti} aria-hidden>
          {CONFETTI.concat(CONFETTI, CONFETTI).map((c, i) => (
            <i
              key={i}
              style={
                {
                  "--a": `${(i / 24) * 360 + (i % 3) * 7}deg`,
                  "--d": `${110 + (i % 5) * 38}px`,
                  "--r": `${(i % 7) * 60 - 150}deg`,
                  background: c,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
