<script lang="ts">
  import Icon from '@iconify/svelte';
  import { decode } from '$lib/actions/decode';
  import { shake } from '$lib/actions/shake';
  import { copyText, EMAIL } from '$lib/clipboard';
  import { sfx } from '$lib/sound.svelte';
  import { contacts } from '$lib/data/contacts';

  // One row per contact: a big round button in the spirit of dialed.gg (own
  // hover sound and motion, caption above changes to match) next to the
  // address and description from data/contacts.ts.
  type Pad = {
    id: string;
    label: string;
    icon: string;
    caption: string;
    href?: string;
    hoverSound: () => void;
    motion: string;
  };

  const pads: Pad[] = [
    {
      id: 'Email',
      label: 'Email',
      icon: 'carbon:email',
      caption: 'Click to copy my email.',
      hoverSound: sfx.boing,
      motion: 'wiggle',
    },
    {
      id: 'GitHub',
      label: 'GitHub',
      icon: 'carbon:logo-github',
      caption: 'Read my code.',
      href: 'https://github.com/vadimegorov13',
      hoverSound: sfx.type,
      motion: 'spin',
    },
    {
      id: 'LinkedIn',
      label: 'LinkedIn',
      icon: 'carbon:logo-linkedin',
      caption: 'Keep it professional.',
      href: 'https://www.linkedin.com/in/vadimegorov13/',
      hoverSound: sfx.rise,
      motion: 'hop',
    },
  ];

  const info = (id: string) => contacts.find((c) => c.name === id);

  const IDLE = 'Pick a channel.';

  let card: HTMLElement | undefined = $state();
  let caption = $state(IDLE);
  let copied = $state(false);

  async function copyEmail() {
    copied = await copyText(EMAIL);
    if (copied) {
      sfx.success();
      caption = `Copied ${EMAIL}. Talk soon.`;
    } else {
      caption = EMAIL;
    }
    shake(card);
    setTimeout(() => {
      copied = false;
      caption = IDLE;
    }, 2600);
  }
</script>

<div bind:this={card} class="attention flex flex-col gap-5">
  <p class="min-h-6 font-mono text-sm text-ink-1" aria-live="polite">
    <span class="text-primary">&gt;</span>
    <span use:decode={{ text: caption, duration: 400 }}>{caption}</span>
  </p>

  <ul class="grid grid-cols-1 gap-4 md:grid-cols-3">
    {#each pads as pad (pad.id)}
      {@const isEmail = pad.id === 'Email'}
      {@const contact = info(pad.id)}
      <li class="flex">
        <!-- the whole row is the button (copy email) or the link -->
        <svelte:element
          this={pad.href ? 'a' : 'button'}
          href={pad.href}
          target={pad.href ? '_blank' : undefined}
          rel={pad.href ? 'noopener noreferrer' : undefined}
          type={pad.href ? undefined : 'button'}
          role={pad.href ? 'link' : 'button'}
          aria-label={isEmail ? `Copy email ${EMAIL}` : pad.label}
          class={`pad pad-${pad.motion} row flex w-full cursor-pointer flex-col items-start gap-5 p-6 text-left`}
          onmouseenter={() => {
            pad.hoverSound();
            if (!copied) caption = pad.caption;
          }}
          onmouseleave={() => {
            if (!copied) caption = IDLE;
          }}
          onclick={isEmail ? copyEmail : sfx.pop}
        >
          <span
            class="wheel-fill grid size-16 place-items-center bg-ink-1 text-background"
          >
            <span class="pad-icon grid place-items-center">
              <Icon
                icon={isEmail && copied ? 'carbon:checkmark' : pad.icon}
                width="34"
              />
            </span>
          </span>
          <span class="flex min-w-0 flex-col gap-0.5">
            <span
              class="font-display text-[1.35rem] font-bold tracking-[-0.01em] text-ink-1"
            >
              {isEmail && copied ? 'Copied!' : pad.label}
            </span>
            <span class="value w-fit font-mono text-sm break-all text-primary"
              >{isEmail ? EMAIL : contact?.value}</span
            >
            <span class="mt-1 text-[0.95rem] leading-relaxed text-ink-3"
              >{contact?.description}</span
            >
            <span class="hint font-mono text-xs text-ink-3"
              >{isEmail ? 'click to copy' : 'click to open ↗'}</span
            >
          </span>
        </svelte:element>
      </li>
    {/each}
  </ul>
</div>

<style>
  /* each channel is a card; the whole card is the button */
  .row {
    height: 100%;
    border: 1px solid var(--color-line);
    border-top: 3px solid var(--color-line);
    background: var(--color-surface);
    transition:
      border-color 200ms ease,
      background-color 200ms ease;
  }

  .row:hover,
  .row:focus-visible {
    border-top-color: var(--color-primary);
    background: var(--color-surface-2);
    outline: none;
  }

  /* plain pink fill on hover instead of the color wheel */
  .row .wheel-fill::before {
    background: var(--color-primary);
    animation: none;
  }

  .row:hover .value {
    text-decoration: underline;
  }

  .hint {
    opacity: 0;
    transition: opacity 200ms ease;
  }

  .row:hover .hint,
  .row:focus-visible .hint {
    opacity: 1;
  }

  .pad .wheel-fill {
    transition:
      transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1),
      color 200ms ease;
  }

  .pad:hover .wheel-fill {
    transform: scale(1.06);
    color: white;
  }

  .pad:active .wheel-fill {
    transform: scale(0.94);
  }

  .pad-spin:hover .pad-icon {
    animation: pad-spin 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .pad-hop:hover .pad-icon {
    animation: pad-hop 550ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .pad-wiggle:hover .pad-icon {
    animation: pad-wiggle 500ms ease-in-out;
  }

  @keyframes pad-spin {
    from {
      transform: rotate(-180deg) scale(0.6);
    }
    to {
      transform: rotate(0) scale(1);
    }
  }

  @keyframes pad-hop {
    30% {
      transform: translateY(-10px) scale(1.05, 0.95);
    }
    55% {
      transform: translateY(0) scale(0.95, 1.05);
    }
    75% {
      transform: translateY(-3px);
    }
  }

  @keyframes pad-wiggle {
    20% {
      transform: rotate(-14deg);
    }
    40% {
      transform: rotate(12deg);
    }
    60% {
      transform: rotate(-8deg);
    }
    80% {
      transform: rotate(4deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pad .pad-icon {
      animation: none !important;
    }
  }
</style>
