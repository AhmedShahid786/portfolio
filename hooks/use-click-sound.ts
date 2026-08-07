"use client";

import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/sound/click-soft";

/*
 * Copied from chanhdai.com (MIT, (c) 2026 Chánh Đại) — src/hooks/soundcn/use-click-sound.ts
 */
export function useClickSound() {
  return useSound(clickSoftSound, { volume: 0.3 });
}
