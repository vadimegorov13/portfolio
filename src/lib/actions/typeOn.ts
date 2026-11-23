// Types text out with a pink caret (motion pick 4C). Re-types whenever the
// text changes; instant with reduced motion.
export function typeOn(node: HTMLElement, text: string) {
  let timer = 0;
  let caretTimer = 0;

  const run = (t: string) => {
    clearInterval(timer);
    clearTimeout(caretTimer);
    node.setAttribute('aria-label', t);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = t;
      return;
    }
    const span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    const caret = document.createElement('i');
    caret.className = 'type-caret';
    node.replaceChildren(span, caret);
    // whole title in about half a second, whatever its length
    const step = Math.max(12, Math.min(32, 520 / Math.max(1, t.length)));
    let i = 0;
    timer = window.setInterval(() => {
      span.textContent = t.slice(0, ++i);
      if (i >= t.length) {
        clearInterval(timer);
        caretTimer = window.setTimeout(() => caret.remove(), 700);
      }
    }, step);
  };

  run(text);
  return {
    update(t: string) {
      if (t !== text) {
        text = t;
        run(t);
      }
    },
    destroy() {
      clearInterval(timer);
      clearTimeout(caretTimer);
    },
  };
}
