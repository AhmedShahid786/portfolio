import banner from "@/src/assets/banners/saylani-alumni.jpg";
import logo from "@/src/assets/logos/saylani-alumni.png";

import type { Product } from "./types";

export const saylaniAlumni = {
  slug: "saylani-alumni",
  liveUrl: "https://alumni.saylaniit.com/",
  name: "Saylani Alumni",
  summary:
    "A professional network built for Saylani students to keep showing what they can do after the classroom ends. Students can share work, follow each other, build a profile around their skills and experience, and stay visible to a community growing through the same transition from learning into work. The interesting part is that it feels closer to a living student network than a static alumni directory: people are posting projects, discussing what they're learning, following one another, and building a professional identity in public.",
  banner,
  logo,
  goal: [
    "Saylani IT already teaches students practical technology skills, with a programme emphasising hands-on learning, projects, career preparation, freelancing and employment. But finishing a course creates another problem: how does a student make all of that work visible afterwards?",
    "For someone early in their career, knowing a technology is only half of the problem. They need somewhere to show the project they just built, talk about what they are learning, find people working on similar things, and gradually build enough of a professional footprint that an opportunity can find them.",
    "That is the role the Alumni platform is growing into.",
    "The feed has students sharing projects, designs, technical learning, certificates, career updates and requests for collaboration. Members can follow one another, message each other, and save opportunities.",
    "Profiles go beyond a username and biography, with technologies, followers and following, alongside separate areas for education, experience, certificates and projects.",
    "So the product is not simply preserving a list of former students. It gives students somewhere to keep building a professional identity while they are still finding their way into the industry.",
  ],
  stack: [
    { name: "React", src: "/images/tech/react.png" },
    { name: "Firebase", src: "/images/tech/firebase.svg" },
    { name: "GitHub Actions", src: "/images/tech/github-actions.svg" },
    { name: "shadcn/ui", src: "/images/tech/shadcn.svg" },
    { name: "AWS", src: "/images/tech/aws.svg" },
  ],
  contribution: [
    {
      paragraphs: [
        "I contributed to the development of Saylani Alumni, a growing network for students to showcase their work, build professional profiles, and stay connected with other learners and industry opportunities. I'll be documenting the engineering decisions and the parts I personally built in the full case study.",
      ],
    },
  ],
  impact: [],
} satisfies Product;
