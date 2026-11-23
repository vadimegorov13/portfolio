// Odometer-style text swap (motion pick 3A): the old text rolls up and out,
// the new text rolls in from below. Instant with reduced motion.
export function roll(node: HTMLElement, text: string) {
  const block = getComputedStyle(node).display === 'block';
  node.style.display = block ? 'grid' : 'inline-grid';
  node.style.overflow = 'hidden';
  node.style.verticalAlign = 'bottom';

  const make = (t: string) => {
    const s = document.createElement('span');
    s.textContent = t;
    s.style.gridArea = '1 / 1';
    return s;
  };
  let cur = make(text);
  node.replaceChildren(cur);

  return {
    update(t: string) {
      if (t === text) return;
      text = t;
      const next = make(t);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        node.replaceChildren(next);
        cur = next;
        return;
      }
      const old = cur;
      cur = next;
      node.appendChild(next);
      const timing = {
        duration: 320,
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
      };
      old
        .animate([{ transform: 'none' }, { transform: 'translateY(-110%)' }], {
          ...timing,
          fill: 'forwards',
        })
        .finished.then(() => old.remove())
        .catch(() => {});
      next.animate(
        [{ transform: 'translateY(110%)' }, { transform: 'none' }],
        timing
      );
    },
  };
}
