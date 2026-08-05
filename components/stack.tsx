import Image from "next/image";

const STACK = [
  { name: "Laravel", src: "/images/tech/laravel.png" },
  { name: "Node.js", src: "/images/tech/nodejs.png" },
  { name: "React", src: "/images/tech/react.png" },
  { name: "Redux", src: "/images/tech/redux.png" },
  { name: "MySQL", src: "/images/tech/mysql.png" },
  { name: "Next.js", src: "/images/tech/nextjs.png" },
  { name: "TypeScript", src: "/images/tech/typescript.png" },
  { name: "MongoDB", src: "/images/tech/mongodb.png" },
  { name: "Tailwind CSS", src: "/images/tech/tailwind.png" },
  { name: "Three.js", src: "/images/tech/threejs.png" },
  { name: "Git", src: "/images/tech/git.png" },
  { name: "JavaScript", src: "/images/tech/javascript.png" },
];

export function Stack() {
  return (
    <section id="stack" className="border-border border-t">
      <h2 className="font-display border-border border-b px-4 py-3 text-3xl font-medium">
        Stack
      </h2>

      {/* gap-px over a border-coloured background draws the grid rules, so the
          cell count can change per breakpoint without doubling up edges. */}
      <ul className="bg-border grid grid-cols-3 gap-px sm:grid-cols-4 lg:grid-cols-6">
        {STACK.map((tech) => (
          <li
            key={tech.name}
            className="bg-background flex items-center justify-center p-6"
          >
            <Image
              src={tech.src}
              alt={tech.name}
              title={tech.name}
              width={40}
              height={40}
              className="size-10 object-contain"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
