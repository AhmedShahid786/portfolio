import { getAudioContext } from "@/lib/sound/sound-engine";

type Tone = {
  from: number;
  to: number;
  duration: number;
  gain: number;
};

export type UISound = "tick" | "tap";

const TONES: Record<UISound, Tone> = {
  // Buttons, nav links, small controls
  tick: { from: 920, to: 660, duration: 0.045, gain: 0.06 },
  // Cards, selections, larger interactive elements
  tap: { from: 540, to: 350, duration: 0.085, gain: 0.07 },
};

const ATTACK = 0.004;
const SILENT = 0.0001; // exponential ramps can't reach 0
const STORAGE_KEY = "ui-sounds-enabled";

let enabled: boolean | null = null;

export function isSoundEnabled(): boolean {
  if (enabled === null) {
    try {
      enabled = localStorage.getItem(STORAGE_KEY) !== "false";
    } catch {
      enabled = true;
    }
  }
  return enabled;
}

export function setSoundEnabled(value: boolean) {
  enabled = value;
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {}
}

export function playSound(type: UISound) {
  if (typeof window === "undefined" || !isSoundEnabled()) return;
  // Autoplay policy: stay silent until the visitor has interacted with the page.
  if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;

  const ctx = getAudioContext();
  if (ctx.state === "suspended") void ctx.resume();

  const { from, to, duration, gain } = TONES[type];
  const start = ctx.currentTime;
  const end = start + duration;

  const oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(from, start);
  oscillator.frequency.exponentialRampToValueAtTime(to, end);

  // Fast fade-in and exponential fade-out so the tone never starts or stops on a click.
  const envelope = ctx.createGain();
  envelope.gain.setValueAtTime(SILENT, start);
  envelope.gain.linearRampToValueAtTime(gain, start + ATTACK);
  envelope.gain.exponentialRampToValueAtTime(SILENT, end);

  oscillator.connect(envelope).connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(end + 0.01);
  oscillator.onended = () => envelope.disconnect();
}

// The shared context may have been created (suspended) before any gesture, e.g. by
// useSound on mount. Resume it inside the first real interaction, where browsers allow it.
if (typeof window !== "undefined") {
  const unlock = () => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") void ctx.resume();
  };
  for (const event of ["pointerdown", "keydown", "touchend"]) {
    window.addEventListener(event, unlock, { once: true, capture: true });
  }
}
