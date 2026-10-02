import type { CSSProperties } from "react";
import { Rubik } from "next/font/google";
import { ArrowUpRightIcon, ClockIcon } from "@heroicons/react/24/solid";
import type { BiText, GridContent, SiteConfig } from "@/lib/types";
import { LinkIcon } from "@/components/icons";
import LangToggle from "@/components/LangToggle";
import PhotoWall from "@/components/photos/PhotoWall";
import Bi, { type Langs } from "@/components/luxe/Bi";
import { langInitScript } from "@/lib/siteLang";
import styles from "./GridProfile.module.css";

const sans = Rubik({ variable: "--gr-sans", subsets: ["latin", "cyrillic"] });

const CREATED_WITH: BiText = { uz: "ownlink.uz orqali yaratilgan", ru: "Сделано на ownlink.uz" };
const VIEWER: Record<"uz" | "ru", { open: string; close: string; prev: string; next: string }> = {
  uz: { open: "Rasmni ochish", close: "Yopish", prev: "Oldingi", next: "Keyingi" },
  ru: { open: "Открыть фото", close: "Закрыть", prev: "Назад", next: "Вперёд" },
};

export default function GridProfile({ site }: { site: SiteConfig }) {
  const g = site.grid as GridContent;
  const theme = site.theme ?? {};
  const langs: Langs = { primary: site.lang ?? "ru", alt: site.translation?.lang };
  const ink = theme.textColor ?? "#1f1f23";

  const vars = {
    "--gr-bg": theme.background ?? "#ffffff",
    "--gr-ink": ink,
    "--gr-accent": theme.accent ?? "#ef5b3b",
    "--gr-accent-ink": theme.accentText ?? "#ffffff",
    "--gr-soft": theme.secondaryAccent ?? "#f4f4f6",
  } as CSSProperties;

  const initial = site.name.trim().charAt(0).toUpperCase();

  return (
    <div className={`${sans.variable} ${styles.page} flex-1`} style={vars} suppressHydrationWarning>
      {langs.alt && <script dangerouslySetInnerHTML={{ __html: langInitScript(site.slug, langs.alt) }} />}

      <main className={styles.col}>
        <div className={styles.top}>
          {langs.alt && <LangToggle slug={site.slug} primary={langs.primary} alt={langs.alt} accent={ink} accentText="#ffffff" />}
        </div>

        <header className={styles.head}>
          <div className={styles.avatar}>
            {site.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={site.avatarUrl} alt="" />
            ) : (
              <span aria-hidden>{initial}</span>
            )}
          </div>
          <h1>{site.name}</h1>
          <p className={styles.tagline}>
            <Bi t={g.tagline} langs={langs} />
          </p>
          {g.hours && (
            <p className={styles.hours}>
              <ClockIcon className="size-4" aria-hidden />
              <Bi t={g.hours} langs={langs} />
            </p>
          )}
        </header>

        {g.stats && (
          <ul className={styles.stats}>
            {g.stats.map((s) => (
              <li key={s.id}>
                <b>
                  <Bi t={s.value} langs={langs} />
                </b>
                <span>
                  <Bi t={s.label} langs={langs} />
                </span>
              </li>
            ))}
          </ul>
        )}

        <a href={g.order.url} target="_blank" rel="noopener noreferrer" className={styles.order}>
          <LinkIcon type="order" className="size-6 shrink-0" />
          <Bi t={g.order.label} langs={langs} />
        </a>

        <ul className={styles.links}>
          {g.channels.map((c) => (
            <li key={c.id}>
              <a href={c.url} target="_blank" rel="noopener noreferrer">
                <span className={styles.icon}>
                  <LinkIcon type={c.type} className="size-5" />
                </span>
                <span className={styles.label}>
                  <b>
                    <Bi t={c.label} langs={langs} />
                  </b>
                  <small>{c.handle}</small>
                </span>
                <ArrowUpRightIcon className="size-4 shrink-0 opacity-50" aria-hidden />
              </a>
            </li>
          ))}
          {g.location && (
            <li>
              <a href={g.location.mapUrl} target="_blank" rel="noopener noreferrer">
                <span className={styles.icon}>
                  <LinkIcon type="location" className="size-5" />
                </span>
                <span className={styles.label}>
                  <b>
                    <Bi t={g.location.label} langs={langs} />
                  </b>
                  <small>
                    <Bi t={g.location.address} langs={langs} />
                  </small>
                </span>
                <ArrowUpRightIcon className="size-4 shrink-0 opacity-50" aria-hidden />
              </a>
            </li>
          )}
        </ul>

        <section className={styles.gallery}>
          <h2>
            <Bi t={g.galleryTitle} langs={langs} />
          </h2>
          <PhotoWall
            items={g.photos}
            langs={langs}
            ink={ink}
            listClass={styles.grid}
            tileClass={styles.tile}
            labels={VIEWER[langs.primary]}
          />
        </section>

        {g.closing && (
          <p className={styles.closing}>
            <Bi t={g.closing} langs={langs} />
          </p>
        )}
        {!site.hideBranding && (
          <footer className={styles.credit}>
            <Bi t={CREATED_WITH} langs={langs} />
          </footer>
        )}
      </main>
    </div>
  );
}
