'use client';

import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
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

export default function OrigamiCursor() {
    const [isMobile, setIsMobile] = useState(false);
    
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    
    // Hand-rolled spring (instead of useSpring) so walls can stop it mid-flight.
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const velocity = useRef<Velocity>({ x: 0, y: 0 });

    const targetScaleX = useMotionValue(1);
    const scaleX = useSpring(targetScaleX, { damping: 20, stiffness: 150 });
    
    const angle = useMotionValue(0);

    const { scrollYProgress, scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const mobileAngle = useMotionValue(0);
    const mobileY = useTransform(scrollYProgress, [0, 1], ['10vh', '85vh']);
    const mobileX = useTransform(scrollYProgress, (v) => Math.sin(v * Math.PI * 8) * 15 - 15);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        let moveCursor: (e: MouseEvent) => void;
        if (!isMobile) {
            moveCursor = (e: MouseEvent) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            };
            window.addEventListener('mousemove', moveCursor);
        }
        
        return () => {
            if (moveCursor) window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('resize', checkMobile);
        };
    }, [isMobile, mouseX, mouseY]);

    useAnimationFrame((_, delta) => {
        if (isMobile) {
            const sv = scrollVelocity.get();
            if (Math.abs(sv) > 20) {
                const targetPitch = sv > 0 ? -114 : 66;
                mobileAngle.set(mobileAngle.get() + (targetPitch - mobileAngle.get()) * 0.1);
            } else {
                mobileAngle.set(mobileAngle.get() + (24 - mobileAngle.get()) * 0.05);
            }
            return;
        }

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

            const pitchRad = Math.atan2(dy, Math.abs(dx));
            const pitchDeg = pitchRad * (180 / Math.PI);
            
            const targetPitch = pitchDeg + 24;
            
            angle.set(angle.get() + (targetPitch - angle.get()) * 0.15);
        } else {
            angle.set(angle.get() + (0 - angle.get()) * 0.05);
        }
    });

    if (isMobile) {
        return (
            <motion.div
                className="fixed top-0 right-4 z-[9999] pointer-events-none origin-center"
                style={{ y: mobileY, x: mobileX }}
            >
                <motion.div
                    style={{
                        rotate: mobileAngle,
                        scaleX: -1,
                        x: -24,
                        y: -24,
                    }}
                >
                    <CraneIcon />
                </motion.div>
            </motion.div>
        );
    }

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
