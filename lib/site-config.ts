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

/**
 * TODO: UNSET — Ahmed has not given an address for the socials row yet.
 *
 * Deliberately empty rather than guessed: nothing in this repo, in git config or
 * in the reference repos is his public contact address, and a wrong address on a
 * public page is worse than a missing one. Fill this one line in and the mail
 * icon starts working; leave it and the link stays inert like the other unset
 * socials.
 */
export const EMAIL = "";

/** `mailto:` for the socials row, or `#` while EMAIL is unset — see above. */
export const EMAIL_HREF = EMAIL ? `mailto:${EMAIL}` : "#";
