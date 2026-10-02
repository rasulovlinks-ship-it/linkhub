import type { CSSProperties } from "react";
import { PT_Mono, Special_Elite } from "next/font/google";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import type { BiText, SiteConfig, TicketContent } from "@/lib/types";
import { LinkIcon } from "@/components/icons";
import LangToggle from "@/components/LangToggle";
import Sketch from "@/components/draw/Sketch";
import Bi, { type Langs } from "@/components/luxe/Bi";
import { langInitScript } from "@/lib/siteLang";
import TicketMeta from "./TicketMeta";
import styles from "./TicketProfile.module.css";

const mono = PT_Mono({ variable: "--tk-mono", subsets: ["latin", "cyrillic"], weight: "400" });
const type = Special_Elite({ variable: "--tk-type", subsets: ["latin"], weight: "400" });

const CREATED_WITH: BiText = { uz: "ownlink.uz orqali yaratilgan", ru: "Сделано на ownlink.uz" };

/** Deterministic bar widths from a string, so the barcode is stable but unique per shop */
function Barcode({ seed }: { seed: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  let h = 7;
  for (let i = 0; i < 46; i++) {
    h = (h * 31 + seed.charCodeAt(i % seed.length) + i) % 997;
    const w = 1 + (h % 3);
    bars.push({ x, w });
    x += w + 1 + (h % 2);
  }
  return (
    <svg viewBox={`0 0 ${x} 40`} className={styles.barcode} preserveAspectRatio="none" aria-hidden>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w} height="40" />
      ))}
    </svg>
  );
}

export default function TicketProfile({ site }: { site: SiteConfig }) {
  const t = site.ticket as TicketContent;
  const theme = site.theme ?? {};
  const langs: Langs = { primary: site.lang ?? "ru", alt: site.translation?.lang };
  const ink = theme.textColor ?? "#1b1b1f";

  const vars = {
    "--tk-desk": theme.background ?? "#1d2556",
    "--tk-paper": theme.secondaryAccent ?? "#fff8e8",
    "--tk-ink": ink,
    "--tk-stamp": theme.accent ?? "#ff5a2c",
    "--tk-stamp-ink": theme.accentText ?? "#ffffff",
  } as CSSProperties;

  return (
    <div className={`${mono.variable} ${type.variable} ${styles.page} flex-1`} style={vars} suppressHydrationWarning>
      {langs.alt && <script dangerouslySetInnerHTML={{ __html: langInitScript(site.slug, langs.alt) }} />}

      <div className={styles.col}>
        <div className={styles.top}>
          {langs.alt && (
            <LangToggle slug={site.slug} primary={langs.primary} alt={langs.alt} accent="#ffffff" accentText="#1d2556" variant="dark" />
          )}
        </div>

        {/* The printer: a dark housing with a slot the slip comes out of */}
        <div className={styles.printer} aria-hidden>
          <span className={styles.led} />
          <span className={styles.slot} />
        </div>

        <div className={styles.feed}>
          <article className={styles.paper}>
            <header className={styles.head}>
              <p className={styles.kicker}>
                <Bi t={t.kicker} langs={langs} />
              </p>
              <Sketch spec={t.heroSketch} variant="line" ink="currentColor" paper="transparent" className={styles.logo} />
              <h1>{site.name}</h1>
              <p className={styles.tagline}>
                <Bi t={t.tagline} langs={langs} />
              </p>
              <p className={styles.small}>
                <Bi t={t.address} langs={langs} />
              </p>
              <p className={styles.small}>
                <Bi t={t.hours} langs={langs} />
              </p>
            </header>

            <TicketMeta
              className={styles.meta}
              numberLabel={<Bi t={t.numberLabel} langs={langs} />}
              dateLabel={<Bi t={t.dateLabel} langs={langs} />}
            />

            <a href={t.order.url} target="_blank" rel="noopener noreferrer" className={styles.order}>
              <LinkIcon type="order" className="size-6 shrink-0" />
              <Bi t={t.order.label} langs={langs} />
              <span className={styles.arrow} aria-hidden>
                ▶
              </span>
            </a>

            <section className={styles.block}>
              <h2>
                <Bi t={t.bakesTitle} langs={langs} />
              </h2>
              <ul className={styles.items}>
                {t.bakes.map((b, i) => (
                  <li key={i}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <b>
                      <Bi t={b} langs={langs} />
                    </b>
                    <i aria-hidden />
                    <em aria-hidden>✓</em>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.block}>
              <h2>
                <Bi t={t.channelsTitle} langs={langs} />
              </h2>
              <ul className={styles.rows}>
                {t.channels.map((c) => (
                  <li key={c.id}>
                    <a href={c.url} target="_blank" rel="noopener noreferrer">
                      <LinkIcon type={c.type} className="size-5 shrink-0" />
                      <b>
                        <Bi t={c.label} langs={langs} />
                      </b>
                      <small>{c.handle}</small>
                      <ArrowUpRightIcon className="size-4 shrink-0" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.block}>
              <h2>
                <Bi t={t.location.label} langs={langs} />
              </h2>
              <a href={t.location.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.where}>
                <LinkIcon type="location" className="size-5 shrink-0" />
                <span>
                  <Bi t={t.location.address} langs={langs} />
                </span>
                <ArrowUpRightIcon className="size-4 shrink-0" aria-hidden />
              </a>
            </section>

            <footer className={styles.foot}>
              <Barcode seed={site.name + site.slug} />
              <p>
                <Bi t={t.thanks} langs={langs} />
              </p>
              <span className={styles.stamp} aria-hidden>
                <Bi t={t.stamp} langs={langs} />
              </span>
            </footer>
          </article>
        </div>

        {!site.hideBranding && (
          <p className={styles.credit}>
            <Bi t={CREATED_WITH} langs={langs} />
          </p>
        )}
      </div>
    </div>
  );
}
