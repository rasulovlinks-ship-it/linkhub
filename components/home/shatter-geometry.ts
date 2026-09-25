/**
 * Deterministic "impact fracture" for the hero glass card. Everything is in
 * percent of the card box (0-100), so the same numbers drive both the crack
 * SVG (viewBox 0 0 100 100) and the shard clip-paths, and the crack lines
 * land exactly on the shard edges.
 *
 * Shape: rays from the impact point to the card edge (the four corners are
 * always rays, so every outer shard's edge lies on a single side), cut by two
 * jittered rings, which gives inner triangles, middle quads and outer pieces.
 */

type Pt = { x: number; y: number };

export type Shard = {
  clip: string;
  /** Transform origin (centroid), percent */
  cx: number;
  cy: number;
  /** Unit vector from impact to centroid */
  dx: number;
  dy: number;
  /** Distance from impact, percent units */
  dist: number;
  /** Stable pseudo-random 0-1 per shard, for motion variation */
  r1: number;
  r2: number;
  r3: number;
};

export const IMPACT: Pt = { x: 31, y: 44 };
const EXTRA_RAYS = 7;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 100) / 100;

function edgePoint(angle: number): Pt {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const ts: number[] = [];
  if (dx > 1e-9) ts.push((100 - IMPACT.x) / dx);
  if (dx < -1e-9) ts.push(-IMPACT.x / dx);
  if (dy > 1e-9) ts.push((100 - IMPACT.y) / dy);
  if (dy < -1e-9) ts.push(-IMPACT.y / dy);
  const t = Math.min(...ts);
  return {
    x: Math.min(100, Math.max(0, IMPACT.x + dx * t)),
    y: Math.min(100, Math.max(0, IMPACT.y + dy * t)),
  };
}

function build() {
  const rng = mulberry32(20260925);
  const corners = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 },
  ].map((c) => Math.atan2(c.y - IMPACT.y, c.x - IMPACT.x));

  const angles = [...corners];
  for (let i = 0; i < EXTRA_RAYS; i++) {
    const base = (i / EXTRA_RAYS) * Math.PI * 2 - Math.PI;
    angles.push(base + (rng() - 0.5) * 0.5);
  }
  angles.sort((a, b) => a - b);

  const lerp = (a: Pt, b: Pt, t: number): Pt => ({
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  });

  const rays = angles.map((a) => {
    const e = edgePoint(a);
    return {
      e,
      p1: lerp(IMPACT, e, 0.2 + rng() * 0.14),
      p2: lerp(IMPACT, e, 0.52 + rng() * 0.2),
    };
  });

  const shards: Shard[] = [];
  const pushShard = (pts: Pt[]) => {
    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
    const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
    const vx = cx - IMPACT.x;
    const vy = cy - IMPACT.y;
    const dist = Math.hypot(vx, vy) || 1;
    shards.push({
      clip: `polygon(${pts.map((p) => `${round(p.x)}% ${round(p.y)}%`).join(", ")})`,
      cx: round(cx),
      cy: round(cy),
      dx: vx / dist,
      dy: vy / dist,
      dist,
      r1: rng(),
      r2: rng(),
      r3: rng(),
    });
  };

  const ringSegments: string[] = [];
  for (let i = 0; i < rays.length; i++) {
    const a = rays[i];
    const b = rays[(i + 1) % rays.length];
    pushShard([IMPACT, a.p1, b.p1]);
    pushShard([a.p1, a.p2, b.p2, b.p1]);
    pushShard([a.p2, a.e, b.e, b.p2]);
    // Real cracks are not closed rings: drop some ring segments from the
    // drawing (the shards still split there, it's hidden by the fall).
    if (rng() > 0.2) ringSegments.push(`M${round(a.p1.x)} ${round(a.p1.y)}L${round(b.p1.x)} ${round(b.p1.y)}`);
    if (rng() > 0.35) ringSegments.push(`M${round(a.p2.x)} ${round(a.p2.y)}L${round(b.p2.x)} ${round(b.p2.y)}`);
  }

  const rayPaths = rays.map(
    (r) =>
      `M${IMPACT.x} ${IMPACT.y}L${round(r.p1.x)} ${round(r.p1.y)}L${round(r.p2.x)} ${round(r.p2.y)}L${round(r.e.x)} ${round(r.e.y)}`,
  );

  return { shards, rayPaths, ringSegments };
}

export const FRACTURE = build();
