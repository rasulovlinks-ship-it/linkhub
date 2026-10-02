"use client";

import { useEffect, useState } from "react";
import type { ScentProduct } from "@/lib/types";
import { fetchStarred } from "@/lib/scentShop";
import Bi, { biString, type Langs } from "@/components/luxe/Bi";
import styles from "./ScentProfile.module.css";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--sc-accent)";

function ProductCard({ p, langs }: { p: ScentProduct; langs: Langs }) {
  return (
    <a href={p.url} className={`group block snap-start ${FOCUS} rounded-3xl`}>
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-(--sc-surface) ring-1 ring-(--sc-line)">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.photoUrl}
          alt={biString(p.name, langs)}
          loading="lazy"
          className="size-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      {p.brand && (
        <p className="mt-3 truncate text-[11px] font-semibold tracking-[0.12em] text-(--sc-muted) uppercase">
          {p.brand}
        </p>
      )}
      <p className={`${p.brand ? "mt-0.5" : "mt-3"} line-clamp-2 text-[15px] leading-snug font-medium`}>
        <Bi t={p.name} langs={langs} />
      </p>
      {p.price && (
        <p className="mt-1 text-sm font-semibold text-(--sc-accent-ink) tabular-nums">
          <Bi t={p.price} langs={langs} />
        </p>
      )}
    </a>
  );
}

/**
 * The shelf of products. With a `source` (the shop's starred products) the
 * page is built with the list as it was then, and every visit asks the shop
 * again, so a star set or removed in the shop's admin shows up here without
 * rebuilding the page.
 */
export default function ScentShelf({
  initial,
  source,
  langs,
}: {
  initial: ScentProduct[];
  source?: { api: string; shop: string };
  langs: Langs;
}) {
  const [items, setItems] = useState(initial);

  useEffect(() => {
    if (!source) return;
    let live = true;
    fetchStarred(source).then((list) => {
      if (live && list?.length) setItems(list);
    });
    return () => {
      live = false;
    };
  }, [source]);

  return (
    <div
      className={`${styles.shelf} -mx-5 mt-8 grid auto-cols-[46%] grid-flow-col gap-3.5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:auto-cols-[30%] sm:px-8 lg:mx-0 lg:grid-flow-row lg:grid-cols-4 lg:gap-x-5 lg:gap-y-9 lg:overflow-visible lg:px-0`}
    >
      {items.map((p) => (
        <ProductCard key={p.id} p={p} langs={langs} />
      ))}
    </div>
  );
}
