"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * The slip's order number and date, filled in at the visitor's own "today"
 * (so each visit prints a fresh-looking slip). Shows dots until the browser
 * has run, which keeps the server HTML and the first client render equal.
 */
export default function TicketMeta({
  numberLabel,
  dateLabel,
  className,
}: {
  numberLabel: ReactNode;
  dateLabel: ReactNode;
  className?: string;
}) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  let date = "••.••.••••";
  let number = "••••";
  if (now) {
    const start = new Date(now.getFullYear(), 0, 0);
    const day = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
    date = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`;
    number = String(day * 7 + (now.getFullYear() % 100)).padStart(4, "0");
  }

  return (
    <dl className={className}>
      <div>
        <dt>{numberLabel}</dt>
        <dd>{number}</dd>
      </div>
      <div>
        <dt>{dateLabel}</dt>
        <dd>{date}</dd>
      </div>
    </dl>
  );
}
