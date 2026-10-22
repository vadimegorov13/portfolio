// sam-js ships without types; only what src/lib/sound.svelte.ts uses
declare module 'sam-js' {
  export default class SamJs {
    constructor(options?: {
      speed?: number;
      pitch?: number;
      throat?: number;
      mouth?: number;
    });
    /** mono samples at 22050 Hz, or false if the text can't be spoken */
    buf32(text: string): Float32Array | false;
  }
}
