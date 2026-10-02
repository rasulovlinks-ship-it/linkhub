import type { CSSProperties } from "react";
import { Geologica, Golos_Text } from "next/font/google";
import { ArrowUpRightIcon, ClockIcon } from "@heroicons/react/24/solid";
import type { BiText, IntroContent, SiteConfig } from "@/lib/types";
import { LinkIcon } from "@/components/icons";
import LangToggle from "@/components/LangToggle";
import PhotoWall from "@/components/photos/PhotoWall";
import Bi, { biString, type Langs } from "@/components/luxe/Bi";
import { langInitScript } from "@/lib/siteLang";
import BakerAvatar from "./BakerAvatar";
import CountUp from "./CountUp";
import styles from "./IntroProfile.module.css";

const display = Geologica({ variable: "--in-display", subsets: ["latin", "cyrillic"], weight: ["500", "700", "800"] });
const sans = Golos_Text({ variable: "--in-sans", subsets: ["latin", "cyrillic"] });

const CREATED_WITH: BiText = { uz: "ownlink.uz orqali yaratilgan", ru: "Сделано на ownlink.uz" };
const VIEWER: Record<"uz" | "ru", { open: string; close: string; prev: string; next: string }> = {
  uz: { open: "Rasmni ochish", close: "Yopish", prev: "Oldingi", next: "Keyingi" },
  ru: { open: "Открыть фото", close: "Закрыть", prev: "Назад", next: "Вперёд" },
};

/** "I baked *more than 10 000 cakes*": starred words get a highlighter mark */
function emphasise(text: string) {
  return text.split("*").map((part, i) =>
    i % 2 ? (
      <mark key={i} className={styles.mark}>
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function BiRich({ t, langs }: { t: BiText; langs: Langs }) {
  const primary = biString(t, langs);
  const alt = biString(t, langs, true);
  if (!langs.alt || alt === primary) return <>{emphasise(primary)}</>;
  return (
    <>
      <span data-l="primary">{emphasise(primary)}</span>
      <span data-l="alt">{emphasise(alt)}</span>
    </>
  );
}

export default function IntroProfile({ site }: { site: SiteConfig }) {
  const c = site.intro as IntroContent;
  const theme = site.theme ?? {};
  const langs: Langs = { primary: site.lang ?? "ru", alt: site.translation?.lang };
  const ink = theme.textColor ?? "#1f1b16";
  const sun = theme.accent ?? "#ffcf33";

  const vars = {
    "--in-bg": theme.background ?? "#fffaf0",
    "--in-ink": ink,
    "--in-sun": sun,
    "--in-sun-ink": theme.accentText ?? ink,
    "--in-soft": theme.secondaryAccent ?? "#f4ecda",
  } as CSSProperties;

  return (
    <div className={`${display.variable} ${sans.variable} ${styles.page} flex-1`} style={vars} suppressHydrationWarning>
      {langs.alt && <script dangerouslySetInnerHTML={{ __html: langInitScript(site.slug, langs.alt) }} />}

      <main className={styles.col}>
        <section className={styles.hero}>
          <div className={styles.top}>
            {langs.alt && <LangToggle slug={site.slug} primary={langs.primary} alt={langs.alt} accent={ink} accentText="#ffffff" />}
          </div>

          <p className={styles.hi}>
            <Bi t={c.greeting} langs={langs} />
          </p>
          <h1 className={styles.name}>{site.name}</h1>

          <div className={styles.portrait}>
            {c.portraitUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.portraitUrl} alt={site.name} />
            ) : (
              <BakerAvatar ink={ink} accent={sun} className={styles.drawn} />
            )}
          </div>

          <p className={styles.pitch}>
            <BiRich t={c.pitch} langs={langs} />
          </p>
        </section>

        <ul className={styles.counters}>
          {c.counters.map((n) => (
            <li key={n.id}>
              <b>
                <CountUp value={n.value} suffix={n.suffix} />
              </b>
              <span>
                <Bi t={n.label} langs={langs} />
              </span>
            </li>
          ))}
        </ul>

        {c.story && (
          <p className={styles.story}>
            <Bi t={c.story} langs={langs} />
          </p>
        )}

        <section className={styles.works}>
          <h2>
            <Bi t={c.worksTitle} langs={langs} />
          </h2>
          <PhotoWall
            items={c.works}
            langs={langs}
            ink={ink}
            listClass={styles.strip}
            tileClass={styles.work}
            labels={VIEWER[langs.primary]}
          />
        </section>

        <a href={c.order.url} target="_blank" rel="noopener noreferrer" className={styles.order}>
          <LinkIcon type="order" className="size-6 shrink-0" />
          <Bi t={c.order.label} langs={langs} />
        </a>

        <ul className={styles.links}>
          {c.channels.map((ch) => (
            <li key={ch.id}>
              <a href={ch.url} target="_blank" rel="noopener noreferrer">
                <span className={styles.icon}>
                  <LinkIcon type={ch.type} className="size-5" />
                </span>
                <span className={styles.label}>
                  <b>
                    <Bi t={ch.label} langs={langs} />
                  </b>
                  <small>{ch.handle}</small>
                </span>
                <ArrowUpRightIcon className="size-4 shrink-0 opacity-50" aria-hidden />
              </a>
            </li>
          ))}
          {c.location && (
            <li>
              <a href={c.location.mapUrl} target="_blank" rel="noopener noreferrer">
                <span className={styles.icon}>
                  <LinkIcon type="location" className="size-5" />
                </span>
                <span className={styles.label}>
                  <b>
                    <Bi t={c.location.label} langs={langs} />
                  </b>
                  <small>
                    <Bi t={c.location.address} langs={langs} />
                  </small>
                </span>
                <ArrowUpRightIcon className="size-4 shrink-0 opacity-50" aria-hidden />
              </a>
            </li>
          )}
        </ul>

        {c.hours && (
          <p className={styles.hours}>
            <ClockIcon className="size-4" aria-hidden />
            <Bi t={c.hours} langs={langs} />
          </p>
        )}
        {c.closing && (
          <p className={styles.closing}>
            <Bi t={c.closing} langs={langs} />
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
