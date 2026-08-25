"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";

export function CursorGlow() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 120, damping: 24 });
  const sy = useSpring(y, { stiffness: 120, damping: 24 });
  const background = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, var(--hero-glow-a), transparent 70%)`;

  const ref = useRef(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      style={{ background }}
    />
  );
}
