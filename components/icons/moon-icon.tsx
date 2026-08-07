/*
 * The moon mark from chanhdai.com (MIT, (c) 2026 Chánh Đại) —
 * src/components/animated-icons/moon-icon.tsx, which is lucide's `moon` path.
 *
 * The path is identical; the wrapper is not. Theirs is a motion/react component
 * that wobbles the glyph on hover. That needs an animation library this project
 * doesn't have, so this is the static equivalent — drop their file in over this
 * one if the animation is wanted later.
 */
export function MoonIcon({
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
