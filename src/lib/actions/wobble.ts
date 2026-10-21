import { sfx } from '$lib/sound.svelte';

// Jelly wobble + "boing" on hover, chime on click.
export function wobble(node: HTMLElement, enabled = true) {
  let on = enabled;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onEnter = () => {
    if (!on) return;
    sfx.boing();
    if (reduce) return;
    node.classList.remove('is-wobbling');
    void node.offsetWidth; // restart the animation
    node.classList.add('is-wobbling');
  };
  const onEnd = () => node.classList.remove('is-wobbling');
  const onClick = () => {
    if (on) sfx.click();
  };

  node.addEventListener('mouseenter', onEnter);
  node.addEventListener('animationend', onEnd);
  node.addEventListener('click', onClick);

  return {
    update(next = true) {
      on = next;
    },
    destroy() {
      node.removeEventListener('mouseenter', onEnter);
      node.removeEventListener('animationend', onEnd);
      node.removeEventListener('click', onClick);
    },
  };
}
