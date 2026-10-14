import { kaacib } from "@/src/data/work/kaacib";
import { saylaniAlumni } from "@/src/data/work/saylani-alumni";
import { sitLms } from "@/src/data/work/sit-lms";
import { snapfreez } from "@/src/data/work/snapfreez";
import type { Product } from "@/src/data/work/types";

export type ExperienceTech = { name: string; src: string };

export type Work = { name: string; downloads: string; src: string };

export type Entry = {
  company: string;
  companyUrl?: string;
  logo?: string;
  role: string;
  mode?: string;
  period?: string;
  summary?: string;
  // Case studies from src/data/work, shown inside the expanded entry.
  products: Product[];
  stack: ExperienceTech[];
  projects: Work[];
};

export const EXPERIENCE = [
  {
    company: "Saylani Welfare International",
    logo: "/images/companies/saylani-tech.png",
    role: "Software Engineer",
    mode: "Onsite",
    period: "Feb 2025 — Present",
    summary:
      "Engineering lead for Saylani's product ecosystem. Led a 4-member team " +
      "building the Saylani Student Portal, a nationwide LMS for 600K+ students, " +
      "and delivered the core backend for Snapfreez, owning system design, " +
      "backend services, frontend, CI/CD, and production observability.",
    products: [sitLms, snapfreez, saylaniAlumni],
    stack: [
      { name: "React", src: "/images/tech/react.png" },
      { name: "Aws", src: "/images/tech/aws.svg" },
      { name: "CICD", src: "/images/tech/github-actions.svg" },
      { name: "Redux", src: "/images/tech/redux.png" },
      { name: "shadcn Ui", src: "/images/tech/shadcn.svg" },
    ],
    projects: [],
  },
  {
    company: "KAACIB",
    role: "Software Engineer",
    mode: "Hybrid",
    period: "May 2024 — Feb 2025",
    summary:
      "Built Kaacib, a local services marketplace connecting customers with " +
      "trained technicians. Engineered real-time chat and live location " +
      "tracking over WebSockets, event-driven AWS Lambda workflows, and CI/CD " +
      "pipelines that cut deployment time by up to 80%.",
    products: [kaacib],
    stack: [],
    projects: [],
  },
  {
    company: "Islamic Desk",
    logo: "/images/companies/islamic-desk.png",
    role: "Software Engineer Intern",
    mode: "Onsite",
    period: "Feb 2023 — May 2024",
    summary:
      "Shipped end-to-end features across Islamic Desk's EdTech ecosystem: " +
      "mobile learning apps and web platforms used in 170+ countries with " +
      "150K+ downloads. Built production REST APIs, serverless workflows, and " +
      "a RAG-based learning chatbot with LangChain, Pinecone, and OpenAI.",
    products: [],
    stack: [
      { name: "React", src: "/images/tech/react.png" },
      { name: "Firebase", src: "/images/tech/firebase.svg" },
      { name: "CICD", src: "/images/tech/laravel.png" },
      { name: "Next JS", src: "/images/tech/nodejs.png" },
    ],
    projects: [
      {
        name: "Seerat Ki Dunya",
        downloads: "20K+",
        src: "/images/work/seerat-ki-dunya.png",
      },
      {
        name: "Nahw Ki Dunya",
        downloads: "50K+",
        src: "/images/work/nahw-ki-dunya.png",
      },
      {
        name: "Sarf Ki Dunya",
        downloads: "10k+",
        src: "/images/work/sarf-ki-dunya.png",
      },
    ],
  },
] satisfies Entry[];
