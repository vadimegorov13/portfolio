import { addCollection } from '@iconify/svelte';
import { icons as carbonIcons } from '@iconify-json/carbon';
import { icons as pixelartIcons } from '@iconify-json/pixelarticons';

let initialized = false;

const carbon = [
  'arrow-right',
  'arrow-up-right',
  'checkmark',
  'close',
  'copy',
  'email',
  'logo-github',
  'logo-linkedin',
  'menu',
  'text-align-justify',
  'volume-mute',
  'volume-up',
];

export function initializeIconify() {
  if (initialized) {
    return;
  }

  addCollection({
    prefix: 'carbon',
    icons: Object.fromEntries(
      carbon.map((name) => [name, carbonIcons.icons[name]])
    ),
    width: carbonIcons.width,
    height: carbonIcons.height,
  });

  addCollection({
    prefix: 'pixelarticons',
    icons: {
      'arrow-right': pixelartIcons.icons['arrow-right'],
      'download-sharp': pixelartIcons.icons['download-sharp'],
      'external-link-sharp': pixelartIcons.icons['external-link-sharp'],
    },
    width: pixelartIcons.width,
    height: pixelartIcons.height,
  });

  initialized = true;
}
