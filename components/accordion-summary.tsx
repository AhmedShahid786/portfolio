"use client";

import type { MouseEvent, ReactNode } from "react";

// <summary> that plays open/close from lib/sound/sounds.js. Uses click (which
// keyboard Enter/Space also fire) rather than the details `toggle` event, so a
// row that starts open doesn't make a sound on page load.
export function AccordionSummary({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  function handleClick(event: MouseEvent<HTMLElement>) {
    const details = event.currentTarget.parentElement as HTMLDetailsElement;
    const x = event.clientX || undefined;

    // `open` still holds the state before this click toggles it.
    if (details.open) window.sounds?.close({ x });
    else window.sounds?.open({ x });
  }

  return (
    <summary className={className} onClick={handleClick}>
      {children}
    </summary>
  );
}
