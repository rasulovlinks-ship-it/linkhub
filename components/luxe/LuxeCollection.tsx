"use client";

import { useRef, useState } from "react";
import type { TouchEvent } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { BiText, LuxePiece } from "@/lib/types";
import Bi, { biString, type Langs } from "./Bi";
import styles from "./LuxeProfile.module.css";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lx-gold)";

const number = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Editorial two-column grid (second column dropped half a step) whose
 * pieces open a full-screen viewer: native <dialog>, arrow keys, swipe,
 * Esc / backdrop tap to close.
 */
export default function LuxeCollection({
  pieces,
  langs,
  labels,
}: {
  pieces: LuxePiece[];
  langs: Langs;
  labels: { close?: BiText; prev?: BiText; next?: BiText; open?: BiText };
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const piece = pieces[index];

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = (delta: number) => setIndex((i) => (i + delta + pieces.length) % pieces.length);

  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-3.5 gap-y-8 pb-12 [&>li:nth-child(even)]:translate-y-12">
        {pieces.map((p, i) => (
          <li key={p.id} className={styles.rv}>
            <button
              type="button"
              onClick={() => open(i)}
              className={`group block w-full cursor-pointer text-left ${FOCUS} rounded-[20px]`}
            >
              <span className="relative block aspect-[3/4] overflow-hidden rounded-[20px] bg-white/5 ring-1 ring-(--lx-gold)/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.photoUrl}
                  alt={biString(p.title, langs)}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="pointer-events-none absolute inset-2 rounded-[14px] border border-white/35" />
                <span className="absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full bg-black/45 text-white ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <MagnifyingGlassPlusIcon className="size-4" aria-hidden />
                  <span className="sr-only">
                    <Bi t={labels.open} langs={langs} />
                  </span>
                </span>
              </span>
              <span className="mt-3.5 block text-[10px] font-semibold tracking-[0.3em] text-(--lx-gold) uppercase">
                No. {number(i)}
              </span>
              <span className={`${styles.serif} mt-1 block text-[1.3rem] leading-[1.1] font-medium`}>
                <Bi t={p.title} langs={langs} />
              </span>
              {p.detail && (
                <span className="mt-1.5 block text-xs leading-relaxed text-(--lx-ink)/55">
                  <Bi t={p.detail} langs={langs} />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={biString(piece.title, langs)}
        className={`${styles.viewer} fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-(--lx-ink)`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="mx-auto flex h-full max-w-[520px] flex-col px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
          onClick={(e) => {
            if (e.target === e.currentTarget) dialogRef.current?.close();
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-[0.3em] text-(--lx-gold)">
              {number(index)} / {number(pieces.length - 1)}
            </span>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className={`flex size-11 cursor-pointer items-center justify-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-white/10 ${FOCUS}`}
            >
              <XMarkIcon className="size-5" aria-hidden />
              <span className="sr-only">
                <Bi t={labels.close} langs={langs} />
              </span>
            </button>
          </div>

          <figure className="flex min-h-0 flex-1 flex-col items-center justify-center py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={piece.id}
              src={piece.photoUrl}
              alt={biString(piece.title, langs)}
              className={`${styles.fadeIn} max-h-full min-h-0 w-auto max-w-full rounded-2xl object-contain ring-1 ring-(--lx-gold)/35`}
            />
          </figure>

          <figcaption className="text-center">
            <p className={`${styles.serif} text-3xl leading-tight font-medium`}>
              <Bi t={piece.title} langs={langs} />
            </p>
            {piece.detail && (
              <p className="mt-1.5 text-sm text-(--lx-ink)/60">
                <Bi t={piece.detail} langs={langs} />
              </p>
            )}
          </figcaption>

          <div className="mt-5 flex items-center justify-center gap-4">
            {[
              { delta: -1, Icon: ChevronLeftIcon, label: labels.prev },
              { delta: 1, Icon: ChevronRightIcon, label: labels.next },
            ].map(({ delta, Icon, label }) => (
              <button
                key={delta}
                type="button"
                onClick={() => step(delta)}
                className={`flex size-12 cursor-pointer items-center justify-center rounded-full ring-1 ring-(--lx-gold)/50 text-(--lx-gold) transition-colors hover:bg-(--lx-gold)/10 ${FOCUS}`}
              >
                <Icon className="size-5" aria-hidden />
                <span className="sr-only">
                  <Bi t={label} langs={langs} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
