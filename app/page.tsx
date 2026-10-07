import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { GithubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { SectionSeparator } from "@/components/section-separator";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Socials } from "@/components/socials";
import { Stack } from "@/components/stack";

export default function Home() {
  return (
    <>
      <SiteNav />

      <div className="max-w-screen overflow-x-clip">
        <div className="border-border mx-auto w-full max-w-3xl border-x [--separator-height:--spacing(8)]">
          <Hero />
          <Socials />
          <About />
          <SectionSeparator />

          <GithubActivity />
          <SectionSeparator />

          <Stack />
          <SectionSeparator />

          <Experience />
          <SectionSeparator />
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
