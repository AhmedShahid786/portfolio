import { About } from "@/components/about";
import { Blogs } from "@/components/blogs";
import { Experience } from "@/components/experience";
import { GithubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { SectionSeparator } from "@/components/section-separator";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Socials } from "@/components/socials";
import { Stack } from "@/components/stack";

export default function Home() {
  return (
    <>
      {/* Nav and footer sit outside the shell on purpose: their bottom and top
          rules have to reach the screen edges, so each owns a full-width wrapper
          and re-creates the shell's vertical rules internally. */}
      <SiteNav />

      {/* The clip ancestor the `screen-line-*` and `stripe-divider` utilities
          require: their pseudo-elements are 200vw wide, and 100vw counts the
          vertical scrollbar, so without this the page gains a horizontal
          scrollbar. It has to be `clip`, not `hidden` — `hidden` would make this
          a scroll container and the sticky nav above would stop sticking. */}
      <div className="max-w-screen overflow-x-clip">
        {/* --separator-height is read by <SectionSeparator/> below. It lives
            here, on a shared ancestor, so the anchor scroll offset can be
            expressed against it too if the nav height ever moves. */}
        <div className="border-border mx-auto w-full max-w-3xl border-x [--separator-height:--spacing(8)]">
          <Hero />
          <Socials />
          <GithubActivity />
          <SectionSeparator />

          <About />
          <SectionSeparator />

          <Projects />
          <SectionSeparator />

          <Experience />
          <SectionSeparator />

          <Stack />
          <SectionSeparator />

          <Blogs />
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
