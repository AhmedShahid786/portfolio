import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { formatPostDate } from "@/components/blog-grid";
import { NoisePanel } from "@/components/noise-panel";
import type { Block, Post, Span } from "@/lib/blog";

function Spans({ spans }: { spans: Span[] }) {
  return spans.map((span, index) => {
    if (typeof span === "string") return span;

    let node: ReactNode = span.text;
    if (span.code) {
      node = (
        <code className="bg-surface rounded-sm px-1 font-mono text-[0.9em]">
          {node}
        </code>
      );
    }
    if (span.italic) node = <em>{node}</em>;
    if (span.bold) node = <strong className="text-primary font-semibold">{node}</strong>;
    if (span.href) {
      node = (
        <a
          href={span.href}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline decoration-dotted underline-offset-4"
        >
          {node}
        </a>
      );
    }
    return <span key={index}>{node}</span>;
  });
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading": {
      const Heading = block.level === 2 ? "h2" : "h3";
      return (
        <Heading
          className={`font-display pt-4 leading-tight font-medium ${block.level === 2 ? "text-2xl" : "text-lg"}`}
        >
          {block.text}
        </Heading>
      );
    }
    case "paragraph":
      return (
        <p className="text-secondary leading-relaxed">
          <Spans spans={block.content} />
        </p>
      );
    case "image":
      return (
        <figure className="flex flex-col gap-2">
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            sizes="(min-width: 48rem) 48rem, 100vw"
            className="border-border h-auto w-full rounded-sm border"
          />
          {block.caption && (
            <figcaption className="text-muted text-center text-sm">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "code":
      return (
        <pre className="bg-surface border-border overflow-x-auto rounded-sm border p-4 text-sm leading-relaxed">
          <code>{block.code}</code>
        </pre>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List
          className={`text-secondary marker:text-muted flex flex-col gap-2 pl-6 leading-relaxed ${block.ordered ? "list-decimal" : "list-disc"}`}
        >
          {block.items.map((item, index) => (
            <li key={index}>
              <Spans spans={item} />
            </li>
          ))}
        </List>
      );
    }
    case "quote":
      return (
        <blockquote className="border-accent text-primary flex flex-col gap-1 border-l-2 pl-4 text-lg italic">
          {block.lines.map((line, index) => (
            <p key={index}>
              <Spans spans={line} />
            </p>
          ))}
        </blockquote>
      );
  }
}

export function BlogPost({ post }: { post: Post }) {
  return (
    <article>
      <header className="screen-line-top screen-line-bottom">
        <nav aria-label="Breadcrumb" className="border-border border-b px-4 py-2">
          <ol className="text-muted flex min-w-0 items-center gap-2 text-sm">
            <li className="shrink-0">
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blogs
              </Link>
            </li>
            <li aria-hidden className="shrink-0">
              /
            </li>
            <li aria-current="page" className="text-secondary truncate">
              {post.title}
            </li>
          </ol>
        </nav>

        {post.cover ? (
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            width={post.cover.width}
            height={post.cover.height}
            sizes="(min-width: 48rem) 48rem, 100vw"
            preload
            className="border-border h-auto w-full border-b"
          />
        ) : (
          <NoisePanel className="border-border aspect-[19/10] border-b" />
        )}

        <div className="flex flex-col gap-4 p-4">
          <h1 className="font-display text-3xl leading-tight font-medium sm:text-4xl">
            {post.title}
          </h1>

          <div className="text-muted flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
            <time dateTime={post.publishedAt}>
              {formatPostDate(post.publishedAt)}
            </time>
            <ul className="flex flex-wrap items-center">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-border border-l px-2 first:border-l-0 first:ps-0 last:pe-0"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-6 p-4 pb-12">
        {post.blocks.map((block, index) => (
          <BlockView key={index} block={block} />
        ))}
      </div>

    </article>
  );
}
