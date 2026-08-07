import type { Metadata } from "next";
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import OrigamiCursor from "@/components/OrigamiCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/*
 * The brand face — only the nav monogram and the footer wordmark use it.
 * Colocated in app/fonts rather than public/ so next/font fingerprints,
 * preloads, and self-hosts it; a file left in public/ is served unhashed with
 * no preload and no @font-face of its own.
 */
const kawara = localFont({
  src: "./fonts/kawara.otf",
  variable: "--font-kawara",
  // Both marks are decorative. Briefly showing nothing beats flashing them in
  // Arial, whose metrics look nothing like a display face at this size.
  display: "block",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Ahmed Raza — Design Engineer",
  description:
    "I build frontend systems that make products feel clear, fast, and finished.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // `dark` is the starting point the theme toggle flips against. The dark
      // values live on :root, so the class is currently a label rather than a
      // selector — it becomes load-bearing when a `.light` palette exists.
      // scroll-pt-20 (80px) clears the 66px sticky nav: without it, jumping to
      // #about scrolls the heading to y=0, where the pinned nav covers it.
      className={`${spaceGrotesk.variable} ${geistMono.variable} ${inter.variable} ${kawara.variable} dark h-full scroll-pt-20 antialiased`}
    >
      <body className="bg-background text-primary flex min-h-full flex-col font-mono">
        {children}
        <OrigamiCursor />
      </body>
    </html>
  );
}
