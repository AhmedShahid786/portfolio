import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
];

export function SiteNav() {
  return (
    <nav className="border-border grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-y px-4 py-4 sm:gap-4">
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

      <Link
        href="/"
        aria-label="Ahmed Raza — home"
        className="justify-self-center"
      >
        {/* Exported from Figma: the monogram uses KAWARA (Personal Use), which
            isn't available as a webfont, so the original vector is used. */}
        <Image
          src="/icons/logo-ar.svg"
          alt=""
          width={48}
          height={29}
          unoptimized
          priority
          className="h-auto w-12"
        />
      </Link>

      {/* Present in the Figma frame, intentionally not wired: the file only
          defines a dark theme, so there is no second theme to switch to yet. */}
      <button
        type="button"
        aria-label="Toggle theme"
        className="justify-self-end"
      >
        <Image
          src="/icons/sun.svg"
          alt=""
          width={22}
          height={22}
          unoptimized
          className="size-6"
        />
      </button>
    </nav>
  );
}
