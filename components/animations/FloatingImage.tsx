"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FloatingImageProps {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
}

export function FloatingImage({ children, amplitude = 10, duration = 3 }: FloatingImageProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
