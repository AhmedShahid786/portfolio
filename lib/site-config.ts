/*
 * Site-level identities.
 *
 * One named constant per external account, so a handle is never inlined into a
 * fetch call or a URL string and there is exactly one line to change. Modelled
 * on chanhdai.com's `src/config/site.ts` (MIT, (c) 2026 Chánh Đại), reduced to
 * what this repo actually reads.
 *
 * Every profile URL in `src/data/socials.ts` is real as of 2026-08-19 — Ahmed
 * supplied the full set. Nothing on the page links to `#` any more except the
 * project/blog/Book-a-Call CTAs, which are a separate open item.
 */
export const GITHUB_USERNAME = "AhmedShahid786";

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

/** Public contact address, supplied by Ahmed 2026-08-19. */
export const EMAIL = "a.razashahid19@gmail.com";

/** `mailto:` for the socials row, or `#` while EMAIL is unset — see above. */
export const EMAIL_HREF = EMAIL ? `mailto:${EMAIL}` : "#";
