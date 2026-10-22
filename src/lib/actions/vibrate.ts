import { sfx, startBuzz } from '$lib/sound.svelte';

type VibrateOptions = {
  enabled?: boolean;
  /** shake this ancestor (closest match) instead of the element itself */
  target?: string;
};

// dialed.gg-style hover: the element jitters in place (see .is-vibrating in
// app.css) and hums for as long as the pointer stays on it.
export function vibrate(
  node: HTMLElement,
  options: boolean | VibrateOptions = true
) {
  const read = (o: boolean | VibrateOptions) =>
    typeof o === 'boolean' ? { enabled: o } : { enabled: true, ...o };
  let { enabled: on, target } = read(options);
  const shaken = () => (target && node.closest<HTMLElement>(target)) || node;
  let stopBuzz: (() => void) | null = null;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const start = () => {
    if (!on) return;
    stopBuzz = startBuzz();
    if (!reduce) shaken().classList.add('is-vibrating');
  };
  const stop = () => {
    stopBuzz?.();
    stopBuzz = null;
    shaken().classList.remove('is-vibrating');
  };
  const click = () => {
    if (!on) return;
    stop();
    sfx.click();
  };

  node.addEventListener('mouseenter', start);
  node.addEventListener('mouseleave', stop);
  node.addEventListener('click', click);

  return {
    update(next: boolean | VibrateOptions = true) {
      stop();
      ({ enabled: on, target } = read(next));
    },
    destroy() {
      stop();
      node.removeEventListener('mouseenter', start);
      node.removeEventListener('mouseleave', stop);
      node.removeEventListener('click', click);
    },
  };
}
