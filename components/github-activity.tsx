import { Suspense } from "react";

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import { TooltipProvider } from "./ui/tooltip";

const GITHUB_USERNAME = "ncdai";
const GITHUB_PROFILE_URL = "https://github.com/ncdai";

export const GithubActivity = () => {
  const contributions = getCachedContributions(GITHUB_USERNAME);

  return (
    <Suspense fallback={<GitHubContributionsFallback />}>
      <TooltipProvider>
        <GitHubContributions
          contributions={contributions}
          githubProfileUrl={GITHUB_PROFILE_URL}
        />
      </TooltipProvider>
    </Suspense>
  );
};
