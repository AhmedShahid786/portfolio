/*
 * The sun mark from chanhdai.com (MIT, (c) 2026 Chánh Đại) —
 * src/components/animated-icons/sun-medium-icon.tsx, which is lucide's
 * `sun-medium` circle and eight rays.
 *
 * Same paths, static wrapper: theirs staggers the rays' opacity on hover via
 * motion/react. See [MoonIcon] for the same note.
 */
const RAYS = [
  "M12 3v1",
  "M12 20v1",
  "M3 12h1",
  "M20 12h1",
  "m18.364 5.636-.707.707",
  "m6.343 17.657-.707.707",
  "m5.636 5.636.707.707",
  "m17.657 17.657.707.707",
];

export function SunMediumIcon({
  size = 24,
  ...props
}: React.ComponentPropsWithoutRef<"svg"> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      {RAYS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
