/*
 * Site-level identities.
 *
 * One named constant per external account, so a handle is never inlined into a
 * fetch call or a URL string and there is exactly one line to change. Modelled
 * on chanhdai.com's `src/config/site.ts` (MIT, (c) 2026 Chánh Đại), reduced to
 * what this repo actually reads.
 *
 * `src/data/socials.ts` still has `#` placeholders for its four profile links;
 * GITHUB_PROFILE_URL below is the real one and should be what it uses once the
 * other three arrive.
 */
export const GITHUB_USERNAME = "ahmedshahid786";

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
