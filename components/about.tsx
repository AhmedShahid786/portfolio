export function About() {
  return (
    <section id="about" className="border-border border-t">
      <h2 className="font-display border-border border-b px-4 py-3 text-3xl font-medium">
        About
      </h2>

      {/* Copy is verbatim from the Figma frame. The third bullet credits
          chanhdai.com, React Wheel Picker and ZaDark — see the note in the
          handoff: those are another developer's projects. */}
      <ul className="text-secondary list-disc space-y-2 py-6 pe-4 ps-10 leading-snug">
        <li>
          Design Engineer with 5+ years of experience, known for pixel-perfect
          execution and strong attention to small details.
        </li>
        <li>
          Passionate about exploring new technologies and turning ideas into
          reality through polished, thoughtfully crafted personal projects.
        </li>
        <li>
          Creator of{" "}
          <a
            href="https://chanhdai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary underline transition-colors"
          >
            chanhdai.com
          </a>{" "}
          (1.8k stars),{" "}
          <a href="#" className="hover:text-primary underline transition-colors">
            React Wheel Picker
          </a>{" "}
          (24k+ weekly downloads, ▲Vercel OSS Program), and{" "}
          <a href="#" className="hover:text-primary underline transition-colors">
            ZaDark
          </a>{" "}
          (80k+ downloads, 30k+ users) — peak metrics.
        </li>
      </ul>
    </section>
  );
}
