import { Onest, Unbounded } from "next/font/google";
import Script from "next/script";
import type { Lang } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import Header from "./Header";
import Hero from "./Hero";
import DomainCompare from "./DomainCompare";
import Benefits from "./Benefits";
import SavingsCalculator from "./SavingsCalculator";
import Portfolio from "./Portfolio";
import Steps from "./Steps";
import Reviews, { getVisibleReviews } from "./Reviews";
import Faq from "./Faq";
import ContactCta from "./ContactCta";
import Footer from "./Footer";
import RevealObserver from "./Reveal";

const display = Unbounded({
  variable: "--font-ol-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
});

const body = Onest({
  variable: "--font-ol-body",
  subsets: ["latin", "cyrillic"],
});

/**
 * Runs before paint: marks JS as available (enables reveal-on-scroll start
 * states) and skips the hero intro for returning visitors in this session or
 * reduced-motion users, so they never see a flash of the intro.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('ol-js');try{if(sessionStorage.getItem('ol-hero')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.setAttribute('data-ol-skip','')}catch(e){d.setAttribute('data-ol-skip','')}})();`;

/** Cloudflare Web Analytics site "ownlink.uz" (public token, no cookies) */
const CF_ANALYTICS_TOKEN = "3a80d69058ae4f158b0f374877344e46";

export default function HomePage({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  return (
    <div id="top" lang={lang} className={`ol ${display.variable} ${body.variable} relative flex-1 font-ol`}>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      <Header dict={dict} showReviews={getVisibleReviews().length > 0} />
      <main>
        <Hero dict={dict} />
        <DomainCompare dict={dict} lang={lang} />
        <Benefits dict={dict} />
        <SavingsCalculator dict={dict} />
        <Portfolio dict={dict} lang={lang} />
        <Steps dict={dict} />
        <Reviews dict={dict} lang={lang} />
        <Faq dict={dict} />
        <ContactCta dict={dict} />
      </main>
      <Footer dict={dict} />
      <RevealObserver />
      <Script
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon={JSON.stringify({ token: CF_ANALYTICS_TOKEN })}
        strategy="afterInteractive"
      />
    </div>
  );
}
