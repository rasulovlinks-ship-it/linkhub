import type { CSSProperties, ReactNode } from "react";
import { IBM_Plex_Mono, Jost } from "next/font/google";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { BiText, MenuContent, SiteConfig } from "@/lib/types";
import { LinkIcon } from "@/components/icons";
import LangToggle from "@/components/LangToggle";
import Sketch from "@/components/draw/Sketch";
import ScrollMotion from "@/components/draw/ScrollMotion";
import Bi, { biString, type Langs } from "@/components/luxe/Bi";
import { langInitScript } from "@/lib/siteLang";
import MenuOrder from "./MenuOrder";
import styles from "./MenuProfile.module.css";

const sans = Jost({ variable: "--mn-sans", subsets: ["latin", "cyrillic"], style: ["normal", "italic"] });
const mono = IBM_Plex_Mono({ variable: "--mn-mono", subsets: ["latin", "cyrillic"], weight: ["400", "500"] });

const ROOT_ID = "menu-root";

const CREATED_WITH: BiText = { uz: "ownlink.uz orqali yaratilgan", ru: "Сделано на ownlink.uz" };

/** "Pista *atelier*": the starred part is set in italic accent */
function emphasise(text: string) {
  return text.split("*").map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
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

function Head({ title, langs }: { title: BiText; langs: Langs }) {
  return (
    <header className={styles.head} data-reveal>
      <h2>
        <Bi t={title} langs={langs} />
      </h2>
    </header>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <section className={styles.section}>{children}</section>;
}

export default function MenuProfile({ site }: { site: SiteConfig }) {
  const menu = site.menu as MenuContent;
  const theme = site.theme ?? {};
  const langs: Langs = { primary: site.lang ?? "ru", alt: site.translation?.lang };
  const ink = theme.textColor ?? "#12301f";
  const accent = theme.accent ?? "#d6245b";

  const vars = {
    "--mn-paper": theme.background ?? "#eef3e6",
    "--mn-ink": ink,
    "--mn-accent": accent,
    "--mn-accent-ink": theme.accentText ?? "#ffffff",
    "--mn-tint": theme.secondaryAccent ?? "#dbe7cf",
  } as CSSProperties;

  const ringText = `${biString(menu.kicker, langs).toUpperCase()} · `.repeat(3);
  const monogram = site.name.trim().charAt(0).toUpperCase();

  return (
    <div id={ROOT_ID} className={`${sans.variable} ${mono.variable} ${styles.page} flex-1`} style={vars} suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: `document.currentScript.parentElement.setAttribute("data-rv","")` }} />
      {langs.alt && <script dangerouslySetInnerHTML={{ __html: langInitScript(site.slug, langs.alt) }} />}
      <ScrollMotion rootId={ROOT_ID} />

      <main className={styles.col}>
        <div className={styles.top}>
          <span className={styles.mono} aria-hidden>
            {monogram}
          </span>
          <span className={styles.brand}>{site.name}</span>
          {langs.alt && (
            <LangToggle slug={site.slug} primary={langs.primary} alt={langs.alt} accent={ink} accentText={theme.background ?? "#eef3e6"} />
          )}
        </div>

        {/* ── Hero ── */}
        <header className={styles.hero}>
          <p className={styles.kicker}>
            <Bi t={menu.kicker} langs={langs} />
          </p>
          <h1 className={styles.title}>
            <BiRich t={menu.title} langs={langs} />
          </h1>
          <p className={styles.tagline}>
            <Bi t={menu.tagline} langs={langs} />
          </p>

          <figure className={styles.plate} aria-hidden>
            <svg viewBox="0 0 300 300" className={styles.ring}>
              <defs>
                <path id="mn-ring" d="M150 150 m-128 0 a128 128 0 1 1 256 0 a128 128 0 1 1 -256 0" />
              </defs>
              <text textLength="796" lengthAdjust="spacing">
                <textPath href="#mn-ring" startOffset="0">
                  {ringText}
                </textPath>
              </text>
            </svg>
            <span className={styles.disc} />
            {menu.heroPhotoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={menu.heroPhotoUrl} alt="" className={styles.heroPhoto} />
            ) : (
              <Sketch spec={menu.heroSketch} variant="line" ink="currentColor" paper="transparent" className={styles.heroCake} />
            )}
          </figure>

          {menu.facts && (
            <ul className={styles.factList}>
              {menu.facts.map((f, i) => (
                <li key={i}>
                  <Bi t={f} langs={langs} />
                </li>
              ))}
            </ul>
          )}

          <a href="#menu" className={styles.cta}>
            <Bi t={menu.menuTitle} langs={langs} />
            <span aria-hidden>↓</span>
          </a>
        </header>

        <MenuOrder menu={menu} langs={langs} />

        {/* ── Sizes ── */}
        {menu.sizes && menu.sizesTitle && (
          <Section>
            <Head title={menu.sizesTitle} langs={langs} />
            <dl className={styles.sizes}>
              {menu.sizes.map((s) => (
                <div key={s.id} data-reveal>
                  <dt>
                    <Bi t={s.label} langs={langs} />
                    <small>
                      <Bi t={s.serves} langs={langs} />
                    </small>
                  </dt>
                  <i className={styles.leader} aria-hidden />
                  <dd>
                    <Bi t={s.price} langs={langs} />
                  </dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        {/* ── Info ── */}
        {menu.info && menu.infoTitle && (
          <Section>
            <Head title={menu.infoTitle} langs={langs} />
            <ul className={styles.info}>
              {menu.info.map((x, i) => (
                <li key={x.id} data-reveal>
                  <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>
                    <Bi t={x.title} langs={langs} />
                  </h3>
                  {x.text && (
                    <p>
                      <Bi t={x.text} langs={langs} />
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── Channels ── */}
        {menu.channels && menu.channelsTitle && (
          <Section>
            <Head title={menu.channelsTitle} langs={langs} />
            <ul className={styles.channels}>
              {menu.channels.map((c) => (
                <li key={c.id} data-reveal>
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    <LinkIcon type={c.type} className="size-5 shrink-0" />
                    <span>
                      <Bi t={c.label} langs={langs} />
                    </span>
                    <small>{c.handle}</small>
                    <ArrowUpRightIcon className="size-4 shrink-0" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {menu.closingText && (
          <p className={styles.closing} data-reveal>
            <Bi t={menu.closingText} langs={langs} />
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
