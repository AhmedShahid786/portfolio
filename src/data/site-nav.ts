export type NavLink = { label: string; href: string };

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
] satisfies NavLink[];
