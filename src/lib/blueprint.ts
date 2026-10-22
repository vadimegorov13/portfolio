// "Blueprint" intro, like a game streaming in textures: the page first renders
// in blueprint blue with a grid (html.blueprint, set in app.html before first
// paint) under a "click anywhere" window. The click unlocks audio (browsers
// need one before any sound), then a glitchy wave spreads from where the
// visitor clicked and each piece gets its real colors back as the wave
// reaches it. Styles live at the end of app.css.

import { introHum, sfx, sound, tryAutoplay } from '$lib/sound.svelte';

const HOLD = 180; // ms between the click and the wave starting
const JITTER = 300; // random extra delay per piece, so it "streams" in
const LATE = 0.12; // share of pieces that pop in late, like slow textures

// where to look for pieces; mark anything else (like the floating sound
// button) with data-bp-root
const ROOTS = 'main, aside, header, [data-bp-root]';

const isIcon = (el: Element) =>
  el.matches('svg') ||
  (el.matches('img') && el.getBoundingClientRect().width <= 64);

// the smallest things worth tinting: text, chips, tiles, cards, or anything
// marked [data-bp-piece] to be tinted as one (images and icons are handled
// separately below)
function collectPieces(): HTMLElement[] {
  const roots = document.querySelectorAll<HTMLElement>(ROOTS);
  const picked = new Set<Element>();

  for (const root of roots) {
    for (const el of root.querySelectorAll<HTMLElement>('*')) {
      if (el.matches('img, canvas') || el.closest('svg')) continue;
      const hasText = [...el.childNodes].some(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim()
      );
      const isBox = el.matches(
        '.chip, .btn, .card, .tile, .pad, [data-bp-piece]'
      );
      if (hasText || isBox) picked.add(el);
    }
  }

  // keep only the outermost pick so filters never stack
  return [...picked].filter((el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      if (picked.has(p)) return false;
    }
    return true;
  }) as HTMLElement[];
}

// images (and the hero canvas) start as empty blueprint frames
function collectFrames(): HTMLElement[] {
  const roots = document.querySelectorAll<HTMLElement>(ROOTS);
  return [...roots].flatMap((root) =>
    [...root.querySelectorAll<HTMLElement>('img, canvas')].filter(
      (el) => !isIcon(el)
    )
  );
}

// icons start as plain blue squares and glitch into shape (see morphIcon)
function collectIcons(): HTMLElement[] {
  const roots = document.querySelectorAll<HTMLElement>(ROOTS);
  return [...roots].flatMap((root) =>
    [...root.querySelectorAll<HTMLElement>('svg, img')].filter(
      (el) => isIcon(el) && !el.parentElement?.closest('svg')
    )
  );
}

// In-between shapes an icon can glitch through on its way from a square to
// the real icon. All use four points so clip-path can interpolate.
const SHAPES = [
  'polygon(50% 0, 50% 0, 100% 100%, 0 100%)', // triangle up
  'polygon(0 0, 100% 0, 50% 100%, 50% 100%)', // triangle down
  'polygon(0 0, 100% 50%, 100% 50%, 0 100%)', // triangle right
  'polygon(0 50%, 100% 0, 100% 100%, 0 100%)', // wedge
  'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)', // diamond
  'polygon(25% 0, 100% 0, 75% 100%, 0 100%)', // parallelogram
  'polygon(0 0, 100% 0, 75% 100%, 25% 100%)', // trapezoid
  'polygon(0 30%, 100% 30%, 100% 70%, 0 70%)', // bar
  'polygon(30% 0, 70% 0, 70% 100%, 30% 100%)', // column
  'polygon(0 0, 100% 100%, 0 100%, 100% 0)', // bow tie
  'polygon(50% 0, 100% 0, 50% 100%, 0 100%)', // slant
];
const SQUARE = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const jitter = () =>
  `translate(${rand(-3, 3).toFixed(1)}px, ${rand(-2, 2).toFixed(1)}px) rotate(${rand(-25, 25).toFixed(0)}deg)`;

// every icon takes its own random route: square -> 2-3 random shapes -> icon
function morphIcon(el: HTMLElement, audible: boolean) {
  if (audible) sfx.glitch();
  const pool = [...SHAPES].sort(() => Math.random() - 0.5);
  const route = pool.slice(0, 2 + Math.floor(Math.random() * 2));

  const frames: Keyframe[] = [{ clipPath: SQUARE, transform: 'none' }];
  route.forEach((shape, i) => {
    const offset = (i + 1) / (route.length + 1);
    frames.push({ clipPath: shape, transform: jitter(), offset });
  });
  frames.push({ clipPath: SQUARE, transform: 'none' });

  const glitch = el.animate(frames, {
    duration: rand(340, 560),
    easing: `steps(${4 + Math.floor(Math.random() * 5)}, end)`,
  });
  glitch.onfinish = () => {
    el.removeAttribute('data-bpi');
    el.animate(
      [
        { opacity: 0, transform: 'scale(0.7)' },
        { opacity: 1, transform: 'scale(1.15)', offset: 0.6 },
        { opacity: 1, transform: 'scale(1)' },
      ],
      { duration: 260, easing: 'ease-out' }
    );
  };
}

const BLUE_LINE = '#2e6fd8';
const LINE = '#242a35'; // --color-line in app.css

// everything that draws a border, so lines turn back from blue with the wave
function collectLines(): HTMLElement[] {
  const roots = document.querySelectorAll<HTMLElement>(ROOTS);
  const found: HTMLElement[] = [];
  for (const root of roots) {
    for (const el of [root, ...root.querySelectorAll<HTMLElement>('*')]) {
      const cs = getComputedStyle(el);
      if (
        parseFloat(cs.borderTopWidth) ||
        parseFloat(cs.borderRightWidth) ||
        parseFloat(cs.borderBottomWidth) ||
        parseFloat(cs.borderLeftWidth)
      ) {
        found.push(el);
      }
    }
  }
  return found;
}

// Everything whose look depends on the accent color (dots, bars, the sidebar's
// active line, pseudo-elements...). Found by swapping --color-primary for a
// sentinel and seeing whose computed colors change, so nothing is missed.
function collectAccents(): HTMLElement[] {
  const html = document.documentElement;
  const els = [...document.querySelectorAll<HTMLElement>(ROOTS)].flatMap(
    (root) => [root, ...root.querySelectorAll<HTMLElement>('*')]
  );
  const look = (el: Element) =>
    [null, '::before', '::after']
      .map((pseudo) => {
        const cs = getComputedStyle(el, pseudo);
        return [
          cs.color,
          cs.backgroundColor,
          cs.backgroundImage,
          cs.borderTopColor,
          cs.borderBottomColor,
          cs.borderLeftColor,
          cs.boxShadow,
        ].join('|');
      })
      .join('#');

  const before = els.map(look);
  html.style.setProperty('--color-primary', '#00ff01');
  const changed = els.filter((el, i) => look(el) !== before[i]);
  html.style.removeProperty('--color-primary');
  return changed;
}

// glitchy hand-off from blueprint to the real thing: a hue flash, a sideways
// tear and a sliced clip before it settles
function glitchIn(el: HTMLElement, from: string) {
  const dx = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 6);
  const slice = () => {
    const top = Math.floor(Math.random() * 60);
    return `inset(${top}% 0 ${Math.floor(Math.random() * (90 - top))}% 0)`;
  };
  el.animate(
    [
      { filter: from, transform: 'none', clipPath: 'inset(0)' },
      {
        filter: `${from} hue-rotate(${90 + Math.random() * 180}deg)`,
        transform: `translateX(${dx}px) skewX(${dx}deg)`,
        clipPath: slice(),
        offset: 0.2,
      },
      {
        filter: from,
        transform: `translateX(${-dx / 2}px)`,
        clipPath: slice(),
        offset: 0.4,
      },
      {
        filter: 'hue-rotate(-40deg) saturate(2)',
        transform: 'none',
        clipPath: 'inset(0)',
        offset: 0.6,
      },
      { filter: 'none', transform: 'none', clipPath: 'inset(0)' },
    ],
    {
      duration: 300 + Math.random() * 350,
      easing: `steps(${3 + Math.floor(Math.random() * 4)}, end)`,
    }
  );
}

// Where object-fit/object-position actually draw the picture inside its box,
// as a source rect (sx, sy, sw, sh) and a destination rect (dx, dy, dw, dh).
function drawnRect(img: HTMLImageElement, W: number, H: number) {
  const cs = getComputedStyle(img);
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const [px, py] = cs.objectPosition
    .split(' ')
    .map((v) => (v.endsWith('%') ? parseFloat(v) / 100 : 0.5));
  if (cs.objectFit === 'cover') {
    const s = Math.max(W / iw, H / ih);
    const sw = W / s;
    const sh = H / s;
    return [(iw - sw) * px, (ih - sh) * py, sw, sh, 0, 0, W, H];
  }
  if (cs.objectFit === 'contain') {
    const s = Math.min(W / iw, H / ih);
    const dw = iw * s;
    const dh = ih * s;
    return [0, 0, iw, ih, (W - dw) * px, (H - dh) * py, dw, dh];
  }
  return [0, 0, iw, ih, 0, 0, W, H];
}

// Game-style texture streaming: the picture appears as a few big blue-tinted
// blocks and sharpens through finer and finer resolutions to the real image.
// Drawn on a canvas laid over the <img>; returns false if it can't run.
function streamImage(img: HTMLImageElement): boolean {
  const W = img.offsetWidth;
  const H = img.offsetHeight;
  const parent = img.parentElement;
  if (!img.complete || !img.naturalWidth || !W || !H || !parent) return false;

  // lay the canvas exactly over the image inside its own container
  const wasStatic = getComputedStyle(parent).position === 'static';
  if (wasStatic) parent.style.position = 'relative';
  const ir = img.getBoundingClientRect();
  const pr = parent.getBoundingClientRect();

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const overlay = document.createElement('canvas');
  overlay.width = W * dpr;
  overlay.height = H * dpr;
  Object.assign(overlay.style, {
    position: 'absolute',
    left: `${ir.left - pr.left - parent.clientLeft}px`,
    top: `${ir.top - pr.top - parent.clientTop}px`,
    width: `${W}px`,
    height: `${H}px`,
    pointerEvents: 'none',
  });
  const g = overlay.getContext('2d');
  const small = document.createElement('canvas');
  const sg = small.getContext('2d');
  if (!g || !sg) return false;

  const [sx, sy, sw, sh, dx, dy, dw, dh] = drawnRect(img, W, H);
  // blocks across the picture at each step, then the real thing
  const levels = [4, 7, 12, 22, 40, 80];
  const blue = [0.85, 0.7, 0.5, 0.3, 0.15, 0];

  img.removeAttribute('data-bpf');
  img.style.opacity = '0';
  parent.appendChild(overlay);

  const draw = (step: number) => {
    const n = levels[step];
    const bw = Math.max(1, Math.round(n * (dw / Math.max(dw, dh))));
    const bh = Math.max(1, Math.round(n * (dh / Math.max(dw, dh))));
    small.width = bw;
    small.height = bh;
    sg.drawImage(img, sx, sy, sw, sh, 0, 0, bw, bh);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H);
    g.imageSmoothingEnabled = false;
    // a little sideways tear on the coarse steps
    const tear = step < 3 ? (Math.random() - 0.5) * 8 : 0;
    g.drawImage(small, 0, 0, bw, bh, dx + tear, dy, dw, dh);
    g.globalCompositeOperation = 'color';
    g.fillStyle = `rgba(60, 130, 255, ${blue[step]})`;
    g.fillRect(dx, dy, dw, dh);
    g.globalCompositeOperation = 'source-over';
  };

  let step = 0;
  draw(step);
  const next = () => {
    step++;
    if (step < levels.length) {
      draw(step);
      setTimeout(next, 60 + Math.random() * 70);
      return;
    }
    // hand over to the real image
    img.style.opacity = '';
    overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 180,
    }).onfinish = () => {
      overlay.remove();
      if (wasStatic) parent.style.position = '';
    };
  };
  setTimeout(next, 60 + Math.random() * 70);
  return true;
}

// Start prompt: a blueprint "title block" (the stamped box on engineering
// drawings) floating over the dimmed blueprint. The whole screen is the
// button. Resolves with where the visitor clicked (screen center for a key).
function waitForEntry(): Promise<[number, number]> {
  return new Promise((resolve) => {
    const verb = window.matchMedia('(pointer: coarse)').matches
      ? 'tap'
      : 'click';
    const gate = document.createElement('button');
    gate.type = 'button';
    gate.className = 'bp-gate';
    gate.setAttribute('aria-label', 'Enter the site');
    gate.innerHTML = `
      <span class="bp-gate-panel">
        <span class="bp-gate-row"><span>sheet 01</span><span>portfolio.dwg</span></span>
        <span class="bp-gate-main">${verb} to build<i>_</i></span>
        <span class="bp-gate-row bp-gate-cells">
          <span>rev a</span><span>scale 1:1</span><span>${sound.on ? 'sound on' : 'sound off'}</span>
        </span>
      </span>
      <span class="bp-gate-dim"><span>${verb} anywhere</span></span>`;
    document.documentElement.classList.add('bp-gated');
    document.body.append(gate);
    gate.focus({ preventScroll: true });

    gate.addEventListener(
      'click',
      (e) => {
        // a keyboard "click" has no position (detail 0)
        const at: [number, number] =
          e.detail === 0
            ? [window.innerWidth / 2, window.innerHeight / 2]
            : [e.clientX, e.clientY];
        gate.disabled = true;
        document.documentElement.classList.remove('bp-gated');
        sfx.glitch();
        // the panel tears and collapses while the dim lifts
        gate.querySelector('.bp-gate-panel')?.animate(
          [
            { transform: 'none', opacity: 1 },
            { transform: 'translateX(-8px) skewX(10deg)', opacity: 0.8 },
            { transform: 'translateX(5px) scaleY(0.5)', opacity: 0.9 },
            { transform: 'scale(1.04, 0.02)', opacity: 0 },
          ],
          { duration: 240, easing: 'steps(4, end)', fill: 'forwards' }
        );
        gate.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 320,
          easing: 'ease-out',
          fill: 'forwards',
        }).onfinish = () => gate.remove();
        resolve(at);
      },
      { once: true }
    );
  });
}

export async function runBlueprint() {
  const html = document.documentElement;
  if (!html.classList.contains('blueprint')) return;

  const pieces = collectPieces();
  const icons = collectIcons();
  const frames = collectFrames();
  const lines = collectLines();
  const accents = collectAccents();
  pieces.forEach((el) => el.setAttribute('data-bp', ''));
  icons.forEach((el) => el.setAttribute('data-bpi', ''));
  frames.forEach((el) => el.setAttribute('data-bpf', ''));
  lines.forEach((el) => el.setAttribute('data-bpl', ''));
  accents.forEach((el) => el.setAttribute('data-bpc', ''));
  html.classList.add('bp-live', 'bp-fade');

  // the wave starts where the visitor clicked; its speed is random
  const [ox, oy] = await waitForEntry();
  const w = window.innerWidth;
  const h = window.innerHeight;
  const wave = 1200 + Math.random() * 600;
  const reach = Math.max(
    Math.hypot(ox, oy),
    Math.hypot(w - ox, oy),
    Math.hypot(ox, h - oy),
    Math.hypot(w - ox, h - oy)
  );
  html.style.setProperty('--bp-x', `${ox}px`);
  html.style.setProperty('--bp-y', `${oy}px`);

  // the grid and paper recede with the wave: smooth motion, with small random
  // surges and hesitations so it never moves the same way twice
  // (mask radius --bp-r, see app.css)
  const points = 18 + Math.floor(Math.random() * 8);
  const radius: Keyframe[] = [{ '--bp-r': '0px', offset: 0 }];
  let last = 0;
  for (let i = 1; i < points; i++) {
    const wobble = (Math.random() - 0.5) * (0.5 / points);
    const progress = Math.max(last - 0.01, i / points + wobble);
    last = progress;
    radius.push({
      '--bp-r': `${Math.max(0, progress * (reach + 200))}px`,
      offset: i / points,
    });
  }
  radius.push({ '--bp-r': `${reach + 260}px`, offset: 1 });
  const sweep = html.animate(radius, {
    duration: wave,
    delay: HOLD,
    easing: 'linear',
    fill: 'forwards',
  });

  // the entry click unlocked audio; tryAutoplay just waits for it to be live
  let audible = false;
  let stopHum = () => {};
  let lastBlip = 0;
  const blip = (at: number) => {
    const now = performance.now();
    if (!audible || now - lastBlip < 45) return; // keep it a patter, not noise
    lastBlip = now;
    sfx.blip(at);
  };
  void tryAutoplay().then((ok) => {
    audible = ok;
    if (ok) stopHum = introHum((HOLD + wave) / 1000);
  });

  // What happens to each kind of element when the wave reaches it.
  const swept: HTMLElement[] = [];
  const restorePiece = (el: HTMLElement, at: number) => {
    const from = getComputedStyle(el).filter;
    // hidden ones are still waiting for their scroll reveal and would flash
    const visible = getComputedStyle(el).opacity === '1';
    // while the wave is still spreading, let it uncover the piece bit by bit
    // (app.css [data-bp-sweep]); after it's done, just show it
    if (at < 1) {
      const b = el.getBoundingClientRect();
      el.style.setProperty('--bp-tx', `${ox - b.left}px`);
      el.style.setProperty('--bp-ty', `${oy - b.top}px`);
      el.setAttribute('data-bp-sweep', '');
      swept.push(el);
    }
    el.removeAttribute('data-bp');
    blip(at);
    // Web Animations so we don't fight the reveal transitions in app.css
    if (visible && Math.random() < 0.7) glitchIn(el, from);
    else
      el.animate([{ filter: from }, { filter: 'none' }], {
        duration: 450,
        easing: 'ease-out',
      });
  };
  const restoreFrame = (el: HTMLElement) => {
    if (el instanceof HTMLImageElement && streamImage(el)) return;
    // fallback (canvas, or an image that hasn't loaded): flicker in
    el.removeAttribute('data-bpf');
    el.animate(
      [
        { opacity: 0 },
        { opacity: 0.7, offset: 0.15 },
        { opacity: 0.15, offset: 0.3 },
        { opacity: 1 },
      ],
      { duration: 600, easing: 'steps(5, end)' }
    );
  };
  const restoreLine = (el: HTMLElement) => {
    el.removeAttribute('data-bpl');
    el.animate([{ '--color-line': BLUE_LINE }, { '--color-line': LINE }], {
      duration: 500,
      easing: 'steps(4, end)',
    });
  };

  type Pending = {
    el: HTMLElement;
    restore: (at: number) => void;
    /** a bottom-only border is reached along its bottom edge */
    bottomEdge: boolean;
    /** extra ms after the wave arrives, so pieces "stream" in unevenly */
    lag: number;
    reachedAt?: number;
  };
  const lag = () =>
    Math.random() < LATE ? 250 + Math.random() * 400 : Math.random() * JITTER;
  const isBottomLine = (el: HTMLElement) => {
    const cs = getComputedStyle(el);
    return cs.borderTopWidth === '0px' && cs.borderBottomWidth !== '0px';
  };
  let pending: Pending[] = [
    ...pieces.map((el) => ({
      el,
      restore: (at: number) => restorePiece(el, at),
    })),
    ...accents.map((el) => ({
      el,
      restore: () => el.removeAttribute('data-bpc'),
    })),
    ...frames.map((el) => ({ el, restore: () => restoreFrame(el) })),
    ...icons.map((el) => ({ el, restore: () => morphIcon(el, audible) })),
    ...lines.map((el) => ({ el, restore: () => restoreLine(el) })),
  ].map((p) => ({
    ...p,
    bottomEdge: lines.includes(p.el) && isBottomLine(p.el),
    lag: lag(),
  }));

  // Every frame: read how far the wave has actually spread (the animated mask
  // radius) and restore whatever it covers at its current spot on screen, so
  // pieces stay in sync with the wave even if the page scrolls meanwhile.
  const tick = (now: number) => {
    const r =
      parseFloat(getComputedStyle(html).getPropertyValue('--bp-r')) || 0;
    const front = r + 110; // middle of the mask's soft edge
    pending = pending.filter((p) => {
      if (p.reachedAt === undefined) {
        const b = p.el.getBoundingClientRect();
        const top = p.bottomEdge ? b.bottom : b.top;
        const dx = Math.max(b.left - ox, 0, ox - b.right);
        const dy = Math.max(top - oy, 0, oy - b.bottom);
        if (Math.hypot(dx, dy) > front) return true;
        p.reachedAt = now;
      }
      if (now - p.reachedAt < p.lag) return true;
      p.restore(Math.min(r / reach, 1));
      return false;
    });
    if (pending.length) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  void sweep.finished.then(() => {
    // the wave has covered the whole screen; give late pieces their moment,
    // then restore anything left (off screen) and wrap up
    setTimeout(() => {
      pending.forEach((p) => p.restore(1));
      pending = [];
      html.classList.remove('blueprint', 'bp-live');
      stopHum();
      if (audible) sfx.built();
    }, 650);
    setTimeout(() => {
      html.classList.remove('bp-fade');
      icons.forEach((el) => el.removeAttribute('data-bpi'));
      frames.forEach((el) => el.removeAttribute('data-bpf'));
      accents.forEach((el) => el.removeAttribute('data-bpc'));
      swept.forEach((el) => {
        el.removeAttribute('data-bp-sweep');
        el.style.removeProperty('--bp-tx');
        el.style.removeProperty('--bp-ty');
      });
      html.getAnimations().forEach((a) => a.cancel());
      html.style.removeProperty('--bp-x');
      html.style.removeProperty('--bp-y');
    }, 1650);
  });
}
