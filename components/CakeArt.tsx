import { useId } from "react";
import type { CakeStyle, CakeTone } from "@/lib/types";

type Palette = {
  /** Frosting on the side of a tier */
  frost: string;
  /** Lit top surface */
  light: string;
  /** Shaded edges */
  shade: string;
  /** Glaze / accents */
  deep: string;
  /** Soft background tint for tiles behind the cake */
  tint: string;
  /** Sponge layer visible through the side */
  sponge: string;
};

export const CAKE_PALETTES: Record<CakeTone, Palette> = {
  rose: { frost: "#F9B4CC", light: "#FDD5E3", shade: "#EC8DB0", deep: "#BE185D", tint: "#FFE4EE", sponge: "#F3D2A0" },
  cream: { frost: "#F6E3C4", light: "#FFF3DE", shade: "#E5C591", deep: "#B45309", tint: "#FEF3DC", sponge: "#E2B978" },
  chocolate: { frost: "#7A4A32", light: "#A0694A", shade: "#5A3322", deep: "#3B1F12", tint: "#EBD9CC", sponge: "#4A2A1A" },
  pistachio: { frost: "#C5E29C", light: "#E0F2C4", shade: "#9BC46A", deep: "#4D7C0F", tint: "#EAF6D6", sponge: "#EFD9A2" },
  violet: { frost: "#CDB8F5", light: "#E4D8FB", shade: "#A98CE8", deep: "#6D28D9", tint: "#EEE7FC", sponge: "#F1DDB5" },
  lemon: { frost: "#FBE98A", light: "#FFF5B8", shade: "#F2CE4B", deep: "#A16207", tint: "#FEF6C3", sponge: "#F5D98E" },
  velvet: { frost: "#E0566B", light: "#F08A99", shade: "#BE123C", deep: "#7F1029", tint: "#FFE1E5", sponge: "#A8243A" },
};

const TIER_SHAPES: Record<1 | 2 | 3, { w: number; h: number }[]> = {
  1: [{ w: 124, h: 66 }],
  2: [
    { w: 140, h: 52 },
    { w: 94, h: 44 },
  ],
  3: [
    { w: 146, h: 42 },
    { w: 104, h: 36 },
    { w: 68, h: 32 },
  ],
};

const SPRINKLE_COLORS = ["#F43F5E", "#FACC15", "#38BDF8", "#34D399", "#A78BFA", "#FB923C"];

function Flower({ x, y, petal }: { x: number; y: number; petal: string }) {
  const angles = [0, 72, 144, 216, 288];
  return (
    <g>
      {angles.map((a) => (
        <circle
          key={a}
          cx={x + Math.cos((a * Math.PI) / 180) * 4.6}
          cy={y + Math.sin((a * Math.PI) / 180) * 4.6}
          r="3.6"
          fill={petal}
        />
      ))}
      <circle cx={x} cy={y} r="2.8" fill="#FBBF24" />
    </g>
  );
}

function Topper({
  kind,
  cx,
  y,
  rx,
  deep,
}: {
  kind: NonNullable<CakeStyle["topper"]>;
  cx: number;
  y: number;
  rx: number;
  deep: string;
}) {
  const s = Math.min(1, rx / 60);
  switch (kind) {
    case "berries":
      return (
        <g transform={`translate(${cx} ${y}) scale(${s})`}>
          <ellipse cx="-10" cy="-2" rx="9" ry="3.5" fill="#4D7C0F" transform="rotate(-24 -10 -2)" />
          <circle cx="-16" cy="-6" r="7.5" fill="#E11D48" />
          <circle cx="-18.4" cy="-8.4" r="2" fill="#fff" opacity="0.55" />
          <circle cx="1" cy="-10" r="8" fill="#BE123C" />
          <circle cx="-1.6" cy="-12.6" r="2.2" fill="#fff" opacity="0.55" />
          <circle cx="16" cy="-5" r="6.5" fill="#4C1D95" />
          <circle cx="14" cy="-7.2" r="1.8" fill="#fff" opacity="0.5" />
          <ellipse cx="9" cy="-1" rx="5" ry="2.4" fill="#65A30D" transform="rotate(20 9 -1)" />
        </g>
      );
    case "flowers":
      return (
        <g transform={`translate(${cx} ${y}) scale(${s})`}>
          <ellipse cx="-2" cy="-1" rx="20" ry="3" fill="#65A30D" opacity="0.85" />
          <Flower x={-15} y={-7} petal="#FFFFFF" />
          <Flower x={2} y={-11} petal="#FBCFE8" />
          <Flower x={17} y={-6} petal="#FFFFFF" />
        </g>
      );
    case "candles":
      return (
        <g transform={`translate(${cx} ${y}) scale(${s})`}>
          {[-16, 0, 16].map((dx, i) => (
            <g key={dx}>
              <rect x={dx - 2.5} y={-26 + i * 2} width="5" height={24 - i * 2} rx="1.5" fill={i === 1 ? "#FDE68A" : "#fff"} />
              <rect x={dx - 2.5} y={-20 + i * 2} width="5" height="3" fill={deep} opacity="0.7" />
              <path
                d={`M${dx} ${-37 + i * 2} c3 4 3 8 0 9.5 c-3 -1.5 -3 -5.5 0 -9.5Z`}
                fill="#FB923C"
              />
              <path d={`M${dx} ${-33 + i * 2} c1.4 2 1.4 3.6 0 4.4 c-1.4 -.8 -1.4 -2.4 0 -4.4Z`} fill="#FEF08A" />
            </g>
          ))}
        </g>
      );
    case "heart":
      return (
        <g transform={`translate(${cx} ${y - 2}) scale(${s})`}>
          <path
            d="M0 -3 C-16 -18 -30 -2 0 14 C30 -2 16 -18 0 -3Z"
            transform="translate(0 -14) scale(0.72)"
            fill={deep}
          />
          <path
            d="M-9 -20 C-13 -22 -15 -18 -12 -16"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </g>
      );
    case "sprinkles":
      return (
        <g>
          {Array.from({ length: 18 }).map((_, i) => {
            const t = (i * 137.5 * Math.PI) / 180;
            const r = Math.sqrt((i + 0.6) / 18) * 0.82;
            return (
              <rect
                key={i}
                x={cx + Math.cos(t) * rx * r - 3}
                y={y + Math.sin(t) * rx * 0.2 * r - 1}
                width="6"
                height="2.4"
                rx="1.2"
                fill={SPRINKLE_COLORS[i % SPRINKLE_COLORS.length]}
                transform={`rotate(${(i * 53) % 180} ${cx + Math.cos(t) * rx * r} ${y + Math.sin(t) * rx * 0.2 * r})`}
              />
            );
          })}
        </g>
      );
    default:
      return null;
  }
}

/**
 * Drawn layer-cake illustration, used wherever a real photo isn't provided.
 * Purely decorative (aria-hidden); the surrounding card carries the text.
 */
export default function CakeArt({
  style,
  className,
}: {
  style: CakeStyle;
  className?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const p = CAKE_PALETTES[style.tone];
  const tiers = TIER_SHAPES[style.tiers ?? 1];
  const topper = style.topper ?? "none";

  // Stack bottom-up. Each tier stands on the centre of the surface below it.
  const layout = tiers.map((t, i) => {
    const y1 = 172 - tiers.slice(0, i).reduce((sum, below) => sum + below.h, 0);
    return { ...t, ry: t.w * 0.1, y0: y1 - t.h, y1, x: 100 - t.w / 2 };
  });
  const top = layout[layout.length - 1];

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        {layout.map((_, i) => (
          <linearGradient key={i} id={`${uid}s${i}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={p.shade} />
            <stop offset="0.22" stopColor={p.frost} />
            <stop offset="0.6" stopColor={p.frost} />
            <stop offset="1" stopColor={p.shade} />
          </linearGradient>
        ))}
        {layout.map((t, i) => (
          <clipPath key={i} id={`${uid}c${i}`}>
            <path
              d={`M${t.x} ${t.y0} L${t.x} ${t.y1} A${t.w / 2} ${t.ry} 0 0 0 ${t.x + t.w} ${t.y1} L${t.x + t.w} ${t.y0} Z`}
            />
          </clipPath>
        ))}
      </defs>

      {/* plate + soft shadow */}
      <ellipse cx="100" cy="176" rx="90" ry="13" fill="#000" opacity="0.08" />
      <ellipse cx="100" cy="172" rx="88" ry="12" fill="#fff" />
      <ellipse cx="100" cy="172" rx="88" ry="12" fill="none" stroke="#000" strokeOpacity="0.07" />
      <ellipse cx="100" cy="171" rx="76" ry="8.5" fill="#000" opacity="0.04" />

      {layout.map((t, i) => {
        const isTop = i === layout.length - 1;
        const cx = 100;
        const rx = t.w / 2;
        const bandA = t.y0 + t.h * 0.44;
        const bandB = t.y0 + t.h * 0.6;
        const dripOn = isTop && style.drip;

        return (
          <g key={i}>
            {/* side */}
            <path
              d={`M${t.x} ${t.y0} L${t.x} ${t.y1} A${rx} ${t.ry} 0 0 0 ${t.x + t.w} ${t.y1} L${t.x + t.w} ${t.y0} Z`}
              fill={`url(#${uid}s${i})`}
            />

            <g clipPath={`url(#${uid}c${i})`}>
              {/* sponge layer with a cream stripe */}
              <path
                d={`M${t.x} ${bandA} A${rx} ${t.ry} 0 0 0 ${t.x + t.w} ${bandA} L${t.x + t.w} ${bandB} A${rx} ${t.ry} 0 0 1 ${t.x} ${bandB} Z`}
                fill={p.sponge}
              />
              <path
                d={`M${t.x} ${(bandA + bandB) / 2} A${rx} ${t.ry} 0 0 0 ${t.x + t.w} ${(bandA + bandB) / 2}`}
                stroke="#fff"
                strokeOpacity="0.8"
                strokeWidth="2.6"
                fill="none"
              />
              {/* drip */}
              {dripOn &&
                [0.1, 0.24, 0.38, 0.52, 0.64, 0.78, 0.9].map((u, k) => {
                  const dx = t.x + t.w * u;
                  const edge = t.y0 + t.ry * Math.sqrt(Math.max(0, 1 - ((dx - cx) / rx) ** 2));
                  const len = [16, 9, 22, 12, 19, 8, 14][k] ?? 12;
                  return (
                    <rect key={k} x={dx - 3.4} y={edge - 3} width="6.8" height={len + 3} rx="3.4" fill={p.deep} />
                  );
                })}
            </g>

            {/* pearls around the base */}
            {style.pearls &&
              Array.from({ length: Math.round(t.w / 11) }).map((_, k, arr) => {
                const u = (k + 0.5) / arr.length;
                const angle = Math.PI * u;
                const px = cx - Math.cos(angle) * rx * 0.985;
                const py = t.y1 + Math.sin(angle) * t.ry * 0.985;
                return <circle key={k} cx={px} cy={py - 1} r="2.7" fill="#fff" opacity="0.95" />;
              })}

            {/* top surface */}
            <ellipse cx={cx} cy={t.y0} rx={rx} ry={t.ry} fill={dripOn ? p.deep : p.light} />
            {dripOn && (
              <ellipse
                cx={cx - rx * 0.28}
                cy={t.y0 - t.ry * 0.25}
                rx={rx * 0.42}
                ry={t.ry * 0.28}
                fill="#fff"
                opacity="0.22"
              />
            )}
          </g>
        );
      })}

      <Topper
        kind={topper}
        cx={100}
        y={top.y0 + (topper === "sprinkles" ? 0 : 2)}
        rx={top.w / 2}
        deep={p.deep}
      />
    </svg>
  );
}
