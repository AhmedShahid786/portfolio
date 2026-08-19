/**
 * Social profiles — names and URLs only.
 *
 * Modelled on chanhdai.com's `src/features/portfolio/data/social-links.ts`
 * (MIT, (c) 2026 Chánh Đại): the icons are bound separately, in
 * `components/social-icons.tsx`, keyed by the same `SocialName`. That keeps
 * this data layer JSX-free and makes the icon map exhaustive at compile time —
 * add a profile here and the map stops type-checking until it is bound.
 *
 * All five are real as of 2026-08-19 — Ahmed supplied the set. The Figma frame
 * carries no links, so these come from him, not the design. Follower counts from
 * the old card design are gone for good; this row is an icon and a tooltip,
 * nothing else.
 */
import { EMAIL_HREF, GITHUB_PROFILE_URL } from "@/lib/site-config";

export type SocialLink = {
  /** Stable key; also the key into the icon map. */
  name: string;
  /** Platform name. Shown in the tooltip and as the link's accessible name. */
  title: string;
  href: string;
  /**
   * Account name on that platform, without the leading `@`. The tooltip appends
   * it — "GitHub (@AhmedShahid786)" — the way chanhdai.com's does. Omitted where
   * there is no handle to show, which is the mail entry.
   */
  handle?: string;
};

export const SOCIAL_LINKS = [
  {
    name: "github",
    title: "GitHub",
    href: GITHUB_PROFILE_URL,
    handle: "AhmedShahid786",
  },
  {
    name: "linkedin",
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmedshahid786",
    handle: "ahmedshahid786",
  },
  {
    name: "x",
    title: "X",
    href: "https://x.com/ahmedshahid7866",
    handle: "ahmedshahid7866",
  },
  {
    name: "medium",
    title: "Medium",
    href: "https://medium.com/@ahmedshahid786",
    handle: "ahmedshahid786",
  },
  { name: "email", title: "Email", href: EMAIL_HREF },
] as const satisfies readonly SocialLink[];

export type SocialName = (typeof SOCIAL_LINKS)[number]["name"];
