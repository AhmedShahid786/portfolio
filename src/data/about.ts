/**
 * The About bullets.
 *
 * A bullet is a list of segments rather than one string, because the copy
 * carries inline links and emphasis. Keeping it as data — instead of JSX in the
 * component, the way `components/experience.tsx` holds its prose — means the
 * whole section can be rewritten from this file alone.
 *
 * A bare string is plain copy; the tagged objects are the marked-up runs.
 * Segments are joined verbatim, so put spaces and punctuation inside the
 * strings around a link ("Creator of ", link, " (1.8k stars)").
 */
export type AboutSegment =
  | string
  | { kind: "link"; text: string; href: string }
  | { kind: "emphasis"; text: string };

export type AboutBullet = {
  /** Stable list key — independent of the copy, so edits don't remount rows. */
  id: string;
  content: AboutSegment[];
};

// Ahmed's own copy, supplied 2026-08-15. It replaces the Figma frame's
// placeholder text, which was another developer's bio.
export const ABOUT_BULLETS = [
  {
    id: "thinking",
    content: [
      "I am fascinated by computers and love building and breaking things.",
    ],
  },
  {
    id: "mindset",
    content: ["A generalist with a perfectionist mindset."],
  },
  {
    id: "intro",
    content: [
      "A Product minded engineer building and shipping products that solve real problems, reach real users, and move from idea to production.",
    ],
  },
  {
    id: "intro",
    content: [
      "Love to wear multiple hats across backend architecture, frontend engineering, polished product interfaces, infrastructure, and deployments. You name it!",
    ],
  },
] satisfies AboutBullet[];
