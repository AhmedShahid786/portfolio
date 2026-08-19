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
          I build products that scale and stick.
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
