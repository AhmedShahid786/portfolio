import Image from "next/image";

export function Hero() {
  return (
    <section className="screen-line-top screen-line-bottom flex items-stretch justify-between gap-4 px-4">
      <div className="flex flex-col justify-center py-8">
        <p className="text-muted tracking-widest">Hey there, I am</p>

        <h1 className="text-primary font-display mt-4 text-5xl font-medium">
          Ahmed Raza
        </h1>

        <p className="text-secondary mt-4 max-w-sm leading-snug">
          I build frontend systems that make products feel clear, fast, and
          finished.
        </p>

        <p className="border-accent-subtle mt-6 flex w-fit items-center gap-2 rounded-lg border-2 p-2">
          <Image
            src="/icons/status-dot.svg"
            alt=""
            width={10}
            height={10}
            unoptimized
            className="size-3 shrink-0"
          />
          <span className="text-accent font-ui text-2xs whitespace-nowrap">
            Open To New Opportunities
          </span>
        </p>
      </div>

      <div className="flex w-1/5 shrink-0 items-end justify-end">
        <Image
          src="/images/avatar.png"
          alt="Ahmed Raza"
          width={142}
          height={201}
          priority
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
