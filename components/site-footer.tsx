import Image from "next/image";

export function SiteFooter() {
  return (
    /*
     * Same split as site-nav, for the same reason: the outer <footer> is full
     * width and owns the top rule so it reaches the screen edges, while the inner
     * column stays at the shell width and owns `border-x` (continuing the shell's
     * vertical rules) plus `border-b` (the page's last line).
     *
     * That inner column's width also matters beyond the border: the wordmark
     * below is sized in `cqw`, so its container has to stay exactly as wide as
     * the shell was, or the wordmark changes size with it.
     */
    <footer className="border-border border-t">
      <div className="border-border mx-auto w-full max-w-3xl border-x border-b">
        {/* No bottom padding — the wordmark block owns the gap to the button. */}
        <div className="flex flex-col items-center gap-6 px-4 pt-24">
          <h2 className="font-display max-w-md text-center text-3xl font-medium uppercase sm:text-4xl">
            Let’s create something cool together
          </h2>

          {/* TODO: real booking URL — the Figma frame has no link on this button. */}
          <a
            href="#"
            className="bg-primary text-background rounded-lg px-4 py-2 text-xs transition-opacity hover:opacity-90"
          >
            Book a Call
          </a>
        </div>

        {/* Wordmark and dot texture are two layers sharing one grid cell, so they
            stack without absolute positioning and both scale with the container. */}
        <div className="@container grid px-6 pb-4">
          {/* Sized in cqw, not px or rem, so the wordmark fills its container at
              every width: KAWARA sets "AHMED RAZA" 5.8em wide, and 17cqw lands
              that on ~98% of the container at 320px and at 1920px alike.
              pt-11 rather than the rounder pt-12 because the vector carried ~52px
              of transparent space above its glyphs; 44px puts the baseline back
              where that space had it, so the footer keeps its old height. */}
          <p className="wordmark font-brand col-start-1 row-start-1 pt-11 text-center text-[17cqw] leading-none whitespace-nowrap uppercase">
            Ahmed Raza
          </p>

          {/* Dots the design scatters over the wordmark. Same export as before,
              with the wordmark vector and its black gradient stripped out — the
              `wordmark` utility now does the fading. */}
          <Image
            src="/images/footer-dot-band.svg"
            alt=""
            width={700}
            height={162}
            unoptimized
            className="col-start-1 row-start-1 h-auto w-full self-center"
          />
        </div>
      </div>
    </footer>
  );
}
