import { PhoneIcon } from "@heroicons/react/20/solid";
import type { Dict } from "@/lib/i18n";
import { CONTACTS, CONTACT_LINKS, whatsappLink } from "@/lib/brand";
import { LinkIcon } from "@/components/icons";

export default function ContactCta({ dict }: { dict: Dict }) {
  const t = dict.cta;
  const channels = [
    { href: whatsappLink(t.whatsappMessage), label: t.whatsapp, icon: <LinkIcon type="whatsapp" className="size-4" /> },
    { href: CONTACT_LINKS.instagram, label: t.instagram, icon: <LinkIcon type="instagram" className="size-4" /> },
    { href: CONTACT_LINKS.phone, label: CONTACTS.phone, icon: <PhoneIcon className="size-4" aria-hidden /> },
  ];

  return (
    <section id="contact" className="px-4 pt-10 pb-20 sm:px-6 md:pb-28">
      <div
        data-reveal
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[20px] bg-[image:var(--ol-accent-gradient)] px-6 py-14 text-ol-accent-ink sm:px-12 md:py-20"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 -bottom-16 font-display text-[11rem] leading-none font-semibold tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_var(--ol-accent-ink)] opacity-25 sm:-bottom-24 sm:text-[18rem] lg:text-[22rem]"
        >
          .uz
        </span>
        <h2 className="relative max-w-[16ch] font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance md:text-6xl">
          {t.title}
        </h2>
        <p className="relative mt-5 max-w-[40ch] text-lg opacity-85">{t.text}</p>
        <div className="relative mt-10 flex flex-wrap items-center gap-3">
          <a
            href={CONTACT_LINKS.telegram}
            target="_blank"
            rel="noopener"
            className="ol-btn bg-ol-accent-ink text-ol-accent hover:opacity-90"
          >
            <LinkIcon type="telegram" className="size-4" />
            {dict.nav.cta}
          </a>
          {channels.map((c) => (
            <a
              key={c.href}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener"
              className="ol-btn border border-current/25 hover:bg-current/10"
            >
              {c.icon}
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
