import type { CSSProperties } from "react";
import { Comfortaa, Nunito } from "next/font/google";
import { ArrowUpRightIcon, ClockIcon } from "@heroicons/react/24/solid";
import type { BiText, BoxContent, SiteConfig } from "@/lib/types";
import { LinkIcon } from "@/components/icons";
import LangToggle from "@/components/LangToggle";
import Sketch from "@/components/draw/Sketch";
import Bi, { biString, type Langs } from "@/components/luxe/Bi";
import { langInitScript } from "@/lib/siteLang";
import BoxWrap from "./BoxWrap";
import styles from "./BoxProfile.module.css";

const display = Comfortaa({ variable: "--bx-display", subsets: ["latin", "cyrillic"], weight: ["600", "700"] });
const sans = Nunito({ variable: "--bx-sans", subsets: ["latin", "cyrillic"] });

const ROOT_ID = "box-root";

const CREATED_WITH: BiText = { uz: "ownlink.uz orqali yaratilgan", ru: "Сделано на ownlink.uz" };

export default function BoxProfile({ site }: { site: SiteConfig }) {
  const box = site.box as BoxContent;
  const theme = site.theme ?? {};
  const langs: Langs = { primary: site.lang ?? "ru", alt: site.translation?.lang };
  const ink = theme.textColor ?? "#231a4a";

  const vars = {
    "--bx-bg": theme.background ?? "#d8ccff",
    "--bx-wrap": theme.accent ?? "#6c4bff",
    "--bx-wrap-ink": theme.accentText ?? "#ffffff",
    "--bx-ribbon": theme.secondaryAccent ?? "#ffd84d",
    "--bx-ink": ink,
  } as CSSProperties;

  const discs = ["#ffe58a", "#bff0df", "#ffc6dd", "#c6d8ff"];

  return (
    <div id={ROOT_ID} className={`${display.variable} ${sans.variable} ${styles.page} flex-1`} style={vars} suppressHydrationWarning>
      {/* Wrap is shown only when this runs (and motion is allowed); see .wrap in the stylesheet */}
      <script
        dangerouslySetInnerHTML={{
          __html: `if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.currentScript.parentElement.setAttribute("data-wrap","")`,
        }}
      />
      {langs.alt && <script dangerouslySetInnerHTML={{ __html: langInitScript(site.slug, langs.alt) }} />}

      <BoxWrap rootId={ROOT_ID} openLabel={biString(box.openHint, langs)} hint={<Bi t={box.openHint} langs={langs} />}>
        <span className={styles.tagTop}>
          <Bi t={box.giftTag} langs={langs} />
        </span>
        <b>{site.name}</b>
      </BoxWrap>

      <main className={styles.col}>
        <div className={styles.top}>
          {langs.alt && (
            <LangToggle slug={site.slug} primary={langs.primary} alt={langs.alt} accent={ink} accentText="#ffffff" />
          )}
        </div>

        <header className={`${styles.hero} ${styles.rise}`}>
          <div className={styles.avatar}>
            {site.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={site.avatarUrl} alt="" />
            ) : (
              <Sketch spec={box.heroSketch} variant="sticker" ink={ink} paper="#fff" />
            )}
          </div>
          <h1 className={styles.name}>{site.name}</h1>
          <p className={styles.tagline}>
            <Bi t={box.tagline} langs={langs} />
          </p>
          {box.hours && (
            <p className={styles.hours}>
              <ClockIcon className="size-4" aria-hidden />
              <Bi t={box.hours} langs={langs} />
            </p>
          )}
        </header>

        <a
          href={box.order.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.order} ${styles.rise}`}
          style={{ "--i": 1 } as CSSProperties}
        >
          <LinkIcon type="order" className="size-6 shrink-0" />
          <Bi t={box.order.label} langs={langs} />
        </a>

        {box.bakes && box.bakes.length > 0 && (
          <section className={`${styles.bakes} ${styles.rise}`} style={{ "--i": 2 } as CSSProperties}>
            {box.bakesTitle && (
              <h2>
                <Bi t={box.bakesTitle} langs={langs} />
              </h2>
            )}
            <ul>
              {box.bakes.map((b, i) => (
                <li key={b.id}>
                  <span className={styles.tile} style={{ background: discs[i % discs.length] }}>
                    {b.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.photoUrl} alt="" loading="lazy" />
                    ) : (
                      <Sketch spec={b.sketch} variant="sticker" ink={ink} />
                    )}
                  </span>
                  <span>
                    <Bi t={b.label} langs={langs} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ul className={`${styles.channels} ${styles.rise}`} style={{ "--i": 3 } as CSSProperties}>
          {box.channels.map((c, i) => (
            <li key={c.id}>
              <a href={c.url} target="_blank" rel="noopener noreferrer">
                <span className={styles.disc} style={{ background: discs[i % discs.length] }}>
                  <LinkIcon type={c.type} className="size-6" />
                </span>
                <b>
                  <Bi t={c.label} langs={langs} />
                </b>
                <small>{c.handle}</small>
              </a>
            </li>
          ))}
        </ul>

        {box.location && (
          <a
            href={box.location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.place} ${styles.rise}`}
            style={{ "--i": 4 } as CSSProperties}
          >
            <span className={styles.disc} style={{ background: discs[1] }}>
              <LinkIcon type="location" className="size-6" />
            </span>
            <span>
              <b>
                <Bi t={box.location.label} langs={langs} />
              </b>
              <small>
                <Bi t={box.location.address} langs={langs} />
              </small>
            </span>
            <ArrowUpRightIcon className="ml-auto size-5 shrink-0" aria-hidden />
          </a>
        )}

        {box.closing && (
          <p className={`${styles.closing} ${styles.rise}`} style={{ "--i": 5 } as CSSProperties}>
            <Bi t={box.closing} langs={langs} />
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
