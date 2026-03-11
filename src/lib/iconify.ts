import { addCollection } from '@iconify/svelte';
import { icons as carbonIcons } from '@iconify-json/carbon';
import { icons as pixelartIcons } from '@iconify-json/pixelarticons';

let initialized = false;

export function initializeIconify() {
  if (initialized) {
    return;
  }

  addCollection({
    prefix: 'carbon',
    icons: {
      close: carbonIcons.icons.close,
      email: carbonIcons.icons.email,
      'logo-github': carbonIcons.icons['logo-github'],
      'logo-linkedin': carbonIcons.icons['logo-linkedin'],
      'text-align-justify': carbonIcons.icons['text-align-justify'],
    },
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
