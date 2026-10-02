import type { CSSProperties, ReactNode } from "react";
import type { Sketch as SketchSpec } from "@/lib/types";

/**
 * Cake drawings for the "pop" (thick sticker outline, flat colour) and
 * "menu" (hairline, mostly unfilled) templates. Used wherever a card has no
 * photo yet. Everything derives from one frosting colour, so a buyer only
 * has to pick hex values.
 */

function mix(hex: string, other: string, amount: number) {
  const parse = (h: string) => {
    const v = h.replace("#", "");
    const full = v.length === 3 ? v.replace(/./g, (c) => c + c) : v;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  };
  const a = parse(hex);
  const b = parse(other);
  const out = a.map((c, i) => Math.round(c + (b[i] - c) * amount));
  return `#${out.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

type Look = {
  stroke: string;
  sw: number;
  /** "sticker" paints solid shapes, "line" leaves them nearly empty */
  fill: boolean;
  paper: string;
};

type Tier = { cx: number; base: number; w: number; h: number };

function Cylinder({ t, color, look, drip }: { t: Tier; color: string; look: Look; drip?: boolean }) {
  const ry = t.w * 0.15;
  const { cx, base, w, h } = t;
  const left = cx - w / 2;
  const right = cx + w / 2;
  const top = base - h;
  const sideFill = look.fill ? color : look.paper;
  const topFill = look.fill ? mix(color, "#ffffff", 0.45) : look.paper;
  const body = `M${left} ${top} L${left} ${base} A${w / 2} ${ry} 0 0 0 ${right} ${base} L${right} ${top}`;
  // Glaze dripping over the rim, in a deeper shade of the same colour
  const dripColor = mix(color, "#000000", 0.18);
  const drops = [0.16, 0.38, 0.62, 0.84];
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d={body} fill={sideFill} stroke={look.stroke} strokeWidth={look.sw} />
      {look.fill && (
        <path
          d={`M${left + look.sw / 2} ${base - h * 0.3} A${w / 2} ${ry} 0 0 0 ${right - look.sw / 2} ${base - h * 0.3}`}
          fill="none"
          stroke={mix(color, "#000000", 0.14)}
          strokeWidth={look.sw * 0.6}
          opacity={0.55}
        />
      )}
      {!look.fill && (
        <path
          d={`M${left} ${base - h * 0.5} A${w / 2} ${ry} 0 0 0 ${right} ${base - h * 0.5}`}
          fill="none"
          stroke={look.stroke}
          strokeWidth={look.sw * 0.6}
          strokeDasharray="1 4"
        />
      )}
      <ellipse cx={cx} cy={top} rx={w / 2} ry={ry} fill={topFill} stroke={look.stroke} strokeWidth={look.sw} />
      {drip && look.fill && (
        <g fill={dripColor} stroke="none">
          <path
            d={`M${left + 1} ${top + 1} A${w / 2 - 1} ${ry - 1} 0 0 0 ${right - 1} ${top + 1} L${right - 1} ${top + 6} A${w / 2 - 1} ${ry - 1} 0 0 1 ${left + 1} ${top + 6}Z`}
          />
          {drops.map((d, i) => {
            const x = left + w * d;
            const nx = (x - cx) / (w / 2);
            const rim = top + ry * Math.sqrt(Math.max(0, 1 - nx * nx));
            return <rect key={i} x={x - 4.5} y={rim - 1} width="9" height={10 + (i % 2) * 9} rx="4.5" />;
          })}
        </g>
      )}
    </g>
  );
}

function Topper({ kind, x, y, look, color }: { kind: SketchSpec["topper"]; x: number; y: number; look: Look; color: string }) {
  const red = look.fill ? "#e0334c" : look.stroke;
  const common = { stroke: look.stroke, strokeWidth: look.sw, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "cherry":
      return (
        <g {...common}>
          <path d={`M${x} ${y - 9} Q${x + 4} ${y - 22} ${x + 12} ${y - 24}`} fill="none" />
          <circle cx={x} cy={y - 5} r="8" fill={look.fill ? red : look.paper} />
          {look.fill && <circle cx={x - 3} cy={y - 8} r="1.8" fill="#fff" stroke="none" />}
        </g>
      );
    case "berries":
      return (
        <g {...common}>
          {[
            [-13, 0],
            [0, -3],
            [13, 0],
          ].map(([dx, dy], i) => (
            <circle key={i} cx={x + dx} cy={y + dy - 4} r="6.5" fill={look.fill ? ["#d6336c", "#7048e8", "#d6336c"][i] : look.paper} />
          ))}
        </g>
      );
    case "candle":
      return (
        <g {...common}>
          <rect x={x - 3.5} y={y - 26} width="7" height="24" rx="2" fill={look.fill ? "#fff" : look.paper} />
          <path d={`M${x} ${y - 40} Q${x + 6} ${y - 33} ${x} ${y - 29} Q${x - 6} ${y - 33} ${x} ${y - 40}Z`} fill={look.fill ? "#ffc53d" : "none"} />
        </g>
      );
    case "flower":
      return (
        <g {...common}>
          {[0, 72, 144, 216, 288].map((a) => (
            <circle
              key={a}
              cx={x + Math.cos((a * Math.PI) / 180) * 7}
              cy={y - 7 + Math.sin((a * Math.PI) / 180) * 7}
              r="5.2"
              fill={look.fill ? "#fff" : look.paper}
            />
          ))}
          <circle cx={x} cy={y - 7} r="4" fill={look.fill ? "#ffc53d" : look.paper} />
        </g>
      );
    case "heart":
      return (
        <path
          d={`M${x} ${y} C${x - 22} ${y - 14} ${x - 9} ${y - 28} ${x} ${y - 17} C${x + 9} ${y - 28} ${x + 22} ${y - 14} ${x} ${y}Z`}
          fill={look.fill ? mix(color, "#e0334c", 0.7) : "none"}
          {...common}
        />
      );
    default:
      return null;
  }
}

export default function Sketch({
  spec,
  variant,
  ink,
  paper = "#ffffff",
  className,
  style,
  label,
}: {
  spec: SketchSpec;
  variant: "sticker" | "line";
  ink: string;
  paper?: string;
  className?: string;
  style?: CSSProperties;
  /** Accessible name; omit for purely decorative drawings */
  label?: string;
}) {
  const look: Look = variant === "sticker" ? { stroke: ink, sw: 4, fill: true, paper } : { stroke: ink, sw: 1.5, fill: false, paper };
  const color = spec.color;
  const topper = spec.topper ?? "cherry";
  let body: ReactNode;
  let topX = 100;
  let topY = 100;

  switch (spec.kind) {
    case "tiers": {
      const tiers: Tier[] = [
        { cx: 100, base: 176, w: 150, h: 38 },
        { cx: 100, base: 138, w: 106, h: 34 },
        { cx: 100, base: 104, w: 68, h: 30 },
      ];
      body = tiers.map((t, i) => <Cylinder key={i} t={t} color={i === 1 ? mix(color, "#ffffff", 0.35) : color} look={look} drip={i === 2} />);
      topY = 104 - 30;
      break;
    }
    case "bento": {
      body = (
        <g strokeLinejoin="round" strokeLinecap="round">
          <path
            d="M40 128 L48 176 Q100 190 152 176 L160 128Z"
            fill={look.fill ? mix(color, "#000000", 0.2) : look.paper}
            stroke={look.stroke}
            strokeWidth={look.sw}
          />
          <Cylinder t={{ cx: 100, base: 142, w: 108, h: 52 }} color={color} look={look} drip />
        </g>
      );
      topY = 142 - 52;
      break;
    }
    case "cupcake": {
      const frost = color;
      body = (
        <g strokeLinejoin="round" strokeLinecap="round">
          <path d="M58 112 L70 176 Q100 184 130 176 L142 112Z" fill={look.fill ? mix(color, "#000000", 0.28) : look.paper} stroke={look.stroke} strokeWidth={look.sw} />
          {[78, 92, 106, 120].map((x) => (
            <path key={x} d={`M${x - 6} 118 L${x + 2} 174`} stroke={look.stroke} strokeWidth={look.sw * 0.5} opacity={0.5} fill="none" />
          ))}
          {[
            { y: 120, rx: 52, ry: 16 },
            { y: 98, rx: 40, ry: 14 },
            { y: 78, rx: 26, ry: 12 },
          ].map((e, i) => (
            <ellipse
              key={i}
              cx="100"
              cy={e.y}
              rx={e.rx}
              ry={e.ry}
              fill={look.fill ? mix(frost, "#ffffff", i * 0.18) : look.paper}
              stroke={look.stroke}
              strokeWidth={look.sw}
            />
          ))}
        </g>
      );
      topY = 70;
      break;
    }
    case "slice": {
      const light = look.fill ? mix(color, "#ffffff", 0.5) : look.paper;
      body = (
        <g strokeLinejoin="round" strokeLinecap="round">
          <path d="M30 168 L30 112 L150 112 L150 168Z" fill={look.fill ? color : look.paper} stroke={look.stroke} strokeWidth={look.sw} />
          <path d="M150 112 L176 92 L176 148 L150 168Z" fill={look.fill ? mix(color, "#000000", 0.18) : look.paper} stroke={look.stroke} strokeWidth={look.sw} />
          <path d="M30 112 L56 92 L176 92 L150 112Z" fill={light} stroke={look.stroke} strokeWidth={look.sw} />
          {[128, 146].map((y) => (
            <path
              key={y}
              d={`M30 ${y} L150 ${y}`}
              stroke={look.stroke}
              strokeWidth={look.sw * (look.fill ? 0.7 : 0.5)}
              strokeDasharray={look.fill ? undefined : "1 4"}
              opacity={0.6}
            />
          ))}
        </g>
      );
      topX = 104;
      topY = 104;
      break;
    }
    default: {
      body = (
        <>
          <Cylinder t={{ cx: 100, base: 172, w: 138, h: 74 }} color={color} look={look} drip />
        </>
      );
      topY = 172 - 74;
    }
  }

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {variant === "sticker" && <ellipse cx="100" cy="186" rx="64" ry="7" fill={ink} opacity="0.18" />}
      {body}
      <Topper kind={topper} x={topX} y={topY} look={look} color={color} />
    </svg>
  );
}
