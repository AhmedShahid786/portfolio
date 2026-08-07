import type { ReactElement } from "react";

import {
  GitHubIcon,
  LinkedInIcon,
  MediumIcon,
  XIcon,
} from "@/components/icons/brand-icons";
import type { SocialName } from "@/src/data/socials";

/*
 * Presentation binding for the social row, after chanhdai.com's
 * `src/features/portfolio/components/social-link-icons.tsx` (MIT, (c) 2026
 * Chánh Đại). It is a component file rather than part of `src/data/socials.ts`
 * so the data layer stays JSX-free; keying it by `SocialName` keeps it
 * exhaustive with that file.
 */
export const SOCIAL_ICONS: Record<SocialName, ReactElement> = {
  x: <XIcon />,
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  medium: <MediumIcon />,
};
