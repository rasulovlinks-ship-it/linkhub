"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { MenuContent, MenuItem } from "@/lib/types";
import Sketch from "@/components/draw/Sketch";
import Bi, { biString, type Langs } from "@/components/luxe/Bi";
import { formatSum, orderUrl } from "@/lib/orderLink";
import styles from "./MenuProfile.module.css";

const MONTHS = {
  uz: ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"],
  ru: ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
} as const;

const DAY = 86_400_000;
const WEEKS = 3;

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const dotted = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;

/** Two-language text without a BiText object (month names, weekday letters) */
function Pair({ uz, ru, langs }: { uz: string; ru: string; langs: Langs }) {
  const by = { uz, ru } as Record<string, string>;
  const primary = by[langs.primary];
  const alt = langs.alt ? by[langs.alt] : primary;
  if (!langs.alt || alt === primary) return <>{primary}</>;
  return (
    <>
      <span data-l="primary">{primary}</span>
      <span data-l="alt">{alt}</span>
    </>
  );
}

function Thumb({ item }: { item: MenuItem }) {
  return (
    <span className={styles.thumb} aria-hidden>
      {item.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.photoUrl} alt="" loading="lazy" />
      ) : (
        <Sketch spec={item.sketch} variant="line" ink="currentColor" paper="transparent" />
      )}
    </span>
  );
}

/**
 * The interactive middle of the page: category tabs and the priced list,
 * the booking strip, and the request that gathers both into one message.
 */
export default function MenuOrder({ menu, langs }: { menu: MenuContent; langs: Langs }) {
  const [tab, setTab] = useState(0);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [date, setDate] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [today, setToday] = useState<Date | null>(null);
  const [panelSeen, setPanelSeen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabMoved = useRef(false);
  const [pill, setPill] = useState({ x: 0, w: 0 });

  useEffect(() => {
    const now = new Date();
    setToday(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  }, []);

  // Slide the tab underline under the active tab
  useEffect(() => {
    const el = tabRefs.current[tab];
    const strip = tabsRef.current;
    if (!el || !strip) return;
    setPill({ x: el.offsetLeft, w: el.offsetWidth });
    // Scroll only the tab strip (never the page), and not on first paint
    if (tabMoved.current) {
      strip.scrollTo({ left: el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
    }
    tabMoved.current = true;
    // Fonts change the tab widths once they load
    document.fonts?.ready.then(() => setPill({ x: el.offsetLeft, w: el.offsetWidth }));
  }, [tab]);

  // The floating summary hides while the full request is on screen
  useEffect(() => {
    const el = panelRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setPanelSeen(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cal = menu.calendar;
  const lead = cal?.leadDays ?? 1;
  const busy = useMemo(() => new Set(cal?.busy ?? []), [cal?.busy]);

  const days = useMemo(() => {
    if (!today) return [];
    const monday = new Date(today.getTime() - ((today.getDay() + 6) % 7) * DAY);
    return Array.from({ length: WEEKS * 7 }, (_, i) => {
      const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
      const status =
        d.getTime() < today.getTime() + lead * DAY
          ? "past"
          : cal?.closedWeekdays?.includes(d.getDay())
            ? "closed"
            : busy.has(iso(d))
              ? "busy"
              : "free";
      return { d, key: iso(d), status };
    });
  }, [today, lead, busy, cal?.closedWeekdays]);

  const all = menu.categories.flatMap((c) => c.items);
  const lines = all.filter((i) => (qty[i.id] ?? 0) > 0);
  const count = lines.reduce((n, i) => n + qty[i.id], 0);
  const total = lines.reduce((sum, i) => sum + i.price * qty[i.id], 0);
  const cur = biString(menu.currency, langs);

  const change = (id: string, delta: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(9, (q[id] ?? 0) + delta)) }));

  const selectedDay = days.find((x) => x.key === date)?.d;
  const message = [
    biString(menu.request.intro, langs),
    ...lines.map((i) => `• ${biString(i.name, langs)} × ${qty[i.id]} — ${formatSum(i.price * qty[i.id])} ${cur}`),
    selectedDay && `${biString(menu.request.dateLabel, langs)}: ${dotted(selectedDay)}`,
    name.trim() && `${biString(menu.request.nameLabel, langs)}: ${name.trim()}`,
    lines.length > 0 && `${biString(menu.request.totalLabel, langs)}: ${formatSum(total)} ${cur}`,
  ]
    .filter(Boolean)
    .join("\n");

  const category = menu.categories[tab];

  return (
    <>
      {/* ── Menu ── */}
      <section className={styles.section} id="menu">
        <header className={styles.head} data-reveal>
          <h2>
            <Bi t={menu.menuTitle} langs={langs} />
          </h2>
          {menu.menuSubtitle && (
            <p>
              <Bi t={menu.menuSubtitle} langs={langs} />
            </p>
          )}
        </header>

        <div className={styles.tabsWrap}>
          <div className={styles.tabs} role="tablist" ref={tabsRef}>
            <span className={styles.pill} style={{ transform: `translateX(${pill.x}px)`, width: pill.w }} aria-hidden />
            {menu.categories.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                aria-selected={i === tab}
                className={styles.tab}
                onClick={() => setTab(i)}
              >
                <Bi t={c.title} langs={langs} />
              </button>
            ))}
          </div>
        </div>

        <ul className={styles.list} key={category.id} role="tabpanel">
          {category.items.map((item, i) => {
            const n = qty[item.id] ?? 0;
            return (
              <li key={item.id} className={styles.row} style={{ animationDelay: `${i * 45}ms` }} data-on={n > 0 || undefined}>
                <Thumb item={item} />
                <div className={styles.rowMain}>
                  <div className={styles.rowTop}>
                    <h3>
                      <Bi t={item.name} langs={langs} />
                    </h3>
                    <i className={styles.leader} aria-hidden />
                    <span className={styles.rowPrice}>{formatSum(item.price)}</span>
                  </div>
                  {(item.note || item.size) && (
                    <p>
                      {item.note && <Bi t={item.note} langs={langs} />}
                      {item.note && item.size && " · "}
                      {item.size && <Bi t={item.size} langs={langs} />}
                    </p>
                  )}
                  {item.tag && (
                    <span className={styles.tag}>
                      <Bi t={item.tag} langs={langs} />
                    </span>
                  )}
                  {n > 0 && (
                    <div className={styles.count}>
                      <button type="button" onClick={() => change(item.id, -1)} aria-label="−1">
                        <MinusIcon className="size-4" aria-hidden />
                      </button>
                      <output key={n}>× {n}</output>
                    </div>
                  )}
                </div>
                <div className={styles.step}>
                  <button type="button" onClick={() => change(item.id, 1)} aria-label="+1" className={styles.plus}>
                    <PlusIcon className="size-4" aria-hidden />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <p className={styles.cur}>
          <Bi t={menu.currency} langs={langs} />
        </p>
      </section>

      {/* ── Booking strip ── */}
      {cal && (
        <section className={styles.section}>
          <header className={styles.head} data-reveal>
            <h2>
              <Bi t={cal.title} langs={langs} />
            </h2>
            {cal.subtitle && (
              <p>
                <Bi t={cal.subtitle} langs={langs} />
              </p>
            )}
          </header>
          <div className={styles.cal} data-reveal>
            <div className={styles.weekdays} aria-hidden>
              {cal.weekdays.uz.map((_, i) => (
                <span key={i}>
                  <Pair uz={cal.weekdays.uz[i]} ru={cal.weekdays.ru[i]} langs={langs} />
                </span>
              ))}
            </div>
            <div className={styles.days}>
              {days.length === 0
                ? Array.from({ length: WEEKS * 7 }, (_, i) => <span key={i} className={styles.dayGhost} />)
                : days.map(({ d, key, status }, i) => {
                    const first = d.getDate() === 1 || i === 0;
                    const label = `${d.getDate()} ${MONTHS[langs.primary][d.getMonth()]}`;
                    return (
                      <button
                        key={key}
                        type="button"
                        className={styles.day}
                        data-status={status}
                        aria-pressed={date === key}
                        disabled={status !== "free"}
                        aria-label={`${label}, ${status === "free" ? biString(cal.freeLabel, langs) : status === "busy" ? biString(cal.busyLabel, langs) : "—"}`}
                        onClick={() => setDate(date === key ? null : key)}
                      >
                        {first && (
                          <small>
                            <Pair uz={MONTHS.uz[d.getMonth()]} ru={MONTHS.ru[d.getMonth()]} langs={langs} />
                          </small>
                        )}
                        {d.getDate()}
                      </button>
                    );
                  })}
            </div>
            <p className={styles.legend}>
              <span className={styles.lgFree} />
              <Bi t={cal.freeLabel} langs={langs} />
              <span className={styles.lgBusy} />
              <Bi t={cal.busyLabel} langs={langs} />
            </p>
          </div>
        </section>
      )}

      {/* ── Request ── */}
      <section className={styles.section} id="request" ref={panelRef}>
        <header className={styles.head} data-reveal>
          <h2>
            <Bi t={menu.request.title} langs={langs} />
          </h2>
        </header>
        <div className={styles.request} data-reveal>
          {lines.length === 0 ? (
            <p className={styles.empty}>
              <Bi t={menu.request.empty} langs={langs} />
            </p>
          ) : (
            <ul className={styles.lines}>
              {lines.map((i) => (
                <li key={i.id}>
                  <span>
                    <Bi t={i.name} langs={langs} /> <em>× {qty[i.id]}</em>
                  </span>
                  <b>{formatSum(i.price * qty[i.id])}</b>
                </li>
              ))}
            </ul>
          )}
          <dl className={styles.facts}>
            <div>
              <dt>
                <Bi t={menu.request.dateLabel} langs={langs} />
              </dt>
              <dd>{selectedDay ? dotted(selectedDay) : "—"}</dd>
            </div>
            <div>
              <dt>
                <Bi t={menu.request.totalLabel} langs={langs} />
              </dt>
              <dd>
                {formatSum(total)} {cur}
              </dd>
            </div>
          </dl>
          <label className={styles.field}>
            <span>
              <Bi t={menu.request.nameLabel} langs={langs} />
            </span>
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" maxLength={40} />
          </label>
          <a href={orderUrl(menu.order.url, message)} target="_blank" rel="noopener noreferrer" className={styles.send}>
            <Bi t={menu.request.send} langs={langs} />
          </a>
        </div>
      </section>

      {/* Floating summary */}
      <div className={styles.float} data-show={(count > 0 && !panelSeen) || undefined}>
        <a href="#request">
          <span>
            {count} · {formatSum(total)} {cur}
          </span>
          <b>
            <Bi t={menu.request.title} langs={langs} />
          </b>
        </a>
      </div>
    </>
  );
}
