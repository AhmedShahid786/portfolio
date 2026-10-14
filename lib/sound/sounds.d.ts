// Types for the `window.sounds` API set up by sounds.js.
type SoundOptions = {
  /** Pointer x in px; pans the sound left/right. */
  x?: number;
  /** 0–1, for sounds that scale (wood, whoosh, ruffle…). */
  strength?: number;
  /** Note index 0–8, for `note`. */
  index?: number;
};

type PlaySound = (options?: SoundOptions) => void;

type SoundName =
  | "tick" | "hover" | "detent" | "tap" | "success" | "bonk" | "boop"
  | "brush" | "stroke" | "open" | "close" | "flip" | "flick" | "poof"
  | "whoosh" | "pop" | "note" | "notify" | "bulb" | "flutter" | "reload"
  | "toggle" | "bell" | "rewind" | "msgIn" | "key" | "msgOut" | "read"
  | "ring" | "connect"
  | "wood" | "plastic" | "metal" | "glass" | "paper" | "rubber" | "soft"
  | "watch" | "quill" | "astrolabe" | "pickupKey" | "flute" | "feather"
  | "pickupBrush" | "palette" | "book" | "camera" | "nokia" | "cassette"
  | "duck" | "chai" | "hourglass" | "magnifier" | "nautilus" | "ruffle";

type Sounds = Record<SoundName, PlaySound> & {
  play(name: string, options?: SoundOptions): void;
  impact(name: string, options?: SoundOptions): void;
  pickup(name: string, options?: SoundOptions): void;
  on(): void;
  off(): void;
  toggleSound(): boolean;
  isOn(): boolean;
  isReady(): boolean;
  isAvailable(): boolean;
  unlock(): void;
};

declare global {
  interface Window {
    /** Undefined until SoundsLoader has imported sounds.js. */
    sounds?: Sounds;
  }
}

export {};
