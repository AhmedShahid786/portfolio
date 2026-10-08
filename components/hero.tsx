import Image from "next/image";

import { AgeCounter } from "@/components/age-counter";

export function Hero() {
  return (
    <section>
      {/* Banner slot — placeholder pattern until real banner content lands */}
      <div className="diagonal-stripes screen-line-bottom aspect-[3/1] w-full" />

      {/* Avatar box (square, so height = 17.5% of width) is pulled up by half to straddle the banner edge */}
      <div className="screen-line-bottom flex justify-center">
        <div className="border-border bg-background relative -mt-[8.75%] w-[17.5%] shrink-0 border-x border-t p-2">
          <div
            data-cursor-wall
            className="border-border relative aspect-square w-full overflow-hidden rounded-full border"
          >
            <Image
              src="/images/portrait.png"
              alt="Ahmed Raza"
              fill
              priority
              sizes="(min-width: 768px) 135px, 18vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="absolute top-2 right-4">
          <AgeCounter />
        </div>
      </div>

      {/* Box background hides the row line beneath the avatar, so avatar and name read as one column */}
      <div className="screen-line-bottom flex justify-center">
        <h1 className="border-border text-primary font-display border-x px-4 py-2 text-4xl font-medium">
          Ahmed Raza
        </h1>
      </div>
    </section>
  );
}
