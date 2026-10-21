// ASCII only: in a monospace font every glyph is as wide as the letters it
// replaces, so the scrambled text never changes the layout
const GLYPHS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#*+-_<>/';

// Scrambles text into place, left to right. Re-runs whenever `text` changes.
export function decode(
  node: HTMLElement,
  params: { text: string; duration?: number; delay?: number }
) {
  let frame = 0;
  let timer = 0;

  const run = ({ text, duration = 900, delay = 0 }: typeof params) => {
    cancelAnimationFrame(frame);
    clearTimeout(timer);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = text;
      return;
    }

    timer = window.setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        let out = '';
        for (let i = 0; i < text.length; i++) {
          const revealed = i / text.length < p * 1.15 - 0.1;
          out +=
            text[i] === ' ' || revealed
              ? text[i]
              : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        node.textContent = out;
        if (p < 1) frame = requestAnimationFrame(step);
        else node.textContent = text;
      };
      frame = requestAnimationFrame(step);
    }, delay);
  };

  run(params);

  return {
    update: run,
    destroy() {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    },
  };
}
