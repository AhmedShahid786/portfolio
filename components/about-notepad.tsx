"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { playSound } from "@/lib/sound/ui-sounds";
import { ABOUT_DETAILED } from "@/src/data/about";

const RING_COUNT = 11;
const SPRING = { type: "spring", stiffness: 260, damping: 26 } as const;

// Lying where it fell: flipped well past upright, tipped to the right.
const RESTING = { rotate: 30, x: 0, y: 0, opacity: 1 };
const LIFTED = { rotate: 10, x: "-30%", y: "-25%" };
// Hover sound fires 75% of the way from RESTING's tilt to LIFTED's.
const TAP_AT_ROTATE = RESTING.rotate - (RESTING.rotate - LIFTED.rotate) * 0.75;
// Drops in from above and bounces once it scrolls into view.
const FALLING = { rotate: 0, y: "-160%", opacity: 0 };
const DROP_TRANSITION = {
  y: { type: "spring", duration: 0.9, bounce: 0.3 },
  rotate: { type: "spring", duration: 1.1, bounce: 0.25 },
  opacity: { duration: 0.3, ease: "easeOut" },
} as const;

type Block = { kind: "p"; text: string } | { kind: "ul"; items: string[] };

function parseLongForm(source: string): Block[] {
  return source
    .trim()
    .split(/\n\s*\n/)
    .map((chunk) => {
      const lines = chunk.split("\n").map((line) => line.trim());
      return lines.every((line) => line.startsWith("- "))
        ? { kind: "ul", items: lines.map((line) => line.slice(2)) }
        : { kind: "p", text: lines.join(" ") };
    });
}

const BLOCKS = parseLongForm(ABOUT_DETAILED);

// One coil of the spiral binding: wire wrapping round the edge into a punched hole.
function Ring() {
  return (
    <svg viewBox="0 0 20 10" className="w-full" aria-hidden>
      <path
        d="M1 5 H14"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="stroke-paper-ring"
      />
      <circle cx="15" cy="5" r="3.2" className="fill-paper-ink" />
    </svg>
  );
}

function Paper({ children }: { children: ReactNode }) {
  return (
    <div className="bg-paper text-paper-ink relative flex min-h-0 flex-1 flex-col rounded-sm">
      {/* Binding straddles the left edge: wire outside, holes on the paper */}
      <div className="absolute inset-y-0 right-full z-10 flex w-[clamp(0.5rem,16%,2rem)] translate-x-[60%] flex-col justify-between py-[6%]">
        {Array.from({ length: RING_COUNT }, (_, index) => (
          <Ring key={index} />
        ))}
      </div>
      {children}
    </div>
  );
}

// Fake handwriting for the closed notepad: a title stroke and a few lines.
function Scribbles() {
  return (
    <svg viewBox="0 0 60 64" className="w-full flex-1 p-[12%]" aria-hidden>
      <g fill="none" strokeLinecap="round" className="stroke-paper-ink">
        <path d="M2 6 q6 -3 12 0 t12 0" strokeWidth="2" />
        {[20, 30, 40, 50].map((y, index) => (
          <path
            key={y}
            d={`M2 ${y} h${index === 3 ? 30 : 54}`}
            strokeWidth="1"
            className="stroke-paper-rule"
          />
        ))}
        {[18, 28, 38].map((y, index) => (
          <path
            key={y}
            d={`M3 ${y} q4 -2 8 0 t8 0 t8 0 ${index === 2 ? "" : "t8 0 t8 0"}`}
            strokeWidth="0.8"
            opacity="0.5"
          />
        ))}
      </g>
    </svg>
  );
}

export function AboutNotepad() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  // Drop only once the whole About section is on screen.
  const landed = useInView(sectionRef, { once: true, amount: "all" });
  const hitFloor = useRef(false);
  const hovering = useRef(false);
  const tapped = useRef(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const { overflow } = document.body.style;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <MotionConfig reducedMotion="user" transition={SPRING}>
      {/* Clipped to the section so the notepad's right corners tuck behind its edges */}
      <div
        ref={sectionRef}
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      >
        <div
          className="pointer-events-auto absolute -bottom-1 right-0 w-10 sm:w-12"
        >
          {!open && (
            <motion.button
              ref={triggerRef}
              type="button"
              layoutId="about-notepad"
              aria-label="Read more about me"
              aria-haspopup="dialog"
              data-cursor-wall
              onClick={() => setOpen(true)}
              onLayoutAnimationComplete={() =>
                triggerRef.current?.focus({ preventScroll: true })
              }
              initial={landed ? false : FALLING}
              animate={
                landed ? { ...RESTING, transition: DROP_TRANSITION } : FALLING
              }
              onUpdate={(latest) => {
                const y = parseFloat(String(latest.y));
                const rotate = parseFloat(String(latest.rotate));

                // Tick the moment the falling notepad first touches the floor.
                if (landed && !hitFloor.current && y >= 0) {
                  hitFloor.current = true;
                  playSound("tick");
                }

                // Tap once the hover tilt is most of the way to straight.
                if (hovering.current && !tapped.current && rotate <= TAP_AT_ROTATE) {
                  tapped.current = true;
                  playSound("tap");
                }
              }}
              onHoverStart={() => {
                hovering.current = true;
                tapped.current = false;
              }}
              onHoverEnd={() => {
                hovering.current = false;
              }}
              whileHover={LIFTED}
              whileFocus={LIFTED}
              whileTap={{ scale: 0.96 }}
              className="flex aspect-[3/4] w-full cursor-pointer flex-col outline-none will-change-transform"
            >
              <Paper>
                <Scribbles />
              </Paper>
            </motion.button>
          )}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-full z-10 hidden translate-y-4 ps-2 xl:block"
      >
        {/* Anchored to the section's right border, so the arrow tip stops ps-2 past it */}
        <div className="relative w-20">
          <p className="font-hand text-muted absolute bottom-full left-full mb-1 w-max -translate-x-3/4 -rotate-20 text-center text-2xl leading-none">
            a little more
            <br />
            about me
          </p>
          {/* Tip sits on the SVG's bottom edge, at the notepad's height */}
          <svg
            viewBox="0 0 24 38"
            className="text-muted w-8 origin-bottom-left -translate-y-4 rotate-32 overflow-visible"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 1 C27 25 17 38 2 38" />
              <path d="M9 32 L2 38 L9 44" />
            </g>
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="bg-background/70 absolute inset-0 backdrop-blur-sm"
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="About me, the long version"
              tabIndex={-1}
              layoutId="about-notepad"
              style={{ rotate: 0 }}
              className="relative flex max-h-[85vh] w-full max-w-xl flex-col outline-none"
            >
              <Paper>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="relative flex min-h-0 flex-1 flex-col"
                >

                  <div className="space-y-8 overflow-y-auto [scrollbar-width:thin] bg-[linear-gradient(var(--paper-rule)_1px,transparent_1px)] bg-size-[100%_--spacing(8)] bg-local px-8 py-8 leading-8 sm:px-12">
                    {BLOCKS.map((block, index) =>
                      block.kind === "p" ? (
                        <p key={index}>{block.text}</p>
                      ) : (
                        <ul key={index} className="list-disc ps-6">
                          {block.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </motion.div>
              </Paper>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
