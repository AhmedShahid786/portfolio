import type { Metadata } from "next";
import { Caveat, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import OrigamiCursor from "@/components/OrigamiCursor";
import { AwayTitle } from "@/components/away-title";
import { SoundsLoader } from "@/components/sounds-loader";

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

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const kawara = localFont({
  src: "./fonts/kawara.otf",
  variable: "--font-kawara",
  display: "block",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Ahmed Raza",
  description:
    "I build frontend systems that make products feel clear, fast, and finished.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} ${inter.variable} ${kawara.variable} ${caveat.variable} dark h-full scroll-pt-20 antialiased`}
    >
      <body className="bg-background text-primary flex min-h-full flex-col font-mono">
        {children}
        {/* Bottom fade + blur overlay, adapted from chanhdai.com (MIT, © 2026 Chánh Đại).
            Softer than upstream (60% fade, 2px blur): over bright banners a fade to
            solid black reads as a blackout. */}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50" aria-hidden>
          <div className="h-(--fade-bottom-height) bg-linear-to-b from-transparent to-background/60 mask-linear-[to_top,var(--background)_25%,transparent] backdrop-blur-[2px]" />
          <div className="bg-background pb-[env(safe-area-inset-bottom,0)]" />
        </div>
        <OrigamiCursor />
        <AwayTitle />
        <SoundsLoader />
      </body>
    </html>
  );
}
