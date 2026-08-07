import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
];

export function SiteNav() {
  return (
    /*
     * Two elements, because the bottom rule runs to the screen edges while the
     * nav's contents stay aligned with the page shell. The header is full width
     * and owns `border-b`; the inner nav is capped at the shell width and owns
     * `border-x`, continuing the shell's vertical rules straight through the nav.
     *
     * Deliberately structural rather than chanhdai's `screen-line-bottom`
     * utility (a `left:-100vw; width:200vw` pseudo-element): that needs an
     * `overflow-x-clip` ancestor to avoid a horizontal scrollbar, and `100vw`
     * counts the vertical scrollbar's width, so it overflows by exactly that
     * much. Nothing here uses viewport units, so there is nothing to clip.
     *
     * bg-background is load-bearing, not decoration — the nav was transparent,
     * so once it stops scrolling away the page would show through it. z-50 keeps
     * it over the section hairlines, and `scroll-pt-20` on <html> in layout.tsx
     * is the other half: anchor targets have to clear the pinned nav.
     */
    <header className="border-border bg-background sticky top-0 z-50 border-b">
      <nav className="border-border mx-auto flex w-full max-w-3xl items-center gap-2 border-x border-t px-4 py-4 sm:gap-4">
        {/* 2.5rem reproduces the vector monogram's box: KAWARA's cap height is
            0.7em, so 40px of type gives the design's 28px caps and ~48px of
            width. leading-[0.7] collapses the line box onto those caps — at any
            larger value the descender space it reserves would grow the nav row.
            The nudge optically centres it: an all-caps line's ink sits above its
            line box centre, which no line-height can correct, so `items-center`
            alone leaves the mark riding ~5px high. In em so it tracks the size. */}
        <Link
          href="/"
          aria-label="Ahmed Raza — home"
          className="font-brand translate-y-[0.07em] text-[2.5rem] leading-[0.7]"
        >
          AR
        </Link>

        {/* Everything else is pushed right; this spacer is the gap in the middle. */}
        <div className="flex-1" />

        <ul className="flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-muted hover:text-primary font-display block px-1 py-1 text-sm transition-colors sm:px-2 sm:text-base"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Divider between the links and the toggle, as in chanhdai's header:
            a hairline 20px tall, centred on the row. */}
        <div className="bg-border h-5 w-px shrink-0" aria-hidden />

        <ThemeToggle />
      </nav>
    </header>
  );
}
