/**
 * ownlink.uz logo from the brand kit (materials/brand-kit). <picture> picks
 * the navy-wordmark version on light backgrounds and the white-wordmark one
 * in dark mode, so only one file is downloaded.
 */
export default function Logo({ className = "h-7" }: { className?: string }) {
  return (
    <picture>
      <source srcSet="/brand/logo-on-dark.svg" media="(prefers-color-scheme: dark)" />
      <img src="/brand/logo.svg" alt="ownlink.uz" width={785} height={224} className={`w-auto ${className}`} />
    </picture>
  );
}
