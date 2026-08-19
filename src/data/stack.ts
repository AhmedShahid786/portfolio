/**
 * The Stack section's content.
 *
 * Grouped rather than flat: the category order *is* the render order, so
 * reordering the page means reordering this array — there is no separate
 * ordering table to keep in sync. (chanhdai.com keeps a flat list with a
 * `categories: string[]` per item and groups at render time, which buys an item
 * appearing under two headings. Nothing here needs that, and the grouped shape
 * is the one a human can edit in place.)
 *
 * `icon` is a path under `public/`, not a component: `src/data/` holds no JSX.
 * The marks are simple-icons (CC0) — single-path, monochrome, no `fill`
 * attribute — so `components/stack.tsx` paints them with the theme's colour
 * through a CSS mask instead of shipping the path data in the HTML.
 */
export type StackTech = {
  /** Stable list key — independent of the title, so a rename doesn't remount. */
  key: string;
  title: string;
  /** Official home page; the pill is a link. */
  href: string;
  icon: string;
};

export type StackGroup = {
  category: string;
  items: StackTech[];
};

export const STACK = [
  {
    category: "Languages",
    items: [
      {
        key: "typescript",
        title: "TypeScript",
        href: "https://www.typescriptlang.org",
        icon: "/icons/typescript.svg",
      },
      {
        key: "javascript",
        title: "JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        icon: "/icons/javascript.svg",
      },
    ],
  },
  {
    category: "Frontend",
    items: [
      {
        key: "react",
        title: "React",
        href: "https://react.dev",
        icon: "/icons/react.svg",
      },
      {
        key: "nextjs",
        title: "Next.js",
        href: "https://nextjs.org",
        icon: "/icons/nextdotjs.svg",
      },
      {
        key: "expo",
        title: "Expo",
        href: "https://expo.dev",
        icon: "/icons/expo.svg",
      },
      {
        key: "redux",
        title: "Redux",
        href: "https://redux.js.org",
        icon: "/icons/redux.svg",
      },
      {
        key: "tanstack",
        title: "TanStack",
        href: "https://tanstack.com",
        icon: "/icons/tanstack.svg",
      },
      {
        key: "tailwindcss",
        title: "Tailwind CSS",
        href: "https://tailwindcss.com",
        icon: "/icons/tailwindcss.svg",
      },
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      {
        key: "nodejs",
        title: "Node.js",
        href: "https://nodejs.org",
        icon: "/icons/nodedotjs.svg",
      },
      {
        key: "expressjs",
        title: "Express.js",
        href: "https://expressjs.com",
        icon: "/icons/express.svg",
      },
      {
        key: "nestjs",
        title: "NestJS",
        href: "https://nestjs.com",
        icon: "/icons/nestjs.svg",
      },
      {
        key: "postgresql",
        title: "PostgreSQL",
        href: "https://www.postgresql.org",
        icon: "/icons/postgresql.svg",
      },
      {
        key: "mongodb",
        title: "MongoDB",
        href: "https://www.mongodb.com",
        icon: "/icons/mongodb.svg",
      },
      {
        key: "redis",
        title: "Redis",
        href: "https://redis.io",
        icon: "/icons/redis.svg",
      },
    ],
  },
  {
    category: "DevOps",
    items: [
      {
        key: "vercel",
        title: "Vercel",
        href: "https://vercel.com",
        icon: "/icons/vercel.svg",
      },
      {
        key: "github-actions",
        title: "CI/CD",
        href: "https://github.com/features/actions",
        icon: "/icons/githubactions.svg",
      },
      {
        key: "linux",
        title: "Linux",
        href: "https://www.kernel.org",
        icon: "/icons/linux.svg",
      },
      {
        key: "nginx",
        title: "Nginx",
        href: "https://nginx.org",
        icon: "/icons/nginx.svg",
      },
      {
        key: "docker",
        title: "Docker",
        href: "https://www.docker.com",
        icon: "/icons/docker.svg",
      },
      {
        key: "prometheus",
        title: "Prometheus",
        href: "https://prometheus.io",
        icon: "/icons/prometheus.svg",
      },
      {
        key: "grafana",
        title: "Grafana",
        href: "https://grafana.com",
        icon: "/icons/grafana.svg",
      },
      {
        key: "posthog",
        title: "PostHog",
        href: "https://posthog.com",
        icon: "/icons/posthog.svg",
      },
      {
        key: "sentry",
        title: "Sentry",
        href: "https://sentry.io",
        icon: "/icons/sentry.svg",
      },
      {
        key: "opentelemetry",
        title: "OpenTelemetry",
        href: "https://opentelemetry.io",
        icon: "/icons/opentelemetry.svg",
      },
    ],
  },
  {
    category: "Workflow & AI",
    items: [
      {
        key: "git",
        title: "Git",
        href: "https://git-scm.com",
        icon: "/icons/git.svg",
      },
      {
        key: "github",
        title: "Github",
        href: "https://github-scm.com",
        icon: "/icons/github.svg",
      },
      {
        key: "claude",
        title: "Claude",
        href: "https://claude.ai",
        icon: "/icons/claude.svg",
      },
      {
        key: "cursor",
        title: "Cursor",
        href: "https://cursor.ai",
        icon: "/icons/cursor.svg",
      },
      {
        key: "postman",
        title: "Postman",
        href: "https://www.postman.com",
        icon: "/icons/postman.svg",
      },
    ],
  },
] satisfies StackGroup[];
