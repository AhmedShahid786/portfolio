"use client";

import { useSyncExternalStore } from "react";

/*
 * chanhdai.com gets this from motion/react's useReducedMotion. This project has
 * no animation library, so it reads the media query directly.
 *
 * A media query is external state, so it is subscribed to rather than mirrored
 * into a useState inside an effect — which is both what useSyncExternalStore is
 * for and what the react-hooks/set-state-in-effect lint rule insists on. False
 * on the server, since there is no query to ask.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
