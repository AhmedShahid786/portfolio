import Image from "next/image";

import { NoisePanel } from "@/components/noise-panel";
import { POSTS, READING } from "@/src/data/blogs";

export function Blogs() {
  return (
    <section id="blogs" className="screen-line-top screen-line-bottom">
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
