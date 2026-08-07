import Image from "next/image";

import { NoisePanel } from "@/components/noise-panel";
import { PROJECTS, type Project } from "@/src/data/projects";

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
    <section id="projects" className="screen-line-top screen-line-bottom">
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
