// Tiny synthesized UI sounds (Web Audio, no audio files). Browsers only allow
// audio after the first user gesture, so nothing plays before a click/tap.

const STORAGE_KEY = 've-sound';

let ac: AudioContext | null = null;

export const sound = $state({ on: true });

export function initSound() {
  try {
    sound.on = localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    // storage blocked; keep default
  }
  window.addEventListener('pointerdown', unlock, { once: true });
}

export function toggleSound() {
  unlock();
  // play the "off" sound before muting, the "on" sound after unmuting
  if (sound.on) sfx.toggle(false);
  sound.on = !sound.on;
  try {
    localStorage.setItem(STORAGE_KEY, sound.on ? 'on' : 'off');
  } catch {
    // ignore
  }
  if (sound.on) sfx.toggle(true);
}

// Try to get audio going without a click. Browsers only allow this for sites
// the visitor already engages with a lot (Chrome) and otherwise keep it
// suspended until the first gesture, so this resolves false most of the time.
export async function tryAutoplay(): Promise<boolean> {
  unlock();
  if (!ac || !sound.on) return false;
  if (ac.state === 'running') return true;
  // resume() stays pending without a gesture; give it a moment, then give up
  await Promise.race([ac.resume(), new Promise((r) => setTimeout(r, 120))]);
  // re-read: the await may have changed the state TS narrowed above
  return (ac.state as AudioContextState) === 'running';
}

/** slow rising hum under the blueprint intro; returns a stop function */
export function introHum(seconds: number): () => void {
  if (!sound.on || !ac || ac.state !== 'running') return () => {};
  const ctx = ac;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const g = ctx.createGain();
  o.type = 'sawtooth';
  o2.type = 'sine';
  o.frequency.setValueAtTime(70, t);
  o.frequency.exponentialRampToValueAtTime(220, t + seconds);
  o2.frequency.setValueAtTime(140, t);
  o2.frequency.exponentialRampToValueAtTime(440, t + seconds);
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(200, t);
  filter.frequency.exponentialRampToValueAtTime(1400, t + seconds);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.035, t + 0.3);
  o.connect(filter);
  o2.connect(filter);
  filter.connect(g).connect(ctx.destination);
  o.start(t);
  o2.start(t);
  return () => {
    const now = ctx.currentTime;
    g.gain.cancelScheduledValues(now);
    g.gain.setValueAtTime(g.gain.value, now);
    g.gain.linearRampToValueAtTime(0, now + 0.4);
    o.stop(now + 0.45);
    o2.stop(now + 0.45);
  };
}

function unlock() {
  if (!ac) {
    try {
      ac = new AudioContext();
    } catch {
      return;
    }
  }
  if (ac.state === 'suspended') void ac.resume();
}

type Tone = {
  f: number;
  f2?: number;
  type?: OscillatorType;
  dur?: number;
  vol?: number;
  delay?: number;
};

function tone({
  f,
  f2,
  type = 'sine',
  dur = 0.12,
  vol = 0.08,
  delay = 0,
}: Tone) {
  if (!sound.on || !ac || ac.state !== 'running') return;
  const t = ac.currentTime + delay;
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(ac.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

// Low "buuuu" hum, like a phone vibrating: two detuned saws through a
// lowpass, with a fast tremolo. Returns a function that fades it out.
export function startBuzz(): () => void {
  if (!sound.on || !ac || ac.state !== 'running') return () => {};
  const ctx = ac;
  const t = ctx.currentTime;
  const out = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  const tremolo = ctx.createGain();
  const lfo = ctx.createOscillator();
  const lfoDepth = ctx.createGain();
  const oscs = [82, 84.5].map((f) => {
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = f;
    o.connect(filter);
    return o;
  });

  filter.type = 'lowpass';
  filter.frequency.value = 380;
  lfo.frequency.value = 24;
  lfoDepth.gain.value = 0.5;
  tremolo.gain.value = 0.5;
  lfo.connect(lfoDepth).connect(tremolo.gain);
  filter.connect(tremolo).connect(out).connect(ctx.destination);
  out.gain.setValueAtTime(0, t);
  out.gain.linearRampToValueAtTime(0.09, t + 0.06);

  [...oscs, lfo].forEach((o) => o.start(t));

  let stopped = false;
  return () => {
    if (stopped) return;
    stopped = true;
    const now = ctx.currentTime;
    out.gain.cancelScheduledValues(now);
    out.gain.setValueAtTime(out.gain.value, now);
    out.gain.linearRampToValueAtTime(0, now + 0.12);
    [...oscs, lfo].forEach((o) => o.stop(now + 0.15));
  };
}

const PENTATONIC = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21];

export const sfx = {
  tick: () =>
    tone({ f: 1800, f2: 1200, type: 'triangle', dur: 0.04, vol: 0.03 }),
  boing: () => {
    tone({ f: 220, f2: 520, dur: 0.18, vol: 0.07 });
    tone({ f: 520, f2: 300, dur: 0.22, vol: 0.04, delay: 0.1 });
  },
  click: () => {
    tone({ f: 660, type: 'triangle', dur: 0.1, vol: 0.07 });
    tone({ f: 990, type: 'triangle', dur: 0.16, vol: 0.06, delay: 0.07 });
  },
  /** soft bubble pop */
  pop: () => tone({ f: 900, f2: 180, dur: 0.09, vol: 0.09 }),
  /** three quick rising blips, like keystrokes */
  type: () =>
    [0, 1, 2].forEach((i) =>
      tone({
        f: 520 + i * 180,
        type: 'square',
        dur: 0.035,
        vol: 0.025,
        delay: i * 0.05,
      })
    ),
  /** two-note "ding-dong" */
  rise: () => {
    tone({ f: 587, type: 'triangle', dur: 0.14, vol: 0.06 });
    tone({ f: 880, type: 'triangle', dur: 0.22, vol: 0.06, delay: 0.09 });
  },
  /** happy arpeggio for a success (e.g. email copied) */
  success: () =>
    [523, 659, 784, 1047].forEach((f, i) =>
      tone({ f, type: 'triangle', dur: 0.22, vol: 0.06, delay: i * 0.06 })
    ),
  /** a short burst of the vibration hum, for shakes */
  buzz: (seconds = 0.5) => {
    const stop = startBuzz();
    setTimeout(stop, seconds * 1000);
  },
  /** tiny data blip, pitched by position so the wave "plays" upward */
  blip: (at: number) =>
    tone({
      f: 700 + at * 900 + Math.random() * 80,
      type: 'square',
      dur: 0.025,
      vol: 0.012,
    }),
  /** two-step glitchy chirp for an icon morphing into shape */
  glitch: () => {
    const f = 300 + Math.random() * 500;
    tone({ f, f2: f * 2.2, type: 'square', dur: 0.05, vol: 0.018 });
    tone({
      f: f * 1.5,
      f2: f * 0.6,
      type: 'sawtooth',
      dur: 0.06,
      vol: 0.014,
      delay: 0.07,
    });
  },
  /** soft chord when the page is fully built */
  built: () =>
    [392, 494, 587, 784].forEach((f, i) =>
      tone({ f, type: 'sine', dur: 0.6, vol: 0.035, delay: i * 0.03 })
    ),
  toggle: (on: boolean) => {
    tone({ f: on ? 440 : 660, type: 'triangle', dur: 0.08, vol: 0.06 });
    tone({
      f: on ? 660 : 440,
      type: 'triangle',
      dur: 0.1,
      vol: 0.06,
      delay: 0.07,
    });
  },
  pluck: (i: number) =>
    tone({
      f: 392 * Math.pow(2, PENTATONIC[i % PENTATONIC.length] / 12),
      type: 'triangle',
      dur: 0.22,
      vol: 0.05,
    }),
};
