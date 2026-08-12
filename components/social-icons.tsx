import type { ReactElement } from "react";

import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MediumIcon,
  XIcon,
} from "@/components/icons/brand-icons";
import type { SocialName } from "@/src/data/socials";

export const SOCIAL_ICONS: Record<SocialName, ReactElement> = {
  x: <XIcon />,
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  medium: <MediumIcon />,
  email: <MailIcon />,
};
