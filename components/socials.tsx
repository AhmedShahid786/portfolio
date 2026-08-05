import Image from "next/image";

// TODO: real profile URLs — the Figma frame carries no links.
const SOCIALS = [
  {
    name: "X",
    metric: "1.5K Followers",
    href: "#",
    icon: { src: "/icons/x.svg", width: 24, height: 24 },
  },
  {
    name: "GitHub",
    metric: "8K Contributions",
    href: "#",
    icon: { src: "/icons/github.svg", width: 19, height: 20 },
  },
  {
    name: "LinkedIn",
    metric: "20K Follower",
    href: "#",
    icon: { src: "/icons/linkedin.svg", width: 21, height: 21 },
  },
];

export function Socials() {
  return (
    <ul className="divide-border border-border grid divide-y border-t sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {SOCIALS.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 p-2"
          >
            <span className="flex min-w-0 items-center gap-4">
              <span className="border-border flex size-10 shrink-0 items-center justify-center rounded-lg border">
                <Image
                  src={social.icon.src}
                  alt=""
                  width={social.icon.width}
                  height={social.icon.height}
                  unoptimized
                />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-secondary group-hover:text-primary truncate transition-colors">
                  {social.name}
                </span>
                <span className="text-muted truncate text-xs">
                  {social.metric}
                </span>
              </span>
            </span>

            {/* Source vector is a circled left arrow; the design rotates it to
                point up-right. */}
            <Image
              src="/icons/arrow-circle.svg"
              alt=""
              width={20}
              height={20}
              unoptimized
              className="shrink-0 rotate-[135deg]"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
