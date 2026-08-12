/**
 * Social profiles — names and URLs only.
 *
 * Modelled on chanhdai.com's `src/features/portfolio/data/social-links.ts`
 * (MIT, (c) 2026 Chánh Đại): the icons are bound separately, in
 * `components/social-icons.tsx`, keyed by the same `SocialName`. That keeps
 * this data layer JSX-free and makes the icon map exhaustive at compile time —
 * add a profile here and the map stops type-checking until it is bound.
 *
 * TODO: four of the five hrefs are still `#` — the Figma frame carries no links
 * and Ahmed has only supplied GitHub. Email is `#` for the same reason, via
 * `EMAIL_HREF`: the address is unset in lib/site-config.ts. Follower counts from
 * the old card design are gone for good; this row is an icon and a tooltip,
 * nothing else.
 */
import { EMAIL_HREF } from "@/lib/site-config";

export type SocialLink = {
  /** Stable key; also the key into the icon map. */
  name: string;
  /** Platform name. Shown in the tooltip and as the link's accessible name. */
  title: string;
  href: string;
};

export const SOCIAL_LINKS = [
  { name: "x", title: "X", href: "#" },
  {
    name: "github",
    title: "GitHub",
    href: "https://github.com/ahmedshahid786",
  },
  { name: "linkedin", title: "LinkedIn", href: "#" },
  { name: "medium", title: "Medium", href: "#" },
  { name: "email", title: "Email", href: EMAIL_HREF },
] as const satisfies readonly SocialLink[];

export type SocialName = (typeof SOCIAL_LINKS)[number]["name"];
