// "Blueprint" intro, like a game streaming in textures: the page first renders
// in blueprint blue with a grid (html.blueprint, set in app.html before first
// paint), then a wave spreads from the top-left corner and each piece gets its
// real colors back as the wave reaches it. Styles live at the end of app.css.

import { introHum, sfx, tryAutoplay } from '$lib/sound.svelte';

const HOLD = 350; // ms of pure blueprint before the scan starts
const WAVE = 1400; // ms for the wave to travel from the top-left corner to the
// bottom-right one
const JITTER = 220; // random extra delay per piece, so it "streams" in

// where to look for pieces; mark anything else (like the floating sound
// button) with data-bp-root
const ROOTS = 'main, aside, header, [data-bp-root]';

const isIcon = (el: Element) =>
  el.matches('svg') ||
  (el.matches('img') && el.getBoundingClientRect().width <= 64);

// the smallest things worth tinting: text, chips, tiles, cards (images and
// icons are handled separately below)
function collectPieces(): HTMLElement[] {
  const roots = document.querySelectorAll<HTMLElement>(ROOTS);
  const picked = new Set<Element>();

  for (const root of roots) {
    for (const el of root.querySelectorAll<HTMLElement>('*')) {
      if (el.matches('img, canvas') || el.closest('svg')) continue;
      const hasText = [...el.childNodes].some(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim()
      );
      const isBox = el.matches('.chip, .btn, .card, .tile, .pad');
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

// square -> triangle -> diamond -> square, with a jittery offset, then the
// real icon appears. All shapes use four points so clip-path can interpolate.
function morphIcon(el: HTMLElement, audible: boolean) {
  if (audible) sfx.glitch();
  const shapes = [
    'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    'polygon(50% 0, 50% 0, 100% 100%, 0 100%)',
    'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
    'polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)',
  ];
  const glitch = el.animate(
    [
      { clipPath: shapes[0], transform: 'translate(0, 0)' },
      { clipPath: shapes[1], transform: 'translate(2px, -1px)', offset: 0.3 },
      { clipPath: shapes[1], transform: 'translate(-2px, 1px)', offset: 0.42 },
      { clipPath: shapes[2], transform: 'translate(1px, 1px)', offset: 0.7 },
      { clipPath: shapes[3], transform: 'translate(0, 0)' },
    ],
    { duration: 420, easing: 'steps(6, end)' }
  );
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

export function runBlueprint() {
  const html = document.documentElement;
  if (!html.classList.contains('blueprint')) return;

  const pieces = collectPieces();
  const icons = collectIcons();
  const frames = collectFrames();
  const lines = collectLines();
  pieces.forEach((el) => el.setAttribute('data-bp', ''));
  icons.forEach((el) => el.setAttribute('data-bpi', ''));
  frames.forEach((el) => el.setAttribute('data-bpf', ''));
  lines.forEach((el) => el.setAttribute('data-bpl', ''));
  html.classList.add('bp-live', 'bp-fade');

  // the wave starts in the top-left corner and spreads diagonally across the
  // visible screen; anything below the fold finishes with the last pieces
  const reach = Math.hypot(window.innerWidth, window.innerHeight);

  // the grid recedes with the wave (mask radius --bp-r, see app.css)
  html.animate([{ '--bp-r': '0px' }, { '--bp-r': `${reach + 200}px` }], {
    duration: WAVE,
    delay: HOLD,
    easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
    fill: 'forwards',
  });

  for (const el of pieces) {
    const r = el.getBoundingClientRect();
    const at = Math.min(Math.hypot(r.left, r.top) / reach, 1);
    const delay = HOLD + at * WAVE + Math.random() * JITTER;

    setTimeout(() => {
      const from = getComputedStyle(el).filter;
      // only flicker things that are already visible; hidden ones are still
      // waiting for their scroll reveal and would flash
      const flicker = getComputedStyle(el).opacity === '1';
      el.removeAttribute('data-bp');
      blip(at);
      // Web Animations so we don't fight the reveal transitions in app.css
      el.animate(
        flicker
          ? [
              { filter: from, opacity: 1 },
              { filter: from, opacity: 0.35, offset: 0.12 },
              { filter: from, opacity: 1, offset: 0.24 },
              { filter: 'none', opacity: 1 },
            ]
          : [{ filter: from }, { filter: 'none' }],
        { duration: 600, easing: 'ease-out' }
      );
    }, delay);
  }

  // sound only plays if the browser allows audio before a click (see
  // tryAutoplay); otherwise the intro runs silently
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
    if (ok) stopHum = introHum((HOLD + WAVE) / 1000);
  });

  for (const el of frames) {
    const r = el.getBoundingClientRect();
    const at = Math.min(Math.hypot(r.left, r.top) / reach, 1);
    setTimeout(
      () => {
        // the picture flickers into its empty frame
        el.removeAttribute('data-bpf');
        el.animate(
          [
            { opacity: 0 },
            { opacity: 0.7, offset: 0.15 },
            { opacity: 0.15, offset: 0.3 },
            { opacity: 1 },
          ],
          { duration: 600, easing: 'ease-out' }
        );
      },
      HOLD + at * WAVE + Math.random() * JITTER
    );
  }

  for (const el of icons) {
    const r = el.getBoundingClientRect();
    const at = Math.min(Math.hypot(r.left, r.top) / reach, 1);
    setTimeout(
      () => morphIcon(el, audible),
      HOLD + at * WAVE + Math.random() * JITTER
    );
  }

  for (const el of lines) {
    const r = el.getBoundingClientRect();
    // a bottom-only border (section dividers) is reached at its left end
    const onlyBottom =
      getComputedStyle(el).borderTopWidth === '0px' &&
      getComputedStyle(el).borderBottomWidth !== '0px';
    const at = Math.min(
      Math.hypot(r.left, onlyBottom ? r.bottom : r.top) / reach,
      1
    );
    setTimeout(
      () => {
        el.removeAttribute('data-bpl');
        el.animate([{ '--color-line': BLUE_LINE }, { '--color-line': LINE }], {
          duration: 500,
          easing: 'ease-out',
        });
      },
      HOLD + at * WAVE + Math.random() * JITTER
    );
  }

  const end = HOLD + WAVE + JITTER;
  setTimeout(() => {
    html.classList.remove('blueprint', 'bp-live');
    stopHum();
    if (audible) sfx.built();
  }, end);
  setTimeout(() => {
    html.classList.remove('bp-fade');
    icons.forEach((el) => el.removeAttribute('data-bpi'));
    frames.forEach((el) => el.removeAttribute('data-bpf'));
    html.getAnimations().forEach((a) => a.cancel());
  }, end + 1000);
}
