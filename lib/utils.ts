import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/*
 * From chanhdai.com (MIT, (c) 2026 Chánh Đại) — src/lib/utils.ts.
 *
 * Verbatim apart from dropping `absoluteUrl` (needs his NEXT_PUBLIC_APP_URL)
 * and the repo's semicolons/double quotes.
 *
 * `cn` exists so a copied component's own classes can be overridden by the
 * caller: clsx flattens the arguments, tailwind-merge then keeps only the last
 * utility in each conflicting group. That last-wins order is what lets
 * `<Button className="text-secondary">` beat the variant's own text colour.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
