"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { TickLink } from "@/components/tick-link";
import { NAV_LINKS } from "@/src/data/site-nav";

// Scroll-spy: a link is active while its section crosses a thin band 30% down
// the viewport. Sections in between (GitHub, Stack) light nothing up.
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const sections = NAV_LINKS.flatMap((link) => {
      const el = link.section && document.getElementById(link.section);
      return el ? [el] : [];
    });
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(sections.find((el) => visible.has(el.id))?.id ?? null);
      },
      { rootMargin: "-30% 0px -69% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function NavLinks() {
  const pathname = usePathname();
  const active = useActiveSection(pathname === "/");

  return (
    <ul className="flex min-w-0 items-center gap-1 sm:gap-2">
      {NAV_LINKS.map((link) => {
        const isActive =
          (link.section !== undefined && link.section === active) ||
          (link.href !== "/" &&
            !link.href.includes("#") &&
            pathname.startsWith(link.href));

        return (
          <li key={link.href}>
            <TickLink
              href={link.href}
              aria-current={isActive ? "location" : undefined}
              className="text-muted hover:text-primary aria-[current]:text-primary font-display block px-1 py-1 text-sm transition-colors sm:px-2 sm:text-base"
            >
              {link.label}
            </TickLink>
          </li>
        );
      })}
    </ul>
  );
}
