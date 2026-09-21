import { Children } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Slowly auto-scrolling horizontal strip (pure CSS, no client JS). The
 * children are rendered twice back-to-back and the track is animated
 * exactly -50% so the loop is seamless; pauses on hover, disabled under
 * prefers-reduced-motion (see .linkhub-marquee-* in globals.css).
 *
 * Gap is applied as a trailing margin on every item (rather than flex
 * `gap` on the track) so each duplicated group's width includes its own
 * trailing gap — that's what makes the -50% shift land exactly on the
 * seam between the two groups instead of drifting by half a gap.
 */
export default function Marquee({
  children,
  duration = "32s",
  gap = "1rem",
  staticAtDesktop = false,
}: {
  children: ReactNode;
  duration?: string;
  gap?: string;
  /**
   * When the surrounding layout goes full-width at desktop sizes, the
   * viewport can get wide enough to show both duplicated groups (the ones
   * that make the loop seamless) at once, which reads as a glitch/repeat
   * rather than an infinite scroll. Setting this stops the animation and
   * hides the duplicate group at the lg breakpoint (1024px+), falling back
   * to a plain static row there; below lg it's unaffected.
   */
  staticAtDesktop?: boolean;
}) {
  const items = Children.toArray(children);

  const group = (hidden: boolean) => (
    <div
      className={`flex shrink-0 ${hidden && staticAtDesktop ? "linkhub-marquee-duplicate" : ""}`}
      aria-hidden={hidden || undefined}
    >
      {items.map((child, i) => (
        <div key={i} className="shrink-0" style={{ marginRight: gap }}>
          {child}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`linkhub-marquee-viewport relative w-full overflow-hidden ${staticAtDesktop ? "linkhub-marquee-static" : ""}`}
    >
      <div
        className="linkhub-marquee-track flex w-max"
        style={{ ["--marquee-duration" as string]: duration } as CSSProperties}
      >
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
