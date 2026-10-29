"use client";

import { usePathname } from "next/navigation";

import { TickLink } from "@/components/tick-link";
import { NAV_LINKS } from "@/src/data/site-nav";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex min-w-0 items-center gap-1 sm:gap-2">
      {NAV_LINKS.map((link) => {
        // Page links (not #anchors) stay lit anywhere under their route;
        // Home only on "/" itself, since every path starts with "/".
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : !link.href.includes("#") && pathname.startsWith(link.href);

        return (
          <li key={link.href}>
            <TickLink
              href={link.href}
              aria-current={isActive ? "page" : undefined}
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
