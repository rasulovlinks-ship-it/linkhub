import type { CSSProperties } from "react";
import { Onest } from "next/font/google";
import { ArrowUpRightIcon, ClockIcon } from "@heroicons/react/24/solid";
import type { BiText, SiteConfig, SliderContent } from "@/lib/types";
import { LinkIcon } from "@/components/icons";
import LangToggle from "@/components/LangToggle";
import Bi, { type Langs } from "@/components/luxe/Bi";
import { langInitScript } from "@/lib/siteLang";
import SliderTrack from "./SliderTrack";
import styles from "./SliderProfile.module.css";

const sans = Onest({ variable: "--sl-sans", subsets: ["latin", "cyrillic"] });

const CREATED_WITH: BiText = { uz: "ownlink.uz orqali yaratilgan", ru: "Сделано на ownlink.uz" };
const LABELS = {
  uz: { slide: "Rasm", prev: "Oldingi", next: "Keyingi" },
  ru: { slide: "Фото", prev: "Назад", next: "Вперёд" },
} as const;

export default function SliderProfile({ site }: { site: SiteConfig }) {
  const s = site.slider as SliderContent;
  const theme = site.theme ?? {};
  const langs: Langs = { primary: site.lang ?? "ru", alt: site.translation?.lang };
  const ink = theme.textColor ?? "#14211f";

  const vars = {
    "--sl-bg": theme.background ?? "#f6f7f4",
    "--sl-ink": ink,
    "--sl-accent": theme.accent ?? "#0d6b63",
    "--sl-accent-ink": theme.accentText ?? "#ffffff",
    "--sl-card": theme.secondaryAccent ?? "#ffffff",
  } as CSSProperties;

  return (
    <div className={`${sans.variable} ${styles.page} flex-1`} style={vars} suppressHydrationWarning>
      {langs.alt && <script dangerouslySetInnerHTML={{ __html: langInitScript(site.slug, langs.alt) }} />}

      <main className={styles.col}>
        <div className={styles.hero}>
          <SliderTrack items={s.slides} langs={langs} ink={ink} labels={LABELS[langs.primary]} />
          <div className={styles.shade} aria-hidden />
          {langs.alt && (
            <div className={styles.lang}>
              <LangToggle slug={site.slug} primary={langs.primary} alt={langs.alt} accent="#ffffff" accentText="#14211f" variant="dark" />
            </div>
          )}
          <div className={styles.title}>
            <h1>{site.name}</h1>
            <p>
              <Bi t={s.tagline} langs={langs} />
            </p>
          </div>
        </div>

        <div className={styles.body}>
          <a href={s.order.url} target="_blank" rel="noopener noreferrer" className={styles.order}>
            <LinkIcon type="order" className="size-6 shrink-0" />
            <Bi t={s.order.label} langs={langs} />
          </a>

          <ul className={styles.quick}>
            {s.quick.map((c) => (
              <li key={c.id}>
                <a href={c.url} target="_blank" rel="noopener noreferrer">
                  <span className={styles.round}>
                    <LinkIcon type={c.type} className="size-6" />
                  </span>
                  <span>
                    <Bi t={c.label} langs={langs} />
                  </span>
                </a>
              </li>
            ))}
            {s.location && (
              <li>
                <a href={s.location.mapUrl} target="_blank" rel="noopener noreferrer">
                  <span className={styles.round}>
                    <LinkIcon type="location" className="size-6" />
                  </span>
                  <span>
                    <Bi t={s.location.label} langs={langs} />
                  </span>
                </a>
              </li>
            )}
          </ul>

          <section className={styles.about}>
            <h2>
              <Bi t={s.aboutTitle} langs={langs} />
            </h2>
            <p>
              <Bi t={s.about} langs={langs} />
            </p>
            {s.facts && (
              <ul className={styles.facts}>
                {s.facts.map((f) => (
                  <li key={f.id}>
                    <b>
                      <Bi t={f.value} langs={langs} />
                    </b>
                    <span>
                      <Bi t={f.label} langs={langs} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {(s.location || s.hours) && (
            <section className={styles.visit}>
              {s.location && (
                <a href={s.location.mapUrl} target="_blank" rel="noopener noreferrer" className={styles.address}>
                  <span>
                    <b>
                      <Bi t={s.location.label} langs={langs} />
                    </b>
                    <small>
                      <Bi t={s.location.address} langs={langs} />
                    </small>
                  </span>
                  <ArrowUpRightIcon className="size-5 shrink-0" aria-hidden />
                </a>
              )}
              {s.hours && (
                <p className={styles.hours}>
                  <ClockIcon className="size-4" aria-hidden />
                  <Bi t={s.hours} langs={langs} />
                </p>
              )}
            </section>
          )}

          {!site.hideBranding && (
            <footer className={styles.credit}>
              <Bi t={CREATED_WITH} langs={langs} />
            </footer>
          )}
        </div>
      </main>
    </div>
  );
}
