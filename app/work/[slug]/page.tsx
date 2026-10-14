import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/case-study";
import { getProduct, PRODUCTS } from "@/src/data/work";

// Every case study is prerendered at build time; unknown slugs 404 instead of
// rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  return product
    ? { title: `${product.name} — Ahmed Raza`, description: product.summary }
    : {};
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return <CaseStudy product={product} />;
}
