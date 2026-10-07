import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="border-border mx-auto w-full max-w-3xl border-x border-b">
        <div className="relative isolate flex flex-col items-center gap-6 px-4 pt-28">
          <div aria-hidden className="dot-grid absolute inset-0 -z-1" />

          <h2 className="font-display max-w-md text-center text-3xl font-medium uppercase sm:text-4xl">
            Let’s create something cool together
          </h2>

          <a
            href="#"
            className="bg-primary text-background rounded-lg px-4 py-2 text-xs transition-opacity hover:opacity-90"
          >
            Book a Call
          </a>
        </div>

        <div className="@container grid px-6 pb-4">
          <p className="wordmark font-brand col-start-1 row-start-1 pt-11 text-center text-[17cqw] leading-none whitespace-nowrap uppercase">
            Ahmed Raza
          </p>

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
