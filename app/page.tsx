import { About } from "@/components/about";
import { Blogs } from "@/components/blogs";
import { Experience } from "@/components/experience";
import { GithubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
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

      <div className="border-border mx-auto w-full max-w-3xl border-x">
        <Hero />
        <Socials />
        <GithubActivity />
        <About />
        <Projects />
        <Experience />
        <Stack />
        <Blogs />
      </div>

      <SiteFooter />
    </>
  );
}
