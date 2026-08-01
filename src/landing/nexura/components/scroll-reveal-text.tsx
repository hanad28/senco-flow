import { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

type ScrollRevealTextProps = {
  text: string;
  className?: string;
  /** Muted start colour (Nexura default #999). */
  initialColor?: string;
  /** Revealed colour (Unisen text-primary). */
  activeColor?: string;
  /**
   * Viewport % where scroll progress starts (Nexura uses 80).
   * Progress maps over ~scrollDistancePx of further scroll.
   */
  startOffsetPct?: number;
  scrollDistancePx?: number;
};

/**
 * Nexura “Scroll Text”: words start muted and paint to activeColor
 * as the block scrolls through the viewport (word-tokenized colour interpolate).
 */
export default function ScrollRevealText({
  text,
  className,
  initialColor = "#999999",
  activeColor = "#244a70",
  startOffsetPct = 80,
  scrollDistancePx = 100,
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });
  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean), [text]);

  const { scrollYProgress } = useScroll({
    target: ref,
    // Nexura Scroll Text: offset [`start ${startOffset}%`, `end ${startOffset+scrollDistance}px`]
    offset: [
      `start ${startOffsetPct}%`,
      `end ${startOffsetPct + scrollDistancePx}px`,
    ],
  });

  if (reduceMotion) {
    return (
      <p className={className} style={{ color: activeColor }} dir="auto">
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={cn(className)} dir="auto" aria-label={text}>
      {words.map((word, i) => (
        <ScrollWord
          key={`${word}-${i}`}
          word={word}
          index={i}
          total={words.length}
          progress={scrollYProgress}
          initialColor={initialColor}
          activeColor={activeColor}
          isInView={isInView}
        />
      ))}
    </p>
  );
}

function ScrollWord({
  word,
  index,
  total,
  progress,
  initialColor,
  activeColor,
  isInView,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  initialColor: string;
  activeColor: string;
  isInView: boolean;
}) {
  const t = index / Math.max(total, 1);
  const color = useTransform(
    progress,
    [Math.max(0, t - 0.1), t],
    [initialColor, activeColor],
  );

  return (
    <motion.span
      className="inline-block mr-[0.25em]"
      style={{ color: isInView ? color : initialColor }}
      aria-hidden
    >
      {word}
    </motion.span>
  );
}
