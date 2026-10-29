export type NavLink = { label: string; href: string };

// Anchors are rooted at `/` so they still work from /work and its subpages.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Blogs", href: "/#blogs" },
] satisfies NavLink[];
