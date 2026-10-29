import Link from "next/link";

// The "Case Study >" button, used on /work and in the Experience products.
export function CaseStudyButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="group/cta text-secondary hover:text-primary flex items-center gap-0.5 self-end py-2 text-sm transition-colors"
    >
      Case Study
      {/* Masked so the chevron takes the text colour (and its hover change).
          On hover it slides 6px right, widening the gap from 2px to 8px
          without shifting the right-aligned text. */}
      <span
        aria-hidden
        className="block size-3.5 bg-current transition-transform group-hover/cta:translate-x-1.5"
        style={{
          maskImage: 'url("/icons/chevron-right.svg")',
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
      />
    </Link>
  );
}
