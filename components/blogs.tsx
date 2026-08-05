import Image from "next/image";

import { NoisePanel } from "@/components/noise-panel";

// TODO: real post URLs — the Figma frame has no links.
const POSTS = [
  {
    title: "How I accomplished nothing I wanted to by 14.",
    tags: ["Life", "Career", "Experience"],
    excerpt:
      "Navigating the Treacherous Waters of Adolescence: Tales of Triumph and Tribulation",
    href: "#",
  },
  {
    title: "You shouldn’t become a designer.",
    tags: ["Career", "Design", "Life"],
    excerpt:
      "Is a Career in Design Right for You? Key Considerations Before You Commit",
    href: "#",
  },
];

const READING = {
  title: "Steal Like an Artist",
  author: "By Austin Kleon",
  blurb:
    "Steal Like an Artist is a guide to finding your creative voice by embracing influence and remixing ideas from others.",
};

export function Blogs() {
  return (
    <section id="blogs" className="border-border border-t">
      <h2 className="font-display border-border border-b px-4 py-3 text-3xl font-medium">
        Blogs
      </h2>

      <ul className="grid gap-8 p-6 sm:grid-cols-2 sm:gap-12">
        {POSTS.map((post) => (
          <li key={post.title} className="flex flex-col gap-4">
            {/* The design ships a noise-texture placeholder rather than real
                cover art for the posts. */}
            <NoisePanel className="border-border aspect-[19/10] rounded-sm border" />

            <h3 className="font-display text-2xl font-medium">{post.title}</h3>

            <ul className="flex flex-wrap items-center">
              {post.tags.map((tag, index) => (
                <li
                  key={tag}
                  className={
                    index === 0
                      ? "text-muted pe-2 text-sm"
                      : "text-muted border-border border-l px-2 text-sm"
                  }
                >
                  {tag}
                </li>
              ))}
            </ul>

            <p className="text-muted text-sm leading-snug">
              {post.excerpt}{" "}
              <a
                href={post.href}
                className="text-primary underline decoration-dotted underline-offset-4"
              >
                Read More
              </a>
            </p>
          </li>
        ))}
      </ul>

      <div className="border-border flex flex-col gap-6 border-t p-6">
        <h3 className="font-display">Reading Now</h3>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          {/* Line-art shelf plus the two book covers, exported as one asset:
              in Figma this is a dozen separately positioned vector strokes. */}
          <Image
            src="/images/reading-now.png"
            alt="Books on a shelf"
            width={831}
            height={707}
            className="h-auto w-full sm:w-2/5"
          />

          <div className="flex flex-1 flex-col gap-4">
            <div>
              <h4 className="font-display text-2xl font-medium uppercase">
                {READING.title}
              </h4>
              <p className="text-muted text-sm">{READING.author}</p>
            </div>

            <p className="text-secondary leading-snug">{READING.blurb}</p>

            <button
              type="button"
              className="border-border hover:border-secondary flex w-fit items-center gap-2 rounded-lg border px-4 py-2 transition-colors"
            >
              Next
              {/* Source vector points left; the design points it right. */}
              <Image
                src="/icons/arrow-circle.svg"
                alt=""
                width={20}
                height={20}
                unoptimized
                className="rotate-180"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
