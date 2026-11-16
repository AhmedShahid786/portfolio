import Image from "next/image";
import Link from "next/link";

import { NoisePanel } from "@/components/noise-panel";
import type { Post } from "@/lib/blog";

const dateFormat = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function formatPostDate(date: string) {
  return dateFormat.format(new Date(date));
}

/** Post cards — cover, title, date. Shared by the landing section and /blog. */
export function BlogGrid({ posts }: { posts: Post[] }) {
  return (
    <ul className="grid gap-8 p-6 sm:grid-cols-2 sm:gap-12">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-4">
            {post.cover ? (
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                width={post.cover.width}
                height={post.cover.height}
                sizes="(min-width: 40rem) 22rem, 100vw"
                className="border-border aspect-[19/10] w-full rounded-sm border object-cover"
              />
            ) : (
              <NoisePanel className="border-border aspect-[19/10] rounded-sm border" />
            )}

            <div className="flex flex-col gap-2">
              <h3 className="font-display text-2xl leading-tight font-medium group-hover:underline group-hover:decoration-dotted group-hover:underline-offset-4">
                {post.title}
              </h3>
              <time dateTime={post.publishedAt} className="text-muted text-sm">
                {formatPostDate(post.publishedAt)}
              </time>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
