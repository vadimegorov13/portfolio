import { sfx } from '$lib/sound.svelte';

// Rattles an element side to side (see .is-shaking in app.css) with a buzz.
export function shake(node: HTMLElement | undefined) {
  if (!node) return;
  sfx.buzz(0.5);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  node.classList.remove('is-shaking');
  void node.offsetWidth; // restart the animation
  node.classList.add('is-shaking');
  node.addEventListener(
    'animationend',
    () => node.classList.remove('is-shaking'),
    { once: true }
  );
}
