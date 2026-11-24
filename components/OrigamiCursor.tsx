'use client';

import { motion, useAnimationFrame, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Any element with this attribute is a wall the crane can't fly into.
const WALL_SELECTOR = '[data-cursor-wall]';
// Roughly the crane's half-size, so its body stops at the edge rather than its centre.
const WALL_PADDING = 20;
// Share of speed kept when it bounces off a wall.
const WALL_BOUNCE = 0.35;

const SPRING = { damping: 40, stiffness: 40, mass: 2 };

type Velocity = { x: number; y: number };

// Push a point that ended up inside a wall back out through the side it came from.
function resolveWalls(prevX: number, prevY: number, x: number, y: number, velocity: Velocity) {
    for (const wall of document.querySelectorAll(WALL_SELECTOR)) {
        // Skip walls that aren't rendered, e.g. banners inside a collapsed
        // accordion: they still report the rect they'd have if open, which
        // lands on whatever sits below (the footer, for the last entry).
        if (!wall.checkVisibility({ contentVisibilityAuto: true })) continue;
        const rect = wall.getBoundingClientRect();
        const left = rect.left - WALL_PADDING;
        const right = rect.right + WALL_PADDING;
        const top = rect.top - WALL_PADDING;
        const bottom = rect.bottom + WALL_PADDING;

        if (x <= left || x >= right || y <= top || y >= bottom) continue;

        if (prevX <= left) {
            x = left;
            velocity.x *= -WALL_BOUNCE;
        } else if (prevX >= right) {
            x = right;
            velocity.x *= -WALL_BOUNCE;
        } else if (prevY <= top) {
            y = top;
            velocity.y *= -WALL_BOUNCE;
        } else if (prevY >= bottom) {
            y = bottom;
            velocity.y *= -WALL_BOUNCE;
        } else {
            // Already inside (e.g. the page scrolled a wall onto it): take the shortest way out.
            const exits = [x - left, right - x, y - top, bottom - y];
            const shortest = Math.min(...exits);
            if (shortest === exits[0]) x = left;
            else if (shortest === exits[1]) x = right;
            else if (shortest === exits[2]) y = top;
            else y = bottom;
            velocity.x = 0;
            velocity.y = 0;
        }
    }

    return { x, y };
}

function CraneIcon() {
    return (
        <div style={{ width: 48, height: 48, filter: 'drop-shadow(0px 8px 12px rgba(0,0,0,0.15))' }}>
            <svg 
                viewBox="0 0 100 100" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible', width: '100%', height: '100%' }}
            >
                <motion.g
                    animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                    transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
                    style={{ originX: "50px", originY: "50px" }}
                >
                    <motion.g
                        animate={{ rotate: [12, -18, 12] }}
                        transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
                        style={{ originX: "50px", originY: "50px" }}
                    >
                        <polygon points="45,50 55,50 30,5" fill="#E2E2E2" stroke="#D0D0D0" strokeWidth="0.5" strokeLinejoin="round" />
                    </motion.g>
                    <polygon points="35,55 45,50 55,75" fill="#EEEEEE" stroke="#D0D0D0" strokeWidth="0.5" strokeLinejoin="round" />
                    <polygon points="35,55 45,50 10,30" fill="#FAFAFA" stroke="#D0D0D0" strokeWidth="0.5" strokeLinejoin="round" />
                    <polygon points="55,50 75,55 55,75" fill="#E8E8E8" stroke="#D0D0D0" strokeWidth="0.5" strokeLinejoin="round" />
                    <polygon points="45,50 55,50 55,75" fill="#FFFFFF" stroke="#D0D0D0" strokeWidth="0.5" strokeLinejoin="round" />
                    <polygon points="55,50 65,40 85,20" fill="#FFFFFF" stroke="#D0D0D0" strokeWidth="0.5" strokeLinejoin="round" />
                    <polygon points="65,40 75,55 85,20" fill="#E0E0E0" stroke="#D0D0D0" strokeWidth="0.5" strokeLinejoin="round" />
                    <polygon points="85,20 80,26 95,30" fill="#EAEAEA" stroke="#D0D0D0" strokeWidth="0.5" strokeLinejoin="round" />
                    <motion.g
                        animate={{ rotate: [-15, 18, -15] }}
                        transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
                        style={{ originX: "50px", originY: "50px" }}
                    >
                        <polygon points="45,50 55,50 15,80" fill="#F9F9F9" stroke="#D0D0D0" strokeWidth="0.5" strokeLinejoin="round" />
                    </motion.g>
                </motion.g>
            </svg>
        </div>
    );
}

// Only on devices with a real mouse; touch screens and reduced-motion users get none.
const ENABLED_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export default function OrigamiCursor() {
    const [enabled, setEnabled] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Hand-rolled spring (instead of useSpring) so walls can stop it mid-flight.
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const velocity = useRef<Velocity>({ x: 0, y: 0 });

    const targetScaleX = useMotionValue(1);
    const scaleX = useSpring(targetScaleX, { damping: 20, stiffness: 150 });

    const angle = useMotionValue(0);

    useEffect(() => {
        const media = window.matchMedia(ENABLED_QUERY);
        const update = () => setEnabled(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        if (!enabled) return;
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [enabled, mouseX, mouseY]);

    useAnimationFrame((_, delta) => {
        if (!enabled) return;

        const dt = Math.min(delta, 50) / 1000;
        const prevX = cursorX.get();
        const prevY = cursorY.get();
        const v = velocity.current;
        v.x += ((SPRING.stiffness * (mouseX.get() - prevX) - SPRING.damping * v.x) / SPRING.mass) * dt;
        v.y += ((SPRING.stiffness * (mouseY.get() - prevY) - SPRING.damping * v.y) / SPRING.mass) * dt;
        const next = resolveWalls(prevX, prevY, prevX + v.x * dt, prevY + v.y * dt, v);
        cursorX.set(next.x);
        cursorY.set(next.y);

        const dx = mouseX.get() - cursorX.get();
        const dy = mouseY.get() - cursorY.get();
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
            if (dx > 2) targetScaleX.set(1);
            else if (dx < -2) targetScaleX.set(-1);

            const pitchDeg = Math.atan2(dy, Math.abs(dx)) * (180 / Math.PI);
            const targetPitch = pitchDeg + 24;

            angle.set(angle.get() + (targetPitch - angle.get()) * 0.15);
        } else {
            angle.set(angle.get() + (0 - angle.get()) * 0.05);
        }
    });

    if (!enabled) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none origin-center"
            style={{ x: cursorX, y: cursorY }}
        >
            <motion.div
                style={{
                    scaleX: scaleX,
                    rotate: angle,
                    x: -24,
                    y: -24,
                }}
            >
                <CraneIcon />
            </motion.div>
        </motion.div>
    );
}
