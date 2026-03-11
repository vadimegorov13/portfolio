type RevealType = 'up' | 'left' | 'right' | 'scale' | 'stagger';

type RevealOptions = {
  type?: RevealType;
  threshold?: number;
  once?: boolean;
  delay?: number;
  rootMargin?: string;
};

const defaults: Required<RevealOptions> = {
  type: 'up',
  threshold: 0.2,
  once: true,
  delay: 0,
  rootMargin: '0px 0px -5% 0px',
};

function applyOptions(node: HTMLElement, options: Required<RevealOptions>) {
  node.classList.add('reveal-base', `reveal-${options.type}`);
  node.style.setProperty('--reveal-delay', `${options.delay}ms`);
}

function clearOptions(node: HTMLElement, type: RevealType) {
  node.classList.remove('reveal-base', `reveal-${type}`);
  node.style.removeProperty('--reveal-delay');
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
  let current = { ...defaults, ...options };
  let observer: IntersectionObserver | undefined;

  applyOptions(node, current);

  const onIntersect: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;

    if (!entry) {
      return;
    }

    if (entry.isIntersecting) {
      node.classList.add('is-visible');

      if (current.once) {
        observer?.unobserve(node);
      }

      return;
    }

    if (!current.once) {
      node.classList.remove('is-visible');
    }
  };

  const observe = () => {
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    observer?.disconnect();
    observer = new IntersectionObserver(onIntersect, {
      threshold: current.threshold,
      rootMargin: current.rootMargin,
    });
    observer.observe(node);
  };

  observe();

  return {
    update(next: RevealOptions = {}) {
      const previousType = current.type;
      current = { ...defaults, ...next };

      if (previousType !== current.type) {
        clearOptions(node, previousType);
      }

      applyOptions(node, current);
      observe();
    },
    destroy() {
      observer?.disconnect();
    },
  };
}

export type { RevealOptions, RevealType };
