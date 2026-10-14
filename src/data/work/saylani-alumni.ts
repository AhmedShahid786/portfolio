import banner from "@/src/assets/banners/saylani-alumni.jpg";

import type { Product } from "./types";

export const saylaniAlumni = {
  slug: "saylani-alumni",
  name: "Saylani Alumni",
  summary:
    "The platform was designed to help students showcase their skills, connect with industry opportunities, and build professional visibility through a structured and accessible digital experience.",
  banner,
  goal: [],
  stack: [
    { name: "React", src: "/images/tech/react.png" },
    { name: "Firebase", src: "/images/tech/firebase.svg" },
    { name: "GitHub Actions", src: "/images/tech/github-actions.svg" },
    { name: "shadcn/ui", src: "/images/tech/shadcn.svg" },
    { name: "AWS", src: "/images/tech/aws.svg" },
  ],
  contribution: [],
  impact: [],
} satisfies Product;
