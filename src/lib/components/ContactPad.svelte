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

<div
  bind:this={card}
  class="attention flex flex-col gap-6 border border-line bg-surface p-6 sm:p-8"
>
  <p class="min-h-6 font-mono text-sm text-ink-1" aria-live="polite">
    <span class="text-primary">&gt;</span>
    <span use:decode={{ text: caption, duration: 400 }}>{caption}</span>
  </p>

  <ul class="flex flex-col gap-6">
    {#each pads as pad (pad.id)}
      {@const isEmail = pad.id === 'Email'}
      {@const contact = info(pad.id)}
      <li
        class="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5 sm:gap-7"
      >
        <svelte:element
          this={pad.href ? 'a' : 'button'}
          href={pad.href}
          target={pad.href ? '_blank' : undefined}
          rel={pad.href ? 'noopener noreferrer' : undefined}
          type={pad.href ? undefined : 'button'}
          role={pad.href ? 'link' : 'button'}
          aria-label={isEmail ? `Copy email ${EMAIL}` : pad.label}
          class={`pad pad-${pad.motion} cursor-pointer`}
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
            class="wheel-fill grid size-18 place-items-center rounded-full bg-ink-1 text-background sm:size-22"
          >
            <span class="pad-icon grid place-items-center">
              <Icon
                icon={isEmail && copied ? 'carbon:checkmark' : pad.icon}
                width="34"
              />
            </span>
          </span>
        </svelte:element>
        <div class="flex min-w-0 flex-col gap-0.5">
          <p class="font-mono text-sm text-ink-3">
            {isEmail && copied ? 'copied!' : pad.label}
          </p>
          {#if isEmail}
            <button
              type="button"
              class="w-fit cursor-pointer text-left font-mono text-sm break-all text-primary hover:underline"
              onclick={copyEmail}>{EMAIL}</button
            >
          {:else}
            <a
              href={pad.href}
              target="_blank"
              rel="noopener noreferrer"
              class="w-fit font-mono text-sm break-all text-primary hover:underline"
              >{contact?.value}</a
            >
          {/if}
          <p class="text-base text-ink-3">{contact?.description}</p>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
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
