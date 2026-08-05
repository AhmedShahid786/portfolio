import Image from "next/image";
import type { ReactNode } from "react";

type Tech = { name: string; src: string };
type Work = { name: string; downloads: string; src: string };

type Entry = {
  company: string;
  logo: string;
  role: string;
  meta: string[];
  stack: Tech[];
  description?: ReactNode;
  projects: Work[];
};

// Icon-to-label pairings are taken from the Figma frame as-is. Note the second
// entry labels the Laravel mark "CICD" and the Node mark "Next JS" — that
// mismatch is in the design, not introduced here.
const EXPERIENCE: Entry[] = [
  {
    company: "Saylani Tech",
    logo: "/images/companies/saylani-tech.png",
    role: "Senior Software Engineer",
    meta: [],
    stack: [
      { name: "React", src: "/images/tech/react.png" },
      { name: "Aws", src: "/images/tech/aws.svg" },
      { name: "CICD", src: "/images/tech/github-actions.svg" },
      { name: "Redux", src: "/images/tech/redux.png" },
      { name: "shadcn Ui", src: "/images/tech/shadcn.svg" },
    ],
    // The design draws a chevron here but supplies no expanded content.
    projects: [],
  },
  {
    company: "Islamic Desk",
    logo: "/images/companies/islamic-desk.png",
    role: "Software Engineer",
    meta: ["Part Time", "2018-2022", "4y"],
    stack: [
      { name: "React", src: "/images/tech/react.png" },
      { name: "Firebase", src: "/images/tech/firebase.svg" },
      { name: "CICD", src: "/images/tech/laravel.png" },
      { name: "Next JS", src: "/images/tech/nodejs.png" },
    ],
    description: (
      <>
        I worked as a <em className="text-primary not-italic">Software Engineer</em>{" "}
        at <em className="text-primary not-italic">Islamic Desk</em>, contributing
        to the development of{" "}
        <em className="text-primary not-italic">Seerat ki Duniya</em>,{" "}
        <em className="text-primary not-italic">Nahw Ki Duniya</em>, and{" "}
        <em className="text-primary not-italic">Surf Ki Duniya</em>. My role
        involved creating effective solutions and working with the team to
        introduce new functionalities.
      </>
    ),
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
];

function EntryHeader({
  entry,
  expandable,
}: {
  entry: Entry;
  expandable: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="border-border flex size-10 shrink-0 items-center justify-center rounded-lg border">
          <Image
            src={entry.logo}
            alt=""
            width={24}
            height={24}
            className="size-6 object-contain"
          />
        </span>

        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className="font-display text-2xl font-medium">{entry.company}</h3>
          {entry.meta.map((item, index) => (
            <span
              key={item}
              className={
                index > 0
                  ? "text-muted border-border border-l ps-2 text-sm"
                  : "text-muted text-sm"
              }
            >
              {item}
            </span>
          ))}
        </div>

        {expandable && (
          <Image
            src="/icons/chevron.svg"
            alt=""
            width={5}
            height={9}
            unoptimized
            aria-hidden
            className="ms-auto shrink-0 rotate-90 transition-transform group-open:-rotate-90"
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="border-border flex size-8 shrink-0 items-center justify-center rounded-lg border">
          <Image
            src="/icons/code.svg"
            alt=""
            width={14}
            height={6}
            unoptimized
          />
        </span>
        <span className="font-display">{entry.role}</span>
      </div>

      <ul className="flex flex-wrap items-center gap-2">
        {entry.stack.map((tech) => (
          <li
            key={tech.name}
            className="border-border flex items-center gap-2 rounded-lg border px-2 py-1"
          >
            <Image
              src={tech.src}
              alt=""
              width={16}
              height={16}
              unoptimized={tech.src.endsWith(".svg")}
              className="size-4 brightness-0 invert"
            />
            <span className="text-muted text-sm">{tech.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EntryBody({ entry }: { entry: Entry }) {
  return (
    <div className="flex flex-col gap-8 pt-4">
      {entry.description && (
        <p className="text-secondary leading-snug">{entry.description}</p>
      )}

      {entry.projects.length > 0 && (
        <div>
          <h4 className="text-secondary font-display text-sm">
            Major Projects
          </h4>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {entry.projects.map((project) => (
              <li key={project.name} className="flex items-center gap-4">
                <Image
                  src={project.src}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 shrink-0 rounded-lg object-contain"
                />
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="font-display truncate text-sm">
                    {project.name}
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <Image
                      src="/icons/download.svg"
                      alt="Downloads"
                      width={16}
                      height={16}
                      unoptimized
                      className="size-4 shrink-0"
                    />
                    {project.downloads}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ExperienceEntry({ entry }: { entry: Entry }) {
  const expandable = Boolean(entry.description) || entry.projects.length > 0;

  if (!expandable) {
    return (
      <div className="p-4">
        <EntryHeader entry={entry} expandable={false} />
      </div>
    );
  }

  return (
    <details open className="group p-4">
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <EntryHeader entry={entry} expandable />
      </summary>
      <EntryBody entry={entry} />
    </details>
  );
}

export function Experience() {
  return (
    <section id="experience" className="border-border border-t">
      <h2 className="font-display border-border border-b px-4 py-3 text-3xl font-medium">
        Experience
      </h2>

      <ul className="divide-border divide-y">
        {EXPERIENCE.map((entry) => (
          <li key={entry.company}>
            <ExperienceEntry entry={entry} />
          </li>
        ))}
      </ul>
    </section>
  );
}
