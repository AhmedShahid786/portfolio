"use client";

import { useEffect } from "react";

// Loads lib/sound/sounds.js once in the browser. The library is an IIFE that
// touches `window` at import time, so it can't be imported on the server; it
// sets `window.sounds` (see the usage block at the top of that file).
export function SoundsLoader() {
  useEffect(() => {
    void import("@/lib/sound/sounds.js");
  }, []);

  return null;
}
