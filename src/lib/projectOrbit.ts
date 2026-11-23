// Layout for the home page projects section (src/lib/components/ProjectOrbit.svelte).
//
// The section opens on the finished layout: the featured projects in a row on
// top, everything else in a grid under them. Scrolling through it zooms into
// each featured project in turn: it grows from its slot into the spotlight
// (with its description beside it) while the rest dims, then settles back
// before the next one comes up. Past the last one it's the grid again.
//
// All positions are px from the center of the card area; a card is
// CARD_W × CARD_H at scale 1.

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
  p: number; // scroll progress through the section, 0..1
};

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

const FIRST = 0.1; // first pick starts zooming in
const STEP = 0.28; // scroll per pick
const IN = 0.08; // zoom into the spotlight
const HOLD = 0.12; // stay in the spotlight
const OUT = 0.08; // settle back into the row

const startAt = (j: number) => FIRST + j * STEP;
const outAt = (j: number) => startAt(j) + IN + HOLD;

// how far pick j is zoomed in (0 in its slot, 1 in the spotlight)
const zoomOf = (j: number, p: number) =>
  smooth(startAt(j), startAt(j) + IN, p) *
  (1 - smooth(outAt(j), outAt(j) + OUT, p));

// how much the spotlight is in use right now (dims everything else)
const zoomAt = (p: number, picks: number) => {
  let z = 0;
  for (let j = 0; j < picks; j++) z = Math.max(z, zoomOf(j, p));
  return z;
};

/** every card sits in its slot (start, between picks, and at the end) */
export const isResting = (p: number, picks: number) => zoomAt(p, picks) < 0.001;

// which pick is in the spotlight and how visible its text is (0..1)
export function focusAt(p: number, picks: number) {
  for (let j = 0; j < picks; j++) {
    const start = startAt(j);
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

// the resting layout: featured row on top, the rest in a grid under it, the
// whole block centered vertically; cards shrink until everything fits
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
// the pick in the spotlight > the other picks > the grid
export function place(g: Geo, c: Slot): Placed {
  if (c.pick >= 0) {
    const zoom = zoomOf(c.pick, c.p);
    if (zoom > 0) {
      return {
        ...mix(featuredSlot(g, c), spotlight(g), zoom),
        on: true,
        zi: 4000 + c.pick,
      };
    }
  }
  // everything not in the spotlight fades back while one is; on phones the
  // text sits over the grid, so it fades almost fully
  const dim = zoomAt(c.p, c.picks) * (g.mobile ? 0.95 : 0.85);
  const slot = c.pick >= 0 ? featuredSlot(g, c) : gridSlot(g, c);
  return {
    ...slot,
    o: slot.o * (1 - dim),
    on: c.pick >= 0,
    zi: c.pick >= 0 ? 2000 + c.pick : 1000,
  };
}

// flatten the fake depth into plain scaling, so z-index decides stacking
export function project(pose: Pose): Pose {
  const f = PERSPECTIVE / Math.max(200, PERSPECTIVE - pose.z);
  return { ...pose, x: pose.x * f, y: pose.y * f, s: pose.s * f, z: 0 };
}
