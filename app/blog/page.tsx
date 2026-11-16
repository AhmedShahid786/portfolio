import type { Metadata } from "next";

import { BlogGrid } from "@/components/blog-grid";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blogs — Ahmed Raza",
};

export default function BlogIndexPage() {
  return (
    <section className="screen-line-top screen-line-bottom">
      <h1 className="sr-only">Blogs</h1>

      <BlogGrid posts={getPosts()} />
    </section>
  );
}
