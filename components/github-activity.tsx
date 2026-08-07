import { Suspense } from "react";

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from "@/lib/site-config";
import { TooltipProvider } from "./ui/tooltip";

export const GithubActivity = () => {
  const contributions = getCachedContributions(GITHUB_USERNAME);

  return (
    // The <section> exists to carry the full-bleed rules, which need a real
    // element — <Suspense> renders none. Putting them here rather than on the
    // graph also keeps them steady across the fallback swap.
    <section className="screen-line-top screen-line-bottom py-4">
      <h2 className="sr-only">GitHub activity</h2>

      <Suspense fallback={<GitHubContributionsFallback />}>
        <TooltipProvider>
          <GitHubContributions
            contributions={contributions}
            githubProfileUrl={GITHUB_PROFILE_URL}
          />
        </TooltipProvider>
      </Suspense>
    </section>
  );
};
