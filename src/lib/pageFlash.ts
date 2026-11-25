// Page change animation (motion pick 2C): the new page arrives in blueprint
// blue, a scan line runs down the screen, and the colors come back in a few
// glitchy steps. A small echo of the blueprint intro (src/lib/blueprint.ts).

const BLUE =
  'grayscale(1) brightness(0.72) sepia(1) hue-rotate(178deg) saturate(4.5) brightness(1.35)';

export function pageFlash(main: HTMLElement) {
  const html = document.documentElement;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // the intro is still running (first load): let it do its thing
  if (html.classList.contains('blueprint')) return;

  main.animate(
    [
      { filter: BLUE, offset: 0 },
      { filter: BLUE, offset: 0.4 },
      { filter: 'none', offset: 1 },
    ],
    { duration: 520, easing: 'steps(6, end)' }
  );

  const rect = main.getBoundingClientRect();
  const scan = document.createElement('div');
  Object.assign(scan.style, {
    position: 'fixed',
    left: `${Math.max(0, rect.left)}px`,
    right: '0',
    top: '0',
    height: '2px',
    background: '#4f8dff',
    boxShadow: '0 0 14px #4f8dff',
    pointerEvents: 'none',
    zIndex: '60',
  });
  document.body.appendChild(scan);
  scan
    .animate(
      [
        { transform: 'translateY(0)', opacity: 1 },
        { transform: `translateY(${window.innerHeight}px)`, opacity: 0.6 },
      ],
      { duration: 440, easing: 'ease-in-out' }
    )
    .finished.finally(() => scan.remove());
}
