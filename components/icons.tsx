import type { LinkType } from "@/lib/types";

type IconProps = { className?: string };

function Telegram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M21.05 3.6 2.87 10.7c-1.2.48-1.2 1.15-.22 1.45l4.66 1.46 1.8 5.5c.22.6.38.85.78.85.32 0 .47-.15.65-.33l1.75-1.7 4.62 3.4c.85.47 1.47.23 1.68-.79L23.9 5.1c.3-1.24-.47-1.8-1.35-1.5Zm-3.4 3.5-8.1 7.35-.32 3.4-1.6-4.9 8.9-6.35c.4-.28.78.05.5.4Z" />
    </svg>
  );
}

function Instagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTube({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 8.2s-.2-1.5-.8-2.2c-.8-.9-1.7-.9-2.1-1C16.6 4.7 12 4.7 12 4.7h-.1s-4.6 0-7.1.3c-.4 0-1.3.1-2.1 1-.6.7-.8 2.2-.8 2.2S1.7 10 1.7 11.7v1.5C1.7 15 2 16.8 2 16.8s.2 1.5.8 2.2c.8.9 1.9.9 2.3 1 1.7.2 7 .3 7 .3s4.6 0 7.1-.3c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.2.8-2.2s.3-1.8.3-3.5v-1.5c0-1.8-.3-3.5-.3-3.5ZM9.8 14.9V8.9l5.6 3-5.6 3Z" />
    </svg>
  );
}

function WhatsApp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.6-1.2-1.4-1.4-1.7-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3.2-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

function Phone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 5c0-1 1-2 2-2h2l2 5-2 1.5c1 2.5 2.5 4 5 5L14.5 12l5 2v2c0 1-1 2-2 2C10.5 18 4 11.5 4 5Z" />
    </svg>
  );
}

function Location({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s-7-6.1-7-11.2A7 7 0 0 1 19 9.8C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

function Globe({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9Z" />
    </svg>
  );
}

const ICONS: Record<LinkType, (p: IconProps) => React.JSX.Element> = {
  telegram: Telegram,
  instagram: Instagram,
  youtube: YouTube,
  whatsapp: WhatsApp,
  phone: Phone,
  location: Location,
  website: Globe,
  custom: Globe,
};

export function LinkIcon({ type, className }: { type: LinkType; className?: string }) {
  const Icon = ICONS[type] ?? Globe;
  return <Icon className={className} />;
}
