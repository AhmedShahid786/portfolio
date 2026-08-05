import { About } from "@/components/about";
import { Blogs } from "@/components/blogs";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Socials } from "@/components/socials";
import { Stack } from "@/components/stack";

export default function Home() {
  return (
    <div className="border-border mx-auto w-full max-w-3xl border-x">
      <SiteNav />
      <Hero />
      <Socials />
      <About />
      <Projects />
      <Experience />
      <Stack />
      <Blogs />
      <SiteFooter />
    </div>
  );
}
