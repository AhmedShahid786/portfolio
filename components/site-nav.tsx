import { NavLinks } from "@/components/nav-links";
import { TickLink } from "@/components/tick-link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteNav() {
  return (
    <header className="border-border sticky top-0 z-50 border-b">
      {/* No vertical padding on <nav>: each cell pads its own content, so the
          dot strips can run the nav's full height. On mobile the outer
          columns are `auto`, so the strips collapse to nothing. */}
      <nav className="border-border bg-background mx-auto grid w-full max-w-3xl grid-cols-[auto_1fr_auto] items-stretch gap-2 border-x border-t px-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
        <div className="flex min-w-0 gap-4">
          <div className="flex items-center py-4">
            <NavLinks />
          </div>
          {/* Dot texture (same as the footer) in the gap before the logo. */}
          <div aria-hidden className="dot-grid flex-1" />
        </div>

        <TickLink
          href="/"
          aria-label="Ahmed Raza — home"
          className="font-brand translate-y-[0.07em] self-center justify-self-center py-4 text-[2.5rem] leading-[0.7]"
        >
          AR
        </TickLink>

        <div className="flex min-w-0 gap-4">
          {/* …and in the gap after it. */}
          <div aria-hidden className="dot-grid flex-1" />
          <div className="flex items-center py-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
