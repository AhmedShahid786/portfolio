// `section` is the home-page element id that lights the link up while it's
// scrolled into view (see components/nav-links.tsx).
export type NavLink = { label: string; href: string; section?: string };

// Anchors are rooted at `/` so they still work from /work and its subpages.
export const NAV_LINKS = [
  { label: "About", href: "/#about", section: "about" },
  // On the home page the products live inside Experience.
  { label: "Work", href: "/work", section: "experience" },
  { label: "Blogs", href: "/#blogs", section: "blogs" },
] satisfies NavLink[];
