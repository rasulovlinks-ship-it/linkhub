import type { CSSProperties, ReactNode } from "react";
import { Golos_Text, Unbounded } from "next/font/google";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import type { BiText, PopContent, SiteConfig } from "@/lib/types";
import { LinkIcon } from "@/components/icons";
import LangToggle from "@/components/LangToggle";
import Marquee from "@/components/Marquee";
import Sketch from "@/components/draw/Sketch";
import ScrollMotion from "@/components/draw/ScrollMotion";
import Bi, { biString, type Langs } from "@/components/luxe/Bi";
import { langInitScript } from "@/lib/siteLang";
import { orderUrl } from "@/lib/orderLink";
import PopBuilder from "./PopBuilder";
import styles from "./PopProfile.module.css";

const display = Unbounded({ variable: "--pp-display", subsets: ["latin", "cyrillic"], weight: ["500", "700", "900"] });
const sans = Golos_Text({ variable: "--pp-sans", subsets: ["latin", "cyrillic"] });

const ROOT_ID = "pop-root";
const CTA_ID = "pop-cta";

const CREATED_WITH: BiText = { uz: "ownlink.uz orqali yaratilgan", ru: "Сделано на ownlink.uz" };

/** "Bento *tortlar*" -> the starred part gets a highlighter mark */
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

/** Spiky "price burst" badge behind the hero cake */
function Burst({ className }: { className?: string }) {
  const points = Array.from({ length: 28 }, (_, i) => {
    const a = (i / 28) * Math.PI * 2;
    const r = i % 2 ? 44 : 50;
    return `${(50 + Math.cos(a) * r).toFixed(2)},${(50 + Math.sin(a) * r).toFixed(2)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <polygon points={points} strokeLinejoin="round" />
    </svg>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 1.5l2.6 7.4 7.9.3-6.2 4.8 2.2 7.5L12 17l-6.5 4.5 2.2-7.5L1.5 9.2l7.9-.3z" fill="currentColor" />
    </svg>
  );
}

function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`${styles.section} ${className}`}>{children}</section>;
}

function Head({ title, sub, langs }: { title: BiText; sub?: BiText; langs: Langs }) {
  return (
    <header className={styles.head} data-reveal>
      <h2>
        <BiRich t={title} langs={langs} />
      </h2>
      {sub && (
        <p>
          <Bi t={sub} langs={langs} />
        </p>
      )}
    </header>
  );
}

export default function PopProfile({ site }: { site: SiteConfig }) {
  const pop = site.pop as PopContent;
  const theme = site.theme ?? {};
  const langs: Langs = { primary: site.lang ?? "ru", alt: site.translation?.lang };
  const ink = theme.textColor ?? "#1c1a1a";
  const accent = theme.accent ?? "#ff4b3e";
  const sun = theme.background ?? "#ffd23f";
  const pink = theme.secondaryAccent ?? "#ffb3d1";

  const vars = {
    "--pp-ink": ink,
    "--pp-red": accent,
    "--pp-red-ink": theme.accentText ?? "#ffffff",
    "--pp-sun": sun,
    "--pp-pink": pink,
    "--pp-paper": "color-mix(in oklab, #fff6e0, var(--pp-sun) 14%)",
  } as CSSProperties;

  const handle = pop.channels?.[0]?.handle;
  const tints = ["var(--pp-pink)", "var(--pp-sun)", "#bfe9d6", "#cfd8ff"];

  return (
    <div id={ROOT_ID} className={`${display.variable} ${sans.variable} ${styles.page} flex-1`} style={vars} suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: `document.currentScript.parentElement.setAttribute("data-rv","")` }} />
      {langs.alt && <script dangerouslySetInnerHTML={{ __html: langInitScript(site.slug, langs.alt) }} />}
      <ScrollMotion rootId={ROOT_ID} ctaId={CTA_ID} />

      <main className={styles.col}>
        <div className={styles.top}>
          <span className={styles.handle}>{handle ?? site.name}</span>
          {langs.alt && (
            <LangToggle slug={site.slug} primary={langs.primary} alt={langs.alt} accent={ink} accentText={sun} />
          )}
        </div>

        {/* ── Hero ── */}
        <header className={styles.hero}>
          <p className={styles.kicker}>
            <Star className="size-3.5" />
            <Bi t={pop.kicker} langs={langs} />
          </p>
          <h1 className={styles.title}>
            <BiRich t={pop.title} langs={langs} />
          </h1>
          <p className={styles.tagline}>
            <Bi t={pop.tagline} langs={langs} />
          </p>

          <div className={styles.stage}>
            <Burst className={styles.burst} />
            {pop.heroPhotoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pop.heroPhotoUrl} alt="" className={styles.heroPhoto} />
            ) : (
              <Sketch spec={pop.heroSketch} variant="sticker" ink={ink} className={styles.heroCake} />
            )}
            {pop.stickers?.slice(0, 3).map((s, i) => (
              <span key={i} className={`${styles.sticker} ${styles[`sticker${i}`]}`}>
                <Bi t={s} langs={langs} />
              </span>
            ))}
          </div>

          <a id={CTA_ID} href={pop.order.url} target="_blank" rel="noopener noreferrer" className={styles.cta}>
            <LinkIcon type="order" className="size-6 shrink-0" />
            <Bi t={pop.order.label} langs={langs} />
          </a>

          {pop.stats && (
            <ul className={styles.stats}>
              {pop.stats.map((s) => (
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
        </header>

        {pop.marquee && pop.marquee.length > 0 && (
          <div className={styles.tape} aria-hidden>
            <Marquee duration="26s" gap="0">
              {pop.marquee.map((m, i) => (
                <span key={i} className={styles.tapeItem}>
                  <Bi t={m} langs={langs} />
                  <Star className="size-4" />
                </span>
              ))}
            </Marquee>
          </div>
        )}

        {/* ── Menu ── */}
        <Section>
          <Head title={pop.menuTitle} sub={pop.menuSubtitle} langs={langs} />
          <ul className={styles.grid}>
            {pop.menu.map((item, i) => {
              const text = pop.itemMessage ? biString(pop.itemMessage, langs).replace("{name}", biString(item.name, langs)) : biString(item.name, langs);
              return (
                <li key={item.id} data-reveal className={styles.cell}>
                  <a
                    href={orderUrl(pop.order.url, text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}
                    style={{ "--tint": tints[i % tints.length] } as CSSProperties}
                  >
                    <span className={styles.art}>
                      {item.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.photoUrl} alt="" loading="lazy" />
                      ) : (
                        <Sketch spec={item.sketch} variant="sticker" ink={ink} />
                      )}
                      {item.tag && (
                        <em className={styles.ribbon}>
                          <Bi t={item.tag} langs={langs} />
                        </em>
                      )}
                    </span>
                    <span className={styles.cardBody}>
                      <strong>
                        <Bi t={item.name} langs={langs} />
                      </strong>
                      {item.note && (
                        <small>
                          <Bi t={item.note} langs={langs} />
                        </small>
                      )}
                      <span className={styles.price}>
                        <Bi t={item.price} langs={langs} />
                        <ArrowUpRightIcon className="size-4" aria-hidden />
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* ── Builder ── */}
        {pop.builder && (
          <Section className={styles.builderSection}>
            <Head title={pop.builder.title} sub={pop.builder.subtitle} langs={langs} />
            <div data-reveal>
              <PopBuilder builder={pop.builder} order={pop.order.url} langs={langs} ink={ink} />
            </div>
          </Section>
        )}

        {/* ── Steps ── */}
        {pop.steps && pop.stepsTitle && (
          <Section>
            <Head title={pop.stepsTitle} langs={langs} />
            <ol className={styles.steps}>
              {pop.steps.map((s, i) => (
                <li key={s.id} data-reveal>
                  <span className={styles.num}>{i + 1}</span>
                  <div>
                    <h3>
                      <Bi t={s.title} langs={langs} />
                    </h3>
                    <p>
                      <Bi t={s.text} langs={langs} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* ── Reviews ── */}
        {pop.reviews && pop.reviewsTitle && (
          <Section>
            <Head title={pop.reviewsTitle} langs={langs} />
            <ul className={styles.reviews}>
              {pop.reviews.map((r) => (
                <li key={r.id} data-reveal>
                  <blockquote>
                    <Bi t={r.text} langs={langs} />
                  </blockquote>
                  <p>
                    <b>{r.name}</b>
                    {r.source && <span> · {r.source}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── Info ── */}
        {pop.info && pop.infoTitle && (
          <Section>
            <Head title={pop.infoTitle} langs={langs} />
            <ul className={styles.info}>
              {pop.info.map((x) => (
                <li key={x.id} data-reveal>
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
        {pop.channels && pop.channelsTitle && (
          <Section>
            <Head title={pop.channelsTitle} langs={langs} />
            <ul className={styles.channels}>
              {pop.channels.map((c) => (
                <li key={c.id} data-reveal>
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    <span className={styles.chIcon}>
                      <LinkIcon type={c.type} className="size-6" />
                    </span>
                    <span>
                      <b>
                        <Bi t={c.label} langs={langs} />
                      </b>
                      <small>{c.handle}</small>
                    </span>
                    <ArrowUpRightIcon className="ml-auto size-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── Closing ── */}
        {pop.closingTitle && (
          <section className={styles.closing} data-reveal>
            <Sketch spec={{ kind: "cupcake", color: pink, topper: "cherry" }} variant="sticker" ink={ink} className={styles.closingCake} />
            <h2>
              <BiRich t={pop.closingTitle} langs={langs} />
            </h2>
            {pop.closingText && (
              <p>
                <Bi t={pop.closingText} langs={langs} />
              </p>
            )}
            <a href={pop.order.url} target="_blank" rel="noopener noreferrer" className={styles.ctaInk}>
              <Bi t={pop.order.label} langs={langs} />
            </a>
          </section>
        )}

        {!site.hideBranding && (
          <footer className={styles.credit}>
            <Bi t={CREATED_WITH} langs={langs} />
          </footer>
        )}
      </main>

      <div className={styles.bar}>
        <a href={pop.order.url} target="_blank" rel="noopener noreferrer">
          <LinkIcon type="order" className="size-5" />
          <Bi t={pop.order.label} langs={langs} />
        </a>
      </div>
    </div>
  );
}
