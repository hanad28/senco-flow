import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Nexura Solutions panel appear: opacity 0→1, 0.6s, ease [.6,0,.4,1], once @ 50%. */
const EASE = [0.6, 0, 0.4, 1] as const;

type ScrollAppearProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Optional y offset on enter (default 0: Nexura solutions use pure fade). */
  y?: number;
  as?: "div" | "section";
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView" | "viewport" | "transition">;

export default function ScrollAppear({
  children,
  className,
  delay = 0,
  y = 0,
  as = "div",
  ...rest
}: ScrollAppearProps) {
  const reduceMotion = useReducedMotion();
  const Comp = as === "section" ? motion.section : motion.div;

  return (
    <Comp
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.6, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
