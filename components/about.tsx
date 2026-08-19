import { Fragment } from "react";

import { ABOUT_BULLETS, type AboutSegment } from "@/src/data/about";

function Segment({ segment }: { segment: AboutSegment }) {
  if (typeof segment === "string") {
    return <>{segment}</>;
  }

  if (segment.kind === "emphasis") {
    return <em className="text-primary not-italic">{segment.text}</em>;
  }

  const isExternal = segment.href.startsWith("http");

  return (
    <a
      href={segment.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="hover:text-primary underline transition-colors"
    >
      {segment.text}
    </a>
  );
}

export function About() {
  return (
    <section id="about" className="screen-line-top screen-line-bottom">
      <h2 className="font-display border-border border-b px-4 py-3 text-3xl font-medium">
        About
      </h2>

      <ul className="text-secondary list-disc space-y-2 py-6 pe-4 ps-10 leading-snug">
        {ABOUT_BULLETS.map((bullet) => (
          <li key={bullet.id}>
            {bullet.content.map((segment, index) => (
              <Fragment key={index}>
                <Segment segment={segment} />
              </Fragment>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}
