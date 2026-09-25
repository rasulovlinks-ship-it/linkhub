"use client";

import { useId, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { COMPETITOR_MONTHLY_USD } from "@/lib/brand";

export default function SavingsCalculator({ dict }: { dict: Dict }) {
  const t = dict.calc;
  const [months, setMonths] = useState(24);
  const id = useId();
  const spent = months * COMPETITOR_MONTHLY_USD;
  const fill = ((months - 1) / 59) * 100;

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28">
      <div
        data-reveal
        className="mx-auto max-w-4xl rounded-[20px] border border-ol-line bg-ol-surface p-6 sm:p-10 md:p-12"
      >
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ol-ink md:text-[2.6rem] md:leading-[1.1]">
          {t.title}
        </h2>
        <p className="mt-3 text-lg text-ol-muted">{t.text}</p>

        <div className="mt-10">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={id} className="text-sm font-medium text-ol-ink">
              {t.monthsLabel}
            </label>
            <output htmlFor={id} className="font-display text-xl font-semibold text-ol-ink tabular-nums">
              {months} {t.monthsUnit}
            </output>
          </div>
          <input
            id={id}
            type="range"
            min={1}
            max={60}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="ol-range mt-4 w-full"
            style={{ ["--fill" as string]: `${fill}%` }}
          />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[14px] bg-ol-surface-2 p-5 sm:p-6">
            <p className="text-sm text-ol-muted">{t.spentLabel}</p>
            <p className="mt-2 font-display text-5xl font-semibold tracking-tight text-ol-ink tabular-nums">
              ${spent}
            </p>
          </div>
          <div className="rounded-[14px] bg-ol-accent-soft p-5 sm:p-6">
            <p className="text-sm text-ol-accent-strong">{t.oursLabel}</p>
            <p className="mt-3 text-xl font-semibold tracking-tight text-ol-ink">{t.oursValue}</p>
          </div>
        </div>
        <p className="mt-5 text-[13px] text-ol-muted">{t.footnote}</p>
      </div>
    </section>
  );
}
