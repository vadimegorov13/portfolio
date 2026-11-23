// Layout for the home page projects section (src/lib/components/ProjectOrbit.svelte).
//
// Scrolling through the section plays a timeline:
//   1. every project circles on three orbit rings, slowing down
//   2. each spotlight pick comes to the front with its description, then
//      moves up into a "featured" row when the next one comes in
//   3. the rest of the projects sort themselves into a grid below
//
// All positions are px from the center of the card area; a card is
// CARD_W × CARD_H at scale 1. z only fakes depth (it scales the card).

export const CARD_W = 220;
export const CARD_H = 150;
export const PERSPECTIVE = 1400;

export type Geo = { w: number; h: number; mobile: boolean };

export type Pose = { x: number; y: number; z: number; s: number; o: number };

export type Placed = Pose & { on: boolean; zi: number };

export type Slot = {
  i: number; // index among all cards
  n: number; // all cards
  pick: number; // order among the spotlight picks, -1 for the rest
  picks: number; // number of spotlight picks
  k: number; // index among the rest (-1 for picks)
  kn: number; // number of the rest
  a: number; // orbit angle, accumulated over time (rad)
  p: number; // scroll progress through the section, 0..1
};

const TAU = Math.PI * 2;

export const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export const mix = (A: Pose, B: Pose, t: number): Pose => ({
  x: A.x + (B.x - A.x) * t,
  y: A.y + (B.y - A.y) * t,
  z: A.z + (B.z - A.z) * t,
  s: A.s + (B.s - A.s) * t,
  o: A.o + (B.o - A.o) * t,
});

// ---- timeline (scroll progress 0..1)

const FIRST = 0.14; // first pick starts coming in
const STEP = 0.2; // scroll per pick
const IN = 0.06; // fly to the spotlight
const HOLD = 0.11; // stay in the spotlight
const OUT = 0.05; // fly up to the featured row
const DIM = [0.1, 0.16]; // orbit fades back as the first pick comes in
const GRID_LEN = 0.16; // the rest sorting into the grid

const outAt = (j: number) => FIRST + j * STEP + IN + HOLD;
// when the last pick has moved up (or the orbit would have slowed down)
const picksDone = (picks: number) =>
  picks > 0 ? outAt(picks - 1) + OUT : FIRST;
export const gridDone = (picks: number) => picksDone(picks) + GRID_LEN;

// orbit spin (rad/s): an unhurried drift that eases a little more by the
// time the first pick comes in
export const speedAt = (p: number) =>
  0.06 + (0.28 - 0.06) * (1 - smooth(0, FIRST, p)) ** 1.6;

// which pick is in the spotlight and how visible its text is (0..1)
export function focusAt(p: number, picks: number) {
  for (let j = 0; j < picks; j++) {
    const start = FIRST + j * STEP;
    if (p >= start && p < outAt(j) + OUT) {
      const amt = Math.min(
        smooth(start + IN * 0.5, start + IN, p),
        1 - smooth(outAt(j), outAt(j) + OUT * 0.6, p)
      );
      return { idx: j, amt };
    }
  }
  return { idx: -1, amt: 0 };
}

// ---- poses

// three rings turning in opposite directions
function orbit(g: Geo, c: Slot): Pose {
  const ring = c.i % 3;
  const per = Math.ceil(c.n / 3);
  const idx = Math.floor(c.i / 3);
  const dir = ring % 2 ? -1 : 1;
  const th = (idx / per) * TAU + c.a * dir * (1 - ring * 0.25) + ring;
  const rx = [0.17, 0.31, 0.45][ring] * g.w;
  const ry = [0.1, 0.19, 0.29][ring] * g.h;
  const front = (Math.sin(th) + 1) / 2;
  return {
    x: Math.cos(th) * rx,
    y: Math.sin(th) * ry,
    z: Math.sin(th) * 70,
    s: (0.62 + 0.1 * front) * (g.mobile ? 0.62 : 1),
    o: 0.75 + 0.25 * front,
  };
}

// big card in front: left half on desktop (text on the right), top on phones
// (text below)
export function spotlight(g: Geo): Pose {
  if (g.mobile) {
    const s = Math.min(1.6, (g.w - 32) / CARD_W, (g.h * 0.32) / CARD_H);
    return { x: 0, y: -g.h / 2 + (CARD_H / 2) * s + 4, z: 0, s, o: 1 };
  }
  const s = Math.min(2, (g.w * 0.4) / CARD_W, (g.h * 0.62) / CARD_H);
  return { x: -g.w * 0.04 - (CARD_W / 2) * s, y: 0, z: 0, s, o: 1 };
}

// where the spotlight text goes, in px from the card area's top-left
export function panelBox(g: Geo) {
  if (g.mobile) {
    const sp = spotlight(g);
    const top = g.h / 2 + sp.y + (CARD_H / 2) * sp.s + 16;
    return {
      left: 16,
      top,
      width: g.w - 32,
      maxHeight: g.h - top - 4,
      center: false,
    };
  }
  return {
    left: g.w / 2 + 32,
    top: g.h / 2,
    width: Math.min(420, g.w / 2 - 64),
    maxHeight: g.h - 16,
    center: true,
  };
}

// end state: featured row on top, the rest in a grid under it, the whole
// block centered vertically; cards shrink until everything fits
function finalLayout(g: Geo, picks: number, kn: number) {
  const gap = g.mobile ? 10 : 20;
  const between = g.mobile ? 20 : 36;
  const usableW = g.w * 0.94;

  const fs = picks
    ? Math.min(g.mobile ? 0.62 : 1.15, (usableW / picks - gap) / CARD_W)
    : 0;
  const fh = picks ? CARD_H * fs : 0;

  let gs = 0.9;
  let cols = 1;
  let rows = 0;
  const availH = g.h - 16 - (picks ? fh + between : 0);
  for (; gs > 0.3; gs -= 0.025) {
    const cw = CARD_W * gs;
    cols = Math.max(1, Math.min(kn, Math.floor((usableW + gap) / (cw + gap))));
    rows = Math.ceil(kn / cols);
    if (rows * CARD_H * gs + (rows - 1) * gap <= availH) break;
  }
  const gh = kn ? rows * CARD_H * gs + (rows - 1) * gap : 0;
  const total = fh + (picks && kn ? between : 0) + gh;
  const top = -total / 2;

  return {
    featured: { s: fs, y: top + fh / 2, step: CARD_W * fs + gap },
    grid: {
      s: gs,
      cols,
      rows,
      top: top + fh + (picks && kn ? between : 0),
      stepX: CARD_W * gs + gap,
      stepY: CARD_H * gs + gap,
    },
  };
}

function featuredSlot(g: Geo, c: Slot): Pose {
  const f = finalLayout(g, c.picks, c.kn).featured;
  return {
    x: (c.pick - (c.picks - 1) / 2) * f.step,
    y: f.y,
    z: 0,
    s: f.s,
    o: 1,
  };
}

function gridSlot(g: Geo, c: Slot): Pose {
  const { s, cols, rows, top, stepX, stepY } = finalLayout(
    g,
    c.picks,
    c.kn
  ).grid;
  const row = Math.floor(c.k / cols);
  const inRow = row === rows - 1 ? c.kn - row * cols : cols;
  return {
    x: ((c.k % cols) - (inRow - 1) / 2) * stepX,
    y: top + row * stepY + (CARD_H * s) / 2,
    z: 0,
    s,
    o: 1,
  };
}

// where a card is at this point of the timeline. `zi` is its stacking order:
// the pick coming in > picks in the row > the orbit (by depth)
export function place(g: Geo, c: Slot): Placed {
  const o = orbit(g, c);
  const dim = smooth(DIM[0], DIM[1], c.p) * (c.picks ? 1 : 0);
  // on phones the text sits over the orbit, so it fades out almost fully
  const fade = g.mobile ? 0.97 : 0.9;
  const dimmed: Pose = { ...o, z: o.z - 500 * dim, o: o.o * (1 - fade * dim) };

  if (c.pick >= 0) {
    const start = FIRST + c.pick * STEP;
    const tin = smooth(start, start + IN, c.p);
    const tout = smooth(outAt(c.pick), outAt(c.pick) + OUT, c.p);
    if (tout > 0) {
      // muted in the row while the other picks have the spotlight, back to
      // full once the last one has moved up too
      const last = outAt(c.picks - 1);
      const mute = tout * (1 - smooth(last, last + OUT, c.p));
      const pose = mix(spotlight(g), featuredSlot(g, c), tout);
      return {
        ...pose,
        o: pose.o * (1 - 0.8 * mute),
        on: true,
        zi: 3000 + c.pick,
      };
    }
    const pose = mix(dimmed, spotlight(g), tin);
    return {
      ...pose,
      on: tin > 0.95,
      zi: tin > 0 ? 4000 + c.pick : 1000 + Math.round(pose.z),
    };
  }

  const done = picksDone(c.picks);
  const start = done + (c.k / Math.max(1, c.kn)) * GRID_LEN * 0.5;
  const t = smooth(start, start + GRID_LEN * 0.5, c.p);
  const pose = mix(dimmed, gridSlot(g, c), t);
  return { ...pose, on: false, zi: 1000 + Math.round(pose.z) };
}

// flatten the fake depth into plain scaling, so z-index decides stacking
export function project(pose: Pose): Pose {
  const f = PERSPECTIVE / Math.max(200, PERSPECTIVE - pose.z);
  return { ...pose, x: pose.x * f, y: pose.y * f, s: pose.s * f, z: 0 };
}
