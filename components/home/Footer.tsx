import type { Dict } from "@/lib/i18n";
import { CONTACTS, CONTACT_LINKS, whatsappLink } from "@/lib/brand";
import { LinkIcon } from "@/components/icons";
import Logo from "./Logo";

export default function Footer({ dict }: { dict: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ol-line px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-ol-muted md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Logo className="h-6" />
          <span>
            © {year}. {dict.footer.rights}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-5 md:ml-auto">
          <a href={CONTACT_LINKS.telegram} target="_blank" rel="noopener" aria-label="Telegram" className="hover:text-ol-ink">
            <LinkIcon type="telegram" className="size-5" />
          </a>
          <a href={CONTACT_LINKS.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-ol-ink">
            <LinkIcon type="instagram" className="size-5" />
          </a>
          <a href={whatsappLink(dict.cta.whatsappMessage)} target="_blank" rel="noopener" aria-label="WhatsApp" className="hover:text-ol-ink">
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
