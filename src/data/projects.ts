export type ProjectTech = { name: string; src: string };

export type Project = {
  title: string;
  description: string;
  href: string;
  /** Intrinsic size of the cover art, so next/image can reserve the box. */
  cover: { src: string; width: number; height: number };
  stack: ProjectTech[];
};

// TODO: real project URLs — the Figma frame has no links on the buttons.
export const PROJECTS = [
  {
    title: "SMIT-LMS",
    description:
      "This project focused on improving the usability and structure of a student portal by simplifying complex workflows, clarifying navigation, and creating a scalable interface for both students and administrators.",
    href: "#",
    cover: { src: "/images/smit-lms.png", width: 2871, height: 1264 },
    stack: [
      { name: "Node.js", src: "/images/tech/nodejs.png" },
      { name: "React", src: "/images/tech/react.png" },
      { name: "Laravel", src: "/images/tech/laravel.png" },
      { name: "Redux", src: "/images/tech/redux.png" },
    ],
  },
  {
    title: "Saylani Alumni",
    description:
      "The platform was designed to help students showcase their skills, connect with industry opportunities, and build professional visibility through a structured and accessible digital experience.",
    href: "#",
    cover: { src: "/images/saylani-alumni.png", width: 2871, height: 1264 },
    stack: [
      { name: "React", src: "/images/tech/react.png" },
      { name: "Firebase", src: "/images/tech/firebase.svg" },
      { name: "GitHub Actions", src: "/images/tech/github-actions.svg" },
      { name: "shadcn/ui", src: "/images/tech/shadcn.svg" },
      { name: "AWS", src: "/images/tech/aws.svg" },
    ],
  },
] satisfies Project[];
