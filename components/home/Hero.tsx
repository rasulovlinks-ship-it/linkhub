"use client";

import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import type { Dict } from "@/lib/i18n";
import { COMPETITOR_MONTHLY_USD, CONTACT_LINKS } from "@/lib/brand";
import { FRACTURE, IMPACT } from "./shatter-geometry";
import PhoneFrame from "./PhoneFrame";
import HeroDomains from "./HeroDomains";

type Phase = "intro" | "crack" | "shatter" | "done";

const MONTHS = 36;
const START_MS = 350;
const COUNT_MS = 2400;
const CRACK_AT = START_MS + COUNT_MS + 200;
const SHATTER_AT = CRACK_AT + 480;
const DONE_AT = SHATTER_AT + 1500;
const STORAGE_KEY = "ol-hero";

/** Month i (0-based) is reached when the eased counter passes it: p^2 = i/35 */
const barDelay = (i: number) =>
  Math.round(START_MS + COUNT_MS * Math.sqrt(i / (MONTHS - 1)));

/** Remember the intro as seen only once it finished or was skipped. */
function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {}
}

function shatter(card: HTMLElement | null, layer: HTMLElement | null) {
  if (!card || !layer) return;
  // Freeze bars at their final height and drop backdrop blur so 30+ clones
  // stay cheap to composite while they fall.
  card.classList.add("is-frozen");
  const frag = document.createDocumentFragment();
  const pieces: { el: HTMLElement; s: (typeof FRACTURE.shards)[number] }[] = [];
  for (const s of FRACTURE.shards) {
    const wrap = document.createElement("div");
    wrap.className = "ol-shard";
    wrap.style.clipPath = s.clip;
    wrap.style.transformOrigin = `${s.cx}% ${s.cy}%`;
    const clone = card.cloneNode(true) as HTMLElement;
    clone.setAttribute("aria-hidden", "true");
    wrap.appendChild(clone);
    frag.appendChild(wrap);
    pieces.push({ el: wrap, s });
  }
  layer.appendChild(frag);
  card.style.visibility = "hidden";

  for (const { el, s } of pieces) {
    const push = 24 + s.r1 * 70;
    const x = s.dx * push;
    const fall = 300 + s.r2 * 320;
    const rot = (s.r3 - 0.5) * 90;
    el.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1, easing: "cubic-bezier(.2,.7,.3,1)" },
        {
          transform: `translate(${x * 0.35}px, ${s.dy * 14 - 8}px) rotate(${rot * 0.15}deg)`,
          opacity: 1,
          offset: 0.16,
          easing: "cubic-bezier(.5,0,.9,.4)",
        },
        { transform: `translate(${x}px, ${fall}px) rotate(${rot}deg)`, opacity: 0 },
      ],
      { duration: 950 + s.r1 * 400, delay: s.dist * 3, fill: "forwards" },
    );
  }
}

export default function Hero({ dict }: { dict: Dict }) {
  const t = dict.hero;
  const [phase, setPhase] = useState<Phase>("intro");
  const cardRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const monthsRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const stopRef = useRef<() => void>(() => {});

  useEffect(() => {
    const html = document.documentElement;
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) !== null;
    } catch {}
    if (seen || html.hasAttribute("data-ol-skip")) {
      // CSS renders the final state from this attribute; no state change needed.
      html.setAttribute("data-ol-skip", "");
      return;
    }

    const timers: number[] = [];
    let raf = 0;
    const t0 = performance.now() + START_MS;

    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / COUNT_MS));
      const months = 1 + Math.round((MONTHS - 1) * p * p);
      if (monthsRef.current) monthsRef.current.textContent = String(months);
      if (totalRef.current)
        totalRef.current.textContent = `$${months * COMPETITOR_MONTHLY_USD}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    timers.push(
      window.setTimeout(() => {
        setPhase("crack");
        cardRef.current?.animate(
          [
            { transform: "translate(0,0)" },
            { transform: "translate(-3px,1px)" },
            { transform: "translate(2px,-1px)" },
            { transform: "translate(-1px,0)" },
            { transform: "translate(0,0)" },
          ],
          { duration: 260, easing: "ease-out" },
        );
      }, CRACK_AT),
      window.setTimeout(() => {
        shatter(cardRef.current, layerRef.current);
        setPhase("shatter");
      }, SHATTER_AT),
      window.setTimeout(() => {
        if (layerRef.current) layerRef.current.replaceChildren();
        setPhase("done");
        markSeen();
      }, DONE_AT),
    );

    stopRef.current = () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      if (layerRef.current) layerRef.current.replaceChildren();
      setPhase("done");
      markSeen();
    };
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  const skip = () => stopRef.current();

  return (
    <section
      className="ol-hero relative overflow-x-clip px-4 pt-24 pb-16 sm:px-6 md:pt-28 lg:pb-24"
      data-phase={phase}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,var(--ol-accent-glow),transparent)] opacity-70"
      />
      <HeroDomains />
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        {/* Copy: intro (problem) and main (solution) share one grid cell so
            the swap never shifts layout. */}
        <div className="grid">
          <div className="ol-hero-intro [grid-area:1/1] self-center">
            <p className="font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-ol-ink sm:text-5xl lg:text-[2.9rem] xl:text-[3.1rem]">
              {t.introTitle}
            </p>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ol-muted">{t.introText}</p>
          </div>

          <div className="ol-hero-main [grid-area:1/1] self-center">
            <p className="ol-domain inline-flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm">
              <span className="ol-domain-from ol-strike text-ol-muted">{t.domainFrom}</span>
              <span className="ol-domain-to rounded-full bg-ol-accent-soft px-3 py-1 font-semibold text-ol-accent-strong">
                {t.domainTo}
              </span>
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-ol-ink sm:text-5xl lg:text-[2.9rem] xl:text-[3.1rem]">
              <span className="ol-title-accent text-ol-accent">{t.titleAccent}</span>
              <br />
              {t.titleRest[0]}
              <span className="relative inline-block whitespace-nowrap">
                {t.titleRest[1]}
                <svg
                  className="ol-underline pointer-events-none absolute -bottom-[0.14em] left-[-2%] h-[0.28em] w-[104%] overflow-visible"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M2 7.5C22 3 48 2.2 72 3.4 83 4 91 5 98 6.4" pathLength={1} />
                </svg>
              </span>
              {t.titleRest[2]}
            </h1>
            <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-ol-muted">{t.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {t.crossed.map((label, i) => (
                <li
                  key={label}
                  className="ol-crossed flex items-center gap-2.5 rounded-full border border-ol-line bg-ol-surface py-2.5 pr-5 pl-3 text-lg font-semibold tracking-tight text-ol-ink sm:text-xl"
                  style={{ ["--d" as string]: `${1150 + i * 350}ms` }}
                >
                  <span className="grid size-7 place-items-center rounded-full bg-ol-accent-soft text-ol-accent">
                    <XMarkIcon className="size-4" aria-hidden />
                  </span>
                  <s className="ol-strike ol-strike-bold">{label}</s>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={CONTACT_LINKS.telegram} target="_blank" rel="noopener" className="ol-btn ol-btn-primary">
                {dict.nav.cta}
              </a>
              <a href="#work" className="ol-btn ol-btn-ghost">
                {t.ctaSecondary}
              </a>
            </div>
          </div>
        </div>

        {/* Stage: glass subscription meter in front, the real owned site behind it. */}
        <div
          className="relative mx-auto h-[460px] w-full max-w-[420px] sm:h-[540px]"
          onClick={phase === "done" ? undefined : skip}
        >
          <div className="ol-hero-phone absolute inset-0 flex items-center justify-center">
            <PhoneFrame
              src="/showcase/babyland.jpg"
              alt={t.phoneAlt}
              url="komolababyland.uz"
              eager
              className="w-[190px] sm:w-[232px]"
            />
          </div>

          <div className="ol-hero-cardbox absolute top-1/2 left-1/2 aspect-[4/3] w-[min(100%,360px)] -translate-x-1/2 -translate-y-1/2 sm:w-[400px]">
            <div ref={cardRef} className="ol-glass absolute inset-0 flex flex-col rounded-[20px] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 text-[13px]">
                <span className="font-medium text-ol-ink">{t.meterLabel}</span>
                <span className="text-right text-ol-muted">
                  ${COMPETITOR_MONTHLY_USD} {t.meterPerMonth}
                </span>
              </div>
              <div className="mt-auto">
                <span className="block text-[13px] text-ol-muted">{t.meterBars}</span>
                <span
                  ref={totalRef}
                  className="block font-display text-5xl font-semibold tracking-tight text-ol-ink tabular-nums sm:text-6xl"
                >
                  ${COMPETITOR_MONTHLY_USD}
                </span>
                <span className="mt-1 block text-sm text-ol-muted tabular-nums">
                  <span ref={monthsRef}>1</span> {t.meterMonths}
                </span>
              </div>
              <div className="mt-4 flex h-[22%] items-end gap-[2px]" aria-hidden>
                {Array.from({ length: MONTHS }, (_, i) => (
                  <span
                    key={i}
                    className="ol-bar flex-1 rounded-t-[2px] bg-ol-accent"
                    style={{
                      height: `${((i + 1) / MONTHS) * 100}%`,
                      animationDelay: `${barDelay(i)}ms`,
                      opacity: 0.35 + (0.65 * (i + 1)) / MONTHS,
                    }}
                  />
                ))}
              </div>
            </div>

            <svg
              className="ol-crack pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {[...FRACTURE.rayPaths, ...FRACTURE.ringSegments].map((d, i) => (
                <path key={i} d={d} pathLength={1} style={{ animationDelay: `${i < FRACTURE.rayPaths.length ? 0 : 140}ms` }} />
              ))}
              <circle cx={IMPACT.x} cy={IMPACT.y} r={1.2} />
            </svg>

            <div ref={layerRef} className="absolute inset-0" aria-hidden />
          </div>

          <button
            type="button"
            onClick={skip}
            className="ol-hero-skip absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 text-[13px] text-ol-muted underline-offset-4 hover:underline"
          >
            {t.skip}
          </button>
        </div>
      </div>
    </section>
  );
}
