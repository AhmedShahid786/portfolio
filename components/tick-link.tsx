"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

// next/link that plays `tick` from lib/sound/sounds.js. Fires on pointerdown —
// the instant the button goes down — rather than click, which waits for the
// release. Keyboard activation has no pointerdown, so click covers it
// (`detail === 0` marks a click that came from Enter, not a pointer).
export function TickLink({
  onPointerDown,
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      onPointerDown={(event) => {
        if (event.button === 0) window.sounds?.tick({ x: event.clientX });
        onPointerDown?.(event);
      }}
      onClick={(event) => {
        if (event.detail === 0) window.sounds?.tick();
        onClick?.(event);
      }}
    />
  );
}
