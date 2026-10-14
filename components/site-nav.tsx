import { NavLinks } from "@/components/nav-links";
import { TickLink } from "@/components/tick-link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteNav() {
  return (
    <header className="border-border bg-background sticky top-0 z-50 border-b">
      <nav className="border-border mx-auto grid w-full max-w-3xl grid-cols-[auto_1fr_auto] items-center gap-2 border-x border-t px-4 py-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
        <NavLinks />

        <TickLink
          href="/"
          aria-label="Ahmed Raza — home"
          className="font-brand translate-y-[0.07em] justify-self-center text-[2.5rem] leading-[0.7]"
        >
          AR
        </TickLink>

        <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-4">
          <div className="bg-border h-5 w-px shrink-0" aria-hidden />

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
