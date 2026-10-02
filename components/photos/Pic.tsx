import type { PhotoItem } from "@/lib/types";
import Sketch from "@/components/draw/Sketch";

const TINTS = ["#fde2e4", "#e2ece9", "#fff1c9", "#dfe7fd", "#f1e1f7", "#e3f1d9"];

/**
 * One cake picture: the owner's photo when photoUrl is set, otherwise the
 * drawing in sketch on a soft tint, otherwise just the tint. Fills its
 * parent (the parent sets size and shape).
 */
export default function Pic({
  item,
  index = 0,
  ink = "#222",
  priority = false,
  alt = "",
}: {
  item: PhotoItem;
  index?: number;
  ink?: string;
  priority?: boolean;
  alt?: string;
}) {
  if (item.photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.photoUrl}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }
  return (
    <span
      aria-hidden={alt ? undefined : true}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      style={{ display: "grid", width: "100%", height: "100%", placeItems: "center", background: TINTS[index % TINTS.length] }}
    >
      {item.sketch && <Sketch spec={item.sketch} variant="sticker" ink={ink} style={{ width: "76%", height: "76%" }} />}
    </span>
  );
}
