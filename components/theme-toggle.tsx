"use client";

import { useState } from "react";

import { MoonIcon } from "@/components/icons/moon-icon";
import { SunMediumIcon } from "@/components/icons/sun-medium-icon";
import { useClickSound } from "@/hooks/use-click-sound";

type Theme = "dark" | "light";

/*
 * Modelled on chanhdai.com's ThemeToggle (MIT, (c) 2026 Chánh Đại) —
 * src/components/theme-toggle.tsx. Same icons, same click sound, same
 * coarse-pointer tap target, and the same convention of showing the theme you
 * are *in* (moon while dark) rather than the one you'd switch to.
 *
 * Differences, all deliberate:
 * - State is local instead of next-themes. Nothing is persisted and no system
 *   preference is read, because there is no light palette to switch to yet.
 * - No tooltip and no "D" hotkey — those need a tooltip primitive and
 *   react-hotkeys-hook, and neither is in this project.
 *
 * The click flips `.dark`/`.light` on <html>, which is the hook documented in
 * globals.css. That is inert until a light palette exists: the control is wired,
 * not themed.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [click] = useClickSound();

  const switchTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    click();
    setTheme(next);

    const root = document.documentElement;
    root.classList.remove(theme);
    root.classList.add(next);
  };

  return (
    <button
      type="button"
      aria-label="Toggle mode"
      aria-pressed={theme === "light"}
      onClick={switchTheme}
      className="text-muted hover:text-primary relative flex cursor-pointer touch-manipulation items-center justify-center transition-colors"
    >
      {/* Touch gets a 48px target while the icon stays 24px — from the source. */}
      <span className="pointer-fine:hidden absolute size-12" aria-hidden />

      {theme === "dark" ? (
        <MoonIcon aria-hidden />
      ) : (
        <SunMediumIcon aria-hidden />
      )}
    </button>
  );
}
