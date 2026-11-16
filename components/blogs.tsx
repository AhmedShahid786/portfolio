import Link from "next/link";

import { BlogGrid } from "@/components/blog-grid";
import { getPosts } from "@/lib/blog";

const LANDING_COUNT = 2;

export function Blogs() {
  const posts = getPosts();

  return (
    <section id="blogs" className="screen-line-top screen-line-bottom">
      <div className="border-border flex items-center justify-between border-b px-4 py-3">
        <h2 className="font-display text-3xl font-medium">Blogs</h2>

        <Link
          href="/blog"
          aria-label="All posts"
          className="group/all text-secondary hover:text-primary p-2 transition-colors"
        >
          {/* Same masked chevron as CaseStudyButton, so it takes the text colour. */}
          <span
            aria-hidden
            className="block size-5 bg-current transition-transform group-hover/all:translate-x-1"
            style={{
              maskImage: 'url("/icons/chevron-right.svg")',
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />
        </Link>
      </div>

      <BlogGrid posts={posts.slice(0, LANDING_COUNT)} />
    </section>
  );
}
