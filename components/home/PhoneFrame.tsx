import { LockClosedIcon } from "@heroicons/react/20/solid";

/** Phone-shaped frame around a real site screenshot (390x844 viewport). */
export default function PhoneFrame({
  src,
  alt,
  url,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  /** Optional address pill overlapping the bottom edge */
  url?: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="rounded-[2.2rem] bg-ol-ink/90 p-[7px] shadow-[0_30px_60px_-20px_var(--ol-shadow)] dark:bg-ol-surface-2">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[1.8rem] bg-ol-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            width={390}
            height={844}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
      {url && (
        <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-ol-line bg-ol-surface px-3.5 py-2 text-[13px] font-medium text-ol-ink shadow-[0_10px_30px_-12px_var(--ol-shadow)]">
          <LockClosedIcon className="size-3.5 text-ol-accent" aria-hidden />
          {url}
        </div>
      )}
    </div>
  );
}
