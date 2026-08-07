export type ExperienceTech = { name: string; src: string };

/** A shipped app credited to a role, with its download count as shown. */
export type Work = { name: string; downloads: string; src: string };

export type Entry = {
  company: string;
  logo: string;
  role: string;
  /** Free-form chips after the company name — employment type, years, tenure. */
  meta: string[];
  stack: ExperienceTech[];
  projects: Work[];
};

/*
 * The prose paragraph for an entry is *not* here: it carries emphasis markup,
 * so it lives in `components/experience.tsx`, keyed by `company`, and this file
 * stays JSX-free.
 *
 * Icon-to-label pairings are taken from the Figma frame as-is. Note the second
 * entry labels the Laravel mark "CICD" and the Node mark "Next JS" — that
 * mismatch is in the design, not introduced here.
 *
 * Spelling is inconsistent in the design and reproduced as-is: the project
 * names below read "Sarf Ki Dunya" where the Islamic Desk paragraph in
 * components/experience.tsx reads "Surf Ki Duniya". See HANDOFF §6.4.
 */
export const EXPERIENCE = [
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
