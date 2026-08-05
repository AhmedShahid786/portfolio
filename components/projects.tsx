import Image from "next/image";

import { NoisePanel } from "@/components/noise-panel";

// TODO: real project URLs — the Figma frame has no links on the buttons.
const PROJECTS = [
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
];

type Project = (typeof PROJECTS)[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article>
      <div className="p-6">
        <div className="border-surface overflow-hidden rounded-lg border-8">
          <Image
            src={project.cover.src}
            alt={`${project.title} preview`}
            width={project.cover.width}
            height={project.cover.height}
            className="h-auto w-full"
          />
        </div>
      </div>

      <h3 className="border-border font-display border-y px-4 py-2 text-2xl font-medium">
        {project.title}
      </h3>

      <div className="flex flex-col gap-6 p-4">
        <p className="text-secondary leading-snug">{project.description}</p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap items-center gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech.name}
                className="border-border flex size-10 items-center justify-center rounded-lg border"
              >
                {/* Source art is full-colour; the design composites these
                    monochrome, which is what the filter reproduces. */}
                <Image
                  src={tech.src}
                  alt={tech.name}
                  title={tech.name}
                  width={20}
                  height={20}
                  unoptimized={tech.src.endsWith(".svg")}
                  className="size-5 brightness-0 invert"
                />
              </li>
            ))}
          </ul>

          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border hover:border-secondary flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors"
          >
            View Live Link
            <Image
              src="/icons/export-circle.svg"
              alt=""
              width={14}
              height={14}
              unoptimized
            />
          </a>
        </div>
      </div>
    </article>
  );
}

function ComingSoon() {
  return (
    <div className="p-6">
      <NoisePanel className="border-surface aspect-[20/9] rounded-lg border-8">
        <p>More Case Studies Coming Soon</p>
      </NoisePanel>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="border-border border-t">
      <h2 className="font-display border-border border-b px-4 py-3 text-3xl font-medium">
        Projects
      </h2>

      <ul className="divide-border divide-y">
        {PROJECTS.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
        <li>
          <ComingSoon />
        </li>
      </ul>
    </section>
  );
}
