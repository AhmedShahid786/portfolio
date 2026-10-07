"use client";

import { useEffect } from "react";

const AWAY_TITLE = "I noticed you left";

export function AwayTitle() {
  useEffect(() => {
    // Whatever metadata set is the "present" title, so this stays in sync with layout.tsx
    const presentTitle = document.title;

    const showAway = () => {
      document.title = AWAY_TITLE;
    };
    const showPresent = () => {
      document.title = presentTitle;
    };
    // Tab switches fire visibilitychange; clicking into another window only fires blur
    const onVisibilityChange = () => {
      if (document.hidden) showAway();
      else showPresent();
    };

    window.addEventListener("blur", showAway);
    window.addEventListener("focus", showPresent);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("blur", showAway);
      window.removeEventListener("focus", showPresent);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      showPresent();
    };
  }, []);

  return null;
}
