import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-border border-y">
      {/* No bottom padding: the exported wordmark carries ~52px of transparent
          space above its glyphs, which is what separates it from the button. */}
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

      {/* KAWARA (Personal Use) isn't available as a webfont, so the wordmark is
          the vector exported from the Figma file. */}
      <div className="px-6 pb-4">
        <Image
          src="/images/wordmark-ahmed-raza.svg"
          alt="Ahmed Raza"
          width={700}
          height={162}
          unoptimized
          className="h-auto w-full"
        />
      </div>
    </footer>
  );
}
