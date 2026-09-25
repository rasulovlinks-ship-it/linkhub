import type { Dict } from "@/lib/i18n";
import { CONTACTS, CONTACT_LINKS } from "@/lib/brand";
import { LinkIcon } from "@/components/icons";

export default function Footer({ dict }: { dict: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ol-line px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-ol-muted md:flex-row md:items-center">
        <p>
          <span className="font-display font-semibold text-ol-ink">
            ownlink<span className="text-ol-accent">.uz</span>
          </span>
          <span className="ml-3">
            © {year}. {dict.footer.rights}
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-5 md:ml-auto">
          <a href={CONTACT_LINKS.telegram} target="_blank" rel="noopener" aria-label="Telegram" className="hover:text-ol-ink">
            <LinkIcon type="telegram" className="size-5" />
          </a>
          <a href={CONTACT_LINKS.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-ol-ink">
            <LinkIcon type="instagram" className="size-5" />
          </a>
          <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp" className="hover:text-ol-ink">
            <LinkIcon type="whatsapp" className="size-5" />
          </a>
          <a href={CONTACT_LINKS.phone} className="hover:text-ol-ink">{CONTACTS.phone}</a>
          <a href={dict.nav.switchHref} hrefLang={dict.nav.switchShort.toLowerCase()} className="font-medium hover:text-ol-ink">
            {dict.nav.switchLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
