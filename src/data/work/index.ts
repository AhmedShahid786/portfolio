import { kaacib } from "./kaacib";
import { saylaniAlumni } from "./saylani-alumni";
import { sitLms } from "./sit-lms";
import { snapfreez } from "./snapfreez";
import type { Product } from "./types";

export type { Product, ProductTech } from "./types";

// One file per product; this list sets the order on /work.
export const PRODUCTS: Product[] = [sitLms, snapfreez, saylaniAlumni, kaacib];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
